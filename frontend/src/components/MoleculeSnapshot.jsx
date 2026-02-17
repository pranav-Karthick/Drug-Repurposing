import React from "react";
import { Pill, Activity, Zap, ShieldCheck } from "lucide-react";

export default function MoleculeSnapshot({ data }) {
    // Determine signals based on data presence
    const signalStrength = data.clinical_trials?.trials?.length > 10 ? "High" : "Moderate";
    const trialCount = data.clinical_trials?.trials?.length || 0;

    // Mock Trend Logic (Visual Only for Demo)
    const trend = "+12% vs last year";

    return (
        <div className="glass-card p-8 animate-fade-in relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                {/* Visual Identity & Basic Info */}
                <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Pill className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-4xl font-display font-bold text-white tracking-wide">
                            {data.molecule}
                        </h1>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-400 font-mono">
                        <span className="px-2 py-0.5 border border-white/10 rounded">Small Molecule</span>
                        <span className="px-2 py-0.5 border border-white/10 rounded">Oral</span>
                        <span className="px-2 py-0.5 border border-green-500/20 text-green-400 rounded">Approved Drug</span>
                    </div>
                </div>

                {/* KPI Signals */}
                <div className="flex gap-6">
                    {/* Repurposing Signal */}
                    <div className="text-right">
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Repurposing Signal</p>
                        <div className="flex items-center justify-end gap-2 mt-1">
                            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400/20 animate-pulse" />
                            <span className="text-2xl font-bold text-white">{signalStrength}</span>
                        </div>
                    </div>

                    {/* Clinical Volume */}
                    <div className="text-right border-l border-white/10 pl-6">
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Clinical Activity</p>
                        <div className="flex items-center justify-end gap-2 mt-1">
                            <Activity className="w-5 h-5 text-blue-400" />
                            <span className="text-2xl font-bold text-white">{trialCount}</span>
                        </div>
                        <p className="text-xs text-green-400 mt-0.5">▲ {trend}</p>
                    </div>

                    {/* Risk Profile - Mocked from Patent Data */}
                    <div className="text-right border-l border-white/10 pl-6 hidden lg:block">
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Market Entry Risk</p>
                        <div className="flex items-center justify-end gap-2 mt-1">
                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                            <span className="text-xl font-bold text-emerald-400">Low</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex gap-8">
                <div>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Primary Indication</span>
                    <p className="text-lg font-medium text-gray-200 mt-1">Diabetes Type 2</p>
                </div>
                <div>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">New Potential</span>
                    <p className="text-lg font-medium text-blue-300 mt-1">Oncology Adjunct, Anti-Aging</p>
                </div>
            </div>
        </div>
    );
}
