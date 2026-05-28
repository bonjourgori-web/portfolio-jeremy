import { useRef, useState } from 'react'

export default function TiltCard({ children, className, style, intensity = 12 }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')
  const [glare, setGlare]         = useState({ x: 50, y: 50, opacity: 0 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    const rotX = -y * intensity
    const rotY =  x * intensity
    setTransform(`perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`)
    setGlare({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
      opacity: 0.12,
    })
  }

  const handleLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)')
    setGlare(g => ({ ...g, opacity: 0 }))
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform,
        transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        willChange: 'transform',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Glare overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        pointerEvents: 'none',
        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
        transition: 'opacity 0.3s',
        zIndex: 10,
      }} />
      {children}
    </div>
  )
}
