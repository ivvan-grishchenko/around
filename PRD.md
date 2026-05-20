# PRD: Around — Social Travel Tracker (MVP)

## Problem Statement

Travelers who visit many countries lack a beautiful, personal way to visualize their journeys, share their progress with others, and keep organized records of where they've been. Existing solutions are either too complex (full trip planners), too social (Instagram-style feeds), or too bare (spreadsheet lists). Users want a dark, immersive dashboard centered on an interactive globe that shows their coverage, with the ability to log visits, upload photos, track wishlist destinations, and share a public profile — all without paying for infrastructure.

## Solution

**Around** is a social travel tracker where authenticated users log individual country visits (with dates, cities, photos, and notes), view them on a custom Three.js globe with animated arcs from their home base, browse analytics about their travel patterns, maintain a wishlist of future destinations, and share a public profile page. The application is built as a single TanStack Start app deployed on Cloudflare Workers, using Cloudflare D1 for relational data, Cloudflare R2 for photo storage, and Clerk for authentication — all within free-tier limits.

## User Stories

### Authentication & Onboarding
1. As a new user, I want to sign up and log in via Clerk, so that I can access my personal travel tracker securely.
2. As a new user, I want to see an empty Tracker with guidance to set my Home Base and log my first Visit, so that I know how to get started.
3. As a user, I want to set my Home Base by searching for and selecting a city, so that my globe arcs originate from the correct location.
4. As a user, I want to choose a visual Theme, so that the app matches my aesthetic preference.

### Tracker & Globe
5. As a user, I want to see a list of all my Visits in the Visited Log, so that I can browse my travel history chronologically.
6. As a user, I want to see an interactive Three.js globe with animated arcs flying from my Home Base to each visited country, so that I can visualize my global coverage.
7. As a user, I want the globe to show only one arc per country (pointing to the primary city of my most recent Visit), so that the visualization stays clean even if I visit a country multiple times.
8. As a user, I want to click on a country in the Visited Log to focus the globe on that country, so that I can spatially locate my visits.
9. As a user, I want to click on a country on the globe to highlight it in the Visited Log, so that I can find its details quickly.
10. As a user, I want to see a Total Coverage metric (e.g., "42 / 195 countries"), so that I can track my progress toward visiting every country.

### Visit Management
11. As a user, I want to create a new Visit via a modal form with autocomplete for country and city selection, so that I can log my travels quickly and accurately.
12. As a user, I want to specify a date range for each Visit, so that I know when I was in each country.
13. As a user, I want to add multiple cities to a Visit, so that I can record all the places I visited within that country.
14. As a user, I want to add free-text Notes to a Visit, so that I can record memories and impressions.
15. As a user, I want to set a Visit's visibility to public or private, so that I can control what appears on my shared Profile.
16. As a user, I want to edit an existing Visit, so that I can correct mistakes or add missing details.
17. As a user, I want to delete a Visit, so that I can remove entries I no longer want.
18. As a user, I want deleted Visits to also remove their associated Photos from storage, so that I don't pay for orphaned files.

### Insights
19. As a user, I want to view the Insights page for a country, so that I can see all my Visits to that country in one place.
20. As a user, I want the Insights page to show my most recent Visit by default, so that I immediately see the latest trip.
21. As a user, I want to browse older Visits to the same country from the Insights page, so that I can compare trips over time.
22. As a user, I want the Insights page to show the cities, photos, and notes for a Visit, so that I can relive the experience.
23. As a user, I want to upload photos to a Visit via drag-and-drop, so that I can build a visual record of my travels.
24. As a Free-tier user, I want to be limited to 3 photos per Visit and 50 total photos, so that I understand the storage constraints.
25. As a Pro-tier user, I want unlimited photos per Visit, so that I can fully document my trips.

### Wishlist
26. As a user, I want to maintain a Wishlist of countries I intend to visit, so that I can plan future travel.
27. As a user, I want to assign a priority rank to each Wishlist Item, so that I can prioritize my dream destinations.
28. As a user, I want to add an estimated date to a Wishlist Item, so that I can roughly plan when I might go.
29. As a user, I want a Wishlist Item to be automatically removed when I create a Visit for that country, so that my Wishlist stays current.
30. As a user, I want the Wishlist to not appear on the globe, so that the globe only shows achieved coverage.

### Analytics
31. As a user, I want to see my Total Coverage (countries visited / total countries), so that I can track my global progress.
32. As a user, I want to see a bar chart of new countries visited per year, so that I can identify my most active travel years.
33. As a user, I want to see a travel activity heatmap (like GitHub contributions), so that I can visualize my travel density over time.
34. As a user, I want to see a donut chart of my visited countries by continent, so that I can understand my geographic distribution.
35. As a user, I want to see my current travel streak and longest streak, so that I can gamify my travel habits.

### Archive
36. As a user, I want to browse all my photos grouped by country in the Archive view, so that I can visually revisit my travels.
37. As a user, I want the Archive to be read-only, so that I don't accidentally modify photos outside of the Visit context.

