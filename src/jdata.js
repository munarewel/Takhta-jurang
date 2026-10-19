/* =====================================================================
   TAKHTA JURANG — data: elemen, ability, katalog ribuan monster,
   job petualang, nama, ras Raja Iblis, toko
   ===================================================================== */
RANK_ORDER.push('SSS');
const RARITY=['N','R','SR','SSR','UR'];
const RAR_COL={N:'#b9b4a4',R:'#7fd8ff',SR:'#c78aff',SSR:'#ffd36a',UR:'#ff7a5a'};
const STAGE_CAP=[0,25,50,75,100];

/* ---------- ability ---------- */
// k: 'p' pasif, 'a' aktif (cd dalam detik)
const ABIL={
  regen:{n:'Regenerasi',k:'p',d:'Memulihkan 2% nyawa tiap detik.'},
  kulitBatu:{n:'Kulit Batu',k:'p',d:'Pertahanan +35%.'},
  kulitBaja:{n:'Kulit Baja',k:'p',d:'Kerusakan yang diterima -20%.'},
  gesit:{n:'Gesit',k:'p',d:'Peluang menghindar +15%.'},
  haus:{n:'Haus Darah',k:'p',d:'Menyerap 20% kerusakan menjadi nyawa.'},
  amarah:{n:'Amarah',k:'p',d:'Serangan +50% saat nyawa di bawah 40%.'},
  duri:{n:'Duri',k:'p',d:'Memantulkan 20% kerusakan jarak dekat.'},
  auraRacun:{n:'Aura Racun',k:'p',d:'Petualang di dekatnya keracunan.'},
  berani:{n:'Tak Kenal Takut',k:'p',d:'Kebal pingsan dan tidur.'},
  elang:{n:'Mata Elang',k:'p',d:'Peluang kritikal +20%.'},
  untung:{n:'Keberuntungan',k:'p',d:'Korban yang dibunuhnya menjatuhkan 50% emas lebih banyak.'},
  pemburu:{n:'Pemburu Pemula',k:'p',d:'+40% kerusakan ke petualang berlevel lebih rendah.'},
  pelindung:{n:'Pelindung',k:'p',d:'Monster lain di lantai yang sama menerima kerusakan -12%.'},
  pantul:{n:'Pantulan Sihir',k:'p',d:'Memantulkan 30% kerusakan sihir.'},
  kabut:{n:'Selubung Kabut',k:'p',d:'Semua monster di lantai ini +8% menghindar.'},
  api:{n:'Semburan Api',k:'a',cd:9,d:'Membakar semua petualang di depannya.'},
  beku:{n:'Napas Beku',k:'a',cd:9,d:'Kerusakan dingin dan membuat lambat.'},
  petir:{n:'Sambaran Petir',k:'a',cd:10,d:'Satu sambaran besar (240%).'},
  raung:{n:'Raungan',k:'a',cd:14,d:'Membuat petualang di dekatnya pingsan 2 detik.'},
  jaring:{n:'Jaring',k:'a',cd:8,d:'Menjerat satu petualang 3 detik.'},
  ganda:{n:'Serangan Ganda',k:'a',cd:5,d:'Menyerang dua kali berturut-turut.'},
  sembuh:{n:'Penyembuhan',k:'a',cd:12,d:'Memulihkan 25% nyawa monster di sekitarnya.'},
  panggil:{n:'Panggil Kroco',k:'a',cd:20,d:'Memanggil 2 kroco sementara.'},
  ledak:{n:'Ledakan',k:'a',cd:18,d:'Ledakan besar, tapi melukai diri sendiri 25%.'},
  kedip:{n:'Kedip',k:'a',cd:11,d:'Berpindah ke barisan belakang dan menyerang penyembuh.'},
  serapMana:{n:'Serap Mana',k:'a',cd:10,d:'Menyerang dan menyerap mana untuk kastil.'},
  kutuk:{n:'Kutukan',k:'a',cd:12,d:'Serangan target -30% selama 8 detik.'},
  tebas:{n:'Tebasan Kuat',k:'a',cd:6,d:'Pukulan keras 180%.'},
  goda:{n:'Pikatan',k:'a',cd:16,d:'Satu petualang terpikat dan berhenti menyerang 4 detik.'},
};
const ABIL_KEYS=Object.keys(ABIL);

