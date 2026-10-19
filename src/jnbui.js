/* =====================================================================
   TAKHTA JURANG — UI tetangga: daftar, telepati, kunjungan, tukar
   ===================================================================== */
function nbById(id){ return (G.nbs||[]).find(n=>n.id===+id); }
function visNb(){ return G&&!G.isNeighbor&&G.visit?nbById(G.visit):null; }
function relBar(r){ const c=r>=80?'#ff7ad0':r>=60?'#ffb04a':r>=40?'#7ad07a':r>=20?'#7ab0e0':'#8a8a9a'; return `<span class="dur" style="height:5px"><i style="width:${r}%;background:${c}"></i></span><span class="note">Hubungan ${Math.round(r)}/100 · <b style="color:${c}">${relTier(r)}</b></span>`; }
function nbLordLine(nb){ const w=nb.w; return `${esc(w.lord.name)} sang ${nbRaceN(w)}`; }
function pTetangga(){ nbInit(); let h=`<p class="note">Raja Iblis lain di sekitar jurang. Kita bisa bertelepati, saling membantu, berkunjung untuk menonton dungeon mereka, dan bertukar monster. Kalau hubungan sudah <b>Sahabat (60+)</b> saat mereka tumbang, separuh EXP seumur hidupnya diwariskan ke Raja Iblis-mu.</p><div class="abl">`;
  for(const nb of G.nbs){ const w=nb.w; const vis=G.visit===nb.id;
    h+=`<div class="nbcard"><div style="display:flex;gap:8px;align-items:center"><canvas class="ic" width="32" height="36" data-nbl="${nb.id}"></canvas><div style="flex:1"><b>${nbLordLine(nb)}</b> <em>Lv${w.lord.lv}</em><em>${NB_PERS_N[nb.pers]}</em><br><span class="note">${esc(nb.dname)} · ${w.floors} lantai · ${w.mons.length} monster</span></div></div>
      ${relBar(nb.rel)}${nb.need&&nb.needShown?`<span class="note" style="color:#ffd0a0">💬 ${needShort(nb.need)}</span>`:''}${nb.past.length?`<span class="note">Mendiang: ${nb.past.slice(0,3).map(p=>esc(p.name)).join(', ')}</span>`:''}
      <span class="btns" style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap"><button class="btn pri" data-nba="chat:${nb.id}">Telepati${nb.unread?` <b class="badge">${nb.unread}</b>`:''}</button>${vis?`<button class="btn" data-nba="home">Pulang</button>`:`<button class="btn" data-nba="visit:${nb.id}">Kunjungi</button>`}</span></div>`; }
  return {t:'Tetangga',h:h+'</div>'}; }
function pNChat(){ const nb=nbById(UI.nbId); if(!nb) return {t:'Telepati',h:'<p class="note">Tidak ditemukan.</p>'}; nb.unread=0; const w=nb.w;
  let h=`<div style="display:flex;gap:8px;align-items:center"><canvas class="ic" width="32" height="36" data-nbl="${nb.id}"></canvas><div style="flex:1"><b>${nbLordLine(nb)}</b> <em>${NB_PERS_N[nb.pers]}</em><br><span class="note">${esc(nb.dname)} · ${w.floors} lantai · Lv${w.lord.lv}</span></div></div>${relBar(nb.rel)}
  <div class="chat" id="chatBox">${nb.chat.slice(-30).map(c=>`<div class="cm ${c.f}">${c.f==='them'?`<b>${esc(w.lord.name)}:</b> `:''}${esc(c.s)}</div>`).join('')}</div>`;
  const n=nb.need;
  h+=`<div class="btns" style="display:flex;flex-wrap:wrap;gap:4px"><button class="btn" data-nba="greet:${nb.id}">Sapa</button><button class="btn" data-nba="ask:${nb.id}">Tanya kabar</button><button class="btn" data-nba="comfort:${nb.id}">Hibur</button></div>
  <div class="sec"><h3>Kirim bantuan</h3>${n&&nb.needShown?`<p class="note" style="color:#ffd0a0">Mereka ${needShort(n)}. Bantuan yang cocok menaikkan hubungan jauh lebih banyak.</p>`:''}
  <div class="btns" style="display:flex;flex-wrap:wrap;gap:4px"><button class="btn" data-nba="gold:${nb.id}:100">100 emas</button><button class="btn" data-nba="gold:${nb.id}:500">500 emas</button>${n&&n.k==='gold'&&nb.needShown?`<button class="btn pri" data-nba="gold:${nb.id}:${n.n}">${n.n} emas (sesuai kebutuhan)</button>`:''}
  <button class="btn" data-nba="jiwa:${nb.id}:10">10 Kristal Jiwa</button>${n&&n.k==='jiwa'&&nb.needShown?`<button class="btn pri" data-nba="jiwa:${nb.id}:${n.n}">${n.n} Kristal Jiwa</button>`:''}<button class="btn" data-nba="sendmon:${nb.id}">Kirim monster…</button></div></div>
  <div class="btns" style="display:flex;gap:4px;margin-top:6px">${G.visit===nb.id?'<button class="btn" data-nba="home">Pulang ke dungeon sendiri</button>':`<button class="btn pri" data-nba="visit:${nb.id}">Kunjungi ${esc(nb.dname)}</button>`}<button class="btn" data-nba="list">Daftar tetangga</button></div>`;
  return {t:'Telepati',h}; }
