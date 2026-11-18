/* ══════════════════════════════════════════════════════════════
   TSIRIBIHINA DESCENT — VOTOATINY (sary, dia, FAQ)
   Ovay eto ny lahatsoratra, ny sary ary ny vidiny.
══════════════════════════════════════════════════════════════ */

/* ── SARY ──
   Sary Cloudinary: ny "path" ihany no soratana; ny haben'ny sary dia
   amboarina ho azy (w_800, w_1600…). */
const CLD = "https://res.cloudinary.com/dloqrnvp8/image/upload";
export const img = (path, w = 1600) =>
  path.startsWith("http") ? path : `${CLD}/q_auto,f_auto,w_${w}/${path}`;

export const PHOTOS = {
  river:   { src: "v1779706626/20250810-063819_fnm8kk.jpg", alt: "Morning on the Tsiribihina River, western Madagascar" },
  river2:  { src: "https://i.ibb.co/Y774QKWz/IMG-20260224-WA0044.jpg", alt: "On the Tsiribihina River" },
  river3:  { src: "https://i.ibb.co/Y7RLj7y6/IMG-20260224-WA0039.jpg", alt: "Riverside life along the Tsiribihina" },
  kirindy: { src: "v1779706764/IMG-20251030-WA0008_uki3cp.jpg", alt: "Kirindy Forest, home of the fossa" },
  lemur:   { src: "v1779706214/IMG-20251030-WA0058_ddsyrf.jpg", alt: "Lemur in the dry forest of western Madagascar" },
  baobabs: { src: "v1779708876/IMG-20260224-WA0019_ls19mp.jpg", alt: "Avenue of the Baobabs near Morondava" },
  sunset:  { src: "v1779709145/20250729-173834_qapii8.jpg", alt: "Sunset at the Avenue of the Baobabs" },
  tsingy:  { src: "v1779708924/20250817-102639_ejnyox.jpg", alt: "Limestone pinnacles of the Tsingy de Bemaraha" },
  tsingy2: { src: "v1779708056/20250804-103923_incpvt.jpg", alt: "Hiking in the Tsingy de Bemaraha" },
};

/* ── DIA ──
   price: "" = "Free quote on WhatsApp". Raha te hametraka vidiny: price: "From 529 €" */