/* ---------- elemen (pengali variasi spesies) ---------- */
const ELEM=[
  {id:'',n:'',c:null,ab:null,w:30,rar:0},
  {id:'api',n:'Api',c:'#ff6a2a',ab:'api',w:7,rar:0},
  {id:'es',n:'Es',c:'#7fd8ff',ab:'beku',w:7,rar:0},
  {id:'petir',n:'Petir',c:'#ffe040',ab:'petir',w:6,rar:0},
  {id:'racun',n:'Racun',c:'#9ad04a',ab:'auraRacun',w:7,rar:0},
  {id:'bayang',n:'Bayangan',c:'#6a4aaa',ab:'gesit',w:5,rar:0},
  {id:'cahaya',n:'Cahaya',c:'#fff2a0',ab:'sembuh',w:4,rar:1},
  {id:'batu',n:'Batu',c:'#a89070',ab:'kulitBatu',w:7,rar:0},
  {id:'angin',n:'Angin',c:'#bff0d0',ab:'ganda',w:6,rar:0},
  {id:'darah',n:'Darah',c:'#c8203a',ab:'haus',w:4,rar:1},
  {id:'kristal',n:'Kristal',c:'#c0a0ff',ab:'pantul',w:4,rar:1},
  {id:'baja',n:'Baja',c:'#b8c0c8',ab:'kulitBaja',w:5,rar:0},
  {id:'kabut',n:'Kabut',c:'#c8c8d8',ab:'kabut',w:5,rar:0},
  {id:'lava',n:'Lava',c:'#ff3a1a',ab:'ledak',w:3,rar:1},
  {id:'emas',n:'Emas',c:'#ffd040',ab:'untung',w:2,rar:1},
  {id:'hampa',n:'Hampa',c:'#3a1a5a',ab:'serapMana',w:1,rar:2},
  {id:'air',n:'Air',c:'#3a8ad8',ab:'regen',w:6,rar:0},
  {id:'tanah',n:'Tanah',c:'#8a6a3a',ab:'kulitBatu',w:6,rar:0},
  {id:'daun',n:'Daun',c:'#5ac85a',ab:'regen',w:6,rar:0},
  {id:'tulang',n:'Tulang',c:'#e8e0c8',ab:'berani',w:5,rar:0},
  {id:'bulan',n:'Bulan',c:'#c8d8ff',ab:'gesit',w:3,rar:1},
  {id:'surya',n:'Surya',c:'#ffb030',ab:'api',w:3,rar:1},
  {id:'pasir',n:'Pasir',c:'#e0c890',ab:'kabut',w:5,rar:0},
  {id:'neraka',n:'Neraka',c:'#a01a1a',ab:'amarah',w:2,rar:1},
  {id:'suci',n:'Suci',c:'#fffde0',ab:'pelindung',w:2,rar:1},
  {id:'mimpi',n:'Mimpi',c:'#ff9ad0',ab:'goda',w:2,rar:1},
];
const ELEM_BY={}; for(const e of ELEM) ELEM_BY[e.id]=e;
// ability bawaan menurut bentuk tubuh
const SHAPE_AB={slime:'regen',wolf:'ganda',hound:'ganda',bat:'haus',spider:'jaring',mimic:'pemburu',wyvern:'api',boar:'tebas',ghost:'gesit',bear:'amarah',imp:'kutuk',salamander:'api',cockatrice:'kutuk',harpy:'gesit',basilisk:'kutuk',pegasus:'kedip',treant:'regen',yeti:'raung',griffin:'kedip',manticore:'auraRacun',chimera:'api',cerberus:'raung',hydra:'regen',dodo:'untung',jamur:'kutuk',kodok:'jaring',kepiting:'kulitBaja',ular:'auraRacun',gagak:'gesit',kalajengking:'auraRacun',rubah:'goda',tikus:'panggil',kumbang:'kulitBatu',boneka:'kutuk',mata:'petir',cacing:'tebas',zirah:'berani',peri:'sembuh',kelinci:'ganda',gurita:'jaring',raptor:'ganda',raptorA:'ganda',batroww:'haus',nulleye:'kutuk',dragonW:'api',tyrvern:'raung',kong:'raung',bee:'auraRacun',beeQ:'panggil',agroo:'tebas',kangaroo:'ganda',tiger:'ganda',dinoV:'ledak',dinoT:'raung',unicorn:'sembuh',phoenix:'regen',kitsune:'goda',dragonE:'kulitBatu',griffinK:'kedip',fenrir:'raung',behemoth:'kulitBaja',thunderbird:'petir'};
const RACE_AB={kobold:'panggil',goblin:'pemburu',hobgoblin:'tebas',zombie:'berani',skeleton:'berani',lizard:'duri',orc:'amarah',troll:'regen',ogre:'tebas',golem:'kulitBaja',minotaur:'raung',succubus:'goda'};
function baseAbil(m){ if(m.k==='hum') return RACE_AB[m.race]||'tebas'; return SHAPE_AB[m.k]||'tebas'; }

