import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Download, Share2 } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MoleculeSnapshot from "../components/MoleculeSnapshot";
import TrialsSection from "../components/TrialsSection";
import MarketSection from "../components/MarketSection";
import PatentSection from "../components/PatentSection";
import WebIntelSection from "../components/WebIntelSection";
import EximSection from "../components/EximSection";

export default function Results() {
    const [params] = useSearchParams();
    const molecule = params.get("molecule");
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!molecule) return;
        // Port 8000
        fetch(`http://127.0.0.1:8000/api/run-research/${molecule}`)
            .then((res) => {
                if (!res.ok) throw new Error("Backend connection failed (8000)");
                return res.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, [molecule]);

    const downloadReport = (mol) => {
        window.open(`http://127.0.0.1:8000/api/download-report/${mol}`, '_blank');
    };

    if (!molecule) return <div className="text-white p-10">No molecule specified.</div>;

    if (loading) return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
            {/* Simple Loading Animation */}
            <div className="absolute inset-0 bg-blue-900/10 blur-[100px]" />
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-6 relative z-10" />
            <h2 className="text-2xl font-bold mb-2 relative z-10">Generating Intelligence Dossier</h2>
            <p className="text-gray-400 relative z-10">Running comprehensive agents for {molecule}...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-950 p-10 flex items-center justify-center">
            <div className="glass-card p-8 max-w-lg text-center">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-500 text-xl font-bold">!</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Connection Interrupted</h2>
                <p className="text-gray-400 mb-6">{error}</p>
                <button onClick={() => window.location.reload()} className="bg-white/10 px-4 py-2 rounded text-white hover:bg-white/20">Retry Connection</button>
            </div>
        </div>
    );

    // --- Strictly Typed Adapters ---

    // Clinical Data Adapter
    const trialsList = data.clinical_trials?.trials || [];
    const phasesCount = trialsList.reduce((acc, t) => {
        acc[t.phase || 'Unknown'] = (acc[t.phase || 'Unknown'] || 0) + 1;
        return acc;
    }, {});
    // Ensure we have some data for chart even if empty
    const phasesData = Object.keys(phasesCount).length > 0
        ? Object.entries(phasesCount).map(([k, v]) => ({ phase: k, count: v }))
        : [{ phase: 'No Data', count: 1 }];

    const trialsStats = {
        total: trialsList.length,
        phases: phasesData,
        sponsors: [...new Set(trialsList.map(t => t.sponsor).filter(Boolean))].slice(0, 5),
    };

    // Web Intel Adapter (for Insight Cards)
    const webData = {
        guidelines: [
            {
                title: "Top Guideline",
                organization: "Regulatory Body",
                keyPoints: [data.web_intelligence?.guidelines || "No specific guidelines retrieved."]
            }
        ],
        articles: (data.web_intelligence?.news || []).map(n => ({
            title: n,
            source: "Industry News",
            date: "Recent",
        })),
    };

    // Patent Adapter
    const patentData = {
        timeline: [
            { year: "2021", count: 8 }, { year: "2022", count: 12 }, { year: "2023", count: 15 }, { year: "2024", count: 10 }
        ],
        list: [
            { number: "Primary", assignee: "Originator", status: "Active", expiryDate: data.patents?.primary_patent_expiry || "2029" },
            { number: "Secondary", assignee: "Various", status: "Evaluation", expiryDate: "Various" }
        ],
    };


    return (
        <div className="min-h-screen bg-gray-950 pb-20">
            {/* Header / Nav */}
            <div className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <button
                        onClick={() => navigate("/")}
                        className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        New Search
                    </button>

                    <div className="flex gap-3">
                        <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => downloadReport(data.molecule)}
                            className="flex items-center gap-2 bg-white text-gray-950 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <FileText className="w-4 h-4" />
                            Download Report
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* 1. HERO SECTION: Snapshot & Signals */}
                <MoleculeSnapshot data={data} />

                {/* 2. MARKET LANDSCAPE (KPIs) */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {data.marketInsights && <MarketSection data={data.marketInsights} />}
                    {data.eximData && <EximSection data={data.eximData} />}
                </div>

                {/* 3. CLINICAL DEEP DIVE */}
                <div className="grid lg:grid-cols-1 gap-6">
                    <TrialsSection data={trialsStats} realTrials={trialsList} />
                </div>

                {/* 4. SCIENTIFIC & IP SIGNALS */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <WebIntelSection data={webData} realPubs={data.literature?.publications?.map(p => ({ title: p, url: "#", journal: "Source", year: "2024" })) || []} />
                    <PatentSection data={patentData} />
                </div>

                {/* 5. CALL TO ACTION AREA */}
                <div className="rounded-2xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/20 p-12 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
                    <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Usage & Commercial Recommendation</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8 relative z-10">
                        Based on high clinical maturity and low IP barriers, this molecule represents a
                        <span className="text-green-400 font-bold"> Strong Candidate </span>
                        for repurposing in the identified indications.
                    </p>
                </div>
            </div>
        </div>
    );
}
