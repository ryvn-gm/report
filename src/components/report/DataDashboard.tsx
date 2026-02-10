"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const performanceData = [
  {
    name: "Default",
    fullName: "Gemma 1B",
    speed: 37.89,
    memory: 878,
    power: 798,
    bertScore: 0.866,
    rougeL: 0.291,
  },
  {
    name: "Int4",
    fullName: "Int4 量化",
    speed: 36.23,
    memory: 903,
    power: 835,
    bertScore: 0.874,
    rougeL: 0.31,
  },
  {
    name: "Q8",
    fullName: "Int8 量化",
    speed: 26.17,
    memory: 1558,
    power: 1098,
    bertScore: 0.897,
    rougeL: 0.432,
  },
  {
    name: "Qwen",
    fullName: "Qwen 1.5B",
    speed: 21.13,
    memory: 1868,
    power: 1182,
    bertScore: 0.912,
    rougeL: 0.448,
  },
];

const ragImprovementData = [
  {
    metric: "BERTScore",
    Default: 4.85,
    Qwen: 1.79,
  },
  {
    metric: "ROUGE-L",
    Default: 104.91,
    Qwen: 30.49,
  },
];

const radarData = [
  { subject: "速度", Default: 100, Qwen: 56, fullMark: 100 },
  { subject: "記憶體效率", Default: 100, Qwen: 47, fullMark: 100 },
  { subject: "功耗效率", Default: 100, Qwen: 68, fullMark: 100 },
  { subject: "BERTScore", Default: 95, Qwen: 100, fullMark: 100 },
  { subject: "ROUGE-L", Default: 65, Qwen: 100, fullMark: 100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="mb-2 font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name.includes("%") || entry.dataKey === "bertScore"
              ? ""
              : entry.dataKey === "memory"
                ? " MB"
                : entry.dataKey === "power"
                  ? " mW"
                  : entry.dataKey === "speed"
                    ? " t/s"
                    : "%"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DataDashboard() {
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
            評估數據 Dashboard
          </h2>
          <p className="text-muted-foreground">
            交大交付的模型評估報告數據視覺化
          </p>
        </motion.div>

        <Tabs defaultValue="performance" className="space-y-8">
          <TabsList className="flex h-auto flex-wrap justify-center gap-3 bg-transparent p-0">
            <TabsTrigger value="performance" className="rounded-lg border border-border bg-card px-4 py-2.5 text-xs shadow-soft transition-all data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none sm:text-sm">
              效能比較
            </TabsTrigger>
            <TabsTrigger value="quality" className="rounded-lg border border-border bg-card px-4 py-2.5 text-xs shadow-soft transition-all data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none sm:text-sm">
              品質分析
            </TabsTrigger>
            <TabsTrigger value="rag" className="rounded-lg border border-border bg-card px-4 py-2.5 text-xs shadow-soft transition-all data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none sm:text-sm">
              RAG 改善
            </TabsTrigger>
          </TabsList>

          {/* Performance comparison */}
          <TabsContent value="performance">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid gap-6 lg:grid-cols-2"
            >
              {/* Speed chart */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">推論速度比較</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DE" />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="speed"
                        name="Token/s"
                        fill="#5C6E58"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    Gemma Default 速度最快 (37.89 t/s)
                  </p>
                </CardContent>
              </Card>

              {/* Memory chart */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">記憶體使用量</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DE" />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="memory"
                        name="記憶體"
                        fill="#B8906F"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    Gemma Default 最省記憶體 (878 MB)
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Quality analysis */}
          <TabsContent value="quality">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid gap-6 lg:grid-cols-2"
            >
              {/* Radar chart */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">
                    Gemma vs Qwen 綜合比較
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#E8E4DE" />
                      <PolarAngleAxis dataKey="subject" fontSize={11} />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        fontSize={10}
                      />
                      <Radar
                        name="Default (Gemma)"
                        dataKey="Default"
                        stroke="#5C6E58"
                        fill="#5C6E58"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Qwen"
                        dataKey="Qwen"
                        stroke="#B8906F"
                        fill="#B8906F"
                        fillOpacity={0.3}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Key findings */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">關鍵發現</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-primary/5 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Badge variant="secondary" className="rounded-md">
                        速度優先
                      </Badge>
                      Gemma Default
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      推論速度最快 (37.89 t/s)，記憶體佔用最低
                      (878MB)，適合資源敏感的行動裝置
                    </p>
                  </div>
                  <div className="rounded-lg bg-accent/10 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Badge variant="secondary" className="rounded-md">
                        品質優先
                      </Badge>
                      Qwen 1.5B
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      BERTScore 最高 (0.912)，但速度慢 45%、記憶體高出 1 倍以上
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Badge variant="outline" className="rounded-md">
                        平衡選擇
                      </Badge>
                      Q8 量化
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      品質接近 Qwen，速度 26.17 t/s，適合需要較高精準度的場景
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* RAG improvement */}
          <TabsContent value="rag">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid gap-6 lg:grid-cols-2"
            >
              {/* RAG improvement chart */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">RAG 介入後改善幅度</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={ragImprovementData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DE" />
                      <XAxis type="number" fontSize={12} unit="%" />
                      <YAxis type="category" dataKey="metric" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar
                        dataKey="Default"
                        name="Default (Gemma)"
                        fill="#5C6E58"
                        radius={[0, 4, 4, 0]}
                      />
                      <Bar
                        dataKey="Qwen"
                        name="Qwen"
                        fill="#B8906F"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    Default 模型的 ROUGE-L 改善幅度高達 +104.91%
                  </p>
                </CardContent>
              </Card>

              {/* RAG insights */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">RAG 效益分析</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <h4 className="mb-2 font-medium text-primary">
                      Default 模型受益最大
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      RAG 介入後 ROUGE-L 分數暴增
                      104%，顯示其極度依賴外部知識來彌補自身幻覺
                    </p>
                  </div>
                  <div className="rounded-lg border border-accent/20 bg-accent/10 p-4">
                    <h4 className="mb-2 font-medium text-accent-foreground">
                      Qwen 邊際效應遞減
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Qwen 本身底子好，RAG 帶來的提升相對有限
                      (+30%)，部分案例甚至出現檢索後拒答
                    </p>
                  </div>
                  <div className="mt-4 rounded-lg bg-muted p-4">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">結論：</span>{" "}
                      若追求極致流暢體驗，Gemma
                      是首選；若追求回答精準度且硬體允許，Qwen 或 Q8
                      量化模型是更好的選擇。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
