"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import { ChevronDown } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export type AppSidebarItem = {
  title: string
  href?: string
  icon?: LucideIcon
  badge?: number | string
  children?: AppSidebarItem[]
}

type AppSidebarProps = {
  items?: AppSidebarItem[]
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

const normalizePath = (path: string) => path === "/" ? path : path.replace(/\/+$/, "")

export function AppSidebar({ items = [], header, footer, className }: AppSidebarProps) {
  const pathname = normalizePath(usePathname())
  const isActive = (href?: string) => {
    if (!href) return false
    const target = normalizePath(href)
    return pathname === target || (target !== "/" && pathname.startsWith(`${target}/`))
  }
  const isGroupActive = (item: AppSidebarItem) =>
    isActive(item.href) || Boolean(item.children?.some((child) => isActive(child.href)))

  return (
    <Sidebar className={className} collapsible="icon" variant="floating">
      {header ? <SidebarHeader>{header}</SidebarHeader> : null}
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon
            const children = item.children ?? []
            if (children.length > 0) {
              return (
                <Collapsible key={item.title} defaultOpen={isGroupActive(item)} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} isActive={isGroupActive(item)}>
                        {Icon ? <Icon /> : null}<span>{item.title}</span>
                        {item.badge !== undefined ? <AppSidebarBadge>{item.badge}</AppSidebarBadge> : null}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {children.map((child) => {
                          const ChildIcon = child.icon
                          return (
                            <SidebarMenuSubItem key={child.href ?? child.title}>
                              <SidebarMenuSubButton asChild isActive={isActive(child.href)}>
                                <Link href={child.href ?? "#"}>
                                  {ChildIcon ? <ChildIcon /> : null}<span>{child.title}</span>
                                  {child.badge !== undefined ? <span className="ml-auto text-xs text-muted-foreground">{child.badge}</span> : null}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            }
            return (
              <SidebarMenuItem key={item.href ?? item.title}>
                <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.title}>
                  <Link href={item.href ?? "#"}>
                    {Icon ? <Icon /> : null}<span>{item.title}</span>
                    {item.badge !== undefined ? <AppSidebarBadge>{item.badge}</AppSidebarBadge> : null}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      {footer ? <SidebarFooter>{footer}</SidebarFooter> : null}
    </Sidebar>
  )
}

function AppSidebarBadge({ children }: { children: React.ReactNode }) {
  return <span className="ml-auto rounded-full bg-primary px-1.5 text-xs text-primary-foreground">{children}</span>
}
