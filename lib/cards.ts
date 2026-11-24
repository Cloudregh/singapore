import type { Card } from "@/lib/content";
import boardroom from "@/assets/images/boardroom.jpg";
import strategyTable from "@/assets/images/strategy-table.jpg";
import workshop from "@/assets/images/workshop.jpg";
import audience from "@/assets/images/audience.jpg";
import marinaBay from "@/assets/images/marina-bay.jpg";
import supertrees from "@/assets/images/supertrees.jpg";
import merlion from "@/assets/images/merlion.jpg";
import jewel from "@/assets/images/jewel.jpg";

// Imported only by the delegate API route, so registered delegates are the only ones who receive it.
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

