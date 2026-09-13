import { cn } from "@/lib/utils"

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function ReactionPill({
  emoji,
  count,
  reacted = false,
  onClick,
}: {
  emoji: string
  count: number
  /** Whether the current viewer is one of the reactors. Matches public/emojis/Property 1=Reacted.svg vs =Default.svg. */
  reacted?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${emoji} reaction, ${count} ${count === 1 ? "person" : "people"}${reacted ? ", including you" : ""}`}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5",
        reacted ? "border-primary bg-accent" : "border-border bg-card",
        FOCUS_RING
      )}
    >
      <span className="text-base leading-none" aria-hidden="true">
        {emoji}
      </span>
      <span className="text-[13px] leading-none text-foreground">{count}</span>
    </button>
  )
}
