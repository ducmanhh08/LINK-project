import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { mockFiles } from "@/data/mockFiles";
import { 
  CheckCircle2, 
  ArrowRight, 
  FolderPlus, 
  Edit3, 
  MoveRight,
  RefreshCw,
  Download
} from "lucide-react";

const appliedChanges = [
  {
    type: "rename",
    icon: Edit3,
    before: "Q4_Report_Final_v2_FINAL.pdf",
    after: "2024-Q4-Report.pdf",
  },
  {
    type: "move",
    icon: MoveRight,
    before: "IMG_2847.jpg → /",
    after: "IMG_2847.jpg → /Photos/2024/December",
  },
  {
    type: "rename",
    icon: Edit3,
    before: "meeting notes dec.docx",
    after: "2024-12-Meeting-Notes.docx",
  },
  {
    type: "create-folder",
    icon: FolderPlus,
    before: "",
    after: "/Finance/2024",
  },
  {
    type: "move",
    icon: MoveRight,
    before: "budget 2024.xlsx → /",
    after: "budget 2024.xlsx → /Finance/2024",
  },
];

export default function Complete() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center py-12">
        {/* Success animation */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-forest/20" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full gradient-forest shadow-lg">
            <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
          </div>
        </div>

        <h1 className="mt-8 font-display text-3xl font-bold text-center">
          Organization Complete!
        </h1>
        <p className="mt-2 text-muted-foreground text-center max-w-md">
          Your Google Drive has been organized. Here's a summary of the changes that were applied.
        </p>

        {/* Stats */}
        <div className="mt-8 flex items-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-ocean">5</p>
            <p className="text-sm text-muted-foreground">Changes applied</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <p className="text-3xl font-bold text-forest">1</p>
            <p className="text-sm text-muted-foreground">Folders created</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">3</p>
            <p className="text-sm text-muted-foreground">Files renamed</p>
          </div>
        </div>

        {/* Changes list */}
        <div className="mt-10 w-full max-w-2xl">
          <h2 className="font-display text-lg font-semibold mb-4">Applied Changes</h2>
          
          <div className="rounded-xl border border-border bg-card divide-y divide-border">
            {appliedChanges.map((change, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-light shrink-0">
                  <change.icon className="h-5 w-5 text-forest" />
                </div>

                <div className="flex-1 min-w-0">
                  {change.before && (
                    <p className="text-sm text-muted-foreground line-through truncate">
                      {change.before}
                    </p>
                  )}
                  <p className="text-sm font-medium text-forest truncate">
                    {change.after}
                  </p>
                </div>

                <CheckCircle2 className="h-5 w-5 text-forest shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Before / After comparison */}
        <div className="mt-10 w-full max-w-4xl">
          <h2 className="font-display text-lg font-semibold mb-4">Before & After</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-destructive" />
                <span className="text-sm font-medium">Before</span>
              </div>
              <div className="space-y-2 text-sm font-mono">
                <p className="text-muted-foreground">/</p>
                <p className="pl-4">├── Q4_Report_Final_v2_FINAL.pdf</p>
                <p className="pl-4">├── IMG_2847.jpg</p>
                <p className="pl-4">├── budget 2024.xlsx</p>
                <p className="pl-4">├── old_backup_copy(1).zip</p>
                <p className="pl-4 text-muted-foreground">└── Documents/</p>
                <p className="pl-8">└── meeting notes dec.docx</p>
              </div>
            </div>

            <div className="rounded-xl border border-forest/50 bg-forest-light/20 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-forest" />
                <span className="text-sm font-medium">After</span>
              </div>
              <div className="space-y-2 text-sm font-mono">
                <p className="text-muted-foreground">/</p>
                <p className="pl-4 text-forest">├── 2024-Q4-Report.pdf</p>
                <p className="pl-4 text-muted-foreground">├── Finance/</p>
                <p className="pl-8 text-forest">│   └── 2024/</p>
                <p className="pl-12 text-forest">│       └── budget 2024.xlsx</p>
                <p className="pl-4 text-muted-foreground">├── Photos/</p>
                <p className="pl-8 text-forest">│   └── 2024/December/</p>
                <p className="pl-12 text-forest">│       └── IMG_2847.jpg</p>
                <p className="pl-4 text-muted-foreground">└── Documents/</p>
                <p className="pl-8 text-forest">└── 2024-12-Meeting-Notes.docx</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/browser">
              <RefreshCw className="h-4 w-4" />
              Scan Again
            </Link>
          </Button>
          <Button variant="ocean" asChild>
            <Link to="/browser">
              View Files
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
