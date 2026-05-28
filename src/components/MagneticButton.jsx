import { useRef, useState } from 'react'

export default function MagneticButton({ children, className, href, onClick, style }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const dx = (e.clientX - cx) * 0.35
    const dy = (e.clientY - cy) * 0.35
    setOffset({ x: dx, y: dy })
  }

  const handleLeave = () => {
    setOffset({ x: 0, y: 0 })
  }

  const Tag = href ? 'a' : 'button'
  const props = href ? { href } : { onClick }

  return (
    <Tag
      ref={ref}
      {...props}
      className={className}
      style={{
        ...style,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: 'transform',
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </Tag>
  )
}
