"use client"

import Link from "next/link"
import { FileUser, House, Sparkles } from "lucide-react"

import { AppSidebar, type AppSidebarItem } from "@/components/shared/AppSidebar"

const playgroundItems: AppSidebarItem[] = [
  { title: "Home", href: "/", icon: House },
  { title: "Sephsuu AI", href: "/playground", icon: Sparkles },
  { title: "Resume Aligner", href: "/resume-aligner", icon: FileUser },
]

export function PlaygroundSidebar() {
  return (
    <AppSidebar
      items={playgroundItems}
      header={
        <Link href="/playground" className="flex items-center gap-2 px-2 py-1.5">
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            Sephsuu AI
          </span>
        </Link>
      }
      footer={
        <p className="px-2 text-xs leading-5 text-muted-foreground group-data-[collapsible=icon]:hidden">
          Ask about Joseph&apos;s work, skills, and experience.
        </p>
      }
    />
  )
}
