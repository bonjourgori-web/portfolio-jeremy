import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

const partners = ['Google IT', 'Microsoft Azure', 'IBM DevOps', 'Coursera']

const featureCards = [
  { icon: '🖥️', title: 'Support IT', desc: 'Niveau 1 & 2' },
  { icon: '☁️', title: 'Cloud Azure', desc: 'Migration & config', active: true },
  { icon: '🌐', title: 'Réseaux', desc: 'TCP/IP · DNS · DHCP' },
  { icon: '🤖', title: 'Vibe Coding', desc: 'Apps IA complètes' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-700/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#60a5fa 1px, transparent 1px), linear-gradient(90deg, #60a5fa 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <motion.div {...fadeUp(0.1)}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-8">
                <span className="text-blue-400 text-xs font-semibold italic">— Professional</span>
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                <span className="text-slate-400 text-xs">IT Support & Cloud</span>
              </div>
            </motion.div>

            <motion.h1 {...fadeUp(0.2)} className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              Technicien IT{' '}
              <span className="grad-blue block">& Vibe Coder</span>
            </motion.h1>

            <motion.p {...fadeUp(0.35)} className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
              Franck Jérémie Gori — Support systèmes, réseaux et cloud Azure.
              Je construis aussi des applications complètes avec l'IA.
              Basé à San Pédro, Côte d'Ivoire.
            </motion.p>

            <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-4 mb-12">
              <a href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm transition-all duration-200 glow-blue">
                Me recruter <span>→</span>
              </a>
              <a href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-blue-500/30 hover:border-blue-400 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200">
                ▶ Voir mes projets
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.55)}>
              <p className="text-slate-600 text-xs uppercase tracking-widest mb-3">Formations & Certifications</p>
              <div className="flex flex-wrap gap-4">
                {partners.map(p => (
                  <span key={p} className="text-slate-400 text-sm font-medium">{p}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            <div className="relative bg-gradient-to-br from-[#0d1b3e] to-[#0a0f1e] border border-blue-500/20 rounded-2xl p-8 glow-blue overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-slate-500 text-xs font-mono">portfolio.exe</span>
              </div>

              {/* Profile block avec photo */}
              <div className="flex items-center gap-4 mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl overflow-hidden flex-shrink-0 glow-blue-sm">
                  <img
                    src={`${import.meta.env.BASE_URL}franck.jpg`}
                    alt="Franck Jérémie Gori"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.innerText = 'FG' }}
                  />
                </div>
                <div>
                  <p className="text-white font-bold">Franck Jérémie Gori</p>
                  <p className="text-blue-400 text-sm">Technicien IT · Vibe Coder</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs">Disponible</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { val: '3+', label: 'Ans exp.' },
                  { val: '4', label: 'Projets IA' },
                  { val: '98%', label: 'Satisfaction' },
                ].map(s => (
                  <div key={s.label} className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-blue-400 font-black text-xl">{s.val}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Skills bars */}
              <div className="space-y-3">
                {[
                  { label: 'Support IT & Maintenance', pct: 90 },
                  { label: 'Cloud Azure', pct: 65 },
                  { label: 'Réseaux & Systèmes', pct: 78 },
                  { label: 'Vibe Coding IA', pct: 82 },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">{s.label}</span>
                      <span className="text-blue-400">{s.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.pct}%` }}
                        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute -top-4 -right-4 bg-[#0d1b3e] border border-blue-500/30 rounded-xl px-4 py-2 glow-blue-sm"
            >
              <p className="text-blue-400 font-black text-lg">+68%</p>
              <p className="text-slate-400 text-xs">Productivité IA</p>
            </motion.div>
          </motion.div>

        </div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {featureCards.map((c) => (
            <div key={c.title}
              className={`flex flex-col gap-2 p-5 rounded-xl border transition-all duration-300 cursor-default ${
                c.active
                  ? 'bg-blue-600/20 border-blue-500/50 glow-blue-sm'
                  : 'bg-white/5 border-white/10 hover:border-blue-500/30 hover:bg-blue-600/10'
              }`}
            >
              <span className="text-2xl">{c.icon}</span>
              <p className="text-white font-bold text-sm">{c.title}</p>
              <p className="text-slate-400 text-xs">{c.desc}</p>
              <div className="flex gap-1 mt-1">
                {[0,1,2].map(i => (
                  <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 && c.active ? 'bg-blue-400' : 'bg-slate-600'}`} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-6 mt-10 text-slate-600 text-sm"
        >
          {['Motivé', 'Rapide', 'Sécurisé', 'Évolutif'].map((t, i) => (
            <span key={t} className="flex items-center gap-3">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-blue-600" />}
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
