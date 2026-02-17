import React, { useCallback, useState } from "react";
import { Upload, File, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FileUploader = ({ onFileSelect, selectedFile }) => {
    const [isDragActive, setIsDragActive] = useState(false);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragActive(false);

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const file = e.dataTransfer.files[0];
                if (file.type === "application/pdf") {
                    onFileSelect(file);
                }
            }
        },
        [onFileSelect]
    );

    const handleFileInput = useCallback(
        (e) => {
            if (e.target.files && e.target.files[0]) {
                onFileSelect(e.target.files[0]);
            }
        },
        [onFileSelect]
    );

    const removeFile = useCallback(() => {
        onFileSelect(null);
    }, [onFileSelect]);

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-foreground mb-2">
                Upload Internal Document (PDF)
            </label>

            {!selectedFile ? (
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                        "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer",
                        isDragActive
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-muted/30"
                    )}
                >
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-3">
                        <div className={cn(
                            "w-14 h-14 rounded-full flex items-center justify-center transition-colors",
                            isDragActive ? "bg-primary/20" : "bg-muted"
                        )}>
                            <Upload className={cn(
                                "w-6 h-6 transition-colors",
                                isDragActive ? "text-primary" : "text-muted-foreground"
                            )} />
                        </div>
                        <div>
                            <p className="text-foreground font-medium">
                                {isDragActive ? "Drop your PDF here" : "Drag & drop your PDF"}
                            </p>
                            <p className="text-muted-foreground text-sm mt-1">
                                or click to browse files
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="glass-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <File className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-foreground font-medium text-sm truncate max-w-[200px]">
                                {selectedFile.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <button
                            onClick={removeFile}
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                        >
                            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
