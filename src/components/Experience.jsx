import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    period: 'Juin 2022 – Aujourd\'hui',
    role: 'IT Support / Assistant Admin Systèmes & Réseaux',
    company: 'Ivory Cocoa Products',
    location: 'San Pedro, Côte d\'Ivoire',
    type: 'CDI',
    tasks: [
      'Supervision de l\'infrastructure réseau et matérielle',
      'Participation à l\'acquisition et à la configuration d\'équipements',
      'Formation des employés sur les outils bureautiques',
      'Création de logiciels adaptés aux besoins de la société',
      'Analyse des Systèmes d\'informations',
      'Migration vers le cloud avec Azure et Office 365',
      'Support technique avancé aux utilisateurs',
    ],
  },
  {
    period: 'Nov 2021 – Juin 2022',
    role: 'Stage Perfectionnement – Assistant Admin Systèmes & Réseaux',
    company: 'Ivory Cocoa Products',
    location: 'San Pedro, Côte d\'Ivoire',
    type: 'Stage',
    tasks: [
      'Supervision des infrastructures IT (systèmes & réseaux)',
      'Gestion et configuration des serveurs, pare-feu et équipements réseaux',
    ],
  },
  {
    period: 'Avr 2018 – Sept 2020',
    role: 'Stagiaire en Informatique',
    company: 'Institut de Cardiologie d\'Abidjan',
    location: 'Abidjan, Côte d\'Ivoire',
    type: 'Stage',
    tasks: [
      'Analyse des besoins utilisateurs et analyse fonctionnelle',
      'Expertise conseil auprès des équipes systèmes',
      'Maintenance des systèmes et création d\'applications',
      'Support technique pour le déploiement d\'équipements',
    ],
  },
  {
    period: 'Sept 2018 – Juil 2019',
    role: 'Technicien Informatique & Gestion de stock',
    company: 'Boulevard de Marseille',
    location: 'Abidjan, Côte d\'Ivoire',
    type: 'Contrat',
    tasks: [
      'Vérification de la recevabilité des produits',
      'Négociation et gestion des commandes clients',
    ],
  },
]

const typeColor = { CDI: 'text-green-400 bg-green-400/10', Stage: 'text-blue-400 bg-blue-400/10', Contrat: 'text-amber-400 bg-amber-400/10' }

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Parcours</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Expérience professionnelle</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-purple-800 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-2.5 md:left-6 top-1.5 w-3 h-3 rounded-full border-2 border-purple-500 bg-[#0a0a0f]" />

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-base">{exp.role}</h3>
                      <p className="text-purple-400 text-sm font-medium mt-0.5">{exp.company}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{exp.location}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-slate-500 text-xs whitespace-nowrap">{exp.period}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColor[exp.type]}`}>
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.tasks.map(t => (
                      <li key={t} className="flex items-start gap-2 text-slate-400 text-sm">
                        <span className="text-purple-500 mt-0.5 shrink-0">▸</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
