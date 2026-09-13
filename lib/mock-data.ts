export type Conversation = {
  id: string
  name: string
  initials: string
  avatarId: string
  online: boolean
  preview: string
  timestamp: string
  unread: boolean
  participantCount: number
}

export type Reaction = {
  emoji: string
  count: number
  /** Whether the current viewer ("me") is one of the reactors. */
  reactedByMe?: boolean
}

export type Message = {
  id: string
  authorId: string
  authorName: string
  initials: string
  text: string
  /** ISO datetime. Fixed (not relative to "now") so day/gap math stays stable across server and client renders. */
  timestamp: string
  reactions?: Reaction[]
}

export const currentUser = {
  id: "me",
  name: "You",
  initials: "Y",
}

/** Presence used for the dot on message-row avatars, keyed by author id. */
export const userPresence: Record<string, boolean> = {
  "priya-nair": true,
  "alex-kim": true,
  "jordan-lee": false,
  me: true,
}

export const conversations: Conversation[] = [
  {
    id: "product-weekly-sync",
    name: "Product Weekly Sync",
    initials: "PW",
    avatarId: "product-weekly-sync",
    online: true,
    preview: "Can someone confirm PR #482 status before standup tomorrow?",
    timestamp: "10:47 AM",
    unread: true,
    participantCount: 6,
  },
  {
    id: "alex-kim",
    name: "Alex Kim",
    initials: "AK",
    avatarId: "alex-kim",
    online: true,
    preview: "Just merged Ticket #204, should unblock design.",
    timestamp: "10:16 AM",
    unread: true,
    participantCount: 2,
  },
  {
    id: "design-team",
    name: "Design Team",
    initials: "DT",
    avatarId: "design-team",
    online: false,
    preview: "Updated the component library, check the changelog.",
    timestamp: "9:40 AM",
    unread: false,
    participantCount: 5,
  },
  {
    id: "sprint-planning",
    name: "Sprint Planning",
    initials: "SP",
    avatarId: "sprint-planning",
    online: true,
    preview: "Backlog grooming moved to Thursday 2pm.",
    timestamp: "8:55 AM",
    unread: true,
    participantCount: 8,
  },
  {
    id: "jordan-lee",
    name: "Jordan Lee",
    initials: "JL",
    avatarId: "jordan-lee",
    online: false,
    preview: "Sent over the agenda for next week.",
    timestamp: "Yesterday",
    unread: false,
    participantCount: 2,
  },
  {
    id: "release-coordination",
    name: "Release Coordination",
    initials: "RC",
    avatarId: "release-coordination",
    online: true,
    preview: "v2.4 ships Friday morning, freeze starts tonight.",
    timestamp: "Yesterday",
    unread: false,
    participantCount: 4,
  },
  {
    id: "marketing-sync",
    name: "Marketing Sync",
    initials: "MS",
    avatarId: "marketing-sync",
    online: false,
    preview: "Campaign brief is ready for review.",
    timestamp: "Tuesday",
    unread: false,
    participantCount: 5,
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    initials: "PN",
    avatarId: "priya-nair",
    online: true,
    preview: "Sounds good, I'll loop in design.",
    timestamp: "Monday",
    unread: false,
    participantCount: 2,
  },
]

