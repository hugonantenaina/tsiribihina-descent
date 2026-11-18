#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════
   TSIRIBIHINA DESCENT — BUILD
   Mamorona ny site rehetra ao amin'ny dossier "dist/".
   Fampiasana:  node build.mjs
══════════════════════════════════════════════════════════════ */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SITE_URL, CUSTOM_DOMAIN, BRAND, TAGLINE, WHATSAPP, PHONE_DISPLAY, EMAIL, HOURS } from "./site.config.mjs";
import { PHOTOS, img, TRIPS, INCLUDED, NOT_INCLUDED, FAQ } from "./data.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, "dist");
const BASE = new URL(SITE_URL).pathname;           // "/tsiribihina-descent/" na "/"
const YEAR = new Date().getFullYear();
const TODAY = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const link = (p = "") => BASE + p;                   // ex. link("faq/")
const abs = (p = "") => SITE_URL + p;
const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const photo = (k) => PHOTOS[k];
const priceLabel = (t) => t.price || "Free quote on WhatsApp";

/* ── Sary responsive ── */
function picture(k, { sizes = "100vw", cls = "", eager = false, w = 1600 } = {}) {
  const p = photo(k);
  const isCld = !p.src.startsWith("http");
  const srcset = isCld ? [480, 800, 1200, 1600].map((x) => `${img(p.src, x)} ${x}w`).join(", ") : "";
  return `<img src="${img(p.src, w)}"${srcset ? ` srcset="${srcset}" sizes="${sizes}"` : ""} alt="${esc(p.alt)}" class="${cls}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" width="1600" height="1067">`;
}

/* ── Icons (SVG kely) ── */
const ICON = {
  wa: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>`,
  check: `<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cross: `<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  arrow: `<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/* ── Logo (pirogue amin'ny onja) ── */
const LOGO = `<svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="#0f3b39"/><path d="M8 22c4 4 20 4 24 0" fill="none" stroke="#e8a33d" stroke-width="2.6" stroke-linecap="round"/><path d="M20 9v12" stroke="#f6efe3" stroke-width="2" stroke-linecap="round"/><path d="M20 10l7 9h-7z" fill="#f6efe3"/><path d="M7 28c3 2 6 2 9 0s6-2 9 0 6 2 9 0" fill="none" stroke="#7fb8b3" stroke-width="1.8" stroke-linecap="round"/></svg>`;

const NAV = [
  ["trips/", "Trips"],
  ["pirogue-or-chaland/", "Pirogue or Chaland"],
  ["when-to-go/", "When to go"],
  ["faq/", "FAQ"],
  ["about/", "About"],
];

/* ══════════════════ LAYOUT ══════════════════ */
function layout({ route, title, description, body, jsonld = [], ogPhoto = "river" }) {
  const url = abs(route);
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": abs("#org"),
      name: BRAND,
      url: abs(),
      description: TAGLINE,
      telephone: "+" + WHATSAPP,
      ...(EMAIL ? { email: EMAIL } : {}),
      image: img(photo("river").src, 1200),
      areaServed: "Menabe, western Madagascar",
      address: { "@type": "PostalAddress", addressLocality: "Morondava", addressRegion: "Menabe", addressCountry: "MG" },
      openingHours: "Mo-Sa 08:00-22:00",
    },
    ...jsonld,
  ];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(BRAND)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img(photo(ogPhoto).src, 1200)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0f3b39">
