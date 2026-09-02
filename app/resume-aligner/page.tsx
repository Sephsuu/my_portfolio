import { ResumeAlignerPage } from "@/features/playground/ResumeAlignerPage"
import { SidebarProvider } from "@/components/ui/sidebar"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Resume Aligner | Sephsuu",
  description: "Upload your resume and align it with the role you want.",
}

export default function ResumeAlignerRoute() {
  return (
    <SidebarProvider>
      <ResumeAlignerPage />
    </SidebarProvider>
  )
}
