import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../Reveal.jsx'
import { fadeUp, stagger } from '../motion.js'

export default function Gallery({ site }) {
  const [lightbox, setLightbox] = useState(null)
  const items = site.gallery || []

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (items.length === 0) return null

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Our Space</span>
            <h2>
              Inside the <em>Café</em>
            </h2>
            <p>Mornings, matcha and mint tea in the heart of Souq Waqif.</p>
          </Reveal>
        </div>

        <motion.div className="gallery-grid" variants={stagger(0.05, 0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
          {items.map((item, i) => (
            <motion.button
              type="button"
              key={i}
              variants={fadeUp}
              className={`gallery-item gallery-tile-${(i % 5) + 1}`}
              onClick={() => setLightbox(item)}
              data-cursor
            >
              <img src={item.src} alt={item.caption || 'Athr Cafe'} loading="lazy" />
              {item.caption && (
                <span className="gallery-caption">
                  <span className="gallery-caption-inner">{item.caption}</span>
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            onClick={() => setLightbox(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.img
              src={lightbox.src}
              alt={lightbox.caption || ''}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            {lightbox.caption && <p>{lightbox.caption}</p>}
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close"
              onClick={() => setLightbox(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}