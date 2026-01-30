import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import { Navigation } from "@/components/landing/navigation";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { AnalyticsSection } from "@/components/landing/analytics-section";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { FloatingButtons } from "@/components/landing/floating-buttons";
import { PaymentFeatures } from "./components/landing/payment-features";
import Onboarding from "./pages/onboarding";
import VerifyPage from "./pages/verify";

function Landing() {
  return (
    <main>
      <div className="bg-background text-foreground transition-colors duration-200">
        <Navigation />
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



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/verify",
    element: <VerifyPage />,
  },
  {
    path: "*",
    element: <Landing />,
  },
]);