/* ---------- katalog spesies ---------- */
// akar = spesies tahap 1; setiap akar × elemen = satu jalur evolusi tersendiri
const SKIP_MON=new Set(['neko','chaoticDragon','kraken','megalodon','ularLaut']);
const EVO_PREV={}; for(const [a,b] of Object.entries(EVO_NEXT)) (EVO_PREV[b]=EVO_PREV[b]||[]).push(a);
function monStage(k){ return MON[k].evo||1; }
const ROOTS=Object.keys(MON).filter(k=>{ const m=MON[k]; return !SKIP_MON.has(k)&&!m.demon&&!m.sea&&!m.evolved&&!(EVO_PREV[k]&&monStage(k)>1); });
const SPECIES={}; let SPECIES_N=0;
function rankRar(rank){ const i=RANK_ORDER.indexOf(rank); return i<=1?0:i<=3?1:i===4?2:i===5?3:4; }
function spId(k,el){ return el?k+'.'+el:k; }
function makeSpecies(k,el){
  const id=spId(k,el); if(SPECIES[id]) return SPECIES[id];
  const m=MON[k], E=ELEM_BY[el||''];
  const s={id,mk:k,el:el||'',n:E.n?`${m.n} ${E.n}`:m.n,stage:monStage(k),rank:m.rank,
    hp:Math.round(m.hp*(E.id==='batu'||E.id==='baja'?1.2:1)),atk:+(m.atk*(E.id==='api'||E.id==='petir'||E.id==='lava'?1.15:1)).toFixed(1),
    spd:m.spd||1,ranged:!!m.ranged,legend:!!m.legend,
    rar:Math.min(4,rankRar(m.rank)+E.rar+(m.legend?1:0)),ab:E.ab||baseAbil(m),next:null};
  SPECIES[id]=s; SPECIES_N++;
  const nx=EVO_NEXT[k]; if(nx&&MON[nx]&&!m.legend) s.next=makeSpecies(nx,el).id;
  return s;
}
for(const k of ROOTS){ const m=MON[k]; for(const E of ELEM){ if(m.legend&&E.id&&E.rar<1) continue; makeSpecies(k,E.id); } }
const GACHA_POOL={N:[],R:[],SR:[],SSR:[],UR:[]};
for(const id in SPECIES){ const s=SPECIES[id]; if(s.stage!==1) continue; if(EVO_PREV[s.mk]&&!ROOTS.includes(s.mk)) continue; GACHA_POOL[RARITY[s.rar]].push(id); }
function maxStageOf(sid){ let s=SPECIES[sid], st=s.stage, n=0; while(s.next&&n<6){ s=SPECIES[s.next]; st=s.stage; n++; } return st; }

