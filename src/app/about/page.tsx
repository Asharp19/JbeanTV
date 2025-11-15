"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const roadmapMilestones = [
  {
    quarter: "Q4 2025",
    items: [
      "Finalize AI prediction engine for public launch",
      "Release first wave of NFT collections for early adopters",
      "Release NFT access for Oracle pool holders",
      "Test and validate AI agencies for aaccuracy",
    ],
  },
  {
    quarter: "Q1 2026",
    items: [
      "Introduce staking and ecosystem engagement mechanisms",
      "Expand NFT utility and ecosystem incentives",
      "Explore partnerships with crypto trading platforms",
    ],
  },
  {
    quarter: "Q2 2026",
    items: [
      "Implement tokenized rewards system",
      "Expand AI analysis beyond crypto into stocks and forex",
      "Integrate with major decentralized exchanges (DEXs) and DeFi platforms",
    ],
  },
  {
    quarter: "Q3 2026",
    items: [
      "Target 100,000+ active users and NFT holders",
      "Expand AI capabilities with advanced sentiment analysis",
      "Secure additional strategic partnerships and funding for future development",
    ],
  },
];

const features = [
  {
    title: "AI-Driven Forecasting",
    description:
      "JBean's AI continuously learns from market data and user interactions to refine its predictions.",
  },
  {
    title: "Advanced Volume Analysis",
    description:
      "Identifies critical buy and sell pressure zones for better trade decision-making.",
  },
  {
    title: "Social Sentiment Analysis",
    description:
      "Evaluates market sentiment using real-time social media trends and discussions.",
  },
  {
    title: "Fundamental Analysis",
    description:
      "Incorporates key economic and project-specific indicators for comprehensive market evaluation.",
  },
  {
    title: "Crowd Intelligence",
    description:
      "Uses human in the loop to aggregate user predictions and refine prediction accuracy.",
  },
  {
    title: "Tokenized Incentives",
    description:
      "Participation in JBean's ecosystem is rewarded via NFT-based access, gamification of predictions.",
  },
];

export default function AboutPage() {
  const introRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("intro");
  const navIndicatorRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "intro", label: "Overview" },
    { id: "features", label: "Market" },
    { id: "roadmap", label: "Roadmap" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".intro-content, .feature-card, .roadmap-item", {
        opacity: 0,
        y: 50,
      });
      gsap.set(".roadmap-line", { scaleX: 0 });

      // Intro animation
      gsap.to(".intro-content", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".intro-content",
          start: "top 80%",
          onEnter: () => setActiveSection("intro"),
          onEnterBack: () => setActiveSection("intro"),
        },
      });

      // Features animation
      gsap.to(".feature-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 70%",
          onEnter: () => setActiveSection("features"),
          onEnterBack: () => setActiveSection("features"),
        },
      });

      // Roadmap animation
      gsap.to(".roadmap-item", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".roadmap-grid",
          start: "top 70%",
          onEnter: () => setActiveSection("roadmap"),
          onEnterBack: () => setActiveSection("roadmap"),
        },
      });

      // Connecting lines animation
      gsap.to(".roadmap-line", {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".roadmap-grid",
          start: "top 70%",
        },
      });

      // Floating navigation indicator animation
      gsap.to(navIndicatorRef.current, {
        y: sections.findIndex((s) => s.id === activeSection) * 40,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [activeSection, sections]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-page">
      {/* Floating Navigation */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="relative">
          <div
            ref={navIndicatorRef}
            className="absolute -left-2 w-1 h-10 bg-slate-400/40 rounded-full transition-transform duration-500"
          />
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`block py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                activeSection === section.id
                  ? "text-slate-400"
                  : "text-slate-400/40 hover:text-slate-400/60"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Introduction Section */}
        <div
          id="intro"
          ref={introRef}
          className="intro-content mb-32 scroll-mt-24"
        >
          <h1 className="text-5xl font-bold text-slate-100 mb-3 tracking-tight">
            JBean Investor Overview
          </h1>
          <div className="w-24 h-1 bg-slate-100/20 mb-12" />
          <Card className="bg-background-secondary/40 backdrop-blur-xl p-10 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:scale-[1.01]">
            <h2 className="text-3xl font-bold text-slate-100 mb-6">
              Introduction to JBean
            </h2>
            <p className="text-slate-100 leading-relaxed text-lg max-w-3xl">
              JBean is an innovative AI-driven platform that merges artificial intelligence, tehnical analysis with crowd wisdom to revolutionize predictive analytics in digital assets
              markets. Our goal is simple human insight deserves a stage in a world overwhelmed by noise and automation. <br /> Our ecosystem is designed to reward participation and learning. Whether you are an expert trader or just starting out you can contribute and earn. 
              Along with our prediction platform with ai analytics, We also have lessons by our master trader and our TV show with live competitions to help you grow, compete and earn rewards.
            </p>
          </Card>
        </div>

        {/* Features Grid */}
        <div id="features" ref={featuresRef} className="mb-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Market Opportunity
          </h2>
          <div className="w-24 h-1 bg-slate-100/20 mb-12" />
          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="feature-card bg-background-secondary/40 backdrop-blur-xl p-8 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold text-slate-100 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-100/80 text-base leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Roadmap Section */}
        <div id="roadmap" ref={roadmapRef} className="mb-24">
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Future Roadmap & Projections
          </h2>
          <div className="w-24 h-1 bg-slate-100/20 mb-12" />
          <div className="roadmap-grid relative">
            {/* Connecting line */}
            <div className="roadmap-line absolute left-1/2 top-0 w-0.5 h-full bg-slate-100/20 transform -translate-x-1/2 -z-10" />

            {/* Milestones */}
            <div className="space-y-16">
              {roadmapMilestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`roadmap-item flex items-start gap-12 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <Card className="flex-1 bg-background-secondary/40 backdrop-blur-xl p-8 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    <h3 className="text-2xl font-bold text-slate-100 mb-6">
                      {milestone.quarter}
                    </h3>
                    <ul className="space-y-4">
                      {milestone.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-slate-100/80 flex items-start gap-3 text-base leading-relaxed"
                        >
                          <span className="w-2 h-2 rounded-full bg-slate-100/40 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.2)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                  <div className="w-5 h-5 rounded-full bg-slate-100/40 flex-shrink-0 mt-8 relative shadow-[0_0_16px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-1 rounded-full bg-background-primary shadow-inner" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
