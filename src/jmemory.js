/* =====================================================================
   TAKHTA JURANG — item petualang, jalan pulang / Return Scroll, ingatan party
   ===================================================================== */
const ADV_ITEMS={
  hp:{n:'HP Potion',c:'#e04a4a',p:12,d:'Memulihkan 35% HP.'},
  hpHi:{n:'High HP Potion',c:'#ff2a6a',p:35,d:'Memulihkan 70% HP.'},
  mp:{n:'MP Potion',c:'#4a8ae0',p:12,d:'Memulihkan 40% MP.'},
  mpHi:{n:'High MP Potion',c:'#2a5aff',p:35,d:'Memulihkan 80% MP.'},
  max:{n:'Max Potion',c:'#f0d040',p:120,d:'Memulihkan seluruh HP dan MP, sekaligus menyembuhkan efek buruk.'},
  cure:{n:'Cure Potion',c:'#8ad04a',p:15,d:'Menyembuhkan racun, luka bakar, kutukan, lambat, dan jerat.'},
  phoenix:{n:'Phoenix Feather',c:'#ff7a2a',p:260,d:'Membangkitkan kawan yang tumbang dengan separuh HP.'},
  smoke:{n:'Smoke Bomb',c:'#a8a8b0',p:20,d:'Membutakan monster sesaat supaya bisa kabur.'},
  bomb:{n:'Fire Bomb',c:'#ff8a3a',p:30,d:'Dilempar ke monster: ledakan api.'},
  scroll:{n:'Return Scroll',c:'#9fe0ff',p:60,d:'Membawa seluruh party keluar dari dungeon seketika.'},
};
function itemsTxt(p){ const it=p.items||{}; const e=Object.entries(it).filter(([k,v])=>v>0); return e.length?e.map(([k,v])=>`${ADV_ITEMS[k].n} ×${v}`).join(', '):'-'; }
function stockPerson(p,tier,lead){ const it=p.items=p.items||{}; const lv=p.lv; const rich=tier==='elite'||tier==='solo'?2:tier==='veteran'?1:0; const J=JOBS[p.job];
  const want={hp:1+Math.min(3,Math.floor(lv/15))+rich,hpHi:lv>=20?rich+(rnd()<.5?1:0):0,cure:rnd()<.45+rich*.15?1:0,smoke:rnd()<.2?1:0,bomb:rnd()<.15+rich*.1?1+(rich>1?1:0):0,
    mp:J.magic?1+rich:0,mpHi:J.magic&&lv>=25?1:0,max:lv>=45&&rnd()<.15*(1+rich)?1:0,phoenix:lv>=30&&rnd()<.03+rich*.06?1:0,scroll:lead?(rnd()<(tier==='baru'?.35:.7+rich*.12)?1:0):(rnd()<.08?1:0)};
  for(const k in want){ const need=want[k]-(it[k]||0); for(let i=0;i<need;i++){ const c=ADV_ITEMS[k].p; if(p.gold<c*.5&&k!=='hp') break; p.gold=Math.max(0,p.gold-Math.round(c*.5)); it[k]=(it[k]||0)+1; } } }
