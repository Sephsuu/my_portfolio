export function AppOrderStatusBadge({ status, padding, className } : { 
  status: string, 
  padding?: string,
  className?: string;
}) {
  return(
    <div className={`text-[9px] h-fit w-fit px-2 py-0.5 rounded-sm font-semibold text-light ${className} ${padding} 
        ${status === "PENDING" && "bg-darkyellow"}
        ${status === "APPROVED" && "bg-darkgreen"}
        ${["TO FOLLOW", "TO_FOLLOW"].includes(status) && "bg-darkorange"}
        ${status === "CANCELLED" && "bg-darkred"}
        ${status === "REJECTED" && "bg-darkred"}
        ${status === "DELIVERED" && "bg-blue"}
        ${status === "PAID" && "bg-darkgreen"}
        ${status === "PARTIAL" && "bg-darkyellow"}
        ${status === "UNPAID" && "bg-darkred"}
        ${status === "OVERPAID" && "bg-darkbrown"}
        ${status === "PARTIALLY_PAID" && "bg-darkyellow"}
    `}>
        { status ? status.replace('_', ' ') : <span className="italic text-gray">No status available</span> }
    </div>
  );
}
