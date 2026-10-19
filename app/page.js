"use client";
import { useEffect, useMemo, useState } from "react";

const P = {
  home: "M3 11l9-8 9 8M5 10v10h14V10", compass: "M12 3a9 9 0 100 18 9 9 0 000-18zM16 8l-2 6-6 2 2-6z",
  heart: "M12 20s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z", pin: "M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  bag: "M5 8h14l-1 12H6zM9 8V6a3 3 0 016 0v2", globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  bed: "M3 18V7M3 14h18v4M21 14v-2a3 3 0 00-3-3h-7v5", plane: "M21 16l-8-4.5V6a1.5 1.5 0 00-3 0v5.5L2 16v2l8-2v3l-2 1.5V22l4-1 4 1v-1.5L14 19v-3l7 2z",
  ticket: "M3 9V6h18v3a3 3 0 000 6v3H3v-3a3 3 0 000-6zM14 6v12", star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5", r: "M9 6l6 6-6 6", l: "M15 6l-6 6 6 6",
  cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4", clock: "M12 4a8 8 0 100 16 8 8 0 000-16zM12 8v4l3 2", mail: "M3 6h18v12H3zM3 7l9 7 9-7",
};
const Ic = ({ n, f }) => <svg className={"ic" + (f ? " f" : "")} viewBox="0 0 24 24" aria-hidden="true"><path d={P[n]} /></svg>;

