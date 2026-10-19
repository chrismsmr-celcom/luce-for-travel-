"use client";
import { useMemo, useState } from "react";

const ONE = { hotels: "Hôtel", flights: "Vol", tours: "Activité" };
const MANY = { hotels: "Hôtels", flights: "Vols", tours: "Activités" };
const plus = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const hue = (s) => [...String(s)].reduce((a, c) => a + c.charCodeAt(0) * 7, 0) % 360;
const art = (id) => { const h = hue(id); return { background: `radial-gradient(120% 90% at 15% 10%, hsl(${h} 95% 72%), transparent 60%), radial-gradient(110% 90% at 90% 95%, hsl(${(h + 70) % 360} 85% 58%), hsl(${(h + 140) % 360} 55% 28%))` }; };

function Inl({ value, onChange, type = "text", label, upper }) {
  const w = type === "date" ? undefined : `${Math.max(2, String(value).length + 1)}ch`;
  return <input className="inl" aria-label={label} type={type} value={value} inputMode={type === "number" ? "numeric" : undefined} style={{ width: w }}
    onChange={(e) => onChange(upper ? e.target.value.toUpperCase() : e.target.value)} />;
}

function propose(res, budget) {
  const flight = [...res.flights].sort((a, b) => a.total - b.total)[0];
  const base = flight?.total || 0;
  const hotel = [...res.hotels].filter((h) => h.total + base <= budget).sort((a, b) => b.rating - a.rating || a.total - b.total)[0]
    || [...res.hotels].sort((a, b) => a.total - b.total)[0];
  const out = {};
  if (hotel) out.hotels = hotel;
  if (flight) out.flights = flight;
  const used = (hotel?.total || 0) + base;
  const tour = [...res.tours].sort((a, b) => b.rating - a.rating).find((t) => used + t.total <= budget);
  if (tour) out.tours = tour;
  return out;
}

