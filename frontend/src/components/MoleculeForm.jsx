import React, { useState } from "react";
import { Beaker, ChevronDown, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUploader from "./FileUploader";
import { toast } from "sonner";

const therapyAreas = [
    "Oncology",
    "Respiratory",
    "CNS (Central Nervous System)",
    "Dermatology",
    "Cardiology",
    "Immunology",
    "Infectious Diseases",
    "Metabolic Disorders",
    "Ophthalmology",
    "Rare Diseases",
];

const MoleculeForm = ({ onSubmit }) => {
    const [moleculeName, setMoleculeName] = useState("");
    const [therapyArea, setTherapyArea] = useState("");
    const [file, setFile] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!moleculeName.trim()) {
            toast.error("Please enter a molecule name");
            return;
        }

        if (!therapyArea) {
            toast.error("Please select a therapy area");
            return;
        }

        onSubmit({ moleculeName, therapyArea, file });
    };

    const handleClear = () => {
        setMoleculeName("");
        setTherapyArea("");
        setFile(null);
        toast.info("Form cleared");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-6">
            {/* Molecule Name Input */}
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Molecule Name
                </label>
                <div className="relative">
                    <Beaker className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        value={moleculeName}
                        onChange={(e) => setMoleculeName(e.target.value)}
                        placeholder="Enter molecule name (e.g., Metformin)"
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Therapy Area Dropdown */}
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Therapy Area
                </label>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                        <span className={therapyArea ? "text-foreground" : "text-muted-foreground"}>
                            {therapyArea || "Select therapy area"}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute z-50 w-full mt-2 py-2 rounded-xl bg-card border border-border shadow-xl max-h-60 overflow-auto">
                            {therapyAreas.map((area) => (
                                <button
                                    key={area}
                                    type="button"
                                    onClick={() => {
                                        setTherapyArea(area);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full px-4 py-2.5 text-left hover:bg-muted transition-colors ${therapyArea === area ? "text-primary bg-primary/10" : "text-foreground"
                                        }`}
                                >
                                    {area}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* File Uploader */}
            <FileUploader onFileSelect={setFile} selectedFile={file} />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
                <Button
                    type="submit"
                    variant="glow"
                    size="xl"
                    className="flex-1"
                >
                    <Sparkles className="w-5 h-5" />
                    Run Research
                </Button>
                <Button
                    type="button"
                    variant="glass"
                    size="xl"
                    onClick={handleClear}
                >
                    <RotateCcw className="w-5 h-5" />
                    Clear
                </Button>
            </div>
        </form>
    );
};

export default MoleculeForm;
