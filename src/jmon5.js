/* =====================================================================
   TAKHTA JURANG — gelombang monster ke-5: prajurit hewan baru,
   humanoid baru, dan makhluk dengan gambar sendiri
   ===================================================================== */
(function(){
  const BASE={F:[18,3],E:[30,5],D:[52,9],C:[115,14],B:[270,22],A:[500,35],S:[1150,60],SS:[2300,85]};
  const add=(chain,shape)=>chain.forEach((r,i)=>{ const [key,n,rank,c,eye,sc,d,opt]=r; const o=Object.assign({},shape,opt||{}); const [hp,atk]=BASE[rank];
    const m={n,k:o.k,rank,hp:Math.round(hp*(o.hpM||1)),atk:Math.round(atk*(o.atkM||1)),spd:o.spd||1.05,xp:Math.round(hp/3),bounty:Math.round(hp/8),beast:1,sc,d,evo:i+1};
    if(c) m.c=c; if(eye) m.eye=eye; for(const f of ['race','job','tint','ab']) if(o[f]) m[f]=o[f]; if(i>0) m.evolved=1;
    MON[key]=m; if(i<chain.length-1) EVO_NEXT[key]=chain[i+1][0]; });
  // ---- prajurit hewan baru ----
  const B=(job,ab)=>({k:'beastman',job,ab});
  add([['gajahPenjaga','Gajah Penjaga','C','#8a8a94','#1a1a1a',1.15,'Prajurit gajah bertombak berat.',B('gajah|spear|s|#5a3a2a','kulitTebal')],['gajahPerang','Gajah Perang','A','#6a6a74','#ffd040',1.35,'Satu injakannya meretakkan lantai.',B('gajah|spear|s|#7a1a1a','gempa')]]);
  add([['buayaGladiator','Buaya Gladiator','C','#4a7a3a','#ffd040',1.1,'Rahangnya lebih tajam dari pedangnya.',B('buaya|axe|g|#6a4a2a','haus')],['rajaBuaya','Raja Buaya Rawa','A','#2a5a2a','#ff3a3a',1.3,'Penguasa rawa di bawah kastil.',B('buaya|axe|g|#e3b75e','amarah')]]);
  add([['singaKsatria','Singa Ksatria','B','#d8a040','#1a1a1a',1.15,'Surainya bagai mahkota emas.',B('singa|katana|s|#a82a2a','wibawa')],['rajaSinga','Raja Singa','S','#e8b850','#ff3a3a',1.35,'Raungannya membuat petualang berlutut.',B('singa|katana|s|#e3b75e','raung')]]);
  add([['manusiaHiu','Manusia Hiu','C','#5a7a9a','#1a1a1a',1.1,'Berenang di lantai seperti di air.',B('hiu|spear|g|#2a4a6a','haus')],['hiuPanglima','Panglima Hiu','A','#3a5a7a','#ff3a3a',1.3,'Memimpin pasukan dari laut dalam.',B('hiu|spear|s|#1a2a4a','tajam')]]);
  add([['kambingIblis','Kambing Iblis','D','#3a2a2a','#ff3a3a',1,'Bertanduk melingkar dan haus jiwa.',B('kambing|staff|w|#3a0a1a','kutuk')],['baphomet','Baphomet','A','#1a0a0a','#ff3a3a',1.35,'Iblis bertanduk penguasa ritual.',B('kambing|staff|w|#5a0a2a','status_neraka')]]);
  add([['ayamPetarung','Ayam Petarung','E','#e8e0d0','#1a1a1a',1,'Taji di kakinya sangat tajam.',B('ayam|fist|g|#c83a2a','ganda')],['ayamJago','Ayam Jago Legendaris','C','#e8701a','#ffd040',1.15,'Kokoknya membangunkan seluruh kastil.',B('ayam|fist|g|#e3b75e','teriak')]]);
  add([['manusiaKelelawar','Manusia Kelelawar','D','#4a3a5a','#ff3a3a',1,'Tergantung di langit-langit menunggu mangsa.',B('kelelawar|fist|n|#2a1a3a','haus')],['bangsawanMalam','Bangsawan Malam','A','#2a1a3a','#ff1a1a',1.25,'Vampir bersayap yang anggun.',B('kelelawar|katana|w|#5a0a1a','status_darah')]]);
  add([['domba','Domba Penyihir','E','#f0f0e8','#1a1a1a',1,'Bulunya lembut, mantranya tidak.',B('domba|staff|w|#6a5aa8','tidur')],['dombaAgung','Domba Arkanis','C','#e8e0ff','#c060ff',1.15,'Menenun mimpi buruk dari bulunya.',B('domba|staff|w|#3a2a6a','status_mimpi')]]);
  add([['werewolf','Werewolf','C','#5a4a3a','#ffd040',1.15,'Manusia serigala yang mengamuk di malam hari.',{k:'werewolf',ab:'amarah'}],['werewolfAlfa','Werewolf Alfa','A','#3a3a3a','#ff3a3a',1.35,'Pemimpin kawanan manusia serigala.',{k:'werewolf',ab:'raung'}],['werewolfBulan','Werewolf Bulan Merah','S','#7a1a1a','#ffd040',1.5,'Hanya muncul saat bulan berdarah.',{k:'werewolf',ab:'semangat'}]]);
  add([['centaur','Centaur Pemanah','C','#8a5a3a','#1a1a1a',1.2,'Setengah kuda, setengah pemanah.',{k:'centaur',ab:'elang'}],['centaurPanglima','Panglima Centaur','A','#5a3a2a','#ffd040',1.4,'Panahnya tak pernah meleset.',{k:'centaur',ab:'tajam'}]]);
  add([['lamia','Lamia','C','#5a8a5a','#ffd040',1.15,'Tubuh ular, senyum yang memikat.',{k:'lamia',ab:'goda'}],['medusa','Medusa','A','#3a6a4a','#ff3aff',1.35,'Tatapannya mengubah lawan jadi batu.',{k:'lamia',ab:'status_batu'}],['ratuGorgon','Ratu Gorgon','S','#1a4a3a','#ffd040',1.55,'Ibu dari semua gorgon.',{k:'lamia',ab:'kutuk'}]]);
  add([['ubur','Ubur-ubur Hantu','E','#c8a0f0','#ffffff',1,'Melayang di udara lembap kastil.',{k:'ubur',ab:'status_petir'}],['uburRaja','Ubur-ubur Raksasa','C','#a070e0','#ffffff',1.3,'Tentakelnya menyetrum.',{k:'ubur',ab:'badai_petir'}]]);
  add([['tengkorakApi','Tengkorak Terbang','D','#e8e0c8','#ff6a1a',1,'Tengkorak berapi yang tertawa.',{k:'tengkorak',ab:'tembak_api'}],['tengkorakIblis','Tengkorak Iblis','B','#d8d0b8','#c060ff',1.25,'Api ungu dari neraka.',{k:'tengkorak',ab:'ledak_neraka'}]]);
  add([['lentera','Hantu Lentera','E','#e8c040','#ffe080',1,'Cahayanya menyesatkan petualang.',{k:'lentera',ab:'status_kabut'}],['lenteraJiwa','Lentera Jiwa','C','#40c8a0','#a0ffe0',1.2,'Menyimpan jiwa korban di dalamnya.',{k:'lentera',ab:'serapJiwa'}]]);
  add([['belalang','Belalang Sembah','D','#5ac83a','#1a1a1a',1,'Lengan sabitnya secepat kilat.',{k:'belalang',ab:'ganda'}],['belalangRaja','Belalang Pedang','B','#3a9a2a','#ff3a3a',1.25,'Ahli pedang dari dunia serangga.',{k:'belalang',ab:'tajam'}],['belalangKaisar','Kaisar Belalang','A','#2a6a1a','#ffd040',1.45,'Sabitnya membelah zirah.',{k:'belalang',ab:'status_baja'}]]);
  add([['siput','Siput Raksasa','F','#c89a6a','#1a1a1a',1,'Pelan, berlendir, keras kepala.',{k:'siput',ab:'kulitTebal',spd:.5}],['siputBaja','Siput Bercangkang Baja','D','#8a9aaa','#1a1a1a',1.25,'Cangkangnya tak bisa ditembus.',{k:'siput',ab:'kulitBaja',spd:.5}],['siputBenteng','Siput Benteng','B','#5a6a7a','#ffd040',1.5,'Benteng berjalan.',{k:'siput',ab:'perisai',spd:.5}]]);
  // ---- humanoid baru ----
  add([['ksatriaGoblin','Ksatria Goblin','D',null,null,1,'Goblin yang mencuri zirah ksatria.',{k:'hum',race:'goblin',job:'mHob',ab:'perisai'}],['jenderalGoblin','Jenderal Goblin','B',null,null,1.15,'Memimpin barisan goblin berzirah.',{k:'hum',race:'hobgoblin',job:'mOrcLord',ab:'teriak',tint:'#5a7a3a'}]]);
  add([['elfGelap','Pemanah Elf Gelap','C',null,null,1,'Elf yang dibuang ke jurang.',{k:'hum',race:'elf',job:'ratuPanah',ab:'elang',tint:'#3a2a5a'}],['elfGelapRatu','Ratu Elf Gelap','A',null,null,1.15,'Memerintah dari bayangan.',{k:'hum',race:'elf',job:'penyihirHitam',ab:'status_bayang',tint:'#2a1a4a'}]]);
  add([['vampirBangsawan','Vampir Bangsawan','B',null,null,1,'Minum anggur merah… atau bukan anggur.',{k:'hum',race:'manusia',job:'bangsawan',ab:'haus',tint:'#7a1a2a'}],['vampirLord','Vampir Lord','S',null,null,1.15,'Seribu tahun dan tak pernah kenyang.',{k:'hum',race:'manusia',job:'rajaIblis',ab:'status_darah',tint:'#5a0a1a'}]]);
  add([['dukunOrc','Dukun Orc','C',null,null,1,'Tengkorak di tongkatnya berbisik.',{k:'hum',race:'orc',job:'mGobShaman',ab:'sembuh'}],['nabiOrc','Nabi Perang Orc','A',null,null,1.2,'Ramalannya selalu tentang darah.',{k:'hum',race:'orc',job:'necromancer',ab:'teriak',tint:'#5a1a1a'}]]);
  add([['ksatriaKutukan','Ksatria Terkutuk','C',null,null,1,'Bersumpah melindungi kastil… selamanya.',{k:'hum',race:'zombie',job:'ksatria',ab:'tegar'}],['paladinJatuh','Paladin Jatuh','A',null,null,1.15,'Dulu suci, kini melayani kegelapan.',{k:'hum',race:'neraka',job:'paladin',ab:'tameng_suci',tint:'#3a1a3a'}]]);
})();
/* ---------- gambar kepala prajurit hewan baru & makhluk baru ---------- */
function drawBeastHead2(P,hd,fur,eye,c,dk,lt){
  const E=(x,y)=>P(x,y,1,1,eye);
  if(hd==='gajah'){ P(-6,-26,3,6,dk); P(3,-26,3,6,dk); P(3,-22,2,6,fur); P(4,-17,2,2,fur); P(2,-20,1,2,'#f0f0e0'); E(1,-24); return true; }
  if(hd==='buaya'){ P(0,-23,8,3,fur); P(1,-21,7,1,'#f0f0e0'); P(1,-21,1,1,fur); P(4,-21,1,1,fur); P(-1,-26,3,2,fur); E(0,-25); return true; }
  if(hd==='singa'){ P(-6,-28,12,11,'#a8682a'); P(-4,-25,8,7,fur); P(3,-22,3,2,lt); P(5,-22,1,1,'#1a1a1a'); E(1,-24); E(-2,-24); return true; }
  if(hd==='hiu'){ P(-1,-30,3,5,fur); P(3,-23,4,2,fur); P(2,-21,5,1,'#f0f0e0'); P(-4,-22,8,2,'#e8e8f0'); E(1,-24); return true; }
  if(hd==='kambing'){ P(-7,-27,3,2,'#c8b890'); P(-7,-25,1,2,'#c8b890'); P(4,-27,3,2,'#c8b890'); P(6,-25,1,2,'#c8b890'); P(3,-21,3,2,lt); P(0,-18,2,3,fur); E(1,-23); return true; }
  if(hd==='ayam'){ P(-1,-29,4,3,'#e83a2a'); P(4,-23,3,1,'#e8b030'); P(3,-21,2,2,'#e83a2a'); E(1,-24); return true; }
  if(hd==='kelelawar'){ P(-5,-30,2,5,fur); P(3,-30,2,5,fur); P(1,-21,4,1,'#f0f0e0'); P(1,-20,1,1,'#f0f0e0'); P(4,-20,1,1,'#f0f0e0'); E(-2,-24); E(2,-24); P(-9,-20,3,7,dk); P(6,-20,3,7,dk); return true; }
  if(hd==='domba'){ P(-6,-27,12,5,'#f8f8f0'); P(-6,-24,2,3,'#f8f8f0'); P(4,-24,2,3,'#f8f8f0'); P(-2,-23,5,4,'#3a3a3a'); P(-1,-22,1,1,'#ffffff'); P(2,-22,1,1,'#ffffff'); return true; }
  return false;
}
function drawJurangMon4(P,m,f){
  const k=m.k, c=m.c||'#888', eye=m.eye||'#1a1a1a', dk=shade(c,-.3), lt=shade(c,.25), b=f===1?-1:f===3?1:0, lg=f%2;
  const sh=w=>P(-w/2,0,w,1,'rgba(0,0,0,.25)');
  if(k==='werewolf'){ sh(12); P(-4,-10,3,10-lg,dk); P(1,-10,3,10,dk); P(-5,-1,4,1,'#2a1a14'); P(1,-1,4,1,'#2a1a14');
    P(-6,-22,12,12,c); P(-5,-21,10,1,lt); P(-3,-15,6,4,lt); P(-9,-21+b,3,10,c); P(6,-21-b,3,10,c); P(-10,-12+b,3,2,'#f0f0e0'); P(7,-12-b,3,2,'#f0f0e0');
    P(-4,-29,8,7,c); P(-4,-32,2,3,c); P(2,-32,2,3,c); P(3,-25,5,3,c); P(4,-23,4,1,'#f0f0e0'); P(7,-25,1,1,'#1a1a1a'); P(0,-27,1,1,eye); P(2,-27,1,1,eye); P(-8,-14,3,2,c); return; }
  if(k==='centaur'){ sh(20); const hc=c; P(-10,-14,15,7,hc); P(-9,-15,13,1,lt); P(-12,-14,3,6,dk); P(-9,-7,2,7-lg,dk); P(-5,-7,2,7,dk); P(0,-7,2,7-lg,dk); P(3,-7,2,7,dk);
    P(1,-24,6,10,'#e8c09a'); P(0,-24,8,2,'#5a3a1a'); P(1,-30,6,6,'#e8c09a'); P(1,-31,6,2,'#3a2a1a'); P(5,-28,1,1,eye); P(-1,-29,2,6,'#3a2a1a');
    P(8,-29,1,12,'#8a5a32'); P(7,-29,1,1,'#8a5a32'); P(7,-18,1,1,'#8a5a32'); P(6,-28,1,10,'#e8e0cc'); return; }
  if(k==='lamia'){ P(-9,0,18,1,'rgba(0,0,0,.25)'); P(-9,-4,14,4,c); P(-9,-4,14,1,lt); P(-11,-3,3,3,c); P(-12,-2,2,2,dk); for(let x=-8;x<4;x+=3) P(x,-2,1,1,dk);
    P(-2,-14,6,10,c); P(-2,-14,6,1,lt); P(-2,-21,6,8,'#e8d0c0'); P(-2,-21,6,1,'#c83a5a'); P(-2,-19,6,1,'#c83a5a');
    P(-2,-27,6,6,'#e8d0c0'); P(2,-25,1,1,eye); P(-4,-28,10,3,shade(c,-.1)); for(let i=0;i<4;i++) P(-5+i*3,-30+(i+f)%2,2,3,c); P(-4,-25,1,5,shade(c,-.1)); return; }
  if(k==='ubur'){ const y=-24+b*2; P(-3,0,6,1,'rgba(0,0,0,.18)'); P(-7,y,14,7,c); P(-6,y-2,12,2,c); P(-5,y-1,4,2,lt); P(-3,y+3,1,1,eye); P(2,y+3,1,1,eye);
    for(let i=0;i<5;i++){ const x=-6+i*3, l=6+((i+f)%3)*2; P(x,y+7,1,l,shade(c,.15)); } return; }
  if(k==='tengkorak'){ const y=-20+b*2; P(-3,0,6,1,'rgba(0,0,0,.18)'); for(let i=0;i<4;i++) P(-4+i*2+((f+i)%2),y-6-i%2*2,2,5,eye); P(-5,y-1,10,8,c); P(-4,y+7,8,2,c); P(-3,y+2,2,2,'#1a1a1a'); P(1,y+2,2,2,'#1a1a1a'); P(-3,y+2,1,1,eye); P(2,y+2,1,1,eye); P(0,y+5,1,1,'#1a1a1a'); P(-3,y+8,1,1,'#1a1a1a'); P(-1,y+8,1,1,'#1a1a1a'); P(1,y+8,1,1,'#1a1a1a'); return; }
  if(k==='lentera'){ const y=-22+b*2; P(-3,0,6,1,'rgba(0,0,0,.18)'); P(-1,y-4,2,3,'#3a3a3a'); P(-4,y-1,8,2,'#4a3a2a'); P(-4,y+1,8,9,c); P(-3,y+2,6,7,eye); P(-1,y+4,1,2,'#3a2a1a'); P(1,y+4,1,2,'#3a2a1a'); P(-1,y+7,3,1,'#3a2a1a'); P(-4,y+10,8,2,'#4a3a2a'); P(-6,y+3+((f%2)?1:0),2,1,'rgba(255,240,180,.5)'); return; }
  if(k==='belalang'){ sh(12); P(-8,-8,10,4,c); P(-9,-7,2,2,dk); P(1,-14,3,7,c); P(2,-18,4,4,c); P(5,-17,1,1,eye); P(3,-20,1,2,dk); P(5,-20,1,2,dk);
    P(4,-14,5,1,lt); P(8,-14,1,5,lt); P(9,-10,1,1,lt); P(3,-12+b,4,1,lt); P(6,-12+b,1,4,lt);
    for(const x of [-6,-3,0]) P(x,-4,1,4-((x+f)%2?1:0),dk); P(-8,-11,7,3,'rgba(200,255,180,.4)'); return; }
  if(k==='siput'){ sh(16); P(-9,-3,17,3,c); P(-9,-3,17,1,lt); P(5,-8,4,6,c); P(6,-12,1,4,c); P(8,-11,1,3,c); P(6,-13,1,1,eye); P(8,-12,1,1,eye);
    const s='#8a5a3a'; P(-8,-14,11,11,shade(c,-.15)); P(-7,-15,9,1,shade(c,-.15)); P(-6,-12,7,7,shade(c,.1)); P(-4,-10,3,3,shade(c,-.25)); P(-3,-9,1,1,shade(c,.2)); if(f%2) P(-10,-1,2,1,'rgba(200,230,255,.6)'); return; }
  return false;
}
