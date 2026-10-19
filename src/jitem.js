/* =====================================================================
   TAKHTA JURANG — efek item: affix, durability, rune
   ===================================================================== */
const MOD={
  atk:{n:'Attack',flat:1,sl:['senjata','aksesori']}, atkP:{n:'Attack',sl:['senjata','aksesori']},
  def:{n:'Defense',flat:1,sl:['zirah','aksesori']}, hp:{n:'HP',flat:1,sl:['zirah','aksesori']}, hpP:{n:'HP',sl:['zirah']},
  mag:{n:'Magic',sl:['senjata','aksesori']}, mana:{n:'Mana',flat:1,sl:['aksesori','senjata'],d:'tiap pemakai mengalahkan petualang'},
  critC:{n:'Crit Chance',sl:['senjata','aksesori']}, critD:{n:'Crit Damage',sl:['senjata','aksesori']},
  eva:{n:'Evasion',sl:['zirah','aksesori']}, spd:{n:'Attack Speed',sl:['senjata','aksesori']},
  regen:{n:'HP Regen',sl:['zirah','aksesori'],sfx:'/dtk'}, steal:{n:'Lifesteal',sl:['senjata']},
  gold:{n:'Gold Find',sl:['aksesori']}, exp:{n:'EXP Gain',sl:['aksesori','senjata']}, thorns:{n:'Thorns',sl:['zirah']},
  cdr:{n:'Cooldown',neg:1,sl:['aksesori']}, elDmg:{n:'Dmg',el:1,sl:['senjata','aksesori']}, elRes:{n:'Res',el:1,sl:['zirah','aksesori']},
};
const MOD_KEYS=Object.keys(MOD);
const DMG_EL=['api','es','petir','racun','bayang','cahaya','batu','angin','air','tanah','daun','neraka','suci','bulan'];
function rollMod(k,lv,r,el){ const R=(a,b)=>a+rnd()*(b-a);
  switch(k){
    case 'atk': return Math.round((1+lv*.25)*(1+r*.3)*R(.8,1.2));
    case 'def': return Math.round((1+lv*.15)*(1+r*.3)*R(.8,1.2));
    case 'hp': return Math.round((8+lv*2)*(1+r*.3)*R(.8,1.2));
    case 'atkP': return +(R(.03,.08)+r*.02).toFixed(3);
    case 'hpP': return +(R(.04,.1)+r*.02).toFixed(3);
    case 'mag': return +(R(.05,.12)+r*.03).toFixed(3);
    case 'mana': return Math.round(1+lv/10+r+R(0,2));
    case 'critC': return +(R(.02,.05)+r*.01).toFixed(3);
    case 'critD': return +(R(.1,.25)+r*.05).toFixed(3);
    case 'eva': return +(R(.01,.04)+r*.005).toFixed(3);
    case 'spd': return +(R(.03,.08)+r*.02).toFixed(3);
    case 'regen': return +(R(.003,.008)+r*.002).toFixed(4);
    case 'steal': return +(R(.02,.05)+r*.01).toFixed(3);
    case 'gold': case 'exp': return +(R(.05,.15)+r*.04).toFixed(3);
    case 'thorns': return +(R(.05,.12)+r*.03).toFixed(3);
    case 'cdr': return +(R(.03,.08)+r*.02).toFixed(3);
    case 'elDmg': return +(R(.06,.15)+r*.04).toFixed(3);
    case 'elRes': return +(R(.08,.2)+r*.05).toFixed(3);
  } return 0; }
function modTxt(md){ const M=MOD[md.k]; if(!M) return ''; const nm=M.el?`${(ELEM_BY[md.el]||{}).n||''} ${M.n}`:M.n;
  const v=M.flat?`+${md.v}`:md.k==='regen'?`+${(md.v*100).toFixed(1).replace('.',',')}%`:`${M.neg?'-':'+'}${Math.round(md.v*100)}%`;
  return `${nm} ${v}${M.sfx||''}`; }
/* ---------- rune ---------- */
const RUNE={ruby:{n:'Ruby Rune',k:'elDmg',el:'api',v:.05,c:'#ff5a3a'},sapphire:{n:'Sapphire Rune',k:'elDmg',el:'es',v:.05,c:'#6ac8ff'},topaz:{n:'Topaz Rune',k:'elDmg',el:'petir',v:.05,c:'#ffd040'},
  emerald:{n:'Emerald Rune',k:'elDmg',el:'racun',v:.05,c:'#6ad04a'},onyx:{n:'Onyx Rune',k:'elDmg',el:'bayang',v:.05,c:'#8a6ac8'},pearl:{n:'Pearl Rune',k:'elDmg',el:'cahaya',v:.05,c:'#fff2c0'},
  fury:{n:'Fury Rune',k:'atkP',v:.03,c:'#ff7a5a'},life:{n:'Life Rune',k:'hpP',v:.04,c:'#7aff9a'},iron:{n:'Iron Rune',k:'def',v:2,c:'#b8c0c8'},eagle:{n:'Eagle Rune',k:'critC',v:.02,c:'#ffe08a'},
  ruin:{n:'Ruin Rune',k:'critD',v:.08,c:'#ff4a6a'},blood:{n:'Blood Rune',k:'steal',v:.02,c:'#c8203a'},wind:{n:'Wind Rune',k:'spd',v:.03,c:'#bff0d0'},ghost:{n:'Ghost Rune',k:'eva',v:.015,c:'#c8c8e8'},
  sage:{n:'Sage Rune',k:'mag',v:.05,c:'#c0a0ff'},mana:{n:'Mana Rune',k:'mana',v:1,c:'#9a7aff'},ward:{n:'Ward Rune',k:'elRes',el:'api',v:.06,c:'#ffa07a'}};
