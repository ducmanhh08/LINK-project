import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Link2, Shield, Zap, CheckCircle2 } from "lucide-react";

const benefits = [
  "Read-only access to your files",
  "No files are stored on our servers",
  "Disconnect anytime from settings",
];

export default function Connect() {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      navigate("/browser");
    }, 1500);
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <div className="container flex min-h-screen items-center justify-center pt-16">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated animate-scale-in">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-ocean shadow-lg">
                <Link2 className="h-8 w-8 text-primary-foreground" />
              </div>

              <h1 className="mt-6 font-display text-2xl font-bold">
                Connect your Drive
              </h1>
              <p className="mt-2 text-muted-foreground">
                Link your Google Drive to start organizing your files with AI-powered suggestions.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-forest" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button
              variant="ocean"
              size="lg"
              className="mt-8 w-full"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Connect with Google
                </>
              )}
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              Your data is encrypted and secure
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            By connecting, you agree to our{" "}
            <a href="#" className="text-ocean hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-ocean hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
