import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { 
  Settings as SettingsIcon, 
  FileText, 
  Calendar, 
  FolderTree,
  Trash2,
  Plus,
  Save
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Rule {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
}

const defaultRules: Rule[] = [
  {
    id: "date-prefix",
    name: "Date Prefix Naming",
    enabled: true,
    description: "Add YYYY-MM prefix to document names for chronological sorting",
  },
  {
    id: "photos-organize",
    name: "Photo Organization",
    enabled: true,
    description: "Move photos to Year/Month folder structure",
  },
  {
    id: "remove-duplicates",
    name: "Clean Duplicate Markers",
    enabled: true,
    description: "Remove (1), copy, duplicate from filenames",
  },
  {
    id: "archive-old",
    name: "Archive Old Files",
    enabled: false,
    description: "Move files older than 1 year to Archive folder",
  },
  {
    id: "screenshots",
    name: "Screenshot Organization",
    enabled: true,
    description: "Move screenshots to Screenshots/YYYY-MM folder",
  },
];

export default function Settings() {
  const [rules, setRules] = useState(defaultRules);
  const [saved, setSaved] = useState(false);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold">Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Configure organization rules and preferences
          </p>
        </div>

        {/* Organization Rules */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2">
              <FolderTree className="h-5 w-5 text-ocean" />
              Organization Rules
            </h2>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>

          <div className="space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={cn(
                  "flex items-start gap-4 rounded-lg border p-4 transition-colors",
                  rule.enabled
                    ? "border-border bg-card"
                    : "border-border/50 bg-muted/30"
                )}
              >
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                    rule.enabled
                      ? "border-ocean bg-ocean text-primary-foreground"
                      : "border-muted-foreground/30"
                  )}
                >
                  {rule.enabled && (
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                <div className="flex-1">
                  <p className={cn(
                    "font-medium text-sm",
                    !rule.enabled && "text-muted-foreground"
                  )}>
                    {rule.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {rule.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Naming Conventions */}
        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-ocean" />
            Naming Conventions
          </h2>

          <div className="rounded-lg border border-border bg-card p-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Date Format</label>
              <select className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option>YYYY-MM-DD (2024-12-21)</option>
                <option>YYYY-MM (2024-12)</option>
                <option>DD-MM-YYYY (21-12-2024)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Word Separator</label>
              <select className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option>Hyphen (my-file-name)</option>
                <option>Underscore (my_file_name)</option>
                <option>Space (my file name)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Case Style</label>
              <select className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option>Title Case (My File Name)</option>
                <option>lowercase (my file name)</option>
                <option>UPPERCASE (MY FILE NAME)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </h2>

          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Disconnect Google Drive</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Remove access to your Google Drive account
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Disconnect
              </Button>
            </div>
          </div>
        </section>

        {/* Save button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button variant="ghost">Cancel</Button>
          <Button variant="ocean" onClick={handleSave}>
            <Save className="h-4 w-4" />
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
