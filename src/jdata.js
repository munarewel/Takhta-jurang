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
  regen:{n:'Regeneration',k:'p',d:'Memulihkan 2% nyawa tiap detik.'},
  kulitBatu:{n:'Stone Skin',k:'p',d:'Pertahanan +35%.'},
  kulitBaja:{n:'Steel Skin',k:'p',d:'Kerusakan yang diterima -20%.'},
  gesit:{n:'Agility',k:'p',d:'Peluang menghindar +15%.'},
  haus:{n:'Bloodthirst',k:'p',d:'Menyerap 20% kerusakan menjadi nyawa.'},
  amarah:{n:'Fury',k:'p',d:'Serangan +50% saat nyawa di bawah 40%.'},
  duri:{n:'Thorns',k:'p',d:'Memantulkan 20% kerusakan jarak dekat.'},
  auraRacun:{n:'Poison Aura',k:'p',d:'Petualang di dekatnya keracunan.'},
  berani:{n:'Fearless',k:'p',d:'Kebal pingsan dan tidur.'},
  elang:{n:'Eagle Eye',k:'p',d:'Peluang kritikal +20%.'},
  untung:{n:'Fortune',k:'p',d:'Korban yang dibunuhnya menjatuhkan 50% emas lebih banyak.'},
  pemburu:{n:'Rookie Hunter',k:'p',d:'+40% kerusakan ke petualang berlevel lebih rendah.'},
  pelindung:{n:'Guardian',k:'p',d:'Monster lain di lantai yang sama menerima kerusakan -12%.'},
  pantul:{n:'Spell Reflect',k:'p',d:'Memantulkan 30% kerusakan sihir.'},
  kabut:{n:'Mist Veil',k:'p',d:'Semua monster di lantai ini +8% menghindar.'},
  api:{n:'Fire Breath',k:'a',cd:9,d:'Membakar semua petualang di depannya.'},
  beku:{n:'Frost Breath',k:'a',cd:9,d:'Kerusakan dingin dan membuat lambat.'},
  petir:{n:'Lightning Strike',k:'a',cd:10,d:'Satu sambaran besar (240%).'},
  raung:{n:'Roar',k:'a',cd:14,d:'Membuat petualang di dekatnya pingsan 2 detik.'},
  jaring:{n:'Web',k:'a',cd:8,d:'Menjerat satu petualang 3 detik.'},
  ganda:{n:'Double Strike',k:'a',cd:5,d:'Menyerang dua kali berturut-turut.'},
  sembuh:{n:'Heal',k:'a',cd:12,d:'Memulihkan 25% nyawa monster di sekitarnya.'},
  panggil:{n:'Call Minions',k:'a',cd:20,d:'Memanggil 2 kroco sementara.'},
  ledak:{n:'Self Destruct',k:'a',cd:18,d:'Ledakan besar, tapi melukai diri sendiri 25%.'},
  kedip:{n:'Blink',k:'a',cd:11,d:'Berpindah ke barisan belakang dan menyerang penyembuh.'},
  serapMana:{n:'Mana Siphon',k:'a',cd:10,d:'Menyerang dan menyerap mana untuk kastil.'},
  kutuk:{n:'Curse',k:'a',cd:12,d:'Serangan target -30% selama 8 detik.'},
  tebas:{n:'Power Slash',k:'a',cd:6,d:'Pukulan keras 180%.'},
  goda:{n:'Charm',k:'a',cd:16,d:'Satu petualang terpikat dan berhenti menyerang 4 detik.'},
  tajam:{n:'Keen Edge',k:'p',d:'Kerusakan kritikal +60%.'},
  tegar:{n:'Endure',k:'p',d:'Bertahan dengan 1 nyawa saat terkena pukulan mematikan (sekali tiap 30 detik).'},
  kebalSihir:{n:'Magic Immunity',k:'p',d:'Kerusakan sihir yang diterima -40%.'},
  serapJiwa:{n:'Soul Eater',k:'p',d:'Pulih 30% nyawa setiap membunuh petualang.'},
  semangat:{n:'Pack Spirit',k:'p',d:'Serangan +20% saat ada 3 monster atau lebih di lantai yang sama.'},
  licin:{n:'Slippery Body',k:'p',d:'Menghindar +10%, kebal jerat.'},
  pencuri:{n:'Sticky Fingers',k:'p',d:'Setiap pukulan mencuri 3 emas dari petualang.'},
  gempa:{n:'Earthquake',k:'a',cd:18,d:'Mengguncang lantai: semua petualang di lantai ini pingsan 1,5 detik.'},
  tornado:{n:'Tornado',k:'a',cd:12,d:'Angin puyuh: kerusakan area dan mendorong mundur.'},
  meteor:{n:'Meteor',k:'a',cd:22,d:'Batu api jatuh dari langit-langit: kerusakan area 260%.'},
  teriak:{n:'War Cry',k:'a',cd:16,d:'Monster di lantai ini +30% serangan selama 8 detik.'},
  perisai:{n:'Magic Barrier',k:'a',cd:15,d:'Monster di lantai ini menerima kerusakan -30% selama 6 detik.'},
  tidur:{n:'Lullaby',k:'a',cd:12,d:'Menidurkan satu petualang 3 detik. Kombo dengan serangan berikutnya.'},
  serbu:{n:'Charge',k:'a',cd:8,d:'Menerjang target dengan kekuatan 200%.'},
  bayang:{n:'Shadow Clone',k:'a',cd:20,d:'Memanggil bayangan dirinya selama 10 detik.'},
  racunKuat:{n:'Deadly Venom',k:'a',cd:10,d:'Racun kuat yang menggerogoti nyawa 8 detik.'},
};

