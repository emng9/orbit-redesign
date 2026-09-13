import { cn } from "@/lib/utils"
import { formatMessageTime, userPresence, type Message, type Reaction } from "@/lib/mock-data"
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
  reactions,
  onToggleReaction,
  showHeader,
  newGroup,
}: {
  message: Message
  /** Effective reactions for this message (mock seed, overridden by any local toggles). */
  reactions: Reaction[]
  onToggleReaction: (emoji: string) => void
  showHeader: boolean
  newGroup: boolean
}) {
  return (
    <div className={cn("group relative", newGroup ? "mt-0" : "-mt-3")}>
      {/* Grouped rows overlap the row above by -mt-3 to tighten spacing, so
          this layer insets its top by the same amount — otherwise its hover
          fill would paint over the previous row's content in the overlap. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 bg-[#F0EDE8] opacity-0 group-hover:opacity-100",
          HOVER_TRANSITION,
          newGroup ? "top-0" : "top-3"
        )}
      />
      <MessageToolbar
        onReact={onToggleReaction}
        className="pointer-events-none absolute -top-2 right-6 z-10 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
      />
      <div className="relative flex gap-3 px-6 py-2">
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
          {reactions.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {reactions.map((reaction) => (
                <ReactionPill
                  key={reaction.emoji}
                  emoji={reaction.emoji}
                  count={reaction.count}
                  reacted={reaction.reactedByMe}
                  onClick={() => onToggleReaction(reaction.emoji)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
