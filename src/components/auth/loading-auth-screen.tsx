import { useEffect, useState } from "react";

export function LoadingAuthScreen() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center z-50">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animation: "float 8s ease-in-out infinite" }}
        />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Logo Animation */}
        <div className="mb-8 animate-bounce">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/30">
            <span className="text-white font-bold text-2xl">EP</span>
          </div>
        </div>

        {/* Loading spinner */}
        <div className="relative w-16 h-16 mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />

          {/* Animated outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin" />

          {/* Inner ring */}
          <div className="absolute inset-2 rounded-full border-2 border-secondary/20" />

          {/* Animated inner ring (reverse) */}
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-secondary border-l-secondary"
            style={{ animation: "spin 2s linear infinite reverse" }}
          />
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Preparing Your Dashboard
          </h2>
          <p className="text-muted-foreground">
            Verifying your credentials{dots}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-48 h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
            style={{
              animation: "slideInfinite 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Loading tips */}
        <div className="mt-12 max-w-sm space-y-2 text-center">
          <p className="text-xs text-muted-foreground">
            This usually takes a few seconds...
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
        @keyframes slideInfinite {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
