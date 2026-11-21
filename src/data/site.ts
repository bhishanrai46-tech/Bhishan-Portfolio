/**
 * ALL EDITABLE CONTENT LIVES HERE.
 * Change text, dates, links and image paths, save, and the site updates.
 *
 * Images: put files in /public/images and reference them as "/images/your-file.jpg".
 * If an image path is empty or the file is missing, a clean placeholder is shown instead.
 *
 * Anything marked `placeholder: true` shows a dashed "add your own" style until you replace it.
 */

export const site = {
  name: "Bhishan Rai",
  shortName: "Bhishan",
  title: "Mechanical Engineer | Technical Services | Passive Fire Protection | Innovation",
  location: "Sydney, Australia",
  headline: ["Engineering Solutions.", "Building Ideas.", "Creating Impact."],
  intro:
    "I'm a Mechanical Engineer passionate about engineering innovation, technical problem-solving, product development and building practical solutions that make a difference.",
  description:
    "Bhishan Rai is a Sydney-based mechanical engineer working in passive fire protection, technical services, product development and engineering automation.",
  email: "bhishanrai46@gmail.com",
  linkedin: "https://linkedin.com/in/bhishanrai",
  github: "https://github.com/bhishanrai46-tech",
  cv: "/Bhishan_Rai_Resume.docx",
  portrait: "", // e.g. "/images/portrait.jpg"
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bhishan-portfolio.vercel.app",
};

export const nav = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Journey", href: "/#journey" },
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
  { label: "Projects", href: "/#projects" },
  { label: "Interests", href: "/#interests" },
  { label: "Contact", href: "/#contact" },
];

export const about = {
  image: "", // e.g. "/images/about.jpg"
  lead: "I'm an engineer who likes to understand how things work, then make them work better.",
  paragraphs: [
    "I grew up in Nepal, studied mechanical engineering in Kathmandu, and moved to Sydney to pursue a Master of Engineering Management at UTS. Building a career in a new country taught me to adapt quickly, ask good questions and explain complex ideas clearly.",
    "My career started on the manufacturing floor as a CNC operator. That grounding in how products are actually cut, folded, assembled and inspected shapes how I now work as a Product and Manufacturing Engineer and as a Technical Services Engineer in passive fire protection.",
    "Day to day I help builders, engineers, architects and contractors choose and install fire-rated products correctly. In between, I build small tools in Python and explore how AI can take repetitive technical work off people's plates.",
  ],
  approach: [
    { title: "Start with the problem", text: "Define what is actually going wrong before choosing a solution." },
    { title: "Test, don't assume", text: "Read the test report, run the numbers, try the prototype." },
    { title: "Make it usable", text: "A solution only counts if the people using it can follow it." },
  ],
  ambition:
    "Long term, I want to combine engineering depth with technology and business: building products and tools of my own, not only improving other people's.",
};

export const journey = [
  {
    date: "Early years",
    title: "Growing up in Nepal",
    text: "Where my curiosity about machines, maths and how things are built began.",
    image: "",
  },
  {
    date: "2017 – 2022",
    title: "Bachelor of Mechanical Engineering",
    text: "Studied mechanical engineering at Tribhuvan University in Kathmandu.",
    image: "",
  },
  {
    date: "2023",
    title: "Moving to Australia",
    text: "Relocated to Sydney for higher education and a new start.",
    image: "",
  },
  {
    date: "Jul 2023 – Jun 2025",
    title: "Master of Engineering Management, UTS",
    text: "Postgraduate study in project management, operations research, supply chain management and leadership in engineering.",
    image: "",
  },
  {
    date: "Aug 2023",
    title: "Starting in manufacturing",
    text: "Joined Trafalgar Group as a CNC Production Operator, running laser, turret punch and brake press machines.",
    image: "",
  },
  {
    date: "May 2024",
    title: "Product & Manufacturing Engineer",
    text: "Moved into engineering: SolidWorks design, CNC programming, production planning and SOPs.",
    image: "",
  },
  {
    date: "2024",
    title: "Technical Services Engineer, Fire",
    text: "Began advising customers on passive fire protection products, fire test reports and compliance.",
    image: "",
  },
  {
    date: "Now",
    title: "Automation, AI and entrepreneurship",
    text: "Building Python tools, exploring AI for engineering work, and developing ideas of my own.",
    image: "",
  },
];

