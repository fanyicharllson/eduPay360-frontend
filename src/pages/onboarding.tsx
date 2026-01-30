
import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useOnboardingStatus();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin mb-2" />
        <p>Checking your onboarding status...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-destructive mb-2">{error.message}</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  if (!data) return null;

  // Determine next step
  let nextStep = null;
  let message = "";
  if (!data.emailVerified) {
    nextStep = () => navigate("/verify?email=" + encodeURIComponent(data.email || ""));
    message = `You need to verify your email (${data.email}) to continue registration.`;
  } else if (!data.passwordSet) {
    nextStep = () => navigate("/set-password");
    message = "You need to set your password to complete registration.";
  } else if (!data.completed) {
    nextStep = () => navigate("/dashboard");
    message = "Almost done! Redirecting you to your dashboard.";
  } else {
    nextStep = () => navigate("/dashboard");
    message = "Onboarding complete! Redirecting to dashboard...";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h2 className="text-xl font-semibold">Resume Onboarding</h2>
      <p className="text-center text-muted-foreground max-w-md">{message}</p>
      <Button onClick={nextStep} className="mt-2">Continue</Button>
    </div>
  );
};

export default Onboarding;
