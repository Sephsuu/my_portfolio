// src/components/shared/AppDatePeriodPicker.tsx

"use client";

import { AppHeader } from "@/components/shared/AppHeader";
import { AppSelect } from "@/components/shared/AppSelect";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
    addYears,
    endOfMonth,
    endOfQuarter,
    endOfWeek,
    Day,
    format,
    isAfter,
    isSameDay,
    isSameMonth,
    isWithinInterval,
    startOfMonth,
    startOfQuarter,
    startOfWeek,
} from "date-fns";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

export type AppDatePeriodMode = "DAY" | "WEEK" | "MONTH" | "QUARTER";

export type AppDatePeriodLabel = "Daily" | "Weekly" | "Monthly" | "Quarterly";

type PeriodOption = {
    label: AppDatePeriodLabel;
    value: AppDatePeriodMode;
};

type AppDatePeriodPickerProps = {
    startDate: string;
    endDate: string;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
    setDateRange?: (startDate: string, endDate: string) => void;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title?: string;
    excludedPeriods?: AppDatePeriodLabel[];
    allowFutureDates?: boolean;
    otherContent?: React.ReactNode
    weekStartsOn?: Day
};

const PERIOD_OPTIONS: PeriodOption[] = [
    {
        label: "Daily",
        value: "DAY",
    },
    {
        label: "Weekly",
        value: "WEEK",
    },
    {
        label: "Monthly",
        value: "MONTH",
    },
    {
        label: "Quarterly",
        value: "QUARTER",
    },
];

const DEFAULT_EXCLUDED_PERIODS: AppDatePeriodLabel[] = [];

