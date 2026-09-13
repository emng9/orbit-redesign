# Process

Audit notes, directions, and the reasoning behind the decisions. The visual work lives in the Figma file; this covers the thinking.

---

## How I audited

I grouped findings by problem type rather than by screen, because almost every issue repeated across screens. Sorting by screen would have produced the same note eight times and hidden the fact that these are systemic rather than local.

Everything below comes from the supplied static screens. Hover, focus, and loading states are not visible in them, which is itself a finding.

---

## Audit notes

### Hierarchy
- Chat list rows all carry the same weight, and every sender and group name is bold, so nothing signals which conversation needs attention or whether anything is unread.
- Timestamps compete and repeat. Right-aligned at the top of each row at close to the sender's weight, then shown again in the conversation where the date divider already carries a time, and placed either beside or below a message depending on whether it has a reaction.
- Team Tasks gives the task name the same weight as eleven other columns.
- Settings gives the most space to the least content, so the panel you actually use is the cramped one. Inside those cards the status line and the instruction compete, and an error card looks like a routine one.
- In the meeting room, only two people show a role tag, so everyone else is a name with no context.

### Spacing
- Left rail icons vary in size and spacing, so the column reads as three separate groups rather than one navigation.
- The Settings right panel aligns with neither the left column's top edge nor its width, so it reads as floating.
- The Contacts detail area is mostly empty, with three lines of information in the top left corner.
- Timesheet cells leave a gap between the date and the content, and the punch block sits toward the right rather than under the date, so nothing in the cell lines up.

### Typography
- Sizes look picked per screen rather than drawn from a scale. Calendar labels, the task table, contact fields, and settings rows are all slightly different.
- All-caps does five different jobs with no rule: statuses, field labels, column headers, priority tags, and one button.
- Type is inconsistent across the family. Orbit uses a rounded sans except the meeting room board, which is serif, and the Portal uses monospace with a different sans again.

### Colour
- Eleven accent colours a user can pick from, with no roles attached, so nothing built on accent can promise meaning or contrast.
- Status colours follow no logic. The calendar gives Tasks and Time Off almost the same pink, Team Tasks runs through six project colours, and in the Portal a routine button and "Discharge patient" carry the same weight.
- Nothing in Orbit uses the navy and teal from wanpanel.ai.

### Icons
- Three visual languages with no rules: flat line icons, 3D characters, and photography.
- 3D avatars are used as data in Team Tasks, at a size where you cannot tell the creator from the assignee.
- Page titles repeat the icon already highlighted in the left rail, so the same icon appears twice for no added meaning.

### States
- Nothing in the chat list looks unread. Every row is styled the same.
- Selected is styled six different ways across the product, three of them inside one panel, and one of them writes out the word "Selected."
- Notifications has a Retry button and a crossed-out bell, but the card looks like every other card, so nothing says something went wrong.

### Density
- Team Tasks shows eleven columns at once with no way to hide or reorder them.
- Space does not match content. Timesheet cells are big enough for a full block but most values are dashes, the Portal Timeline gives its whole left side to an empty text box, and the calendar fills large cells with two or three dots.
- The Portal Worklist repeats its full column header six times, once per patient.

### Responsiveness
- The chat list works on mobile, but avatars are larger than desktop so fewer conversations fit, and the see-through bottom bar lets the row behind it show through.
- The same screen works two different ways. Settings becomes a phone-style list on mobile while desktop uses tabs, Notifications is a toggle on mobile but a card with a Retry button on desktop, and mobile has an Identity section that desktop puts in an untitled panel instead.
- Eleven icons in the desktop rail become five tabs on mobile, with no sign of where the rest went.

### What already works
- Message spacing in the conversation is even, so the thread is easy to read.
- The selected chat is the clearest state in the product: blush fill, left accent bar, and the name in the accent colour. Three signals working together. The redesign builds on this rather than replacing it.

---

## The four problems I chose to solve

Eight categories of finding, four problems worth the time. I picked the ones that repeat across every screen and that change what someone can do rather than how it looks.

