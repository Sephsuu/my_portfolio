"use client"

import { ArrowRight } from "lucide-react"

import { PlaygroundSidebar } from "@/components/custom/PlaygroundSidebar"
import { AppButton } from "@/components/shared/AppButton"
import { AppTextarea } from "@/components/shared/AppTextarea"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ResumeUploadCard } from "@/features/playground/resume_aligner/ResumeUploadCard"
import { useState } from "react"

export function ResumeAlignerPage() {
	const [resume, setResume] = useState<File | null>(null)
	const [jobDescription, setJobDescription] = useState("")

	return (
		<main className="flex min-h-dvh w-full overflow-hidden bg-background text-foreground">
			<PlaygroundSidebar />
			<SidebarInset className="min-w-0 bg-background">
				<header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur sm:px-6">
					<SidebarTrigger className="size-9" />
					<div>
						<h1 className="text-sm font-semibold">Resume Aligner</h1>
						<p className="text-xs text-muted-foreground">Tailor your application to the role</p>
					</div>
				</header>

				<div className="min-h-0 flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8">
					<section className="mx-auto w-full max-w-3xl pb-12 pt-10 lg:pt-16">
						<div className="rounded-3xl border bg-card p-5 shadow-[0_24px_70px_-40px_color-mix(in_oklab,var(--primary)_45%,transparent)] sm:p-8">
							<div className="space-y-6">
								<ResumeUploadCard 
									file={resume} 
									onFileChange={setResume} 
								/>
								<AppTextarea
									label="Job description"
									value={jobDescription}
									rows={7}
									placeholder="Paste the job description here..."
									textareaClassName="resize-none bg-background"
									onChange={(event) => setJobDescription(event.target.value)}
								/>
								<AppButton
									type="button"
									className="h-11 w-full"
									disabled={!resume || !jobDescription.trim()}
								>
									Align my resume <ArrowRight className="size-4" />
								</AppButton>
								<p className="text-center text-xs text-muted-foreground">Analysis functionality will be connected in the next step.</p>
							</div>
						</div>
					</section>
				</div>
			</SidebarInset>
		</main>
	)
}
