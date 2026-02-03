import React from "react";
import type { ReactNode } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useGetSchool } from "@/hooks/useSchool";
import { LoadingAuthScreen } from "@/components/auth/loading-auth-screen";
import { ErrorAuthScreen } from "@/components/auth/auth-error-screen";

type ProtectedProps = {
  children: ReactNode;
};

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { schoolId } = useParams<{ schoolId: string }>();
  const { isLoading: userLoading, isError: userError, data: userData, error: userFetchError } = useCurrentUser();
  const { isLoading: schoolLoading, isError: schoolError, error: schoolFetchError } = useGetSchool(schoolId);

  // Wait for user data first
  if (userLoading) {
    return <LoadingAuthScreen title="Loading User" message="Verifying your login and fetching user data" />;
  }

  if (userError) {
    const status = (userFetchError as any)?.response?.status;
    if (status === 401 || status === 403 || !userData) {
      return <Navigate to="/login" replace />;
    }
    return (
      <ErrorAuthScreen
        errorMessage={
          (userFetchError as any)?.message || "An unexpected error occurred."
        }
        errorCode={status}
        onRetry={() => window.location.reload()}
      />
    );
  } 

  const user = userData?.data;
  // Validate that the schoolId in URL matches the user's schoolPublicId
  if (user?.schoolPublicId !== schoolId) {
    return (
      <ErrorAuthScreen
        errorMessage={"You don't have access to this school's dashboard."}
        errorCode={403}
        onRetry={() => window.location.href = `/dashboard/${user?.schoolPublicId || ''}`}
      />
    );
  }

  // Now check school data
  if (schoolLoading) {
    return <LoadingAuthScreen title="Loading School" message="Fetching school information and permissions" />;
  }

  if (schoolError) {
    const status = (schoolFetchError as any)?.response?.status;
    return (
      <ErrorAuthScreen
        errorMessage={
          (schoolFetchError as any)?.message || "Could not load school information."
        }
        errorCode={status}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return <>{children}</>;
};

export default Protected;