/* ---------- sifat monster (menentukan jawaban saat diajak bicara) ---------- */
const PERS={
  setia:{n:'Setia',p:.25,yes:['Nama dari Yang Mulia adalah kehormatan!','Hamba terima dengan senang hati.'],no:['Maaf… nama ini pemberian ibu hamba.','Izinkan hamba memikirkannya dulu.']},
  ceria:{n:'Ceria',p:.12,yes:['Yeay! Nama baru!','Keren! Aku suka!'],no:['Hmm, kurang imut deh.','Nggak mau ah, hehe.']},
  sombong:{n:'Sombong',p:-.25,yes:['Hmph. Nama itu… cukup layak untukku.','Baiklah, kuizinkan.'],no:['Nama rendahan begitu? Tidak!','Namaku sudah sempurna.']},
  galak:{n:'Galak',p:-.15,yes:['Terserah. Cepat.','Ya, ya. Ganti saja.'],no:['Jangan sentuh namaku!','GRRR! Tidak!']},
  pemalu:{n:'Pemalu',p:.05,yes:['A-anu… baik…','I-iya, terima kasih…'],no:['M-maaf… aku sudah terbiasa…','A-aku malu dipanggil begitu…']},
  malas:{n:'Malas',p:0,yes:['Hoaam… boleh.','Iya deh, asal bisa tidur lagi.'],no:['Ribet. Nanti saja.','Zzz… tidak…']},
  bijak:{n:'Bijak',p:.08,yes:['Nama adalah doa. Hamba terima.','Pilihan yang baik, Yang Mulia.'],no:['Nama lama hamba punya cerita. Belum saatnya.','Hamba belum siap meninggalkannya.']},
  usil:{n:'Usil',p:0,yes:['Hihi, boleh! Tapi jangan salah panggil ya!','Oke deh!'],no:['Ah, gimana kalau namanya ini saja: ','Nggak mau. Coba ini: ']},
};
const PERS_KEYS=Object.keys(PERS);
/* ---------- nama monster pribadi ---------- */
const MN_A=['Go','Mo','Ku','Shi','Ra','Ta','Bo','Ni','Za','Ki','Ro','Pi','Mi','Ga','Do','Lu','Fe','Ha','Yo','Ze','Ba','Su','To','Ri','Ko','Na','Bu','Gri','Vo','Ma'];
const MN_B=['bu','ro','ki','zo','na','ta','ru','mi','ko','ga','pon','chi','ra','dan','mo','gi','bel','rin','tsu','zu','lo','nyo','pa','do','ge','mar'];
const MN_C=['','','','n','to','ro','ta','ko','ri','maru','suke','ra','na'];
function monName(){ return pick(MN_A)+pick(MN_B)+pick(MN_C); }