<link rel="icon" href="${link("favicon.svg")}" type="image/svg+xml">
<link rel="preconnect" href="https://res.cloudinary.com" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Inter:wght@400;500;600;700&display=swap" media="print" onload="this.media='all'">
<link rel="stylesheet" href="${link("styles.css")}">
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n")}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr">
  <div class="wrap hdr-in">
    <a class="brand" href="${link()}" aria-label="${esc(BRAND)} — home">${LOGO}<span>${esc(BRAND)}</span></a>
    <nav class="nav" aria-label="Main">
      ${NAV.map(([p, l]) => `<a href="${link(p)}"${route === p ? ' aria-current="page"' : ""}>${l}</a>`).join("")}
    </nav>
    <a class="btn btn-sm btn-gold hdr-cta" href="${link("contact/")}">Get a quote</a>
    <details class="menu">
      <summary aria-label="Open menu"><span></span><span></span><span></span></summary>
      <div class="menu-panel">
        ${NAV.map(([p, l]) => `<a href="${link(p)}">${l}</a>`).join("")}
        <a href="${link("contact/")}" class="btn btn-gold">Get a free quote</a>
      </div>
    </details>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="ftr">
  <div class="wrap ftr-grid">
    <div>
      <a class="brand brand-light" href="${link()}">${LOGO}<span>${esc(BRAND)}</span></a>
      <p class="muted-light">River trips on the Tsiribihina by pirogue or chaland, with extensions to Kirindy, the Avenue of the Baobabs and the Tsingy de Bemaraha. Run by a small local team in Morondava, Madagascar.</p>
    </div>
    <div>
      <p class="ftr-h">Trips</p>
      ${TRIPS.map((t) => `<a href="${link(t.slug + "/")}">${esc(t.name)}</a>`).join("")}
    </div>
    <div>
      <p class="ftr-h">Plan</p>
      <a href="${link("pirogue-or-chaland/")}">Pirogue or chaland?</a>
      <a href="${link("when-to-go/")}">When to go & what to bring</a>
      <a href="${link("faq/")}">FAQ</a>
      <a href="${link("about/")}">About us</a>
    </div>
    <div>
      <p class="ftr-h">Contact</p>
      <a href="${wa("Hello Tsiribihina Descent! I would like information about a river trip.")}" target="_blank" rel="noopener">WhatsApp ${esc(PHONE_DISPLAY)}</a>
      ${EMAIL ? `<a href="mailto:${EMAIL}">${esc(EMAIL)}</a>` : ""}
      <p class="muted-light small">${esc(HOURS)}</p>
    </div>
  </div>
  <div class="wrap ftr-bot"><p>© ${YEAR} ${esc(BRAND)} · Morondava, Madagascar</p></div>
</footer>
<a class="wa-float" href="${wa("Hello Tsiribihina Descent! I would like a quote for a river trip.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ICON.wa}<span>WhatsApp</span></a>
<script src="${link("app.js")}" defer></script>
</body>
</html>`;
}

/* ══════════════════ BLOCKS ══════════════════ */
const hero = ({ k, eyebrow, h1, sub, ctas = true, small = false }) => `
<section class="hero${small ? " hero-sm" : ""}">
  ${picture(k, { cls: "hero-img", eager: true })}
  <div class="hero-shade"></div>
  <div class="wrap hero-in">
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
    <h1>${h1}</h1>
    ${sub ? `<p class="hero-sub">${sub}</p>` : ""}
    ${ctas ? `<div class="cta-row">
      <a class="btn btn-gold" href="${link("contact/")}">Plan my river trip ${ICON.arrow}</a>
      <a class="btn btn-ghost" href="${wa("Hello Tsiribihina Descent! I would like a quote for a river trip.")}" target="_blank" rel="noopener">${ICON.wa} Chat on WhatsApp</a>
    </div>` : ""}
  </div>
</section>`;

const tripCard = (t) => `
<a class="card trip" href="${link(t.slug + "/")}">
  <div class="card-img">${picture(t.photo, { sizes: "(min-width: 900px) 33vw, 100vw", w: 800 })}<span class="pill">${t.days} days</span></div>
  <div class="card-body">
    <h3>${esc(t.name)}</h3>
    <p class="route">${esc(t.route)}</p>
    <p>${esc(t.lead)}</p>
    <p class="price">${esc(priceLabel(t))} <span>${ICON.arrow}</span></p>
  </div>
