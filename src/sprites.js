/* ================= SPRITE PIKSEL ================= */

const SPR_EXTRA={
  goblin:{leg:3,tor:4,tw:6,skin:['#7fae4a'],hair:['#7fae4a'],eye:['#ffd040'],ears:'goblin'},
  orc:{leg:5,tor:7,tw:8,skin:['#7a8a4a'],hair:['#1a1a14'],eye:['#ff6a3a'],tusk:1},
  ogre:{leg:5,tor:8,tw:10,hw:8,skin:['#b89a7a'],hair:['#b89a7a'],eye:['#ffd040'],tusk:1},
  skeleton:{leg:5,tor:6,tw:6,skin:['#e6e0cc'],hair:['#e6e0cc'],eye:['#ff4040'],bones:1},
  golem:{leg:4,tor:8,tw:10,hw:8,skin:['#8a8a84'],hair:['#8a8a84'],eye:['#5ae0ff'],stone:1},
  hobgoblin:{leg:4,tor:6,tw:6,skin:['#5f8e3a'],hair:['#2a2a1a'],eye:['#ff6a3a'],ears:'goblin'},
  kobold:{leg:3,tor:4,tw:5,skin:['#b87a4a'],hair:['#8a5a3a'],eye:['#ffd040'],ears:'goblin',ltail:1,tailC:'#a86a3a',bald:1},
  lizard:{leg:5,tor:6,tw:6,skin:['#4a8a6a'],hair:['#3a6a4a'],eye:['#ffd040'],ltail:1,tailC:'#3f7a5a',bald:1},
  zombie:{leg:5,tor:6,tw:6,skin:['#8aa08a'],hair:['#3a3a2a'],eye:['#d0ff60']},
  troll:{leg:5,tor:8,tw:10,hw:8,skin:['#6a8a7a'],hair:['#3a4a3a'],eye:['#ffd040'],tusk:1,bald:1},
  minotaur:{leg:6,tor:8,tw:10,hw:8,skin:['#7a4a2a'],hair:['#4a2a1a'],eye:['#ff4040'],horns:1,hornC:'#e8dcc8',bald:1},
  succubus:{leg:6,tor:6,tw:6,skin:['#d89ab8'],hair:['#2a1a3a'],eye:['#ff4da0'],horns:1,hornC:'#2a1a2a',wings:'#4a1a3a',dtail:1,tailC:'#4a1a3a'},
  neraka:{leg:6,tor:7,tw:8,skin:['#4a3a4a'],hair:['#1a1218'],eye:['#ff3050'],horns:1,hornC:'#c8304a'},
  jenderal:{leg:6,tor:9,tw:10,hw:8,skin:['#8a2a2a'],hair:['#1a0a0a'],eye:['#ffd040'],horns:1,hornC:'#e8dcc8',wings:'#2a0a14',dtail:1,tailC:'#5a0f1e',bald:1},
};
function SPR(r){ return SPR_EXTRA[r]||RACE[r]; }
function shade(h,f){const n=parseInt(h.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;if(f<0){r*=1+f;g*=1+f;b*=1+f;}else{r+=(255-r)*f;g+=(255-g)*f;b+=(255-b)*f;}return'#'+[r,g,b].map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');}
function hexToRgb(h){const n=parseInt(h.slice(1),16);return[n>>16,(n>>8)&255,n&255];}
const JOBDEF={
  mKobold:{cloth:'#6a4a2a',bareTorso:1,bare:1,loin:'#6a4a2a',pants:'#b87a4a',tool:'spear'},
  mGobShaman:{cloth:'#5a3a5a',robe:1,trim:'#c8a050',hat:'fang',tool:'staffSkull',gem:'#9aff5a'},
  mLizard:{cloth:'#5a4a2a',armorLite:1,pants:'#4a8a6a',tool:'spear',shield:1},
  mZombie:{cloth:'#5a5a4a',pants:'#3a3a3a'},
  mTroll:{cloth:'#5a4a3a',bareTorso:1,bare:1,loin:'#5a4a3a',pants:'#6a8a7a',tool:'bigclub'},
  mMino:{cloth:'#5a3a2a',bareTorso:1,bare:1,strap:'#3a2a1a',pants:'#4a2a1a',tool:'bigaxe'},
  mOrcLord:{cloth:'#4a3a2a',armorLite:1,pants:'#3a2a1a',tool:'bigaxe',cape:'#7a1a1a',hat:'vikinghelm'},
  mSuccubus:{cloth:'#3a1a2a',pants:'#3a1a2a',female:1,tool:'whip',trim:'#ff4da0'},
  mHellKnight:{cloth:'#2a1e26',armor:1,trim:'#c8304a',pants:'#1a1218',tool:'darkblade',cape:'#3a0a14',glowEye:'#ff3050'},
  mGeneral:{cloth:'#2a1a22',armor:1,trim:'#e3b75e',pants:'#1a1218',tool:'darkblade',cape:'#5a0f1e',hat:'demoncrown',glowEye:'#ffd040'},
  tukangBatu:{cloth:'#8a8a90',apron:'#6a5a4a',pants:'#4a4a50',tool:'hammer',hat:'cap',capC:'#6a6a70'},
  pengrajin:{cloth:'#a87a4a',apron:'#e0d0b0',pants:'#5a4a3a',tool:'shears'},
  juruTulis:{cloth:'#3f4a7a',robe:1,trim:'#c8b88a',hat:'cap',capC:'#2a3050',tool:'flask',gem:'#e8e0cc'},
  pendekar:{cloth:'#7a5a3a',armorLite:1,pants:'#3a3a3a',tool:'sword',hat:'headband',bandC:'#3a6aa8'},
  pendekarKapak:{cloth:'#6a4a3a',armorLite:1,pants:'#3a2e2a',tool:'bigaxe'},
  penyihirApi:{cloth:'#a83a2a',robe:1,trim:'#ffb040',hat:'wizard',tool:'staff',gem:'#ff7a3a'},
  penyihirAir:{cloth:'#2a6aa8',robe:1,trim:'#bfefff',hat:'wizard',tool:'staff',gem:'#7fd8ff'},
  penyihirAngin:{cloth:'#5aa88a',robe:1,trim:'#e8fff0',hat:'wizard',tool:'staff',gem:'#d8fff0'},
  penyihirTanah:{cloth:'#7a5a2a',robe:1,trim:'#c8a050',hat:'wizard',tool:'staff',gem:'#e0a050'},
  bangsawan:{cloth:'#6a2a5a',trim:'#e3b75e',pants:'#3a2030',hat:'circlet',cape:'#4a1a3a'},
  ratu:{cloth:'#8a2a3a',robe:1,trim:'#e3b75e',hat:'crown',cape:'#a8243a',fur:1,female:1},

  warga:{},
  isekai:{cloth:'#2a3550',pants:'#2a2a33'},
  hunterHV:{cloth:'#6a4a32',armor:1,trim:'#c8a050',pants:'#3a2a1a',tool:'greatsword',cape:'#7a3a2a',hat:'feathercap'},
  tamerHV:{cloth:'#3a7a6a',pants:'#4a3a2a',tool:'whip',hat:'goggles',trim:'#e8c060',back:'satchel'},
  enchanter:{cloth:'#5a3a8a',robe:1,trim:'#9fe0ff',hat:'circlet',tool:'staff',gem:'#9fe0ff'},
  highEnchanter:{cloth:'#2a2a5a',robe:1,trim:'#ffd36a',hat:'circletG',tool:'staffGold',gem:'#9fe0ff',cape:'#5a2a8a'},
  summoner:{cloth:'#1f4a5a',robe:1,trim:'#7fffd0',hat:'wizard',tool:'staffLeaf',gem:'#7fffd0',cape:'#163a4a'},
  kokiIstana:{cloth:'#f4f0e8',apron:'#ffffff',pants:'#3a3a4a',hat:'kerchiefG',tool:'ladle'},
  petani:{cloth:'#7f9a4a',pants:'#6b5236',hat:'straw',tool:'hoe'},
  penebang:{cloth:'#b8443a',plaid:1,pants:'#3f4a5e',tool:'axe'},
  pemancing:{cloth:'#4f7fa8',pants:'#5b4a3a',hat:'bucket',tool:'rod'},
  penambang:{cloth:'#7a6a58',pants:'#4a3f36',hat:'mine',tool:'pick'},
  penempa:{cloth:'#5c4636',apron:'#3d2a1e',bare:1,pants:'#3a3030',tool:'hammer'},
  pedagang:{cloth:'#7a5aa8',pants:'#4a3f36',hat:'merchant',back:'pack'},
  peternak:{cloth:'#a8885a',pants:'#5a4a36',hat:'cap',capC:'#6a5a3a',tool:'crook'},
  penjahit:{cloth:'#c8607a',pants:'#4a3a4a',tool:'shears',trim:'#f0e0c8'},
  tukangKayu:{cloth:'#8a6a4a',apron:'#c8b08a',pants:'#4a3a2a',tool:'saw'},
  juruMasak:{cloth:'#e8e2d6',apron:'#ffffff',pants:'#5a4a3a',hat:'kerchief',tool:'ladle'},
  pemburu:{cloth:'#6a5a3a',pants:'#4a3a2a',hat:'feathercap',tool:'bow',back:'quiver'},
  tabib:{cloth:'#d8d0b8',pants:'#5a6a4a',hat:'kerchiefG',tool:'basket',trim:'#6a9a4a'},
  penggembala:{cloth:'#c8b89a',pants:'#6a5a3a',hat:'straw',tool:'crook'},
  kurir:{cloth:'#3a6a8a',pants:'#4a3f36',hat:'cap',capC:'#2a4a6a',back:'satchel'},
  ksatria:{cloth:'#b9c2cc',armor:1,pants:'#8a939e',hat:'helm',tool:'sword',cape:'#a83838',shield:1},
  penyihir:{cloth:'#3f5aa8',robe:1,trim:'#e3b75e',hat:'wizard',tool:'staff',gem:'#7fe0ff'},
  pemanah:{cloth:'#4f7a3f',pants:'#5b4a3a',hat:'hood',hood:'#3f6232',tool:'bow',back:'quiver'},
  pendeta:{cloth:'#efe8d8',robe:1,trim:'#e3b75e',hat:'mitre',tool:'staffGold',gem:'#ffe08a'},
  penyembuh:{cloth:'#f0f0e8',robe:1,trim:'#6ac88a',hat:'veil',veilC:'#e8f0e8',tool:'staffLeaf',gem:'#9af0b0'},
  alkemis:{cloth:'#7a5a3a',robe:1,trim:'#c8a050',hat:'goggles',tool:'flask',gem:'#7aff9a'},
  pendekarTombak:{cloth:'#8a6a4a',armorLite:1,pants:'#4a3a2a',hat:'headband',bandC:'#c83a3a',tool:'spear'},
  pencuri:{cloth:'#3a3a44',pants:'#2a2a32',hat:'hood',hood:'#2a2a34',tool:'dagger'},
  bard:{cloth:'#a84a6a',pants:'#e0d0b0',hat:'merchant',tool:'lute',trim:'#e3b75e'},
  petarung:{cloth:'#d0a050',bare:1,pants:'#3a3a5a',hat:'headband',bandC:'#ffffff'},
  kavaleri:{cloth:'#9aa3ad',armor:1,pants:'#6a7380',hat:'helm',tool:'spear',cape:'#3a5aa8'},
  weaponMaster:{cloth:'#6a4a3a',pants:'#3a2e2a',tool:'greatsword',back:'swords',trim:'#c8a050'},
  penempaLegendaris:{cloth:'#4a3a32',apron:'#2a1e18',bare:1,pants:'#2a2424',tool:'hammerGold',hat:'headband',bandC:'#e3b75e'},
  penyihirHitam:{cloth:'#2a2236',robe:1,trim:'#8a4fc8',hat:'darkhood',hood:'#1e1828',tool:'staff',gem:'#c04dff',glowEye:'#c04dff'},
  ksatriaPemanah:{cloth:'#a8b2bc',armor:1,pants:'#6a7a5a',hat:'circletG',tool:'bow',back:'quiver',cape:'#3f6232'},
  paladin:{cloth:'#e8e4d8',armor:1,trim:'#e3b75e',pants:'#b8b0a0',hat:'helmGold',tool:'mace',shield:1,cape:'#f4f0e6'},
  assassin:{cloth:'#1e1e26',pants:'#16161c',hat:'darkhood',hood:'#18181f',tool:'dagger',glowEye:'#ff5050',trim:'#7a1f2e'},
  druid:{cloth:'#4a6a3a',robe:1,trim:'#c8a050',hat:'antler',tool:'staffLeaf',gem:'#9af0b0'},
  necromancer:{cloth:'#1e2a22',robe:1,trim:'#5ae08a',hat:'darkhood',hood:'#16201a',tool:'staffSkull',gem:'#5ae08a',glowEye:'#5ae08a'},
  berserker:{cloth:'#8a5a3a',bare:1,bareTorso:1,pants:'#4a3a2a',hat:'vikinghelm',tool:'bigaxe'},
  rajaPedang:{cloth:'#d9d2c0',armor:1,trim:'#e3b75e',pants:'#8a7a5a',tool:'greatsword',cape:'#3a3a8a',hat:'circlet'},
  ratuPanah:{cloth:'#3f8a5a',trim:'#e3b75e',pants:'#e8e0cc',tool:'bowGold',back:'quiver',hat:'circlet',cape:'#e8e0cc',female:1},
  ksatriaNaga:{cloth:'#7a2a2a',armor:1,trim:'#e3b75e',pants:'#4a1a1a',tool:'spear',hat:'dragonhelm',cape:'#2a1a1a'},
  santa:{cloth:'#f4f0e6',robe:1,trim:'#e3b75e',hat:'veil',veilC:'#ffffff',tool:'staffGold',gem:'#ffe08a',female:1},
  sageAgung:{cloth:'#4a3a7a',robe:1,trim:'#c8b8ff',hat:'wizard',tool:'staff',gem:'#ffffff'},
  raja:{cloth:'#8a2a3a',trim:'#e3b75e',pants:'#4a2a30',hat:'crown',cape:'#a8243a',fur:1},
  beastTamer:{cloth:'#8a6a3a',pants:'#4a3a2a',tool:'whip',hat:'fang',trim:'#d9b45a',cape:'#6a3a2a'},
  pahlawan:{cloth:'#3a6ac8',trim:'#f3d27a',pants:'#e8e0cc',tool:'holy',cape:'#f0f0f0'},
  rajaIblis:{cloth:'#2a1a22',armor:1,trim:'#c8304a',pants:'#1a1218',tool:'darkblade',cape:'#5a0f1e',hat:'demoncrown',glowEye:'#ff3050'},
  // monster humanoid
  mGoblin:{cloth:'#7a5a36',bareTorso:1,bare:1,loin:'#7a5a36',pants:'#7fae4a',tool:'club'},
  mHob:{cloth:'#5a4a3a',armorLite:1,pants:'#3a3a2a',tool:'sword',shield:1},
  mOrc:{cloth:'#5a4a3a',bareTorso:1,bare:1,strap:'#3a2a1a',pants:'#4a3a2a',tool:'bigaxe'},
  mOgre:{cloth:'#6a5a3a',bareTorso:1,bare:1,loin:'#6a5a3a',pants:'#b89a7a',tool:'bigclub'},
  mSkel:{cloth:'#e6e0cc',pants:'#e6e0cc',tool:'sword',shield:1},
  mLich:{cloth:'#2a1e36',robe:1,trim:'#5ae08a',hat:'crownBone',tool:'staffSkull',gem:'#5ae08a',glowEye:'#5ae08a'},
  mGolem:{cloth:'#8a8a84',pants:'#7a7a74'},
};
/* ================= Sprite ================= */
const SW=32, SH=36, FX=16, FY=33;
const OUT='#1c1420';
const cache=new Map();

function newCanvas(){ const c=document.createElement('canvas'); c.width=SW; c.height=SH; return c; }
function mkP(g){ return (x,y,w,h,col)=>{ if(!col||w<=0||h<=0) return; g.fillStyle=col; g.fillRect(FX+x,FY+y,w,h); }; }
function outline(g){
  const img=g.getImageData(0,0,SW,SH), d=img.data, o=hexToRgb(OUT);
  const a=(x,y)=>x<0||y<0||x>=SW||y>=SH?0:d[(y*SW+x)*4+3]>40;
  const mark=[];
  for(let y=0;y<SH;y++)for(let x=0;x<SW;x++){ if(a(x,y)) continue; if(a(x-1,y)||a(x+1,y)||a(x,y-1)||a(x,y+1)) mark.push((y*SW+x)*4); }
  for(const i of mark){ d[i]=o[0];d[i+1]=o[1];d[i+2]=o[2];d[i+3]=255; }
  g.putImageData(img,0,0);
}
function sprite(p,dir,f,raw){
  const key=JSON.stringify([p,dir,f,!!raw]);
  let c=cache.get(key); if(c) return c;
  c=newCanvas(); const g=c.getContext('2d'); const P=mkP(g);
  if(p.stage==='bayi') drawBaby(P,p,f); else drawBody(P,p,dir,f,raw==='mounted');
  if(!raw) outline(g);
  cache.set(key,c); return c;
}

function drawBaby(P,p,f){
  const wob=f===1?-1:f===3?1:0, cloth='#efe3c8';
  P(-4,0,8,1,'rgba(0,0,0,.25)');
  P(-3+wob,-5,6,5,cloth); P(-3+wob,-5,6,1,shade(cloth,.15)); P(2+wob,-4,1,4,shade(cloth,-.15)); P(-2+wob,-3,4,1,'#d8c8a4');
  const hx=-2+wob, hy=-9;
  P(hx,hy,4,4,p.skin); P(hx,hy,4,1,p.hair); P(hx+1,hy-1,1,1,p.hair);
  P(hx+1,hy+2,1,1,p.eye); P(hx+3,hy+2,1,1,p.eye);
  if(p.race==='elf'||p.race==='halfelf'){ P(hx-1,hy+1,1,1,p.skin); P(hx+4,hy+1,1,1,p.skin); }
  if(p.race==='beastkin'){ P(hx,hy-2,1,2,p.hair); P(hx+3,hy-2,1,2,p.hair); }
  if(p.race==='iblis'){ P(hx,hy-1,1,1,'#e8dcc8'); P(hx+3,hy-1,1,1,'#e8dcc8'); }
}

function drawBody(P,p,dir,f,mounted){
  const R=SPR(p.race), J=JOBDEF[p.job]||{};
  let leg=R.leg,tor=R.tor,tw=R.tw; const hw=R.hw||6, head=6;
  if(p.stage==='anak'){ leg=p.race==='dwarf'?2:3; tor=4; tw=p.race==='dwarf'?6:4; }
  else if(p.stage==='remaja'){ leg=Math.max(3,leg-1); tor=5; tw=p.race==='dwarf'?8:6; }
  const elder=p.stage==='tua', adult=p.stage==='dewasa'||elder;
  const uni=adult&&!!J.cloth;
  const fem=J.female?true:p.sex==='f';
  const hair=elder?(p.race==='elf'?'#f2f0f6':'#c8c4c0'):p.hair;
  const cloth=uni?J.cloth:p.cloth, cloth2=p.cloth2||shade(cloth,-.3);
  const outfit=uni?null:(p.outfit||'tunik');
  const pants=uni?(J.pants||'#5b4a3a'):(outfit==='kemeja'?cloth2:'#5b4a3a');
  const boots=R.bones?'#cfc8b4':R.stone?'#6a6a64':'#4a3426';
  const bareTorso=uni&&J.bareTorso;
  const torC=bareTorso?p.skin:cloth;
  const sleeve=(uni&&J.bare)||bareTorso?p.skin:(outfit==='mantel'?cloth2:cloth);
  const robe=(uni&&J.robe)||(outfit==='gaun'&&fem&&p.stage!=='anak');
  const robeC=outfit==='gaun'?cloth:cloth;
  const legTop=-leg, torTop=legTop-tor, hy=torTop-head+(elder?1:0);
  const side=dir==='side', back=dir==='up';
  const stw=Math.max(4,tw-2);
  const T=side?stw:tw;
  const lift1=f===1, lift3=f===3;
  const tool=adult?J.tool:null;
  const handY=torTop+tor-1;

  if(!mounted) P(-T/2-1,0,T+2,1,'rgba(0,0,0,.28)');

  if(adult&&J.cape&&!back){
    if(side){ const fl=(f%2)?1:0; P(-stw/2-1-fl,torTop+1,2,tor+(mounted?2:leg-2),J.cape); }
    else { P(-tw/2-2,torTop+1,1,tor+1,J.cape); P(tw/2+1,torTop+1,1,tor+1,J.cape); }
  }
  if(adult&&J.back==='pack'&&side) P(-stw/2-3,torTop+1,3,tor-1,'#8a6a3a');
  if(adult&&J.back==='satchel'&&side) P(-stw/2-2,torTop+3,2,3,'#7a4a2a');
  if(adult&&J.back==='quiver'&&side){ P(-stw/2-2,torTop-2,2,tor+1,'#7a4a2a'); P(-stw/2-2,torTop-3,2,1,'#e8e0cc'); }
  if(adult&&J.back==='swords'&&!back){ P(-tw/2-2,torTop-3,1,tor+2,'#c8d0d8'); P(tw/2+1,torTop-3,1,tor+2,'#c8d0d8'); }
  const tailCol=R.tailC||(p.race==='iblis'?'#5a1f2e':hair);
  if(R.wings&&!mounted){ const wc=R.wings, wd=shade(R.wings,-.3);
    if(side){ P(-stw/2-5,torTop-3,4,1,wc); P(-stw/2-6,torTop-2,5,2,wc); P(-stw/2-5,torTop,3,2,wd); }
    else { P(-tw/2-5,torTop-3,4,1,wc); P(-tw/2-6,torTop-2,5,3,wc); P(-tw/2-4,torTop+1,3,2,wd); P(tw/2+1,torTop-3,4,1,wc); P(tw/2+1,torTop-2,5,3,wc); P(tw/2+1,torTop+1,3,2,wd); } }
  if((p.race==='beastkin'||R.ltail)&&!back&&!mounted){
    if(side){ P(-stw/2-1,legTop-2,1,2,tailCol); P(-stw/2-2,legTop-4,1,3,tailCol); P(-stw/2-3,legTop-6,1,2,shade(tailCol,.5)); }
    else { P(tw/2,legTop-1,1,2,tailCol); P(tw/2+1,legTop-3,1,3,tailCol); P(tw/2+2,legTop-5,1,2,shade(tailCol,.5)); }
  }
  if((p.race==='iblis'||R.dtail)&&!back&&!mounted){
    if(side){ P(-stw/2-1,legTop-1,1,1,tailCol); P(-stw/2-2,legTop-2,1,1,tailCol); P(-stw/2-3,legTop-4,1,2,tailCol); P(-stw/2-4,legTop-6,3,2,tailCol); }
    else { P(tw/2,legTop-1,1,1,tailCol); P(tw/2+1,legTop-2,1,1,tailCol); P(tw/2+2,legTop-4,1,2,tailCol); P(tw/2+1,legTop-6,3,2,tailCol); }
  }

  // kaki
  if(mounted){ /* kaki ditangani oleh tunggangan */ }
  else if(robe){
    for(let r=0;r<leg;r++){ const fl=Math.min(2,Math.floor(r/2)); P(-T/2-fl,legTop+r,T+fl*2,1,robeC); }
    P(-T/2-2,-1,T+4,1,uni?(J.trim||shade(cloth,-.3)):cloth2);
    if(!side){ P(-2+(lift1?-1:0),-1,1,1,boots); P(1+(lift3?1:0),-1,1,1,boots); }
  } else if(side){
    if(f===0||f===2){ P(-1,legTop,2,leg,pants); P(-1,-1,3,1,boots); }
    else { const fw=f===1?1:-1;
      P(-1-fw,legTop,2,leg,shade(pants,-.25)); P(-1-fw,-1,2,1,shade(boots,-.2));
      P(-1+fw,legTop,2,leg,pants); P(-1+fw,-1,3,1,boots); }
  } else {
    const lw=tw>=8?Math.floor(tw/2)-1:2;
    P(-lw,legTop,lw,leg-(lift1?1:0),pants); P(-lw,-1-(lift1?1:0),lw,1,boots);
    P(0,legTop,lw,leg-(lift3?1:0),shade(pants,-.12)); P(0,-1-(lift3?1:0),lw,1,boots);
  }
  if(uni&&J.loin&&!mounted) P(-T/2+1,legTop,T-2,2,J.loin);
  if(!mounted&&fem&&!robe&&!(uni&&(J.armor||J.armorLite))&&p.stage!=='anak'&&!R.bones){ P(-T/2-1,legTop,T+2,2,shade(cloth,-.2)); }
  if(!uni&&outfit==='mantel'&&!mounted&&!robe){ P(-T/2,legTop,1,2,cloth2); P(T/2-1,legTop,1,2,cloth2); }

  // badan
  P(-T/2,torTop,T,tor,torC);
  if(!side){ P(-T/2,torTop,1,tor,shade(torC,.14)); P(T/2-1,torTop,1,tor,shade(torC,-.18)); }
  if(R.bones){ for(let k=1;k<tor-1;k+=2) P(-T/2+1,torTop+k,T-2,1,'#4a4440'); P(-0,torTop,1,tor,'#cfc8b4'); }
  if(R.stone){ P(-T/2,torTop,3,1,'#5a8a3a'); P(T/2-2,torTop+2,1,2,'#6a6a64'); P(-T/2+2,torTop+4,1,1,'#5ae0ff'); }
  if(bareTorso&&!R.bones){ P(-T/2+1,torTop+2,1,1,shade(p.skin,-.15)); P(T/2-2,torTop+2,1,1,shade(p.skin,-.15)); }
  if(uni&&J.strap&&!back) for(let k=0;k<tor;k++) P(-T/2+k*(T/tor),torTop+k,1,1,J.strap);
  if(uni&&J.plaid){ for(let y=0;y<tor;y++)for(let x=0;x<T;x++) if((x+y)%2===0) P(-T/2+x,torTop+y,1,1,shade(cloth,-.22)); }
  if(uni&&J.armor){ P(-T/2+1,torTop+1,1,tor-2,shade(cloth,.35)); P(-T/2,torTop+Math.floor(tor/2),T,1,shade(cloth,-.25)); }
  if(uni&&J.armorLite){ P(-T/2,torTop,T,2,shade(cloth,-.25)); }
  if(uni&&J.apron&&!back){ P(-T/2+1,torTop+2,T-2,tor-1,J.apron); P(-T/2+1,legTop,T-2,mounted?0:1,J.apron); }
  if(uni&&J.trim){ if(!side&&!back) P(-1,torTop,2,tor,J.trim); P(-T/2,torTop,T,1,J.trim); }
  if(uni&&J.fur){ P(-T/2-1,torTop,T+2,1,'#f4f0e6'); P(-T/2,torTop,1,1,'#2a2a2a'); P(T/2-2,torTop,1,1,'#2a2a2a'); }
  // gaya pakaian rakyat
  if(!uni){
    if(outfit==='rompi'){ if(back) P(-T/2,torTop,T,tor-1,cloth2); else if(side) P(-T/2,torTop,2,tor-1,cloth2); else { P(-T/2,torTop,2,tor-1,cloth2); P(T/2-2,torTop,2,tor-1,cloth2); } }
    else if(outfit==='mantel'){ P(-T/2,torTop,T,tor,cloth2); if(!side&&!back){ P(0,torTop+1,1,1,'#e3b75e'); P(0,torTop+3,1,1,'#e3b75e'); P(-1,torTop,2,1,cloth); } }
    else if(outfit==='kemeja'){ if(!side){ P(-T/2+1,torTop,1,tor,'#4a3426'); P(T/2-2,torTop,1,tor,'#4a3426'); } }
    else if(outfit==='syal'){ P(-T/2,torTop,T,1,cloth2); if(!back) P(side?1:1,torTop+1,1,2,cloth2); }
    else if(outfit==='gaun'){ P(-T/2,torTop+tor-2,T,1,cloth2); }
  }
  const noBelt=robe||(uni&&(J.armor||J.apron||J.bareTorso))||R.bones||R.stone||outfit==='mantel';
  if(!noBelt) P(-T/2,torTop+tor-1,T,1,'#4a3426');
  if(adult&&J.back==='pack'&&!side&&!back){ P(-T/2+1,torTop,1,tor-1,'#5a4026'); P(T/2-2,torTop,1,tor-1,'#5a4026'); }
  if(adult&&J.back==='satchel'&&!back){ for(let k=0;k<tor;k++) P(-T/2+k,torTop+k,1,1,'#5a4026'); if(!side) P(T/2-1,torTop+tor-2,2,2,'#7a4a2a'); }

  // punggung
  if(adult&&J.cape&&back){ P(-tw/2-1,torTop,tw+2,tor+(mounted?2:leg-1),J.cape); P(-tw/2-1,torTop,tw+2,1,shade(J.cape,.2)); }
  if(adult&&J.back==='pack'&&back){ P(-tw/2+1,torTop+1,tw-2,tor-1,'#8a6a3a'); P(-tw/2+1,torTop+1,tw-2,1,'#6a4a2a'); }
  if(adult&&J.back==='quiver'&&back){ P(1,torTop-2,2,tor+1,'#7a4a2a'); P(1,torTop-3,2,1,'#e8e0cc'); }
  if(adult&&J.back==='swords'&&back){ P(-3,torTop-3,1,tor+3,'#c8d0d8'); P(2,torTop-3,1,tor+3,'#c8d0d8'); P(-3,torTop+tor-1,6,1,'#6a4a2a'); }

  // lengan
  const armLen=Math.max(2,tor-1); const aw=tw>=10?2:1;
  if(side){
    const sw=mounted?0:(f===1?1:f===3?-1:0);
    P(-1+sw,torTop+1,2,armLen-1,sleeve); P(-1+sw,torTop+armLen,2,1,p.skin);
  } else {
    const la=armLen-(lift1&&!mounted?1:0), ra=armLen-(lift3&&!mounted?1:0);
    P(-tw/2-aw,torTop+1,aw,la-1,sleeve); P(-tw/2-aw,torTop+la,aw,1,p.skin);
    P(tw/2,torTop+1,aw,ra-1,sleeve); P(tw/2,torTop+ra,aw,1,p.skin);
  }

  // kepala
  P(-hw/2,hy,hw,head,p.skin);
  if(!side&&!back) P(-hw/2,hy+head-1,hw,1,shade(p.skin,-.1));
  const style=R.bald||R.bones||R.stone||R.ears==='goblin'&&p.race==='goblin'||p.race==='ogre'?'bald':(p.style||'short');
  const long=style==='long'||style==='braid';
  const ec=J.glowEye&&adult?J.glowEye:p.eye;
  if(style!=='bald'){
    if(back){
      P(-hw/2,hy,hw,head-1,hair);
      if(long) P(-hw/2,hy+head-1,hw,3,hair);
      if(style==='tail') P(-1,hy+head-1,2,3,hair);
      if(style==='braid') P(-1,hy+head+2,2,3,hair);
      if(style==='bun') P(-1,hy-1,3,2,hair);
    } else if(side){
      P(-hw/2,hy,hw,2,hair); P(-hw/2,hy+2,3,long?6:3,hair);
      if(style==='tail') P(-hw/2-2,hy+2,2,3,hair);
      if(style==='bun') P(-hw/2-1,hy-1,3,2,hair);
      if(style==='spiky'){ P(-hw/2,hy-1,1,1,hair); P(-hw/2+2,hy-1,1,1,hair); P(-hw/2+4,hy-1,1,1,hair); }
    } else {
      P(-hw/2,hy,hw,2,hair);
      P(-hw/2,hy+2,1,long?5:1,hair); P(hw/2-1,hy+2,1,long?5:1,hair);
      if(!long) P(-hw/2+1,hy+2,2,1,hair);
      if(style==='bun') P(-1,hy-2,2,2,hair);
      if(style==='tail') P(hw/2,hy+2,1,3,hair);
      if(style==='braid') P(hw/2-1,hy+7,1,3,hair);
      if(style==='spiky'){ P(-hw/2,hy-1,1,1,hair); P(-1,hy-1,1,1,hair); P(hw/2-2,hy-1,1,1,hair); }
    }
  } else if(!back&&!R.bones&&!R.stone&&p.race!=='goblin'&&p.race!=='ogre'){ P(-hw/2,hy+2,1,2,hair); P(hw/2-1,hy+2,1,2,hair); }
  if(R.bones&&!back){ P(-2,hy+2,2,2,'#2a2228'); P(1,hy+2,2,2,'#2a2228'); P(-1,hy+5,3,1,'#4a4440'); }
  if(!back){
    if(side){ P(hw/2-2,hy+3,1,1,ec); P(hw/2,hy+4,1,1,p.skin); }
    else { const ex=hw>6?3:2; P(-ex,hy+3,1,1,ec); P(ex-1,hy+3,1,1,ec);
      if(elder){ P(-2,hy+2,1,1,shade(p.skin,-.15)); P(1,hy+2,1,1,shade(p.skin,-.15)); } }
  }
  // ciri ras
  if(p.race==='elf'||p.race==='halfelf'){
    const tip=p.race==='elf';
    if(side){ P(-hw/2-1,hy+2,1,2,p.skin); if(tip) P(-hw/2-2,hy+1,1,1,p.skin); }
    else { P(-hw/2-1,hy+2,1,2,p.skin); P(hw/2,hy+2,1,2,p.skin); if(tip){ P(-hw/2-2,hy+1,1,1,p.skin); P(hw/2+1,hy+1,1,1,p.skin); } }
  }
  if(R.ears==='goblin'){
    if(side){ P(-hw/2-1,hy+2,1,1,p.skin); P(-hw/2-2,hy+2,1,1,p.skin); P(-hw/2-3,hy+1,1,1,p.skin); }
    else { P(-hw/2-1,hy+2,1,1,p.skin); P(-hw/2-2,hy+2,1,1,p.skin); P(-hw/2-3,hy+1,1,1,p.skin); P(hw/2,hy+2,1,1,p.skin); P(hw/2+1,hy+2,1,1,p.skin); P(hw/2+2,hy+1,1,1,p.skin);
      if(!back) P(-1,hy+4,2,1,shade(p.skin,-.2)); }
  }
  if(R.tusk&&!back){ if(side) P(hw/2-1,hy+5,1,1,'#f4f0e0'); else { P(-2,hy+5,1,1,'#f4f0e0'); P(1,hy+5,1,1,'#f4f0e0'); } }
  if(p.race==='beastkin'){
    const inner='#e8a0a0';
    if(side){ P(-1,hy-2,2,2,hair); P(-1,hy-3,1,1,hair); P(0,hy-1,1,1,inner); }
    else { P(-hw/2,hy-2,2,2,hair); P(-hw/2,hy-3,1,1,hair); P(hw/2-2,hy-2,2,2,hair); P(hw/2-1,hy-3,1,1,hair);
      if(!back){ P(-hw/2+1,hy-1,1,1,inner); P(hw/2-2,hy-1,1,1,inner); } }
    if(back&&!mounted){ P(-1,legTop-1,2,4,tailCol); P(-1,legTop+3,2,1,shade(tailCol,.5)); }
  }
  if(p.race==='iblis'||R.horns){
    const h=R.hornC||'#e8dcc8';
    if(side){ P(-1,hy-1,1,1,h); P(-2,hy-2,1,1,h); P(-2,hy-3,1,1,h); }
    else { P(-hw/2,hy-1,1,1,h); P(-hw/2-1,hy-2,1,2,h); P(hw/2-1,hy-1,1,1,h); P(hw/2,hy-2,1,2,h); }
    if(back&&!mounted){ P(0,legTop-1,1,2,tailCol); P(0,legTop+1,1,1,tailCol); P(-1,legTop+2,3,2,tailCol); }
  }
  const beard=(p.race==='dwarf'&&p.sex==='m'&&p.stage!=='anak')||(elder&&p.sex==='m'&&p.race==='manusia');
  if(beard&&!back){
    if(side) P(0,hy+4,3,p.race==='dwarf'?4:2,hair);
    else { P(-hw/2+1,hy+4,hw-2,2,hair); if(p.race==='dwarf'){ P(-hw/2+1,hy+6,hw-2,2,hair); P(-hw/2+2,hy+8,hw-4,1,hair); } }
  }
  // aksesori rakyat
  if(!uni&&p.acc&&p.stage!=='anak'){
    if(p.acc==='bandana') P(-hw/2,hy+1,hw,1,p.accC);
    else if(p.acc==='bunga'&&!back) P(side?-hw/2+1:hw/2-2,hy,2,1,'#f07aa0');
    else if(p.acc==='topi'){ P(-hw/2-1,hy,hw+2,1,shade(p.accC,-.2)); P(-hw/2+1,hy-2,hw-2,2,p.accC); }
  }
  if(adult) hat(P,J.hat,hy,hw,head,side,back,J,cloth);
  if(tool){ const hx=side?1:(back?-tw/2-2:tw/2+(aw-1)); drawTool(P,tool,hx,handY,J); }
  if(adult&&J.shield&&!side){ const sx=back?tw/2:-tw/2-3; P(sx,handY-3,3,4,R.bones?'#6a5a4a':'#7a4a2a'); P(sx+1,handY-2,1,2,J.trim||'#e3b75e'); }
  if(elder&&!tool&&!mounted){ const hx=side?2:tw/2+1; P(hx,handY,1,-handY,'#7a5432'); }
}

function hat(P,h,hy,hw,head,side,back,J,cloth){
  if(!h) return;
  const L=-hw/2;
  if(h==='straw'){ P(L-2,hy+1,hw+4,1,'#d9b45a'); P(L+1,hy-1,hw-2,2,'#e8c870'); P(L+1,hy,hw-2,1,'#a8432f'); }
  else if(h==='bucket'){ P(L-1,hy,hw+2,1,'#3f5a7a'); P(L,hy-2,hw,2,'#4f6a8a'); }
  else if(h==='cap'){ const c=J.capC||'#6a5a3a'; P(L,hy-1,hw,2,c); if(!back) P(side?hw/2-1:L+1,hy+1,side?3:hw-2,1,shade(c,-.25)); }
  else if(h==='mine'){ P(L,hy-1,hw,2,'#8a6a3a'); if(!back) P(side?1:-1,hy,2,1,'#ffe08a'); }
  else if(h==='merchant'){ P(L-1,hy,hw+2,1,'#4a3a6a'); P(L+1,hy-2,hw-2,2,'#5a4a7a'); P(hw/2-1,hy-4,1,3,'#e04a4a'); }
  else if(h==='feathercap'){ P(L,hy-1,hw,2,'#4a5a2a'); P(hw/2-1,hy-4,1,3,'#e8e0cc'); P(hw/2,hy-5,1,2,'#e8e0cc'); }
  else if(h==='kerchief'||h==='kerchiefG'){ const c=h==='kerchiefG'?'#6a9a4a':'#f4f0e6'; P(L,hy-1,hw,2,c); if(back||side) P(side?L:L+1,hy+1,side?2:hw-2,2,c); }
  else if(h==='headband'){ P(L,hy+1,hw,1,J.bandC||'#c83a3a'); if(back||side) P(side?L-2:-1,hy+2,2,2,J.bandC||'#c83a3a'); }
  else if(h==='goggles'){ P(L,hy+1,hw,1,'#5a3a20'); if(!back){ P(side?hw/2-2:-3,hy+2,2,2,'#e3b75e'); if(!side) P(1,hy+2,2,2,'#e3b75e'); } }
  else if(h==='helm'||h==='helmGold'){ const s=h==='helmGold'?'#e8d8a0':'#9aa3ad'; P(L,hy-1,hw,5,s); P(L,hy-1,hw,1,shade(s,.3)); if(!back) P(side?0:L+1,hy+2,side?3:hw-2,1,'#1a1a22'); P(-1,hy-3,2,2,h==='helmGold'?'#f4f0e6':'#c83a3a'); }
  else if(h==='vikinghelm'){ P(L,hy-1,hw,3,'#8a8a90'); P(L-1,hy-3,1,2,'#efe6d6'); P(hw/2,hy-3,1,2,'#efe6d6'); P(L-2,hy-4,1,1,'#efe6d6'); P(hw/2+1,hy-4,1,1,'#efe6d6'); }
  else if(h==='dragonhelm'){ P(L,hy-1,hw,5,'#5a1a1a'); P(L,hy-1,hw,1,'#8a2a2a'); if(!back) P(side?0:L+1,hy+2,side?3:hw-2,1,'#ffb020'); P(L-1,hy-3,1,3,'#e3b75e'); P(hw/2,hy-3,1,3,'#e3b75e'); P(L-2,hy-4,1,1,'#e3b75e'); P(hw/2+1,hy-4,1,1,'#e3b75e'); }
  else if(h==='wizard'){ const c=shade(cloth,-.15); P(L-2,hy,hw+4,1,c); P(L+1,hy-1,hw-2,1,c); P(-2,hy-2,4,1,c); P(-1,hy-3,3,1,c); P(0,hy-4,2,1,c); P(1,hy-5,2,1,c); P(-1,hy-1,1,1,J.trim||'#e3b75e'); }
  else if(h==='hood'||h==='darkhood'){ const c=J.hood; if(back) P(L-1,hy-1,hw+2,head+1,c); else if(side){ P(L-1,hy-1,hw,3,c); P(L-1,hy+2,3,4,c); } else { P(L-1,hy-1,hw+2,3,c); P(L-1,hy+2,1,4,c); P(hw/2,hy+2,1,4,c); } if(h==='darkhood'&&!back) P(L+1,hy+2,hw-2,1,shade(c,-.3)); }
  else if(h==='veil'){ const c=J.veilC||'#ffffff'; P(L-1,hy-1,hw+2,2,c); P(L-1,hy+1,1,6,c); P(hw/2,hy+1,1,6,c); if(back) P(L-1,hy-1,hw+2,head+2,c); P(-1,hy-1,2,1,J.trim||'#e3b75e'); }
  else if(h==='antler'){ const c='#c8a878'; P(L,hy-1,1,1,c); P(L-1,hy-3,1,2,c); P(L-2,hy-4,1,1,c); P(L,hy-4,1,1,c); P(hw/2-1,hy-1,1,1,c); P(hw/2,hy-3,1,2,c); P(hw/2+1,hy-4,1,1,c); P(hw/2-1,hy-4,1,1,c); P(L,hy,hw,1,'#5a8a3a'); }
  else if(h==='mitre'){ P(-2,hy-3,4,4,'#efe8d8'); P(0,hy-3,1,3,'#e3b75e'); }
  else if(h==='circlet'||h==='circletG'){ P(L,hy+1,hw,1,h==='circletG'?'#c8d0d8':'#e3b75e'); if(!back&&!side) P(-1,hy+1,2,1,'#5ad0e8'); }
  else if(h==='crown'){ const g='#e3b75e'; P(L+1,hy-2,hw-2,2,g); P(L+1,hy-3,1,1,g); P(-1,hy-3,2,1,g); P(hw/2-2,hy-3,1,1,g); if(!back) P(-1,hy-1,2,1,'#d0304a'); }
  else if(h==='crownBone'){ const g='#cfc8b4'; P(L,hy-1,hw,1,g); P(L,hy-3,1,2,g); P(-1,hy-3,2,2,g); P(hw/2-1,hy-3,1,2,g); }
  else if(h==='demoncrown'){ const g='#3a2a32'; P(L,hy-1,hw,1,g); P(L,hy-3,1,2,g); P(L+2,hy-2,1,1,g); P(hw/2-1,hy-3,1,2,g); P(hw/2-3,hy-2,1,1,g); if(!back) P(-1,hy-1,2,1,'#ff3050'); }
  else if(h==='fang'){ P(L,hy-1,hw,2,'#8a6a4a'); P(L,hy+1,1,1,'#efe6d6'); P(hw/2-1,hy+1,1,1,'#efe6d6'); P(L+1,hy-2,1,1,'#8a6a4a'); P(hw/2-2,hy-2,1,1,'#8a6a4a'); }
}

function drawTool(P,t,hx,hy,J){
  const wood='#8a5a32', steel='#c8d0d8';
  if(t==='hoe'){ P(hx+1,hy-7,1,9,wood); P(hx+1,hy-8,3,1,'#a0a8b0'); P(hx+3,hy-7,1,1,'#a0a8b0'); }
  else if(t==='axe'){ P(hx+1,hy-5,1,7,wood); P(hx+2,hy-5,2,3,steel); P(hx+3,hy-6,1,5,steel); }
  else if(t==='bigaxe'){ P(hx+1,hy-8,1,10,wood); P(hx+2,hy-8,3,5,'#9aa3ad'); P(hx+4,hy-9,1,7,'#9aa3ad'); }
  else if(t==='rod'){ for(let i=0;i<9;i++) P(hx+1+Math.floor(i/2),hy-i,1,1,wood); P(hx+6,hy-8,1,7,'rgba(230,230,240,.6)'); }
  else if(t==='pick'){ P(hx+1,hy-5,1,7,wood); P(hx-1,hy-6,5,1,'#9aa3ad'); P(hx-1,hy-5,1,1,'#9aa3ad'); P(hx+3,hy-5,1,1,'#9aa3ad'); }
  else if(t==='hammer'){ P(hx+1,hy-3,1,5,wood); P(hx,hy-5,3,2,'#6a6f78'); }
  else if(t==='hammerGold'){ P(hx+1,hy-4,1,6,'#4a2a1a'); P(hx-1,hy-7,4,3,'#e3b75e'); P(hx-1,hy-7,4,1,'#fff0b0'); }
  else if(t==='crook'){ P(hx+1,hy-8,1,10,wood); P(hx+2,hy-9,2,1,wood); P(hx+3,hy-8,1,2,wood); }
  else if(t==='shears'){ P(hx+1,hy-2,1,3,'#c8d0d8'); P(hx+2,hy-3,1,2,'#c8d0d8'); P(hx,hy+1,1,1,'#c83a3a'); }
  else if(t==='saw'){ P(hx+1,hy-1,1,2,wood); P(hx+1,hy-6,3,5,'#c8d0d8'); for(let i=0;i<5;i+=2) P(hx+4,hy-6+i,1,1,'#9aa3ad'); }
  else if(t==='ladle'){ P(hx+1,hy-5,1,6,'#9aa3ad'); P(hx,hy-7,3,2,'#9aa3ad'); }
  else if(t==='basket'){ P(hx,hy-1,4,3,'#b88a4a'); P(hx,hy-1,4,1,'#6aa84a'); P(hx+1,hy-3,2,1,'#8a5a2a'); }
  else if(t==='flask'){ P(hx+1,hy-3,1,1,'#e8e8f0'); P(hx,hy-2,3,3,J.gem||'#7aff9a'); }
  else if(t==='lute'){ P(hx,hy-1,3,3,'#b8743a'); P(hx+1,hy,1,1,'#3a2a1a'); P(hx+1,hy-5,1,4,'#6a4026'); }
  else if(t==='spear'){ P(hx+1,hy-11,1,13,wood); P(hx+1,hy-13,1,2,steel); P(hx,hy-12,3,1,steel); }
  else if(t==='dagger'){ P(hx+1,hy-3,1,3,'#e8eef6'); P(hx,hy,3,1,'#5a4a3a'); }
  else if(t==='mace'){ P(hx+1,hy-4,1,6,'#6a5a4a'); P(hx,hy-7,3,3,'#e3b75e'); P(hx+1,hy-8,1,1,'#e3b75e'); }
  else if(t==='club'){ P(hx+1,hy-4,1,6,'#7a4a2a'); P(hx,hy-6,3,3,'#8a5a32'); }
  else if(t==='bigclub'){ P(hx+1,hy-6,2,8,'#6a4026'); P(hx,hy-10,4,5,'#7a4a2a'); P(hx+3,hy-9,1,1,'#cfc8b4'); }
  else if(t==='sword'){ P(hx+1,hy-7,1,6,'#e8eef6'); P(hx,hy-1,3,1,'#c8a040'); P(hx+1,hy,1,1,'#6a4a2a'); }
  else if(t==='greatsword'){ P(hx+1,hy-10,2,9,'#e8eef6'); P(hx+1,hy-10,1,9,'#ffffff'); P(hx,hy-1,4,1,J.trim||'#c8a040'); P(hx+1,hy,2,1,'#4a2a1a'); }
  else if(t==='holy'){ P(hx+1,hy-9,1,8,'#bfefff'); P(hx+2,hy-8,1,6,'#7fd8ff'); P(hx,hy-1,3,1,'#f3d27a'); P(hx+1,hy-10,1,1,'#ffffff'); }
  else if(t==='darkblade'){ P(hx+1,hy-10,2,9,'#3a1a2a'); P(hx+2,hy-9,1,7,'#c8304a'); P(hx,hy-1,4,1,'#5a3a4a'); }
  else if(t==='staff'||t==='staffGold'){ P(hx+1,hy-9,1,11,t==='staffGold'?'#d9b45a':'#7a5432'); P(hx,hy-11,3,2,J.gem); P(hx+1,hy-12,1,1,shade(J.gem,.5)); }
  else if(t==='staffLeaf'){ P(hx+1,hy-9,1,11,'#6a4a2a'); P(hx,hy-11,1,2,'#6aa84a'); P(hx+2,hy-12,1,2,'#6aa84a'); P(hx+1,hy-10,1,1,J.gem); }
  else if(t==='staffSkull'){ P(hx+1,hy-9,1,11,'#3a3a3a'); P(hx,hy-12,3,3,'#e6e0cc'); P(hx,hy-11,1,1,J.gem); P(hx+2,hy-11,1,1,J.gem); }
  else if(t==='bow'||t==='bowGold'){ const c=t==='bowGold'?'#e3b75e':'#8a5a32'; P(hx+2,hy-5,1,1,c); P(hx+3,hy-4,1,5,c); P(hx+2,hy+1,1,1,c); P(hx+1,hy-4,1,5,'#e8e0cc'); }
  else if(t==='whip'){ P(hx+1,hy-1,1,3,'#5a3a1a'); P(hx+2,hy+1,2,1,'#7a4a2a'); P(hx+4,hy,1,1,'#7a4a2a'); P(hx+5,hy-1,1,1,'#7a4a2a'); }
}

/* ---------- monster non-humanoid ---------- */
function monSprite(m,f){
  const key='m|'+JSON.stringify(m)+f; let c=cache.get(key); if(c) return c;
  c=newCanvas(); const g=c.getContext('2d'); const P=mkP(g);
  if(m.k==='slime') drawSlime(P,m.c,f,m.king);
  else if(m.k==='wolf') drawQuad(P,m.c,f,false,m.eye||'#ffd040','wolf');
  else if(m.k==='bat') drawBat(P,m.c,f);
  else if(m.k==='spider') drawSpider(P,m.c,f);
  else if(m.k==='mimic') drawMimic(P,m.c,f);
  else if(m.k==='wyvern') drawWyvern(P,m.c,f,m.eye||'#ffd040');
  else if(m.k==='boar') drawBoar(P,m.c,f);
  else if(m.k==='ghost') drawGhost(P,m.c,f);
  else if(m.k==='bear') drawBear(P,m.c,f);
  else if(m.k==='imp') drawImp(P,m.c,f);
  else if(m.k==='hound'){ drawQuad(P,m.c,f,true,m.eye||'#ff8a3a','wolf'); const fl=f%2; P(-11,-13-fl,2,2,'#ff8a3a'); P(-12,-15-fl,1,2,'#ffd040'); P(5,-15,1,2,'#ff6a2a'); P(7,-16+fl,1,2,'#ffb040'); P(-3,-11,1,1,'#ff6a2a'); P(1,-11,1,1,'#ff6a2a'); }
  else if(m.k==='hum'){ const p={race:m.race,stage:'dewasa',job:m.job,sex:'m',skin:SPR(m.race).skin[0],hair:SPR(m.race).hair[0],eye:SPR(m.race).eye[0],cloth:'#7a5a36',style:'short'}; g.drawImage(sprite(p,m.dir||'down',f,true),0,0); }
  else drawExtraMon(P,m,f);
  outline(g); cache.set(key,c); return c;
}
function drawGhost(P,c,f){ const y=-14+(f===1?-1:f===3?1:0), dk=shade(c,-.25);
  P(-3,0,6,1,'rgba(0,0,0,.15)');
  P(-3,y-6,6,6,c); P(-4,y-3,8,8,c); P(-4,y+5,2,2,c); P(-1,y+5,2,3,c); P(2,y+5,2,2,c); P(3,y-3,1,8,dk);
  P(-2,y-3,1,2,'#1a1a2a'); P(1,y-3,1,2,'#1a1a2a'); P(-1,y,2,1,'#3a3a4a'); P(-6,y-1,2,1,c); P(4,y-1,2,1,c); }
function drawBoar(P,c,f){ const dk=shade(c,-.3), lt=shade(c,.2);
  P(-8,0,16,1,'rgba(0,0,0,.25)'); legsQuad(P,[-5,-3,2,4],-3,3,dk,f,'#1a1a1a');
  P(-7,-9,12,6,c); P(-7,-9,12,1,dk); for(let x=-6;x<4;x+=2) P(x,-10,1,1,dk); P(-6,-4,10,1,lt);
  P(4,-8,4,4,c); P(8,-6,2,2,shade(c,.3)); P(6,-7,1,1,'#1a1a1a'); P(7,-4,2,1,'#f4f0e0'); P(5,-9,1,1,dk); P(-8,-8,1,2,dk); }
function drawBear(P,c,f){ const dk=shade(c,-.3), lt=shade(c,.2);
  P(-10,0,20,1,'rgba(0,0,0,.25)'); legsQuad(P,[-7,-5,3,5],-5,5,dk,f,'#1a1a1a'); legsQuad(P,[-6,-4,4,6],-5,5,dk,f,null);
  P(-9,-14,16,10,c); P(-8,-14,14,1,lt); P(-9,-5,16,1,dk);
  P(5,-15,6,6,c); P(10,-12,2,3,shade(c,.25)); P(11,-12,1,1,'#1a1a1a'); P(8,-13,1,1,'#1a1a1a'); P(5,-17,2,2,c); P(9,-17,2,2,c); P(6,-16,1,1,dk); }
function drawImp(P,c,f){ const y=-12+(f===1?-1:f===3?1:0), dk=shade(c,-.3), w='#3a1a2a';
  P(-3,0,6,1,'rgba(0,0,0,.2)');
  if(f%2===0){ P(-7,y-3,4,1,w); P(-6,y-2,3,2,w); P(3,y-3,4,1,w); P(3,y-2,3,2,w); } else { P(-7,y+1,4,2,w); P(3,y+1,4,2,w); }
  P(-2,y-4,4,4,c); P(-2,y,4,4,c); P(-1,y+4,1,2,dk); P(1,y+4,1,2,dk);
  P(-2,y-5,1,1,'#e8dcc8'); P(1,y-5,1,1,'#e8dcc8'); P(-1,y-3,1,1,'#ffd040'); P(1,y-3,1,1,'#ffd040');
  P(2,y+3,1,1,dk); P(3,y+2,1,1,dk); P(4,y+1,2,1,dk); P(-4,y-2,1,6,'#8a5a32'); P(-5,y-3,3,1,'#c8c8c8'); P(-5,y-4,1,1,'#c8c8c8'); P(-3,y-4,1,1,'#c8c8c8'); }
function drawSlime(P,c,f,king){
  const k=king?2:1;
  const shapes=[[10,10,10,9,8,6],[12,12,11,10,7],[8,8,8,8,7,6,4],[10,10,10,9,8,6]];
  const rows=shapes[f];
  P(-6*k,0,12*k,1,'rgba(0,0,0,.3)');
  rows.forEach((w,r)=>{ const W=w*k; P(-W/2,-(r+1)*k,W,k,r===0?shade(c,-.2):c); });
  const top=-rows.length*k, w0=rows[rows.length-1]*k;
  P(-w0/2+k,top+k,k,k,'#ffffff'); P(-w0/2+k,top+2*k,k,k,shade(c,.5));
  const ey=-Math.ceil(rows.length*.55)*k;
  P(-2*k,ey,k,2*k,'#1a1a2a'); P(1*k,ey,k,2*k,'#1a1a2a');
  if(king){ const cy=top-3; P(-4,cy,8,2,'#e3b75e'); P(-4,cy-2,1,2,'#e3b75e'); P(-1,cy-2,2,2,'#e3b75e'); P(3,cy-2,1,2,'#e3b75e'); P(-1,cy,2,1,'#d0304a'); }
}
function legsQuad(P,xs,top,h,c,f,hoof){
  xs.forEach((x,i)=>{ const grp=i%2; const move=(f===1&&grp===0)||(f===3&&grp===1); const dx=move?(i<2?-1:1):0; const lift=move?1:0;
    P(x+dx,top,1,h-lift,i%2?c:shade(c,-.2)); if(hoof) P(x+dx,-1-lift,1,1,hoof); });
}
function drawQuad(P,c,f,big,eye,kind){
  const light=shade(c,.25), dark=shade(c,-.25);
  if(!big){
    P(-8,0,17,1,'rgba(0,0,0,.25)');
    legsQuad(P,[-5,-3,2,4],-4,4,c,f,dark);
    P(-6,-8,11,4,c); P(-5,-5,9,1,light); P(-6,-8,11,1,dark);
    P(4,-10,4,4,c); P(8,-8,2,2,c); P(9,-8,1,1,'#1a1a1a'); P(4,-11,1,1,c); P(6,-11,1,1,c); P(6,-9,1,1,eye);
    const tw=f%2; P(-7,-8,1,1,c); P(-8,-9-tw,1,2,c); P(-9,-10-tw,1,2,light);
  } else {
    P(-9,0,20,1,'rgba(0,0,0,.25)');
    legsQuad(P,[-6,-4,3,5],-5,5,c,f,dark);
    P(-7,-10,14,5,c); P(-6,-6,12,1,light); P(-7,-10,14,1,dark);
    P(6,-13,5,5,c); P(11,-10,2,2,c); P(12,-10,1,1,'#1a1a1a'); P(6,-14,1,1,c); P(8,-14,1,1,c); P(8,-12,1,1,eye);
    const tw=f%2; P(-8,-10,1,1,c); P(-9,-11-tw,1,2,c); P(-10,-12-tw,1,2,light);
  }
}
function drawHorse(P,c,mane,f,saddle){
  const light=shade(c,.15), dark=shade(c,-.28);
  P(-9,0,20,1,'rgba(0,0,0,.25)');
  legsQuad(P,[-6,-4,2,4],-6,6,c,f,'#2a201a');
  P(-7,-11,13,5,c); P(-6,-11,11,1,light); P(-6,-6,11,1,dark);
  P(4,-14,3,5,c); P(5,-16,3,2,c); P(6,-17,4,3,c); P(9,-15,2,2,dark); P(10,-15,1,1,'#1a1a1a'); P(7,-16,1,1,'#1a1a1a'); P(6,-18,1,1,c);
  P(4,-15,1,5,mane); P(5,-17,1,2,mane);
  const sw=f%2; P(-8,-11,1,2,mane); P(-9-sw,-10,1,5,mane);
  P(8,-16,1,2,'#3a2a1a');
  if(saddle){ P(-3,-12,6,1,'#5a3a1a'); P(-3,-11,6,3,saddle); P(-3,-9,6,1,shade(saddle,-.3)); }
}
function drawBat(P,c,f){
  const y=-13+(f===1?-1:f===3?1:0);
  P(-3,0,6,1,'rgba(0,0,0,.2)');
  P(-1,y,3,4,c); P(-1,y-1,1,1,c); P(1,y-1,1,1,c); P(-1,y+1,1,1,'#ff4040'); P(1,y+1,1,1,'#ff4040');
  if(f%2===0){ P(-6,y-2,4,1,c); P(-5,y-1,4,1,c); P(-3,y,2,1,c); P(3,y-2,4,1,c); P(2,y-1,4,1,c); P(2,y,2,1,c); }
  else { P(-6,y+3,4,1,c); P(-5,y+2,4,1,c); P(-3,y+1,2,1,c); P(3,y+3,4,1,c); P(2,y+2,4,1,c); P(2,y+1,2,1,c); }
}
function drawSpider(P,c,f){
  P(-8,0,16,1,'rgba(0,0,0,.25)');
  for(let i=0;i<4;i++){ const x=-4+i*2, w=(f+i)%2;
    P(x,-5,1,1,shade(c,-.3)); P(x-1+w,-4,1,1,shade(c,-.3)); P(x-1,-3,1,2,shade(c,-.3));
    P(x+1,-5,1,1,shade(c,-.3)); P(x+2-w,-4,1,1,shade(c,-.3)); P(x+2,-3,1,2,shade(c,-.3)); }
  P(-7,-9,6,5,c); P(-6,-9,4,1,shade(c,.25)); P(-5,-7,2,1,'#e04040');
  P(-1,-7,5,3,c); P(3,-7,1,1,'#ff3030'); P(3,-5,1,1,'#ff3030'); P(4,-6,1,1,'#ff3030');
}
function drawMimic(P,c,f){
  const open=f===1||f===2, gold='#c8a040';
  P(-7,0,14,1,'rgba(0,0,0,.25)');
  P(-6,-7,12,6,c); P(-6,-7,1,6,gold); P(5,-7,1,6,gold); P(-6,-4,12,1,gold);
  if(open){ P(-6,-15,12,3,shade(c,.1)); P(-6,-15,1,3,gold); P(5,-15,1,3,gold);
    P(-5,-12,10,5,'#3a0a14'); for(let x=-5;x<5;x+=2){ P(x,-12,1,1,'#f4f0e6'); P(x+1,-8,1,1,'#f4f0e6'); } P(-2,-9,4,2,'#d0405a');
    P(-3,-14,1,1,'#ffd040'); P(2,-14,1,1,'#ffd040'); }
  else { P(-6,-10,12,3,shade(c,.1)); P(-6,-10,1,3,gold); P(5,-10,1,3,gold); P(-1,-8,2,2,gold); }
}
function drawWyvern(P,c,f,eye){
  const y=f===1?-1:f===3?1:0, light=shade(c,.3), dark=shade(c,-.3);
  P(-6,0,12,1,'rgba(0,0,0,.2)');
  P(-4,-14+y,8,4,c); P(-3,-11+y,6,1,light);
  P(4,-16+y,2,3,c); P(5,-19+y,5,3,c); P(8,-17+y,2,1,dark); P(7,-18+y,1,1,eye); P(5,-20+y,1,1,'#e8dcc8');
  P(-7,-13+y,3,2,c); P(-10,-12+y,3,1,c); P(-12,-13+y,2,2,dark);
  P(-2,-10+y,1,2,dark); P(2,-10+y,1,2,dark);
  if(f%2===0){ P(-3,-21+y,7,1,dark); P(-2,-20+y,6,1,dark); P(-1,-19+y,5,1,dark); P(0,-18+y,3,1,dark); P(-3,-22+y,1,1,c); }
  else { P(-4,-12+y,1,1,dark); P(-6,-11+y,4,1,dark); P(-7,-10+y,5,1,dark); }
}
/* ---------- tunggangan ---------- */
function mountSprite(m,f){
  const key='mt|'+JSON.stringify(m)+f; let c=cache.get(key); if(c) return c;
  c=newCanvas(); const g=c.getContext('2d'); const P=mkP(g);
  let saddleY;
  if(m.kind==='horse'){ drawHorse(P,m.c,m.mane,f,m.saddle); saddleY=-12; }
  else { drawQuad(P,m.c,f,true,'#ffd040','wolf'); P(-3,-11,6,2,m.saddle||'#6a3a2a'); saddleY=-11; }
  const r=m.rider, R=SPR(r.race);
  const leg=R.leg;
  const rs=sprite(r,'side',f,'mounted');
  g.drawImage(rs,-1,saddleY+leg);
  const J=JOBDEF[r.job]||{}; const pants=J.pants||'#5b4a3a';
  P(-1,saddleY,2,4,pants); P(-1,saddleY+4,3,1,'#4a3426');
  outline(g); cache.set(key,c); return c;
}


function animalSprite(kind,f){
  const key='a|'+kind+f; let c=cache.get(key); if(c) return c;
  c=newCanvas(); const g=c.getContext('2d'); const P=mkP(g);
  if(kind==='chicken'){ const peck=f===1; P(-3,0,6,1,'rgba(0,0,0,.2)'); P(-2,-4,4,3,'#f4f0e6'); P(-3,-4,1,2,'#e8e0d0');
    const hy=peck?-3:-6; P(1,hy,2,2,'#f4f0e6'); P(1,hy-1,1,1,'#d0304a'); P(3,hy+1,1,1,'#e8a030'); P(2,hy,1,1,'#1a1a1a'); P(-1,-1,1,1,'#e8a030'); P(1,-1,1,1,'#e8a030'); }
  else if(kind==='cow'){ const graze=f>=2; P(-8,0,16,1,'rgba(0,0,0,.22)'); legsQuad(P,[-5,-3,3,5],-4,4,'#e8e4dc',0,'#3a3030');
    P(-6,-9,12,5,'#f2eee6'); P(-4,-9,3,2,'#2a2424'); P(1,-7,3,3,'#2a2424'); P(-6,-5,12,1,'#d8d0c4'); P(2,-4,2,1,'#f0a0a8');
    const hy=graze?-6:-10; P(6,hy,3,4,'#f2eee6'); P(8,hy+2,2,2,'#f0b0b0'); P(6,hy-1,1,1,'#e8dcc0'); P(8,hy-1,1,1,'#e8dcc0'); P(7,hy+1,1,1,'#1a1a1a'); P(-7,-9,1,4,'#2a2424'); }
  else if(kind==='sheep'){ P(-6,0,12,1,'rgba(0,0,0,.2)'); legsQuad(P,[-3,-1,2,3],-3,3,'#3a3030',f%2?1:0,null);
    P(-5,-8,9,5,'#f4f2ea'); P(-5,-8,9,1,'#ffffff'); P(-4,-4,7,1,'#e0dcd0'); P(4,-8,3,3,'#3a3030'); P(5,-7,1,1,'#f4f2ea'); }
  outline(g); cache.set(key,c); return c;
}

