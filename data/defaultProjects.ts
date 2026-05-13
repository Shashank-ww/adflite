import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "Need React Developer for Landing Page",
    client: "rahulstudio",

    budget: "₹15,000",
    timeline: "3 days",

    category: "frontend",

    description:
      "Looking for a frontend developer to build a responsive landing page using Next.js and Tailwind.",

    skills: ["nextjs", "tailwind", "react"],

    postedAt: "2 hours ago"
  },

  {
    id: 2,
    title: "Video Editor for Reels Campaign",
    client: "autoframe",

    budget: "₹8,000",
    timeline: "1 week",

    category: "editing",

    description:
      "Need quick edits for Instagram reels and short-form campaign videos.",

    skills: ["premiere pro", "after effects"],

    postedAt: "4 hours ago"
  },

  {
    id: 3,
    title: "Need UI Designer for Dashboard",
    client: "pixelworks",

    budget: "₹25,000",
    timeline: "2 weeks",

    category: "design",

    description:
      "Looking for someone experienced with clean SaaS dashboard layouts.",

    skills: ["figma", "ui design"],

    postedAt: "5 days ago"
  },

  {
  id: 4,
  title: "Need Meta Ads Specialist for D2C Skincare Brand",
  client: "northstarmedia",

  budget: "₹35,000",
  timeline: "2 weeks",

  category: "media buying",

  description:
    "Looking for a performance marketer experienced in Meta Ads scaling for skincare and beauty brands. Immediate start preferred.",

  skills: [
    "meta ads",
    "performance marketing",
    "shopify",
  ],

  postedAt: "7 weeks ago",

  location: "Delhi"
}
];