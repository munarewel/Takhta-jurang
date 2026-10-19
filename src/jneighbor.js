/* =====================================================================
   TAKHTA JURANG — tetangga: dungeon Raja Iblis lain, telepati, hubungan, tukar
   ===================================================================== */
const NB_DNAME=['Crimson Hollow','Frostfang Depths','Ashen Spire','Sunken Crypt','Thornmaw Keep','Gloomwell','Bleeding Vault','Whisperdeep','Obsidian Maw','Hollowcrown','Mirefang Pit','Starless Hall','Rotting Bastion','Moonless Grotto'];
const NB_PERS=['ramah','sombong','pemalu','pemarah','licik','bijak','ceria','malas'];
const NB_PERS_N={ramah:'Ramah',sombong:'Sombong',pemalu:'Pemalu',pemarah:'Pemarah',licik:'Licik',bijak:'Bijak',ceria:'Ceria',malas:'Malas'};
const NB_ASK={ramah:-.1,sombong:.2,pemalu:0,pemarah:.1,licik:.15,bijak:0,ceria:-.05,malas:-.05};
let NB_MUTE=false, MAINW=null;
function withWorld(w,fn){ const s=G; G=w; try{ return fn(); } finally{ G=s; } }
function relTier(r){ return r>=80?'Saudara Jiwa':r>=60?'Sahabat':r>=40?'Teman':r>=20?'Kenalan':'Asing'; }
function lordTotalExp(L){ let s=L.exp||0; for(let l=1;l<L.lv;l++) s+=Math.round(30*Math.pow(l,1.4)); return s; }
function monValue(m){ const s=SPECIES[m.sp]; return Math.round(120*Math.pow(2.1,s.rar)*(1+(s.stage-1)*1.4)*(1+m.lv*.05)); }
function nbRaceN(w){ const r=LORD_RACE.find(x=>x.id===w.lord.race); return r?r.n:'Demon'; }
/* ---------- membuat dungeon tetangga ---------- */
function nbPickSpecies(f,fl){ const d=f/Math.max(1,fl-1); const r=Math.max(0,Math.min(4,Math.floor(d*2.6+rnd()*1.6))); let sid=pick(GACHA_POOL[RARITY[r]]||GACHA_POOL.N);
  if(SPECIES[sid].next&&rnd()<d*.7) sid=SPECIES[sid].next; if(SPECIES[sid].next&&rnd()<d*.25) sid=SPECIES[sid].next; return sid; }
function nbMakeWorld(id,dname,fl){ NB_MUTE=true; const save=G; let w; const sd=(Math.floor(rnd()*2147480000)+id*7919)%2147480000|1;
  try{ newGame(); srand(sd); w=G; G.lord=null; newLord(true); w.isNeighbor=1; w.wid=id; w.dname=dname; w.themeOff=ri(1,7); w.log=[];
    while(w.floors<fl){ w.fix.push(Array(SLOTS).fill(null)); w.floors++; } w.mons=[]; for(const row of w.fix) row.fill(null);
    for(let f=0;f<fl;f++){ const n=ri(2,4); for(let i=0;i<n;i++){ const m=addMonster(nbPickSpecies(f,fl)); m.lv=Math.max(1,Math.min(monCap(m),Math.round(3+f*1.8+ri(0,5)))); m.floor=f; m.px=SLOT_X(ri(1,8)); m.x=m.px; m.loy=ri(50,90); checkLearn(m,true); m.hp=monStats(m).hp; }
      const used=new Set(); const put=(fx)=>{ let s=ri(0,SLOTS-1),k=0; while(used.has(s)&&k++<20) s=ri(0,SLOTS-1); used.add(s); w.fix[f][s]=fx; };
      for(let k=ri(1,3);k>0;k--) put({t:pick(['duri','panah','gas','baskom','licin','lubang','apiT','jaringT','mimik'])});
      if(rnd()<.6) put({t:'chest',r:CHEST_RANK[Math.min(8,Math.floor(f/fl*6)+ri(0,1))]}); if(f>0&&f%4===2) put({t:'rest'}); if(rnd()<.4) put({t:pick(['obor','patung','tengkorak'])}); }
    w.lord.lv=ri(3,8)+Math.round(fl*.8); w.lord.hp=lordStats().hp; w.lord.x=fend(fl-1);
    w.gold=ri(300,1500); w.mana=ri(100,400); w.jiwa=ri(0,25); w.pop=ri(20,100)+fl*6; w.t=ri(0,3)*DAY_LEN;
  } finally { G=save; NB_MUTE=false; }
  return w; }
