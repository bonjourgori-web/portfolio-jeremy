import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const formations = [
  {
    title: 'SAP Technology Consultant',
    org: 'SAP / Coursera',
    period: 'En cours — 2025/2026',
    status: 'En cours',
    progress: 1,
    color: 'border-blue-400/40 bg-blue-400/5',
    accent: '#3b82f6',
    logo: '🔷',
    courses: [
      { name: 'SAP Professional Fundamentals', done: false },
      { name: 'Understanding the Enterprise Systems Environment', done: false },
      { name: 'SAP Customer Engagement and Discovery', done: false },
      { name: 'Designing an SAP Solution', done: false },
      { name: 'Implementing an SAP Solution', done: false, pct: 1 },
      { name: 'SAP Technology Consultant Hands-on Project', done: false },
      { name: 'Becoming an SAP Professional', done: false },
    ],
  },
  {
    title: 'Oracle Cloud and AI',
    org: 'Oracle / Coursera',
    period: 'En cours — 2025/2026',
    status: 'En cours',
    progress: 0,
    color: 'border-red-400/40 bg-red-400/5',
    accent: '#ef4444',
    logo: '🔴',
    courses: [
      { name: 'Introduction to Oracle Cloud Essentials', done: false },
      { name: 'Oracle Cloud Infrastructure AI Foundations', done: false },
      { name: 'Oracle Cloud Infrastructure Generative AI Professional', done: false },
    ],
  },
  {
    title: 'Google IT Support Professional Certificate',
    org: 'Google / Coursera',
    period: 'En cours — Nov 2025',
    status: 'En cours',
    progress: 27,
    color: 'border-emerald-400/40 bg-emerald-400/5',
    accent: '#10b981',
    logo: '🟢',
    courses: [
      { name: 'Technical Support Fundamentals', done: false, pct: 31 },
      { name: 'The Bits and Bytes of Computer Networking', done: false, pct: 1 },
      { name: 'Operating Systems and You: Becoming a Power User', done: false },
      { name: 'System Administration and IT Infrastructure Services', done: false },
      { name: 'IT Security: Defense against the digital dark arts', done: false },
      { name: 'Accelerate Your Job Search with AI', done: false },
    ],
  },
  {
    title: 'Introduction to Cloud Computing',
    org: 'IBM / Coursera',
    period: 'En cours — 2025',
    status: 'En cours',
    progress: 0,
    color: 'border-violet-400/40 bg-violet-400/5',
    accent: '#8b5cf6',
    logo: '🟣',
    courses: [
      { name: 'Introduction to Cloud Computing', done: false, pct: 0 },
    ],
  },
  {
    title: 'Introduction to DevOps',
    org: 'IBM / Coursera',
    period: '08 Sep – 11 Nov 2025',
    status: 'Obtenu',
    progress: 100,
    cert: 'ID : N2FFLTD651SQ',
    color: 'border-purple-500/40 bg-purple-500/5',
    accent: '#a855f7',
    logo: '✅',
    courses: [
      { name: 'Principes DevOps', done: true },
      { name: 'Automatisation & CI/CD', done: true },
      { name: 'Collaboration & méthodes agiles', done: true },
    ],
  },
  {
    title: "Licence 2 Technologies de l'Information — BTS",
    org: "Groupe Intellect Afrique",
    period: '2017 – 2018',
    status: 'Diplômé',
    progress: 100,
    color: 'border-amber-400/40 bg-amber-400/5',
    accent: '#f59e0b',
    logo: '🎓',
    courses: [
      { name: "Équivalent Baccalauréat TI — Abidjan, Côte d'Ivoire", done: true },
    ],
  },
  {
    title: 'Baccalauréat D — Série Scientifique',
    org: 'Collège Le Classique San Pedro',
    period: '2013 – 2014',
    status: 'Diplômé',
    progress: 100,
    color: 'border-slate-500/40 bg-slate-500/5',
    accent: '#64748b',
    logo: '🎓',
    courses: [
      { name: "San Pedro, Côte d'Ivoire", done: true },
    ],
  },
]

const statusColors = {
  'En cours': 'text-amber-400 bg-amber-400/10 border border-amber-400/20',
  'Obtenu':   'text-green-400 bg-green-400/10 border border-green-400/20',
  'Diplômé':  'text-purple-400 bg-purple-400/10 border border-purple-400/20',
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
          <span className="text-xs font-bold uppercase tracking-[0.2em] t-accent">Formation</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 t-h">
            Certifications & <span className="grad-text">Diplômes</span>
          </h2>
          <p className="t-muted text-sm mt-3">4 programmes en cours · 1 certification obtenue · 2 diplômes</p>
        </motion.div>

        <div className="space-y-4">
          {formations.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`border ${f.color} rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] card`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{f.logo}</span>
                  <div>
                    <h3 className="t-h font-bold">{f.title}</h3>
                    <p className="t-muted text-sm mt-0.5">{f.org} · {f.period}</p>
                    {f.cert && (
                      <p className="text-slate-500 text-xs mt-0.5 font-mono">{f.cert}</p>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[f.status]}`}>
                  {f.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="t-muted">Progression globale</span>
                  <span style={{ color: f.accent }} className="font-bold">{f.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${f.progress}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${f.accent}99, ${f.accent})` }}
                  />
                </div>
              </div>

              {/* Courses */}
              <div className="flex flex-wrap gap-2">
                {f.courses.map((c, ci) => (
                  <span
                    key={ci}
                    className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg ${
                      c.done
                        ? 'text-green-400 bg-green-400/10'
                        : c.pct > 0
                        ? 'text-amber-400 bg-amber-400/10'
                        : 'text-slate-500 bg-white/5'
                    }`}
                  >
                    {c.done ? '✓' : c.pct > 0 ? `${c.pct}%` : '○'}
                    {c.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
