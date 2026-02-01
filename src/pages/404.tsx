import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
        {/* edupay360 */}
        <h1 className="text-purple-400 text-3xl font-bold">EduPay360</h1>
      <div className="w-full max-w-xs sm:max-w-md mb-8">
        <DotLottieReact
          src="/lottie/page-not-found.json"
          autoplay
          loop
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      {/* <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1> */}
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
