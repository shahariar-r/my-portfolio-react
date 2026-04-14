const mongoose = require('mongoose')
require('dotenv').config()

const Project = require('../models/Project')
const Service = require('../models/Service')
const Testimonial = require('../models/Testimonial')

const projects = [
  {
    title: 'AI Website Builder',
    slug: 'ai-website-builder',
    shortDesc: 'Generates production-ready websites from a single text prompt using the Claude API.',
    fullDesc: 'A full-stack AI-powered tool that takes a plain-English business description and returns a complete, styled, responsive website. Built to demonstrate real-world AI integration in a practical product context.',
    challenge: 'The main challenge was ensuring the AI-generated output was both semantically correct and visually refined — not just functional but actually usable by non-developers.',
    solution: 'I engineered a structured prompt system that instructs Claude to output clean, component-based HTML with embedded Tailwind classes. A post-processing layer sanitises and formats the output before rendering.',
    outcome: 'A working MVP that generates a 5-section website in under 8 seconds. Demonstrated to 3 potential clients as part of NexaSeed service offerings.',
    category: 'AI / Automation',
    status: 'Live',
    stack: ['React', 'Claude API', 'Node.js', 'Express', 'Tailwind CSS'],
    featured: true,
    order: 1,
  },
  {
    title: 'NexaSeed Agency Platform',
    slug: 'nexaseed-platform',
    shortDesc: 'Full company website and client portal for NexaSeed digital agency.',
    fullDesc: 'Designed and built the complete online presence for NexaSeed — including the marketing site, service pages, case study system, and a lightweight client-facing portal for project status tracking.',
    challenge: 'Building a site that communicates premium positioning while remaining fast, accessible, and maintainable as a solo founder.',
    solution: 'React + Vite frontend with a headless CMS approach. All content stored in structured JSON with a planned migration path to MongoDB as the business scales.',
    outcome: 'Live at nexaseed.com. Receives consistent organic traffic and has been used as a portfolio reference in 4 client proposals.',
    category: 'Web App',
    status: 'Live',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    featured: true,
    order: 2,
  },
  {
    title: 'Threat Intelligence Dashboard',
    slug: 'threat-intelligence-dashboard',
    shortDesc: 'Real-time security monitoring dashboard aggregating CVE data for MSc research.',
    fullDesc: 'An MSc Cybersecurity research project — a web-based dashboard that pulls live CVE (Common Vulnerabilities and Exposures) data from public APIs, visualises attack surfaces, and generates automated risk summary reports.',
    challenge: 'Processing and visualising large volumes of CVE data in real-time without degrading browser performance.',
    solution: 'Implemented server-side data aggregation with caching, and used D3.js with canvas rendering for high-performance visualisations. Reports generated as structured markdown then exported to PDF.',
    outcome: 'Achieved distinction grade. The codebase is being iterated on for a potential commercial security monitoring product.',
    category: 'Software',
    status: 'Completed',
    stack: ['Python', 'FastAPI', 'React', 'D3.js', 'PostgreSQL'],
    featured: true,
    order: 3,
  },
  {
    title: 'Brand Identity System',
    slug: 'brand-identity-system',
    shortDesc: 'Complete visual identity for a London-based fintech startup.',
    fullDesc: 'End-to-end brand identity project: logo design, typography scale, colour system, icon set, component library in Figma, and a 40-page brand usage guidelines document.',
    challenge: 'The client wanted to feel established and trustworthy, not another startup. The brand needed to communicate both innovation and reliability simultaneously.',
    solution: 'Developed an identity rooted in editorial typography and geometric precision. A monogram logomark with a geometric grid system that scales from app icon to billboard.',
    outcome: 'Brand launched successfully. Client raised a seed round shortly after and cited their brand positioning as a key differentiator in investor conversations.',
    category: 'Branding',
    status: 'Completed',
    stack: ['Figma', 'Adobe Illustrator', 'After Effects'],
    featured: false,
    order: 4,
  },
  {
    title: 'Content Intelligence Tool',
    slug: 'content-intelligence-tool',
    shortDesc: 'AI assistant that summarises, rewrites, and categorises long-form documents.',
    fullDesc: 'A productivity tool built for content teams that need to process large volumes of documents. The tool accepts PDFs, Word docs, or pasted text and returns structured summaries, tone analysis, and rewritten variants at different reading levels.',
    challenge: 'Context window limitations in early API versions meant long documents could not be processed in a single pass.',
    solution: 'Built a chunking and re-assembly pipeline that splits documents into semantic sections, processes each independently, then synthesises a coherent output.',
    outcome: 'Used internally by a 3-person content team. Reduces first-draft time from 2 hours to under 20 minutes per piece.',
    category: 'AI / Automation',
    status: 'In Progress',
    stack: ['Python', 'Claude API', 'FastAPI', 'React', 'PostgreSQL'],
    featured: false,
    order: 5,
  },
  {
    title: 'E-Commerce UI Design System',
    slug: 'ecommerce-ui-design',
    shortDesc: 'Complete Figma UI kit and design system for a fashion e-commerce platform.',
    fullDesc: 'Designed a full Figma component library and page layouts for a UK-based fashion retailer transitioning from Shopify themes to a custom frontend. Includes 80+ components, 12 page templates, and a detailed handoff documentation.',
    challenge: 'Maintaining design consistency across mobile, tablet, and desktop while working within the constraints of their existing Shopify backend API.',
    solution: 'Built an auto-layout-first Figma system where all components are responsive by default. Created breakpoint-specific variants for complex components like the product grid and cart drawer.',
    outcome: 'Design handoff delivered on time. Development team reported a 40% reduction in design-related questions during the build phase.',
    category: 'UI/UX Design',
    status: 'Completed',
    stack: ['Figma', 'Adobe Photoshop', 'Zeplin'],
    featured: false,
    order: 6,
  },
]

