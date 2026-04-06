import { getStore } from "@netlify/blobs";

const DEFAULT_CONTENT = {
  stops: [
    {
      city: "Amsterdam", country: "Netherlands", flag: "\u{1F1F3}\u{1F1F1}",
      days: 3, costPerDay: 110, status: "upcoming",
      hostel: "Stayokay Vondelpark \u00b7 ~$35/night",
      activities: [
        "Canal cruise (evening boat tour)",
        "Anne Frank House \u2014 pre-book!",
        "Van Gogh Museum \u2014 pre-book!",
        "Jordaan neighbourhood walk",
        "Rent a bike & explore"
      ]
    },
    {
      city: "Bruges", country: "Belgium", flag: "\u{1F1E7}\u{1F1EA}",
      days: 3, costPerDay: 95, status: "upcoming",
      hostel: "Bauhaus Hostel \u00b7 ~$40\u201355/night",
      activities: [
        "Canal boat ride",
        "Climb the Belfry tower",
        "Belgian beer brewery tour",
        "Waffles, fries & chocolate crawl",
        "Evening walk: Begijnhof & Minnewater"
      ]
    },
    {
      city: "Paris", country: "France", flag: "\u{1F1EB}\u{1F1F7}",
      days: 4, costPerDay: 140, status: "upcoming",
      hostel: "Generator Paris \u00b7 ~$45\u201370/night",
      activities: [
        "Eiffel Tower \u2014 climb the stairs",
        "Louvre Museum (3\u20134h)",
        "Baguette street crawl",
        "Montmartre + Sacr\u00e9-C\u0153ur at sunset",
        "Seine river cruise at night"
      ]
    },
    {
      city: "Nice", country: "French Riviera", flag: "\u{1F1EB}\u{1F1F7}",
      days: 3, costPerDay: 110, status: "upcoming",
      hostel: "Antares Hostel \u00b7 ~$35\u201350/night",
      activities: [
        "Promenade des Anglais beach",
        "Socca + seafood in Vieux Nice",
        "Castle Hill viewpoint at sunset",
        "Day trip to \u00c8ze village",
        "Kayak along the Riviera"
      ]
    },
    {
      city: "Rome", country: "Italy", flag: "\u{1F1EE}\u{1F1F9}",
      days: 4, costPerDay: 120, status: "upcoming",
      hostel: "The Yellow Hostel \u00b7 ~$35\u201350/night",
      activities: [
        "Colosseum + Roman Forum",
        "Vatican & Sistine Chapel \u2014 pre-book!",
        "Trevi Fountain at dawn",
        "Pasta carbonara in Trastevere",
        "Pantheon, Piazza Navona evening"
      ]
    },
    {
      city: "Athens + Santorini", country: "Greece", flag: "\u{1F1EC}\u{1F1F7}",
      days: 6, costPerDay: 115, status: "upcoming",
      hostel: "City Circus Athens + Oia guesthouse",
      activities: [
        "Acropolis sunrise hike",
        "Oia sunset from castle ruins",
        "Red Beach + Perissa Black Beach",
        "Caldera hike Fira \u2192 Oia (8km, free)",
        "Mykonos ferry (beach clubs + parties)"
      ]
    },
    {
      city: "Dubrovnik + Islands", country: "Croatia", flag: "\u{1F1ED}\u{1F1F7}",
      days: 5, costPerDay: 100, status: "upcoming",
      hostel: "Hostel Angelina + Hvar Airbnb",
      activities: [
        "Old City walls walk",
        "Swim from sea caves & hidden coves",
        "Island hop: Hvar \u2192 Kor\u010dula",
        "GoT self-guided tour (free map)",
        "Kayak around the city walls"
      ]
    },
    {
      city: "Barcelona", country: "Spain", flag: "\u{1F1EA}\u{1F1F8}",
      days: 4, costPerDay: 115, status: "upcoming",
      hostel: "Equity Point Beach \u00b7 ~$35\u201350/night",
      activities: [
        "Park G\u00fcell \u2014 Gaud\u00ed mosaics",
        "Barceloneta Beach",
        "Tapas crawl in El Born",
        "Sagrada Fam\u00edlia \u2014 pre-book!",
        "Nightlife until sunrise"
      ]
    }
  ],
  budgetCategories: [
    { label: "Accommodation", amount: 1600, pct: 28 },
    { label: "Food & drink", amount: 1800, pct: 31 },
    { label: "Activities & entry", amount: 700, pct: 12 },
    { label: "Transport (EU legs)", amount: 900, pct: 15 },
    { label: "Flights (in/out)", amount: 600, pct: 10 },
    { label: "Misc / buffer", amount: 250, pct: 4 }
  ],
  packingList: {
    "\ud83d\udc55 Clothing": [
      "7x t-shirts / tops", "2x shorts", "1x jeans", "1x smart trousers",
      "1x light jacket", "1x swimsuit", "7x underwear + socks", "1x sandals",
      "1x walking shoes", "1x going-out outfit"
    ],
    "\ud83e\uddf4 Toiletries": [
      "Sunscreen SPF50", "Shampoo + conditioner", "Deodorant",
      "Toothbrush + toothpaste", "Razor", "Lip balm", "Hand sanitiser"
    ],
    "\ud83d\udc8a Health": [
      "Ibuprofen / paracetamol", "Antihistamine", "Blister plasters",
      "Rehydration sachets", "Any prescriptions", "Travel insurance docs"
    ],
    "\ud83d\udcf1 Tech": [
      "Phone + charger", "Universal travel adapter", "Power bank",
      "Earphones / headphones", "Camera (optional)", "Download offline maps"
    ],
    "\ud83d\udcc4 Documents": [
      "Passport (valid 6+ months)", "Printed flight confirmations",
      "Hostel booking printouts", "Emergency contact card",
      "Credit + debit cards (2 minimum)", "Some Euros cash"
    ],
    "\ud83c\udf92 Bag Essentials": [
      "Day backpack (20L)", "Padlock for hostel lockers",
      "Reusable water bottle", "Dry bag for beach/boat days",
      "Eye mask + earplugs", "Small first aid kit"
    ]
  },
  heroEyebrow: "Summer 2025 \u00b7 8 Countries \u00b7 30 Days",
  tipBanner: "Book Anne Frank House, Colosseum & Sagrada Fam\u00edlia tickets <em>now</em> \u2014 they sell out weeks in advance."
};

export default async (req) => {
  const store = getStore({ name: "site-content", consistency: "strong" });

  if (req.method === "GET") {
    const content = await store.get("content", { type: "json" });
    if (!content) {
      await store.setJSON("content", DEFAULT_CONTENT);
      return Response.json(DEFAULT_CONTENT);
    }
    return Response.json(content);
  }

  if (req.method === "PUT") {
    const body = await req.json();
    await store.setJSON("content", body);
    return Response.json({ ok: true });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = {
  path: "/api/content",
  method: ["GET", "PUT"],
};
