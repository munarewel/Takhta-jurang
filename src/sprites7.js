/* ---------- sprite monster batch 11 ---------- */
function drawExtraMon11(P,m,f){
  const k=m.k, c=m.c, eye=m.eye||'#2a2a2a';
  if(k==='bee'||k==='beeQ') return drawBee(P,c,f,eye,k==='beeQ');
  if(k==='agroo') return drawAgroo(P,c,f);
  if(k==='kangaroo') return drawKangaroo(P,c,f,eye);
  if(k==='tiger') return drawTiger(P,c,f,eye);
  return drawJurangMon(P,m,f);
}
function drawBee(P,c,f,eye,queen){
  const y=(queen?-14:-11)+(f===1?-1:f===3?1:0), dk='#2a2018', w='rgba(220,240,255,.85)';
  P(-3,0,6,1,'rgba(0,0,0,.18)');
  if(f%2===0){ P(-4,y-5,3,3,w); P(1,y-5,3,3,w); if(queen){ P(-6,y-6,4,3,w); P(2,y-6,4,3,w); } } else { P(-5,y-3,3,2,w); P(2,y-3,3,2,w); }
  const L=queen?9:6;
  P(-L/2,y-2,L,4,c); for(let i=1;i<L;i+=2) P(-L/2+i,y-2,1,4,dk);
  P(L/2,y-1,1,2,dk); P(L/2+1,y,1,1,'#1a1a1a');
  P(-L/2-3,y-2,3,3,dk); P(-L/2-3,y-1,1,1,eye==='#2a2a2a'?'#ff3a3a':eye); P(-L/2-3,y-4,1,2,dk); P(-L/2-1,y-4,1,2,dk);
  if(queen){ P(-L/2-3,y-6,4,1,'#e3b75e'); P(-L/2-3,y-7,1,1,'#e3b75e'); P(-L/2-1,y-7,1,1,'#e3b75e'); P(-L/2+1,y-7,1,1,'#e3b75e'); }
}
function drawAgroo(P,c,f){
  const la=f===1?-2:f===3?2:0, dk=shade(c,-.3), lt=shade(c,.25);
  P(-5,0,10,1,'rgba(0,0,0,.22)');
  P(-2+la,-7,1,7,'#c8a040'); P(1-la,-7,1,7,'#c8a040'); P(-3+la,-1,2,1,'#c8a040'); P(1-la,-1,2,1,'#c8a040');
  P(-6,-14,9,7,c); P(-5,-9,7,2,lt); P(-9,-13,3,2,dk); P(-10,-12,2,1,dk);
  P(1,-20,4,7,c); P(2,-23,4,4,c); P(6,-22,4,2,'#e8b030'); P(9,-21,1,1,'#a87020');
  P(4,-22,2,1,'#ff3a2a'); P(3,-23,3,1,'#1a1a1a');
  P(1,-26,1,3,dk); P(3,-27,1,4,dk); P(5,-25,1,2,dk);
  P(-3,-12,4,3,dk);
}
function drawKangaroo(P,c,f,eye){
  const hop=f===1||f===3?-3:0, dk=shade(c,-.25), lt=shade(c,.25);
  P(-5,0,10,1,'rgba(0,0,0,.2)');
  P(-4,-3+hop,6,3,dk); P(1,-1+hop,4,1,dk); P(-9,-6+hop,6,2,dk); P(-11,-5+hop,3,1,dk);
  P(-3,-13+hop,7,10,c); P(-1,-10+hop,4,6,lt);
  P(1,-19+hop,5,6,c); P(5,-17+hop,3,2,c); P(7,-16+hop,1,1,'#1a1a1a'); P(4,-17+hop,1,1,eye); P(1,-22+hop,1,3,c); P(3,-22+hop,1,3,c);
  P(3,-12+hop,3,1,dk); P(5,-13+hop,1,1,dk);
  // bola juggling
  const t=f%4; const balls=[[6,-25],[9,-21],[3,-27]]; for(let i=0;i<3;i++){ const [bx,by]=balls[(i+t)%3]; P(bx,by+hop,2,2,['#e8e0c0','#d0503a','#5a8ad0'][i]); }
}
function drawTiger(P,c,f,eye){
  const dk='#2a1a10', lt=shade(c,.25), wh='#f4ece0';
  P(-10,0,20,1,'rgba(0,0,0,.25)');
  legsQuad(P,[-7,-5,4,6],-5,5,c,f,null);
  P(-9,-12,16,8,c); P(-8,-12,14,1,lt); P(-7,-5,12,1,wh);
  for(const x of [-7,-4,-1,2]) { P(x,-12,1,4,dk); P(x+1,-9,1,2,dk); }
  P(6,-15,7,7,c); P(7,-10,5,2,wh); P(11,-12,2,2,wh); P(12,-12,1,1,'#1a1a1a'); P(9,-13,1,1,eye); P(6,-17,2,2,c); P(11,-17,2,2,c); P(7,-14,1,2,dk); P(9,-16,1,1,dk);
  P(-12,-12,3,1,c); P(-13,-14,1,3,c); P(-13,-15,1,1,dk);
  // sabuk silat
  P(-2,-12,2,8,'#1a1a1a'); P(-3,-5,1,3,'#1a1a1a'); P(0,-5,1,2,'#1a1a1a');
}

JOBDEF.biksu={cloth:'#e0902a',bare:1,pants:'#e0902a',hat:'headband',bandC:'#f0d040',trim:'#8a3a1a'};