### 1. Colour carries no meaning
Eleven accents a user picks from, plus status colours with no logic, means a colour cannot be learned. Tasks and Time Off are almost the same pink, Team Tasks runs six project colours, and in the Portal a routine button looks like "Discharge patient."

**Why it matters.** People scan by colour before they read. If the same red means nothing in one place and something serious in another, they stop trusting it and read every label instead. In a hospital that is slower, and it is how a destructive action gets clicked.

### 2. States are inconsistent, and some do not exist
Selected is styled six different ways, three of them inside one panel. Notifications shows a Retry button on a card that looks entirely normal. Nothing in the chat list reads as unread. Hover and focus do not appear anywhere in the supplied screens.

**Why it matters.** States are how you know where you are, what you picked, and whether something worked. When the answer changes on every screen you are re-learning the product as you move through it, and an error ends up looking like everything is fine.

### 3. Dense views have no hierarchy
Team Tasks gives the task name the same weight as eleven other columns. The Portal Worklist repeats its full header six times.

**Why it matters.** You read every cell instead of scanning. Someone checking what is due, or which patient needs review, is hunting for it themselves. That is time taken from the actual work.

### 4. Three visual languages with no rules
Flat line icons, 3D characters, and photography, with nothing saying when each applies. 3D avatars are used as table data at a size where creator and assignee look identical.

**Why it matters.** The product reads as unfinished rather than warm, which is a problem for software people use to document patient care. And when decoration and data look the same, you cannot tell which is which.

---

## Direction

Clinical, calm, warm at the edges. Navy and warm neutrals carry the structure, one accent per product carries identity, and everything else stays quiet so the information leads.

| | |
|---|---|
| Type | Public Sans everywhere, IBM Plex Mono for IDs and timestamps only |
| Surface | Warm off-white #FAF9F7, cards in white, navy #0B1F33 for text |
| Spacing | 4px base, generous between groups |
| Radius | 10px cards, 8px inputs, full on avatars and pills |
| Icons | One line style, one weight, one size |
| Illustration | Avatars only |

### The brand already exists

WanPanel's site has a clear identity: navy, one teal accent, bold type, wide spacing. None of it reaches the products.

But a site is read once for thirty seconds and Orbit is read for eight hours, so it cannot be copied across directly.

- Navy becomes structure rather than background. Text, rail, headers. Surfaces stay light.
- Teal gets held back. On the site it is decorative. In the product it marks what needs attention, so it keeps meaning something.
- The display type becomes a scale, sized for reading instead of impact.
- The wide spacing stays. Cheapest thing to carry over, does the most for calm.

### Warm without childish

Warmth in Orbit currently comes from 24 3D animals, 12 food photos, and a penguin in the rail. It works, but it reads consumer rather than clinical, and those same characters are used as data in Team Tasks where you cannot tell a brown bear from a brown dog.

In the new system warmth comes from surface temperature, space, radius, type, and voice instead.

Surface is warm off-white rather than pure white or blue-grey, same brightness and a different feeling. Line height is generous with real room between groups, because calm is warm when someone is under pressure. Radius is soft on cards and full on avatars and pills, since sharp reads institutional and very round reads toy. And Orbit's voice already works. "Tap to review sessions and log out remote devices" is friendlier than most hospital software, so it stays.

---

## Choosing the typeface

Five candidates, one pick.

| Typeface | Outcome |
|---|---|
| Poppins | Cut. Closest to what Orbit uses now and one of the friendliest, but rounded geometric type is where childish comes from |
| Nunito | Cut, same reason |
| Inter | Cut. Best at small sizes and the safest pick, but it has no personality of its own, so all the warmth would have to come from colour and spacing |
| Source Sans 3 | Cut. Warmest of the three without being cute, but it loosens up in a dense table like Team Tasks |
| **Public Sans** | **Final pick** |

Public Sans is very humanist with a big x-height, and it holds at 13px in a dense table. There is enough character in the a, g, and t that it does not read as a system font. It was built for US government public services, so it reads institutional without reading cold, which is what the product has to do too.

IBM Plex Mono is used for account numbers, case numbers, and timestamps. The Portal already uses mono for IDs and that is right, it is easier to scan. It just should not be used for prose the way the Portal does now.

