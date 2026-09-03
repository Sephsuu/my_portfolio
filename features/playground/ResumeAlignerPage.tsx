"use client";

import { ArrowRight, ClipboardCheck, FileInput } from "lucide-react";

import { PlaygroundSidebar } from "@/components/custom/PlaygroundSidebar";
import { AppButton } from "@/components/shared/AppButton";
import { AppTextarea } from "@/components/shared/AppTextarea";
import { AppTabSwitcher } from "@/components/shared/AppTabSwitcher";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ResumeUploadCard } from "@/features/playground/resume_aligner/ResumeUploadCard";
import { ResumeMatchResults } from "@/features/playground/resume_aligner/ResumeMatchResults";
import { AlignedResumePreview } from "@/features/playground/resume_aligner/AlignedResumePreview";
import { useState } from "react";
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
    const [selectedTab, setSelectedTab] = useState("input");
    const [previewOpen, setPreviewOpen] = useState(false);

    function clearResults() {
        setResult(null);
        setVersions([]);
        setSelectedVersion(null);
        setError(null);
        setSelectedTab("input");
        setPreviewOpen(false);
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
            setSelectedTab("qualification");
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
            setPreviewOpen(true);
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
                        <AppTabSwitcher
                            tabs={[
                                {
                                    key: "input",
                                    title: "Resume & Job",
                                    icon: FileInput,
                                },
                                {
                                    key: "qualification",
                                    title: "Qualification Check",
                                    icon: ClipboardCheck,
                                    disabled: !result,
                                },
                            ]}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            className="flex justify-center"
                        />

                        {selectedTab === "input" ? (
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
                                                Boolean(result) ||
                                                !resume ||
                                                !jobDescription.trim()
                                            }
                                            onProcess={isProcessing}
                                            loadingLabel="Matching resume..."
                                            onClick={() =>
                                                void handleAlignResume()
                                            }
                                        >
                                            {result
                                                ? "Qualification check complete"
                                                : "Align my resume"}{" "}
                                            <ArrowRight className="size-4" />
                                        </AppButton>
                                    </div>
                                </div>
                            </section>
                        ) : null}
                        {error ? (
                            <p
                                className="mx-auto max-w-3xl rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive"
                                role="alert"
                            >
                                {error}
                            </p>
                        ) : null}
                        {selectedTab === "qualification" && result ? (
                            <div className="space-y-8">
                                <ResumeMatchResults
                                    result={result}
                                    onAlign={() =>
                                        void handleGenerateAlignedResume()
                                    }
                                    onPreview={() => setPreviewOpen(true)}
                                    isAligning={isAligning}
                                    hasAlignedResume={Boolean(selectedVersion)}
                                />
                                {selectedVersion ? (
                                    <div>
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
                                            open={previewOpen}
                                            onOpenChange={setPreviewOpen}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </div>
            </SidebarInset>
        </main>
    );
}
