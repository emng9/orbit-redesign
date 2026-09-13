# 06: Follow-up prompts and verification

`04-revision-prompt.md` fixed the findings in the critique. This file covers what came after: the smaller corrections made while checking the result against Figma, what I changed by hand rather than by prompt, and how the final state was verified.

These are recorded because the revision prompt was written from screenshots. Once the build was running, comparing it live against the design file surfaced things no screenshot had shown.

---

## Follow-up prompts, in the order they were run

### 1. Illustration assets

The revision produced generic shapes where the animal marks should be, because no prompt can describe artwork precisely enough to reproduce it. Exported the marks from Figma as SVG and pointed the build at them.

> Replace the generated avatar illustrations with the SVG files in `public/avatars/`, mapped by filename: penguin, cat, rabbit, bear, bird. The component keeps drawing the coloured circle from the existing hex values, the SVG sits on top of it as the mark. Replace the placeholder logomark at the top of the rail with the file in `public/brand/`. Do not change anything else.

### 2. Hover states

> Hover states are missing or wrong. Add them:
>
> Conversation rows in the chat list: on hover the row fills #F0EDE8. This must not apply to the currently selected row, which stays #FDF1EC.
>
> Rail icons: on hover the icon fills #F0EDE8 on its 36px circle. The active icon stays #FDF1EC and does not change on hover.
>
> Message rows: on hover the full row fills #F0EDE8, edge to edge including the gutters.
>
> Composer icons and header icons: on hover the icon gets a #F0EDE8 circle behind it at 32px.
>
> All transitions 120ms ease. Do not change any other colour.

### 3. Video dropdown and focus ring

> The video control in the conversation header opens a dropdown with two items, Video call and Audio call, each with its lucide icon on the left.
>
> Open it on hover, not click. It also opens on click and on Enter or Space when focused, and closes on Escape, mouse leave, or blur. Keep a short close delay so moving the pointer from the trigger into the menu does not dismiss it.
>
> Menu: white, 1px #E3E0DA, 10px radius, 8px below the trigger. Items at 15px #0B1F33 with 20px #5C6B79 icons, 12px gap, filling #F0EDE8 on hover.
>
> Separately, the focus ring is currently blue. Every interactive element must use a 2px #B4380A ring with 2px offset, as specified. Find where the default ring colour is coming from and override it.

The focus ring was a shadcn default that survived the token swap. It had been failing criterion 9 in the first build and neither the model's self-check nor my screenshot critique caught it.

### 4. Header and toolbar spacing

First attempt used a 4px gap and removed the toolbar divider. Both were wrong against the design, so this was run again:

> Conversation header, left to right with 16px between each item: a member count pill with 1px #E3E0DA border, 8px radius, 6px vertical and 10px horizontal padding, holding a 20px users icon and the count at 15px SemiBold #0B1F33; a video icon at 20px with a chevron-down at 16px, 4px apart, treated as one control; search at 20px; horizontal more at 20px. The row ends 24px from the right edge. Icons are #5C6B79.
>
> Message hover toolbar, a white pill with 1px #E3E0DA border, fully rounded, 6px padding, and a soft shadow. Three quick reaction emoji at 20px, an add-reaction icon, a 1px #E3E0DA divider 16px tall with 8px either side, then quote, reply, and vertical more at 20px #5C6B79. 8px between items within each group. Every item is a 32px tap target.

### 5. Hover versus open state

> Icon hover states in the conversation header are inconsistent. Hover on any header icon: a #F0EDE8 rounded square at 8px radius behind the icon, icon stays #5C6B79. The video control while its menu is open keeps the same rounded square, icon stays #0B1F33. Do not use the accent tint on hover or on open. Accent is reserved for active and selected. The member count pill keeps its 1px #E3E0DA border and 8px radius so all three treatments share the same corner radius.

The first version of this had the open state as a clay circle. Comparing against Figma showed the design uses a rounded square in neutral grey, and that everything in the header sits on the same 8px radius. That shared radius is what makes the row read as one group.

### 6. Composer

