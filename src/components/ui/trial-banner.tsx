import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TrialBannerProps {
  user?: { subscriptionStatus?: string; trialEndDate?: string };
  className?: string;
}

export function getTrialInfo(user?: {
  subscriptionStatus?: string;
  trialEndDate?: string;
}) {
  if (!user || user.subscriptionStatus !== "TRIAL" || !user.trialEndDate)
    return null;
  const today = new Date();
  const end = new Date(user.trialEndDate);
  const msLeft = end.getTime() - today.getTime();
  const daysLeft = Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));
  let color = "border-primary/30 bg-primary/5 text-primary";
  let iconColor = "text-primary";
  let variant: "default" | "destructive" = "default";
  if (daysLeft <= 3) {
    color = "border-destructive/40 bg-destructive/10 text-destructive";
    iconColor = "text-destructive";
    variant = "destructive";
  } else if (daysLeft <= 7) {
    color =
      "border-yellow-400/40 bg-yellow-400/10 text-yellow-700 dark:text-yellow-400";
    iconColor = "text-yellow-500 dark:text-yellow-400";
  }
  return { daysLeft, color, iconColor, variant };
}

export function TrialBanner({ user, className }: TrialBannerProps) {
  const info = getTrialInfo(user);
  if (!info) return null;
  const { daysLeft, color, iconColor, variant } = info;
  return (
    <div
      className={`flex ${className} items-center gap-3 px-4 py-2 rounded-md border ${color} shadow-sm w-full max-w-xl`}
    >
      <Clock className={`w-5 h-5 ${iconColor}`} />
      <div className="flex flex-col items-start text-left">
        <span className="font-semibold tracking-tight">Trial Period</span>
        <span className="text-xs text-muted-foreground">
          {daysLeft > 0
            ? `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left on your free trial.`
            : "Trial expired. Please upgrade to continue."}
        </span>
      </div>
      <Button
        size="sm"
        variant={variant}
        className="ml-auto px-4 py-1.5 rounded"
        onClick={() => window.open("/dashboard/upgrade", "_self")}
      >
        Upgrade
      </Button>
    </div>
  );
}

export function MobileTrialBanner({
  user,
}: {
  user?: { subscriptionStatus?: string; trialEndDate?: string };
}) {
  const info = getTrialInfo(user);
  if (!info) return null;
  const { daysLeft } = info;
  return (
    <div className="md:hidden w-full mb-1">
      <div
        className="flex items-center gap-1 px-2 py-1 rounded border border-primary/20 bg-primary/5 text-primary shadow-sm overflow-hidden"
        style={{ minHeight: 0 }}
      >
        <span className="text-xs font-medium truncate">
          {daysLeft > 0
            ? `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left on your free trial.`
            : "Trial expired. Please upgrade to continue."}
        </span>
        <Link
          to="/dashboard/upgrade"
          className={`ml-2 text-xs font-semibold underline underline-offset-2 whitespace-nowrap ${daysLeft <= 3 ? "text-destructive hover:text-destructive/80" : "text-primary hover:text-primary/80"}`}
          style={{ padding: 0, minWidth: 0 }}
        >
          Upgrade
        </Link>
      </div>
    </div>
  );
}
