import { motion } from 'framer-motion'
import { Reveal } from '../Reveal.jsx'
import { fadeUp, stagger } from '../motion.js'

const POSTS = [
  { src: '/images/instagram/insta-1.jpg', url: 'https://www.instagram.com/p/DKWU4cAoyUI/', tile: 'insta-big' },
  { src: '/images/instagram/insta-2.jpg', url: 'https://www.instagram.com/p/DKWVcmHNPtU/', tile: '' },
  { src: '/images/instagram/insta-3.jpg', url: 'https://www.instagram.com/p/DKWV6iUt3qc/', tile: '' },
  { src: '/images/instagram/insta-4.jpg', url: 'https://www.instagram.com/p/DKWY0lftHXy/', tile: 'insta-wide' },
  { src: '/images/instagram/insta-5.jpg', url: 'https://www.instagram.com/p/DKWaLakN4Eq/', tile: '' },
  { src: '/images/instagram/insta-6.jpg', url: 'https://www.instagram.com/p/DKZXyKwNZNf/', tile: 'insta-tall' },
  { src: '/images/instagram/insta-7.jpg', url: 'https://www.instagram.com/reel/DNflfsaNzM5/', tile: '' },
  { src: '/images/instagram/insta-8.jpg', url: 'https://www.instagram.com/p/DRypn4ejaEx/', tile: '' },
  { src: '/images/instagram/insta-9.jpg', url: 'https://www.instagram.com/p/DW_GmCOikqs/', tile: 'insta-wide' },
]

export default function InstagramFeed({ site }) {
  const handle = site?.social_instagram?.replace(/\/+$/, '')

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
          {POSTS.map((post, i) => (
            <motion.a
              key={i}
              className={`insta-card ${post.tile}`}
              href={post.url}
              target="_blank"
              rel="noreferrer noopener"
              variants={fadeUp}
              data-cursor
            >
              <img src={post.src} alt="Athr Cafe on Instagram" loading="lazy" />
              <span className="insta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}