> The composer does not match the design. Read `design-refs/Chat_box.svg` and match the field height, corner radius, border colour, and the icon positions and sizes exactly as exported.
>
> There is no circle, no fill, and no border behind the send icon. It is a bare paper plane, stroked, pointing horizontally to the right with no rotation, the same size as the emoji and attach icons at 20px. It sits 12px to the right of the field.
>
> States: #9E9A90 stroke when the field is empty, #B4380A stroke once it contains text. The icon never gains a background in either state.

### 7. Conversation title

> Remove the participant count in parentheses after the conversation name in the header. Keep the member count pill on the right, since that already carries the number.

### 8. Mobile bottom bar

> Five items, evenly spaced: Chats, Tasks, Orbit, Discover, Settings. Each item is an icon above a label at 11px, 4px below the icon, centred. Icon 24px.
>
> The Orbit item in the centre is the planet logomark from `public/brand/`, not a lucide icon and not the user avatar. It has no label by design, so scale it to match the other icons optically and centre it within the full height of the item.
>
> Active item: icon and label both #B4380A, icon on a #FDF1EC rounded square at 8px radius. Inactive #5C6B79. Bar is white with a 1px #E3E0DA top border.

### 9. Mobile composer overflow

> The composer overflows below 768px. The composer row uses 16px page gutters. The field flexes to fill the space remaining after the send icon and its 12px gap are reserved, so nothing extends past the right gutter. The placeholder truncates with an ellipsis rather than being clipped mid-word. Verify at 375px that the send icon is fully visible inside the right gutter.

### 10. Mobile conversation header

> Below 768px, show the back arrow, the conversation name, the video control, and the horizontal more icon. The name takes all remaining width and truncates with an ellipsis only when it genuinely runs out. Move the member count and search into the more menu as labelled items. Desktop keeps the full header unchanged.

Video stayed visible on purpose. The users are hospital staff coordinating case work from a phone, and putting a call behind a menu costs a tap at the moment it matters most.

---

## What I changed by hand

- Exported the five animal marks, the planet logomark, the reaction pill states, the composer, and the message rows from Figma. The build cannot generate artwork, so every illustration in the final result is an exported asset rather than generated code.
- Placed the component exports in `design-refs/` for the model to read as source, rather than in `public/`. They are reference geometry, not assets the app loads.
- Renamed screenshot files and added `.DS_Store` to `.gitignore`.
- Committed the unedited first output before any of this, so the before and after comparison is against a real starting point rather than a partially fixed one.

---

## Decisions made during the pass

Two things came up and were deliberately left out.

**A per-message hover toolbar.** It exists in the Figma prototype but was not in the master prompt or the critique. Building it mid-pass would have added an unverified component outside the loop the prompt package is meant to demonstrate, so I left it out and recorded it as a limitation.

**Custom emoji artwork.** The reaction pill container came from the Figma export, but the emoji inside stayed as system emoji. There is no custom emoji set in the design, and Slack and Teams both render system emoji in the same position.

---

## How the final quality was verified

Not by asking the tool. The first run reported ten out of ten against its own criteria while four of those criteria were not reachable in the build, so its self-report was treated as a claim to check rather than a result.

What was actually done:

- **Side by side against Figma.** Every screen compared at the same viewport as the design file. Most of the findings in `03-critique.md` and every follow-up above came from this.
- **Devtools inspection.** Computed values read directly for font family, text colour, element dimensions, and container widths. This is how the 617px pane cap and the resolved Public Sans were confirmed, and how the blue focus ring was found.
- **Reading the SVG exports as text.** The composer geometry came from the exported file rather than from my description of it, which is more accurate than any prose instruction.
- **375px check on every change touching layout.** The composer overflow and the truncated mobile title were both caught this way and neither appeared at desktop width.
- **State route.** `/states` renders all nine component states in isolation, so the states that have no path through normal use can still be seen.

The pattern across all of it: the model is reliable at executing values and unreliable at inferring intent. Everything it got right on the first pass was specified as a number or a hex. Everything it got wrong was described in words.