function nbAdd(){ G.nbs=G.nbs||[]; const used=new Set(G.nbs.map(n=>n.dname)); const dname=pick(NB_DNAME.filter(n=>!used.has(n)))||'Dark Hollow '+(G.nbs.length+1);
  const id=(G.nbs.reduce((a,n)=>Math.max(a,n.id),0))+1; const fl=Math.max(4,Math.min(40,G.floors+ri(-2,8)));
  const nb={id,dname,pers:pick(NB_PERS),rel:ri(5,18),w:nbMakeWorld(id,dname,fl),need:null,needShown:false,chat:[],unread:0,talkDay:0,talkN:0,acc:ri(0,15),aiAcc:0,lastMsg:G.t,lastTalkDay:G.day,met:G.day,past:[],lsig:null,snap:null};
  nb.chat.push({f:'sys',s:`Telepati terhubung dengan ${nb.w.lord.name} sang ${nbRaceN(nb.w)}, penguasa ${dname}.`});
  G.nbs.push(nb); return nb; }
function nbInit(){ if(G.isNeighbor) return; if(!G.nbs){ G.nbs=[]; for(let i=0;i<3;i++) nbAdd(); log('📡 Mira: "Yang Mulia, ada tiga Raja Iblis lain di sekitar jurang ini. Kita bisa bertelepati dengan mereka lewat menu Tetangga."','nb'); }
  const want=Math.min(6,3+Math.floor(G.floors/10)); while(G.nbs.length<want){ const nb=nbAdd(); log(`📡 Dungeon baru muncul di sekitar jurang: ${nb.dname}, dikuasai ${nb.w.lord.name} sang ${nbRaceN(nb.w)}.`,'nb'); } }
/* ---------- AI tetangga (berjalan dengan G = dunia tetangga) ---------- */
function nbAI(){ for(const m of G.mons) if(m.floor<0&&!m.temp) autoPlace(m);
  if(G.jiwa>=10&&G.mons.length<G.floors*4) gacha(1,'jiwa');
  if(G.gold>floorCost()*1.6&&G.floors<70) buyFloor();
  if(G.gold>400&&rnd()<.35){ const f=ri(0,G.floors-1); const s=G.fix[f].findIndex(x=>!x); if(s>=0){ const t=pick(['duri','panah','gas','lubang','apiT','jaringT','mimik']); const c=FIX[t].cost||100; if(G.gold>c){ G.gold-=c; G.fix[f][s]={t}; } } }
  for(const m of G.mons) if(m.dead&&G.t>=m.reviveAt){ m.dead=false; m.hp=monStats(m).hp; m.x=m.px; m.fx={}; }
  if(rnd()<.25){ const m=pick(G.mons.filter(x=>!x.dead&&x.lv<monCap(x))); if(m) m.lv++; } }
function nbAbstract(nb){ const w=nb.w; let died=null;
  withWorld(w,()=>{ const mainFame=fameLv(); const dt=20; G.t+=dt; G.day=1+Math.floor(G.t/DAY_LEN); G.gold+=dt*(.6+G.floors*.15); G.mana+=dt*(1+G.floors*.06); if(rnd()<.35) G.jiwa+=1; G.pop+=dt*.004*G.floors;
    if(rnd()<.55){ const kills=ri(0,3); G.gold+=kills*(30+mainFame*4); lordGainExp(kills*(Math.round(mainFame)*6+10)+15); if(rnd()<.35){ const m=pick(G.mons.filter(x=>!x.dead)); if(m){ m.dead=true; m.reviveAt=G.t+60; } } }
    nbAI();
    const avg=G.mons.length?G.mons.reduce((s,m)=>s+m.lv,0)/G.mons.length:1; const danger=clamp(mainFame/(avg*.8+G.lord.lv*.4+4),.4,2.5);
    if(rnd()<.012*danger){ const L=G.lord; died={name:L.name}; G.stats.lords++; G.hall.unshift({d:G.day,lord:L.name,lv:L.lv}); if(G.hall.length>20) G.hall.pop(); G.pop*=.6; G.gold*=.85; newLord(false); }
  });
  return died; }
