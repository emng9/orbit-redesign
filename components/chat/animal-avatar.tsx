import Image from "next/image"

const MARKS = [
  { key: "penguin", circle: "#6787FF", dark: "#3E58D1" },
  { key: "cat", circle: "#00A382", dark: "#007A61" },
  { key: "rabbit", circle: "#B46EFA", dark: "#8C3FE0" },
  { key: "bear", circle: "#C38200", dark: "#8F5F00" },
  { key: "bird", circle: "#00A637", dark: "#007A28" },
  { key: "initials", circle: "#F75D1E", dark: "#F75D1E" },
] as const

type MarkKey = (typeof MARKS)[number]["key"]

const MARK_SRC: Record<Exclude<MarkKey, "initials">, string> = {
  penguin: "/avatars/Name Avatar=Penguin.png",
  cat: "/avatars/Name Avatar=Cat.png",
  rabbit: "/avatars/Name Avatar=Rabbit.png",
  bear: "/avatars/Name Avatar=Bear.png",
  bird: "/avatars/Name Avatar=Bird.png",
}

const SIZE_PX = { lg: 40, md: 32, sm: 24 } as const
type AvatarSize = keyof typeof SIZE_PX

const SURFACE_HEX = { card: "#FFFFFF", page: "#FAF9F7" } as const
type Surface = keyof typeof SURFACE_HEX

function hashId(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  }
  return hash
}

/** Deterministic so a given person always renders the same mark and colour. */
export function pickMark(userId: string) {
  return MARKS[hashId(userId) % MARKS.length]
}

export function AnimalAvatar({
  userId,
  name,
  initials,
  size = "md",
  online,
  surface = "card",
  className,
}: {
  userId: string
  name: string
  initials: string
  size?: AvatarSize
  online: boolean
  surface?: Surface
  className?: string
}) {
  const mark = pickMark(userId)
  const px = SIZE_PX[size]

  return (
    <span
      role="img"
      aria-label={name}
      className={`relative inline-flex shrink-0 rounded-full ${className ?? ""}`}
      style={{ width: px, height: px }}
    >
      <span
        className="flex size-full items-center justify-center overflow-hidden rounded-full"
        style={{ backgroundColor: mark.circle }}
      >
        {mark.key === "initials" ? (
          <span
            className="font-semibold text-white"
            style={{ fontSize: Math.max(10, Math.round(px * 0.36)) }}
          >
            {initials}
          </span>
        ) : (
          <Image
            src={MARK_SRC[mark.key]}
            alt=""
            width={px}
            height={px}
            className="size-full object-cover"
          />
        )}
      </span>
      <span
        aria-hidden="true"
        className="absolute right-0 bottom-0 rounded-full"
        style={{
          width: 10,
          height: 10,
          backgroundColor: online ? "#15803D" : "#9E9A90",
          boxShadow: `0 0 0 2px ${SURFACE_HEX[surface]}`,
        }}
      />
    </span>
  )
}