</a>`;

const list = (items, icon, cls) => `<ul class="ticks ${cls}">${items.map((i) => `<li>${ICON[icon]}<span>${esc(i)}</span></li>`).join("")}</ul>`;

const ctaBand = (h = "Ready for the river?", p = "Tell us your dates, how many you are and which boat you prefer. We reply on WhatsApp with a clear program and a free quote, usually within a few hours.") => `
<section class="band">
  <div class="wrap band-in">
    <div><h2>${h}</h2><p>${p}</p></div>
    <div class="cta-row">
      <a class="btn btn-gold" href="${link("contact/")}">Get a free quote ${ICON.arrow}</a>
      <a class="btn btn-ghost" href="${wa("Hello Tsiribihina Descent! I would like a quote for a river trip.")}" target="_blank" rel="noopener">${ICON.wa} WhatsApp</a>
    </div>
  </div>
</section>`;

const faqBlock = (items) => `<div class="faq">${items.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div>`;
const faqLd = (items) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
const crumbs = (items) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [["", "Home"], ...items].map(([p, n], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: abs(p) })) });

const boatTable = `
<div class="table-wrap"><table class="cmp">
  <thead><tr><th scope="col"></th><th scope="col">Pirogue</th><th scope="col">Chaland</th></tr></thead>
  <tbody>
    <tr><th scope="row">The boat</th><td>Narrow traditional wooden canoe</td><td>Large flat-bottomed boat with a roof</td></tr>
    <tr><th scope="row">Moves by</th><td>Paddled by Malagasy boatmen</td><td>Motor</td></tr>
    <tr><th scope="row">Comfort</th><td>Low, close to the water</td><td>Spacious, shade from sun and rain</td></tr>
    <tr><th scope="row">Feeling</th><td>Silent, raw adventure</td><td>Relaxed river cruise</td></tr>
    <tr><th scope="row">Best for</th><td>1–2 adventurous travellers</td><td>Families, couples, groups, photographers</td></tr>
    <tr><th scope="row">Luggage</th><td>Limited space</td><td>Plenty of space, stays drier</td></tr>
  </tbody>
</table></div>`;

/* ══════════════════ PAGES ══════════════════ */
const pages = [];
const add = (route, html) => pages.push({ route, html });

/* ── HOME ── */
add("", layout({
  route: "",
  title: "Tsiribihina River Descent, Madagascar — Pirogue & Chaland Trips",
  description: "Descend the Tsiribihina River in western Madagascar: 3 days by pirogue or chaland from Miandrivazo to Belo, camping on sandbanks, then Kirindy, the Baobabs or the Tsingy. Free quote on WhatsApp.",
  body: `
${hero({ k: "river", eyebrow: "Western Madagascar · April to November", h1: "Tsiribihina River Descent", sub: "Three days on the river through gorges, Sakalava villages and wild sandbank camps — by traditional pirogue or by chaland. Then on to Kirindy, the Baobabs or the Tsingy." })}
<section class="facts wrap" aria-label="Key facts">
  <div><strong>3 days · 2 nights</strong><span>on the river</span></div>
  <div><strong>Miandrivazo → Belo</strong><span>the classic route</span></div>
  <div><strong>April – November</strong><span>dry season</span></div>
  <div><strong>Pirogue or chaland</strong><span>your choice of boat</span></div>
</section>

<section class="sec wrap">
  <p class="kicker">Why the Tsiribihina</p>
  <h2>The slow road through the wild west</h2>
  <p class="lead">No roads follow the Tsiribihina. For three days, the river is the only way through: you drift between red cliffs and green gorges, stop at villages where few travellers go, and fall asleep on a sandbank under the Milky Way.</p>
  <div class="grid3">
    <div class="feat"><h3>Real wilderness</h3><p>Gorges, a waterfall and natural pool to swim in, lemurs in the riverside trees, herons and kingfishers along the banks.</p></div>
    <div class="feat"><h3>Sakalava villages</h3><p>The river is the main road for the people who live here. You stop in villages and see daily life along the water.</p></div>
    <div class="feat"><h3>Nights under the stars</h3><p>Two nights camping on wild sandbanks, meals cooked fresh by the crew, and a big campfire on the second night.</p></div>
  </div>
</section>

<section class="sec sec-sand">
  <div class="wrap split">
    <div>${picture("river2", { cls: "round", sizes: "(min-width: 900px) 50vw, 100vw", w: 1200 })}</div>
    <div>
      <p class="kicker">The classic descent</p>
      <h2>Three days, day by day</h2>
      <ol class="days">
        ${TRIPS[0].plan.map((d, i) => `<li><span class="dnum">Day ${i + 1}</span><div><h3>${esc(d.t)}</h3><p>${esc(d.d)}</p></div></li>`).join("")}
      </ol>
      <a class="btn btn-dark" href="${link(TRIPS[0].slug + "/")}">See the full trip ${ICON.arrow}</a>
    </div>
  </div>
</section>

<section class="sec wrap">
  <p class="kicker">Choose your boat</p>
  <h2>Pirogue or chaland?</h2>
  <p class="lead">Both follow the same river and the same camps. The difference is how you travel.</p>
  ${boatTable}
  <p><a class="textlink" href="${link("pirogue-or-chaland/")}">Read the full comparison ${ICON.arrow}</a></p>
</section>

<section class="sec sec-deep">
  <div class="wrap">
    <p class="kicker kicker-light">River trips</p>
    <h2>Start with the river, continue as far as you like</h2>
    <p class="lead lead-light">Every trip begins with the classic descent. After Belo-sur-Tsiribihina, the road leads north to the Tsingy or south to Kirindy and the baobabs.</p>
    <div class="grid3 cards">${TRIPS.map(tripCard).join("")}</div>
  </div>
</section>

<section class="sec wrap split split-even">
  <div>
    <p class="kicker">On every trip</p>
    <h2>What's included</h2>
    ${list(INCLUDED, "check", "ok")}
  </div>
  <div>
    <p class="kicker">Good to know</p>
    <h2>Not included</h2>
    ${list(NOT_INCLUDED, "cross", "no")}
    <p class="note">Your quote lists exactly what is included for your dates and group.</p>
  </div>
</section>

<section class="sec sec-sand">
  <div class="wrap">
    <p class="kicker">Questions</p>
    <h2>Before you go</h2>
    ${faqBlock(FAQ.slice(0, 5))}
    <p><a class="textlink" href="${link("faq/")}">All questions ${ICON.arrow}</a></p>
  </div>
</section>
${ctaBand()}`,
  jsonld: [faqLd(FAQ.slice(0, 5))],
}));

/* ── TRIPS INDEX ── */
add("trips/", layout({
  route: "trips/",
  title: "Tsiribihina River Trips: 3 to 8 Days | " + BRAND,
  description: "All our Tsiribihina River trips: the 3-day classic descent, and longer trips adding Kirindy Forest, the Avenue of the Baobabs and the Tsingy de Bemaraha.",
  body: `
${hero({ k: "river3", eyebrow: "3 to 8 days", h1: "Tsiribihina River Trips", sub: "The classic 3-day descent, or the river plus Kirindy, the Baobabs and the Tsingy. Every trip is private and adapted to your dates.", small: true })}
<section class="sec wrap">
  <div class="grid3 cards">${TRIPS.map(tripCard).join("")}</div>
  <p class="note center">Want something different — more days on the river, a hotel night before or after, or a start from Antananarivo? <a class="textlink" href="${link("contact/")}">Tell us</a> and we build it for you.</p>
</section>
${ctaBand()}`,
  jsonld: [crumbs([["trips/", "Trips"]])],
}));

/* ── TRIP PAGES ── */
for (const t of TRIPS) {
  const others = TRIPS.filter((x) => x !== t).slice(0, 3);
  add(t.slug + "/", layout({
    route: t.slug + "/",
    title: `${t.name} — ${t.days} Days | ${BRAND}`,
    description: `${t.lead.slice(0, 150).replace(/\s+\S*$/, "")}… ${t.days} days, ${t.route}. Free quote on WhatsApp.`,
    ogPhoto: t.photo,
    body: `
${hero({ k: t.photo, eyebrow: `${t.days} days · ${t.nights} nights`, h1: esc(t.name), sub: esc(t.lead), small: true })}
<section class="facts wrap" aria-label="Trip facts">
  <div><strong>${t.days} days / ${t.nights} nights</strong><span>duration</span></div>
  <div><strong>${esc(t.route)}</strong><span>route</span></div>
  <div><strong>${esc(t.best)}</strong><span>best for</span></div>
  <div><strong>${esc(priceLabel(t))}</strong><span>price</span></div>
</section>
<section class="sec wrap split split-wide">
  <div>
    <p class="kicker">Itinerary</p>
    <h2>Day by day</h2>
    <ol class="days">
      ${t.plan.map((d, i) => `<li><span class="dnum">Day ${i + 1}</span><div><h3>${esc(d.t)}</h3><p>${esc(d.d)}</p></div></li>`).join("")}
    </ol>
    <p class="note">The river days are the same on every trip; the exact program is adapted to your dates, the water level and your pace.</p>
  </div>
  <aside class="side">
    <div class="side-box">
      <p class="side-h">Book this trip</p>
      <p>Send us your dates and group size. We reply with a clear program and a free quote.</p>
      <a class="btn btn-gold btn-full" href="${link("contact/")}?trip=${encodeURIComponent(t.short)}">Get a free quote</a>
      <a class="btn btn-wa btn-full" href="${wa(`Hello Tsiribihina Descent! I'm interested in "${t.name}" (${t.days} days). My dates: `)}" target="_blank" rel="noopener">${ICON.wa} Ask on WhatsApp</a>
      <p class="small muted">${esc(HOURS)}</p>
    </div>
  </aside>
</section>
<section class="sec sec-sand">
  <div class="wrap split split-even">
    <div><h2>Included</h2>${list(INCLUDED, "check", "ok")}</div>
    <div><h2>Not included</h2>${list(NOT_INCLUDED, "cross", "no")}</div>
  </div>
</section>
<section class="sec wrap">
  <h2>Your boat: pirogue or chaland</h2>
  ${boatTable}
  <p><a class="textlink" href="${link("pirogue-or-chaland/")}">How to choose ${ICON.arrow}</a></p>
</section>
<section class="sec sec-deep">
  <div class="wrap">
    <h2>Other river trips</h2>
    <div class="grid3 cards">${others.map(tripCard).join("")}</div>
  </div>
</section>
${ctaBand()}`,
    jsonld: [
      crumbs([["trips/", "Trips"], [t.slug + "/", t.name]]),
      {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: t.name,
        description: t.lead,
        url: abs(t.slug + "/"),
        image: img(photo(t.photo).src, 1200),
        touristType: t.best,
        provider: { "@id": abs("#org") },
        itinerary: { "@type": "ItemList", itemListElement: t.plan.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: `Day ${i + 1}: ${d.t}`, description: d.d })) },
      },
    ],
  }));
}

/* ── PIROGUE OR CHALAND ── */
const boatFaq = FAQ.filter((f) => /pirogue|chaland|children/i.test(f.q));
add("pirogue-or-chaland/", layout({
  route: "pirogue-or-chaland/",
  title: "Pirogue or Chaland on the Tsiribihina? How to Choose | " + BRAND,
  description: "Tsiribihina River by traditional pirogue or by motorised chaland with a roof? Comfort, who each boat suits and how the days compare — explained by our local team.",
  body: `
${hero({ k: "river2", eyebrow: "Choose your boat", h1: "Pirogue or Chaland?", sub: "Same river, same camps, same waterfall. Two very different ways to travel.", small: true })}
<section class="sec wrap narrow">
  <h2>The pirogue: silent and close to the river</h2>
  <p>The pirogue is the traditional wooden canoe of the Tsiribihina, paddled by Malagasy boatmen who know every bend of the river. You sit low, close to the water, in near silence — the best way to hear the birds and see wildlife on the banks. Space is limited, so it suits one or two adventurous travellers per boat.</p>
  <h2>The chaland: a relaxed river cruise</h2>
  <p>The chaland is a large, flat-bottomed boat with a motor and a solid roof. You can stand, stretch out and move around, you are protected from the sun and the rain, and your luggage has room to stay dry. The motor also means shorter days on the water and more time at the waterfall, in the villages and at camp. We work with trusted chaland operators on the river, including Dafimavo, La Sirène and Lakana Be.</p>
  ${boatTable}
  <div class="tip"><strong>Our advice:</strong> travelling as a family, with older travellers or as a group of four or more? Choose the chaland. Travelling alone or as a couple and looking for adventure? Choose the pirogue.</div>
  <h2>Questions about the boats</h2>
  ${faqBlock(boatFaq)}
</section>
${ctaBand("Not sure which boat?", "Tell us who is travelling and we will recommend the right boat for your group — free, on WhatsApp.")}`,
  jsonld: [crumbs([["pirogue-or-chaland/", "Pirogue or Chaland"]]), faqLd(boatFaq)],
}));

/* ── WHEN TO GO ── */
const months = [
  ["January", "Hot and very wet, cyclone risk", "Not recommended"],
  ["February", "Wettest month", "Not recommended"],
  ["March", "Rains easing", "Not recommended"],
  ["April", "End of the rains, very green", "Good — the season opens"],
  ["May", "Dry, green landscapes", "Very good"],
  ["June", "Dry, sunny days, cool nights", "Excellent"],
  ["July", "Dry and sunny, busy season", "Excellent — book early"],
  ["August", "Dry and sunny, busy season", "Excellent — book early"],
  ["September", "Warm and dry, fewer travellers", "Excellent"],
  ["October", "Warm, golden light", "Excellent"],
  ["November", "Hot, first rains possible", "Good — end of season"],
  ["December", "Hot and wet", "Not recommended"],
];
add("when-to-go/", layout({
  route: "when-to-go/",
  title: "When to Do the Tsiribihina Descent + What to Bring | " + BRAND,
  description: "The best months for the Tsiribihina River descent (April to November), how to get to Miandrivazo, and a simple packing list for the river and the camps.",
  body: `
${hero({ k: "sunset", eyebrow: "Plan your trip", h1: "When to go & what to bring", sub: "The river season, how to reach Miandrivazo and what to pack for three days on the water.", small: true })}
<section class="sec wrap narrow">
  <h2>The best time for the Tsiribihina</h2>
  <p>River trips run in the dry season, from about April to November. June to October gives the most reliable weather; April and May are greener and quieter. From December to March, the rains make the river and the dirt roads of the west unpredictable.</p>
  <div class="table-wrap"><table class="cmp months">
    <thead><tr><th scope="col">Month</th><th scope="col">Weather</th><th scope="col">For the river</th></tr></thead>
    <tbody>${months.map(([m, w, r]) => `<tr><th scope="row">${m}</th><td>${w}</td><td class="${/Not/.test(r) ? "bad" : /Excellent/.test(r) ? "good" : ""}">${r}</td></tr>`).join("")}</tbody>
  </table></div>
  <h2>Getting to Miandrivazo</h2>
  <p>The descent starts in Miandrivazo, a day's drive from Antananarivo (through Antsirabe) or from Morondava. We arrange a private 4x4 with driver as part of your trip, and pick you up again in Belo-sur-Tsiribihina at the end of the river.</p>
  <h2>What to bring</h2>
  ${list(["Light clothes with long sleeves and trousers (sun and mosquitoes)", "A warm layer for the evenings and early mornings", "Hat, sunglasses and sunscreen", "Insect repellent", "Head torch with spare batteries", "Swimwear, quick-dry towel and sandals", "A dry bag for your phone, camera and documents", "Personal medicine and a small first-aid kit", "Cash in ariary for tips and village purchases"], "check", "ok")}
  <p class="note">We provide tents, mattresses, meals, drinking water and life jackets.</p>
</section>
${ctaBand()}`,
  jsonld: [crumbs([["when-to-go/", "When to go"]])],
}));

/* ── FAQ ── */
add("faq/", layout({
  route: "faq/",
  title: "Tsiribihina River Descent — FAQ | " + BRAND,
  description: "Answers about the Tsiribihina River descent: length, pirogue or chaland, season, camping, safety, fitness, getting to Miandrivazo and prices.",
  body: `
${hero({ k: "river3", eyebrow: "Questions", h1: "Frequently asked questions", small: true, ctas: false })}
<section class="sec wrap narrow">${faqBlock(FAQ)}</section>
${ctaBand("Another question?", "Ask us directly on WhatsApp — we usually reply within a few hours.")}`,
  jsonld: [crumbs([["faq/", "FAQ"]]), faqLd(FAQ)],
}));

/* ── ABOUT ── */
add("about/", layout({
  route: "about/",
  title: "About Us — A Local River Team in Morondava | " + BRAND,
  description: "Tsiribihina Descent is a small local team in Morondava, Madagascar, specialised in river trips on the Tsiribihina by pirogue and chaland.",
  body: `
${hero({ k: "lemur", eyebrow: "About us", h1: "A local team, one river", sub: "We focus on one thing: taking you down the Tsiribihina safely, comfortably and with the people who know it best.", small: true, ctas: false })}
<section class="sec wrap narrow">
  <h2>Why one river?</h2>
  <p>Many agencies sell the Tsiribihina as one item in a long list. We decided to specialise in it. We are based in Morondava, a few hours from the river, and we organise everything ourselves: the boat and its crew, the camps, the meals and the 4x4 transfers before and after the river.</p>
  <h2>Who takes you down the river</h2>
  <p>Our pirogues are paddled by Malagasy boatmen from the river villages. For chaland trips, we work with trusted operators on the Tsiribihina, including Dafimavo, La Sirène and Lakana Be. On every trip you have a local guide, a camp crew who cook fresh meals, security staff and life jackets.</p>
  <h2>How we work</h2>
  ${list(["One clear quote, with exactly what is included", "Private trips — only your group in the boat and at camp", "A real person answers you on WhatsApp, Monday to Saturday, 8:00–22:00", "We stay in touch from your first message until you are back from the river"], "check", "ok")}
</section>
${ctaBand()}`,
  jsonld: [crumbs([["about/", "About"]])],
}));

/* ── CONTACT ── */
add("contact/", layout({
  route: "contact/",
  title: "Get a Free Quote for the Tsiribihina River | " + BRAND,
  description: "Tell us your dates, group size and preferred boat. We reply on WhatsApp with a clear program and a free quote for your Tsiribihina River trip.",
  body: `
${hero({ k: "river", eyebrow: "Free quote", h1: "Plan your river trip", sub: "Fill in the form: it opens WhatsApp with your request ready to send. We reply with a program and a free quote.", small: true, ctas: false })}
<section class="sec wrap narrow">
  <form id="quote" class="form" novalidate>
    <div class="row2">
      <label>Your name<input name="name" required autocomplete="name"></label>
      <label>Country<input name="country" autocomplete="country-name"></label>
    </div>
    <div class="row2">
      <label>Arrival date (approx.)<input name="date" type="date"></label>
      <label>Number of days available<input name="days" type="number" min="1" max="30" placeholder="e.g. 5"></label>
    </div>
    <div class="row2">
      <label>Adults<input name="adults" type="number" min="1" value="2"></label>
      <label>Children (age)<input name="children" placeholder="e.g. 2 (8 and 11 years)"></label>
    </div>
    <fieldset>
      <legend>Which trip?</legend>
      <div class="chips">
        ${TRIPS.map((t) => `<label class="chip"><input type="radio" name="trip" value="${esc(t.short)} (${t.days} days)"><span>${esc(t.short)} · ${t.days}d</span></label>`).join("")}
        <label class="chip"><input type="radio" name="trip" value="Not sure yet / custom"><span>Not sure / custom</span></label>
      </div>
    </fieldset>
    <fieldset>
      <legend>Which boat?</legend>
      <div class="chips">
        <label class="chip"><input type="radio" name="boat" value="Pirogue"><span>Pirogue</span></label>
        <label class="chip"><input type="radio" name="boat" value="Chaland"><span>Chaland</span></label>
        <label class="chip"><input type="radio" name="boat" value="Not sure — please advise"><span>Not sure</span></label>
      </div>
    </fieldset>
    <fieldset>
      <legend>Hotels before and after the river</legend>
      <div class="chips">
        <label class="chip"><input type="radio" name="hotel" value="Budget"><span>Budget</span></label>
        <label class="chip"><input type="radio" name="hotel" value="Standard"><span>Standard</span></label>
        <label class="chip"><input type="radio" name="hotel" value="Comfort"><span>Comfort</span></label>
        <label class="chip"><input type="radio" name="hotel" value="No hotel needed"><span>Not needed</span></label>
      </div>
    </fieldset>
    <label>Starting point<select name="start"><option>Antananarivo</option><option>Morondava</option><option>Antsirabe</option><option>Other / not sure</option></select></label>
    <label>Anything else? (diet, interests, questions)<textarea name="msg" rows="4"></textarea></label>
    <p class="form-err" role="alert" hidden>Please enter your name.</p>
    <button class="btn btn-wa btn-full" type="submit">${ICON.wa} Send my request on WhatsApp</button>
    <p class="small muted center">WhatsApp opens with your message ready — just press send. ${esc(HOURS)}.</p>
  </form>
</section>`,
  jsonld: [crumbs([["contact/", "Contact"]])],
}));

/* ══════════════════ WRITE ══════════════════ */
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
for (const p of pages) {
  const dir = path.join(OUT, p.route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), p.html);
}

/* 404 */
fs.writeFileSync(path.join(OUT, "404.html"), layout({
  route: "404.html", title: "Page not found | " + BRAND, description: "This page does not exist.",
  body: `<section class="sec wrap narrow center" style="padding-top:120px"><h1 class="h1-dark">Page not found</h1><p>This page has drifted down the river.</p><p><a class="btn btn-dark" href="${link()}">Back to the home page</a></p></section>`,
}).replace('<link rel="canonical"', '<meta name="robots" content="noindex"><link rel="canonical"'));

/* sitemap + robots + llms.txt */
fs.writeFileSync(path.join(OUT, "sitemap.xml"),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${abs(p.route)}</loc><lastmod>${TODAY}</lastmod></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${abs("sitemap.xml")}\n`);
fs.writeFileSync(path.join(OUT, "llms.txt"),
`# ${BRAND}

> ${TAGLINE}. A small local team based in Morondava, Madagascar, specialised in the Tsiribihina River descent (Miandrivazo to Belo-sur-Tsiribihina, 3 days / 2 nights) by traditional pirogue or motorised chaland, with extensions to Kirindy Forest, the Avenue of the Baobabs and the Tsingy de Bemaraha. Season: April to November. Quotes on WhatsApp: +${WHATSAPP}.

## Trips
${TRIPS.map((t) => `- [${t.name}](${abs(t.slug + "/")}): ${t.days} days, ${t.route}.`).join("\n")}

## Planning
- [Pirogue or chaland?](${abs("pirogue-or-chaland/")})
- [When to go & what to bring](${abs("when-to-go/")})
- [FAQ](${abs("faq/")})
- [Free quote](${abs("contact/")})
`);

/* static assets */
for (const f of ["styles.css", "app.js", "favicon.svg"]) fs.copyFileSync(path.join(ROOT, "assets", f), path.join(OUT, f));
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
if (CUSTOM_DOMAIN) fs.writeFileSync(path.join(OUT, "CNAME"), CUSTOM_DOMAIN + "\n");
/* app.js mila mahalala ny WhatsApp */
fs.writeFileSync(path.join(OUT, "app.js"), fs.readFileSync(path.join(OUT, "app.js"), "utf8").replace("__WHATSAPP__", WHATSAPP));

console.log(`✔ ${pages.length} pages → dist/  (${SITE_URL})`);
