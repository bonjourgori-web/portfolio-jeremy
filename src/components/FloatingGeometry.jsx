import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Icosahedron, Torus, Octahedron } from '@react-three/drei'
import { useRef } from 'react'

function DistortSphere() {
  const mesh = useRef()
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.15
    mesh.current.rotation.y = state.clock.elapsedTime * 0.20
  })
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} position={[2.2, 0.4, 0]}>
        <icosahedronGeometry args={[1.1, 4]} />
        <MeshDistortMaterial
          color="#1d4ed8"
          attach="material"
          distort={0.38}
          speed={2.5}
          roughness={0.1}
          metalness={0.7}
          wireframe={false}
        />
      </mesh>
    </Float>
  )
}

function WireRing() {
  const mesh = useRef()
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.25
    mesh.current.rotation.z = state.clock.elapsedTime * 0.12
  })
  return (
    <Float speed={2.2} rotationIntensity={1} floatIntensity={0.8}>
      <mesh ref={mesh} position={[-2.5, -0.5, -1]}>
        <torusGeometry args={[1.0, 0.04, 16, 80]} />
        <meshStandardMaterial color="#3b82f6" wireframe emissive="#1e40af" emissiveIntensity={0.6} />
      </mesh>
    </Float>
  )
}

function SmallOcta() {
  const mesh = useRef()
  useFrame((state) => {
    mesh.current.rotation.y = state.clock.elapsedTime * 0.5
    mesh.current.rotation.x = state.clock.elapsedTime * 0.3
  })
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={mesh} position={[3.5, -1.5, -0.5]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.5} metalness={0.8} roughness={0.1} />
      </mesh>
    </Float>
  )
}

function SmallOcta2() {
  const mesh = useRef()
  useFrame((state) => {
    mesh.current.rotation.y = -state.clock.elapsedTime * 0.4
    mesh.current.rotation.z = state.clock.elapsedTime * 0.2
  })
  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.2}>
      <mesh ref={mesh} position={[-3.2, 1.5, -1]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#93c5fd" emissive="#1d4ed8" emissiveIntensity={0.4} metalness={0.9} roughness={0.05} />
      </mesh>
    </Float>
  )
}

export default function FloatingGeometry() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 2,
    }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#3b82f6" />
        <pointLight position={[-5, -3, 2]} intensity={0.6} color="#818cf8" />
        <DistortSphere />
        <WireRing />
        <SmallOcta />
        <SmallOcta2 />
      </Canvas>
    </div>
  )
}
