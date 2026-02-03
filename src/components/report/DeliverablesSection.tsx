"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Smartphone, Cpu, Database, Sparkles, Code2, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const nctuDeliverables = [
  {
    icon: Smartphone,
    title: "Flutter 跨平台 App 開發",
    description:
      "使用 Flutter 框架完成具備聊天對話功能的跨平台行動應用程式介面，支援 Android 與 iOS 雙平台。",
    highlights: ["跨平台相容", "聊天介面", "即時互動"],
  },
  {
    icon: Cpu,
    title: "手機端 Gemma 模型部署",
    description:
      "成功將 Gemma 1B 模型 (Gemma3-1B-IT) 部署至行動裝置，實現端側 AI 推論能力。",
    highlights: ["端側運算", "Gemma 1B", "即時推論"],
  },
  {
    icon: Database,
    title: "RAG 架構設計與實作",
    description:
      "在程式碼層面建構 RAG (Retrieval-Augmented Generation) 檢索架構，實現文件上傳與知識檢索功能。",
    highlights: ["文件檢索", "向量化", "知識增強"],
  },
];

const techStack = [
  { icon: Code2, label: "Flutter" },
  { icon: Layers, label: "TensorFlow Lite" },
  { icon: Sparkles, label: "Gemma 1B" },
];

export function DeliverablesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="heading-bar mx-auto mb-4 inline-block text-2xl font-semibold md:text-3xl">
            交大團隊交付成果
          </h2>
          <p className="text-muted-foreground">
            專案核心功能與技術架構
          </p>
        </motion.div>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 flex flex-wrap justify-center gap-4"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2"
            >
              <tech.icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{tech.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Deliverables grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {nctuDeliverables.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Card className="group h-full border-0 shadow-soft transition-all hover-lift">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="mb-2 font-semibold">{item.title}</h3>

                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
