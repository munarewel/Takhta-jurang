/* =====================================================================
   TAKHTA JURANG — evolusi tahap 2 untuk monster yang tadinya tak berevolusi
   ===================================================================== */
(function(){
  const AURA={trueChaoticDragon:'#c040ff',fullfirePhoenix:'#ffe080',archImp:'#ff6a2a',infernoHound:'#ff8a2a',succubusQueen:'#ff60c0',abyssKnight:'#9a40ff',archLich:'#60d0ff',demonOverlord:'#ff4020',ragnarokFenrir:'#ff3050',celestialKitsune:'#ffa0ff',celestialUnicorn:'#c0e0ff',thunderSovereign:'#fff060',elderKraken:'#ff60a0',behemothKing:'#c080ff',nekoKing:'#ffd040'};
  const UP={F:'E',E:'D',D:'C',C:'B',B:'A',A:'S',S:'SS',SS:'SSS',SSS:'SSS'};
  // key lama → [key baru, nama, warna, mata, tint (untuk humanoid), deskripsi]
  const NEW={
    imp:['archImp','Arch Imp','#8a1a3a','#ffd040',null,'Imp yang sudah ratusan tahun mengumpulkan api neraka. Bola apinya sebesar kepala.'],
    anjingNeraka:['infernoHound','Inferno Hound','#3a0a0a','#ffb040',null,'Anjing neraka yang bulunya berubah jadi bara. Napasnya melelehkan perisai.'],
    succubus:['succubusQueen','Succubus Queen',null,null,'#a0207a','Ratu para succubus. Satu kedipan mata, satu party lupa tujuan hidupnya.'],
    gargoyle:['gargoyleLord','Gargoyle Lord','#4a4a5a','#ff4040',null,'Patung batu tertua di kastil. Sayapnya bisa menutupi seluruh lorong.'],
    ksatriaNeraka:['abyssKnight','Abyss Knight',null,null,'#3a0a4a','Ksatria neraka yang turun ke dasar jurang dan kembali lebih kejam.'],
    lichIblis:['archLich','Arch Lich',null,null,'#2a4a6a','Penyihir mayat yang menguasai ribuan mantra terlarang.'],
    jenderal:['demonOverlord','Demon Overlord',null,null,'#5a0a0a','Jenderal yang sudah memimpin seratus perang. Bahkan Raja Iblis segan padanya.'],
    ularLaut:['abyssLeviathan','Abyssal Leviathan','#0a2a4a','#9fffff',null,'Ular laut raksasa dari palung terdalam. Ombak tunduk pada geraknya.'],
    volcanosaur:['volcanoRex','Volcanosaur Rex','#5a1a0a','#ffe040',null,'Raja dinosaurus gunung api. Tiap langkahnya meninggalkan lava.'],
    tyrant:['tyrantKing','Tyrant King','#3a4a2a','#ff3030',null,'Penguasa zaman purba. Rahangnya bisa meremukkan zirah naga.'],
    unicorn:['celestialUnicorn','Celestial Unicorn','#f0e8ff','#9fd0ff',null,'Unicorn yang tanduknya menyerap cahaya bintang.'],
    phoenix:['fullfirePhoenix','Fullfire Phoenix','#ffd040','#ffffff',null,'Phoenix yang terlahir kembali seratus kali. Seluruh tubuhnya api putih keemasan.'],
    kitsune:['celestialKitsune','Celestial Kitsune','#f8f0ff','#ff6ad0',null,'Rubah sembilan ekor yang naik ke langit. Ilusinya bisa menipu dewa.'],
    nagaBumi:['ancientEarthDragon','Ancient Earth Dragon','#5a4a2a','#7aff6a',null,'Naga bumi yang tidur seribu tahun. Punggungnya ditumbuhi hutan.'],
    griffinKaisar:['griffinSovereign','Griffin Sovereign','#e8c050','#ffffff',null,'Penguasa langit. Para griffin kaisar pun menunduk padanya.'],
    fenrir:['ragnarokFenrir','Ragnarok Fenrir','#1a1a2a','#ff3040',null,'Serigala akhir zaman. Konon ia akan menelan matahari.'],
    behemoth:['behemothKing','Behemoth King','#4a2a5a','#ffd040',null,'Behemoth terbesar yang pernah tercatat. Tanah bergetar saat ia bernapas.'],
    thunderbird:['thunderSovereign','Thunderbird Sovereign','#ffe060','#ffffff',null,'Burung petir yang memanggil badai dengan satu kepakan.'],
    kraken:['elderKraken','Elder Kraken','#5a1a3a','#ffd040',null,'Kraken tertua di samudra. Tentakelnya bisa merobohkan menara.'],
    megalodon:['abyssMegalodon','Abyss Megalodon','#1a2a3a','#ff4040',null,'Hiu purba dari dasar jurang. Giginya setajam pedang terbaik.'],
    neko:['nekoKing','Neko King','#f0e0c0','#ffd040',null,'Kucing yang berhasil memimpin seribu kucing lain. Sangat berwibawa… kadang.'],
    chaoticDragon:['trueChaoticDragon','True Chaotic Dragon','#0a0410','#ff40ff',null,'Wujud sejati Chaotic Dragon. Aura ungunya merobek ruang dan waktu.'],
  };
  for(const k in NEW){ const m=MON[k]; if(!m||EVO_NEXT[k]) continue; const [k2,n,c,eye,tint,d]=NEW[k];
    const m2=JSON.parse(JSON.stringify(m)); Object.assign(m2,{n,rank:UP[m.rank],hp:Math.round(m.hp*1.65),atk:Math.round(m.atk*1.5),evo:2,evolved:1,d,sc:Math.min(2.6,(m.sc||1)*1.15),xp:Math.round((m.xp||0)*1.6),bounty:Math.round((m.bounty||0)*1.6)});
    if(c) m2.c=c; if(eye) m2.eye=eye; m2.tint=tint||c; m2.aura=AURA[k2]||eye||'#ffd040'; if(m.k==='slime') m2.king=1;
    MON[k2]=m2; EVO_NEXT[k]=k2; }
})();
