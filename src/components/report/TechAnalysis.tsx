"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Languages,
  Database,
  Cpu,
  RefreshCw,
} from "lucide-react";

const coverageComparison = [
  { language: "英文", coverage: 90, color: "bg-primary" },
  { language: "簡體中文", coverage: 65, color: "bg-accent" },
  { language: "繁體中文", coverage: 25, color: "bg-destructive" },
];

const characterMappings = [
  { simplified: "后", traditional: "后、後", meaning: "皇帝之妻、身後方位" },
  { simplified: "表", traditional: "表、錶", meaning: "表格、手錶" },
  { simplified: "奸", traditional: "奸、姦", meaning: "奸詐、強姦" },
];

export function TechAnalysis() {
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
            技術深度分析
          </h2>
          <p className="text-muted-foreground">
            為什麼 SLM 在中文生成表現不佳？
          </p>
        </motion.div>

        <Tabs defaultValue="tokenization" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tokenization" className="text-xs sm:text-sm">
              <Languages className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">分詞缺陷</span>
              <span className="sm:hidden">分詞</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="text-xs sm:text-sm">
              <Database className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">數據偏差</span>
              <span className="sm:hidden">數據</span>
            </TabsTrigger>
            <TabsTrigger value="capacity" className="text-xs sm:text-sm">
              <Cpu className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">容量限制</span>
              <span className="sm:hidden">容量</span>
            </TabsTrigger>
            <TabsTrigger value="looping" className="text-xs sm:text-sm">
              <RefreshCw className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">迴圈問題</span>
              <span className="sm:hidden">迴圈</span>
            </TabsTrigger>
          </TabsList>

          {/* Tokenization issues */}
          <TabsContent value="tokenization">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-accent" />
                    分詞（Tokenization）根本缺陷
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Gemma 1B 使用 SentencePiece 分詞器，基於字節對編碼（BPE）演算法。
                    這套方案在英文上表現優異，但應用於中文時產生系統性缺陷。
                  </p>

                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="mb-3 font-medium">核心問題</h4>
                    <p className="text-sm text-muted-foreground">
                      中文沒有自然空格分隔，BPE 演算法會基於頻率錯誤地合併字符。
                      例如將非詞組「的事」誤合併為單一 token，而應該合併的「事物」反而被分割。
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-3 font-medium">繁簡轉換的一對多映射問題</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="pb-2 text-left font-medium">簡體</th>
                            <th className="pb-2 text-left font-medium">繁體</th>
                            <th className="pb-2 text-left font-medium">含義差異</th>
                          </tr>
                        </thead>
                        <tbody>
                          {characterMappings.map((item, index) => (
                            <tr key={index} className="border-b border-border/50">
                              <td className="py-2 font-mono">{item.simplified}</td>
                              <td className="py-2 font-mono text-primary">
                                {item.traditional}
                              </td>
                              <td className="py-2 text-muted-foreground">
                                {item.meaning}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Data imbalance */}
          <TabsContent value="data">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-accent" />
                    訓練數據不均衡與語言偏差
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    儘管 Gemma 宣傳支持 140+ 語言，但實際訓練數據分佈高度不均。
                  </p>

                  <div>
                    <h4 className="mb-4 font-medium">語言覆蓋率比較</h4>
                    <div className="space-y-4">
                      {coverageComparison.map((item) => (
                        <div key={item.language}>
                          <div className="mb-1 flex justify-between text-sm">
                            <span>{item.language}</span>
                            <span className="text-muted-foreground">
                              ~{item.coverage}%
                            </span>
                          </div>
                          <Progress value={item.coverage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg bg-destructive/10 p-4">
                    <h4 className="mb-2 font-medium text-destructive">
                      繁體中文困境
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      繁體中文數據佔比 &lt; 5%，且多為簡繁轉換版本（品質差）。
                      語言遷移研究表明，遠距離遷移（簡→繁）性能衰減 40-60%。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Capacity limits */}
          <TabsContent value="capacity">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-accent" />
                    模型容量瓶頸
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    1B 參數的 SLM 面臨根本性的容量制約。推理能力不僅由模型大小決定，
                    對於 1B 這樣的極限模型，即使優化訓練方法也存在絕對上限。
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="mb-2 font-medium">消歧能力比較</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>1B 模型</span>
                          <Badge variant="secondary">55-65%</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>7B 模型</span>
                          <Badge variant="secondary">75-85%</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>70B+ 模型</span>
                          <Badge variant="default">&gt;90%</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="mb-2 font-medium">注意力機制限制</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Gemma 1B: 12-16 層自注意力</li>
                        <li>• 每層注意力頭數有限（8-12 個）</li>
                        <li>• 消歧需至少 4-6 層協同注意力</li>
                        <li>• 已佔用 50% 容量</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">結論：</span>{" "}
                      微調是「在現有參數空間內調整」，無法擴展參數容量。
                      1B 的參數瓶頸無法透過微調克服。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Looping issues */}
          <TabsContent value="looping">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-accent" />
                    生成過程中的 Looping 機制
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Gemma 1B 中文生成中頻繁出現重複迴圈（looping），這是 SLM 訓練中的經典問題，
                    規模越小越明顯。
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="mb-2 flex items-center gap-2 font-medium">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                          1
                        </span>
                        過度自注意
                      </h4>
                      <p className="pl-8 text-sm text-muted-foreground">
                        殘差連接導致特定 token（如「的」、「了」）梯度過度強調，使其過度擬合自身
                      </p>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="mb-2 flex items-center gap-2 font-medium">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                          2
                        </span>
                        分佈崩潰
                      </h4>
                      <p className="pl-8 text-sm text-muted-foreground">
                        當溫度過低或 min_p 過高時，模型預測分佈崩到某個 token，
                        下一步仍會選中該 token
                      </p>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="mb-2 flex items-center gap-2 font-medium">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                          3
                        </span>
                        訓練數據不足
                      </h4>
                      <p className="pl-8 text-sm text-muted-foreground">
                        中文訓練樣本數量有限，模型對某些常見詞序列記憶過度，
                        遺忘了多樣化的延續方式
                      </p>
                    </div>
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
