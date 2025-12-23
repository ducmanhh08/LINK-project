export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  mimeType?: string;
  size?: number;
  modifiedAt: string;
  path: string;
  suggestion?: {
    action: "rename" | "move" | "create-folder";
    newName?: string;
    newPath?: string;
    reason: string;
  };
}

export const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Q4_Report_Final_v2_FINAL.pdf",
    type: "file",
    mimeType: "application/pdf",
    size: 2500000,
    modifiedAt: "2024-12-15",
    path: "/Documents",
    suggestion: {
      action: "rename",
      newName: "2024-Q4-Report.pdf",
      reason: "Standardize naming convention and remove redundant 'FINAL' text",
    },
  },
  {
    id: "2",
    name: "IMG_2847.jpg",
    type: "file",
    mimeType: "image/jpeg",
    size: 4200000,
    modifiedAt: "2024-12-20",
    path: "/",
    suggestion: {
      action: "move",
      newPath: "/Photos/2024/December",
      reason: "Organize photos by date for easier browsing",
    },
  },
  {
    id: "3",
    name: "meeting notes dec.docx",
    type: "file",
    mimeType: "application/docx",
    size: 45000,
    modifiedAt: "2024-12-18",
    path: "/Work",
    suggestion: {
      action: "rename",
      newName: "2024-12-Meeting-Notes.docx",
      reason: "Use date-prefixed naming for chronological sorting",
    },
  },
  {
    id: "4",
    name: "budget 2024.xlsx",
    type: "file",
    mimeType: "application/xlsx",
    size: 120000,
    modifiedAt: "2024-01-10",
    path: "/",
    suggestion: {
      action: "move",
      newPath: "/Finance/2024",
      reason: "Group financial documents in dedicated folder",
    },
  },
  {
    id: "5",
    name: "Project Ideas",
    type: "folder",
    modifiedAt: "2024-11-30",
    path: "/",
  },
  {
    id: "6",
    name: "old_backup_copy(1).zip",
    type: "file",
    mimeType: "application/zip",
    size: 52000000,
    modifiedAt: "2023-06-15",
    path: "/",
    suggestion: {
      action: "move",
      newPath: "/Archive/2023",
      reason: "Archive old backup files to reduce clutter",
    },
  },
  {
    id: "7",
    name: "Screenshot 2024-12-19 at 10.45.32 AM.png",
    type: "file",
    mimeType: "image/png",
    size: 850000,
    modifiedAt: "2024-12-19",
    path: "/Desktop",
    suggestion: {
      action: "move",
      newPath: "/Screenshots/2024-12",
      reason: "Organize screenshots by month",
    },
  },
  {
    id: "8",
    name: "Documents",
    type: "folder",
    modifiedAt: "2024-12-01",
    path: "/",
  },
  {
    id: "9",
    name: "Photos",
    type: "folder",
    modifiedAt: "2024-12-20",
    path: "/",
  },
  {
    id: "10",
    name: "contract_draft_v3_reviewed_final.pdf",
    type: "file",
    mimeType: "application/pdf",
    size: 380000,
    modifiedAt: "2024-12-10",
    path: "/Legal",
    suggestion: {
      action: "rename",
      newName: "2024-Contract-Draft.pdf",
      reason: "Simplify filename while preserving key information",
    },
  },
  {
    id: "11",
    name: "Invoices",
    type: "folder",
    modifiedAt: "2024-12-01",
    path: "/Finance",
    suggestion: {
      action: "create-folder",
      newPath: "/Finance/Invoices/2024",
      reason: "Create year-based subfolders for better organization",
    },
  },
  {
    id: "12",
    name: "presentation deck.pptx",
    type: "file",
    mimeType: "application/pptx",
    size: 8500000,
    modifiedAt: "2024-12-17",
    path: "/Work/Presentations",
    suggestion: {
      action: "rename",
      newName: "2024-12-Presentation-Deck.pptx",
      reason: "Add date prefix for version tracking",
    },
  },
];

export const suggestedFolders = [
  { path: "/Finance/2024", reason: "For organizing 2024 financial documents" },
  { path: "/Photos/2024/December", reason: "For December 2024 photos" },
  { path: "/Archive/2023", reason: "For archiving old files" },
  { path: "/Screenshots/2024-12", reason: "For December 2024 screenshots" },
];
