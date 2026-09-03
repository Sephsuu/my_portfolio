"use client";

import { ArrowRight } from "lucide-react";

import { PlaygroundSidebar } from "@/components/custom/PlaygroundSidebar";
import { AppButton } from "@/components/shared/AppButton";
import { AppTextarea } from "@/components/shared/AppTextarea";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ResumeUploadCard } from "@/features/playground/resume_aligner/ResumeUploadCard";
import { ResumeMatchResults } from "@/features/playground/resume_aligner/ResumeMatchResults";
import { AlignedResumePreview } from "@/features/playground/resume_aligner/AlignedResumePreview";
import { useRef, useState } from "react";
import { RequestClientError } from "@/lib/http/request-client";
import {
    resumeAlignerService,
    type ResumeMatchResult,
} from "@/service/resume-aligner.service";

export function ResumeAlignerPage() {
    const [resume, setResume] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isAligning, setIsAligning] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [result, setResult] = useState<ResumeMatchResult | null>(null);
    const [versions, setVersions] = useState<number[]>([]);
    const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    function clearResults() {
        setResult(null);
        setVersions([]);
        setSelectedVersion(null);
        setError(null);
    }

    async function handleAlignResume() {
        if (!resume || !jobDescription.trim() || isProcessing) return;

        setIsProcessing(true);
        setResult(null);
        setVersions([]);
        setSelectedVersion(null);
        setError(null);

        try {
            const matchResult = await resumeAlignerService.matchResume(
                resume,
                jobDescription,
            );
            setResult(matchResult);
            window.setTimeout(() => {
                resultsRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 0);
        } catch (requestError) {
            setError(
                requestError instanceof RequestClientError ||
                    requestError instanceof Error
                    ? requestError.message
                    : "Unable to process the resume and job description.",
            );
        } finally {
            setIsProcessing(false);
        }
    }

    async function handleGenerateAlignedResume() {
        if (!result || isAligning) return;

        setIsAligning(true);
        setError(null);

        try {
            const aligned = await resumeAlignerService.alignResume(
                result.resume_id,
            );
            setVersions((current) =>
                Array.from(new Set([...current, aligned.version_number])).sort(
                    (a, b) => a - b,
                ),
            );
            setSelectedVersion(aligned.version_number);
            window.setTimeout(() => {
                previewRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 0);
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to generate the aligned resume.",
            );
        } finally {
            setIsAligning(false);
        }
    }

    async function handleDownloadResume() {
        if (!result || !selectedVersion || isDownloading) return;

        setIsDownloading(true);
        setError(null);

        try {
            await resumeAlignerService.downloadResume(
                result.resume_id,
                selectedVersion,
            );
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to download the aligned resume.",
            );
        } finally {
            setIsDownloading(false);
        }
    }

    return (
        <main className="flex min-h-dvh w-full overflow-hidden bg-background text-foreground">
            <PlaygroundSidebar />
            <SidebarInset className="min-w-0 bg-background">
                <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur sm:px-6">
                    <SidebarTrigger className="size-9" />
                    <div>
                        <h1 className="text-sm font-semibold">
                            Resume Aligner
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Tailor your application to the role
                        </p>
                    </div>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-5xl space-y-8 pb-12 pt-10 lg:pt-16">
                        <section className="mx-auto max-w-3xl">
                            <div className="rounded-3xl border bg-card p-5 shadow-[0_24px_70px_-40px_color-mix(in_oklab,var(--primary)_45%,transparent)] sm:p-8">
                                <div className="space-y-6">
                                    <ResumeUploadCard
                                        file={resume}
                                        onFileChange={(file) => {
                                            setResume(file);
                                            clearResults();
                                        }}
                                    />
                                    <AppTextarea
                                        label="Job description"
                                        value={jobDescription}
                                        rows={7}
                                        maxLength={50_000}
                                        placeholder="Paste the job description here..."
                                        textareaClassName="resize-none bg-background"
                                        onChange={(event) => {
                                            setJobDescription(
                                                event.target.value,
                                            );
                                            clearResults();
                                        }}
                                    />
                                    <AppButton
                                        type="button"
                                        className="h-11 w-full"
                                        disabled={
                                            !resume || !jobDescription.trim()
                                        }
                                        onProcess={isProcessing}
                                        loadingLabel="Matching resume..."
                                        onClick={() => void handleAlignResume()}
                                    >
                                        Align my resume{" "}
                                        <ArrowRight className="size-4" />
                                    </AppButton>
                                </div>
                            </div>
                        </section>
                        {error ? (
                            <p
                                className="mx-auto max-w-3xl rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive"
                                role="alert"
                            >
                                {error}
                            </p>
                        ) : null}
                        {result ? (
                            <div ref={resultsRef} className="scroll-mt-24">
                                <ResumeMatchResults
                                    result={result}
                                    onAlign={() =>
                                        void handleGenerateAlignedResume()
                                    }
                                    isAligning={isAligning}
                                />
                            </div>
                        ) : null}
                        {result && selectedVersion ? (
                            <div ref={previewRef} className="scroll-mt-24">
                                <AlignedResumePreview
                                    resumeId={result.resume_id}
                                    versions={versions}
                                    selectedVersion={selectedVersion}
                                    onVersionChange={setSelectedVersion}
                                    onRegenerate={() =>
                                        void handleGenerateAlignedResume()
                                    }
                                    onDownload={() =>
                                        void handleDownloadResume()
                                    }
                                    isAligning={isAligning}
                                    isDownloading={isDownloading}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </SidebarInset>
        </main>
    );
}
