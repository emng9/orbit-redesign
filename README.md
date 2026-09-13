# WanPanel Orbit Redesign

A redesign of WP Orbit, WanPanel's internal team chat, covering a visual audit, a brand system, the Team Chat screen, and an AI-assisted implementation workflow.

**Emily Nguyen** · [emilynguyens.com](https://emilynguyens.com) · honganhemily@gmail.com

---

## Links

| What | Where |
|---|---|
| Deployed app | https://orbit-redesign-gamma.vercel.app |
| Repository | https://github.com/emng9/orbit-redesign |
| Interactive prototype | https://royal-stoop-24103056.figma.site |
| Figma design file | [WanPanel Orbit Redesign](https://www.figma.com/design/Ait3zMnIx1XrFU63i9W5iJ/WanPanel-Orbit-Redesign) |

**Demo account**, for both the deployed app and the prototype:

```
Email: shirleyli@wanpanel.ai
Password: wanpanelorbitredesign
```

The deployed app implements the Team Chat screen, which is what the prompt package targets. The prototype covers the full set of redesigned screens. Both use the same brand system.

---

## Where to find each part

| Phase | Where |
|---|---|
| I. Visual audit | Figma, page `01 Audit`. Full working notes in `PROCESS.md` |
| II. Direction | Figma, page `02 Direction` |
| III. Brand system | Figma, page `03 Design System`. Implemented as tokens in `app/globals.css` |
| IV. Team Chat redesign | Figma, pages `04 Team Chat Desktop` and `05 Team Chat Mobile`. Built at `/chat` |
| V. Cross-product application | Figma, page `06 Portal Cross Product` |
| VI. Prompt package | `/prompts` in this repo, six files plus screenshots |
| Interactive prototype | The Figma Make link above |

---

## Overview and the problems I chose to solve

Orbit is used by hospital operations staff, case managers, and clinicians who coordinate case work through the day. They read it in short bursts between other tasks, often on a phone, sometimes standing at a nurses' station. The design has to survive being glanced at.

The audit covered eight categories across every supplied screen: hierarchy, spacing, typography, colour, icons, states, density, and responsiveness. Grouped by problem type rather than by screen, because most issues repeated across screens. Four of those findings were systemic enough to shape the redesign.

**Colour carried no consistent meaning.** The same hue appeared as a brand accent, a status indicator, and decoration, sometimes on one screen. Nothing could be read at a glance because nothing was reliable.

**The chat list had no unread state.** The screen whose entire job is telling you what needs a reply gave no signal about which conversations were waiting.

**Dense views had no hierarchy.** Message rows, list rows, and settings panels all used similar weight and size, so scanning meant reading everything.

**Three unrelated illustration styles coexisted with no rules.** 3D characters, flat icons, and stock imagery appeared without a governing principle.

One decision sits above all four. Orbit is one of four WanPanel products, and the four currently share a marketing site with a navy and teal identity while each product's interface uses a different colour family. The system treats them the way Microsoft and Google treat their suites: one shared navy, type scale, and component set, with a single accent per product spaced around the colour wheel. Orbit's is clay, WP Portal's is blue. The full family of six is exposed in Identity settings, where a user can re-tint their own avatar and selected rows without touching status colour. That is what makes the work portable to WP Portal, which page `06` in the Figma file demonstrates against the Daily Review Worklist and Timeline screens.

The redesign addresses each: one accent reserved for selection and activity with a fixed status palette alongside it, a three-signal unread treatment that does not depend on colour, a type and spacing scale that gives every dense view a hierarchy, and a single flat illustration family with five animal marks assigned deterministically per user.

---

## Screens designed

| Screen | Where |
|---|---|
| Login | Built at `/login`, and in the prototype |
| Chats, desktop | Built at `/chat`, and in the prototype |
| Chats, mobile | Built at `/chat` below 768px, and in the prototype |
| Team Tasks, desktop | Figma and prototype |
| Team Tasks, mobile | Figma and prototype |
| Settings modal: Account, Identity, Chat and sound, Alerts and devices, Accessibility, Workspace, Orbit admin | Figma and prototype |
| Settings, mobile | Figma and prototype |
| WP Portal, Daily Review Worklist | Figma and prototype, with default, selection, and date filter states |

Two of these carry most of the argument.

**Identity settings** is where the system becomes the user's. The avatar picker offers the five animal marks or initials, and the accent picker offers all six product colours with one line of copy that states the rule: it tints your avatar and selected rows, and never changes status colours. That sentence is the whole colour system in plain language, at the moment someone might otherwise break it.

**The Portal worklist** is the cross-product test, and it renders in blue rather than clay. Same navy, same type scale, same row rhythm, same status treatment, different product accent. If the system only worked in Orbit's colour it would not be a system.

---

## Local setup

Requires Node 18 or newer.

```bash
git clone https://github.com/emng9/orbit-redesign.git
cd orbit-redesign
npm install
npm run dev
```

Open http://localhost:3000. The app redirects to `/login`. Use the demo credentials above.

No environment variables, no database. Auth is mocked with a localStorage flag and all content comes from a static mock data file.

---

## Tools

| | |
|---|---|
| Design | Figma |
| Prototype | Figma Make |
| Framework | Next.js, App Router, TypeScript |
| Components | shadcn/ui on Base UI |
| Styling | Tailwind, with design tokens as CSS variables in `app/globals.css` |
| Icons | Lucide, 1.5px stroke |
| Type | Public Sans, with IBM Plex Mono for identifiers |
| AI assistance | Claude Code for implementation, Figma Make for the prototype |
| Hosting | Vercel |

The AI-assisted workflow is documented in full in `/prompts`. Nothing was accepted as generated: the first output was committed unedited, critiqued, and revised, and every prompt is saved.

---

## Information architecture and routes

| Route | Purpose |
|---|---|
| `/` | Redirects to `/login` |
| `/login` | Mocked sign in |
| `/chat` | Team Chat. Left rail, conversation list, conversation pane |
| `/states` | Every component state rendered in isolation. Verification only, not linked from the app |

**Key user flow.** Sign in, land in Chats, scan the list for unread conversations, open one, read the thread, reply.

Unread is the load-bearing moment. It carries three signals at once: the conversation name goes SemiBold, the preview darkens from secondary to navy, and an accent dot appears at the right. Any one of the three is enough on its own, which is what makes it readable under a glance and without relying on colour.

---

## Folder structure

```
app/
  page.tsx            redirect to login
  login/page.tsx
  chat/page.tsx
  states/page.tsx     component state reference
  globals.css         design tokens as CSS variables
  layout.tsx
components/
  chat/               screen components: rail, list, rows, conversation, composer, avatar
  ui/                 shadcn primitives, restyled through tokens only
lib/
  mock-data.ts        conversations, messages, users
public/
  avatars/            five animal marks, exported from Figma
  brand/              Orbit logomark
  emoji/              reaction pill states
design-refs/          Figma SVG exports read as geometry reference, not loaded by the app
prompts/              the AI workflow, see below
```

Design tokens live in `app/globals.css` as CSS variables. No component defines its own colour. Nothing in `components/ui` was edited; the shadcn primitives are restyled entirely through tokens, which is how the whole app re-themes from one file.

---

## Prompt folder

`/prompts` documents the AI-assisted implementation end to end.

| File | Contents |
|---|---|
| `01-master-prompt.md` | The master implementation prompt, exactly as run. Eleven sections: product context, user goal, reference screens, what must stay, what should change, visual rules, component states, responsive behaviour, accessibility, file scope, and acceptance criteria |
| `02-first-result.md` | What the first run produced, committed before any edits, with screenshots |
| `03-critique.md` | Fourteen findings split into build failures and specification failures |
| `04-revision-prompt.md` | The focused revision prompt, fixing only what the critique found |
| `05-final-result.md` | Before and after comparison, with every finding's status |
| `06-followups-and-verification.md` | The ten follow-up prompts run after the revision, what I changed by hand, and how the final quality was verified |
| `screenshots/` | First result and final result, desktop and mobile |

The useful finding: the first build followed the prompt more faithfully than it followed the design. Nine of the fourteen problems traced to my specification rather than the model, and each was a case of naming an element and assuming the name carried the design. The sections of the prompt written as values produced accurate output. The sections written as prose drifted.

The model also reported meeting all ten acceptance criteria when four of them were not reachable in the build. That is recorded as the first finding of the critique, because a criterion that can only be confirmed by the thing being graded is not a criterion.

---

## Responsiveness

Desktop from 1024px shows all three panes.

Below 768px the rail becomes a fixed bottom bar with five items, and the conversation list and thread become separate views with a back arrow. Page gutters drop from 24px to 16px.

The mobile conversation header carries the back arrow, the title, the video control, and an overflow. Member count and search move into the overflow. Video stayed visible deliberately: these users need to start a call from a phone, and putting that behind a menu costs a tap at the moment it matters most.

---

## Accessibility

- Every text colour passes WCAG AA on its background. The values were fixed at the token stage rather than adjusted afterwards.
- Unread is never colour alone. Weight, preview colour, and a dot all carry it.
- The focus ring is a 2px accent ring at 2px offset on every interactive element and is never removed. The first build was rendering a blue shadcn default here, which is why it appears in the critique.
- Every icon-only button has an aria-label and a 28px minimum tap target.
- Avatars carry alt text with the person's name.
- The conversation thread is an aria-live polite region.
- Tab order runs rail, list, conversation, composer.

---

## Known limitations

- The deployed app implements the Team Chat screen only, because the prompt package was scoped to one screen as the brief specified. Team Tasks, the Settings modal, and the mobile screens are fully designed and interactive in the Figma Make prototype, and are not part of this repo.
- The message hover toolbar is mouse-only and not reachable by keyboard.
- Auth is mocked with a localStorage flag. There is no session handling, no real credential check, and no password recovery.
- All content is static mock data. Sending a message, starting a call, and search are not wired up.
- `/states` is a verification surface rather than a product route, and is not linked from the app.
- Reaction emoji render as system emoji. The pill container comes from the design system; there is no custom emoji set.
