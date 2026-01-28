import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  Globe,
} from "lucide-react";
import {
  registrationSchema,
  type RegistrationFormData,
} from "@/lib/register.schema";
import { Link } from "react-router-dom";

export function SchoolRegistration() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const emailValue = watch("email");

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Registration data:", data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
        {/* Background decorative elements */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse"
          style={{ animation: "float 8s ease-in-out infinite reverse" }}
        />

        <div className="relative z-10 max-w-md w-full">
          <div className="bg-card rounded-2xl border border-border p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-3">
              Welcome to EduPay360!
            </h2>
            <p className="text-muted-foreground mb-8">
              Your registration is complete. We've sent a verification email to{" "}
              <strong>{emailValue}</strong>.
            </p>

            <div className="bg-card/50 border border-border/50 rounded-lg p-6 text-left space-y-3 mb-8">
              <p className="text-sm font-semibold text-foreground">
                Next Steps:
              </p>
              <ol className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary min-w-fit">1.</span>
                  <span>Verify your email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary min-w-fit">2.</span>
                  <span>Set up your admin account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary min-w-fit">3.</span>
                  <span>Add staff and students</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary min-w-fit">4.</span>
                  <span>Start your 14-day free trial</span>
                </li>
              </ol>
            </div>

            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white mb-4">
              Check Email
            </Button>

            <button className="w-full text-primary hover:underline font-medium transition-colors text-sm">
              Didn't receive email? Resend
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
        style={{ animation: "float 6s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse"
        style={{ animation: "float 8s ease-in-out infinite reverse" }}
      />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Captivating Design */}
          <div className="hidden lg:flex flex-col items-start space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/40 rounded-lg px-3 py-1.5 backdrop-blur-sm mb-6">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                </span>
                <span className="text-xs font-semibold text-accent">
                  Get Started Today
                </span>
              </div>
              <h1 className="text-5xl font-bold text-foreground mb-4 leading-tight">
                Start Your{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  14-Day Free Trial
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join 500+ schools across Africa already transforming their
                operations with EduPay360. No credit card required.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="space-y-4 w-full">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    No Credit Card
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Start free, upgrade anytime
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Full Access
                  </p>
                  <p className="text-xs text-muted-foreground">
                    All features unlocked for 14 days
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Expert Onboarding
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Dedicated support for your setup
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 w-full pt-4 border-t border-border/30">
              <div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <p className="text-xs text-muted-foreground">Schools</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">50K+</div>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">4.9/5</div>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          {/* Right - Registration Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card rounded-2xl border border-border p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">EP</span>
                  </div>
                  <span className="font-bold text-lg text-foreground">
                    EduPay360
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Register Your School
                </h2>
                <p className="text-sm text-muted-foreground">
                  Setup takes less than 2 minutes
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* School Name */}
                <div>
                  <label
                    htmlFor="schoolName"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    School Name
                  </label>
                  <div className="relative group">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      id="schoolName"
                      placeholder="e.g., St. Mary's Secondary School"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 bg-input text-foreground placeholder:text-muted-foreground ${
                        errors.schoolName
                          ? "border-destructive focus:ring-destructive/30"
                          : "border-border/50 hover:border-border"
                      }`}
                      {...register("schoolName")}
                    />
                  </div>
                  {errors.schoolName && (
                    <p className="text-destructive text-xs mt-1.5">
                      {errors.schoolName.message}
                    </p>
                  )}
                </div>

                {/* Principal Name */}
                <div>
                  <label
                    htmlFor="principalName"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Principal's Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      id="principalName"
                      placeholder="e.g., Dr. Atem Patrick"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 bg-input text-foreground placeholder:text-muted-foreground ${
                        errors.principalName
                          ? "border-destructive focus:ring-destructive/30"
                          : "border-border/50 hover:border-border"
                      }`}
                      {...register("principalName")}
                    />
                  </div>
                  {errors.principalName && (
                    <p className="text-destructive text-xs mt-1.5">
                      {errors.principalName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      id="email"
                      type="email"
                      placeholder="contact@stmarys.cm"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 bg-input text-foreground placeholder:text-muted-foreground ${
                        errors.email
                          ? "border-destructive focus:ring-destructive/30"
                          : "border-border/50 hover:border-border"
                      }`}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      id="phone"
                      placeholder="+237 6XX XXX XXX"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 bg-input text-foreground placeholder:text-muted-foreground ${
                        errors.phone
                          ? "border-destructive focus:ring-destructive/30"
                          : "border-border/50 hover:border-border"
                      }`}
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-destructive text-xs mt-1.5">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    School Address
                  </label>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      id="address"
                      placeholder="Street address and city"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 bg-input text-foreground placeholder:text-muted-foreground ${
                        errors.address
                          ? "border-destructive focus:ring-destructive/30"
                          : "border-border/50 hover:border-border"
                      }`}
                      {...register("address")}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-destructive text-xs mt-1.5">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Country
                  </label>
                  <div className="relative group">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                    <select
                      id="country"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 bg-input text-foreground appearance-none ${
                        errors.country
                          ? "border-destructive focus:ring-destructive/30"
                          : "border-border/50 hover:border-border"
                      }`}
                      {...register("country")}
                    >
                      <option value="">Select a country</option>
                      <option value="cameroon">Cameroon</option>
                      <option value="nigeria">Nigeria</option>
                      <option value="ghana">Ghana</option>
                      <option value="kenya">Kenya</option>
                      <option value="uganda">Uganda</option>
                      <option value="south-africa">South Africa</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {errors.country && (
                    <p className="text-destructive text-xs mt-1.5">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 group mt-6"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Start Free Trial{" "}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Terms */}
              <p className="text-center text-xs text-muted-foreground mt-6">
                By registering, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>

              {/* Sign In Link */}
              <div className="mt-6 pt-6 border-t border-border/30">
                <p className="text-center text-sm text-muted-foreground">
                  Already using EduPay360?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:underline font-semibold"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