export const experience = {
  current: {
    role: "Technical Services Engineer – Fire",
    company: "Trafalgar Group",
    place: "Sydney, Australia",
    period: "2024 – Present",
    points: [
      "Provide technical advice to builders, engineers, architects and contractors on passive fire protection systems.",
      "Work with fire-rated penetration systems for pipes, ducts, dampers, cables and structural steel applications.",
      "Support product design, research and development.",
      "Evaluate fire test reports and third-party certifications.",
      "Work with Australian Standard AS 1530.4 and relevant NCC requirements.",
      "Support technical compliance, product development and installation documentation.",
      "Collaborate with manufacturing, engineering and production teams.",
    ],
  },
  previous: [
    {
      role: "Product & Manufacturing Engineer",
      company: "Trafalgar Group",
      period: "From May 2024",
      points: [
        "Introduced SolidWorks parametric design standards that reduced custom job turnaround time by 40%.",
        "Programmed CNC jobs in Autonest, CNCKad and EnRoute for laser, turret and routing.",
        "Planned daily production for a team of 12+ CNC operators.",
        "Wrote and maintained SOPs and work instructions; applied Lean and Six Sigma principles.",
      ],
    },
    {
      role: "CNC Production Operator",
      company: "Trafalgar Group",
      period: "Aug 2023 – May 2024",
      points: [
        "Operated CNC laser, turret punch and brake press machines.",
        "Inspected 200+ units per week with a defect rate below 0.5%.",
        "Carried out preventive maintenance on CNC machinery.",
      ],
    },
    {
      role: "Contract Administrator Intern",
      company: "Dynatech Industries",
      period: "Jun – Aug 2023",
      points: [
        "Supported cost estimation and project management for HVAC and mechanical services installations.",
        "Prepared mechanical drawings and air conditioning layouts in AutoCAD.",
      ],
    },
  ],
  progression:
    "Manufacturing taught me how products are made. Engineering taught me how to design them. Technical services taught me how to help people use them correctly.",
};

export const education = [
  {
    degree: "Master of Engineering Management",
    school: "University of Technology Sydney (UTS)",
    place: "Sydney, Australia",
    period: "Jul 2023 – Jun 2025",
    courses: [
      "Project Management",
      "Operations Research",
      "Supply Chain Management",
      "Financial Analysis",
      "Finite Element Method",
      "Leadership in Engineering",
    ],
    achievements: [{ text: "Add academic achievements, awards or thesis here", placeholder: true }],
  },
  {
    degree: "Bachelor of Mechanical Engineering",
    school: "Tribhuvan University",
    place: "Kathmandu, Nepal",
    period: "2017 – 2022",
    courses: [] as string[], // add key subjects, e.g. ["Thermodynamics", "Machine Design"]
    achievements: [{ text: "Add key subjects, final-year project or achievements here", placeholder: true }],
  },
];

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
  results: { text: string; placeholder?: boolean }[];
  links: { label: string; href: string; placeholder?: boolean }[];
};

