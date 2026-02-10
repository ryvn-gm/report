"use client";

import {
  HeroSection,
  DeliverablesSection,
  BugFixesSection,
  TimelineSection,
  VideoShowcase,
  LimitationsSection,
  TechAnalysis,
  RoadmapSection,
  DataDashboard,
  ConclusionSection,
} from "@/components/report";

export default function SLMProgressReport() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* NCTU Deliverables */}
      <DeliverablesSection />

      {/* Bug Fixes Comparison */}
      <BugFixesSection />

      {/* Demo Video Showcase */}
      <VideoShowcase />

      {/* Limitations Section */}
      <LimitationsSection />

      {/* Project Timeline */}
      <TimelineSection />

      {/* Evaluation Data Dashboard */}
      <DataDashboard />

      {/* Technical Analysis */}
      <TechAnalysis />

      {/* Roadmap & Solutions */}
      <RoadmapSection />

      {/* Conclusion & Next Steps */}
      <ConclusionSection />

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground/70">
            GoMore Progress Report Portal &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
