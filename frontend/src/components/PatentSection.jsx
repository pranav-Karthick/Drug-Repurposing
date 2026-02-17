import React from "react";
import { FileSearch, Calendar, ShieldAlert, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PatentSection = ({ data }) => {
    // Mock Risk Logic
    const riskLevel = "Low";
    const expiryYear = 2027;

    return (
        <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
                    <FileSearch className="w-5 h-5 text-primary" />
                    IP & Commercial Landscape
                </h2>

                {/* Risk Badge */}
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">Freedom to Operate: PROBABLE</span>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
                {/* Visual Risk Meter */}
                <div className="col-span-1 bg-white/5 border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Patent Risk Score</p>

                    <div className="relative h-32 flex items-center justify-center">
                        {/* Simple Gauge Visual */}
                        <div className="w-24 h-24 rounded-full border-4 border-white/10 border-t-emerald-500 border-r-emerald-500 transform -rotate-45 flex items-center justify-center">
                            <div className="text-center transform rotate-45">
                                <span className="block text-2xl font-bold text-white">Low</span>
                                <span className="text-[10px] text-gray-400">Risk</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
                        <span>Safe</span>
                        <span>Blocked</span>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs uppercase">Primary Expiry</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{data.list[0]?.expiryDate || expiryYear}</p>
                        <p className="text-xs text-green-400 mt-1">Generic Entry Opportunity</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs uppercase">Secondary IP</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{data.list[1]?.status || "4 Active"}</p>
                        <p className="text-xs text-blue-400 mt-1">Formulation Patents</p>
                    </div>
                </div>
            </div>

            {/* Patent Timeline Chart */}
            <div className="h-40 border-t border-white/5 pt-4">
                <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Filing Trend</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.timeline}>
                        <defs>
                            <linearGradient id="patentGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                        <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", fontSize: "12px" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#10B981"
                            strokeWidth={2}
                            fill="url(#patentGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PatentSection;
