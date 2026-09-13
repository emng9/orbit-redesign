import { cn } from "@/lib/utils"

export function ReactionPill({
  emoji,
  count,
  reacted = false,
}: {
  emoji: string
  count: number
  /** Whether the current viewer is one of the reactors. Matches public/emojis/Property 1=Reacted.svg vs =Default.svg. */
  reacted?: boolean
}) {
  return (
    <span
      role="group"
      aria-label={`${count} reaction${count === 1 ? "" : "s"}: ${emoji}${reacted ? ", including you" : ""}`}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5",
        reacted ? "border-primary bg-accent" : "border-border bg-card"
      )}
    >
      <span className="text-base leading-none" aria-hidden="true">
        {emoji}
      </span>
      <span className="text-[13px] leading-none text-foreground">{count}</span>
    </span>
  )
}
