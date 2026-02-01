import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  lottieSrc?: string;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Reusable Empty State UI for dashboard pages.
 * Example usage:
 * <EmptyState
 *   title="No Students Yet"
 *   message="Start building your school by adding your first student."
 *   lottieSrc="/lottie/empty-students.json"
 *   actions={<Button>Add Student</Button>}
 * />
 */
export function EmptyState({
  title = "Nothing here yet!",
  message = "Get started by adding your first record. Your dashboard will come alive as you add data.",
  lottieSrc = "/lottie/get-started.lottie",
  actions,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      <div className="w-full max-w-xs sm:max-w-md mb-6">
        <DotLottieReact
          src={lottieSrc}
          autoplay
          loop
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
        {title}
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{message}</p>
      {actions && (
        <div className="flex flex-wrap gap-3 justify-center">{actions}</div>
      )}
    </div>
  );
}
