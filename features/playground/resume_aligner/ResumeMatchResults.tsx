"use client";

import {
    CheckCircle2,
    CircleAlert,
    CircleMinus,
    Eye,
    RefreshCw,
    SearchCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { AppButton } from "@/components/shared/AppButton";
import { AppTabSwitcher } from "@/components/shared/AppTabSwitcher";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import type {
    QualificationMatch,
    ResumeMatchResult,
    ResumeMatchStatus,
} from "@/service/resume-aligner.service";

const statusDetails: Record<
    ResumeMatchStatus,
    {
        label: string;
        icon: typeof CheckCircle2;
        badgeClassName: string;
        cardClassName: string;
        evidenceClassName: string;
    }
> = {
    EXACT_MATCH: {
        label: "Exact match",
        icon: CheckCircle2,
        badgeClassName: "border-darkgreen bg-darkgreen text-white",
        cardClassName: "border-darkgreen/60 bg-darkgreen/5",
        evidenceClassName: "border-darkgreen/25 bg-darkgreen/10",
    },
    RELATED: {
        label: "Related",
        icon: SearchCheck,
        badgeClassName: "border-darkolive bg-darkolive text-white",
        cardClassName: "border-darkolive/60 bg-darkolive/5",
        evidenceClassName: "border-darkolive/25 bg-darkolive/10",
    },
    WEAK_EVIDENCE: {
        label: "Weak evidence",
        icon: CircleAlert,
        badgeClassName: "border-darkyellow bg-darkyellow text-white",
        cardClassName: "border-darkyellow/60 bg-darkyellow/5",
        evidenceClassName: "border-darkyellow/25 bg-darkyellow/10",
    },
    NO_EVIDENCE: {
        label: "No evidence",
        icon: CircleMinus,
        badgeClassName: "border-darkred bg-darkred text-white",
        cardClassName: "border-darkred/60 bg-darkred/5",
        evidenceClassName: "border-darkred/25 bg-darkred/10",
    },
};

function MatchDetail({ match }: { match: QualificationMatch }) {
    const details = statusDetails[match.status];
    const Icon = details.icon;

    return (
        <article
            className={cn(
                "rounded-2xl border bg-card p-5 shadow-sm",
                details.cardClassName,
            )}
        >
            <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-semibold text-card-foreground">
                    {match.requirement}
                </h3>
                <Badge
                    variant="outline"
                    className={cn(
                        "gap-1.5 font-semibold",
                        details.badgeClassName,
                    )}
                >
                    <Icon className="size-3.5" aria-hidden="true" />
                    {details.label}
                </Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {match.explanation}
            </p>
            <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Resume evidence
                </p>
                {match.evidence.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {match.evidence.map((evidence, index) => (
                            <span
                                key={`${evidence}-${index}`}
                                className={cn(
                                    "rounded-lg border px-2.5 py-1 text-xs text-foreground",
                                    details.evidenceClassName,
                                )}
                            >
                                {evidence}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="mt-2 text-sm italic text-muted-foreground">
                        No supporting evidence found in the resume.
                    </p>
                )}
            </div>
        </article>
    );
}

export function ResumeMatchResults({
    result,
    onAlign,
    onPreview,
    isAligning,
    hasAlignedResume,
}: {
    result: ResumeMatchResult;
    onAlign: () => void;
    onPreview: () => void;
    isAligning: boolean;
    hasAlignedResume: boolean;
}) {
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const score = Math.min(100, Math.max(0, result.match_score));
    const scoreClassName =
        score >= 75
            ? "text-darkgreen"
            : score >= 50
              ? "text-darkolive"
              : score >= 25
                ? "text-darkyellow"
                : "text-darkred";
    const statusCounts = useMemo(
        () =>
            result.matches.reduce<Record<ResumeMatchStatus, number>>(
                (counts, match) => ({
                    ...counts,
                    [match.status]: counts[match.status] + 1,
                }),
                {
                    EXACT_MATCH: 0,
                    RELATED: 0,
                    WEAK_EVIDENCE: 0,
                    NO_EVIDENCE: 0,
                },
            ),
        [result.matches],
    );
    const statusTabs = [
        { key: "ALL", title: `All (${result.matches.length})` },
        {
            key: "EXACT_MATCH",
            title: `Exact (${statusCounts.EXACT_MATCH})`,
            activeClassName: "bg-darkgreen! text-white! hover:bg-darkgreen/90",
        },
        {
            key: "RELATED",
            title: `Related (${statusCounts.RELATED})`,
            activeClassName: "bg-darkolive! text-white! hover:bg-darkolive/90",
        },
        {
            key: "WEAK_EVIDENCE",
            title: `Weak (${statusCounts.WEAK_EVIDENCE})`,
            activeClassName:
                "bg-darkyellow! text-white! hover:bg-darkyellow/90",
        },
        {
            key: "NO_EVIDENCE",
            title: `No match (${statusCounts.NO_EVIDENCE})`,
            activeClassName: "bg-darkred! text-white! hover:bg-darkred/90",
        },
    ];
    const filteredMatches =
        selectedStatus === "ALL"
            ? result.matches
            : result.matches.filter((match) => match.status === selectedStatus);

    return (
        <section aria-labelledby="match-results-title" className="space-y-5">
            <div className="flex flex-col items-center gap-5 rounded-3xl border bg-card p-6 text-center shadow-sm sm:flex-row sm:text-left">
                <div className="relative grid size-28 shrink-0 place-items-center">
                    <svg
                        className="absolute inset-0 size-full -rotate-90"
                        viewBox="0 0 120 120"
                        aria-hidden="true"
                    >
                        <circle
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-muted"
                        />
                        <circle
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeLinecap="round"
                            pathLength="100"
                            strokeDasharray={`${score} 100`}
                            className={scoreClassName}
                        />
                    </svg>
                    <div>
                        <span
                            className={cn("text-3xl font-bold", scoreClassName)}
                        >
                            {score}
                        </span>
                        <span className="text-sm text-muted-foreground">%</span>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        Match score
                    </p>
                    <h2
                        id="match-results-title"
                        className="mt-1 text-2xl font-semibold"
                    >
                        Resume match details
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Based on {result.matches.length}{" "}
                        {result.matches.length === 1
                            ? "requirement"
                            : "requirements"}{" "}
                        identified in the job description.
                    </p>
                </div>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                    {hasAlignedResume ? (
                        <>
                            <AppButton
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto"
                                onClick={onAlign}
                                onProcess={isAligning}
                                loadingLabel="Generating..."
                            >
                                <RefreshCw className="size-4" />
                                Generate next version
                            </AppButton>
                            <AppButton
                                type="button"
                                className="w-full sm:w-auto"
                                onClick={onPreview}
                            >
                                <Eye className="size-4" />
                                View generated resume
                            </AppButton>
                        </>
                    ) : (
                        <AppButton
                            type="button"
                            className="w-full sm:w-auto"
                            onClick={onAlign}
                            onProcess={isAligning}
                            loadingLabel="Generating..."
                        >
                            Generate aligned resume
                        </AppButton>
                    )}
                </div>
            </div>

            {result.matches.length > 0 ? (
                <div className="space-y-4">
                    <AppTabSwitcher
                        tabs={statusTabs}
                        selectedTab={selectedStatus}
                        setSelectedTab={setSelectedStatus}
                    />
                    <div className="grid gap-4">
                        {filteredMatches.map((match, index) => (
                            <MatchDetail
                                key={`${match.requirement}-${index}`}
                                match={match}
                            />
                        ))}
                        {filteredMatches.length === 0 ? (
                            <div className="rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">
                                No qualifications in this category.
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : (
                <div className="rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">
                    No requirements were identified in the job description.
                </div>
            )}
        </section>
    );
}
