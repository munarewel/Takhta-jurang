'use strict';
/* =====================================================================
   DATA DUNIA
   ===================================================================== */
const TS = 8;                 // piksel per tile
const MW = 260, MH = 180;     // ukuran peta (tile)
const DAY = 300;              // langkah simulasi per hari
const YEAR_DAYS = 8;          // hari per tahun (2 hari per musim)
const YEAR = DAY * YEAR_DAYS;
const SEASONS = ['Semi','Panas','Gugur','Dingin'];

const T = {DEEP:0,WATER:1,SAND:2,GRASS:3,FOREST:4,DESERT:5,HILLS:6,MOUNT:7,SNOW:8};
const TNAME = ['Laut Dalam','Laut','Pantai','Padang Rumput','Hutan','Gurun','Perbukitan','Pegunungan','Puncak Salju'];

let _seed = 1;
function srand(s){ _seed = (s % 2147483646) + 1; }
function rnd(){ _seed = (_seed * 16807) % 2147483647; return (_seed - 1) / 2147483646; }
const ri = (a,b) => a + Math.floor(rnd()*(b-a+1));
const pick = a => a[Math.floor(rnd()*a.length)];
const clamp = (v,a,b) => v<a?a:v>b?b:v;
const dist = (ax,ay,bx,by) => Math.hypot(ax-bx, ay-by);
function wpick(items, wf){ let s=0; for(const it of items) s+=wf(it); let r=rnd()*s; for(const it of items){ r-=wf(it); if(r<=0) return it; } return items[items.length-1]; }

