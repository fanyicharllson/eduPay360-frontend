import { createBrowserRouter, Outlet } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import DashboardHome from "./pages/dashboard";
import Protected from "./pages/dashboard/protected";
import { DashboardLayout } from "@/components/dashboard/layout-wrapper";
import StudentsPage from "./pages/dashboard/students";
import ClassesPage from "./pages/dashboard/classes";
import TeachersPage from "./pages/dashboard/teachers";
import { Navigation } from "@/components/landing/navigation";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { AnalyticsSection } from "@/components/landing/analytics-section";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { FloatingButtons } from "@/components/landing/floating-buttons";
import { PaymentFeatures } from "./components/landing/payment-features";
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
    path: "/dashboard",
    element: (
      <Protected>
        <DashboardLayout>
          {/* The Outlet will render the matched child route element */}
          <Outlet />
        </DashboardLayout>
      </Protected>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "classes",
        element: <ClassesPage />,
      },
      {
        path: "teachers",
        element: <TeachersPage />,
      },
      // Add more dashboard subroutes here as needed
    ],
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
    path: "/verify",
    element: <VerifyPage />,
  },
  {
    path: "*",
    element: <Landing />,
  },
]);
