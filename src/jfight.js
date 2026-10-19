/* =====================================================================
   TAKHTA JURANG — animasi pertarungan & senjata yang terlihat
   ===================================================================== */
const JOB_WPN={knight:'sword',mage:'staff',priest:'staffGold',archer:'bow',thief:'dagger',dualblade:'twin',lancer:'spear',monk:'fist',berserker:'bigaxe',paladin:'mace',
  ranger:'bow',bard:'lute',samurai:'katana',ninja:'ninja',necro:'staffSkull',druid:'staffLeaf',alkemis:'flask',summoner:'staffLeaf',sage:'staffGold',dragoon:'spear',
  swordmaster:'greatsword',sniper:'bow',axeman:'bigaxe',darkmage:'darkstaff',hunter:'bow',cleric:'staffCross',hydromancer:'staff',aeromancer:'staff',geomancer:'staff',
  enchanter:'staff',runeKnight:'runeblade',beastmaster:'whip',saint:'staffGold',hero:'holy',weaponMaster:'greatsword',duelist:'rapier',miner:'pick',cook:'pan',farmer:'hoe',
  monsterHunter:'greatsword',tamer:'whip',fistKing:'fist',spearGod:'spearGold',iceQueen:'staffIce',arrowQueen:'bowGold',stormLord:'staffStorm'};
// cara menyerang per jenis senjata
const WPN_ANIM={sword:'slash',greatsword:'slash',katana:'slash',holy:'slash',runeblade:'slash',bigaxe:'slash',mace:'slash',pick:'slash',hoe:'slash',pan:'slash',darkstaff:'cast',
  shield:'bash',gun:'gunshot',scythe:'slash',warhammer:'slash',claw:'punch',tome:'cast',bomb:'throw',dagger:'stab',twin:'stab',rapier:'stab',spear:'stab',spearGold:'stab',ninja:'throw',flask:'throw',whip:'whip',fist:'punch',lute:'strum',
  bow:'shoot',bowGold:'shoot',staff:'cast',staffGold:'cast',staffSkull:'cast',staffLeaf:'cast',staffCross:'cast',staffIce:'cast',staffStorm:'cast'};
