"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  codeUrl: string;
}

export default function Projects() {
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

  const projects: Project[] = [
    {
      id: 1,
      title: "AI Content Generator",
      description: "A tool that uses GPT-4 to generate blog posts, social media content, and more.",
      image: "/project1.jpg",
      tags: ["AI", "React", "Node.js"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      id: 2,
      title: "Smart Portfolio Analyzer",
      description: "Analyzes investment portfolios using machine learning to suggest improvements.",
      image: "/project2.jpg",
      tags: ["AI", "Python", "Finance"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      id: 3,
      title: "AI Chat Assistant",
      description: "A customizable chat assistant that can be trained on your business data.",
      image: "/project3.jpg",
      tags: ["AI", "NLP", "React", "Node.js"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      id: 4,
      title: "Image Recognition App",
      description: "Mobile app that can identify objects, plants, and landmarks from photos.",
      image: "/project4.jpg",
      tags: ["AI", "Computer Vision", "React Native"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      id: 5,
      title: "Smart Home Dashboard",
      description: "A central dashboard to control and monitor smart home devices with voice commands.",
      image: "/project5.jpg",
      tags: ["IoT", "React", "Voice AI"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      id: 6,
      title: "AI-Powered E-commerce",
      description: "E-commerce platform with personalized recommendations and virtual try-on.",
      image: "/project6.jpg",
      tags: ["AI", "E-commerce", "Next.js"],
      demoUrl: "#",
      codeUrl: "#",
    },
  ];

  const allTags = ["All", ...Array.from(new Set(projects.flatMap((project) => project.tags)))];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <section id="projects" className="py-24" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-foreground/60">
            Showcasing my best work and innovations
          </p>
        </div>

        <div className="flex justify-center mb-12 flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeFilter === tag
                  ? "bg-primary text-white"
                  : "bg-foreground/10 hover:bg-foreground/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`bg-background rounded-xl overflow-hidden border border-foreground/10 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 transform hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-foreground/70 text-sm mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-foreground/10 text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={project.demoUrl}
                    className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 transition-colors"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.codeUrl}
                    className="px-4 py-2 rounded-lg border border-foreground/20 text-sm hover:bg-foreground/5 transition-colors"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 