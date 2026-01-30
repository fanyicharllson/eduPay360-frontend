import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Support", href: "#support" },
  ];

  // Fetch onboarding status (only if user is likely logged in)
  const { data: onboarding, isLoading: onboardingLoading } = useOnboardingStatus({ enabled: true });

  // Determine CTA label and action
  let ctaLabel = "Get Started";
  let ctaAction = () => navigate("/register");
  if (onboarding && !onboarding.completed) {
    if (!onboarding.emailVerified) {
      ctaLabel = "Verify Email";
      ctaAction = () => navigate(`/verify?email=${encodeURIComponent(onboarding.email || "")}`);
    } else if (!onboarding.passwordSet) {
      ctaLabel = "Set Password";
      ctaAction = () => navigate(`/verify?email=${encodeURIComponent(onboarding.email || "")}&step=password`);
    } else {
      ctaLabel = "Continue Onboarding";
      ctaAction = () => navigate("/dashboard");
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                EP
              </span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">
              EduPay360
            </span>
          </div>

          {/* Desktop Navigation - Right */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-end">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors px-4 py-2 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}

            {/* Divider */}
            <div className="h-6 w-px bg-border mx-2" />

            {/* Right Section */}
            <ThemeToggle />

            <Button
              className="bg-primary text-white hover:bg-primary/90 mr-2"
              onClick={ctaAction}
              disabled={onboardingLoading}
            >
              {ctaLabel}
            </Button>
            <Button
              className="bg-primary hover:bg-primary/50 text-white"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </div>

          {/* Mobile Menu - Right */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-foreground hover:text-primary transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2 flex gap-2">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold mb-2"
                onClick={ctaAction}
                disabled={onboardingLoading}
              >
                {ctaLabel}
              </Button>
              <Button
                className="w-full bg-muted hover:bg-primary/10 text-primary-foreground"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
