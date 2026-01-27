import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { FileRow } from "@/components/files/FileRow";
import { Button } from "@/components/ui/button";
import { mockFiles, FileItem } from "@/data/mockFiles";
import { Search, Filter, Sparkles, FolderOpen, ArrowRight } from "lucide-react";
import { fetchFiles } from "@/lib/api";

export default function Browser() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch files from backend on mount
  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedFiles = await fetchFiles();
        if (Array.isArray(fetchedFiles)) {
          setFiles(fetchedFiles);
        }
      } catch (err) {
        console.error("Failed to fetch files:", err);
        setError("Could not load files from Google Drive. Using demo data.");
        setFiles(mockFiles);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, []);

  const filesWithSuggestions = files.filter((f) => f.suggestion);
  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectFile = (file: FileItem) => {
    setSelectedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(file.id)) {
        next.delete(file.id);
      } else {
        next.add(file.id);
      }
      return next;
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Your Files</h1>
            <p className="mt-1 text-muted-foreground">
              Browse and organize your Google Drive files
            </p>
          </div>

          <Button variant="ocean" onClick={() => navigate("/suggestions")}>
            <Sparkles className="h-4 w-4" />
            View {filesWithSuggestions.length} Suggestions
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading your files...</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ocean-light">
                <FolderOpen className="h-5 w-5 text-ocean" />
              </div>
              <div>
                <p className="text-2xl font-bold">{files.length}</p>
                <p className="text-sm text-muted-foreground">Total files</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-light">
                <Sparkles className="h-5 w-5 text-forest" />
              </div>
              <div>
                <p className="text-2xl font-bold">{filesWithSuggestions.length}</p>
                <p className="text-sm text-muted-foreground">Suggestions</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Filter className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {files.filter((f) => f.type === "folder").length}
                </p>
                <p className="text-sm text-muted-foreground">Folders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button variant="outline">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* File list */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
              <span className="flex-1">Name</span>
              <span className="hidden sm:block w-48">Suggestion</span>
              <span className="w-8"></span>
            </div>
          </div>

          <div className="divide-y divide-border/50">
            {filteredFiles.map((file) => (
              <FileRow
                key={file.id}
                file={file}
                selected={selectedFiles.has(file.id)}
                onSelect={handleSelectFile}
              />
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No files found</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
