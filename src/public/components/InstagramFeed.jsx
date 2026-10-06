import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../Reveal.jsx'
import { fadeUp, stagger } from '../motion.js'

const POSTS = [
  'https://www.instagram.com/p/DKWU4cAoyUI/',
  'https://www.instagram.com/p/DKWVcmHNPtU/',
  'https://www.instagram.com/p/DKWV6iUt3qc/',
  'https://www.instagram.com/p/DKWY0lftHXy/',
  'https://www.instagram.com/p/DKWaLakN4Eq/',
  'https://www.instagram.com/p/DKZXyKwNZNf/',
  'https://www.instagram.com/reel/DNflfsaNzM5/',
  'https://www.instagram.com/p/DRypn4ejaEx/',
  'https://www.instagram.com/p/DW_GmCOikqs/',
]

function embedReady() {
  try {
    window.instagramEmbed?.process()
  } catch {
    /* not hydrated yet */
  }
}

export default function InstagramFeed({ site }) {
  const handle = site?.social_instagram?.replace(/\/+$/, '')

  useEffect(() => {
    const existing = document.querySelector('script[data-instagram-embed]')
    if (existing) {
      embedReady()
      return
    }
    const s = document.createElement('script')
    s.src = 'https://www.instagram.com/embed.js'
    s.async = true
    s.dataset.instagramEmbed = 'true'
    s.onload = () => setTimeout(embedReady, 50)
    document.body.appendChild(s)
  }, [])

  return (
    <section id="instagram" className="insta-section">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Fresh from the Grid</span>
            <h2>
              Follow Us on <em>Instagram</em>
            </h2>
            <p>Matcha, mint and the moments between — tagged from the café.</p>
          </Reveal>
          <Reveal>
            <a
              className="btn-line insta-follow"
              href={handle || 'https://www.instagram.com/athr.cafe/'}
              target="_blank"
              rel="noreferrer noopener"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @athr.cafe
            </a>
          </Reveal>
        </div>

        <motion.div
          className="insta-grid"
          variants={stagger(0.05, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {POSTS.map((url, i) => (
            <motion.div key={i} className="insta-card" variants={fadeUp}>
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={url}
                data-instgrm-version="14"
              >
                <a href={url} target="_blank" rel="noreferrer noopener">
                  View this post on Instagram
                </a>
              </blockquote>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}