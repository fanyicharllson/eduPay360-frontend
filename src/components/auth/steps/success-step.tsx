import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SuccessStep({email}: {email: string}) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/onboarding");
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [navigate]);

  const handleGoToDashboard = () => {
    setIsRedirecting(true);
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 gap-0">
      {/* Left Side - Design */}
      <SuccessLeftDesign />

      {/* Right Side - Success Content */}
      <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-sm text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/30 rounded-full blur-2xl animate-pulse" />
              <div className="relative p-6 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30">
                <CheckCircle2 className="w-16 h-16 text-accent animate-bounce" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground">
              Registration Complete!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your school account has been successfully set up. Welcome to
              EduPay360!
            </p>
          </div>

          {/* Key Points */}
          <div className="space-y-3 p-6 rounded-lg bg-card/50 border border-border/50">
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
                <p className="font-semibold text-foreground">
                  14-Day Free Trial Active
                </p>
                <p className="text-sm text-muted-foreground">
                  Full access to all features
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
                <p className="font-semibold text-foreground">
                  Instant Dashboard Access
                </p>
                <p className="text-sm text-muted-foreground">
                  Start managing your school now
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
                <p className="font-semibold text-foreground">
                  24/7 Support Ready
                </p>
                <p className="text-sm text-muted-foreground">
                  Our team is here to help
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleGoToDashboard}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
            disabled={isRedirecting}
          >
            {isRedirecting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          {/* Redirect Notice */}
          <p className="text-sm text-muted-foreground">
            Redirecting to dashboard in a few seconds...
          </p>

          {/* Quick Links */}
          <div className="space-y-2 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">Quick Links:</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" size="sm" className="text-xs">
                View Documentation
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessLeftDesign() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-primary/10 via-secondary/5 to-background p-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-60 h-60 bg-accent/15 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-md text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/40 rounded-full blur-3xl animate-pulse" />
            <div className="relative p-6 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/40">
              <CheckCircle2 className="w-20 h-20 text-accent" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-foreground">
            You're All Set!
          </h2>
          <p className="text-lg text-muted-foreground">
            Your EduPay360 account is ready to transform your school management
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card/50 border border-border/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary mb-1">14</div>
            <p className="text-xs text-muted-foreground">Days Free Trial</p>
          </div>
          <div className="bg-card/50 border border-border/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-secondary mb-1">100%</div>
            <p className="text-xs text-muted-foreground">
              Access to All Features
            </p>
          </div>
          <div className="bg-card/50 border border-border/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-accent mb-1">24/7</div>
            <p className="text-xs text-muted-foreground">Dedicated Support</p>
          </div>
          <div className="bg-card/50 border border-border/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary mb-1">0%</div>
            <p className="text-xs text-muted-foreground">Setup Fees</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 space-y-3">
          <h3 className="font-semibold text-foreground">What's Next?</h3>
          <ol className="text-left space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">1.</span>
              <span>Complete your school profile</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">2.</span>
              <span>Add your first users and staff</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">3.</span>
              <span>Configure payment settings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">4.</span>
              <span>Import student data</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