/* ---------- Ras ---------- */
const RACE = {
  manusia:{nama:'Manusia',life:[60,80],adult:18,fert:[17,45],fertP:1.0,mourn:1,leg:5,tor:6,tw:6,home:[T.GRASS,T.SAND],build:'manusia',
    skin:['#f6d5b8','#f1c9a5','#e8b890','#e0ac80','#d09868','#c68a5e','#a8704a','#8d5a3a','#6a4028'],hair:['#4a3020','#1f1a1c','#d9b45a','#a8452c','#6a4a2a','#e8d8a8','#8a5a3a','#3a2a2a','#c86a3a'],eye:['#2a1e2a','#3a5a8a','#4a6a3a','#5a3a20'],
    syl:[['Al','Bran','Cel','Dar','Ed','Fen','Gar','Hal','Ior','Lu','Mar','Ro','Ser','Tom','Wil','Ar','Kael','Jor','Ben','Os'],['ric','den','an','mund','win','ard','ias','o','eth','ius','en','dric','mar','nor']],
    fsyl:['a','ia','ena','ine','elle','ora','is','eth','wyn','ara'],marga:['Ashford','Brennan','Calloway','Durand','Everhart','Fairbanks','Holloway','Ironwood','Langley','Merrow','Stoneby','Thornfield','Whitlock','Rowan','Hale'],kpre:'Kerajaan'},
  elf:{nama:'Elf',life:[400,600],adult:40,fert:[40,350],fertP:.3,mourn:30,leg:6,tor:6,tw:6,home:[T.FOREST],build:'elf',
    skin:['#f6dcc6','#efd6bd','#e4c9a6','#d8b896','#c8a07a'],hair:['#e8e6f0','#e9d48a','#a8d8b8','#c9b8e8','#f0e0c0','#8ab8d8','#d8a8b8'],eye:['#3f7a4f','#4a7aa8','#7a5aa8','#a88a3a'],
    syl:[['Ae','Ela','Fae','Gal','Il','Lae','Mir','Nae','Syl','Tha','Ylv','Ere','Cael','Thra'],['rindel','wen','thil','las','niel','riel','dor','anor','ith','andir']],
    fsyl:['iel','wen','ara','ith','ielle','anna','ira'],marga:['Silverleaf','Moonwhisper','Dawnstrider','Starbrook','Windsong','Ashenvale','Lightbloom','Mistral'],kpre:'Hutan Suci'},
  dwarf:{nama:'Dwarf',life:[200,280],adult:30,fert:[30,160],fertP:.5,mourn:10,leg:3,tor:6,tw:8,home:[T.HILLS,T.MOUNT,T.GRASS],build:'dwarf',
    skin:['#f0c8a0','#e8b48e','#d39b74','#b97c58','#9a6040'],hair:['#b8562c','#6a3f22','#2a2020','#d08a3a','#8a8a8a','#e8c070'],eye:['#2a1e2a','#4a3a2a','#3a5a6a'],
    syl:[['Bal','Dur','Gim','Kil','Thor','Bor','Grun','Dvar','Ham','Brom','Oin','Rur'],['in','grim','dak','rik','gar','li','mund','bek','dur','nar']],
    fsyl:['a','ra','hild','dis','na','ga'],marga:['Ironfoot','Stonehelm','Deepdelver','Anvilbrow','Goldbeard','Copperkettle','Flintheart','Hammerfall'],kpre:'Benteng'},
  beastkin:{nama:'Beastkin',life:[45,60],adult:14,fert:[14,38],fertP:1.4,mourn:1,leg:5,tor:6,tw:6,home:[T.GRASS,T.DESERT],build:'beastkin',
    skin:['#f0c49a','#d9a575','#b88050','#f4d8bc','#8a5a3a'],hair:['#d97a2c','#8a8a94','#2a2424','#efe6d6','#b88a50','#5a3a2a','#e0b060'],eye:['#6a4a10','#3a7a3a','#c8a020','#4a6aa8'],
    syl:[['Ra','Kai','Ruu','Fang','Shi','Tora','Wol','Lyn','Mau','Hiro','Kuro','Sen'],['ka','ro','na','mi','ga','ra','ku','ya','zu','to']],
    fsyl:['mi','na','ri','ko','ya','ne'],marga:['Clawmane','Swiftpaw','Fangridge','Duskpelt','Ambertail','Stormhowl'],kpre:'Suku'},
  iblis:{nama:'Iblis',life:[250,350],adult:25,fert:[25,200],fertP:.3,mourn:5,leg:6,tor:6,tw:6,home:[T.DESERT,T.HILLS,T.MOUNT],build:'iblis',
    skin:['#b9a3c9','#9c86b8','#c47070','#8f95a8','#a85a5a','#7a8aa0','#c8b8d0'],hair:['#1c141c','#8a1f2e','#e8e2ec','#5a2a7a','#2a3a5a','#c8304a'],eye:['#ff4d4d','#ffb020','#c04dff'],
    syl:[['Az','Bel','Mal','Zar','Vex','Mor','Ksa','Nyx','Bael','Shax','Lil'],['goth','zeth','phas','kar','ros','mon','varr','iel','oth']],
    fsyl:['ith','ara','esse','yra','ia'],marga:['Duskthorn','Ashveil','Nightbane','Emberscar','Voidmere','Grimhollow'],kpre:'Kekaisaran'},
  halfelf:{nama:'Half-Elf',life:[130,170],adult:20,fert:[18,110],fertP:.5,mourn:5,leg:5,tor:6,tw:6,home:[T.GRASS,T.FOREST],build:'manusia',
    skin:['#f3d2b4','#e8c09e','#d8a983','#c08a60'],hair:['#c9a86a','#6a4a2a','#d8d4e0','#a86a3a','#e0d0a0'],eye:['#3f6a5a','#4a6a8a','#6a5a3a'],
    syl:[['Ar','Sae','Lin','Ver','Cae','Ian','Thal','Mae'],['len','dor','ric','wyn','ren','is','las']],fsyl:['lin','wen','ara','iel'],marga:[],kpre:'Kerajaan'},
};
const PLAY_RACES = ['manusia','elf','dwarf','beastkin','iblis'];
const KCOLS = ['#d0503f','#3f8fd8','#e0b040','#4fb86a','#a85fd8','#e07fb4','#3fc8c8','#e0803f'];