export const TRIPS = [
  {
    slug: "tsiribihina-river-descent-3-days",
    name: "The Classic Tsiribihina Descent",
    short: "Classic Descent",
    days: 3, nights: 2,
    route: "Miandrivazo → Belo-sur-Tsiribihina",
    photo: "river",
    price: "",
    lead: "Three days on the river that cuts through the wild west of Madagascar: gorges and red cliffs, a waterfall to swim under, Sakalava villages, lemurs in the riverside trees and two nights camping on sandbanks.",
    best: "First-time river travellers, couples, families and photographers",
    plan: [
      { t: "Miandrivazo — onto the river", d: "Meet your crew in Miandrivazo and board your pirogue or chaland. Lunch on the water as the river enters its first gorges. First camp on a quiet sandbank, dinner cooked fresh by the camp crew." },
      { t: "The heart of the Tsiribihina", d: "A full day on the river: swim at the Anosin'Ampela waterfall and natural pool, look for lemurs, herons and kingfishers along the banks, and visit a Sakalava village. In the evening, a big campfire on a wild sandbank and a night under the stars." },
      { t: "Down to Belo-sur-Tsiribihina", d: "A last calm stretch of river at sunrise, then arrival in Belo-sur-Tsiribihina. Your 4x4 is waiting to take you to Morondava, Kirindy Forest or the Tsingy." },
    ],
  },
  {
    slug: "tsiribihina-river-kirindy-forest-4-days",
    name: "River & Kirindy Forest",
    short: "River + Kirindy",
    days: 4, nights: 3,
    route: "Miandrivazo → Belo → Kirindy → Morondava",
    photo: "kirindy",
    price: "",
    lead: "The full river descent, then a night and a morning in Kirindy Forest — the best place in Madagascar to look for the fossa, as well as sifakas, brown lemurs and tiny mouse lemurs.",
    best: "Wildlife lovers with only a few days",
    plan: [
      { t: "Miandrivazo — onto the river", d: "Board the boat in Miandrivazo, lunch on board, first gorges and a first night camping on a sandbank." },
      { t: "The heart of the Tsiribihina", d: "Waterfall and natural pool, Sakalava village, wildlife along the banks. Campfire evening and a second night under the stars." },
      { t: "Belo-sur-Tsiribihina → Kirindy", d: "Arrive in Belo in the morning, then drive south by 4x4 to Kirindy Forest. After dinner, a guided night walk for mouse lemurs, chameleons and, with luck, the fossa." },
      { t: "Kirindy → Morondava", d: "Dawn walk while the forest is most active, then drive to Morondava with a stop at the Avenue of the Baobabs." },
    ],
  },
  {
    slug: "tsiribihina-river-kirindy-baobabs-5-days",
    name: "River, Kirindy & the Baobabs",
    short: "River + Kirindy + Baobabs",
    days: 5, nights: 4,
    route: "Miandrivazo → Belo → Kirindy → Morondava",
    photo: "baobabs",
    price: "",
    lead: "The three icons of the Menabe region in one unhurried trip: the river, the dry forest of Kirindy, and sunset at the Avenue of the Baobabs.",
    best: "A complete first trip to western Madagascar",
    plan: [
      { t: "Miandrivazo — onto the river", d: "Start of the descent, first gorges and a first sandbank camp." },
      { t: "The heart of the Tsiribihina", d: "Waterfall, village visit, wildlife and the big campfire night." },
      { t: "Belo → Kirindy", d: "Morning arrival in Belo, drive to Kirindy Forest and a night walk." },
      { t: "Kirindy, day and night", d: "Morning and late-afternoon walks, when lemurs and the fossa are most active. Rest at the lodge in the heat of the day." },
      { t: "Kirindy → Baobabs → Morondava", d: "Drive to Morondava, stopping at the Baobabs Amoureux and the Avenue of the Baobabs for the sunset." },
    ],
  },
  {
    slug: "tsiribihina-river-tsingy-kirindy-6-days",
    name: "River, Tsingy & Kirindy",
    short: "River + Tsingy + Kirindy",
    days: 6, nights: 5,
    route: "Miandrivazo → Belo → Bekopaka → Kirindy → Morondava",
    photo: "tsingy",
    price: "",
    lead: "From the river, head north to the Tsingy de Bemaraha, a UNESCO World Heritage forest of limestone needles, then south to Kirindy and the baobabs.",
    best: "Active travellers who want the river and the Tsingy",
    plan: [
      { t: "Miandrivazo — onto the river", d: "Start of the descent and first sandbank camp." },
      { t: "The heart of the Tsiribihina", d: "Waterfall, village, wildlife and the campfire night." },
      { t: "Belo → Bekopaka", d: "Arrive in Belo, then a 4x4 drive north with two river ferry crossings to Bekopaka, the village of the Tsingy." },
      { t: "Tsingy de Bemaraha", d: "Guided hike in the Grand or Petit Tsingy (your choice, depending on fitness), and a pirogue ride in the Manambolo Gorge." },
      { t: "Bekopaka → Kirindy", d: "Drive south to Kirindy Forest. Night walk for nocturnal wildlife." },
      { t: "Kirindy → Baobabs → Morondava", d: "Dawn walk in Kirindy, then the Avenue of the Baobabs at sunset." },
    ],
  },
  {
    slug: "grand-tsiribihina-expedition-8-days",
    name: "The Grand Tsiribihina Expedition",
    short: "Grand Expedition",
    days: 8, nights: 7,
    route: "Antananarivo → Antsirabe → river → Tsingy → Kirindy → Morondava",
    photo: "tsingy2",
    price: "",
    lead: "The complete overland journey from the capital to the west coast: the highlands, the river, the Tsingy, Kirindy and the baobabs — with a private 4x4 and driver all the way.",
    best: "Travellers starting in Antananarivo who want the whole west",
    plan: [
      { t: "Antananarivo → Antsirabe", d: "Drive south through the rice terraces of the highlands to Antsirabe." },
      { t: "Antsirabe → Miandrivazo — onto the river", d: "Descend to Miandrivazo and start the river trip in the afternoon. First sandbank camp." },
      { t: "The heart of the Tsiribihina", d: "Waterfall, village, wildlife and the campfire night." },
      { t: "Belo → Bekopaka", d: "Arrival in Belo, then the drive north to the Tsingy." },
      { t: "Grand Tsingy", d: "A full-day guided hike with ladders, rope bridges and viewpoints over the limestone needles." },
      { t: "Manambolo Gorge → Kirindy", d: "Pirogue in the Manambolo Gorge, then drive south to Kirindy. Night walk." },
      { t: "Kirindy", d: "Morning and evening walks to look for the fossa, sifakas and dry-forest birds." },
      { t: "Kirindy → Baobabs → Morondava", d: "The Avenue of the Baobabs at sunset to end the expedition." },
    ],
  },
];

