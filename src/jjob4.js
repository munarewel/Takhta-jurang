/* =====================================================================
   TAKHTA JURANG — ras petualang tambahan & banyak kelas baru
   ===================================================================== */
Object.assign(RACE,{
  goblin:{nama:'Goblin',leg:3,tor:4,tw:6,skin:['#7fae4a','#6a9a3a','#8ab85a'],hair:['#2a2a1a','#4a3a1a'],eye:['#ffd040','#ff8a3a'],
    syl:[['Grik','Snag','Zug','Mok','Rat','Gob','Nix','Skab','Vrek','Bok','Pip','Krot'],['ka','nik','zit','gle','bo','rot','snit','lo']],fsyl:['ka','ra','li','na','bi']},
  orc:{nama:'Orc',leg:5,tor:7,tw:8,skin:['#7a8a4a','#6a7a3a','#8a9a5a'],hair:['#1a1a14','#3a2a1a'],eye:['#ff6a3a','#ffd040'],
    syl:[['Gor','Thra','Mug','Urz','Kra','Dur','Brak','Grom','Zog','Hruk'],['ash','nak','gul','tor','mok','dush','gar']],fsyl:['sha','ga','ra','ka']},
  lizard:{nama:'Lizardman',leg:5,tor:6,tw:6,skin:['#4a8a6a','#5a9a5a','#3a7a7a'],hair:['#3a6a4a'],eye:['#ffd040'],
    syl:[['Ss','Kss','Zha','Thes','Ixs','Sor','Vess'],['ith','ara','ess','ix','ash','oth']],fsyl:['ssa','ira','eth']},
  kobold:{nama:'Kobold',leg:3,tor:4,tw:5,skin:['#b87a4a','#a86a3a'],hair:['#8a5a3a'],eye:['#ffd040'],
    syl:[['Yip','Kib','Rux','Tik','Dob','Mip'],['pip','o','ik','by','ret']],fsyl:['pi','ya','ki']},
});
const RACE_EN={manusia:'Human',elf:'Elf',dwarf:'Dwarf',beastkin:'Beastkin',iblis:'Demon',halfelf:'Half-Elf',goblin:'Goblin',orc:'Orc',lizard:'Lizardman',kobold:'Kobold'};
function raceName(r){ return RACE_EN[r]||(RACE[r]&&RACE[r].nama)||r; }
ADV_RACES.length=0; for(const [r,w] of [['manusia',40],['elf',10],['dwarf',10],['beastkin',12],['halfelf',6],['iblis',6],['goblin',6],['orc',5],['lizard',3],['kobold',2]]) for(let i=0;i<w;i++) ADV_RACES.push(r);
const RACE_LINES={goblin:['Maaf, saudara-saudara goblin di sini… aku sudah memilih jalan lain.','Dulu aku menjarah desa. Sekarang aku melindunginya.','Jangan lihat aku begitu! Aku goblin baik-baik!'],
  orc:['Orc juga bisa jadi pahlawan!','Kapakku untuk kebaikan sekarang.'],iblis:['Takhta itu seharusnya milik bangsaku… bukan milikmu.','Sesama iblis, jangan tersinggung ya.'],
  lizard:['Ssss… lembap sekali di sini. Aku suka.'],kobold:['Yip! Ada harta! Yip yip!'],dwarf:['Batu kastil ini jelek. Siapa tukangnya?'],elf:['Kastil ini tidak punya selera estetika.'],beastkin:['Aku mencium bau monster dari sini.']};