/* ---------- kelompok bentuk: menentukan ability yang bisa dipelajari & drop ---------- */
function monGroup(M){
  const k=M.k, r=M.race;
  if(k==='slime') return 'slime';
  if(k==='hum'){ if(r==='skeleton') return 'skel'; if(r==='zombie'||r==='mumi') return 'mayat'; if(['goblin','hobgoblin','kobold'].includes(r)) return 'goblin'; if(['orc','ogre','troll','minotaur'].includes(r)) return 'orc'; if(['succubus','neraka','jenderal','iblis'].includes(r)) return 'iblis'; if(r==='cyborg') return 'mesin'; return 'hum'; }
  if(['dragon2','dragonE2','wyvern','tyrvern','hydra','dinoV','dinoT','seaSerpent','ular'].includes(k)) return 'naga';
  if(['golemX','robot','drone'].includes(k)) return 'mesin';
  if(['ghost','imp','cryingDemon','labu','mata','boneka','horseman','mudHand'].includes(k)) return 'roh';
  if(['bat','batroww','harpy','griffin','griffinK','gagak','agroo','bee','beeQ','phoenix','thunderbird','pegasus','peri','cockatrice'].includes(k)) return 'terbang';
  if(['treant','bunga','jamur','kaktus'].includes(k)) return 'tanaman';
  if(['spider','kumbang','kalajengking','kepiting','mimic'].includes(k)) return 'cangkang';
  if(k==='beastman') return 'prajurit';
  return 'buas';
}
const LEARN_POOL={slime:['regen','licin','racunKuat','ledak','serapJiwa','bayang'],skel:['tebas','tegar','kebalSihir','teriak','perisai','tajam'],mayat:['kutuk','tegar','serapJiwa','tidur','racunKuat'],
  goblin:['pencuri','ganda','panggil','teriak','semangat','licin'],orc:['amarah','serbu','teriak','tegar','tebas','gempa'],iblis:['kutuk','goda','api','serapJiwa','amarah','meteor'],
  naga:['api','meteor','kulitBaja','raung','tajam','tegar'],mesin:['kulitBaja','petir','perisai','gempa','kebalSihir','meteor'],roh:['kutuk','tidur','kedip','serapJiwa','kebalSihir','bayang'],
  terbang:['gesit','kedip','tornado','elang','ganda'],tanaman:['regen','jaring','duri','racunKuat','tidur'],cangkang:['kulitBatu','duri','racunKuat','jaring','pelindung'],
  prajurit:['tajam','ganda','serbu','teriak','tegar','bayang','elang'],buas:['ganda','amarah','serbu','raung','tajam','semangat'],hum:['tebas','teriak','perisai','tegar','pencuri']};
function hashStr(s){ let h=2166136261; for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }
function learnset(sid){
  const s=SPECIES[sid]; if(s._learn) return s._learn; const M=MON[s.mk];
  const STATP=['raksasa','tubuhBesi','langkahAngin','pikiranTajam','kulitTebal','pemulihan','cepat','wibawa'];
  let pool=(LEARN_POOL[monGroup(M)]||LEARN_POOL.buas).concat(STATP);
  const el=s.el||(FIRE_MK.has(s.mk)?'api':ICE_MK.has(s.mk)?'es':'');
  const elPool=el?['tembak_','ledak_','status_','badai_','jiwa_','tameng_'].map(x=>x+el):[];
  let h=hashStr(sid); const pickd=[]; const n=2+(s.stage>=2?1:0)+(s.rar>=2?1:0);
  const take=arr=>{ const p=arr.filter(a=>a!==s.ab&&!pickd.includes(a)); if(!p.length) return; h=Math.imul(h^(h>>>13),1274126177)>>>0; pickd.push(p[h%p.length]); };
  while(pickd.length<n){ const before=pickd.length; take(elPool.length&&pickd.length%2===0?elPool:pool); if(pickd.length===before) take(pool); if(pickd.length===before) break; }
  const cap=STAGE_CAP[s.stage]||25; const fr=[.2,.45,.7,.92];
  s._learn=[{ab:s.ab,lv:1}].concat(pickd.map((a,i)=>({ab:a,lv:Math.max(2,Math.round(cap*fr[i]))}))); return s._learn;
}
/* ---------- drop sesuai monster ---------- */
const FIRE_MK=new Set(['redDragon','nagaMerahTua','salamander','salamanderLava','phoenix','volcanosaur','impApi','iblisApi','anjingLava','anjingMagma','kura','kuraVulkan','kuraTitan','golemMagma','golemInti','bayiNaga','nagaRemaja','nagaDewasa','nagaPurba']);
const ICE_MK=new Set(['nagaEs','nagaEsPurba','golemEs','golemGletser','yeti','yetiRaja','serigalaSalju','serigalaEs','snowman','snowmanRaksasa','rajaSalju','penguin','penguinKaisar']);
const DROP_NAMES={slime:['Slime Shard','Slime Core',['Slime Whip'],['Slime Armor'],['Slime Ring']],skel:['Old Bone','Skeleton Core',['Iron Sword','Iron Axe'],['Iron Armor','Bone Shield'],['Bone Necklace']],
  mayat:['Burial Cloth','Corpse Core',['Rusty Dagger'],['Shroud Robe'],['Tomb Charm']],goblin:['Goblin Ear','Goblin Core',['Goblin Dagger','Goblin Club'],['Goblin Hide Armor'],['Tooth Necklace']],
  orc:['Orc Tusk','Orc Core',['Great Axe','Spiked Club'],['Thick Hide Armor'],['Warrior Bracelet']],iblis:['Demon Horn','Demon Core',['Hell Scythe','Hell Whip'],['Hell Armor'],['Thorn Crown']],
  naga:['Dragon Scale','Dragon Core',['Dragon Sword','Dragon Fang Spear'],['Dragon Scale Armor'],['Dragon Fang']],mesin:['Metal Bolt','Machine Core',['Laser Sword','Stone Mace'],['Mech Armor','Stone Armor'],['Ancient Chip','Rune Ring']],
  roh:['Spirit Dust','Spirit Core',['Spirit Scythe'],['Spirit Robe'],['Spirit Pendant']],terbang:['Rare Feather','Wind Core',['Feather Bow'],['Feather Cloak'],['Feather Earring']],tanaman:['Forest Sap','Forest Core',['Root Staff'],['Bark Armor'],['Leaf Crown']],
  cangkang:['Shell Fragment','Insect Core',['Stinger Spear'],['Shell Armor'],['Venom Charm']],prajurit:['Warrior Sash','Knight Core',['Katana','Monkey Staff'],['Warrior Garb'],['Headband']],
  buas:['Beast Fang','Beast Core',['Beast Claw','Fang Club'],['Beast Fur Cloak'],['Fang Necklace']],hum:['Broken Badge','Soul Core',['Old Sword'],['Chainmail'],['Copper Ring']]};