### Profile & Sharing
38. As a user, I want a public Profile page at `/u/:handle`, so that I can share my travel history with others.
39. As a user, I want only my public Visits to appear on my Profile, so that I maintain privacy over sensitive trips.
40. As a user, I want my Profile to show my travel stats and globe visualization, so that visitors can see my coverage at a glance.
41. As a user, I want to share my Profile via a direct link, so that I can post it on social media.

### Config & Export
42. As a user, I want to edit my display name and user handle in Config, so that my public Profile is personalized.
43. As a user, I want to change my Home Base in Config, so that my globe arcs update if I relocate.
44. As a user, I want changing my Home Base to immediately recalculate all globe arcs, so that my visualization always reflects my current origin.
45. As a user, I want to select my timezone in Config, so that dates are displayed correctly.
46. As a user, I want to export all my data (Visits, Wishlist Items, Profile metadata) as JSON, so that I have a backup.

### Admin/Tier Management
47. As an admin, I want to manually assign Pro tier status to users, so that I can grant premium access without a payment system during MVP.

## Implementation Decisions

### Architecture
- The application is built with **TanStack Start** and deployed on **Cloudflare Workers** (see ADR-0001). This choice prioritizes zero-cost infrastructure over the simplicity of a Node.js server.
- The client never accesses D1 directly. All reads and writes flow through **TanStack Start Server Functions**.
- **Clerk** handles authentication, session management, and JWT validation.
- **pnpm** is the package manager.

### Tooling
- **oxlint** is the linter. It replaces ESLint for faster linting with fewer dependencies.
- **oxc formatter** handles code formatting. It replaces Prettier with a Rust-based formatter that is significantly faster.
- Both are enforced in CI and via pre-commit checks.

### Database & Storage
- **Cloudflare D1** (SQLite) is the primary database, accessed via **Drizzle ORM** through a Workers binding.
- **Drizzle Kit** manages schema migrations.
- D1 is accessed directly from Workers via a binding — no connection pooler needed since D1 is colocated with the Worker runtime.
- **Cloudflare R2** stores original photo uploads.
- **Cloudflare Images** serves transformed variants (thumbnails, web-optimized) on-the-fly via URL parameters.
- Photo uploads use **pre-signed R2 URLs**: the server generates signed PUT URLs, the client uploads directly to R2, then confirms success to the server.

### Core Modules

**Geographic Dataset Module** (deep module)
- Encapsulates all location data and lookup logic.
- Internally maintains a curated static JSON of ~195 countries and ~1000 major cities with lat/lng coordinates.
- Exposes a simple interface: `findCountry(query)`, `findCity(countryCode, query)`, `getCoordinates(city)`.
- Falls back to a free geocoding API (e.g., Nominatim) for locations not in the static dataset.
- This module isolates the complexity of geographic data from the rest of the application.

**Theme System Module** (deep module)
- Each Theme is a configuration object containing color values.
- Exposes `getTheme(themeId)` which returns tokens for both Tailwind CSS (UI) and Three.js shader uniforms (globe).
- This ensures the UI and the globe are always visually synchronized without ad-hoc color mapping.

**Visit Service Module** (deep module)
- Encapsulates all business logic for Visit CRUD operations.
- Validates tier limits before allowing photo uploads (Free: 3 per Visit, 50 total; Pro: unlimited).
- Enforces that a Wishlist Item is removed when its country is visited.
- Manages the photo lifecycle: on Visit deletion, triggers removal of associated photos from R2.
- Exposes a simple interface: `createVisit(data, userId)`, `updateVisit(id, data, userId)`, `deleteVisit(id, userId)`, `listVisits(userId)`.

**Globe Visualization Module** (deep module)
- Built with **React Three Fiber** and **@react-three/drei**.
- The earth is a procedural sphere with custom shaders (no photorealistic textures).
- Arcs are animated great-circle curves from the User's Home Base to the primary City of the most recent Visit per country.
- Accepts a simple props interface: `<Globe arcs={arcs} theme={theme} onCountryClick={handler} />`.
- Internally manages the Three.js scene, camera, animation loop, and resize handling.

**Stats Engine Module** (deep module)
- Computes all analytics from raw Visit data.
- Simple metrics (total coverage, streaks) are computed on-the-fly.
- Heavy visualizations (heatmap grid data, continent breakdown, yearly aggregates) use cached pre-computed aggregates stored alongside the User record.
- Exposes `computeStats(visits)` which returns all analytics data in a single structured object.

**R2 Upload Flow Module** (deep module)
- Encapsulates the pre-signed URL generation logic.
- Validates tier limits before generating URLs.
- Exposes `getUploadUrls(count, userId)` which returns an array of signed PUT URLs and corresponding file IDs.

