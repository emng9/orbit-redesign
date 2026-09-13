"use client"

import { CircleAlert, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { conversations } from "@/lib/mock-data"
import { ChatListRow } from "@/components/chat/chat-list-row"
import { SkeletonRow } from "@/components/chat/chat-list"
import { MessageSkeletonRow } from "@/components/chat/conversation"
import { Composer } from "@/components/chat/composer"

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const readConversation = conversations.find((c) => c.id === "design-team")!
const unreadConversation = conversations.find((c) => c.id === "product-weekly-sync")!

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border py-6">
      <h2 className="mb-3 text-sm font-semibold leading-5 text-foreground">{label}</h2>
      <div className="max-w-md overflow-hidden rounded-lg border border-border">{children}</div>
    </section>
  )
}

export default function StatesPage() {
  return (
    <div
      className="min-h-dvh bg-background px-6 py-8"
      style={{ fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-md">
        <h1 className="mb-1 text-xl font-semibold leading-7 text-foreground">
          Component states
        </h1>
        <p className="mb-6 text-sm text-[#4A5A6A]">
          Verification only: each of the nine states from section 7, in isolation. Not part of
          the chat screen.
        </p>

        <Section label="1. Default">
          <ChatListRow conversation={readConversation} selected={false} onSelect={() => {}} />
        </Section>

        <Section label="2. Hover">
          <ChatListRow
            conversation={readConversation}
            selected={false}
            onSelect={() => {}}
            forceHover
          />
        </Section>

        <Section label="3. Selected">
          <ChatListRow conversation={readConversation} selected onSelect={() => {}} />
        </Section>

        <Section label="4. Unread">
          <ChatListRow conversation={unreadConversation} selected={false} onSelect={() => {}} />
        </Section>

        <Section label="5. Focus (auto-focused on load, tab away and back to see the ring return)">
          <div className="flex justify-center bg-card p-4">
            <button
              type="button"
              autoFocus
              className={`h-8 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground ${FOCUS_RING}`}
            >
              Focused button
            </button>
          </div>
        </Section>

        <Section label="6. Disabled (send button, empty composer)">
          <Composer onSend={() => {}} />
        </Section>

        <Section label="7. Loading">
          <div className="bg-card">
            <SkeletonRow />
            <SkeletonRow />
            <MessageSkeletonRow wide />
            <MessageSkeletonRow wide={false} />
          </div>
        </Section>

        <Section label="8. Empty">
          <div className="flex flex-col items-center gap-3 bg-card px-6 py-16 text-center">
            <SearchX size={20} className="text-[#5C6B79]" strokeWidth={1.5} />
            <p className="text-sm text-[#4A5A6A]">No conversations match your search.</p>
            <button type="button" className={`text-sm font-medium text-primary hover:underline ${FOCUS_RING}`}>
              Clear search
            </button>
          </div>
        </Section>

        <Section label="9. Error">
          <div className="flex flex-col items-center gap-3 bg-card px-6 py-16 text-center">
            <CircleAlert size={20} className="text-[#5C6B79]" strokeWidth={1.5} />
            <p className="text-sm text-[#4A5A6A]">Couldn&apos;t load this conversation.</p>
            <Button type="button" variant="secondary">
              Try again
            </Button>
          </div>
        </Section>
      </div>
    </div>
  )
}
