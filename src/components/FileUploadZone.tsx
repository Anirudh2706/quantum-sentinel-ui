import { useState, useCallback } from 'react';
import { Upload, File, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  isScanning?: boolean;
}

export const FileUploadZone = ({ onFileSelect, isScanning }: FileUploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <Card className={cn(
      "relative border-2 border-dashed transition-all duration-300 overflow-hidden",
      isDragOver 
        ? "border-primary bg-primary/5 shadow-quantum" 
        : "border-muted-foreground/20 hover:border-primary/40",
      isScanning && "animate-quantum-glow"
    )}>
      <div className="absolute inset-0 bg-gradient-cyber opacity-50" />
      
      <div
        className="relative p-12 text-center"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-6">
          <div className={cn(
            "rounded-full p-6 transition-all duration-300",
            isDragOver 
              ? "bg-primary/20 shadow-quantum" 
              : "bg-muted/10",
            isScanning && "animate-quantum-pulse"
          )}>
            {isScanning ? (
              <div className="animate-quantum-spin">
                <File className="h-12 w-12 text-primary" />
              </div>
            ) : selectedFile ? (
              <CheckCircle className="h-12 w-12 text-success" />
            ) : (
              <Upload className="h-12 w-12 text-muted-foreground" />
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              {isScanning 
                ? "Quantum Analysis in Progress..." 
                : selectedFile 
                  ? `Selected: ${selectedFile.name}`
                  : "Drop your file here"
              }
            </h3>
            <p className="text-muted-foreground">
              {isScanning 
                ? "Deep scanning with quantum algorithms"
                : "or click to browse your files"
              }
            </p>
          </div>

          {!isScanning && (
            <>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
                accept=".exe,.dll,.zip,.rar,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              />
              <label htmlFor="file-upload">
                <Button variant="quantum" size="lg" className="cursor-pointer" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
            </>
          )}

          {selectedFile && !isScanning && (
            <div className="mt-4 p-4 rounded-lg bg-card border border-primary/20">
              <div className="flex items-center space-x-3">
                <File className="h-5 w-5 text-primary" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};