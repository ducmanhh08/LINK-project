import { 
  FileText, 
  Image, 
  FileSpreadsheet, 
  Presentation, 
  FileArchive, 
  Folder, 
  File 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileIconProps {
  mimeType?: string;
  type: "file" | "folder";
  className?: string;
}

export function FileIcon({ mimeType, type, className }: FileIconProps) {
  if (type === "folder") {
    return <Folder className={cn("text-ocean", className)} />;
  }

  const iconClass = cn("text-muted-foreground", className);

  if (mimeType?.includes("pdf")) {
    return <FileText className={cn("text-destructive", className)} />;
  }
  if (mimeType?.includes("image")) {
    return <Image className={cn("text-forest", className)} />;
  }
  if (mimeType?.includes("spreadsheet") || mimeType?.includes("xlsx")) {
    return <FileSpreadsheet className={cn("text-forest", className)} />;
  }
  if (mimeType?.includes("presentation") || mimeType?.includes("pptx")) {
    return <Presentation className={cn("text-orange-500", className)} />;
  }
  if (mimeType?.includes("zip") || mimeType?.includes("archive")) {
    return <FileArchive className={cn("text-silver-dark", className)} />;
  }
  if (mimeType?.includes("docx") || mimeType?.includes("document")) {
    return <FileText className={cn("text-ocean", className)} />;
  }

  return <File className={iconClass} />;
}
