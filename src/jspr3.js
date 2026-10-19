/* =====================================================================
   TAKHTA JURANG — sprite bentuk baru & kostum humanoid baru
   ===================================================================== */
Object.assign(SPR_EXTRA,{
  mumi:{leg:5,tor:6,tw:6,skin:['#d8ccb0'],hair:['#c8bca0'],eye:['#40ff80'],bald:1},
  cyborg:{leg:5,tor:7,tw:7,skin:['#9aa8b8'],hair:['#3a4a5a'],eye:['#3affff'],bald:1},
});
Object.assign(JOBDEF,{
  mHeroSkel:{cloth:'#e6e0cc',armor:1,trim:'#e3b75e',pants:'#e6e0cc',tool:'greatsword',cape:'#2a4aa8',hat:'helmGold'},
  mKicker:{cloth:'#5a4a3a',bareTorso:1,bare:1,pants:'#a83a2a',hat:'headband',bandC:'#ffffff'},
  mPirate:{cloth:'#7a2a2a',pants:'#2a2a3a',tool:'sword',hat:'kerchief',kerC:'#c82a2a'},
  mPirateCap:{cloth:'#2a2a4a',armorLite:1,trim:'#e3b75e',pants:'#1a1a2a',tool:'sword',cape:'#7a1a1a',hat:'merchant'},
  mMummy:{cloth:'#d8ccb0',pants:'#c8bca0'},
  mSantaGelap:{cloth:'#a81a2a',robe:1,trim:'#f4f0e6',hat:'cap',capC:'#a81a2a',tool:'staffGold',gem:'#ff3040',glowEye:'#ff3040'},
  mCyborg:{cloth:'#4a5a6a',armor:1,trim:'#3affff',pants:'#2a3a4a',tool:'darkblade',glowEye:'#3affff',hat:'goggles'},
});
function drawJurangMon2(P,m,f){
  const k=m.k, c=m.c||'#888', eye=m.eye||'#1a1a1a', dk=shade(c,-.3), lt=shade(c,.25), b=f===1?-1:f===3?1:0;
  const sh=w=>P(-w/2,0,w,1,'rgba(0,0,0,.25)');
  if(k==='horseman'){ sh(20); const lg=f%2; const hc='#1a1418';
    P(-10,-14,18,7,hc); P(-9,-15,16,1,shade(hc,.2)); P(6,-20,4,8,hc); P(8,-23,6,4,hc); P(12,-21,2,2,'#2a2028'); P(10,-22,1,1,'#ff3a1a');
    P(5,-23,2,7,'#ff6a1a'); P(4,-21,1,4,'#ffb040'); P(-12,-13,3,5,'#ff6a1a');
    P(-9,-7,2,7-lg,hc); P(-5,-7,2,7,hc); P(1,-7,2,7-lg,hc); P(5,-7,2,7,hc);
    P(-5,-27,7,12,c); P(-5,-27,7,1,shade(c,.3)); P(-8,-26,3,12,'#5a1a2a'); P(-3,-29,4,2,'#3a1a2a'); P(-2,-32+b,2,3,eye); P(-1,-33+b,1,1,'#ffffff');
    P(2,-22,4,2,c); P(5,-27,6,6,'#e87a1a'); P(5,-27,6,1,'#ffa040'); P(7,-29,2,2,'#3a6a2a'); P(6,-25,1,1,'#ffe060'); P(9,-25,1,1,'#ffe060'); P(6,-23,4,1,'#ffe060'); return; }
  if(k==='mudHand'){ P(-10,-2,20,2,'#3a2a1a'); P(-9,-3,18,1,dk); if(f%2) P(-7,-4,2,1,lt); else P(5,-4,2,1,lt);
    P(-2,-14+b,5,12,c); P(-2,-14+b,1,12,lt); P(-4,-19+b,9,6,c); P(-4,-23+b,1,4,c); P(-2,-24+b,1,5,c); P(0,-24+b,1,5,c); P(2,-23+b,1,4,c); P(5,-18+b,2,3,c); P(-3,-16+b,1,3,dk); P(3,-10+b,1,2,dk); P(1,-15+b,2,1,eye); return; }
  if(k==='cryingDemon'){ sh(12); P(-10,-23+b,5,9,dk); P(5,-23+b,5,9,dk); P(-11,-22+b,1,6,shade(dk,-.2)); P(10,-22+b,1,6,shade(dk,-.2));
    P(-5,-27,10,9,c); P(-5,-27,10,1,lt); P(-6,-31,2,4,'#2a1a1a'); P(4,-31,2,4,'#2a1a1a'); P(-3,-24,2,2,eye); P(1,-24,2,2,eye);
    const t=f%4; P(-3,-22,1,3+t,'#7fd8ff'); P(2,-22,1,3+((t+2)%4),'#7fd8ff'); P(-3,-15+t,1,1,'#bfefff'); P(-2,-20,4,1,'#1a0a0a'); P(-2,-19,1,1,'#1a0a0a'); P(1,-19,1,1,'#1a0a0a');
    P(-5,-18,10,10,dk); P(-4,-17,8,1,c); P(-4,-8,3,8,c); P(1,-8,3,8,c); P(-6,-15,2,6,c); P(4,-15,2,6,c); return; }
  if(k==='hedgehog'){ sh(14); const bo=[0,3,6,3][f%4];
    P(-7,-10,13,9,c); for(let x=-7;x<6;x+=2){ P(x,-12-(x%4===0?1:0),1,3,dk); } P(-8,-8,1,5,dk); P(5,-7,4,5,'#e8c8a0'); P(9,-6,1,1,'#1a1a1a'); P(6,-7,1,1,eye); P(-4,-1,3,1,'#3a2a1a'); P(2,-1,3,1,'#3a2a1a');
    P(-14,-10-bo,5,5,'#e8701a'); P(-12,-10-bo,1,5,'#3a1a0a'); P(-14,-8-bo,5,1,'#3a1a0a'); P(-13,-10-bo,1,1,'#ffb060'); return; }
  if(k==='drone'){ P(-4,0,8,1,'rgba(0,0,0,.2)'); const y=-22+b;
    P(-5,y,10,5,c); P(-5,y,10,1,lt); P(-4,y+5,8,1,dk); P(-1,y+1,3,3,eye); P(0,y+2,1,1,'#ffffff'); P(-7,y-1,2,1,dk); P(5,y-1,2,1,dk); P(-7,y-2,1,1,dk); P(6,y-2,1,1,dk);
    const r=f%2; P(-10+r,y-3,6,1,'#c8c8d0'); P(4-r,y-3,6,1,'#c8c8d0'); if(f%2) P(4,y+6,1,1,'#ff3a3a'); P(-2,y+6,1,3,dk); P(1,y+6,1,3,dk); return; }
  if(k==='robot'){ sh(12); const lg=f%2; P(-4,-8,3,8-lg,dk); P(1,-8,3,8,dk); P(-5,-1,4,1,shade(dk,-.3)); P(1,-1,4,1,shade(dk,-.3));
    P(-6,-20,12,12,c); P(-6,-20,12,1,lt); P(-3,-17,6,4,dk); P(-2,-16,1,1,'#3aff7a'); P(0,-16,1,1,'#ffd040'); P(2,-16,1,1,'#ff3a3a'); P(-8,-19,2,9,dk); P(6,-19,2,9,dk); P(-8,-10,2,2,lt); P(6,-10,2,2,lt);
    P(-4,-27,8,7,c); P(-4,-27,8,1,lt); P(-3,-25,6,2,eye); P(0,-30,1,3,dk); P(-1,-31,3,1,eye); return; }
  if(k==='snowman'){ sh(12); const W='#f4f8ff', S_='#c8d8e8';
    P(-6,-10,12,10,W); P(-6,-3,12,3,S_); P(-5,-18,10,8,W); P(-5,-11,10,1,S_); P(-4,-25,8,7,W); P(-4,-19,8,1,S_);
    P(-5,-18,10,2,c); P(3,-17,2,5,c); P(-4,-28,8,3,'#2a2a3a'); P(-5,-25,10,1,'#2a2a3a'); P(-4,-26,8,1,c);
    P(-2,-23,1,1,eye); P(1,-23,1,1,eye); P(0,-21,3,1,'#ff8a2a'); P(-1,-14,1,1,'#2a2a3a'); P(-1,-8,1,1,'#2a2a3a');
    P(-9,-16+b,4,1,'#6a4a2a'); P(-10,-17+b,1,1,'#6a4a2a'); P(5,-16-b,4,1,'#6a4a2a'); P(9,-17-b,1,1,'#6a4a2a'); return; }
  if(k==='penguin'){ sh(8); const fl=f%2; P(-4,-14,8,14,c); P(-2,-12,4,11,'#f8f8ff'); P(-3,-18,6,5,c); P(-1,-16,1,1,'#ffffff'); P(1,-16,1,1,'#ffffff'); P(-1,-16,1,1,eye==='#1a1a1a'?'#1a1a1a':eye); P(2,-15,3,1,'#ffb030');
    P(-6,-12-fl,2,6,c); P(4,-12+fl,2,6,c); P(-3,-1,2,1,'#ffb030'); P(1,-1,2,1,'#ffb030'); return; }
  if(k==='kaktus'){ P(-6,-1,12,1,'#c8a870'); P(-3,-21,6,20,c); P(-3,-21,2,20,lt); P(-8,-14,5,3,c); P(-8,-18,3,5,c); P(3,-11,5,3,c); P(6,-16,3,6,c);
    for(const [x,y] of [[-2,-18],[1,-13],[-1,-8],[2,-5],[-7,-16],[7,-13]]) P(x,y,1,1,'#f0f0d0'); P(-2,-16,1,1,eye); P(1,-16,1,1,eye); P(-1,-14,3,1,shade(c,-.45)); P(-1,-23,3,2,'#ff6aa8'); P(0,-24,1,1,'#ffd040'); return; }
  if(k==='bunga'){ sh(10); P(-1,-12,2,12,'#3a8a3a'); P(-6,-7,5,2,'#3a8a3a'); P(1,-10,5,2,'#3a8a3a'); const y=-23+b;
    P(-7,y+2,14,7,c); P(-5,y,10,11,c); P(-6,y+1,2,2,lt); P(4,y+1,2,2,lt); P(-4,y+3,8,5,'#3a0a1a'); P(-4,y+3,1,2,'#ffffff'); P(-1,y+3,1,2,'#ffffff'); P(3,y+3,1,2,'#ffffff'); P(-2,y+7,1,1,'#ffffff'); P(1,y+7,1,1,'#ffffff'); P(-1,y+5,2,1,'#e04060'); return; }
  if(k==='kura'){ sh(18); const lg=f%2; const sc_='#5a4a3a'; P(-8,-3,3,3-lg,'#7a6a4a'); P(4,-3,3,3,'#7a6a4a');
    P(-9,-11,17,8,sc_); P(-8,-12,15,1,shade(sc_,.2)); for(let x=-7;x<7;x+=4) P(x,-9,2,2,shade(sc_,-.25)); P(-3,-18,6,7,c); P(-4,-13,8,2,c); P(-2,-19,4,1,'#ff8a2a'); P(-1,-20-(f%2),2,1,'#ffd040'); if(f%2) P(0,-23,1,2,'rgba(160,160,160,.6)');
    P(8,-8,5,4,'#7a6a4a'); P(11,-7,1,1,eye); P(-11,-6,2,2,'#7a6a4a'); return; }
  if(k==='labu'){ const y=b; P(-5,0,10,1,'rgba(0,0,0,.25)'); P(-5,-3+y,10,3,'#2a1a2a'); P(-6,-13+y,12,10,c); P(-7,-11+y,14,6,c); P(-3,-13+y,1,10,shade(c,-.25)); P(2,-13+y,1,10,shade(c,-.25)); P(-1,-15+y,2,2,'#3a6a2a'); P(1,-16+y,2,1,'#5a8a3a');
    P(-4,-10+y,2,2,eye); P(2,-10+y,2,2,eye); P(-3,-7+y,6,1,eye); P(-2,-6+y,1,1,eye); P(1,-6+y,1,1,eye); return; }
  if(k==='rusa'){ sh(14); const lg=f%2; P(-7,-13,12,5,c); P(-6,-9,10,1,lt); P(-5,-12,1,1,lt); P(-1,-11,1,1,lt); P(4,-18,3,6,c); P(5,-21,5,4,c); P(10,-19,1,1,eye); P(8,-20,1,1,'#1a1a1a');
    P(5,-26,1,5,'#e8dcc8'); P(3,-26,2,1,'#e8dcc8'); P(4,-28,1,2,'#e8dcc8'); P(8,-25,1,4,'#e8dcc8'); P(9,-27,2,1,'#e8dcc8'); P(-8,-13,2,2,lt);
    P(-6,-8,1,8-lg,dk); P(-3,-8,1,8,dk); P(1,-8,1,8-lg,dk); P(3,-8,1,8,dk); return; }
  return drawJurangMon3(P,m,f);
}
