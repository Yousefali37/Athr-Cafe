/**
 * Vercel Serverless Function — entry point for /api/* and /uploads/* rewrites.
 *
 * On every cold start the Express app auto-seeds an empty /tmp SQLite DB so
 * the site is always operational.  This means admin edits (settings, category /
 * product CRUD) are *ephemeral* and may be lost on cold starts.
 *
 * To persist data in production swap the SQLite driver for a hosted DB
 * (Turso/Neon/Supabase) — only server/db.js needs to change.
 */
import app from '../server/app.js'

export default app