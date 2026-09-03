import {
    CheckCircle2,
    CircleAlert,
    CircleMinus,
    SearchCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { AppButton } from "@/components/shared/AppButton";
import { cn } from "@/lib/utils";
import type {
    QualificationMatch,
    ResumeMatchResult,
    ResumeMatchStatus,
} from "@/service/resume-aligner.service";

const statusDetails: Record<
    ResumeMatchStatus,
    { label: string; icon: typeof CheckCircle2; className: string }
> = {
    EXACT_MATCH: {
        label: "Exact match",
        icon: CheckCircle2,
        className: "border-primary/20 bg-primary/10 text-primary",
    },
    RELATED: {
        label: "Related",
        icon: SearchCheck,
        className: "border-secondary bg-secondary text-secondary-foreground",
    },
    WEAK_EVIDENCE: {
        label: "Weak evidence",
        icon: CircleAlert,
        className: "border-accent bg-accent text-accent-foreground",
    },
    NO_EVIDENCE: {
        label: "No evidence",
        icon: CircleMinus,
        className: "border-border bg-muted text-muted-foreground",
    },
};

function MatchDetail({ match }: { match: QualificationMatch }) {
    const details = statusDetails[match.status];
    const Icon = details.icon;

    return (
        <article className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-semibold text-card-foreground">
                    {match.requirement}
                </h3>
                <Badge
                    variant="outline"
                    className={cn("gap-1.5", details.className)}
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
                                className="rounded-lg border bg-background px-2.5 py-1 text-xs text-foreground"
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
    isAligning,
}: {
    result: ResumeMatchResult;
    onAlign: () => void;
    isAligning: boolean;
}) {
    const score = Math.min(100, Math.max(0, result.match_score));

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
                            className="text-primary"
                        />
                    </svg>
                    <div>
                        <span className="text-3xl font-bold text-foreground">
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
                <AppButton
                    type="button"
                    className="w-full sm:w-auto"
                    onClick={onAlign}
                    onProcess={isAligning}
                    loadingLabel="Generating..."
                >
                    Generate aligned resume
                </AppButton>
            </div>

            {result.matches.length > 0 ? (
                <div className="grid gap-4">
                    {result.matches.map((match, index) => (
                        <MatchDetail
                            key={`${match.requirement}-${index}`}
                            match={match}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">
                    No requirements were identified in the job description.
                </div>
            )}
        </section>
    );
}
