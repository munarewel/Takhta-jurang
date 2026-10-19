/* =====================================================================
   TAKHTA JURANG — render irisan kastil (tampak samping)
   ===================================================================== */
const ROOF=46, BASE=26;
const RC={cv:null,g:null,s:2,camY:0,w:0,h:0,bg:new Map(),tint:new Map(),drag:null,follow:true};
function worldH(){ return ROOF+G.floors*FH+BASE; }
function floorTop(f){ return ROOF+(G.floors-1-f)*FH; }
function floorBase(f){ return floorTop(f)+FH-8; }
function tintCanvas(spr,col,key,a){
  let c=RC.tint.get(key); if(c) return c;
  c=document.createElement('canvas'); c.width=spr.width; c.height=spr.height; const g=c.getContext('2d');
  g.drawImage(spr,0,0); g.globalCompositeOperation='source-atop'; g.globalAlpha=a||.45; g.fillStyle=col; g.fillRect(0,0,c.width,c.height);
  if(RC.tint.size>3000) RC.tint.clear(); RC.tint.set(key,c); return c;
}
function frameOf(walk,moving){ return moving?Math.floor(walk*7)%4:0; }
function monSpr(sid,f){
  const s=SPECIES[sid]; const M=MON[s.mk];
  const base=monSprite({k:M.k,c:M.c,race:M.race,job:M.job,king:M.king,eye:M.eye,dir:M.k==='hum'?'side':undefined},f);
  const E=ELEM_BY[s.el]; let out=base;
  if(M.tint) out=tintCanvas(out,M.tint,'T|'+s.mk+'|'+f,.42);
  if(E&&E.c) out=tintCanvas(out,E.c,'E|'+sid+'|'+f,E.id==='hampa'?.55:.4);
  return out;
}
function advSpr(p,f){ return sprite({race:p.race,stage:'dewasa',job:JOBS[p.job].spr,sex:p.sx,skin:p.app.skin,hair:p.app.hair,eye:p.app.eye,cloth:p.app.cloth,cloth2:p.app.cloth2,outfit:p.app.outfit,style:p.app.style},'side',f); }
function lordSpr(f){ const r=lordRace(), L=G.lord;
  if(r.mon){ let c=monSprite(Object.assign({dir:r.mon.k==='hum'?'side':undefined},r.mon),f); if(r.tint) c=tintCanvas(c,r.tint,'L|'+r.id+f,.4); return c; }
  return sprite({race:r.race,stage:'dewasa',job:'rajaIblis',sex:'m',skin:L.app.skin,hair:L.app.hair,eye:L.app.eye,cloth:L.app.cloth,cloth2:L.app.cloth2,outfit:'mantel',style:'long'},'side',f); }
