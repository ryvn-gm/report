"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const timelineData = [
  {
    date: "11/06",
    title: "專案啟動 Kickoff",
    gomore: "交付合約內容、定義專案 Scope 與驗收標準",
    nctu: "交付 Code Base、架構說明文件",
    status: "success",
    statusText: "On-time",
  },
  {
    date: "11/20",
    title: "App 模型切換與 RAG Flow",
    gomore: "執行 Code Review",
    nctu: "僅以報告形式說明 Graph RAG 架構發想，未交付可運行的 RAG App",
    status: "warning",
    statusText: "Delay / 規格落差",
    issues: ["App 仍無法切換模型", "RAG 功能未實作"],
  },
  {
    date: "12/02",
    title: "模組三測試與 RAG App 補件",
    gomore: null,
    nctu: "交付模組三測試結果、PC 版 RAG（非 App）",
    status: "error",
    statusText: "Critical Fail",
    issues: ["中文能力不達標", "交付 PC 版對 App 無實質幫助"],
  },
  {
    date: "12/09",
    title: "補進度 Meeting",
    gomore: "交付 User Manual (12/16)、英文測資 (12/18) 共 112 則",
    nctu: "承諾進行高通模型比較",
    status: "error",
    statusText: "系統退化 (Regression)",
    issues: ["越改越糟", "基礎 Gemma 回應都失效"],
  },
  {
    date: "01/09",
    title: "Vendor 模型測試驗收",
    gomore: null,
    nctu: "交付部分測試結果、整合 RAG 的 App",
    status: "error",
    statusText: "嚴重落差",
    issues: ["RAG 幻覺嚴重", "iOS 無法切換模型", "測試未完成"],
  },
  {
    date: "01/20",
    title: "修復 RAG 與 iOS Bugs",
    gomore: "交付 RAG 專用測資 (01/28) 共 40 則 QA",
    nctu: "交付整合 RAG 的 App",
    status: "warning",
    statusText: "仍有 Critical Issue",
    issues: ["iOS 讀檔問題持續無法解決"],
  },
];

const statusConfig = {
  success: {
    icon: CheckCircle2,
    color: "text-primary",
    bg: "bg-primary",
    ringColor: "ring-primary/20",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-accent",
    bg: "bg-accent",
    ringColor: "ring-accent/20",
  },
  error: {
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive",
    ringColor: "ring-destructive/20",
  },
};

export function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="bg-secondary/30 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="heading-bar mx-auto mb-4 inline-block text-2xl font-semibold md:text-3xl">
            專案時間軸
          </h2>
          <p className="text-muted-foreground">
            完整的里程碑追蹤與狀態記錄
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

          {timelineData.map((item, index) => {
            const status = statusConfig[item.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            const isExpanded = expandedIndex === index;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.date}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`relative mb-8 flex items-start gap-6 md:gap-0 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 z-10 md:left-1/2 md:-translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${status.bg} ring-4 ${status.ringColor} bg-card shadow-md`}
                  >
                    <StatusIcon className={`h-5 w-5 ${status.color}`} />
                  </motion.div>
                </div>

                {/* Content card */}
                <div
                  className={`ml-16 w-full md:ml-0 md:w-[calc(50%-40px)] ${
                    isEven ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <Card
                    className={`cursor-pointer border-0 shadow-soft transition-all hover-lift ${
                      isExpanded ? "ring-2 ring-primary/20" : ""
                    }`}
                    onClick={() =>
                      setExpandedIndex(isExpanded ? null : index)
                    }
                  >
                    <CardContent className="p-5">
                      {/* Header */}
                      <div className="mb-3 flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="rounded-md font-mono text-xs"
                        >
                          {item.date}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={`rounded-md text-xs ${status.color}`}
                        >
                          {item.statusText}
                        </Badge>
                      </div>

                      <h3 className="mb-3 font-medium">{item.title}</h3>

                      {/* GoMore contribution */}
                      {item.gomore && (
                        <div className="mb-2">
                          <span className="text-xs font-medium text-primary">
                            GoMore：
                          </span>
                          <p className="text-sm text-muted-foreground">
                            {item.gomore}
                          </p>
                        </div>
                      )}

                      {/* NCTU delivery */}
                      <div className="mb-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          交大：
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {item.nctu}
                        </p>
                      </div>

                      {/* Issues (expandable) */}
                      {item.issues && (
                        <motion.div
                          initial={false}
                          animate={{
                            height: isExpanded ? "auto" : 0,
                            opacity: isExpanded ? 1 : 0,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 border-t border-border pt-3">
                            <span className="text-xs font-medium text-destructive">
                              問題：
                            </span>
                            <ul className="mt-1 space-y-1">
                              {item.issues.map((issue, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}

                      {item.issues && (
                        <div className="mt-2 text-center">
                          <span className="text-xs text-muted-foreground">
                            {isExpanded ? "點擊收合" : "點擊展開詳情"}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
