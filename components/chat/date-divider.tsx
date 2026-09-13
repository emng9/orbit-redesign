export function DateDivider({ label }: { label: string }) {
  return (
    <div
      role="separator"
      aria-label={label}
      className="flex items-center gap-3 px-6 py-2"
    >
      <span className="h-px flex-1 bg-border" />
      <span className="shrink-0 text-xs leading-4 text-[#5C6B79]">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}
