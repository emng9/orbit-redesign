"use client"

import { useEffect, useState } from "react"
import {
  ArrowLeft,
  CircleAlert,
  MoreVertical,
  Phone,
  Search,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { conversations, fetchThread, type Message } from "@/lib/mock-data"
import { MessageRow } from "@/components/chat/message-row"
import { Composer } from "@/components/chat/composer"

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-background"

function HeaderIconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex size-8 items-center justify-center rounded-lg text-[#5C6B79] transition-colors",
        disabled
          ? "cursor-not-allowed bg-[#F1EFE8] text-[#9E9A90]"
          : "hover:bg-[#F0EDE8] hover:text-foreground",
        FOCUS_RING
      )}
    >
      {children}
    </button>
  )
}

function MessageSkeletonRow({ wide }: { wide: boolean }) {
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
}: {
  conversationId: string
  onBack?: () => void
}) {
  const conversation = conversations.find((c) => c.id === conversationId)
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading")
  const [messages, setMessages] = useState<Message[]>([])
  const [retryToken, setRetryToken] = useState(0)

  // Reset to "loading" during render when the conversation changes, rather
  // than from inside the effect below (see: adjusting state on prop change).
  const [loadedFor, setLoadedFor] = useState(conversationId)
  if (loadedFor !== conversationId) {
    setLoadedFor(conversationId)
    setStatus("loading")
  }

  useEffect(() => {
    let cancelled = false
    fetchThread(conversationId)
      .then((thread) => {
        if (cancelled) return
        setMessages(thread)
        setStatus("ready")
      })
      .catch(() => {
        if (cancelled) return
        setStatus("error")
      })
    return () => {
      cancelled = true
    }
  }, [conversationId, retryToken])

  function handleSend(text: string) {
    const now = new Date()
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${now.getTime()}`,
        authorId: "me",
        authorName: "You",
        initials: "Y",
        text,
        timestamp: now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      },
    ])
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
              "flex size-8 shrink-0 items-center justify-center rounded-lg text-foreground hover:bg-[#F0EDE8] md:hidden",
              FOCUS_RING
            )}
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
        )}
        <h2 className="min-w-0 flex-1 truncate text-base font-semibold leading-6 text-foreground">
          {conversation?.name ?? "Conversation"}
        </h2>
        <div className="flex shrink-0 items-center gap-1">
          <HeaderIconButton label="Search in conversation">
            <Search size={20} strokeWidth={1.5} />
          </HeaderIconButton>
          <HeaderIconButton label="Start call (unavailable in this preview)" disabled>
            <Phone size={20} strokeWidth={1.5} />
          </HeaderIconButton>
          <HeaderIconButton label="More options">
            <MoreVertical size={20} strokeWidth={1.5} />
          </HeaderIconButton>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
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

          {status === "error" && (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <CircleAlert size={20} className="text-[#5C6B79]" strokeWidth={1.5} />
              <p className="text-sm text-[#4A5A6A]">Couldn&apos;t load this conversation.</p>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setStatus("loading")
                  setRetryToken((t) => t + 1)
                }}
              >
                Try again
              </Button>
            </div>
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
                return (
                  <MessageRow
                    key={message.id}
                    message={message}
                    showHeader={newGroup}
                    newGroup={newGroup}
                  />
                )
              })
            ))}
        </div>
      </ScrollArea>

      <Composer onSend={handleSend} />
    </div>
  )
}
