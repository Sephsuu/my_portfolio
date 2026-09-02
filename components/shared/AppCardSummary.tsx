import React from "react";

interface AppCardSummaryProps {
    label: React.ReactNode;
    value: React.ReactNode;
    helper?: React.ReactNode;
    isNegative?: boolean;
    className?: string;
    labelClassName?: string;
    valueClassName?: string;
    helperClassName?: string;
    moreContent?: React.ReactNode
}

export function AppCardSummary({
    label,
    value,
    helper,
    isNegative = false,
    className,
    labelClassName,
    valueClassName,
    helperClassName,
    moreContent
}: AppCardSummaryProps) {
    return (
        <div className={`gap-3 rounded-md border border-slate-300 bg-white p-5 shadow-sm ${className ?? ""}`}>
            <div className={`text-xs font-semibold uppercase tracking-[0.18em] text-darkbrown max-sm:text-[9px] ${labelClassName ?? ""}`}>
                {label}
            </div>
            <div className={`mt-3 text-2xl font-semibold max-sm:text-lg max-sm:mt-0.5 ${isNegative ? "text-darkred" : "text-slate-900"} ${valueClassName ?? ""}`}>
                {value}
            </div>
            {helper && (
                <div className={`mt-1 text-sm text-slate-500 max-sm:text-xs max-sm:mt-0 ${helperClassName ?? ""}`}>
                    {helper}
                </div>
            )}
            {moreContent}
        </div>
    );
}
