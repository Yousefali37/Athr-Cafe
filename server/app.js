import express from 'express'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { ensureSeeded } from './seedData.js'
import { publicRouter, adminRouter } from './routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '2mb' }))

// ---------- seed on cold start (no-op when data is present) ----------
if (process.env.VERCEL === '1') {
  try {
    const stats = ensureSeeded()
    if (stats)
      console.log(
        `[cold start] Seeded ${stats.categories} categories, ${stats.products} products (EPHEMERAL /tmp storage).`,
      )
  } catch (err) {
    console.error('[cold start] seed failed:', err.message)
  }
}

// ---------- uploads ----------
const UPLOAD_DIR =
  process.env.UPLOAD_DIR ||
  (process.env.VERCEL === '1' ? path.join('/tmp', 'uploads') : path.join(__dirname, 'uploads'))
fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const clean = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, '-')
    cb(null, `${Date.now()}-${clean}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, /^image\//.test(file.mimetype)),
})

app.post('/api/admin/upload', adminRouter, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded.' })
  const url = `/uploads/${req.file.filename}`
  res.status(201).json({ url })
})

app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d' }))

// ---------- API ----------
app.use('/api', publicRouter)
app.use('/api/admin', adminRouter)

// ---------- static frontend (local production) ----------
// On Vercel the static files are served by Vercel's CDN, not this app.
const distDir = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next()
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path.startsWith('/images'))
      return next()
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

// ---------- seed imagery (/images → server/seed-data/images + public/images) ----------
const seedImgs = path.join(__dirname, 'seed-data', 'images')
if (fs.existsSync(seedImgs)) {
  app.use('/images', express.static(seedImgs, { maxAge: '7d' }))
}
// gallery photos live in public/images/gallery (served here too, since Vite
// proxies /images to this server in dev)
const publicDir = path.join(__dirname, '..', 'public')
if (fs.existsSync(publicDir)) {
  app.use('/images', express.static(publicDir, { maxAge: '7d' }))
}

app.use((req, res) => res.status(404).json({ error: 'Not found' }))

export default app