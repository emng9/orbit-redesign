"use client"

import { useRouter } from "next/navigation"
import {
  Calendar,
  CheckSquare,
  Clock,
  Compass,
  CreditCard,
  Home,
  LogOut,
  Megaphone,
  MessageSquare,
  Package,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { currentUser } from "@/lib/mock-data"
import { AnimalAvatar } from "@/components/chat/animal-avatar"

type NavItem = {
  id: string
  label: string
  icon: LucideIcon
  badge?: number
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "tasks", label: "Tasks", icon: CheckSquare, badge: 3 },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "activity", label: "Activity", icon: Clock },
  { id: "team", label: "Team", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "packages", label: "Packages", icon: Package },
]

type MobileNavItem = {
  id: string
  label: string
  icon?: LucideIcon
  badge?: number
  hideLabel?: boolean
}

// The bottom bar has its own five items — Orbit in the centre uses the brand
// logomark rather than a lucide icon or the user's avatar.
const MOBILE_ITEMS: MobileNavItem[] = [
  { id: "chat", label: "Chats", icon: MessageSquare },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "orbit", label: "Orbit", hideLabel: true },
  { id: "discover", label: "Discover", icon: Compass },
  { id: "settings", label: "Settings", icon: Settings },
]

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-card"

const HOVER_TRANSITION =
  "[transition-property:background-color] [transition-duration:120ms] [transition-timing-function:ease]"

function Logomark() {
  return (
    <div aria-hidden="true" className="mb-2 flex size-7 shrink-0 items-center justify-center">
      <Image
        src="/brand/orbit-logo.png"
        alt=""
        width={28}
        height={28}
        className="size-full rounded-lg object-cover"
      />
    </div>
  )
}

function NavButton({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon
  return (
    <button
      type="button"
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center rounded-full",
        HOVER_TRANSITION,
        active
          ? "bg-accent text-primary"
          : "text-foreground hover:bg-[#F0EDE8]",
        FOCUS_RING
      )}
    >
      <Icon size={20} strokeWidth={1.5} />
      {typeof item.badge === "number" && item.badge > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold leading-none text-primary-foreground"
        >
          {item.badge}
        </span>
      )}
    </button>
  )
}

function MobileNavButton({ item, active }: { item: MobileNavItem; active: boolean }) {
  const Icon = item.icon

  // No label to balance against, so this item centres on the full height of
  // the bar rather than sharing the icon-row position the labelled items use.
  if (item.hideLabel) {
    return (
      <button
        type="button"
        aria-label={item.label}
        aria-current={active ? "page" : undefined}
        className={cn("flex flex-1 items-center justify-center", FOCUS_RING)}
      >
        <span className="relative size-8 shrink-0 -translate-y-[7.5px] overflow-hidden rounded-md">
          <Image
            src="/brand/orbit-logo.png"
            alt=""
            width={44}
            height={44}
            className="absolute top-1/2 left-1/2 size-11 -translate-x-1/2 -translate-y-1/2 object-cover"
          />
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-1 py-1.5",
        FOCUS_RING
      )}
    >
      <span
        className={cn(
          "relative flex size-9 items-center justify-center rounded-lg",
          active && "bg-accent"
        )}
      >
        {Icon && <Icon size={24} strokeWidth={1.5} className={active ? "text-primary" : "text-[#5C6B79]"} />}
        {typeof item.badge === "number" && item.badge > 0 && (
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold leading-none text-primary-foreground"
          >
            {item.badge}
          </span>
        )}
      </span>
      <span
        className={cn(
          "text-[11px] leading-none",
          active ? "text-primary" : "text-[#5C6B79]"
        )}
      >
        {item.label}
      </span>
    </button>
  )
}

export function LeftRail({ activeId = "chat" }: { activeId?: string }) {
  const router = useRouter()

  function handleSignOut() {
    window.localStorage.removeItem("orbit-authenticated")
    router.push("/login")
  }

  return (
    <>
      <nav
        aria-label="Primary"
        className="hidden h-full w-14 shrink-0 flex-col items-center justify-between border-r border-border bg-card py-4 md:flex"
      >
        <div className="flex flex-col items-center gap-1">
          <Logomark />
          {NAV_ITEMS.map((item) => (
            <NavButton key={item.id} item={item} active={item.id === activeId} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          <AnimalAvatar
            userId={currentUser.id}
            name={currentUser.name}
            initials={currentUser.initials}
            size="md"
            online
          />
          <button
            type="button"
            aria-label="Sign out"
            onClick={handleSignOut}
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-[#F0EDE8]",
              HOVER_TRANSITION,
              FOCUS_RING
            )}
          >
            <LogOut size={20} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-stretch border-t border-border bg-card md:hidden"
      >
        {MOBILE_ITEMS.map((item) => (
          <MobileNavButton key={item.id} item={item} active={item.id === activeId} />
        ))}
      </nav>
    </>
  )
}
