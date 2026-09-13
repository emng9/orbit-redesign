"use client"

import { useRef, useState } from "react"
import { ChevronDown, Phone, Video } from "lucide-react"
import { cn } from "@/lib/utils"

const CLOSE_DELAY_MS = 200

const HOVER_TRANSITION =
  "[transition-property:background-color] [transition-duration:120ms] [transition-timing-function:ease]"

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-card"

const MENU_ITEMS = [
  { id: "video", label: "Video call", icon: Video },
  { id: "audio", label: "Audio call", icon: Phone },
]

export function VideoMenu() {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  function scheduleClose() {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS)
  }

  function closeNow() {
    cancelClose()
    setOpen(false)
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    const next = event.relatedTarget as Node | null
    if (!next || !containerRef.current?.contains(next)) {
      closeNow()
    }
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      cancelClose()
      setOpen(true)
    } else if (event.key === "Escape") {
      closeNow()
      triggerRef.current?.focus()
    }
  }

  function handleMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      closeNow()
      triggerRef.current?.focus()
    }
  }

  return (
    <div ref={containerRef} className="relative" onBlur={handleBlur}>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Video call options"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          cancelClose()
          setOpen(true)
        }}
        onMouseEnter={() => {
          cancelClose()
          setOpen(true)
        }}
        onMouseLeave={scheduleClose}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "flex items-center gap-1 rounded-lg p-1",
          HOVER_TRANSITION,
          open ? "bg-[#F0EDE8] text-foreground" : "text-[#5C6B79] hover:bg-[#F0EDE8]",
          FOCUS_RING
        )}
      >
        <Video size={20} strokeWidth={1.5} />
        <ChevronDown size={16} strokeWidth={1.5} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Call options"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          onKeyDown={handleMenuKeyDown}
          className="absolute top-[calc(100%+8px)] right-0 z-50 w-44 rounded-[10px] border border-border bg-card py-1 shadow-[0_1px_2px_rgba(11,31,51,0.06)]"
        >
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                onClick={closeNow}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2 text-left text-[15px] text-foreground hover:bg-[#F0EDE8]",
                  HOVER_TRANSITION,
                  FOCUS_RING
                )}
              >
                <Icon size={20} strokeWidth={1.5} className="shrink-0 text-[#5C6B79]" />
                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
