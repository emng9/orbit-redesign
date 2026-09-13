"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const VALID_EMAIL = "shirleyli@wanpanel.ai"
const VALID_PASSWORD = "wanpanelorbitredesign"

// Concentric ring diameters (px), all centred on the same point behind the brand mark.
const RING_SIZES = [420, 680, 940, 1200, 1460]

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4380A] focus-visible:ring-offset-2 focus-visible:ring-offset-card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setError(false)
      window.localStorage.setItem("orbit-authenticated", "true")
      router.push("/chat")
    } else {
      setError(true)
    }
  }

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16"
      style={{
        fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
        background:
          "radial-gradient(ellipse 90% 65% at 50% 32%, #F6E4DB 0%, #F6E4DB 45%, #FAF9F7 90%)",
      }}
    >
      <div className="relative z-10 flex w-full flex-col items-center">
        <div className="relative flex flex-col items-center gap-4">
          <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 size-0">
            {RING_SIZES.map((size) => (
              <div
                key={size}
                className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9906D]/25"
                style={{ width: size, height: size }}
              />
            ))}
          </div>

          <Image
            src="/brand/orbit-logo.png"
            alt=""
            width={48}
            height={48}
            className="rounded-md object-cover"
          />
          <h1 className="text-[28px] leading-tight font-semibold">
            <span className="text-foreground">WanPanel</span>{" "}
            <span className="text-primary">Orbit</span>
          </h1>
        </div>

        <Card
          className="relative z-10 mt-8 w-full max-w-[420px] rounded-[10px] shadow-xl"
          style={{ "--card-spacing": "2rem" } as React.CSSProperties}
        >
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <p className="text-center text-[11px] font-semibold tracking-[0.06em] text-foreground uppercase">
                Sign in
              </p>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email or username
                </label>
                <Input
                  id="email"
                  type="text"
                  autoComplete="username"
                  placeholder="Email or username"
                  className="h-11"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Password"
                    className="h-11 pr-10"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className={`absolute top-1/2 right-3 -translate-y-1/2 rounded-sm text-[#5C6B79] hover:text-foreground ${FOCUS_RING}`}
                  >
                    {showPassword ? (
                      <EyeOff size={18} strokeWidth={1.5} />
                    ) : (
                      <Eye size={18} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-sm text-destructive">
                    Incorrect email or password.
                  </p>
                )}
              </div>

              <Button type="submit" className="h-11 w-full">
                Log in
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="relative z-10 mt-10 flex flex-col items-center gap-1 text-center text-[13px] text-[#5C6B79]">
          <p>
            Powered by <span className="font-medium text-foreground">WanPanel</span> AI
          </p>
          <p>© 2026 Wan Panel Alternative Medicine Institute LLC. All rights reserved.</p>
          <p>500 E. Main St. Alhambra, CA 91801</p>
          <p>626.457.7400</p>
        </div>
      </div>
    </div>
  )
}