/* ---------- kelas baru ---------- */
const JT={tank:{hp:70,atk:7,def:10,eva:.03,rng:16,grow:[10,1.2,1.5],front:3},melee:{hp:56,atk:10,def:5,eva:.1,rng:16,grow:[8,1.8,.8],front:2},
  heavy:{hp:66,atk:11,def:5,eva:.03,rng:16,grow:[9,1.9,.8],front:3},rogue:{hp:44,atk:9,def:3,eva:.2,rng:16,grow:[6,1.7,.5],front:2},
  ranged:{hp:42,atk:9,def:3,eva:.1,rng:56,grow:[6,1.6,.5],front:1},caster:{hp:36,atk:10,def:2,eva:.05,rng:50,grow:[5,1.9,.4],front:0,magic:1},
  healer:{hp:40,atk:5,def:3,eva:.05,rng:44,grow:[6,.8,.6],front:0,magic:1},support:{hp:44,atk:7,def:4,eva:.07,rng:40,grow:[6,1.1,.6],front:1}};
// [key, nama, ★, tipe, skill, senjata, look, elemen, ucapan, perlengkapan, ras-bias, khusus]
const NEWJOBS=[
 ['guardian','Guardian',3,'tank',{n:'Provoke',cd:12,k:'taunt'},'shield',{base:'ksatria',cloth:'#5a6a7a',pants:'#3a4250'},'',['Semua monster, lihat ke sini!','Di belakangku, aman.'],[['Kite Shield','Iron Bulwark'],['Guardian Plate'],['Oath Medal']],['dwarf','manusia']],
 ['templar','Templar',4,'tank',{n:'Holy Bulwark',cd:12,k:'shield'},'warhammer',{base:'paladin',cloth:'#e8e0d0',trim:'#c83a3a'},'suci',['Iman adalah perisai terkuat.','Demi kuil suci!'],[['Templar Hammer'],['Templar Plate'],['Red Cross Tabard']]],
 ['crusader','Crusader',3,'melee',{n:'Crusader Strike',cd:7,k:'crit',m:2.1},'sword',{base:'ksatria',cloth:'#c8c0b0',trim:'#c83a3a'},'cahaya',['Perang suci dimulai!','Deus vult!'],[['Crusader Blade'],['Crusader Mail'],['Pilgrim Badge']]],
 ['shieldHero','Shield Hero',5,'tank',{n:'Guardian Barrier',cd:9,k:'shield'},'shield',{base:'ksatria',cloth:'#3a5a3a',pants:'#2a3a2a'},'',['Aku cuma punya perisai. Tapi tak satu pun temanku akan jatuh.','Serang saja, aku yang menahan!'],[['Legendary Shield'],['Hero Cloak'],['Bond Pendant']],null,1],
 ['vanguard','Vanguard',3,'melee',{n:'Breakthrough',cd:8,k:'pierce',m:1.8},'spear',{base:'kavaleri',cloth:'#4a5a8a'},'',['Barisan depan, maju!'],[['Vanguard Pike'],['Vanguard Armor'],['Signal Horn']]],
 ['juggernaut','Juggernaut',4,'heavy',{n:'Earthshaker',cd:10,k:'aoe',m:1.7},'warhammer',{base:'berserker',cloth:'#3a3a3a',pants:'#2a2a2a'},'batu',['Tidak ada yang bisa menghentikanku.','BOOM.'],[['Siege Hammer'],['Juggernaut Plate'],['Iron Collar']],['orc','dwarf']],
 ['darkKnight','Dark Knight',4,'heavy',{n:'Soul Eater',cd:8,k:'drain',m:1.9},'darkblade',{base:'ksatria',cloth:'#2a2030',pants:'#1a1420',trim:'#8a1a3a'},'bayang',['Kegelapan ini adalah kekuatanku.','Jiwamu akan memberiku makan.'],[['Abyssal Blade'],['Dark Plate'],['Cursed Sigil']],['iblis','manusia']],
 ['demonic','Demonic',4,'heavy',{n:'Demon Form',cd:14,k:'rage'},'scythe',{base:'penyihirHitam',cloth:'#5a0f1e',pants:'#2a0a14'},'neraka',['Darah iblisku mendidih!','Kau pikir hanya kau iblis di sini?'],[['Hellfire Scythe'],['Demonic Hide'],['Horned Circlet']],['iblis']],
 ['demonHunter','Demon Hunter',4,'ranged',{n:"Hunter's Volley",cd:7,k:'multi',hits:4,m:.75},'gun',{base:'pemburu',cloth:'#3a2a2a',pants:'#1a1a1a'},'suci',['Iblis adalah buruanku.','Raja Iblis, kepalamu ada harganya.'],[['Silver Pistol'],['Hunter Longcoat'],['Holy Bullet Pouch']]],
 ['reaper','Reaper',4,'rogue',{n:'Grim Harvest',cd:9,k:'aoe',m:1.6},'scythe',{base:'assassin',cloth:'#1a1a22',pants:'#101014'},'bayang',['Waktumu sudah habis.','Aku datang menjemput.'],[['Reaper Scythe'],['Shroud of Night'],['Hourglass Charm']],['iblis','manusia']],
 ['gladiator','Gladiator',3,'melee',{n:'Arena Finisher',cd:7,k:'crit',m:2.3},'sword',{base:'petarung',cloth:'#a8452c',pants:'#6a2a1a'},'',['Penonton! Lihat ini!','Arena atau dungeon, sama saja.'],[['Gladius'],['Gladiator Harness'],['Champion Laurel']],['orc','manusia']],
 ['barbarian','Barbarian',2,'heavy',{n:'War Frenzy',cd:14,k:'rage'},'bigaxe',{base:'berserker',cloth:'#7a5a3a'},'',['GRAAAH!','Aku tidak butuh rencana!'],[['Bone Axe'],['Fur Loincloth'],['Tooth Necklace']],['orc','beastkin']],
 ['brawler','Brawler',2,'melee',{n:'Combo Rush',cd:7,k:'multi',hits:5,m:.5},'claw',{base:'petarung',cloth:'#4a6a8a'},'',['Ayo adu jotos!','Tinjuku sudah gatal.'],[['Brass Knuckles'],['Brawler Vest'],['Fight Tape']],['beastkin','orc']],
 ['bladeDancer','Blade Dancer',4,'rogue',{n:'Crimson Waltz',cd:7,k:'multi',hits:5,m:.65},'twin',{base:'assassin',cloth:'#c83a7a',pants:'#5a1a3a'},'angin',['Mari menari, monster.','Satu, dua, tiga… tebas!'],[['Dancing Blades'],['Silk Garb'],['Bell Anklet']],['elf','manusia']],
 ['assassin','Assassin',3,'rogue',{n:'Backstab',cd:7,k:'crit',m:2.6},'dagger',{base:'assassin',cloth:'#2a2a3a'},'bayang',['…','Tidak ada yang melihatku datang.'],[['Assassin Blade'],['Shadow Cloak'],['Poison Vial']],['halfelf','goblin']],
 ['spellblade','Spellblade',4,'melee',{n:'Arcane Edge',cd:8,k:'aoe',m:1.6},'runeblade',{base:'ksatria',cloth:'#4a3a8a',pants:'#2a2a4a'},'petir',['Pedang dan sihir, satu napas.'],[['Arcane Saber'],['Runed Coat'],['Mana Gem']],['elf','halfelf']],
 ['warlord','Warlord',5,'heavy',{n:"Conqueror's Roar",cd:12,k:'buff'},'greatsword',{base:'ksatriaNaga',cloth:'#6a1a1a',pants:'#3a0a0a'},'',['Pasukanku, serbu!','Kastil ini akan jadi bentengku.'],[['Warlord Greatsword'],['Warlord Plate'],['Conqueror Crown']],['orc','manusia']],
 ['valkyrie','Valkyrie',4,'melee',{n:'Valhalla Dive',cd:8,k:'pierce',m:2.2},'spearGold',{base:'kavaleri',cloth:'#c8d0e0',pants:'#8a9ab8'},'cahaya',['Para pemberani akan diantar ke aula abadi.'],[['Valkyrie Spear'],['Winged Mail'],['Feather Helm']]],
 ['slayer','Slayer',3,'heavy',{n:'Execute',cd:8,k:'crit',m:2.5},'greatsword',{base:'hunterHV',cloth:'#4a3a2a'},'',['Monster besar? Bagus.'],[['Slayer Blade'],['Scarred Leather'],['Kill Tally']]],
 ['gunslinger','Gunslinger',3,'ranged',{n:'Fan the Hammer',cd:6,k:'multi',hits:6,m:.4},'gun',{base:'pemburu',cloth:'#6a4a2a',pants:'#3a2a1a'},'',['Tangan lebih cepat dari mantra.','Dor dor dor!'],[['Six-Shooter'],['Duster Coat'],['Lucky Bullet']]],
 ['musketeer','Musketeer',3,'ranged',{n:'Aimed Shot',cd:8,k:'snipe',m:2.6},'gun',{base:'bangsawan',cloth:'#3a4a8a'},'',['Satu untuk semua!','Isi peluru… tembak!'],[['Long Musket'],['Musketeer Tabard'],['Plumed Hat']]],
 ['engineer','Engineer',3,'support',{n:'Turret Barrage',cd:9,k:'multi',hits:4,m:.7},'bomb',{base:'penempa',cloth:'#8a6a3a'},'baja',['Mesin ini akan meratakan lantai!','Jangan sentuh kabel merahnya.'],[['Wrench Cannon'],['Work Overalls'],['Gear Kit']],['dwarf','kobold','goblin']],
 ['bomber','Bomber',2,'support',{n:'Big Boom',cd:9,k:'aoe',m:1.6},'bomb',{base:'pencuri',cloth:'#5a3a2a'},'api',['Hihihi… BOOM!','Ada yang lihat korekku?'],[['Satchel Bomb'],['Blast Apron'],['Fuse Kit']],['goblin','kobold']],
 ['cannoneer','Cannoneer',4,'ranged',{n:'Cannon Volley',cd:9,k:'aoe',m:1.9},'gun',{base:'pendekarKapak',cloth:'#2a3a5a'},'api',['Meriam siap! TEMBAK!'],[['Hand Cannon'],['Gunner Coat'],['Powder Keg']],['dwarf','orc']],
 ['spiritArcher','Spirit Archer',4,'ranged',{n:'Spirit Arrows',cd:7,k:'multi',hits:3,m:1},'bowGold',{base:'ksatriaPemanah',cloth:'#5a8ab8'},'bulan',['Roh hutan mengarahkan panahku.'],[['Spirit Bow'],['Moonweave Cloak'],['Spirit Quiver']],['elf']],
 ['warlock','Warlock',3,'caster',{n:'Life Siphon',cd:8,k:'drain',m:1.6},'tome',{base:'penyihirHitam',cloth:'#3a1a4a'},'bayang',['Perjanjianku dengan kegelapan menuntut korban.'],[['Pact Grimoire'],['Warlock Robe'],['Eldritch Eye']],['iblis','halfelf']],
 ['shaman','Shaman',2,'healer',{n:'Spirit Totem',cd:8,k:'heal',m:.3},'staffSkull',{base:'druid',cloth:'#6a4a2a'},'petir',['Roh leluhur, lindungi kami.'],[['Totem Staff'],['Shaman Hide'],['Spirit Feather']],['orc','goblin','beastkin']],
 ['pyromancer','Pyromancer',3,'caster',{n:'Inferno',cd:9,k:'aoe',m:1.8},'staff',{base:'penyihirApi',cloth:'#c83a1a'},'api',['Semuanya akan terbakar!','Hangat, ya?'],[['Ember Rod'],['Flame Robe'],['Fire Opal']]],
 ['cryomancer','Cryomancer',3,'caster',{n:'Blizzard',cd:9,k:'aoe',m:1.7},'staffIce',{base:'penyihirAir',cloth:'#a8c8e8'},'es',['Dinginnya sampai ke tulang.'],[['Frost Wand'],['Snowweave Robe'],['Ice Crystal']]],
 ['elementalist','Elementalist',4,'caster',{n:'Prismatic Storm',cd:10,k:'aoe',m:2},'staffStorm',{base:'sageAgung',cloth:'#4a8a6a'},'angin',['Empat elemen tunduk padaku.'],[['Prism Staff'],['Elemental Robe'],['Four-Stone Ring']],['elf']],
 ['chronomancer','Chronomancer',5,'caster',{n:'Time Warp',cd:12,k:'buff'},'tome',{base:'sageAgung',cloth:'#c8a050',pants:'#6a5a2a'},'',['Aku sudah melihat akhir pertarungan ini.','Waktu adalah sungai. Aku perahunya.'],[['Clockwork Tome'],['Timeless Robe'],['Golden Hourglass']]],
 ['illusionist','Illusionist',3,'caster',{n:'Mirror Image',cd:8,k:'multi',hits:3,m:.9},'tome',{base:'enchanter',cloth:'#c86aa8'},'mimpi',['Yang kau lihat… bukan aku.'],[['Mirage Book'],['Shimmer Robe'],['Mirror Charm']],['halfelf','elf']],
 ['bloodMage','Blood Mage',4,'caster',{n:'Blood Pact',cd:8,k:'drain',m:2},'tome',{base:'penyihirHitam',cloth:'#8a1a2a'},'darah',['Darahku… darahmu… sama saja.'],[['Blood Codex'],['Crimson Robe'],['Vein Ring']],['iblis']],
 ['demonologist','Demonologist',4,'caster',{n:'Imp Swarm',cd:9,k:'multi',hits:4,m:.8},'tome',{base:'necromancer',cloth:'#6a1a1a'},'neraka',['Keluarlah, imp-imp kecilku!'],[['Infernal Codex'],['Summoner Robe'],['Pentagram Amulet']],['iblis']],
 ['puppeteer','Puppeteer',3,'support',{n:'Marionette',cd:8,k:'multi',hits:4,m:.7},'whip',{base:'bard',cloth:'#5a3a6a'},'',['Menarilah untukku, bonekaku.'],[['Puppet Strings'],['Theater Coat'],['Doll Head']]],
 ['witch','Witch',3,'caster',{n:'Hex',cd:9,k:'aoe',m:1.6},'staffLeaf',{base:'penyihir',cloth:'#2a2a3a'},'racun',['Hihihi… satu kutukan kecil.'],[['Crooked Wand'],['Witch Dress'],['Black Cat Charm']]],
 ['oracle','Oracle',4,'healer',{n:'Foresight',cd:9,k:'heal',m:.45},'staffGold',{base:'pendeta',cloth:'#f0e8c8'},'cahaya',['Aku sudah melihat masa depan. Kita menang.'],[['Seer Staff'],['Oracle Veil'],['Crystal Eye']]],
 ['bishop','Bishop',4,'healer',{n:'Grand Heal',cd:8,k:'heal',m:.5},'staffCross',{base:'pendeta',cloth:'#e8e0f0',trim:'#c8a050'},'suci',['Berkat untuk semua.'],[['Bishop Crosier'],['Bishop Vestment'],['Holy Mitre']]],
 ['medic','Medic',2,'healer',{n:'First Aid',cd:6,k:'heal',m:.25},'flask',{base:'tabib',cloth:'#e8e8e8'},'',['Tahan, kubalut dulu!','Jangan mati di depanku!'],[['Bandage Kit'],['Medic Coat'],['Herb Pouch']]],
 ['exorcist','Exorcist',3,'caster',{n:'Banish',cd:9,k:'aoe',m:1.6},'tome',{base:'pendeta',cloth:'#2a2a3a'},'suci',['Kembalilah ke neraka!'],[['Rite Book'],['Exorcist Coat'],['Salt Charm']]],
 ['inquisitor','Inquisitor',4,'melee',{n:'Judgment',cd:8,k:'crit',m:2.3},'mace',{base:'paladin',cloth:'#1a1a1a',trim:'#c83a3a'},'suci',['Kau dituduh menjadi iblis. Hukumannya mati.'],[['Judgment Mace'],['Inquisitor Coat'],['Brand Iron']]],
 ['dancer','Dancer',2,'support',{n:'War Dance',cd:12,k:'buff'},'twin',{base:'bard',cloth:'#e86a9a'},'',['Ikuti iramaku!'],[['Dancing Fans'],['Silk Costume'],['Ankle Bells']]],
 ['trickster','Trickster',3,'rogue',{n:'Dirty Trick',cd:7,k:'crit',m:2.2},'dagger',{base:'pencuri',cloth:'#5a8a3a'},'',['Hehe, kena kau!'],[['Trick Dagger'],['Patchwork Coat'],['Loaded Dice']],['goblin','kobold','halfelf']],
 ['pirate','Pirate',2,'melee',{n:'Cutlass Flurry',cd:7,k:'multi',hits:3,m:.8},'sword',{base:'pencuri',cloth:'#a83a3a'},'air',['Yo-ho! Mana hartanya?'],[['Cutlass'],['Pirate Coat'],['Gold Earring']]],
 ['battleMage','Battle Mage',3,'melee',{n:'Arcane Smash',cd:8,k:'aoe',m:1.5},'warhammer',{base:'penyihir',cloth:'#3a5a8a'},'petir',['Kenapa tidak keduanya: sihir DAN palu?'],[['Rune Hammer'],['Battle Robe'],['Spark Ring']],['dwarf']],
];
const JOB_WPN_NEW={};
for(const [k,n,star,ty,skill,wpn,look,el,lines,gear,races,special] of NEWJOBS){
  JOBS[k]=Object.assign({n,spr:look.base,look,skill,star},JSON.parse(JSON.stringify(JT[ty]))); if(special) JOBS[k].special=1; if(races) JOBS[k].races=races;
  if(!JOB_KEYS.includes(k)) JOB_KEYS.push(k); JOB_LINES[k]=lines; if(el) JOB_EL[k]=[el]; JOB_GEAR[k]=gear; JOB_WPN_NEW[k]=wpn; }