function assistSpr(f){ return monSprite({k:'hum',race:'succubus',job:'mSuccubus',dir:'side'},f); }
function blit(g,spr,x,y,flip,sc,alpha){
  sc=sc||1; const w=spr.width*sc, h=spr.height*sc;
  if(alpha!=null) g.globalAlpha=alpha;
  if(flip){ g.save(); g.translate(Math.round(x),0); g.scale(-1,1); g.drawImage(spr,-16*sc,Math.round(y)-33*sc,w,h); g.restore(); }
  else g.drawImage(spr,Math.round(x)-16*sc,Math.round(y)-33*sc,w,h);
  if(alpha!=null) g.globalAlpha=1;
}
/* latar dinding per tema, digambar sekali */
function wallBg(ti){
  let c=RC.bg.get(ti); if(c) return c; const T=THEMES[ti];
  c=document.createElement('canvas'); c.width=FW; c.height=FH; const g=c.getContext('2d');
  g.fillStyle=T.wall; g.fillRect(0,0,FW,FH);
  let seed=ti*97+3; const r=()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; };
  for(let y=4;y<FH-8;y+=7){ const off=(y/7)%2?0:9; for(let x=-off;x<FW;x+=18){ g.fillStyle=r()<.5?T.wall2:shade(T.wall,.06); g.fillRect(x+1,y+1,16,5); } }
  g.fillStyle='rgba(0,0,0,.35)'; g.fillRect(0,0,FW,4);
  g.fillStyle=T.floor; g.fillRect(0,FH-8,FW,8); g.fillStyle=shade(T.floor,.18); g.fillRect(0,FH-8,FW,1); g.fillStyle=shade(T.floor,-.25); g.fillRect(0,FH-2,FW,2);
  for(let x=4;x<FW;x+=12){ g.fillStyle=shade(T.floor,-.12); g.fillRect(x,FH-5,6,1); }
  if(ti===2){ for(let i=0;i<9;i++){ const x=r()*FW; g.fillStyle=T.acc; g.fillRect(x,FH-11,2,3); g.fillStyle='#e86a8a'; g.fillRect(x-1,FH-13,4,2); } }
  if(ti===3){ for(let i=0;i<7;i++){ const x=r()*FW, y=6+r()*28; g.fillStyle=T.acc; g.fillRect(x,y,2,5); g.fillRect(x-1,y+2,4,1); } }
  if(ti===4){ for(let i=0;i<6;i++){ const x=r()*FW; g.fillStyle='#ff7a3a'; g.fillRect(x,FH-8,8,1); } }
  if(ti===5){ for(let x=6;x<FW;x+=22){ g.fillStyle='#d8f4ff'; g.fillRect(x,4,1,4); g.fillRect(x+1,4,1,2); } }
  return c;
}
/* ---------- fasilitas ---------- */
function drawFix(g,fx,x,y,f){
  const t=G.t;
  if(fx.t==='chest'){ const v=chestValue(fx.r); const col=['#8a5a2a','#7a6a5a','#5a7a5a','#4a6a9a','#7a4a9a','#b8862a','#d0d0e0','#e3b75e','#ff7a5a'][v];
    g.fillStyle='#2a1a10'; g.fillRect(x-6,y-9,12,9); g.fillStyle=col; g.fillRect(x-5,y-8,10,7); g.fillStyle=shade(col,.25); g.fillRect(x-5,y-8,10,2);
    g.fillStyle=v>=6?'#fff2a0':'#d8b860'; g.fillRect(x-1,y-6,2,3); if(v>=5&&Math.floor(t*3)%2){ g.fillStyle='#fffbe0'; g.fillRect(x+3,y-11,1,1); g.fillRect(x-4,y-12,1,1); } return; }
  if(fx.t==='mimik'){ g.fillStyle='#2a1a10'; g.fillRect(x-6,y-9,12,9); g.fillStyle='#4a6a9a'; g.fillRect(x-5,y-8,10,7); g.fillStyle=shade('#4a6a9a',.25); g.fillRect(x-5,y-8,10,2); g.fillStyle='#d8b860'; g.fillRect(x-1,y-6,2,3);
    g.fillStyle='#f0f0e0'; g.fillRect(x-4,y-6,1,1); g.fillRect(x+3,y-6,1,1); if(Math.floor(t*1.3)%5===0){ g.fillStyle='#ff3a3a'; g.fillRect(x-3,y-7,1,1); g.fillRect(x+2,y-7,1,1); } return; }
  if(fx.t==='duri'){ g.fillStyle='#4a4450'; g.fillRect(x-7,y-1,14,1); g.fillStyle='#c8c8d0'; for(let i=-6;i<=5;i+=3){ g.fillRect(x+i,y-4,1,3); g.fillRect(x+i+1,y-3,1,2); } return; }
  if(fx.t==='panah'){ g.fillStyle='#1a1418'; g.fillRect(x-1,y-26,3,8); g.fillStyle='#6a6070'; g.fillRect(x-2,y-27,5,1); g.fillRect(x-2,y-18,5,1); return; }
  if(fx.t==='gas'){ g.fillStyle='#3a3a44'; g.fillRect(x-4,y-2,8,2); g.fillStyle='#8a7aa8'; g.fillRect(x-3,y-3,6,1); if(Math.floor(t*2)%3===0){ g.fillStyle='rgba(200,180,255,.35)'; g.fillRect(x-3,y-8,6,4); } return; }
  if(fx.t==='baskom'){ g.fillStyle='#5a4a3a'; g.fillRect(x,y-40,1,10); g.fillStyle='#a8a8b8'; g.fillRect(x-4,y-30,9,4); g.fillStyle='#d8d8e8'; g.fillRect(x-4,y-30,9,1); return; }
  if(fx.t==='licin'){ g.fillStyle='rgba(140,200,255,.55)'; g.fillRect(x-7,y-1,14,2); g.fillStyle='rgba(255,255,255,.6)'; g.fillRect(x-4,y-1,3,1); return; }
  if(fx.t==='lubang'){ g.fillStyle='#0a0810'; g.fillRect(x-6,y-1,12,4); g.fillStyle='#2a2030'; g.fillRect(x-7,y-1,1,4); g.fillRect(x+6,y-1,1,4); return; }
  if(fx.t==='apiT'){ g.fillStyle='#4a3a3a'; g.fillRect(x-2,y-3,4,3); g.fillStyle='#7a5a4a'; g.fillRect(x-3,y-4,6,1); if(Math.floor(t*4)%4===0){ g.fillStyle='#ff8a2a'; g.fillRect(x-1,y-8,2,4); } return; }
  if(fx.t==='jaringT'){ g.strokeStyle='rgba(230,230,230,.6)'; g.lineWidth=.5; g.beginPath(); g.moveTo(x-6,y-30); g.lineTo(x+6,y-22); g.moveTo(x+6,y-30); g.lineTo(x-6,y-22); g.moveTo(x,y-31); g.lineTo(x,y-21); g.stroke(); return; }
  if(fx.t==='rest'){ g.fillStyle='#6a4a2a'; g.fillRect(x-9,y-2,8,2); g.fillStyle='#a85a4a'; g.fillRect(x-9,y-3,7,1);
    g.fillStyle='#5a3a1a'; g.fillRect(x+2,y-2,6,2); const fl=Math.floor(t*6)%3; g.fillStyle='#ff9a2a'; g.fillRect(x+3,y-5-fl,4,3+fl); g.fillStyle='#ffe07a'; g.fillRect(x+4,y-4,2,2);
    g.fillStyle='#7fd8ff'; g.fillRect(x-1,y-14,3,6); g.fillStyle='#d8f4ff'; g.fillRect(x,y-13,1,3); return; }
  if(fx.t==='rahasia'){ const n=(fx.mons||[]).length+(fx.mon!=null?1:0);
    g.fillStyle='rgba(20,8,30,.82)'; g.fillRect(x-12,y-30,24,30); g.fillStyle='rgba(30,12,44,.9)'; g.fillRect(x-10,y-33,20,3);
    g.strokeStyle=fx.found?'rgba(255,120,120,.9)':'rgba(200,140,255,.75)'; g.lineWidth=.6; g.setLineDash([2,1.5]); g.strokeRect(x-12,y-33,24,33); g.setLineDash([]);
    g.fillStyle='#c08aff'; g.font='5px "Pixelify Sans",monospace'; g.textAlign='center'; g.fillText(fx.found?'DITEMUKAN':'RAHASIA',x,y-35);
    if(!n){ g.fillStyle='rgba(200,140,255,.5)'; g.fillText('kosong',x,y-14); }
    g.fillStyle='#1a1418'; g.fillRect(x-5,y-30,1,6); g.fillRect(x-4,y-24,1,5); g.fillRect(x-3,y-19,1,6); g.fillRect(x+2,y-28,1,7); g.fillRect(x+3,y-21,1,5);
    return; }
  if(fx.t==='obor'){ g.fillStyle='#4a3a2a'; g.fillRect(x,y-24,2,8); const fl=Math.floor(t*5)%2; g.fillStyle='#b060ff'; g.fillRect(x-1,y-28-fl,4,4); g.fillStyle='#f0d0ff'; g.fillRect(x,y-27,2,2); return; }
  if(fx.t==='patung'){ g.fillStyle='#6a6a74'; g.fillRect(x-4,y-4,8,4); g.fillRect(x-3,y-14,6,10); g.fillRect(x-6,y-13,3,5); g.fillRect(x+3,y-13,3,5); g.fillStyle='#ff4040'; g.fillRect(x-2,y-12,1,1); g.fillRect(x+1,y-12,1,1); return; }
  if(fx.t==='tengkorak'){ g.fillStyle='#e6e0cc'; for(const [dx,dy] of [[-5,-3],[-1,-3],[3,-3],[-3,-6],[1,-6],[-1,-9]]){ g.fillRect(x+dx,y+dy,3,3); g.fillStyle='#1a1418'; g.fillRect(x+dx,y+dy+1,1,1); g.fillStyle='#e6e0cc'; } return; }
}
function drawStairs(g,x,y,up){ g.fillStyle='#2a2028'; for(let i=0;i<5;i++){ const sx=up>0?x-10+i*4:x+6-i*4; g.fillRect(sx,y-3-i*4,6,3+i*4); } g.fillStyle='#8a7a6a'; for(let i=0;i<5;i++){ const sx=up>0?x-10+i*4:x+6-i*4; g.fillRect(sx,y-3-i*4,6,1); } }
function drawThrone(g,x,y,face){ g.fillStyle='#3a0a1a'; g.fillRect(x-9,y-30,18,30); g.fillStyle='#7a1a2a'; g.fillRect(x-7,y-28,14,24); g.fillStyle='#e3b75e'; g.fillRect(x-9,y-31,18,2); g.fillRect(x-10,y-34,3,4); g.fillRect(x+7,y-34,3,4); g.fillRect(x-1,y-35,2,4); g.fillStyle='#e3b75e'; g.fillRect(x-9,y-6,18,2); }
/* ---------- gambar utama ---------- */
function render(){
  const cv=RC.cv, g=RC.g; if(!cv||!G) return;
  const s=RC.s; const vh=(RC.h-(RC.padB||0))/s;
  RC.camY=clamp(RC.camY,Math.min(0,worldH()-vh),Math.max(0,worldH()-vh));
  g.setTransform(1,0,0,1,0,0); g.imageSmoothingEnabled=false;
  g.fillStyle='#0b0812'; g.fillRect(0,0,cv.width,cv.height);
  g.setTransform(s,0,0,s,0,Math.round(-RC.camY*s));
  const y0=RC.camY, y1=RC.camY+vh;
  // langit & atap
  if(y0<ROOF){ if(y0<0){ g.fillStyle='#120a1e'; g.fillRect(0,y0,FW,-y0); for(let i=0;i<40;i++){ const sx=(i*53)%FW, sy=y0+((i*97)%Math.max(1,-y0)); g.fillStyle=i%3?'#4a3a6a':'#c8b8e8'; g.fillRect(sx,sy,1,1); } } const gr=g.createLinearGradient(0,0,0,ROOF); gr.addColorStop(0,'#120a1e'); gr.addColorStop(1,'#3a1a3a'); g.fillStyle=gr; g.fillRect(0,0,FW,ROOF);
    g.fillStyle='#e8d8f0'; g.fillRect(160,8,6,6); g.fillStyle='#1a0e2a'; g.fillRect(162,7,5,5);
    g.fillStyle='#24182a'; g.fillRect(10,ROOF-14,FW-20,14); for(let x=10;x<FW-10;x+=12){ g.fillRect(x,ROOF-19,7,5); }
    g.fillStyle='#24182a'; g.fillRect(14,ROOF-34,14,20); g.fillRect(FW-28,ROOF-34,14,20); g.fillStyle='#3a1a3a'; g.fillRect(12,ROOF-38,18,4); g.fillRect(FW-30,ROOF-38,18,4);
    g.fillStyle='#ff6a3a'; g.fillRect(20,ROOF-28,2,3); g.fillRect(FW-22,ROOF-28,2,3);
    g.fillStyle='#e3b75e'; g.font='bold 7px "Pixelify Sans",monospace'; g.textAlign='center'; g.fillText('TAKHTA JURANG',FW/2,ROOF-5); }
  for(let f=0;f<G.floors;f++){
    const top=floorTop(f); if(top>y1||top+FH<y0) continue;
    const ti=Math.floor(f/10)%THEMES.length; g.drawImage(wallBg(ti),0,top);
    const base=floorBase(f);
    // label lantai
    g.fillStyle='rgba(0,0,0,.45)'; g.fillRect(1,top+2,17,8); g.fillStyle=THEMES[ti].acc; g.font='6px "Pixelify Sans",monospace'; g.textAlign='left'; g.fillText('L'+(f+1),3,top+8);
    // tangga / pintu / singgasana
    if(f===0){ g.fillStyle='#120c16'; g.fillRect(0,base-24,8,24); g.fillStyle='#6a5a4a'; g.fillRect(7,base-25,2,25); }
    if(f<topF()) drawStairs(g,fend(f),base,fdir(f)); else drawThrone(g,G.lord.x,base,-fdir(f));
    // petak & fasilitas
    for(let i=0;i<SLOTS;i++){ const x=SLOT_X(i); const fx=G.fix[f][i];
      if(UI.placing&&!fx){ g.fillStyle=Math.floor(G.t*3)%2?'rgba(255,154,208,.55)':'rgba(255,154,208,.3)'; g.fillRect(x-6,base,12,2); }
      if(fx) drawFix(g,fx,x,base,f);
      if(fx&&fx.lv>1){ g.fillStyle='#9fe0ff'; g.fillRect(x+5,base+2,1,1); g.fillRect(x+6,base+1,1,1); }
      const q=G.assist.q.find(q=>q.f===f&&q.slot===i); if(q){ g.globalAlpha=.4; drawFix(g,q.fx,x,base,f); g.globalAlpha=1; }
      if(UI.sel&&UI.sel.k==='fix'&&UI.sel.f===f&&UI.sel.i===i){ g.strokeStyle='#ffd36a'; g.lineWidth=.6; g.strokeRect(x-8,base-14,16,16); }
    }
  }
  // unit
  const items=[];
  for(const m of G.mons){ if(m.floor<0) continue; items.push({k:'m',u:m,f:m.floor,x:m.x,sec:m.secret&&!secretFound(m)}); }
  for(const a of G.advs) items.push({k:'a',u:a,f:a.floor,x:a.x});
  if(G.lord&&G.lord.hp>0) items.push({k:'l',u:G.lord,f:topF(),x:G.lord.x});
  for(const it of items){ const base=floorBase(it.f); if(base<y0-10||base-40>y1) continue; const u=it.u;
    if(it.k==='m'){ const m=u;
      if(m.dead){ g.fillStyle='#5a5060'; g.fillRect(m.px-3,base-7,6,7); g.fillRect(m.px-4,base-5,8,2); g.fillStyle='#8a7a9a'; g.fillRect(m.px-1,base-6,2,1);
        const left=Math.max(0,m.reviveAt-G.t); g.fillStyle='rgba(0,0,0,.6)'; g.fillRect(m.px-6,base-11,12,2); g.fillStyle=G.mana>=reviveCost(m)?'#b07aff':'#6a5a7a'; g.fillRect(m.px-6,base-11,12*(1-left/60),2); continue; }
      const S=SPECIES[m.sp], M=MON[S.mk]; const fr=frameOf(m.walk||0,(m.walk||0)>0); const spr=monSpr(m.sp,fr);
      const sc=Math.min(1.3,M.sc||1)*(M.k==='hum'?1:1);
      blit(g,spr,m.x,base+(M.k==='bat'||M.k==='wyvern'?-4:0),(m.face||1)<0,it.sec?Math.min(sc,1)*.8:sc,it.sec?.6:m.hidden?.35:null);
      if(S.stage>=3){ const n=S.stage>=4?5:3; for(let i=0;i<n;i++){ const a=G.t*2+i*2.1; g.fillStyle=S.stage>=4?(i%2?'#e0a0ff':'#fff'):'#ffd860'; g.fillRect(Math.round(m.x+Math.cos(a)*9),Math.round(base-16+Math.sin(a)*6),1,1); } }
      hpBar(g,m.x,base-24*sc-3,m.hp/monStats(m).hp,'#b07aff',m.lastHit&&G.t-m.lastHit<4);
      if(UI.sel&&UI.sel.k==='m'&&UI.sel.id===m.id){ g.fillStyle='#ffd36a'; g.fillRect(m.x-1,base-30*sc-6,3,2); g.fillRect(m.x,base-30*sc-4,1,1); }
    } else if(it.k==='a'){ const a=u; const p=G.people[a.pid]; if(!p) continue;
      const mv=(a.walk||0)>0; const spr=advSpr(p,frameOf(a.walk||0,mv)); blit(g,spr,a.x,base,(a.face||fdir(a.floor))<0,1,a.fx.charm>G.t?.7:null);
      if(a.fx.sleep>G.t){ g.fillStyle='#d0c0ff'; g.font='5px monospace'; g.fillText('z',a.x+4,base-30-(G.t*4%4)); }
      if(a.fx.stun>G.t){ g.fillStyle='#ffd040'; g.fillRect(a.x-3+Math.round(Math.sin(G.t*8)*3),base-33,2,2); }
      if(a.resting){ g.fillStyle='#9fff9a'; g.fillRect(a.x,base-33-(G.t*6%6),1,2); }
      const pa=G.parties.find(x=>x.id===a.party); if(pa&&pa.hero){ g.fillStyle='#ffd36a'; g.fillRect(a.x-1,base-36,3,1); }
      hpBar(g,a.x,base-30,a.hp/advStats(p).hp,'#e0645a',true);
    } else { const L=u; const r=lordRace(); const spr=lordSpr(Math.floor(G.t*2)%2); blit(g,spr,L.x,base,fdir(it.f)>0,r.sc?Math.min(1.35,r.sc):1.15);
      hpBar(g,L.x,base-42,L.hp/lordStats().hp,'#ff4a6a',true,22); }
  }
  // asisten
  { const A=G.assist; const base=floorBase(A.f); const bob=Math.round(Math.sin(G.t*3)*1.5); blit(g,assistSpr(Math.floor(G.t*4)%4),A.x,base-3+bob,(A.dir||1)<0,1); if(A.busy){ g.fillStyle='#ff9ad0'; g.fillRect(A.x+6,base-26+bob,2,2); } }
  // efek
  for(const e of EFX){ if(e.k==='txt') continue; const base=floorBase(e.f); const p=1-e.t/e.t0; drawEfx(g,e,base,p); }
  // dasar tanah
  { const by=ROOF+G.floors*FH; if(by<y1){ g.fillStyle='#1a1018'; g.fillRect(0,by,FW,BASE); g.fillStyle='#2a1a22'; for(let x=0;x<FW;x+=9) g.fillRect(x,by+3+(x%4),5,2); } }
  // teks melayang (di ruang layar agar tajam)
  g.setTransform(1,0,0,1,0,0); g.textAlign='center';
  for(const e of EFX){ if(e.k!=='txt') continue; const p=1-e.t/e.t0; const wy=floorBase(e.f)-34-p*10; const sx=e.x*s, sy=(wy-RC.camY)*s; if(sy<-20||sy>cv.height+20) continue;
    const quote=e.s.length>14; const fs=Math.round((quote?6:6.5)*s);
    g.font=`${quote?'500':'700'} ${fs}px "Signika","Alegreya Sans",sans-serif`;
    g.globalAlpha=Math.min(1,e.t*3);
    if(quote){ const w=Math.min(cv.width-8,g.measureText(e.s).width+10*s/2); const bx=clamp(sx,w/2+4,cv.width-w/2-4); g.fillStyle='rgba(20,14,26,.88)'; g.fillRect(bx-w/2,sy-fs-2,w,fs+6); g.fillStyle=e.c; g.fillText(e.s,bx,sy); }
    else { g.lineWidth=Math.max(2,s*.9); g.strokeStyle='rgba(10,6,14,.9)'; g.strokeText(e.s,sx,sy); g.fillStyle=e.c; g.fillText(e.s,sx,sy); }
    g.globalAlpha=1; }
}
function hpBar(g,x,y,r,col,show,w){ if(!show||r>=1) return; w=w||12; g.fillStyle='rgba(0,0,0,.7)'; g.fillRect(Math.round(x-w/2)-.5,Math.round(y),w+1,2); g.fillStyle=col; g.fillRect(Math.round(x-w/2),Math.round(y)+.5,w*clamp(r,0,1),1); }
function drawEfx(g,e,base,p){
  const x=e.x;
  g.globalAlpha=1-p*.7;
  switch(e.k){
    case 'slash': g.fillStyle=e.c; for(let i=0;i<4;i++) g.fillRect(x-4+i*2,base-20+i*2,2,1); break;
    case 'claw': g.fillStyle='#ff8a8a'; for(let i=0;i<3;i++) g.fillRect(x-3+i*2,base-22+i,1,6); break;
    case 'arrow': g.fillStyle='#e8e0c8'; g.fillRect(x-4,base-16,6,1); break;
    case 'bolt': g.fillStyle=e.c; g.fillRect(x-2,base-18,4,4); break;
    case 'blast': case 'boom': g.fillStyle=e.c; const r=6+p*18; g.globalAlpha=(1-p)*.6; g.beginPath(); g.arc(x,base-12,r,0,6.3); g.fill(); break;
    case 'fire': g.fillStyle=e.c; for(let i=0;i<6;i++) g.fillRect(x-12+i*4,base-6-((i*7+Math.floor(p*20))%8),3,5); break;
    case 'ice': g.fillStyle=e.c; for(let i=0;i<5;i++) g.fillRect(x-10+i*5,base-8-(i%2)*4,2,6); break;
    case 'zap': g.fillStyle=e.c; for(let y=0;y<40;y+=4) g.fillRect(x+((y/4)%2?1:-1),base-40+y,2,4); break;
    case 'heal': g.fillStyle=e.c; g.fillRect(x-1,base-28-p*6,3,1); g.fillRect(x,base-29-p*6,1,3); break;
    case 'soul': g.fillStyle=e.c; g.fillRect(x-1,base-14-p*24,3,3); break;
    case 'poof': g.fillStyle='#a89ab8'; for(let i=0;i<5;i++) g.fillRect(x-8+i*4,base-6-p*8-(i%2)*3,3,3); break;
    case 'rise': case 'warp': case 'evo': { g.fillStyle=e.c; const h=36*(1-p); g.globalAlpha=(1-p)*.7; g.fillRect(x-5,base-h,10,h); if(e.k==='evo'){ for(let i=0;i<8;i++) g.fillRect(x+Math.cos(i+p*6)*12,base-14+Math.sin(i+p*6)*10,2,2); } break; }
    case 'chest': g.fillStyle='#ffd36a'; for(let i=0;i<6;i++) g.fillRect(x-6+i*2.4,base-12-p*14-(i%3)*2,1,1); break;
    case 'roar': g.strokeStyle='#ffffff'; g.lineWidth=.6; g.beginPath(); g.arc(x,base-14,8+p*24,0,6.3); g.stroke(); break;
    case 'web': g.strokeStyle='#e8e8e8'; g.lineWidth=.5; g.strokeRect(x-5,base-20,10,14); break;
    case 'curse': g.fillStyle=e.c; g.fillRect(x-1,base-34+p*4,2,2); break;
    case 'heart': g.fillStyle=e.c; g.fillRect(x-2,base-34-p*6,2,2); g.fillRect(x+1,base-34-p*6,2,2); g.fillRect(x-1,base-32-p*6,3,2); break;
    case 'shield': g.strokeStyle=e.c; g.lineWidth=.6; g.strokeRect(x-7,base-26,14,24); break;
    case 'rage': g.fillStyle=e.c; g.fillRect(x+4,base-32,2,2); break;
    case 'note': g.fillStyle=e.c; g.fillRect(x+4,base-30-p*8,1,4); g.fillRect(x+4,base-30-p*8,3,1); break;
    case 'crack': g.fillStyle=e.c; g.globalAlpha=1-p; g.fillRect(x-6,base-30,12,30); break;
    case 'spark': g.fillStyle=e.c; g.fillRect(x,base-10-p*10,1,1); break;
    case 'stairs': break;
    default: if(e.k.startsWith('trap_')){ g.fillStyle='#ffffff'; g.globalAlpha=(1-p)*.6; g.fillRect(x-7,base-20,14,20); }
  }
  g.globalAlpha=1;
}
/* ---------- input kanvas ---------- */
function pickAtCanvas(cx,cy){
  const s=RC.s; const wx=cx/s, wy=cy/s+RC.camY;
  let f=-1; for(let i=0;i<G.floors;i++){ const t=floorTop(i); if(wy>=t&&wy<t+FH){ f=i; break; } }
  if(f<0) return null;
  const base=floorBase(f);
  if(!UI.placing){ let best=null,bd=10;
    for(const a of G.advs) if(a.floor===f){ const d=Math.abs(a.x-wx); if(d<bd&&wy>base-34&&wy<base+4){ bd=d; best={k:'a',id:a.pid}; } }
    for(const m of G.mons) if(m.floor===f){ const x=m.dead?m.px:m.x; const d=Math.abs(x-wx); if(d<bd&&wy>base-34&&wy<base+4){ bd=d; best={k:'m',id:m.id}; } }
    if(f===topF()&&Math.abs(G.lord.x-wx)<12&&wy>base-40) best={k:'l'};
    if(best) return best; }
  let si=-1,sd=9; for(let i=0;i<SLOTS;i++){ const d=Math.abs(SLOT_X(i)-wx); if(d<sd){ sd=d; si=i; } }
  if(si>=0) return {k:'slot',f,i:si};
  return {k:'floor',f};
}
function initCanvas(cv){
  RC.cv=cv; RC.g=cv.getContext('2d');
  const resize=()=>{ const r=cv.getBoundingClientRect(); const dpr=Math.min(3,window.devicePixelRatio||1); cv.width=Math.round(r.width*dpr); cv.height=Math.round(r.height*dpr); RC.w=cv.width; RC.h=cv.height; RC.s=cv.width/FW; };
  resize(); window.addEventListener('resize',resize); new ResizeObserver(resize).observe(cv);
  let down=null;
  cv.addEventListener('pointerdown',e=>{ cv.setPointerCapture(e.pointerId); down={y:e.clientY,x:e.clientX,cam:RC.camY,moved:false}; });
  cv.addEventListener('pointermove',e=>{ if(!down) return; const dy=e.clientY-down.y; if(Math.abs(dy)>6) down.moved=true; if(down.moved){ const dpr=cv.width/cv.getBoundingClientRect().width; RC.camY=down.cam-dy*dpr/RC.s; RC.follow=false; } });
  cv.addEventListener('pointerup',e=>{ if(!down) return; const d=down; down=null; if(d.moved) return; const r=cv.getBoundingClientRect(); const dpr=cv.width/r.width; const hit=pickAtCanvas((e.clientX-r.left)*dpr,(e.clientY-r.top)*dpr); if(hit) onCanvasTap(hit); });
  cv.addEventListener('wheel',e=>{ e.preventDefault(); RC.camY+=e.deltaY/RC.s; RC.follow=false; },{passive:false});
}
function scrollToFloor(f){ const vh=(RC.h-(RC.padB||0))/RC.s; RC.camY=floorTop(f)+FH/2-vh/2; if(worldH()<vh) RC.camY=worldH()-vh; }
