/* ================= SPRITE MONSTER BARU (legenda, laut, buas) ================= */
const WATER_LINE='#5aa0d8', FOAM='#d8f0ff';
function drawExtraMon(P,m,f){
  const k=m.k, c=m.c, eye=m.eye||'#ffd040';
  if(drawExtraMon8(P,m,f)!==false) return;
  if(k==='dinoV'||k==='dinoT') return drawDino(P,c,f,eye,k==='dinoV');
  if(k==='unicorn'||k==='pegasus'){ drawHorse(P,c,m.mane||'#f0e8ff',f,null); if(k==='unicorn'){ P(9,-20,1,2,'#ffe08a'); P(10,-22,1,2,'#fff2c0'); P(11,-23,1,1,'#ffffff'); } if(k==='pegasus'||m.wing) drawWings(P,'#f4f0ff',f,-3,-14); return; }
  if(['phoenix','thunderbird','harpy','cockatrice'].includes(k)) return drawBird(P,c,f,k,eye);
  if(k==='griffin'||k==='griffinK') return drawGriffin(P,c,f,k==='griffinK',eye);
  if(k==='kitsune'||k==='fenrir'||k==='cerberus') return drawBeastX(P,c,f,k,eye);
  if(k==='dragonE') return drawEarthDragon(P,c,f,eye);
  if(k==='serpent'||k==='hydra'||k==='basilisk') return drawSerpent(P,c,f,k,eye);
  if(k==='seaSerpent') return drawSeaSerpent(P,c,f,eye);
  if(k==='kraken') return drawKraken(P,c,f,eye);
  if(k==='shark') return drawShark(P,c,f);
  if(k==='treant') return drawTreant(P,c,f,eye);
  if(k==='yeti') return drawYeti(P,c,f);
  if(k==='behemoth') return drawBehemoth(P,c,f,eye);
  if(k==='manticore'||k==='chimera') return drawLion(P,c,f,k,eye);
  if(k==='salamander') return drawSalamander(P,c,f);
  drawQuad(P,c,f,true,eye,'wolf');
}
function drawWings(P,w,f,x,y){ const dk=shade(w,-.2);
  if(f%2===0){ P(x-4,y-6,9,1,dk); P(x-3,y-5,8,2,w); P(x-1,y-3,5,1,w); P(x-5,y-7,3,1,w); }
  else { P(x-4,y,9,2,w); P(x-5,y+2,4,1,dk); P(x-2,y-1,6,1,w); } }
