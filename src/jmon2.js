/* =====================================================================
   TAKHTA JURANG — makhluk baru khusus kastil (16 bentuk + rantai evolusi)
   ===================================================================== */
(function(){
  // [kunci, nama, bentuk, warna, mata, peringkat, hp, atk, kecepatan, skala, deskripsi]
  const L=[
    [['jamur','Jamur Berjalan','jamur','#c84a4a','#2a1a1a','F',20,3,.6,1,'Jamur yang berjalan sambil menebar spora.'],
     ['jamurRaksasa','Jamur Raksasa','jamur','#a83a8a','#2a1a1a','D',55,8,.6,1.2,'Sporanya membuat petualang batuk-batuk.'],
     ['rajaJamur','Raja Jamur','jamur','#7a2aa8','#ffd040','B',270,20,.6,1.4,'Seluruh hutan jamur tunduk padanya.']],
    [['kodok','Kodok Rawa','kodok','#5a9a4a','#1a1a1a','E',30,5,1,1,'Lidahnya panjang dan lengket.'],
     ['kodokRacun','Kodok Racun Raksasa','kodok','#3aa87a','#ff3a3a','C',115,13,1,1.2,'Kulitnya meneteskan racun.'],
     ['rajaKodok','Raja Kodok','kodok','#2a6a3a','#ffd040','B',280,21,1,1.45,'Satu lompatannya mengguncang lantai.']],
    [['kepiting','Kepiting Batu','kepiting','#a86a4a','#1a1a1a','E',34,5,.7,1,'Capitnya bisa mematahkan tongkat.'],
     ['kepitingBaja','Kepiting Baja','kepiting','#7a8a9a','#1a1a1a','C',130,13,.7,1.2,'Cangkangnya memantulkan pedang.'],
     ['kepitingBenteng','Kepiting Benteng','kepiting','#4a5a6a','#ff8a3a','A',560,32,.7,1.45,'Sebesar gerbang kastil.']],
    [['ular','Ular Hutan','ular','#4a8a3a','#ffd040','E',28,6,1.1,1,'Melilit dan menggigit.'],
     ['piton','Ular Piton','ular','#8a7a3a','#ffd040','C',120,14,1.1,1.2,'Lilitannya mematahkan tulang.'],
     ['ularNaga','Ular Naga','ular','#2a6a5a','#ff4040','A',500,34,1.1,1.35,'Ular bersisik naga yang bisa menyembur.'],
     ['leviathan','Leviathan Darat','ular','#1a2a4a','#7fd8ff','S',1150,60,1.1,1.6,'Konon pernah menelan satu desa.']],
    [['gagak','Gagak Malam','gagak','#2a2a3a','#ff3a3a','F',16,4,1.6,1,'Pertanda buruk bagi petualang.'],
     ['gagakMaut','Gagak Maut','gagak','#1a0a2a','#c060ff','C',100,15,1.6,1.25,'Paruhnya mematuk jiwa.']],
    [['kalajengking','Kalajengking Gurun','kalajengking','#c8904a','#1a1a1a','D',50,9,.9,1,'Sengatnya beracun.'],
     ['kalaRaja','Kalajengking Raja','kalajengking','#8a3a2a','#ffd040','B',260,23,.9,1.3,'Ekornya sebesar tombak.'],
     ['kalaKaisar','Kaisar Kalajengking','kalajengking','#2a1a1a','#ff3030','S',1100,62,.9,1.55,'Penguasa pasir hitam.']],
    [['rubah','Rubah Ekor Dua','rubah','#e88a3a','#2a1a1a','D',48,8,1.3,1,'Licik dan suka menipu.'],
     ['rubahLima','Rubah Ekor Lima','rubah','#f0c060','#c03030','B',250,21,1.3,1.2,'Ilusinya membingungkan party.'],
     ['rubahSembilan','Rubah Ekor Sembilan','rubah','#fff0d0','#ff3a6a','S',1050,58,1.3,1.4,'Rubah suci yang menguasai api biru.']],
    [['tikus','Tikus Got','tikus','#7a6a6a','#ff3030','F',14,3,1.4,1,'Datang bergerombol.'],
     ['tikusRaksasa','Tikus Raksasa','tikus','#5a4a4a','#ff3030','D',58,9,1.4,1.35,'Sebesar anjing. Giginya tajam.']],
    [['kumbang','Kumbang Tanduk','kumbang','#3a5a2a','#1a1a1a','E',32,5,.8,1,'Tanduknya keras seperti besi.'],
     ['kumbangBaja','Kumbang Baja','kumbang','#5a6a7a','#1a1a1a','C',140,12,.8,1.2,'Cangkang baja berkilat.'],
     ['kumbangTitan','Kumbang Titan','kumbang','#2a2a4a','#ffd040','A',580,30,.8,1.5,'Bisa menyeruduk tembok sampai runtuh.']],
    [['boneka','Boneka Terkutuk','boneka','#8a3a5a','#1a1a1a','D',44,9,1,1,'Tersenyum terus. Membawa pisau.'],
     ['bonekaPembunuh','Boneka Pembunuh','boneka','#3a1a2a','#ff3030','B',230,25,1,1.15,'Tak pernah berhenti tertawa.']],
    [['mata','Mata Melayang','mata','#8a5a9a','#e83a3a','C',100,14,.7,1,'Satu tatapannya membuat lumpuh.'],
     ['mataSeribu','Mata Seribu','mata','#4a2a6a','#ffd040','A',470,36,.7,1.3,'Melihat semua yang bersembunyi.']],
    [['cacing','Cacing Pasir','cacing','#c8a070','#1a1a1a','D',60,9,.6,1,'Muncul dari bawah lantai.'],
     ['cacingRaksasa','Cacing Raksasa','cacing','#a87a4a','#1a1a1a','B',300,22,.6,1.3,'Menelan petualang bulat-bulat.'],
     ['penghancurGurun','Penghancur Gurun','cacing','#6a4a2a','#ff6a2a','S',1250,58,.6,1.6,'Gurun bergetar saat ia lewat.']],
    [['zirah','Zirah Hidup','zirah','#8a8a9a','#7fd8ff','D',62,9,.8,1,'Zirah kosong yang masih ingin bertarung.'],
     ['zirahHampa','Ksatria Zirah Hampa','zirah','#4a4a6a','#c060ff','B',290,22,.8,1.15,'Di dalamnya hanya ada kegelapan.'],
     ['jenderalZirah','Jenderal Zirah','zirah','#2a1a2a','#ff3040','A',540,35,.8,1.3,'Memimpin pasukan zirah kosong.']],
    [['peri','Peri Gelap','peri','#5a3a7a','#ff9ad0','E',24,6,1.4,1,'Kecil, jahil, dan berbahaya.'],
     ['periBayang','Peri Bayangan','peri','#2a1a4a','#ff9ad0','C',95,15,1.4,1.1,'Menghilang dalam bayangan.'],
     ['ratuPeri','Ratu Peri Gelap','peri','#1a0a2a','#ffd040','A',440,36,1.4,1.3,'Tawanya membuat petualang tersesat.']],
    [['kelinci','Kelinci Bertanduk','kelinci','#e8e0e0','#ff3030','F',18,4,1.5,1,'Lucu, sampai ia menyeruduk.'],
     ['kelinciPembantai','Kelinci Pembantai','kelinci','#f0f0f8','#ff1a1a','D',52,12,1.5,1.2,'Legenda di kalangan petualang pemula.']],
    [['gurita','Gurita Gua','gurita','#a84a6a','#ffd040','D',56,8,.7,1,'Tentakelnya menjerat dari kegelapan.'],
     ['guritaRaksasa','Gurita Raksasa','gurita','#6a2a4a','#ffd040','B',290,21,.7,1.4,'Delapan tentakel, delapan korban.']],
  ];
  for(const chain of L){
    chain.forEach((r,i)=>{ const [k,n,shape,c,eye,rank,hp,atk,spd,sc,d]=r;
      MON[k]={n,k:shape,c,eye,rank,hp,atk,spd,xp:Math.round(hp/3),bounty:Math.round(hp/8),beast:1,sc,d,evo:i+1};
      if(i>0) MON[k].evolved=1;
      if(i<chain.length-1) EVO_NEXT[k]=chain[i+1][0]; });
  }
})();
/* ---------- gambar makhluk baru ---------- */
function drawJurangMon(P,m,f){
  const k=m.k, c=m.c, eye=m.eye||'#1a1a1a', dk=shade(c,-.3), lt=shade(c,.25), b=f===1?-1:f===3?1:0;
  const sh=(w)=>P(-w/2,0,w,1,'rgba(0,0,0,.25)');
  if(k==='jamur'){ sh(10); P(-3,-8,6,8,'#e8dcc0'); P(-3,-8,6,1,'#c8bca0'); P(-8,-14+b,16,6,c); P(-6,-16+b,12,2,c); P(-7,-9+b,14,1,dk); P(-5,-13+b,2,2,'#fff4e8'); P(2,-14+b,2,2,'#fff4e8'); P(-1,-15+b,1,1,'#fff4e8'); P(-2,-6,1,2,eye); P(1,-6,1,2,eye); P(-3,-1,2,1,dk); P(1,-1,2,1,dk); return; }
  if(k==='kodok'){ const hop=f===2?-3:0; sh(14); P(-7,-8+hop,14,8,c); P(-5,-4+hop,10,3,lt); P(-6,-11+hop,4,4,c); P(2,-11+hop,4,4,c); P(-5,-10+hop,2,2,'#f8f0d8'); P(3,-10+hop,2,2,'#f8f0d8'); P(-4,-10+hop,1,1,eye); P(4,-10+hop,1,1,eye); P(-4,-5+hop,8,1,dk); P(-9,-2+hop,3,2,dk); P(6,-2+hop,3,2,dk); return; }
  if(k==='kepiting'){ sh(16); const cl=f%2; P(-7,-8,14,6,c); P(-6,-9,12,1,lt); P(-7,-3,14,1,dk); P(-3,-12,1,3,dk); P(2,-12,1,3,dk); P(-4,-13,2,2,'#f0f0e0'); P(2,-13,2,2,'#f0f0e0'); P(-4,-13,1,1,eye); P(3,-13,1,1,eye);
    P(-9,-9,2,3,dk); P(7,-9,2,3,dk); P(-13,-13-cl,5,4,c); P(-13,-13-cl,2,1,lt); P(8,-13-cl,5,4,c); P(11,-13-cl,2,1,lt); for(const x of [-6,-3,2,5]) P(x,-2,1,2,dk); return; }
  if(k==='ular'){ sh(14); P(-9,-4,14,4,c); P(-9,-4,14,1,lt); P(-7,-8,10,4,c); P(-7,-8,10,1,lt); for(let x=-8;x<4;x+=3) P(x,-3,1,2,dk); P(2,-13+b,6,5,c); P(3,-14+b,4,1,lt); P(1,-10,3,3,c); P(6,-12+b,1,1,eye); P(8,-10+b,2,1,'#e04050'); P(9,-11+b,1,1,'#e04050'); return; }
  if(k==='gagak'){ sh(8); P(-4,-12,8,7,c); P(2,-16,5,5,c); P(7,-14,3,1,'#c8a040'); P(4,-15,1,1,eye); P(-6,-12+b,5,4,dk); P(-7,-9,3,2,dk); P(-1,-5,1,5,'#3a3a3a'); P(1,-5,1,5,'#3a3a3a'); P(-2,0,2,1,'#3a3a3a'); P(1,0,2,1,'#3a3a3a'); return; }
  if(k==='kalajengking'){ sh(16); P(-7,-5,12,4,c); P(-7,-5,12,1,lt); P(-9,-8,3,3,c); P(-10,-12,3,4,c); P(-9,-15,4,3,c); P(-6,-16+b,2,2,'#e8e0a0'); P(5,-7,4,3,c); P(8,-9,3,2,dk); P(8,-6,3,1,dk); P(3,-4,1,1,eye); for(const x of [-6,-3,0,3]) P(x,-1,1,1,dk); return; }
  if(k==='rubah'){ sh(14); const lg=f%2; P(-7,-11,12,5,c); P(-6,-7,10,1,lt); P(4,-15,6,5,c); P(5,-17,2,2,c); P(8,-17,2,2,c); P(10,-12,2,2,lt); P(7,-14,1,1,eye); P(-12,-15+b,5,4,c); P(-12,-12+b,5,2,lt); P(-11,-18+b,4,3,c); P(-11,-18+b,2,1,lt);
    P(-6,-6,2,6-lg,dk); P(-2,-6,2,6,dk); P(2,-6,2,6-lg,dk); P(5,-6,2,6,dk); return; }
  if(k==='tikus'){ sh(9); P(-5,-6,9,5,c); P(-4,-7,7,1,lt); P(3,-7,4,4,c); P(4,-9,2,2,lt); P(5,-6,1,1,eye); P(7,-5,1,1,'#e89a9a'); P(-9,-3,4,1,'#c89a9a'); P(-3,-1,1,1,dk); P(1,-1,1,1,dk); return; }
  if(k==='kumbang'){ sh(13); P(-6,-9,12,7,c); P(-5,-10,10,1,c); P(-5,-9,4,2,lt); P(0,-9,1,7,dk); P(5,-8,3,4,dk); P(7,-12+b,2,4,lt); P(8,-13+b,2,1,lt); P(7,-7,1,1,eye); for(const x of [-4,-1,2]) P(x,-2,1,2,'#1a1a1a'); return; }
  if(k==='boneka'){ sh(8); P(-3,-18+b,6,6,'#f0e0d0'); P(-4,-19+b,8,3,c); P(-4,-17+b,1,4,c); P(3,-17+b,1,4,c); P(-2,-15+b,1,1,eye); P(1,-15+b,1,1,eye); P(-1,-13+b,3,1,'#a03040'); P(-4,-12,8,8,c); P(-4,-12,8,1,lt); P(-1,-10,1,1,'#f0e0d0'); P(-2,-4,1,4,'#e8dcc8'); P(1,-4,1,4,'#e8dcc8'); P(4,-11,1,6,'#c8c8d0'); P(4,-6,1,1,'#6a4a2a'); return; }
  if(k==='mata'){ P(-4,0,8,1,'rgba(0,0,0,.25)'); const y=-24+b; P(-6,y,12,12,c); P(-7,y+2,14,8,c); P(-5,y,10,1,lt); P(-6,y+11,12,1,dk); P(-4,y+3,8,6,'#f8f0f0'); P(-2,y+4,4,4,eye); P(-1,y+5,2,2,'#1a1a1a'); P(-6,y-3,1,3,dk); P(0,y-4,1,4,dk); P(5,y-3,1,3,dk); P(-7,y-4,2,2,c); P(-1,y-5,2,2,c); P(4,y-4,2,2,c); return; }
  if(k==='cacing'){ P(-8,-2,16,2,'#1a1014'); P(-9,-1,18,1,'rgba(0,0,0,.4)'); const w=f%2; P(-2,-8,6,6,c); P(-1+w,-13,6,6,c); P(-1,-13,1,6,dk); P(w,-18,6,6,c); P(-2,-8,6,1,dk); P(w+1,-20,4,2,'#a03040'); P(w+1,-20,1,1,'#fff'); P(w+4,-20,1,1,'#fff'); P(w+1,-16,1,1,eye); return; }
  if(k==='zirah'){ sh(10); P(-3,-25,6,6,c); P(-3,-25,6,1,lt); P(-2,-22,4,1,eye); P(-5,-19,10,10,c); P(-5,-19,10,1,lt); P(-1,-18,2,8,dk); P(-4,-9,3,9-(f%2),dk); P(1,-9,3,9,dk); P(6,-21,1,13,'#d8d8e0'); P(5,-9,3,1,'#8a6a3a'); P(-8,-18,3,9,dk); P(-8,-18,3,1,lt); return; }
  if(k==='peri'){ const y=b*2; P(-2,0,4,1,'rgba(0,0,0,.2)'); P(-7,-24+y,5,7,'rgba(220,200,255,.65)'); P(3,-24+y,5,7,'rgba(220,200,255,.65)'); P(-1,-19+y,3,6,c); P(-2,-23+y,4,4,'#f0d8e0'); P(-2,-24+y,4,2,dk); P(-1,-22+y,1,1,eye); P(1,-22+y,1,1,eye); P(-1,-13+y,1,3,'#f0d8e0'); P(1,-13+y,1,3,'#f0d8e0'); if(f%2) P(3,-14+y,1,1,eye); return; }
  if(k==='kelinci'){ const hop=f===2?-2:0; sh(9); P(-5,-7+hop,9,6,c); P(-4,-8+hop,6,1,lt); P(2,-10+hop,5,5,c); P(3,-15+hop,1,5,c); P(5,-15+hop,1,5,c); P(3,-14+hop,1,3,'#f0a0b0'); P(6,-12+hop,2,2,'#e8e0c8'); P(5,-9+hop,1,1,eye); P(-6,-6+hop,2,2,'#ffffff'); P(-3,-1,2,1,dk); P(1,-1,2,1,dk); return; }
  if(k==='gurita'){ sh(14); P(-6,-19,12,10,c); P(-5,-20,10,1,c); P(-5,-19,4,2,lt); P(-3,-15,2,2,'#fff'); P(1,-15,2,2,'#fff'); P(-2,-14,1,1,eye); P(2,-14,1,1,eye);
    for(let i=0;i<4;i++){ const x=-7+i*4, o=(i+f)%2; P(x,-9,2,8,c); P(x+(o?1:-1),-2,2,2,dk); } return; }
  return false;
}
