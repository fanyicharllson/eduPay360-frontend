export function StudentManagementUI() {
  return (
    <div className="relative h-80 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl border border-border p-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-3xl opacity-50" />

      {/* Main content area */}
      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Student Profiles
          </h3>
          <p className="text-xs text-muted-foreground">
            Quick access to student records
          </p>
        </div>

        {/* Student list mockup */}
        <div className="space-y-3">
          {[
            { name: "Sarah Johnson", status: "95%", color: "bg-primary" },
            { name: "Michael Chen", status: "88%", color: "bg-secondary" },
            { name: "Amara Okafor", status: "92%", color: "bg-accent" },
          ].map((student, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-card/50 rounded-lg p-3 border border-border/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`w-8 h-8 ${student.color} rounded-full opacity-30`}
                />
                <div>
                  <div className="text-xs font-medium text-foreground">
                    {student.name}
                  </div>
                  <div className="text-xs text-muted-foreground">Class A</div>
                </div>
              </div>
              <div className="text-xs font-bold text-primary">
                {student.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute top-4 right-4 bg-accent/20 border border-accent/30 rounded-lg px-3 py-1 backdrop-blur-sm">
        <div className="text-xs font-semibold text-accent">Active</div>
      </div>
    </div>
  );
}

export function FinanceManagementUI() {
  return (
    <div className="relative h-80 bg-linear-to-br from-accent/5 via-transparent to-primary/5 rounded-2xl border border-border p-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Payment Overview
          </h3>
          <p className="text-xs text-muted-foreground">
            Monthly revenue breakdown
          </p>
        </div>

        {/* Revenue bars */}
        <div className="space-y-3 mb-6">
          {[
            { label: "Tuition", value: 85, color: "bg-primary" },
            { label: "Activities", value: 60, color: "bg-secondary" },
            { label: "Other", value: 45, color: "bg-accent" },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground">
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.value}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Total box */}
        <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
          <div className="text-xs text-muted-foreground">Total Revenue</div>
          <div className="text-2xl font-bold text-primary">2.5M FCFA</div>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsUI() {
  return (
    <div className="relative h-80 bg-linear-to-br from-secondary/5 via-transparent to-accent/5 rounded-2xl border border-border p-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/20 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Performance Metrics
          </h3>
          <p className="text-xs text-muted-foreground">
            Key analytics at a glance
          </p>
        </div>

        {/* Chart visualization */}
        <svg
          className="w-full h-32 mb-4"
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradArea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "var(--primary)", stopOpacity: 0.2 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "var(--primary)", stopOpacity: 0 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M 0 70 Q 40 30 80 50 T 160 20 T 240 45 T 300 35 L 300 100 L 0 100 Z"
            fill="url(#gradArea)"
          />
          <path
            d="M 0 70 Q 40 30 80 50 T 160 20 T 240 45 T 300 35"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            className="text-primary"
          />
        </svg>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-card/50 rounded-lg p-3 border border-border/50">
            <div className="text-xs text-muted-foreground">Avg. Score</div>
            <div className="text-lg font-bold text-primary">87.5%</div>
          </div>
          <div className="bg-card/50 rounded-lg p-3 border border-border/50">
            <div className="text-xs text-muted-foreground">Enrollment</div>
            <div className="text-lg font-bold text-secondary">15K+</div>
          </div>
        </div>
      </div>
    </div>
  );
}
