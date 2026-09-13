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