function reserveMons(){ return G.mons.filter(m=>m.floor<0&&!m.temp&&!m.dead); }
function monCardNb(m,act,nb){ const s=SPECIES[m.sp]; const fit=nb&&monFitsNeed(m,nb.need)&&nb.needShown; return `<button class="card" data-nba="${act}"><canvas class="ic" width="32" height="36" data-sp="${m.sp}"></canvas><span class="t"><b>${esc(m.name)} ${rarTag(s.rar)}</b><span>${esc(s.n)} · Lv${m.lv} · peringkat ${s.rank} · nilai ±${monValue(m)}${fit?' · <b style="color:#ffd0a0">cocok dengan kebutuhan</b>':''}</span></span></button>`; }
function pNSend(){ const nb=nbById(UI.nbId); if(!nb) return {t:'Kirim monster',h:''}; const list=reserveMons();
  return {t:'Kirim monster',h:`<p class="note">Pilih monster dari cadangan untuk dihadiahkan ke ${nbLordLine(nb)}. Monster yang sedang menjaga lantai harus dipindah ke Cadangan dulu (detail monster → Lantai: Cadangan). Perlengkapannya kembali ke gudangmu.</p>${list.length?`<div class="grid1">${list.map(m=>monCardNb(m,`givemon:${nb.id}:${m.id}`,nb)).join('')}</div>`:'<p class="note">Cadangan kosong.</p>'}<div class="btns"><button class="btn" data-nba="chat:${nb.id}">Kembali</button></div>`}; }
function pNMon(){ const nb=visNb(); const m=nb&&nb.w.mons.find(x=>x.id===UI.nmId); if(!m) return {t:'Monster tetangga',h:'<p class="note">Monster ini sudah tidak ada di sini.</p>'}; const s=SPECIES[m.sp];
  const lock=nbTradeLocked(nb,m); const pr=nbTradePrice(nb,m); const list=reserveMons();
  let h=`<div class="mhead"><canvas width="32" height="36" data-sp="${m.sp}"></canvas><div class="nm"><b>${esc(m.name)}</b><span>${esc(s.n)} ${rarTag(s.rar)}</span><span class="note">Milik ${nbLordLine(nb)} · Lantai ${m.floor+1} · Lv${m.lv} · tahap ${s.stage} · peringkat ${s.rank}</span></div></div>
  <div class="abl"><div>${m.abil.map(a=>ABIL[a]?ABIL[a].n:a).join(' · ')}<br><span class="note">Nilai ±${monValue(m)} · ${esc(MON[s.mk].d||'')}</span></div></div>${relBar(nb.rel)}`;
  if(lock) h+=`<p class="note" style="color:#ff9a7a">${lock}</p>`;
  else { h+=`<div class="sec"><h3>Tawarkan pertukaran</h3><p class="note">Makin akrab, makin murah. Watak ${NB_PERS_N[nb.pers]} juga berpengaruh. Monster yang cocok dengan kebutuhan mereka dihargai lebih tinggi.</p>
    <div class="btns" style="display:flex;gap:4px;flex-wrap:wrap"><button class="btn pri" data-nba="buyg:${m.id}">Bayar ${pr.gold} emas</button><button class="btn" data-nba="buyj:${m.id}">Bayar ${pr.jiwa} Kristal Jiwa</button></div>
    <h3 style="margin-top:8px">Tukar dengan monster cadangan</h3>${list.length?`<div class="grid1">${list.map(x=>monCardNb(x,`swap:${m.id}:${x.id}`,nb)).join('')}</div>`:'<p class="note">Cadangan kosong. Pindahkan monster ke Cadangan dulu.</p>'}</div>`; }
  return {t:'Monster tetangga',h}; }
