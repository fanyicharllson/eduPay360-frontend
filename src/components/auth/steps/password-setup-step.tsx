import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Lock, Eye, EyeOff, Loader2, Check } from "lucide-react";
import { useSetPassword } from "@/hooks/useSetPassword";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

interface PasswordSetupStepProps {
  email: string;
  onSuccess: () => void;
}

export function PasswordSetupStep({
  email,
  onSuccess,
}: PasswordSetupStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const setPasswordMutation = useSetPassword();

 

  const onSubmit = (data: PasswordFormData) => {
    setPasswordMutation.mutate(
      {
        password: data.password,
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            toast.success("Password set successfully!");
            setTimeout(() => onSuccess(), 1000);
          } else {
            toast.error(response.message || "Failed to set password");
          }
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            (typeof error === "string" ? error : "Failed to set password. Please try again.");
          toast.error(message);
        },
      }
    );
  };



  const password = form.watch("password");
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 gap-0">
      {/* Left Side - Design */}
      <PasswordLeftDesign />

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-sm">
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                3
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Setup Password
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Step 3 of 3 - Create a secure password to complete registration
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 w-full bg-muted rounded-full h-1.5 overflow-hidden">
            <div className="h-full w-full bg-primary transition-all duration-300" />
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter a strong password"
                          className="pl-10 pr-10"
                          disabled={setPasswordMutation.isPending}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Requirements */}
              <div className="p-4 rounded-lg bg-card/50 border border-border/50 space-y-2">
                <p className="text-xs font-medium text-foreground">
                  Password must contain:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-xs transition-colors ${
                        hasMinLength
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {hasMinLength && "✓"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      At least 8 characters
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-xs transition-colors ${
                        hasUpperCase
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {hasUpperCase && "✓"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      One uppercase letter
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-xs transition-colors ${
                        hasNumber
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {hasNumber && "✓"}
                    </div>
                    <p className="text-xs text-muted-foreground">One number</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-xs transition-colors ${
                        hasSpecialChar
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {hasSpecialChar && "✓"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      One special character (!@#$%^&*)
                    </p>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter your password"
                          className="pl-10 pr-10"
                          disabled={setPasswordMutation.isPending}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
                disabled={setPasswordMutation.isPending}
              >
                {setPasswordMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Completing Registration...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <Check className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Help Text */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            After completing registration, you'll be redirected to your
            dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

function PasswordLeftDesign() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-primary/10 via-secondary/5 to-background p-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/15 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-md text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
            <Lock className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Secure Your Account
          </h2>
          <p className="text-lg text-muted-foreground">
            Create a strong password to protect your school data
          </p>
        </div>

        {/* Security Features */}
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
              <p className="font-semibold text-foreground">
                Military Grade Security
              </p>
              <p className="text-sm text-muted-foreground">
                256-bit encryption for all data
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
                Two-Factor Authentication
              </p>
              <p className="text-sm text-muted-foreground">
                Optional 2FA for extra protection
              </p>
            </div>
          </div>
        </div>

        {/* Completion Progress */}
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
              ✓
            </div>
            <p className="text-left text-sm text-foreground">
              Email Verification
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              3
            </div>
            <p className="text-left text-sm font-medium text-foreground">
              Password Setup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
