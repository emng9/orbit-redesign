export type Conversation = {
  id: string
  name: string
  initials: string
  preview: string
  timestamp: string
  unread: boolean
}

export type Message = {
  id: string
  authorId: string
  authorName: string
  initials: string
  text: string
  timestamp: string
}

export const currentUser = {
  id: "me",
  name: "You",
  initials: "Y",
}

export const conversations: Conversation[] = [
  {
    id: "care-coordination",
    name: "Care Coordination Team",
    initials: "CC",
    preview: "Can someone confirm bed availability on 4 before rounds?",
    timestamp: "9:41 AM",
    unread: true,
  },
  {
    id: "emily-chen",
    name: "Dr. Emily Chen",
    initials: "EC",
    preview: "I'll sign off on the discharge once labs are back.",
    timestamp: "9:12 AM",
    unread: true,
  },
  {
    id: "nursing-2b",
    name: "Nursing Station 2B",
    initials: "N2",
    preview: "Shift handoff notes are in the binder, thanks all.",
    timestamp: "8:57 AM",
    unread: false,
  },
  {
    id: "discharge-planning",
    name: "Discharge Planning",
    initials: "DP",
    preview: "Transport is booked for 2pm, family notified.",
    timestamp: "8:30 AM",
    unread: true,
  },
  {
    id: "marcus-alvarez",
    name: "Marcus Alvarez",
    initials: "MA",
    preview: "Following up on Case #48213 before shift change.",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "icu-rapid-response",
    name: "ICU Rapid Response",
    initials: "IR",
    preview: "All clear, situation resolved at 11:48pm.",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "facilities",
    name: "Facilities",
    initials: "FA",
    preview: "Elevator B is back in service as of this morning.",
    timestamp: "Tuesday",
    unread: false,
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    initials: "PN",
    preview: "Sounds good, I'll loop in social work.",
    timestamp: "Monday",
    unread: false,
  },
]

const threadsById: Record<string, Message[]> = {
  "care-coordination": [
    {
      id: "m1",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Morning all — checking in on bed availability for Floor 4 before rounds.",
      timestamp: "9:02 AM",
    },
    {
      id: "m2",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "We have two discharges pending this morning, so it should free up shortly.",
      timestamp: "9:03 AM",
    },
    {
      id: "m3",
      authorId: "marcus-alvarez",
      authorName: "Marcus Alvarez",
      initials: "MA",
      text: "Case #48213 is one of them — family is aware and transport is being arranged.",
      timestamp: "9:06 AM",
    },
    {
      id: "m4",
      authorId: "emily-chen",
      authorName: "Dr. Emily Chen",
      initials: "EC",
      text: "I'll sign off on that discharge once the morning labs are back.",
      timestamp: "9:11 AM",
    },
    {
      id: "m5",
      authorId: "emily-chen",
      authorName: "Dr. Emily Chen",
      initials: "EC",
      text: "Should be within the hour.",
      timestamp: "9:11 AM",
    },
    {
      id: "m6",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Perfect, thank you. I'll hold the bed request until then.",
      timestamp: "9:14 AM",
    },
    {
      id: "m7",
      authorId: "marcus-alvarez",
      authorName: "Marcus Alvarez",
      initials: "MA",
      text: "Second discharge is Case #48227, no blockers on our end.",
      timestamp: "9:20 AM",
    },
    {
      id: "m8",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Great, noted.",
      timestamp: "9:21 AM",
    },
    {
      id: "m9",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "I'll send an update to the charge nurse once both beds are confirmed clean.",
      timestamp: "9:22 AM",
    },
    {
      id: "m10",
      authorId: "emily-chen",
      authorName: "Dr. Emily Chen",
      initials: "EC",
      text: "Labs are back — cleared to discharge Case #48213.",
      timestamp: "9:38 AM",
    },
    {
      id: "m11",
      authorId: "marcus-alvarez",
      authorName: "Marcus Alvarez",
      initials: "MA",
      text: "On it, letting transport know now.",
      timestamp: "9:39 AM",
    },
    {
      id: "m12",
      authorId: "priya-nair",
      authorName: "Priya Nair",
      initials: "PN",
      text: "Can someone confirm bed availability on 4 before rounds?",
      timestamp: "9:41 AM",
    },
  ],
}

export function getThread(conversationId: string): Message[] {
  return threadsById[conversationId] ?? []
}

/**
 * The Facilities thread simulates one failed fetch before succeeding, so the
 * conversation pane's error + retry state has a real, deterministic trigger.
 */
const failedOnce = new Set<string>()

export function fetchThread(conversationId: string): Promise<Message[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (conversationId === "facilities" && !failedOnce.has(conversationId)) {
        failedOnce.add(conversationId)
        reject(new Error("Couldn't load this conversation."))
        return
      }
      resolve(getThread(conversationId))
    }, 450)
  })
}
