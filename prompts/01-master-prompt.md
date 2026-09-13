# Master implementation prompt

Saved before running. This is the prompt given to Claude Code to build the Team Chat screen.

---

## 1. Product context

WanPanel is a Los Angeles healthcare technology company. It ships four products used by hospital staff: WP Portal for clinical documentation, WanCare for patient and family communication, WP Orbit for internal team collaboration, and WP Recruiting for hiring.

This work is on **Orbit**, the internal team chat. Its users are hospital operations staff, case managers, and clinicians who coordinate daily case work. They read it in short bursts between other tasks, often on a phone, sometimes at a nurses' station.

Orbit's current design has four problems I am fixing: colour carries no consistent meaning, the chat list has no unread state, dense views have no hierarchy, and three unrelated illustration styles coexist with no rules.

## 2. User goal

Open Orbit, see at a glance which conversations need a reply, open one, read the thread without effort, and respond. Everything else is secondary.

## 3. Reference screens

I have redesigned this screen in Figma. The layout is described in section 6. Two references for interaction patterns, not visual style:

- Slack's message rows, no bubbles, name and timestamp on one line above the message
- Linear's list density and quiet chrome

Do not copy either visually. The visual system is defined below.

## 4. What must stay

- The three-pane structure: left rail, chat list, conversation
- The existing shadcn components already in `components/ui`. Restyle through tokens, do not rebuild them
- The token values already in `app/globals.css`. Do not introduce new colours
- Public Sans for all text, IBM Plex Mono for IDs only
- Lucide icons only, 1.5px stroke

## 5. What should change

Everything below is new. Build it from scratch inside the existing project.

## 6. Visual rules

**Colour**

| Token | Value | Use |
|---|---|---|
| page | #FAF9F7 | conversation pane background |
| card | #FFFFFF | chat list, rail |
| navy | #0B1F33 | all primary text |
| secondary | #4A5A6A | message previews, labels |
| muted | #5C6B79 | timestamps, placeholders |
| border | #E3E0DA | hairlines |
| accent | #B4380A | selected, active nav, primary button, unread dot, focus |
| accent tint | #FDF1EC | selected row fill |
| hover | #F0EDE8 | any hovered row |

Accent never marks status. Status colours are fixed: success #15803D, warning #A16207, error #B42318, each with tints #E3F1E8, #FBF3E3, #FBECEA.

**Type**

28/34 SemiBold display, 20/28 SemiBold h1, 16/24 SemiBold h2, 15/22 Regular body, 13/20 Regular body-sm, 13/18 Medium label, 12/16 Regular caption. One uppercase style only: 11/16 SemiBold with 0.06em tracking, used for status badges and nothing else.

**Spacing** 4, 8, 12, 16, 24, 32, 48. **Radius** 6 badges, 8 controls, 10 cards, full avatars. **Borders** 1px.

**Layout**

Left rail 56px, white, 1px #E3E0DA right border. Six Lucide icons at 20px in 36px circles: home, message-square, check-square, calendar, users, settings. Resting #0B1F33. Active #B4380A on a #FDF1EC circle.

Chat list 320px, white, 1px #E3E0DA right border. Header with "Chats" at 20px SemiBold and a plus icon. A search field below it. Then conversation rows at 64px: a 40px avatar, 12px gap, then name at 16px SemiBold and preview at 13px #4A5A6A stacked, with the timestamp at 12px #5C6B79 right-aligned on the name line.

Conversation pane fills the rest, #FAF9F7. A header with the conversation name at 16px SemiBold and search, call, and more icons on the right. Then the message thread. Then the composer.

Message rows: 32px avatar on the left, 12px gap, then a column containing the name at 13px Medium #0B1F33 with the timestamp at 12px #5C6B79 8px after it, then the message text at 15px #0B1F33 with a 2px gap. No bubbles, no fills. 16px between different senders, 4px between consecutive messages from one sender, and the avatar and name appear only on the first message of a group.

Composer: a 44px field, white, 1px #E3E0DA, 8px radius, with a mic icon on the left and emoji and attach icons on the right, all 20px #5C6B79. A 32px #B4380A circle with a white 16px send icon sits 12px to the right of the field. 24px page gutters.

## 7. Component states

| State | Treatment |
|---|---|
| Default | as specified above |
| Hover | row fills #F0EDE8 |
| Selected | row fills #FDF1EC with a 2px #B4380A left bar, name in #B4380A |
| Unread | name goes SemiBold, preview darkens from #4A5A6A to #0B1F33, and a 8px #B4380A dot appears at the right |
| Focus | 2px #B4380A ring, outside, 2px offset. Same on every interactive element. Never removed |
| Disabled | fill #F1EFE8, text #9E9A90. The send button is disabled while the composer is empty |
| Loading | skeleton rows, #EDEBE5 blocks at 4px radius, a circle matching the avatar size and two bars at the text heights, widths varied between rows |
| Empty | centred icon at 20px #5C6B79, one line of text, one action |
| Error | centred icon, one line saying what failed, a secondary button reading "Try again" |

Hover is neutral and selected is accent. Hovering is not choosing, so the two must never look alike.

## 8. Responsive behaviour

Desktop from 1024px: all three panes visible.

Mobile below 768px: the rail becomes a fixed bottom bar, 56px tall, white, 1px top border, with five items. The chat list and conversation become separate views, list first, tapping a row pushes the conversation in with a back arrow in its header. The composer sits above the bottom bar. Page gutters drop from 24px to 16px.

Tablet is not required.

## 9. Accessibility

- Every text colour above passes WCAG AA on its background. Do not change any hex.
- The focus ring is never removed. Keyboard tab order runs rail, chat list, conversation, composer.
- Unread is never colour alone. It carries weight and a dot as well.
- Every icon-only button has an aria-label and a 28px minimum tap target.
- Avatars use alt text with the person's name.
- The conversation thread is an aria-live polite region.

## 10. File scope

Create or modify only:

```
app/chat/page.tsx
components/chat/left-rail.tsx
components/chat/chat-list.tsx
components/chat/chat-list-row.tsx
components/chat/conversation.tsx
components/chat/message-row.tsx
components/chat/composer.tsx
lib/mock-data.ts
```

Do not modify `app/globals.css`, anything in `components/ui`, or `app/layout.tsx`.

## 11. Expected output and acceptance criteria

Build the chat screen as a working React page at `/chat` using mock data for eight conversations and one open thread of twelve messages.

It is done when:

1. Every colour on screen is one of the tokens listed in section 6. No greys, no blues, no shadcn defaults.
2. All nine states in section 7 exist and are visibly different from each other.
3. Hover and selected are distinguishable at a glance.
4. Three conversations in the list are unread and readable as such without relying on colour.
5. Clicking a conversation row selects it and loads that thread.
6. Consecutive messages from one sender do not repeat the avatar or name.
7. The send button is disabled until text is entered.
8. At 375px wide nothing overflows, nothing overlaps, and the bottom bar is reachable.
9. Every interactive element shows the 2px accent focus ring on keyboard focus.
10. No component in `components/ui` has been edited.

Report which of these ten you could not meet and why.