function partyHas(pa,k){ return partyMembers(pa).find(p=>p.items&&p.items[k]>0); }
function useIt(a,p,k,txt){ p.items[k]--; say(a.x,a.floor,ADV_ITEMS[k].n+'!',ADV_ITEMS[k].c,1.2); fxAt('heal',a.x,a.floor,ADV_ITEMS[k].c,.7); if(txt&&rnd()<.25) log(txt,'adv'); }
function useItems(a,p,pa){ if(!p.items||(a.cd.item||0)>0) return; const st=advStats(p); const it=p.items; const r=a.hp/st.hp;
  const bad=a.fx.poison>G.t||a.fx.burn>G.t||a.fx.curse>G.t||a.fx.slow>G.t||a.fx.root>G.t;
  if(r<.3&&it.max>0){ useIt(a,p,'max'); a.hp=st.hp; a.mp=a.mpMax; for(const k of ['poison','burn','curse','slow','root','blind']) a.fx[k]=0; a.cd.item=3; return; }
  if(r<.3&&it.hpHi>0){ useIt(a,p,'hpHi'); a.hp=Math.min(st.hp,a.hp+st.hp*.7); a.cd.item=3; return; }
  if(r<.4&&it.hp>0){ useIt(a,p,'hp'); a.hp=Math.min(st.hp,a.hp+st.hp*.35); a.cd.item=3; return; }
  if(bad&&it.cure>0&&rnd()<.5){ useIt(a,p,'cure'); for(const k of ['poison','burn','curse','slow','root']) a.fx[k]=0; a.cd.item=3; return; }
  if(a.mpMax&&a.mp<a.mpMax*.2){ if(it.mpHi>0){ useIt(a,p,'mpHi'); a.mp=Math.min(a.mpMax,a.mp+a.mpMax*.8); a.cd.item=3; return; } if(it.mp>0){ useIt(a,p,'mp'); a.mp=Math.min(a.mpMax,a.mp+a.mpMax*.4); a.cd.item=3; return; } }
  if(r<.2&&it.smoke>0){ useIt(a,p,'smoke'); for(const m of G.mons) if(!m.dead&&m.floor===a.floor&&Math.abs(m.x-a.x)<70) m.fx.stun=G.t+2.5; fxAt('poof',a.x,a.floor,'#c8c8d0',1); if(pa&&!pa.walkBack&&!pa.retreat){ pa.retreat=G.t+1; } a.cd.item=3; return; }
  if(it.bomb>0&&rnd()<.15){ const foes=enemiesOn(a.floor).filter(m=>Math.abs(m.x-a.x)<60); if(foes.length>=1){ p.items.bomb--; const tx=foes[0].x; say(a.x,a.floor,'Fire Bomb!','#ff8a3a',1.1); if(typeof projAt==='function') projAt(a.x,tx,a.floor,'flask','#ff8a3a');
      fxAt('blast',tx,a.floor,'#ff8a3a',.7); for(const m of foes) if(Math.abs(m.x-tx)<30) hitMon(m,20+p.lv*3,a,{sure:1,mult:1}); a.cd.item=4; } } }
/* Phoenix Feather: kawan yang tumbang bangkit lagi */
function tryPhoenix(a){ const pa=G.parties.find(x=>x.id===a.party); if(!pa) return false;
  const holder=G.advs.find(x=>x.party===pa.id&&x!==a&&x.floor===a.floor&&x.hp>0&&G.people[x.pid].items&&G.people[x.pid].items.phoenix>0);
  if(!holder||(pa.phxT&&G.t-pa.phxT<20)) return false; pa.phxT=G.t; const hp_=G.people[holder.pid]; hp_.items.phoenix--; const p=G.people[a.pid]; const st=advStats(p);
  a.hp=st.hp*.5; for(const k in a.fx) a.fx[k]=0; fxAt('rise',a.x,a.floor,'#ff7a2a',1.2); say(a.x,a.floor,'Phoenix Feather!','#ff9a3a',1.6);
  log(`${hp_.name} memakai Phoenix Feather! ${p.name} bangkit kembali dengan separuh HP.`,'warn'); return true; }
/* ---------- jalan pulang ---------- */
function walkBackTick(a,p,pa,dt){ for(const k in a.cd) a.cd[k]-=dt; const f=a.floor, dir=-fdir(f); const st=advStats(p); const J=JOBS[p.job];
  const foe=enemiesOn(f).filter(m=>Math.abs(m.x-a.x)<st.rng+2).sort((x,y)=>Math.abs(x.x-a.x)-Math.abs(y.x-a.x))[0];
  if(foe&&(foe.x-a.x)*dir>-6){ a.face=Math.sign(foe.x-a.x)||dir; a.walk=0; if(a.cd.atk<=0){ a.cd.atk=1.05; a.atkT=G.t; a.atkK='atk';
      if(J.rng>20&&typeof projKindFor==='function'){ const pk=projKindFor(p.job); if(pk) projAt(a.x,foe.x,f,pk,p.el?(ELEM_BY[p.el]||{}).c:'#9fd0ff'); }
      hitMon(foe,st.atk,a,{magic:J.magic,ranged:J.rng>20}); } return; }
  if(a.fx.root>G.t) return;
  a.x+=dir*22*dt*(a.fx.slow>G.t?.5:1); a.walk=(a.walk||0)+dt; a.face=dir;
  if((a.x-fstart(f))*dir>=0){ if(f>0){ a.floor=f-1; a.x=fend(f-1); fxAt('stairs',a.x,a.floor,'#ffffff',.4); } else { G.advs=G.advs.filter(x=>x!==a); } } }
