# 04: Revision prompt

Run after `01-master-prompt.md`. Fixes only what `03-critique.md` found. The master prompt is not rewritten, so the before and after comparison stays honest.

---

Revise the existing chat screen. Do not rebuild it. Every rule from the original master prompt still applies, including the token list, the type scale, the spacing scale, and the file scope. Change only what is listed below.

## Layout

The conversation pane must fill all remaining horizontal space to the right of the chat list. Currently the message log is capped at 617px and the right side of the window is empty. Remove the fixed or max width causing this. The header rule, the thread, and the composer all extend to the window edge.

## Left rail

Ten icons, not six, in this order top to bottom: home, credit-card, message-square, check-square, megaphone, clock, users, settings, calendar, package. Below them, pinned to the bottom: the user avatar, then a log-out icon.

Add the Orbit logomark at the top of the rail above the icon stack.

Add a badge on the check-square icon: an 18px #B4380A circle with a white 11px count, positioned at the top right of the icon.

Restore the active state container. The active icon is #B4380A on a #FDF1EC circle at 36px, as originally specified. Currently only the glyph is recoloured.

## Avatars

Replace the plain initials circle with the avatar component from the design system. It has two variants and three sizes.

**Variants.** An illustrated animal mark, or two initials.

| Mark | Circle |
|---|---|
| Penguin | #6787FF |
| Cat | #00A382 |
| Rabbit | #B46EFA |
| Bear | #C38200 |
| Bird | #00A637 |
| Initials | #F75D1E |

The mark itself is drawn in a darker tone of its own circle colour. The initials variant carries two letters and is used only when no mark is assigned to that person.

Assign the mark and its colour together, deterministically from the user ID, so a given person always renders the same one.

**Sizes.** A size prop, not hardcoded values. Large 40px, medium 32px, small 24px. Large in the chat list, medium in message rows and in the rail, small for any avatar nested inside another element.

Add a presence dot at the bottom right of every avatar: 10px, with a 2px ring in the surface colour behind it so it reads against the mark. Green #15803D for online, #9E9A90 for offline.

## Thread structure

Insert date dividers between message groups from different days or after a gap of more than thirty minutes. A centred label at 12px #5C6B79 reading the date and time, with a 1px #E3E0DA rule extending to both edges of the pane.

Add reactions. Below a message that has them, a pill with a 1px #B4380A border, #FDF1EC fill, 6px radius, containing the emoji at 16px and a count at 13px #0B1F33. Seed at least two messages with a reaction so the state is visible.

## Selected state correction

When a conversation row is selected, the title stays #0B1F33. Do not recolour it to #B4380A. The tint fill and the 2px left bar carry the state on their own. This overrides section 7 of the master prompt.

## Unread state

The preview line must darken from #4A5A6A to #0B1F33 on unread, in addition to the name going SemiBold and the dot appearing. All three signals together, as originally specified. Currently only the name changes.

## Composer

The send button is a 32px #B4380A circle with a white 16px send icon, 12px to the right of the field. It renders in the disabled treatment (#F1EFE8 fill, #9E9A90 icon) while the field is empty and switches to the clay circle as soon as text is entered.

Placeholder text reads "Type a new message here."

## Conversation header

Left: the conversation name at 16px SemiBold with the participant count in parentheses after it.

Right, in order: a member count pill showing a users icon and the number, a video icon with a chevron-down beside it, a search icon, then a horizontal more icon. All 20px, #5C6B79, each with an aria-label. None of them sit in a filled container at rest.

## Mock data

Eight conversations and one open thread of twelve messages, as originally specified. Replace the hospital care coordination content with internal team content: a weekly meeting thread, project follow-ups, and direct messages between colleagues. Remove the fabricated error state on the Facilities thread.

At least two consecutive messages from the same sender, so the 16px between senders and 4px within a run can be verified.

## State demonstration

The original run claimed all nine states from section 7 were present, but loading, empty, error, and disabled were unreachable. Add a route at `/states` rendering each of the nine states in isolation with a label above it. This is for verification only and is not part of the chat screen.

## Files

Modify only the files listed in the original file scope, plus:

```
app/states/page.tsx
components/chat/animal-avatar.tsx
components/chat/date-divider.tsx
components/chat/reaction-pill.tsx
```

`app/globals.css`, anything in `components/ui`, and `app/layout.tsx` stay untouched.

## Done when

1. The conversation pane reaches the right edge of the window at any viewport width above 1024px.
2. Every person in the mock data renders an animal mark, and the initials variant appears only where no mark is assigned.
3. The rail shows ten icons, the logomark, a badge, and sign-out, with the active icon on a tinted circle.
4. Selected rows keep a navy title.
5. Unread rows differ from read rows in weight, preview colour, and the dot.
6. The send button is clay when the field has text and muted when it does not.
7. All nine states render at `/states`.
8. At 375px nothing overflows or overlaps.

For each of the eight above, state whether it is met and name the file and line where it is implemented. If any cannot be verified without running the app, say so rather than assuming.