// bias ras untuk kelas lama
Object.assign(JOBS.axeman,{races:['dwarf','orc']}); Object.assign(JOBS.miner,{races:['dwarf','kobold']}); Object.assign(JOBS.ranger,{races:['elf','halfelf']}); Object.assign(JOBS.archer,{races:['elf']});
Object.assign(JOBS.monk,{races:['beastkin']}); Object.assign(JOBS.berserker,{races:['orc','beastkin']}); Object.assign(JOBS.thief,{races:['goblin','kobold','halfelf']}); Object.assign(JOBS.darkmage,{races:['iblis']});
Object.assign(JOBS.necro,{races:['iblis']}); Object.assign(JOBS.druid,{races:['elf']}); Object.assign(JOBS.hunter,{races:['beastkin','lizard']}); Object.assign(JOBS.weaponMaster,{races:['dwarf']});
function pickJobStar(tier){ const w=STAR_W[tier]||STAR_W.biasa; let r=rnd()*w.reduce((a,b)=>a+b,0), st=1; for(let i=0;i<5;i++){ r-=w[i]; if(r<0){ st=i+1; break; } }
  let pool=JOB_KEYS.filter(k=>JOBS[k].star===st&&k!=='hero'&&!JOBS[k].special); if(!pool.length) pool=JOB_KEYS.filter(k=>k!=='hero'&&!JOBS[k].special); return pick(pool); }