/* ---------- bungkus fungsi inti ---------- */
const _advTick=advTick;
advTick=function(a,dt){ const p=G.people[a.pid]; if(!p) return _advTick(a,dt); const pa=G.parties.find(x=>x.id===a.party);
  if(a.mpMax) a.mp=Math.min(a.mpMax,(a.mp||0)+1.5*dt);
  if(!(a.fx.stun>G.t||a.fx.sleep>G.t)&&!a.resting) useItems(a,p,pa);
  if(pa&&pa.walkBack&&!(a.fx.stun>G.t||a.fx.sleep>G.t)){ walkBackTick(a,p,pa,dt); return; }
  _advTick(a,dt); };
const _useSkill2=useSkill;
useSkill=function(a,p,J,tgt,st,pa){ if(J.magic&&a.mpMax){ const c=Math.round(a.mpMax*.3); if(a.mp<c){ if(rnd()<.2) say(a.x,a.floor,'MP habis!','#7a9aff',.9); return; } a.mp-=c; } return _useSkill2(a,p,J,tgt,st,pa); };
const _advDie=advDie;
advDie=function(a,src){ if(tryPhoenix(a)) return; const p=G.people[a.pid]; const pa=G.parties.find(x=>x.id===a.party);
  if(pa&&p){ pa.mem=pa.mem||{fallen:[]}; const killer=src&&src.kind==='m'?{n:src.u.name,sp:SPECIES[src.u.sp].n,id:src.u.id}:src&&src.kind==='l'?{n:'Raja Iblis '+G.lord.name}:{n:'jebakan'};
    pa.mem.fallen.push({name:p.name,job:p.job,race:p.race,killer:killer.n,sp:killer.sp,kid:killer.id,floor:a.floor+1,day:G.day,visit:pa.visits}); if(pa.mem.fallen.length>12) pa.mem.fallen.shift(); }
  _advDie(a,src); };
const _partyTick=partyTick;
partyTick=function(pa){
  if(pa.walkBack){ const mem=G.advs.filter(a=>a.party===pa.id); if(!mem.length){ pa.walkBack=0; leaveDungeon(pa,'jalan'); } return; }
  _partyTick(pa);
  if(pa.retreat&&!pa.retreatSet&&pa.state==='in'){ pa.retreatSet=1; const h=partyHas(pa,'scroll');
    if(h){ h.items.scroll--; pa.how='scroll'; const a=G.advs.find(x=>x.pid===h.id); if(a) say(a.x,a.floor,'Return Scroll!','#9fe0ff',1.4); }
    else { pa.retreat=0; pa.walkBack=1; const a=G.advs.find(x=>x.party===pa.id); if(a) say(a.x,a.floor,'Tidak ada Return Scroll… jalan kaki!','#cfd8e8',1.6);
      log(`${pa.name} tidak punya Return Scroll dan harus berjalan pulang dari lantai ${(a?a.floor:0)+1}. Kesempatan untuk para monster!`,'adv'); } } };
