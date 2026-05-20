# Deploy on Cloudflare Workers with TanStack Start

We deploy the entire application as a single TanStack Start app running on Cloudflare Workers, backed by Cloudflare D1 (SQLite) for relational data and Cloudflare R2 for object storage.

This keeps the entire infrastructure within Cloudflare's ecosystem, maximizing free-tier coverage and eliminating cross-provider latency. D1 is accessed via a Workers binding — no connection pooler needed since D1 is colocated with the Worker runtime. Since D1 uses SQLite, some PostgreSQL-specific features (like full-text search with `tsvector`) are not available, but the data model is straightforward enough that this is not a constraint.

We use Clerk for auth because it handles sessions, JWT validation, and user management without us building it. Drizzle ORM with Drizzle Kit manages the database schema and queries. The client never touches D1 directly — all reads and writes flow through TanStack Start server functions.