function nbCheckLord(nb){ const L=nb.w.lord; const sig=L?`${L.name}|${L.born}|${nb.w.lordSince||0}`:''; if(nb.lsig&&sig!==nb.lsig&&nb.snap) nbOnLordDeath(nb,nb.snap); nb.lsig=sig;
  if(L&&L.hp>0) nb.snap={name:L.name,race:L.race,lv:L.lv,exp:lordTotalExp(L),pers:nb.pers}; }
const NB_FAREWELL=['{me}… sepertinya ini akhirku. Ambillah separuh kekuatanku. Jaga jurang ini untuk kita berdua.','Hehe… aku kalah, {me}. Jangan sedih. Kekuatanku kutitipkan padamu.','Sahabatku… telepati ini yang terakhir. Pakai kekuatanku untuk membalas mereka.'];
function nbOnLordDeath(nb,snap){ const raceN=(LORD_RACE.find(x=>x.id===snap.race)||{n:'Demon'}).n; const nu=nb.w.lord;
  if(nb.rel>=60){ const gain=Math.round(snap.exp/2); const lv0=G.lord.lv; lordGainExp(gain);
    log(`📡 Telepati terakhir dari ${snap.name}: "${pick(NB_FAREWELL).replace('{me}',G.lord.name)}"`,'nb');
    log(`${snap.name} sang ${raceN} dari ${nb.dname} gugur dan mewariskan ${gain} EXP. Raja Iblis-mu naik dari Lv${lv0} ke Lv${G.lord.lv}!`,'lord'); }
  else log(`📡 Raja Iblis tetangga ${snap.name} sang ${raceN} dari ${nb.dname} tumbang. Telepati kalian terputus.`,'nb');
  nb.past.unshift({name:snap.name,race:snap.race,lv:snap.lv,rel:nb.rel,day:G.day}); if(nb.past.length>8) nb.past.pop();
  nb.rel=ri(0,10); nb.pers=pick(NB_PERS); nb.need=null; nb.needShown=false; nb.talkN=0;
  nb.chat.push({f:'sys',s:`— ${snap.name} telah tumbang. ${nu?`Raja Iblis baru, ${nu.name} sang ${nbRaceN(nb.w)}, kini menguasai ${nb.dname}.`:''} —`}); if(nb.chat.length>60) nb.chat.splice(0,nb.chat.length-60); nb.unread++; }
