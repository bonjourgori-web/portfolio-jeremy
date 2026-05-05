import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '3+', label: "Ans d'expérience", icon: '📅' },
  { value: '500+', label: 'Tickets résolus', icon: '🎫' },
  { value: '98%', label: 'Satisfaction', icon: '⭐' },
  { value: '4', label: 'Apps IA créées', icon: '🤖' },
]

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
          {/* Photo */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }} className="relative flex justify-center">
            <div className="relative w-72 md:w-80">
              <div className="absolute -inset-3 rounded-2xl blur-xl"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))', opacity: 0.25 }} />
              <img src={`${import.meta.env.BASE_URL}franck.jpg`} alt="Franck Jérémie Gori"
                onError={(e) => { e.currentTarget.parentElement.innerHTML = '<div style="width:100%;aspect-ratio:3/4;border-radius:16px;background:var(--bg-card);display:flex;align-items:center;justify-content:center;font-size:4rem">👤</div>' }}
                className="relative w-full rounded-2xl object-cover object-top shadow-2xl"
                style={{ aspectRatio: '3/4', border: '1px solid var(--border)' }}
              />
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm"
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
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }} className="space-y-5">
            <p className="text-lg leading-relaxed t-body">
              Technicien informatique avec plus de{' '}
              <span className="font-semibold t-h">deux ans d'expérience</span> en support utilisateurs,
              maintenance des systèmes et gestion d'infrastructures réseau chez{' '}
              <span className="font-semibold t-accent">Ivory Cocoa Products</span>.
            </p>
            <p className="leading-relaxed t-body">
              En formation <span className="font-medium t-accent">Google IT Support</span> et{' '}
              <span className="font-medium t-accent">Microsoft Azure (AZ-900)</span>, avec des bases
              solides en Active Directory, sécurité et infrastructure cloud.
            </p>
            <p className="leading-relaxed t-body">
              Passionné par l'IA, je suis devenu un{' '}
              <span className="font-bold t-h">vibe coder</span> — je construis des
              applications complètes avec l'IA : apps Flutter, APIs FastAPI, agents IA, rendus 3D.
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
