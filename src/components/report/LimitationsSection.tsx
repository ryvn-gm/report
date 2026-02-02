"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Wrench,
  Ban,
  MessageSquareWarning,
  RefreshCw,
  Smartphone,
  Brain,
  Cpu,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const fixableLimitations = [
  {
    icon: MessageSquareWarning,
    title: "RAG 幻覺與 Prompt 策略優化",
    description:
      "模型頻繁出現幻覺或拒答，原因是 Prompt 指令對上下文關聯性判斷過於嚴格",
    solution: "調整 Prompt Engineering 以提升回答精準度",
    status: "進行中",
  },
  {
    icon: RefreshCw,
    title: "中文生成無限迴圈異常",
    description:
      "部分模型在生成中文時陷入重複 Token 的無限迴圈，導致 App 必須強制關閉",
    solution: "優化 Temperature 參數，引入生成監控與錯誤捕捉機制",
    status: "已回報",
  },
  {
    icon: Smartphone,
    title: "iOS 讀檔卡死/崩潰問題",
    description:
      "iOS Watchdog 機制與 Jetsam 記憶體限制導致讀取文件卡死或崩潰",
    solution: "重構讀檔模組，將檔案解析移至 Isolate 背景執行",
    status: "排查中",
  },
];

const modelLimitations = [
  {
    icon: Brain,
    title: "1B 模型中文生成結構性缺陷",
    description:
      "1B 參數等級的小模型在中文生成時，普遍存在無限迴圈、亂碼或僅支援簡體中文的現象",
    reasons: [
      "參數容量不足：無法容納完整的中文語義特徵",
      "訓練數據偏差：90% 以上為英文或簡體中文",
    ],
  },
  {
    icon: Cpu,
    title: "端側小模型智能天花板",
    description: "1B 模型的通用理解力與邏輯推理能力薄弱，難以處理複雜指令",
    reasons: [
      "邏輯鏈斷裂：淺層神經網路無法支撐多步推理",
      "知識壓縮極限：參數是對人類知識的極限壓縮",
    ],
  },
  {
    icon: Zap,
    title: "邊緣裝置硬體門檻",
    description: "僅在中高階或較新款機型上能穩定運行，舊款手機無法支援",
    reasons: [
      "iOS：建議 iPhone 12 (A14) 或更新機型",
      "Android：建議 Snapdragon 8 Gen 3 或同等級",
    ],
  },
];

export function LimitationsSection() {
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
            目前的限制
          </h2>
          <p className="text-muted-foreground">
            可修正的問題 vs 模型本身的限制
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Fixable limitations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border-0 shadow-soft">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">內部可修正的問題</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {fixableLimitations.map((item, index) => (
                    <AccordionItem key={index} value={`fixable-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pl-7">
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="rounded-lg bg-primary/5 p-3">
                            <p className="text-xs">
                              <span className="font-medium text-primary">
                                解決方案：
                              </span>{" "}
                              <span className="text-muted-foreground">
                                {item.solution}
                              </span>
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="rounded-md text-xs"
                          >
                            {item.status}
                          </Badge>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>

          {/* Model limitations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full border-0 shadow-soft">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                    <Ban className="h-5 w-5 text-destructive" />
                  </div>
                  <CardTitle className="text-lg">模型限制（無法修正）</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {modelLimitations.map((item, index) => (
                    <AccordionItem key={index} value={`model-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 flex-shrink-0 text-destructive" />
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pl-7">
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="rounded-lg bg-muted p-3">
                            <p className="mb-2 text-xs font-medium">原因：</p>
                            <ul className="space-y-1">
                              {item.reasons.map((reason, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-xs text-muted-foreground"
                                >
                                  <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
