import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'

const stats = [
  { value: '3+', label: "Ans d'expérience", icon: '📅' },
  { value: '500+', label: 'Tickets résolus', icon: '🎫' },
  { value: '98%', label: 'Satisfaction', icon: '⭐' },
  { value: '4', label: 'Apps IA créées', icon: '🤖' },
]

const photos = [
  { src: 'franck.jpg',  label: 'Style Pro' },
  { src: 'franck2.jpg', label: 'Classique' },
  { src: 'franck3.png', label: 'Portrait' },
]

function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const BASE = import.meta.env.BASE_URL

  const go = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }, [current])

  const prev = () => { const i = (current - 1 + photos.length) % photos.length; setDirection(-1); setCurrent(i) }
  const next = () => { const i = (current + 1) % photos.length; setDirection(1); setCurrent(i) }

  useEffect(() => {
    if (!isAutoplay) return
    const t = setInterval(() => { setDirection(1); setCurrent(c => (c + 1) % photos.length) }, 4000)
    return () => clearInterval(t)
  }, [isAutoplay])

  const variants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
  }

  return (
    <div className="relative w-72 md:w-80 select-none"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Glow */}
      <div className="absolute -inset-3 rounded-2xl blur-xl"
        style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))', opacity: 0.25 }} />

      {/* Photo frame */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: '3/4', border: '1px solid var(--border)' }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            src={`${BASE}${photos[current].src}`}
            alt="Franck Jérémie Gori"
            className="absolute inset-0 w-full h-full object-cover object-top"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </AnimatePresence>

        {/* Gradient overlay bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(6,12,26,0.7) 0%, transparent 100%)' }} />

        {/* Arrow buttons */}
        <button onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(6,12,26,0.6)', border: '1px solid var(--border)', backdropFilter: 'blur(6px)' }}>
          ‹
        </button>
        <button onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(6,12,26,0.6)', border: '1px solid var(--border)', backdropFilter: 'blur(6px)' }}>
          ›
        </button>

        {/* Label */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(6,12,26,0.6)', color: 'var(--accent-light, #60a5fa)', backdropFilter: 'blur(6px)', border: '1px solid var(--border)' }}>
            {photos[current].label}
          </span>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {photos.map((p, i) => (
          <button key={i} onClick={() => go(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              background: i === current ? 'var(--accent)' : 'var(--border)',
            }}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-3 justify-center">
        {photos.map((p, i) => (
          <button key={i} onClick={() => go(i)}
            className="rounded-lg overflow-hidden transition-all duration-200"
            style={{
              width: '44px', height: '56px',
              border: i === current ? '2px solid var(--accent)' : '2px solid transparent',
              opacity: i === current ? 1 : 0.45,
              transform: i === current ? 'scale(1.05)' : 'scale(1)',
            }}>
            <img src={`${BASE}${p.src}`} alt={p.label}
              className="w-full h-full object-cover object-top" />
          </button>
        ))}
      </div>

      {/* Badges */}
      <div className="absolute bottom-[120px] left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--glow-sm)' }}>
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-medium t-h">Disponible · San Pédro, CI</span>
      </div>
      <div className="absolute -right-5 top-10 rounded-xl p-3 text-center"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--glow-sm)' }}>
        <p className="font-black text-xl t-accent">3+</p>
        <p className="text-[10px] t-muted">Années</p>
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden">
      <div className="section-sep absolute top-0 left-0 right-0 h-px" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] t-accent">À propos</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 t-h">
            Qui suis-<span className="grad-text">je ?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Carousel */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }} className="relative flex justify-center">
            <PhotoCarousel />
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }} className="space-y-5">
            <p className="text-lg leading-relaxed t-body">
              Technicien en informatique avec plus de{' '}
              <span className="font-semibold t-h">trois ans d'expérience</span> en support utilisateur,
              maintenance des systèmes et gestion des postes de travail en environnement professionnel,
              notamment chez{' '}
              <span className="font-semibold t-accent">Ivory Cocoa Products</span>.
              J'interviens principalement en support informatique niveau 1 et 2, incluant l'assistance
              aux utilisateurs, Active Directory, Office 365, le dépannage matériel et logiciel ainsi
              que la maintenance des imprimantes.
            </p>
            <p className="leading-relaxed t-body">
              Titulaire d'un diplôme de <span className="font-medium t-accent">Technicien Supérieur en informatique</span>,
              option développement web, je poursuis actuellement ma montée en compétences à travers des
              formations en support IT (<span className="font-medium t-accent">Google IT Support</span>) et en
              cloud (<span className="font-medium t-accent">Microsoft Azure AZ-900</span>).
            </p>
            <p className="leading-relaxed t-body">
              En complément de mon activité principale en support informatique, je développe des solutions
              applicatives et des outils d'automatisation, notamment à l'aide de technologies web et
              d'intelligence artificielle. Ces projets illustrent ma capacité d'analyse, d'apprentissage
              rapide et de résolution de problèmes complexes dans un contexte professionnel.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['Autonomie', 'Communication', 'Organisation', 'Analyse', 'Équipe'].map(s => (
                <span key={s} className="px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--accent)' }}>
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2 text-sm t-muted">
              {['🚗 Permis', '🛂 Passeport', '🇫🇷 Français courant', '🇬🇧 Anglais en cours', '⚽ Football · Handball'].map(i => (
                <span key={i}>{i}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="text-center p-6 rounded-2xl card hover:scale-[1.02] transition-transform duration-300"
              style={{ boxShadow: 'var(--glow)' }}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl font-black mb-1 t-accent">{s.value}</div>
              <div className="text-sm t-muted">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
