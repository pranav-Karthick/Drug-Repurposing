import React from "react";
import { Ship, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const EximSection = ({ data }) => {
    // Combine imports and exports for the chart
    const combinedData = data.imports.map((imp, index) => ({
        year: imp.year,
        imports: imp.volume,
        exports: data.exports[index]?.volume || 0,
    }));

    return (
        <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h2 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <Ship className="w-5 h-5 text-primary" />
                Export/Import Data
            </h2>

            {/* Summary Table */}
            <div className="mb-6 overflow-x-auto">
                <table className="w-full">
                    <tbody>
                        {data.summary.map((row, index) => (
                            <tr key={index} className="border-b border-border/50 last:border-0">
                                <td className="py-3 text-muted-foreground text-sm">{row.metric}</td>
                                <td className="py-3 text-right font-medium text-foreground">
                                    <span className="inline-flex items-center gap-1">
                                        {row.value}
                                        {row.value.includes("+") && (
                                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                                        )}
                                        {row.value.includes("-") && row.metric !== "Trade Balance" && (
                                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                                        )}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Trend Chart */}
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                    5-Year Import/Export Trend (MT)
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={combinedData}>
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
                            />
                            <Legend
                                wrapperStyle={{ color: "hsl(210 40% 98%)" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="imports"
                                stroke="#38BDF8"
                                strokeWidth={3}
                                dot={{ fill: "#38BDF8", strokeWidth: 2 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="exports"
                                stroke="#0EA5E9"
                                strokeWidth={3}
                                dot={{ fill: "#0EA5E9", strokeWidth: 2 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default EximSection;
