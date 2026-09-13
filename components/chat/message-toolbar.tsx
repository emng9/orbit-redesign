import { MoreVertical, Quote, Reply, SmilePlus } from "lucide-react"
import { cn } from "@/lib/utils"

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-card"

const HOVER_TRANSITION =
  "[transition-property:background-color] [transition-duration:120ms] [transition-timing-function:ease]"

const ICON_BUTTON = cn(
  "flex size-8 shrink-0 items-center justify-center rounded-full text-[#5C6B79] hover:bg-[#F0EDE8] hover:text-foreground",
  HOVER_TRANSITION,
  FOCUS_RING
)

const QUICK_REACTIONS = [
  { emoji: "👍", label: "React with thumbs up" },
  { emoji: "😂", label: "React with laughing" },
  { emoji: "😮", label: "React with surprised" },
]

export function MessageToolbar({
  className,
  onReact,
}: {
  className?: string
  /** Called with the emoji when one of the three quick-reaction buttons is clicked. */
  onReact?: (emoji: string) => void
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-[0_1px_2px_rgba(11,31,51,0.06)] transition-opacity",
        className
      )}
    >
      {QUICK_REACTIONS.map((reaction) => (
        <button
          key={reaction.emoji}
          type="button"
          aria-label={reaction.label}
          onClick={() => onReact?.(reaction.emoji)}
          className={ICON_BUTTON}
        >
          <span className="text-[20px] leading-none" aria-hidden="true">
            {reaction.emoji}
          </span>
        </button>
      ))}
      <button type="button" aria-label="Add reaction" className={ICON_BUTTON}>
        <SmilePlus size={20} strokeWidth={1.5} />
      </button>

      <span aria-hidden="true" className="h-4 w-px shrink-0 bg-border" />

      <button type="button" aria-label="Quote" className={ICON_BUTTON}>
        <Quote size={20} strokeWidth={1.5} />
      </button>
      <button type="button" aria-label="Reply" className={ICON_BUTTON}>
        <Reply size={20} strokeWidth={1.5} />
      </button>
      <button type="button" aria-label="More options" className={ICON_BUTTON}>
        <MoreVertical size={20} strokeWidth={1.5} />
      </button>
    </div>
  )
}