/* ---------- kebutuhan (curhat) ---------- */
const NEED_TXT={
  gold:['Jujur saja… aku kekurangan emas. Pahlawan terakhir menjarah peti-petiku. Butuh sekitar {n} emas.','Kas kastilku kosong, {me}. Aku bahkan tidak bisa memasang jebakan baru. Kira-kira {n} emas saja cukup.'],
  jiwa:['Kristal jiwaku habis. Aku tidak bisa memanggil monster baru… butuh {n} Kristal Jiwa.','Lingkaran pemanggilanku padam. Kalau ada {n} Kristal Jiwa, aku tertolong.'],
  monEarly:['Lantai-lantai awalku kosong. Petualang pemula lewat begitu saja. Aku butuh monster apa saja untuk lantai awal.','Penjaga pintu masukku kabur semua. Ada monster yang bisa kau pinjamkan?'],
  monMid:['Lantai tengah dungeonku lemah sekali. Aku butuh monster peringkat {r} ke atas.','Party veteran selalu menembus lantai tengahku. Monster peringkat {r} ke atas akan sangat membantu.'],
  monLate:['Penjaga di dekat singgasanaku tewas semua. Aku butuh monster kuat, peringkat {r} ke atas.','Aku takut, {me}. Tidak ada yang menjaga singgasanaku. Monster peringkat {r} ke atas saja sudah cukup.'],
  lonely:['Kadang… jadi Raja Iblis itu kesepian, ya.','Asistenku sibuk terus. Aku cuma ingin ngobrol dengan seseorang.'],
  hero:['Kerajaan mengirim party pahlawan ke dungeonku. Aku… sedikit takut.','Ada orang dunia lain yang mengincar kepalaku. Doakan aku, ya.'],
};
function nbGenNeed(nb){ const w=nb.w; const k=pick(['gold','gold','jiwa','monEarly','monMid','monLate','lonely','hero']);
  const need={k}; if(k==='gold') need.n=Math.round((200+w.floors*60)/50)*50; if(k==='jiwa') need.n=pick([10,20,30]);
  if(k==='monMid') need.r='C'; if(k==='monLate') need.r=w.floors>=15?'A':'B'; return need; }
function needTxt(nb){ const n=nb.need; if(!n) return ''; return pick(NEED_TXT[n.k]).replace('{n}',n.n||'').replace('{r}',n.r||'').replace('{me}',G.lord.name); }
function needShort(n){ return !n?'':n.k==='gold'?`butuh ${n.n} emas`:n.k==='jiwa'?`butuh ${n.n} Kristal Jiwa`:n.k==='monEarly'?'butuh monster untuk lantai awal':n.k==='monMid'?`butuh monster peringkat ${n.r}+ (lantai tengah)`:n.k==='monLate'?`butuh monster peringkat ${n.r}+ (dekat singgasana)`:n.k==='lonely'?'kesepian':n.k==='hero'?'takut pada party pahlawan':''; }
function monFitsNeed(m,n){ if(!n) return false; const rk=RANK_ORDER.indexOf(SPECIES[m.sp].rank); if(n.k==='monEarly') return true; if(n.k==='monMid'||n.k==='monLate'||n.k==='hero') return rk>=RANK_ORDER.indexOf(n.r||'B'); return false; }
/* ---------- ucapan ---------- */
const NB_GREET={ramah:['Halo, {me}! Senang sekali kau menghubungiku.','Ah, tetanggaku! Bagaimana kastilmu hari ini?'],sombong:['Hmph. Kau lagi. Ada perlu apa dengan raja sehebat aku?','Tumben kau menghubungiku. Butuh nasihat dari yang lebih kuat?'],
  pemalu:['E-eh? {me}? H-halo…','A-aku tidak menyangka kau mau bicara denganku…'],pemarah:['Apa?! Aku sedang sibuk menghajar petualang!','Cepat bicara. Telepati itu bikin pusing.'],
  licik:['Hehe… {me}, kebetulan sekali. Aku punya penawaran menarik…','Teman lama! Ada yang bisa kita… saling untungkan?'],bijak:['Salam, {me}. Semoga kegelapan menyertaimu.','Telepati darimu selalu membawa kabar menarik.'],
  ceria:['Yaaay, {me}! Aku lagi bosan, untung kau datang!','Halo halo! Dungeonku makin keren lho!'],malas:['Hoaaam… oh, {me}. Ada apa?','Mmh… aku baru bangun. Ngobrol sambil rebahan ya.']};
const NB_CLOSE=['Sahabatku {me}! Aku baru saja memikirkanmu.','Ah, {me}! Suaramu selalu menenangkan di tengah serangan petualang.','{me}! Kalau ada apa-apa, aku selalu di sini, ya.'];
const NB_SMALL=['Party {party} baru saja menyerbu dungeonku. Mereka keras kepala sekali.','Kemarin aku memanggil {mon}. Lucu, tapi rakus mana.','Kau pernah dikunjungi party pahlawan? Menyebalkan, kan?','Asistenku menumpahkan ramuan di singgasana lagi.',
  'Dengar-dengar ada orang dunia lain berkeliaran di kota manusia.','{mon}-ku baru naik level. Rasanya seperti punya anak sendiri.','Aku sedang memikirkan nama baru untuk dungeonku. {dn} terdengar terlalu biasa.','Petualang zaman sekarang bawa Return Scroll semua. Curang!','Kau lihat bulan semalam? Merah sekali. Cocok untuk raja seperti kita.'];