/* ---------- petualang ---------- */
const JOBS={
  knight:{n:'Knight',spr:'ksatria',hp:62,atk:7,def:9,eva:.03,rng:12,grow:[9,1.2,1.4],skill:{n:'Perisai Baja',cd:12,k:'guard'},front:3},
  mage:{n:'Mage',spr:'penyihirApi',hp:34,atk:10,def:2,eva:.04,rng:52,grow:[5,1.9,.4],skill:{n:'Bola Api',cd:8,k:'aoe',m:1.7},front:0,magic:1},
  priest:{n:'Priest',spr:'pendeta',hp:38,atk:4,def:3,eva:.04,rng:46,grow:[6,.7,.6],skill:{n:'Cahaya Penyembuh',cd:7,k:'heal',m:.3},front:0,magic:1},
  archer:{n:'Archer',spr:'pemanah',hp:40,atk:8,def:3,eva:.1,rng:56,grow:[6,1.5,.5],skill:{n:'Tembakan Jitu',cd:7,k:'snipe',m:2.2},front:1},
  thief:{n:'Thief',spr:'pencuri',hp:42,atk:7,def:3,eva:.18,rng:12,grow:[6,1.3,.5],skill:{n:'Serangan Bayangan',cd:7,k:'crit',m:2},front:2,scout:1},
  dualblade:{n:'Dualblade',spr:'assassin',hp:52,atk:9,def:5,eva:.16,rng:12,grow:[8,1.8,.8],skill:{n:'Tarian Pedang',cd:6,k:'multi',hits:4,m:.75},front:2},
  lancer:{n:'Lancer',spr:'pendekarTombak',hp:56,atk:9,def:6,eva:.06,rng:16,grow:[8,1.5,1],skill:{n:'Tusukan Menembus',cd:8,k:'pierce',m:1.6},front:3},
  monk:{n:'Monk',spr:'petarung',hp:54,atk:8,def:5,eva:.12,rng:12,grow:[8,1.5,.8],skill:{n:'Tinju Seribu',cd:8,k:'multi',hits:6,m:.4},front:2},
  berserker:{n:'Berserker',spr:'berserker',hp:66,atk:11,def:3,eva:.03,rng:12,grow:[10,1.9,.4],skill:{n:'Amukan',cd:14,k:'rage'},front:3},
  paladin:{n:'Paladin',spr:'paladin',hp:64,atk:7,def:8,eva:.03,rng:12,grow:[9,1.2,1.3],skill:{n:'Doa Pelindung',cd:12,k:'heal',m:.18},front:3},
  ranger:{n:'Ranger',spr:'ksatriaPemanah',hp:44,atk:8,def:4,eva:.12,rng:50,grow:[6,1.4,.6],skill:{n:'Panah Ganda',cd:6,k:'multi',hits:2,m:1},front:1,scout:1},
  bard:{n:'Bard',spr:'bard',hp:40,atk:5,def:3,eva:.08,rng:40,grow:[6,.9,.5],skill:{n:'Lagu Semangat',cd:14,k:'buff'},front:0},
};
const JOB_KEYS=Object.keys(JOBS);
const EPI_ADJ=['Loner','Silent','Crimson','Iron','Wandering','Black','Thousand-Cut','Unbroken','Moonlit','Last','Storm','Grave','Golden','Nameless','Laughing','Frozen'];
const EPI_JOB={knight:'Bulwark',mage:'Archmage',priest:'Saint',archer:'Hawkeye',thief:'Phantom',dualblade:'Twinblade',lancer:'Lancer',monk:'Fist',berserker:'Berserker',paladin:'Paladin',ranger:'Ranger',bard:'Bard'};
const PARTY_A=['Taring','Pedang','Bintang','Perisai','Sayap','Api','Mata','Janji','Fajar','Serigala','Bulan','Mawar','Badai','Panji','Jejak','Cahaya'];
const PARTY_B=['Fajar','Perak','Senja','Utara','Merah','Biru','Abadi','Pertama','Terakhir','Liar','Emas','Besi','Selatan','Kembar','Sunyi','Kecil'];
const QUOTES={
  baru:['I hope it\'s worthy.','Semoga kita pulang hidup-hidup…','Ini dungeon pertama kita! Semangat!','Kata guild, dungeon ini masih baru. Pasti gampang.','Ingat, jangan buka peti sembarangan.','Aku bawa roti cadangan, tenang saja.'],
  biasa:['Ayo cari harta dan pulang sebelum gelap.','Kudengar ada peti emas di lantai atas.','Formasi seperti biasa. Knight di depan.','Raja Iblisnya baru, kesempatan bagus.','Jangan sampai mati demi peti, ya.'],
  veteran:['Dungeon ini mulai terkenal. Mari lihat seberapa dalam.','Kita sudah pernah ke sini. Kali ini sampai singgasana.','Hati-hati dengan dinding retak. Biasanya ada sesuatu di baliknya.','Monster di sini makin pintar.'],
  elite:['Raja Iblis, kepalamu milik kami.','Lantai demi lantai. Tidak ada yang bisa menghentikan kami.','Guild membayar mahal untuk misi ini.'],
  solo:['Hmmm, new dungeon?','…','Membosankan. Mana Raja Iblisnya?','Aku cuma lewat.','Jangan halangi jalanku.'],
};
function advName(race){ const R=RACE[race]||RACE.manusia; const sx=rnd()<.62?'m':'f'; let n=pick(R.syl[0])+(sx==='f'?pick(R.fsyl):pick(R.syl[1])); return {n,sx}; }
const ADV_RACES=['manusia','manusia','manusia','elf','dwarf','beastkin','halfelf'];

/* ---------- ras Raja Iblis ---------- */
const LORD_RACE=[
  {id:'iblis',n:'Iblis',race:'iblis',job:'rajaIblis',d:'Semua monster +10% serangan.'},
  {id:'vampir',n:'Vampir',race:'manusia',skin:'#e8e0f0',hair:'#1a1a2a',job:'rajaIblis',d:'Raja menyerap 30% kerusakan menjadi nyawa.'},
  {id:'lich',n:'Lich',mon:{k:'hum',race:'skeleton',job:'mLich'},d:'Biaya kebangkitan monster -40%.'},
  {id:'orc',n:'Orc',mon:{k:'hum',race:'orc',job:'mOrcLord'},d:'Nyawa Raja +40%.'},
  {id:'succubus',n:'Succubus',mon:{k:'hum',race:'succubus',job:'mSuccubus'},d:'Kadang memikat petualang hingga berhenti menyerang.'},
  {id:'naga',n:'Naga',mon:{k:'dragonW',c:'#8a1a2a',eye:'#ffd040'},sc:1.4,d:'Napas api ke seluruh party di ruang singgasana.'},
  {id:'oni',n:'Oni',mon:{k:'hum',race:'ogre',job:'mOgre'},tint:'#c82a2a',d:'Serangan Raja +40%.'},
  {id:'elfGelap',n:'Elf Gelap',race:'elf',skin:'#7a6a9a',hair:'#e8e6f0',job:'rajaIblis',d:'Regenerasi mana kastil +50%.'},
  {id:'ksatria',n:'Ksatria Neraka',mon:{k:'hum',race:'neraka',job:'mHellKnight'},d:'Pertahanan Raja +50%.'},
];

