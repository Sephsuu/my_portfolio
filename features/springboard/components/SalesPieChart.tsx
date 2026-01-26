"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Sales } from "@/types/sales";
import { useMemo } from "react";

interface Props {
    sales: Sales[];
    year: string;
}

const COLORS = [
    "#364153",
    "#4b5563",
    "#6b7280",
    "#9ca3af",
    "#d1d5db",
    "#a3a3a3",
    "#737373",
    "#525252",
    "#404040",
    "#262626",
    "#171717",
    "#0f172a",
];

export function SalesPieChart({ sales, year }: Props) {
    const data = useMemo(() => {
        const monthlyMap: Record<string, number> = {};

        sales.forEach((item) => {
        const month = item.date.slice(0, 7); // YYYY-MM
        monthlyMap[month] =
            (monthlyMap[month] || 0) + item.units_sold;
        });

        return Object.entries(monthlyMap)
        .map(([month, units_sold]) => ({
            month,
            units_sold,
        }))
        .sort((a, b) => a.month.localeCompare(b.month));
    }, [sales]);

    const monthFormatter = (value: string) => {
        const [year, month] = value.split("-");
        const date = new Date(Number(year), Number(month) - 1);
        return date.toLocaleString("en-US", { month: "short" });
    };

    return (
        <section className="space-y-4">
            <div className="text-lg mb-2">
                Sales on year {year} (pie chart).
            </div>

            {/* 2-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 rounded-xl shadow-sm shadow-green-900 p-6">
                
                {/* 🥧 Pie Chart */}
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Tooltip />
                        <Pie
                            data={data}
                            dataKey="units_sold"
                            nameKey="month"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={3}
                        >
                            {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                            ))}
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* 📋 Custom Legend */}
                <div className="flex h-80 py-4 flex-col justify-center space-y-1">
                    {data.map((item, index) => (
                        <div
                            key={item.month}
                            className="flex items-center justify-between text-sm"
                        >
                        <div className="flex items-center gap-3">
                            <span
                            className="w-3 h-3 rounded-full"
                            style={{
                                backgroundColor:
                                COLORS[index % COLORS.length],
                            }}
                            />
                            <span className="font-medium">
                            {monthFormatter(item.month)}
                            </span>
                        </div>

                        <span className="font-semibold">
                            ₱ {item.units_sold.toLocaleString()}
                        </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
