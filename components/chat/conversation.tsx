"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, MoreHorizontal, Search, Users } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { conversations, currentUser, fetchThread, needsDateDivider, formatDividerLabel, type Message, type Reaction } from "@/lib/mock-data"
import { MessageRow } from "@/components/chat/message-row"
import { DateDivider } from "@/components/chat/date-divider"
import { Composer } from "@/components/chat/composer"
import { VideoMenu } from "@/components/chat/video-menu"
import { MemberPopover } from "@/components/chat/member-popover"

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const HOVER_TRANSITION =
  "[transition-property:background-color] [transition-duration:120ms] [transition-timing-function:ease]"

function HeaderIconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "flex size-7 items-center justify-center rounded-lg text-[#5C6B79] hover:bg-[#F0EDE8]",
        HOVER_TRANSITION,
        FOCUS_RING
      )}
    >
      {children}
    </button>
  )
}

const MOBILE_MENU_ITEM =
  "flex w-full items-center gap-3 px-3 py-2 text-left text-[15px] text-foreground hover:bg-[#F0EDE8]"

/**
 * Below 768px the header only has room for the back arrow, the name, the
 * video control, and this button — member count and search move in here as
 * labelled items so the name keeps the remaining width instead of truncating
 * early.
 */
function MobileMoreMenu({ participantCount }: { participantCount: number }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  function close() {
    setOpen(false)
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    const next = event.relatedTarget as Node | null
    if (!next || !containerRef.current?.contains(next)) close()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") close()
  }

  return (
    <div ref={containerRef} className="relative" onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <button
        type="button"
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full text-[#5C6B79] hover:bg-[#F0EDE8]",
          HOVER_TRANSITION,
          FOCUS_RING
        )}
      >
        <MoreHorizontal size={20} strokeWidth={1.5} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Conversation options"
          className="absolute top-[calc(100%+8px)] right-0 z-50 w-56 rounded-[10px] border border-border bg-card py-1 shadow-[0_1px_2px_rgba(11,31,51,0.06)]"
        >
          <button type="button" role="menuitem" onClick={close} className={cn(MOBILE_MENU_ITEM, HOVER_TRANSITION, FOCUS_RING)}>
            <Users size={20} strokeWidth={1.5} className="shrink-0 text-[#5C6B79]" />
            <span className="flex-1">Members</span>
            <span className="text-[#5C6B79]">{participantCount}</span>
          </button>
          <button type="button" role="menuitem" onClick={close} className={cn(MOBILE_MENU_ITEM, HOVER_TRANSITION, FOCUS_RING)}>
            <Search size={20} strokeWidth={1.5} className="shrink-0 text-[#5C6B79]" />
            Search
          </button>
        </div>
      )}
    </div>
  )
}

export function MessageSkeletonRow({ wide }: { wide: boolean }) {
  return (
    <div className="mt-4 flex gap-3 px-6">
      <div className="size-8 shrink-0 rounded-full bg-[#EDEBE5]" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="h-3 w-1/4 rounded-sm bg-[#EDEBE5]" />
        <div className={cn("h-3 rounded-sm bg-[#EDEBE5]", wide ? "w-3/4" : "w-1/2")} />
      </div>
    </div>
  )
}

export function Conversation({
  conversationId,
  onBack,
  reactionsByMessage,
  onToggleReaction,
}: {
  conversationId: string
  onBack?: () => void
  /** Reaction overrides keyed by message id, owned by the chat page and seeded from mock data. */
  reactionsByMessage: Record<string, Reaction[]>
  onToggleReaction: (messageId: string, emoji: string, currentReactions: Reaction[]) => void
}) {
  const conversation = conversations.find((c) => c.id === conversationId)
  const [status, setStatus] = useState<"loading" | "ready">("loading")
  const [messages, setMessages] = useState<Message[]>([])
  const scrollWrapRef = useRef<HTMLDivElement>(null)

  // Reset to "loading" during render when the conversation changes, rather
  // than from inside the effect below (see: adjusting state on prop change).
  const [loadedFor, setLoadedFor] = useState(conversationId)
  if (loadedFor !== conversationId) {
    setLoadedFor(conversationId)
    setStatus("loading")
  }

  useEffect(() => {
    let cancelled = false
    fetchThread(conversationId).then((thread) => {
      if (cancelled) return
      setMessages(thread)
      setStatus("ready")
    })
    return () => {
      cancelled = true
    }
  }, [conversationId])

  function handleSend(text: string) {
    const now = new Date()
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${now.getTime()}`,
        authorId: currentUser.id,
        authorName: currentUser.name,
        initials: currentUser.initials,
        text,
        timestamp: now.toISOString(),
      },
    ])
    // Wait a frame so the new message is in the DOM and scrollHeight is current.
    requestAnimationFrame(() => {
      const viewport = scrollWrapRef.current?.querySelector('[data-slot="scroll-area-viewport"]')
      viewport?.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" })
    })
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-background pb-14 md:pb-0">
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card px-3 md:px-6">
        {onBack && (
          <button
            type="button"
            aria-label="Back to chats"
            onClick={onBack}
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-[#F0EDE8] md:hidden",
              HOVER_TRANSITION,
              FOCUS_RING
            )}
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
        )}
        <h2 className="min-w-0 flex-1 truncate text-base font-semibold leading-6 text-foreground">
          {conversation?.name ?? "Conversation"}
        </h2>
        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <MemberPopover count={conversation?.participantCount ?? 0} />
          <VideoMenu />
          <HeaderIconButton label="Search in conversation">
            <Search size={20} strokeWidth={1.5} />
          </HeaderIconButton>
          <HeaderIconButton label="More options">
            <MoreHorizontal size={20} strokeWidth={1.5} />
          </HeaderIconButton>
        </div>
        <div className="flex shrink-0 items-center gap-1 md:hidden">
          <VideoMenu />
          <MobileMoreMenu participantCount={conversation?.participantCount ?? 0} />
        </div>
      </div>

      <div ref={scrollWrapRef} className="min-h-0 flex-1">
        <ScrollArea className="size-full">
          <div
            role="log"
            aria-live="polite"
            aria-label={`Messages with ${conversation?.name ?? "conversation"}`}
            className="py-4"
          >
            {status === "loading" && (
              <>
                <MessageSkeletonRow wide />
                <MessageSkeletonRow wide={false} />
                <MessageSkeletonRow wide />
              </>
            )}

            {status === "ready" &&
              (messages.length === 0 ? (
                <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                  <p className="text-sm text-[#4A5A6A]">No messages yet. Say hello.</p>
                </div>
              ) : (
                messages.map((message, index) => {
                  const previous = messages[index - 1]
                  const newGroup = !previous || previous.authorId !== message.authorId
                  const showDivider = needsDateDivider(previous, message)
                  const reactions = reactionsByMessage[message.id] ?? message.reactions ?? []
                  return (
                    <div key={message.id}>
                      {showDivider && <DateDivider label={formatDividerLabel(message.timestamp)} />}
                      <MessageRow
                        message={message}
                        reactions={reactions}
                        onToggleReaction={(emoji) => onToggleReaction(message.id, emoji, reactions)}
                        showHeader={newGroup || showDivider}
                        newGroup={newGroup || showDivider}
                      />
                    </div>
                  )
                })
              ))}
          </div>
        </ScrollArea>
      </div>

      <Composer onSend={handleSend} />
    </div>
  )
}
