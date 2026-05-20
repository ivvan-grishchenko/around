# Around

A social travel tracker for logging and sharing countries visited, visualized on an interactive globe.

## Language

**User**:
An authenticated person with a public profile, travel history, and social connections.
_Avoid_: Account, traveler

**Visit**:
A single entry recording a User's presence in a country during a specific date range, including visited cities, photos, and notes.
_Avoid_: Trip, entry, log

**Profile**:
A User's public-facing page showing their travel statistics, visited countries, and shared Visits.
_Avoid_: Page, dashboard

**Home Base**:
The city a User designates as their origin point. Stored as latitude/longitude for globe visualization.
_Avoid_: Location, origin

**Tier**:
A subscription level (Free or Pro) that determines feature limits and capacity for a User.
_Avoid_: Plan, subscription

**Theme**:
A visual preset defined as a configuration object containing color values for both the UI and the globe shaders.
_Avoid_: Skin, palette

**Wishlist Item**:
A country a User intends to visit, with an integer priority rank and an optional estimated date. Distinct from a Visit because it has no cities, photos, or notes.
_Avoid_: Planned visit, bucket list entry

**View**:
A top-level navigation destination in the UI: Tracker, Insights, Wishlist, Analytics, Archive, or Config.
_Avoid_: Page, screen

## Relationships

- A **Visit** belongs to exactly one User, one country, and one date range. Its state (`ongoing` or `completed`) is derived from the date range relative to the current date.
- A **Visit** contains one or more **Cities**. The first City is the **primary City** for that Visit.
- A **User** has exactly one **Home Base** (a City). Arcs on the globe originate from the User's current Home Base and terminate at the primary City of the most recent **Visit** for each visited country. Changing the Home Base immediately recalculates all arcs.
- Multiple **Visits** to the same country by the same User are tracked independently in the Visited Log, but the globe shows only one arc per country.
- A **User** has exactly one **Profile**, which displays a subset of their Visits.
- A **User** has exactly one **Tier**.
- User-uploaded **Photos** are stored in Cloudflare R2. Variants (thumbnails, web-optimized) are served via Cloudflare Images on-the-fly.
- The application is built with **TanStack Start**, a full-stack React framework deployed on **Cloudflare Workers**.
- The primary database is **Cloudflare D1** (SQLite), accessed via Workers binding through server functions.
- **pnpm** is the package manager.
- **oxlint** is the linter; **oxc** formatter handles code formatting.
- All data reads and writes flow through **Server Functions**; the client never accesses D1 directly.
- The database schema is defined and queried with **Drizzle ORM** using **Cloudflare D1** (SQLite).
- **Tier** assignments are managed manually during MVP; payment integration is deferred.
- The primary **Views** are Tracker, Insights, Wishlist, Analytics, Archive, and Config.
- **Tracker** shows the globe and Visited Log. Clicking a country in the Visited Log navigates to **Insights** for that country.
- **Insights** is accessible at `/insights/:countryCode`. It displays the most recent **Visit** for that country by default, with a mechanism to browse older **Visits**.
- The **Archive** is a read-only photo browser grouped by country. Photos are managed through the Visit detail view via drag-and-drop upload.
- A **Profile** is publicly accessible at `/u/:handle`.
- The UI layout is optimized for desktop; responsive behavior is deferred past MVP.
- Clicking a country on the globe focuses it and highlights the corresponding entry in the **Visited Log**. Clicking a **Visited Log** entry focuses the globe on that country.
- New Users see an empty **Tracker** with guidance to set their **Home Base** and log their first **Visit**.
- **Profiles** are discovered only via direct external links; there is no search or directory.
- A new **Visit** is created via a modal form in the **Tracker** view. Country and city selection use autocomplete search backed by the **Geographic Dataset**.
- A **User** can export all their own data (Visits, Wishlist Items, **Profile** metadata) as JSON. CSV export is deferred past MVP.
- The **Config** view contains display name, user handle, **Home Base**, timezone, **Theme** selection, and data export.
- A **User** has zero or more **Wishlist Items**.
- A **Wishlist Item** is automatically removed when the User creates a **Visit** for that country.
- A **Visit** has a visibility flag: `public` or `private`. Only `public` Visits appear on a User's **Profile**.
- **Visits** can be fully edited or deleted. Deleting a Visit removes its associated **Photos** from storage.

## Example dialogue

> **Dev:** "If I visit Japan in March and again in October, do I create one Visit or two?"
> **Domain expert:** "Two — each Visit is a distinct stay with its own dates, cities, and memories."
> **Dev:** "Can other Users see both of my Japan visits?"
> **Domain expert:** "Only what's on my Profile. I control which Visits are shared publicly."

**Geographic Dataset**:
A combination of a pre-built static JSON for countries and major cities, plus a free geocoding API fallback for obscure locations.
_Avoid_: Map data, location database

**User Stats**:
Pre-computed aggregates of a User's travel data. Simple metrics are computed on-the-fly; heavy visualizations use cached aggregates.
_Avoid_: Analytics, metrics

**Trip Summary**:
An AI-generated narrative describing a Visit, created from visited cities and notes. Available only to Pro tier Users.
_Avoid_: Summary, recap

## Flagged ambiguities

- "Trip" was considered as the core unit, but resolved to **Visit** to allow multiple independent stays in the same country.
- "Account" could mean Clerk auth record or User profile — resolved: **User** is the domain concept.
