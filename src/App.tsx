import { useState } from "react";
import { Navigation } from "@/components/landing/navigation";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { AnalyticsSection } from "@/components/landing/analytics-section";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { FloatingButtons } from "@/components/landing/floating-buttons";
import { PaymentFeatures } from "./components/landing/payment-features";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  return (
    <main className={isDark ? "dark" : ""}>
      <div className="bg-background text-foreground transition-colors duration-200">
        <Navigation isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
        <Hero />
        <Features />
        <PaymentFeatures />
        <AnalyticsSection />
        <Pricing />
        <CTA />
        <Footer />
        <FloatingButtons />
      </div>
    </main>
  );
}
