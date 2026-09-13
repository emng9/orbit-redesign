"use client"

import { useState } from "react"
import { Mic, Paperclip, Send, Smile } from "lucide-react"
import { cn } from "@/lib/utils"

const ICON_BUTTON =
  "flex size-7 shrink-0 items-center justify-center rounded-md text-[#5C6B79] transition-colors hover:bg-[#F0EDE8] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-card"

export function Composer({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSend(trimmed)
    setValue("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex shrink-0 items-end gap-3 border-t border-border bg-background px-4 py-4 md:px-6"
    >
      <div className="flex h-11 flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 focus-within:ring-2 focus-within:ring-[#B4380A] focus-within:ring-offset-2 focus-within:ring-offset-background">
        <button type="button" aria-label="Record voice message" className={ICON_BUTTON}>
          <Mic size={20} strokeWidth={1.5} />
        </button>
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Message"
          aria-label="Message"
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-[#5C6B79]"
        />
        <button type="button" aria-label="Add emoji" className={ICON_BUTTON}>
          <Smile size={20} strokeWidth={1.5} />
        </button>
        <button type="button" aria-label="Attach file" className={ICON_BUTTON}>
          <Paperclip size={20} strokeWidth={1.5} />
        </button>
      </div>

      <button
        type="submit"
        aria-label="Send message"
        disabled={!value.trim()}
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors",
          "hover:bg-primary/90",
          "disabled:cursor-not-allowed disabled:bg-[#F1EFE8] disabled:text-[#9E9A90]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <Send size={16} strokeWidth={1.5} />
      </button>
    </form>
  )
}