const NB_TAIL={ramah:'',sombong:' Tentu saja aku tetap yang terhebat.',pemalu:' …M-maaf aku jadi banyak bicara.',pemarah:' Bikin kesal saja!',licik:' Hehe…',bijak:' Begitulah roda nasib.',ceria:' Hihi!',malas:' …Hoaam.'};
const NB_THANK={ramah:['Terima kasih banyak, {me}! Aku tidak akan melupakan ini.'],sombong:['Hmph… baiklah, kuterima. Jangan pikir aku berutang padamu. …Terima kasih.'],pemalu:['T-terima kasih… a-aku sangat senang…'],pemarah:['…Oke. Ini lumayan. Terima kasih.'],
  licik:['Wah, kau baik sekali. Akan kuingat… untuk dibalas nanti, hehe.'],bijak:['Kebaikanmu akan kembali padamu, {me}.'],ceria:['WAAAH! Terima kasih! Kau tetangga terbaik!'],malas:['Wah… repot-repot. Makasih ya.']};
const NB_COMFORT={ramah:['Kau benar… aku merasa lebih baik.'],sombong:['Aku tidak butuh dihibur. …Tapi terima kasih.'],pemalu:['U-uh… terima kasih sudah mendengarkan…'],pemarah:['…Hmph. Ya, ya. Kau baik juga ternyata.'],
  licik:['Kata-kata manis. Aku suka itu.'],bijak:['Kata-katamu menenangkan hatiku.'],ceria:['Aww, kau manis sekali!'],malas:['Mm… iya. Aku tidur dulu, perasaanku lebih baik.']};
const NB_YES={ramah:['Setuju! Senang bisa bertukar denganmu.'],sombong:['Penawaran yang layak. Kuterima.'],pemalu:['B-boleh… s-semoga kau menyayanginya.'],pemarah:['Deal. Jangan minta kembali.'],licik:['Hehe… kesepakatan bagus. Untukku.'],bijak:['Pertukaran yang adil.'],ceria:['Deal! Yay!'],malas:['Ambil saja… eh, iya, setuju.']};
const NB_NO={ramah:['Maaf, {me}… aku belum bisa melepasnya dengan tawaran itu.'],sombong:['Kau menghina monsterku dengan tawaran serendah itu?'],pemalu:['M-maaf… dia temanku…'],pemarah:['Tidak! Pergi sana!'],licik:['Hmm… tambahkan sedikit lagi, mungkin aku berubah pikiran.'],bijak:['Nilainya belum sepadan, kawan.'],ceria:['Ehh, jangan dia! Dia favoritku!'],malas:['Malas ah… tawarannya kurang.']};
function nbSay(nb,arr){ return pick(arr).replace(/\{me\}/g,G.lord.name).replace(/\{dn\}/g,nb.dname); }
function nbPush(nb,f,s){ nb.chat.push({f,s,d:G.day}); if(nb.chat.length>60) nb.chat.splice(0,nb.chat.length-60); }
function nbTalkOK(nb){ if(nb.talkDay!==G.day){ nb.talkDay=G.day; nb.talkN=0; } return nb.talkN<3; }
function nbRel(nb,d){ nb.rel=clamp(nb.rel+d,0,100); }
function nbGreet(nb){ nbPush(nb,'me','Halo!'); const ok=nbTalkOK(nb); const line=nb.rel>=60&&rnd()<.6?nbSay(nb,NB_CLOSE):nbSay(nb,NB_GREET[nb.pers]);
  let extra=''; if(rnd()<.7){ const w=nb.w; const pa=pick(w.parties.filter(p=>p.name))||{name:pick(P_FORM)()}; const m=pick(w.mons)||{name:'slime'}; extra=' '+pick(NB_SMALL).replace('{party}',pa.name).replace('{mon}',m.name+(m.sp?` (${SPECIES[m.sp].n})`:'')).replace('{dn}',nb.dname)+NB_TAIL[nb.pers]; }
  nbPush(nb,'them',line+extra); if(ok){ nb.talkN++; nbRel(nb,2); } nb.lastTalkDay=G.day; return ok?2:0; }