const threadsById: Record<string, Message[]> = {
  "product-weekly-sync": [
    {
      id: "m1",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Recapping today's sync: action items below.",
      timestamp: "2026-02-03T16:15:00",
    },
    {
      id: "m2",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "I'll get the doc shared by EOD.",
      timestamp: "2026-02-03T16:16:00",
    },
    {
      id: "m3",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "Sounds good, thanks for running it.",
      timestamp: "2026-02-03T16:24:00",
    },
    {
      id: "m4",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "Morning, quick one before we kick off.",
      timestamp: "2026-02-04T09:02:00",
    },
    {
      id: "m5",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Go ahead.",
      timestamp: "2026-02-04T09:04:00",
    },
    {
      id: "m6",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "Can we push PR #482 to next sprint? Still waiting on review.",
      timestamp: "2026-02-04T09:07:00",
    },
    {
      id: "m7",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "Just merged Ticket #204, should unblock design.",
      timestamp: "2026-02-04T10:15:00",
      reactions: [{ emoji: "🎉", count: 3, reactedByMe: true }],
    },
    {
      id: "m8",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "Also updated the changelog.",
      timestamp: "2026-02-04T10:16:00",
      reactions: [{ emoji: "👍", count: 2 }],
    },
    {
      id: "m9",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Nice, appreciate the quick turnaround.",
      timestamp: "2026-02-04T10:20:00",
    },
    {
      id: "m10",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "Agenda for next week's sync is in the doc, add anything I missed.",
      timestamp: "2026-02-04T10:22:00",
    },
    {
      id: "m11",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Will do.",
      timestamp: "2026-02-04T10:45:00",
    },
    {
      id: "m12",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Also, can someone confirm PR #482 status before standup tomorrow?",
      timestamp: "2026-02-04T10:47:00",
    },
  ],
  "alex-kim": [
    {
      id: "ak-1",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "Morning, quick update on the nurse rounding checklist bug.",
      timestamp: "2026-02-04T09:40:00",
    },
    {
      id: "ak-2",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "Found the cause, it was a stale cache on the discharge summary endpoint.",
      timestamp: "2026-02-04T09:42:00",
    },
    {
      id: "ak-3",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "Fix is up for review now.",
      timestamp: "2026-02-04T09:55:00",
    },
    {
      id: "ak-4",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "QA signed off, deploying to staging.",
      timestamp: "2026-02-04T10:10:00",
    },
    {
      id: "ak-5",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "Just merged Ticket #204, should unblock design.",
      timestamp: "2026-02-04T10:16:00",
    },
  ],
  "design-team": [
    {
      id: "dt-1",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Reviewed the new discharge instructions template, looks good.",
      timestamp: "2026-02-04T09:20:00",
    },
    {
      id: "dt-2",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "One tweak: can we bump the font size on the medication list?",
      timestamp: "2026-02-04T09:22:00",
    },
    {
      id: "dt-3",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "Good catch, updating now.",
      timestamp: "2026-02-04T09:31:00",
    },
    {
      id: "dt-4",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "Also refreshed the icon set for the nurse rounding checklist.",
      timestamp: "2026-02-04T09:36:00",
    },
    {
      id: "dt-5",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "Updated the component library, check the changelog.",
      timestamp: "2026-02-04T09:40:00",
    },
  ],
  "sprint-planning": [
    {
      id: "sp-1",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "Morning all, let's finalize scope for the med reconciliation screen.",
      timestamp: "2026-02-04T08:30:00",
    },
    {
      id: "sp-2",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Can we prioritize the allergy alert fix first? Nursing flagged it as urgent.",
      timestamp: "2026-02-04T08:35:00",
    },
    {
      id: "sp-3",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "Agreed, moving that to the top of the backlog.",
      timestamp: "2026-02-04T08:41:00",
    },
    {
      id: "sp-4",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Thanks. Loop in QA before we commit to the ED triage board work too.",
      timestamp: "2026-02-04T08:47:00",
    },
    {
      id: "sp-5",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "Backlog grooming moved to Thursday 2pm.",
      timestamp: "2026-02-04T08:55:00",
    },
  ],
  "jordan-lee": [
    {
      id: "jl-1",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "Hey, wanted to sync on the discharge workflow rollout timeline.",
      timestamp: "2026-02-03T15:10:00",
    },
    {
      id: "jl-2",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "Ops team at Memorial General wants a walkthrough before go-live.",
      timestamp: "2026-02-03T15:12:00",
    },
    {
      id: "jl-3",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "I can host Thursday morning if that works on your end.",
      timestamp: "2026-02-03T15:20:00",
    },
    {
      id: "jl-4",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "Sent over the agenda for next week.",
      timestamp: "2026-02-03T15:24:00",
    },
  ],
  "release-coordination": [
    {
      id: "rc-1",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "Status check on v2.4, are we still on track for Friday?",
      timestamp: "2026-02-03T13:05:00",
    },
    {
      id: "rc-2",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "Yes, everything's merged and QA is finishing regression today.",
      timestamp: "2026-02-03T13:12:00",
    },
    {
      id: "rc-3",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "Great, I'll notify the hospital ops leads about the release window.",
      timestamp: "2026-02-03T13:15:00",
    },
    {
      id: "rc-4",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "Flagging that the med reconciliation fix is included in this one.",
      timestamp: "2026-02-03T13:20:00",
    },
    {
      id: "rc-5",
      authorId: "alex-kim",
      authorName: "Alex Kim",
      initials: "AK",
      text: "v2.4 ships Friday morning, freeze starts tonight.",
      timestamp: "2026-02-03T13:24:00",
    },
  ],
  "marketing-sync": [
    {
      id: "ms-1",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Drafting the case study on the nurse rounding checklist rollout.",
      timestamp: "2026-02-02T11:00:00",
    },
    {
      id: "ms-2",
      authorId: "jordan-lee",
      authorName: "Jordan Lee",
      initials: "JL",
      text: "Love that. Can we get a quote from the ops lead at Memorial General?",
      timestamp: "2026-02-02T11:06:00",
    },
    {
      id: "ms-3",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Already reached out, waiting to hear back.",
      timestamp: "2026-02-02T11:10:00",
    },
    {
      id: "ms-4",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Campaign brief is ready for review.",
      timestamp: "2026-02-02T11:15:00",
    },
  ],
  "priya-nair": [
    {
      id: "pn-1",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Heads up, the allergy alert fix is ready for your review.",
      timestamp: "2026-02-01T14:00:00",
    },
    {
      id: "pn-2",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "QA wants to double check it against the med reconciliation flow first.",
      timestamp: "2026-02-01T14:03:00",
    },
    {
      id: "pn-3",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "I'll set up a quick test with the ops team tomorrow.",
      timestamp: "2026-02-01T14:08:00",
    },
    {
      id: "pn-4",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Sounds good, I'll loop in design.",
      timestamp: "2026-02-01T14:12:00",
    },
  ],
}

export function getThread(conversationId: string): Message[] {
  return threadsById[conversationId] ?? []
}

export function fetchThread(conversationId: string): Promise<Message[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getThread(conversationId)), 450)
  })
}

const DAY_GAP_MINUTES = 30

function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function needsDateDivider(previous: Message | undefined, current: Message): boolean {
  if (!previous) return true
  const prevDate = new Date(previous.timestamp)
  const currDate = new Date(current.timestamp)
  if (!isSameCalendarDay(prevDate, currDate)) return true
  const gapMinutes = (currDate.getTime() - prevDate.getTime()) / 60000
  return gapMinutes > DAY_GAP_MINUTES
}

export function formatDividerLabel(timestamp: string): string {
  const date = new Date(timestamp)
  const datePart = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  })
  const timePart = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  })
  return `${datePart} · ${timePart}`
}

export function formatMessageTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  })
}
