import {
    Download,
    ExternalLink,
    Eye,
    FileCheck2,
    RefreshCw,
} from "lucide-react";

import { AppButton } from "@/components/shared/AppButton";
import { AppSelect } from "@/components/shared/AppSelect";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
    open: boolean;
    onOpenChange: (open: boolean) => void;
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
    open,
    onOpenChange,
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
        <>
            <section className="flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                        <FileCheck2 className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                        <h2 className="font-semibold">Aligned resume ready</h2>
                        <p className="text-sm text-muted-foreground">
                            Version {selectedVersion} is ready to preview or
                            download.
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <AppButton
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(true)}
                    >
                        <Eye className="size-4" />
                        Preview
                    </AppButton>
                    <AppButton
                        type="button"
                        onClick={onDownload}
                        onProcess={isDownloading}
                        loadingLabel="Downloading..."
                    >
                        <Download className="size-4" />
                        Download PDF
                    </AppButton>
                </div>
            </section>

            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)] grid-rows-[auto_auto_minmax(0,1fr)] gap-0 overflow-hidden p-0 sm:max-w-6xl">
                    <DialogHeader className="border-b px-5 py-4 pr-14">
                        <DialogTitle id="aligned-preview-title">
                            Aligned resume preview
                        </DialogTitle>
                        <DialogDescription>
                            Reviewing Version {selectedVersion}. Generate
                            another version without replacing earlier ones.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 border-b bg-muted/40 p-3 sm:flex-row sm:items-end sm:justify-between">
                        <AppSelect
                            label="Version"
                            value={String(selectedVersion)}
                            items={versionItems}
                            className="w-full sm:w-40"
                            onChange={(value) => onVersionChange(Number(value))}
                        />
                        <div className="flex flex-wrap gap-2">
                            <AppButton asChild variant="outline" size="sm">
                                <a
                                    href={previewUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <ExternalLink className="size-4" />
                                    Open in new tab
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
                    </div>

                    <div className="min-h-0 bg-muted/30 p-3 sm:p-5">
                        <iframe
                            key={previewUrl}
                            src={previewUrl}
                            title={`Aligned resume Version ${selectedVersion}`}
                            className="h-full w-full rounded-xl border bg-background"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
