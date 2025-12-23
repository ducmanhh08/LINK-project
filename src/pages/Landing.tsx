import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Folder, Sparkles, FileText, CheckCircle2, Zap, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Suggestions",
    description: "Smart recommendations to organize your files based on content, naming patterns, and folder structure.",
  },
  {
    icon: Folder,
    title: "Batch Operations",
    description: "Rename, move, and organize multiple files at once. Save hours of manual work.",
  },
  {
    icon: Shield,
    title: "Safe & Reversible",
    description: "Preview all changes before applying. Every action can be undone with one click.",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect",
    description: "Link your Google Drive account securely in seconds.",
  },
  {
    number: "02",
    title: "Analyze",
    description: "LINK scans your files and identifies organization opportunities.",
  },
  {
    number: "03",
    title: "Organize",
    description: "Review suggestions and apply changes with a single click.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 gradient-hero">
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-ocean-light px-4 py-1.5 text-sm font-medium text-ocean">
              <Zap className="h-4 w-4" />
              Organize your Drive in minutes
            </div>

            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl animate-fade-in">
              Your files,{" "}
              <span className="text-gradient-ocean">intelligently</span>{" "}
              organized
            </h1>

            <p className="mt-6 text-lg text-muted-foreground md:text-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
              LINK uses smart suggestions to help you rename, reorganize, and 
              declutter your Google Drive. Stop searching, start finding.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/connect">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
          </div>

          {/* Preview Card */}
          <div className="mt-20 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-2 shadow-elevated">
              <div className="rounded-xl bg-muted p-6">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-destructive/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                    <div className="h-3 w-3 rounded-full bg-forest/60" />
                  </div>
                  <div className="flex-1 text-center text-sm text-muted-foreground">
                    LINK - File Organization
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    { name: "Q4_Report_Final_v2.pdf", suggestion: "Rename to '2024-Q4-Report.pdf'" },
                    { name: "IMG_2847.jpg", suggestion: "Move to 'Photos/2024/December'" },
                    { name: "meeting notes dec.docx", suggestion: "Rename to '2024-12-Meeting-Notes.docx'" },
                  ].map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-card p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-ocean" />
                        <span className="text-sm font-medium">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-forest">
                        <Sparkles className="h-4 w-4" />
                        {file.suggestion}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Everything you need to stay organized
            </h2>
            <p className="mt-4 text-muted-foreground">
              Powerful features that make file organization effortless
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-ocean/50 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean-light text-ocean transition-transform group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-muted py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-muted-foreground">
              Get organized in three simple steps
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-display font-bold text-ocean/10">
                  {step.number}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-16 bg-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-3xl gradient-ocean p-12 text-center shadow-lg">
            <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to organize your Drive?
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Join thousands of users who have already transformed their file chaos into clarity.
            </p>
            <Button variant="hero" size="xl" className="mt-8 bg-card text-foreground hover:bg-card/90" asChild>
              <Link to="/connect">
                Start organizing now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-display font-bold">
            <div className="flex h-6 w-6 items-center justify-center rounded-md gradient-ocean">
              <Clock className="h-3 w-3 text-primary-foreground" />
            </div>
            LINK
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 LINK. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
