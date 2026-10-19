/* =====================================================================
   TAKHTA JURANG — monster bertema: gunung api, naga, alam, salju, gurun,
   cyber, bajak laut, natal, halloween, dan favorit Yang Mulia
   ===================================================================== */
(function(){
  // tiap baris rantai: [kunci, nama, peringkat, warna, mata, skala, deskripsi, opsi]
  // opsi: {k:bentuk, race, job, tint, ab}
  const S=(k,extra)=>Object.assign({k},extra||{});
  const BASE={F:[18,3],E:[30,5],D:[52,9],C:[115,14],B:[270,22],A:[500,35],S:[1150,60],SS:[2300,85],SSS:[6000,130]};
  const T=[
    // ---- gunung api ----
    [S('kura'),['kura','Kura-kura Gunung Api','C','#c84a1a','#ffd040',1,'Cangkangnya adalah gunung api kecil.'],['kuraVulkan','Kura Vulkanik','A','#ff5a1a','#ffd040',1.3,'Meletus saat marah.'],['kuraTitan','Kura Titan Lava','S','#ff2a0a','#fff2a0',1.6,'Pulau berjalan dari lava.']],
    [S('hum',{race:'golem',job:'mGolem',ab:'kulitBaja'}),['golemMagma','Golem Magma','B',null,null,1.15,'Batu cair yang berjalan.',{tint:'#ff5a1a'}],['golemInti','Golem Inti Bumi','A',null,null,1.35,'Jantungnya inti gunung api.',{tint:'#ff2a0a'}]],
    [S('imp'),['impApi','Imp Api','D','#ff4a1a','#ffe060',1,'Iblis kecil yang suka membakar.'],['iblisApi','Iblis Api','B','#c82a0a','#ffe060',1.3,'Tubuhnya diselimuti api neraka.']],
    [S('hound'),['anjingLava','Anjing Lava','C','#5a1a0a','#ffb040',1,'Napasnya membakar rumput.'],['anjingMagma','Anjing Magma','A','#3a0a04','#ff6a1a',1.3,'Gigitannya meleleh.']],
    // ---- naga ----
    [S('dragonW'),['bayiNaga','Bayi Naga','C','#c86a3a','#ffd040',.85,'Masih kecil, tapi sudah bisa menyembur.'],['nagaRemaja','Naga Remaja','A','#b84a2a','#ffd040',1.1,'Sayapnya mulai kuat.'],['nagaDewasa','Naga Dewasa','S','#9a2a1a','#ffd040',1.45,'Penguasa langit di atas kastil.'],['nagaPurba','Naga Purba','SS','#5a0a0a','#fff2a0',1.8,'Lebih tua dari kerajaan mana pun.']],
    [S('dragonW'),['nagaEs','Naga Es','S','#9ad8ff','#2a6aff',1.4,'Napasnya membekukan sungai.'],['nagaEsPurba','Naga Es Purba','SS','#d8f4ff','#2a6aff',1.75,'Musim dingin abadi mengikutinya.']],
    [S('dragonW'),['nagaPetir','Naga Petir','S','#e8d030','#ffffff',1.4,'Datang bersama badai.'],['nagaBadai','Naga Badai','SS','#a89a20','#ffffff',1.75,'Satu raungan, seribu petir.']],
    [S('dragonW'),['nagaTulang','Naga Tulang','A','#e8e0c8','#40ff80',1.3,'Naga mati yang dibangkitkan.'],['nagaTulangRaja','Raja Naga Tulang','S','#c8c0a8','#40ff80',1.6,'Tulang-tulangnya bersinar hijau.']],
    [S('dragonE'),['nagaEmas','Naga Emas','S','#e3b75e','#ffffff',1.4,'Menimbun harta di sarangnya.'],['nagaEmasAgung','Naga Emas Agung','SS','#ffd040','#ffffff',1.8,'Sisiknya bernilai satu kerajaan.']],
    [S('wyvern'),['wyvernRacun','Wyvern Racun','B','#6aa83a','#ff3a3a',1.1,'Ekornya meneteskan racun.'],['wyvernRacunRaja','Raja Wyvern Racun','A','#3a7a2a','#ff3a3a',1.35,'Rawa membusuk di bawah sayapnya.']],
    // ---- alam ----
    [S('bunga'),['bunga','Bunga Pemangsa','D','#e8506a','#1a1a1a',1,'Cantik, lalu menggigit.'],['bungaRaksasa','Bunga Raksasa','B','#c83a8a','#1a1a1a',1.3,'Menelan petualang utuh.'],['ratuBunga','Ratu Bunga','A','#a82aa8','#ffd040',1.5,'Seluruh taman menurut padanya.']],
    [S('bear'),['beruangLumut','Beruang Lumut','C','#4a7a3a','#ffd040',1.05,'Tubuhnya ditumbuhi lumut.'],['beruangPurbaHutan','Beruang Hutan Purba','A','#2a5a2a','#ffd040',1.45,'Penjaga hutan tertua.']],
    [S('rusa'),['rusa','Rusa Hutan Gaib','D','#a87a4a','#1a1a1a',1,'Tanduknya bercahaya di malam hari.'],['rusaRoh','Rusa Roh Hutan','B','#c8e8d8','#3affa0',1.2,'Separuh roh, separuh hewan.'],['rusaDewa','Rusa Dewa Hutan','S','#f8f8e8','#ffd040',1.45,'Konon dewa hutan sendiri.']],
    // ---- salju ----
    [S('snowman'),['snowman','Manusia Salju','E','#c83a3a','#1a1a1a',1,'Tersenyum terus, bahkan saat menyerang.'],['snowmanRaksasa','Manusia Salju Raksasa','C','#3a6ac8','#1a1a1a',1.3,'Lemparan bolanya sebesar batu.'],['rajaSalju','Raja Salju','A','#7a2aa8','#7fd8ff',1.55,'Memerintah badai salju.']],
    [S('penguin'),['penguin','Penguin Es','F','#2a2a3a','#1a1a1a',1,'Lucu dan licin.'],['penguinKaisar','Penguin Kaisar','C','#1a1a2a','#ffd040',1.35,'Memimpin pasukan penguin.']],
    [S('hum',{race:'golem',job:'mGolem',ab:'beku'}),['golemEs','Golem Es','B',null,null,1.15,'Tubuhnya es abadi.',{tint:'#a8e0ff'}],['golemGletser','Golem Gletser','A',null,null,1.35,'Sebesar gunung es.',{tint:'#e8f8ff'}]],
    // ---- gurun ----
    [S('kaktus'),['kaktus','Kaktus Berduri','E','#4a9a4a','#1a1a1a',1,'Durinya terbang ke mana-mana.'],['kaktusRaksasa','Kaktus Raksasa','C','#3a8a3a','#1a1a1a',1.3,'Menyimpan air dan dendam.'],['rajaKaktus','Raja Kaktus','B','#2a7a3a','#ff3a3a',1.5,'Mahkotanya berbunga merah.']],
    [S('hum',{race:'mumi',job:'mMummy',ab:'kutuk'}),['mumi','Mumi','D',null,null,1,'Terbungkus kain dan kutukan.'],['mumiBangsawan','Mumi Bangsawan','B',null,null,1.15,'Dulu bangsawan, kini penjaga makam.',{tint:'#e3b75e'}],['firaun','Firaun Mumi','S',null,null,1.35,'Raja padang pasir yang tak mau mati.',{tint:'#ffd040'}]],
    [S('kumbang'),['scarab','Kumbang Scarab','D','#d8a830','#1a1a1a',1,'Penjaga makam gurun.'],['scarabEmas','Scarab Emas','B','#ffd040','#3a1a1a',1.3,'Cangkangnya emas murni.']],
    // ---- cyber ----
    [S('drone'),['drone','Drone Pengintai','D','#5a6a7a','#3affff',1,'Mengawasi lorong dengan mata merah.'],['droneTempur','Drone Tempur','B','#3a4a5a','#ff3a3a',1.2,'Membawa senjata sinar.'],['droneInduk','Drone Induk','A','#2a3a4a','#ff3aff',1.5,'Melepas drone kecil terus-menerus.']],
    [S('robot'),['robot','Robot Penjaga','C','#8a9aaa','#3affff',1,'Mesin kuno yang masih bekerja.'],['robotPerang','Robot Perang','A','#5a6a7a','#ff3a3a',1.3,'Dibuat untuk satu tujuan: menghancurkan.'],['mechaTitan','Mecha Titan','S','#3a4a6a','#ffd040',1.6,'Raksasa logam dari zaman yang hilang.']],
    [S('hum',{race:'cyborg',job:'mCyborg',ab:'petir'}),['cyborg','Cyborg','B',null,null,1,'Separuh manusia, separuh mesin.'],['cyborgElite','Cyborg Elite','A',null,null,1.15,'Lebih banyak mesin daripada manusia.',{tint:'#3affff'}]],
    [S('wolf'),['serigalaCyber','Serigala Cyber','C','#3a5a7a','#3affff',1,'Cakarnya dari baja.'],['serigalaMecha','Serigala Mecha','A','#2a3a5a','#ff3aff',1.3,'Berburu dengan sensor panas.']],
    // ---- bajak laut ----
    [S('hum',{race:'skeleton',job:'mPirate',ab:'untung'}),['bajakTulang','Bajak Laut Tulang','D',null,null,1,'Masih mencari harta karunnya.'],['kaptenTulang','Kapten Tulang','B',null,null,1.15,'Kapten kapal hantu.',{tint:'#c8a040',job:'mPirateCap'}],['laksamanaHantu','Laksamana Hantu','A',null,null,1.3,'Memimpin armada orang mati.',{tint:'#7fd8ff',job:'mPirateCap'}]],
    [S('gagak'),['beo','Burung Beo','E','#3ac83a','#ffd040',1,'Suka meniru teriakan petualang.'],['beoBajak','Beo Bajak Laut','C','#e8402a','#ffd040',1.2,'Berteriak "harta karun!" terus-menerus.']],
    [S('kepiting'),['kepitingBajak','Kepiting Bajak Laut','D','#c83a2a','#1a1a1a',1,'Capitnya memegang pedang.'],['kepitingMeriam','Kepiting Meriam','B','#8a2a1a','#ffd040',1.3,'Cangkangnya dipasangi meriam.']],
    // ---- natal ----
    [S('hum',{race:'iblis',job:'mSantaGelap',ab:'panggil'}),['santaGelap','Santa Gelap','B',null,null,1.05,'Membawa karung berisi kutukan.'],['santaKegelapan','Santa Kegelapan','A',null,null,1.25,'Hadiahnya selalu meledak.',{tint:'#c81a2a'}]],
    [S('rusa'),['rusaKutub','Rusa Kutub Hidung Merah','D','#8a5a3a','#ff2020',1,'Hidungnya menyala di kegelapan.'],['rusaKutubTerbang','Rusa Kutub Terbang','B','#6a3a2a','#ff2020',1.25,'Menarik kereta luncur hantu.']],
    [S('mimic'),['kadoMimik','Kado Mimik','C','#c83a3a',null,1,'Kado yang menggigit balik.'],['kadoMimikRaksasa','Kado Mimik Raksasa','B','#2a8a3a',null,1.3,'Pita merahnya adalah lidah.']],
    // ---- halloween ----
    [S('labu'),['labu','Labu Hantu','E','#e87a1a','#ffe060',1,'Senyumnya menyala.'],['labuPenyihir','Labu Penyihir','C','#c85a0a','#7fff5a',1.2,'Merapal mantra dari dalam labu.'],['rajaLabu','Raja Labu','A','#a83a0a','#ff3aff',1.45,'Penguasa malam panen.']],
    // ---- favorit Yang Mulia ----
    [S('horseman',{ab:'raung'}),['headless','Headless Horseman','A','#2a2a2a','#7fff5a',1.15,'Ksatria tanpa kepala yang menunggang kuda hitam, membawa labu menyala.'],['headlessRaja','Ksatria Tanpa Kepala Agung','S','#1a0a1a','#ff6a1a',1.35,'Derap kudanya terdengar sebelum ia muncul.']],
    [S('hum',{race:'skeleton',job:'mHeroSkel',ab:'tebas'}),['heroSkel','Hero Skeleton','B',null,null,1.05,'Kerangka pahlawan yang masih memegang pedang sucinya.'],['heroSkelLegenda','Hero Skeleton Legendaris','S',null,null,1.25,'Pahlawan dari zaman dulu. Kini menjaga kastil Raja Iblis.',{tint:'#e3b75e'}]],
    [S('mudHand',{ab:'jaring'}),['mudHand','Hand Mud','D','#6a4a2a','#1a1a1a',1,'Tangan lumpur yang mencengkeram kaki petualang.'],['mudHandRaksasa','Tangan Lumpur Raksasa','B','#4a3a1a','#ff6a3a',1.35,'Menarik seluruh party ke dalam lumpur.']],
    [S('cryingDemon',{ab:'kutuk'}),['cryingDemon','Crying Demon','C','#5a2a4a','#ff3a6a',1,'Iblis yang terus menangis. Air matanya beracun.'],['iblisRatapan','Iblis Ratapan','A','#3a1a3a','#ff3a6a',1.25,'Ratapannya membuat petualang putus asa.'],['iblisAirMataDarah','Iblis Air Mata Darah','S','#2a0a14','#ff1a1a',1.45,'Setiap tetes air matanya adalah kutukan.']],
    [S('hum',{race:'orc',job:'mKicker',ab:'ganda'}),['kickerOrc','Kicker Orc','C',null,null,1,'Orc yang bertarung dengan tendangan beruntun.'],['kickerOrcJuara','Kicker Orc Juara','A',null,null,1.25,'Juara tendangan dari seluruh suku orc.',{tint:'#c82a2a'}]],
    [S('hedgehog',{ab:'duri'}),['hedgehog','Dunk Hedgehog','D','#5a6aa8','#1a1a1a',1,'Landak yang melompat dan men-dunk kepala petualang.'],['hedgehogSlam','Slam Dunk Hedgehog','B','#2a3a8a','#ff3a3a',1.25,'Lompatannya setinggi langit-langit.']],
  ];
  for(const row of T){
    const shape=row[0]; const chain=row.slice(1);
    chain.forEach((r,i)=>{ const [key,n,rank,c,eye,sc,d,opt]=r; const o=Object.assign({},shape,opt||{}); const [hp,atk]=BASE[rank];
      const m={n,k:o.k,rank,hp:Math.round(hp*(1+(rnd()-.5)*.15)),atk:Math.round(atk*(1+(rnd()-.5)*.15)),spd:o.k==='drone'||o.k==='horseman'?1.3:1,xp:Math.round(hp/3),bounty:Math.round(hp/8),beast:1,sc,d,evo:i+1};
      if(c) m.c=c; if(eye) m.eye=eye; if(o.race) m.race=o.race; if(o.job) m.job=o.job; if(o.tint) m.tint=o.tint; if(o.ab) m.ab=o.ab;
      if(i>0) m.evolved=1;
      MON[key]=m; if(i<chain.length-1) EVO_NEXT[key]=chain[i+1][0]; });
  }
})();
