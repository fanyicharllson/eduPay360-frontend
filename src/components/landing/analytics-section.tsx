import { BarChart3, LineChart, PieChart, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function AnalyticsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    });
    const element = document.getElementById("analytics-section");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description:
        "Monitor student and teacher performance metrics in real-time",
      color: "from-primary to-primary/50",
    },
    {
      icon: LineChart,
      title: "Trend Analysis",
      description:
        "Identify patterns and trends over time to improve decisions",
      color: "from-secondary to-secondary/50",
    },
    {
      icon: PieChart,
      title: "Financial Reports",
      description:
        "Detailed breakdown of revenue, expenses, and financial health",
      color: "from-accent to-accent/50",
    },
    {
      icon: Download,
      title: "Export & Share",
      description: "Download reports in PDF and Excel formats for stakeholders",
      color: "from-primary to-accent",
    },
  ];

  return (
    <section
      id="analytics-section"
      className="py-20 bg-linear-to-b from-card/20 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Data-Driven Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Make informed decisions with comprehensive analytics and
            customizable reports. Track performance metrics that matter to your
            school.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-all duration-500 transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-lg bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-primary to-secondary w-0 group-hover:w-full transition-all duration-500 rounded-b-xl" />
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Explore Analytics Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}
