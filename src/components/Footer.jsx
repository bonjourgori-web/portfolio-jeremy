export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
            style={{ background: 'var(--accent)' }}>FG</div>
          <span className="font-bold t-h">Franck<span className="t-accent">Gori</span></span>
        </div>
        <p className="text-sm t-muted">© 2025 Franck Jérémie Gori — Technicien IT & Vibe Coder · San Pédro, CI</p>
        <div className="flex gap-4 text-sm t-muted">
          <a href="mailto:jeremyironsgori@gmail.com" className="hover:t-accent transition-colors" style={{}} onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>Email</a>
          <a href="https://linkedin.com/in/franck-jérémie-gori-65845a24b" target="_blank" rel="noopener noreferrer" onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