function dropTheme(sid){ const s=SPECIES[sid], M=MON[s.mk]; const g=monGroup(M); const D=DROP_NAMES[g]||DROP_NAMES.buas;
  const el=s.el?ELEM_BY[s.el].n:FIRE_MK.has(s.mk)?'Fire':ICE_MK.has(s.mk)?'Ice':'';
  const tier=Math.min(6,RANK_ORDER.indexOf(s.rank)); const base=M.n; const pre=n=>(el?el+' ':'')+n;
  return {mat:pre(D[0]),core:`${base} Core`,eq:{senjata:D[2].map(pre),zirah:D[3].map(pre),aksesori:D[4].map(pre)},tier,rar:Math.min(4,s.rar),from:s.n}; }

/* ---------- elemen (pengali variasi spesies) ---------- */
const ELEM=[
  {id:'',n:'',c:null,ab:null,w:30,rar:0},
  {id:'api',n:'Fire',c:'#ff6a2a',ab:'api',w:7,rar:0},
  {id:'es',n:'Ice',c:'#7fd8ff',ab:'beku',w:7,rar:0},
  {id:'petir',n:'Thunder',c:'#ffe040',ab:'petir',w:6,rar:0},
  {id:'racun',n:'Poison',c:'#9ad04a',ab:'auraRacun',w:7,rar:0},
  {id:'bayang',n:'Shadow',c:'#6a4aaa',ab:'gesit',w:5,rar:0},
  {id:'cahaya',n:'Light',c:'#fff2a0',ab:'sembuh',w:4,rar:1},
  {id:'batu',n:'Stone',c:'#a89070',ab:'kulitBatu',w:7,rar:0},
  {id:'angin',n:'Wind',c:'#bff0d0',ab:'ganda',w:6,rar:0},
  {id:'darah',n:'Blood',c:'#c8203a',ab:'haus',w:4,rar:1},
  {id:'kristal',n:'Crystal',c:'#c0a0ff',ab:'pantul',w:4,rar:1},
  {id:'baja',n:'Steel',c:'#b8c0c8',ab:'kulitBaja',w:5,rar:0},
  {id:'kabut',n:'Mist',c:'#c8c8d8',ab:'kabut',w:5,rar:0},
  {id:'lava',n:'Lava',c:'#ff3a1a',ab:'ledak',w:3,rar:1},
  {id:'emas',n:'Golden',c:'#ffd040',ab:'untung',w:2,rar:1},
  {id:'hampa',n:'Void',c:'#3a1a5a',ab:'serapMana',w:1,rar:2},
  {id:'air',n:'Water',c:'#3a8ad8',ab:'regen',w:6,rar:0},
  {id:'tanah',n:'Earth',c:'#8a6a3a',ab:'kulitBatu',w:6,rar:0},
  {id:'daun',n:'Leaf',c:'#5ac85a',ab:'regen',w:6,rar:0},
  {id:'tulang',n:'Bone',c:'#e8e0c8',ab:'berani',w:5,rar:0},
  {id:'bulan',n:'Moon',c:'#c8d8ff',ab:'gesit',w:3,rar:1},
  {id:'surya',n:'Sun',c:'#ffb030',ab:'api',w:3,rar:1},
  {id:'pasir',n:'Sand',c:'#e0c890',ab:'kabut',w:5,rar:0},
  {id:'neraka',n:'Hell',c:'#a01a1a',ab:'amarah',w:2,rar:1},
  {id:'suci',n:'Holy',c:'#fffde0',ab:'pelindung',w:2,rar:1},
  {id:'mimpi',n:'Dream',c:'#ff9ad0',ab:'goda',w:2,rar:1},
];
const ELEM_BY={}; for(const e of ELEM) ELEM_BY[e.id]=e;
/* ---------- ability berelemen (6 per elemen) & pasif stat ---------- */
const ELEM_STATUS={api:['Ignite','burn'],es:['Freeze','slow'],petir:['Shock','stun'],racun:['Envenom','poison'],bayang:['Shadow Curse','curse'],cahaya:['Flash','blind'],batu:['Petrify','stun'],angin:['Gust','slow'],darah:['Blood Drain','drain'],kristal:['Crystal Bind','root'],baja:['Armor Break','brk'],kabut:['Sleep Mist','sleep'],lava:['Meltdown','brk'],emas:['Gold Snatch','gold'],hampa:['Mana Drain','mana'],air:['Drown','slow'],tanah:['Earth Trap','root'],daun:['Binding Roots','root'],tulang:['Bone Curse','curse'],bulan:['Moon Lullaby','sleep'],surya:['Sunbeam','blind'],pasir:['Sandstorm','blind'],neraka:['Hellfire','burn'],suci:['Judgment','stun'],mimpi:['Nightmare','charm']};
const STATUS_D={burn:'membakar',slow:'memperlambat',stun:'membuat pingsan',poison:'meracuni',curse:'melemahkan serangan',blind:'membutakan (serangan sering meleset)',drain:'menghisap nyawa',root:'menjerat',brk:'menghancurkan pertahanan',sleep:'menidurkan',gold:'mencuri emas',mana:'menyerap mana untuk kastil',charm:'memikat'};
for(const E of ELEM){ if(!E.id) continue; const S=ELEM_STATUS[E.id]||[E.n+' Curse','curse'];
  ABIL['tembak_'+E.id]={n:`${E.n} Shot`,k:'a',cd:7,eff:'hit',m:1.9,el:E.id,d:`Serangan ${E.n} terfokus (190%).`};
  ABIL['ledak_'+E.id]={n:`${E.n} Blast`,k:'a',cd:11,eff:'aoe',m:1.4,r:40,el:E.id,d:`Ledakan ${E.n} ke semua petualang di dekatnya (140%).`};
  ABIL['status_'+E.id]={n:S[0],k:'a',cd:10,eff:'status',st:S[1],m:.7,el:E.id,d:`Serangan ${E.n} yang ${STATUS_D[S[1]]}.`};
  ABIL['badai_'+E.id]={n:`${E.n} Storm`,k:'a',cd:9,eff:'multi',hits:3,m:.7,el:E.id,d:`Tiga serangan ${E.n} beruntun.`};
  ABIL['jiwa_'+E.id]={n:`${E.n} Soul`,k:'p',eff:'elemAtk',el:E.id,d:`Serangan biasa berelemen ${E.n} dan +15% kerusakan.`};
  ABIL['tameng_'+E.id]={n:`${E.n} Ward`,k:'p',eff:'res',el:E.id,d:`Kerusakan elemen ${E.n} yang diterima -40%.`};
}
Object.assign(ABIL,{
  raksasa:{n:'Giant Strength',k:'p',eff:'stat',atk:.2,d:'Serangan +20%.'},
  tubuhBesi:{n:'Iron Body',k:'p',eff:'stat',hp:.25,d:'Nyawa maksimal +25%.'},
  langkahAngin:{n:'Wind Step',k:'p',eff:'stat',eva:.1,d:'Menghindar +10%.'},
  pikiranTajam:{n:'Sharp Mind',k:'p',eff:'stat',crit:.12,d:'Peluang kritikal +12%.'},
  kulitTebal:{n:'Thick Hide',k:'p',eff:'stat',def:.3,d:'Pertahanan +30%.'},
  pemulihan:{n:'Recovery',k:'p',eff:'stat',regen:.01,d:'Memulihkan 1% nyawa tiap detik.'},
  cepat:{n:'Haste',k:'p',eff:'stat',spd:.25,d:'Kecepatan serangan +25%.'},
  wibawa:{n:"King's Presence",k:'p',eff:'stat',aura:1,d:'Monster lain di lantai ini +10% serangan.'},
});
/* kuat ⇒ x1,5 · lemah ⇒ x0,7 */
const ELEM_STRONG={api:['daun','es','baja'],air:['api','lava','pasir'],es:['daun','angin','air'],petir:['air','baja','angin'],tanah:['petir','racun','lava'],daun:['air','tanah','batu'],angin:['daun','kabut','pasir'],batu:['petir','api','angin'],racun:['daun','air','darah'],
  cahaya:['bayang','neraka','hampa'],bayang:['bulan','mimpi','cahaya'],neraka:['suci','daun','es'],suci:['neraka','bayang','tulang'],tulang:['darah'],bulan:['bayang','mimpi'],surya:['es','bulan','kabut'],pasir:['petir','api'],kristal:['kabut','hampa'],baja:['batu','kristal','es'],lava:['es','baja','daun'],emas:[],hampa:['kristal','cahaya','emas'],mimpi:['kabut','tulang'],darah:['tulang','daun'],kabut:['cahaya','surya']};