const RUNE_KEYS=Object.keys(RUNE); const ROMAN=['','I','II','III','IV','V'];
function runeMod(rn){ const R=RUNE[rn.k]; return {k:R.k,el:R.el,v:R.k==='def'||R.k==='mana'?R.v*rn.g:+(R.v*rn.g).toFixed(3)}; }
function runeName(rn){ return `${RUNE[rn.k].n} ${ROMAN[rn.g]}`; }
function newRune(g,k){ return {id:nid(),k:k||pick(RUNE_KEYS),g:Math.max(1,Math.min(5,g||1))}; }
function addRune(g,k){ G.runes=G.runes||[]; const r=newRune(g,k); G.runes.push(r); return r; }
/* ---------- item ---------- */
const SOCK=[[0,1],[1,1],[1,2],[2,2],[3,3]], NMOD=[[1,1],[2,2],[2,3],[3,4],[4,5]];
function itFix(it){ if(!it||it._ok) return it; it.mods=it.mods||[]; it.runes=it.runes||[]; if(it.sock==null) it.sock=SOCK[it.r||0][0];
  if(it.durMax==null){ it.durMax=40+(it.r||0)*20+(it.lv||0)*5; it.dur=it.durMax; } it._ok=1; return it; }
function rollMods(it,lv,bias){ const n=ri(NMOD[it.r][0],NMOD[it.r][1]); const pool=MOD_KEYS.filter(k=>MOD[k].sl.includes(it.s)); const taken=new Set();
  for(let i=0;i<n;i++){ let k=bias&&rnd()<.4?pick(bias.filter(b=>MOD[b]&&MOD[b].sl.includes(it.s))||[])||pick(pool):pick(pool); if(!k) k=pick(pool);
    const el=MOD[k].el?(it.el&&rnd()<.7?it.el:pick(DMG_EL)):undefined; const key=k+(el||''); if(taken.has(key)){ i--; if(taken.size>=pool.length) break; continue; } taken.add(key);
    it.mods.push({k,v:rollMod(k,lv,it.r,el),el}); } }
const _genItem=genItem;
genItem=function(lv,minR,opt){ opt=opt||{}; const it=_genItem(lv,minR,opt); it.mods=[]; it.runes=[]; if(opt.el) it.el=opt.el;
  it.sock=ri(SOCK[it.r][0],SOCK[it.r][1]); it.durMax=40+it.r*20; it.dur=it.durMax; it._ok=1;
  rollMods(it,lv,opt.bias); if(opt.preRune&&it.sock&&rnd()<opt.preRune){ const n=ri(1,it.sock); for(let i=0;i<n;i++) it.runes.push({k:pick(RUNE_KEYS),g:ri(1,Math.min(5,1+Math.floor(it.r/2)+(rnd()<.3?1:0)))}); }
  return it; };
function itemMods(it){ itFix(it); return it.mods.concat(it.runes.map(runeMod)); }
function itemBroken(it){ itFix(it); return it.dur<=0; }
const _itemStats=itemStats;
itemStats=function(it){ const s=_itemStats(it); if(!it.mods&&!it.runes) return s; if(itemBroken(it)) return {atk:0,hp:0,def:0,eva:0}; const k=1+(it.lv||0)*.12;
  for(const md of itemMods(it)){ if(md.k==='atk') s.atk+=md.v*k; else if(md.k==='def') s.def+=md.v*k; else if(md.k==='hp') s.hp+=md.v*k; else if(md.k==='eva') s.eva+=md.v; } return s; };
function monX(m){ const X={atkP:0,hpP:0,mag:0,mana:0,critC:0,critD:0,spd:0,regen:0,steal:0,gold:0,exp:0,thorns:0,cdr:0,elDmg:{},elRes:{}};
  if(!m.eq||!G.inv) return X; for(const s in m.eq){ const it=G.inv.find(x=>x.id===m.eq[s]); if(!it||itemBroken(it)) continue;
    for(const md of itemMods(it)){ if(md.k==='elDmg'||md.k==='elRes') X[md.k][md.el]=(X[md.k][md.el]||0)+md.v; else if(md.k in X) X[md.k]+=md.v; } }
  X.cdr=Math.min(.4,X.cdr); X.critC=Math.min(.6,X.critC); X.steal=Math.min(.35,X.steal); for(const e in X.elRes) X.elRes[e]=Math.min(.75,X.elRes[e]); return X; }
