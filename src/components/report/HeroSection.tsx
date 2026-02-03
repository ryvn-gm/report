"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Wrench, Calendar, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: Wrench,
    value: 4,
    suffix: "+",
    label: "關鍵問題修復",
    description: "解決交大交付的重大 Bug",
  },
  {
    icon: Calendar,
    value: 11,
    suffix: "週",
    label: "專案週期",
    description: "2024/11 - 2025/01",
  },
  {
    icon: FileText,
    value: 100,
    suffix: "+",
    label: "測試資料",
    description: "涵蓋各類測試場景",
  },
];

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-accent/10 blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2"
        >
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">
            2025 年 1 月 30 日 進度報告
          </span>
        </motion.div>

        {/* Title with typing effect */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        >
          <TypeAnimation
            sequence={["交大 SLM 專案進度報告"]}
            wrapper="span"
            speed={30}
            cursor={true}
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-lg text-muted-foreground"
        >
          GoMore 團隊針對交大 Small Language Model 專案的完整評估報告，
          涵蓋問題分析、技術修復與未來展望
        </motion.p>

        {/* Stats cards */}
        <div ref={ref} className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
            >
              <Card className="group border-0 bg-card/50 shadow-soft backdrop-blur-sm transition-all hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mb-1 text-3xl font-bold">
                    {isInView ? (
                      <CountUp
                        end={stat.value}
                        duration={2}
                        delay={0.5 + index * 0.2}
                      />
                    ) : (
                      0
                    )}
                    <span className="text-primary">{stat.suffix}</span>
                  </div>
                  <div className="mb-1 font-medium">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs">向下捲動</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
