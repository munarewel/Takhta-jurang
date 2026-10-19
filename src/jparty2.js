/* =====================================================================
   TAKHTA JURANG — party tambahan + pasif Dual Sword (Switch, Parry, Evade Master)
   ===================================================================== */
PARTY_THEME.push(
  {id:'mistNinja',j:['ninja','ninja','medicNinja','kunoichi','assassin','scout'],sz:[3,5],n:['Ninjas of the Mist Village','Mist Village Shinobi','Hidden Mist Squad'],q:['Kabut adalah rumah kami.','(kabut tipis ikut masuk bersama mereka)','Misi dari desa: selidiki kastil ini. Jangan sampai ketahuan.','Ninja medis siap. Formasi kabut!']},
  {id:'lostPirate',j:['pirate','pirate','navigator','captain','cannoneer','harpooner'],sz:[3,5],n:['Lost Compass Pirates','The Wrong Way Crew','Pirates of Nowhere'],q:['Navigator! Ini laut atau dungeon?!','Kompasnya muter-muter terus, Kapten!','Pokoknya harta karun pasti di sini… kayaknya.','Kita nyasar lagi, ya?'],lead:'Captain'},
  {id:'durable',j:['guardian','templar','juggernaut','sentinel','knight','paladin'],sz:[4,5],n:['High Durability'],q:['Pukul saja. Kami tidak merasakan apa-apa.','Lambat tapi pasti. Seperti tembok berjalan.','Damage kami kecil, tapi kami tidak pernah mati.']},
  {id:'fastClear',j:['ranger','archer','sniper','gunslinger','musketeer','spiritArcher','hunter','demonHunter','arrowQueen'],sz:[3,5],spd:1.35,n:['Fast Clear'],q:['Tembak dari jauh, lari, ulangi.','Target terkunci. Clear dalam lima menit.','Monster belum sempat mendekat, sudah tumbang.']},
  {id:'dualSword',slots:[['dualblade'],['duelist']],sxs:['m','f'],passives:[['switch','parry','evadeMaster'],['switch']],extraHp:3,n:['Dual Sword'],q:['Kau kiri, aku kanan. Seperti biasa.','Kalau aku jatuh, kau gantikan. Kalau kau jatuh… aku gantikan.','Dua pedang, satu napas.']}
);
PARTY_THEME_BY.mistNinja=PARTY_THEME[PARTY_THEME.length-5]; for(const t of PARTY_THEME) PARTY_THEME_BY[t.id]=t;
const PASSIVE_N={switch:'Switch',parry:'Parry',evadeMaster:'Evade Master'};
const PASSIVE_D={switch:'Saat HP rendah, bertukar posisi dengan partner lalu minum potion.',parry:'20% menangkis serangan jarak dekat lalu membalas.',evadeMaster:'Menghindar +15%. Setelah menghindar, serangan berikutnya pasti kritikal.'};
const _newPartyP2=newParty;
newParty=function(){ const pa=_newPartyP2(); const th=pa.th&&PARTY_THEME_BY[pa.th]; if(!th) return pa;
  if(th.spd) pa.spd=th.spd;
  pa.members.forEach((id,i)=>{ const p=G.people[id]; if(!p) return;
    if(th.sxs&&th.sxs[i]&&p.sx!==th.sxs[i]){ for(let k=0;k<20;k++){ const a=advName(p.race); if(a.sx===th.sxs[i]){ p.name=a.n; p.sx=a.sx; break; } } if(th.sxs[i]==='f'){ p.app.style=pick(['long','tail']); } }
    if(th.passives&&th.passives[i]) p.passives=th.passives[i].slice();
    if(th.extraHp){ p.items=p.items||{}; p.items.hp=(p.items.hp||0)+th.extraHp; } });
  return pa; };
function hasPas(p,k){ return p&&p.passives&&p.passives.includes(k); }
// Evade Master: menghindar +15%
const _advStatsP2=advStats; advStats=function(p){ const s=_advStatsP2(p); if(hasPas(p,'evadeMaster')) s.eva+=.15; return s; };
// Parry & Evade Master: bungkus hitAdv
const _hitAdvP2=hitAdv;
hitAdv=function(a,amt,src,opts){ opts=opts||{}; const p=G.people[a.pid];
  if(p&&hasPas(p,'parry')&&src&&src.kind==='m'&&!opts.sure&&!(src.u.ranged)&&Math.abs(src.u.x-a.x)<24&&rnd()<.2){ say(a.x,a.floor,'PARRY!','#bff0ff',1); a.atkT=G.t; a.atkK='atk'; fxAt('slash',src.u.x,a.floor,'#bff0ff',.3); hitMon(src.u,advStats(p).atk*.8,a,{sure:1}); return 0; }
  const hp0=a.hp; const d=_hitAdvP2(a,amt,src,opts);
  if(p&&hasPas(p,'evadeMaster')&&d===0&&a.hp===hp0&&!opts.sure){ a.fx.critNext=G.t+4; }
  return d; };
// Switch: partner bertukar posisi saat salah satu HP rendah
function switchTick(pa){ if(!pa.members.some(id=>hasPas(G.people[id],'switch'))) return; const mem=G.advs.filter(x=>x.party===pa.id); if(mem.length<2||G.t-(pa.swT||0)<6) return;
  for(const a of mem){ const p=G.people[a.pid]; if(!hasPas(p,'switch')) continue; const st=advStats(p); if(a.hp/st.hp>=.35) continue;
    const b=mem.find(x=>x!==a&&x.floor===a.floor&&hasPas(G.people[x.pid],'switch')&&x.hp/advStats(G.people[x.pid]).hp>.5); if(!b) continue;
    const q=G.people[b.pid]; const ax=a.x; a.x=b.x; b.x=ax; if(Math.abs(a.x-b.x)<10){ a.x-=fdir(a.floor)*10; }
    pa.swT=G.t; say(a.x,a.floor,'Switch!','#ffd36a',1.2); say(b.x,b.floor,`${q.name}: "Giliranku!"`,'#ffe0a0',2);
    for(const m of G.mons) if(!m.dead&&m.floor===a.floor&&m.aggro===a.pid){ m.aggro=b.pid; m.aggroT=G.t; }
    if(p.items&&p.items.hp>0){ p.items.hp--; a.hp=Math.min(st.hp,a.hp+st.hp*.35); say(a.x,a.floor,'HP Potion!','#e04a4a',1.2); fxAt('heal',a.x,a.floor,'#e04a4a',.7); } else a.hp=Math.min(st.hp,a.hp+st.hp*.1);
    a.cd.atk=1; break; } }
const _partyTickP2=partyTick; partyTick=function(pa){ if(pa.state==='in') switchTick(pa); return _partyTickP2(pa); };
