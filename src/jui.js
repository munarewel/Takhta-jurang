/* =====================================================================
   TAKHTA JURANG — antarmuka
   ===================================================================== */
const UI={panel:null,sel:null,placing:null,target:null,speed:1,gres:null,fuseA:null,fuseB:null,confirmNew:false,lastRefresh:0,tipI:0};
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>{ n=Math.floor(n); return n>=1e6?(n/1e6).toFixed(1)+'jt':n>=1e4?(n/1e3).toFixed(1)+'rb':String(n); };
function toast(s){ const t=$('toast'); t.textContent=s; t.hidden=false; clearTimeout(toast.h); toast.h=setTimeout(()=>t.hidden=true,2200); }
/* ---------- ikon kanvas ---------- */
function paintIcon(cv,fn){ const g=cv.getContext('2d'); g.imageSmoothingEnabled=false; g.clearRect(0,0,cv.width,cv.height); fn(g); }
const BBOX=new WeakMap();
function sprBox(spr){ let b=BBOX.get(spr); if(b) return b; const g=spr.getContext('2d'); const d=g.getImageData(0,0,spr.width,spr.height).data; let x0=spr.width,y0=spr.height,x1=0,y1=0; for(let y=0;y<spr.height;y++)for(let x=0;x<spr.width;x++){ if(d[(y*spr.width+x)*4+3]>30){ if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y; } } b=x1<x0?{x:0,y:0,w:spr.width,h:spr.height}:{x:x0,y:y0,w:x1-x0+1,h:y1-y0+1}; BBOX.set(spr,b); return b; }
function iconSpr(cv,spr){ paintIcon(cv,g=>{ const b=sprBox(spr); const k=Math.min(cv.width/b.w,cv.height/b.h); const w=b.w*k,h=b.h*k; g.drawImage(spr,b.x,b.y,b.w,b.h,Math.round((cv.width-w)/2),Math.round(cv.height-h),w,h); }); }
function iconFix(cv,fx){ const c=document.createElement('canvas'); c.width=32; c.height=48; const g=c.getContext('2d'); drawFix(g,fx,16,44,0); if(fx.t==='rahasia'){ g.fillStyle='#3a3446'; g.globalCompositeOperation='destination-over'; g.fillRect(8,10,16,34); } iconSpr(cv,c); }
function itemTxt(it){ const s=itemStats(it); const p=[]; if(s.atk) p.push(`+${Math.round(s.atk)} serangan`); if(s.hp) p.push(`+${Math.round(s.hp)} nyawa`); if(s.def) p.push(`+${Math.round(s.def)} pertahanan`); if(s.eva) p.push(`+${Math.round(s.eva*100)}% menghindar`); return p.join(' · '); }
function pct(p){ return p>=1?'pasti':p>=.1?Math.round(p*100)+'%':(p*100).toFixed(p>=.01?1:2).replace('.',',')+'%'; }
function dropListHtml(list,note){ return `<div class="sec"><h3>Daftar drop</h3>${note?`<p class="note">${note}</p>`:''}<div class="abl">${list.map(d=>{
  const tag=d.k==='eq'?`${rarTag(d.r)}<em>${EQ_SLOT[d.s]}</em>`:d.k==='core'?`<em>inti · tingkat ${d.t+1}</em>`:d.k==='mat'?`<em>bahan · tingkat ${d.t+1}</em>`:'';
  const info=d.k==='eq'?`<br><span class="note">${itemTxt(d.it)} · dijual ±${itemValue(d.it)} emas</span>`:d.k==='core'?'<br><span class="note">Bahan tempa bermutu tinggi.</span>':d.k==='mat'?'<br><span class="note">Bahan untuk menempa perlengkapan.</span>':`<br><span class="note">±${d.v} ${d.n.toLowerCase()}</span>`;
  return `<div><b>${esc(d.n)}</b> ${tag}<span style="float:right;font-family:var(--display);color:var(--gold)">${pct(d.p)}</span>${info}</div>`; }).join('')}</div></div>`; }
function itemName(it){ return `${esc(it.n)}${it.lv?` +${it.lv}`:''}`; }
function rarTag(r){ const n=RARITY[r]; return `<span class="rar" style="background:${RAR_COL[n]}">${n}</span>`; }
function stars(st,max){ return '◆'.repeat(st)+'◇'.repeat(Math.max(0,max-st)); }
/* ---------- tips Mira ---------- */
const TIPS=[
  'Yang Mulia, peti harta adalah umpan. Petualang yang dapat loot jadi lebih kuat, tapi juga makin berani naik ke lantai atas.',
  'Tempat Istirahat menghasilkan emas, dan petualang akan kembali lewat titik simpannya. Pasang di lantai yang dijaga monster kuat.',
  'Monster yang mencapai batas level akan berevolusi: Lv25, Lv50, Lv75, lalu Lv100.',
  'Fusi: monster pertama mewarisi ability pertama monster kedua. Maksimal 5 ability.',
  'Dinding Retak menyembunyikan monster rahasia. Hanya Thief dan Ranger yang bisa menemukannya.',
  'Monster yang tumbang bangkit lagi setelah 60 detik kalau mana cukup.',
  'Gas Tidur lalu jebakan lain = KOMBO! Kerusakan berlipat ganda.',
  'Makin lama Yang Mulia tak terkalahkan, makin terkenal kastil ini dan makin kuat petualang yang datang.',
  'Strategi Penyergap: monster bersembunyi lalu menyerang dua kali lipat saat petualang lewat.',
  'Mana bisa dipakai melatih monster dan menaikkan level jebakan. Sisakan untuk kebangkitan.',
];
function miraTip(s,key){
  if(key){ G.tipsSeen=G.tipsSeen||[]; if(G.tipsSeen.includes(key)) return; G.tipsSeen.push(key); }
  const p=$('miraTxt'); p.innerHTML=`<b>Mira:</b> ${s}`; p.hidden=false; clearTimeout(miraTip.h); miraTip.h=setTimeout(()=>p.hidden=true,9000); }
function miraReport(){
  const dead=G.mons.filter(m=>m.dead&&!m.temp); const out=[];
  if(dead.length){ const need=dead.reduce((s,m)=>s+reviveCost(m),0); out.push(G.mana>=need?`${dead.length} monster sedang menunggu bangkit. Mana cukup.`:`${dead.length} monster tumbang. Butuh ${need} mana untuk membangkitkan semuanya, kita punya ${Math.floor(G.mana)}.`); }
  const bare=[]; for(let f=0;f<G.floors;f++){ if(!G.fix[f].some(x=>x&&FIX[x.t]&&FIX[x.t].cat==='jebakan')) bare.push(f+1); } if(bare.length) out.push(`Lantai ${bare.slice(0,4).join(', ')} belum punya jebakan.`);
  const empty=[]; for(let f=0;f<G.floors;f++) if(!floorCount(f)) empty.push(f+1); if(empty.length) out.push(`Lantai ${empty.slice(0,4).join(', ')} tidak dijaga monster.`);
  const res=G.mons.filter(m=>m.floor<0).length; if(res) out.push(`${res} monster menganggur di cadangan.`);
  const cap=G.mons.filter(m=>!m.temp&&m.lv>=monCap(m)-2&&SPECIES[m.sp].next); if(cap.length) out.push(`${cap[0].name} hampir berevolusi!`);
  const inside=G.parties.filter(p=>p.state==='in'); if(inside.length) out.push(`${inside.length} party sedang di dalam kastil.`);
  if(G.jiwa>=10) out.push(`Kristal Jiwa ${G.jiwa}, cukup untuk ${Math.floor(G.jiwa/10)} pemanggilan.`);
  return out.length?out.slice(0,2).join(' '):'Semuanya aman, Yang Mulia.';
}
function nextTip(){ G.tipsSeen=G.tipsSeen||[]; const i=TIPS.findIndex((t,k)=>!G.tipsSeen.includes('tip'+k)); if(i>=0) miraTip(TIPS[i],'tip'+i); else miraTip(miraReport()); }
/* ---------- ticker log ---------- */
function onLog(s,c){ if(!$('ticker')) return; if(c==='adv'&&!/masuk/.test(s)&&rnd()<.5) return; const t=$('ticker'); const d=document.createElement('div'); d.className=c||''; d.textContent=s; t.prepend(d); while(t.children.length>2) t.lastChild.remove(); setTimeout(()=>d.remove(),7000);
  if(c==='lord'&&/TUMBANG/.test(s)) miraTip('Yang Mulia tumbang… tapi kegelapan tak pernah mati. Raja baru akan bangkit dengan ras acak. Popularitas kita turun, tapi kita bangun lagi!','lorddeath');
  if(c==='evo'&&/BEREVOLUSI/.test(s)) miraTip('Evolusi pertama kita! Level kembali ke 1, tapi kekuatannya tetap naik. Batas level berikutnya lebih tinggi.','evo1'); }
