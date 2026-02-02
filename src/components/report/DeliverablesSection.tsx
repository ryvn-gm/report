"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Smartphone,
  Cpu,
  Database,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const nctuDeliverables = [
  {
    icon: Smartphone,
    title: "Flutter UI 互動實作",
    description: "使用 Flutter 完成跨平台 App 聊天介面開發",
    status: "delivered",
  },
  {
    icon: Cpu,
    title: "手機端 Gemma 模型運行",
    description: "將 Gemma 1B 模型部署至行動裝置",
    status: "partial",
  },
  {
    icon: Database,
    title: "RAG 架構定義與規劃",
    description: "建構 RAG 檢索架構與邏輯",
    status: "partial",
  },
];

const gomoreContributions = [
  {
    title: "App 啟動與環境適配",
    date: "11/20",
    description: "重構專案環境配置，解決跨平台相容性問題",
  },
  {
    title: "模型檔案格式修復",
    date: "12/9",
    description: "重新執行量化與轉檔作業，修復編譯失敗問題",
  },
  {
    title: "多模型切換架構解耦",
    date: "1/9",
    description: "客製化 flutter_gemma 底層，實現多模型切換",
  },
  {
    title: "Embedding 初始化修復",
    date: "1/20",
    description: "修正 Android 端檔案路徑讀取邏輯",
  },
];

const statusConfig = {
  delivered: {
    icon: CheckCircle2,
    color: "text-primary",
    bg: "bg-primary/10",
    label: "已交付",
  },
  partial: {
    icon: AlertTriangle,
    color: "text-accent",
    bg: "bg-accent/20",
    label: "部分完成",
  },
  failed: {
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    label: "未完成",
  },
};

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
            交付成果與貢獻
          </h2>
          <p className="text-muted-foreground">
            交大交付內容 vs GoMore 技術支援
          </p>
        </motion.div>

        {/* Two columns comparison */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* NCTU deliverables */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-1 w-1 rounded-full bg-muted-foreground" />
              <h3 className="text-lg font-medium">交大交付項目</h3>
            </div>
            <div className="space-y-4">
              {nctuDeliverables.map((item, index) => {
                const status = statusConfig[item.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="border-0 shadow-soft transition-all hover-lift">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 flex items-center justify-between">
                              <h4 className="font-medium">{item.title}</h4>
                              <Badge
                                variant="secondary"
                                className={`${status.bg} ${status.color} rounded-md border-0`}
                              >
                                <StatusIcon className="mr-1 h-3 w-3" />
                                {status.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* GoMore contributions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <h3 className="text-lg font-medium text-primary">
                GoMore 技術修復
              </h3>
            </div>
            <div className="space-y-4">
              {gomoreContributions.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="border-0 bg-primary/5 shadow-soft transition-all hover-lift">
                    <CardContent className="p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-medium">{item.title}</h4>
                        <Badge
                          variant="outline"
                          className="rounded-md text-xs font-normal"
                        >
                          {item.date}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