/* ── INCLUDED (ho an'ny dia rehetra) ── */
export const INCLUDED = [
  "Pirogue paddled by experienced Malagasy boatmen, or a motorised chaland with a roof",
  "Local river guide, security staff and life jackets",
  "All meals on the river, cooked fresh by the camp crew, and drinking water",
  "Tents, mattresses and camping equipment; enclosed toilet at camp",
  "Private 4x4 with driver for the road sections",
  "Guided visits and park fees for Kirindy and the Tsingy (on the trips that include them)",
];
export const NOT_INCLUDED = [
  "International and domestic flights",
  "Hotel meals and drinks in towns (unless agreed in your quote)",
  "Travel insurance (strongly recommended)",
  "Tips for the crew, guides and driver",
];

/* ── FAQ ── */
export const FAQ = [
  { q: "How long is the Tsiribihina River descent?", a: "The classic descent from Miandrivazo to Belo-sur-Tsiribihina takes 3 days and 2 nights on the river. You can add Kirindy Forest, the Avenue of the Baobabs or the Tsingy de Bemaraha after the river." },
  { q: "What is the difference between a pirogue and a chaland?", a: "A pirogue is a narrow traditional wooden canoe paddled by boatmen: silent and close to the water. A chaland is a large motorised boat with a roof: more space, shade from sun and rain, and room for luggage — ideal for families and groups." },
  { q: "When can you do the Tsiribihina descent?", a: "From about April to November, during the dry season. June to October has the most reliable weather. From December to March, the rains make the river and the roads unpredictable." },
  { q: "Where do we sleep on the river?", a: "In tents on sandbanks along the river. The camp crew sets up the camp, cooks the meals and provides an enclosed toilet. The second night includes a big campfire." },
  { q: "Is the river trip safe for children?", a: "Yes, with the right boat. Families usually choose the chaland: it is stable and spacious, and life jackets are provided for everyone." },
  { q: "Do I need to be fit?", a: "No. On the river you sit in the boat while the crew paddles or drives. Short walks to the waterfall and villages are easy. Only the Grand Tsingy, on some longer trips, needs a good level of fitness." },
  { q: "How do I get to Miandrivazo?", a: "Miandrivazo is a day's drive from Antananarivo (via Antsirabe) or from Morondava. We arrange the private 4x4 transfer as part of your trip." },
  { q: "Can we continue to the Tsingy after the river?", a: "Yes. From Belo-sur-Tsiribihina, the road north leads to Bekopaka and the Tsingy de Bemaraha, which is usually open from about mid-May to mid-November." },
  { q: "How much does the trip cost?", a: "The price depends on the boat (pirogue or chaland), the number of travellers and what you add after the river. Send us your dates and group size on WhatsApp for a free, detailed quote." },
  { q: "What should I bring?", a: "Light clothes with long sleeves, a warm layer for the evenings, a hat, sunscreen, insect repellent, a head torch, swimwear, sandals and a dry bag for your camera and phone." },
];
