export type Block =
  | { type: "h2" | "p" | "quote"; text: string }
  | { type: "image"; src: string; caption: string };

export type SectionId =
  | "about"
  | "journey"
  | "experience"
  | "education"
  | "projects"
  | "skills"
  | "interests"
  | "beyond"
  | "achievements"
  | "notes"
  | "contact";

export type SectionMeta = {
  id: SectionId;
  label: string; // menu label
  visible: boolean;
  nav: boolean; // show in the top menu
  eyebrow: string;
  title: string;
  intro: string;
};

export type Theme = {
  ink: string; // dark background
  paper: string; // light background
  paper2: string; // alternate light background
  bronze: string; // accent on dark
  bronzeDeep: string; // accent on light
  headingFont: string;
  bodyFont: string;
  scale: number; // site-wide text size, percent
};

export type Item = { text: string; placeholder?: boolean };

export type Project = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  status: string;
  image: string;
  overview: string;
  problem: string;
  approach: string;
  tools: string[];
  results: Item[];
  links: { label: string; href: string; placeholder?: boolean }[];
  draft?: boolean;
};

export type Note = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  blocks: Block[];
  draft?: boolean;
};

export type PageDoc = {
  slug: string;
  title: string;
  subtitle: string;
  showInNav: boolean;
  blocks: Block[];
  draft?: boolean;
};

export type Content = {
  site: {
    name: string;
    shortName: string;
    title: string;
    location: string;
    headline: string[];
    intro: string;
    description: string;
    email: string;
    linkedin: string;
    github: string;
    cv: string;
    portrait: string;
  };
  hero: { primary: string; secondary: string };
  sections: SectionMeta[];
  about: { image: string; paragraphs: string[]; approach: { title: string; text: string }[]; ambition: string };
  journey: { date: string; title: string; text: string; image: string }[];
  experience: {
    current: { role: string; company: string; place: string; period: string; points: string[] };
    previous: { role: string; company: string; period: string; points: string[] }[];
    progression: string;
  };
  education: {
    degree: string;
    school: string;
    place: string;
    period: string;
    courses: string[];
    achievements: Item[];
  }[];
  projects: Project[];
  skills: { group: string; items: string[] }[];
  interests: { title: string; text: string; image: string }[];
  beyond: { principles: { title: string; text: string }[] };
  achievements: { group: string; items: Item[] }[];
  notes: Note[];
  pages: PageDoc[];
  contact: { headlineA: string; headlineB: string };
  labels: Record<string, string>;
  theme: Theme;
};
