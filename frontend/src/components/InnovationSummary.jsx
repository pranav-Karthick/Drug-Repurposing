import React from "react";
import { Sparkles, Target, ArrowRight, Rocket } from "lucide-react";

const InnovationSummary = ({ data }) => {
    return (
        <div className="glass-card p-6 border-primary/30 animate-fade-in" style={{ animationDelay: "700ms" }}>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-display font-semibold text-foreground">
                        Innovation Opportunity Summary
                    </h2>
                    <p className="text-sm text-muted-foreground">AI-synthesized strategic insights</p>
                </div>
            </div>

            {/* Main Story */}
            <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-xl p-6 mb-6">
                <p className="text-foreground leading-relaxed">{data.story}</p>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Opportunities */}
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Key Opportunities
                    </h3>
                    <ul className="space-y-3">
                        {data.opportunities.map((opportunity, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-3 text-sm"
                            >
                                <span className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                    <ArrowRight className="w-3 h-3 text-green-400" />
                                </span>
                                <span className="text-foreground">{opportunity}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recommendations */}
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                        <Rocket className="w-4 h-4" />
                        Recommendations
                    </h3>
                    <ul className="space-y-3">
                        {data.recommendations.map((recommendation, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-3 text-sm"
                            >
                                <span className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                    {index + 1}
                                </span>
                                <span className="text-foreground">{recommendation}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default InnovationSummary;
