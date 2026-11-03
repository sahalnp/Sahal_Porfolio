import SketchReveal from "./SketchReveal";

const techStack = [
  { name: "Node.js & Express", description: "Scalable REST APIs, middleware architectures, and high-performance server logic.", emoji: "🟢", color: "sticky-note sticky-note-green" },
  { name: "Django (Python)", description: "Secure backends with normalized relational schemas, authentication, and ORM optimizations.", emoji: "🐍", color: "sticky-note" },
  { name: "React.js & React Native", description: "Modern, responsive web applications and mobile cross-platform client interfaces.", emoji: "⚛️", color: "sticky-note sticky-note-blue" },
  { name: "Socket.IO & Real-Time", description: "Bi-directional real-time communication for live POS dashboards and chat sync.", emoji: "⚡", color: "sticky-note sticky-note-yellow" },
  { name: "PostgreSQL & MongoDB", description: "Structured relational models and flexible NoSQL storage for analytical workloads.", emoji: "🗄️", color: "sticky-note sticky-note-pink" },
  { name: "AI & API Integrations", description: "WhatsApp Business API, Instagram Graph API auto-reply, and LLM integrations.", emoji: "🤖", color: "sticky-note sticky-note-blue" },
];

const TechStackSection = () => {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <SketchReveal variant="pencil">
          <h2 className="text-4xl md:text-5xl font-hand font-bold text-center mb-4">🧰 Skills & Tech Stack</h2>
          <p className="text-center font-sketch text-muted-foreground mb-12 text-lg">~ index cards from my digital desk ~</p>
        </SketchReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((tech, i) => (
            <SketchReveal key={tech.name} variant="sticky" delay={i * 0.1}>
              <div
                className={`${tech.color} p-6 tape-effect hover:scale-105 transition-transform`}
                style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1.5}deg)` }}
              >
                <div className="text-4xl mb-3">{tech.emoji}</div>
                <h3 className="font-hand text-2xl font-bold text-foreground mb-2">{tech.name}</h3>
                <p className="font-sketch text-sm text-pencil leading-relaxed">{tech.description}</p>
              </div>
            </SketchReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
