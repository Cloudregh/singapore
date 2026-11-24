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
import ramnath from "@/assets/images/ramnat.webp";
import vhb1 from "@/assets/images/vhb-1.jpg";
import vhb2 from "@/assets/images/vhb-2.jpg";
import vhb3 from "@/assets/images/vhb-3.jpg";
import vhb4 from "@/assets/images/vhb-4.jpg";

export const hotel = {
  name: "Village Hotel Bugis",
  address: "390 Victoria Street, Singapore 188061",
  blurb: "A 4-star hotel in the Kampong Glam district, close to Haji Lane, local eateries and boutiques.",
  checkIn: "2:00 pm",
  checkOut: "12:00 pm",
  url: "https://www.villagehotels.asia/en/hotels/village-hotel-bugis",
  facilities: ["Outdoor pool", "24-hour gym", "Free Wi-Fi", "Halal-certified restaurant", "24-hour front desk"],
  photos: [
    { src: vhb1, alt: "Colourful murals along Haji Lane, steps from the hotel" },
    { src: vhb2, alt: "A twin guest room at Village Hotel Bugis" },
    { src: vhb3, alt: "Guests at a buffet in the hotel's function rooms" },
    { src: vhb4, alt: "The outdoor swimming pool at Village Hotel Bugis" },
  ],
};

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
  { name: "Mr. Ramnath Venkatraman", role: "Facilitator", initials: "RV", photo: ramnath },
];