---

## Spacing the family

The four products are already coloured, but all four are some version of blue-purple. They sit between 217 and 275 degrees on the colour wheel, and three of them are within 31 degrees of each other. Nothing tells you which app you are in at a glance.

Contrast is not the problem. All four pass AA as text on white, between 5.20 and 9.57. They are simply indistinguishable from each other.

Microsoft and Google both solve this, in two different ways. Microsoft gives every app its own colour, Word blue, Excel green, PowerPoint orange, and ties them together with the same logo construction, one letter in a tilted two-tone panel. Google goes the other way, building every product mark from the same four brand colours rearranged. Either way you know which app you are in before you read anything, and you still know whose it is.

So colour distinguishes the products and the foundation underneath unites them. WanPanel currently has neither.

| Product | Hex | Hue | On warm background | White text on fill | Why |
|---|---|---|---|---|---|
| WP Portal | #1A45BD | 224 | 7.59 | 7.98 | Clinical documentation, the most serious of the four |
| WanCare | #0D6E66 | 175 | 5.80 | 6.11 | Calm for anxious families, and WanPanel's own accent |
| WP Orbit | #B4380A | 16 | 5.68 | 5.98 | Internal team chat, the least clinical, so it gets to be warm |
| WP Recruiting | #6B21A8 | 273 | 8.29 | 8.72 | Furthest from patient care |

Every accent passes AA as text on the warm surface and as a fill with white text on it. Ratios run 5.68 to 8.29.

Shared across all four and never changing: navy #0B1F33 for text and structure, plus one fixed set of status colours, success #15803D, warning #A16207, error #B42318.

---

## Early directions and what I rejected

**Keep the 3D characters and fix everything around them.** This was the first direction. Faster, and it kept the warmth people already like about Orbit.

Two things moved me off it. At the size Team Tasks uses avatars, a brown bear and a brown dog look the same, so decoration was doing the job of data and failing at it. And the same system has to carry onto WP Portal, where a continued-stay justification would sit next to a glossy penguin on a wooden shelf.

**Cut the characters entirely.** The other option, and worse. It removes the one thing people genuinely like about Orbit.

**What I went with instead.** The characters stay and the rendering changes. Flat silhouette, one weight, one colour on a tint. Still an animal, still someone's choice, but it reads at 24px and it does not look out of place next to a patient record.

**Repaint all four products in the site's navy and teal.** Rejected because it makes them identical and throws away the identity each product already has. Distinguishing the four was the actual problem, and this solves the opposite one.

**Leave the four product colours as they are.** Rejected for the reason in the table above.

---

## Other decisions

**Eleven user-pickable accents became six, with one rule.** The original palette let a user pick any of eleven colours with no stated effect. The new Identity panel offers six and states the rule in one line: it tints your avatar and selected rows, and never changes status colours. That sentence is the entire colour system, placed at the moment someone might otherwise break it. People can still tint their own workspace; that choice just never touches status.

**Status colour was separated from accent entirely.** Success, warning, and error are fixed and do not respond to the accent picker. This is what makes colour learnable, and it is why the accent picker can be offered at all.

**Unread got three signals instead of none.** Name weight, preview colour, and a dot. Any one is enough on its own, which means it survives colour blindness, a dim phone screen at a nurses' station, and a quick glance. This is the change that most directly serves the user goal.

**Settings became a modal rather than a page.** It follows the pattern in Teams and Slack, which these users already have open alongside Orbit. The left panel lists sections, the right holds content, and both align to the same top edge, which fixes the floating panel from the audit.

**Selected kept its existing treatment, minus one signal.** The original selected chat was the best state in the product, so it stayed. The name colouring was dropped because the tint and the left bar already carry it, and a coloured title reads as a link.

---

## What I would do next

- Team Tasks column management, so eleven columns become the four you chose.
- The Portal Worklist header repetition, which is a structural fix rather than a visual one.
- A keyboard path to the message hover toolbar, which is currently mouse only.
- Timesheet and Calendar, both of which spend space without saying much, and neither of which fit in the three days.