function nbAsk(nb){ nbPush(nb,'me','Bagaimana kabarmu? Ada masalah?'); nb.lastTalkDay=G.day;
  if(!nb.need) nb.need=rnd()<.6?nbGenNeed(nb):null;
  if(nb.need){ nb.needShown=true; nbPush(nb,'them',needTxt(nb)); if(nbTalkOK(nb)){ nb.talkN++; nbRel(nb,1); } }
  else nbPush(nb,'them',pick(['Semuanya aman! Dungeonku baik-baik saja.','Tidak ada masalah. Para petualang tumbang seperti biasa.','Kabar baik, kok. Terima kasih sudah bertanya.'])+NB_TAIL[nb.pers]); }
function nbComfort(nb){ nbPush(nb,'me',pick(['Kau tidak sendirian. Aku ada di sini.','Tenang saja, kita sama-sama Raja Iblis. Kau pasti bisa.','Kalau ada apa-apa, telepati aku saja.']));
  nbPush(nb,'them',nbSay(nb,NB_COMFORT[nb.pers])); const solve=nb.need&&(nb.need.k==='lonely'||nb.need.k==='hero'); nbRel(nb,solve?8:nbTalkOK(nb)?3:0); if(nbTalkOK(nb)) nb.talkN++; if(solve) nb.need=null; nb.lastTalkDay=G.day; return solve; }
function nbGiveGold(nb,n){ if(G.gold<n) return 'Emas kurang.'; G.gold-=n; nb.w.gold+=n; nbPush(nb,'me',`Kukirim ${n} emas untukmu.`); let d=Math.max(1,Math.min(12,Math.round(n/(80+nb.w.floors*15))));
  if(nb.need&&nb.need.k==='gold'&&n>=nb.need.n){ d+=10; nb.need=null; } nbRel(nb,d); nbPush(nb,'them',nbSay(nb,NB_THANK[nb.pers])); nb.lastTalkDay=G.day; return null; }
function nbGiveJiwa(nb,n){ if(G.jiwa<n) return 'Kristal Jiwa kurang.'; G.jiwa-=n; nb.w.jiwa+=n; nbPush(nb,'me',`Kukirim ${n} Kristal Jiwa.`); let d=Math.max(1,Math.min(10,Math.round(n/4)));
  if(nb.need&&nb.need.k==='jiwa'&&n>=nb.need.n){ d+=10; nb.need=null; } nbRel(nb,d); nbPush(nb,'them',nbSay(nb,NB_THANK[nb.pers])); nb.lastTalkDay=G.day; return null; }
function needFloor(nb){ const n=nb.need, fl=nb.w.floors; if(!n) return null; if(n.k==='monEarly') return ri(0,Math.min(2,fl-1)); if(n.k==='monMid') return Math.floor(fl/2); if(n.k==='monLate'||n.k==='hero') return Math.max(0,fl-1-ri(0,1)); return null; }
function moveMon(m,from,to,floor){ if(from===G&&m.eq) for(const s in m.eq) unequip(m,s); if(m.secret) withWorld(from,()=>clearSecret(m));
  from.mons=from.mons.filter(x=>x!==m);
  withWorld(to,()=>{ m.id=nid(); m.cd={}; m.fx={}; m.aggro=null; m.dead=false; m.secret=null; m.eq={}; m.hidden=false; m.revealed=0; m.strat=m.strat||'jaga'; G.mons.push(m);
    if(floor==null||floor<0){ if(to.isNeighbor) autoPlace(m); else m.floor=-1; } else { m.floor=Math.min(floor,G.floors-1); if(floorCount(m.floor)>FLOOR_CAP) autoPlace(m); }
    m.px=SLOT_X(ri(1,8)); m.x=m.px; m.hp=monStats(m).hp; }); }