export const projects: Project[] = [
  {
    slug: "passive-fire-product-development",
    number: "01",
    title: "Passive Fire Protection Product Development",
    tagline: "Product design, testing, technical documentation and compliance.",
    status: "Ongoing work",
    image: "",
    overview:
      "Designing and developing passive fire protection products, from concept and design through to testing, technical documentation and compliance with Australian requirements.",
    problem:
      "Fire-rated products must perform as tested once they are installed in real buildings, and customers need clear documentation to select and install them correctly.",
    approach:
      "Work with design, production and testing teams; design parametrically in SolidWorks; interpret fire test reports against AS 1530.4; and write the installation documentation and compliance guidance that goes with each product.",
    tools: ["SolidWorks", "AS 1530.4", "NCC", "Technical documentation", "Sheet metal design"],
    results: [{ text: "Add a product, test outcome or measurable result you can share publicly", placeholder: true }],
    links: [{ label: "Add link", href: "#", placeholder: true }],
  },
  {
    slug: "engineering-automation",
    number: "02",
    title: "Engineering Automation",
    tagline: "Python automation for processing, watermarking and securing confidential engineering documents.",
    status: "Built and in use",
    image: "",
    overview:
      "A Python desktop application that batch-watermarks, encrypts and issues confidential fire test reports to clients.",
    problem:
      "Issuing confidential test reports manually was slow and repetitive, which made mistakes more likely.",
    approach:
      "Built a desktop tool with PyMuPDF and tkinter that processes reports in batches, applies watermarks and encryption, and is packaged with PyInstaller so non-technical colleagues can run it.",
    tools: ["Python", "PyMuPDF", "tkinter", "threading", "PyInstaller"],
    results: [{ text: "Reduced a manual task of about 30 minutes to under 60 seconds per batch." }],
    links: [{ label: "GitHub: add link", href: "https://github.com/bhishanrai46-tech", placeholder: true }],
  },
  {
    slug: "ai-engineering-solutions",
    number: "03",
    title: "AI-Powered Engineering Solutions",
    tagline: "Exploring AI for passive fire inspections, compliance reporting and technical documentation.",
    status: "Exploring",
    image: "",
    overview:
      "An ongoing exploration of where AI can help with passive fire inspections, compliance reporting and technical documentation.",
    problem:
      "Compliance reports and technical documents take a lot of time to prepare, and the information is often spread across test reports, drawings and standards.",
    approach:
      "Prototype AI-assisted workflows for drafting and formatting documents and reports, while keeping an engineer responsible for checking every technical claim against its source.",
    tools: ["AI workflow automation", "Prompt engineering", "Python"],
    results: [{ text: "Add what you have built or learned so far", placeholder: true }],
    links: [{ label: "Add link", href: "#", placeholder: true }],
  },
  {
    slug: "restaurant-business-analytics",
    number: "04",
    title: "Restaurant Business Analytics",
    tagline: "Python analytics for menu engineering, profitability analysis and business optimisation.",
    status: "Personal project",
    image: "",
    overview:
      "A Python business analytics application that looks at menu engineering and profitability to help a restaurant make better decisions.",
    problem:
      "Restaurant owners often have sales data but little insight into which menu items actually make money.",
    approach:
      "Analyse sales and cost data in Python to classify menu items by popularity and profitability, and present the results in an easy-to-read app.",
    tools: ["Python", "Data analysis", "Streamlit", "Excel"],
    results: [{ text: "Add screenshots or the insights the tool produced", placeholder: true }],
    links: [{ label: "GitHub: add link", href: "https://github.com/bhishanrai46-tech", placeholder: true }],
  },
  {
    slug: "product-design-visualisation",
    number: "05",
    title: "Product Design & Visualisation",
    tagline: "3D modelling, SolidWorks design, product development and realistic rendering.",
    status: "Ongoing work",
    image: "",
    overview:
      "3D modelling and product design in SolidWorks, with realistic renders to communicate designs clearly.",
    problem:
      "Customers and colleagues understand a product faster from a good image than from a drawing alone.",
    approach:
      "Build parametric SolidWorks models, including a library covering the access panel range, and create product renders in Blender.",
    tools: ["SolidWorks", "Blender", "Parametric modelling", "Product rendering"],
    results: [{ text: "Add your best renders here", placeholder: true }],
    links: [{ label: "Add link", href: "#", placeholder: true }],
  },
];

export const skills = [
  {
    group: "Engineering & Design",
    items: ["Mechanical Engineering", "Product Development", "SolidWorks", "3D Modelling", "Technical Drawings", "Manufacturing Processes"],
  },
  {
    group: "Passive Fire Engineering",
    items: ["Passive Fire Protection", "Fire Test Reports", "AS 1530.4", "NCC Compliance", "Technical Assessment", "Product Certification"],
  },
  {
    group: "Technology & Automation",
    items: ["Python", "Data Analysis", "Process Automation", "AI Applications", "Excel", "Streamlit"],
  },
  {
    group: "Creative & Visualisation",
    items: ["Blender", "Product Rendering", "Technical Documentation", "Visual Communication"],
  },
];

