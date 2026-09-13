"use client"

import { useEffect, useRef, useState } from "react"
import { Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { users } from "@/lib/mock-data"
import { AnimalAvatar } from "@/components/chat/animal-avatar"

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-card"

const HOVER_TRANSITION =
  "[transition-property:background-color] [transition-duration:120ms] [transition-timing-function:ease]"

export function MemberPopover({ count }: { count: number }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  function close() {
    setOpen(false)
  }

  // Click outside closes the popover.
  useEffect(() => {
    if (!open) return
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) close()
    }
    document.addEventListener("mousedown", handlePointerDown)
    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [open])

  // Escape closes and returns focus to the trigger. Tab/Shift+Tab traps
  // focus among the member rows while open.
  useEffect(() => {
    if (!open) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close()
        triggerRef.current?.focus()
        return
      }
      if (event.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>("button")
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  // Focus the first row when the popover opens.
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("button")?.focus()
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${count} members`}
        title={`${count} members`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-lg border border-border px-2 py-2",
          HOVER_TRANSITION,
          open ? "bg-[#F0EDE8]" : "bg-card hover:bg-[#F0EDE8]",
          FOCUS_RING
        )}
      >
        <Users size={20} strokeWidth={1.5} className={open ? "text-foreground" : "text-[#5C6B79]"} />
        <span className="text-[15px] font-semibold leading-none text-foreground">{count}</span>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Members"
          className="absolute top-[calc(100%+8px)] right-0 z-50 w-[280px] rounded-[10px] border border-border bg-card py-2 shadow-[0_1px_2px_rgba(11,31,51,0.06)]"
        >
          <div className="flex items-baseline gap-2 px-3 pb-2">
            <span className="text-[11px] font-semibold tracking-[0.06em] text-foreground uppercase">
              Members
            </span>
            <span className="text-[11px] font-semibold tracking-[0.06em] text-[#5C6B79]">{count}</span>
          </div>
          {users.map((user) => (
            <button
              key={user.id}
              type="button"
              aria-label={`${user.name}, ${user.role}`}
              className={cn(
                "flex h-12 w-full items-center gap-3 px-3 text-left",
                HOVER_TRANSITION,
                "hover:bg-[#F0EDE8]",
                FOCUS_RING
              )}
            >
              <AnimalAvatar
                userId={user.id}
                name={user.name}
                initials={user.initials}
                size="md"
                online={user.online}
                surface="card"
              />
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[15px] leading-5 text-foreground">{user.name}</span>
                <span className="truncate text-[13px] leading-4 text-[#5C6B79]">{user.role}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