const ONE = { hotels: "Hôtel", flights: "Vol", tours: "Activité" };
const CATS = [["all", "globe", "Tout"], ["hotels", "bed", "Hôtels"], ["flights", "plane", "Vols"], ["tours", "ticket", "Activités"]];
const IDEAS = ["Week-end à Lisbonne, budget 800 $", "Acheter des marchandises à Guangzhou, 5 jours", "Une semaine à Istanbul en novembre"];
const toIso = (d) => d.toISOString().slice(0, 10);
const plus = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return toIso(d); };
const fd = (k) => (k ? new Date(k + "T00:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) : "…");
const hue = (s) => [...String(s)].reduce((a, c) => a + c.charCodeAt(0) * 7, 0) % 360;
const art = (id) => { const h = hue(id); return { background: `radial-gradient(120% 90% at 15% 10%, hsl(${h} 95% 74%), transparent 60%), radial-gradient(110% 90% at 90% 95%, hsl(${(h + 70) % 360} 85% 60%), hsl(${(h + 140) % 360} 55% 30%))` }; };

function propose(res, budget) {
  const flight = [...res.flights].sort((a, b) => a.total - b.total)[0];
  const base = flight?.total || 0;
  const hotel = [...res.hotels].filter((h) => h.total + base <= budget).sort((a, b) => b.rating - a.rating || a.total - b.total)[0] || [...res.hotels].sort((a, b) => a.total - b.total)[0];
  const out = {};
  if (hotel) out.hotels = hotel;
  if (flight) out.flights = flight;
  const used = (hotel?.total || 0) + base;
  const tour = [...res.tours].sort((a, b) => b.rating - a.rating).find((t) => used + t.total <= budget);
  if (tour) out.tours = tour;
  return out;
}

function Cal({ d1, d2, pick }) {
  const [v, setV] = useState(() => { const d = new Date(d1); return new Date(d.getFullYear(), d.getMonth(), 1); });
  useEffect(() => { const d = new Date(d1); setV(new Date(d.getFullYear(), d.getMonth(), 1)); }, [d1]);
  const y = v.getFullYear(), m = v.getMonth(), first = (new Date(y, m, 1).getDay() + 6) % 7, dim = new Date(y, m + 1, 0).getDate(), now = toIso(new Date());
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(<i key={"b" + i} />);
  for (let d = 1; d <= dim; d++) {
    const k = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push(<button key={k} type="button" disabled={k < now} className={k === d1 || k === d2 ? "e" : d2 && k > d1 && k < d2 ? "in" : ""} onClick={() => pick(k)}>{d}</button>);
  }
  return (
    <>
      <h3>{v.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
        <span className="mn"><button type="button" aria-label="Mois précédent" onClick={() => setV(new Date(y, m - 1, 1))}><Ic n="l" /></button><button type="button" aria-label="Mois suivant" onClick={() => setV(new Date(y, m + 1, 1))}><Ic n="r" /></button></span></h3>
      <div className="cal">{["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <span key={i}>{d}</span>)}{cells}</div>
    </>
  );
}

const Pic = ({ x }) => (x.img ? <img src={x.img} alt="" loading="lazy" /> : null);

export default function Home() {
  const [f, setF] = useState({ org: "FIH", dest: "Guangzhou, CN", d1: plus(21), d2: plus(26), pax: 1, budget: 1500, cur: "USD" });
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState("all");
  const [res, setRes] = useState(null);
  const [agent, setAgent] = useState(null);
  const [trace, setTrace] = useState([]);
  const [phase, setPhase] = useState("idle");
  const [demo, setDemo] = useState(false);
  const [sel, setSel] = useState({});
  const [open, setOpen] = useState(false);
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [hist, setHist] = useState([]);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  useEffect(() => { try { setHist(JSON.parse(localStorage.getItem("luce_h") || "[]")); } catch {} }, []);
  const saveHist = (q, dest, d1) => { try { const h = [{ q, dest, d1 }, ...hist.filter((x) => x.q !== q)].slice(0, 3); setHist(h); localStorage.setItem("luce_h", JSON.stringify(h)); } catch {} };

  const fmt = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: f.cur, currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 }).format(n);
  const nights = Math.max(1, Math.round((new Date(f.d2) - new Date(f.d1)) / 864e5));
  const chosen = Object.values(sel).filter(Boolean);
  const total = chosen.reduce((a, x) => a + x.total, 0);
  const plan = useMemo(() => (agent?.sel ? agent.sel : res ? propose(res, f.budget) : {}), [res, f.budget, agent]);
  const planKeys = new Set(Object.values(plan).map((x) => x.type + x.id));
  const all = res ? (tab === "all" ? [...res.hotels, ...res.flights, ...res.tours] : res[tab]) : [];
  const rec = [...all].sort((a, b) => planKeys.has(b.type + b.id) - planKeys.has(a.type + a.id) || b.rating - a.rating).slice(0, 4);
  const pop = all.filter((x) => !rec.includes(x)).sort((a, b) => a.total - b.total).slice(0, 8);
  const isSel = (x) => sel[x.type]?.id === x.id;
  const toggle = (x) => setSel((s) => ({ ...s, [x.type]: s[x.type]?.id === x.id ? undefined : x }));
  const scroll = () => setTimeout(() => document.getElementById("res")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  const pickDate = (k) => setF((s) => (!s.d2 || k <= s.d1 ? { ...s, d1: k, d2: "" } : { ...s, d2: k }));

  async function ask(text) {
    setErr("");
    if (text.trim().length < 5) return setErr("Décrivez votre voyage en une phrase.");
    setPhase("loading"); setRes(null); setSel({}); setOk(false); setAgent(null); setTrace([]);
    try {
      const r = await fetch("/api/agent", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message: text, org: f.org, cur: f.cur }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "erreur");
      const nf = { ...f, ...(j.params || {}) }; setF(nf);
      setRes(j.results); setDemo(!!j.demo); setTrace(j.trace || []);
      setAgent(j.plan && Object.keys(j.plan.sel).length ? j.plan : null);
      saveHist(text, nf.dest, nf.d1); setPhase("done"); scroll();
    } catch (x) {
      setPhase("idle");
      setErr(x.message === "NO_AI_KEY" ? "Luce n’a pas encore sa clé IA (DEEPSEEK_API_KEY). Utilisez « Actualiser les offres » en attendant." : "Luce n’a pas pu traiter la demande. Réessayez.");
    }
  }

  async function refresh() {
    setErr("");
    const [city, cc] = f.dest.split(",").map((s) => s.trim());
    if (!city || !cc) return setErr("Destination : ville et code pays, par exemple « Paris, FR ».");
    if (!f.d2 || f.d2 <= f.d1) return setErr("Choisissez une date de retour dans le calendrier.");
    setPhase("loading"); setRes(null); setSel({}); setOk(false); setAgent(null); setTrace([]);
    const base = { city, cc, org: f.org, checkin: f.d1, checkout: f.d2, adults: f.pax, cur: f.cur };
    const out = {}; let anyDemo = false;
    await Promise.all(["hotels", "flights", "tours"].map(async (t) => {
      try { const j = await (await fetch("/api/search?" + new URLSearchParams({ ...base, type: t }))).json(); out[t] = j.items || []; anyDemo = anyDemo || !!j.demo; } catch { out[t] = []; }
    }));
    setDemo(anyDemo); setRes(out); setPhase("done"); scroll();
  }

  async function pay() {
    setBusy(true); setErr("");
    try {
      const r = await fetch("/api/deeplink", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ sel, checkin: f.d1, checkout: f.d2, adults: f.pax, cur: f.cur, total }) });
      const j = await r.json(); if (!j.url) throw new Error();
      window.location.assign(j.url);
    } catch { setErr("Le lien de paiement n’a pas pu être créé. Réessayez."); setBusy(false); }
  }

  const line = (x) => x.type === "hotels" ? <><span><Ic n="cal" />{fd(f.d1)}</span><span><Ic n="clock" />{nights} nuits</span></> : <span>{x.sub}</span>;

  return (
    <>
      <div className="orb o1" aria-hidden="true" /><div className="orb o2" aria-hidden="true" />
      <div className="shell">
        <aside className="side">
          <div className="logo"><i><Ic n="globe" /></i>Luce</div>
          <button className="nav on"><Ic n="home" />Accueil</button>
          {[["compass", "Explorer"], ["heart", "Favoris"], ["pin", "Destinations"], ["mail", "Messages"]].map(([i, l]) => <button key={l} className="nav" disabled title="Bientôt"><Ic n={i} />{l}</button>)}
          <div className="promo">Luce prépare, vous validez.<br /><span>Paiement sur Luviaplace</span></div>
        </aside>

        <main className="main">
          <div className="mtop"><div className="logo"><i><Ic n="globe" /></i>Luce</div></div>
          <div className="head">
            <h1>Découvrez la <em>beauté</em> du monde !</h1>
            <form className="search" onSubmit={(e) => { e.preventDefault(); ask(msg); }}>
              <Ic n="search" />
              <input value={msg} onChange={(e) => setMsg(e.target.value)} maxLength={600} aria-label="Dites à Luce où vous allez" placeholder="Où allez-vous ? Dites-le à Luce" />
              <button className="sbtn" disabled={phase === "loading"}>{phase === "loading" ? "Luce…" : "Chercher"}</button>
            </form>
          </div>
          {!res && phase !== "loading" && <div className="hints">{IDEAS.map((t) => <button key={t} className="hint" onClick={() => { setMsg(t); ask(t); }}>{t}</button>)}</div>}

          <h2>Catégories</h2>
          <div className="cats">{CATS.map(([k, i, l]) => <button key={k} className={"cat" + (tab === k ? " on" : "")} onClick={() => setTab(k)}><span><Ic n={i} /></span>{l}</button>)}</div>

          <div id="res">
            {err && <div className="msg err" role="alert">{err}</div>}
            {phase === "loading" && <div className="msg" aria-live="polite"><span className="spin" />Luce lit votre demande, cherche et compare…</div>}
            {!res && phase === "idle" && !err && <div className="msg">Décrivez votre voyage : destination, dates, budget. Luce s’occupe du reste.</div>}
            {demo && res && <div className="msg">Données d’exemple. Ajoutez votre clé LiteAPI pour voir les vraies offres.</div>}
            {res && (agent || trace.length > 0) && (
              <div className="lnote"><b>Luce</b> {agent?.summary}
                {agent?.risks?.length > 0 && <p>À vérifier avant de payer : {agent.risks.join(" · ")}</p>}
                {trace.length > 0 && <p>Recherches : {trace.join(" · ")}</p>}</div>
            )}
            {res && !all.length && <div className="msg">Aucun résultat. Changez les dates ou la destination.</div>}
            {rec.length > 0 && (<>
              <h2>Recommandés <small>{all.length} offres</small></h2>
              <div className="rec">{rec.map((x) => (
                <button key={x.type + x.id} className={"rc" + (isSel(x) ? " sel" : "")} style={art(x.id)} onClick={() => toggle(x)} aria-pressed={isSel(x)}>
                  <Pic x={x} />
                  {planKeys.has(x.type + x.id) && <span className="pick">{isSel(x) ? "Ajouté" : "Choix de Luce"}</span>}
                  {x.rating > 0 && <span className="rt"><Ic n="star" f />{x.rating.toFixed(1)}</span>}
                  <b>{x.name}</b><div className="m">{line(x)}</div><div className="pr">{fmt(x.total)}</div>
                </button>))}</div>
            </>)}
            {pop.length > 0 && (<>
              <h2>Les plus populaires</h2>
              <div className="pop">{pop.map((x) => (
                <button key={x.type + x.id} className={"pi" + (isSel(x) ? " sel" : "")} onClick={() => toggle(x)} aria-pressed={isSel(x)}>
                  <span className="th" style={art(x.id)}><Pic x={x} /></span>
                  <span className="pc"><span className="t"><b>{x.name}</b>{x.rating > 0 && <span><Ic n="star" f />{x.rating.toFixed(1)}</span>}</span>
                    <span className="s"><Ic n="pin" />{x.sub || ONE[x.type]}</span>
                    <span className="p"><small>Dès </small>{fmt(x.total)}</span></span>
                </button>))}</div>
            </>)}
          </div>
        </main>

        <aside className="right">
          <h3>Votre voyage</h3>
          <div className="box">
            <label className="fld"><span>Départ</span><input value={f.org} maxLength={3} onChange={(e) => set("org", e.target.value.toUpperCase())} /></label>
            <label className="fld"><span>Destination</span><input value={f.dest} onChange={(e) => set("dest", e.target.value)} /></label>
            <div className="fld"><span>Voyageurs</span><div className="step"><button type="button" aria-label="Moins" onClick={() => set("pax", Math.max(1, f.pax - 1))}>−</button><b>{f.pax}</b><button type="button" aria-label="Plus" onClick={() => set("pax", Math.min(6, f.pax + 1))}>+</button></div></div>
            <label className="fld"><span>Budget ({f.cur})</span><input type="number" inputMode="numeric" value={f.budget} onChange={(e) => set("budget", Number(e.target.value) || 0)} /></label>
            <button className="ghost" onClick={refresh} disabled={phase === "loading"}>Actualiser les offres</button>
          </div>
          <Cal d1={f.d1} d2={f.d2} pick={pickDate} />
          <div className="fld" style={{ justifyContent: "center", color: "var(--mute)" }}>{fd(f.d1)} → {fd(f.d2)}{f.d2 ? ` · ${nights} nuits` : ""}</div>
          <h3>Dernières recherches</h3>
          {hist.length ? hist.map((h) => (
            <button key={h.q} className="last" onClick={() => { setMsg(h.q); ask(h.q); }}>
              <span className="th" style={art(h.dest)} /><span><b>{h.dest.split(",")[0]}</b><small>{h.q.slice(0, 34)}</small></span></button>
          )) : <div className="box" style={{ color: "var(--mute)" }}>Vos recherches apparaîtront ici.</div>}
        </aside>
      </div>

      {res && (
        <div className="dock">
          <div><small>Votre dossier · {chosen.length} sélection{chosen.length > 1 ? "s" : ""}</small><b>{fmt(total)}</b> <small style={{ display: "inline" }}>{total > f.budget ? `(+${fmt(total - f.budget)})` : `sur ${fmt(f.budget)}`}</small></div>
          <button disabled={!chosen.length} onClick={() => setOpen(true)}>Voir le dossier</button>
        </div>
      )}

      {open && (
        <div className="scrim" onClick={(e) => e.target === e.currentTarget && setOpen(false)} onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
          <div className="sheet" role="dialog" aria-modal="true" aria-label="Votre dossier de voyage">
            <header><h2>Votre dossier</h2><button className="link" onClick={() => setOpen(false)}>Fermer</button></header>
            {chosen.map((x) => (
              <div className="it" key={x.type}><div>{x.name}<small>{ONE[x.type]}{x.type === "hotels" ? ` · ${nights} nuits` : ""}</small><button className="link" style={{ padding: 0 }} onClick={() => toggle(x)}>Retirer</button></div><strong>{fmt(x.total)}</strong></div>
            ))}
            <div className="it"><div>Total<small>{total <= f.budget ? `${fmt(f.budget - total)} sous votre budget` : `${fmt(total - f.budget)} au-dessus de votre budget`}</small></div><strong>{fmt(total)}</strong></div>
            <label className="ck"><input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} /><span>J’ai vérifié les dates et les prix, ainsi que les conditions de visa pour ma nationalité.</span></label>
            <button className="pay" disabled={!ok || busy || !chosen.length} onClick={pay}>{busy ? "Ouverture…" : "Payer sur Luviaplace"}</button>
            {err && <p className="msg err" role="alert">{err}</p>}
          </div>
        </div>
      )}
    </>
  );
}
