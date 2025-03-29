
'use client'

import React, { useRef, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const UnrollMaterial = shaderMaterial(
  {
    time: 0,
    progress: 0,
    angle: 0,
    resolution: new THREE.Vector4(1, 1, 1, 1),  
    texture1: null,
    texture2: null,
  },
  // Vertex Shader
  `
    uniform float time;
    uniform float angle;
    uniform float progress;
    uniform vec4 resolution;
    varying vec2 vUv;
    varying float vFrontShadow;

    const float pi = 3.1415925;

    mat4 rotationMatrix(vec3 axis, float angle) {
        axis = normalize(axis);
        float s = sin(angle);
        float c = cos(angle);
        float oc = 1.0 - c;
        
        return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                    0.0,                                0.0,                                0.0,                                1.0);
    }

    vec3 rotate(vec3 v, vec3 axis, float angle) {
      mat4 m = rotationMatrix(axis, angle);
      return (m * vec4(v, 1.0)).xyz;
    }

    // Enhanced persistent wave effect
    float getPersistentWave(vec2 uv, float time) {
      // Slower primary waves
      float wave1 = sin(uv.x * 3.0 + time * 0.8) * 0.006;
      float wave2 = sin(uv.y * 2.5 + time * 0.6) * 0.005;
      
      // Additional secondary waves for more complexity
      float wave3 = sin(uv.x * 1.5 + time * 0.4) * 0.004;
      float wave4 = sin(uv.y * 2.0 + time * 0.5) * 0.003;
      
      // Diagonal wave for more natural movement
      float diagonalWave = sin((uv.x + uv.y) * 2.0 + time * 0.7) * 0.004;
      
      // Enhanced edge effect
      float edgeFactor = smoothstep(0.0, 0.5, distance(uv, vec2(0.5)));
      float cornerFactor = pow(edgeFactor, 2.0);
      
      // Combine all waves with enhanced edge effect
      return (wave1 + wave2 + wave3 + wave4 + diagonalWave) * (1.0 + edgeFactor * 2.5 + cornerFactor * 1.5);
    }

    void main() {
      vUv = uv;
      float finalAngle = angle - 0.*0.3*sin(progress*6.);

      vec3 newposition = position;

      float rad = 0.1;
      float rolls = 8.;
      newposition = rotate(newposition - vec3(-.5,.5,0.), vec3(0.,0.,1.),-finalAngle) + vec3(-.5,.5,0.);

      float offs = (newposition.x + 0.5)/(sin(finalAngle) + cos(finalAngle));
      float tProgress = clamp( (progress - offs*0.99)/0.01 , 0.,1.);

      vFrontShadow = clamp((progress - offs*0.95)/0.05,0.7,1.);

      // Unroll animation
      newposition.z =  rad + rad*(1. - offs/2.)*sin(-offs*rolls*pi - 0.5*pi);
      newposition.x =  - 0.5 + rad*(1. - offs/2.)*cos(-offs*rolls*pi + 0.5*pi);
      newposition = rotate(newposition - vec3(-.5,.5,0.), vec3(0.,0.,1.),finalAngle) + vec3(-.5,.5,0.);
      newposition = rotate(newposition - vec3(-.5,0.5,rad), vec3(sin(finalAngle),cos(finalAngle),0.), -pi*progress*rolls);
      newposition +=  vec3(
        -.5 + progress*cos(finalAngle)*(sin(finalAngle) + cos(finalAngle)), 
        0.5 - progress*sin(finalAngle)*(sin(finalAngle) + cos(finalAngle)),
        rad*(1.-progress/2.)
      );

      vec3 finalposition = mix(newposition,position,tProgress);
      
      // Add enhanced persistent wave after animation completes
      if (tProgress > 0.0) {
        float waveEffect = getPersistentWave(uv, time);
        finalposition.z += waveEffect;
        finalposition.x += waveEffect * 0.7; // Increased horizontal movement
        finalposition.y += waveEffect * 0.7; // Increased vertical movement
      }

      gl_Position = projectionMatrix * modelViewMatrix * vec4(finalposition, 1.0 );
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform float progress;
    uniform sampler2D texture1;
    uniform sampler2D texture2;
    uniform vec4 resolution;

    varying vec2 vUv;
    varying float vFrontShadow;

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      
      // Enhanced UV distortion for the persistent wave effect
      float distortion = sin(newUV.y * 2.0 + time * 0.7) * 0.002 +
                        sin(newUV.x * 2.5 + time * 0.6) * 0.002;
      newUV.x += distortion;
      newUV.y += distortion;

      gl_FragColor = texture2D(texture1,newUV);
      gl_FragColor.rgb *= vFrontShadow;
      gl_FragColor.a = clamp(progress*5.,0.,1.);
    }
  `
)

extend({ UnrollMaterial })

function UnrollImage({ ImageUrl, isTriggered }) {
  const meshRef = useRef(null)
  const materialRef = useRef(null)
  const { viewport } = useThree()
  const startTime = useRef(null)

  const texture1 = useMemo(() => new THREE.TextureLoader().load(ImageUrl), [ImageUrl])
  const texture2 = useMemo(() => new THREE.TextureLoader().load(ImageUrl), [ImageUrl])

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.texture1 = texture1
      materialRef.current.texture2 = texture2
      materialRef.current.resolution.set(viewport.width, viewport.height, 1, 1)
      materialRef.current.angle = Math.PI/0.96
    }
  }, [texture1, texture2, viewport])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      // Always update time for persistent animation
      materialRef.current.time = clock.getElapsedTime()
      
      if (isTriggered && !startTime.current) {
        startTime.current = clock.getElapsedTime()
      }
      
      if (startTime.current) {
        const elapsed = clock.getElapsedTime() - startTime.current
        materialRef.current.progress = Math.min(elapsed / 3, 1)
      } else {
        materialRef.current.progress = 0
      }
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <unrollMaterial ref={materialRef} />
    </mesh>
  )
}

export default function UnrollEffect({ imageUrl }) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.5
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{width:'50vw',height:'50vh'}}>
      <Canvas camera={{ position: [0, 0, 1.5], fov: 50 }}>
        <UnrollImage ImageUrl={imageUrl} isTriggered={isVisible} />
      </Canvas>
    </div>
  )
}