/* ---------- Berkat ---------- */
// [nama, peran, sprite pekerjaan]
const BERKAT_TIERS = {
 1:[['Petani','tani','petani'],['Peternak','ternak','peternak'],['Penggembala','ternak','penggembala'],['Pemancing','ikan','pemancing'],['Penebang','kayu','penebang'],['Penambang','batu','penambang'],
    ['Penempa','tempa','penempa'],['Tukang Kayu','bangun','tukangKayu'],['Tukang Batu','bangun','tukangBatu'],['Penjahit','kriya','penjahit'],['Penenun','kriya','penjahit'],['Penyamak Kulit','kriya','pengrajin'],
    ['Tukang Tembikar','kriya','pengrajin'],['Juru Masak','masak','juruMasak'],['Pembuat Roti','masak','juruMasak'],['Penyeduh Bir','masak','juruMasak'],['Pemburu','buru','pemburu'],['Penjebak','buru','pemburu'],
    ['Pemetik Herbal','tabib','tabib'],['Tabib Desa','tabib','tabib'],['Bidan','tabib','tabib'],['Peternak Lebah','ternak','peternak'],['Tukang Kebun','tani','petani'],['Pedagang','dagang','pedagang'],
    ['Kurir','kurir','kurir'],['Kusir','kurir','kurir'],['Pelaut','ikan','pemancing'],['Penunggang Kuda','kurir','kurir'],['Juru Tulis','tulis','juruTulis'],['Penyanyi Kedai','hibur','bard'],
    ['Penari','hibur','bard'],['Pandai Perak','tempa','penempa'],['Tukang Kunci','kriya','pengrajin'],['Penjaga Gudang','tulis','juruTulis'],['Pembuat Kapal','kriya','tukangKayu'],['Pembuat Kereta','kriya','tukangKayu'],['Penambang Garam','batu','penambang'],['Pembuat Lilin','kriya','pengrajin'],['Pembuat Panah','kriya','pemburu']],
 2:[['Ksatria','prajurit','ksatria'],['Pendekar Pedang','prajurit','pendekar'],['Pendekar Tombak','prajurit','pendekarTombak'],['Pendekar Kapak','prajurit','pendekarKapak'],['Prajurit Perisai','prajurit','ksatria'],
    ['Pemanah','pemanah','pemanah'],['Kavaleri','prajurit','kavaleri'],['Petarung','prajurit','petarung'],['Pengintai','pemanah','pemanah'],['Pencuri Bayangan','pencuri','pencuri'],['Penyihir','penyihir','penyihir'],
    ['Penyihir Api','penyihir','penyihirApi'],['Penyihir Air','penyihir','penyihirAir'],['Penyihir Angin','penyihir','penyihirAngin'],['Penyihir Tanah','penyihir','penyihirTanah'],['Penyembuh','penyembuh','penyembuh'],
    ['Pendeta','pendeta','pendeta'],['Alkemis','kriya','alkemis'],['Bard','hibur','bard'],['Penjinak Hewan','buru','beastTamer'],['Peramal','pendeta','penyihir'],['Pemanggil Roh Kecil','penyihir','penyihir'],
    ['Pandai Besi Ahli','tempa','penempa'],['Saudagar Ulung','dagang','pedagang'],['Arsitek','bangun','tukangKayu']],
 3:[['Weapon Master','prajurit','weaponMaster'],['Beast Tamer','prajurit','beastTamer'],['Penempa Legendaris','tempa','penempaLegendaris'],['Penyihir Hitam','penyihir','penyihirHitam'],['Ksatria Pemanah','pemanah','ksatriaPemanah'],['Paladin','prajurit','paladin'],
    ['Assassin','pencuri','assassin'],['Druid','penyembuh','druid'],['Necromancer','penyihir','necromancer'],['Berserker','prajurit','berserker'],['Santo Penyembuh','penyembuh','penyembuh'],['Penyihir Badai','penyihir','penyihirAngin'],
    ['Ksatria Rune','prajurit','ksatria'],['Ksatria Pegasus','prajurit','kavaleri'],['Alkemis Agung','kriya','alkemis'],['Pemanggil Golem','penyihir','alkemis'],['Bard Legendaris','hibur','bard'],['Ahli Strategi','tulis','juruTulis'],
    ['Penyihir Ilusi','penyihir','penyihir'],['Pemburu Monster','prajurit','pemburu'],['Penjinak Wyvern','prajurit','beastTamer']],
 4:[['Raja Pedang','prajurit','rajaPedang'],['Ratu Panah','pemanah','ratuPanah'],['Ksatria Naga','prajurit','ksatriaNaga'],['Santa','penyembuh','santa'],['Sage Agung','penyihir','sageAgung'],['Penguasa Sihir','penyihir','sageAgung'],
    ['Raja Tinju','prajurit','petarung'],['Dewa Tombak','prajurit','pendekarTombak'],['Ratu Es','penyihir','penyihirAir'],['Penguasa Badai','penyihir','sageAgung'],['Pemanggil Naga','penyihir','ksatriaNaga'],['Ksatria Suci','prajurit','paladin'],
    ['Empu Para Dewa','tempa','penempaLegendaris'],['Ratu Ilusi','penyihir','sageAgung']],
 5:[['Beastamer Sejati','prajurit','beastTamer'],['Pedang Suci','prajurit','pahlawan'],['Pemanggil Roh Agung','penyihir','sageAgung'],['Sage Abadi','penyihir','sageAgung'],['Penguasa Waktu','penyihir','sageAgung'],['Ratu Naga','prajurit','ksatriaNaga']],
};
const BERKAT = []; // daftar datar
for(const s of [1,2,3,4,5]) for(const [n,role,job] of BERKAT_TIERS[s]) BERKAT.push({n,s,role,job});
BERKAT.push({n:'Pahlawan',s:5,role:'prajurit',job:'pahlawan',uniq:1});
BERKAT.push({n:'Raja Iblis',s:5,role:'prajurit',job:'rajaIblis',uniq:1});
BERKAT.push({n:'Enchanter',s:2,role:'enchant',job:'enchanter'});
BERKAT.push({n:'High Enchanter',s:4,role:'enchant',job:'highEnchanter'});
BERKAT.push({n:'Alden the Summoner',s:5,role:'penyihir',job:'summoner'});
BERKAT.push({n:'Koki Istana',s:3,role:'masak',job:'kokiIstana'});
BERKAT.push({n:'Lidah Dewa',s:4,role:'masak',job:'kokiIstana'});
const BIDX = n => BERKAT.findIndex(b=>b.n===n);
const STAR_ODDS = [0,.62,.26,.09,.027,.003];
const COMBAT_ROLES = new Set(['prajurit','pemanah','penyihir','penyembuh','pencuri']);
const RANGED_ROLES = new Set(['pemanah','penyihir','penyembuh']);
const ROLE_LABEL = {enchant:'Meng-enchant',hunter:'Hunter',tamerhv:'Tamer',tani:'Bertani',ternak:'Beternak',ikan:'Memancing',kayu:'Menebang',batu:'Menambang',tempa:'Menempa',bangun:'Membangun',kriya:'Kerajinan',masak:'Memasak',buru:'Berburu',tabib:'Mengobati',dagang:'Berdagang',kurir:'Kurir',tulis:'Juru tulis',hibur:'Menghibur',prajurit:'Pejuang',pemanah:'Pemanah',penyihir:'Penyihir',penyembuh:'Penyembuh',pendeta:'Pendeta',pencuri:'Bayangan'};

