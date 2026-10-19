/* =====================================================================
   TAKHTA JURANG — simulasi kastil
   ===================================================================== */
const FW=200, FH=52, SLOTS=10, DT=1/30, DAY_LEN=120;
const SLOT_X=i=>24+i*16.9;
const MAX_FLOORS=100;
let G=null;
const EFX=[]; // efek sementara (tidak disimpan)
function nid(){ return G.nextId++; }
function fdir(f){ return f%2===0?1:-1; }
function fstart(f){ return f%2===0?10:FW-10; }
function fend(f){ return f%2===0?FW-10:10; }
function topF(){ return G.floors-1; }
function say(x,f,s,c,t){ if(typeof UI!=='undefined'&&UI.speed>=2&&/^\d+$/.test(s)&&rnd()<(UI.speed>=4?.6:.3)) return; if(EFX.length>200){ const i=EFX.findIndex(e=>e.k==='txt'&&!/"/.test(e.s)); if(i>=0) EFX.splice(i,1); } EFX.push({k:'txt',x,f,s,c:c||'#fff',t:t||1.4,t0:t||1.4}); }
function fxAt(k,x,f,c,t){ if(EFX.length>300) EFX.shift(); EFX.push({k,x,f,c,t:t||.6,t0:t||.6}); }
function log(s,c){ G.log.unshift({d:G.day,s,c:c||'n'}); if(G.log.length>160) G.log.pop(); if(typeof onLog==='function') onLog(s,c); }
function rand(a,b){ return a+rnd()*(b-a); }

/* ---------- game baru ---------- */
function newGame(){
  srand((Date.now()%2147483000)|1);
  G={v:1,nextId:1,t:0,day:1,mana:120,gold:600,jiwa:40,pop:0,floors:3,fix:[],mons:[],people:{},parties:[],advs:[],lord:null,
     log:[],hall:[],aura:0,inv:[],runes:[],bahan:{},lordSince:0,spawnT:6,stats:{kills:0,lords:0,visits:0,chests:0,gacha:0},assist:{x:FW/2,f:2,q:[],busy:0,tip:0},settings:{autoChest:false}};
  for(let f=0;f<G.floors;f++) G.fix.push(Array(SLOTS).fill(null));
  newLord(true);
  const starters=[['slime',0],['goblin',0],['kelelawar',1],['kobold',1],['wolf',2]];
  starters.forEach(([k,f],i)=>{ const m=addMonster(k); m.lv=5; m.floor=f; m.px=SLOT_X(i%2?3:6); m.x=m.px; checkLearn(m,true); m.hp=monStats(m).hp; });
  G.fix[0][3]={t:'duri'}; G.fix[1][6]={t:'chest',r:'F'}; G.fix[2][2]={t:'chest',r:'E'};
  log('Kastil Iblis berdiri di ujung jurang. Mira, asisten succubus-mu, membungkuk hormat: "Selamat datang, Yang Mulia."','sys');
  return G;
}
function addMonster(sid){
  const s=SPECIES[sid]; const m={id:nid(),name:monName(),pers:pick(PERS_KEYS),ask:0,askDay:0,sp:sid,lv:1,exp:0,abil:[s.ab],floor:-1,px:SLOT_X(ri(1,8)),x:0,strat:'jaga',flee:false,loy:60,hp:1,dead:false,reviveAt:0,kills:0,boost:1,cd:{},fx:{},secret:null,born:G.day};
  m.hp=monStats(m).hp; m.x=m.px; G.mons.push(m); return m;
}
/* ---------- statistik ---------- */
function lordRace(){ return LORD_RACE.find(r=>r.id===G.lord.race)||LORD_RACE[0]; }
function monStats(m){
  const s=SPECIES[m.sp]; const lf=.85+m.loy*.003;
  const lr=G&&G.lord?G.lord.race:''; const rg=G&&G.rage>G.t?1.3:1;
  let hp=s.hp*2.2*(1+.12*(m.lv-1))*m.boost*lf, atk=s.atk*2*(1+.1*(m.lv-1))*m.boost*lf*(lr==='iblis'?1.1:1)*rg;
  let def=(RANK_ORDER.indexOf(s.rank)*2+m.lv*.6)*(m.abil.includes('kulitBatu')?1.35:1);
  let eva=.03+(m.abil.includes('gesit')?.15:0)+(m.abil.includes('licin')?.1:0)+(s.el==='bayang'?.04:0)+floorKabut(m.floor);
  for(const ab of m.abil){ const A=ABIL[ab]; if(!A||A.eff!=='stat'&&A.eff!=='elemAtk') continue; if(A.eff==='elemAtk') atk*=1.15; if(A.atk) atk*=1+A.atk; if(A.hp) hp*=1+A.hp; if(A.def) def*=1+A.def; if(A.eva) eva+=A.eva; }
  const E=eqBonus(m); hp+=E.hp; atk+=E.atk; def+=E.def; eva+=E.eva;
  return {hp:Math.round(hp),atk,def,eva,spd:Math.min(1.6,.6+s.spd*.5),rng:s.ranged?40:16};
}
function itemStats(it){ const k=1+(it.lv||0)*.12; return {atk:(it.atk||0)*k,hp:(it.hp||0)*k,def:(it.def||0)*k,eva:(it.eva||0)}; }
function eqBonus(m){ const o={atk:0,hp:0,def:0,eva:0}; if(!m.eq||!G||!G.inv) return o; for(const s in m.eq){ const it=G.inv.find(x=>x.id===m.eq[s]); if(!it) continue; const st=itemStats(it); o.atk+=st.atk; o.hp+=st.hp; o.def+=st.def; o.eva+=st.eva; } return o; }
function genItem(lv,minR,opt){
  opt=opt||{}; const slot=opt.s||pick(Object.keys(EQ_SLOT)); let r=0; const x=rnd()+Math.min(.5,lv/200); r=x>1.18?4:x>1.02?3:x>.85?2:x>.6?1:0; if(minR!=null) r=Math.max(r,minR);
  const base=1+lv*.5, mul=1+r*.55;
  const it={id:nid(),s:slot,r,lv:0,n:opt.n||(EQ_PRE[Math.min(EQ_PRE.length-1,r*2+ri(0,1))]+pick(EQ_NAMES[slot])),on:null}; if(opt.from) it.from=opt.from;
  if(slot==='senjata'){ it.atk=+(base*1.1*mul).toFixed(1); }
  else if(slot==='zirah'){ it.hp=Math.round((12+lv*4)*mul); it.def=+((1+lv*.3)*mul).toFixed(1); }
  else { it.eva=+(.02+r*.012).toFixed(3); it.atk=+(base*.35*mul).toFixed(1); it.hp=Math.round((5+lv*1.5)*mul); }
  G.inv.push(it); return it;
}
function itemPreview(slot,lv,r){ const base=1+lv*.5, mul=1+r*.55; const o={s:slot,r,lv:0};
  if(slot==='senjata') o.atk=+(base*1.1*mul).toFixed(1); else if(slot==='zirah'){ o.hp=Math.round((12+lv*4)*mul); o.def=+((1+lv*.3)*mul).toFixed(1); } else { o.eva=+(.02+r*.012).toFixed(3); o.atk=+(base*.35*mul).toFixed(1); o.hp=Math.round((5+lv*1.5)*mul); } return o; }
function monDropTable(m){ const s=SPECIES[m.sp]; const T=dropTheme(m.sp); const rk=RANK_ORDER.indexOf(s.rank); const pe=.015+rk*.003, pc=(.1+rk*.008)-pe, pm=.4-(.1+rk*.008); const lv=m.lv+rk*4;
  const out=[{k:'mat',n:T.mat,p:pm,t:T.tier},{k:'core',n:T.core,p:pc,t:Math.min(6,T.tier+1)}];
  for(const sl of Object.keys(EQ_SLOT)) for(const n of T.eq[sl]) out.push({k:'eq',n,s:sl,p:pe/3/T.eq[sl].length,r:Math.min(4,T.rar),it:itemPreview(sl,lv,Math.min(4,T.rar))});
  return out; }
function advDropTable(p){ const gear=JOB_GEAR[p.job]; const pg=advGearP(p); const r=advGearR(p,false);
  const out=[{k:'gold',n:'Emas',v:Math.round(p.gold*.8+p.lv*4),p:1},{k:'res',n:'Mana',v:5+p.lv,p:1},{k:'res',n:'Jiwa',v:1+Math.floor(p.lv/10),p:1}];
  const sp={senjata:.5,zirah:.35,aksesori:.15};
  if(gear) for(const sl of Object.keys(EQ_SLOT)){ const names=gear[{senjata:0,zirah:1,aksesori:2}[sl]]; for(const n0 of names){ const n=n0+(p.el?' of '+ELEM_BY[p.el].n:''); out.push({k:'eq',n,s:sl,p:pg*sp[sl]/names.length,r,it:itemPreview(sl,p.lv,r)}); } }
  return out; }
function itemValue(it){ return Math.round(30*(1+it.r*1.6)*(1+(it.lv||0)*.5)); }
function equipItem(m,it){ if(!it) return 'Barang tidak ada.'; m.eq=m.eq||{}; if(it.on&&it.on!==m.id){ const o=G.mons.find(x=>x.id===it.on); if(o&&o.eq) delete o.eq[it.s]; }
  const old=m.eq[it.s]&&G.inv.find(x=>x.id===m.eq[it.s]); if(old) old.on=null; m.eq[it.s]=it.id; it.on=m.id; return null; }
function unequip(m,slot){ if(!m.eq||!m.eq[slot]) return; const it=G.inv.find(x=>x.id===m.eq[slot]); if(it) it.on=null; delete m.eq[slot]; }
function tierOf(n){ G.bahanT=G.bahanT||{}; if(G.bahanT[n]!=null) return G.bahanT[n]; const i=BAHAN.indexOf(n); return i>=0?i:0; }
function addBahan(n,t){ G.bahan[n]=(G.bahan[n]||0)+1; G.bahanT=G.bahanT||{}; if(t!=null) G.bahanT[n]=t; }
function forgeCost(it){ return {gold:Math.round(80*(it.lv+1)*(it.r+1)),mana:Math.round(20*(it.lv+1)*(1+it.r*.5))}; }
function forgeItem(it){ if(it.lv>=10) return 'Sudah +10.'; const c=forgeCost(it); if(G.gold<c.gold) return `Emas kurang (butuh ${c.gold}).`; if(G.mana<c.mana) return `Mana kurang (butuh ${c.mana}).`;
  G.gold-=c.gold; G.mana-=c.mana; it.lv++; return null; }
function sellItem(it){ if(it.on){ const m=G.mons.find(x=>x.id===it.on); if(m) unequip(m,it.s); } G.inv=G.inv.filter(x=>x!==it); G.gold+=itemValue(it); }
function buyItem(){ const c=250; if(G.gold<c) return `Emas kurang (butuh ${c}).`; G.gold-=c; return genItem(Math.max(1,fameLv()*.6),null,{preRune:.15}); }
function advGearP(p){ return Math.min(.08,.025+p.lv*.0004)*(1+(JOBS[p.job].star-2)*.15); }
function advGearR(p,hero){ return hero?3:Math.max(0,JOBS[p.job].star-3); }
function advDrops(p,a,hero){ p.bag=[];
  if(rnd()<.03+JOBS[p.job].star*.01+(hero?.3:0)){ const rn=addRune(Math.min(5,1+Math.floor(p.lv/40)+(rnd()<.2?1:0))); say(a.x,a.floor-0,'+'+runeName(rn),RUNE[rn.k].c,1.6); if(rn.g>=2||rnd()<.3) log(`${p.name} (${jobTag(p.job)}) menjatuhkan ${runeName(rn)}.`,'evo'); }
  if(hero||rnd()<advGearP(p)){ const gear=JOB_GEAR[p.job]; const sl=rnd()<.5?'senjata':rnd()<.7?'zirah':'aksesori'; const idx={senjata:0,zirah:1,aksesori:2}[sl];
    const nm=gear?pick(gear[idx])+(p.el?' of '+ELEM_BY[p.el].n:''):null; const it=genItem(p.lv,advGearR(p,hero),{s:sl,n:nm||undefined,from:`${p.name} (${JOBS[p.job].n})`,el:p.el||undefined,bias:jobBias(p.job),preRune:.35});
    say(a.x,a.floor,'+'+it.n,'#c8f0a0',1.6);
    if(it.r>=2||hero||rnd()<.3) log(`${p.name} (${jobTag(p.job)}) menjatuhkan ${it.n} (${RARITY[it.r]})! Mira menyimpannya di gudang.`,'evo'); } }
function monAtkEl(m){ for(const ab of m.abil){ const A=ABIL[ab]; if(A&&A.eff==='elemAtk') return A.el; } return SPECIES[m.sp].el||(FIRE_MK.has(SPECIES[m.sp].mk)?'api':ICE_MK.has(SPECIES[m.sp].mk)?'es':''); }
function monDefEl(m){ const s=SPECIES[m.sp]; return s.el||(FIRE_MK.has(s.mk)?'api':ICE_MK.has(s.mk)?'es':''); }
function applyStatus(a,st,m,d){ const p=G.people[a.pid];
  if(st==='burn') a.fx.burn=G.t+4; else if(st==='slow') a.fx.slow=G.t+5; else if(st==='stun') a.fx.stun=G.t+1.5; else if(st==='poison') a.fx.poison=G.t+6; else if(st==='curse') a.fx.curse=G.t+8;
  else if(st==='blind') a.fx.blind=G.t+6; else if(st==='root') a.fx.root=G.t+3; else if(st==='brk') a.fx.brk=G.t+8; else if(st==='sleep') a.fx.sleep=G.t+3; else if(st==='charm') a.fx.charm=G.t+3;
  else if(st==='drain'&&m){ const ms=monStats(m); m.hp=Math.min(ms.hp,m.hp+(d||0)*.6+ms.hp*.05); }
  else if(st==='gold'&&p){ const g=Math.round(p.gold*.12); p.gold-=g; G.gold+=g; if(g) say(a.x,a.floor,'+'+g+'G','#ffd36a',1); }
  else if(st==='mana'&&m){ G.mana+=8+m.lv; } }
function floorKabut(f){ return G.mons.some(o=>!o.dead&&o.floor===f&&o.abil.includes('kabut'))?.08:0; }
function lordStats(){ const L=G.lord; const r=L.race;
  return {hp:Math.round((760+L.lv*72)*(1+G.floors*.08)*(r==='orc'?1.4:1)),atk:(20+L.lv*3)*(r==='oni'?1.4:1),def:(4+L.lv*1.1)*(r==='ksatria'?1.5:1),eva:.04,rng:r==='naga'?40:15}; }
function advStats(p){ const J=JOBS[p.job]; const k=STAR_MUL[J.star||2]*(p.isekai?1.2:1); return {hp:Math.round((J.hp+J.grow[0]*(p.lv-1))*k+p.eq.hp),atk:(J.atk+J.grow[1]*(p.lv-1))*k+p.eq.atk,def:(J.def+J.grow[2]*(p.lv-1))*k+p.eq.def,eva:J.eva+Math.min(.12,p.lv*.0012),rng:J.rng}; }
function monCap(m){ return STAGE_CAP[SPECIES[m.sp].stage]||100; }
function monNeed(m){ return Math.round(14*Math.pow(m.lv,1.35)); }
function reviveCost(m){ return Math.round((10+m.lv*2+(SPECIES[m.sp].stage-1)*25)*(G.lord.race==='lich'?.6:1)); }

/* ---------- Raja Iblis ---------- */
function newLord(first){
  const prev=G.lord&&G.lord.race;
  const r=pick(LORD_RACE.filter(x=>x.id!==prev));
  const R=RACE[r.race]||RACE.iblis;
  G.lord={race:r.id,name:advName(r.race||'iblis').n,lv:1,exp:0,hp:1,x:fend(topF()),cd:{},fx:{},kills:0,born:G.day,
    app:{skin:r.skin||pick((R.skin)),hair:r.hair||pick(R.hair),eye:'#ff3040',cloth:'#2a1a2a',cloth2:'#5a1a2a',outfit:'mantel',style:'long'}};
  G.lord.hp=lordStats().hp; G.lordSince=G.t;
  if(!first){ log(`Kabut hitam berputar di singgasana. Raja Iblis baru bangkit: ${G.lord.name} sang ${r.n}! (${r.d}) Gerbang kastil tersegel sebentar dan para monster mengamuk membela raja barunya.`,'lord'); fxAt('rise',G.lord.x,topF(),'#c060ff',1.5); }
}
function lordGainExp(n){ const L=G.lord; L.exp+=n; let up=0; while(L.exp>=Math.round(30*Math.pow(L.lv,1.4))&&L.lv<999){ L.exp-=Math.round(30*Math.pow(L.lv,1.4)); L.lv++; up++; } if(up){ const st=lordStats(); L.hp=Math.min(st.hp,L.hp+st.hp*.3); say(L.x,topF(),'LEVEL UP!','#ffd040',1.5); if(L.lv%5===0) log(`Raja Iblis ${L.name} mencapai level ${L.lv}.`,'lord'); } }

/* ---------- petualang ---------- */
function fameLv(){ return 1+Math.sqrt(G.pop)*1.45+G.floors*.85+Math.min(30,(G.t-G.lordSince)/DAY_LEN*.6); }
function newPerson(lv,job,race){
  race=race||pick(ADV_RACES); const {n,sx}=advName(race); const R=RACE[race];
  const jb=job||pick(JOB_KEYS); const p={id:nid(),name:n,race,sx,job:jb,el:JOB_EL[jb]?pick(JOB_EL[jb]):'',lv:Math.max(1,Math.round(lv)),exp:0,eq:{hp:0,atk:0,def:0},gold:20+Math.round(lv*8),kills:0,alive:true,party:null,title:null,visits:0,
    app:{skin:pick(R.skin),hair:pick(R.hair),eye:pick(R.eye),cloth:pick(CLOTH),cloth2:pick(CLOTH),outfit:sx==='f'&&rnd()<.3?'gaun':pick(OUTFITS),style:sx==='f'&&rnd()<.7?pick(['long','tail','bun','braid']):pick(HAIRSTYLES)}};
  G.people[p.id]=p; return p;
}
const CLOTH=['#5b7aa8','#a85b4a','#6a8a4a','#8a6aa8','#b8944a','#4a8a8a','#9a5a7a','#c8b89a','#7a5a3a','#3f4a6a','#a8a050','#d07a5a','#5a6a5a','#e0d8c8','#8a3a3a'];
const OUTFITS=['tunik','tunik','rompi','mantel','kemeja','syal'];
const HAIRSTYLES=['short','short','long','tail','bun','braid','spiky'];
function newParty(){
  const L=fameLv(); const r=rnd();
  let tier, size, lv;
  const soloP=.02+Math.min(.06,G.pop/3000);
  if(r<soloP){ tier='solo'; size=1; lv=Math.max(30,L*2.4+ri(0,25)); }
  else if(G.pop<30&&r<.55||r<.3){ tier='baru'; size=ri(2,4); lv=ri(1,8)+L*.15; }
  else if(r<.72){ tier='biasa'; size=ri(3,5); lv=L*rand(.75,1.1); }
  else if(r<.92){ tier='veteran'; size=ri(3,5); lv=L*rand(1.15,1.5); }
  else { tier='elite'; size=ri(4,5); lv=L*rand(1.5,1.9); }
  const jobs=[]; const core=size>=3?['knight','priest',pick(['mage','archer'])]:[];
  const pickJob=()=>pickJobStar(tier);
  for(let i=0;i<size;i++) jobs.push(core[i]||pickJob());
  const pa={id:nid(),tier,members:[],state:'town',saveFloor:0,nextVisit:0,visits:0,wins:0,name:'',quote:''};
  for(const j of jobs){ const p=newPerson(Math.max(1,lv+ri(-3,3)),tier==='solo'?pickJobStar('solo'):j); p.party=pa.id; pa.members.push(p.id); }
  if(tier==='solo'){ const p=G.people[pa.members[0]]; p.title=`the ${pick(EPI_ADJ)} ${EPI_JOB[p.job]||JOBS[p.job].n}`; pa.name=`${p.name} ${p.title}`; }
  else if(tier==='baru') pa.name=rnd()<.5?'Newcomer Party':`Party ${pick(PARTY_A)} ${pick(PARTY_B)}`;
  else pa.name=`${pick(PARTY_A)} ${pick(PARTY_B)}`;
  G.parties.push(pa); return pa;
}
function partyMembers(pa){ return pa.members.map(id=>G.people[id]).filter(p=>p&&p.alive); }
function enterDungeon(pa){
  const mem=partyMembers(pa); if(!mem.length){ pa.state='gone'; return; }
  pa.state='in'; pa.visits++; G.stats.visits++; pa.loot=0; pa.entered=G.t; pa.retreat=false; pa.disarm={};
  const f=Math.min(pa.saveFloor,topF()); const restX=restSlotX(f);
  const famous=pa.visits>=4||pa.wins>0||pa.hero;
  if(pa.hero) pa.quote=pick(['Atas nama kerajaan, Raja Iblis harus tumbang hari ini!','Seluruh negeri menunggu kabar kemenangan kami!','Kami dikirim untuk mengakhiri kekuasaanmu.','Aku dipanggil dari dunia lain untuk menghentikanmu, Raja Iblis!','Kata raja, kalau kau tumbang, aku boleh pulang ke duniaku.']);
  else if(pa.wins>0&&rnd()<.6) pa.quote=pick(SLAYER_LINES).replace('{lord}',pa.slain||'itu');
  else if(famous&&!pa.hero) pa.quote=pick(FAMOUS_LINES).replace('{save}',pa.saveFloor+1).replace('{name}',pa.name).replace('{visits}',pa.visits-1);
  else pa.quote=partyQuote(pa);
  pa.famous=famous;
  mem.forEach((p,i)=>{ const st=advStats(p); const a={pid:p.id,party:pa.id,floor:f,x:(f>0&&restX!=null?restX:fstart(f))-fdir(f)*i*9,hp:st.hp,cd:{atk:rand(0,.5),sk:rand(2,5)},fx:{},walk:0,seen:{},dmgDone:0};
    G.advs.push(a); });
  const lead=G.advs.find(a=>a.party===pa.id);
  say(lead.x,f,`"${pa.quote}"`,famous?'#ffd36a':'#ffe8c0',3.2);
  const talkers=G.advs.filter(a=>a.party===pa.id).sort(()=>rnd()-.5).slice(0,famous?2:1);
  talkers.forEach((a,i)=>{ const p=G.people[a.pid]; const L_=JOB_LINES[p.job]; if(!L_||rnd()<.35) return; setTimeout0(()=>{ if(G.advs.includes(a)) say(a.x,a.floor,`${p.name}: "${pick(L_)}"`,'#d8e8ff',2.6); },1.8+i*1.6); });
  log(`${famous?'Party terkenal ':''}${pa.name} masuk${f>0?` lewat titik simpan lantai ${f+1}`:''}: ${mem.map(p=>`${p.isekai?'🌀':''}${jobTag(p.job)} Lv${p.lv}`).join(', ')} — "${pa.quote}"`,pa.tier==='solo'||pa.tier==='elite'?'warn':'adv');
}
function heroTick(){
  const days=(G.t-G.lordSince)/DAY_LEN; G.heroN=G.heroN||0;
  if(days<3+G.heroN*2.5||G.parties.some(p=>p.hero&&p.state==='in')) return;
  G.heroN++;
  const L=fameLv(); const pa={id:nid(),tier:'elite',hero:1,members:[],state:'town',saveFloor:0,nextVisit:0,visits:0,wins:0,name:'',quote:''};
  const lv=L*1.55+G.lord.lv*.4;
  const lj=pick(['hero','swordmaster','sage','arrowQueen','stormLord','spearGod','fistKing']);
  for(const j of [lj,'knight','priest','mage',pick(['dualblade','archer','paladin','ninja'])]){ const p=newPerson(lv+ri(-2,4),j,'manusia'); p.party=pa.id; pa.members.push(p.id); p.eq.atk+=lv*.6; p.eq.def+=lv*.3; p.eq.hp+=lv*6; }
  const ld=G.people[pa.members[0]]; makeIsekai(ld,0); ld.job=lj; ld.el=JOB_EL[lj]?pick(JOB_EL[lj]):''; ld.title='the Summoned Hero'; pa.name=pick([`Hero Party of ${ld.name}`,`${ld.name.split(' ')[0]}'s Hero Party`,`Brave Party of ${ld.name.split(' ')[0]}`]);
  let best=0; for(let f=0;f<G.floors;f++) if(restSlotX(f)!=null) best=f; pa.saveFloor=Math.max(0,Math.min(best,G.floors-2));
  G.parties.push(pa); log(`Kerajaan-kerajaan cemas: Raja Iblis ${G.lord.name} sudah ${Math.floor(days)} hari tak terkalahkan. ${pa.name} dikirim untuk menumpasnya!`,'warn');
  enterDungeon(pa);
}
function restSlotX(f){ const row=G.fix[f]; if(!row) return null; const i=row.findIndex(x=>x&&x.t==='rest'); return i>=0?SLOT_X(i):null; }
function spawnTick(dt){
  G.spawnT-=dt; if(G.spawnT>0||G.t<(G.sealed||0)) return;
  const inside=G.parties.filter(p=>p.state==='in').length;
  const maxIn=Math.min(12,2+Math.floor(G.pop/45));
  G.spawnT=Math.max(4,26/(1+G.pop/70))*rand(.7,1.3);
  if(inside>=maxIn) return;
  const cap=fameLv()*1.5+6;
  let pa=G.parties.find(p=>{ if(p.state!=='town'||p.nextVisit>G.t) return false; const mm=partyMembers(p); if(!mm.length) return false; const av=mm.reduce((s,x)=>s+x.lv,0)/mm.length; return (av<=cap||p.tier==='solo'&&rnd()<.15)&&rnd()<.6; });
  if(!pa) pa=newParty();
  enterDungeon(pa);
}
function leaveDungeon(pa,how){
  const mem=G.advs.filter(a=>a.party===pa.id);
  for(const a of mem){ fxAt('warp',a.x,a.floor,'#9fe0ff',.8); }
  G.advs=G.advs.filter(a=>a.party!==pa.id);
  const ppl=partyMembers(pa);
  if(!ppl.length){ pa.state='gone'; return; }
  pa.state='town'; pa.nextVisit=G.t+(how==='menang'?rand(500,900):rand(60,160));
  for(const p of ppl){ p.visits++; levelPerson(p); }
  if(how==='kabur'){ G.pop+=1+pa.loot*.04; log(`${pa.name} memakai Kristal Kembali dan kabur${pa.loot?` membawa ${pa.loot} emas harta`:''}.`,'adv'); }
  else if(how==='menang'){ G.pop+=4; }
  else if(how==='puas'){ G.pop+=2+pa.loot*.05; log(`${pa.name} pulang dengan puas${pa.loot?` membawa ${pa.loot} emas harta`:''}. Mereka akan bercerita tentang kastil ini di kota.`,'adv'); }
  cullPeople();
}
function levelPerson(p){ let n=0; while(p.exp>=Math.round(25*Math.pow(p.lv,1.3))&&p.lv<200){ p.exp-=Math.round(25*Math.pow(p.lv,1.3)); p.lv++; n++; } return n; }
function cullPeople(){ const ids=Object.keys(G.people); if(ids.length<700) return; for(const id of ids){ const p=G.people[id]; if(!p.alive&&!p.hall) delete G.people[id]; } G.parties=G.parties.filter(pa=>pa.state!=='gone'||G.parties.length<200); }

/* ---------- pertempuran ---------- */
function unitOf(ref){ return ref.k==='m'?G.mons.find(m=>m.id===ref.id):ref.k==='a'?G.advs.find(a=>a.pid===ref.id):ref.k==='l'?G.lord:null; }
function evade(eva){ return rnd()<eva; }
function dmgCalc(atk,def,mult){ return Math.max(1,atk*mult*rand(.85,1.15)*(1-def/(def+70))); }
// serangan monster/raja → petualang
function hitAdv(a,amt,src,opts){
  opts=opts||{}; const p=G.people[a.pid]; const st=advStats(p);
  if(!opts.sure&&evade(st.eva*(a.fx.slow>G.t?.5:1))){ say(a.x,a.floor,'MISS','#cfd8e8',.8); return 0; }
  let em=1; { const el=opts.el!=null?opts.el:(src&&src.kind==='m'?monAtkEl(src.u):''); em=elemMult(el,p.el); if(em>1&&rnd()<.35) say(a.x,a.floor-0,'Efektif!','#ffb040',.9); }
  let d=dmgCalc(amt,st.def*(a.fx.guard>G.t?2:1)*(a.fx.brk>G.t?.6:1),(opts.mult||1)*em);
  if(src&&src.kind==='m'){ const X=monX(src.u); let eb=0; for(const e in X.elDmg) eb+=X.elDmg[e]*elemMult(e,p.el); d*=1+eb; if(G._abil===src.u) d*=1+X.mag; }
  if(a.fx.sleep>G.t){ d*=2; a.fx.sleep=0; say(a.x,a.floor,'KOMBO!','#ff9ad0',1.2); }
  if(opts.crit){ d*=(src&&src.kind==='m'&&src.u.abil.includes('tajam')?2.4:1.8)+(src&&src.kind==='m'?monX(src.u).critD:0); }
  d=Math.round(d); a.hp-=d; a.lastHit=G.t;
  if(src&&src.kind==='m'&&src.u.abil.includes('pencuri')){ const pp=G.people[a.pid]; if(pp&&pp.gold>0){ const s_=Math.min(3,pp.gold); pp.gold-=s_; G.gold+=s_; } }
  say(a.x,a.floor,String(d),opts.crit?'#ffd040':'#ff8a7a',.9);
  if(src&&src.kind==='m'){ const m=src.u; m.dmgDone=(m.dmgDone||0)+d; monGainExp(m,d*.6); if(m.abil.includes('haus')){ m.hp=Math.min(monStats(m).hp,m.hp+d*.2); } const X=monX(m); if(X.steal) m.hp=Math.min(monStats(m).hp,m.hp+d*X.steal); a.hitT=G.t; a.hitDir=Math.sign(a.x-m.x)||1; wearEq(m,'atk'); }
  if(src&&src.kind==='l'&&G.lord.race==='vampir') G.lord.hp=Math.min(lordStats().hp,G.lord.hp+d*.3);
  if(a.hp<=0) advDie(a,src);
  return d;
}
function advDie(a,src){
  const p=G.people[a.pid]; const pa=G.parties.find(x=>x.id===a.party);
  p.alive=false; G.advs=G.advs.filter(x=>x!==a); G.stats.kills++;
  const gold=Math.round(p.gold*.8+p.lv*4)*(src&&src.kind==='m'&&src.u.abil.includes('untung')?1.5:1);
  G.gold+=Math.round(gold); G.jiwa+=1+Math.floor(p.lv/10); G.mana+=5+p.lv;
  fxAt('soul',a.x,a.floor,'#c08aff',1);
  say(a.x,a.floor,`+${Math.round(gold)}G`,'#ffd36a',1.4);
  lordGainExp(p.lv*6+10);
  advDrops(p,a,pa&&pa.hero);
  let killer='jebakan';
  if(src&&src.kind==='m'){ const m=src.u; m.kills++; if(m.abil.includes('serapJiwa')){ const ms=monStats(m); m.hp=Math.min(ms.hp,m.hp+ms.hp*.3); } m.loy=Math.min(100,m.loy+1); const X=monX(m); monGainExp(m,(p.lv*14+20)*(1+X.exp)); if(X.mana) G.mana+=X.mana; if(X.gold){ const g2=Math.round(gold*X.gold); G.gold+=g2; } killer=`${m.name} (${SPECIES[m.sp].n})`; }
  else if(src&&src.kind==='l'){ G.lord.kills++; killer=`Raja Iblis ${G.lord.name}`; }
  if(pa){ pa.members=pa.members.filter(id=>id!==p.id); const left=G.advs.filter(x=>x.party===pa.id);
    if(!left.length){ pa.state='gone'; log(`${pa.name} musnah di lantai ${a.floor+1}. ${p.name} ${JOBS[p.job].n} Lv${p.lv} adalah yang terakhir tumbang, oleh ${killer}.`,'kill'); }
    else if(p.lv>=20||rnd()<.35) log(`${p.name}${p.title?' '+p.title:''} (${JOBS[p.job].n} Lv${p.lv}) dari ${pa.name} tewas oleh ${killer}.`,'kill'); }
}
// serangan petualang → monster
function hitMon(m,amt,a,opts){
  opts=opts||{}; const st=monStats(m);
  if(!opts.sure&&evade(st.eva)){ say(m.x,m.floor,'MISS','#cfd8e8',.8); return 0; }
  const ap=a&&G.people[a.pid]; const ael=ap?ap.el:''; let em=elemMult(ael,monDefEl(m)); if(ael&&m.abil.includes('tameng_'+ael)) em*=.6;
  let d=dmgCalc(amt,st.def,(opts.mult||1)*em); if(opts.crit) d*=1.8; if(em>1&&rnd()<.3) say(m.x,m.floor,'Lemah!','#9fe0ff',.9);
  if(a){ m.aggro=a.pid; m.aggroT=G.t; }
  if(m.abil.includes('kulitBaja')) d*=.8;
  if(opts.magic&&m.abil.includes('kebalSihir')) d*=.6;
  if(m.fx.perisai>G.t) d*=.7;
  { const X=monX(m); if(ael&&X.elRes[ael]) d*=1-X.elRes[ael]; if(X.thorns&&a&&!opts.ranged&&a.hp>0) hitAdv(a,d*X.thorns,{kind:'m',u:m},{sure:1}); wearEq(m,'def'); if(a){ m.hitT=G.t; m.hitDir=Math.sign(m.x-a.x)||1; } }
  if(G.mons.some(o=>o!==m&&!o.dead&&o.floor===m.floor&&o.abil.includes('pelindung'))) d*=.88;
  if(opts.magic&&m.abil.includes('pantul')&&a){ hitAdv(a,d*.3,{kind:'m',u:m},{sure:1}); }
  if(!opts.magic&&m.abil.includes('duri')&&a&&!opts.ranged){ hitAdv(a,d*.2,{kind:'m',u:m},{sure:1}); }
  d=Math.round(d); if(m.hp-d<=0&&m.abil.includes('tegar')&&G.t-(m.tegarAt||-99)>30){ d=Math.max(0,Math.round(m.hp-1)); m.tegarAt=G.t; say(m.x,m.floor,'Tegar!','#ffd36a',1.2); }
  m.hp-=d; m.lastHit=G.t; if(m.fx.sleep) m.fx.sleep=0;
  say(m.x,m.floor,String(d),opts.crit?'#ffd040':'#ffffff',.9);
  if(a){ const p=G.people[a.pid]; if(p){ p.exp+=d*.25; a.dmgDone+=d; } }
  if(m.hp<=0) monDie(m,a);
  return d;
}
function monLoot(m,a){
  if(!a||m.temp) return; const p=G.people[a.pid]; if(!p) return; const T=dropTheme(m.sp); const s=SPECIES[m.sp]; const rk=RANK_ORDER.indexOf(s.rank);
  p.bag=p.bag||[]; const r=rnd();
  if(r<.015+rk*.003){ const slot=pick(Object.keys(EQ_SLOT)); const n=pick(T.eq[slot]); const e={k:'eq',s:slot,n,r:Math.min(4,T.rar+(rnd()<.1?1:0)),lv:m.lv+rk*4,from:s.n}; p.bag.push(e);
    const lvB=e.lv; const mul=1+e.r*.55; if(slot==='senjata') p.eq.atk+=(1+lvB*.5)*1.1*mul; else if(slot==='zirah'){ p.eq.hp+=(12+lvB*4)*mul; p.eq.def+=(1+lvB*.3)*mul; } else p.eq.atk+=(1+lvB*.5)*.35*mul;
    say(m.x,m.floor,n+'!','#ffd36a',1.6); log(`${p.name} (${jobTag(p.job)}) memungut ${n} (${RARITY[e.r]}) dari ${m.name} si ${s.n} yang tumbang!`,'warn'); }
  else if(r<.1+rk*.008){ p.bag.push({k:'core',n:T.core,t:Math.min(6,T.tier+1)}); say(m.x,m.floor,T.core,'#c8a0ff',1.4); }
  else if(r<.4){ p.bag.push({k:'mat',n:T.mat,t:T.tier}); }
  if(p.bag.length>12) p.bag.shift();
}
function monDie(m,a){
  wearEq(m,'die',2); m.dead=true; m.hp=0; m.reviveAt=G.t+60; m.loy=Math.max(0,m.loy-3); m.fx={};
  fxAt('poof',m.x,m.floor,'#a89ab8',.8);
  if(a){ const p=G.people[a.pid]; if(p){ p.kills++; p.exp+=m.lv*10+20; } }
  monLoot(m,a);
  if(m.secret){ const fx=G.fix[m.secret.f]&&G.fix[m.secret.f][m.secret.slot]; if(fx&&fx.found&&a&&secretMons(fx).every(g=>g.dead)){ const pa=G.parties.find(x=>x.id===a.party); const bonus=60+m.secret.f*35; if(pa){ pa.loot+=bonus; for(const p of partyMembers(pa)){ p.gold+=Math.round(bonus/Math.max(1,pa.members.length)); p.eq.atk+=2; } } G.pop+=10; log(`${pa?pa.name:'Seseorang'} menaklukkan penjaga ruang rahasia lantai ${m.secret.f+1} dan membawa pulang harta tersembunyi (${bonus} emas). Kabarnya cepat menyebar!`,'warn'); } }
}
function hitLord(amt,a,opts){
  opts=opts||{}; const L=G.lord; if(L.hp<=0) return 0; const st=lordStats();
  if(!opts.sure&&evade(st.eva)){ say(L.x,topF(),'MISS','#cfd8e8',.8); return 0; }
  let d=Math.round(dmgCalc(amt,st.def,opts.mult||1)*(opts.crit?1.8:1)); L.hp-=d; L.lastHit=G.t;
  say(L.x,topF(),String(d),'#ffffff',.9);
  if(a){ const p=G.people[a.pid]; if(p) p.exp+=d*.3; }
  if(L.hp<=0) lordDie(a);
  return d;
}
function lordDie(a){
  const L=G.lord; const pa=a&&G.parties.find(x=>x.id===a.party); const r=lordRace();
  const p=a&&G.people[a.pid]; const loot=Math.round(G.gold*.15);
  G.gold-=loot; G.pop=G.pop*.6; G.stats.lords++;
  const lived=Math.round(G.t-G.lordSince);
  G.hall.unshift({d:G.day,lord:`${L.name} sang ${r.n}`,lv:L.lv,by:pa?pa.name:'?',hero:p?`${p.name} (${JOBS[p.job].n} Lv${p.lv})`:'?',lived}); if(G.hall.length>50) G.hall.pop();
  if(p){ p.title=p.title||'Pembunuh Raja Iblis'; p.hall=1; }
  log(`RAJA IBLIS TUMBANG! ${L.name} sang ${r.n} (Lv${L.lv}) dikalahkan oleh ${pa?pa.name:'petualang'}${p?`, pukulan terakhir dari ${p.name}`:''}. Mereka menjarah ${loot} emas. Popularitas kastil anjlok.`,'lord');
  fxAt('boom',L.x,topF(),'#ff4060',1.4);
  if(pa){ pa.wins++; pa.slain=L.name; pa.loot+=loot; leaveDungeon(pa,'menang'); }
  G.heroN=0; G.sealed=G.t+45; G.rage=G.t+DAY_LEN*1.5; setTimeout0(()=>newLord(false),3);
}
const TIMERS=[]; function setTimeout0(fn,s){ TIMERS.push({at:G.t+s,fn}); }

/* ---------- monster: level, evolusi, fusi ---------- */
function monGainExp(m,n){
  const cap=monCap(m); const s=SPECIES[m.sp];
  if(m.lv>=cap&&!s.next) return;
  m.exp+=n;
  while(m.exp>=monNeed(m)){
    if(m.lv>=cap){ if(s.next){ evolveMon(m); } else m.exp=0; return; }
    m.exp-=monNeed(m); m.lv++; checkLearn(m); const st=monStats(m); m.hp=Math.min(st.hp,m.hp+st.hp*.25);
    if(m.floor>=0) say(m.x,m.floor,'Lv UP','#9fff9a',1);
    if(m.lv>=cap&&s.next){ evolveMon(m); return; }
  }
}
function checkLearn(m,quiet){
  for(const e of learnset(m.sp)){ if(m.lv<e.lv||m.abil.includes(e.ab)) continue;
    if(m.abil.length<5){ m.abil.push(e.ab); if(m.pending===e.ab) m.pending=null; if(!quiet){ if(m.floor>=0) say(m.x,m.floor,'Belajar '+ABIL[e.ab].n+'!','#9fe0ff',1.6); if(rnd()<.35) log(`${m.name} si ${SPECIES[m.sp].n} mempelajari ${ABIL[e.ab].n}.`,'evo'); } }
    else if(!m.pending&&!(m.skip||[]).includes(e.ab)) m.pending=e.ab; }
}
function forgetAbil(m,ab){ if(m.abil.length<=1) return 'Monster harus punya minimal satu ability.'; m.abil=m.abil.filter(x=>x!==ab); if(m.pending&&!m.abil.includes(m.pending)&&m.abil.length<5){ m.abil.push(m.pending); m.pending=null; } return null; }
function skipLearn(m){ if(!m.pending) return; m.skip=(m.skip||[]).concat(m.pending); m.pending=null; }
function evolveMon(m){
  const from=SPECIES[m.sp]; const to=SPECIES[from.next]; if(!to) return;
  const before=monStats(m);
  m.sp=to.id; m.lv=1; m.exp=0; m.boost=1;
  const after=monStats(m); m.boost=Math.max(1,before.hp/after.hp)*1.08; m.hp=monStats(m).hp;
  if(!m.abil.includes(to.ab)&&m.abil.length<5) m.abil.push(to.ab); checkLearn(m,true);
  fxAt('evo',m.x,Math.max(0,m.floor),'#ffd860',1.6);
  log(`${m.name} si ${from.n} mencapai batas level dan BEREVOLUSI menjadi ${to.n} (tahap ${to.stage})! Level kembali ke 1, batas baru Lv${STAGE_CAP[to.stage]}.`,'evo');
}
function fuseMons(a,b){
  if(a===b) return 'Pilih dua monster berbeda.';
  const ab=b.abil[0]; const cost=fuseCost(b);
  if(G.gold<cost) return `Emas kurang (butuh ${cost}).`;
  if(a.abil.length>=5) return `${a.name} sudah punya 5 ability.`;
  if(a.abil.includes(ab)) return `${a.name} sudah punya ${ABIL[ab].n}.`;
  G.gold-=cost; a.abil.push(ab); monGainExp(a,b.lv*b.lv*4+b.exp);
  if(b.secret) clearSecret(b);
  G.mons=G.mons.filter(x=>x!==b);
  log(`Fusi: ${b.name} menyatu ke dalam ${a.name}. ${a.name} mewarisi ${ABIL[ab].n}.`,'evo');
  return null;
}
function trainCost(m){ return Math.round(20+m.lv*6+(SPECIES[m.sp].stage-1)*40); }
function trainMon(m){ const c=trainCost(m); if(G.mana<c) return `Mana kurang (butuh ${c}).`; if(m.lv>=monCap(m)&&!SPECIES[m.sp].next) return `${m.name} sudah di level maksimal.`; G.mana-=c; monGainExp(m,monNeed(m)*.6); m.loy=Math.min(100,m.loy+1); return null; }
function trapUpCost(fx){ return Math.round(FIX[fx.t].cost*.6*Math.pow(1.6,(fx.lv||1)-1)); }
function upgradeTrap(f,i){ const fx=G.fix[f][i]; if(!fx||!FIX[fx.t]||FIX[fx.t].cat!=='jebakan') return 'Bukan jebakan.'; if((fx.lv||1)>=10) return 'Jebakan sudah level maksimal.'; const c=trapUpCost(fx); if(G.mana<c) return `Mana kurang (butuh ${c}).`; G.mana-=c; fx.lv=(fx.lv||1)+1; say(SLOT_X(i),f,'Jebakan Lv'+fx.lv,'#9fe0ff',1.2); return null; }
/* ---------- minta izin ganti nama ---------- */
function askRename(m,name){
  name=String(name||'').trim().slice(0,16); if(!name) return {ok:false,msg:'Tulis nama dulu.'};
  if(name===m.name) return {ok:false,msg:'Itu memang namanya.'};
  if(!m.pers) m.pers=pick(PERS_KEYS);
  if(m.askDay!==G.day){ m.askDay=G.day; m.ask=0; }
  const P=PERS[m.pers];
  if(m.ask>=3) return {ok:false,reply:'Sudah kubilang tidak! Jangan tanya lagi hari ini.',annoyed:1};
  let p=(m.loy-35)/55+P.p-m.ask*.12; p=clamp(p,.05,.95);
  if(rnd()<p){ const old=m.name; m.name=name; m.loy=Math.min(100,m.loy+2); m.ask=0; return {ok:true,reply:pick(P.yes),old}; }
  m.ask++; m.loy=Math.max(0,m.loy-2);
  if(m.pers==='usil'){ const alt=monName(); return {ok:false,reply:pick(P.no)+`"${alt}"!`,alt}; }
  return {ok:false,reply:pick(P.no)};
}
function acceptAlt(m,alt){ m.name=alt; m.ask=0; m.loy=Math.min(100,m.loy+4); }
function fuseCost(b){ return 60+SPECIES[b.sp].rar*60+b.lv*4; }
const SECRET_MAX=3;
function secretMons(fx){ if(!fx) return []; if(fx.mon!=null&&!fx.mons){ fx.mons=[fx.mon]; } delete fx.mon; fx.mons=(fx.mons||[]).filter(id=>G.mons.some(m=>m.id===id)); return fx.mons.map(id=>G.mons.find(m=>m.id===id)); }
function clearSecret(m){ const s=m.secret; if(s&&G.fix[s.f]&&G.fix[s.f][s.slot]){ const fx=G.fix[s.f][s.slot]; secretMons(fx); fx.mons=fx.mons.filter(id=>id!==m.id); } m.secret=null; }
function addSecret(f,slot,m){ const fx=G.fix[f][slot]; if(!fx||fx.t!=='rahasia') return 'Bukan dinding rahasia.'; const list=secretMons(fx); if(list.includes(m)) return null; if(list.length>=SECRET_MAX) return `Ruang rahasia sudah berisi ${SECRET_MAX} penjaga.`; if(m.secret) clearSecret(m); fx.mons.push(m.id); m.secret={f,slot}; m.floor=f; m.px=SLOT_X(slot)+(fx.mons.length-2)*7; m.x=m.px; return null; }

/* ---------- gacha ---------- */
const GACHA_ODDS=[.55,.28,.12,.045,.005];
function gachaRoll(minR){
  const luck=Math.min(.02,G.aura*.0004);
  let r=rnd(), acc=0, ri_=0; const odds=GACHA_ODDS.slice(); odds[3]+=luck; odds[0]-=luck;
  for(let i=0;i<odds.length;i++){ acc+=odds[i]; if(r<acc){ ri_=i; break; } }
  if(minR!=null) ri_=Math.max(ri_,minR);
  const pool=GACHA_POOL[RARITY[ri_]]; const sid=pick(pool);
  const m=addMonster(sid); G.stats.gacha++;
  autoPlace(m);
  return m;
}
function gacha(n,cur){
  const cost=cur==='gold'?n*350:(n===10?90:n*10);
  if(cur==='gold'?G.gold<cost:G.jiwa<cost) return {err:cur==='gold'?`Emas kurang (butuh ${cost}).`:`Kristal Jiwa kurang (butuh ${cost}).`};
  if(cur==='gold') G.gold-=cost; else G.jiwa-=cost;
  const out=[]; for(let i=0;i<n;i++) out.push(gachaRoll(n===10&&i===9&&!out.some(m=>SPECIES[m.sp].rar>=2)?2:null));
  const best=out.reduce((a,m)=>SPECIES[m.sp].rar>SPECIES[a.sp].rar?m:a,out[0]);
  if(SPECIES[best.sp].rar>=3) log(`Lingkaran pemanggilan bersinar ${RARITY[SPECIES[best.sp].rar]}! ${best.name} si ${SPECIES[best.sp].n} bergabung.`,'evo');
  return {out};
}
function floorCount(f){ return G.mons.filter(m=>m.floor===f&&!m.secret).length; }
const FLOOR_CAP=5;
function autoPlace(m){ for(let f=0;f<G.floors;f++){ if(floorCount(f)<FLOOR_CAP){ m.floor=f; m.px=SLOT_X(ri(1,8)); m.x=m.px; return; } } m.floor=-1; }

/* ---------- toko & bangun ---------- */
function floorCost(){ return Math.round(400*Math.pow(1.22,G.floors-3)); }
function buyFloor(){
  if(G.floors>=MAX_FLOORS) return 'Kastil sudah 100 lantai.';
  const c=floorCost(); if(G.gold<c) return `Emas kurang (butuh ${c}).`;
  G.gold-=c; G.floors++; G.fix.push(Array(SLOTS).fill(null));
  G.lord.x=fend(topF());
  log(`Kastil bertambah tinggi: kini ${G.floors} lantai. Singgasana pindah ke lantai ${G.floors} (${themeOf(topF()).n}).`,'sys');
  return null;
}
function fixCost(fx){ return fx.t==='chest'?chestCost(fx.r):FIX[fx.t].cost; }
function orderPlace(f,slot,fx){
  if(G.fix[f][slot]) return 'Petak itu sudah terisi.';
  if(G.assist.q.some(q=>q.f===f&&q.slot===slot)) return 'Mira sudah menuju petak itu.';
  const c=fixCost(fx); if(G.gold<c) return `Emas kurang (butuh ${c}).`;
  G.gold-=c; G.assist.q.push({f,slot,fx}); return null;
}
function removeFix(f,slot){ const fx=G.fix[f][slot]; if(!fx) return; if(fx.t==='rahasia'){ for(const m of secretMons(fx)){ m.secret=null; m.px=SLOT_X(ri(1,8)); } }
  if(fx.t!=='chest') G.gold+=Math.round(fixCost(fx)*.5); G.fix[f][slot]=null; recalcAura(); }
function moveFix(f,i,f2,i2){ const fx=G.fix[f]&&G.fix[f][i]; if(!fx) return 'Tidak ada yang dipindah.'; if(G.fix[f2][i2]) return 'Petak tujuan terisi.';
  G.fix[f][i]=null; G.fix[f2][i2]=fx; if(fx.t==='rahasia'){ fx.found=false; secretMons(fx).forEach((m,k)=>{ m.secret={f:f2,slot:i2}; m.floor=f2; }); }
  G.assist.f=f2; G.assist.x=SLOT_X(i2); fxAt('spark',SLOT_X(i2),f2,'#ff9ad0',.6); say(SLOT_X(i2),f2,'Pindah!','#ff9ad0',1); return null; }
function recalcAura(){ let a=0; for(const row of G.fix) for(const x of row) if(x&&FIX[x.t]&&FIX[x.t].aura) a+=FIX[x.t].aura; G.aura=a; }
function assistTick(dt){
  const A=G.assist; const q=A.q[0];
  if(!q){ A.busy=0; const tx=FW/2+Math.sin(G.t*.3)*40; A.x+=(tx-A.x)*dt*.5; A.f=topF(); return; }
  if(A.f!==q.f){ A.fly=(A.fly||0)+dt; if(A.fly>.5){ A.f+=q.f>A.f?1:-1; A.fly=0; } return; }
  const tx=SLOT_X(q.slot); const d=tx-A.x;
  if(Math.abs(d)>2){ A.x+=Math.sign(d)*Math.min(Math.abs(d),55*dt); A.dir=Math.sign(d); return; }
  A.busy+=dt; if(Math.floor(A.busy*6)%2) fxAt('spark',A.x+ri(-6,6),A.f,'#ff9ad0',.4);
  if(A.busy>=1.1){ A.busy=0; A.q.shift(); if(!G.fix[q.f][q.slot]){ G.fix[q.f][q.slot]=q.fx; recalcAura(); say(tx,q.f,'Terpasang!','#ff9ad0',1.2); } else G.gold+=fixCost(q.fx); }
}

/* ---------- AI petualang ---------- */
function enemiesOn(f){ const out=[]; for(const m of G.mons) if(!m.dead&&m.floor===f&&!m.hidden&&!(m.secret&&!secretFound(m))) out.push(m); return out; }
function secretFound(m){ const fx=G.fix[m.secret.f]&&G.fix[m.secret.f][m.secret.slot]; return fx&&fx.found; }
function advTick(a,dt){
  const p=G.people[a.pid]; if(!p){ G.advs=G.advs.filter(x=>x!==a); return; }
  const pa=G.parties.find(x=>x.id===a.party); const J=JOBS[p.job]; const st=advStats(p);
  for(const k in a.cd) a.cd[k]-=dt;
  if(a.fx.burn>G.t&&Math.floor(G.t*2)!==Math.floor((G.t-dt)*2)) hitAdv(a,st.hp*.03,null,{sure:1,mult:1});
  if(a.fx.poison>G.t&&Math.floor(G.t)!==Math.floor(G.t-dt)) { a.hp-=Math.max(1,st.hp*(a.fx.poisonK>G.t?.045:.02)); if(a.hp<=0){ advDie(a,null); return; } }
  if(a.fx.stun>G.t||a.fx.sleep>G.t) return;
  if(a.resting){ a.resting-=dt; a.hp=Math.min(st.hp,a.hp+st.hp*.3*dt); if(a.resting<=0) a.resting=0; return; }
  if(a.opening){ a.opening-=dt; if(a.opening<=0){ a.opening=0; openChest(a,pa); } return; }
  const f=a.floor, dir=fdir(f);
  const foes=enemiesOn(f); const lordHere=f===topF()&&G.lord.hp>0;
  // cari target terdekat dalam jangkauan
  let tgt=null, td=1e9;
  for(const m of foes){ const d=Math.abs(m.x-a.x); if(d<td){ td=d; tgt={k:'m',u:m}; } }
  if(lordHere){ const d=Math.abs(G.lord.x-a.x); if(d<td){ td=d; tgt={k:'l',u:G.lord}; } }
  const charmed=a.fx.charm>G.t;
  let reach=st.rng+2; if(tgt&&st.rng<30){ let crowd=0; for(const o of G.advs){ if(o===a||o.floor!==f) continue; const od=Math.abs(o.x-tgt.u.x); if(od<td-2&&od<reach+14) crowd++; } reach+=Math.min(3,crowd)*7; }
  if(tgt&&td<=reach&&!charmed){
    a.walk=0; a.face=Math.sign(tgt.u.x-a.x)||dir;
    if(a.cd.sk<=0){ useSkill(a,p,J,tgt,st,pa); a.cd.sk=J.skill.cd; return; }
    if(a.cd.atk<=0){ a.cd.atk=1.05; if(a.fx.blind>G.t&&rnd()<.5){ say(a.x,f,'Meleset!','#cfd8e8',.8); return; } const crit=rnd()<.06; const mult=(a.fx.rage>G.t?1.6:1)*(a.fx.buff>G.t?1.25:1)*(a.fx.curse>G.t?.7:1);
      a.atkT=G.t; a.atkK='atk'; { const pk=typeof projKindFor==='function'&&J.rng>20?projKindFor(p.job):null; if(pk) projAt(a.x,tgt.u.x,f,pk,p.el?(ELEM_BY[p.el]||{}).c:'#9fd0ff'); else fxAt(J.rng>20?(J.magic?'bolt':'arrow'):'slash',tgt.u.x,f,J.magic?'#9fd0ff':'#ffffff',.25); }
      if(tgt.k==='m') hitMon(tgt.u,st.atk,a,{mult,crit,magic:J.magic,ranged:J.rng>20}); else hitLord(st.atk,a,{mult,crit}); }
    return;
  }
  if(tgt&&td<60&&!charmed){ // dekati
    const mv=24*dt*(a.fx.slow>G.t?.5:1); if(a.fx.root>G.t) return; a.x+=Math.sign(tgt.u.x-a.x)*mv; a.walk+=dt; a.face=Math.sign(tgt.u.x-a.x); return; }
  if(pa&&pa.retreat) return;
  // jaga barisan: tunggu anggota yang tertinggal di lantai yang sama
  const mates=G.advs.filter(x=>x.party===a.party&&x.floor===f&&x!==a);
  const ahead=mates.length&&mates.some(x=>(a.x-x.x)*dir>26);
  const restingMate=mates.some(x=>x.resting||x.opening);
  if(ahead||restingMate){ a.walk=0; return; }
  if(a.fx.root>G.t) return;
  // maju
  const nx=a.x+dir*20*dt*(a.fx.slow>G.t?.5:1);
  // fasilitas di antara posisi lama dan baru
  for(let i=0;i<SLOTS;i++){ const sx=SLOT_X(i); if((a.x-sx)*(nx-sx)<=0&&(a.x!==sx)){ if(onFixture(a,p,pa,f,i)) return; } }
  a.x=nx; a.walk+=dt; a.face=dir;
  if(lordHere&&(a.x-G.lord.x)*dir>=-14){ a.x=G.lord.x-dir*14; return; }
  if((a.x-fend(f))*dir>=0){
    if(f<topF()){ a.floor=f+1; a.x=fstart(f+1); fxAt('stairs',a.x,a.floor,'#ffffff',.4); if(pa&&a===G.advs.find(x=>x.party===pa.id)) pa.deepest=Math.max(pa.deepest||0,a.floor); }
    else a.x=fend(f);
  }
}
function useSkill(a,p,J,tgt,st,pa){
  const S=J.skill; const f=a.floor; say(a.x,f,S.n,'#9fe0ff',1.1); a.atkT=G.t; a.atkK='skill'; if(typeof projKindFor==='function'&&J.rng>20&&tgt){ const pk=projKindFor(p.job); if(pk) projAt(a.x,tgt.u.x,f,pk,p.el?(ELEM_BY[p.el]||{}).c:'#ffe080'); }
  const atkTarget=(mult,opt)=>tgt.k==='m'?hitMon(tgt.u,st.atk,a,Object.assign({mult},opt||{})):hitLord(st.atk,a,Object.assign({mult},opt||{}));
  if(S.k==='guard'){ a.fx.guard=G.t+8; fxAt('shield',a.x,f,'#9fd0ff',.8); }
  else if(S.k==='aoe'){ fxAt('blast',tgt.u.x,f,'#ff8a3a',.7); for(const m of enemiesOn(f)) if(Math.abs(m.x-tgt.u.x)<36) hitMon(m,st.atk,a,{mult:S.m,magic:1}); if(tgt.k==='l') hitLord(st.atk,a,{mult:S.m}); }
  else if(S.k==='heal'){ const mates=G.advs.filter(x=>x.party===a.party&&x.floor===f); let low=null,lp=2; for(const x of mates){ const xs=advStats(G.people[x.pid]); const r=x.hp/xs.hp; if(r<lp){ lp=r; low=x; } } if(low){ const xs=advStats(G.people[low.pid]); low.hp=Math.min(xs.hp,low.hp+xs.hp*S.m+st.atk); fxAt('heal',low.x,f,'#9fff9a',.8); say(low.x,f,'+HP','#9fff9a',.9); } if(p.job==='paladin') a.fx.guard=G.t+4; }
  else if(S.k==='snipe') atkTarget(S.m,{crit:1,ranged:1});
  else if(S.k==='crit') atkTarget(S.m,{crit:1,sure:1});
  else if(S.k==='multi'){ for(let i=0;i<S.hits;i++) atkTarget(S.m); }
  else if(S.k==='pierce'){ atkTarget(S.m); const behind=enemiesOn(f).filter(m=>m!==tgt.u&&Math.abs(m.x-tgt.u.x)<26); if(behind[0]) hitMon(behind[0],st.atk,a,{mult:S.m*.7}); }
  else if(S.k==='rage'){ a.fx.rage=G.t+8; fxAt('rage',a.x,f,'#ff4040',.8); }
  else if(S.k==='buff'){ for(const x of G.advs) if(x.party===a.party) x.fx.buff=G.t+8; fxAt('note',a.x,f,'#ffe080',1); }
}
function onFixture(a,p,pa,f,i){
  const fx=G.fix[f][i]; if(!fx) return false;
  const key=f+':'+i; if(a.seen[key]) return false; a.seen[key]=1;
  const st=advStats(p); const sx=SLOT_X(i);
  if(fx.t==='chest'){ a.x=sx; a.opening=1.1; say(sx,f,'Peti!','#ffd36a',1); return true; }
  if(fx.t==='mimik'){ const scout=partyMembers(pa||{members:[]}).find(pp=>JOBS[pp.job].scout); if(scout&&rnd()<.2+scout.lv*.003){ say(sx,f,'Itu mimik!','#9fe0ff',1.3); return false; } a.x=sx; a.opening=1.1; say(sx,f,'Peti!','#ffd36a',1); return true; }
  if(fx.t==='rest'){
    const mates=G.advs.filter(x=>x.party===a.party);
    const hurt=mates.some(x=>x.hp<advStats(G.people[x.pid]).hp*.7);
    if(pa&&(hurt||f>pa.saveFloor)){ const fee=8+f*4; let paid=0; for(const x of mates){ const pp=G.people[x.pid]; const c=Math.min(pp.gold,fee); pp.gold-=c; paid+=c; x.resting=3.5; x.x=sx-fdir(f)*mates.indexOf(x)*7; x.floor=f; }
      G.gold+=paid; G.mana+=paid*.3; pa.saveFloor=Math.max(pa.saveFloor,f); G.pop+=.6; fx.uses=(fx.uses||0)+1; fx.earn=(fx.earn||0)+paid; fx.last=pa.name;
      say(sx,f,`Istirahat (+${paid}G)`,'#ffd36a',1.6); fxAt('fire',sx,f,'#ffa040',3.5); return true; }
    return false;
  }
  if(fx.t==='rahasia'){
    if(fx.found) return false; const gs=secretMons(fx).filter(x=>!x.dead); if(!gs.length) return false; const m=gs[0];
    const scouts=partyMembers(pa||{members:[]}).filter(pp=>JOBS[pp.job].scout);
    if(scouts.length&&rnd()<.3+scouts[0].lv*.004){ fx.found=a.party; fx.foundAt=G.t; gs.forEach((g,k)=>{ g.x=sx+(k-1)*8; }); say(sx,f,'Jalan rahasia!','#c08aff',2); log(`${scouts[0].name} (${JOBS[scouts[0].job].n}) dari ${pa.name} menemukan dinding retak di lantai ${f+1}! ${gs.map(g=>g.name).join(', ')} keluar dari ruang rahasia.`,'warn'); fxAt('crack',sx,f,'#c08aff',1.2); return true; }
    return false;
  }
  if(FIX[fx.t]&&FIX[fx.t].cat==='jebakan'){
    if(pa&&pa.disarm[key]) return false;
    const scout=partyMembers(pa||{members:[]}).find(pp=>JOBS[pp.job].scout);
    if(scout&&rnd()<.25+scout.lv*.004){ if(pa) pa.disarm[key]=1; say(sx,f,'Jebakan ketahuan!','#9fe0ff',1.3); return false; }
    triggerTrap(fx,a,p,st,f,sx,pa); return false;
  }
  return false;
}
function triggerTrap(fx,a,p,st,f,sx,pa){
  const D=FIX[fx.t]; const lv=fx.lv||1; const mult=1+(lv-1)*.25;
  const near=G.advs.filter(x=>x.floor===f&&Math.abs(x.x-sx)<22);
  fxAt('trap_'+fx.t,sx,f,'#ffffff',.9);
  fx.hits=(fx.hits||0)+1;
  if(D.sleep){ for(const x of near) x.fx.sleep=G.t+D.sleep; say(sx,f,'Zzz…','#d0c0ff',1.4); return; }
  if(D.root){ a.fx.root=G.t+D.root; say(sx,f,'Terjerat!','#c8c0a0',1.2); return; }
  if(D.slip||D.fall){ if(f>0){ const victims=D.fall?[a]:near; for(const x of victims){ x.floor=f-1; x.x=fend(f-1)-fdir(f-1)*ri(4,20); x.seen={}; if(D.dmg){ const raw=Math.round(advStats(G.people[x.pid]).hp*D.dmg*mult); x.hp-=raw; say(x.x,x.floor,String(raw),'#ff8a7a',.9); if(x.hp<=0) advDie(x,null); } } say(sx,f,D.fall?'Jatuh!':'Terpeleset!','#ffd0a0',1.3); return; } }
  if(D.dmg){ const victims=fx.t==='apiT'?near:[a]; for(const x of victims){ const xs=advStats(G.people[x.pid]); const raw=xs.hp*D.dmg*mult+lv*4; x.hp-=Math.round(raw*(x.fx.sleep>G.t?2:1)); if(x.fx.sleep>G.t){ x.fx.sleep=0; say(x.x,f,'KOMBO!','#ff9ad0',1.2); } say(x.x,f,String(Math.round(raw)),'#ff8a7a',.9); if(D.stun) x.fx.stun=G.t+D.stun; if(D.burn) x.fx.burn=G.t+4; if(x.hp<=0) advDie(x,null); } }
}
function openChest(a,pa){
  const f=a.floor; const i=G.fix[f].findIndex((x,j)=>x&&(x.t==='chest'||x.t==='mimik')&&Math.abs(SLOT_X(j)-a.x)<4); if(i<0) return;
  const fx=G.fix[f][i];
  if(fx.t==='mimik'){ const p=G.people[a.pid]; const st=advStats(p); const lv=fx.lv||1; const dmg=Math.round(st.hp*(.28+lv*.04)); const steal=Math.round(p.gold*.25); p.gold-=steal; G.gold+=steal; fx.hits=(fx.hits||0)+1;
    fxAt('claw',a.x,f,'#ff6060',.5); say(a.x,f,'MIMIK!','#ff6060',1.4); say(a.x+6,f,String(dmg),'#ff8a7a',1); if(steal) say(a.x,f,`+${steal}G`,'#ffd36a',1.4); a.fx.stun=G.t+1; a.hp-=dmg; if(a.hp<=0) advDie(a,null); return; } const v=chestValue(fx.r); const gold=Math.round(chestCost(fx.r)*rand(.6,1.1));
  G.fix[f][i]=null; G.stats.chests++;
  const mem=pa?partyMembers(pa):[G.people[a.pid]];
  for(const p of mem){ p.eq.atk+=1+v*1.4; p.eq.def+=.6+v*.9; p.eq.hp+=4+v*6; p.gold+=Math.round(gold/mem.length); }
  if(pa){ pa.loot+=gold; pa.greed=(pa.greed||0)+1+v; }
  G.pop+=1.5+v*1.8; fxAt('chest',SLOT_X(i),f,'#ffd36a',1);
  say(SLOT_X(i),f,`Chest ${fx.r}!`,'#ffd36a',1.6);
  if(v>=4||rnd()<.25) log(`${pa?pa.name:G.people[a.pid].name} membuka Chest ${fx.r} di lantai ${f+1} dan mendapat perlengkapan bagus. Mereka makin bersemangat naik!`,'adv');
  if(G.settings.autoChest&&G.gold>=chestCost(fx.r)) orderPlace(f,i,{t:'chest',r:fx.r});
}
function partyTick(pa){
  const mem=G.advs.filter(a=>a.party===pa.id); if(!mem.length){ if(pa.state==='in') pa.state=partyMembers(pa).length?'town':'gone'; return; }
  if(pa.retreat){ if(G.t>=pa.retreat) leaveDungeon(pa,'kabur'); return; }
  let hp=0,mx=0; for(const a of mem){ const s=advStats(G.people[a.pid]); hp+=Math.max(0,a.hp); mx+=s.hp; }
  const healer=mem.some(a=>['priest','paladin'].includes(G.people[a.pid].job));
  const lost=pa.members.length<(pa.size0||(pa.size0=pa.members.length));
  const ratio=hp/mx;
  if(ratio<(healer?.22:.35)||lost&&ratio<.5&&rnd()<.02||G.t-pa.entered>240){ pa.retreat=G.t+1; for(const a of mem) say(a.x,a.floor,'Mundur!','#9fe0ff',1); return; }
  // puas: sudah dapat banyak harta dan lelah
  if(pa.loot>0&&ratio<.5&&(pa.greed||0)<3&&rnd()<.01){ leaveDungeon(pa,'puas'); }
}

/* ---------- AI monster ---------- */
function monTick(m,dt){
  if(m.dead){ if(G.t>=m.reviveAt){ const c=reviveCost(m); if(G.mana>=c){ G.mana-=c; m.dead=false; m.hp=monStats(m).hp; m.x=m.px; m.fx={}; fxAt('rise',m.x,m.floor,'#c08aff',.8); } } return; }
  if(m.floor<0) return;
  const st=monStats(m);
  for(const k in m.cd) m.cd[k]-=dt;
  if(m.hp<st.hp){ const rg=(m.abil.includes('regen')?.02:0)+(m.abil.includes('pemulihan')?.01:0)+(m.eq?monX(m).regen:0); if(rg) m.hp=Math.min(st.hp,m.hp+st.hp*rg*dt); }
  if(m.secret){ const fx=G.fix[m.secret.f]&&G.fix[m.secret.f][m.secret.slot]; if(!fx){ m.secret=null; } else if(!fx.found){ const i=secretMons(fx).indexOf(m); m.x=SLOT_X(m.secret.slot)+(i-1)*7; m.px=m.x; return; } else if(G.t-(fx.foundAt||0)>30&&!G.advs.some(a=>a.floor===m.floor)&&secretMons(fx).every(g=>!g.dead)){ fx.found=false; return; } }
  if(m.fx.stun>G.t) return;
  if(m.hiding){ if(G.t>m.hiding){ m.hiding=0; m.hidden=false; } else { m.hp=Math.min(st.hp,m.hp+st.hp*.05*dt); return; } }
  if(m.flee&&m.hp<st.hp*.25&&!m.hiding){ m.hiding=G.t+8; m.hidden=true; say(m.x,m.floor,'Kabur!','#c0c0c0',1); return; }
  const f=m.floor; const foes=G.advs.filter(a=>a.floor===f&&!a.resting);
  if(m.strat==='sergap'&&!m.revealed){ m.hidden=true; const near=foes.find(a=>Math.abs(a.x-m.x)<12); if(near){ m.hidden=false; m.revealed=G.t; hitAdv(near,st.atk,{kind:'m',u:m},{mult:2,sure:1}); say(m.x,f,'Sergap!','#ff6060',1.2); } return; }
  if(m.strat==='sergap'&&m.revealed&&!foes.some(a=>Math.abs(a.x-m.x)<60)&&G.t-m.revealed>5){ m.revealed=0; }
  let range=m.strat==='agresif'?FW:m.strat==='dukung'?50:60;
  let tgt=null,td=1e9;
  if(m.aggro&&G.t-m.aggroT<5){ const ag=foes.find(a=>a.pid===m.aggro); if(ag){ tgt=ag; td=Math.abs(ag.x-m.x); range=0; } }
  if(!tgt) for(const a of foes){ const anchor=m.strat==='agresif'?m.x:m.px; const da=Math.abs(a.x-anchor); if(da>range) continue; const d=Math.abs(a.x-m.x); if(d<td){ td=d; tgt=a; } }
  // ability aktif
  if(tgt||m.strat==='dukung') for(const ab of m.abil){ const A=ABIL[ab]; if(A.k!=='a'||(m.cd[ab]||0)>0) continue; G._abil=m; const used=useMonAbil(m,ab,tgt,st,foes); G._abil=null; if(used){ m.cd[ab]=A.cd*rand(.9,1.2)*(1-(m.eq?monX(m).cdr:0)); m.atkT=G.t; m.atkK='cast'; return; } }
  if(tgt){
    if(td<=st.rng){ m.face=Math.sign(tgt.x-m.x)||1; if((m.cd.atk||0)<=0){ m.cd.atk=1.15/st.spd*(m.abil.includes('cepat')?.8:1); const crit=rnd()<.05+monX(m).critC+(m.abil.includes('elang')?.2:0)+(m.abil.includes('pikiranTajam')?.12:0); const p=G.people[tgt.pid];
        let mult=(G.mons.some(o=>o!==m&&!o.dead&&o.floor===f&&o.abil.includes('wibawa'))?1.1:1)*(m.fx.teriak>G.t?1.3:1)*(m.abil.includes('semangat')&&G.mons.filter(o=>!o.dead&&o.floor===f).length>=3?1.2:1)*(m.abil.includes('amarah')&&m.hp<st.hp*.4?1.5:1)*(m.fx.curse>G.t?.7:1)*(m.abil.includes('pemburu')&&p&&p.lv<m.lv?1.4:1);
        if(tgt.fx.guard>G.t){ const kn=G.advs.find(x=>x.party===tgt.party&&x.fx.guard>G.t&&x.floor===f); if(kn) tgt=kn; }
        m.atkT=G.t; m.atkK='atk'; if(st.rng>20&&typeof projAt==='function') projAt(m.x,tgt.x,f,'orb',(ELEM_BY[monAtkEl(m)]||{}).c||'#c88aff'); else fxAt('claw',tgt.x,f,'#ff9a9a',.25); hitAdv(tgt,st.atk,{kind:'m',u:m},{mult,crit});
        if(m.abil.includes('auraRacun')&&rnd()<.4) tgt.fx.poison=G.t+5; } }
    else { const sp=18*st.spd*dt*(m.fx.slow>G.t?.5:1); m.x+=Math.sign(tgt.x-m.x)*sp; m.face=Math.sign(tgt.x-m.x); m.walk=(m.walk||0)+dt; }
    return;
  }
  // tanpa target: kembali ke pos / patroli
  let goal=m.px; if(m.strat==='agresif'){ if(!m.patrol||Math.abs(m.x-m.patrol)<3) m.patrol=rand(20,FW-20); goal=m.patrol; }
  if(m.strat==='dukung'){ const ally=G.mons.find(o=>o!==m&&!o.dead&&o.floor===f&&!o.secret); if(ally) goal=ally.x-fdir(f)*16; }
  const d=goal-m.x; if(Math.abs(d)>2){ m.x+=Math.sign(d)*Math.min(Math.abs(d),12*st.spd*dt); m.face=Math.sign(d); m.walk=(m.walk||0)+dt; } else m.walk=0;
}
function useMonAbil(m,ab,tgt,st,foes){
  const f=m.floor; const src={kind:'m',u:m};
  const inR=r=>foes.filter(a=>Math.abs(a.x-m.x)<r);
  if(ab==='sembuh'){ const hurt=G.mons.filter(o=>!o.dead&&o.floor===f&&o.hp<monStats(o).hp*.7); if(!hurt.length) return false; for(const o of hurt){ const os=monStats(o); o.hp=Math.min(os.hp,o.hp+os.hp*.25); fxAt('heal',o.x,f,'#9fff9a',.8); } say(m.x,f,ABIL[ab].n,'#9fff9a',1); return true; }
  const A_=ABIL[ab];
  if(A_&&A_.eff&&A_.k==='a'){ if(!tgt) return false; const T2=foes.filter(a=>Math.abs(a.x-m.x)<(A_.r||40)); if(A_.eff==='aoe'&&!T2.length) return false; if(Math.abs(tgt.x-m.x)>60) return false;
    say(m.x,f,A_.n,'#ffb0d0',1.1); const ec=(ELEM_BY[A_.el]||{}).c||'#ffffff';
    if(A_.eff==='hit'){ fxAt('zap',tgt.x,f,ec,.5); hitAdv(tgt,st.atk,src,{mult:A_.m,el:A_.el}); }
    else if(A_.eff==='aoe'){ fxAt('blast',tgt.x,f,ec,.8); for(const a of T2) hitAdv(a,st.atk,src,{mult:A_.m,el:A_.el}); }
    else if(A_.eff==='multi'){ fxAt('slash',tgt.x,f,ec,.5); for(let i=0;i<A_.hits;i++) if(tgt.hp>0) hitAdv(tgt,st.atk,src,{mult:A_.m,el:A_.el}); }
    else if(A_.eff==='status'){ fxAt('curse',tgt.x,f,ec,1); const d_=hitAdv(tgt,st.atk,src,{mult:A_.m,el:A_.el,sure:1}); if(tgt.hp>0) applyStatus(tgt,A_.st,m,d_); }
    return true; }
  if(!tgt) return false;
  if((ab==='teriak'&&m.fx.teriak>G.t)||(ab==='perisai'&&m.fx.perisai>G.t)) return false;
  const T=inR(40); if(!T.length&&!['gempa','teriak','perisai','meteor'].includes(ab)) return false;
  say(m.x,f,ABIL[ab].n,'#ffb0d0',1.1);
  if(ab==='api'){ fxAt('fire',tgt.x,f,'#ff6a2a',.8); for(const a of T) { hitAdv(a,st.atk,src,{mult:1.5}); if(a.hp>0) a.fx.burn=G.t+3; } }
  else if(ab==='beku'){ fxAt('ice',tgt.x,f,'#9fe8ff',.8); for(const a of T){ hitAdv(a,st.atk,src,{mult:1.3}); if(a.hp>0) a.fx.slow=G.t+5; } }
  else if(ab==='petir'){ fxAt('zap',tgt.x,f,'#ffe040',.6); hitAdv(tgt,st.atk,src,{mult:2.4,sure:1}); }
  else if(ab==='raung'){ fxAt('roar',m.x,f,'#ffffff',.8); for(const a of inR(36)) a.fx.stun=G.t+2; }
  else if(ab==='jaring'){ tgt.fx.root=G.t+3; tgt.fx.slow=G.t+5; fxAt('web',tgt.x,f,'#e8e8e8',1); }
  else if(ab==='ganda'){ hitAdv(tgt,st.atk,src); if(tgt.hp>0) hitAdv(tgt,st.atk,src); }
  else if(ab==='panggil'){ for(let i=0;i<2;i++){ const k=addMonster(pick(GACHA_POOL.N)); k.temp=G.t+20; k.floor=f; k.px=m.x+ri(-14,14); k.x=k.px; k.lv=Math.max(1,Math.floor(m.lv/2)); k.hp=monStats(k).hp; k.name='Kroco'; fxAt('rise',k.x,f,'#c08aff',.6); } }
  else if(ab==='ledak'){ fxAt('boom',m.x,f,'#ff7a3a',1); for(const a of T) hitAdv(a,st.atk,src,{mult:2.2}); m.hp-=st.hp*.25; if(m.hp<=0) monDie(m,null); }
  else if(ab==='kedip'){ const back=foes.filter(a=>['priest','mage','bard','archer'].includes(G.people[a.pid].job)); const t2=back[0]||tgt; m.x=t2.x-fdir(f)*-8; fxAt('warp',m.x,f,'#c08aff',.5); hitAdv(t2,st.atk,src,{mult:1.5}); }
  else if(ab==='serapMana'){ const d=hitAdv(tgt,st.atk,src,{mult:1.2}); G.mana+=d*.5+3; fxAt('soul',tgt.x,f,'#7fd8ff',.6); }
  else if(ab==='kutuk'){ tgt.fx.curse=G.t+8; fxAt('curse',tgt.x,f,'#a85ad0',1); }
  else if(ab==='tebas'){ hitAdv(tgt,st.atk,src,{mult:1.8}); }
  else if(ab==='goda'){ tgt.fx.charm=G.t+4; fxAt('heart',tgt.x,f,'#ff7ab0',1); }
  else if(ab==='gempa'){ fxAt('roar',m.x,f,'#c8a070',1); for(const a of foes) a.fx.stun=G.t+1.5; }
  else if(ab==='tornado'){ fxAt('blast',tgt.x,f,'#bff0d0',.8); for(const a of T){ hitAdv(a,st.atk,src,{mult:1.3}); if(a.hp>0) a.x-=fdir(f)*14; } }
  else if(ab==='meteor'){ const M_=inR(55); fxAt('boom',tgt.x,f,'#ff7a3a',1.2); for(const a of M_) hitAdv(a,st.atk,src,{mult:2.6}); }
  else if(ab==='teriak'){ for(const o of G.mons) if(!o.dead&&o.floor===f) o.fx.teriak=G.t+8; fxAt('roar',m.x,f,'#ff6a3a',.8); }
  else if(ab==='perisai'){ for(const o of G.mons) if(!o.dead&&o.floor===f){ o.fx.perisai=G.t+6; fxAt('shield',o.x,f,'#9fd0ff',.8); } }
  else if(ab==='tidur'){ tgt.fx.sleep=G.t+3; fxAt('note',tgt.x,f,'#d0c0ff',1); }
  else if(ab==='serbu'){ m.x=tgt.x-fdir(f)*-10*Math.sign(m.x-tgt.x||1); fxAt('slash',tgt.x,f,'#ffffff',.4); hitAdv(tgt,st.atk,src,{mult:2}); }
  else if(ab==='bayang'){ const k=addMonster(m.sp); k.temp=G.t+10; k.floor=f; k.px=m.x+ri(-10,10); k.x=k.px; k.lv=m.lv; k.hp=monStats(k).hp*.6; k.name='Bayangan '+m.name; k.abil=[m.abil[0]]; fxAt('warp',k.x,f,'#6a4aaa',.6); }
  else if(ab==='racunKuat'){ tgt.fx.poison=G.t+8; tgt.fx.poisonK=G.t+8; fxAt('curse',tgt.x,f,'#9ad04a',1); }
  else return false;
  return true;
}
/* ---------- Raja Iblis di singgasana ---------- */
function lordTick(dt){
  const L=G.lord; if(L.hp<=0) return; const st=lordStats(); const f=topF();
  for(const k in L.cd) L.cd[k]-=dt;
  if(L.hp<st.hp&&!G.advs.some(a=>a.floor===f)) L.hp=Math.min(st.hp,L.hp+st.hp*.05*dt);
  const home=fend(f); const near=G.advs.filter(a=>a.floor===f&&Math.abs(a.x-home)<95);
  if(near.length){ const n_=near.sort((a,b)=>Math.abs(a.x-L.x)-Math.abs(b.x-L.x))[0]; const dx=n_.x-L.x; if(Math.abs(dx)>st.rng-2){ const nx=L.x+Math.sign(dx)*16*dt; if(Math.abs(nx-home)<75) L.x=nx; } }
  else if(Math.abs(L.x-home)>1) L.x+=Math.sign(home-L.x)*Math.min(Math.abs(home-L.x),20*dt);
  const foes=G.advs.filter(a=>a.floor===f&&Math.abs(a.x-L.x)<st.rng+4);
  if(!foes.length) return;
  const src={kind:'l'};
  if((L.cd.sp||0)<=0){ L.cd.sp=9; const r=L.race;
    if(r==='naga'){ say(L.x,f,'Napas Naga!','#ff8a3a',1.3); fxAt('fire',L.x-fdir(f)*20,f,'#ff6a2a',1); for(const a of G.advs.filter(a=>a.floor===f&&Math.abs(a.x-L.x)<70)) hitAdv(a,st.atk,src,{mult:1.4}); }
    else if(r==='succubus'){ const a=pick(foes); a.fx.charm=G.t+5; say(L.x,f,'Pikatan!','#ff7ab0',1.2); fxAt('heart',a.x,f,'#ff7ab0',1); }
    else { say(L.x,f,'Gelombang Kegelapan','#c060ff',1.3); fxAt('blast',L.x,f,'#8a3aff',.8); for(const a of foes) hitAdv(a,st.atk,src,{mult:1.2}); }
    return; }
  if((L.cd.atk||0)<=0){ L.cd.atk=1.1; L.atkT=G.t; const t=foes.sort((a,b)=>Math.abs(a.x-L.x)-Math.abs(b.x-L.x))[0]; fxAt('claw',t.x,f,'#ff6080',.3); hitAdv(t,st.atk,src,{crit:rnd()<.08}); }
}

/* ---------- tik utama ---------- */
function step(){
  const dt=DT; G.t+=dt;
  const day=1+Math.floor(G.t/DAY_LEN); if(day!==G.day){ G.day=day; dailyTick(); }
  G.mana+=dt*(1+G.advs.length*.15+G.floors*.06)*(G.lord.race==='elfGelap'?1.5:1);
  G.pop+=dt*.004*G.floors; G.gold+=dt*(.6+G.floors*.15);
  for(const a of G.advs) if(a.floor>(G.stats.deep||0)) G.stats.deep=a.floor;
  for(let i=TIMERS.length-1;i>=0;i--) if(G.t>=TIMERS[i].at){ const t=TIMERS[i]; TIMERS.splice(i,1); t.fn(); }
  spawnTick(dt); if(Math.floor(G.t)!==Math.floor(G.t-dt)) heroTick();
  for(const a of G.advs.slice()) advTick(a,dt);
  for(const pa of G.parties) if(pa.state==='in') partyTick(pa);
  for(const m of G.mons) monTick(m,dt);
  for(const m of G.mons) if(m.temp&&(G.t>m.temp||m.dead)){ m.dead=true; m.gone=1; }
  if(G.mons.some(m=>m.gone)) G.mons=G.mons.filter(m=>!m.gone);
  if(G.lord) lordTick(dt);
  assistTick(dt);
}
function dailyTick(){
  // kesetiaan pelan-pelan naik dengan aura
  for(const m of G.mons) m.loy=clamp(m.loy+(G.aura>=10?1:0)-(m.loy>70&&G.aura<5?1:0),0,100);
  if(G.day%5===0) log(`Hari ${G.day}. Popularitas ${Math.round(G.pop)} · ${G.floors} lantai · Raja Iblis ${G.lord.name} Lv${G.lord.lv} bertahan ${Math.round((G.t-G.lordSince)/DAY_LEN*10)/10} hari.`,'sys');
}
/* ---------- simpan ---------- */
const SAVE_KEY='takhta-jurang-v1';
function saveGame(){ try{ localStorage.setItem(SAVE_KEY,JSON.stringify(G)); return true; }catch(e){ return false; } }
function loadGame(){ try{ const s=localStorage.getItem(SAVE_KEY); if(!s) return null; const g=JSON.parse(s); if(!g||g.v!==1) return null; G=g; G.inv=G.inv||[]; G.runes=G.runes||[]; srand((Date.now()%2147483000)|1); if(!G.lord||G.lord.hp<=0) newLord(false); return G; }catch(e){ return null; } }