/* ---------- fasilitas (dipasang di petak lantai) ---------- */
const CHEST_RANK=['F','E','D','C','B','A','S','SS','SSS'];
const FIX={
  chest:{n:'Peti Harta',cat:'peti'},
  duri:{n:'Jebakan Duri',cat:'jebakan',cost:60,dmg:.12,d:'Duri mencuat dari lantai.'},
  panah:{n:'Celah Panah',cat:'jebakan',cost:110,dmg:.16,d:'Panah melesat dari dinding.'},
  gas:{n:'Gas Tidur',cat:'jebakan',cost:160,sleep:3,d:'Party tertidur 3 detik. Kombo dengan jebakan lain.'},
  baskom:{n:'Baskom Jatuh',cat:'jebakan',cost:90,dmg:.1,stun:1.2,d:'Baskom besi jatuh ke kepala. Pingsan sebentar.'},
  licin:{n:'Lantai Licin',cat:'jebakan',cost:140,slip:1,d:'Petualang terpeleset jatuh ke lantai bawah.'},
  lubang:{n:'Lubang Jatuh',cat:'jebakan',cost:220,dmg:.18,fall:1,d:'Jatuh ke lantai bawah sambil terluka.'},
  apiT:{n:'Semburan Api',cat:'jebakan',cost:260,dmg:.2,burn:1,d:'Pipa api menyembur. Membakar.'},
  jaringT:{n:'Jaring Jerat',cat:'jebakan',cost:180,root:3,d:'Menjerat satu petualang 3 detik.'},
  rest:{n:'Tempat Istirahat',cat:'fasilitas',cost:300,d:'Petualang membayar emas untuk memulihkan diri dan menyimpan kemajuan.'},
  rahasia:{n:'Dinding Retak',cat:'fasilitas',cost:450,d:'Jalan rahasia menuju ruang monster rahasia. Hanya Thief/Ranger yang bisa menemukannya.'},
  obor:{n:'Obor Ungu',cat:'dekor',cost:40,aura:2,d:'Menambah Aura Seram.'},
  patung:{n:'Patung Gargoyle',cat:'dekor',cost:120,aura:5,d:'Menambah Aura Seram.'},
  tengkorak:{n:'Tumpukan Tengkorak',cat:'dekor',cost:80,aura:4,d:'Menambah Aura Seram.'},
};
function chestCost(r){ return Math.round(40*Math.pow(2.05,CHEST_RANK.indexOf(r))); }
function chestValue(r){ return CHEST_RANK.indexOf(r); }
const THEMES=[
  {n:'Gua Batu',wall:'#3a3446',wall2:'#2e2a3a',floor:'#5a4e5e',acc:'#7a6a7e'},
  {n:'Makam Tua',wall:'#3e3a34',wall2:'#322e2a',floor:'#6a5e4a',acc:'#a89a7a'},
  {n:'Hutan Jamur',wall:'#28383a',wall2:'#1e2e30',floor:'#3a5a4a',acc:'#9ae0c0'},
  {n:'Gua Kristal',wall:'#2a2e4a',wall2:'#222640',floor:'#4a4e7a',acc:'#b0a0ff'},
  {n:'Kawah Lava',wall:'#3e2420',wall2:'#301a18',floor:'#6a3a2a',acc:'#ff7a3a'},
  {n:'Lorong Es',wall:'#2e3e4e',wall2:'#243444',floor:'#5a7a8e',acc:'#c8f0ff'},
  {n:'Istana Hitam',wall:'#24182a',wall2:'#1c1222',floor:'#4a2e4a',acc:'#e3b75e'},
  {n:'Jurang Hampa',wall:'#140e1e',wall2:'#0e0a16',floor:'#2e2240',acc:'#d060ff'},
];
function themeOf(f){ return THEMES[Math.floor(f/10)%THEMES.length]; }
