"use client"

import { useRef, useState } from "react"
import { FileCheck2, FileText, Trash2, UploadCloud } from "lucide-react"

import { AppButton } from "@/components/shared/AppButton"
import { cn } from "@/lib/utils"

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const MAX_FILE_SIZE = 10 * 1024 * 1024

function formatFileSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export function ResumeUploadCard({
  file,
  onFileChange,
}: {
  file: File | null
  onFileChange: (file: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function selectFile(nextFile?: File) {
    if (!nextFile) return
    if (!ACCEPTED_TYPES.includes(nextFile.type)) {
      setError("Please upload a PDF, DOC, or DOCX file.")
      return
    }
    if (nextFile.size > MAX_FILE_SIZE) {
      setError("Your resume must be 10 MB or smaller.")
      return
    }
    setError(null)
    onFileChange(nextFile)
  }

  if (file) {
    return (
      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-primary">
            <FileCheck2 className="size-6" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-card-foreground">{file.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{formatFileSize(file.size)} · Ready to align</p>
          </div>
          <AppButton
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Remove uploaded resume"
            title="Remove resume"
            className="shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => onFileChange(null)}
          >
            <Trash2 className="size-4" />
          </AppButton>
        </div>
      </div>
    )
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept=".pdf,.doc,.docx"
        onChange={(event) => selectFile(event.target.files?.[0])}
      />
      <button
        type="button"
        className={cn(
          "group flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-border bg-card px-6 py-10 text-center shadow-sm transition-all hover:border-primary/40 hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragging && "border-primary bg-accent/50"
        )}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => { event.preventDefault(); setIsDragging(true) }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          selectFile(event.dataTransfer.files[0])
        }}
      >
        <span className="grid size-14 place-items-center rounded-2xl bg-accent text-primary transition-transform group-hover:-translate-y-0.5">
          <UploadCloud className="size-7" aria-hidden="true" />
        </span>
        <span className="mt-5 font-semibold text-foreground">Drop your resume here</span>
        <span className="mt-1 text-sm text-muted-foreground">or click to browse your files</span>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
          <FileText className="size-3.5" aria-hidden="true" /> PDF, DOC, or DOCX · Max 10 MB
        </span>
      </button>
      {error ? <p className="mt-2 text-sm text-destructive" role="alert">{error}</p> : null}
    </div>
  )
}
