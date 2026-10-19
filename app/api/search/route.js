import { NextResponse } from "next/server";
import * as L from "../../../lib/liteapi.js";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const p = Object.fromEntries(req.nextUrl.searchParams);
  const { type, city, checkin, checkout } = p;
  if (!["hotels", "flights", "tours"].includes(type) || !city || !checkin || !checkout) {
    return NextResponse.json({ error: "Paramètres requis : type, city, checkin, checkout" }, { status: 400 });
  }
  const q = { city, cc: p.cc, org: p.org, checkin, checkout, adults: p.adults || "1", cur: p.cur || "USD" };
  try {
    return NextResponse.json({ demo: false, items: await L[type](q) });
  } catch (e) {
    return NextResponse.json({ demo: true, reason: e.message, items: L.mock(type, q) });
  }
}