function elemMult(a,dEl){ if(!a||!dEl) return 1; if((ELEM_STRONG[a]||[]).includes(dEl)) return 1.5; if((ELEM_STRONG[dEl]||[]).includes(a)) return .7; return 1; }
const JOB_EL={mage:['api','es','petir'],priest:['cahaya'],cleric:['cahaya'],paladin:['cahaya'],necro:['bayang'],darkmage:['bayang','neraka'],druid:['daun'],hydromancer:['air'],sage:['api','es','petir','cahaya','angin'],dragoon:['api'],ninja:['angin','bayang'],summoner:['bulan','cahaya'],alkemis:['racun','api'],ranger:['angin'],hunter:['tanah']};
const JOB_GEAR={knight:[['Pedang Ksatria','Pedang Panjang'],['Zirah Ksatria','Perisai Besar'],['Lencana Ksatria']],mage:[['Tongkat Sihir'],['Jubah Penyihir'],['Cincin Mana']],priest:[['Gada Suci'],['Jubah Pendeta'],['Rosario Perak']],
  archer:[['Busur Panjang'],['Rompi Pemanah'],['Sarung Tangan Pemanah']],thief:[['Belati Pencuri'],['Jubah Gelap'],['Kunci Ajaib']],dualblade:[['Pedang Kembar'],['Zirah Ringan'],['Ikat Pinggang Pedang']],
  lancer:[['Tombak Panjang'],['Zirah Lancer'],['Panji Kecil']],monk:[['Sarung Tinju'],['Baju Biksu'],['Tasbih Kayu']],berserker:[['Kapak Raksasa'],['Kulit Binatang'],['Kalung Taring']],
  paladin:[['Pedang Suci'],['Zirah Suci','Perisai Suci'],['Liontin Cahaya']],ranger:[['Busur Ranger'],['Jubah Hutan'],['Peta Lusuh']],bard:[['Kecapi'],['Baju Penyair'],['Topi Bulu']],
  samurai:[['Katana'],['Zirah Samurai'],['Jimat Kuil']],ninja:[['Shuriken','Kunai'],['Baju Ninja'],['Ikat Kepala Ninja']],necro:[['Tongkat Tengkorak'],['Jubah Kematian'],['Grimoire Hitam']],
  druid:[['Tongkat Akar'],['Jubah Daun'],['Mahkota Ranting']],alkemis:[['Bom Ramuan'],['Celemek Alkemis'],['Tas Botol']],summoner:[['Tongkat Pemanggil'],['Jubah Roh'],['Batu Kontrak']],
  sage:[['Tongkat Bijak'],['Jubah Agung'],['Kitab Kuno']],dragoon:[['Tombak Naga'],['Zirah Naga'],['Lambang Naga']],swordmaster:[['Pedang Pusaka'],['Zirah Master'],['Sabuk Juara']],
  sniper:[['Busur Penembak Jitu'],['Rompi Kamuflase'],['Teropong']],axeman:[['Kapak Perang'],['Zirah Rantai'],['Gelang Besi']],darkmage:[['Tongkat Kegelapan'],['Jubah Hitam'],['Bola Kristal Gelap']],
  hunter:[['Busur Pemburu'],['Jaket Kulit'],['Kalung Taring Buruan']],cleric:[['Tongkat Penyembuh'],['Jubah Putih'],['Botol Ramuan Suci']],hydromancer:[['Tongkat Ombak'],['Jubah Laut'],['Mutiara Biru']]};