function drawDino(P,c,f,eye,lava){
  const dk=shade(c,-.35), lt=shade(c,.2), b=f===1||f===3?1:0;
  P(-11,0,22,1,'rgba(0,0,0,.28)');
  const la=f===1?-1:f===3?1:0;
  P(-3+la,-7,3,7,dk); P(2-la,-7,3,7,c); P(-4+la,-1,4,1,dk); P(1-la,-1,5,1,dk);
  P(-7,-16+b,12,9,c); P(-6,-9+b,10,2,lt); P(-7,-16+b,12,1,dk);
  P(-12,-14+b,6,4,c); P(-15,-12+b,4,3,c); P(-16,-11+b,2,2,dk);
  P(3,-20+b,5,6,c); P(4,-24+b,10,6,c); P(4,-24+b,10,1,dk); P(10,-19+b,4,2,dk);
  P(10,-19+b,1,1,'#f4f0e0'); P(12,-19+b,1,1,'#f4f0e0'); P(9,-22+b,1,1,eye); P(13,-21+b,1,1,'#1a1a1a');
  P(5,-14+b,3,1,dk); P(7,-13+b,1,2,dk);
  for(let x=-6;x<4;x+=3) P(x,-17+b,2,1,lava?'#2a1410':dk);
  if(lava){ const g=f%2?'#ffb040':'#ff6a1a'; P(-4,-14+b,1,4,g); P(-1,-12+b,3,1,g); P(2,-15+b,1,3,g); P(-11,-13+b,2,1,g); P(6,-22+b,2,1,g); P(-2,-19+b-(f%2),1,2,'#ffd080'); }
}
function drawBird(P,c,f,k,eye){
  const y=-16+(f===1?-1:f===3?1:0), dk=shade(c,-.3), lt=shade(c,.3);
  P(-4,0,8,1,'rgba(0,0,0,.18)');
  const wing=k==='phoenix'?'#ff8a2a':k==='thunderbird'?'#3a5aa8':k==='harpy'?shade(c,-.15):'#c8a060';
  if(k==='harpy'){ P(-2,y-6,4,4,'#e8c0a0'); P(-2,y-7,4,2,'#5a3a2a'); P(-1,y-5,1,1,'#1a1a1a'); P(1,y-5,1,1,'#1a1a1a'); P(-2,y-2,4,6,c); P(-2,y+4,1,3,'#c8a040'); P(1,y+4,1,3,'#c8a040'); }
  else if(k==='cockatrice'){ const yy=-8; P(-4,yy,8,5,c); P(3,yy-4,3,4,c); P(6,yy-3,2,1,'#ffb040'); P(4,yy-3,1,1,eye); P(3,yy-6,3,2,'#e04040'); P(-7,yy-3,3,2,'#3a8a4a'); P(-8,yy-5,2,3,'#3a8a4a'); P(-1,yy+5,1,3,'#c8a040'); P(2,yy+5,1,3,'#c8a040'); drawWings(P,wing,f,0,yy+1); return; }
  else { P(-3,y,7,5,c); P(-2,y+4,5,1,lt); P(3,y-3,4,4,c); P(7,y-2,2,1,k==='thunderbird'?'#e8e8e8':'#ffd040'); P(5,y-2,1,1,eye); P(-1,y+5,1,2,'#c8a040'); P(2,y+5,1,2,'#c8a040'); }
  if(k==='phoenix'){ const fl=f%2; P(3,y-5,1,2,'#ffd040'); P(5,y-6+fl,1,2,'#ff6a1a'); P(-8,y+1,5,2,'#ff6a1a'); P(-11,y+2-fl,4,2,'#ffb040'); P(-13,y+3,2,1,'#ffe080'); P(-10,y+4+fl,3,1,'#ff3a1a'); }
  if(k==='thunderbird'){ P(-7,y+1,4,2,dk); P(-9,y+2,2,1,'#ffe060'); if(f%2) { P(-12,y-6,1,3,'#ffe060'); P(-11,y-3,1,2,'#ffe060'); } }
  if(k==='harpy') drawWings(P,wing,f,0,y+2); else drawWings(P,wing,f,0,y+1);
}
function drawGriffin(P,c,f,king,eye){
  drawQuad(P,c,f,true,eye,'wolf');
  const head=king?'#f4f0e8':'#e8e0d0', b=f%2;
  P(5,-17,6,6,head); P(11,-15,2,2,'#ffb040'); P(12,-14,1,2,'#d08020'); P(8,-15,1,1,eye); P(5,-18,2,1,head);
  drawWings(P,king?'#f0d070':'#c8a070',f,-2,-13);
  if(king){ P(5,-20,6,1,'#ffd040'); P(5,-21,1,1,'#ffd040'); P(7,-22,2,2,'#ffd040'); P(10,-21,1,1,'#ffd040'); P(7,-21,1,1,'#e04050'); P(-10,-12-b,2,3,'#f0d070'); }
}
function drawBeastX(P,c,f,k,eye){
  drawQuad(P,c,f,true,eye,'wolf');
  if(k==='kitsune'){ const tip='#fff4e0', b=f%2;
    for(let i=0;i<9;i++){ const a=-.9+i*.22; const x=-9+Math.round(Math.cos(a+Math.PI)*-2*(i%3)), y=-12-i; P(x-1-(i%3),y-b,2,3,c); P(x-2-(i%3),y-1-b,1,1,tip); }
    P(7,-16,1,2,'#ffffff'); P(11,-16,1,2,'#ffffff'); P(8,-11,1,1,'#e04050'); P(-1,-10,3,1,'#e04050'); P(6,-9,2,1,'#ffd040'); }
  if(k==='fenrir'){ P(-7,-11,14,1,shade(c,-.35)); for(let x=-6;x<6;x+=2) P(x,-12,1,1,shade(c,-.35)); P(7,-9,1,1,'#ffffff'); P(9,-9,1,1,'#ffffff'); P(-2,-6,2,1,'#c8c8d0'); P(3,-6,2,1,'#c8c8d0'); }
  if(k==='cerberus'){ const hd=shade(c,.05); P(3,-16,4,4,hd); P(1,-15,1,1,c); P(5,-14,1,1,eye); P(7,-14,1,1,'#1a1a1a'); P(8,-10,4,4,hd); P(10,-8,2,1,'#ff8a3a'); P(9,-17,4,3,hd); P(12,-16,1,1,eye); const fl=f%2; P(12,-12-fl,2,1,'#ff8a3a'); P(13,-13,1,1,'#ffd040'); P(-9,-13,1,4,'#3a2a2a'); P(-10,-14,1,1,'#ff6a2a'); }
}
function drawEarthDragon(P,c,f,eye){
  const dk=shade(c,-.35), lt=shade(c,.2), b=f%2;
  P(-14,0,28,1,'rgba(0,0,0,.3)');
  legsQuad(P,[-9,-7,4,6],-6,6,dk,f,'#2a2018'); legsQuad(P,[-8,-6,5,7],-6,6,dk,f,null);
  P(-11,-16,20,10,c); P(-10,-8,18,2,lt); P(-11,-16,20,1,dk);
  for(let x=-9;x<8;x+=3){ P(x,-18,2,2,'#7a6a4a'); P(x+1,-19,1,1,'#9a8a5a'); }
  P(-15,-12,5,4,c); P(-16,-10,2,3,dk); P(-15,-8,2,2,'#7a6a4a');
  P(8,-17,7,7,c); P(14,-14,2,4,c); P(15,-12,1,1,'#1a1a1a'); P(11,-15,1,1,eye);
  P(9,-21,1,4,'#e8dcc0'); P(12,-22,1,5,'#e8dcc0'); P(8,-22,1,1,'#e8dcc0'); P(13,-23,1,1,'#e8dcc0');
  P(13,-10,3,1,'#f4f0e0'); if(b) P(-4,-21,2,2,'#9a8a5a');
}
function drawSerpent(P,c,f,k,eye){
  const dk=shade(c,-.3), lt=shade(c,.25), b=f%2;
  P(-10,0,20,1,'rgba(0,0,0,.25)');
  P(-10,-4,16,3,c); P(-9,-2,14,1,lt); P(-12,-3,3,2,c); P(-14,-2,2,1,dk);
  P(4,-8,4,5,c); P(5,-12,3,5,c); P(5,-12,1,5,dk);
  const heads=k==='hydra'?[[6,-17],[1,-19],[10,-21]]:[[6,-17]];
  for(const [hx,hy0] of heads){ const hy=hy0-(b&&hx!==6?1:0); P(hx-1,hy+3,2,hy0===-17?2:Math.abs(hy0+12),c); P(hx-1,hy,5,4,c); P(hx+3,hy+1,2,2,dk); P(hx+1,hy+1,1,1,eye); if(k!=='basilisk'&&f%2){ P(hx+5,hy+2,2,1,'#e04050'); } }
  if(k==='hydra'){ P(0,-15,2,5,c); P(9,-17,2,8,c); }
  if(k==='basilisk'){ P(5,-19,4,1,'#e04050'); P(6,-20,2,1,'#e04050'); for(let x=-8;x<4;x+=3) P(x,-5,1,1,'#3a5a2a'); }
  for(let x=-8;x<4;x+=4) P(x,-4,1,1,dk);
}
function drawSeaSerpent(P,c,f,eye){
  const dk=shade(c,-.3), b=f%2;
  P(-14,-3,28,1,WATER_LINE); P(-12,-2,24,1,shade(WATER_LINE,-.2));
  P(-12,-8+b,4,5,c); P(-11,-10+b,2,2,c); P(-4,-9-b,4,6,c); P(-3,-11-b,2,2,dk);
  P(3,-15,4,12,c); P(4,-19,7,5,c); P(10,-17,2,2,dk); P(7,-18,1,1,eye); P(4,-21,1,2,'#7ad0c0'); P(6,-22,1,2,'#7ad0c0');
  P(-13,-4,3,1,FOAM); P(-5,-4,3,1,FOAM); P(2,-4,6,1,FOAM);
}
function drawKraken(P,c,f,eye){
  const dk=shade(c,-.3), lt=shade(c,.2), b=f%2;
  P(-15,-3,30,1,WATER_LINE); P(-13,-2,26,1,shade(WATER_LINE,-.2));
  const tent=(x,h,ph)=>{ const sw=(f+ph)%4<2?1:-1; for(let i=0;i<h;i++){ P(x+(i>h/2?sw:0),-4-i,2,1,i%3===0?lt:c); } P(x+sw,-4-h,1,1,dk); };
  tent(-14,9,0); tent(-10,13,1); tent(9,12,2); tent(13,8,3);
  P(-6,-15,12,11,c); P(-5,-20,10,6,c); P(-3,-23,6,3,c); P(-5,-20,10,1,lt);
  P(-4,-12,3,3,'#f4e8c0'); P(1,-12,3,3,'#f4e8c0'); P(-3,-11,1,2,eye); P(2,-11,1,2,eye);
  for(let x=-5;x<6;x+=2) P(x,-6,1,1,dk);
  P(-15,-4,4,1,FOAM); P(-8,-4,3,1,FOAM); P(7,-4,4,1,FOAM); if(b) P(-1,-5,2,1,FOAM);
}
function drawShark(P,c,f){
  const dk=shade(c,-.3), lt=shade(c,.35), open=f===2;
  P(-15,-3,30,1,WATER_LINE); P(-13,-2,26,1,shade(WATER_LINE,-.2));
  P(-12,-7,22,4,c); P(-10,-8,16,1,c); P(-12,-4,22,1,lt);
  P(-3,-15,3,7,dk); P(-2,-17,2,2,dk); P(-1,-18,1,1,dk);
  P(-15,-9,3,3,dk); P(-16,-11,2,2,dk);
  P(9,-7,4,3,c); P(8,-6,1,1,'#1a1a1a');
  if(open){ P(10,-4,4,2,'#3a1a1a'); P(10,-4,1,1,'#ffffff'); P(12,-4,1,1,'#ffffff'); P(11,-3,1,1,'#ffffff'); }
  P(-15,-4,3,1,FOAM); P(10,-3,5,1,FOAM);
}
function drawTreant(P,c,f,eye){
  const bark='#6a4a2a', dk='#4a3218', b=f%2;
  P(-8,0,16,1,'rgba(0,0,0,.28)');
  const la=f===1?-1:f===3?1:0;
  P(-5+la,-6,3,6,dk); P(2-la,-6,3,6,dk); P(-6+la,-1,4,1,dk); P(2-la,-1,4,1,dk);
  P(-5,-18,10,12,bark); P(-5,-18,1,12,dk); P(2,-15,1,6,dk);
  P(-2,-14,1,1,eye); P(1,-14,1,1,eye); P(-1,-11,2,1,'#2a1a10');
  P(-9,-15+b,4,2,bark); P(-11,-17+b,2,3,bark); P(5,-16-b,4,2,bark); P(8,-19-b,2,4,bark);
  P(-10,-27,20,9,c); P(-12,-24,24,5,c); P(-7,-30,14,4,c); P(-8,-27,6,2,shade(c,.25)); P(3,-25,5,2,shade(c,-.25));
  if(b) P(6,-29,2,2,'#e86a8a'); else P(-6,-22,2,2,'#e86a8a');
}
function drawYeti(P,c,f){
  const dk=shade(c,-.25), skin='#8aa0b8', b=f%2;
  P(-8,0,16,1,'rgba(0,0,0,.28)');
  const la=f===1?-1:f===3?1:0;
  P(-5+la,-6,4,6,c); P(1-la,-6,4,6,c); P(-6+la,-1,5,1,dk); P(1-la,-1,5,1,dk);
  P(-7,-19,14,13,c); P(-6,-19,12,1,shade(c,.15)); P(-5,-14,10,7,dk);
  P(-10,-17+b,3,9,c); P(7,-17-b,3,9,c); P(-10,-9+b,3,2,skin); P(7,-9-b,3,2,skin);
  P(-4,-25,8,7,c); P(-3,-23,6,4,skin); P(-2,-22,1,1,'#1a1a2a'); P(1,-22,1,1,'#1a1a2a'); P(-2,-20,4,1,'#3a2a3a'); P(-1,-20,1,1,'#ffffff'); P(1,-20,1,1,'#ffffff');
}
function drawBehemoth(P,c,f,eye){
  const dk=shade(c,-.35), lt=shade(c,.15);
  P(-14,0,28,1,'rgba(0,0,0,.3)');
  legsQuad(P,[-10,-7,5,8],-7,7,dk,f,'#1a1a1a'); legsQuad(P,[-9,-6,6,9],-7,7,dk,f,null);
  P(-12,-20,22,13,c); P(-11,-20,20,1,lt); P(-12,-8,22,1,dk);
  for(let x=-10;x<8;x+=3) P(x,-21,2,1,dk);
  P(9,-19,6,9,c); P(13,-14,2,3,lt); P(12,-16,1,1,eye);
  P(8,-24,2,6,'#e8dcc0'); P(6,-26,2,2,'#e8dcc0'); P(14,-23,2,5,'#e8dcc0'); P(15,-25,1,2,'#e8dcc0');
  P(-14,-17,2,6,c); P(-15,-12,1,2,dk);
}
function drawLion(P,c,f,k,eye){
  drawQuad(P,c,f,true,eye,'wolf');
  const mane=k==='chimera'?'#8a4a2a':'#a8643a', b=f%2;
  P(4,-15,4,7,mane); P(5,-16,3,1,mane); P(11,-11,1,1,'#e04050');
  if(k==='manticore'){ P(-9,-13,1,3,shade(c,-.3)); P(-10,-17,1,4,shade(c,-.3)); P(-9,-20,1,3,shade(c,-.3)); P(-8,-21-b,2,2,'#4a2a1a'); P(-7,-20-b,1,1,'#9aff5a'); drawWings(P,'#6a3a3a',f,-1,-12); }
  else { P(-10,-12,1,2,'#3a8a4a'); P(-11,-14,2,2,'#3a8a4a'); P(-12,-15,1,1,'#e04050'); P(0,-16,3,3,'#e8e0c8'); P(0,-18,1,2,'#c8b8a0'); P(2,-18,1,2,'#c8b8a0'); drawWings(P,'#5a4a3a',f,-2,-12); if(b){ P(13,-10,2,1,'#ff8a3a'); } }
}
function drawSalamander(P,c,f){
  const dk=shade(c,-.3), b=f%2;
  P(-8,0,16,1,'rgba(0,0,0,.2)');
  legsQuad(P,[-4,-2,2,4],-3,3,dk,f,null);
  P(-6,-5,11,3,c); P(4,-6,4,3,c); P(7,-5,1,1,'#1a1a1a'); P(-9,-4,3,2,c); P(-11,-3,2,1,c);
  P(-4,-6,1,1,'#ffd040'); P(0,-6,1,1,'#ffd040');
  P(-2,-8-b,2,2,'#ff8a2a'); P(-5,-7+b,1,2,'#ffb040'); P(2,-8,1,2,'#ff6a1a'); P(-11,-5-b,1,2,'#ff6a1a');
}
/* ---------- monster batch 8 ---------- */
function drawExtraMon8(P,m,f){
  const k=m.k, c=m.c, eye=m.eye||'#ffd040';
  if(k==='raptor'||k==='raptorA') return drawRaptor(P,c,f,eye,k==='raptorA');
  if(k==='dragonW') return drawDragonW(P,c,f,eye,m.job||'#ffb040');
  if(k==='nulleye') return drawNulleye(P,c,f);
  if(k==='tyrvern') return drawTyrvern(P,c,f,eye);
  if(k==='kong') return drawKong(P,c,f,eye);
  if(k==='dodo') return drawDodo(P,c,f);
  if(k==='batroww') return drawBatroww(P,c,f,eye);
  if(k==='neko') return drawNeko(P,c,f,m.job||'#c8a050');
  return drawExtraMon11(P,m,f);
}
function drawRaptor(P,c,f,eye,alpha){
  const dk=shade(c,-.35), lt=shade(c,.25), b=f===1||f===3?1:0, la=f===1?-1:f===3?1:0;
  P(-8,0,16,1,'rgba(0,0,0,.22)');
  P(-2+la,-5,2,5,dk); P(1-la,-5,2,5,c); P(-3+la,-1,3,1,dk); P(1-la,-1,3,1,dk);
  P(-5,-11+b,9,6,c); P(-4,-6+b,7,1,lt); for(let x=-4;x<3;x+=2) P(x,-11+b,1,1,dk);
  P(-10,-10+b,5,2,c); P(-13,-9+b,3,1,dk);
  P(3,-15+b,3,5,c); P(4,-17+b,7,3,c); P(8,-15+b,3,1,dk); P(8,-15+b,1,1,'#f4f0e0'); P(7,-16+b,1,1,eye);
  P(4,-10+b,2,1,dk);
  if(alpha){ P(3,-19+b,1,2,'#e04a3a'); P(5,-20+b,1,3,'#e04a3a'); P(7,-19+b,1,2,'#e04a3a'); P(-3,-12+b,5,1,'#e04a3a'); }
}
function drawDragonW(P,c,f,eye,glow){
  drawEarthDragon(P,c,f,eye);
  const w=shade(c,-.15), dk=shade(c,-.4);
  if(f%2===0){ P(-8,-31,12,2,w); P(-10,-29,16,3,w); P(-6,-26,10,6,w); for(let x=-9;x<5;x+=3) P(x,-28,1,7,dk); }
  else { P(-12,-21,18,3,w); P(-14,-18,8,2,w); for(let x=-11;x<5;x+=3) P(x,-20,1,4,dk); }
  P(15,-13,1,1,glow); if(f%2) P(16,-12,2,1,glow);
}
function drawNulleye(P,c,f){
  const dk=shade(c,-.25), lt=shade(c,.15), b=f===1||f===3?1:0;
  P(-10,0,20,1,'rgba(0,0,0,.25)');
  legsQuad(P,[-6,-4,3,5],-4,4,dk,f,'#c8c0c8');
  P(-8,-11+b,15,7,c); P(-7,-5+b,13,1,lt); P(-7,-11+b,13,1,dk);
  P(-12,-9+b,4,3,c); P(-14,-8+b,2,2,c);
  P(6,-14+b,3,6,c); P(7,-16+b,6,4,c); P(11,-13+b,3,2,'#e88a9a'); P(12,-12+b,1,1,'#fff');
  for(let x=-6;x<6;x+=3) P(x,-8+b,1,1,shade(c,-.1));
  if(f%2){ P(-4,-13,1,1,'#bfe0ff'); P(2,-14,1,1,'#bfe0ff'); P(9,-18,1,1,'#bfe0ff'); }
}
function drawTyrvern(P,c,f,eye){
  const dk=shade(c,-.35), st='#2a5a8a', b=f===1||f===3?1:0;
  P(-13,0,26,1,'rgba(0,0,0,.28)');
  legsQuad(P,[-8,-6,4,6],-6,6,dk,f,'#2a2018');
  P(-10,-15+b,19,9,c); P(-10,-15+b,19,1,dk);
  for(let x=-9;x<8;x+=3) P(x,-14+b,1,8,st);
  P(-14,-13+b,5,3,c); P(-16,-12+b,2,2,st);
  P(7,-18+b,8,8,c); P(13,-14+b,3,3,dk); P(13,-12+b,1,1,'#f4f0e0'); P(15,-12+b,1,1,'#f4f0e0'); P(10,-16+b,1,1,eye);
  if(f===2){ P(12,-11,4,2,'#5a1a1a'); }
  if(f%2===0){ P(-6,-24,10,2,shade(c,-.1)); P(-8,-22,12,3,shade(c,-.1)); for(let x=-7;x<4;x+=3) P(x,-22,1,5,st); }
  else { P(-10,-16,14,2,shade(c,-.1)); }
}
function drawKong(P,c,f,eye){
  const dk=shade(c,-.3), skin='#6a4a3a', b=f%2, la=f===1?-1:f===3?1:0;
  P(-10,0,20,1,'rgba(0,0,0,.28)');
  P(-6+la,-6,4,6,c); P(2-la,-6,4,6,c); P(-7+la,-1,5,1,dk); P(2-la,-1,5,1,dk);
  P(-9,-21,18,15,c); P(-8,-21,16,1,shade(c,.2)); P(-5,-17,10,8,skin);
  P(-13,-19+b,4,15,c); P(9,-19-b,4,15,c); P(-13,-5+b,4,3,skin); P(9,-5-b,4,3,skin);
  P(-5,-28,10,8,c); P(-3,-25,6,4,skin); P(-2,-24,1,1,eye); P(1,-24,1,1,eye); P(-2,-22,4,1,'#2a1a1a');
  P(-6,-29,3,2,c); P(3,-29,3,2,c);
}
function drawDodo(P,c,f){
  const b=f%2, la=f===1?-1:f===3?1:0;
  P(-5,0,10,1,'rgba(0,0,0,.2)');
  P(-1+la,-3,1,3,'#e8b040'); P(2-la,-3,1,3,'#e8b040');
  P(-5,-10,10,7,c); P(-4,-4,8,1,shade(c,.2)); P(-7,-9,2,3,'#f4f0e0');
  P(3,-14+b,4,5,c); P(6,-13+b,4,2,'#e8c060'); P(9,-12+b,1,2,'#c89040'); P(5,-13+b,1,1,'#1a1a1a');
}
function drawBatroww(P,c,f,eye){
  const y=-15+(f===1?-1:f===3?1:0), dk=shade(c,-.3);
  P(-4,0,8,1,'rgba(0,0,0,.18)');
  P(-2,y,5,5,c); P(-2,y-2,1,2,c); P(2,y-2,1,2,c); P(-1,y+1,1,1,eye); P(1,y+1,1,1,eye); P(0,y+3,1,1,'#e8dcc8');
  const fe='#3a3a5a';
  if(f%2===0){ P(-9,y-3,7,2,fe); P(-11,y-4,3,1,fe); P(3,y-3,7,2,fe); P(9,y-4,3,1,fe); P(-9,y-1,2,2,dk); P(8,y-1,2,2,dk); }
  else { P(-9,y+2,7,2,fe); P(3,y+2,7,2,fe); P(-10,y+4,2,1,fe); P(9,y+4,2,1,fe); }
  P(-1,y+5,1,3,'#8a6a3a'); P(-2,y+8,3,1,'#c8c8c8');
}
function drawNeko(P,c,f,armor){
  const b=f%2, la=f===1?-1:f===3?1:0, dk=shade(c,-.3);
  P(-3,0,6,1,'rgba(0,0,0,.22)');
  P(-2+la,-3,2,3,dk); P(1-la,-3,2,3,dk);
  P(-2,-8,5,5,armor); P(-2,-8,5,1,shade(armor,.2));
  P(-3,-13,7,5,c); P(-3,-15,2,2,c); P(2,-15,2,2,c); P(-2,-14,1,1,'#e88a9a'); P(3,-14,1,1,'#e88a9a');
  P(-2,-11,1,1,'#2a2a2a'); P(1,-11,1,1,'#2a2a2a'); P(0,-10,1,1,'#e88a9a');
  P(-5,-7-b,1,3,c); P(-6,-8-b,1,1,c);
  P(4,-9,1,4,'#c8c8d0'); P(4,-10,1,1,'#e8e8f0');
}