const NB_PANELS={tetangga:pTetangga,nchat:pNChat,nsend:pNSend,nmon:pNMon};
function nbAfterRender(B){ for(const cv of B.querySelectorAll('canvas[data-nbl]')){ const nb=nbById(cv.dataset.nbl); if(nb) withWorld(nb.w,()=>iconSpr(cv,lordSpr(0))); } const cb=B.querySelector('#chatBox'); if(cb) cb.scrollTop=cb.scrollHeight; }
/* ---------- kunjungan ---------- */
function visitGo(nb){ if(G.visit===nb.id) return; if(G.visit) visitHome(true); UI.ownCam=RC.camY; stopPlacing&&UI.placing&&stopPlacing(); nbVisitStart(nb); RC.follow=true; $('bFollow').setAttribute('aria-pressed','true');
  withWorld(nb.w,()=>scrollToFloor(topF())); $('stage').classList.add('visiting'); updVisitBar(); closePanel(); toast(`Mengunjungi ${nb.dname}…`);
  nbPush(nb,'sys',`— Kau mampir ke ${nb.dname}. —`); if(rnd()<.6){ nbPush(nb,'them',pick(['Selamat datang di dungeonku! Lihat-lihat saja, jangan sentuh perangkapnya.','Oh, kau datang! Lihat monster-monsterku, keren kan?','Mampir? Silakan. Tapi jangan curi peti-petiku, ya.'])); } }
function visitHome(silent){ nbVisitEnd(); $('stage').classList.remove('visiting'); $('visitBar').hidden=true; if(UI.ownCam!=null) RC.camY=UI.ownCam; if(UI.panel==='nmon') closePanel(); if(!silent) toast('Kembali ke dungeon sendiri.'); }
function updVisitBar(){ const nb=visNb(); const b=$('visitBar'); if(!nb){ b.hidden=true; return; } b.hidden=false;
  b.innerHTML=`<span>🏰 <b>${esc(nb.dname)}</b> · ${nbLordLine(nb)} Lv${nb.w.lord.lv} · ${relTier(nb.rel)}</span><button data-nba="chat:${nb.id}">Telepati</button><button data-nba="home">Pulang</button>`; }
/* ---------- bungkus render & input ---------- */
const _renderNB=render; render=function(){ const nb=visNb(); if(!nb) return _renderNB(); withWorld(nb.w,_renderNB); };
const _followNB=followCam; followCam=function(dt){ const nb=visNb(); if(!nb) return _followNB(dt); withWorld(nb.w,()=>_followNB(dt)); };
const _pickNB=pickAtCanvas; pickAtCanvas=function(cx,cy){ const nb=visNb(); if(!nb) return _pickNB(cx,cy); const r=withWorld(nb.w,()=>_pickNB(cx,cy)); if(r) r.nb=nb.id; return r; };
const _tapNB=onCanvasTap; onCanvasTap=function(hit){ if(!hit.nb) return _tapNB(hit); const nb=nbById(hit.nb);
  if(hit.k==='m'){ openPanel('nmon',{nmId:hit.id}); return; }
  if(hit.k==='a'){ const p=nb.w.people[hit.id]; if(p) toast(`${p.name} · ${jobTag(p.job)} Lv${p.lv} · ${raceName(p.race)}`); return; }
  if(hit.k==='l'){ openPanel('nchat',{nbId:nb.id}); return; } };
const _scrollNB=scrollToFloor;
const _onLogNB=onLog; onLog=function(s,c){ if(G.isNeighbor){ const t=$('ticker'); if(!t) return; if(c==='adv'&&rnd()<.6) return; const d=document.createElement('div'); d.className=(c||'')+' nbv'; d.textContent=`[${G.dname}] ${s}`; t.prepend(d); while(t.children.length>2) t.lastChild.remove(); return; }
  _onLogNB(s,c); if(c==='nb') updNbBadge(); };
