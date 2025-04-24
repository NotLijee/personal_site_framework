"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section id="about" className="py-24 relative" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-foreground/60">
            Passionate about creating innovative solutions with modern technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl border border-foreground/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10"></div>
              <Image
                src="/placeholder-person.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-background/80 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold mb-1">Your Name</h3>
                <p className="text-sm text-foreground/70 mb-3">AI Developer & Designer</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">AI</span>
                  <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full">Web Dev</span>
                  <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full">Design</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <h3 className="text-2xl font-bold">Hi there, I'm <span className="gradient-text">Your Name</span></h3>
            <p className="text-foreground/80">
              I'm a passionate developer and designer with expertise in creating AI-powered solutions.
              With over 5 years of experience in web development and artificial intelligence,
              I've helped businesses transform their digital presence and automate processes.
            </p>

            <p className="text-foreground/80">
              My focus is on creating intuitive, accessible, and high-performance applications
              that leverage the latest in AI technology to deliver exceptional user experiences.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
                <div className="text-3xl font-bold gradient-text">5+</div>
                <div className="text-sm text-foreground/60">Years Experience</div>
              </div>
              <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-foreground/60">Projects Completed</div>
              </div>
              <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
                <div className="text-3xl font-bold gradient-text">30+</div>
                <div className="text-sm text-foreground/60">Happy Clients</div>
              </div>
              <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
                <div className="text-3xl font-bold gradient-text">15+</div>
                <div className="text-sm text-foreground/60">AI Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 