import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { NextResponse } from "next/server";
import { Sales } from "@/types/sales";

export async function GET(req: Request) {
    const results: Sales[] = [];

    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year"); // e.g. "2022"

    const filePath = path.join(
        process.cwd(),
        "data",
        "sales",
        "sales.csv"
    );

    return new Promise<Response>((resolve) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
            // row.date is assumed to be YYYY-MM-DD
            const rowYear = row.date?.split("-")[0];

            // If year query exists and does not match, skip
            if (yearParam && rowYear !== yearParam) {
            return;
            }

            results.push({
            date: row.date,
            sku: row.sku,
            brand: row.brand,
            segment: row.segment,
            category: row.category,
            channel: row.channel,
            region: row.region,
            pack_type: row.pack_type,
            price_unit: Number(row.price_unit),
            promotion_flag: Number(row.promotion_flag) as 0 | 1,
            delivery_days: Number(row.delivery_days),
            stock_available: Number(row.stock_available),
            delivered_qty: Number(row.delivered_qty),
            units_sold: Number(row.units_sold),
            });
        })
        .on("end", () => {
            resolve(NextResponse.json(results));
        })
        .on("error", (err) => {
            resolve(
            NextResponse.json(
                { error: "Failed to read CSV", details: err.message },
                { status: 500 }
            )
            );
        });
    });
}
