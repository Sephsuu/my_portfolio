"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Sales } from "@/types/sales";
import { useMemo } from "react";

interface Props {
  sales: Sales[];
  year: string;
}

export function SalesLineGraph({ sales, year }: Props) {
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

    const pesoFormatter = (value?: number) => {
        if (value == null) return "₱0";
        return `₱${value.toLocaleString()}`;
    };

    const monthFormatter = (value: string) => {
        const [year, month] = value.split("-");
        const date = new Date(Number(year), Number(month) - 1);
        return date.toLocaleString("en-US", { month: "short" });
    };

    return (
        <section className="space-y-4">
            <div className="text-lg mb-2">
                Sales on year {year} (line graph).
            </div>

            <div className="w-full h-80 bg-slate-50 rounded-xl shadow-sm shadow-green-900 p-4">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    {/* 🎨 Gradient definition */}
                    <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#364153" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#364153" stopOpacity={0} />
                    </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                    dataKey="month"
                    tickFormatter={monthFormatter}
                    />

                    <YAxis />

                    <Tooltip
                        formatter={(value) => [
                            pesoFormatter(value as number),
                            "Sales"
                        ]}
                    />

                    {/* 📈 Line + gradient fill */}
                    <Area
                    type="monotone"
                    dataKey="units_sold"
                    stroke="#364153"
                    strokeWidth={3}
                    fill="url(#salesGradient)"
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    />
                </AreaChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
