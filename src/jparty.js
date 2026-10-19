/* =====================================================================
   TAKHTA JURANG — party bertema, nama party (Inggris), orang dunia lain
   ===================================================================== */
const P_ADJ=['Silver','Crimson','Iron','Golden','Wandering','Black','Broken','Last','Storm','Grave','Moonlit','Burning','Frozen','Howling','Silent','Shattered','Rusty','Lucky','Wild','Holy',
  'Twilight','Scarlet','Azure','Emerald','Hollow','Rising','Fallen','Bold','Little','Lonely','Stubborn','Hungry','Dawn','Midnight','Thunder','Velvet','Ashen','Bright','Brave','Cursed',
  'Merry','Gentle','Wicked','Eternal','Northern','Southern','Ancient','Reckless','Humble','Shining','Thorned','Stray','Valiant','Bleeding','Sleepless','Restless','Copper','Jade','Ivory','Obsidian'];
const P_NOUN=['Fang','Blade','Star','Shield','Wing','Flame','Eye','Oath','Wolf','Moon','Rose','Banner','Path','Light','Crown','Hound','Lantern','Raven','Lion','Spear',
  'Arrow','Hammer','Thorn','Compass','Anchor','Feather','Tusk','Claw','Bell','Candle','Mask','Chain','Vow','Ember','Gale','Tide','Stone','Root','Horn','Sparrow',
  'Fox','Bear','Serpent','Hawk','Stag','Owl','Dagger','Gauntlet','Cloak','Helm','Kettle','Boot','Lute','Coin','Key','Rabbit','Boar','Crow','Mantis','Phoenix'];
const P_PLACE=['Eldoria','Valemont','Greyhaven','Ashford','Brightwater','Stormhold','Thornwick','Dunmere','Ravenreach','Silverbrook','Westmarch','Oakshade','Frostvale','Sunspire','Mistfall','Ironhill'];
function pl(w){ if(/(s|x|ch|sh)$/.test(w)) return w+'es'; if(w==='Wolf') return 'Wolves'; if(w==='Thief') return 'Thieves'; return w+'s'; }
const P_FORM=[
  ()=>`${pick(P_ADJ)} ${pick(P_NOUN)}`,()=>`The ${pick(P_ADJ)} ${pl(pick(P_NOUN))}`,()=>`${pl(pick(P_NOUN))} of ${pick(P_PLACE)}`,()=>`Order of the ${pick(P_ADJ)} ${pick(P_NOUN)}`,
  ()=>`${pick(P_ADJ)} ${pick(P_NOUN)} Company`,()=>`${pick(P_PLACE)} ${pl(pick(P_NOUN))}`,()=>`House of the ${pick(P_NOUN)}`,()=>`${pick(P_NOUN)} & ${pick(P_NOUN)}`,
  ()=>`The ${pick(P_NOUN)} Brigade`,()=>`${pick(P_ADJ)} ${pick(P_NOUN)} Guild`,()=>`Seven ${pl(pick(P_NOUN))}`,()=>`Sons of the ${pick(P_ADJ)} ${pick(P_NOUN)}`,()=>`Daughters of the ${pick(P_NOUN)}`];
