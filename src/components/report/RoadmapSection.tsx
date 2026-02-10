"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Layers,
  Server,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  CircleDollarSign,
  FlaskConical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const planA = {
  title: "方案 A：混合方案",
  subtitle: "SLM + LLM API 降級",
  icon: Layers,
  keyStats: { cost: "$135/月", coverage: "20-30%" },
  operations: [
    "簡單場景用 SLM → 覆蓋率 70-80%",
    "複雜場景自動降級到 LLM API → 覆蓋率 90-95%",
    "用 RAG + 結構化提示最大化現有模型效果",
  ],
  costTable: [
    { item: "初期工程", value: "中等（8-12 週）" },
    { item: "SLM 自託管", value: "低" },
    { item: "LLM API（10% 降級）", value: "~$135/月" },
  ],
  pros: ["成本低，ROI 快", "用戶體驗改善明顯", "風險低，可快速實施"],
  cons: ["依賴 API 服務", "無法完全自主"],
};

const planB = {
  title: "方案 B：升級 7B 模型",
  subtitle: "自託管開源大模型",
  icon: Server,
  keyStats: { cost: "$245/月", coverage: "50-65%" },
  models: ["Qwen2.5-7B", "Llama-3.3-8B", "Phi-3.5-mini (10.7B)"],
  costComparison: [
    { dimension: "記憶體", slm1b: "2-4 GB", slm7b: "15-18 GB", delta: "5-7x" },
    { dimension: "延遲", slm1b: "50-100 ms", slm7b: "300-500 ms", delta: "3-5x" },
    { dimension: "月成本（自託管）", slm1b: "~$200", slm7b: "~$245", delta: "+$45" },
  ],
  pros: ["性能顯著提升", "完全自主，隱私安全", "長期成本低於 API"],
  cons: ["初期硬體投資 $5K-10K", "延遲增加 3-5 倍", "需要運維能力"],
};

const phases = [
  {
    phase: 1,
    title: "快速混合方案",
    description: "方案 A 實施",
    result: "覆蓋率 60-70%，成本 <$500/月",
    items: [
      "評估 Qwen2.5-1B 和 Phi-3.5-mini 在繁體覆蓋率",
      "識別降級到 API 的場景",
      "實施自動降級邏輯",
      "A/B 測試量化改進",
    ],
  },
  {
    phase: 2,
    title: "數據驅動決策",
    description: "評估是否升級至方案 B",
    result: "依數據決定下一步",
    items: [
      "根據第 1 階段數據決策",
      "如升級：部署 Qwen2.5-7B，測試延遲和成本",
      "如不升級：持續混合方案，積累評估數據",
    ],
  },
  {
    phase: 3,
    title: "長期評估",
    description: "業務量與收益分析",
    result: "確定最終技術路線",
    items: [
      "方案 A/B 滿足需求則繼續",
      "需更高覆蓋率則啟動自研可行性研究",
      "持續監控模型生態系統進展",
    ],
  },
];

function PlanCard({
  plan,
  type,
  isInView,
  delay,
}: {
  plan: typeof planA | typeof planB;
  type: "a" | "b";
  isInView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full border-0 shadow-soft">
        <CardHeader className="pb-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <plan.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="rounded-md font-mono text-xs">
                {plan.keyStats.cost}
              </Badge>
              <Badge className="rounded-md text-xs">
                覆蓋率 {plan.keyStats.coverage}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-lg">{plan.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Plan A: operations, Plan B: models + cost table */}
          {type === "a" && "operations" in plan && (
            <>
              <div>
                <h4 className="mb-2 text-sm font-medium">操作方式</h4>
                <ul className="space-y-2">
                  {(plan as typeof planA).operations.map((op, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                      {op}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">成本項目</TableHead>
                      <TableHead className="text-right text-xs">投入</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(plan as typeof planA).costTable.map((row) => (
                      <TableRow key={row.item}>
                        <TableCell className="text-sm">{row.item}</TableCell>
                        <TableCell className="text-right text-sm font-medium">
                          {row.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          {type === "b" && "models" in plan && (
            <>
              <div>
                <h4 className="mb-2 text-sm font-medium">推薦模型</h4>
                <div className="flex flex-wrap gap-2">
                  {(plan as typeof planB).models.map((model) => (
                    <Badge
                      key={model}
                      variant="secondary"
                      className="rounded-md text-xs"
                    >
                      {model}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">維度</TableHead>
                      <TableHead className="text-right text-xs">1B</TableHead>
                      <TableHead className="text-right text-xs">7B</TableHead>
                      <TableHead className="text-right text-xs">增量</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(plan as typeof planB).costComparison.map((row) => (
                      <TableRow key={row.dimension}>
                        <TableCell className="text-sm">{row.dimension}</TableCell>
                        <TableCell className="text-right text-sm">
                          {row.slm1b}
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          {row.slm7b}
                        </TableCell>
                        <TableCell className="text-right text-sm font-medium text-accent">
                          {row.delta}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          {/* Pros / Cons */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-primary/5 p-3">
              <h5 className="mb-2 text-xs font-medium text-primary">優勢</h5>
              <ul className="space-y-1">
                {plan.pros.map((pro) => (
                  <li
                    key={pro}
                    className="flex items-start gap-1.5 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-accent/10 p-3">
              <h5 className="mb-2 text-xs font-medium text-accent">考量</h5>
              <ul className="space-y-1">
                {plan.cons.map((con) => (
                  <li
                    key={con}
                    className="flex items-start gap-1.5 text-xs text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function RoadmapSection() {
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
            解決方案與路線圖
          </h2>
          <p className="text-muted-foreground">
            可行方案分析與階段性執行計畫
          </p>
        </motion.div>

        {/* Plan A vs Plan B */}
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <PlanCard plan={planA} type="a" isInView={isInView} delay={0.2} />
          <PlanCard plan={planB} type="b" isInView={isInView} delay={0.3} />
        </div>

        {/* 3-Phase Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="mb-8 text-center text-lg font-semibold">
            階段性執行計畫
          </h3>

          <div className="grid gap-6 md:grid-cols-3">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card className="group h-full border-0 shadow-soft transition-all hover-lift">
                  <CardContent className="flex h-full flex-col p-6">
                    {/* Phase number */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {phase.phase}
                      </div>
                      <div>
                        <h4 className="font-medium">{phase.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {phase.description}
                        </p>
                      </div>
                    </div>

                    {/* Action items */}
                    <ul className="flex-1 space-y-2">
                      {phase.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Expected result */}
                    <div className="mt-4 rounded-lg bg-primary/5 p-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs font-medium text-primary">
                          預期結果
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {phase.result}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Self-developed model note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="border-0 bg-muted/50 shadow-soft">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <FlaskConical className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="mb-1 font-medium">
                  方案 C：自行研發中文模型
                </h4>
                <p className="text-sm text-muted-foreground">
                  耗時較長、訓練成本較高，建議視前兩階段成效後再評估可行性。
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