const WC=new Map();
function wpnCanvas(k,gem){ const key=k+'|'+gem; let c=WC.get(key); if(c) return c; c=document.createElement('canvas'); c.width=24; c.height=26; const g=c.getContext('2d');
  const Q=(x,y,w,h,col)=>{ g.fillStyle=col; g.fillRect(12+x,18+y,w,h); };
  const wood='#8a5a32', st='#d8e0e8', st2='#ffffff', dk='#6a7078', gold='#e3b75e';
  const staffTop=(col)=>{ Q(0,-14,1,17,wood); Q(-1,-17,3,3,col); Q(0,-18,1,1,'#fff'); Q(-2,-16,1,1,col); Q(2,-16,1,1,col); };
  switch(k){
    case 'sword': Q(0,-11,2,10,st); Q(1,-11,1,10,st2); Q(0,-12,1,1,st2); Q(-2,-1,6,1,gold); Q(0,0,2,3,'#5a3a1a'); Q(0,3,2,1,gold); break;
    case 'greatsword': Q(-1,-15,3,14,st); Q(0,-15,1,14,st2); Q(0,-16,1,1,st2); Q(-3,-1,7,2,gold); Q(0,1,1,3,'#4a2a1a'); Q(0,4,1,1,gold); break;
    case 'katana': for(let i=0;i<12;i++) Q(Math.floor(i/6),-12+i,1,1,i<2?st2:st); Q(1,-12,1,1,st2); Q(-1,0,3,1,'#2a2a2a'); Q(0,1,1,3,'#3a2a5a'); break;
    case 'holy': Q(0,-13,2,12,'#bfefff'); Q(1,-13,1,12,'#ffffff'); Q(-2,-1,6,1,gold); Q(-1,-2,1,1,gold); Q(2,-2,1,1,gold); Q(0,0,2,3,'#3a4a8a'); break;
    case 'runeblade': Q(0,-12,2,11,'#7a8ab8'); Q(0,-10,1,1,'#9fffff'); Q(1,-7,1,1,'#9fffff'); Q(0,-4,1,1,'#9fffff'); Q(-2,-1,6,1,'#5a6a9a'); Q(0,0,2,3,'#2a2a3a'); break;
    case 'dagger': case 'twin': case 'ninja': Q(0,-6,2,5,st); Q(1,-6,1,5,st2); Q(-1,-1,4,1,'#5a4a3a'); Q(0,0,2,2,'#3a2a1a'); break;
    case 'rapier': Q(0,-14,1,13,st2); Q(-1,-1,3,1,gold); Q(-1,-2,1,1,gold); Q(0,0,1,3,'#3a2a2a'); break;
    case 'spear': case 'spearGold': Q(0,-15,1,19,wood); Q(-1,-18,3,3,k==='spearGold'?gold:st); Q(0,-19,1,1,st2); if(k==='spearGold'){ Q(-1,-15,3,1,'#c83a3a'); } break;
    case 'bigaxe': Q(0,-12,1,16,wood); Q(1,-12,4,6,'#9aa3ad'); Q(4,-13,1,8,'#c8d0d8'); Q(-2,-11,2,4,'#9aa3ad'); break;
    case 'mace': Q(0,-7,1,10,'#6a5a4a'); Q(-1,-10,3,3,gold); Q(-2,-9,1,1,gold); Q(2,-9,1,1,gold); Q(0,-11,1,1,'#fff0b0'); break;
    case 'pick': Q(0,-9,1,12,wood); Q(-3,-10,7,1,'#9aa3ad'); Q(-3,-9,1,1,'#9aa3ad'); Q(3,-9,1,1,'#9aa3ad'); break;
    case 'hoe': Q(0,-11,1,14,wood); Q(0,-12,4,1,'#a0a8b0'); Q(3,-11,1,2,'#a0a8b0'); break;
    case 'pan': Q(0,-3,1,6,'#3a3a3a'); Q(-2,-8,5,5,'#2a2a2e'); Q(-1,-7,3,3,'#4a4a52'); break;
    case 'whip': Q(0,-2,1,5,'#5a3a1a'); for(let i=0;i<8;i++) Q(Math.round(Math.sin(i*.7)*2)+1,-3-i,1,1,'#7a4a2a'); break;
    case 'fist': Q(-1,-2,3,3,'#c83a3a'); Q(-1,-2,3,1,'#ff6a5a'); break;
    case 'lute': Q(-2,-3,5,5,'#b8743a'); Q(0,-1,1,1,'#3a2a1a'); Q(0,-10,1,7,'#6a4026'); Q(-1,-11,3,1,'#6a4026'); break;
    case 'flask': Q(0,-5,1,1,'#e8e8f0'); Q(-1,-4,3,4,gem||'#7aff9a'); Q(-1,-4,1,1,'#ffffff'); break;
    case 'bow': case 'bowGold': { const c=k==='bowGold'?gold:'#8a5a32'; Q(1,-9,1,1,c); Q(2,-8,1,2,c); Q(3,-6,1,8,c); Q(2,2,1,2,c); Q(1,4,1,1,c); Q(1,-8,1,13,'rgba(240,240,240,.8)'); break; }
    case 'staff': staffTop(gem||'#ff6a3a'); break;
    case 'staffGold': Q(0,-14,1,17,'#d9b45a'); Q(-1,-18,3,4,gem||'#fff2a0'); Q(-2,-17,1,2,'#d9b45a'); Q(2,-17,1,2,'#d9b45a'); Q(0,-19,1,1,'#fff'); break;
    case 'staffSkull': Q(0,-14,1,17,'#3a3a3a'); Q(-1,-18,3,3,'#e6e0cc'); Q(-1,-17,1,1,'#9aff5a'); Q(1,-17,1,1,'#9aff5a'); break;
    case 'staffLeaf': Q(0,-14,1,17,'#6a4a2a'); Q(-2,-17,2,3,'#6aa84a'); Q(1,-18,2,3,'#6aa84a'); Q(0,-16,1,1,gem||'#ffe080'); break;
    case 'staffCross': Q(0,-14,1,17,'#e8e0d0'); Q(-2,-16,5,1,gold); Q(0,-18,1,5,gold); break;
    case 'staffIce': Q(0,-14,1,17,'#a8d8f0'); Q(-1,-19,3,5,'#bff0ff'); Q(0,-20,1,1,'#ffffff'); Q(-2,-16,1,2,'#7fd8ff'); Q(2,-16,1,2,'#7fd8ff'); break;
    case 'staffStorm': Q(0,-14,1,17,'#4a4a6a'); Q(-1,-18,3,3,'#ffe040'); Q(1,-20,1,2,'#ffe040'); Q(-1,-21,1,2,'#ffe040'); break;
    case 'shield': Q(-3,-8,7,9,'#6a7a8a'); Q(-2,-7,5,7,'#9aa8b8'); Q(0,-6,1,5,'#e3b75e'); Q(-1,-4,3,1,'#e3b75e'); Q(-2,1,5,1,'#6a7a8a'); Q(-1,2,3,1,'#6a7a8a'); break;
    case 'gun': Q(-1,-1,2,4,'#5a3a1a'); Q(0,-10,1,10,'#4a4a52'); Q(1,-9,1,8,'#6a6a72'); Q(0,-11,2,1,'#2a2a2a'); Q(1,0,1,1,gold); break;
    case 'scythe': Q(0,-15,1,19,'#3a2a2a'); Q(1,-16,6,1,'#c8d0d8'); Q(5,-15,2,1,'#c8d0d8'); Q(6,-14,1,2,'#c8d0d8'); Q(1,-15,4,1,'#8a9098'); break;
    case 'warhammer': Q(0,-10,1,14,wood); Q(-3,-14,7,5,'#7a8088'); Q(-3,-14,7,1,'#c8d0d8'); Q(0,-15,1,1,'#c8d0d8'); break;
    case 'claw': Q(-1,-2,3,3,'#7a7a82'); Q(-1,-5,1,3,'#e8eef6'); Q(1,-5,1,3,'#e8eef6'); Q(0,-6,1,4,'#ffffff'); break;
    case 'tome': Q(-2,-4,5,6,gem||'#5a3a8a'); Q(-1,-3,3,4,'#e8e0c8'); Q(0,-3,1,4,'#8a7a6a'); break;
    case 'bomb': Q(-2,-4,4,4,'#2a2a2e'); Q(-1,-3,1,1,'#6a6a72'); Q(1,-6,1,2,'#8a6a3a'); Q(2,-7,1,1,'#ffb040'); break;
    case 'darkstaff': Q(0,-14,1,17,'#2a1a2a'); Q(-1,-18,3,3,'#a01a3a'); Q(-2,-19,1,2,'#3a1a2a'); Q(2,-19,1,2,'#3a1a2a'); Q(0,-17,1,1,'#ff4a6a'); break;
  }
  WC.set(key,c); return c; }
