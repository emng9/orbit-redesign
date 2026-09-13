import { cn } from "@/lib/utils"
import { formatMessageTime, userPresence, type Message } from "@/lib/mock-data"
import { AnimalAvatar } from "@/components/chat/animal-avatar"
import { ReactionPill } from "@/components/chat/reaction-pill"
import { MessageToolbar } from "@/components/chat/message-toolbar"

const ID_PATTERN = /(\b(?:PR|Ticket) #\d+)/g

const HOVER_TRANSITION =
  "[transition-property:background-color] [transition-duration:120ms] [transition-timing-function:ease]"

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
    <div
      className={cn(
        "group relative flex gap-3 px-6 py-2 hover:bg-[#F0EDE8]",
        HOVER_TRANSITION,
        newGroup ? "mt-0" : "-mt-3"
      )}
    >
      <MessageToolbar className="pointer-events-none absolute -top-2 right-6 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100" />
      <div className="w-8 shrink-0">
        {showHeader && (
          <AnimalAvatar
            userId={message.authorId}
            name={message.authorName}
            initials={message.initials}
            size="md"
            online={userPresence[message.authorId] ?? true}
            surface="page"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        {showHeader && (
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] font-medium leading-5 text-foreground">
              {message.authorName}
            </span>
            <span className="text-xs leading-4 text-[#5C6B79]">
              {formatMessageTime(message.timestamp)}
            </span>
          </div>
        )}
        <p className="mt-0.5 text-[15px] leading-6 whitespace-pre-wrap text-foreground">
          {renderMessageText(message.text)}
        </p>
        {message.reactions && message.reactions.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {message.reactions.map((reaction, i) => (
              <ReactionPill
                key={i}
                emoji={reaction.emoji}
                count={reaction.count}
                reacted={reaction.reactedByMe}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
