"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertCircle, CheckCircle2, ArrowRight, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const bugFixes = [
  {
    date: "11/20",
    issue: {
      title: "App 啟動與環境相容性問題",
      description: "交付版本僅能在特定 OS 版本下運作，無法跨平台啟動",
    },
    solution: {
      title: "環境配置重構",
      description:
        "重構專案的環境配置與版本依賴管理，成功適配主流 Android 與 iOS 裝置",
    },
    status: "resolved",
  },
  {
    date: "12/9",
    issue: {
      title: "模型檔案格式錯誤",
      description: "部分模型檔案存在格式封裝錯誤或元數據損壞，導致編譯失敗",
    },
    solution: {
      title: "模型重新量化與轉檔",
      description:
        "重新執行模型量化 (Quantization) 與轉檔作業，轉換為正確的 .task 格式",
    },
    status: "resolved",
  },
  {
    date: "1/9",
    issue: {
      title: "模型架構高度耦合",
      description:
        "原版本與 Gemma 模型架構強綁定，無法切換至其他廠商模型 (Qwen, Phi)",
    },
    solution: {
      title: "架構解耦與客製化",
      description:
        "對 flutter_gemma 底層進行客製化修改，解除架構鎖定，實現多模型切換",
    },
    status: "resolved",
  },
  {
    date: "1/20",
    issue: {
      title: "Embedding 模型初始化失敗",
      description: "文件上傳流程中，因路徑配置錯誤導致 Embedding Model 崩潰",
    },
    solution: {
      title: "檔案 I/O 邏輯修正",
      description: "修正檔案路徑讀取邏輯，Android 端已可正常初始化並向量化",
    },
    status: "partial",
    note: "iOS 端持續排查中",
  },
];

export function BugFixesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-secondary/30 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="heading-bar mx-auto mb-4 inline-block text-2xl font-semibold md:text-3xl">
            問題發現與修復對照
          </h2>
          <p className="text-muted-foreground">
            GoMore 團隊針對交付版本的技術支援與修復紀錄
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 flex justify-center gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">4+</div>
            <div className="text-sm text-muted-foreground">關鍵問題修復</div>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">11</div>
            <div className="text-sm text-muted-foreground">週專案支援</div>
          </div>
        </motion.div>

        {/* Bug fixes comparison table */}
        <div className="space-y-4">
          {bugFixes.map((item, index) => (
            <motion.div
              key={item.date}
              initial={{ opacity: 0, x: -20 }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="overflow-hidden border-0 shadow-soft">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Date badge */}
                    <div className="flex items-center justify-center bg-muted/50 px-6 py-4 lg:w-24 lg:flex-shrink-0">
                      <Badge
                        variant="outline"
                        className="rounded-md font-mono text-xs"
                      >
                        {item.date}
                      </Badge>
                    </div>

                    {/* Issue column */}
                    <div className="flex-1 border-b border-border/50 p-5 lg:border-b-0 lg:border-r">
                      <div className="mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-accent" />
                        <span className="text-xs font-medium text-accent">
                          發現問題
                        </span>
                      </div>
                      <h4 className="mb-1 font-medium">{item.issue.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.issue.description}
                      </p>
                    </div>

                    {/* Arrow (hidden on mobile) */}
                    <div className="hidden items-center px-4 lg:flex">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>

                    {/* Solution column */}
                    <div className="flex-1 bg-primary/5 p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium text-primary">
                          GoMore 修復
                        </span>
                        {item.status === "resolved" ? (
                          <CheckCircle2 className="ml-auto h-4 w-4 text-primary" />
                        ) : (
                          <Badge
                            variant="secondary"
                            className="ml-auto rounded-md text-xs"
                          >
                            進行中
                          </Badge>
                        )}
                      </div>
                      <h4 className="mb-1 font-medium">{item.solution.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.solution.description}
                      </p>
                      {item.note && (
                        <p className="mt-2 text-xs text-muted-foreground/70">
                          備註：{item.note}
                        </p>
                      )}
                    </div>
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