const ABIL_KEYS=Object.keys(ABIL);
// ability bawaan menurut bentuk tubuh
const SHAPE_AB={slime:'regen',wolf:'ganda',hound:'ganda',bat:'haus',spider:'jaring',mimic:'pemburu',wyvern:'api',boar:'tebas',ghost:'gesit',bear:'amarah',imp:'kutuk',salamander:'api',cockatrice:'kutuk',harpy:'gesit',basilisk:'kutuk',pegasus:'kedip',treant:'regen',yeti:'raung',griffin:'kedip',manticore:'auraRacun',chimera:'api',cerberus:'raung',hydra:'regen',dodo:'untung',horseman:'raung',mudHand:'jaring',cryingDemon:'kutuk',hedgehog:'duri',drone:'petir',robot:'kulitBaja',snowman:'beku',penguin:'gesit',kaktus:'duri',bunga:'jaring',kura:'kulitBatu',labu:'ledak',rusa:'sembuh',kraken:'jaring',shark:'haus',seaSerpent:'beku',neko:'gesit',dragonE:'kulitBatu',jamur:'kutuk',kodok:'jaring',kepiting:'kulitBaja',ular:'auraRacun',gagak:'gesit',kalajengking:'auraRacun',rubah:'goda',tikus:'panggil',kumbang:'kulitBatu',boneka:'kutuk',mata:'petir',cacing:'tebas',zirah:'berani',peri:'sembuh',kelinci:'ganda',gurita:'jaring',raptor:'ganda',raptorA:'ganda',batroww:'haus',nulleye:'kutuk',dragonW:'api',tyrvern:'raung',kong:'raung',bee:'auraRacun',beeQ:'panggil',agroo:'tebas',kangaroo:'ganda',tiger:'ganda',dinoV:'ledak',dinoT:'raung',unicorn:'sembuh',phoenix:'regen',kitsune:'goda',dragonE:'kulitBatu',griffinK:'kedip',fenrir:'raung',behemoth:'kulitBaja',thunderbird:'petir'};
const RACE_AB={kobold:'panggil',goblin:'pemburu',hobgoblin:'tebas',zombie:'berani',skeleton:'berani',lizard:'duri',orc:'amarah',troll:'regen',ogre:'tebas',golem:'kulitBaja',minotaur:'raung',succubus:'goda',mumi:'kutuk',cyborg:'petir',iblis:'amarah',neraka:'amarah',jenderal:'raung'};
function baseAbil(m){ if(m.ab) return m.ab; if(m.k==='hum') return RACE_AB[m.race]||'tebas'; return SHAPE_AB[m.k]||'tebas'; }

