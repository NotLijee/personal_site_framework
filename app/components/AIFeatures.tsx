"use client";

import { useState, useRef, useEffect } from "react";

export default function AIFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeFeature, setActiveFeature] = useState("assistant");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Simulate AI processing
    setIsGenerating(true);
    setResponse("");
    
    // For demo purposes, we'll use setTimeout to simulate AI response time
    const demoResponses: Record<string, string> = {
      assistant: "I'd be happy to help you with that! Based on your request, I recommend looking into using React with TypeScript for your frontend, and combining it with Node.js for your backend. This stack will give you great developer experience with type safety while maintaining high performance.",
      image: "Image generation complete. I've created a futuristic cityscape with flying vehicles and holographic advertisements based on your description.",
      content: "Here's your blog post about 'The Future of AI in Web Development'. I've structured it with an introduction, 5 key points about AI's impact on development workflows, and a conclusion with actionable insights.",
      code: "```jsx\nimport React, { useState } from 'react';\n\nconst AIComponent = () => {\n  const [data, setData] = useState([]);\n  \n  const fetchAIRecommendations = async () => {\n    const response = await fetch('/api/recommendations');\n    const results = await response.json();\n    setData(results);\n  };\n\n  return (\n    <div className=\"ai-container\">\n      <button onClick={fetchAIRecommendations}>Get Recommendations</button>\n      {data.map(item => (\n        <div key={item.id} className=\"recommendation-card\">\n          {item.title}\n        </div>\n      ))}\n    </div>\n  );\n};\n\nexport default AIComponent;\n```",
    };
    
    let displayText = "";
    const fullText = demoResponses[activeFeature] || "I'm not sure how to help with that specific task yet.";
    
    // Simulate typing effect
    const interval = setInterval(() => {
      if (displayText.length < fullText.length) {
        displayText += fullText.charAt(displayText.length);
        setResponse(displayText);
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 20);
    
    return () => clearInterval(interval);
  };

  const features = [
    {
      id: "assistant",
      name: "AI Assistant",
      description: "Ask questions and get real-time answers about development, design, or anything else.",
      placeholder: "How should I structure my web app for best performance?",
    },
    {
      id: "image",
      name: "Image Generation",
      description: "Generate custom images based on text descriptions.",
      placeholder: "A futuristic cityscape with flying cars and neon lights",
    },
    {
      id: "content",
      name: "Content Creation",
      description: "Generate blog posts, articles, and social media content.",
      placeholder: "Write a blog post about the future of AI in web development",
    },
    {
      id: "code",
      name: "Code Generation",
      description: "Generate code snippets and functions based on descriptions.",
      placeholder: "Create a React component that fetches and displays AI recommendations",
    },
  ];

  const currentFeature = features.find(f => f.id === activeFeature) || features[0];

  return (
    <section id="ai-features" className="py-24 bg-foreground/5" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            AI <span className="gradient-text">Features</span>
          </h2>
          <p className="text-foreground/60">
            Experience the power of AI in this interactive demo
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`bg-background rounded-xl border border-foreground/10 shadow-lg overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 p-6 border-r border-foreground/10">
                <h3 className="text-xl font-bold mb-4">Try It Out</h3>
                
                <div className="space-y-1 mb-6">
                  {features.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => {
                        setActiveFeature(feature.id);
                        setResponse("");
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                        activeFeature === feature.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-foreground/5"
                      }`}
                    >
                      {feature.name}
                    </button>
                  ))}
                </div>
                
                <div className="bg-foreground/5 p-4 rounded-lg text-sm mb-6">
                  <h4 className="font-semibold mb-2">{currentFeature.name}</h4>
                  <p className="text-foreground/70">{currentFeature.description}</p>
                </div>
                
                <div className="text-xs text-foreground/50 mt-auto">
                  Note: This is a demo. In a real implementation, this would connect to AI APIs.
                </div>
              </div>
              
              <div className="md:col-span-3 p-6">
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="mb-4">
                    <label htmlFor="aiPrompt" className="block text-sm font-medium mb-2">
                      Enter your prompt:
                    </label>
                    <textarea
                      id="aiPrompt"
                      className="w-full p-3 rounded-lg bg-foreground/5 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      rows={3}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={currentFeature.placeholder}
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isGenerating || !inputText.trim()}
                    className={`px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isGenerating ? "opacity-70" : ""
                    }`}
                  >
                    {isGenerating ? "Generating..." : "Generate"}
                  </button>
                </form>
                
                <div className="border border-foreground/10 rounded-lg p-4 h-64 overflow-y-auto">
                  <div className="font-mono text-sm whitespace-pre-wrap">
                    {response || (
                      <span className="text-foreground/50">
                        AI response will appear here...
                      </span>
                    )}
                    {isGenerating && (
                      <span className="inline-block w-2 h-4 bg-primary ml-1 animate-blink"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 