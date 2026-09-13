"use client"

import { cn } from "@/lib/utils"
import type { Conversation } from "@/lib/mock-data"
import { AnimalAvatar } from "@/components/chat/animal-avatar"

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-card"

const HOVER_TRANSITION =
  "[transition-property:background-color] [transition-duration:120ms] [transition-timing-function:ease]"

export function ChatListRow({
  conversation,
  selected,
  onSelect,
  forceHover = false,
}: {
  conversation: Conversation
  selected: boolean
  onSelect: () => void
  /** Demo-only: renders the hover treatment without a real pointer hover. Used on /states. */
  forceHover?: boolean
}) {
  const { name, preview, timestamp, unread, initials, avatarId, online } = conversation

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={cn(
        "relative flex h-16 w-full shrink-0 items-center gap-3 px-4 text-left",
        HOVER_TRANSITION,
        selected ? "bg-accent" : "bg-card",
        !selected && !forceHover && "hover:bg-[#F0EDE8]",
        !selected && forceHover && "bg-[#F0EDE8]",
        FOCUS_RING
      )}
    >
      {selected && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-0.5 bg-primary"
        />
      )}

      <AnimalAvatar userId={avatarId} name={name} initials={initials} size="lg" online={online} />

      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-baseline justify-between gap-2">
          <span
            className={cn(
              "truncate text-base leading-6 text-foreground",
              selected || unread ? "font-semibold" : "font-normal"
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
