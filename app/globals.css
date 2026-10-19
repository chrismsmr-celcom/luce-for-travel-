/* ============================================================
   LUCE — Design System v2 (basé sur le logo : goutte bleue)
   ============================================================ */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root{
  --bg:#eaf1fc;
  --bg2:#f7faff;
  --panel:#ffffff;
  --soft:#f2f6fd;
  --ink:#0f1d38;
  --mute:#68779b;
  --line:#e3eafb;
  --ac:#2168c0;            /* bleu du logo */
  --ac2:#4a9df0;           /* bleu clair */
  --acs:#e1efff;
  --on:#ffffff;
  --star:#f5b301;
  --bad:#d04a3c;
  --good:#1d9e6f;
  --grad:linear-gradient(135deg,#1d5fb0 0%,#3f8fe8 100%);
  --grad-soft:linear-gradient(135deg,#e1efff 0%,#eef6ff 100%);
  --sh:0 24px 70px rgba(29,75,150,.18);
  --sh-sm:0 6px 20px rgba(29,75,150,.10);
  --r-lg:28px; --r-md:20px; --r-sm:14px;
  --sans:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif;
}
@media (prefers-color-scheme:dark){
  :root{
    --bg:#0c1526; --bg2:#101c33;
    --panel:#152240; --soft:#101b33;
    --ink:#eef3ff; --mute:#8ea0c6; --line:#23345c;
    --ac:#5ea1f2; --ac2:#7fb9ff; --acs:#1d3159;
    --on:#0a1322; --bad:#ff8577; --good:#4ad6a3;
    --grad:linear-gradient(135deg,#2f7de0 0%,#5ea1f2 100%);
    --grad-soft:linear-gradient(135deg,#16294e 0%,#101d3a 100%);
    --sh:0 24px 70px rgba(0,0,0,.55); --sh-sm:0 6px 20px rgba(0,0,0,.4);
  }
}

*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;color:var(--ink);
  font:15px/1.5 var(--sans);
  min-height:100dvh;overflow-x:hidden;position:relative;
  padding:max(12px,env(safe-area-inset-top,0px)) 12px calc(120px + env(safe-area-inset-bottom,0px));
  background:
    radial-gradient(60% 45% at 85% -5%,rgba(74,157,240,.22),transparent 60%),
    radial-gradient(50% 40% at -10% 30%,rgba(33,104,192,.14),transparent 60%),
    linear-gradient(180deg,var(--bg2),var(--bg));
  background-attachment:fixed;
}
button,input{font:inherit;color:inherit}
button{cursor:pointer;-webkit-tap-highlight-color:transparent;border:0}
button:disabled{cursor:default}
:focus-visible{outline:2.5px solid var(--ac);outline-offset:2px;border-radius:10px}
::selection{background:var(--acs);color:var(--ink)}
.ic{width:1.15em;height:1.15em;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}
.ic.f{fill:currentColor;stroke:none}

/* ---- Logo ---- */
.logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px;letter-spacing:-.2px}
.logo img{width:34px;height:34px;object-fit:contain;filter:drop-shadow(0 3px 8px rgba(29,75,150,.35))}
.side .logo{margin-bottom:30px;font-size:19px}
.side .logo img{width:38px;height:38px}

/* ---- Décor d'arrière-plan ---- */
.orb{position:fixed;pointer-events:none;z-index:0}
.o1{width:130px;height:130px;border-radius:50%;left:-30px;bottom:8%;
  background:radial-gradient(circle at 30% 30%,#bcd8fb,#7fb3e8 55%,#3f8fe8);
  filter:blur(2px);opacity:.5;animation:float 9s ease-in-out infinite}
.o2{width:64px;height:64px;border-radius:18px;right:26%;top:3%;
  background:linear-gradient(135deg,#dcebff,#9cc4f5);opacity:.55;transform:rotate(20deg);
  animation:float 11s ease-in-out infinite reverse}
@keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-16px) rotate(8deg)}}
@media (prefers-reduced-motion:reduce){.orb{animation:none}}

/* ---- Coquille ---- */
.shell{position:relative;z-index:1;max-width:1280px;margin:0 auto;background:var(--panel);
  border-radius:var(--r-lg);box-shadow:var(--sh);display:grid;grid-template-columns:minmax(0,1fr);overflow:hidden;
  border:1px solid rgba(255,255,255,.6)}
@media (prefers-color-scheme:dark){.shell{border-color:var(--line)}}
@media (min-width:1040px){.shell{grid-template-columns:200px minmax(0,1fr) 310px}}

/* ---- Barre latérale ---- */
.side{display:none;padding:28px 16px;flex-direction:column;gap:8px;
  background:linear-gradient(180deg,var(--grad-soft),transparent)}
@media (min-width:1040px){.side{display:flex}}
.nav{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:14px;
  background:transparent;color:var(--mute);text-align:left;font-weight:600;transition:all .2s}
.nav:hover:not(:disabled){background:var(--soft);color:var(--ink);transform:translateX(2px)}
.nav.on{background:var(--grad);color:#fff;box-shadow:0 8px 18px rgba(33,104,192,.35)}
.nav:disabled{opacity:.6}
.promo{margin-top:auto;border-radius:18px;padding:16px;background:var(--grad);color:#fff;
  font-weight:700;font-size:13px;line-height:1.4;box-shadow:0 12px 26px rgba(33,104,192,.35)}
.promo span{display:inline-block;margin-top:10px;background:#fff;color:var(--ac);border-radius:999px;padding:3px 12px;font-size:11px;font-weight:800}

/* ---- Zone principale ---- */
.main{background:var(--soft);margin:10px;padding:20px 16px 28px;border-radius:24px;min-width:0;border:1px solid var(--line)}
@media (min-width:1040px){.main{margin:14px 0;padding:26px}}
.mtop{display:flex;align-items:center;margin-bottom:16px}
@media (min-width:1040px){.mtop{display:none}}

h1{margin:0;font-size:clamp(27px,6vw,38px);letter-spacing:-1px;line-height:1.12;font-weight:800}
h1 em{font-style:normal;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.head{display:flex;flex-direction:column;gap:14px}
@media (min-width:760px){.head{flex-direction:row;align-items:center;justify-content:space-between}}

/* ---- Barre de recherche ---- */
.search{display:flex;align-items:center;gap:8px;background:var(--panel);border:1.5px solid var(--line);
  border-radius:18px;padding:5px 5px 5px 16px;flex:1;max-width:480px;min-width:0;box-shadow:var(--sh-sm);transition:border-color .2s,box-shadow .2s}
.search:focus-within{border-color:var(--ac);box-shadow:0 0 0 4px var(--acs)}
.search .ic{color:var(--mute)}
.search input{border:0;background:none;outline:0;padding:10px 0;width:100%;min-width:0;font-size:16px}
.search input::placeholder{color:var(--mute)}
.sbtn{border:0;background:var(--grad);color:#fff;border-radius:13px;padding:0 18px;min-height:44px;font-weight:800;
  white-space:nowrap;box-shadow:0 6px 16px rgba(33,104,192,.35);transition:transform .15s,box-shadow .2s,opacity .2s}
.sbtn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 10px 22px rgba(33,104,192,.45)}
.sbtn:active:not(:disabled){transform:translateY(0)}
.sbtn:disabled{opacity:.6;box-shadow:none}

.hints{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.hint{border:1.5px solid var(--line);background:var(--panel);border-radius:999px;padding:7px 14px;
  color:var(--mute);font-size:13px;font-weight:600;transition:all .2s}
.hint:hover{border-color:var(--ac);color:var(--ac);background:var(--acs)}

h2{margin:28px 0 14px;font-size:17px;font-weight:800;display:flex;justify-content:space-between;align-items:baseline;letter-spacing:-.2px}
h2 small{color:var(--ac);font-weight:700;font-size:13px}

/* ---- Catégories ---- */
.cats{display:flex;gap:10px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none}
.cats::-webkit-scrollbar{display:none}
.cat{background:var(--panel);border:1.5px solid var(--line);border-radius:999px;padding:6px 18px 6px 7px;
  display:flex;gap:9px;align-items:center;white-space:nowrap;color:var(--mute);font-weight:700;min-height:46px;transition:all .2s}
.cat span{width:34px;height:34px;border-radius:50%;background:var(--soft);display:grid;place-items:center;transition:all .2s}
.cat:hover{border-color:var(--ac)}
.cat.on{background:var(--grad);border-color:transparent;color:#fff;box-shadow:0 8px 18px rgba(33,104,192,.35)}
.cat.on span{background:rgba(255,255,255,.22)}

/* ---- Notes / messages ---- */
.lnote{background:var(--panel);border-radius:16px;padding:14px 16px;margin-top:16px;
  border-left:4px solid var(--ac);box-shadow:var(--sh-sm)}
.lnote b{color:var(--ac)}
.lnote p{margin:5px 0 0;color:var(--mute);font-size:13px}
.msg{margin-top:16px;background:var(--panel);border-radius:16px;padding:13px 16px;color:var(--mute);
  border:1px solid var(--line)}
.msg.err{color:var(--bad);border-color:var(--bad);background:color-mix(in srgb,var(--bad) 7%,var(--panel))}
.spin{display:inline-block;width:14px;height:14px;border:2.5px solid var(--line);border-top-color:var(--ac);
  border-radius:50%;animation:rot .8s linear infinite;vertical-align:-2px;margin-right:8px}
@keyframes rot{to{transform:rotate(360deg)}}

/* ---- Cartes recommandées ---- */
.rec{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 -16px;padding:4px 16px 10px;scrollbar-width:none}
.rec::-webkit-scrollbar{display:none}
.rc{position:relative;flex:0 0 min(64vw,215px);height:200px;scroll-snap-align:start;border-radius:var(--r-md);
  padding:14px;color:#fff;text-align:left;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;
  background-size:cover;background-position:center;transition:transform .25s,box-shadow .25s;isolation:isolate}
.rc::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 32%,rgba(8,20,50,.78));z-index:1}
.rc>*{position:relative;z-index:2}
.rc>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;transition:transform .5s}
.rc:hover{transform:translateY(-4px);box-shadow:0 16px 34px rgba(20,50,110,.35)}
.rc:hover>img{transform:scale(1.06)}
.rc b{font-size:15.5px;letter-spacing:-.2px}
.rc .m{display:flex;gap:10px;font-size:11.5px;opacity:.95;flex-wrap:wrap;margin:3px 0}
.rc .m span{display:flex;align-items:center;gap:4px}
.rc .pr{font-weight:800;font-size:16px}
.rt{position:absolute!important;top:10px;right:10px;background:rgba(255,255,255,.94);color:#1a2440;
  border-radius:999px;font-size:11px;font-weight:800;padding:3px 9px;display:flex;align-items:center;gap:3px;z-index:3!important}
.rt .ic{color:var(--star)}
.pick{position:absolute!important;top:10px;left:10px;background:var(--grad);color:#fff;border-radius:999px;
  font-size:11px;font-weight:800;padding:3px 10px;z-index:3!important;box-shadow:0 4px 12px rgba(33,104,192,.5)}
.sel{outline:3px solid var(--ac);outline-offset:2px}
@media (min-width:760px){.rec{flex-wrap:wrap;overflow:visible;margin:0;padding:0}.rc{flex:0 0 calc(25% - 11px)}}

/* ---- Liste populaire ---- */
.pop{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:14px}
.pi{display:flex;gap:12px;background:var(--panel);border:2px solid transparent;border-radius:var(--r-md);
  padding:10px;text-align:left;align-items:center;min-height:82px;box-shadow:var(--sh-sm);transition:all .2s}
.pi:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(29,75,150,.16)}
.pi.sel{outline:0;border-color:var(--ac);background:var(--grad-soft)}
.th{position:relative;width:64px;height:64px;border-radius:14px;flex:none;overflow:hidden}
.th img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.pc{flex:1;min-width:0}
.pc .t{display:flex;justify-content:space-between;gap:6px;font-weight:700}
.pc .t span{display:flex;align-items:center;gap:3px;font-size:12px;flex:none}
.pc .t .ic{color:var(--star)}
.pc .s{display:flex;align-items:center;gap:4px;color:var(--mute);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pc .p{color:var(--ac);font-weight:800;font-size:15.5px}
.pc .p small{color:var(--mute);font-weight:500;font-size:12px}

/* ---- Colonne de droite ---- */
.right{padding:8px 16px 20px;display:flex;flex-direction:column;gap:14px;min-width:0}
@media (min-width:1040px){.right{padding:26px 20px}}
.right h3{margin:8px 0 0;font-size:15px;font-weight:800;display:flex;justify-content:space-between;align-items:center}
.box{background:var(--soft);border:1px solid var(--line);border-radius:var(--r-md);padding:14px;display:grid;gap:12px}
.fld{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:13px}
.fld>span{color:var(--mute);font-weight:600}
.fld input{border:1.5px solid var(--line);background:var(--panel);border-radius:12px;padding:9px 12px;
  width:132px;text-align:right;font-size:16px;min-width:0;font-weight:700;transition:border-color .2s}
.fld input:focus{outline:0;border-color:var(--ac);box-shadow:0 0 0 3px var(--acs)}
.step{display:flex;align-items:center;gap:12px}
.step button{width:36px;height:36px;border-radius:50%;background:var(--acs);color:var(--ac);font-size:19px;
  line-height:1;font-weight:700;transition:all .15s}
.step button:hover:not(:disabled){transform:scale(1.08)}
.step b{min-width:20px;text-align:center;font-size:16px}
.ghost{border:0;background:var(--acs);color:var(--ac);border-radius:14px;padding:11px;font-weight:800;
  min-height:44px;transition:all .2s}
.ghost:hover:not(:disabled){background:var(--ac);color:#fff}

/* ---- Calendrier ---- */
.cal-head{display:flex;justify-content:space-between;align-items:center;font-size:15px;font-weight:800;text-transform:capitalize;margin:4px 2px 0}
.mn{display:flex;gap:6px}
.mn button{border:0;background:var(--soft);width:30px;height:30px;border-radius:50%;display:grid;place-items:center;transition:all .15s}
.mn button:hover{background:var(--acs);color:var(--ac)}
.cal{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-size:13px;row-gap:2px}
.cal span{color:var(--mute);font-size:11px;font-weight:700;padding:4px 0}
.cal button{border:0;background:none;height:36px;border-radius:50%;font-weight:600;transition:all .15s}
.cal button:hover:not(:disabled):not(.e){background:var(--acs);color:var(--ac)}
.cal .in{background:var(--acs);border-radius:0}
.cal .e{background:var(--grad);color:#fff;font-weight:800}
.cal button:disabled{opacity:.32;cursor:default}

/* ---- Historique ---- */
.last{display:flex;gap:10px;align-items:center;background:var(--panel);border:1.5px solid var(--line);
  border-radius:var(--r-sm);padding:8px;text-align:left;width:100%;transition:all .2s}
.last:hover{border-color:var(--ac);transform:translateX(2px)}
.last .th{width:44px;height:44px}
.last b{display:block}
.last small{color:var(--mute)}

/* ---- Dock flottant ---- */
.dock{position:fixed;z-index:20;left:50%;transform:translateX(-50%);
  bottom:calc(14px + env(safe-area-inset-bottom,0px));width:min(580px,calc(100% - 24px));
  background:var(--panel);color:var(--ink);border:1.5px solid var(--line);border-radius:22px;
  padding:10px 10px 10px 20px;display:flex;align-items:center;gap:14px;box-shadow:0 18px 44px rgba(20,45,100,.3)}
.dock div{flex:1;min-width:0;line-height:1.25}
.dock small{display:block;font-size:12px;color:var(--mute)}
.dock b{font-size:19px;letter-spacing:-.3px}
.dock .ov{color:var(--bad)!important;font-weight:700}
.dock .un{color:var(--good)!important;font-weight:700}
.pbar{height:5px;border-radius:99px;background:var(--line);margin-top:6px;overflow:hidden}
.pbar i{display:block;height:100%;border-radius:99px;background:var(--grad);transition:width .4s ease}
.pbar i.ov{background:linear-gradient(90deg,#e2703a,var(--bad))}
.dock>button{border:0;background:var(--grad);color:#fff;border-radius:15px;padding:0 22px;min-height:48px;
  font-weight:800;box-shadow:0 6px 16px rgba(33,104,192,.35);transition:all .2s;white-space:nowrap}
.dock>button:hover:not(:disabled){transform:translateY(-1px)}
.dock>button:disabled{opacity:.45;box-shadow:none}

/* ---- Feuille de validation ---- */
.scrim{position:fixed;inset:0;z-index:30;background:rgba(8,14,35,.55);backdrop-filter:blur(6px);
  display:flex;align-items:flex-end;justify-content:center;animation:fade .2s}
.sheet{background:var(--panel);width:100%;max-width:520px;max-height:90dvh;overflow:auto;
  border-radius:28px 28px 0 0;padding:24px 22px calc(24px + env(safe-area-inset-bottom,0px));
  animation:up .3s cubic-bezier(.2,.8,.2,1);box-shadow:0 -18px 60px rgba(0,0,0,.3)}
@media (min-width:640px){.scrim{align-items:center}.sheet{border-radius:28px}}
@keyframes up{from{transform:translateY(50px);opacity:0}}
@keyframes fade{from{opacity:0}}
.sheet header{display:flex;justify-content:space-between;align-items:center}
.sheet h2{margin:0;font-size:22px;font-weight:800;letter-spacing:-.4px}
.link{border:0;background:none;color:var(--mute);min-height:40px;padding:0 4px;text-decoration:underline;font-weight:600}
.it{display:flex;justify-content:space-between;gap:12px;padding:14px 0;border-top:1px solid var(--line);font-weight:600}
.it small{display:block;color:var(--mute);font-weight:500}
.it strong{white-space:nowrap}
.it .link{color:var(--bad);font-size:13px}
.ck{display:flex;gap:12px;align-items:flex-start;margin:16px 0;color:var(--mute);font-size:14px}
.ck input{width:22px;height:22px;accent-color:var(--ac);flex:none;margin-top:1px}
.pay{width:100%;border:0;background:var(--grad);color:#fff;border-radius:16px;min-height:54px;
  font-weight:800;font-size:16.5px;box-shadow:0 10px 24px rgba(33,104,192,.4);transition:all .2s}
.pay:hover:not(:disabled){transform:translateY(-1px)}
.pay:disabled{opacity:.45;box-shadow:none}

@media (prefers-reduced-motion:reduce){.scrim,.sheet,.spin,.orb{animation:none}*{transition:none!important}}
