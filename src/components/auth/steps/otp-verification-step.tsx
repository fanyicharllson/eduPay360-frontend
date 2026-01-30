import React from "react";

import { useState, useRef, useEffect } from "react";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, ShieldCheck } from "lucide-react";
import { useVerifyOtp, useResendOtp } from "@/hooks/useOtp";

interface OTPVerificationStepProps {
  email: string;
  onSuccess: (email: string) => void;
}

export function OTPVerificationStep({
  email,
  onSuccess,
}: OTPVerificationStepProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const verifyMutation = useVerifyOtp((verifiedEmail: string) => {
    toast.success("Email verified!", { description: "You can now set your password."});
    onSuccess(verifiedEmail);
  });

  const resendMutation = useResendOtp();

  // Timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Auto-verify when all digits are entered
  useEffect(() => {
    const otpCode = otp.join("");
    if (otpCode.length === 6 && !verifyMutation.isPending) {
      setVerifyError(null);
      verifyMutation.mutate(
        { email, code: otpCode }, // <-- use 'code' instead of 'otp'
        {
          onSuccess: (data: any) => {
            if (!data.success) {
              setVerifyError(data.message || "OTP verification failed");
              toast.error(data.message || "OTP verification failed", { position: "top-right" });
            } else {
              setVerifyError(null);
            }
          },
          onError: (error: any) => {
            const message =
              error?.response?.data?.message ||
              (typeof error === "string" ? error : "Verification failed. Please try again.");
            setVerifyError(message);
            toast.error(message, { position: "top-right" });
          },
        }
      );
    } else if (otpCode.length < 6) {
      setVerifyError(null);
    }
  }, [otp]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 gap-0">
      {/* Left Side - Design */}
      <OTPLeftDesign />

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-sm">
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                2
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Email Verification
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Step 2 of 3 - Verify your email address
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 w-full bg-muted rounded-full h-1.5 overflow-hidden">
            <div className="h-full w-2/3 bg-primary transition-all duration-300" />
          </div>

          {/* Email Display */}
          <div className="mb-6 p-4 rounded-lg bg-card border border-border/50 flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">
                Verification code sent to
              </p>
              <p className="font-medium text-foreground">{email}</p>
            </div>
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-foreground">
              Enter 6-digit code
            </label>
            <div className="flex gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={verifyMutation.isPending}
                  className="w-full h-12 text-center text-xl font-semibold bg-card border-border focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="0"
                />
              ))}
            </div>
          </div>

          {/* Auto-verification indicator or error */}
          {otp.join("").length === 6 && (
            verifyMutation.isPending && !verifyError ? (
              <div className="mb-6 p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <p className="text-sm text-primary font-medium">
                  Verifying code...
                </p>
              </div>
            ) : verifyError ? (
              <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-destructive shrink-0" />
                <p className="text-sm text-destructive font-medium">
                  {verifyError}
                </p>
              </div>
            ) : null
          )}

          {/* Resend Section */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              {resendTimer > 0
                ? `Resend code in ${resendTimer}s`
                : "Didn't receive the code?"}
            </p>
            {resendTimer === 0 && (
              <Button
                type="button"
                variant="outline"
                className="w-full border border-border/50 bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                disabled={resendMutation.isPending}
                onClick={() => {
                  resendMutation.mutate(
                    { email },
                    {
                      onSuccess: (data) => {
                        if (data.success) {
                          toast.success("OTP sent to your email", { description: "Check your inbox for the new code.", position: "top-right" });
                          setResendTimer(60);
                        } else {
                          toast.error(data.message || "Failed to resend OTP", { position: "top-right" });
                        }
                      },
                      onError: (error: any) => {
                        const message =
                          error?.response?.data?.message ||
                          (typeof error === "string" ? error : "Failed to resend OTP. Please try again.");
                        toast.error(message, { position: "top-right" });
                      },
                    }
                  );
                }}
              >
                {resendMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend Code"
                )}
              </Button>
            )}
          </div>

          {/* Help Text */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            Once verified, you'll set up your password to complete registration
          </p>
        </div>
      </div>
    </div>
  );
}

function OTPLeftDesign() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center bg-linear-to-br from-primary/10 via-secondary/5 to-background p-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/15 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-md text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 border border-primary/30">
            <Mail className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Verify Your Email
          </h2>
          <p className="text-lg text-muted-foreground">
            We've sent a 6-digit verification code to your email
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-card/50 border border-border/50 rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 p-1.5 rounded-lg bg-accent/20">
              <svg
                className="w-4 h-4 text-accent"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Secure Process</p>
              <p className="text-sm text-muted-foreground">
                Your code expires in 15 minutes
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 p-1.5 rounded-lg bg-accent/20">
              <svg
                className="w-4 h-4 text-accent"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Auto-Verify</p>
              <p className="text-sm text-muted-foreground">
                Code verifies automatically when entered
              </p>
            </div>
          </div>
        </div>

        {/* Step Progress */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <p className="text-left text-sm text-foreground">
              School Registration
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              2
            </div>
            <p className="text-left text-sm font-medium text-foreground">
              Email Verification
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-border text-foreground flex items-center justify-center text-sm font-bold">
              3
            </div>
            <p className="text-left text-sm text-muted-foreground">
              Password Setup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
