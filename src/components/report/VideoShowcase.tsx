"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Play,
  Monitor,
  Smartphone,
  Database,
  X,
  Maximize2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const demos = [
  {
    id: "default",
    title: "Default 模型測試",
    subtitle: "Gemma 1B 基準測試",
    icon: Monitor,
    videoSrc: "/english_versus_chinese_generation.mov",
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
    videoSrc: "/model_switching(Qwen).mov",
    description: ["切換至 Qwen 模型", "展示不同模型的回應品質差異"],
    note: "GoMore 解除架構鎖定後實現",
    color: "accent",
  },
  {
    id: "rag",
    title: "RAG 功能示範",
    subtitle: "檢索增強生成",
    icon: Database,
    videoSrc: "/rag.mov",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<(typeof demos)[0] | null>(
    null
  );

  const handleVideoClick = (demo: (typeof demos)[0]) => {
    setSelectedVideo(demo);
    setIsModalOpen(true);
  };

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
          <p className="text-muted-foreground">實際運行效果與功能展示</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 flex h-auto flex-wrap justify-center gap-3 bg-transparent p-0">
              {demos.map((demo) => (
                <TabsTrigger
                  key={demo.id}
                  value={demo.id}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 shadow-soft transition-all data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  <demo.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{demo.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {demos.map((demo) => (
              <TabsContent key={demo.id} value={demo.id}>
                <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-center">
                  {/* Phone mockup with video */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex-shrink-0"
                  >
                    <div
                      className="group relative cursor-pointer"
                      onClick={() => handleVideoClick(demo)}
                    >
                      {/* Phone frame */}
                      <div className="relative rounded-[2.5rem] border-[8px] border-foreground/10 bg-foreground/5 p-2 shadow-soft transition-transform duration-300 group-hover:scale-[1.02]">
                        {/* Phone notch */}
                        <div className="absolute left-1/2 top-0 z-10 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground/10" />

                        {/* Video container - maintains phone aspect ratio */}
                        <div className="relative h-[400px] w-[185px] overflow-hidden rounded-[2rem] bg-black sm:h-[450px] sm:w-[207px]">
                          <video
                            className="h-full w-full object-cover"
                            src={demo.videoSrc}
                            muted
                            playsInline
                            preload="metadata"
                            onMouseEnter={(e) => {
                              const video = e.currentTarget;
                              video.currentTime = 0;
                              video.play().catch(() => {});
                            }}
                            onMouseLeave={(e) => {
                              const video = e.currentTarget;
                              video.pause();
                              video.currentTime = 0;
                            }}
                          />

                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity group-hover:bg-black/10">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 shadow-lg backdrop-blur-sm transition-all group-hover:bg-primary"
                            >
                              <Play className="ml-1 h-5 w-5 text-primary-foreground" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Home indicator */}
                        <div className="absolute bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-foreground/20" />
                      </div>

                      {/* Expand hint */}
                      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        <Maximize2 className="h-3 w-3" />
                        點擊放大播放
                      </div>
                    </div>
                  </motion.div>

                  {/* Demo description */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="w-full max-w-md"
                  >
                    <Card className="border-0 shadow-soft">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <demo.icon className="h-5 w-5 text-primary" />
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

      {/* Video Modal - optimized for vertical phone videos */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] max-w-fit border-0 bg-background/95 p-0 backdrop-blur-md">
          <DialogHeader className="absolute right-4 top-4 z-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-card/80 text-foreground/70 backdrop-blur-sm transition-colors hover:bg-card hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          {selectedVideo && (
            <div className="p-6">
              <DialogTitle className="mb-4 text-center text-lg font-medium">
                {selectedVideo.title} - {selectedVideo.subtitle}
              </DialogTitle>
              <div className="flex justify-center">
                {/* Phone frame in modal */}
                <div className="relative rounded-[2.5rem] border-[8px] border-foreground/10 bg-foreground/5 p-2">
                  {/* Phone notch */}
                  <div className="absolute left-1/2 top-0 z-10 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground/10" />

                  <div className="relative max-h-[70vh] w-auto overflow-hidden rounded-[2rem] bg-black">
                    <video
                      className="h-auto max-h-[70vh] w-auto"
                      src={selectedVideo.videoSrc}
                      controls
                      autoPlay
                      playsInline
                      style={{ maxWidth: "min(90vw, 400px)" }}
                    />
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-foreground/20" />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