/* ---------- panel ---------- */
function openPanel(p,opt){ UI.panel=p; Object.assign(UI,opt||{}); $('sheet').hidden=false; for(const b of document.querySelectorAll('#nav button')) b.setAttribute('aria-pressed',b.dataset.p===p||((p==='mon'||p==='gudang')&&b.dataset.p==='monster')?'true':'false'); renderPanel(); }
function closePanel(){ UI.panel=null; UI.sel=null; UI.target=null; UI.fuseA=null; $('sheet').hidden=true; for(const b of document.querySelectorAll('#nav button')) b.setAttribute('aria-pressed','false'); }
function renderPanel(){
  if(!UI.panel) return; const B=$('sheetB'); const T=$('sheetT');
  const fn={gudang:pGudang,bangun:pBangun,monster:pMonList,mon:pMon,panggil:pGacha,petualang:pAdv,raja:pRaja,fix:pFix,adv:pAdvOne,...(typeof NB_PANELS!=='undefined'?NB_PANELS:{})}[UI.panel]; if(!fn){ closePanel(); return; }
  const sc=B.scrollTop; const r=fn(); T.textContent=r.t; B.innerHTML=r.h; B.scrollTop=sc;
  for(const cv of B.querySelectorAll('canvas[data-sp]')) iconSpr(cv,monSpr(cv.dataset.sp,0));
  for(const cv of B.querySelectorAll('canvas[data-fix]')) iconFix(cv,JSON.parse(cv.dataset.fix));
  for(const cv of B.querySelectorAll('canvas[data-adv]')){ const p=G.people[cv.dataset.adv]; if(p) iconSpr(cv,advSpr(p,0)); }
  for(const cv of B.querySelectorAll('canvas[data-lord]')) iconSpr(cv,lordSpr(0));
  if(typeof nbAfterRender==='function') nbAfterRender(B);
  UI.lastRefresh=performance.now();
}
/* Bangun / Toko */
function pBangun(){
  const tg=UI.target?` · tujuan: L${UI.target.f+1} petak ${UI.target.i+1}`:'';
  const item=(fx,name,sub,cost,cls)=>`<button class="card" data-buy='${JSON.stringify(fx)}'><canvas class="ic" width="32" height="36" data-fix='${JSON.stringify(fx)}'></canvas><span class="t"><b>${name}</b><span>${sub}</span><span class="cost ${cls||''}">${cost}</span></span></button>`;
  let h=`<p class="note">Pilih barang, lalu ketuk petak kosong di lantai. Mira yang akan memasangnya${tg}.</p>`;
  h+=`<div class="sec"><h3>Lantai</h3><div class="btns"><button class="btn pri" data-act="floor" ${G.floors>=MAX_FLOORS?'disabled':''}>Tambah lantai ke-${G.floors+1} · ${fmt(floorCost())} emas</button></div><p class="note">Kastil bisa ditinggikan sampai 100 lantai. Singgasana selalu di lantai teratas. Tema berganti tiap 10 lantai.</p></div>`;
  h+=`<div class="sec"><h3>Peti Harta</h3><div class="grid">${CHEST_RANK.map(r=>item({t:'chest',r},`Chest ${r}`,['Recehan','Biasa','Lumayan','Bagus','Langka','Epik','Legenda','Mitos','Dewa'][chestValue(r)],fmt(chestCost(r))+' emas')).join('')}</div>
    <label class="note" style="display:flex;gap:6px;align-items:center;margin-top:6px"><input type="checkbox" id="autoChest" ${G.settings.autoChest?'checked':''}> Isi ulang peti otomatis setelah dijarah</label></div>`;
  for(const [cat,title] of [['jebakan','Jebakan'],['fasilitas','Fasilitas'],['dekor','Dekorasi (Aura Seram)']]){
    h+=`<div class="sec"><h3>${title}</h3><div class="grid">${Object.entries(FIX).filter(([k,v])=>v.cat===cat).map(([k,v])=>item({t:k},v.n,v.d,fmt(v.cost)+' emas')).join('')}</div></div>`; }
  return {t:'Bangun & Toko',h};
}
/* daftar monster */
function pMonList(){
  const list=G.mons.filter(m=>!m.temp).slice().sort((a,b)=>(b.floor-a.floor)||(SPECIES[b.sp].rar-SPECIES[a.sp].rar)||b.lv-a.lv);
  let h=`<div class="btns"><button class="btn pri">Monster</button><button class="btn" data-act="tabGudang">Gudang (${G.inv.length} barang)</button></div><p class="note">${list.length} monster · ${list.filter(m=>m.floor<0).length} di cadangan · maks ${FLOOR_CAP} per lantai. Ketuk untuk detail.</p><div class="grid">`;
  for(const m of list){ const s=SPECIES[m.sp];
    h+=`<button class="card" data-mon="${m.id}"><canvas class="ic" width="32" height="36" data-sp="${m.sp}"></canvas><span class="t"><b>${esc(m.name)} ${rarTag(s.rar)}</b><span>${esc(s.n)} · ${stars(s.stage,maxStageOf(m.sp))}</span><span>Lv${m.lv}/${monCap(m)} · ${m.floor<0?'Cadangan':m.secret?`L${m.floor+1} rahasia`:`L${m.floor+1}`}${m.dead?' · <span style="color:var(--blood)">tumbang</span>':''}</span></span></button>`; }
  return {t:'Monster',h:h+'</div>'};
}
/* gudang perlengkapan */
function modsHtml(it){ if(!it.mods&&!it.runes) return ''; itFix(it); const br=itemBroken(it);
  const ms=it.mods.map(md=>`<span class="mod${br?' off':''}">${modTxt(md)}</span>`).join('');
  const rs=Array.from({length:it.sock},(_,i)=>{ const rn=it.runes[i]; return rn?`<span class="rune${br?" mod off":""}" style="border-color:${RUNE[rn.k].c};color:${RUNE[rn.k].c}">◆ ${runeName(rn)}: ${modTxt(runeMod(rn))}</span>`:'<span class="rune empty">◇ slot rune kosong</span>'; }).join('');
  const dp=it.dur/it.durMax; const dc=dp>.5?'#7ad07a':dp>.2?'#e0b040':'#e05a5a';
  return `<span class="mods">${ms}${rs}</span><span class="dur"><i style="width:${Math.round(dp*100)}%;background:${dc}"></i></span><span class="note">Ketahanan ${Math.ceil(it.dur)}/${it.durMax}${br?' · <b style="color:#ff6a6a">RUSAK, efek mati</b>':''}</span>`; }
