"use client";

import {
  HeroSection,
  DeliverablesSection,
  TimelineSection,
  VideoShowcase,
  LimitationsSection,
  TechAnalysis,
  DataDashboard,
  ConclusionSection,
} from "@/components/report";

export default function SLMProgressReport() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Deliverables Comparison */}
      <DeliverablesSection />

      {/* Project Timeline */}
      <TimelineSection />

      {/* Demo Video Showcase */}
      <VideoShowcase />

      {/* Limitations Section */}
      <LimitationsSection />

      {/* Technical Analysis */}
      <TechAnalysis />

      {/* Evaluation Data Dashboard */}
      <DataDashboard />

      {/* Conclusion */}
      <ConclusionSection />

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground/70">
            GoMore Progress Report Portal &copy; 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
