import { Button } from "@/components/ui/button";
import { plans } from "@/lib/pricing-plans";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export function Pricing() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="pricing"
      className="py-20 bg-linear-to-b from-background via-background to-card/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your school. All plans include 14 days
            free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group rounded-2xl border transition-all duration-500 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${
                plan.highlighted
                  ? "border-primary bg-linear-to-br from-primary/10 to-secondary/10 lg:scale-105 shadow-xl"
                  : "border-border bg-card/50 hover:border-primary/50 hover:shadow-lg"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Featured badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-linear-to-r from-primary to-secondary text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  {plan.description}
                </p>

                {/* Pricing */}
                <div className="mb-6">
                  {plan.price !== "Custom" ? (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-foreground">
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground">FCFA/</span>
                        <span className="text-muted-foreground">
                          {plan.period}
                        </span>
                      </div>
                      <p className="text-sm text-accent font-semibold mt-2">
                        ✓ {plan.trialDays} days free trial
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl font-bold text-foreground mb-2">
                        {plan.price}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get a personalized quote
                      </p>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full mb-8 transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-linear-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 text-white"
                      : "border border-border hover:bg-primary/10 text-foreground"
                  }`}
                >
                  {plan.price === "Custom"
                    ? "Contact Sales"
                    : "Start Free Trial"}
                </Button>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex gap-3 items-start">
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom accent line */}
              {plan.highlighted && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-secondary to-accent rounded-b-2xl" />
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-card/50 rounded-xl border border-border p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Need help choosing the right plan? Our team is here to help.
          </p>
          <Button
            variant="outline"
            className="border-border hover:bg-muted bg-transparent"
          >
            Schedule a Demo
          </Button>
        </div>

        {/* FAQ-like section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-2xl font-bold text-primary mb-2">14 days</div>
            <p className="text-muted-foreground text-sm">
              Free trial for all plans, no card needed
            </p>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary mb-2">100%</div>
            <p className="text-muted-foreground text-sm">
              Money-back guarantee if not satisfied
            </p>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent mb-2">Cancel</div>
            <p className="text-muted-foreground text-sm">
              Anytime, no questions asked
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
