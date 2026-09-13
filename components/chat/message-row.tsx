import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Message } from "@/lib/mock-data"

const ID_PATTERN = /(Case #\d+)/g

function renderMessageText(text: string) {
  const parts = text.split(ID_PATTERN)
  // split() with a capturing group puts matches at odd indices.
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-mono text-[0.9em]">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

export function MessageRow({
  message,
  showHeader,
  newGroup,
}: {
  message: Message
  showHeader: boolean
  newGroup: boolean
}) {
  return (
    <div className={cn("flex gap-3 px-6", newGroup ? "mt-4" : "mt-1")}>
      <div className="w-8 shrink-0">
        {showHeader && (
          <Avatar role="img" aria-label={message.authorName}>
            <AvatarFallback>{message.initials}</AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className="min-w-0 flex-1">
        {showHeader && (
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] font-medium leading-5 text-foreground">
              {message.authorName}
            </span>
            <span className="text-xs leading-4 text-[#5C6B79]">
              {message.timestamp}
            </span>
          </div>
        )}
        <p className="mt-0.5 text-[15px] leading-6 whitespace-pre-wrap text-foreground">
          {renderMessageText(message.text)}
        </p>
      </div>
    </div>
  )
}
