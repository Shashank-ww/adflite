export interface Project {
  id: number;

  title: string;

  client: string;

  budget: string;

  timeline: string;

  category: string;

  description: string;

  skills: string[];

  postedAt: string;

  location?: string;
}