"use client";

import { useRef, useEffect, useState } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skills: Skill[] = [
    { name: "React", level: 90, category: "Frontend", icon: "💻" },
    { name: "Next.js", level: 85, category: "Frontend", icon: "⚡" },
    { name: "TypeScript", level: 85, category: "Programming", icon: "📝" },
    { name: "Node.js", level: 80, category: "Backend", icon: "🔧" },
    { name: "Python", level: 75, category: "Programming", icon: "🐍" },
    { name: "Machine Learning", level: 70, category: "AI", icon: "🤖" },
    { name: "Natural Language Processing", level: 80, category: "AI", icon: "💬" },
    { name: "Computer Vision", level: 65, category: "AI", icon: "👁️" },
    { name: "UI/UX Design", level: 85, category: "Design", icon: "🎨" },
    { name: "TailwindCSS", level: 90, category: "Frontend", icon: "🌈" },
    { name: "GraphQL", level: 75, category: "Backend", icon: "📊" },
    { name: "Docker", level: 70, category: "DevOps", icon: "🐳" },
  ];

  const categories = ["All", ...Array.from(new Set(skills.map((skill) => skill.category)))];

  const filteredSkills = activeFilter === "All" 
    ? skills 
    : skills.filter(skill => skill.category === activeFilter);

  return (
    <section id="skills" className="py-24 bg-foreground/5" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-foreground/60">
            Expertise in various technologies and domains
          </p>
        </div>

        <div className="flex justify-center mb-12 flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeFilter === category
                  ? "bg-primary text-white"
                  : "bg-foreground/10 hover:bg-foreground/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={`bg-background rounded-xl p-6 border border-foreground/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 transform hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{skill.name}</h3>
                  <p className="text-sm text-foreground/60">{skill.category}</p>
                </div>
                <span className="text-2xl">{skill.icon}</span>
              </div>
              
              <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: isVisible ? `${skill.level}%` : "0%",
                  }}
                ></div>
              </div>
              <div className="mt-2 text-right text-sm font-medium">
                {skill.level}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 