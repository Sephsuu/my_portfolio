"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { BASE_URL } from "@/lib/utils";
import { Sales } from "@/types/sales"
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { SalesTable } from "./components/SalesTable";
import { SalesLineGraph } from "./components/SalesLineGraph";
import { Button } from "@/components/ui/button";
import { SalesBarGraph } from "./components/SalesBarGraph";
import { SalesPieChart } from "./components/SalesPieChart";

const GRAPHS = ["Line", "Bar", "Pie"]

export function SalesPage() {
    const [loading, setLoading] = useState(true);

    const [sales, setSales] = useState<Sales[]>([]);
    const [year, setYear] = useState("2024")
    const [graph, setGraph] = useState("Line")

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {   
                const res = await fetch(`${BASE_URL}/api/sales?year=${year}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                })
                const data = await res.json()
                setSales(data);
            } catch (error) {
                toast.error(String(error))
            } finally { setLoading(false) }
        } fetchData();
    }, [year])

    return (
        <section className="space-y-2 p-8">
         
            <div className="text-2xl font-bold">Sales Dashboard</div>
                
      

            <Separator />

            <div className="flex-center-y justify-between">
                <Select value={year} onValueChange={setYear}>
                    <SelectTrigger 
                        className="text-lg font-semibold shadow-sm shadow-green-900 px-6"
                        hideIcon={true}
                    >
                        <CalendarIcon />
                        <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {["2024", "2023", "2022"].map((item) => (
                            <SelectItem value={item} key={item}>{item}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="shadow-sm shadow-green-900 bg-white rounded-md">
                    {GRAPHS.map((item) => (
                        <Button
                            onClick={() => setGraph(item)}
                            className={`w-25 bg-white text-black text-lg ${graph === item && "bg-black text-white"} hover:bg-slate-200`}
                        >
                            {item}
                        </Button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="h-screen w-full flex-center flex-col gap-4">
                    <Spinner className="w-18 h-18" />
                    <div className="text-lg">Loading, please wait...</div>
                </div>
            ) : (
                <div className="space-y-10">
                    {graph === GRAPHS[0] && (
                        <SalesLineGraph 
                            sales={sales}
                            year={year}
                        />
                    )}

                    {graph === GRAPHS[1] && (
                        <SalesBarGraph 
                            sales={sales}
                            year={year}
                        />
                    )}

                    {graph === GRAPHS[2] && (
                        <SalesPieChart 
                            sales={sales}
                            year={year}
                        />
                    )}
                    
                    <SalesTable 
                        sales={sales}
                        year={year}
                    />
                </div>
            )}

            
        </section>
    )
}