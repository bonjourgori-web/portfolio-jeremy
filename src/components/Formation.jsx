import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const formations = [
  {
    title: 'Google IT Support Professional Certificate',
    org: 'Coursera',
    period: 'Nov 2025 (En cours)',
    status: 'En cours',
    color: 'border-blue-500/40 bg-blue-500/5',
    badge: 'text-blue-400 bg-blue-400/10',
    items: [
      'Fondamentaux du support informatique',
      'Bases du réseau informatique',
      'Systèmes d\'exploitation avancés',
      'Administration système & infrastructure TI',
      'Sécurité informatique & défense',
    ],
  },
  {
    title: 'Introduction to Microsoft Azure Cloud Services',
    org: 'Microsoft / Coursera',
    period: 'Nov 2025 (En cours)',
    status: 'En cours',
    color: 'border-cyan-500/40 bg-cyan-500/5',
    badge: 'text-cyan-400 bg-cyan-400/10',
    items: [
      'Concepts du cloud',
      'Services Azure',
      'Politiques, sécurité et gouvernance',
    ],
  },
  {
    title: 'Introduction to DevOps',
    org: 'IBM / Coursera',
    period: '08 Sep – 11 Nov 2025',
    status: 'Obtenu',
    cert: 'ID : N2FFLTD651SQ',
    color: 'border-purple-500/40 bg-purple-500/5',
    badge: 'text-purple-400 bg-purple-400/10',
    items: [
      'Principes DevOps',
      'Automatisation & CI/CD',
      'Collaboration & méthodes agiles',
    ],
  },
  {
    title: 'Licence 2 Technologies de l\'Information BTS',
    org: 'Université privée — Groupe Intellect Afrique',
    period: '2017 – 2018',
    status: 'Diplômé',
    color: 'border-green-500/40 bg-green-500/5',
    badge: 'text-green-400 bg-green-400/10',
    items: ['Équivalent Baccalauréat TI', 'Abidjan, Côte d\'Ivoire'],
  },
  {
    title: 'Baccalauréat D — Série Scientifique',
    org: 'Collège Le Classique San Pedro',
    period: '2013 – 2014',
    status: 'Diplômé',
    color: 'border-slate-500/40 bg-slate-500/5',
    badge: 'text-slate-400 bg-slate-400/10',
    items: ['San Pedro, Côte d\'Ivoire'],
  },
]

const statusColors = {
  'En cours': 'text-amber-400 bg-amber-400/10',
  'Obtenu': 'text-green-400 bg-green-400/10',
  'Diplômé': 'text-purple-400 bg-purple-400/10',
}

export default function Formation() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="formation" className="py-24 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Formation</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Certifications & Diplômes</h2>
        </motion.div>

        <div className="space-y-5">
          {formations.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`border ${f.color} rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-white font-semibold">{f.title}</h3>
                  <p className="text-slate-400 text-sm mt-0.5">{f.org}</p>
                  {f.cert && (
                    <p className="text-slate-500 text-xs mt-0.5 font-mono">{f.cert}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-slate-500 text-xs">{f.period}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[f.status]}`}>
                    {f.status}
                  </span>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2 mt-2">
                {f.items.map(item => (
                  <li key={item} className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <span className="text-purple-500">▸</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