export default function Home() {
  const [f, setF] = useState({ org: "FIH", dest: "Guangzhou, CN", d1: plus(21), d2: plus(26), pax: 1, budget: 1500, cur: "USD" });
  const [res, setRes] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [prog, setProg] = useState({});
  const [demo, setDemo] = useState(false);
  const [sel, setSel] = useState({});
  const [open, setOpen] = useState(false);
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const fmt = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: f.cur, maximumFractionDigits: 0 }).format(n);
  const nights = Math.max(1, Math.round((new Date(f.d2) - new Date(f.d1)) / 864e5));
  const chosen = Object.values(sel).filter(Boolean);
  const total = chosen.reduce((a, x) => a + x.total, 0);
  const over = (x) => total - (sel[x.type]?.total || 0) + x.total > f.budget;
  const plan = useMemo(() => (res ? propose(res, f.budget) : {}), [res, f.budget]);
  const planItems = Object.values(plan);
  const planTotal = planItems.reduce((a, x) => a + x.total, 0);

  async function go(e) {
    e.preventDefault(); setErr("");
    const [city, cc] = f.dest.split(",").map((s) => s.trim());
    if (!city || !cc) return setErr("Ajoutez la ville et le code pays, par exemple « Paris, FR ».");
    if (f.d2 <= f.d1) return setErr("La date de retour doit suivre la date d’arrivée.");
    setPhase("loading"); setRes(null); setSel({}); setOk(false); setProg({});
    const base = { city, cc, org: f.org, checkin: f.d1, checkout: f.d2, adults: f.pax, cur: f.cur };
    const out = {}; let anyDemo = false;
    await Promise.all(Object.keys(MANY).map(async (t) => {
      try {
        const j = await (await fetch("/api/search?" + new URLSearchParams({ ...base, type: t }))).json();
        out[t] = j.items || []; anyDemo = anyDemo || !!j.demo;
      } catch { out[t] = []; }
      setProg((p) => ({ ...p, [t]: true }));
    }));
    setDemo(anyDemo); setRes(out); setPhase("done");
    setTimeout(() => document.getElementById("res")?.scrollIntoView({ behavior: "smooth" }), 60);
  }

  const toggle = (x) => setSel((s) => ({ ...s, [x.type]: s[x.type]?.id === x.id ? undefined : x }));

  async function pay() {
    setBusy(true); setErr("");
    try {
      const r = await fetch("/api/deeplink", { method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ sel, checkin: f.d1, checkout: f.d2, adults: f.pax, cur: f.cur, total }) });
      const j = await r.json();
      if (!j.url) throw new Error();
      window.location.assign(j.url);
    } catch { setErr("Le lien de paiement n’a pas pu être créé. Réessayez."); setBusy(false); }
  }

  const sorted = (t) => [...(res?.[t] || [])].sort((a, b) => (t === "flights" ? a.total - b.total : b.rating - a.rating || a.total - b.total));

  return (
    <>
      <main className={"page" + (phase === "loading" ? " busy" : "")}>
        <div className="aura" aria-hidden="true" />
        <div className="top"><span className="brand">Luce</span><span className="tag">Votre agent de voyage</span></div>
        <h1>Dites où. Luce s’occupe du reste.</h1>

        <form className="sentence" onSubmit={go}>
          <p>
            Je pars de <Inl label="Aéroport de départ" value={f.org} upper onChange={(v) => set("org", v.slice(0, 3))} /> pour{" "}
            <Inl label="Destination, ville et pays" value={f.dest} onChange={(v) => set("dest", v)} /> du{" "}
            <Inl type="date" label="Arrivée" value={f.d1} onChange={(v) => set("d1", v)} /> au{" "}
            <Inl type="date" label="Retour" value={f.d2} onChange={(v) => set("d2", v)} />, à{" "}
            <Inl type="number" label="Voyageurs" value={f.pax} onChange={(v) => set("pax", Math.min(6, Math.max(1, Number(v) || 1)))} /> voyageur{f.pax > 1 ? "s" : ""}, avec{" "}
            <Inl type="number" label="Budget" value={f.budget} onChange={(v) => set("budget", Number(v) || 0)} /> {f.cur} de budget.
          </p>
          <button className="go" disabled={phase === "loading"}>{phase === "loading" ? "Luce cherche…" : "Lancer Luce"}</button>
          {err && <p className="err" role="alert">{err}</p>}
        </form>

        {phase === "loading" && (
          <div className="prog" aria-live="polite">
            {Object.keys(MANY).map((t) => <span key={t} className={prog[t] ? "ok" : ""}>{MANY[t]} : {prog[t] ? "vérifiés" : "en cours…"}</span>)}
          </div>
        )}

        {res && (
          <div id="res">
            {demo && <p className="demo">Données d’exemple. Ajoutez votre clé LiteAPI pour voir les vraies offres.</p>}
            {planItems.length > 0 && (
              <section className="plan">
                <h2>Le plan de Luce</h2>
                <p>{planTotal <= f.budget ? `${fmt(planTotal)} pour ${nights} nuits, ${fmt(f.budget - planTotal)} sous votre budget.` : `${fmt(planTotal)}, soit ${fmt(planTotal - f.budget)} de plus que votre budget.`}</p>
                <ul>{planItems.map((x) => <li key={x.type}><span>{ONE[x.type]}</span><span>{x.name}</span></li>)}</ul>
                <button className="go" onClick={() => { setSel(plan); setOpen(true); }}>Adopter ce plan</button>
              </section>
            )}
            {Object.keys(MANY).map((t) => sorted(t).length > 0 && (
              <section className="sec" key={t}>
                <h2>{MANY[t]} <small>{sorted(t).length} offres</small></h2>
                <div className="row">
                  {sorted(t).map((x) => {
                    const on = sel[t]?.id === x.id;
                    return (
                      <article className={"card" + (on ? " on" : "")} key={x.id}>
                        <div className="art" style={art(x.id)}>{x.img && <img src={x.img} alt="" loading="lazy" />}</div>
                        <div className="cb">
                          <span className="meta">{ONE[t]}{x.rating ? ` · ${x.rating.toFixed(1).replace(".", ",")} sur 5` : ""}</span>
                          <h3>{x.name}</h3>
                          <p>{x.sub}</p>
                          <div className="foot">
                            <strong>{fmt(x.total)}</strong>
                            <button className="add" onClick={() => toggle(x)} aria-pressed={on}>{on ? "Ajouté" : "Ajouter"}</button>
                          </div>
                          {over(x) && !on && <span className="warn">Dépasse le budget de {fmt(total - (sel[t]?.total || 0) + x.total - f.budget)}</span>}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
            <p className="sign">Luce prépare, vous validez. Rien n’est acheté sans votre accord, et le paiement se fait sur Luviaplace.</p>
          </div>
        )}
      </main>

      {res && (
        <div className="bar">
          <div>
            <div className="tot">
              <small>Votre dossier · {chosen.length} sélection{chosen.length > 1 ? "s" : ""}</small>
              <b>{fmt(total)}</b> <small style={{ display: "inline" }}>sur {fmt(f.budget)}</small>
              <div className={"meter" + (total > f.budget ? " over" : "")}><i style={{ width: Math.min(100, f.budget ? (total / f.budget) * 100 : 0) + "%" }} /></div>
            </div>
            <button className="go" disabled={!chosen.length} onClick={() => setOpen(true)}>Voir le dossier</button>
          </div>
        </div>
      )}

      {open && (
        <div className="scrim" onClick={(e) => e.target === e.currentTarget && setOpen(false)} onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
          <div className="sheet" role="dialog" aria-modal="true" aria-label="Votre dossier de voyage">
            <header><h2>Votre dossier</h2><button className="link" onClick={() => setOpen(false)}>Fermer</button></header>
            {chosen.map((x) => (
              <div className="it" key={x.type}>
                <div>{x.name}<small>{ONE[x.type]}{x.type === "hotels" ? ` · ${nights} nuits` : ""}</small><button className="link" style={{ padding: 0 }} onClick={() => toggle(x)}>Retirer</button></div>
                <strong>{fmt(x.total)}</strong>
              </div>
            ))}
            <div className="it"><div>Total<small>{total <= f.budget ? `${fmt(f.budget - total)} sous votre budget` : `${fmt(total - f.budget)} au-dessus de votre budget`}</small></div><strong>{fmt(total)}</strong></div>
            <label className="ck"><input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} />
              <span>J’ai vérifié les dates et les prix, ainsi que les conditions de visa pour ma nationalité.</span></label>
            <button className="go" disabled={!ok || busy || !chosen.length} onClick={pay}>{busy ? "Ouverture…" : "Payer sur Luviaplace"}</button>
            {err && <p className="err" role="alert">{err}</p>}
          </div>
        </div>
      )}
    </>
  );
}
