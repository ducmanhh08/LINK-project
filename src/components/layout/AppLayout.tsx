import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link2, FolderOpen, Sparkles, Settings, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/browser", label: "Files", icon: FolderOpen },
  { path: "/suggestions", label: "Suggestions", icon: Sparkles },
  { path: "/complete", label: "Results", icon: CheckCircle2 },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-border bg-card">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-ocean">
              <Link2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span>LINK</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-ocean-light text-ocean"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-xs text-muted-foreground">Connected to</p>
            <p className="mt-1 text-sm font-medium">Google Drive</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1">
        <div className="min-h-screen p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