/* ---------- Sifat ---------- */
const SIFAT = {
  'Pantang Menyerah':'Tidak pernah mundur. Sekali setahun bisa bertahan dari pukulan maut.',
  'Setia Abadi':'Hanya mencintai satu orang seumur hidup. Tidak menikah lagi setelah ditinggal.',
  'Romantis':'Mudah jatuh cinta dan rajin memberi perhatian.',
  'Penggoda':'Pandai merebut hati. Bila menjadi penguasa, bisa mengambil selir.',
  'Pemalu':'Sulit mendekati lawan jenis.',
  'Pemberani':'Suka bertarung dan cenderung menjadi petualang.',
  'Penakut':'Cepat kabur dari bahaya.',
  'Rajin':'Bekerja 30% lebih cepat.',
  'Pemalas':'Bekerja 30% lebih lambat.',
  'Pekerja Keras':'Bekerja lebih cepat dan jarang lelah.',
  'Dermawan':'Membagi uang kepada yang miskin.',
  'Serakah':'Menimbun uang. Sebagai penguasa menaikkan pajak.',
  'Hemat':'Jarang belanja, tabungan cepat bertambah.',
  'Boros':'Senang belanja dan berpesta.',
  'Jujur':'Tidak pernah mencuri. Sebagai penjaga lebih teliti.',
  'Licik':'Pandai menyelundup dan menyusup.',
  'Ramah':'Mudah berteman.',
  'Penyendiri':'Jarang bergaul.',
  'Pemarah':'Mudah bertengkar.',
  'Sabar':'Jarang marah, akrab dengan banyak orang.',
  'Cerdas':'Naik level 25% lebih cepat.',
  'Haus Ilmu':'Sering ke kuil dan guild untuk belajar.',
  'Ceroboh':'Lebih sering celaka.',
  'Ambisius':'Mengejar impian besar.',
  'Rendah Hati':'Disukai orang sekitar.',
  'Sombong':'Kurang disukai, tapi percaya diri.',
  'Religius':'Rajin berdoa. Doanya menenangkan para dewa.',
  'Jiwa Petualang':'Ingin menjelajah dunia.',
  'Rumahan':'Jarang meninggalkan kota.',
  'Penyayang Anak':'Ingin punya banyak anak.',
  'Pemabuk':'Menghabiskan uang di kedai guild.',
  'Optimis':'Selalu bahagia.',
  'Pesimis':'Mudah sedih.',
  'Tangguh':'Nyawa 30% lebih banyak.',
  'Lincah':'Bergerak lebih cepat.',
  'Kuat':'Serangan lebih keras.',
  'Panjang Umur':'Hidup lebih lama dari rata-rata rasnya.',
  'Rentan Sakit':'Lebih mudah jatuh sakit.',
  'Karismatik':'Pemimpin party alami, disukai banyak orang.',
  'Adil':'Sebagai penguasa memungut pajak rendah.',
  'Kejam':'Sebagai penguasa memungut pajak tinggi dan ditakuti.',
  'Bijak':'Keputusannya membuat rakyat sejahtera.',
  'Pencinta Alam':'Menjaga hutan dan hewan.',
  'Perfeksionis':'Hasil kerajinan lebih bermutu.',
  'Pendendam':'Tidak mudah melupakan permusuhan.',
  'Pemaaf':'Cepat berbaikan.',
  'Pengkhianat':'Bisa menjual rahasia kerajaan.',
  'Bergairah':'Sangat mesra dengan pasangannya, kadang tak menunggu malam. Lebih mudah tergoda.',
  'Stamina Kuat':'Tenaganya tak habis-habis. Kerja lebih tahan dan peluang punya anak lebih tinggi.',
};
const SIFAT_LIST = Object.keys(SIFAT);
const SIFAT_RARE = new Set(['Pengkhianat','Setia Abadi','Penggoda','Panjang Umur','Bergairah','Stamina Kuat']);
const SIFAT_CONFLICT = [['Pemberani','Penakut'],['Rajin','Pemalas'],['Hemat','Boros'],['Jujur','Licik'],['Ramah','Penyendiri'],['Optimis','Pesimis'],['Pemarah','Sabar'],['Rendah Hati','Sombong'],['Adil','Kejam'],['Jiwa Petualang','Rumahan'],['Pendendam','Pemaaf'],['Romantis','Pemalu'],['Setia Abadi','Bergairah'],['Tangguh','Rentan Sakit']];

