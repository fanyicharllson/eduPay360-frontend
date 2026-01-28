import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export function Navigation({ isDark, onThemeToggle }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Support", href: "#support" },
  ];

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
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="text-foreground"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            <Button className="bg-primary text-white hover:bg-primary/90 mr-2" asChild>
              <a href="#get-started">Get Started</a>
            </Button>
            <Button className="bg-primary hover:bg-primary/50 text-white">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu - Right */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="text-foreground"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

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
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold mb-2" asChild>
                <a href="#get-started">Get Started</a>
              </Button>
              <Button className="w-full bg-muted hover:bg-primary/10 text-primary-foreground">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
