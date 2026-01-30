
import { useLocation, Navigate, useSearchParams } from "react-router-dom";
import { VerificationFlow } from "@/components/auth/verification-flow";

export default function VerifyPage() {
  const location = useLocation();
  const state = location.state as { email?: string } | null;
  const [searchParams] = useSearchParams();

  // Prefer state, fallback to query param
  const email = state?.email || searchParams.get("email") || "";
  const step = searchParams.get("step") as "otp" | "password" | null;

  if (!email) {
    // If no email, redirect to registration or show error
    return <Navigate to="/register" replace />;
  }

  return <VerificationFlow email={email} initialStep={step || undefined} />;
}
