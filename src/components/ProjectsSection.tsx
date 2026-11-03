import SketchReveal from "./SketchReveal";

const projects = [
  {
    icon: "📊",
    title: "Performance Monitoring & Analytics System",
    desc: "Backend system for staff performance and project KPI analytics with real-time visualization dashboards. Built role-based access with optimized database queries for faster report generation.",
    tags: ["Node.js", "Express.js", "React.js", "PostgreSQL", "Socket.IO", "JWT"],
    color: "sticky-note-blue",
    link: "https://kpi-tracking-front.onrender.com",
  },
  {
    icon: "📦",
    title: "GINGR Distribution System",
    desc: "Issue reporting and campus maintenance task management system with role-based access for students and admins. Features real-time status tracking and centralized AI communication.",
    tags: ["Django", "React", "React Native", "PostgreSQL", "Socket.IO", "AI Integration"],
    color: "sticky-note-green",
    link: "https://distribution.gingr.in",
  },
  {
    icon: "💬",
    title: "CRM with AI WhatsApp & Instagram Auto-Reply",
    desc: "Full-featured CRM platform managing customer interactions across WhatsApp and Instagram. Features AI-powered auto-replies, Socket.IO real-time message sync, and role-based conversation assignments.",
    tags: ["Django", "React.js", "PostgreSQL", "WhatsApp API", "Instagram API", "Socket.IO"],
    color: "sticky-note-pink",
    link: "https://github.com/sahalnp",
  },
  {
    icon: "🛍️",
    title: "E-Commerce Mart (MERN Stack)",
    desc: "Full-stack e-commerce marketplace featuring user authentication, product management, cart persistence, and MongoDB database modeling.",
    tags: ["MongoDB", "Express", "React", "Node.js", "REST APIs"],
    color: "sticky-note-blue",
    link: "https://github.com/sahalnp/ecommerce_mart",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 px-4 paper-texture">
      <div className="container max-w-5xl mx-auto">
        <SketchReveal variant="pencil">
          <h2 className="text-4xl md:text-5xl font-hand font-bold text-center mb-4">🚀 Projects</h2>
          <p className="text-center font-sketch text-muted-foreground mb-12 text-lg">~ things I've built ~</p>
        </SketchReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <SketchReveal key={project.title} variant="sticky" delay={i * 0.15}>
              <div className={`sticky-note ${project.color} p-6 md:p-8 h-full transform ${i % 2 === 1 ? "rotate-1" : "-rotate-1"}`}>
                <div className="text-4xl mb-4">{project.icon}</div>
                <h3 className="font-hand text-xl font-bold mb-3 leading-tight">{project.title}</h3>
                <p className="font-sketch text-sm text-foreground mb-5 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="font-mono text-xs px-2.5 py-1 bg-background/70 border border-ink/15 rounded-sm hover:bg-primary/15 hover:border-primary/40 hover:scale-105 transition-all cursor-default select-none">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <div className="pt-2 border-t border-ink/10 flex items-center justify-between">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-hand font-bold text-sm text-primary hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>{project.link.includes("onrender.com") || project.link.includes("gingr.in") ? "🌐 Live Demo" : "🐙 View on GitHub"}</span>
                      <span>›</span>
                    </a>
                  </div>
                )}
              </div>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
