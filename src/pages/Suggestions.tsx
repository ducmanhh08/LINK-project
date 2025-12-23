import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { FileIcon } from "@/components/files/FileIcon";
import { mockFiles, suggestedFolders, FileItem } from "@/data/mockFiles";
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  X, 
  FolderPlus, 
  Edit3, 
  MoveRight,
  Play 
} from "lucide-react";
import { cn } from "@/lib/utils";

type SuggestionStatus = "pending" | "accepted" | "rejected";

export default function Suggestions() {
  const navigate = useNavigate();
  const filesWithSuggestions = mockFiles.filter((f) => f.suggestion);
  
  const [statuses, setStatuses] = useState<Record<string, SuggestionStatus>>(
    Object.fromEntries(filesWithSuggestions.map((f) => [f.id, "pending"]))
  );
  const [folderStatuses, setFolderStatuses] = useState<Record<string, SuggestionStatus>>(
    Object.fromEntries(suggestedFolders.map((_, i) => [i.toString(), "pending"]))
  );

  const acceptedCount = Object.values(statuses).filter((s) => s === "accepted").length +
    Object.values(folderStatuses).filter((s) => s === "accepted").length;
  const totalCount = filesWithSuggestions.length + suggestedFolders.length;

  const handleAccept = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: "accepted" }));
  };

  const handleReject = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: "rejected" }));
  };

  const handleAcceptFolder = (index: number) => {
    setFolderStatuses((prev) => ({ ...prev, [index.toString()]: "accepted" }));
  };

  const handleRejectFolder = (index: number) => {
    setFolderStatuses((prev) => ({ ...prev, [index.toString()]: "rejected" }));
  };

  const handleAcceptAll = () => {
    setStatuses(Object.fromEntries(filesWithSuggestions.map((f) => [f.id, "accepted"])));
    setFolderStatuses(Object.fromEntries(suggestedFolders.map((_, i) => [i.toString(), "accepted"])));
  };

  const handleApply = () => {
    navigate("/complete");
  };

  const getActionIcon = (action?: string) => {
    switch (action) {
      case "rename":
        return Edit3;
      case "move":
        return MoveRight;
      case "create-folder":
        return FolderPlus;
      default:
        return Sparkles;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Suggestions</h1>
            <p className="mt-1 text-muted-foreground">
              Review AI-powered organization suggestions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleAcceptAll}>
              <Check className="h-4 w-4" />
              Accept All
            </Button>
            <Button 
              variant="forest" 
              onClick={handleApply}
              disabled={acceptedCount === 0}
            >
              <Play className="h-4 w-4" />
              Apply {acceptedCount} Changes
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {acceptedCount} of {totalCount} suggestions accepted
            </span>
            <span className="font-medium text-forest">
              {Math.round((acceptedCount / totalCount) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-muted">
            <div
              className="h-full rounded-full gradient-forest transition-all duration-300"
              style={{ width: `${(acceptedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Create folders section */}
        {suggestedFolders.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2">
              <FolderPlus className="h-5 w-5 text-ocean" />
              Create Missing Folders
            </h2>

            <div className="space-y-2">
              {suggestedFolders.map((folder, index) => {
                const status = folderStatuses[index.toString()];
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4 transition-all",
                      status === "accepted" && "border-forest/50 bg-forest-light/30",
                      status === "rejected" && "border-border bg-muted/50 opacity-50",
                      status === "pending" && "border-border bg-card"
                    )}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ocean-light">
                      <FolderPlus className="h-5 w-5 text-ocean" />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-sm">{folder.path}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{folder.reason}</p>
                    </div>

                    {status === "pending" ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleRejectFolder(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-forest hover:bg-forest/10"
                          onClick={() => handleAcceptFolder(index)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        status === "accepted" && "bg-forest/10 text-forest",
                        status === "rejected" && "bg-muted text-muted-foreground"
                      )}>
                        {status === "accepted" ? "Accepted" : "Skipped"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* File suggestions */}
        <div className="space-y-3">
          <h2 className="font-display text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-forest" />
            File Suggestions
          </h2>

          <div className="space-y-2">
            {filesWithSuggestions.map((file) => {
              const status = statuses[file.id];
              const ActionIcon = getActionIcon(file.suggestion?.action);

              return (
                <div
                  key={file.id}
                  className={cn(
                    "rounded-lg border p-4 transition-all",
                    status === "accepted" && "border-forest/50 bg-forest-light/30",
                    status === "rejected" && "border-border bg-muted/50 opacity-50",
                    status === "pending" && "border-border bg-card"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <FileIcon 
                      type={file.type} 
                      mimeType={file.mimeType} 
                      className="h-5 w-5 mt-0.5 shrink-0" 
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm">{file.name}</span>
                        <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          <ActionIcon className="h-3 w-3" />
                          {file.suggestion?.action}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground truncate">
                          {file.name}
                        </span>
                        <ArrowRight className="h-4 w-4 text-forest shrink-0" />
                        <span className="text-forest font-medium truncate">
                          {file.suggestion?.newName || file.suggestion?.newPath}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {file.suggestion?.reason}
                      </p>
                    </div>

                    {status === "pending" ? (
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleReject(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-forest hover:bg-forest/10"
                          onClick={() => handleAccept(file.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full shrink-0",
                        status === "accepted" && "bg-forest/10 text-forest",
                        status === "rejected" && "bg-muted text-muted-foreground"
                      )}>
                        {status === "accepted" ? "Accepted" : "Skipped"}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
