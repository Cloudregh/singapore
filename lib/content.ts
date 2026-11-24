import type { StaticImageData } from "next/image";

import supertrees from "@/assets/images/supertrees.jpg";
import marinaBay from "@/assets/images/marina-bay.jpg";
import mbsNight from "@/assets/images/mbs-night.jpg";
import merlion from "@/assets/images/merlion.jpg";
import jewel from "@/assets/images/jewel.jpg";
import boardroom from "@/assets/images/boardroom.jpg";
import audience from "@/assets/images/audience.jpg";
import strategyTable from "@/assets/images/strategy-table.jpg";
import handshake from "@/assets/images/handshake.jpg";
import delegates from "@/assets/images/delegates.jpg";
import workshop from "@/assets/images/workshop.jpg";
import edwardSarpong from "@/assets/images/edward-ato-sarpong.jpg";

export const images = {
  supertrees,
  marinaBay,
  mbsNight,
  merlion,
  jewel,
  boardroom,
  audience,
  strategyTable,
  handshake,
  delegates,
  workshop,
};

export const event = {
  title: "Study & Tour in Singapore",
  subtitle: "1-Week Strategic Leadership Conference",
  rate: "$5,000",
  dateLabel: "28 Nov – 5 Dec",
  startLabel: "28 Nov",
  endLabel: "5 Dec",
  // Flyer gives no year; this assumes the upcoming 2026 edition (SGT).
  startsAt: "2026-11-28T00:00:00+08:00",
  endsAt: "2026-12-05T23:59:59+08:00",
  registerUrl: "https://www.aiswam.org/conferences",
  registerLabel: "www.aiswam.org/conferences",
  email: "info@kaiswam.edu.gh",
  phone: "+233 53 110 0924",
  phoneHref: "tel:+233531100924",
};

export type Card = {
  id: string;
  kind: "conference" | "tour";
  tag: string;
  title: string;
  blurb: string;
  meta: string;
  image: StaticImageData;
  alt: string;
};

export const cards: Card[] = [
  {
    id: "future",
    kind: "conference",
    tag: "Topic 01",
    title: "The Future of World Business",
    blurb: "Read the global shifts reshaping markets, trade and the way organisations compete.",
    meta: "Conference Session",
    image: boardroom,
    alt: "Executives in a bright boardroom listening to a presentation",
  },
  {
    id: "growth",
    kind: "conference",
    tag: "Topic 02",
    title: "Good Growth Strategies",
    blurb: "Build growth plans that are ambitious, sustainable and grounded in execution.",
    meta: "Conference Session",
    image: strategyTable,
    alt: "Overhead view of a team planning around a table with laptops",
  },
  {
    id: "influence",
    kind: "conference",
    tag: "Topic 03",
    title: "Strategy for Influencing",
    blurb: "Move stakeholders, boards and teams with clarity, credibility and intent.",
    meta: "Conference Session",
    image: workshop,
    alt: "A facilitator arranging sticky notes on a strategy wall",
  },
  {
    id: "leadership",
    kind: "conference",
    tag: "Topic 04",
    title: "Effective Leadership",
    blurb: "Sharpen the habits that turn strategy into results through people.",
    meta: "Conference Session",
    image: audience,
    alt: "Conference audience seated in a hall",
  },
  {
    id: "marina",
    kind: "tour",
    tag: "City Highlight",
    title: "Marina Bay",
    blurb: "The waterfront skyline that defines modern Singapore.",
    meta: "Study Tour",
    image: marinaBay,
    alt: "Marina Bay Sands and the ArtScience Museum lit up at night",
  },
  {
    id: "gardens",
    kind: "tour",
    tag: "City Highlight",
    title: "Gardens by the Bay",
    blurb: "Glowing Supertrees and a city that builds with nature.",
    meta: "Study Tour",
    image: supertrees,
    alt: "The illuminated Supertree Grove at Gardens by the Bay",
  },
  {
    id: "merlion",
    kind: "tour",
    tag: "City Highlight",
    title: "Merlion Park",
    blurb: "Singapore's icon, set against the financial district.",
    meta: "Study Tour",
    image: merlion,
    alt: "The Merlion statue in front of the Singapore skyline at night",
  },
  {
    id: "jewel",
    kind: "tour",
    tag: "City Highlight",
    title: "Jewel Changi",
    blurb: "The indoor rain vortex and forest valley at Changi Airport.",
    meta: "Study Tour",
    image: jewel,
    alt: "The glass dome and indoor forest of Jewel Changi Airport",
  },
];

export const pillars = [
  {
    n: "01",
    title: "4-Star Hotel",
    body: "Comfortable four-star accommodation for the full week in Singapore.",
  },
  {
    n: "02",
    title: "Return Ticket & Visa",
    body: "Your return flight and Singapore visa are part of the package.",
  },
  {
    n: "03",
    title: "Corporate Leadership",
    body: "A focused programme on strategy, growth, influence and leadership.",
  },
  {
    n: "04",
    title: "Networking",
    body: "Build relationships with fellow leaders, facilitators and partners.",
  },
];

export type Facilitator = {
  name: string;
  role: string;
  initials: string;
  photo?: StaticImageData;
};

export const facilitators: Facilitator[] = [
  {
    name: "Mr. Edward Ato Sarpong",
    role: "Managing Director, Agricultural Development Bank (ADB), Ghana",
    initials: "ES",
    photo: edwardSarpong,
  },
  // No verified photo found online yet — drop one in assets/images and add `photo`.
  { name: "Mr. Ramnath Venkatraman", role: "Facilitator", initials: "RV" },
];

