import React from "react";
import { FileText, CheckCircle, Lightbulb } from "lucide-react";

const InternalInsightsSection = ({ data }) => {
    return (
        <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "600ms" }}>
            <h2 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Internal Document Insights
            </h2>

            {/* Key Findings */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Key Findings
                </h3>
                <div className="space-y-3">
                    {data.keyFindings.map((finding, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 bg-primary/10 rounded-lg p-4"
                        >
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-foreground text-sm">{finding}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Extracted Bullet Points */}
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                    Extracted Insights
                </h3>
                <ul className="space-y-3">
                    {data.bulletPoints.map((point, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                            <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground flex-shrink-0">
                                {index + 1}
                            </span>
                            <span className="pt-0.5">{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InternalInsightsSection;
