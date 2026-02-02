"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Monitor, Smartphone, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const demos = [
  {
    id: "default",
    title: "Default 模型測試",
    subtitle: "Gemma 1B 基準測試",
    icon: Monitor,
    description: [
      "英文問答：詢問一般健康問題",
      "中文問答：展示生成故障（Looping/亂碼/簡中）現象",
    ],
    note: "已回報該錯誤，交大於 2/1 提交新版本代碼",
    color: "primary",
  },
  {
    id: "multimodel",
    title: "多模型切換",
    subtitle: "Qwen 模型比較",
    icon: Smartphone,
    description: ["切換至 Qwen 模型", "展示不同模型的回應品質差異"],
    note: "GoMore 解除架構鎖定後實現",
    color: "accent",
  },
  {
    id: "rag",
    title: "RAG 功能示範",
    subtitle: "檢索增強生成",
    icon: Database,
    description: [
      "上傳文件：示範上傳「台灣文化」相關文檔",
      "正確檢索：針對文檔內容提問，展示模型基於文件正確回答",
    ],
    note: "Android 端已可正常運行",
    color: "primary",
  },
];

export function VideoShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("default");
  const [isHovering, setIsHovering] = useState(false);

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
            Demo 影片展示
          </h2>
          <p className="text-muted-foreground">
            實際運行效果與功能展示
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 grid w-full grid-cols-3">
              {demos.map((demo) => (
                <TabsTrigger
                  key={demo.id}
                  value={demo.id}
                  className="flex items-center gap-2"
                >
                  <demo.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{demo.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {demos.map((demo) => (
              <TabsContent key={demo.id} value={demo.id}>
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Video placeholder */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card
                      className="group relative aspect-video cursor-pointer overflow-hidden border-0 shadow-soft"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      {/* Placeholder background with gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/80 to-muted">
                        {/* Decorative elements */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
                          <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
                        </div>

                        {/* Phone mockup silhouette */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <motion.div
                            animate={{
                              y: isHovering ? -5 : 0,
                              scale: isHovering ? 1.02 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                            className="h-48 w-24 rounded-3xl border-4 border-foreground/10 bg-card/50 shadow-2xl backdrop-blur-sm"
                          >
                            {/* Phone notch */}
                            <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-foreground/10" />
                            {/* Phone content area */}
                            <div className="m-2 mt-4 h-32 rounded-xl bg-foreground/5" />
                            {/* Home indicator */}
                            <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-foreground/10" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 shadow-lg backdrop-blur-sm transition-colors group-hover:bg-primary"
                        >
                          <Play className="ml-1 h-6 w-6 text-primary-foreground" />
                        </motion.div>
                      </div>

                      {/* Coming soon badge */}
                      <Badge
                        variant="secondary"
                        className="absolute right-4 top-4 rounded-md bg-card/80 backdrop-blur-sm"
                      >
                        影片即將上傳
                      </Badge>
                    </Card>
                  </motion.div>

                  {/* Demo description */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <Card className="h-full border-0 shadow-soft">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${demo.color}/10`}
                          >
                            <demo.icon
                              className={`h-5 w-5 text-${demo.color}`}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{demo.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {demo.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4 space-y-3">
                          <h4 className="text-sm font-medium">展示內容：</h4>
                          <ul className="space-y-2">
                            {demo.description.map((desc, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                {desc}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-3">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">備註：</span>{" "}
                            {demo.note}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
