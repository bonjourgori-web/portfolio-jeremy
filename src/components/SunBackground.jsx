import { useTheme } from '../context/ThemeContext'

export default function SunBackground() {
  const { theme } = useTheme()
  if (theme !== 'light') return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      pointerEvents: 'none', overflow: 'hidden',
    }}>

      {/* ── 1. Ciel dégradé du haut vers le bas ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(
          168deg,
          #9FD4EE 0%,
          #B8E2F7 7%,
          #CEEDFB 14%,
          #E2F5FD 24%,
          #F5FBFE 34%,
          #FFF8E4 48%,
          #FFFCF0 62%,
          #FDF8EE 78%,
          #FAF6F0 100%
        )`,
      }} />

      {/* ── 2. Halo extérieur du soleil (très large, très doux) ── */}
      <div style={{
        position: 'absolute', top: '-320px', right: '3%',
        width: '900px', height: '900px',
        background: `radial-gradient(circle,
          rgba(255,252,160,0.65) 0%,
          rgba(255,230,70,0.40) 18%,
          rgba(255,200,40,0.22) 32%,
          rgba(255,170,20,0.10) 48%,
          rgba(255,140,10,0.04) 62%,
          transparent 72%
        )`,
        borderRadius: '50%',
        filter: 'blur(35px)',
      }} />

      {/* ── 3. Rayons larges animés (rotation lente) ── */}
      <div style={{
        position: 'absolute', top: '-420px', right: '-8%',
        width: '1050px', height: '1050px',
        borderRadius: '50%',
        filter: 'blur(6px)',
        animation: 'sunSpin 90s linear infinite',
        background: `conic-gradient(from 0deg at 46% 44%,
          rgba(255,238,80,0.14) 0deg,   transparent 11deg,
          rgba(255,225,55,0.11) 22deg,  transparent 33deg,
          rgba(255,242,90,0.12) 44deg,  transparent 55deg,
          rgba(255,230,60,0.10) 66deg,  transparent 77deg,
          rgba(255,238,80,0.11) 88deg,  transparent 99deg,
          rgba(255,225,55,0.09) 110deg, transparent 121deg,
          rgba(255,242,90,0.10) 132deg, transparent 143deg,
          rgba(255,230,60,0.08) 154deg, transparent 165deg,
          rgba(255,238,80,0.07) 176deg, transparent 187deg,
          rgba(255,225,55,0.06) 198deg, transparent 209deg,
          rgba(255,242,90,0.07) 220deg, transparent 231deg,
          rgba(255,230,60,0.06) 242deg, transparent 253deg,
          rgba(255,238,80,0.05) 264deg, transparent 275deg,
          rgba(255,225,55,0.05) 286deg, transparent 297deg,
          rgba(255,242,90,0.06) 308deg, transparent 319deg,
          rgba(255,230,60,0.05) 330deg, transparent 341deg,
          rgba(255,238,80,0.05) 352deg, transparent 360deg
        )`,
      }} />

      {/* ── 4. Rayons fins second plan (contre-rotation) ── */}
      <div style={{
        position: 'absolute', top: '-360px', right: '-2%',
        width: '920px', height: '920px',
        borderRadius: '50%',
        filter: 'blur(2px)',
        animation: 'sunSpinReverse 140s linear infinite',
        background: `conic-gradient(from 8deg at 48% 43%,
          rgba(255,248,130,0.09) 0deg,  transparent 7deg,
          rgba(255,238,100,0.07) 14deg, transparent 21deg,
          rgba(255,248,130,0.08) 28deg, transparent 35deg,
          rgba(255,238,100,0.06) 42deg, transparent 49deg,
          rgba(255,248,130,0.07) 56deg, transparent 63deg,
          rgba(255,238,100,0.06) 70deg, transparent 77deg,
          rgba(255,248,130,0.05) 84deg, transparent 91deg,
          transparent 360deg
        )`,
      }} />

      {/* ── 5. Noyau du soleil ── */}
      <div style={{
        position: 'absolute', top: '-55px', right: '17%',
        width: '190px', height: '190px',
        borderRadius: '50%',
        background: `radial-gradient(circle,
          #FFFFFF 0%,
          rgba(255,254,220,0.98) 18%,
          rgba(255,244,120,0.90) 38%,
          rgba(255,215,50,0.70) 58%,
          rgba(255,180,30,0.35) 72%,
          transparent 85%
        )`,
        filter: 'blur(1.5px)',
        boxShadow: `
          0 0 30px 15px rgba(255,240,80,0.55),
          0 0 70px 35px rgba(255,220,50,0.30),
          0 0 140px 70px rgba(255,190,30,0.15)
        `,
      }} />

      {/* ── 6. Lens flare — rayon diagonal principal ── */}
      <div style={{
        position: 'absolute', top: 0, right: '22%',
        width: '5px', height: '80vh',
        background: 'linear-gradient(to bottom, rgba(255,252,180,0.80) 0%, rgba(255,240,100,0.35) 15%, rgba(255,230,80,0.12) 40%, transparent 70%)',
        transform: 'rotate(14deg)',
        transformOrigin: 'top center',
        filter: 'blur(3px)',
      }} />
      <div style={{
        position: 'absolute', top: '10px', right: '19%',
        width: '2.5px', height: '55vh',
        background: 'linear-gradient(to bottom, rgba(255,255,210,0.65) 0%, rgba(255,248,140,0.22) 25%, transparent 60%)',
        transform: 'rotate(8deg)',
        transformOrigin: 'top center',
        filter: 'blur(2px)',
      }} />
      <div style={{
        position: 'absolute', top: '-5px', right: '25%',
        width: '3px', height: '40vh',
        background: 'linear-gradient(to bottom, rgba(255,250,160,0.55) 0%, rgba(255,240,100,0.18) 30%, transparent 60%)',
        transform: 'rotate(20deg)',
        transformOrigin: 'top center',
        filter: 'blur(2.5px)',
      }} />

      {/* ── 7. Lumière ambiante chaude vers le bas ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '45vh',
        background: 'linear-gradient(to top, rgba(255,245,210,0.45) 0%, rgba(255,248,220,0.18) 40%, transparent 100%)',
      }} />

      {/* ── 8. Reflet lumineux en bas-gauche (rebond de lumière) ── */}
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-100px',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,245,180,0.18) 0%, transparent 65%)',
        filter: 'blur(40px)',
      }} />

      {/* ── 9. Vignette douce sur les bords ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 65% 15%, transparent 55%, rgba(160,215,240,0.12) 100%)',
      }} />

    </div>
  )
}