/* ---------- katalog spesies ---------- */
// akar = spesies tahap 1; setiap akar × elemen = satu jalur evolusi tersendiri
const SKIP_MON=new Set([]);
const EVO_PREV={}; for(const [a,b] of Object.entries(EVO_NEXT)) (EVO_PREV[b]=EVO_PREV[b]||[]).push(a);
function monStage(k){ return MON[k].evo||1; }
const ROOTS=Object.keys(MON).filter(k=>{ const m=MON[k]; return !SKIP_MON.has(k)&&!m.evolved&&!(EVO_PREV[k]&&monStage(k)>1); });
const SPECIES={}; let SPECIES_N=0;
function rankRar(rank){ const i=RANK_ORDER.indexOf(rank); return i<=1?0:i<=3?1:i===4?2:i===5?3:4; }
function spId(k,el){ return el?k+'.'+el:k; }
function makeSpecies(k,el){
  const id=spId(k,el); if(SPECIES[id]) return SPECIES[id];
  const m=MON[k], E=ELEM_BY[el||''];
  const s={id,mk:k,el:el||'',n:E.n?`${E.n} ${m.n}`:m.n,stage:monStage(k),rank:m.rank,
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
  samurai:{n:'Samurai',spr:'pendekar',hp:58,atk:10,def:6,eva:.1,rng:12,grow:[8,1.7,.8],skill:{n:'Iai Kilat',cd:8,k:'crit',m:2.4},front:2},
  ninja:{n:'Ninja',spr:'assassin',hp:44,atk:8,def:3,eva:.22,rng:30,grow:[6,1.5,.5],skill:{n:'Shuriken Bayangan',cd:6,k:'multi',hits:3,m:.8},front:1,scout:1},
  necro:{n:'Necromancer',spr:'necromancer',hp:38,atk:9,def:3,eva:.04,rng:48,grow:[5,1.8,.4],skill:{n:'Kutukan Massal',cd:10,k:'aoe',m:1.4},front:0,magic:1},
  druid:{n:'Druid',spr:'druid',hp:46,atk:6,def:4,eva:.06,rng:44,grow:[7,1,.6],skill:{n:'Berkah Alam',cd:9,k:'heal',m:.25},front:0,magic:1},
  alkemis:{n:'Alchemist',spr:'alkemis',hp:42,atk:7,def:3,eva:.06,rng:40,grow:[6,1.3,.5],skill:{n:'Bom Ramuan',cd:8,k:'aoe',m:1.5},front:1},
  summoner:{n:'Summoner',spr:'summoner',hp:40,atk:8,def:3,eva:.05,rng:44,grow:[6,1.6,.5],skill:{n:'Roh Panggilan',cd:9,k:'multi',hits:3,m:.9},front:0,magic:1},
  sage:{n:'Sage',spr:'sageAgung',hp:40,atk:11,def:3,eva:.05,rng:52,grow:[6,2.1,.5],skill:{n:'Meteor Kecil',cd:11,k:'aoe',m:2},front:0,magic:1},
  dragoon:{n:'Dragon Knight',spr:'ksatriaNaga',hp:70,atk:10,def:8,eva:.04,rng:16,grow:[10,1.6,1.2],skill:{n:'Tombak Naga',cd:9,k:'pierce',m:2},front:3},
  swordmaster:{n:'Swordmaster',spr:'rajaPedang',hp:60,atk:11,def:6,eva:.1,rng:12,grow:[8,1.9,.9],skill:{n:'Tebasan Raja',cd:7,k:'multi',hits:3,m:1},front:2},
  sniper:{n:'Sniper',spr:'ratuPanah',hp:38,atk:10,def:2,eva:.08,rng:64,grow:[5,1.8,.4],skill:{n:'Panah Jantung',cd:9,k:'snipe',m:2.8},front:0},
  axeman:{n:'Axe Warrior',spr:'pendekarKapak',hp:64,atk:11,def:5,eva:.03,rng:13,grow:[9,1.8,.8],skill:{n:'Putaran Kapak',cd:8,k:'aoe',m:1.3},front:3},
  darkmage:{n:'Dark Mage',spr:'penyihirHitam',hp:36,atk:11,def:2,eva:.05,rng:50,grow:[5,2,.4],skill:{n:'Api Hitam',cd:9,k:'aoe',m:1.8},front:0,magic:1},
  hunter:{n:'Hunter',spr:'pemburu',hp:46,atk:8,def:4,eva:.12,rng:54,grow:[6,1.5,.6],skill:{n:'Panah Pelacak',cd:7,k:'snipe',m:2},front:1,scout:1},
  cleric:{n:'Cleric',spr:'tabib',hp:42,atk:5,def:4,eva:.05,rng:44,grow:[7,.8,.7],skill:{n:'Ramuan Penyembuh',cd:7,k:'heal',m:.35},front:0},
  hydromancer:{n:'Hydromancer',spr:'penyihirAir',hp:36,atk:9,def:2,eva:.05,rng:50,grow:[5,1.8,.4],skill:{n:'Gelombang Pasang',cd:9,k:'aoe',m:1.5},front:0,magic:1},
};
/* kalimat tiap role saat masuk kastil */
const JOB_LINES={
  knight:['Berlindung di belakangku!','Perisaiku tak akan retak.'],mage:['Biar kubakar semuanya.','Mana penuh, siap merapal!'],priest:['Semoga cahaya melindungi kita.','Jangan jauh-jauh dariku, ya.'],
  archer:['Aku jaga dari belakang.','Satu panah, satu monster.'],thief:['Peti di sini punyaku.','Hati-hati, lantainya mencurigakan.'],dualblade:['Dua pedang, dua kali lebih cepat.','…'],
  lancer:['Tombakku menembus apa pun.','Barisan depan, maju!'],monk:['Tinjuku sudah gatal.','Tenangkan pikiran, kuatkan tubuh.'],berserker:['DARAH! AKU BUTUH DARAH!','Jangan halangi amukanku.'],
  paladin:['Atas nama cahaya!','Aku akan melindungi kalian semua.'],ranger:['Aku tahu jalan rahasia di tempat seperti ini.','Jejaknya masih segar.'],bard:['Lagu pembuka, untuk keberuntungan kita~','Ayo, semangat!'],
  samurai:['Pedangku belum pernah tumpul.','Satu tebasan cukup.'],ninja:['…bayangan tak pernah bersuara.','Aku sudah di belakangmu.'],necro:['Mayat monster di sini pasti berguna.','Hehehe… jiwa-jiwa yang lezat.'],
  druid:['Hutan memberiku kekuatan.','Bahkan di jurang, alam tetap hidup.'],alkemis:['Ramuan baru ini harus dicoba!','Jangan sentuh botol merah itu.'],summoner:['Roh-roh, datanglah!','Aku tidak bertarung sendirian.'],
  sage:['Pengetahuan adalah senjata terkuat.','Kastil ini… menarik untuk diteliti.'],dragoon:['Darah naga mengalir di tombakku!','Langit milikku.'],swordmaster:['Seribu tebasan, satu tujuan.','Akhirnya lawan yang layak.'],
  sniper:['Target terkunci.','Jangan bergerak, Raja Iblis.'],axeman:['Kapakku haus!','Tebas, belah, ulangi!'],darkmage:['Kegelapan melawan kegelapan.','Raja Iblis? Aku lebih gelap.'],
  hunter:['Monster langka, kulit mahal.','Aku mencium bau sarang.'],cleric:['Siapkan perban.','Aku bawa ramuan untuk semua.'],hydromancer:['Biar kubanjiri lantai ini.','Air selalu menemukan jalan.'],
};
/* kalimat party terkenal */
const FAMOUS_LINES=['Kami kembali! Kali ini singgasanamu, Raja Iblis!','Lantai {save} bukan masalah lagi bagi kami.','Ingat kami? {name} tak pernah lupa jalan.','Sudah {visits} kali kami ke sini. Hari ini yang terakhir untukmu!','Para penggemar di kota menunggu cerita kami!','Kastil ini makin tinggi, tapi kami makin kuat.'];
const SLAYER_LINES=['Raja Iblis {lord} sudah kami tumbangkan. Kau berikutnya!','Kami pembunuh Raja Iblis. Gemetarlah!','Satu singgasana lagi untuk koleksi kami.'];
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
  {id:'iblis',n:'Demon',race:'iblis',job:'rajaIblis',d:'Semua monster +10% serangan.'},
  {id:'vampir',n:'Vampire',race:'manusia',skin:'#e8e0f0',hair:'#1a1a2a',job:'rajaIblis',d:'Raja menyerap 30% kerusakan menjadi nyawa.'},
  {id:'lich',n:'Lich',mon:{k:'hum',race:'skeleton',job:'mLich'},d:'Biaya kebangkitan monster -40%.'},
  {id:'orc',n:'Orc',mon:{k:'hum',race:'orc',job:'mOrcLord'},d:'Nyawa Raja +40%.'},
  {id:'succubus',n:'Succubus',mon:{k:'hum',race:'succubus',job:'mSuccubus'},d:'Kadang memikat petualang hingga berhenti menyerang.'},
  {id:'naga',n:'Dragon',mon:{k:'dragon2',c:'#8a1a2a',eye:'#ffd040'},sc:1.25,d:'Napas api ke seluruh party di ruang singgasana.'},
  {id:'oni',n:'Oni',mon:{k:'hum',race:'ogre',job:'mOgre'},tint:'#c82a2a',d:'Serangan Raja +40%.'},
  {id:'elfGelap',n:'Dark Elf',race:'elf',skin:'#7a6a9a',hair:'#e8e6f0',job:'rajaIblis',d:'Regenerasi mana kastil +50%.'},
  {id:'ksatria',n:'Hell Knight',mon:{k:'hum',race:'neraka',job:'mHellKnight'},d:'Pertahanan Raja +50%.'},
];