const _leaveDungeon=leaveDungeon;
leaveDungeon=function(pa,how){ const before=partyMembers(pa).length; const why=pa.why; pa.retreatSet=0; pa.why=null; pa.walkBack=0;
  const h=how==='jalan'?'jalan':how;
  _leaveDungeon(pa,h==='jalan'?'pulang':h==='kabur'&&why==='puas'?'puas':h);
  if(how==='jalan'){ G.pop+=1+pa.loot*.04; log(`${pa.name} akhirnya keluar lewat pintu masuk dengan berjalan kaki${pa.loot?`, membawa ${pa.loot} emas harta`:''}.${why==='puas'?' Mereka pulang dengan puas.':''}`,'adv'); }
  if(pa.state!=='town') return;
  pa.mem=pa.mem||{fallen:[]}; pa.mem.last=how; pa.mem.size=pa.mem.size||pa.size0||pa.members.length;
  // isi kekosongan: rekrut anggota baru menggantikan yang gugur (kadang ada juga yang keluar)
  const ppl=partyMembers(pa);
  if(ppl.length>1&&rnd()<.08){ const q=pick(ppl.slice(1)); q.party=null; pa.members=pa.members.filter(id=>id!==q.id); pa.mem.left=(pa.mem.left||[]).concat([q.name]).slice(-4); }
  const fallenNow=pa.mem.fallen.filter(x=>x.visit===pa.visits);
  const need=Math.max(0,Math.min(5,pa.mem.size)-partyMembers(pa).length);
  for(let i=0;i<need;i++){ if(rnd()<.25) continue; const f0=fallenNow[i]||pick(pa.mem.fallen)||null; const avg=partyMembers(pa).reduce((s,x)=>s+x.lv,0)/Math.max(1,partyMembers(pa).length);
    const th=pa.th&&PARTY_THEME_BY[pa.th]; const job=f0&&rnd()<.6?f0.job:pickJobStar(pa.tier); const race=th&&th.race&&th.raceAll?th.race:undefined;
    const np=newPerson(Math.max(1,avg*rand(.75,.95)),job,race); np.party=pa.id; pa.members.push(np.id); np.newbie=pa.visits+1; np.replaces=f0?f0.name:null; }
  for(const p of partyMembers(pa)) stockPerson(p,pa.tier,p.id===pa.members[0]); };
/* ---------- watak & ingatan ---------- */
const TRAITS=['berani','penakut','ceria','pemarah','sombong','pemalu','tenang','religius','serakah','dingin'];
const TRAIT_N={berani:'Pemberani',penakut:'Penakut',ceria:'Ceria',pemarah:'Pemarah',sombong:'Sombong',pemalu:'Pemalu',tenang:'Tenang',religius:'Religius',serakah:'Mata Duitan',dingin:'Dingin'};
function traitOf(p){ if(!p.trait) p.trait=pick(TRAITS); return p.trait; }
const MEM_LINES={
  berani:['Kali ini, pasti bisa!','Untuk {f}, kita maju sampai akhir!','{k}… aku datang untukmu.','Kita kalah sekali. Bukan berarti kalah selamanya!'],
  penakut:['A-aku masih ingat apa yang terjadi pada {f}…','Kita… kita benar-benar kembali ke sini?','Kali ini jangan sampai ada yang mati, ya…','Lantai {fl}… aku masih mimpi buruk soal lantai {fl}.'],
  ceria:['Ronde dua! Kali ini kita pasti menang!','{f} pasti mendukung kita dari atas sana!','Ayo, ayo! Ini tidak akan sama lagi!'],
  pemarah:['{k}! Aku akan mencincangmu!','Ini tidak akan sama lagi. Aku bersumpah.','Kalian membunuh {f}. Bayar sekarang!','Aku sudah menunggu hari ini.'],
  sombong:['Kekalahan kemarin cuma kebetulan.','Kali ini aku serius. Bersiaplah.','{f} terlalu lemah. Aku tidak.','Dungeon ini sudah kubaca polanya.'],
  pemalu:['U-untuk {f}… aku akan berusaha…','K-kali ini… pasti bisa…','A-aku sudah latihan setiap hari sejak itu…'],
  tenang:['Kita sudah pelajari polanya. Lantai {fl} tidak akan menjebak kita lagi.','Ini tidak akan sama lagi.','Tarik napas. Ikuti rencana.'],
  religius:['Semoga arwah {f} tenang. Hari ini kita tuntaskan.','Dewa memberi kita kesempatan kedua.','Doa untuk {f}… lalu untuk kemenangan.'],
  serakah:['Harta di lantai {fl} masih menunggu. Bagian {f} jadi milikku, hehe.','Kali ini kita pulang kaya!','Kerugian kemarin harus balik modal hari ini.'],
  dingin:['…{k}. Kau berikutnya.','Ini tidak akan sama lagi.','Yang mati sudah mati. Yang hidup harus menang.'],
};
const MEM_NOLOSS=['Kita kembali. Kali ini sampai lebih dalam.','Lantai {fl} lagi. Kali ini lewati!','Persiapan sudah lebih matang. Ayo.'];
const NEWBIE_LINES=['Aku menggantikan {f}. Aku tidak akan mengecewakan kalian.','Jadi ini dungeon yang menewaskan {f}…','Senior {f}… aku akan meneruskan perjuanganmu.','Halo semua! Aku anggota baru. Semoga nasibku lebih baik dari {f}…'];
const NEWBIE_PLAIN=['Halo semua! Aku anggota baru. Mohon bimbingannya!','Jadi ini kastil Raja Iblis yang terkenal itu…'];
function raceVoice(s,p){ const r=p.race; if(p.isekai&&rnd()<.5) return s+' Ini bukan game lagi.'; if(rnd()<.45) return s;
  if(r==='dwarf') return s+' Demi janggut leluhurku!'; if(r==='goblin') return s+' Hehe… goblin tidak menyerah!'; if(r==='orc') return 'GRAAH! '+s; if(r==='iblis') return s+' …begitulah sumpah seorang iblis.';
  if(r==='elf') return s+' Para elf tidak pernah lupa.'; if(r==='beastkin') return s+' Grrr…'; if(r==='kobold') return s+' Yip!'; if(r==='lizard') return s.replace(/s/g,'ss'); if(r==='halfelf') return s+' Darah campuranku tidak akan goyah.'; return s; }
