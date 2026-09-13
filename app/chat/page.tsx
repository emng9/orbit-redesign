"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { conversations } from "@/lib/mock-data"
import { LeftRail } from "@/components/chat/left-rail"
import { ChatList } from "@/components/chat/chat-list"
import { Conversation } from "@/components/chat/conversation"

export default function ChatPage() {
  const [selectedId, setSelectedId] = useState(conversations[0].id)
  const [mobileView, setMobileView] = useState<"list" | "conversation">("list")

  function handleSelect(id: string) {
    setSelectedId(id)
    setMobileView("conversation")
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
        />
      </div>
    </div>
  )
}
