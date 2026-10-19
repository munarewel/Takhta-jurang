/* =====================================================================
   TAKHTA JURANG — bintang kelas (★1–★5) & nama bahasa Inggris
   ===================================================================== */
Object.assign(JOBS,{
  fistKing:{n:'Fist King',spr:'petarung',hp:64,atk:11,def:6,eva:.14,rng:16,grow:[9,1.9,.9],skill:{n:'Thousand Fists',cd:7,k:'multi',hits:7,m:.45},front:2},
  spearGod:{n:'Spear God',spr:'pendekarTombak',hp:66,atk:11,def:7,eva:.08,rng:16,grow:[9,1.9,1.1],skill:{n:'Heaven Piercer',cd:8,k:'pierce',m:2.3},front:3},
  iceQueen:{n:'Ice Queen',spr:'penyihirAir',hp:40,atk:11,def:3,eva:.06,rng:52,grow:[6,2,.5],skill:{n:'Absolute Zero',cd:10,k:'aoe',m:1.9},front:0,magic:1},
  arrowQueen:{n:'Arrow Queen',spr:'ratuPanah',hp:46,atk:12,def:4,eva:.12,rng:66,grow:[6,2.2,.5],skill:{n:'Rain of Arrows',cd:9,k:'multi',hits:5,m:.8},front:1},
  stormLord:{n:'Storm Lord',spr:'sageAgung',hp:44,atk:12,def:3,eva:.06,rng:54,grow:[6,2.3,.5],skill:{n:'Tempest',cd:10,k:'aoe',m:2.2},front:0,magic:1},
});
for(const k of Object.keys(JOBS)) if(!JOB_KEYS.includes(k)) JOB_KEYS.push(k);
Object.assign(JOB_LINES,{
  fistKing:['Tinjuku sudah cukup.','Satu pukulan, satu monster.'],spearGod:['Tombakku menembus apa pun.','Jarak adalah milikku.'],
  iceQueen:['Dingin sekali di sini… cocok.','Membekulah.'],arrowQueen:['Tak satu pun panahku meleset.','Hujan panah akan turun.'],
  stormLord:['Langit menurut padaku.','Petir, datanglah!'],swordmaster:['Pedang ini telah menebas seribu monster.','Berlututlah di hadapan Raja Pedang.'],
});
Object.assign(JOB_EL,{iceQueen:['es'],stormLord:['petir','angin'],arrowQueen:['angin','cahaya'],spearGod:['petir'],fistKing:['tanah']});
JOBS.swordmaster.n='Sword King'; JOBS.sage.n='Great Sage'; JOBS.sniper.spr='pemanah'; JOBS.alkemis.n='Alchemist';
const JOB_STAR={farmer:1,cook:1,miner:1,
  knight:2,mage:2,priest:2,archer:2,thief:2,lancer:2,monk:2,bard:2,cleric:2,hunter:2,alkemis:2,
  samurai:3,ninja:3,dualblade:3,berserker:3,ranger:3,paladin:3,necro:3,druid:3,summoner:3,axeman:3,hydromancer:3,aeromancer:3,geomancer:3,enchanter:3,beastmaster:3,tamer:3,duelist:3,
  dragoon:4,sniper:4,darkmage:4,runeKnight:4,weaponMaster:4,monsterHunter:4,fistKing:4,spearGod:4,iceQueen:4,
  swordmaster:5,arrowQueen:5,sage:5,saint:5,hero:5,stormLord:5};
for(const k of JOB_KEYS) JOBS[k].star=JOB_STAR[k]||2;
const STAR_MUL=[1,.85,1,1.12,1.28,1.5];
// peluang bintang per tingkat party: ★1..★5
const STAR_W={baru:[38,47,13,2,0],biasa:[18,44,28,9,1],veteran:[6,30,38,20,6],elite:[2,14,38,32,14],solo:[0,0,30,45,25]};
function starStr(n){ return '★'.repeat(n); }
function jobTag(k){ const J=JOBS[k]; return `${J.n} ${starStr(J.star)}`; }
function pickJobStar(tier){ const w=STAR_W[tier]||STAR_W.biasa; let r=rnd()*w.reduce((a,b)=>a+b,0), st=1; for(let i=0;i<5;i++){ r-=w[i]; if(r<0){ st=i+1; break; } }
  let pool=JOB_KEYS.filter(k=>JOBS[k].star===st&&k!=='hero'); if(!pool.length) pool=JOB_KEYS.filter(k=>k!=='hero'); return pick(pool); }
