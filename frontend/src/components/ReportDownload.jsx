import React from "react";
import { Download, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { downloadReport } from "@/services/api";

const ReportDownload = ({ moleculeName, therapyArea }) => {
    const handleDownload = async () => {
        try {
            toast.info("Downloading...", {
                description: "Your report is being prepared.",
                icon: <Download className="w-5 h-5 animate-bounce" />,
            });
            await downloadReport();
            toast.success("Download started!");
        } catch (error) {
            toast.error("Download failed", {
                description: "Please try running the research again.",
            });
        }
    };

    return (
        <Button
            onClick={handleDownload}
            variant="glow"
            className="shadow-md ml-4"
        >
            <Download className="w-4 h-4 mr-2" />
            Download Report
        </Button>
    );
};

export default ReportDownload;
