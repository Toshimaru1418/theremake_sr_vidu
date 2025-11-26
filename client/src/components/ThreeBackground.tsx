import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      {/* Main sphere */}
      <Sphere args={[1, 100, 200]} scale={2.5} ref={meshRef} position={[2, 0, -2]}>
        <MeshDistortMaterial
          color="#4a0080"
          attach="material"
          distort={0.6}
          speed={2}
          roughness={0.3}
          metalness={0.9}
          emissive="#0099cc"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Glow sphere */}
      <Sphere args={[1.2, 32, 32]} scale={2.5} position={[2, 0, -2]}>
        <meshBasicMaterial
          color="#0099cc"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
    </>
  );
}

function CosmicParticles() {
  const count = 2000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 50;
    positions[i3 + 1] = (Math.random() - 0.5) * 50;
    positions[i3 + 2] = (Math.random() - 0.5) * 50;
    
    // Random colors: white, cyan, purple
    const colorChoice = Math.random();
    if (colorChoice < 0.5) {
      colors[i3] = 1;
      colors[i3 + 1] = 1;
      colors[i3 + 2] = 1;
    } else if (colorChoice < 0.75) {
      colors[i3] = 0.3;
      colors[i3 + 1] = 0.6;
      colors[i3 + 2] = 0.8;
    } else {
      colors[i3] = 0.66;
      colors[i3 + 1] = 0.33;
      colors[i3 + 2] = 1;
    }
  }

  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        vertexColors
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#000510']} />
        <fog attach="fog" args={['#000510', 5, 50]} />
        
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#00d4ff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#00ffff" />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={0.5}
        />
        
        <AnimatedSphere />
        <CosmicParticles />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