/* ---------- fasilitas (dipasang di petak lantai) ---------- */
const CHEST_RANK=['F','E','D','C','B','A','S','SS','SSS'];
const FIX={
  chest:{n:'Treasure Chest',cat:'peti'},
  duri:{n:'Spike Trap',cat:'jebakan',cost:60,dmg:.12,d:'Duri mencuat dari lantai.'},
  panah:{n:'Arrow Slit',cat:'jebakan',cost:110,dmg:.16,d:'Panah melesat dari dinding.'},
  gas:{n:'Sleep Gas',cat:'jebakan',cost:160,sleep:3,d:'Party tertidur 3 detik. Kombo dengan jebakan lain.'},
  baskom:{n:'Falling Bucket',cat:'jebakan',cost:90,dmg:.1,stun:1.2,d:'Baskom besi jatuh ke kepala. Pingsan sebentar.'},
  licin:{n:'Slippery Floor',cat:'jebakan',cost:140,slip:1,d:'Petualang terpeleset jatuh ke lantai bawah.'},
  lubang:{n:'Pit Trap',cat:'jebakan',cost:220,dmg:.18,fall:1,d:'Jatuh ke lantai bawah sambil terluka.'},
  apiT:{n:'Fire Jet',cat:'jebakan',cost:260,dmg:.2,burn:1,d:'Pipa api menyembur. Membakar.'},
  jaringT:{n:'Snare Net',cat:'jebakan',cost:180,root:3,d:'Menjerat satu petualang 3 detik.'},
  mimik:{n:'Mimic Chest',cat:'jebakan',cost:240,d:'Terlihat seperti peti harta. Saat dibuka, menggigit keras dan mencuri emas pembukanya.'},
  rest:{n:'Rest Spot',cat:'fasilitas',cost:300,d:'Petualang membayar emas untuk memulihkan diri dan menyimpan kemajuan.'},
  rahasia:{n:'Cracked Wall',cat:'fasilitas',cost:450,d:'Jalan rahasia menuju ruang monster rahasia. Hanya Thief/Ranger yang bisa menemukannya.'},
  obor:{n:'Purple Torch',cat:'dekor',cost:40,aura:2,d:'Menambah Aura Seram.'},
  patung:{n:'Gargoyle Statue',cat:'dekor',cost:120,aura:5,d:'Menambah Aura Seram.'},
  tengkorak:{n:'Skull Pile',cat:'dekor',cost:80,aura:4,d:'Menambah Aura Seram.'},
};
function chestCost(r){ return Math.round(40*Math.pow(2.05,CHEST_RANK.indexOf(r))); }
function chestValue(r){ return CHEST_RANK.indexOf(r); }
const THEMES=[
  {n:'Stone Cave',wall:'#3a3446',wall2:'#2e2a3a',floor:'#5a4e5e',acc:'#7a6a7e'},
  {n:'Old Tomb',wall:'#3e3a34',wall2:'#322e2a',floor:'#6a5e4a',acc:'#a89a7a'},
  {n:'Mushroom Forest',wall:'#28383a',wall2:'#1e2e30',floor:'#3a5a4a',acc:'#9ae0c0'},
  {n:'Crystal Cave',wall:'#2a2e4a',wall2:'#222640',floor:'#4a4e7a',acc:'#b0a0ff'},
  {n:'Lava Crater',wall:'#3e2420',wall2:'#301a18',floor:'#6a3a2a',acc:'#ff7a3a'},
  {n:'Ice Corridor',wall:'#2e3e4e',wall2:'#243444',floor:'#5a7a8e',acc:'#c8f0ff'},
  {n:'Black Palace',wall:'#24182a',wall2:'#1c1222',floor:'#4a2e4a',acc:'#e3b75e'},
  {n:'Void Abyss',wall:'#140e1e',wall2:'#0e0a16',floor:'#2e2240',acc:'#d060ff'},
];
function themeOf(f){ return THEMES[Math.floor(f/10)%THEMES.length]; }

/* ---------- perlengkapan monster & bahan ---------- */
const EQ_SLOT={senjata:'Weapon',zirah:'Armor',aksesori:'Accessory'};
const EQ_NAMES={senjata:['Fang Blade','Iron Claw','Rusty Sword','Bone Club','Black Spear','Hell Axe','Soul Scythe','Steel Horn','Bone Dagger','War Hammer'],zirah:['Leather Armor','Dragon Scale','Shadow Cloak','Stone Shell','Chainmail','Bone Armor','Iron Plate','Dark Robe'],aksesori:['Blood Ring','Fang Necklace','Cursed Charm','Thorn Crown','Moon Earring','Spirit Bracelet','Skull Amulet','Demon Eye']};
const EQ_PRE=['','Cracked ','','Sharp ','Cursed ','Ancient ','Grand ','Demonic '];
const BAHAN=['Taring Retak','Kulit Kasar','Bijih Besi','Kristal Mana','Sisik Langka','Inti Naga','Pecahan Bintang'];
