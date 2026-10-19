/* =====================================================================
   TAKHTA JURANG — gambar ulang naga & golem, prajurit hewan
   ===================================================================== */
function drawDragon2(P,m,f,earth){
  const c=m.c||'#9a2a1a', eye=m.eye||'#ffd040', dk=shade(c,-.32), lt=shade(c,.22), belly=shade(c,.42), wing=shade(c,-.15), memb=shade(c,.1);
  const b=f===1?-1:f===3?1:0, lg=f%2;
  P(-11,0,22,1,'rgba(0,0,0,.25)');
  // ekor
  P(-15,-11,6,3,c); P(-18,-9,4,2,c); P(-20,-8,3,2,dk); P(-21,-10,2,2,lt);
  // kaki belakang & depan
  P(-7,-6,3,6-lg,dk); P(-8,-1+(-lg),4,1,shade(dk,-.3)); P(3,-6,3,6,dk); P(3,-1,4,1,shade(dk,-.3));
  // badan
  P(-10,-15,16,9,c); P(-9,-16,13,1,c); P(-9,-9,14,2,belly); P(-10,-15,16,1,lt);
  for(let x=-8;x<4;x+=3) P(x,-17,1,1,earth?'#e8dcc8':lt);
  if(earth){ for(let x=-8;x<4;x+=4) P(x,-14,3,2,dk); }
  // leher & kepala
  P(4,-19+b,4,7,c); P(5,-19+b,1,7,lt); P(6,-24+b,7,5,c); P(12,-22+b,4,3,c); P(13,-20+b,3,1,belly); P(15,-22+b,1,1,dk);
  P(10,-23+b,1,1,eye); P(10,-22+b,1,1,shade(eye,-.4));
  P(7,-27+b,1,3,'#e8dcc8'); P(6,-28+b,1,1,'#e8dcc8'); P(9,-26+b,1,2,'#e8dcc8');
  if(f===2) { P(16,-22+b,3,1,'#ff8a3a'); P(18,-23+b,2,1,'#ffd040'); }
  // sayap
  if(!earth){
    if(f%2===0){ P(-2,-28,1,13,dk); P(-1,-29,2,1,dk); P(-9,-27,8,3,memb); P(-10,-24,9,3,memb); P(-10,-21,9,4,memb); P(-10,-17,2,1,memb); P(-7,-17,2,1,memb); P(-4,-17,2,1,memb); P(-9,-27,1,10,wing); P(-6,-27,1,10,wing); }
    else { P(-12,-19,11,4,memb); P(-14,-17,3,2,memb); P(-12,-19,11,1,wing); P(-10,-15,2,1,memb); P(-6,-15,2,1,memb); P(-2,-20,1,5,dk); }
  } else { P(-4,-20,1,4,'#e8dcc8'); P(0,-21,1,5,'#e8dcc8'); }
}
function drawGolem2(P,m,f){
  const c=m.c||'#8a8a84', eye=m.eye||'#5ae0ff', dk=shade(c,-.3), lt=shade(c,.2), lg=f%2, b=f===1?-1:f===3?1:0;
  P(-10,0,20,1,'rgba(0,0,0,.28)');
  P(-6,-9,5,9-lg,dk); P(1,-9,5,9,dk); P(-7,-1,6,1,shade(dk,-.3)); P(1,-1,6,1,shade(dk,-.3));
  P(-8,-23,16,14,c); P(-8,-23,16,2,lt); P(-8,-10,16,1,dk); P(-3,-21,1,4,dk); P(4,-16,1,4,dk); P(-6,-14,3,1,dk);
  P(-1,-18,3,3,eye); P(0,-17,1,1,'#ffffff');
  P(-12,-22+b,4,11,c); P(-12,-22+b,4,1,lt); P(8,-22-b,4,11,c); P(8,-22-b,4,1,lt); P(-13,-11+b,6,5,dk); P(7,-11-b,6,5,dk);
  P(-4,-28,8,5,c); P(-4,-28,8,1,lt); P(-3,-26,2,1,eye); P(1,-26,2,1,eye);
  if(m.king){ P(-5,-20,1,6,eye); P(5,-22,1,4,eye); P(-10,-18,1,3,eye); }
}
/* prajurit hewan: job = 'kepala|senjata|gaya|warna baju' */
function drawBeastman(P,m,f){
  const [hd,wp,st,oc]=(m.job||'rakun|katana|p|#3a3a3a').split('|'); const c=m.c||'#7a6a5a', eye=m.eye||'#1a1a1a', dk=shade(c,-.3), lt=shade(c,.25), out=oc||'#3a3a3a', odk=shade(out,-.3);
  const lg=f%2, b=f===1?-1:f===3?1:0;
  P(-5,0,10,1,'rgba(0,0,0,.25)');
  // ekor (di belakang)
  if(hd==='rakun'){ for(let i=0;i<4;i++) P(-9+i,-12+i,3,2,i%2?'#2a2a2a':c); }
  if(hd==='serigala'||hd==='rubah'){ P(-9,-13,4,3,c); P(-10,-11,2,2,hd==='rubah'?'#fff4e8':lt); }
  if(hd==='kera'){ P(-8,-12,2,1,c); P(-9,-15,1,3,c); P(-8,-16,2,1,c); }
  if(hd==='kucing'){ P(-8,-14,1,5,c); P(-9,-16,1,3,c); }
  if(hd==='tengu'){ P(-9,-21+b,4,10,'#2a2a3a'); P(-10,-19+b,1,6,'#1a1a2a'); }
  if(hd==='kappa'){ P(-7,-19,4,9,'#4a6a2a'); P(-7,-19,4,1,'#6a8a3a'); }
  // kaki
  const pants=st==='g'?c:odk; P(-3,-9,2,9-lg,pants); P(1,-9,2,9,pants); P(-4,-1+(lg?-1:0),3,1,'#2a1a14'); P(1,-1,3,1,'#2a1a14');
  // badan & baju
  if(st==='g'){ P(-4,-18,8,9,c); P(-4,-11,8,2,out); P(-1,-11,2,2,'#e3b75e'); P(-3,-17,1,4,lt); }
  else if(st==='m'){ P(-4,-18,8,10,out); P(-2,-18,4,9,shade(out,.2)); P(-4,-12,8,1,odk); }
  else if(st==='w'){ P(-5,-18,10,11,out); P(-5,-8,10,1,odk); P(-1,-17,2,9,shade(out,.2)); }
  else { P(-4,-18,8,9,out); P(-4,-12,8,1,odk); if(st==='s'){ P(-6,-18,3,3,odk); P(3,-18,3,3,odk); P(-4,-15,8,1,'#e3b75e'); } if(st==='n'){ P(-4,-18,8,2,'#c82a2a'); } }
  // lengan
  P(-6,-17+b,2,7,st==='g'||st==='m'?c:out); P(4,-17-b,2,7,st==='g'||st==='m'?c:out); P(-6,-10+b,2,2,c); P(4,-10-b,2,2,c);
  // kepala
  const fur=hd==='panda'?'#f4f4f0':hd==='kappa'?'#5a9a4a':hd==='tengu'?'#c83a2a':c;
  P(-4,-25,8,7,fur); P(-4,-25,8,1,shade(fur,.2));
  const E=(x,y)=>P(x,y,1,1,eye);
  if(typeof drawBeastHead2==='function'&&drawBeastHead2(P,hd,fur,eye,c,dk,lt)){}
  else if(hd==='rakun'){ P(-4,-27,2,2,c); P(2,-27,2,2,c); P(-4,-23,8,2,'#2a2a2a'); P(-2,-23,1,1,'#ffffff'); P(1,-23,1,1,'#ffffff'); P(3,-21,2,2,'#e8dcc8'); P(4,-21,1,1,'#1a1a1a'); }
  else if(hd==='serigala'||hd==='rubah'){ P(-4,-28,2,3,fur); P(2,-28,2,3,fur); P(4,-22,3,2,hd==='rubah'?'#fff4e8':lt); P(6,-22,1,1,'#1a1a1a'); E(1,-23); if(hd==='rubah') P(-3,-27,1,1,'#2a1a1a'); }
  else if(hd==='kera'){ P(-2,-24,5,4,'#e8c0a0'); P(-5,-23,1,2,fur); P(4,-23,1,2,fur); E(-1,-23); E(2,-23); P(0,-21,2,1,'#a06050'); }
  else if(hd==='kappa'){ P(-3,-27,6,2,'#e8e0c8'); P(-4,-26,1,1,'#3a7a3a'); P(3,-26,1,1,'#3a7a3a'); P(4,-22,3,2,'#e8c040'); E(1,-23); }
  else if(hd==='tengu'){ P(4,-23,5,1,'#c83a2a'); P(8,-23,1,1,'#a82a1a'); P(-4,-27,8,2,'#2a2a3a'); P(-1,-28,2,1,'#2a2a3a'); E(1,-23); P(-3,-21,2,1,'#e8e0d0'); }
  else if(hd==='panda'){ P(-4,-27,2,2,'#1a1a1a'); P(2,-27,2,2,'#1a1a1a'); P(-3,-23,2,2,'#1a1a1a'); P(1,-23,2,2,'#1a1a1a'); P(-2,-23,1,1,'#ffffff'); P(2,-23,1,1,'#ffffff'); P(0,-21,1,1,'#1a1a1a'); }
  else if(hd==='beruang'){ P(-4,-27,2,2,fur); P(2,-27,2,2,fur); P(1,-21,3,2,lt); P(3,-21,1,1,'#1a1a1a'); E(1,-23); E(-2,-23); }
  else if(hd==='kucing'){ P(-4,-28,2,3,fur); P(2,-28,2,3,fur); P(-3,-27,1,1,'#f0a0b0'); E(-2,-23); E(1,-23); P(4,-21,3,1,'#e8e8e8'); P(4,-20,3,1,'#e8e8e8'); }
  else if(hd==='kodok'){ P(-5,-25,10,5,fur); P(-5,-28,3,3,fur); P(2,-28,3,3,fur); P(-4,-27,1,1,eye); P(3,-27,1,1,eye); P(-3,-21,7,1,dk); }
  else if(hd==='banteng'){ P(-7,-26,3,1,'#e8dcc8'); P(-7,-28,1,2,'#e8dcc8'); P(4,-26,3,1,'#e8dcc8'); P(6,-28,1,2,'#e8dcc8'); P(2,-21,4,3,lt); P(4,-20,1,1,'#e3b75e'); E(1,-24); }
  else if(hd==='kelinci'){ P(-3,-32,2,7,fur); P(1,-32,2,7,fur); P(-2,-31,1,5,'#f0a0b0'); E(1,-23); P(3,-21,1,1,'#f0a0b0'); }
  else if(hd==='burunghantu'){ P(-4,-28,2,3,dk); P(2,-28,2,3,dk); P(-3,-24,3,3,'#f8e8a0'); P(1,-24,3,3,'#f8e8a0'); P(-2,-23,1,1,'#1a1a1a'); P(2,-23,1,1,'#1a1a1a'); P(0,-21,1,2,'#e8a040'); }
  else if(hd==='babi'){ P(-4,-27,2,2,fur); P(2,-27,2,2,fur); P(2,-22,4,3,'#e8a0a0'); P(3,-21,1,1,'#7a3a3a'); P(5,-21,1,1,'#7a3a3a'); P(1,-19,1,2,'#f0f0e0'); E(0,-24); }
  // aksesori kepala
  if(st==='n') P(-4,-21,8,2,odk);
  if(st==='s') { P(-1,-27,2,2,'#1a1a1a'); }
  if(st==='w') { P(-5,-26,10,1,odk); P(-3,-29,6,3,out); P(-1,-32,2,3,out); }
  if(st==='m') { P(-4,-25,8,1,'#e8701a'); }
  // senjata
  const hx=5, hy=-11-b;
  if(wp==='katana'){ P(hx,hy-15,1,14,'#e8e8f0'); P(hx,hy-15,1,1,'#ffffff'); P(hx-1,hy-1,3,1,'#e3b75e'); P(hx,hy,1,3,'#3a1a1a'); }
  else if(wp==='shuriken'){ P(hx,hy-1,3,1,'#c8c8d0'); P(hx+1,hy-2,1,3,'#c8c8d0'); P(hx+1,hy-1,1,1,'#3a3a3a'); if(f===2){ P(hx+6,hy-6,3,1,'#c8c8d0'); P(hx+7,hy-7,1,3,'#c8c8d0'); } }
  else if(wp==='staff'){ P(hx,hy-14,1,17,'#7a5432'); P(hx-1,hy-16,3,2,eye==='#1a1a1a'?'#9fe0ff':eye); }
  else if(wp==='spear'){ P(hx,hy-15,1,18,'#7a5432'); P(hx-1,hy-17,3,2,'#c8c8d0'); P(hx,hy-18,1,1,'#ffffff'); }
  else if(wp==='bow'){ P(hx+1,hy-6,1,1,'#8a5a32'); P(hx+2,hy-5,1,7,'#8a5a32'); P(hx+1,hy+2,1,1,'#8a5a32'); P(hx,hy-5,1,7,'#e8e0cc'); }
  else if(wp==='axe'){ P(hx,hy-12,1,14,'#6a4a2a'); P(hx+1,hy-12,4,5,'#a8a8b8'); P(hx+4,hy-12,1,5,'#e8e8f0'); }
  else if(wp==='fist'){ P(hx-1,hy,3,3,'#e8e0d0'); P(-7,-11+b,3,3,'#e8e0d0'); }
}
function drawJurangMon3(P,m,f){
  if(m.k==='dragon2'){ drawDragon2(P,m,f,false); return; }
  if(m.k==='dragonE2'){ drawDragon2(P,m,f,true); return; }
  if(m.k==='golemX'){ drawGolem2(P,m,f); return; }
  if(m.k==='beastman'){ drawBeastman(P,m,f); return; }
  return drawJurangMon4(P,m,f);
}