function nbGiveMon(nb,m){ if(!m||m.floor>=0&&!confirmFree(m)) return 'Monster harus di cadangan dulu.'; const v=monValue(m); const fit=monFitsNeed(m,nb.need); const nm=m.name, sn=SPECIES[m.sp].n;
  moveMon(m,G,nb.w,fit?needFloor(nb):null); let d=Math.max(2,Math.min(15,Math.round(v/150))); if(fit){ d+=10; nb.need=null; } nbRel(nb,d);
  nbPush(nb,'me',`Kukirim ${nm} si ${sn} untuk menjaga dungeonmu.`); nbPush(nb,'them',nbSay(nb,NB_THANK[nb.pers])); nb.lastTalkDay=G.day; return null; }
function confirmFree(m){ return m.floor<0; }
// tukar: offer {k:'mon',m} | {k:'gold'} | {k:'jiwa'}
function nbTradeAsk(nb,their){ let ask=1.25-nb.rel*.006+(NB_ASK[nb.pers]||0); return Math.max(.6,ask); }
function nbTradePrice(nb,their){ const v=monValue(their)*nbTradeAsk(nb,their)*1.05; return {gold:Math.ceil(v/10)*10,jiwa:Math.max(5,Math.ceil(v/25))}; }
function nbTradeLocked(nb,their){ const s=SPECIES[their.sp]; if(s.rar>=3&&nb.rel<20) return 'Monster langka hanya mau ditukar dengan Kenalan (hubungan 20+).'; if(s.rar>=4&&nb.rel<40) return 'Monster UR hanya mau ditukar dengan Teman (hubungan 40+).';
  const left=nb.w.mons.filter(x=>x!==their&&!x.temp).length; if(left<3) return 'Mereka tidak mau melepas penjaga terakhirnya.'; return null; }
function nbTrade(nb,their,offer){ const lock=nbTradeLocked(nb,their); if(lock) return {ok:false,msg:lock};
  const tv=monValue(their), ask=nbTradeAsk(nb,their); const tn=`${their.name} si ${SPECIES[their.sp].n}`; let ok=false, give='';
  if(offer.k==='gold'){ const pr=nbTradePrice(nb,their).gold; if(G.gold<pr) return {ok:false,msg:`Emas kurang (butuh ${pr}).`}; ok=!(nb.pers==='sombong'&&nb.rel<10&&rnd()<.5); if(ok){ G.gold-=pr; nb.w.gold+=pr; } give=`${pr} emas`; }
  else if(offer.k==='jiwa'){ const pr=nbTradePrice(nb,their).jiwa; if(G.jiwa<pr) return {ok:false,msg:`Kristal Jiwa kurang (butuh ${pr}).`}; ok=!(nb.pers==='sombong'&&nb.rel<10&&rnd()<.5); if(ok){ G.jiwa-=pr; nb.w.jiwa+=pr; } give=`${pr} Kristal Jiwa`; }
  else { const m=offer.m; if(!m||m.floor>=0) return {ok:false,msg:'Pilih monster dari cadangan.'}; const ov=monValue(m)*(monFitsNeed(m,nb.need)?1.3:1); ok=ov>=tv*ask*rand(.9,1.1); give=`${m.name} si ${SPECIES[m.sp].n}`;
    if(ok){ const fit=monFitsNeed(m,nb.need); moveMon(m,G,nb.w,fit?needFloor(nb):their.floor); if(fit) nb.need=null; } }
  nbPush(nb,'me',`Aku ingin menukar ${tn} dengan ${give}.`);
  if(ok){ const fl=their.floor; moveMon(their,nb.w,G,-1); nbRel(nb,3); nbPush(nb,'them',nbSay(nb,NB_YES[nb.pers])); log(`Pertukaran dengan ${nb.w.lord.name}: ${tn} pindah ke cadanganmu (ditukar ${give}).`,'evo'); return {ok:true,msg:`${their.name} kini milikmu! Ada di cadangan.`}; }
  nbRel(nb,nb.pers==='sombong'||nb.pers==='pemarah'?-3:-1); nbPush(nb,'them',nbSay(nb,NB_NO[nb.pers])); return {ok:false,msg:'Tawaran ditolak.'}; }
