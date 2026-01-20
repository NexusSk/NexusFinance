import { Canvas } from '@react-three/fiber'
import { Environment, Float, Sparkles } from '@react-three/drei'
import { Suspense, useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Coin3D } from './Coin3D'

function CameraController({ scrollProgress, phase }) {
  const { camera } = useThree()
  const targetPosition = useRef(new THREE.Vector3(0, 0, 8))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))
  
  useFrame(() => {
    // Smooth camera transitions based on phase
    if (phase === 'intro' || phase === 'rotate') {
      targetPosition.current.set(0, 0, 8)
      targetLookAt.current.set(0, 0, 0)
    } else if (phase === 'toss') {
      // Camera moves to top-down view during toss
      const progress = scrollProgress
      targetPosition.current.set(
        0,
        2 + progress * 6,
        8 - progress * 6
      )
      targetLookAt.current.set(0, progress * 2, 0)
    } else if (phase === 'land') {
      targetPosition.current.set(0, 4, 4)
      targetLookAt.current.set(0, 0, 0)
    }
    
    // Smooth interpolation
    camera.position.lerp(targetPosition.current, 0.05)
    
    const currentLookAt = new THREE.Vector3()
    camera.getWorldDirection(currentLookAt)
    camera.lookAt(targetLookAt.current)
  })
  
  return null
}

function GoldParticles() {
  return (
    <Sparkles
      count={100}
      scale={15}
      size={2}
      speed={0.3}
      color="#FFD700"
      opacity={0.5}
    />
  )
}

function Lighting() {
  return (
    <>
      {/* Main key light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        color="#FFFFFF"
        castShadow
      />
      
      {/* Gold rim light */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={1}
        color="#FFD700"
      />
      
      {/* Fill light */}
      <directionalLight
        position={[0, -5, 0]}
        intensity={0.5}
        color="#D4AF37"
      />
      
      {/* Ambient */}
      <ambientLight intensity={0.3} color="#FFE4B5" />
      
      {/* Spot light for dramatic effect */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#FFD700"
        castShadow
      />
    </>
  )
}

export function Scene({ scrollProgress = 0, phase = 'intro' }) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 10, 30]} />
        
        <Suspense fallback={null}>
          <CameraController scrollProgress={scrollProgress} phase={phase} />
          <Lighting />
          
          <Float
            speed={1}
            rotationIntensity={0.2}
            floatIntensity={0.3}
            enabled={phase === 'intro'}
          >
            <Coin3D scrollProgress={scrollProgress} phase={phase} />
          </Float>
          
          <GoldParticles />
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
