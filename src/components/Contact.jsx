import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const infos = [
  { icon:'📞', label:'Téléphone 1',  value:'+225 07 59 09 98 25',          href:'tel:+2250759099825' },
  { icon:'📞', label:'Téléphone 2',  value:'+225 05 45 49 47 51',          href:'tel:+2250545494751' },
  { icon:'✉️', label:'Email',        value:'jeremyironsgori@gmail.com',    href:'mailto:jeremyironsgori@gmail.com' },
  { icon:'💼', label:'LinkedIn',     value:'franck-jérémie-gori',          href:'https://linkedin.com/in/franck-jérémie-gori-65845a24b' },
  { icon:'📍', label:'Localisation', value:"Lac pavé San Pédro, Côte d'Ivoire", href:null },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="section-sep absolute top-0 left-0 right-0 h-px" />

      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] t-accent">Contact</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 t-h">
            Travaillons <span className="grad-text">ensemble</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto t-body">
            Ouvert aux opportunités IT, cloud, administration systèmes ou projets tech innovants.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-3xl p-10 card" style={{ boxShadow: 'var(--glow)' }}>

          <div className="text-center mb-10">
            <a href="mailto:jeremyironsgori@gmail.com" className="btn-primary inline-flex items-center gap-3 text-lg hover:scale-105 transform transition-transform duration-200">
              ✉️ Envoyer un message →
            </a>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-sm t-muted">Ou me trouver sur</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {infos.map((info, i) => (
              <motion.div key={info.label}
                initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}>
                {info.href ? (
                  <a href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group card"
                    style={{ '--hover-border': 'var(--accent)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <div className="text-xs t-muted">{info.label}</div>
                      <div className="text-sm font-medium t-h group-hover:t-accent transition-colors">{info.value}</div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-xl card">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <div className="text-xs t-muted">{info.label}</div>
                      <div className="text-sm font-medium t-h">{info.value}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8 pt-8 text-sm t-muted"
            style={{ borderTop: '1px solid var(--border)' }}>
            {['🚗 Permis de conduire','🛂 Passeport','🇫🇷 Français courant','🇬🇧 Anglais en cours'].map(b => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