export const interests = [
  { title: "Engineering innovation", text: "Better products through better design and testing.", image: "" },
  { title: "Artificial intelligence", text: "Practical uses of AI in everyday technical work.", image: "" },
  { title: "Business & entrepreneurship", text: "Turning ideas into things people use.", image: "" },
  { title: "Financial markets & investing", text: "Understanding how money and risk work.", image: "" },
  { title: "Technology & automation", text: "Removing repetitive work with code.", image: "" },
  { title: "Fitness & bodybuilding", text: "Discipline and consistency in the gym.", image: "" },
  { title: "Mountain biking & the outdoors", text: "Trails, fresh air and a bit of adventure.", image: "" },
  { title: "Reading & personal growth", text: "Always learning something new.", image: "" },
  { title: "Travel & new cultures", text: "Seeing how other people live and think.", image: "" },
];

export const beyond = {
  statement: "Stay curious. Think independently. Build relentlessly.",
  principles: [
    { title: "Curiosity over assumptions", text: "Ask why before accepting how things are done." },
    { title: "Learning through experimentation", text: "Try it, measure it, learn from it." },
    { title: "Building, not just discussing", text: "Ideas become real when someone makes them." },
    { title: "Complex problems, practical solutions", text: "Break it down until it is simple to act on." },
    { title: "Continuous improvement", text: "A little better each week adds up." },
  ],
};

export const achievements = [
  { group: "Professional certifications", items: [{ text: "Add certification name, issuer and year", placeholder: true }] },
  { group: "Engineering training", items: [{ text: "Add courses, standards training or workshops", placeholder: true }] },
  { group: "Professional development", items: [{ text: "Add conferences, mentoring or self-study", placeholder: true }] },
  {
    group: "Academic achievements",
    items: [
      { text: "Master of Engineering Management, University of Technology Sydney" },
      { text: "Bachelor of Mechanical Engineering, Tribhuvan University" },
    ],
  },
  {
    group: "Technical accomplishments",
    items: [
      { text: "Built a Python PDF watermarking and encryption tool that cut a ~30-minute task to under 60 seconds" },
      { text: "Introduced SolidWorks parametric design standards that reduced custom job turnaround time by 40%" },
    ],
  },
];

export type Note = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  draft?: boolean;
  body: string[];
};

export const notes: Note[] = [
  {
    slug: "how-to-read-a-fire-test-report",
    title: "How to read a fire test report",
    category: "Passive fire protection",
    date: "Draft",
    readTime: "3 min read",
    excerpt: "A fire test report is full of detail. Here is what to look for first.",
    draft: true,
    body: [
      "A fire test report records what was tested, how it was tested and how it performed. It is written for certifiers, so customers often find it hard to use.",
      "Start with the tested specimen: the construction, the materials, the size and how the product was installed. A product is only covered for what was actually tested, so any difference on site needs to be assessed.",
      "Next, look at the test conditions and the results against the criteria in AS 1530.4: structural adequacy, integrity and insulation. These give the fire resistance level the product can claim.",
      "Finally, check the scope of the report or assessment. If a building detail is outside it, it needs a technical assessment rather than an assumption.",
      "This is an early draft. Edit it in src/data/site.ts before publishing.",
    ],
  },
  {
    slug: "automate-the-boring-task",
    title: "Automate the boring task you do every week",
    category: "Technology & automation",
    date: "Draft",
    readTime: "2 min read",
    excerpt: "Why a small Python tool beat a 30-minute routine.",
    draft: true,
    body: [
      "A manual routine that took about 30 minutes became a Python tool that finishes the same job in under a minute.",
      "The best candidates for automation are tasks that happen often, follow clear rules and are easy to get wrong when done by hand.",
      "Start small, test it on real examples, and keep a person responsible for checking the result.",
      "This is an early draft. Edit it in src/data/site.ts before publishing.",
    ],
  },
  {
    slug: "from-the-shop-floor-to-technical-services",
    title: "From the shop floor to technical services",
    category: "Lessons learned",
    date: "Draft",
    readTime: "3 min read",
    excerpt: "What starting as a CNC operator taught me about engineering.",
    draft: true,
    body: [
      "I started my career at Trafalgar Group as a CNC production operator, running laser, turret punch and brake press machines.",
      "Seeing how parts are cut, folded and inspected changed how I read a drawing. It also made me a better planner and a better advisor to customers.",
      "Write your own lessons here. What surprised you? What would you tell someone starting out?",
      "This is an early draft. Edit it in src/data/site.ts before publishing.",
    ],
  },
];
