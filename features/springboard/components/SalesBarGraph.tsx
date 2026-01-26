"use client";

import {
  BarChart,
  Bar,
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

export function SalesBarGraph({ sales, year }: Props) {
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
            Sales on year {year} (bar graph).
        </div>

        <div className="w-full h-80 bg-slate-50 rounded-xl shadow-sm shadow-green-900 p-4">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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

                <Bar
                    dataKey="units_sold"
                    fill="#364153"
                    radius={[6, 6, 0, 0]}
                />
            </BarChart>
            </ResponsiveContainer>
        </div>
        </section>
    );
}