Object.assign(JOB_WPN,JOB_WPN_NEW);
for(const k of JOB_KEYS){ const J=JOBS[k]; if(J.look&&JOBDEF[J.look.base]){ const nk='L_'+k; JOBDEF[nk]=Object.assign({},JOBDEF[J.look.base],J.look); delete JOBDEF[nk].base; J.spr=nk; } }
// tubuh petualang tanpa alat bawaan (senjata digambar terpisah agar bisa diayun)
for(const k of JOB_KEYS){ const s=JOBS[k].spr; if(JOBDEF[s]&&!JOBDEF[s+'_nt']) JOBDEF[s+'_nt']=Object.assign({},JOBDEF[s],{tool:null}); }
advSpr=function(p,f){ const s=JOBS[p.job].spr; const sp=JOBDEF[s+'_nt']?s+'_nt':s;
  return sprite({race:p.race,stage:'dewasa',job:sp,sex:p.sx,skin:p.app.skin,hair:p.app.hair,eye:p.app.eye,cloth:p.app.cloth,cloth2:p.app.cloth2,outfit:p.app.outfit,style:p.app.style},'side',f); };
const ease=t=>t<0?0:t>1?1:1-(1-t)*(1-t);
/* pose senjata & tubuh berdasarkan waktu sejak serangan */
function fightPose(u,kind){ const t=G.t-(u.atkT||-9); const D=u.atkK==='skill'?.45:.3; const p=t/D;
  const o={ang:20,dx:0,dy:0,wx:0,wy:0,glow:0,ang2:null};
  if(p>=1||p<0){ o.ang=kind==='gunshot'?80:kind==='shoot'||kind==='bash'?0:kind==='stab'?60:kind==='cast'?-8:kind==='punch'||kind==='throw'?40:20; o.dy=Math.round(Math.sin(G.t*4+(u.pid||u.id||0))*.6); return o; }
  if(u.atkK==='skill'&&kind!=='shoot'&&kind!=='cast'){ o.ang=20+p*360; o.dx=Math.sin(p*Math.PI)*4; o.dy=-Math.sin(p*Math.PI)*3; o.glow=1-p; return o; }
  switch(kind){
    case 'slash': if(p<.35){ const q=p/.35; o.ang=20-110*ease(q); o.dx=-q; } else { const q=(p-.35)/.65; o.ang=-90+220*ease(Math.min(1,q*1.6)); o.dx=Math.sin(Math.min(1,q)*Math.PI)*5; o.glow=q<.5?1:0; } break;
    case 'bash': { const q=Math.sin(p*Math.PI); o.ang=0; o.wx=q*3; o.dx=q*4; break; }
    case 'stab': { const q=Math.sin(p*Math.PI); o.ang=90; o.wx=q*2.5; o.dx=q*4.5; break; }
    case 'punch': { const q=Math.sin(p*Math.PI); o.ang=90; o.wx=q*2; o.dx=q*5; o.dy=-q*2; break; }
    case 'whip': o.ang=-60+200*ease(p); o.dx=Math.sin(p*Math.PI)*2; break;
    case 'throw': o.ang=-100+200*ease(p); o.dx=Math.sin(p*Math.PI)*2; break;
    case 'gunshot': o.ang=90-Math.sin(p*Math.PI)*20; o.dx=-Math.sin(p*Math.PI)*2; o.glow=p<.25?1:0; break;
    case 'shoot': o.ang=0; o.dx=-Math.sin(p*Math.PI)*1.5; o.glow=p<.3?1:0; break;
    case 'cast': o.ang=-8-Math.sin(p*Math.PI)*25; o.dy=-Math.sin(p*Math.PI)*1.5; o.glow=1-p; break;
    case 'strum': o.ang=10+Math.sin(p*20)*10; o.dy=-Math.abs(Math.sin(p*Math.PI*3)); break;
  } return o; }
