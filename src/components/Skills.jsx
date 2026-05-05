import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  { icon: '🖥️', title: 'Support IT & Maintenance',   desc: 'Dépannage matériel/logiciel Windows, support N1 & N2, gestion du parc informatique.', skills: ['Windows', 'Dépannage', 'Ticketing', 'Documentation'] },
  { icon: '☁️', title: 'Cloud Computing Azure',       desc: 'Migration Office 365, sécurité & gouvernance Azure, modèles IaaS/SaaS/PaaS.',          skills: ['Azure AZ-900', 'Office 365', 'IaaS', 'SaaS'], featured: true },
  { icon: '🌐', title: 'Systèmes & Réseaux',          desc: 'Administration Windows Server, Active Directory, TCP/IP, DNS, DHCP, Wi-Fi.',             skills: ['Windows Server', 'Active Directory', 'TCP/IP', 'DNS/DHCP'] },
  { icon: '⚙️', title: 'Virtualisation',              desc: 'Création et gestion de machines virtuelles avec Hyper-V et VMware Workstation.',         skills: ['Hyper-V', 'VMware', 'Snapshots', 'Isolation'] },
  { icon: '🛠️', title: 'Outils & Automatisation',    desc: 'Suite Microsoft 365, scripts PowerShell & Bash, DevOps CI/CD (certifié IBM).',           skills: ['Microsoft 365', 'PowerShell', 'Bash', 'CI/CD'] },
  { icon: '🤖', title: 'Vibe Coding IA',              desc: 'Construction d\'applications complètes avec IA : web, mobile, agents, 3D.',              skills: ['React', 'Flutter', 'FastAPI', 'Agents IA'], featured: true },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="section-sep absolute top-0 left-0 right-0 h-px" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] t-accent">Services & Compétences</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 t-h">
            Ce que je <span className="grad-text">maîtrise</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto t-body">
            Compétences IT solides combinées à une expertise en développement d'applications IA.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group rounded-2xl p-7 hover:scale-[1.02] transition-all duration-300 card"
              style={s.featured ? { boxShadow: 'var(--glow-sm)' } : {}}>
              {s.featured && (
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--accent)' }}>
                  ✦ Clé
                </div>
              )}
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-lg mb-2 t-h">{s.title}</h3>
              <p className="text-sm leading-relaxed mb-5 t-body">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.skills.map(sk => (
                  <span key={sk} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    {sk}
                  </span>
                ))}
              </div>
              <div className="flex gap-1 mt-5">
                {[0,1,2].map(j => (
                  <span key={j} className="w-2 h-2 rounded-full"
                    style={{ background: j === 0 ? 'var(--accent)' : 'var(--border)' }} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl card flex flex-wrap items-center justify-between gap-6">
          {[
            { val: '500+', label: 'Tickets résolus' },
            { val: '98%',  label: 'Satisfaction client' },
            { val: '3+',   label: "Ans d'expérience" },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="text-3xl font-black t-h">{item.val}</p>
              <p className="text-sm t-muted">{item.label}</p>
            </div>
          ))}
          <a href="#contact" className="btn-primary text-sm">Me recruter →</a>
        </motion.div>
      </div>
    </section>
  )
}