### Data Flow
1. Client calls TanStack Query, which invokes a TanStack Start Server Function.
2. The Server Function uses Drizzle to query D1 via Workers binding.
3. For uploads, the Server Function generates pre-signed R2 URLs and returns them; the client uploads directly to R2.
4. After upload, the client confirms to the server, which records photo metadata in D1.

### State Management
- **Server state** (visits, wishlist, profile, photos): managed by **TanStack Query**.
- **Client state** (selected theme, currently selected country, modal state): managed by **Jotai** atoms.

### Forms & Validation
- All forms use **TanStack Form** for state management.
- All validation uses **Zod** schemas, shared between client and server where possible.
- Country and city inputs use autocomplete backed by the Geographic Dataset module.

### Styling
- **Tailwind CSS** for all UI styling.
- Dark-first design; all themes are dark variants.
- Theme tokens are defined in Tailwind config and synchronized with the Theme System module.

### Charts
- **D3.js** for all analytics visualizations: bar chart (countries per year), donut chart (continent breakdown), and heatmap grid (travel activity).
- Custom SVG components render the charts to match the dark, neon aesthetic.

### Routing
- `/` — redirects to `/tracker` when authenticated.
- `/tracker` — Tracker view (globe + Visited Log).
- `/insights/:countryCode` — Insights for a specific country.
- `/wishlist` — Wishlist view.
- `/analytics` — Analytics view.
- `/archive` — Archive (photo browser).
- `/config` — Config/settings view.
- `/u/:handle` — Public Profile page.

### Database Schema (high-level)
- `users` — synced from Clerk (id, email, displayName, handle, tier, homeBaseCity, homeBaseLat, homeBaseLng, timezone, themeId).
- `visits` — (id, userId, countryCode, startDate, endDate, notes, visibility, createdAt).
- `visit_cities` — (id, visitId, name, lat, lng, orderIndex).
- `photos` — (id, visitId, r2Key, r2Url, createdAt).
- `wishlist_items` — (id, userId, countryCode, priority, estimatedDate, createdAt).
- `user_stats` — cached aggregates (id, userId, totalCountries, totalVisits, currentStreak, longestStreak, countriesPerYear, continentBreakdown, heatmapData, updatedAt).

## Testing Decisions

### What makes a good test
- Tests verify external behavior and contracts, not implementation details.
- A test should be able to change its internal algorithm without breaking tests, as long as the output contract holds.
- Server functions are tested via integration tests that exercise the full request/response cycle against a test database.

### Modules to test
- **Geographic Dataset Module**: Unit tests for country lookup, city lookup, coordinate retrieval, and geocoding fallback.
- **Theme System Module**: Unit tests ensuring every theme returns valid color tokens for both UI and shader consumption.
- **Visit Service Module**: Integration tests for CRUD operations, tier limit enforcement, and cascading photo deletion.
- **Stats Engine Module**: Unit tests with fixed Visit datasets, asserting correct coverage, streaks, yearly breakdowns, and heatmap data.
- **R2 Upload Flow Module**: Unit tests verifying URL generation count matches tier limits.

### Modules NOT tested
- **Globe Visualization Module**: Visual/3D output is not unit-tested. Manual testing and visual regression (if any) are sufficient.
- **D3 Chart Components**: Visual output is not unit-tested. Data transformation logic inside them should be thin; if complex, extract and test separately.

### Prior art
- This is a greenfield project. No existing test patterns exist in the repo.

## Out of Scope

- **Responsive design**: The UI is optimized for desktop only. Mobile adaptation is post-MVP.
- **Payment integration**: Tier assignments are manual. Stripe/Lemon Squeezy integration is deferred.
- **AI Trip Summary**: AI-generated visit narratives are a planned Pro feature, not included in MVP.
- **CSV export**: Only JSON export is included. CSV is deferred.
- **Social features beyond public profiles**: No follow system, no feed, no comments, no likes.
- **User search/directory**: Profiles are discovered only via direct external links.
- **Real-time collaboration**: No live syncing, no multiplayer globe.
- **Offline support**: No service workers or local persistence beyond standard browser caching.
- **Push notifications**: No notification system.
- **Email features**: No email verification, password reset, or newsletters (handled by Clerk).

## Further Notes

- The geographic static dataset should be seeded from a public source (e.g., `world-countries` npm package) and checked into the repo as JSON. A seed script using Drizzle should populate the database at setup time.
- The `user_stats` table should be updated via database triggers or application-level hooks whenever a Visit is created, updated, or deleted. This keeps analytics reads fast.
- All server functions must validate the Clerk session before executing. Unauthorized requests return 401.
- The public Profile page (`/u/:handle`) should not require authentication to view, but must only expose public Visits.
- Photo drag-and-drop should support multiple files and show upload progress. On the Free tier, the client should block uploads that exceed the limit before requesting pre-signed URLs.
- The Tracker empty state should show a procedural dark globe with no arcs, plus a prominent CTA to set Home Base and log the first Visit.
- Changing the Home Base in Config immediately updates the globe arc origins without requiring a page reload.