/* ---------- Impian ---------- */
const IMPIAN = [
  {id:'nikah',n:'Menemukan cinta sejati'},
  {id:'anak3',n:'Punya tiga anak'},
  {id:'rumah',n:'Punya rumah sendiri'},
  {id:'kaya',n:'Mengumpulkan 500 emas'},
  {id:'rankS',n:'Menjadi petualang peringkat S'},
  {id:'rankB',n:'Menjadi petualang peringkat B'},
  {id:'ksatria',n:'Mengabdi sebagai penjaga kerajaan'},
  {id:'legenda',n:'Menempa senjata legendaris'},
  {id:'jelajah',n:'Melihat kerajaan lain'},
  {id:'tua',n:'Hidup sampai tua bersama keluarga'},
  {id:'monster',n:'Mengalahkan monster peringkat B'},
  {id:'raja',n:'Menjadi penguasa'},
  {id:'sahabat',n:'Punya sahabat sejati'},
  {id:'dungeon',n:'Menaklukkan lantai 5 dungeon'},
];

/* ---------- Hadiah ---------- */
const GIFTS = ['bunga liar','kalung kerang','pita sutra','roti madu','sisir perak','cincin tembaga','buku puisi','gelang batu giok','parfum herbal','ukiran kayu'];

/* ---------- Monster ---------- */
const MON = {
  // ---------- liar ----------
  slime:{n:'Slime',k:'slime',c:'#6ad06a',rank:'F',hp:18,atk:3,spd:.5,xp:6,bounty:2,beast:1,d:'Gumpalan lendir lemah.'},
  kelelawar:{n:'Kelelawar Gua',k:'bat',c:'#4a3a5a',rank:'F',hp:14,atk:3,spd:1.6,xp:5,bounty:2,beast:1,d:'Cepat dan menyebalkan.'},
  kobold:{n:'Kobold',k:'hum',race:'kobold',job:'mKobold',rank:'F',hp:18,atk:3,spd:1,xp:6,bounty:2,d:'Makhluk kecil bertombak, suka bergerombol.'},
  slimeAir:{n:'Slime Air',k:'slime',c:'#5aa8e8',rank:'E',hp:28,atk:5,spd:.5,xp:10,bounty:4,beast:1,d:'Slime berair yang lebih liat.'},
  babi:{n:'Babi Hutan',k:'boar',c:'#7a5a3a',rank:'E',hp:34,atk:6,spd:1.2,xp:11,bounty:4,beast:1,d:'Menyeruduk tanpa pikir panjang.'},
  wolf:{n:'Serigala',k:'wolf',c:'#8a8a94',rank:'E',hp:28,atk:5,spd:1.3,xp:12,bounty:5,beast:1,d:'Berburu dalam kawanan.'},
  goblin:{n:'Goblin',k:'hum',race:'goblin',job:'mGoblin',rank:'E',hp:30,atk:5,spd:.9,xp:12,bounty:5,d:'Licik dan rakus.'},
  zombie:{n:'Mayat Hidup',k:'hum',race:'zombie',job:'mZombie',rank:'E',hp:40,atk:5,spd:.5,xp:12,bounty:5,onHit:{k:'poison',p:.25},d:'Lambat, tapi gigitannya meracuni.'},
  slimeRacun:{n:'Slime Racun',k:'slime',c:'#a86ad0',rank:'D',hp:46,atk:7,spd:.5,xp:20,bounty:8,beast:1,onHit:{k:'poison',p:.35},d:'Sentuhannya meracuni.'},
  slimeApi:{n:'Slime Api',k:'slime',c:'#e85a4a',rank:'D',hp:46,atk:8,spd:.55,xp:20,bounty:8,beast:1,onHit:{k:'burn',p:.3},d:'Membakar apa pun yang disentuhnya.'},
  serigalaSalju:{n:'Serigala Salju',k:'wolf',c:'#e6e8f0',eye:'#5ad0ff',rank:'D',hp:50,atk:8,spd:1.4,xp:22,bounty:9,beast:1,onHit:{k:'slow',p:.3},d:'Gigitannya membekukan dan memperlambat.'},
  spider:{n:'Laba-laba Racun',k:'spider',c:'#5a3a6a',rank:'D',hp:45,atk:8,spd:1,xp:22,bounty:9,beast:1,onHit:{k:'poison',p:.35},d:'Racunnya menggerogoti perlahan.'},
  gobShaman:{n:'Dukun Goblin',k:'hum',race:'goblin',job:'mGobShaman',rank:'D',hp:38,atk:9,spd:.9,xp:24,bounty:10,ranged:46,shot:'#9aff5a',onHit:{k:'poison',p:.3},d:'Menembakkan sihir racun dari jauh.'},
  hob:{n:'Hobgoblin',k:'hum',race:'hobgoblin',job:'mHob',rank:'D',hp:60,atk:9,spd:.9,xp:25,bounty:10,d:'Goblin besar berperisai.'},
  skel:{n:'Kerangka Ksatria',k:'hum',race:'skeleton',job:'mSkel',rank:'D',hp:55,atk:11,spd:.8,xp:25,bounty:10,d:'Prajurit mati yang menolak beristirahat.'},
  shadowWolf:{n:'Serigala Bayangan',k:'wolf',c:'#2a2a38',eye:'#c04dff',rank:'C',hp:80,atk:12,spd:1.4,xp:45,bounty:20,beast:1,d:'Menyergap dari kegelapan.'},
  beruang:{n:'Beruang Cakar Besi',k:'bear',c:'#6a4a2a',rank:'C',hp:160,atk:16,spd:.9,xp:55,bounty:24,beast:1,skills:[{k:'cleave',r:16,dmg:.8,cd:90}],d:'Cakarannya menyapu beberapa orang sekaligus.'},
  lizard:{n:'Manusia Kadal',k:'hum',race:'lizard',job:'mLizard',rank:'C',hp:110,atk:14,spd:1,xp:48,bounty:22,d:'Prajurit rawa bersisik keras.'},
  orc:{n:'Orc',k:'hum',race:'orc',job:'mOrc',rank:'C',hp:110,atk:17,spd:.85,xp:50,bounty:22,d:'Kuat dan haus pertempuran.'},
  mimic:{n:'Mimik',k:'mimic',c:'#8a5a2a',rank:'C',hp:120,atk:18,spd:.6,xp:50,bounty:30,d:'Peti harta yang menggigit.'},
  orcLord:{n:'Panglima Orc',k:'hum',race:'orc',job:'mOrcLord',rank:'B',hp:260,atk:26,spd:.85,xp:120,bounty:55,skills:[{k:'cleave',r:18,dmg:.9,cd:70},{k:'roar',r:60,dur:120,cd:300}],d:'Teriakannya membuat lawan gentar dan kabur.'},
  troll:{n:'Troll',k:'hum',race:'troll',job:'mTroll',rank:'B',hp:260,atk:22,spd:.7,xp:115,bounty:52,regen:.03,d:'Luka di tubuhnya menutup sendiri.'},
  ogre:{n:'Ogre',k:'hum',race:'ogre',job:'mOgre',rank:'B',hp:220,atk:26,spd:.7,xp:110,bounty:50,skills:[{k:'cleave',r:16,dmg:.8,cd:80}],d:'Gadanya menghantam beberapa orang sekaligus.'},
  golem:{n:'Golem Batu',k:'hum',race:'golem',job:'mGolem',rank:'B',hp:300,atk:22,spd:.5,xp:120,bounty:55,armor:8,d:'Tubuh batunya sulit dilukai.'},
  rajaSlime:{n:'Raja Slime',k:'slime',c:'#c8a8f0',king:1,rank:'B',hp:280,atk:18,spd:.45,xp:110,bounty:50,beast:1,skills:[{k:'nova',r:26,dmg:.8,cd:110,self:1,fx:'#c8a8f0',debuff:'slow'}],d:'Hentakannya memercikkan lendir ke segala arah.'},
  minotaur:{n:'Minotaur',k:'hum',race:'minotaur',job:'mMino',rank:'A',hp:480,atk:38,spd:.9,xp:240,bounty:110,skills:[{k:'cleave',r:22,dmg:1.1,cd:60},{k:'roar',r:50,dur:100,cd:320}],d:'Penguasa labirin. Kapaknya membelah barisan.'},
  wyvern:{n:'Wyvern',k:'wyvern',c:'#5a8a5a',rank:'A',hp:420,atk:34,spd:1.2,xp:230,bounty:100,beast:1,skills:[{k:'breath',range:54,dmg:.9,cd:120,fx:'#ff8a3a',debuff:'burn'}],d:'Semburan apinya membakar barisan.'},
  nagaBayangan:{n:'Naga Bayangan',k:'wyvern',c:'#2a1a2a',eye:'#ff3050',rank:'S',hp:1100,atk:60,spd:1.1,xp:600,bounty:300,beast:1,armor:10,skills:[{k:'breath',range:64,dmg:1.1,cd:110,fx:'#8a3fd0',debuff:'curse'},{k:'roar',r:80,dur:160,cd:300}],d:'Naga tua dari inti dungeon.'},
  arwah:{n:'Arwah Penasaran',k:'ghost',c:'#c8d8f0',rank:'D',hp:55,atk:9,spd:.8,xp:30,bounty:14,onHit:{k:'curse',p:.35},d:'Jiwa yang jasadnya tak pernah dikuburkan. Sentuhannya mengutuk.'},
  // ---------- pasukan raja iblis ----------
  imp:{n:'Imp',k:'imp',c:'#c83a3a',rank:'D',hp:70,atk:12,spd:1.5,xp:40,bounty:20,demon:1,ranged:52,shot:'#ff8a3a',splash:12,onHit:{k:'burn',p:.4},d:'Melempar bola api yang meledak kecil.'},
  anjingNeraka:{n:'Anjing Neraka',k:'hound',c:'#3a1a1a',eye:'#ff8a3a',rank:'C',hp:170,atk:20,spd:1.5,xp:80,bounty:40,demon:1,onHit:{k:'burn',p:.35},skills:[{k:'breath',range:44,dmg:.8,cd:100,fx:'#ff6a2a',debuff:'burn'}],d:'Menyemburkan api neraka berbentuk kipas.'},
  succubus:{n:'Succubus',k:'hum',race:'succubus',job:'mSuccubus',rank:'B',hp:220,atk:18,spd:1.1,xp:140,bounty:70,demon:1,ranged:48,shot:'#ff4da0',drain:.4,skills:[{k:'charm',range:56,dur:130,cd:200}],d:'Memikat korbannya hingga terpaku, lalu menghisap nyawanya.'},
  gargoyle:{n:'Gargoyle',k:'wyvern',c:'#7a7a84',eye:'#ff4040',rank:'B',hp:340,atk:26,spd:1.2,xp:140,bounty:70,demon:1,armor:9,skills:[{k:'nova',range:40,r:20,dmg:1,cd:120,fx:'#b8b8c0',debuff:'slow'}],d:'Menukik dan menghantam tanah.'},
  ksatriaNeraka:{n:'Ksatria Neraka',k:'hum',race:'neraka',job:'mHellKnight',rank:'A',hp:650,atk:44,spd:.95,xp:300,bounty:150,demon:1,armor:10,skills:[{k:'cleave',r:24,dmg:1.1,cd:60,debuff:'burn'}],d:'Pedang apinya menyapu dan membakar semua di sekelilingnya.'},
  lichIblis:{n:'Lich Iblis',k:'hum',race:'skeleton',job:'mLich',rank:'A',hp:480,atk:36,spd:.8,xp:300,bounty:150,demon:1,ranged:60,shot:'#5ae08a',skills:[{k:'nova',range:60,r:30,dmg:1.15,cd:110,fx:'#5ae08a',debuff:'curse'},{k:'summon',what:'skel',n:2,cd:420}],d:'Kutukannya melemahkan serangan. Bisa membangkitkan kerangka.'},
  jenderal:{n:'Jenderal Iblis',k:'hum',race:'jenderal',job:'mGeneral',rank:'S',hp:1500,atk:72,spd:1,xp:900,bounty:400,demon:1,armor:16,skills:[{k:'nova',range:20,r:44,dmg:1,cd:120,self:1,fx:'#ff5a2a',debuff:'burn'},{k:'roar',r:80,dur:170,cd:260},{k:'cleave',r:24,dmg:1.25,cd:45}],d:'Tangan kanan Raja Iblis. Ledakan api dan raungannya membuat barisan kocar-kacir.'},
};
const TAMERS = {'Penjinak Hewan':{slots:1,max:3},'Beast Tamer':{slots:1,max:4},'Penjinak Wyvern':{slots:1,max:5},'Beastamer Sejati':{slots:3,max:6},'Ratu Naga':{slots:1,max:6},'Alden the Summoner':{slots:6,max:7,share:1}};
const PET_NAMES = ['Kuro','Shiro','Pochi','Rex','Bara','Kabut','Taring','Gemuk','Bintang','Petir','Abu','Embun','Remah','Badai','Mochi','Fang','Luna','Raja','Sisik','Bayu'];
const DEBUFF_N = {burn:'Terbakar',poison:'Keracunan',slow:'Melambat',curse:'Terkutuk',fear:'Ketakutan',charm:'Terpikat'};
const RANK_ORDER = ['F','E','D','C','B','A','S','SS'];