function genPartyName(){ return pick(P_FORM)(); }
/* arketipe: j=daftar job (dipilih acak), sz=[min,max], tier=paksa tingkat, race, sx, n=nama, q=ucapan masuk, lead=gelar pemimpin */
const PARTY_THEME=[
  {id:'choir',j:['priest','cleric','priest','saint'],sz:[3,5],n:['The Holy Choir','Sisters of Mercy','Hymn of {P}','Choir of the Silver Bell','Angels of {P}'],q:['Haleluya~ ♪ Kami datang menyucikan tempat ini!','Satu, dua, tiga… nyanyikan pujian!','Monster pun bisa disembuhkan… dengan doa. Atau gada.','Tidak ada yang terluka hari ini. Kecuali monsternya.'],lead:'Choir Mother'},
  {id:'cult',j:['necro','darkmage','priest','necro'],sz:[3,5],n:['Cult of the Crimson Moon','Children of the Black Sun','The Eclipse Order','Brotherhood of the Hollow Eye','Disciples of the Abyss'],q:['Raja Iblis… kami datang menyembahmu. Lalu mengambil kekuatanmu.','Darah untuk bulan merah…','Jangan takut. Kami hanya meminjam jiwamu sebentar.','Ritual akan dimulai di singgasanamu.'],lead:'High Priest'},
  {id:'farmer',j:['farmer','farmer','cook','miner'],sz:[3,5],tier:'baru',n:["Farmers' Union",'Turnip Brigade','The Angry Villagers','Pitchfork Patrol','Harvest Militia'],q:['Monster kalian makan sapiku! Ganti rugi!','Panen gagal gara-gara kastil ini!','Cangkul siap, keranjang siap!','Kalau menang, kita pulang bawa daging naga.']},
  {id:'kitchen',j:['cook','cook','cook','hunter'],sz:[3,4],n:['Kitchen Brigade','The Hungry Chefs','Five-Star Stew','Monster Gourmet Club','Fork & Fang'],q:['Malam ini kita masak sup naga!','Daging slime itu kenyal, katanya enak.','Ada yang bawa garam?','Menu hari ini: monster panggang!'],lead:'Head Chef'},
  {id:'miner',j:['miner','miner','miner','knight'],sz:[3,4],n:["Miners' Guild",'Deep Pick Company','The Ore Diggers','Stonebreakers'],q:['Dinding kastil ini pasti ada mithrilnya.','Gali, gali, gali!','Bau logam… ada bijih di lantai atas!']},
  {id:'band',j:['bard','bard','bard','bard'],sz:[3,4],n:['The Traveling Minstrels','Lute & Loot','The Off-Key Quartet','Ballad of {N}','Echoes of {P}'],q:["Lagu baru: 'Raja Iblis yang Malang'. Pasti hit!",'Satu-dua-tiga-empat!','Kami cari inspirasi untuk lagu horor.','Jangan lupa tepuk tangan, monster-monster!']},
  {id:'coven',j:['necro','necro','necro','darkmage'],sz:[3,4],n:['Coven of Bones','The Gravecallers','Whispering Tomb','Ossuary Circle'],q:['Monster yang mati di sini… akan jadi milik kami.','Bau kematian. Sempurna.','Tulang-tulang ini masih hangat.']},
  {id:'ninja',j:['ninja','ninja','thief','ninja'],sz:[3,5],n:['Shadow Leaf Clan','The Silent Fang','Clan of the Hidden Moon','Night Crane Clan'],q:['…','(mereka masuk tanpa suara sedikit pun)','Target: Raja Iblis. Misi dimulai.','Jangan sampai terlihat.']},
  {id:'ronin',j:['samurai','samurai','samurai','duelist'],sz:[3,5],n:['Seven Ronin','Way of the Falling Blade','The Wandering Swords','Cherry Blossom Blades'],q:['Pedang kami tidak berbohong.','Kehormatan lebih berat dari nyawa.','Satu tebasan, satu monster.']},
  {id:'knights',j:['knight','paladin','knight','lancer','priest'],sz:[4,5],n:['Order of the {C} Rose','Knights of the {C} Lion','The Royal Vanguard','Knights of {P}'],q:['Demi Raja dan Tanah Air!','Perisai rapat! Maju!','Seorang ksatria tidak pernah mundur.'],lead:'Commander'},
  {id:'archers',j:['archer','ranger','hunter','sniper'],sz:[3,4],n:['Bullseye Club','The Quiver Sisters','Rain of Arrows','Hawkeye Society'],q:['Taruhan: siapa yang kena monster duluan?','Jangan berdiri di depanku.','Satu panah, satu nyawa.']},
  {id:'academy',j:['mage','hydromancer','aeromancer','geomancer','mage'],sz:[3,5],tier:'baru',n:['Academy Field Trip','Class 3-B','The Apprentice Circle','First-Year Mages'],q:['Pak guru, ini dihitung nilai ujian kan?','Jangan bakar perpustakaannya lagi!','Aku lupa mantra apinya…','Kalau lulus, aku boleh pulang?']},
  {id:'horde',j:['berserker','axeman','berserker','berserker'],sz:[3,5],n:['The Blood Horde','Axe & Rage','Screaming Skulls','Red Tusk Warband'],q:['AAAAARGH!','Yang paling banyak membunuh dapat bir gratis!','KAPAK! DARAH! MONSTER!']},
  {id:'hunters',j:['monsterHunter','hunter','tamer','monsterHunter'],sz:[3,4],n:["Hunter's Lodge",'The Trophy Takers','Big Game Society','Beast Bane'],q:['Kepala monster di sini laku mahal.','Bawa jaring, bawa tali.','Trofi berikutnya: Raja Iblis.']},
  {id:'tamers',j:['beastmaster','tamer','tamer'],sz:[2,4],n:["Beast Tamers' Circus",'The Wild Whistle','Leash & Saddle'],q:['Monster ini lucu! Boleh kubawa pulang?','Jangan takut, ini cuma jinak sedikit.','Aku mau menjinakkan naga!']},
  {id:'treasure',j:['thief','ranger','miner','thief'],sz:[3,4],n:['Treasure Hunters Inc.','Golden Compass','Loot Goblins','X Marks the Spot'],q:['Peti, peti, peti!','Kami di sini bukan buat monsternya. Cuma hartanya.','Peta ini bilang ada harta di lantai atas!']},
  {id:'dragon',j:['dragoon','knight','mage','dragoon'],sz:[3,5],n:['Dragon Slayers','Wyrmbane','Scale Breakers','Ashes of the Wyrm'],q:['Ada naga di sini? Bagus.','Tombak kami haus darah naga.','Sisik naga dijual mahal di kota.']},
  {id:'retired',j:null,sz:[3,4],tier:'veteran',lvMul:1.3,n:['The Old Guard','Retired But Not Tired','Grandpa’s Party','Silver Hairs'],q:['Dulu dungeon lebih susah, nak.','Punggungku… tapi ayo!','Ini petualangan terakhir sebelum pensiun. Janji.','Dulu Raja Iblis itu lebih seram.']},
  {id:'debt',j:['thief','axeman','berserker','knight'],sz:[3,4],n:['Debt Collectors','The Interest Rate','Late Fee Brothers'],q:['Raja Iblis, utangmu sudah jatuh tempo!','Bayar atau kami sita singgasanamu.','Bunganya naik tiap lantai.']},
  {id:'stream',j:['bard','mage','archer','thief'],sz:[2,4],n:['Like & Subscribe','Live from the Abyss','The Viral Squad','Clickbait Crew'],q:['Halo guys! Hari ini kita review dungeon Raja Iblis!','Jangan lupa like ya!','Konten ini bakal viral!','Chat bilang kita harus buka peti itu!']},
  {id:'tourist',j:['farmer','cook','bard','priest'],sz:[2,4],tier:'baru',n:['Lost Tourists','Wrong Turn Party','Sightseeing Tour','Honeymoon Detour'],q:['Permisi, ini jalan ke pemandian air panas?','Kok gelap ya?','Foto dulu di depan monster!','Kata brosur, kastil ini ramah keluarga…']},
  {id:'twins',j:['dualblade','mage','ninja','archer'],sz:[2,2],n:['The {N} Twins','Mirror Siblings','Two of a Kind'],q:['Kami selalu berdua.','Kakak kiri, aku kanan!','Kalau satu jatuh, yang lain marah.']},
  {id:'couple',j:['knight','priest'],fixed:1,sz:[2,2],n:['Honeymoon Party','Till Death Do Us Part','Hearts & Shields'],q:['Sayang, hati-hati ya.','Ini bulan madu kami. Romantis, kan?','Kalau kamu jatuh, aku angkat.']},
  {id:'family',j:['knight','priest','farmer','cook','archer'],fixed:1,sz:[4,5],n:['{N}’s Family','Family Picnic','The Weekend Outing'],q:['Anak-anak, jangan jauh-jauh dari Ayah!','Ibu bawa bekal!','Ayah, aku mau pipis…']},
  {id:'inquisition',j:['paladin','priest','saint','paladin'],sz:[3,5],n:['The Holy Inquisition','Purifiers of {P}','Pyre of Judgment','Order of the White Flame'],q:['Iblis harus dibakar. Semuanya.','Bertobatlah… atau terbakar.','Kami datang membawa api suci.'],lead:'Grand Inquisitor'},
  {id:'plague',j:['alkemis','cleric','alkemis'],sz:[2,4],n:['Plague Doctors','The Beaked Ones','Black Vial Society'],q:['Kastil ini terinfeksi. Perlu… pengobatan.','Tarik napas. Ini cuma asap obat.','Jangan lepas topengmu.']},
  {id:'witch',j:['darkmage','druid','alkemis','darkmage'],sz:[3,4],sx:'f',n:['Coven of Thorns','The Cauldron Sisters','Witches of {P}','Midnight Broom Club'],q:['Kami butuh mata kodok dan taring naga.','Hihihi… sup malam ini akan istimewa.','Sapu kami parkir di luar.']},
  {id:'druid',j:['druid','druid','ranger'],sz:[3,4],n:['Circle of the Old Oak','Greenwardens','Moss & Root'],q:['Hutan menangis karena kastil ini.','Akar akan merobohkan dinding batumu.']},
  {id:'elements',j:['hydromancer','aeromancer','geomancer','mage'],fixed:1,sz:[4,4],n:['The Four Elements','Elemental Council','Quartet of {P}'],q:['Api, air, angin, tanah. Siap.','Elemen apa pun monsternya, kami punya jawabannya.']},
  {id:'rune',j:['enchanter','runeKnight','sage','enchanter'],sz:[3,4],n:['Rune Scholars','Society of Ancient Letters','Glyphbound'],q:['Rune di dinding ini… menarik.','Catat semuanya!','Jangan sentuh simbol itu!']},
  {id:'monk',j:['monk','monk','fistKing','monk'],sz:[3,5],n:['Temple of the Iron Fist','Hundred Palms','Mountain Monastery'],q:['Tinju adalah jalan pencerahan.','Ommm…','Tubuh adalah senjata.']},
  {id:'spear',j:['lancer','spearGod','dragoon','lancer'],sz:[3,4],n:['Brotherhood of the Spear','Long Reach','Pikes of {P}'],q:['Jarak adalah keunggulan kami.','Tusuk dari jauh, menang dari dekat.']},
  {id:'royal',j:['knight','paladin','lancer','priest','sniper'],sz:[4,5],tier:'elite',n:['Royal Guard of {P}',"The King's Shield",'Crown Vanguard'],q:['Atas perintah raja!','Kastil ini wilayah kerajaan sekarang.'],lead:'Captain'},
  {id:'merc',j:null,sz:[3,5],n:['{C} Fang Mercenaries','Gold for Blades','The Hired Swords','Coin & Steel'],q:['Bayaran dulu, baru berani.','Kontrak bilang: bunuh Raja Iblis. Gampang.','Lembur dihitung dobel.']},
  {id:'bounty',j:['sniper','hunter','duelist','thief'],sz:[2,4],n:['Wanted: Dead or Alive','Bounty Board','The Price Is Right'],q:['Ada hadiah besar untuk kepala Raja Iblis.','Poster buronanmu dipasang di semua kota.']},
  {id:'kids',j:null,sz:[3,4],tier:'baru',lvMul:.6,n:['Village Hope','Kids of {P}','The Chosen (Maybe)','Wooden Sword Club'],q:['Kata kepala desa kami terpilih!','Pedang ini dari kayu, tapi semangat kami asli!','Ibu nggak tahu kami ke sini…']},
  {id:'fencing',j:['duelist','duelist','duelist'],sz:[2,3],n:['The Fencing Club','En Garde Society','Rapier Wit'],q:['Siapa di sini yang mau berduel?','Satu lawan satu, dengan hormat.']},
  {id:'collector',j:['weaponMaster','weaponMaster','knight'],sz:[2,3],n:['Armory of Legends','Blade Collectors','Steel Hoarders'],q:['Senjata monster di sini… mau kukoleksi.','Koleksiku kurang satu: pedang Raja Iblis.']},
  {id:'ghost',j:['priest','necro','thief','bard'],sz:[3,4],n:['Ghost Hunters','Paranormal Society','Salt & Candle'],q:['Kamera siap? Ada suara di lantai dua!','Katanya kastil ini berhantu…','Kalian dengar itu?!']},
  {id:'stake',j:['paladin','hunter','priest'],sz:[3,4],n:['Silver Stake Order','Nightbane','The Garlic Brotherhood'],q:['Mayat hidup di sini akan istirahat selamanya.','Pasak perak sudah diasah.']},
  {id:'pirate',j:['axeman','thief','archer','duelist'],sz:[3,5],n:['Crimson Tide Pirates','Sea Dogs','Captain {N}’s Crew','Salty Skulls'],q:['Yo-ho! Harta karun di menara ini!','Kapal kami parkir di bawah jurang.','Bagi rata hasilnya, kru!'],lead:'Captain'},
  {id:'gambler',j:['thief','bard','duelist'],sz:[2,4],n:['Lucky Seven','High Rollers','Dice & Death','Snake Eyes'],q:['Taruhan: kita sampai lantai lima.','All in!','Peti ini… ganjil atau genap?']},
  {id:'revenge',j:null,sz:[3,5],tier:'veteran',n:['Remnants of {P}','The Mourning Blades','Ashes of {P}','Black Armband'],q:['Monstermu membunuh saudara kami. Sekarang giliran kalian.','Kami tidak datang untuk harta. Kami datang untuk balas dendam.','Ingat nama-nama yang kau ambil.']},
  {id:'pilgrim',j:['priest','monk','priest'],sz:[3,5],n:['The Silent Pilgrims','Pilgrims of the Bleeding Saint','Barefoot Procession'],q:['…','(mereka bersenandung tanpa membuka mulut)','Langkah demi langkah menuju penebusan.']},
  {id:'bandit',j:['thief','axeman','archer'],sz:[3,5],n:['{C} Bandits','Highway Wolves','Roadside Knives'],q:['Serahkan emasmu, Raja Iblis!','Ini perampokan!','Semua yang di sini milik kami sekarang.']},
  {id:'princess',j:['saint','knight','knight','paladin'],fixed:1,sz:[3,4],n:['Princess {N}’s Escort','Royal Excursion','The Tiara Guard'],q:['Tuan Putri, mohon jangan sentuh monsternya!','Aku mau lihat Raja Iblis dari dekat!','Ini tamasya kerajaan, bukan perang… katanya.']},
  {id:'scholar',j:['sage','alkemis','enchanter'],sz:[2,4],n:['Royal Academy Survey Team','Curious Minds','Footnote Society'],q:['Spesimen langka! Jangan dibunuh dulu!','Ukur, catat, baru serang.']},
  {id:'clown',j:['bard','thief','duelist','bard'],sz:[3,4],n:['Carnival of Laughter','The Grinning Troupe','Smile Forever Circus'],q:['Hahaha… HAHAHA…','Pertunjukan dimulai! Tepuk tangan, monster!','Kenapa wajahmu tidak tersenyum?']},
  {id:'faceless',j:['darkmage','necro','thief','ninja'],sz:[3,4],n:['The Faceless','Masks of the Abyss','Hollow Smiles'],q:['Kami tidak punya wajah. Sebentar lagi kamu juga.','Raja Iblis… kami ingin menggantikanmu.','Lepaskan topengmu.']},
  {id:'fans',j:['darkmage','bard','necro'],sz:[2,4],n:['Demon Lord Fan Club','#1 Fans of the Abyss','Throne Admirers'],q:['KYAA! Raja Iblis! Tanda tangani perisaiku!','Kami fans beratmu! …Tapi kami tetap menyerang ya.','Boleh foto bareng sebelum kubunuh?']},
  {id:'elf',j:['ranger','archer','druid','arrowQueen'],sz:[3,4],race:'elf',n:['Sylvan Wardens','Leaf Arrow','Moonwood Rangers'],q:['Kastil ini merusak akar pohon suci.','Para elf tidak lupa.']},
  {id:'dwarf',j:['axeman','miner','knight','weaponMaster'],sz:[3,5],race:'dwarf',n:['Iron Beards','Stonehammer Clan','Anvil & Ale'],q:['Arsitekturnya jelek. Akan kami rombak!','Bir dulu, baru bertarung.']},
  {id:'beast',j:['monk','hunter','berserker','fistKing'],sz:[3,5],race:'beastkin',n:['Moonfang Pack','Howling Claws','The Wild Hunt'],q:['Aku mencium bau monster… dan daging panggang.','AWOOO!']},
  {id:'exorcist',j:['priest','monk','paladin'],sz:[2,4],n:['The Exorcists','Holy Water Bros','Bell & Book'],q:['Keluar kau, roh jahat!','Air suci, siap. Doa, siap.']},
  {id:'exam',j:null,sz:[3,4],tier:'baru',n:['Guild Rank-Up Exam','F-Rank Hopefuls','Probation Squad'],q:['Kalau lolos, kita naik ke rank E!','Penguji guild sedang mengawasi…','Jangan sampai gagal lagi tahun ini.']},
  {id:'speed',j:['thief','ninja','dualblade'],sz:[2,3],n:['Any% Runners','Speedrun Squad','Frame Perfect'],q:['Skip semua lantai! Langsung ke singgasana!','Timer mulai!','Reset kalau ada yang mati.']},
  {id:'bride',j:['priest','darkmage','saint'],sz:[2,3],sx:'f',n:['The Weeping Brides','Veils of Sorrow','Bouquet of Thorns'],q:['Pengantin kami menunggu di altar… kamu.','Janji suci… sampai mati.','(isak tangis terdengar dari balik kerudung)']},
  {id:'tax',j:['knight','priest','thief'],sz:[2,4],n:['Royal Tax Office','Auditors of {P}','Receipt Required'],q:['Kastil ini belum bayar pajak tanah selama 300 tahun!','Semua harta di peti akan kami catat.']},
  {id:'storm',j:['stormLord','aeromancer','iceQueen','mage'],sz:[3,4],tier:'elite',n:['Eye of the Storm','Tempest Court','Thunderhead'],q:['Langit sudah memihak kami.','Petir akan meruntuhkan menaramu.']},
  {id:'kings',j:['swordmaster','arrowQueen','sage','fistKing','spearGod'],sz:[3,5],tier:'elite',lvMul:1.15,n:['Council of Crowns','The Five Sovereigns','Legends Reunited'],q:['Hanya legenda yang pantas menantangmu.','Kami bukan party biasa, Raja Iblis.'],lead:'Legend'},
  {id:'goblinRep',raceAll:1,j:['priest','cleric','farmer','cook','knight','medic'],sz:[3,5],race:'goblin',n:['Goblins Anonymous','The Repentant Fangs','Second Chance Goblins','Green Hearts Society','Goblins Against Goblinry'],q:['Dulu kami menjarah desa… sekarang kami membasmi monster. Maaf ya.','Ini cara kami menebus dosa.','Jangan lihat kami begitu. Kami sudah tobat!','Hukum alam bilang goblin itu jahat. Kami menentangnya.','Kerja yang baik, hidup yang baik. Itu janji kami.']},
  {id:'oldDwarf',raceAll:1,old:1,j:['axeman','miner','knight','weaponMaster','juggernaut','cannoneer'],sz:[3,5],race:'dwarf',tier:'veteran',lvMul:1.35,n:['The Ale Fund','Beards for Beer','Thirsty Old Hammers','Last Round Club','Grandfathers of the Keg'],q:['Satu peti emas = satu tong bir.','Lututku sakit, tapi tenggorokanku lebih kering.','Kedai tutup jam sepuluh. Cepat selesaikan!','Waktu aku muda, Raja Iblis lebih tinggi dari ini.','Siapa yang mati duluan, bayar minuman!']},
  {id:'trash',j:['swordmaster','arrowQueen','stormLord','bladeDancer','darkKnight','reaper','warlord','chronomancer'],sz:[3,4],tier:'elite',lvMul:1.2,n:['Trash Game'],q:['Trash game. Mana tantangannya?','Dungeon ini level tutorial.','Kalau tidak bikin kami hampir mati, buat apa?','Boring. Lantai berikutnya.','Raja Iblisnya cuma segini? Uninstall.']},
  {id:'shieldHero',slots:[['shieldHero'],['dualblade','bladeDancer','lancer','valkyrie'],['berserker','brawler','monk','fistKing'],['hunter','ranger','spiritArcher','assassin']],races:['manusia','beastkin','beastkin','beastkin'],isekaiLead:1,n:['Shield Hero'],q:['Aku cuma punya perisai. Tapi tak satu pun temanku akan jatuh.','Kalian menyerang, aku menahan. Seperti biasa.','Perisaiku tidak pernah retak.']},
  {id:'rolling',slots:[['priest','cleric','bishop','oracle','saint'],['ranger','archer','sniper','spiritArcher','gunslinger'],['guardian','knight','templar','paladin'],['swordmaster','samurai','darkKnight','berserker','gladiator','slayer']],n:['Rolling Thunder'],q:['Formasi standar. Tank depan, healer belakang.','Keseimbangan adalah kekuatan.','Tank tarik, attacker habisi, ranger tutup, healer jaga. Jalan!']},
  {id:'hellborn',j:['darkKnight','demonic','warlock','bloodMage','demonologist','reaper'],sz:[3,4],race:'iblis',n:['Hellborn Exiles','The Fallen Horns','Ashen Court','Rival Throne'],q:['Takhta itu seharusnya milik kami.','Sesama iblis, mari bicara… dengan pedang.','Raja Iblis yang lemah harus turun takhta.']},
  {id:'orcClan',j:['barbarian','juggernaut','shaman','gladiator','warlord','berserker'],sz:[3,5],race:'orc',n:['Green Tusk Clan','Blood Moon Orcs','Honor Tusks'],q:['Orc juga punya kehormatan!','WAAAGH! Untuk klan!','Kami datang bukan untuk menjarah. Kami datang untuk menang.']},
  {id:'lizard',j:['hunter','shaman','lancer','assassin'],sz:[3,4],race:'lizard',n:['Swamp Scales','Cold Blood Company','Marsh Fangs'],q:['Ssss… kastil yang lembap.','Kami datang dari rawa jauh.']},
  {id:'kobold',j:['miner','bomber','engineer','trickster','thief'],sz:[3,5],race:'kobold',n:['Tunnel Yappers','Shiny Seekers','Yip Yip Brigade'],q:['Yip! Ada yang berkilau!','Gali! Ledakkan! Ambil!','Kami kecil tapi banyak!']},
  {id:'ironWall',j:['guardian','templar','juggernaut','knight','paladin'],sz:[3,5],n:['The Iron Wall','Unbreakable','Shield Wall of {P}'],q:['Tak ada yang lewat.','Pukul saja. Kami tidak akan bergeming.']},
  {id:'guns',j:['gunslinger','musketeer','cannoneer','engineer','demonHunter'],sz:[3,4],n:['Gun & Glory','Powder Kings','Smoke & Lead'],q:['Bawa peluru lebih banyak!','Sihir terlalu lambat.','Telinga monster akan berdenging.']},
  {id:'darkCov',j:['darkKnight','warlock','demonologist','bloodMage','reaper'],sz:[3,4],n:['The Dark Covenant','Pact of Shadows','Midnight Contract'],q:['Kontrak kami dengan kegelapan menuntut jiwamu.','Bayaran kami: jiwa Raja Iblis.']},
  {id:'valhalla',j:['valkyrie','valkyrie','warlord','spiritArcher'],sz:[3,4],sx:'f',n:["Valhalla's Chosen",'Shieldmaidens','Winged Vanguard'],q:['Hari ini hari yang baik untuk mati.','Aula abadi menunggu yang berani.']},
  {id:'oddFriends',slots:[[null],[null],[null],[null]],races:['goblin','elf','dwarf','orc'],n:['Unlikely Friends','The Odd Fellowship','Four Races, One Pot'],q:['Goblin, elf, dwarf, dan orc masuk ke dungeon… ini bukan awal lelucon.','Kami beda ras tapi satu tujuan!']},
];
const PARTY_THEME_BY={}; for(const t of PARTY_THEME) PARTY_THEME_BY[t.id]=t;
const P_COLOR=['Red','Black','White','Blue','Grey','Green','Golden','Silver','Crimson','Iron'];
function fillName(t,lead){ return t.replace('{P}',pick(P_PLACE)).replace('{C}',pick(P_COLOR)).replace('{N}',lead?lead.name:pick(ISE_F)); }
/* orang dunia lain */
const ISE_F=['Haruto','Yuuki','Sora','Ren','Akira','Hinata','Kaito','Mio','Riku','Aoi','Daichi','Sakura','Takumi','Nanami','Yui','Kenji','Rina','Shun','Asuka','Kazuma','Souta','Hana','Itsuki','Mei'];
const ISE_L=['Sato','Tanaka','Kurosawa','Fujimoto','Aizawa','Mizuno','Kirishima','Hoshino','Amamiya','Takeda','Shiraishi','Kanzaki','Nakamura','Ishida'];
const ISE_CHEAT=['Status Window','Appraisal','Infinite Item Box','Auto-Dodge','Mana Overflow',"Hero's Luck",'Instant Learning','Copy Skill','Language Mastery','Max Level Cap Removed'];
const ISE_Q=['Status window, open! …Eh, beneran muncul!','Di duniaku, dungeon cuma ada di game. Sekarang beneran…','Kalau kukalahkan Raja Iblis, aku bisa pulang, kan?','Ini isekai beneran. Oke, tenang. Aku main game ini ribuan jam.','Truk itu… ah, sudahlah. Ayo naik level.','Aku dipanggil ke dunia ini cuma buat ini?'];
function makeIsekai(p,starMin){ p.isekai=1; p.race='manusia'; const sx=rnd()<.55?'m':'f'; p.sx=sx; p.name=`${pick(ISE_F)} ${pick(ISE_L)}`; p.cheat=pick(ISE_CHEAT); p.title='the Otherworlder';
  p.app.hair=pick(['#1a1a22','#2a1a14','#3a2a1a']); p.app.skin=pick(['#f1d2b4','#f0c8a0','#e8c098']); p.app.cloth='#2a3550'; p.app.cloth2='#e8e8f0'; p.app.style=sx==='f'?pick(['long','tail']):'short';
  if(starMin){ const pool=JOB_KEYS.filter(k=>JOBS[k].star>=starMin&&k!=='hero'&&!JOBS[k].special&&k!=='farmer'&&k!=='cook'); p.job=pick(pool); p.el=JOB_EL[p.job]?pick(JOB_EL[p.job]):''; }
  p.lv=Math.round(p.lv*1.1)+2; return p; }
