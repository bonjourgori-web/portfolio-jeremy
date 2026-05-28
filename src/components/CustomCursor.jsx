import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const raf     = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ringEl = ringRef.current

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = () => ringEl.style.transform = `translate(-50%,-50%) scale(1.8)`
    const onLeave = () => ringEl.style.transform = `translate(-50%,-50%) scale(1)`

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)

      dot.style.left = `${pos.current.x}px`
      dot.style.top  = `${pos.current.y}px`

      ringEl.style.left = `${ring.current.x}px`
      ringEl.style.top  = `${ring.current.y}px`

      raf.current = requestAnimationFrame(animate)
    }

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: 'fixed',
        width: '6px', height: '6px',
        borderRadius: '50%',
        background: '#3b82f6',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 8px 2px rgba(59,130,246,0.7)',
        transition: 'background 0.2s',
      }} />
      {/* Ring */}
      <div ref={ringRef} style={{
        position: 'fixed',
        width: '36px', height: '36px',
        borderRadius: '50%',
        border: '1.5px solid rgba(59,130,246,0.5)',
        pointerEvents: 'none',
        zIndex: 9998,
        transform: 'translate(-50%, -50%) scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1), border-color 0.3s',
        backdropFilter: 'blur(1px)',
      }} />
    </>
  )
}