const _monStats=monStats;
monStats=function(m){ const st=_monStats(m); if(!m.eq) return st; const X=monX(m); st.hp=Math.round(st.hp*(1+X.hpP)); st.atk*=1+X.atkP; st.spd=Math.min(2.2,st.spd*(1+X.spd)); st.eva=Math.min(.6,st.eva); return st; };
// keausan
function wearEq(m,kind,n){ if(!m.eq) return; n=n||1;
  for(const s in m.eq){ const it=G.inv.find(x=>x.id===m.eq[s]); if(!it) continue; itFix(it); if(it.dur<=0) continue;
    const p=kind==='die'?1:kind==='atk'?(s==='senjata'?.1:s==='aksesori'?.04:0):(s==='zirah'?.1:s==='aksesori'?.04:0);
    if(rnd()<p){ it.dur=Math.max(0,it.dur-n); if(it.dur===0){ log(`${it.n} milik ${m.name} rusak! Perbaiki di gudang supaya efeknya kembali.`,'warn'); if(typeof miraTip==='function') miraTip('Yang Mulia, ada perlengkapan yang rusak. Bawa ke Gudang dan tekan Perbaiki ya~','broken'); } } } }
function repairCost(it){ itFix(it); return Math.ceil((it.durMax-it.dur)*2*(1+it.r)); }
function repairItem(it){ const c=repairCost(it); if(!c) return 'Masih utuh.'; if(G.gold<c) return `Emas kurang (butuh ${c}).`; G.gold-=c; it.dur=it.durMax; return null; }
function repairAll(){ let c=0; for(const it of G.inv) c+=repairCost(it); if(!c) return 'Semua masih utuh.'; if(G.gold<c) return `Emas kurang (butuh ${c}).`; G.gold-=c; for(const it of G.inv) it.dur=it.durMax; return null; }
const _forgeItem=forgeItem;
forgeItem=function(it){ const e=_forgeItem(it); if(!e){ itFix(it); it.durMax+=5; it.dur=Math.min(it.durMax,it.dur+5); } return e; };
const _itemValue=itemValue;
itemValue=function(it){ itFix(it); return Math.round(_itemValue(it)*(1+it.mods.length*.25+it.runes.length*.3)); };
const _sellItem=sellItem;
sellItem=function(it){ itFix(it); G.runes=G.runes||[]; for(const rn of it.runes) G.runes.push(newRune(rn.g,rn.k)); it.runes=[]; _sellItem(it); };
function socketRune(it,rid){ itFix(it); if(it.runes.length>=it.sock) return 'Slot rune penuh.'; const i=(G.runes||[]).findIndex(r=>r.id===rid); if(i<0) return 'Rune tidak ada.';
  const rn=G.runes.splice(i,1)[0]; it.runes.push({k:rn.k,g:rn.g}); return null; }
function unsocketRune(it,idx){ itFix(it); const c=100; if(G.gold<c) return `Emas kurang (butuh ${c}).`; const rn=it.runes.splice(idx,1)[0]; if(!rn) return 'Tidak ada rune.'; G.gold-=c; addRune(rn.g,rn.k); return null; }
function mergeRunes(k,g){ G.runes=G.runes||[]; if(g>=5) return 'Sudah tingkat tertinggi.'; const same=G.runes.filter(r=>r.k===k&&r.g===g); if(same.length<3) return 'Butuh 3 rune yang sama.';
  const c=80*g; if(G.gold<c) return `Emas kurang (butuh ${c}).`; G.gold-=c; const ids=new Set(same.slice(0,3).map(r=>r.id)); G.runes=G.runes.filter(r=>!ids.has(r.id)); return addRune(g+1,k); }
function buyRune(){ const c=300; if(G.gold<c) return `Emas kurang (butuh ${c}).`; G.gold-=c; return addRune(rnd()<.2?2:1); }
function addSocket(it){ itFix(it); if(it.sock>=3) return 'Slot sudah maksimal (3).'; const c=Math.round(400*(it.sock+1)*(1+it.r*.5)); if(G.gold<c) return `Emas kurang (butuh ${c}).`; G.gold-=c; it.sock++; return null; }
function addSocketCost(it){ itFix(it); return Math.round(400*(it.sock+1)*(1+it.r*.5)); }
// bias affix per kelas petualang (perlengkapan khas kelas)
function jobBias(job){ const J=JOBS[job]; if(J.magic) return ['mag','elDmg','cdr','mana','elRes']; if(J.rng>20) return ['critC','critD','spd','eva','atkP'];
  if(J.front>=3) return ['def','hp','hpP','thorns','regen','elRes']; return ['atk','atkP','critC','critD','steal','spd']; }
