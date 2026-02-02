import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const reports = [
  {
    slug: "01-30-slm-progress-report",
    title: "SLM 進度報告",
    date: "2025 年 1 月 30 日",
    description: "Small Language Model 開發進度與里程碑",
    tags: ["SLM", "AI/ML"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-16">
          <h1 className="heading-bar text-3xl font-semibold tracking-tight md:text-4xl">
            GoMore 進度報告
          </h1>
          <p className="mt-4 text-muted-foreground">
            互動式進度報告與專案更新
          </p>
        </header>

        {/* Reports List */}
        <main>
          <h2 className="heading-bar mb-8 text-lg font-medium">所有報告</h2>
          <div className="space-y-4">
            {reports.map((report) => (
              <Link key={report.slug} href={`/${report.slug}`}>
                <Card className="shadow-soft hover-lift border-0 bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-medium">
                            {report.title}
                          </CardTitle>
                          <CardDescription className="mt-0.5 text-sm">
                            {report.date}
                          </CardDescription>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">
                      {report.description}
                    </p>
                    <div className="mt-4 flex gap-2">
                      {report.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="rounded-md font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {reports.length === 0 && (
            <Card className="shadow-soft border-0">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <FileText className="h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-muted-foreground">
                  尚無報告，建立你的第一份報告吧！
                </p>
              </CardContent>
            </Card>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-20 border-t border-border/50 pt-8">
          <p className="text-sm text-muted-foreground/70">
            GoMore Progress Report Portal
          </p>
        </footer>
      </div>
    </div>
  );
}
