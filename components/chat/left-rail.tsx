"use client"

import {
  Calendar,
  CheckSquare,
  Home,
  MessageSquare,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  id: string
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "team", label: "Team", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
]

// The bottom bar keeps five items so it stays comfortably tappable at 375px.
const MOBILE_NAV_ITEMS = NAV_ITEMS.filter((item) => item.id !== "settings")

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-card"

function NavButton({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon
  return (
    <button
      type="button"
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
        active
          ? "bg-accent text-primary"
          : "text-foreground hover:bg-[#F0EDE8]",
        FOCUS_RING
      )}
    >
      <Icon size={20} strokeWidth={1.5} />
    </button>
  )
}

export function LeftRail({ activeId = "chat" }: { activeId?: string }) {
  return (
    <>
      <nav
        aria-label="Primary"
        className="hidden w-14 shrink-0 flex-col items-center gap-2 border-r border-border bg-card py-4 md:flex"
      >
        {NAV_ITEMS.map((item) => (
          <NavButton key={item.id} item={item} active={item.id === activeId} />
        ))}
      </nav>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-around border-t border-border bg-card md:hidden"
      >
        {MOBILE_NAV_ITEMS.map((item) => (
          <NavButton key={item.id} item={item} active={item.id === activeId} />
        ))}
      </nav>
    </>
  )
}
