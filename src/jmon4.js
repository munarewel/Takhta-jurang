/* =====================================================================
   TAKHTA JURANG — prajurit hewan, Emperor Griffin, pemetaan gambar baru
   ===================================================================== */
(function(){
  const BASE={F:[18,3],E:[30,5],D:[52,9],C:[115,14],B:[270,22],A:[500,35],S:[1150,60],SS:[2300,85]};
  // [kunci, nama, peringkat, warna bulu, mata, skala, deskripsi, 'kepala|senjata|gaya|baju', ability]
  const BF=[
    [['ninjaRakun','Ninja Rakun','D','#7a6a5a','#1a1a1a',1,'Rakun ninja yang melempar shuriken dari bayangan.','rakun|shuriken|n|#2a2a3a','kedip'],['rakunBayangan','Rakun Ninja Bayangan','B','#5a4a3a','#c060ff',1.1,'Menghilang lalu muncul di belakang petualang.','rakun|katana|n|#1a1a2a','gesit'],['rakunAgung','Rakun Ninja Agung','A','#4a3a2a','#ff3a3a',1.25,'Grandmaster klan ninja rakun.','rakun|katana|n|#3a0a1a','ganda']],
    [['samuraiWolf','Samurai Wolf','C','#8a8a94','#ffd040',1,'Serigala samurai yang memegang teguh kehormatan.','serigala|katana|s|#a82a2a','tebas'],['serigalaRonin','Serigala Samurai Ronin','A','#5a5a64','#ffd040',1.15,'Pengembara tanpa tuan, sampai bertemu Raja Iblis.','serigala|katana|s|#2a2a5a','elang'],['shogunSerigala','Shogun Serigala','S','#e8e8f0','#ff3a3a',1.3,'Penguasa seluruh klan serigala samurai.','serigala|katana|s|#1a1a1a','tajam']],
    [['keraBiksu','Kera Biksu','D','#a8784a','#1a1a1a',1,'Bertarung dengan tongkat sakti.','kera|staff|m|#e88a2a','ganda'],['rajaKera','Raja Kera','B','#c88a3a','#ffd040',1.15,'Memimpin pasukan kera gunung.','kera|staff|m|#c82a2a','teriak'],['keraSakti','Kera Sakti','S','#e8b04a','#ffd040',1.35,'Tongkatnya bisa memanjang sampai langit.','kera|staff|m|#e3b75e','gempa']],
    [['kappa','Kappa','D','#5a9a4a','#1a1a1a',1,'Penghuni sungai yang suka bergulat.','kappa|spear|p|#3a6a8a','licin'],['kappaPendekar','Kappa Pendekar','B','#3a7a3a','#ffd040',1.15,'Tombaknya secepat arus sungai.','kappa|spear|s|#2a4a6a','serbu']],
    [['tengu','Tengu Gunung','C','#c83a2a','#ffd040',1,'Siluman gunung berhidung panjang.','tengu|staff|w|#2a2a3a','tornado'],['rajaTengu','Raja Tengu','A','#a82a1a','#ffd040',1.25,'Kipasnya menciptakan badai.','tengu|staff|w|#1a1a2a','tornado']],
    [['pandaKungfu','Panda Kungfu','C','#f4f4f0','#1a1a1a',1,'Gendut, lembut, dan sangat berbahaya.','panda|fist|m|#c83a2a','ganda'],['pandaGrandmaster','Panda Grandmaster','A','#f4f4f0','#1a1a1a',1.25,'Seribu jurus dalam satu tarikan napas.','panda|fist|m|#e3b75e','tegar']],
    [['beruangSumo','Beruang Sumo','C','#7a5a3a','#1a1a1a',1.1,'Dorongannya melempar petualang ke tembok.','beruang|fist|g|#e8e0d0','serbu'],['yokozunaBeruang','Yokozuna Beruang','A','#5a3a2a','#1a1a1a',1.35,'Juara sumo tak terkalahkan.','beruang|fist|g|#e3b75e','gempa']],
    [['kucingRonin','Kucing Ronin','D','#e8c090','#2a6a2a',1,'Kucing pengembara dengan pedang panjang.','kucing|katana|s|#3a3a6a','tajam'],['kucingBulan','Kucing Pedang Bulan','B','#c8c8d8','#7fd8ff',1.1,'Tebasannya berkilau seperti bulan sabit.','kucing|katana|s|#2a2a4a','elang'],['rajaKucingRonin','Raja Kucing Ronin','A','#2a2a2a','#ffd040',1.25,'Sembilan nyawa, satu pedang.','kucing|katana|s|#5a1a1a','tegar']],
    [['kodokNinja','Kodok Ninja','E','#5a9a4a','#1a1a1a',1,'Melompat dari langit-langit.','kodok|shuriken|n|#3a5a3a','gesit'],['kodokNinjaRacun','Kodok Ninja Racun','C','#3a7a5a','#ff3a3a',1.15,'Shurikennya diolesi racun kulitnya sendiri.','kodok|shuriken|n|#1a3a2a','racunKuat']],
    [['bantengGladiator','Banteng Gladiator','C','#8a5a2a','#ff3a3a',1.1,'Pejuang arena yang haus sorak-sorai.','banteng|axe|g|#a83a2a','serbu'],['bantengJuara','Banteng Juara Arena','A','#5a3a1a','#ff3a3a',1.3,'Belum pernah kalah di arena mana pun.','banteng|axe|g|#e3b75e','amarah']],
    [['kelinciPemanah','Kelinci Pemanah','E','#e8e0e0','#ff3a3a',1,'Telinganya mendengar langkah dari jauh.','kelinci|bow|p|#5a8a3a','elang'],['kelinciBulan','Kelinci Pemanah Bulan','C','#f8f8ff','#7fd8ff',1.1,'Panahnya berpendar seperti cahaya bulan.','kelinci|bow|p|#3a4a8a','tajam']],
    [['hantuPenyihir','Burung Hantu Penyihir','D','#7a5a3a','#1a1a1a',1,'Membaca mantra sepanjang malam.','burunghantu|staff|w|#4a3a7a','tidur'],['hantuArkanis','Burung Hantu Arkanis','B','#5a4a3a','#c060ff',1.1,'Menguasai sihir kuno.','burunghantu|staff|w|#2a1a5a','meteor'],['sageHantu','Sage Burung Hantu','A','#e8e0d0','#ffd040',1.25,'Tahu semua rahasia kastil.','burunghantu|staff|w|#e3b75e','perisai']],
    [['babiBarbar','Babi Barbar','D','#a87a6a','#1a1a1a',1,'Mengayunkan kapak sambil menguik.','babi|axe|g|#6a4a2a','amarah'],['kepalaSukuBabi','Kepala Suku Babi','B','#8a5a4a','#ff3a3a',1.25,'Memimpin suku babi hutan.','babi|axe|g|#a83a2a','teriak']],
    [['rubahPenyihir','Rubah Penyihir','D','#e88a3a','#2a1a1a',1,'Ilusinya membuat party saling serang.','rubah|staff|w|#a83a5a','goda'],['rubahPenyihirAgung','Rubah Penyihir Agung','B','#f0c060','#c03030',1.15,'Ekornya menyala api rubah.','rubah|staff|w|#5a1a3a','meteor']],
  ];
  for(const chain of BF){ chain.forEach((r,i)=>{ const [key,n,rank,c,eye,sc,d,job,ab]=r; const [hp,atk]=BASE[rank];
    MON[key]={n,k:'beastman',c,eye,job,rank,hp:Math.round(hp*1.05),atk:Math.round(atk*1.1),spd:1.15,xp:Math.round(hp/3),bounty:Math.round(hp/8),beast:1,sc,d,ab,evo:i+1}; if(i>0) MON[key].evolved=1; if(i<chain.length-1) EVO_NEXT[key]=chain[i+1][0]; }); }
  // Emperor Griffin sebagai puncak jalur griffin
  MON.emperorGriffin={n:'Emperor Griffin',k:'griffinK',c:'#f0d080',eye:'#ffd040',rank:'SS',hp:2300,atk:85,spd:1.2,xp:700,bounty:280,beast:1,sc:1.5,d:'Kaisar segala griffin. Sayapnya menutupi matahari.',evolved:1,ab:'tornado'};
  EVO_NEXT.griffinPerang='emperorGriffin';
  // pemetaan ke gambar baru
  const GOLEM_C={golem:['#8a8a84','#5ae0ff'],golemBesi:['#7a8a9a','#7fd8ff'],golemMithril:['#c8e8ff','#ffffff'],golemMagma:['#4a2a1e','#ff6a1a',1],golemInti:['#3a1a10','#ffb040',1],golemEs:['#a8e0ff','#ffffff'],golemGletser:['#e0f4ff','#7fd8ff']};
  for(const k in MON){ const m=MON[k];
    if(m.k==='dragonW') m.k='dragon2';
    else if(m.k==='dragonE') m.k='dragonE2';
    else if(m.k==='hum'&&m.race==='golem'){ const g=GOLEM_C[k]||[m.tint||'#8a8a84','#5ae0ff']; m.k='golemX'; m.c=g[0]; m.eye=g[1]; if(g[2]) m.king=1; delete m.tint; }
  }
})();
