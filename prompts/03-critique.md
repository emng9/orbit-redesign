# 03: Critique of first result

Comparing the output of `01-master-prompt.md` against two things: the prompt itself, and the Figma file the prompt was written from.

Claude Code reported that it met all ten acceptance criteria. It did not. More usefully, the gap splits into two kinds of problem, and they need different fixes.

**Part A** is where the prompt was specific and the build ignored it. That gets fixed in a revision prompt.

**Part B** is where the build is defensible against the prompt but wrong against the design. That is my specification failing, not the model failing, and it gets fixed by writing better instructions.

Severity: **P1** breaks the system or a stated requirement. **P2** visible drift. **P3** polish.

---

## Part A: build did not follow the prompt

### A1: Self-grade of 10/10 is not supportable (P1)
Criterion 2 requires all nine states from section 7 to exist and be visibly different. Only default, selected, and unread are reachable in the build. Loading, empty, error, and disabled have no path to them in the mock data. Hover and focus are unverifiable from a static screenshot and were not demonstrated.

It reported success on a criterion it had no way to check. This is the finding that matters most, because it means the acceptance criteria in the prompt were not written to be falsifiable. A criterion that can only be confirmed by the thing being graded is not a criterion.

### A2: Conversation pane does not fill the width (P1)
Section 6 says the conversation pane fills the remaining space. The message log measures 617px wide and content stops around x=1372, leaving the rest of the window empty. The header rule and composer terminate at the same edge. Something upstream has a fixed or max width.

### A3: Rail active state has no container (P2)
Section 6 specifies 20px icons in 36px circles, active in #B4380A on a #FDF1EC circle. The build recolors the glyph and omits the circle. Without it there is nothing left to separate hover from active.

### A4: Send button is not the specified component (P2)
Section 6 asks for a 32px #B4380A circle with a white 16px send icon, sitting 12px right of the field. The build renders a pale teal-gray paper plane with no container, which reads as permanently disabled. Criterion 7 also requires the button to be disabled only until text is entered, so the resting state is wrong in both directions.

### A5: Unread preview does not darken (P2)
Section 7 requires the preview to move from #4A5A6A to #0B1F33 on unread, alongside the weight change and the dot. The build bolds the name only. Criterion 4 says unread must be readable without relying on colour, and with one of the three signals missing it is weaker than specified.

### A6: Mock data count is off (P3)
Section 11 asks for eight conversations and one thread of twelve messages. The build shipped nine conversations and ten messages. Small, but it is a stated quantity that was not met while the output claimed full compliance.

### A7: Composer placeholder changed (P3)
Not specified in the prompt, so this is borderline, but the build wrote "Message" where the design reads "Type a new message here." Worth noting because it shows the model filling gaps with its own defaults rather than flagging them.

---

## Part B: prompt did not carry the design across

Everything below is a case where the build is a fair reading of what I wrote. The design intent never made it into the prompt.

### B1: Avatars (P1)
The prompt says "a 40px avatar" and "32px avatar" with no further detail. It says nothing about the flat animal marks, the six accent colours they are drawn from, or the presence dot. The build used initials on a grey circle, which is the obvious default when a spec says only "avatar."

This is the largest single loss in the output and the prompt gave it one word. The revision needs the component name, the sizes, the colour assignment rule, and the dot treatment.

### B2: Left rail contents (P1)
Section 6 names six icons: home, message-square, check-square, calendar, users, settings. The build shipped exactly those six. The design has ten, plus the Orbit logomark at the top, an unread badge on tasks, and sign-out pinned at the bottom. None of the four extra items were written down.

I specified the rail from memory instead of from the file.

### B3: Date dividers (P2)
The design breaks the thread with a centred timestamp and a hairline rule either side. The prompt never mentions them, so the build produced a continuous list. Section 6 describes message spacing in detail and then omits the one element that gives the thread its horizontal structure.

### B4: Reactions (P2)
The clay-outlined reaction pill with a count appears twice in the design and is absent from section 7's state table. Not requested, not built.

### B5: Selected row title colour (P2)
Section 7 says the name goes #B4380A when selected. The build did that. Looking at it live, three signals now carry one state (tint, left bar, title colour) and the clay title reads as a link. The design keeps the title navy. The prompt is wrong here, not the build.

### B6: Header actions (P2)
Section 6 asks for search, call, and more. That is what shipped. The design has a member count pill, a video control with a dropdown, search, and a horizontal overflow, and the title carries the participant count in parentheses. The prompt described a simpler header than the one I designed.

### B7: Seed content is off-product (P3)
Section 11 asked for mock data without saying what it should contain, so the build invented a hospital care coordination scenario. It is plausible for the domain but it is not Orbit team content, and the fabricated error state on the Facilities thread has no reason to sit in a prototype someone is reviewing.

---

## What this tells me about the prompt

The sections that produced accurate output were the ones with values in them: colour, type scale, spacing, message row construction. The sections that produced drift were the ones written as prose.

Every Part B finding traces to the same habit, which is describing an element by name and assuming the name carries the design. "Avatar" and "six icons" are both cases where I knew what I meant and the prompt did not say it.

Public Sans resolved correctly, every text colour on screen came from the token list, and no component in `components/ui` was edited, so criteria 1 and 10 hold.

---

## Priority

A1 and A2 first, then B1 and B2, since those four account for most of the distance between the build and the design. A3 through A5 and B3 through B6 next. The P3 items last.