// nama skill petualang dalam bahasa Inggris
const SKILL_EN={knight:'Steel Guard',mage:'Fireball',priest:'Healing Light',archer:'Precise Shot',thief:'Shadow Strike',dualblade:'Blade Dance',lancer:'Piercing Thrust',monk:'Hundred Fists',
  berserker:'Rampage',paladin:'Holy Prayer',ranger:'Double Arrow',bard:'Battle Song',samurai:'Flash Iai',ninja:'Shadow Shuriken',necro:'Mass Curse',druid:"Nature's Blessing",alkemis:'Potion Bomb',
  summoner:'Spirit Call',sage:'Meteor',dragoon:'Dragon Lance',swordmaster:"King's Slash",sniper:'Heart Shot',axeman:'Axe Whirl',darkmage:'Black Flame',hunter:'Tracking Arrow',cleric:'Healing Potion',
  hydromancer:'Tidal Wave',aeromancer:'Mini Tornado',geomancer:'Stone Spear',enchanter:'Shining Weapon',runeKnight:'Rune Blade',beastmaster:'Pack Charge',saint:'Miracle',hero:"Hero's Slash",
  weaponMaster:'Thousand Weapons',duelist:'Elegant Thrust',miner:'Pickaxe Smash',cook:'Warm Soup',farmer:'Hoe Swing',monsterHunter:"Hunter's Slash",tamer:'Summon Mount'};
for(const k in SKILL_EN) if(JOBS[k]) JOBS[k].skill.n=SKILL_EN[k];
// perlengkapan khas tiap kelas (bisa jatuh saat petualang tewas)
const JOB_GEAR_EN={knight:[['Knight Sword','Longsword'],['Knight Armor','Tower Shield'],['Knight Badge']],mage:[['Magic Staff'],['Mage Robe'],['Mana Ring']],priest:[['Holy Mace'],['Priest Robe'],['Silver Rosary']],
  archer:[['Longbow'],['Archer Vest'],['Archer Gloves']],thief:[['Thief Dagger'],['Dark Cloak'],['Magic Key']],dualblade:[['Twin Blades'],['Light Armor'],['Blade Belt']],
  lancer:[['Long Spear'],['Lancer Armor'],['Small Banner']],monk:[['Fist Wraps'],['Monk Garb'],['Prayer Beads']],berserker:[['Giant Axe'],['Beast Hide'],['Fang Necklace']],
  paladin:[['Holy Sword'],['Holy Armor','Holy Shield'],['Light Pendant']],ranger:[['Ranger Bow'],['Forest Cloak'],['Worn Map']],bard:[['Lute'],['Bard Outfit'],['Feather Hat']],
  samurai:[['Katana'],['Samurai Armor'],['Shrine Charm']],ninja:[['Shuriken','Kunai'],['Ninja Garb'],['Ninja Headband']],necro:[['Skull Staff'],['Death Robe'],['Black Grimoire']],
  druid:[['Root Staff'],['Leaf Robe'],['Twig Crown']],alkemis:[['Potion Bomb'],['Alchemist Apron'],['Bottle Pouch']],summoner:[['Summoner Staff'],['Spirit Robe'],['Contract Stone']],
  sage:[['Sage Staff'],['Grand Robe'],['Ancient Tome']],dragoon:[['Dragon Lance'],['Dragon Armor'],['Dragon Crest']],swordmaster:[["King's Sword"],["Sword King's Plate"],["Champion's Belt"]],
  sniper:[['Sniper Bow'],['Camo Vest'],['Spyglass']],axeman:[['War Axe'],['Chainmail'],['Iron Bracer']],darkmage:[['Staff of Darkness'],['Black Robe'],['Dark Crystal Orb']],
  hunter:[['Hunting Bow'],['Leather Jacket'],['Trophy Fang']],cleric:[['Healing Staff'],['White Robe'],['Holy Potion']],hydromancer:[['Wave Staff'],['Sea Robe'],['Blue Pearl']],
  aeromancer:[['Wind Staff'],['Storm Robe'],['Eagle Feather']],geomancer:[['Stone Staff'],['Earth Robe'],['Philosopher Stone']],enchanter:[['Rune Staff'],['Enchanter Robe'],['Rune Ring']],
  runeKnight:[['Rune Blade'],['Rune Armor'],['Rune Crest']],beastmaster:[['Tamer Whip'],['Hide Vest'],['Beast Whistle']],saint:[['Saint Staff'],['Saint Robe'],['Little Halo']],
  hero:[["Hero's Sword"],["Hero's Armor"],["Hero's Crest"]],weaponMaster:[['Master Sword','Master Spear'],['Weapon Master Plate'],['Weapon Belt']],duelist:[['Rapier'],['Noble Shirt'],['White Gloves']],
  miner:[['Pickaxe'],['Mining Helmet'],['Mining Lamp']],cook:[['Kitchen Knife','Iron Pan'],['Chef Apron'],['Chef Hat']],farmer:[['Hoe'],['Farmer Clothes'],['Straw Hat']],
  monsterHunter:[['Monster Slayer Blade'],['Monster Hide Armor'],['Fang Trophy']],tamer:[['Tamer Whip'],['Small Saddle'],['Tamer Whistle']],
  fistKing:[['Dragon Gauntlets'],['Fist King Gi'],['Champion Belt']],spearGod:[['Heaven Spear'],['Spear God Armor'],['Thunder Tassel']],iceQueen:[['Frost Scepter'],['Ice Queen Gown'],['Snow Tiara']],
  arrowQueen:[['Queen Bow'],['Royal Hunter Cloak'],['Golden Quiver']],stormLord:[['Storm Staff'],['Tempest Robe'],['Thunder Crown']]};
for(const k in JOB_GEAR_EN) JOB_GEAR[k]=JOB_GEAR_EN[k];
