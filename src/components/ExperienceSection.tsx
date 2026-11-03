import SketchReveal from "./SketchReveal";

const experience = [
  {
    year: "Jan 2026 - Present",
    role: "AI Full-Stack Developer",
    company: "GINGR Technologies",
    badge: "Current Role",
    detail: "Building real-time POS dashboards, high-performance RESTful APIs, and AI integrations driving measurable business impact.",
    highlights: [
      "Developed and maintained real-time POS dashboards for sales tracking and business analytics, improving response time by 25%.",
      "Built and integrated RESTful APIs for KPI tracking and operational reporting, reducing API latency by 30% through backend optimization.",
      "Supported POS systems handling 100+ daily transactions with stable performance and reliable real-time updates.",
      "Optimized backend logic and database queries to enhance system scalability and reduce loading time.",
      "Refactored existing modules to improve code structure, maintainability, and long-term scalability."
    ],
    skills: ["Django", "Python", "Node.js", "Express", "React", "PostgreSQL", "Socket.IO", "AI Integration"]
  },
  {
    year: "2022 - 2026",
    role: "B.Tech in Computer Science & Engineering",
    company: "Albertian Institute of Science and Technology",
    badge: "Education",
    detail: "Graduating computer science engineer with strong foundations in algorithms, distributed systems, and real-time full-stack architectures.",
    highlights: [
      "Solved 90+ algorithmic problems across difficulty levels on LeetCode.",
      "Maintained a 32-day coding streak and earned the LeetCode 50 Days Badge 2025.",
      "Built multiple production-grade systems including campus distribution platforms, analytics dashboards, and CRM bots."
    ],
    skills: ["Data Structures", "Algorithms", "System Design", "Database Design", "WebSockets"]
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 px-4 paper-texture">
      <div className="container max-w-4xl mx-auto">
        <SketchReveal variant="pencil">
          <h2 className="text-4xl md:text-5xl font-hand font-bold text-center mb-4">💼 Experience</h2>
          <p className="text-center font-sketch text-muted-foreground mb-16 text-lg">~ places I've built & grown ~</p>
        </SketchReveal>

        <div className="space-y-12 pl-6 md:pl-8 border-l-2 border-dashed border-primary/40">
          {experience.map((item, i) => (
            <SketchReveal key={item.company} variant="pencil" delay={i * 0.15}>
              <div className="relative pl-6 md:pl-8 group">
                {/* Timeline Bullet Node */}
                <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-5 h-5 rounded-full bg-sticky-yellow border-2 border-primary shadow-sm flex items-center justify-center group-hover:scale-125 group-hover:bg-primary transition-all duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-background transition-colors" />
                </div>

                {/* Timeline Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-xs md:text-sm font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
                      {item.year}
                    </span>
                    {item.badge && (
                      <span className="font-sketch text-xs px-2 py-0.5 bg-accent/30 text-foreground/80 rounded border border-accent/40">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="font-sketch text-base md:text-lg text-primary font-bold">
                    {item.company}
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="font-hand text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {item.role}
                </h3>

                {/* Overview */}
                <p className="font-sketch text-base md:text-lg text-foreground/85 leading-relaxed mb-4">
                  {item.detail}
                </p>

                {/* Highlights Card */}
                <div className="bg-card/60 p-4 md:p-6 rounded-lg sketch-border-light mb-4 group-hover:shadow-md transition-shadow">
                  <ul className="space-y-2.5">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 font-sketch text-sm md:text-base text-pencil leading-relaxed">
                        <span className="text-primary font-bold mt-0.5">›</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-2.5 py-1 bg-background/80 border border-ink/15 rounded-sm hover:bg-primary/15 hover:border-primary/40 hover:scale-105 transition-all cursor-default select-none"
                    >
                      #{skill.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