function fillMem(t,fal,pa){ const f=fal||{}; return t.replace(/\{f\}/g,f.name||'kawan kita').replace(/\{k\}/g,f.sp?`${f.killer} si ${f.sp}`:f.killer||'monster itu').replace(/\{fl\}/g,f.floor||(pa.deepest||0)+1); }
const _enterDungeon=enterDungeon;
enterDungeon=function(pa){ const mem=partyMembers(pa); pa._mq=null; pa._extra=[];
  for(const p of mem){ traitOf(p); if(!p.items) stockPerson(p,pa.tier,p.id===pa.members[0]); }
  if(pa.mem&&pa.visits>=1&&mem.length){
    const vets=mem.filter(p=>!(p.newbie>pa.visits)); const fal=pa.mem.fallen.length?pa.mem.fallen[pa.mem.fallen.length-1]:null;
    const sp=pick(vets.length?vets:mem); const tr=traitOf(sp);
    const line=fal&&pa.mem.fallen.some(x=>x.visit>=pa.visits-1)?pick(MEM_LINES[tr]):(rnd()<.5?pick(MEM_LINES[tr]):pick(MEM_NOLOSS));
    pa._mq=`${sp.name}: ${raceVoice(fillMem(line,fal,pa),sp)}`;
    for(const nb of mem.filter(p=>p.newbie===pa.visits+1)){ const l=nb.replaces?fillMem(pick(NEWBIE_LINES),pa.mem.fallen.find(x=>x.name===nb.replaces)||{name:nb.replaces},pa):pick(NEWBIE_PLAIN); pa._extra.push([nb,raceVoice(l,nb)]); }
    const nem=fal&&fal.kid&&G.mons.find(m=>m.id===fal.kid); pa.nemesis=nem?nem.id:null; }
  _enterDungeon(pa);
  for(const a of G.advs.filter(x=>x.party===pa.id)){ const p=G.people[a.pid]; if(JOBS[p.job].magic){ a.mpMax=Math.round(40+p.lv*1.5); a.mp=a.mpMax; } }
  if(pa._mq){ const changed=mem.filter(p=>p.newbie===pa.visits);
    if(changed.length) log(`${pa.name} datang dengan anggota baru: ${changed.map(p=>`${p.name} (${jobTag(p.job)})${p.replaces?` menggantikan ${p.replaces} yang gugur`:''}`).join(', ')}.`,'adv');
    pa._extra.forEach(([nb,l],i)=>{ const a=G.advs.find(x=>x.pid===nb.id); setTimeout0(()=>{ if(a&&G.advs.includes(a)) say(a.x,a.floor,`${nb.name}: "${l}"`,'#c8f0c8',2.8); },3.5+i*2); if(i===0) log(`${nb.name} (anggota baru): "${l}"`,'adv'); }); }
};
