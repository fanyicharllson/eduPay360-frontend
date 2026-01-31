import React from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LoadingAuthScreen } from "@/components/auth/loading-auth-screen";
import { ErrorAuthScreen } from "@/components/auth/auth-error-screen";

type ProtectedProps = {
  children: ReactNode;
};

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { isLoading, isError, data, error } = useCurrentUser();

  if (isLoading) {
    return <LoadingAuthScreen />;
  }

  if (isError) {
    // If error is 401/403, redirect to login. Otherwise, show error message and allow retry.
    const status = (error as any)?.response?.status;
    if (status === 401 || status === 403 || !data) {
      return <Navigate to="/login" replace />;
    }
    return (
      <ErrorAuthScreen
        errorMessage={
          (error as any)?.message || "An unexpected error occurred."
        }
        errorCode={status}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return <>{children}</>;
};

export default Protected;
