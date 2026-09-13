"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { MessageSquareOff, Plus, Search, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { conversations, type Conversation } from "@/lib/mock-data"
import { ChatListRow } from "@/components/chat/chat-list-row"

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-card"

const HOVER_TRANSITION =
  "[transition-property:background-color] [transition-duration:120ms] [transition-timing-function:ease]"

export function SkeletonRow() {
  return (
    <div className="flex h-16 w-full shrink-0 items-center gap-3 px-4">
      <div className="size-10 shrink-0 rounded-full bg-[#EDEBE5]" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="h-3 w-2/5 rounded-sm bg-[#EDEBE5]" />
        <div className="h-3 w-4/5 rounded-sm bg-[#EDEBE5]" />
      </div>
    </div>
  )
}

export function ChatList({
  selectedId,
  onSelect,
  readIds,
}: {
  selectedId: string
  onSelect: (id: string) => void
  /** Conversation ids opened this session — overrides their mock-data unread flag. */
  readIds: Set<string>
}) {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 550)
    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return conversations
    return conversations.filter(
      (c: Conversation) =>
        c.name.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="flex h-full min-h-0 flex-col pb-14 md:pb-0">
      <div className="flex shrink-0 items-center justify-between px-4 pt-4 pb-3">
        <h1 className="text-xl font-semibold leading-7 text-foreground">Chats</h1>
        <button
          type="button"
          aria-label="New conversation"
          className={cn(
            "flex size-7 items-center justify-center rounded-lg text-[#5C6B79] transition-colors hover:bg-[#F0EDE8] hover:text-foreground",
            FOCUS_RING
          )}
        >
          <Plus size={20} strokeWidth={1.5} />
        </button>
      </div>

      <div className="shrink-0 px-4 pb-3">
        <div className="relative">
          <Search
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-[#5C6B79]"
          />
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            aria-label="Search conversations"
            className={cn(
              "h-9 w-full appearance-none rounded-lg border border-border bg-card pl-8 text-sm text-foreground outline-none placeholder:text-[#5C6B79]",
              query ? "pr-9" : "pr-3",
              "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:[-webkit-appearance:none]",
              "focus-visible:border-[#B4380A] focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            )}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery("")
                searchInputRef.current?.focus()
              }}
              className={cn(
                "absolute top-1/2 right-1 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-[#5C6B79] hover:bg-[#F0EDE8]",
                HOVER_TRANSITION,
                FOCUS_RING
              )}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        {loading ? (
          <div>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <MessageSquareOff size={20} className="text-[#5C6B79]" strokeWidth={1.5} />
            <p className="text-sm text-[#4A5A6A]">No conversations match your search.</p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className={cn(
                "text-sm font-medium text-primary hover:underline",
                FOCUS_RING
              )}
            >
              Clear search
            </button>
          </div>
        ) : (
          <div>
            {filtered.map((conversation) => (
              <ChatListRow
                key={conversation.id}
                conversation={
                  readIds.has(conversation.id) ? { ...conversation, unread: false } : conversation
                }
                selected={conversation.id === selectedId}
                onSelect={() => onSelect(conversation.id)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
