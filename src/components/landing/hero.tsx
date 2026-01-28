import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Hero() {

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5" />

      {/* Animated floating shapes */}
      <div
        className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
        style={{ animation: "float 6s ease-in-out infinite" }}
      />
      <div
        className="absolute top-40 right-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse"
        style={{ animation: "float 8s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"
        style={{ animation: "float 7s ease-in-out infinite" }}
      />

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-7 pt-2 pb-8">

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/40 rounded-full px-4 py-2 mb-8 hover:border-primary/60 transition-colors group">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-sm font-semibold text-primary">
                  New in Africa
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
              Transform Your School Into A{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Digital Learning Hub
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Streamline student management, automate financial operations, and
              unlock real-time insights. EduPay360 empowers African schools to
              focus on what matters most—education. Join 500+ schools already
              experiencing the transformation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 group shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all text-white"
                onClick={() => navigate("/register")}
              >
                Start Free Trial{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 hover:bg-card/90 hover:border-primary/40 bg-transparent backdrop-blur-sm transition-all text-foreground hover:text-primary"
              >
                Schedule Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-4 border-t border-border/50">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-start gap-2 p-3 rounded-lg bg-card/30 border border-border/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-xs text-muted-foreground">
                    No credit card
                  </span>
                </div>
                <div className="flex flex-col items-start gap-2 p-3 rounded-lg bg-card/30 border border-border/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-xs text-muted-foreground">
                    14-day trial
                  </span>
                </div>
                <div className="flex flex-col items-start gap-2 p-3 rounded-lg bg-card/30 border border-border/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-xs text-muted-foreground">
                    Cancel anytime
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Dashboard Mockup */}
          <div
            className={`relative transform transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative">
              {/* Decorative shapes */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />

              {/* Dashboard Mockup */}
              <div className="relative z-10 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-secondary to-accent" />

                {/* Header */}
                <div className="bg-linear-to-r from-primary/15 to-secondary/15 border-b border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-linear-to-br from-primary to-secondary">
                        <span className="text-xs font-bold text-white">EP</span>
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        Dashboard
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <div className="w-2 h-2 bg-accent rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="group relative bg-primary/10 rounded-lg p-3 border border-primary/30 hover:bg-primary/15 hover:border-primary/50 transition-all cursor-default overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs text-muted-foreground">
                            Students
                          </div>
                          <span className="text-xs font-bold text-accent bg-accent/20 px-1.5 py-0.5 rounded">
                            +12%
                          </span>
                        </div>
                        <div className="text-lg font-bold text-primary">
                          15.0K
                        </div>
                      </div>
                    </div>
                    <div className="group relative bg-secondary/10 rounded-lg p-3 border border-secondary/30 hover:bg-secondary/15 hover:border-secondary/50 transition-all cursor-default overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs text-muted-foreground">
                            Teachers
                          </div>
                          <span className="text-xs font-bold text-accent bg-accent/20 px-1.5 py-0.5 rounded">
                            +8%
                          </span>
                        </div>
                        <div className="text-lg font-bold text-secondary">
                          2.0K
                        </div>
                      </div>
                    </div>
                    <div className="group relative bg-accent/10 rounded-lg p-3 border border-accent/30 hover:bg-accent/15 hover:border-accent/50 transition-all cursor-default overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs text-muted-foreground">
                            Revenue
                          </div>
                          <span className="text-xs font-bold text-accent bg-accent/20 px-1.5 py-0.5 rounded">
                            +24%
                          </span>
                        </div>
                        <div className="text-lg font-bold text-accent">
                          125M
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div>
                    <div className="text-xs text-muted-foreground mb-3">
                      Revenue Trend
                    </div>
                    <svg
                      className="w-full h-24"
                      viewBox="0 0 300 80"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="chartGrad"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            style={{
                              stopColor: "var(--primary)",
                              stopOpacity: 0.3,
                            }}
                          />
                          <stop
                            offset="100%"
                            style={{
                              stopColor: "var(--primary)",
                              stopOpacity: 0,
                            }}
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 10 60 Q 40 20 70 35 T 130 15 T 190 40 T 250 25 T 290 45"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        className="text-primary"
                      />
                    </svg>
                  </div>

                  {/* Action items */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs p-2 bg-muted rounded border border-border">
                      <span className="text-foreground font-medium">
                        New Enrollments
                      </span>
                      <span className="text-accent font-bold">+24</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 bg-muted rounded border border-border">
                      <span className="text-foreground font-medium">
                        Pending Payments
                      </span>
                      <span className="text-primary font-bold">18</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-xl backdrop-blur-sm z-20 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      14-Day Free Trial
                    </p>
                    <p className="text-xs text-muted-foreground">
                      No card required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