/* ---------- kunjungan ---------- */
function nbVisitStart(nb){ G.visit=nb.id; const w=nb.w; for(const pa of w.parties) if(pa.state==='in') pa.state='town'; w.advs=[]; w.lord.hp=Math.max(w.lord.hp,1); }
function nbVisitEnd(){ const nb=(G.nbs||[]).find(n=>n.id===G.visit); G.visit=null; if(!nb) return; nbCompact(nb.w); }
function nbCompact(w){ for(let i=TIMERS.length-1;i>=0;i--) if(TIMERS[i].w===w) TIMERS.splice(i,1); w.advs=[]; w.parties=w.parties.filter(p=>p.state==='town'&&partyMembers0(w,p)).slice(-12);
  const keep=new Set(); for(const p of w.parties) for(const id of p.members) keep.add(String(id)); for(const id of Object.keys(w.people)) if(!keep.has(String(id))) delete w.people[id]; w.log=(w.log||[]).slice(0,20); }
function partyMembers0(w,pa){ return pa.members.some(id=>w.people[id]&&w.people[id].alive); }
/* ---------- tick utama ---------- */
const _stepNB=step;
step=function(){ _stepNB(); if(G.isNeighbor) return; MAINW=G; if(!G.nbs||(G.nbAcc=(G.nbAcc||0)+DT)>5){ G.nbAcc=0; nbInit(); }
  for(const nb of G.nbs||[]){
    if(G.visit===nb.id){ withWorld(nb.w,()=>{ _stepNB(); G.aiAcc=(G.aiAcc||0)+DT; if(G.aiAcc>15){ G.aiAcc=0; nbAI(); } }); }
    else { nb.acc+=DT; if(nb.acc>=20){ nb.acc=0; nbAbstract(nb); nbChatter(nb); } }
    nbCheckLord(nb); } };
function nbChatter(nb){ // tetangga yang memulai telepati
  if(nb.talkDay!==G.day){ nb.talkDay=G.day; nb.talkN=0; }
  if(!nb.need&&rnd()<.12) { nb.need=nbGenNeed(nb); nb.needShown=false; }
  if(G.day-nb.lastTalkDay>2&&nb.rel>25&&rnd()<.08) nbRel(nb,-1);
  if(G.t-nb.lastMsg>150&&rnd()<.05*(1+nb.rel/50)){ nb.lastMsg=G.t; let s;
    if(nb.need&&!nb.needShown){ nb.needShown=true; s=needTxt(nb); }
    else { const w=nb.w; const pa=pick(w.parties.filter(p=>p.name))||{name:genPartyName()}; const m=pick(w.mons)||{name:'slime'}; s=pick(NB_SMALL).replace('{party}',pa.name).replace('{mon}',m.name+(m.sp?` (${SPECIES[m.sp].n})`:'')).replace('{dn}',nb.dname)+NB_TAIL[nb.pers]; }
    nbPush(nb,'them',s); nb.unread++; log(`📡 ${nb.w.lord.name}: "${s.length>90?s.slice(0,88)+'…':s}"`,'nb'); }
  if(nb.rel>=60&&rnd()<.015){ const g=rnd()<.5; const n=g?ri(100,400):ri(5,15); if(g) G.gold+=n; else G.jiwa+=n; const s=`Ini hadiah kecil dariku: ${n} ${g?'emas':'Kristal Jiwa'}. Jangan ditolak!`; nbPush(nb,'them',s); nb.unread++; log(`📡 ${nb.w.lord.name} mengirim hadiah: ${n} ${g?'emas':'Kristal Jiwa'}.`,'nb'); } }
