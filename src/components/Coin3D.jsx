import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Coin3D({ scrollProgress = 0, phase = 'intro' }) {
  const coinRef = useRef()
  const groupRef = useRef()
  
  // Create embossed texture for the coin face
  const embossedTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    
    // Background
    ctx.fillStyle = '#D4AF37'
    ctx.fillRect(0, 0, 512, 512)
    
    // Center circle pattern
    ctx.strokeStyle = '#B8860B'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(256, 256, 200, 0, Math.PI * 2)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.arc(256, 256, 180, 0, Math.PI * 2)
    ctx.stroke()
    
    // N letter in center
    ctx.fillStyle = '#1a1a1a'
    ctx.font = 'bold 180px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('N', 256, 256)
    
    // Decorative stars
    const drawStar = (x, y, size) => {
      ctx.fillStyle = '#B8860B'
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
        const method = i === 0 ? 'moveTo' : 'lineTo'
        ctx[method](x + size * Math.cos(angle), y + size * Math.sin(angle))
      }
      ctx.closePath()
      ctx.fill()
    }
    
    drawStar(100, 100, 20)
    drawStar(412, 100, 20)
    drawStar(100, 412, 20)
    drawStar(412, 412, 20)
    
    // Text around edge
    ctx.font = 'bold 24px serif'
    ctx.fillStyle = '#1a1a1a'
    const text = 'NEXUS FINANCE • PREMIUM • '
    const radius = 220
    
    for (let i = 0; i < text.length; i++) {
      const angle = (i / text.length) * Math.PI * 2 - Math.PI / 2
      ctx.save()
      ctx.translate(256 + radius * Math.cos(angle), 256 + radius * Math.sin(angle))
      ctx.rotate(angle + Math.PI / 2)
      ctx.fillText(text[i], 0, 0)
      ctx.restore()
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])
  
  // Animation frame
  useFrame((state) => {
    if (!coinRef.current || !groupRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Subtle idle floating animation
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.1
    
    // Phase-based animations
    if (phase === 'intro') {
      // Initial slow rotation
      coinRef.current.rotation.z += 0.005
    } else if (phase === 'rotate') {
      // Fast spinning based on scroll
      coinRef.current.rotation.z = scrollProgress * Math.PI * 4
    } else if (phase === 'toss') {
      // Coin toss - flip animation
      const tossProgress = scrollProgress
      coinRef.current.rotation.x = tossProgress * Math.PI * 3
      coinRef.current.rotation.z = tossProgress * Math.PI * 2
      groupRef.current.position.y = Math.sin(tossProgress * Math.PI) * 3
    } else if (phase === 'land') {
      // Landed - settle animation
      coinRef.current.rotation.x = 0
      coinRef.current.rotation.z = scrollProgress * 0.5
    }
  })
  
  return (
    <group ref={groupRef}>
      <group ref={coinRef}>
        {/* Main coin body - cylinder standing upright, faces pointing at camera */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2, 2, 0.2, 64]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0.25}
            envMapIntensity={1.5}
          />
        </mesh>
        
        {/* Front face with texture */}
        <mesh position={[0, 0, 0.101]}>
          <circleGeometry args={[1.98, 64]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0.2}
            map={embossedTexture}
            envMapIntensity={1.2}
          />
        </mesh>
        
        {/* Back face with texture */}
        <mesh position={[0, 0, -0.101]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[1.98, 64]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0.2}
            map={embossedTexture}
            envMapIntensity={1.2}
          />
        </mesh>
        
        {/* Outer edge ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.05, 16, 64]} />
          <meshStandardMaterial
            color="#B8860B"
            metalness={1}
            roughness={0.3}
          />
        </mesh>
        
        {/* Inner decorative ring - front */}
        <mesh position={[0, 0, 0.11]}>
          <ringGeometry args={[1.65, 1.7, 64]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={1}
            roughness={0.1}
            emissive="#FFD700"
            emissiveIntensity={0.15}
          />
        </mesh>
        
        {/* Inner decorative ring - back */}
        <mesh position={[0, 0, -0.11]} rotation={[0, Math.PI, 0]}>
          <ringGeometry args={[1.65, 1.7, 64]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={1}
            roughness={0.1}
            emissive="#FFD700"
            emissiveIntensity={0.15}
          />
        </mesh>
      </group>
      
      {/* Glow effect */}
      <pointLight
        position={[0, 0, 0]}
        color="#FFD700"
        intensity={0.5}
        distance={5}
      />
    </group>
  )
}