function bodyOff(u){ // knockback saat terkena pukulan
  const t=G.t-(u.hitT||-9); if(t<0||t>.22) return {x:0,flash:0}; const q=1-t/.22; return {x:(u.hitDir||1)*q*3,flash:q}; }
function drawWeapon(g,p,a,x,base,face,pose){ const wk=JOB_WPN[p.job]||'sword'; const gem=p.el?(ELEM_BY[p.el]||{}).c:null; const wc=wpnCanvas(wk,gem);
  const kind=WPN_ANIM[wk]||'slash'; const RR=SPR(p.race)||{}; const hx=x+face*(2+pose.wx), hy=base-((RR.leg||5)+2)+pose.wy+pose.dy;
  const draw=(dx,ang,alpha)=>{ g.save(); g.translate(Math.round(hx+dx*face),Math.round(hy)); g.scale(face,1); g.rotate(ang*Math.PI/180); if(alpha!=null) g.globalAlpha=alpha; g.drawImage(wc,-12,-18); g.restore(); };
  if(pose.glow&&kind==='slash'){ g.save(); g.translate(hx,hy); g.scale(face,1); g.globalAlpha=.4*pose.glow; g.strokeStyle=wk==='holy'?'#bff0ff':wk==='runeblade'?'#9fffff':wk==='bigaxe'?'#ffd0a0':'#ffffff'; g.lineWidth=2; g.beginPath(); const r=wk==='greatsword'?15:12; g.arc(0,0,r,-Math.PI,(pose.ang-90)*Math.PI/180); g.stroke(); g.restore(); }
  if(wk==='twin'||wk==='ninja'){ draw(-3,pose.ang+30,.85); }
  draw(0,pose.ang);
  if(pose.glow&&kind==='cast'&&gem){ g.save(); g.globalAlpha=.5*pose.glow; g.fillStyle=gem; const r=3+pose.glow*3; const a2=pose.ang*Math.PI/180; g.beginPath(); g.arc(hx+face*Math.sin(a2)*16,hy-Math.cos(a2)*16,r,0,6.3); g.fill(); g.restore(); }
}
/* proyektil */
function projAt(x0,x1,f,pk,c,t){ if(EFX.length>300) EFX.shift(); const d=Math.abs(x1-x0); EFX.push({k:'proj',w:G&&G.isNeighbor?G.wid:0,x:x0,x0,x1,f,pk,c:c||'#fff',t:t||Math.min(.35,.08+d/260),t0:t||Math.min(.35,.08+d/260)}); }
function drawProj(g,e,base,p){ const x=e.x0+(e.x1-e.x0)*p, dir=Math.sign(e.x1-e.x0)||1; let y=base-14; g.globalAlpha=1;
  switch(e.pk){
    case 'arrow': g.fillStyle='#e8e0c8'; g.fillRect(x-4*dir,y,7,1); g.fillStyle='#d8e0e8'; g.fillRect(x+3*dir-(dir<0?1:0),y-1,1,3); g.fillStyle=e.c; g.fillRect(x-4*dir-(dir<0?1:0),y-1,1,3); break;
    case 'orb': { g.fillStyle=e.c; g.globalAlpha=.35; g.beginPath(); g.arc(x,y,4,0,6.3); g.fill(); g.globalAlpha=1; g.beginPath(); g.arc(x,y,2,0,6.3); g.fill(); g.fillStyle='#fff'; g.fillRect(x-.5,y-.5,1,1); for(let i=1;i<4;i++){ g.globalAlpha=.4-i*.1; g.fillStyle=e.c; g.fillRect(x-dir*i*3-1,y-1,2,2); } break; }
    case 'star': { y-=Math.sin(p*Math.PI)*3; g.fillStyle='#c8d0d8'; const r=G.t*30; g.save(); g.translate(x,y); g.rotate(r); g.fillRect(-2,-.5,4,1); g.fillRect(-.5,-2,1,4); g.restore(); break; }
    case 'flask': { y-=Math.sin(p*Math.PI)*12; g.fillStyle=e.c; g.fillRect(x-1,y-1,3,3); g.fillStyle='#fff'; g.fillRect(x,y-2,1,1); break; }
    case 'bullet': g.fillStyle='#ffe080'; g.fillRect(x-3*dir,y-1,4,1); g.globalAlpha=.4; g.fillRect(x-7*dir,y-1,4,1); break;
    case 'spit': g.fillStyle=e.c; g.fillRect(x-1,y+2,3,2); g.globalAlpha=.4; g.fillRect(x-dir*3-1,y+2,2,2); break;
  } g.globalAlpha=1; }
function projKindFor(job){ const w=JOB_WPN[job]; const k=WPN_ANIM[w]; if(k==='shoot') return 'arrow'; if(k==='gunshot') return 'bullet'; if(w==='ninja') return 'star'; if(w==='gun') return 'bullet'; if(w==='bomb') return 'flask'; if(w==='flask') return 'flask'; if(k==='cast'||k==='strum') return 'orb'; return null; }
// flash putih saat terkena
const FLASHC=new Map();
function flashSpr(spr){ let c=FLASHC.get(spr); if(c) return c; c=document.createElement('canvas'); c.width=spr.width; c.height=spr.height; const g=c.getContext('2d'); g.drawImage(spr,0,0); g.globalCompositeOperation='source-in'; g.fillStyle='#ffffff'; g.fillRect(0,0,c.width,c.height); if(FLASHC.size>600) FLASHC.clear(); FLASHC.set(spr,c); return c; }
function monLunge(m){ const t=G.t-(m.atkT||-9); if(t<0||t>.28) return 0; return Math.sin(t/.28*Math.PI)*(m.atkK==='cast'?-2:5); }