export function AppDatePeriodPicker({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setDateRange,
    open,
    setOpen,
    title = "Select period",
    excludedPeriods = DEFAULT_EXCLUDED_PERIODS,
    allowFutureDates = false,
    otherContent,
    weekStartsOn = 0,
}: AppDatePeriodPickerProps) {
    const toYMD = (d: Date | undefined) => {
        return d ? format(d, "yyyy-MM-dd") : "";
    };

    const parseYMD = (value: string) => {
        return value ? new Date(`${value}T00:00:00`) : undefined;
    };

    const today = useMemo(() => new Date(), []);

    const excludedPeriodsKey = useMemo(() => {
        return excludedPeriods.join("|");
    }, [excludedPeriods]);

    const availablePeriods = useMemo(() => {
        const excluded = excludedPeriodsKey ? excludedPeriodsKey.split("|") : [];

        return PERIOD_OPTIONS.filter((period) => !excluded.includes(period.label));
    }, [excludedPeriodsKey]);

    const fallbackMode = useMemo<AppDatePeriodMode>(() => {
        return availablePeriods[0]?.value ?? "DAY";
    }, [availablePeriods]);

    const selectedStartDate = useMemo(() => {
        return parseYMD(startDate);
    }, [startDate]);

    const selectedEndDate = useMemo(() => {
        return parseYMD(endDate);
    }, [endDate]);

    const isModeAvailable = useCallback(
        (value: AppDatePeriodMode) => {
            return availablePeriods.some((period) => period.value === value);
        },
        [availablePeriods]
    );

    const clampEndDate = useCallback(
        (d: Date) => {
            if (allowFutureDates) return d;

            return isAfter(d, today) ? today : d;
        },
        [allowFutureDates, today]
    );

    const inferPeriodMode = useCallback(
        (
            selectedStartDateValue: Date | undefined,
            selectedEndDateValue: Date | undefined
        ): AppDatePeriodMode => {
            if (!selectedStartDateValue || !selectedEndDateValue) {
                return fallbackMode;
            }

            if (
                isSameDay(selectedStartDateValue, selectedEndDateValue) &&
                isModeAvailable("DAY")
            ) {
                return "DAY";
            }

            const weekStart = startOfWeek(selectedStartDateValue, { weekStartsOn });
            const weekEnd = clampEndDate(
                endOfWeek(selectedStartDateValue, { weekStartsOn })
            );

            if (
                isSameDay(selectedStartDateValue, weekStart) &&
                isSameDay(selectedEndDateValue, weekEnd) &&
                isModeAvailable("WEEK")
            ) {
                return "WEEK";
            }

            const monthStart = startOfMonth(selectedStartDateValue);
            const monthEnd = clampEndDate(endOfMonth(selectedStartDateValue));

            if (
                isSameDay(selectedStartDateValue, monthStart) &&
                isSameDay(selectedEndDateValue, monthEnd) &&
                isModeAvailable("MONTH")
            ) {
                return "MONTH";
            }

            const quarterStart = startOfQuarter(selectedStartDateValue);
            const quarterEnd = clampEndDate(endOfQuarter(selectedStartDateValue));

            if (
                isSameDay(selectedStartDateValue, quarterStart) &&
                isSameDay(selectedEndDateValue, quarterEnd) &&
                isModeAvailable("QUARTER")
            ) {
                return "QUARTER";
            }

            return fallbackMode;
        },
        [clampEndDate, fallbackMode, isModeAvailable, weekStartsOn]
    );

    const getAnchorFromPeriod = useCallback(
        (mode: AppDatePeriodMode, selectedStartDateValue: Date | undefined) => {
            const anchor = selectedStartDateValue ?? today;

            if (mode === "DAY") {
                return anchor;
            }

            if (mode === "WEEK") {
                return anchor;
            }

            if (mode === "MONTH") {
                return startOfMonth(anchor);
            }

            return startOfQuarter(anchor);
        },
        [today]
    );

    const initialMode = useMemo(() => {
        return inferPeriodMode(selectedStartDate, selectedEndDate);
    }, [inferPeriodMode, selectedStartDate, selectedEndDate]);

    const initialAnchor = useMemo(() => {
        return getAnchorFromPeriod(initialMode, selectedStartDate);
    }, [getAnchorFromPeriod, initialMode, selectedStartDate]);

    const [periodMode, setPeriodMode] = useState<AppDatePeriodMode>(initialMode);
    const [periodAnchor, setPeriodAnchor] = useState<Date>(initialAnchor);
    const [monthYearCursor, setMonthYearCursor] = useState(
        new Date(initialAnchor.getFullYear(), 0, 1)
    );
    const [quarterYear, setQuarterYear] = useState(initialAnchor.getFullYear());
    const [quarterNumber, setQuarterNumber] = useState(
        Math.floor(initialAnchor.getMonth() / 3) + 1
    );

    useEffect(() => {
        if (!open) return;

        const nextMode = inferPeriodMode(selectedStartDate, selectedEndDate);
        const nextAnchor = getAnchorFromPeriod(nextMode, selectedStartDate);

        // This dialog keeps draft picker state and resynchronizes it whenever it opens.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPeriodMode(nextMode);
        setPeriodAnchor(nextAnchor);
        setMonthYearCursor(new Date(nextAnchor.getFullYear(), 0, 1));
        setQuarterYear(nextAnchor.getFullYear());
        setQuarterNumber(Math.floor(nextAnchor.getMonth() / 3) + 1);
    }, [
        open,
        selectedStartDate,
        selectedEndDate,
        inferPeriodMode,
        getAnchorFromPeriod,
    ]);

    const disableFutureDates = (d: Date) => {
        if (allowFutureDates) return false;

        return isAfter(d, today);
    };

    const selectedRange = useMemo(() => {
        if (periodMode === "DAY") {
            return {
                start: periodAnchor,
                end: periodAnchor,
            };
        }

        if (periodMode === "WEEK") {
            const start = startOfWeek(periodAnchor, { weekStartsOn });
            const rawEnd = endOfWeek(periodAnchor, { weekStartsOn });

            return {
                start,
                end: clampEndDate(rawEnd),
            };
        }

        if (periodMode === "MONTH") {
            const start = startOfMonth(periodAnchor);
            const rawEnd = endOfMonth(periodAnchor);

            return {
                start,
                end: clampEndDate(rawEnd),
            };
        }

        const quarterAnchor = new Date(quarterYear, (quarterNumber - 1) * 3, 1);
        const start = startOfQuarter(quarterAnchor);
        const rawEnd = endOfQuarter(quarterAnchor);

        return {
            start,
            end: clampEndDate(rawEnd),
        };
    }, [
        clampEndDate,
        periodAnchor,
        periodMode,
        quarterNumber,
        quarterYear,
        weekStartsOn,
    ]);

    const rangeLabel = useMemo(() => {
        if (periodMode === "DAY") {
            return format(selectedRange.start, "MMMM dd, yyyy");
        }

        if (periodMode === "WEEK") {
            return `${format(selectedRange.start, "MMM dd")} - ${format(
                selectedRange.end,
                "MMM dd, yyyy"
            )}`;
        }

        if (periodMode === "MONTH") {
            return format(selectedRange.start, "MMMM yyyy");
        }

        const quarterLabels = [
            "First Quarter",
            "Second Quarter",
            "Third Quarter",
            "Fourth Quarter",
        ];

        return `${quarterLabels[quarterNumber - 1]} ${quarterYear}`;
    }, [periodMode, quarterNumber, quarterYear, selectedRange]);

    const quarterOptions = useMemo(() => {
        const labels = [
            "First Quarter",
            "Second Quarter",
            "Third Quarter",
            "Fourth Quarter",
        ];

        return labels.map((label, index) => {
            const value = index + 1;
            const quarterAnchor = new Date(quarterYear, index * 3, 1);
            const start = startOfQuarter(quarterAnchor);
            const rawEnd = endOfQuarter(quarterAnchor);
            const end = clampEndDate(rawEnd);
            const disabled = !allowFutureDates && isAfter(start, today);

            return {
                label,
                value,
                disabled,
                helper: `${format(start, "MMM dd")} - ${format(end, "MMM dd, yyyy")}`,
            };
        });
    }, [allowFutureDates, clampEndDate, quarterYear, today]);

    const yearOptions = useMemo(() => {
        return Array.from({ length: 5 }, (_, index) => {
            const year = today.getFullYear() - 4 + index;

            return {
                label: String(year),
                value: String(year),
            };
        });
    }, [today]);

    const handleModeChange = (value: AppDatePeriodMode) => {
        setPeriodMode(value);

        if (value === "MONTH") {
            setPeriodAnchor(startOfMonth(periodAnchor));
            setMonthYearCursor(new Date(periodAnchor.getFullYear(), 0, 1));
            return;
        }

        if (value === "QUARTER") {
            setQuarterYear(periodAnchor.getFullYear());
            setQuarterNumber(Math.floor(periodAnchor.getMonth() / 3) + 1);
            return;
        }

        setPeriodAnchor(periodAnchor);
    };

    const handleMonthPick = (monthIndex: number) => {
        const nextMonth = new Date(monthYearCursor.getFullYear(), monthIndex, 1);

        if (!allowFutureDates && isAfter(startOfMonth(nextMonth), today)) return;

        setPeriodAnchor(startOfMonth(nextMonth));
    };

    const handleQuarterYearChange = (value: string) => {
        const nextYear = Number(value);
        const currentQuarterStart = new Date(nextYear, (quarterNumber - 1) * 3, 1);

        setQuarterYear(nextYear);

        if (!allowFutureDates && isAfter(currentQuarterStart, today)) {
            setQuarterNumber(Math.floor(today.getMonth() / 3) + 1);
        }
    };

    const handleApply = () => {
        const nextStartDate = toYMD(selectedRange.start);
        const nextEndDate = toYMD(selectedRange.end);

        if (setDateRange) {
            setDateRange(nextStartDate, nextEndDate);
        } else {
            setStartDate(nextStartDate);
            setEndDate(nextEndDate);
        }

        setOpen(false);
    };

    const isWeekDaySelected = (d: Date) => {
        if (periodMode !== "WEEK") return false;

        return isWithinInterval(d, {
            start: selectedRange.start,
            end: selectedRange.end,
        });
    };

    const calendarClassNames = useMemo(
        () => ({
            day_button:
                "data-[selected-single=true]:bg-darkbrown! data-[selected-single=true]:text-white! data-[range-start=true]:bg-darkbrown! data-[range-start=true]:text-white! data-[range-end=true]:bg-darkbrown! data-[range-end=true]:text-white!",
        }),
        []
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="my-auto max-h-[90vh] overflow-y-auto sm:max-w-xl">
                <DialogTitle>
                    <AppHeader 
                        label={title} 
                        hidePapiverseLogo 
                        removeBackButton
                    />
                </DialogTitle>

                {otherContent}

                <div className="space-y-3">
                    {availablePeriods.length > 1 && (
                        <div className="grid grid-cols-2 gap-2 rounded-md bg-slate-100 p-1">
                            {availablePeriods.map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => handleModeChange(item.value)}
                                    className={`w-full rounded-md px-3 py-2 text-sm font-semibold transition ${
                                        periodMode === item.value
                                            ? "bg-white text-slate-900 shadow"
                                            : "text-slate-600 opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between gap-2 rounded-md border bg-white p-3">
                        <div className="text-sm">
                            <div className="font-semibold">Selected period</div>
                            <div className="text-slate-600">{rangeLabel}</div>
                        </div>

                        <Button
                            type="button"
                            className="bg-darkgreen! rounded-md hover:opacity-90 w-20 h-9"
                            onClick={handleApply}
                        >
                            Apply
                        </Button>
                    </div>

                    {periodMode === "DAY" ? (
                        <Calendar
                            weekStartsOn={weekStartsOn}
                            mode="single"
                            selected={periodAnchor}
                            onSelect={(d) => {
                                if (!d) return;
                                setPeriodAnchor(d);
                            }}
                            disabled={disableFutureDates}
                            classNames={calendarClassNames}
                            className="w-full"
                        />
                    ) : periodMode === "WEEK" ? (
                        <Calendar
                            weekStartsOn={weekStartsOn}
                            mode="single"
                            selected={periodAnchor}
                            onSelect={(d) => {
                                if (!d) return;
                                setPeriodAnchor(d);
                            }}
                            disabled={disableFutureDates}
                            modifiers={{
                                selectedWeek: isWeekDaySelected,
                            }}
                            modifiersClassNames={{
                                selectedWeek:
                                    "bg-darkbrown! text-white! hover:bg-darkbrown! hover:text-white!",
                            }}
                            classNames={calendarClassNames}
                            className="w-full"
                        />
                    ) : periodMode === "MONTH" ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    className="rounded-md border px-3 py-2 text-sm font-semibold"
                                    onClick={() => setMonthYearCursor(addYears(monthYearCursor, -1))}
                                >
                                    Prev year
                                </button>

                                <div className="text-lg font-semibold text-slate-900">
                                    {format(monthYearCursor, "yyyy")}
                                </div>

                                <button
                                    type="button"
                                    className="rounded-md border px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                                    onClick={() => setMonthYearCursor(addYears(monthYearCursor, 1))}
                                    disabled={!allowFutureDates && monthYearCursor.getFullYear() >= today.getFullYear()}
                                >
                                    Next year
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {Array.from({ length: 12 }, (_, index) => {
                                    const monthDate = new Date(monthYearCursor.getFullYear(), index, 1);
                                    const disabled = !allowFutureDates && isAfter(monthDate, today);
                                    const active = isSameMonth(periodAnchor, monthDate);

                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            disabled={disabled}
                                            onClick={() => handleMonthPick(index)}
                                            className={`rounded-md border px-3 py-4 text-sm font-semibold transition ${
                                                active
                                                    ? "border-darkbrown bg-darkbrown! text-white!"
                                                    : "bg-white text-slate-700"
                                            } ${
                                                disabled
                                                    ? "cursor-not-allowed opacity-40"
                                                    : "hover:bg-slate-50"
                                            }`}
                                        >
                                            {format(monthDate, "MMMM")}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="text-sm font-semibold text-slate-700">Year</div>

                                <AppSelect
                                    placeholder="Select year"
                                    items={yearOptions}
                                    value={String(quarterYear)}
                                    onChange={handleQuarterYearChange}
                                    triggerClassName="border border-slate-300"
                                />
                            </div>

                            <div className="grid gap-2">
                                {quarterOptions.map((quarter) => (
                                    <button
                                        key={quarter.value}
                                        type="button"
                                        disabled={quarter.disabled}
                                        onClick={() => setQuarterNumber(quarter.value)}
                                        className={`rounded-md border px-4 py-3 text-left transition ${
                                            quarterNumber === quarter.value
                                                ? "border-darkbrown bg-darkbrown! text-white!"
                                                : "bg-white"
                                        } ${
                                            quarter.disabled
                                                ? "cursor-not-allowed opacity-40"
                                                : "hover:bg-slate-50"
                                        }`}
                                    >
                                        <div
                                            className={`text-sm font-semibold ${
                                                quarterNumber === quarter.value
                                                    ? "text-white"
                                                    : "text-slate-900"
                                            }`}
                                        >
                                            {quarter.label}
                                        </div>

                                        <div
                                            className={`text-xs ${
                                                quarterNumber === quarter.value
                                                    ? "text-white/80"
                                                    : "text-slate-500"
                                            }`}
                                        >
                                            {quarter.helper}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
