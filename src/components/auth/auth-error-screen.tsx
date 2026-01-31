import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ErrorAuthScreenProps {
  errorMessage?: string;
  errorCode?: number;
  onRetry?: () => void;
}

export function ErrorAuthScreen({
  errorMessage,
  errorCode,
  onRetry,
}: ErrorAuthScreenProps) {
  const navigate = useNavigate();

  const getErrorDetails = () => {
    if (errorCode === 401 || errorCode === 403) {
      return {
        title: "Session Expired",
        description:
          "Your session has expired. Please log in again to continue.",
        icon: "🔐",
      };
    }

    if (errorCode === 404) {
      return {
        title: "Not Found",
        description: "The resource you are looking for does not exist.",
        icon: "🔍",
      };
    }

    if (errorCode === 500) {
      return {
        title: "Server Error",
        description: "Something went wrong on our end. Please try again later.",
        icon: "⚠️",
      };
    }

    return {
      title: "Authentication Error",
      description:
        errorMessage ||
        "An unexpected error occurred while verifying your credentials.",
      icon: "❌",
    };
  };

  const { title, description, icon } = getErrorDetails();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-destructive/5 flex items-center justify-center z-50">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-destructive/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-md">
        {/* Error Icon */}
        <div className="mb-6 relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-destructive/20 to-destructive/10 flex items-center justify-center border border-destructive/30">
            <AlertCircle className="w-12 h-12 text-destructive animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center text-white text-xl">
            !
          </div>
        </div>

        {/* Error Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
          {title}
        </h2>

        {/* Error Description */}
        <p className="text-muted-foreground text-center mb-2">{description}</p>

        {/* Error Code */}
        {errorCode && (
          <p className="text-xs text-muted-foreground/60 mb-8">
            Error Code: {errorCode}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          )}

          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="flex-1 border-border/50 hover:bg-card/50 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Login
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 rounded-lg bg-card/50 border border-border/30 w-full">
          <p className="text-xs text-muted-foreground text-center">
            If you continue to experience issues, please contact our support
            team at{" "}
            <span className="text-primary font-medium">
              support@edupay360.com
            </span>
          </p>
        </div>

        {/* Back to Home Link */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Back to Home
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
