import { TablePagination } from "@/components/custom/TablePagination"
import { usePagination } from "@/hooks/use-pagination"
import { Sales } from "@/types/sales"

const colums = [
    {title: "Date", style: ""},
    {title: "SKU", style: ""},
    {title: "Brand", style: ""},
    {title: "Channel", style: ""},
    {title: "Region", style: ""},
    {title: "Units Sold", style: ""},
]

export function SalesTable({ sales, year }: {
    sales: Sales[]
    year: string
}) {
    const { page, setPage, size, paginated } = usePagination(sales, 10);

    return (
        <section className="space-y-4">
            <div className="text-xl">Displaying sales from year { year } (tabular form).</div>
            <div className="table-wrapper">
                <div className="thead grid grid-cols-6">
                    {colums.map((item) => (
                        <div className="th" key={item.title}>
                            {item.title}
                        </div>
                    ))}
                </div>

                {paginated.map((item, i) => (
                    <div className="tdata grid grid-cols-6" key={i}>
                        <div className="td">{item.date}</div>
                        <div className="td">{item.sku}</div>
                        <div className="td">{item.brand}</div>
                        <div className="td">{item.channel}</div>
                        <div className="td">{item.region}</div>
                        <div className="td">{item.units_sold}</div>
                    </div>
                ))}
            </div>

            <TablePagination 
                data={sales}
                paginated={paginated}
                page={page}
                setPage={setPage}
                size={size}
            />
        </section>
    )
}