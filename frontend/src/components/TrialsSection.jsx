import React, { useState } from "react";
import { FlaskConical, Users, Activity, ChevronDown, ChevronUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

// Distinct vibrant colors
const COLORS = [
    "#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EC4899", "#06B6D4", "#F97316", "#6366F1",
];

const TrialsSection = ({ data, realTrials }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!data || !data.phases) return <div className="p-4 bg-gray-900 rounded text-gray-400">Loading...</div>;

    // Calculate Maturity Index
    // Logic: (Phase 3 + Phase 4) / Total * 100
    const lateStageCount = data.phases.reduce((acc, p) => {
        if (p.phase.includes('3') || p.phase.includes('4')) return acc + p.count;
        return acc;
    }, 0);
    const maturityScore = data.total > 0 ? Math.round((lateStageCount / data.total) * 100) : 0;
    const maturityLabel = maturityScore > 40 ? "HIGH" : maturityScore > 20 ? "MODERATE" : "EARLY STAGE";
    const maturityColor = maturityScore > 40 ? "text-emerald-400" : maturityScore > 20 ? "text-yellow-400" : "text-blue-400";

    return (
        <div className="glass-card p-6 animate-fade-in">
            <h2 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-primary" />
                Clinical Landscape
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">

                {/* Summary Stats + Maturity Index */}
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center">
                            <p className="text-3xl font-bold text-white">{data.total}</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Total Trials</p>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center">
                            <p className={`text-3xl font-bold ${maturityColor}`}>{maturityLabel}</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Clinical Maturity</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-400 mb-2 flex justify-between">
                            <span>Late-Stage Ratio (Phase 3/4)</span>
                            <span className="text-white font-mono">{maturityScore}%</span>
                        </p>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: `${maturityScore}%` }} />
                        </div>
                    </div>
                </div>

                {/* Donut Chart */}
                <div className="h-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.phases}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="count"
                                nameKey="phase"
                            >
                                {data.phases.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", color: "#f8fafc" }} />
                            <Legend wrapperStyle={{ fontSize: "11px", opacity: 0.8 }} />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                        <span className="block text-3xl font-bold text-white">{data.total}</span>
                        <span className="text-xs text-gray-500">Studies</span>
                    </div>
                </div>
            </div>

            {/* Collapsible Trials Table */}
            {realTrials && realTrials.length > 0 && (
                <div className="mt-8 border-t border-white/10 pt-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors group"
                    >
                        <h3 className="text-md font-semibold text-white flex items-center gap-2">
                            <Activity className="w-4 h-4 text-blue-400" />
                            Detailed Trial List
                            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">{realTrials.length}</span>
                        </h3>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>

                    {isExpanded && (
                        <div className="mt-4 space-y-2 animate-slide-up max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {/* Header */}
                            <div className="grid grid-cols-12 text-xs text-gray-500 px-3 pb-2 uppercase tracking-wider font-semibold">
                                <div className="col-span-1">ID</div>
                                <div className="col-span-5">Study Title</div>
                                <div className="col-span-2">Phase</div>
                                <div className="col-span-2">Status</div>
                                <div className="col-span-2 text-right">Sponsor</div>
                            </div>

                            {realTrials.map((trial, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 bg-white/5 border border-white/5 rounded-lg p-3 text-sm hover:border-blue-500/30 transition-colors items-center">
                                    <div className="col-span-1 text-xs text-gray-400 font-mono truncate cursor-help" title={trial.id || "N/A"}>
                                        {(trial.id || "N/A").slice(-4)}
                                    </div>
                                    <div className="col-span-5 font-medium text-blue-300 line-clamp-1 pr-4" title={trial.title}>
                                        {trial.title}
                                    </div>
                                    <div className="col-span-2">
                                        <span className="px-2 py-0.5 rounded text-xs bg-white/10 border border-white/10 whitespace-nowrap">
                                            {trial.phase || "N/A"}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className={`text-xs ${trial.status === 'Recruiting' ? 'text-green-400' : 'text-gray-400'}`}>
                                            {trial.status}
                                        </span>
                                    </div>
                                    <div className="col-span-2 text-right text-xs text-gray-400 truncate" title={trial.sponsor}>
                                        {trial.sponsor}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TrialsSection;
