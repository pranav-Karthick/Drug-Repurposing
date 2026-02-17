import React from "react";
import { TrendingUp, DollarSign, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#38BDF8", "#0EA5E9", "#0284C7", "#0369A1", "#075985"];

const MarketSection = ({ data }) => {
    return (
        <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h2 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Market Insights
            </h2>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <DollarSign className="w-4 h-4" />
                        Market Size
                    </div>
                    <p className="text-2xl font-bold text-foreground">{data.marketSize}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <TrendingUp className="w-4 h-4" />
                        CAGR
                    </div>
                    <p className="text-2xl font-bold text-primary">{data.cagr}</p>
                </div>
            </div>

            {/* Competitor Market Share Chart */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Competitor Market Share
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.competitors} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 25%)" />
                            <XAxis type="number" stroke="hsl(215 20% 65%)" fontSize={12} tickFormatter={(v) => `${v}%`} />
                            <YAxis type="category" dataKey="name" stroke="hsl(215 20% 65%)" fontSize={12} width={100} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(217 33% 17%)",
                                    border: "1px solid hsl(217 33% 25%)",
                                    borderRadius: "8px",
                                    color: "hsl(210 40% 98%)",
                                }}
                                formatter={(value) => [`${value}%`, "Market Share"]}
                            />
                            <Bar dataKey="share" radius={[0, 4, 4, 0]}>
                                {data.competitors.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Market Trend */}
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                    Market Size Trend ($M)
                </h3>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.trends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 25%)" />
                            <XAxis dataKey="year" stroke="hsl(215 20% 65%)" fontSize={12} />
                            <YAxis stroke="hsl(215 20% 65%)" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(217 33% 17%)",
                                    border: "1px solid hsl(217 33% 25%)",
                                    borderRadius: "8px",
                                    color: "hsl(210 40% 98%)",
                                }}
                                formatter={(value) => [`$${value}M`, "Market Size"]}
                            />
                            <Bar dataKey="value" fill="#38BDF8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default MarketSection;
