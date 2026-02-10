"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Flame,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const keyTakeaways = [
  {
    type: "success",
    title: "GoMore 技術貢獻",
    points: [
      "修復 4+ 項關鍵 Bug，包括環境相容性、模型格式、架構解耦",
      "建置 100+ 則測試資料集，涵蓋各類測試場景",
      "全天候技術支援與 QA 品質把關",
    ],
  },
  {
    type: "warning",
    title: "目前挑戰",
    points: [
      "1B 小模型中文生成能力存在結構性限制",
      "iOS 平台仍有讀檔問題待解決",
      "RAG 幻覺問題需持續優化 Prompt 策略",
    ],
  },
];

const nextSteps = [
  {
    title: "iOS 讀檔卡死問題修復",
    description: "iOS 平台讀取文件時出現卡死現象，需排查並修復",
    priority: "high" as const,
  },
  {
    title: "中文生成無限迴圈處理",
    description:
      "目前已有 stop button，但可以嘗試從模型配置的參數去著手，比如 temperature",
    priority: "normal" as const,
  },
  {
    title: "RAG 幻覺優化",
    description:
      "可透過 prompt 的調整，提升 LLM 對於有效 chunk 的判定",
    priority: "normal" as const,
  },
  {
    title: "效能監控與優化",
    description:
      "優化記憶體管理，包括文檔的上限、模型載入記憶體用量上限等等都尚未知",
    priority: "normal" as const,
  },
];

export function ConclusionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="heading-bar mx-auto mb-4 inline-block text-2xl font-semibold md:text-3xl">
            結論與下一步
          </h2>
          <p className="text-muted-foreground">
            關鍵重點摘要與後續行動計畫
          </p>
        </motion.div>

        {/* Key takeaways */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          {keyTakeaways.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card
                className={`h-full border-0 shadow-soft ${
                  item.type === "success" ? "bg-primary/5" : "bg-accent/10"
                }`}
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    {item.type === "success" ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                        <AlertTriangle className="h-5 w-5 text-accent" />
                      </div>
                    )}
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {item.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                            item.type === "success"
                              ? "bg-primary"
                              : "bg-accent"
                          }`}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <h3 className="mb-4 font-medium">下一步計畫</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="rounded-lg bg-secondary/50 p-4"
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium">{step.title}</span>
                      {step.priority === "high" && (
                        <Badge variant="destructive" className="ml-auto flex items-center gap-1 rounded-md text-[10px]">
                          <Flame className="h-3 w-3" />
                          高優先級
                        </Badge>
                      )}
                    </div>
                    <p className="pl-9 text-xs leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="mb-6 text-muted-foreground">
            如有任何問題或需要進一步討論，請隨時聯繫 GoMore 團隊
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/">
                <ArrowRight className="mr-2 h-4 w-4" />
                返回報告列表
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/01-30-slm-progress-report.md">
                <ExternalLink className="mr-2 h-4 w-4" />
                查看原始文件
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