function newParty(){
  const L=fameLv(); const r=rnd();
  let tier, size, lv;
  const soloP=.02+Math.min(.06,G.pop/3000);
  if(r<soloP){ tier='solo'; size=1; lv=Math.max(30,L*2.4+ri(0,25)); }
  else if(G.pop<30&&r<.55||r<.3){ tier='baru'; size=ri(2,4); lv=ri(1,8)+L*.15; }
  else if(r<.72){ tier='biasa'; size=ri(3,5); lv=L*rand(.75,1.1); }
  else if(r<.92){ tier='veteran'; size=ri(3,5); lv=L*rand(1.15,1.5); }
  else { tier='elite'; size=ri(4,5); lv=L*rand(1.5,1.9); }
  const pa={id:nid(),tier,members:[],state:'town',saveFloor:0,nextVisit:0,visits:0,wins:0,name:'',quote:''};
  let th=null;
  if(tier!=='solo'&&rnd()<.55){ const cand=PARTY_THEME.filter(t=>!t.tier||t.tier===tier||(t.tier==='baru')===(tier==='baru')&&rnd()<.3); th=pick(cand.length?cand:PARTY_THEME); }
  if(th){ pa.th=th.id; if(th.tier&&th.tier!==tier){ tier=pa.tier=th.tier; lv=th.tier==='baru'?ri(1,8)+L*.15:th.tier==='elite'?L*rand(1.5,1.9):L*rand(1.15,1.5); } size=th.slots?th.slots.length:ri(th.sz[0],th.sz[1]); if(th.lvMul) lv*=th.lvMul; }
  const jobs=[];
  if(th&&th.slots){ for(const sl of th.slots){ const j=pick(sl); jobs.push(j||pickJobStar(tier)); } }
  else if(th&&th.j){ for(let i=0;i<size;i++) jobs.push(th.fixed?th.j[i%th.j.length]:pick(th.j)); }
  else { const core=size>=3&&rnd()<.5?['knight','priest',pick(['mage','archer'])]:[]; for(let i=0;i<size;i++) jobs.push(core[i]||pickJobStar(tier)); }
  for(const [ji,j] of jobs.entries()){ const race=th&&th.races?th.races[ji]:th&&th.race?(th.raceAll||rnd()<.85?th.race:null):null; const p=newPerson(Math.max(1,lv+ri(-3,3)),tier==='solo'?pickJobStar('solo'):j,race||undefined); p.party=pa.id; pa.members.push(p.id);
    if(th&&th.old){ p.app.hair=pick(['#c8c4c0','#e8e4e0','#a8a4a0']); p.sx='m'; }
    if(th&&th.sx&&p.sx!==th.sx){ for(let k=0;k<12;k++){ const a=advName(p.race); if(a.sx===th.sx){ p.name=a.n; p.sx=a.sx; break; } } } }
  // orang dunia lain di dalam party
  const isekaiP=tier==='solo'?.25:tier==='baru'?.05:.08;
  if(th&&th.isekaiLead){ const p=G.people[pa.members[0]]; const jb=p.job; makeIsekai(p,0); p.job=jb; p.title='the '+JOBS[jb].n; }
  else if(rnd()<isekaiP&&!(th&&th.race)){ const p=G.people[pick(pa.members)]; makeIsekai(p,th&&th.j?0:3); }
  const lead=G.people[pa.members[0]];
  if(tier==='solo'){ const p=lead; if(!p.isekai) p.title=`the ${pick(EPI_ADJ)} ${EPI_JOB[p.job]||JOBS[p.job].n}`; else p.title=`the Wandering Otherworlder`; pa.name=`${p.name} ${p.title}`; }
  else if(th){ pa.name=fillName(pick(th.n),lead); if(th.lead&&!lead.isekai) lead.title=th.lead; if(th.id==='trash'&&G.parties.some(x=>x!==pa&&x.name==='Trash Game'&&x.state!=='gone')) pa.name='Trash Game II'; }
  else if(tier==='baru') pa.name=rnd()<.35?'Newcomer Party':genPartyName();
  else pa.name=genPartyName();
  G.parties.push(pa); return pa;
}
function partyQuote(pa){ const iso=partyMembers(pa).find(p=>p.isekai); if(iso&&rnd()<.4) return pick(ISE_Q); const T=pa.th&&PARTY_THEME_BY[pa.th]; return pick(T?T.q:QUOTES[pa.tier]); }
/* skill kelas baru: perisai party, provokasi, serap nyawa */
const _useSkill=useSkill;
useSkill=function(a,p,J,tgt,st,pa){ const S=J.skill; if(S.k!=='shield'&&S.k!=='taunt'&&S.k!=='drain') return _useSkill(a,p,J,tgt,st,pa);
  const f=a.floor; say(a.x,f,S.n,'#9fe0ff',1.1); a.atkT=G.t; a.atkK='skill';
  if(S.k==='shield'){ for(const x of G.advs) if(x.party===a.party&&x.floor===f){ x.fx.shieldP=G.t+6; const xs=advStats(G.people[x.pid]); x.hp=Math.min(xs.hp,x.hp+xs.hp*.08); fxAt('shield',x.x,f,'#9fe0ff',.9); } }
  else if(S.k==='taunt'){ a.fx.guard=G.t+6; for(const m of G.mons) if(!m.dead&&m.floor===f&&Math.abs(m.x-a.x)<80){ m.aggro=a.pid; m.aggroT=G.t; } fxAt('roar',a.x,f,'#ffd36a',.7); }
  else if(S.k==='drain'&&tgt){ const d=tgt.k==='m'?hitMon(tgt.u,st.atk,a,{mult:S.m,magic:J.magic}):hitLord(st.atk,a,{mult:S.m}); a.hp=Math.min(st.hp,a.hp+(d||0)*.6); fxAt('curse',tgt.u.x,f,'#c8203a',.6); }
};
