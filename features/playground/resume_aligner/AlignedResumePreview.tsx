import { Download, ExternalLink, RefreshCw } from "lucide-react";

import { AppButton } from "@/components/shared/AppButton";
import { AppSelect } from "@/components/shared/AppSelect";
import { resumeAlignerService } from "@/service/resume-aligner.service";

type AlignedResumePreviewProps = {
    resumeId: string;
    versions: number[];
    selectedVersion: number;
    onVersionChange: (version: number) => void;
    onRegenerate: () => void;
    onDownload: () => void;
    isAligning: boolean;
    isDownloading: boolean;
};

export function AlignedResumePreview({
    resumeId,
    versions,
    selectedVersion,
    onVersionChange,
    onRegenerate,
    onDownload,
    isAligning,
    isDownloading,
}: AlignedResumePreviewProps) {
    const previewUrl = resumeAlignerService.getPreviewUrl(
        resumeId,
        selectedVersion,
    );
    const versionItems = versions.map((version) => ({
        label: `Version ${version}`,
        value: String(version),
    }));

    return (
        <section
            aria-labelledby="aligned-preview-title"
            className="overflow-hidden rounded-3xl border bg-card shadow-sm"
        >
            <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        Aligned resume
                    </p>
                    <h2
                        id="aligned-preview-title"
                        className="mt-1 text-2xl font-semibold"
                    >
                        ATS-safe preview
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Review the generated version before downloading it.
                    </p>
                </div>
                <AppSelect
                    label="Version"
                    value={String(selectedVersion)}
                    items={versionItems}
                    className="w-full sm:w-36"
                    onChange={(value) => onVersionChange(Number(value))}
                />
            </div>

            <div className="flex flex-wrap gap-2 border-b bg-muted/40 p-3 sm:justify-end">
                <AppButton asChild variant="outline" size="sm">
                    <a href={previewUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="size-4" />
                        Open preview
                    </a>
                </AppButton>
                <AppButton
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onRegenerate}
                    onProcess={isAligning}
                    loadingLabel="Generating..."
                >
                    <RefreshCw className="size-4" />
                    Generate next version
                </AppButton>
                <AppButton
                    type="button"
                    size="sm"
                    onClick={onDownload}
                    onProcess={isDownloading}
                    loadingLabel="Downloading..."
                >
                    <Download className="size-4" />
                    Download PDF
                </AppButton>
            </div>

            <div className="bg-muted/30 p-3 sm:p-5">
                <iframe
                    key={previewUrl}
                    src={previewUrl}
                    title={`Aligned resume Version ${selectedVersion}`}
                    className="h-[70dvh] min-h-150 w-full rounded-xl border bg-background"
                />
            </div>
        </section>
    );
}
