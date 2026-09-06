# Git City
### Turn your GitHub profile into a living 3D city

---

## 1. Vision

Git City takes a single GitHub user's account — their repositories, commits, contributors, and activity — and renders it as a small, explorable 3D city. Instead of a public "explore all of GitHub" map (which is enormous, noisy, and hard to make meaningful), each user logs in with GitHub OAuth and gets **their own city**: a personal, private, walkable representation of their coding life.

The core promise to the user isn't "look at data" — it's "look at *your* city." The emotional hook is recognition: *that's my biggest repo, that's the neighborhood where all my forks live, that street's been dark for six months.*

The second pillar, equally important to the concept, is **feel**. The city itself uses fairly simple geometry — the differentiator is that every camera move, hover, click, and scroll happens with smooth, physically-plausible motion. No hard cuts, no instant pop-ins, no janky scroll-jacking. This document treats "buttery smooth" as a first-class requirement, not a nice-to-have polish pass at the end.

---

## 2. Why Not "All of GitHub"?

Mapping the entire public GitHub graph was the original idea, but it's the wrong starting point:

| All-of-GitHub approach | Personal City approach |
|---|---|
| Tens of millions of repos/users — needs a data warehouse, not an API call | One user's data fits in a handful of API calls |
| No natural "camera home" — where does a visitor even start? | The user's own profile is the obvious entry point |
| Meaning is abstract (a stranger's repo) | Meaning is personal (your repo, your streak, your contributors) |
| Extremely hard to keep smooth (huge scene graph) | Small, bounded scene — realistic to hit 60fps |
| Rate-limited and stale almost immediately | One user's data refreshes cheaply and often |

Scoping down to "your account as a city" is what makes the smoothness goal achievable at all. This can always be extended later (see §9, Future Ideas) once the single-user experience is solid.

---

## 3. Core Metaphor: Mapping GitHub Data → City Elements

This is the heart of the concept — every visual element should map to something real, so the city feels *discovered*, not decorated.

| City Element | GitHub Data Source | Visual Rule |
|---|---|---|
| **Buildings** | Repositories | Height = stars (or commit count); footprint width = repo size (KB) or file count; building material/color = primary language (JS = one palette, Python = another, etc.) |
| **Lit windows** | Recent commit activity | Windows glow proportionally to commits in the last N days; a repo with no recent activity goes dark |
| **Districts / neighborhoods** | Organizations or topics | Repos grouped by org, or clustered by shared topics/tags, form distinct neighborhoods with their own road layout |
| **Citizens (walking figures)** | Contributors / followers | Number of simple animated figures near a building scales with contributor count; followers can appear as citizens in a "town square" near the user's profile building |
| **Traffic (moving objects)** | Open PRs / Issues | Small vehicles or particles moving between buildings represent open pull requests or issues in flight |
| **Parks / green space** | Forked repos, or repos with open-source license | Green areas instead of buildings — a visual break in the skyline |
| **Skyline height / city size** | Total repos, account age | Larger, older accounts get a bigger city footprint |
| **Weather & time of day** | Commit streak / recency | Active streak = daytime, sunny; long inactivity = dusk/night settling in; this becomes an ambient storytelling device rather than raw data |
| **Landmarks** | Pinned repos | Pinned repos get distinct, taller/more detailed "monument" buildings near the city center |
| **Roads** | Commit chronology | The main road can literally be a timeline — walking down it moves through the account's history |

This table is the single most important artifact of the whole project — it should be revisited and refined before any code is written, since it drives both the data-fetching layer and the 3D generation logic.

---

## 4. User Flow

1. **Landing page** — a short looping/ambient 3D scene (a generic, non-personalized skyline) with a single "Sign in with GitHub" call to action. No dashboard, no clutter — this page's only job is to make someone want to see *their* city.
2. **OAuth login** — standard GitHub OAuth (read-only scope: public repo + user data; no write access needed).
3. **Data fetch + processing** — pull repos, languages, commit activity, contributors, followers, pinned items. Transform into the "city schema" (see §6).
4. **City generation** — procedurally place buildings/districts based on the schema. This happens once per session (or cached), not on every visit, to avoid the city "rearranging itself" and feeling unstable.
5. **Arrival sequence** — camera starts high above the city, then eases down into an establishing shot (this is the first big smoothness moment — see §7).
6. **Exploration** — orbit/pan/zoom controls, hover-to-inspect buildings (repo name, stars, language, last commit), click to "enter" a building for repo detail (README summary, recent commits, contributor list).
7. **Scroll-based tour (optional guided mode)** — a "Take me on a tour" button drives the camera through the city on a scripted path, tied to scroll position, narrating the account's story (oldest repo → most active → most starred → current streak).
8. **Share** — export a snapshot or short looping clip of the city to share (e.g., as a portfolio flourish or social post).

---

## 5. Technical Architecture

### 5.1 Stack

- **Frontend framework:** React + `react-three-fiber` (R3F) as the Three.js binding — keeps the 3D scene declarative and easier to maintain than raw Three.js.
- **3D engine:** Three.js (via R3F), with `@react-three/drei` for common helpers (camera controls, environment maps, text, instancing utilities).
- **Animation:**
  - GSAP (with its Three.js/R3F-friendly ticker) for camera moves, easing, and sequenced transitions.
  - Framer Motion for 2D UI overlays (login screen, repo detail panels, loading states).
  - `@react-three/drei`'s `ScrollControls` or a custom scroll-linked timeline for the guided tour.
- **State/data:** React Query (or SWR) for caching GitHub API responses and handling loading/error states without janky re-fetches.
- **Backend (thin):**
  - Serverless functions (Vercel/Netlify functions or a small Node/Express service) to handle the OAuth token exchange (this must not happen client-side, since it involves a client secret).
  - A lightweight caching layer (e.g., Redis or even in-memory + edge cache) so repeated visits don't re-hit GitHub's rate limits.
- **GitHub API:** Primarily GraphQL (`/graphql`) since it lets you request exactly the nested fields needed (repos + languages + commit history + contributors) in one round trip, which matters a lot for both rate limits and perceived load time.
- **Hosting:** Vercel or Netlify (both handle serverless functions + static hosting well, and have good cold-start times, which matters for the "smooth" goal).

### 5.2 Data Flow

```
GitHub OAuth  →  Backend token exchange  →  GitHub GraphQL API
                                                     ↓
                                        Raw account data (JSON)
                                                     ↓
                                   Transform layer → "City Schema"
                                                     ↓
                                        Cached (per-user, TTL ~1hr)
                                                     ↓
                                   Frontend consumes schema → generates
                                   Three.js scene graph procedurally
```

Keeping the "transform layer" as a distinct step (rather than shaping the scene directly from raw GitHub JSON) matters: it means the 3D generation code never has to know about GitHub's API shape, only about the clean City Schema — making it far easier to tune the metaphor in §3 without touching rendering code.

---

## 6. City Schema (Simplified Example)

```json
{
  "user": { "login": "octocat", "followers": 42, "accountAgeYears": 6 },
  "districts": [
    {
      "name": "personal-projects",
      "buildings": [
        {
          "repoName": "git-city",
          "height": 0.82,
          "footprint": 0.4,
          "material": "javascript",
          "windowGlow": 0.9,
          "isPinned": true,
          "contributors": 3,
          "openPRs": 2,
          "lastCommitDaysAgo": 1
        }
      ]
    }
  ],
  "ambient": { "streakDays": 14, "timeOfDay": "day", "weather": "clear" }
}
```

All numeric visual properties (`height`, `footprint`, `windowGlow`) should already be normalized (0–1) by the backend transform layer, so the frontend never does raw data math mid-render — just maps normalized values to scene parameters.

---

## 7. The Smoothness Requirement (Detailed)

Since this is explicitly the differentiating goal of the project, it deserves its own dedicated engineering checklist rather than being treated as generic "polish."

### 7.1 Performance foundations (smoothness starts here, not with easing curves)
- **Instancing:** Use `InstancedMesh` for repeated geometry (windows, citizens, streetlights) instead of individual meshes — this is the single biggest win for frame rate in a "city" scene.
- **LOD (Level of Detail):** Buildings far from the camera render as simplified boxes; detail (windows, signage) only renders up close.
- **Frustum culling / chunking:** Only render the district currently in or near view.
- **Texture atlasing:** Combine building materials into shared texture atlases to minimize draw calls.
- **Target 60fps on mid-range hardware**, with a graceful degradation mode (reduced shadow quality, fewer particles) if frame time budget is exceeded — detected at runtime, not just assumed.

### 7.2 Camera & transition language
- All camera movement uses eased interpolation (GSAP `power2.inOut` or similar) — never an instant cut or linear tween, which reads as mechanical.
- Define a small set of **named camera moves** reused throughout the app (e.g., `flyToBuilding`, `establishingShot`, `returnToOverview`) so transitions feel consistent rather than one-off.
- Damped orbit controls (drei's `CameraControls` with damping enabled) so manual dragging has inertia instead of stopping dead when the mouse is released.

### 7.3 Loading & first impression
- Never show a blank scene or a spinner-on-black. Show a low-poly "skeleton city" that resolves into the real city as data arrives (buildings rising into place with a staggered, eased animation, not all popping in at once).
- Stagger building "grow-in" animations by district, with a small random delay offset per building, so the city feels like it's assembling organically rather than rendering in a rigid grid-scan.

### 7.4 Scroll behavior
- If using scroll to drive the camera tour, decouple scroll *input* from camera *position* using a lerped/damped follow value — the camera should always be easing toward the scroll-implied position, never snapped to it. This avoids the "juddery scroll-jack" feeling common in scroll-driven 3D sites.
- Provide an easy escape from scroll-tour mode back to free orbit at any time (no forced narrative lock-in).

### 7.5 Micro-interactions
- Hover states on buildings: subtle scale/glow change with a short eased transition (~150–250ms), plus a UI info card that fades/slides in rather than appearing instantly.
- Click-to-enter a building: a short camera dolly-in + cross-fade to the repo detail panel, rather than an abrupt modal pop.
- Consistent easing curves and durations should be defined once (a small "motion tokens" file: durations, easing functions) and reused everywhere, the same way a design system defines color tokens.

---

## 8. Feature Scope

### MVP
- GitHub OAuth login
- Fetch repos, languages, stars, commit recency, contributors, followers
- Procedural city generation from the schema
- Orbit camera with damped controls
- Hover for repo info, click to view repo detail panel
- Day/night ambient state based on commit streak
- Core smooth-motion foundations from §7.1–7.3

### V2
- Scroll-driven guided tour mode
- District grouping by organization/topic
- Shareable city snapshot/clip export
- Mobile-friendly camera controls (touch orbit, tap-to-inspect)

### Future / Stretch
- Compare two users' cities side by side
- "Visit a friend's city" (with their consent / public data only)
- Seasonal/weekly city changes reflecting ongoing activity (city evolves over time)
- Optional public "skyline gallery" of opted-in cities (a much smaller, curated version of the original all-of-GitHub idea)

---

## 9. Key Risks & Mitigations

| Risk | Mitigation |
|---|---|
| GitHub API rate limits (especially for users with many repos) | Use GraphQL to batch requests; cache per-user results with a reasonable TTL; paginate gracefully for very large accounts |
| Users with very large accounts (1000+ repos) tank performance | Cap the number of "fully modeled" buildings; aggregate the long tail into a generic "outskirts" district |
| Scene complexity fights the smoothness goal | Keep geometry deliberately simple/stylized (low-poly, flat-shaded) rather than photorealistic — this is a style choice that also protects frame rate |
| OAuth/privacy concerns | Read-only scopes only; clearly state what data is used; no data stored beyond a short cache window unless the user opts into a saved profile |
| Mobile performance | Automatic quality tier detection (device capability check) that reduces instance counts/shadow quality on lower-end devices |

---

## 10. Suggested Next Steps

1. Lock in the metaphor table (§3) — this is cheap to change now and expensive to change after the 3D generation code depends on it.
2. Build a static, hard-coded "sample city" first (no OAuth, no live data) purely to prototype the *feel* — camera moves, hover states, load-in animation — since that's the hardest and most differentiating part.
3. Only after the feel is right, wire up real GitHub OAuth + GraphQL data into the schema.
4. Playtest on a mid-range laptop and a mid-range phone early — smoothness claims are only real once verified off a high-end dev machine.

---

*This document is a planning artifact — feel free to treat the metaphor table and feature scope as living sections to revise as the idea develops.*
