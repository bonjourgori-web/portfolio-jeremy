import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TiltCard from './TiltCard'

const projects = [
  { emoji:'🏗️', tag:'Web & Mobile',      name:'Plan2Iso3D',         desc:"Convertisseur de plans 2D (PDF/DXF/DWG) en rendus 3D isométriques 4K pour 30 villes de Côte d'Ivoire.", tech:['Python/FastAPI','React Native','Three.js','PostgreSQL','Azure'] },
  { emoji:'⚽', tag:'Application Mobile', name:'Eliel Go — FFA',     desc:'Application mobile Flutter pour la Fédération de Football Africaine. Gestion des données sportives.', tech:['Flutter','Dart','Firebase','API REST'] },
  { emoji:'🏛️', tag:'Visualisation 3D',  name:'Architecture 3D',    desc:'Visualisation architecturale 3D réaliste interactive avec assets réels, exportable en HTML standalone.', tech:['Three.js','WebGL','JavaScript','HTML/CSS'] },
  { emoji:'🤖', tag:'Agent IA Déployé',   name:'Agent IA 21st.dev',  desc:'Agent IA déployé sur 21st.dev avec le SDK officiel. Propulsé par Claude claude-sonnet-4-6 + Zod.',           tech:['@21st-sdk/agent','Claude claude-sonnet-4-6','TypeScript','Zod'] },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="section-sep absolute top-0 left-0 right-0 h-px" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] t-accent">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 t-h">
            Mes <span className="grad-text">projets</span>
          </h2>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }} className="text-center t-body mb-14 max-w-lg mx-auto">
          <span className="font-medium t-accent">Vibe coder IA</span> — applications complètes construites avec l'IA.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}>
            <TiltCard className="group relative rounded-2xl p-7 card overflow-hidden h-full">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ background: 'var(--grad-accent)' }} />

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)' }}>
                  {p.emoji}
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider t-muted">{p.tag}</span>
                  <h3 className="font-black text-xl mt-0.5 t-h">{p.name}</h3>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6 t-body">{p.desc}</p>

              <div className="flex flex-wrap gap-2">
                {p.tech.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-mono"
                    style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
