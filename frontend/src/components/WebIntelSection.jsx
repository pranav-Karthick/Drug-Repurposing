import React from "react";
import { Globe, BookOpen, ExternalLink, Lightbulb, FileText } from "lucide-react";

const WebIntelSection = ({ data, realPubs }) => {
    return (
        <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "500ms" }}>
            <h2 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Signals & Evidence
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                {/* Guidelines Signal Card */}
                {data.guidelines && data.guidelines.length > 0 && (
                    <div className="col-span-2 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-xl p-5">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-blue-500/10">
                                <FileText className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">Clinical Guideline Signal</h3>
                                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                                    {data.guidelines[0].keyPoints[0]}
                                </p>
                                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                                    Source: {data.guidelines[0].organization}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Scientific Signal Card */}
                <div className="col-span-2 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-xl p-5">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-purple-500/10">
                            <Lightbulb className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">Scientific Consensus</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Recent literature shows increasing interest in off-target effects.
                                <span className="text-purple-300 font-medium"> {realPubs?.length || 'Multiple'} publications</span> identified in the last year relevant to this repurposing candidate.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recent Articles List (Simplified) */}
                <div className="col-span-2">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">Latest Web Signals</h3>
                    <div className="space-y-3">
                        {data.articles.slice(0, 3).map((article, index) => (
                            <div
                                key={index}
                                className="group flex items-start justify-between gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10 cursor-pointer"
                            >
                                <div>
                                    <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                                        {article.title}
                                    </h4>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Globe className="w-3 h-3" />
                                            {article.source}
                                        </span>
                                        <span>•</span>
                                        <span>{article.date}</span>
                                    </div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebIntelSection;