function itemShort(it){ itFix(it); return itemTxt(it)+(it.mods.length?' · '+it.mods.map(modTxt).join(' · '):'')+(it.runes.length?' · '+it.runes.map(runeName).join(', '):'')+(itemBroken(it)?' · RUSAK':''); }
function pGudang(){
  G.runes=G.runes||[]; const rc=G.inv.reduce((a,it)=>a+repairCost(it),0);
  let h=`<div class="btns"><button class="btn" data-act="tabMon">Monster</button><button class="btn pri">Gudang</button></div>
  <p class="note">Perlengkapan didapat dari petualang yang tewas atau dibeli dari pedagang. Tiap barang punya efek (affix), ketahanan, dan slot rune. Barang yang ketahanannya habis jadi rusak dan efeknya mati sampai diperbaiki.</p>
  <div class="btns"><button class="btn pri" data-act="buyItem">Beli perlengkapan acak · 250 emas</button><button class="btn" data-act="buyRune">Beli rune acak · 300 emas</button>${rc?`<button class="btn" data-act="repairAll">Perbaiki semua · ${rc} emas</button>`:''}</div>`;
  const list=G.inv.slice().sort((a,b)=>b.r-a.r||b.lv-a.lv);
  h+=`<div class="sec"><h3>Perlengkapan (${list.length})</h3>${list.length?'':'<p class="note">Gudang masih kosong.</p>'}<div class="abl">${list.map(it=>{ itFix(it); const w=it.on&&G.mons.find(m=>m.id===it.on); const c=forgeCost(it); const rp=repairCost(it);
    let x=`<div><b>${itemName(it)}</b> ${rarTag(it.r)}<em>${EQ_SLOT[it.s]}</em>${w?`<em>dipakai ${esc(w.name)}</em>`:''}<br><span class="note">${itemTxt(it)}${it.from?` · asal: ${esc(it.from)}`:''}</span>${modsHtml(it)}
      <span class="btns" style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px"><button class="btn" data-forge="${it.id}" ${it.lv>=10?'disabled':''}>Tempa +1 · ${c.gold} emas, ${c.mana} mana</button>${rp?`<button class="btn" data-repair="${it.id}">Perbaiki · ${rp}</button>`:''}${it.runes.length<it.sock?`<button class="btn" data-sock="${it.id}">Pasang rune</button>`:''}${it.runes.map((rn,i)=>`<button class="btn" data-unsock="${it.id}:${i}">Cabut ${RUNE[rn.k].n.replace(' Rune','')} · 100</button>`).join('')}${it.sock<3?`<button class="btn" data-addsock="${it.id}">+Slot rune · ${addSocketCost(it)}</button>`:''}<button class="btn warn" data-sell="${it.id}">Jual · ${itemValue(it)}</button></span>`;
    if(UI.sockFor===it.id){ x+=`<span class="party" style="display:block;margin-top:6px"><b>Pilih rune untuk ${esc(it.n)}</b><br>${G.runes.length?G.runes.slice().sort((a,b)=>b.g-a.g).map(rn=>`<button class="btn" style="margin:2px;border-color:${RUNE[rn.k].c}" data-rsel="${it.id}:${rn.id}">${runeName(rn)} · ${modTxt(runeMod(rn))}</button>`).join(''):'<span class="note">Belum punya rune.</span>'}</span>`; }
    return x+'</div>'; }).join('')}</div></div>`;
  const grp={}; for(const r of G.runes){ const k=r.k+':'+r.g; grp[k]=(grp[k]||0)+1; }
  h+=`<div class="sec"><h3>Rune (${G.runes.length})</h3><p class="note">Rune dipasang ke slot perlengkapan. Gabungkan 3 rune yang sama untuk naik tingkat (I sampai V).</p>${G.runes.length?`<div class="abl">${Object.entries(grp).sort((a,b)=>b[0].split(':')[1]-a[0].split(':')[1]).map(([k,n])=>{ const [rk,g]=k.split(':'); const rn={k:rk,g:+g};
    return `<div><b style="color:${RUNE[rk].c}">◆ ${runeName(rn)}</b> ×${n}<br><span class="note">${modTxt(runeMod(rn))}</span>${n>=3&&+g<5?`<span class="btns" style="display:flex;margin-top:4px"><button class="btn" data-merge="${k}">Gabung 3 → ${ROMAN[+g+1]} · ${80*g} emas</button></span>`:''}</div>`; }).join('')}</div>`:'<p class="note">Belum ada rune.</p>'}</div>`;
  return {t:'Gudang Kastil',h};
}
/* detail monster */
const STRAT={jaga:'Jaga pos',agresif:'Agresif',dukung:'Pendukung',sergap:'Penyergap'};
function pMon(){
  const m=G.mons.find(x=>x.id===UI.monId); if(!m) return {t:'Monster',h:'<p class="note">Monster ini sudah tiada.</p>'};
  const s=SPECIES[m.sp], st=monStats(m), cap=monCap(m), need=monNeed(m), nx=s.next&&SPECIES[s.next];
  let h=`<div class="mhead"><canvas width="32" height="36" data-sp="${m.sp}"></canvas><div class="nm"><b>${esc(m.name)}</b><span>${esc(s.n)} ${rarTag(s.rar)}</span><span class="note">${stars(s.stage,maxStageOf(m.sp))} tahap ${s.stage} · peringkat ${s.rank}</span></div></div>`;
  h+=`<div class="name-edit"><input id="nmIn" maxlength="16" value="${esc(UI.nmDraft&&UI.nmDraft.id===m.id?UI.nmDraft.v:m.name)}" aria-label="Nama baru"><button class="btn" data-act="rename">Minta izin ganti nama</button></div>`;
  if(UI.rnReply&&UI.rnReply.id===m.id){ const R_=UI.rnReply; h+=`<div class="party"><b style="color:${R_.ok?'var(--heal)':'#ff9aa8'}">${esc(m.name)}: "${esc(R_.reply)}"</b>${R_.alt?`<div class="btns"><button class="btn" data-act="takeAlt">Pakai "${esc(R_.alt)}"</button></div>`:''}<span class="note">Sifat ${PERS[m.pers||'setia'].n} · kesetiaan ${Math.round(m.loy)}. Monster yang setia lebih mudah setuju. Hadiah menaikkan kesetiaan.</span></div>`; }
  h+=`<div><dl class="kv"><dt>Level</dt><dd>${m.lv} / ${cap}${m.lv>=cap&&!nx?' (maksimal)':''}</dd></dl><div class="bar" style="margin-top:3px"><i style="width:${Math.min(100,m.exp/need*100)}%;background:var(--mana)"></i></div>
    <p class="note" style="margin-top:3px">${nx?`Berevolusi menjadi <b style="color:var(--bone)">${esc(nx.n)}</b> saat mencapai Lv${cap}. Level kembali ke 1.`:'Tahap akhir jalurnya.'}</p></div>`;
  { const el=monDefEl(m), ae=monAtkEl(m); h+=`<dl class="kv"><dt>Elemen</dt><dd>${el?`<b style="color:${ELEM_BY[el].c}">${ELEM_BY[el].n}</b>`:'Tanpa elemen'}${ae&&ae!==el?` · serangan ${ELEM_BY[ae].n}`:''}</dd>${ae?`<dt>Kuat lawan</dt><dd>${(ELEM_STRONG[ae]||[]).map(e=>ELEM_BY[e].n).join(', ')||'-'}</dd>`:''}${el?`<dt>Lemah lawan</dt><dd>${Object.keys(ELEM_STRONG).filter(k=>(ELEM_STRONG[k]||[]).includes(el)).map(e=>ELEM_BY[e].n).join(', ')||'-'}</dd>`:''}</dl>`; }
  h+=`<dl class="kv"><dt>Nyawa</dt><dd>${m.dead?`<span style="color:var(--blood)">Tumbang · bangkit ${Math.max(0,Math.ceil(m.reviveAt-G.t))} dtk (${reviveCost(m)} mana)</span>`:`${Math.round(m.hp)} / ${st.hp}`}</dd><dt>Serangan</dt><dd>${Math.round(st.atk)}</dd><dt>Pertahanan</dt><dd>${Math.round(st.def)}</dd><dt>Menghindar</dt><dd>${Math.round(st.eva*100)}%</dd><dt>Korban</dt><dd>${m.kills} petualang</dd><dt>Kesetiaan</dt><dd>${Math.round(m.loy)} / 100</dd></dl>`;
  h+=`<div class="sec"><h3>Ability ${m.abil.length}/5</h3><div class="abl">${m.abil.map((a,i)=>`<div><b>${ABIL[a].n}</b><em>${ABIL[a].k==='p'?'pasif':'aktif · '+ABIL[a].cd+' dtk'}</em>${i===0?'<em>diwariskan saat fusi</em>':''}<br><span class="note">${ABIL[a].d}</span>${m.abil.length>1?`<div class="btns" style="margin-top:3px"><button class="btn" data-forget="${a}" style="padding:2px 8px;font-size:12px">Lupakan</button></div>`:''}</div>`).join('')}</div>`;
  if(m.pending) h+=`<div class="party" style="margin-top:6px"><b style="color:var(--soul)">${esc(m.name)} ingin mempelajari ${ABIL[m.pending].n}!</b><span class="note">${ABIL[m.pending].d} Slot penuh: lupakan satu ability di atas untuk mempelajarinya, atau abaikan.</span><div class="btns"><button class="btn" data-act="skipLearn">Abaikan</button></div></div>`;
  const ls=learnset(m.sp); h+=`<div class="sec" style="margin-top:6px"><h3>Bisa dipelajari sebagai ${esc(s.n)}</h3><div class="abl">${ls.map(e=>{ const has=m.abil.includes(e.ab); return `<div style="${has?'':'opacity:.78'}"><b>${ABIL[e.ab].n}</b><em>${has?'sudah dikuasai':m.lv>=e.lv?'tersedia':'Lv'+e.lv}</em><br><span class="note">${ABIL[e.ab].d}</span></div>`; }).join('')}</div>${nx?`<p class="note">Setelah berevolusi menjadi ${esc(nx.n)}, ada ability baru lain yang bisa dipelajari.</p>`:''}</div></div>`;
  m.eq=m.eq||{};
  h+=`<div class="sec"><h3>Perlengkapan</h3><div class="abl">${Object.entries(EQ_SLOT).map(([s,nm])=>{ const it=m.eq[s]&&G.inv.find(x=>x.id===m.eq[s]); return `<div><b>${nm}:</b> ${it?`${itemName(it)} ${rarTag(it.r)}<br><span class="note">${itemTxt(it)}</span>${modsHtml(it)}`:'<span class="note">kosong</span>'}<div class="btns" style="margin-top:4px"><button class="btn" data-eqs="${s}">${it?'Ganti':'Pasang'}</button>${it?`<button class="btn" data-uneq="${s}">Lepas</button>`:''}</div></div>`; }).join('')}</div>`;
  if(UI.eqSlot){ const opts=G.inv.filter(x=>x.s===UI.eqSlot).sort((a,b)=>b.r-a.r||b.lv-a.lv);
    h+=`<div class="party" style="margin-top:6px"><b>Pilih ${EQ_SLOT[UI.eqSlot].toLowerCase()} untuk ${esc(m.name)}</b>${opts.length?opts.map(it=>{ const w=it.on&&G.mons.find(x=>x.id===it.on); return `<button class="card" data-eqi="${it.id}"><span class="t"><b>${itemName(it)} ${rarTag(it.r)}</b><span>${itemShort(it)}${w?` · dipakai ${esc(w.name)}`:''}</span></span></button>`; }).join(''):'<span class="note">Tidak ada barang jenis ini di gudang.</span>'}<div class="btns"><button class="btn" data-act="eqCancel">Tutup</button></div></div>`; }
  h+=`</div>`;
  h+=dropListHtml(monDropTable(m),'Drop ini dipungut petualang yang menumbangkan monster ini dan dibawa pulang. Kalau petualang itu tewas, barangnya hilang (tidak masuk gudang kita).');
  h+=`<div class="sec"><h3>Perintah</h3><div class="btns" style="align-items:center">
    <label class="note">Lantai <select id="mFloor">${`<option value="-1" ${m.floor<0?'selected':''}>Cadangan</option>`+Array.from({length:G.floors},(_,f)=>`<option value="${f}" ${m.floor===f&&!m.secret?'selected':''} ${floorCount(f)>=FLOOR_CAP&&m.floor!==f?'disabled':''}>L${f+1} (${floorCount(f)}/${FLOOR_CAP})</option>`).join('')}</select></label>
    <label class="note">Strategi <select id="mStrat">${Object.entries(STRAT).map(([k,v])=>`<option value="${k}" ${m.strat===k?'selected':''}>${v}</option>`).join('')}</select></label>
    <label class="note" style="display:flex;gap:4px;align-items:center"><input type="checkbox" id="mFlee" ${m.flee?'checked':''}> Mundur saat sekarat</label></div>
    <div class="btns" style="margin-top:6px"><button class="btn" data-act="gift">Beri hadiah · 40 emas</button><button class="btn" data-act="train">Latih · ${trainCost(m)} mana</button><button class="btn" data-act="fuse">Fusi…</button>${m.secret?'<button class="btn" data-act="unsecret">Keluar dari ruang rahasia</button>':''}<button class="btn warn" data-act="release">Lepas</button></div></div>`;
  if(UI.fuseA===m.id){ const others=G.mons.filter(o=>o!==m&&!o.temp);
    h+=`<div class="sec"><h3>Fusi: pilih monster yang akan dilebur</h3><p class="note">${esc(m.name)} akan mewarisi <b>ability pertama</b> monster pilihan. Monster itu hilang.</p>`;
    if(UI.fuseB){ const b=G.mons.find(x=>x.id===UI.fuseB); if(b) h+=`<div class="party"><b>${esc(b.name)} → ${esc(m.name)}</b><span>Mewarisi: ${ABIL[b.abil[0]].n} · biaya ${fuseCost(b)} emas</span><div class="btns"><button class="btn pri" data-act="fuseGo">Fusi sekarang</button><button class="btn" data-act="fuseNo">Batal</button></div></div>`; }
    h+=`<div class="grid">${others.map(o=>`<button class="card" data-fb="${o.id}"><canvas class="ic" width="32" height="36" data-sp="${o.sp}"></canvas><span class="t"><b>${esc(o.name)}</b><span>${ABIL[o.abil[0]].n}${m.abil.includes(o.abil[0])?' (sudah punya)':''}</span><span>Lv${o.lv} ${RARITY[SPECIES[o.sp].rar]}</span></span></button>`).join('')}</div></div>`; }
  if(UI.confirmRel===m.id) h+=`<div class="party"><b>Lepaskan ${esc(m.name)} selamanya?</b><div class="btns"><button class="btn warn" data-act="releaseGo">Ya, lepaskan</button><button class="btn" data-act="releaseNo">Batal</button></div></div>`;
  return {t:m.name,h};
}
/* gacha */
function pGacha(){
  let h=`<p class="note">Lingkaran pemanggilan memanggil monster <b>tahap 1</b> dengan rarity acak dari ${SPECIES_N} jenis yang dikenal di dunia ini. Peluang: N 55% · R 28% · SR 12% · SSR 4,5% · UR 0,5%${G.aura?` · Aura Seram ${G.aura} sedikit menaikkan peluang SSR`:''}.</p>
  <div class="btns"><button class="btn pri" data-g="1j">Panggil 1× · 10 jiwa</button><button class="btn pri" data-g="10j">Panggil 10× · 90 jiwa (min. 1 SR)</button><button class="btn" data-g="1g">Panggil 1× · 350 emas</button></div>`;
  if(UI.gres&&UI.gres.length){ h+=`<div class="sec"><h3>Hasil</h3><div class="gres">${UI.gres.map(id=>{ const m=G.mons.find(x=>x.id===id); if(!m) return ''; const s=SPECIES[m.sp]; return `<div style="border-color:${RAR_COL[RARITY[s.rar]]}"><canvas width="32" height="36" data-sp="${m.sp}"></canvas>${rarTag(s.rar)}<span>${esc(s.n)}</span></div>`; }).join('')}</div><p class="note">Monster baru langsung ditempatkan di lantai yang masih kosong, atau di cadangan.</p></div>`; }
  return {t:'Pemanggilan',h};
}
/* petualang */
function pAdv(){
  const inside=G.parties.filter(p=>p.state==='in');
  let h=`<div class="sec"><h3>Di dalam kastil (${inside.length})</h3>${inside.length?inside.map(pa=>{ const mem=G.advs.filter(a=>a.party===pa.id);
    return `<div class="party"><b>${esc(pa.name)}${pa.hero?' <span style="color:var(--gold)">★ Pahlawan</span>':''}</b><span class="note">"${esc(pa.quote)}" · titik simpan L${pa.saveFloor+1} · ${PSTYLE_N[partyStyle(pa)]}${pa.pushOn?' · <b style="color:#ff8a6a">pantang mundur!</b>':''}${pa.loot?` · harta ${pa.loot}`:''}</span><div class="mem">${mem.map(a=>{ const p=G.people[a.pid]; const s=advStats(p); return `<span class="link" data-adv="${p.id}" role="button" tabindex="0" style="cursor:pointer;color:var(--bone)">${esc(p.name)}</span> <span>${jobTag(p.job)} Lv${p.lv} · L${a.floor+1} · ${Math.max(0,Math.round(a.hp/s.hp*100))}%</span>`; }).join(' ')}</div></div>`; }).join(''):'<p class="note">Sepi. Petualang berikutnya sedang dalam perjalanan.</p>'}</div>`;
  h+=`<div class="sec"><h3>Pembunuh Raja Iblis</h3>${G.hall.length?`<ul class="log">${G.hall.slice(0,12).map(x=>`<li class="lord">Hari ${x.d}: ${esc(x.lord)} (Lv${x.lv}) tumbang oleh ${esc(x.by)}, pukulan terakhir ${esc(x.hero)}. Bertahan ${Math.round(x.lived/DAY_LEN*10)/10} hari.</li>`).join('')}</ul>`:'<p class="note">Belum ada. Semoga tetap begitu.</p>'}</div>`;
  h+=`<div class="sec"><h3>Catatan kastil</h3><ul class="log">${G.log.slice(0,60).map(l=>`<li class="${l.c}">H${l.d}: ${esc(l.s)}</li>`).join('')}</ul></div>`;
  return {t:'Petualang',h};
}
function pAdvOne(){
  const p=G.people[UI.advId]; if(!p) return {t:'Petualang',h:'<p class="note">Tidak ditemukan.</p>'};
  const a=G.advs.find(x=>x.pid===p.id); const pa=G.parties.find(x=>x.id===p.party); const s=advStats(p);
  const h=`<div class="mhead"><canvas width="32" height="36" data-adv="${p.id}"></canvas><div class="nm"><b>${esc(p.name)}</b><span>${p.title?esc(p.title)+' · ':''}${jobTag(p.job)} Lv${p.lv}</span><span class="note">${p.isekai?'🌀 Orang dunia lain':raceName(p.race)}${pa?' · '+esc(pa.name):''}</span>${p.isekai?`<span class="note" style="color:#9fd0ff">Skill curang: ${esc(p.cheat||'Status Window')} · stat +20%</span>`:''}</div></div>
  <dl class="kv"><dt>Nyawa</dt><dd>${a?Math.max(0,Math.round(a.hp)):'-'} / ${s.hp}</dd><dt>Serangan</dt><dd>${Math.round(s.atk)}</dd><dt>Pertahanan</dt><dd>${Math.round(s.def)}</dd><dt>Menghindar</dt><dd>${Math.round(s.eva*100)}%</dd><dt>Skill</dt><dd>${JOBS[p.job].skill.n}</dd><dt>Elemen</dt><dd>${p.el?`<b style="color:${ELEM_BY[p.el].c}">${ELEM_BY[p.el].n}</b>`:'Fisik'}</dd><dt>Emas dibawa</dt><dd>${Math.round(p.gold)}</dd><dt>Watak</dt><dd>${TRAIT_N[traitOf(p)]}</dd><dt>Tas</dt><dd>${itemsTxt(p)}</dd>${p.replaces?`<dt>Menggantikan</dt><dd>${esc(p.replaces)} (gugur)</dd>`:''}${pa&&pa.mem&&pa.mem.fallen.length?`<dt>Kawan gugur</dt><dd>${pa.mem.fallen.slice(-4).map(x=>esc(x.name)).join(', ')}</dd>`:''}<dt>Barang jarahan</dt><dd>${(p.bag||[]).length?(p.bag||[]).slice(-6).map(e=>esc(e.n)).join(', '):'-'}</dd><dt>Monster dibunuh</dt><dd>${p.kills}</dd><dt>Kunjungan</dt><dd>${p.visits}</dd><dt>Posisi</dt><dd>${a?'Lantai '+(a.floor+1):p.alive?'Di kota':'Tewas'}</dd></dl>`;
  return {t:'Petualang',h:h+dropListHtml(advDropTable(p),'Kalau petualang ini tewas di kastil, kita dapat emas, mana, dan jiwa. Kadang ia juga menjatuhkan perlengkapan khas kelasnya; kelas berbintang tinggi lebih sering dan lebih langka.')};
}
/* raja */
function pRaja(){
  const L=G.lord, r=lordRace(), st=lordStats(); const need=Math.round(30*Math.pow(L.lv,1.4));
  let h=`<div class="mhead"><canvas width="32" height="36" data-lord="1"></canvas><div class="nm"><b>${esc(L.name)}</b><span>Raja Iblis ras ${r.n} · Lv${L.lv}</span><span class="note">${r.d}</span></div></div>
  <div class="bar"><i style="width:${Math.min(100,L.exp/need*100)}%;background:var(--gold)"></i></div><p class="note">Raja mendapat pengalaman setiap kali monster mana pun membunuh petualang.</p>
  <dl class="kv"><dt>Nyawa</dt><dd>${Math.max(0,Math.round(L.hp))} / ${st.hp}</dd><dt>Serangan</dt><dd>${Math.round(st.atk)}</dd><dt>Pertahanan</dt><dd>${Math.round(st.def)}</dd><dt>Bertahta</dt><dd>${Math.round((G.t-G.lordSince)/DAY_LEN*10)/10} hari</dd><dt>Dibunuh sendiri</dt><dd>${L.kills} petualang</dd></dl>`;
  h+=`<div class="sec"><h3>Kastil</h3><dl class="kv"><dt>Lantai</dt><dd>${G.floors} / ${MAX_FLOORS}</dd><dt>Popularitas</dt><dd>${Math.round(G.pop)} · petualang setara Lv${Math.round(fameLv())}</dd><dt>Aura Seram</dt><dd>${G.aura}</dd><dt>Petualang tewas</dt><dd>${G.stats.kills}</dd><dt>Kunjungan</dt><dd>${G.stats.visits}</dd><dt>Peti dijarah</dt><dd>${G.stats.chests}</dd><dt>Raja Iblis tumbang</dt><dd>${G.stats.lords}</dd></dl></div>`;
  h+=`<div class="sec"><h3>Permainan</h3><div class="btns"><button class="btn" data-act="save">Simpan sekarang</button><button class="btn warn" data-act="newgame">Mulai dari awal…</button></div>${UI.confirmNew?`<div class="party" style="margin-top:6px"><b>Hapus kastil ini dan mulai lagi?</b><div class="btns"><button class="btn warn" data-act="newgameGo">Ya, mulai baru</button><button class="btn" data-act="newgameNo">Batal</button></div></div>`:''}<p class="note">Permainan tersimpan otomatis di perangkat ini.</p></div>`;
  return {t:'Raja Iblis',h};
}
/* fasilitas terpasang */
function pFix(){
  const {f,i}=UI.sel; const fx=G.fix[f]&&G.fix[f][i]; if(!fx) return {t:'Petak',h:'<p class="note">Petak kosong.</p>'};
  const name=fx.t==='chest'?`Chest ${fx.r}`:FIX[fx.t].n;
  let h=`<div class="mhead"><canvas width="32" height="36" data-fix='${JSON.stringify(fx)}'></canvas><div class="nm"><b>${name}</b><span class="note">Lantai ${f+1} · petak ${i+1}</span></div></div>`;
  if(fx.t==='rest'){ const here=G.advs.filter(a=>a.floor===f&&a.resting); const saved=f>0?G.parties.filter(p=>p.state!=='gone'&&p.saveFloor===f&&partyMembers(p).length):[];
    h+=`<p class="note">${FIX.rest.d} Biaya ${8+f*4} emas per orang.</p><dl class="kv"><dt>Dipakai</dt><dd>${fx.uses||0} kali</dd><dt>Pemasukan</dt><dd>${fmt(fx.earn||0)} emas</dd><dt>Tamu terakhir</dt><dd>${fx.last?esc(fx.last):'-'}</dd></dl>
    <div class="sec"><h3>Sedang beristirahat (${here.length})</h3>${here.length?`<div class="grid">${here.map(a=>{ const p=G.people[a.pid]; const s=advStats(p); return `<button class="card" data-adv="${p.id}"><canvas class="ic" width="32" height="36" data-adv="${p.id}"></canvas><span class="t"><b>${esc(p.name)}</b><span>${JOBS[p.job].n} Lv${p.lv} · ${Math.round(a.hp/s.hp*100)}%</span></span></button>`; }).join('')}</div>`:'<p class="note">Api unggun menyala, tapi belum ada tamu.</p>'}</div>
    <div class="sec"><h3>Party yang menyimpan kemajuan di sini (${saved.length})</h3>${f===0?'<p class="note">Lantai 1 adalah pintu masuk, jadi tidak jadi titik simpan. Pasang di lantai atas supaya party kembali lewat sini.</p>':saved.length?`<ul class="log">${saved.slice(0,12).map(p=>`<li class="adv">${esc(p.name)} · ${partyMembers(p).map(x=>JOBS[x.job].n+' Lv'+x.lv).join(', ')} · ${p.state==='in'?'sedang di kastil':'di kota'}</li>`).join('')}</ul>`:'<p class="note">Belum ada.</p>'}</div>`; }
  else if(fx.t==='chest') h+=`<p class="note">Petualang yang membukanya mendapat perlengkapan dan emas senilai sekitar ${fmt(chestCost(fx.r))}. Popularitas naik saat dijarah.</p>`;
  else h+=`<p class="note">${FIX[fx.t].d}</p>`;
  if(FIX[fx.t]&&FIX[fx.t].cat==='jebakan') h+=`<dl class="kv"><dt>Level</dt><dd>${fx.lv||1} / 10</dd><dt>Terpicu</dt><dd>${fx.hits||0} kali</dd></dl><div class="btns"><button class="btn pri" data-act="trapUp" ${(fx.lv||1)>=10?'disabled':''}>Naikkan level · ${trapUpCost(fx)} mana</button></div>`;
  if(fx.t==='rahasia'){ const gs=secretMons(fx);
    h+=`<dl class="kv"><dt>Status</dt><dd>${fx.found?'<span style="color:#ff9aa8">Ditemukan petualang!</span>':'Tersembunyi dari petualang'}</dd><dt>Penjaga</dt><dd>${gs.length} / ${SECRET_MAX}</dd></dl>`;
    if(gs.length) h+=`<div class="grid">${gs.map(o=>`<div class="card"><canvas class="ic" width="32" height="36" data-sp="${o.sp}"></canvas><span class="t"><b>${esc(o.name)} ${rarTag(SPECIES[o.sp].rar)}</b><span>${esc(SPECIES[o.sp].n)} Lv${o.lv}${o.dead?' · tumbang':''}</span><button class="btn" data-unguard="${o.id}" style="padding:2px 8px;font-size:12px">Keluarkan</button></span></div>`).join('')}</div>`;
    if(gs.length<SECRET_MAX) h+=`<div class="sec"><h3>Pilih monster untuk masuk</h3><p class="note">Hanya Thief dan Ranger yang bisa menemukan ruang ini. Kalau semua penjaga dikalahkan, petualang membawa harta rahasia dan kastil makin terkenal.</p><div class="grid">${G.mons.filter(x=>!x.temp&&!x.secret).map(o=>`<button class="card" data-guard="${o.id}"><canvas class="ic" width="32" height="36" data-sp="${o.sp}"></canvas><span class="t"><b>${esc(o.name)} ${rarTag(SPECIES[o.sp].rar)}</b><span>${esc(SPECIES[o.sp].n)} Lv${o.lv} · ${o.floor<0?'cadangan':'L'+(o.floor+1)}</span></span></button>`).join('')}</div></div>`; }
  h+=`<div class="btns"><button class="btn" data-act="move">Pindahkan (gratis)</button><button class="btn warn" data-act="sell">${fx.t==='chest'?'Ambil kembali (tanpa uang)':`Bongkar (kembali ${fmt(Math.round(fixCost(fx)*.5))} emas)`}</button></div>${fx.t==='rahasia'&&secretMons(fx).length?'<p class="note">Kalau dibongkar, penjaganya kembali ke lantai ini.</p>':''}`;
  return {t:name,h};
}
/* ---------- aksi ---------- */
function act(a,el){
  let err=null;
  const m=UI.monId&&G.mons.find(x=>x.id===UI.monId);
  if(a==='floor'){ err=buyFloor(); if(!err){ toast(`Lantai ${G.floors} dibangun!`); scrollToFloor(topF()); } }
  else if(a==='rename'&&m){ const v=$('nmIn').value; const r=askRename(m,v); if(r.msg) toast(r.msg); else { UI.rnReply={id:m.id,ok:r.ok,reply:r.reply,alt:r.alt}; UI.nmDraft=r.ok?null:{id:m.id,v}; if(m.floor>=0) say(m.x,m.floor,r.ok?'♪':'Hmph!',r.ok?'#9fff9a':'#ff9aa8',1.2); if(r.ok) log(`${r.old} setuju dipanggil ${m.name} mulai sekarang.`,'evo'); } }
  else if(a==='takeAlt'&&m&&UI.rnReply&&UI.rnReply.alt){ const old=m.name; acceptAlt(m,UI.rnReply.alt); UI.rnReply={id:m.id,ok:true,reply:'Hihi, nama pilihanku memang paling keren!'}; UI.nmDraft=null; log(`${old} kini bernama ${m.name}, nama pilihannya sendiri.`,'evo'); }
  else if(a==='gift'&&m){ if(G.gold<40) err='Emas kurang.'; else { G.gold-=40; m.loy=Math.min(100,m.loy+12); monGainExp(m,monNeed(m)*.1); toast(`${m.name} senang sekali!`); if(m.floor>=0) say(m.x,m.floor,'♥','#ff7ab0',1.4); } }
  else if(a==='train'&&m){ err=trainMon(m); if(!err) toast(`${m.name} berlatih keras.`); }
  else if(a==='fuse'&&m){ UI.fuseA=UI.fuseA===m.id?null:m.id; UI.fuseB=null; }
  else if(a==='fuseNo'){ UI.fuseB=null; }
  else if(a==='tabGudang'){ openPanel('gudang'); return; }
  else if(a==='tabMon'){ openPanel('monster'); return; }
  else if(a==='eqCancel'){ UI.eqSlot=null; }
  else if(a==='skipLearn'&&m){ skipLearn(m); }
  else if(a==='buyRune'){ const r=buyRune(); if(typeof r==='string') err=r; else toast(`Dapat ${runeName(r)}!`); }
  else if(a==='repairAll'){ const r=repairAll(); if(r) err=r; else toast('Semua perlengkapan diperbaiki.'); }
  else if(a==='buyItem'){ const r=buyItem(); if(typeof r==='string') err=r; else toast(`Dapat ${r.n} (${RARITY[r.r]})!`); }
  else if(a==='fuseGo'&&m){ const b=G.mons.find(x=>x.id===UI.fuseB); if(b){ err=fuseMons(m,b); if(!err){ toast('Fusi berhasil!'); UI.fuseB=null; UI.fuseA=null; } } }
  else if(a==='release'&&m) UI.confirmRel=m.id;
  else if(a==='releaseNo') UI.confirmRel=null;
  else if(a==='releaseGo'&&m){ if(m.secret) clearSecret(m); G.mons=G.mons.filter(x=>x!==m); UI.confirmRel=null; toast(`${m.name} kembali ke alam liar.`); openPanel('monster'); return; }
  else if(a==='unsecret'&&m){ clearSecret(m); toast(`${m.name} keluar dari ruang rahasia.`); }
  else if(a==='trapUp'){ err=upgradeTrap(UI.sel.f,UI.sel.i); }
  else if(a==='sell'){ removeFix(UI.sel.f,UI.sel.i); closePanel(); toast('Dibongkar.'); return; }
  else if(a==='move'){ const s=UI.sel; closePanel(); UI.placing={move:{f:s.f,i:s.i},t:'_'}; $('placebar').hidden=false; $('placeTxt').textContent='Ketuk petak kosong tujuan.'; return; }
  else if(a==='save'){ toast(saveGame()?'Tersimpan.':'Tidak bisa menyimpan di perangkat ini.'); }
  else if(a==='newgame') UI.confirmNew=true;
  else if(a==='newgameNo') UI.confirmNew=false;
  else if(a==='newgameGo'){ UI.confirmNew=false; EFX.length=0; TIMERS.length=0; newGame(); saveGame(); closePanel(); $('ticker').innerHTML=''; scrollToFloor(0); toast('Kastil baru berdiri.'); return; }
  if(err) toast(err);
  renderPanel();
}
function onCanvasTap(hit){
  if(UI.placing){
    if(hit.k==='slot'){ if(G.fix[hit.f][hit.i]){ toast('Petak itu sudah terisi.'); return; } if(UI.placing.move){ const mv=UI.placing.move; const err=moveFix(mv.f,mv.i,hit.f,hit.i); if(err) toast(err); else toast('Dipindahkan.'); stopPlacing(); return; } const err=orderPlace(hit.f,hit.i,UI.placing); if(err) toast(err); else toast('Mira berangkat memasang!'); }
    return; }
  if(hit.k==='m'){ UI.monId=hit.id; UI.fuseA=null; UI.eqSlot=null; UI.sel={k:'m',id:hit.id}; openPanel('mon'); return; }
  if(hit.k==='a'){ UI.advId=hit.id; openPanel('adv'); return; }
  if(hit.k==='l'){ openPanel('raja'); return; }
  if(hit.k==='slot'){ if(G.fix[hit.f][hit.i]){ UI.sel={k:'fix',f:hit.f,i:hit.i}; openPanel('fix'); } else { UI.target={f:hit.f,i:hit.i}; openPanel('bangun'); } }
}
function startPlacing(fx){
  if(UI.target){ const t=UI.target; UI.target=null; const err=orderPlace(t.f,t.i,fx); if(err) toast(err); else toast('Mira berangkat memasang!'); closePanel(); return; }
  UI.placing=fx; closePanel(); $('placebar').hidden=false; $('placeTxt').textContent=`Ketuk petak kosong untuk ${fx.t==='chest'?'Chest '+fx.r:FIX[fx.t].n} (${fmt(fixCost(fx))} emas). Bisa beberapa kali.`;
}
function stopPlacing(){ UI.placing=null; $('placebar').hidden=true; }
/* ---------- pengikat event ---------- */
function bindUI(){
  $('sheetX').onclick=closePanel;
  $('placeCancel').onclick=stopPlacing;
  $('mira').onclick=nextTip;
  $('bTop').onclick=()=>{ RC.follow=false; $('bFollow').setAttribute('aria-pressed','false'); scrollToFloor(topF()); };
  $('bBot').onclick=()=>{ RC.follow=false; $('bFollow').setAttribute('aria-pressed','false'); scrollToFloor(0); };
  $('bFollow').onclick=()=>{ RC.follow=!RC.follow; $('bFollow').setAttribute('aria-pressed',String(RC.follow)); };
  for(const b of document.querySelectorAll('#spd button')) b.onclick=()=>{ UI.speed=+b.dataset.s; for(const o of document.querySelectorAll('#spd button')) o.setAttribute('aria-pressed',String(o===b)); };
  for(const b of document.querySelectorAll('#nav button')) b.onclick=()=>{ if(UI.panel===b.dataset.p){ closePanel(); return; } UI.target=null; openPanel(b.dataset.p); };
  const B=$('sheetB');
  B.addEventListener('click',e=>{
    const t=e.target.closest('[data-act],[data-buy],[data-mon],[data-g],[data-fb],[data-guard],[data-unguard],[data-adv],[data-eqs],[data-uneq],[data-eqi],[data-forge],[data-sell],[data-forget],[data-repair],[data-sock],[data-rsel],[data-unsock],[data-addsock],[data-merge]'); if(!t) return;
    if(t.dataset.act) return act(t.dataset.act,t);
    if(t.dataset.buy) return startPlacing(JSON.parse(t.dataset.buy));
    if(t.dataset.mon){ UI.monId=+t.dataset.mon; UI.fuseA=null; UI.sel={k:'m',id:UI.monId}; openPanel('mon'); const m=G.mons.find(x=>x.id===UI.monId); if(m&&m.floor>=0){ RC.follow=false; $('bFollow').setAttribute('aria-pressed','false'); scrollToFloor(m.floor); } return; }
    if(t.dataset.g){ const n=t.dataset.g.startsWith('10')?10:1; const r=gacha(n,t.dataset.g.endsWith('g')?'gold':'jiwa'); if(r.err) toast(r.err); else { UI.gres=r.out.map(m=>m.id); const best=Math.max(...r.out.map(m=>SPECIES[m.sp].rar)); if(best>=3) miraTip(`Kyaa~ ${RARITY[best]} pertama kita! Yang Mulia beruntung sekali!`,'rar'+best); } renderPanel(); return; }
    if(t.dataset.fb){ UI.fuseB=+t.dataset.fb; renderPanel(); return; }
    if(t.dataset.guard){ const {f,i}=UI.sel; const m=G.mons.find(x=>x.id===+t.dataset.guard); if(m){ const err=addSecret(f,i,m); toast(err||`${m.name} masuk ke ruang rahasia.`); renderPanel(); } return; }
    if(t.dataset.unguard){ const m=G.mons.find(x=>x.id===+t.dataset.unguard); if(m){ clearSecret(m); m.px=SLOT_X(ri(1,8)); toast(`${m.name} keluar dari ruang rahasia.`); renderPanel(); } return; }
    if(t.dataset.adv){ UI.advId=+t.dataset.adv; openPanel('adv'); return; }
    const mm=UI.monId&&G.mons.find(x=>x.id===UI.monId);
    if(t.dataset.forget&&mm){ const err=forgetAbil(mm,t.dataset.forget); toast(err||`${mm.name} melupakan ${ABIL[t.dataset.forget].n}.`); renderPanel(); return; }
    if(t.dataset.eqs){ UI.eqSlot=UI.eqSlot===t.dataset.eqs?null:t.dataset.eqs; renderPanel(); return; }
    if(t.dataset.uneq&&mm){ unequip(mm,t.dataset.uneq); renderPanel(); return; }
    if(t.dataset.eqi&&mm){ const it=G.inv.find(x=>x.id===+t.dataset.eqi); const err=equipItem(mm,it); toast(err||`${mm.name} memakai ${it.n}.`); UI.eqSlot=null; renderPanel(); return; }
    if(t.dataset.forge){ const it=G.inv.find(x=>x.id===+t.dataset.forge); const err=it&&forgeItem(it); toast(err||`${it.n} kini +${it.lv}!`); renderPanel(); return; }
    if(t.dataset.repair){ const it=G.inv.find(x=>x.id===+t.dataset.repair); const err=it&&repairItem(it); toast(err||`${it.n} diperbaiki.`); renderPanel(); return; }
    if(t.dataset.sock){ UI.sockFor=UI.sockFor===+t.dataset.sock?null:+t.dataset.sock; renderPanel(); return; }
    if(t.dataset.rsel){ const [iid,rid]=t.dataset.rsel.split(':').map(Number); const it=G.inv.find(x=>x.id===iid); const err=it&&socketRune(it,rid); toast(err||'Rune terpasang!'); UI.sockFor=null; renderPanel(); return; }
    if(t.dataset.unsock){ const [iid,ix]=t.dataset.unsock.split(':').map(Number); const it=G.inv.find(x=>x.id===iid); const err=it&&unsocketRune(it,ix); toast(err||'Rune dicabut dan kembali ke gudang.'); renderPanel(); return; }
    if(t.dataset.addsock){ const it=G.inv.find(x=>x.id===+t.dataset.addsock); const err=it&&addSocket(it); toast(err||'Slot rune bertambah!'); renderPanel(); return; }
    if(t.dataset.merge){ const [k,g]=t.dataset.merge.split(':'); const r=mergeRunes(k,+g); toast(typeof r==='string'?r:`Jadi ${runeName(r)}!`); renderPanel(); return; }
    if(t.dataset.sell){ const it=G.inv.find(x=>x.id===+t.dataset.sell); if(it){ sellItem(it); toast(`Terjual ${itemValue(it)} emas.`); } renderPanel(); return; }
  });
  B.addEventListener('change',e=>{
    const m=UI.monId&&G.mons.find(x=>x.id===UI.monId);
    if(e.target.id==='autoChest') G.settings.autoChest=e.target.checked;
    if(!m) return;
    if(e.target.id==='mFloor'){ const f=+e.target.value; if(f>=0&&floorCount(f)>=FLOOR_CAP&&m.floor!==f){ toast('Lantai itu penuh.'); renderPanel(); return; } if(m.secret) clearSecret(m); m.floor=f; m.px=SLOT_X(ri(1,8)); m.x=m.px; if(f>=0){ RC.follow=false; $('bFollow').setAttribute('aria-pressed','false'); scrollToFloor(f); } toast(f<0?`${m.name} istirahat di cadangan.`:`${m.name} pindah ke lantai ${f+1}.`); renderPanel(); }
    if(e.target.id==='mStrat'){ m.strat=e.target.value; m.revealed=0; m.hidden=false; toast(`Strategi ${m.name}: ${STRAT[m.strat]}.`); }
    if(e.target.id==='mFlee'){ m.flee=e.target.checked; }
  });
  // ikon navigasi
  const ic={bangun:null,monster:null,panggil:g=>{ g.strokeStyle='#c78aff'; g.lineWidth=2; g.beginPath(); g.arc(16,20,10,0,6.3); g.stroke(); g.fillStyle='#ffd36a'; g.fillRect(15,9,3,3); g.fillRect(6,22,3,3); g.fillRect(24,22,3,3); },
    petualang:g=>g.drawImage(sprite({race:'manusia',stage:'dewasa',job:'ksatria',sex:'m',skin:'#f1c9a5',hair:'#6a4a2a',eye:'#2a1e2a',cloth:'#5b7aa8',cloth2:'#3f4a6a',outfit:'tunik',style:'short'},'side',0),0,0),raja:g=>g.drawImage(sprite({race:'iblis',stage:'dewasa',job:'rajaIblis',sex:'m',skin:RACE.iblis.skin[0],hair:RACE.iblis.hair[0],eye:'#ff3040',cloth:'#2a1a2a',cloth2:'#5a1a2a',outfit:'mantel',style:'long'},'side',0),0,0)};
  ic.monster=null;
  for(const cv of document.querySelectorAll('canvas[data-ic]')){ const k=cv.dataset.ic; if(k==='monster') iconSpr(cv,monSpr('slime',0)); else if(k==='bangun') iconFix(cv,{t:'chest',r:'A'}); else if(k==='petualang'||k==='raja'){ const c=document.createElement('canvas'); c.width=32; c.height=36; ic[k](c.getContext('2d')); iconSpr(cv,c); } else paintIcon(cv,ic[k]); }
  iconSpr($('miraCv'),assistSpr(0));
}
function updateHUD(){
  $('rMana').textContent=fmt(G.mana); $('rGold').textContent=fmt(G.gold); $('rJiwa').textContent=fmt(G.jiwa); $('rPop').textContent=fmt(G.pop);
  $('day').textContent=`Hari ${G.day} · ${G.floors} lantai`;
}
/* ---------- kamera ikut ---------- */
function followCam(dt){
  if(!RC.follow) return;
  let f=null; for(const a of G.advs) if(f==null||a.floor>f) f=a.floor;
  if(f==null) f=G.assist.q.length?G.assist.f:0;
  const vh=(RC.h-(RC.padB||0))/RC.s; const goal=clamp(floorTop(f)+FH/2-vh*.45,Math.min(0,worldH()-vh),Math.max(0,worldH()-vh));
  RC.camY+=(goal-RC.camY)*Math.min(1,dt*2.5);
}
/* ---------- loop ---------- */
let lastT=0, acc=0, saveAcc=0, hudAcc=0;
function frame(ts){
  const real=Math.min(.25,(ts-(lastT||ts))/1000); lastT=ts;
  acc+=real*UI.speed; let n=0; while(acc>=DT&&n<40){ step(); acc-=DT; n++; } if(n>=40) acc=0;
  { const sh=$('sheet'); RC.padB=sh.hidden?0:sh.offsetHeight*(RC.cv.width/RC.cv.getBoundingClientRect().width); }
  for(let i=EFX.length-1;i>=0;i--){ EFX[i].t-=real*(UI.speed?Math.min(UI.speed,1.5):0); if(EFX[i].t<=0) EFX.splice(i,1); }
  followCam(real); render();
  hudAcc+=real; if(hudAcc>.25){ hudAcc=0; updateHUD(); }
  if(UI.panel&&['mon','petualang','raja','adv','fix','tetangga','nmon'].includes(UI.panel)&&performance.now()-UI.lastRefresh>1000&&!(document.activeElement&&['INPUT','SELECT'].includes(document.activeElement.tagName))) renderPanel();
  saveAcc+=real; if(saveAcc>15){ saveAcc=0; saveGame(); }
  requestAnimationFrame(frame);
}
function boot(data){
  if(data&&data.G){ G=data.G; } else if(!loadGame()) newGame();
  initCanvas($('cv')); bindUI(); updateHUD(); miraTip('Selamat datang, Yang Mulia! Ketuk petak kosong untuk memasang jebakan atau peti. Ketuk saya kapan saja untuk laporan kastil.','welcome');
  scrollToFloor(0);
  document.addEventListener('visibilitychange',()=>{ if(document.hidden) saveGame(); });
  window.claude?.hot?.snapshot?.(()=>({G}));
  requestAnimationFrame(frame);
}
window.claude?.hot?.ready ? window.claude.hot.ready(boot) : boot(window.claude?.hot?.data ?? {});