/* ---------- Dewa asisten ---------- */
const GODS = [
  {id:'lirana',n:'Dewi Lirana',dom:'Panen & Hujan',g:'☘',col:'#7fc98a'},
  {id:'brakas',n:'Dewa Brakas',dom:'Perang & Keberanian',g:'⚔',col:'#e0645a'},
  {id:'seralin',n:'Dewi Seralin',dom:'Takdir & Kelahiran',g:'✧',col:'#c9b8ff'},
  {id:'morgath',n:'Dewa Morgath',dom:'Bencana & Kematian',g:'☄',col:'#ff9a4e'},
];

/* ---------- Bangunan ---------- */
const BLD = {
  tenda:{n:'Tenda',w:3,h:3,work:0,wood:0,stone:0},
  istana:{n:'Istana',w:12,h:8,work:5200,wood:90,stone:110},
  rumah:{n:'Rumah',w:6,h:5,work:650,wood:14,stone:4},
  kuil:{n:'Kuil Berkat',w:6,h:5,work:1800,wood:20,stone:35},
  guild:{n:'Balai Guild',w:6,h:5,work:1600,wood:40,stone:10},
  pasar:{n:'Pasar',w:6,h:5,work:700,wood:22,stone:0},
  bengkel:{n:'Bengkel Tempa',w:6,h:5,work:900,wood:15,stone:18},
  lumbung:{n:'Lumbung',w:6,h:5,work:800,wood:28,stone:0},
  klinik:{n:'Balai Pengobatan',w:6,h:5,work:1200,wood:25,stone:20},
  akademi:{n:'Akademi Kerajaan',w:6,h:5,work:1700,wood:30,stone:40},
  tembok:{n:'Tembok & Gerbang',w:0,h:0,work:9000,wood:40,stone:180},
};
const BUILD_ORDER = ['istana','lumbung','kuil','guild','pasar','bengkel'];

if (typeof module !== 'undefined') module.exports = {};