function updNbBadge(){ const b=document.querySelector('#nav button[data-p="tetangga"]'); if(!b) return; const n=(G.nbs||[]).reduce((s,x)=>s+(x.unread||0),0); let e=b.querySelector('.badge'); if(n){ if(!e){ e=document.createElement('b'); e.className='badge'; b.appendChild(e); } e.textContent=n; } else if(e) e.remove(); }
function nbAct(a){ const [k,x,y]=a.split(':'); const nb=nbById(x);
  if(k==='list'){ openPanel('tetangga'); return; }
  if(k==='chat'){ openPanel('nchat',{nbId:+x}); updNbBadge(); return; }
  if(k==='visit'){ visitGo(nb); return; }
  if(k==='home'){ visitHome(); renderPanel(); return; }
  if(k==='greet'){ const g=nbGreet(nb); if(!g) toast('Sudah banyak ngobrol hari ini. Hubungan tidak naik lagi hari ini.'); renderPanel(); return; }
  if(k==='ask'){ nbAsk(nb); renderPanel(); return; }
  if(k==='comfort'){ const ok=nbComfort(nb); if(ok) toast('Hatinya jauh lebih tenang. Hubungan naik!'); renderPanel(); return; }
  if(k==='gold'){ const e=nbGiveGold(nb,+y); toast(e||`Terkirim ${y} emas.`); renderPanel(); return; }
  if(k==='jiwa'){ const e=nbGiveJiwa(nb,+y); toast(e||`Terkirim ${y} Kristal Jiwa.`); renderPanel(); return; }
  if(k==='sendmon'){ openPanel('nsend',{nbId:+x}); return; }
  if(k==='givemon'){ const m=G.mons.find(q=>q.id===+y); const e=nbGiveMon(nb,m); toast(e||'Monster terkirim!'); openPanel('nchat',{nbId:+x}); return; }
  const vn=visNb(); if(!vn) return; const their=vn.w.mons.find(q=>q.id===+x);
  if(k==='buyg'||k==='buyj'||k==='swap'){ if(!their){ toast('Monster itu sudah tidak ada.'); return; } const offer=k==='buyg'?{k:'gold'}:k==='buyj'?{k:'jiwa'}:{k:'mon',m:G.mons.find(q=>q.id===+y)};
    const r=nbTrade(vn,their,offer); toast(r.msg); if(r.ok) closePanel(); else renderPanel(); updVisitBar(); return; } }
(function nbUIInit(){
  const st=document.createElement('style'); st.textContent=`nav{grid-template-columns:repeat(6,minmax(0,1fr))!important}
  .visitbar{position:absolute;left:8px;right:52px;top:6px;display:flex;align-items:center;gap:6px;background:rgba(40,18,52,.92);border:1px solid #c78aff;border-radius:8px;padding:5px 8px;font-size:12.5px;z-index:3}
  .visitbar span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap} .visitbar button{background:transparent;border:1px solid #c78aff;border-radius:6px;color:#e0c8ff;padding:2px 8px;font-size:12px}
  .stage.visiting .ticker{top:44px} .ticker .nb{border-color:#c78aff;color:#e8d8ff} .ticker .nbv{opacity:.92;border-left-style:dashed}
  .nbcard{display:flex;flex-direction:column;gap:3px} .chat{display:flex;flex-direction:column;gap:4px;max-height:220px;overflow-y:auto;margin:6px 0;padding:6px;background:rgba(0,0,0,.25);border-radius:8px}
  .cm{font-size:12.5px;padding:4px 8px;border-radius:8px;max-width:88%} .cm.them{background:#2e2440;align-self:flex-start} .cm.me{background:#3a2a1a;align-self:flex-end;color:#ffe0b0} .cm.sys{align-self:center;color:var(--mute);font-size:11px}
  .badge{display:inline-block;min-width:16px;padding:0 4px;border-radius:8px;background:#ff4a7a;color:#fff;font-size:10px;line-height:16px;text-align:center}
  nav button{position:relative} nav button .badge{position:absolute;top:2px;right:10%}
  .grid1{display:flex;flex-direction:column;gap:5px}`; document.head.appendChild(st);
  const nav=$('nav'); const b=document.createElement('button'); b.dataset.p='tetangga'; const c=document.createElement('canvas'); c.width=32; c.height=36; b.appendChild(c); b.appendChild(document.createTextNode('Tetangga')); nav.appendChild(b);
  paintIcon(c,g=>{ g.fillStyle='#3a2a5a'; g.beginPath(); g.arc(16,18,10,0,6.3); g.fill(); g.fillStyle='#c78aff'; g.beginPath(); g.arc(16,18,7,0,6.3); g.fill(); g.fillStyle='#f0e0ff'; g.fillRect(12,13,3,3); g.fillStyle='#6a4a2a'; g.fillRect(9,28,14,4); });
  b.onclick=()=>{ if(UI.panel==='tetangga'){ closePanel(); return; } UI.target=null; openPanel('tetangga'); };
  const vb=document.createElement('div'); vb.className='visitbar'; vb.id='visitBar'; vb.hidden=true; $('stage').appendChild(vb);
  const handler=e=>{ const t=e.target.closest('[data-nba]'); if(!t) return; e.stopPropagation(); nbAct(t.dataset.nba); };
  $('sheetB').addEventListener('click',handler,true); vb.addEventListener('click',handler);
  setInterval(()=>{ if(G&&!G.isNeighbor){ updNbBadge(); if(G.visit) updVisitBar(); else if(!$('visitBar').hidden){ $('visitBar').hidden=true; $('stage').classList.remove('visiting'); } } },1000);
  if(G&&G.visit){ $('stage').classList.add('visiting'); updVisitBar(); }
})();
