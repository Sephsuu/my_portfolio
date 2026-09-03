import {
    downloadClientFile,
    requestClientData,
} from "@/lib/http/request-client";

export type ResumeMatchStatus =
    "EXACT_MATCH" | "RELATED" | "WEAK_EVIDENCE" | "NO_EVIDENCE";

export type QualificationMatch = {
    requirement: string;
    status: ResumeMatchStatus;
    evidence: string[];
    explanation: string;
};

export type ResumeMatchResult = {
    resume_id: string;
    matches: QualificationMatch[];
    match_score: number;
};

type AlignedPersonalInformation = {
    name: string | null;
    email: string | null;
    phone: string | null;
    location: string | null;
    linkedin: string | null;
    website: string | null;
};

export type AlignedResume = {
    personal_information: AlignedPersonalInformation;
    professional_summary: string | null;
    education: unknown[];
    skills: string[];
    experience: unknown[];
    projects: unknown[];
    certifications: unknown[];
};

export type AlignedResumeResult = {
    resume_id: string;
    version_number: number;
    aligned_resume: AlignedResume;
    preview_url: string;
    pdf_url: string;
};

class ResumeAlignerService {
    async matchResume(
        file: File,
        jobDescription: string,
    ): Promise<ResumeMatchResult> {
        const value = jobDescription.trim();

        if (!value) {
            throw new Error("Please enter a job description.");
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("job_description", value);

        return requestClientData<ResumeMatchResult>(
            "/api/resume-aligner/match",
            "POST",
            undefined,
            formData,
        );
    }

    async alignResume(resumeId: string): Promise<AlignedResumeResult> {
        return requestClientData<AlignedResumeResult>(
            `/api/resume-aligner/resume/${encodeURIComponent(resumeId)}/align`,
            "POST",
        );
    }

    getPreviewUrl(resumeId: string, version?: number) {
        const query = version ? `?version=${version}` : "";
        return `/api/resume-aligner/resume-preview/${encodeURIComponent(resumeId)}${query}`;
    }

    async downloadResume(resumeId: string, version?: number) {
        const query = version ? `?version=${version}` : "";
        return downloadClientFile(
            `/api/resume-aligner/resume/${encodeURIComponent(resumeId)}/pdf${query}`,
            `aligned-resume${version ? `-v${version}` : ""}.pdf`,
            {
                fallbackErrorMessage:
                    "The aligned resume PDF could not be downloaded.",
            },
        );
    }
}

export const resumeAlignerService = new ResumeAlignerService();
