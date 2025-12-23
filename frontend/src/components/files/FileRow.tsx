import { FileItem } from "@/data/mockFiles";
import { FileIcon } from "./FileIcon";
import { Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileRowProps {
  file: FileItem;
  onSelect?: (file: FileItem) => void;
  selected?: boolean;
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileRow({ file, onSelect, selected }: FileRowProps) {
  const hasSuggestion = !!file.suggestion;

  return (
    <div
      className={cn(
        "group flex items-center gap-4 rounded-lg border border-transparent p-3 transition-all cursor-pointer",
        "hover:bg-muted/50 hover:border-border",
        selected && "bg-ocean-light border-ocean/30",
        hasSuggestion && "bg-forest-light/30"
      )}
      onClick={() => onSelect?.(file)}
    >
      <FileIcon type={file.type} mimeType={file.mimeType} className="h-5 w-5 shrink-0" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-sm">{file.name}</span>
          {hasSuggestion && (
            <span className="shrink-0 flex items-center gap-1 rounded-full bg-forest/10 px-2 py-0.5 text-xs font-medium text-forest">
              <Sparkles className="h-3 w-3" />
              Suggestion
            </span>
          )}
        </div>
        <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{file.path}</span>
          {file.size && <span>{formatFileSize(file.size)}</span>}
          <span>{file.modifiedAt}</span>
        </div>
      </div>

      {hasSuggestion && (
        <div className="hidden sm:flex items-center gap-2 text-sm text-forest">
          <span className="truncate max-w-[200px]">
            {file.suggestion?.action === "rename" && file.suggestion.newName}
            {file.suggestion?.action === "move" && `Move to ${file.suggestion.newPath}`}
            {file.suggestion?.action === "create-folder" && `Create ${file.suggestion.newPath}`}
          </span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </div>
      )}

      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
