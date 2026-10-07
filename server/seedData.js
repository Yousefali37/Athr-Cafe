import { db, initSchema, setSetting } from './db.js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const DEFAULT_SRC = path.join(__dirname, 'seed-data', 'athr-menu-talabat.json')

export function loadMenuData(src) {
  const file = src || process.env.SEED_SOURCE || DEFAULT_SRC
  if (!fs.existsSync(file)) {
    throw new Error(
      `Seed data not found at: ${file}. Make sure server/seed-data/athr-menu-talabat.json exists or set SEED_SOURCE.`,
    )
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

export function populate(d) {
  initSchema()

  const insertCat = db.prepare(`
    INSERT INTO categories (id, name, description, image, parent_id, sort_order, active)
    VALUES (@id, @name, @description, @image, @parent_id, @sort_order, @active)
  `)
  const insertProd = db.prepare(`
    INSERT INTO products (id, category_id, name, description, price, image, sort_order, active)
    VALUES (@id, @category_id, @name, @description, @price, @image, @sort_order, @active)
  `)

  db.transaction(() => {
    for (const c of d.categories) {
      insertCat.run({
        id: c.id,
        name: c.name,
        description: c.description || '',
        image: c.image || '',
        parent_id: c.parent ?? null,
        sort_order: c.sort_order || 0,
        active: 1,
      })
      for (const p of c.products || []) {
        insertProd.run({
          id: p.id,
          category_id: c.id,
          name: p.name,
          description: p.description || '',
          price: parseFloat(p.price) || 0,
          image: p.image || '',
          sort_order: p.sort_order || 0,
          active: p.active === false ? 0 : 1,
        })
      }
    }
  })()

  // ---- settings defaults (only used at seed time; admin can edit after) ----
  const s = d.settings || {}
  const todayId = d.today_product_id || null
  const today = todayId
    ? db.prepare('SELECT id, name FROM products WHERE id = ?').get(todayId)
    : null

  const gallery = (d.gallery || []).map((g) => ({ src: g.src, caption: g.caption || '' }))

  setSetting('site_name', s.site_name || 'Athr Cafe')
  setSetting('logo', s.logo || '')
  setSetting('hero_image', s.hero_image || '')
  setSetting('hero_title', s.hero_title || 'Athr Cafe')
  setSetting(
    'hero_subtitle',
    s.hero_subtitle ||
      'Modern Qatari fusion, specialty coffee and Japanese-style desserts — in the heart of Souq Waqif, Doha.',
  )
  setSetting('today_badge', s.today_badge || "Today's Special")
  setSetting('today_product_id', today ? today.id : todayId)
  setSetting('gallery', gallery)
  setSetting('contact_address', s.contact_address || '')
  setSetting('contact_phone', s.contact_phone || '')
  setSetting('contact_email', s.contact_email || '')
  setSetting('contact_hours', s.contact_hours || '')
  setSetting(
    'contact_map',
    s.contact_map ||
      'https://www.google.com/maps?q=' +
        encodeURIComponent('Souq Waqif, Doha, Qatar') +
        '&output=embed',
  )
  setSetting('social_instagram', s.social_instagram || '')
  setSetting('social_tiktok', s.social_tiktok || '')
  setSetting('social_linktree', s.social_linktree || '')
  setSetting('social_talabat', s.social_talabat || '')
  setSetting('snoonu', s.snoonu || '')
  setSetting('footer_text', s.footer_text || 'Modern Qatari, every day.')
  setSetting('footer_background', s.footer_background || '')

  return {
    categories: db.prepare('SELECT COUNT(*) AS n FROM categories').get().n,
    products: db.prepare('SELECT COUNT(*) AS n FROM products').get().n,
    gallery: gallery.length,
    today: today ? today.name : null,
  }
}

let ensured = false

/**
 * Seeds the database if it is empty. Safe to call on every cold start
 * (Vercel /tmp storage is ephemeral, so a fresh deployment reseeds itself).
 */
export function ensureSeeded(force = false) {
  if (ensured && !force) return null
  initSchema()
  const catCount = db.prepare('SELECT COUNT(*) AS n FROM categories').get().n
  if (catCount > 0 && !force) {
    ensured = true
    return null
  }
  const stats = populate(loadMenuData())
  ensured = true
  return stats
}
