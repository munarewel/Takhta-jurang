/* =====================================================================
   TAKHTA JURANG — job petualang tambahan
   ===================================================================== */
Object.assign(JOBS,{
  aeromancer:{n:'Aeromancer',spr:'penyihirAngin',hp:36,atk:9,def:2,eva:.08,rng:50,grow:[5,1.8,.4],skill:{n:'Tornado Kecil',cd:9,k:'aoe',m:1.5},front:0,magic:1},
  geomancer:{n:'Geomancer',spr:'penyihirTanah',hp:44,atk:9,def:5,eva:.04,rng:46,grow:[7,1.7,.7],skill:{n:'Tombak Batu',cd:8,k:'pierce',m:1.8},front:0,magic:1},
  enchanter:{n:'Enchanter',spr:'enchanter',hp:38,atk:6,def:3,eva:.06,rng:42,grow:[6,1,.5],skill:{n:'Senjata Bercahaya',cd:12,k:'buff'},front:0,magic:1},
  runeKnight:{n:'Rune Knight',spr:'highEnchanter',hp:62,atk:10,def:8,eva:.04,rng:16,grow:[9,1.6,1.1],skill:{n:'Pedang Rune',cd:8,k:'crit',m:2},front:3,magic:1},
  beastmaster:{n:'Beastmaster',spr:'beastTamer',hp:50,atk:8,def:4,eva:.08,rng:20,grow:[7,1.5,.6],skill:{n:'Serbuan Kawanan',cd:9,k:'multi',hits:4,m:.7},front:2},
  saint:{n:'Saint',spr:'santa',hp:44,atk:5,def:4,eva:.05,rng:46,grow:[7,.8,.7],skill:{n:'Mukjizat',cd:12,k:'heal',m:.6},front:0,magic:1,rare:1},
  hero:{n:'Hero',spr:'pahlawan',hp:72,atk:12,def:8,eva:.08,rng:16,grow:[11,2.1,1.1],skill:{n:'Tebasan Pahlawan',cd:8,k:'aoe',m:2},front:3,rare:1},
  weaponMaster:{n:'Weapon Master',spr:'weaponMaster',hp:62,atk:11,def:6,eva:.08,rng:16,grow:[9,1.9,.9],skill:{n:'Seribu Senjata',cd:9,k:'multi',hits:5,m:.6},front:2},
  duelist:{n:'Duelist',spr:'bangsawan',hp:48,atk:10,def:4,eva:.16,rng:16,grow:[7,1.8,.6],skill:{n:'Tusukan Anggun',cd:6,k:'crit',m:2.2},front:2},
  miner:{n:'Miner',spr:'penambang',hp:56,atk:8,def:6,eva:.03,rng:16,grow:[8,1.4,.9],skill:{n:'Hantaman Beliung',cd:7,k:'pierce',m:1.6},front:2,scout:1},
  cook:{n:'Cook',spr:'juruMasak',hp:50,atk:6,def:4,eva:.05,rng:14,grow:[8,1.1,.6],skill:{n:'Sup Hangat',cd:10,k:'heal',m:.3},front:1},
  farmer:{n:'Farmer',spr:'petani',hp:46,atk:7,def:3,eva:.05,rng:16,grow:[7,1.3,.5],skill:{n:'Ayunan Cangkul',cd:7,k:'crit',m:1.8},front:2},
  monsterHunter:{n:'Monster Hunter',spr:'hunterHV',hp:58,atk:10,def:6,eva:.08,rng:16,grow:[8,1.8,.8],skill:{n:'Tebasan Pemburu',cd:8,k:'snipe',m:2.4},front:2,scout:1},
  tamer:{n:'Tamer',spr:'tamerHV',hp:46,atk:8,def:4,eva:.08,rng:24,grow:[7,1.5,.6],skill:{n:'Panggil Tunggangan',cd:10,k:'multi',hits:3,m:.9},front:1},
});
for(const k of Object.keys(JOBS)) if(!JOB_KEYS.includes(k)) JOB_KEYS.push(k);
Object.assign(JOB_LINES,{
  aeromancer:['Angin berpihak padaku.','Rambutku berantakan lagi…'],geomancer:['Batu-batu di sini berbicara padaku.','Tanahnya rapuh. Hati-hati.'],
  enchanter:['Senjata kalian kubuat bersinar!','Satu mantra kecil untuk keberuntungan.'],runeKnight:['Rune di pedangku menyala!','Sihir dan baja, satu tujuan.'],
  beastmaster:['Kawananku lapar.','Monster di sini bisa kujinakkan?'],saint:['Semoga semua pulang dengan selamat.','Cahaya tak pernah padam.'],
  hero:['Aku datang untuk mengakhiri ini.','Takdir membawaku ke singgasanamu.'],weaponMaster:['Senjata apa pun, aku kuasai.','Pilih senjatamu, monster.'],
  duelist:['En garde!','Satu lawan satu, kalau berani.'],miner:['Dinding ini… ada bijihnya!','Lorong ini mirip tambang lamaku.'],
  cook:['Bekal sudah siap!','Monster di sini… bisa dimasak?'],farmer:['Aku cuma mau beli sapi baru…','Cangkulku cukup tajam, kok.'],
  monsterHunter:['Aku memburu monster sejak kecil.','Kepala Raja Iblis, trofi berikutnya.'],tamer:['Tungganganku menunggu di luar.','Jangan takut, aku tidak akan menyakitimu… mungkin.'],
});
Object.assign(JOB_EL,{aeromancer:['angin'],geomancer:['tanah','batu'],enchanter:['kristal','cahaya'],runeKnight:['petir','kristal'],saint:['suci','cahaya'],hero:['cahaya','suci'],miner:['tanah']});
Object.assign(JOB_GEAR,{aeromancer:[['Tongkat Angin'],['Jubah Badai'],['Bulu Elang']],geomancer:[['Tongkat Batu'],['Jubah Bumi'],['Batu Bertuah']],enchanter:[['Tongkat Rune'],['Jubah Enchanter'],['Cincin Rune']],
  runeKnight:[['Pedang Rune'],['Zirah Rune'],['Lambang Rune']],beastmaster:[['Cambuk Pawang'],['Rompi Kulit'],['Peluit Binatang']],saint:[['Tongkat Suci'],['Jubah Saint'],['Halo Kecil']],
  hero:[['Pedang Pahlawan'],['Zirah Pahlawan'],['Lambang Pahlawan']],weaponMaster:[['Pedang Master','Tombak Master'],['Zirah Master Senjata'],['Sabuk Senjata']],duelist:[['Rapier'],['Kemeja Bangsawan'],['Sarung Tangan Putih']],
  miner:[['Beliung'],['Helm Tambang'],['Lampu Tambang']],cook:[['Pisau Dapur','Panci Besi'],['Celemek Koki'],['Topi Koki']],farmer:[['Cangkul'],['Baju Petani'],['Topi Jerami']],
  monsterHunter:[['Pedang Pemburu Monster'],['Zirah Kulit Monster'],['Trofi Taring']],tamer:[['Cambuk Tamer'],['Pelana Kecil'],['Peluit Tamer']]});
