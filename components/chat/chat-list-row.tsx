"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Conversation } from "@/lib/mock-data"

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-card"

export function ChatListRow({
  conversation,
  selected,
  onSelect,
}: {
  conversation: Conversation
  selected: boolean
  onSelect: () => void
}) {
  const { name, preview, timestamp, unread, initials } = conversation

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={cn(
        "relative flex h-16 w-full shrink-0 items-center gap-3 px-4 text-left transition-colors",
        selected ? "bg-accent" : "bg-card hover:bg-[#F0EDE8]",
        FOCUS_RING
      )}
    >
      {selected && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-0.5 bg-primary"
        />
      )}

      <Avatar size="lg" role="img" aria-label={name}>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-baseline justify-between gap-2">
          <span
            className={cn(
              "truncate text-base leading-6",
              selected
                ? "font-semibold text-primary"
                : unread
                  ? "font-semibold text-foreground"
                  : "font-normal text-foreground"
            )}
          >
            {name}
          </span>
          <span className="shrink-0 text-xs leading-4 text-[#5C6B79]">
            {timestamp}
          </span>
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              "truncate text-[13px] leading-5",
              unread ? "text-foreground" : "text-[#4A5A6A]"
            )}
          >
            {preview}
          </span>
          {unread && (
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-primary"
            />
          )}
        </span>
      </span>

      {unread && <span className="sr-only">Unread</span>}
    </button>
  )
}
