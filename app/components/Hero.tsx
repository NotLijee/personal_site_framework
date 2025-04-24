"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className={`space-y-6 transition-all duration-1000 ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="gradient-text">John Doe's</span> 
            <br />Personal Website
          </h1>
          <p className="text-lg opacity-80 max-w-lg">
            A modern, sleek starter kit featuring intelligent components and personalized AI interactions for your personal brand.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50">
              Get Started
            </button>
            <button className="px-6 py-3 border border-foreground/20 rounded-lg font-medium hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20">
              Learn More
            </button>
          </div>
        </div>
        
        <div className={`relative transition-all duration-1000 delay-300 ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl"></div>
            <div className="absolute inset-4 bg-background/80 rounded-xl">
              <div className="p-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs opacity-50">AI Assistant</div>
                </div>
                
                <div className="flex-1 space-y-4 overflow-hidden">
                  <div className="bg-foreground/5 p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">How can I help you today?</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg max-w-[80%] ml-auto">
                    <p className="text-sm">Tell me about your services</p>
                  </div>
                  <div className="bg-foreground/5 p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">I offer web development, design, and AI integration services...</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg max-w-[80%] ml-auto">
                    <p className="text-sm">Can you show me your portfolio?</p>
                  </div>
                  <div className="relative bg-foreground/5 p-3 rounded-lg max-w-[80%] animate-pulse">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 