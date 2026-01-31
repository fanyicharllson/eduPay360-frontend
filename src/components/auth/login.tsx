import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  Lock,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import type { LoginFormData } from "@/lib/login.schema";
import { loginSchema } from "@/lib/login.schema";
import { Link } from "react-router-dom";
import { toast } from "@/lib/toast";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          // Set flag for Hero onboarding fetch
          localStorage.setItem("isAuthenticated", "true");
          toast.success("Login successful!", { description: "Welcome back" });
          reset();
          navigate("/dashboard");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              "Login failed. Please check your credentials.",
          );
        },
      },
    );
  };

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

      <div className="relative z-10 w-full max-w-6xl">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-primary hover:underline font-medium text-sm"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Go Back
          </Link>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Captivating Design */}
          <div className="hidden lg:flex flex-col items-start space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 rounded-full px-4 py-2 mb-6 group">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-sm font-semibold text-primary">
                  Secure Access
                </span>
              </div>
              <h1 className="text-5xl font-bold text-foreground mb-4 leading-tight">
                Welcome to Your{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  School Dashboard
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Access real-time analytics, manage students, process payments,
                and streamline school operations all in one place.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Enterprise-Grade Security
                  </p>
                  <p className="text-xs text-muted-foreground">
                    256-bit encryption & two-factor authentication
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Real-Time Data Sync
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Instant updates across all devices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    24/7 Support
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Dedicated support team for your school
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Login Form */}
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
                  Sign In
                </h2>
                <p className="text-sm text-muted-foreground">
                  Access your school dashboard with your credentials
                </p>
              </div>

              {/* Divider */}
              {/* <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-card text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div> */}

              {/* Email & Password Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                      placeholder="school@edupay360.com"
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

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      className={`w-full pl-10 pr-10 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 bg-input text-foreground placeholder:text-muted-foreground ${
                        errors.password
                          ? "border-destructive focus:ring-destructive/30"
                          : "border-border/50 hover:border-border"
                      }`}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-xs mt-1.5">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between pt-2">
                  <a
                    href="#"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 group mt-6"
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In{" "}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Sign Up Link */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:underline font-semibold"
                >
                  Register your school
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
