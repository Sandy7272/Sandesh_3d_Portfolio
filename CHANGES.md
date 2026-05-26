# Changes Summary — Navbar Fixes + AboutPage Experience Section

## 🛠️ Files Modified

1. `src/components/ui/resizable-navbar.tsx` — Rewritten primitive (layout & UI fixes)
2. `src/components/Navbar.tsx` — Rewritten consumer (clean layout, SPA navigation)
3. `src/components/AboutPage.tsx` — Replaced "Journey" with proper Experience section
4. `src/components/styles/AboutPage.css` — Added full Experience section styles (~400 lines appended)

---

## 🐛 Navbar Issues Fixed

### Root causes that were broken

| Bug | Cause | Fix |
|---|---|---|
| Nav items overlapping portrait & contact button | `NavItems` was `position: absolute inset-0` while parent was flex — items rendered on top of siblings | Made `NavItems` a normal flex item; removed absolute positioning |
| Navbar jumping/flickering at scroll threshold | Single 100px threshold caused rapid toggling | Added **scroll hysteresis** (enter compact at 80px, exit at 40px) + 10ms debounce |
| Width "jumping" when compacting | `width: 100% → fit-content` + hard `minWidth: 800px` caused sudden layout jolt | Smooth interpolation between `min(1100px, 100% - 32px)` and `min(680px, 100% - 32px)` |
| Portrait jitter during resize | `motion.img` had both `layout` prop AND `animate` for width/height — they competed | Removed `layout`, use `animate` only |
| Hash links (#experience, #work) broken on /about page | Clicking them tried to scroll non-existent sections on the about page | New universal handler — detects current route; if not on home, routes to `/` then scrolls after mount |
| `window.location.href = "/about"` caused a full page reload | Used native navigation instead of SPA router | Now uses `useNavigate()` from react-router |
| No active-link indicator | No active state at all | Added `nav-active` `layoutId` animated pill that shows current route |
| Mobile menu had weird `border-radius: 4px` when scrolled | Hardcoded value | Always `border-radius: 999px` (matching pill) |
| Mobile header hamburger was a bare icon | No affordance, no hover state | Wrapped in a styled circle button with rotate animation between Menu/X |
| Mobile menu items had no visual hierarchy | Plain text links | Pill-style items with active highlight + ↗ affordance |

### Visual / UX improvements

- ✨ Better glass effect — `blur(16px) saturate(180%)` for richer backdrop
- ✨ Refined shadow stack — proper inset highlight + softer drop shadow
- ✨ "Available" badge now sits in an emerald-tinted pill (more recognizable as a status)
- ✨ Contact button has a subtle `-1px` lift on hover with elevated shadow
- ✨ Center nav items use a shared `layoutId` for smooth hover-pill transitions
- ✨ Active route shows a persistent pill background that smoothly transitions between routes
- ✨ Mobile menu uses a proper rounded card with backdrop blur and elevated shadow
- ✨ Mobile header shows the user's name when at top, then morphs to "Available" pill when scrolled

---

## ✨ AboutPage — Experience Section Added

The old "Journey in Design" block on `/about` only showed:
- A 2-column grid with company name + a truncated `job.highlights.slice(0,2).join(' ')`
- No skill tags
- No stats
- No timeline visual

The new `#experience` section now shows:

1. **Section kicker pill** — "Career Journey" badge for visual hierarchy
2. **Stats strip** — 4+ years, 3 companies, 50+ projects, 3× Best Employee (gradient numbers)
3. **Vertical timeline** — animated gradient track with glowing accent dots beside each role
4. **Per-role experience cards** — role, company, period badge, index number, ALL highlights (not just first 2), and per-role skill tags (React/Three.js/NeRF for MetaShop, Blender/AE for Byju's, etc.)
5. **Hover interaction** — card lifts 3px, accent border glows, top gradient line animates in
6. **Education sub-block** — separated, displayed as compact cards beneath the experience timeline

The section is anchored with `id="experience"` and `scroll-margin-top: 90px` so the navbar's "Experience" link works seamlessly via the new cross-page navigation: `/about → click Experience → routes to home → smooth-scrolls to #experience`.

Full **dark + light mode** support has been added (accent color adapts between teal `#5eead4` and indigo `#6a71df`).

Fully **responsive** down to 480px:
- 4-col stats → 2-col → 2-col compact
- Card top row collapses to vertical on mobile
- Timeline indent shrinks
- Education item collapses to single column

---

## ✅ Validation

- `npx tsc -b` — **passes cleanly** (no type errors)
- `npx esbuild` on each modified file — **passes** (clean transform)
- Vite dev server starts and serves `/` with status 200 (full build skipped due to sandbox memory limit; type checking is the authoritative validation for the React/TS changes)

---

## 🔧 How to run

```bash
npm install      # or: bun install
npm run dev      # http://localhost:5173
```

Test the navbar fixes:
- Scroll down on `/` → navbar smoothly compacts; no flicker, no jump
- Click "About" → SPA navigates (no page reload)
- On `/about`, click "Experience" → routes to home and smooth-scrolls to the Career section
- Resize the window → no layout jolt
- Mobile viewport → tap hamburger; smooth menu, active item highlighted
