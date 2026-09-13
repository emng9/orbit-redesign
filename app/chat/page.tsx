"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { conversations, type Reaction } from "@/lib/mock-data"
import { LeftRail } from "@/components/chat/left-rail"
import { ChatList } from "@/components/chat/chat-list"
import { Conversation } from "@/components/chat/conversation"

export default function ChatPage() {
  const [selectedId, setSelectedId] = useState(conversations[0].id)
  const [mobileView, setMobileView] = useState<"list" | "conversation">("list")
  // Reaction overrides keyed by message id. Each entry is seeded from that
  // message's mock-data reactions the first time it's toggled, then kept
  // here for the rest of the session — no persistence beyond a reload.
  const [reactionsByMessage, setReactionsByMessage] = useState<Record<string, Reaction[]>>({})

  function handleSelect(id: string) {
    setSelectedId(id)
    setMobileView("conversation")
  }

  function handleToggleReaction(messageId: string, emoji: string, currentReactions: Reaction[]) {
    setReactionsByMessage((prev) => {
      const base = prev[messageId] ?? currentReactions
      const index = base.findIndex((r) => r.emoji === emoji)

      let next: Reaction[]
      if (index === -1) {
        // No one has this reaction yet — add it with the current user on it.
        next = [...base, { emoji, count: 1, reactedByMe: true }]
      } else {
        const existing = base[index]
        if (existing.reactedByMe) {
          // Current user is removing their reaction.
          const count = existing.count - 1
          next =
            count <= 0
              ? base.filter((_, i) => i !== index)
              : base.map((r, i) => (i === index ? { ...r, count, reactedByMe: false } : r))
        } else {
          // Current user is adding theirs to an existing reaction from others.
          next = base.map((r, i) => (i === index ? { ...r, count: r.count + 1, reactedByMe: true } : r))
        }
      }

      return { ...prev, [messageId]: next }
    })
  }

  return (
    <div
      className="flex h-dvh w-full overflow-hidden bg-background"
      style={{ fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif" }}
    >
      <LeftRail activeId="chat" />

      <div
        className={cn(
          "w-full border-r border-border bg-card md:w-80 md:shrink-0",
          mobileView === "conversation" && "hidden md:block"
        )}
      >
        <ChatList selectedId={selectedId} onSelect={handleSelect} />
      </div>

      <div
        className={cn(
          "min-w-0 flex-1",
          mobileView === "list" && "hidden md:block"
        )}
      >
        <Conversation
          conversationId={selectedId}
          onBack={() => setMobileView("list")}
          reactionsByMessage={reactionsByMessage}
          onToggleReaction={handleToggleReaction}
        />
      </div>
    </div>
  )
}
