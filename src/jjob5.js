/* =====================================================================
   TAKHTA JURANG — kelas tambahan: Medic Ninja, Navigator, dll
   ===================================================================== */
const NEWJOBS2=[
 ['medicNinja','Medic Ninja',3,'healer',{n:'Healing Jutsu',cd:7,k:'heal',m:.35},'ninja',{base:'assassin',cloth:'#3a5a4a',pants:'#1a2a24'},'',['Luka kecil, biar kurawat.','Ninja medis tidak boleh tumbang duluan.'],[['Medical Kunai'],['Field Medic Garb'],['Herb Scroll']],['manusia','halfelf']],
 ['navigator','Navigator',2,'support',{n:'Chart Course',cd:12,k:'buff'},'spyglass',{base:'bangsawan',cloth:'#2a4a6a',pants:'#3a2a1a'},'angin',['Kompasku bilang… lewat sini. Mungkin.','Peta lantai ini sudah kugambar!'],[['Brass Spyglass'],['Navigator Coat'],['Star Compass']],['manusia','halfelf','beastkin']],
 ['captain','Captain',3,'melee',{n:"Captain's Order",cd:12,k:'buff'},'sword',{base:'pencuri',cloth:'#7a1a1a',pants:'#2a1a1a',trim:'#e3b75e'},'air',['Kru, ikuti aku!','Kapten tidak pernah meninggalkan kapalnya!'],[["Captain's Cutlass"],["Captain's Coat"],['Tricorn Hat']],['manusia','orc']],
 ['scout','Scout',2,'ranged',{n:'Throwing Knives',cd:6,k:'multi',hits:3,m:.7},'ninja',{base:'pencuri',cloth:'#5a6a3a'},'',['Aku lihat ada jalan rahasia di sana.','Biar aku jalan duluan.'],[['Throwing Knife'],['Scout Cloak'],['Field Lens']],['halfelf','goblin','kobold']],
 ['sentinel','Sentinel',3,'tank',{n:'Hold the Line',cd:12,k:'taunt'},'spear',{base:'kavaleri',cloth:'#4a5a6a'},'',['Tidak ada yang lewat selama aku berdiri.'],[['Sentinel Pike'],['Sentinel Mail'],['Watch Horn']],['dwarf','lizard']],
 ['kunoichi','Kunoichi',3,'rogue',{n:'Shadow Bloom',cd:7,k:'crit',m:2.4},'ninja',{base:'assassin',cloth:'#5a1a3a',pants:'#1a1018',female:1},'bayang',['Jangan lengah… aku di belakangmu.'],[['Silk Kunai'],['Kunoichi Garb'],['Poison Hairpin']]],
 ['swordSaint','Sword Saint',5,'melee',{n:'Thousand Petals',cd:8,k:'multi',hits:6,m:.75},'katana',{base:'pendekar',cloth:'#e8e0d0',pants:'#4a4a5a'},'',['Pedang ini tidak pernah ditarik dua kali.','…'],[['Saint Katana'],['Pilgrim Hakama'],['Bell Charm']]],
 ['harpooner','Harpooner',2,'melee',{n:'Harpoon Toss',cd:8,k:'pierce',m:1.7},'spear',{base:'pendekarTombak',cloth:'#3a5a7a'},'air',['Ikan besar? Monster besar? Sama saja.'],[['Whale Harpoon'],['Oilskin Vest'],['Rope Coil']],['lizard','orc']],
];
for(const [k,n,star,ty,skill,wpn,look,el,lines,gear,races,special] of NEWJOBS2){
  JOBS[k]=Object.assign({n,spr:look.base,look,skill,star},JSON.parse(JSON.stringify(JT[ty]))); if(special) JOBS[k].special=1; if(races) JOBS[k].races=races;
  if(!JOB_KEYS.includes(k)) JOB_KEYS.push(k); JOB_LINES[k]=lines; if(el) JOB_EL[k]=[el]; JOB_GEAR[k]=gear; JOB_WPN_NEW[k]=wpn; }
JOBS.scout.scout=1; JOBS.navigator.scout=1;