const services = [
  { icon: '◈', title: 'AI Agent Development', shortDesc: 'Custom AI agents and intelligent automation tools built with the latest language models.', features: ['Custom LLM integrations', 'Workflow automation', 'Claude & OpenAI APIs', 'Prompt engineering', 'Production deployment'], forWho: 'Businesses looking to automate repetitive tasks or add AI capabilities to their products.', order: 1 },
  { icon: '⬡', title: 'Frontend Engineering', shortDesc: 'Fast, accessible, and beautiful web apps built in React with clean architecture.', features: ['React + Vite', 'Tailwind CSS', 'Framer Motion animations', 'Responsive design', 'Performance optimised'], forWho: 'Startups and businesses needing a polished, high-performance frontend.', order: 2 },
  { icon: '◎', title: 'Brand & Visual Identity', shortDesc: 'Logo design, typography systems, and full visual identities from 6+ years of professional practice.', features: ['Logo design', 'Brand guidelines', 'Typography systems', 'Colour palette', 'Brand collateral'], forWho: 'Founders and businesses building their brand from scratch or rebranding.', order: 3 },
  { icon: '⬟', title: 'UI/UX Design', shortDesc: 'Figma-first UI design focused on usability, conversion, and visual precision.', features: ['Wireframing', 'High-fidelity UI', 'Design systems', 'Prototyping', 'Developer handoff'], forWho: 'Product teams and founders who need design before or alongside development.', order: 4 },
  { icon: '△', title: 'Full-Stack Web Development', shortDesc: 'End-to-end web application development from database to deployment.', features: ['React frontend', 'Node.js backend', 'MongoDB / PostgreSQL', 'REST APIs', 'Cloud deployment'], forWho: 'Clients needing a complete web application, not just a landing page.', order: 5 },
  { icon: '○', title: 'Maintenance & Support', shortDesc: 'Ongoing technical support, performance monitoring, and iterative improvements for live products.', features: ['Bug fixes', 'Performance audits', 'Feature additions', 'Dependency updates', 'Monthly reports'], forWho: 'Businesses with existing digital products that need ongoing technical care.', order: 6 },
]

const testimonials = [
  { name: 'James Harrington', company: 'Meridian Fintech', role: 'Co-Founder & CEO', rating: 5, feedback: 'Shahariar delivered our brand identity in 2 weeks and it completely changed how investors perceive us. The attention to detail and the quality of the final files were exceptional. Highly recommended.', status: 'approved', featured: true },
  { name: 'Priya Mehta', company: 'Bloom Content Studio', role: 'Creative Director', rating: 5, feedback: 'The content intelligence tool Shahariar built for us saves our team hours every week. He understood the brief immediately, communicated clearly throughout, and delivered something that actually works in a real workflow.', status: 'approved', featured: true },
  { name: 'Tom Ashford', company: 'Ashford Digital', role: 'Managing Director', rating: 5, feedback: 'Clean code, beautiful design, and delivered on time. What more can you ask for? Our new web app has received great feedback from clients since launch.', status: 'approved', featured: false },
  { name: 'Layla Osei', company: 'Startup Founder', role: 'Independent', rating: 4, feedback: 'Shahariar helped us scope and build our MVP quickly. His technical knowledge combined with a strong design eye meant we did not need separate designer and developer roles. Great value.', status: 'approved', featured: false },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')

  await Project.deleteMany()
  await Service.deleteMany()
  await Testimonial.deleteMany()

  await Project.insertMany(projects)
  await Service.insertMany(services)
  await Testimonial.insertMany(testimonials)

  console.log('Seed complete: projects, services, testimonials inserted.')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
