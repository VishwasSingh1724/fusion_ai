'use client'
import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const ShaderImage = ({ effect, imageSrc }) => {
  const shaderEffects = {
    1: {
      vertex: `
        varying vec2 vUv;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float wave = sin(pos.x * 5.0 + time) * cos(pos.y * 5.0 + time);
          pos.z += wave * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragment: `
        varying vec2 vUv;
        uniform float time;
        uniform sampler2D image;

        vec2 distort(vec2 uv) {
          vec2 distortion = vec2(
            sin(uv.y * 20.0 + time) * 0.03,
            cos(uv.x * 20.0 + time) * 0.03
          );
          return uv + distortion;
        }

        void main() {
          vec2 uv = distort(vUv);
          vec4 color = texture2D(image, uv);
          color.r = texture2D(image, distort(vUv + vec2(0.01, 0.0))).r;
          color.b = texture2D(image, distort(vUv - vec2(0.01, 0.0))).b;
          gl_FragColor = color;
        }
      `,
    },
        // Effect 2: Dynamic Wave Ripple
        2: {
          vertex: `
            varying vec2 vUv;
            uniform float time;
            void main() {
              vUv = uv;
              vec3 pos = position;
              float wave = sin((pos.x + pos.y) * 5.0 + time) * cos((pos.x - pos.y) * 5.0 + time);
              pos.z += wave * 0.1;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragment: `
            varying vec2 vUv;
            uniform float time;
            uniform sampler2D image;
      
            void main() {
              vec2 uv = vUv;
              float distortion = sin((uv.x + uv.y) * 20.0 + time) * 0.01;
              uv += vec2(distortion);
              
              vec4 color = texture2D(image, uv);
              
              // Add wave-like color effect
              float wave = sin((uv.x + uv.y) * 50.0 + time * 2.0) * 0.5 + 0.5;
              color.rgb *= vec3(0.8 + wave * 0.4);
              
              gl_FragColor = color;
            }
          `,
        },
        3: {
          vertex: `
            varying vec2 vUv;
      varying float vWave;
      
      uniform float time;
      
      // Simplex noise function
      vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                            -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * 0.0243902439) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        vUv = uv;
      
        vec3 pos = position;
        float noise = snoise(pos.xy * 1.0 + time * 0.5);
        vWave = noise * 0.2;
      
        pos.z += vWave;
      
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
      
          `,
          fragment: `
           varying vec2 vUv;
      varying float vWave;
      
      uniform sampler2D image;
      uniform float time;
      
      // Simplex noise function
      vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                            -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * 0.0243902439) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        vec2 uv = vUv;
      
        // Animate edges using noise
        float edgeNoise = snoise(uv * 5.0 + time * 0.5);
        float edgeMask = smoothstep(0.2 + edgeNoise * 0.2, 0.5, length(uv - vec2(0.5)));
      
        // Sample the texture
        vec4 texColor = texture2D(image, uv);
      
        // Apply wavy distortion
        float wave = vWave * 0.1;
        vec2 distortedUV = uv + vec2(wave, wave);
        vec4 distortedColor = texture2D(image, distortedUV);
      
        // Mix original and distorted color
        vec4 color = mix(texColor, distortedColor, edgeMask);
      
        // Add vibrant colors based on edge distance
        vec3 colorShift = vec3(0.5 + sin(edgeMask * 3.0 + time), 
                               0.5 + cos(edgeMask * 2.0 + time), 
                               0.5 - sin(edgeMask * 4.0 + time * 0.5));
        color.rgb += colorShift * edgeMask * 0.2;
      
        gl_FragColor = vec4(color.rgb, 1.0);
      }
      
          `,
        },
      
        // Effect 4: Holographic Interference (replacing Kaleidoscope Swirl)
        4: {
          vertex: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragment: `
            varying vec2 vUv;
            uniform float time;
            uniform sampler2D image;
      
            const float PI = 3.1415926535897932384626433832795;
      
            void main() {
              vec2 uv = vUv;
              
              // Create interference pattern
              float interference = sin(uv.x * 50.0 + time) * sin(uv.y * 50.0 + time);
              interference += sin((uv.x + uv.y) * 25.0 - time * 2.0);
              interference *= 0.5;
      
              // Sample the texture multiple times with slight offsets
              vec4 baseColor = texture2D(image, uv);
              vec4 color1 = texture2D(image, uv + vec2(0.01, 0.0) * interference);
              vec4 color2 = texture2D(image, uv - vec2(0.01, 0.0) * interference);
      
              // Combine colors for a holographic effect
              vec4 holographicColor = vec4(
                color1.r,
                baseColor.g,
                color2.b,
                max(max(color1.a, baseColor.a), color2.a)
              );
      
              // Add rainbow-like color shift
              vec3 rainbow = vec3(
                sin(uv.x * 10.0 + time) * 0.5 + 0.5,
                sin(uv.x * 10.0 + time + PI/3.0) * 0.5 + 0.5,
                sin(uv.x * 10.0 + time + 2.0*PI/3.0) * 0.5 + 0.5
              );
      
              // Combine holographic color with rainbow effect
              vec4 finalColor = mix(holographicColor, vec4(rainbow, 1.0), 0.3);
      
              // Add scanlines
              float scanline = sin(uv.y * 400.0 + time * 10.0) * 0.1 + 0.9;
              finalColor.rgb *= scanline;
      
              gl_FragColor = finalColor;
            }
          `,
        },
      
        // Effect 5: Glitch and RGB Split
        5: {
          vertex: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragment: `
            varying vec2 vUv;
            uniform sampler2D image;
            uniform float time;
      
            float random(vec2 st) {
              return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }
      
            vec2 glitchOffset(vec2 uv) {
              float noise = random(vec2(floor(time * 10.0), floor(uv.y * 100.0)));
              return vec2(noise * 0.03 * step(0.98, random(vec2(time))), 0.0);
            }
      
            void main() {
              vec2 uv = vUv;
              
              // Apply glitch effect
              uv += glitchOffset(uv);
              
              // RGB split
              float r = texture2D(image, uv + vec2(0.01 * sin(time), 0.0)).r;
              float g = texture2D(image, uv).g;
              float b = texture2D(image, uv - vec2(0.01 * sin(time), 0.0)).b;
              
              vec4 color = vec4(r, g, b, 1.0);
              
              // Add scanlines
              float scanline = sin(uv.y * 800.0 + time * 10.0) * 0.04 + 0.96;
              color.rgb *= scanline;
              
              // Vignette effect
              float vignette = length(vUv - 0.5);
              color.rgb *= smoothstep(0.8, 0.2, vignette);
              
              gl_FragColor = color;
            }
          `, 
        },
        6: {
          vertex: `
           varying vec2 vUv;
      varying float vWave; // Pass wave data to the fragment shader
      uniform float time;
      
      void main() {
          vUv = uv;
      
          // Modify vertex position to create a wave effect
          vec3 pos = position;
          float waveAmplitude = 0.1; // Amplitude of the wave
          float waveFrequency = 8.0; // Frequency of the wave
          pos.z += sin(pos.x * waveFrequency + time) * waveAmplitude; // Wave based on x-coordinate
          pos.z += sin(pos.y * waveFrequency + time) * waveAmplitude; // Wave based on y-coordinate
      
          vWave = pos.z; // Pass the wave value to the fragment shader
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
      
          `,
          fragment: `
            varying vec2 vUv;
      varying float vWave;
      uniform float time;
      uniform sampler2D image;
      
      // Random noise function
      vec2 random2(vec2 p) {
          return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
      }
      
      void main() {
          vec2 uv = vUv;
      
          // Add distortion to UV based on the wave value
          uv += vWave * 0.02;
      
          // Voronoi-like texture distortion logic
          vec2 scaledUv = uv * 10.0;
          vec2 i_st = floor(scaledUv);
          vec2 f_st = fract(scaledUv);
          float m_dist = 1.0;
          vec2 m_point;
      
          for (int y = -1; y <= 1; y++) {
              for (int x = -1; x <= 1; x++) {
                  vec2 neighbor = vec2(float(x), float(y));
                  vec2 point = random2(i_st + neighbor);
                  point = 0.5 + 0.5 * sin(time + 6.2831 * point);
                  vec2 diff = neighbor + point - f_st;
                  float dist = length(diff);
                  if (dist < m_dist) {
                      m_dist = dist;
                      m_point = point;
                  }
              }
          }
      
          // Color based on the distorted UV and Voronoi point
          vec3 color = vec3(m_point, 0.0);
          vec4 texColor = texture2D(image, uv + color.rg * 0.1);
          gl_FragColor = vec4(texColor.rgb + color * 0.3, texColor.a);
      }
      
          `,
        },
        // Effect 8:water wave
        7: {
        vertex: `
          varying vec2 vUv;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragment: `
          varying vec2 vUv;
          varying vec3 vPosition;
          uniform float time;
          uniform sampler2D image;
      
          float neuralPattern(vec2 uv) {
            float pattern = 0.0;
            for(float i = 1.0; i < 5.0; i++) {
              vec2 offset = vec2(
                sin(time * 0.5 * i + uv.y * 10.0) * 0.02,
                cos(time * 0.5 * i + uv.x * 10.0) * 0.02
              );
              pattern += sin(length(uv + offset) * 20.0 * i) / i;
            }
            return pattern * 0.5 + 0.5;
          }
      
          void main() {
            vec2 uv = vUv;
            
            // Create neural network-like pattern
            float pattern = neuralPattern(uv);
            
            // Sample original texture with neural distortion
            vec2 distortedUv = uv + vec2(pattern * 0.02);
            vec4 color = texture2D(image, distortedUv);
            
            // Add synaptic glow effect
            float synapticGlow = max(0.0, sin(pattern * 10.0 + time));
            vec3 glowColor = vec3(0.3, 0.6, 1.0) * synapticGlow * 0.3;
            
            // Add data flow effect
            float dataFlow = sin(uv.x * 30.0 + uv.y * 20.0 - time * 2.0) * 0.5 + 0.5;
            vec3 flowColor = vec3(0.1, 0.8, 0.5) * dataFlow * 0.2;
            
            color.rgb = mix(color.rgb, color.rgb + glowColor + flowColor, 0.7);
            
            // Add edge highlighting
            float edge = 1.0 - pattern;
            color.rgb += vec3(1.0, 1.0, 1.0) * edge * 0.1;
            
            gl_FragColor = color;
          }
        `,
        },
        8: {
            vertex: `
              varying vec2 vUv;
              varying vec3 vPosition;
              uniform float time;
              
              void main() {
                vUv = uv;
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragment: `
              varying vec2 vUv;
              uniform float time;
              uniform sampler2D image;
        
              const float PI = 3.14159265359;
        
              // Improved noise function
              vec2 hash22(vec2 p) {
                vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
                p3 += dot(p3, p3.yzx+33.33);
                return fract((p3.xx+p3.yz)*p3.zy);
              }
        
              float causticPattern(vec2 uv) {
                float pattern = 0.0;
                for(float i = 1.0; i <= 3.0; i++) {
                  vec2 p = uv * 2.0 * i;
                  vec2 h = hash22(floor(p + time * (0.2 * i)));
                  vec2 f = fract(p);
                  
                  float d = length(f - (h + vec2(sin(time * i), cos(time * i)) * 0.2));
                  pattern += smoothstep(0.7, 0.0, d) / i;
                }
                return pattern;
              }
        
              void main() {
                vec2 uv = vUv;
                float caustics = causticPattern(uv);
                
                // Create dynamic water movement
                vec2 distortion = vec2(
                  sin(uv.y * 10.0 + time + caustics) * cos(uv.x * 8.0 - time) * 0.02,
                  cos(uv.x * 10.0 - time + caustics) * sin(uv.y * 8.0 + time) * 0.02
                );
        
                vec4 texColor = texture2D(image, uv + distortion);
                
                // Add caustics color variations
                vec3 causticColor = vec3(0.2, 0.5, 1.0) + vec3(-0.1, 0.1, 0.2) * caustics;
                vec3 finalColor = mix(texColor.rgb, causticColor, caustics * 0.3);
                
                // Add subtle shimmer
                float shimmer = sin(uv.x * 30.0 + uv.y * 20.0 + time * 3.0) * 0.5 + 0.5;
                finalColor += vec3(1.0) * shimmer * caustics * 0.1;
        
                gl_FragColor = vec4(finalColor, texColor.a);
              }
            `,
          },  
          // Effect 3: Dynamic Cellular Flow
          9: {
            vertex: `
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragment: `
              varying vec2 vUv;
              uniform float time;
              uniform sampler2D image;
        
              vec2 random2(vec2 p) {
                return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
              }
        
              float voronoi(vec2 p) {
                vec2 i_st = floor(p);
                vec2 f_st = fract(p);
                float m_dist = 1.0;
                
                for (int y = -1; y <= 1; y++) {
                  for (int x = -1; x <= 1; x++) {
                    vec2 neighbor = vec2(float(x),float(y));
                    vec2 point = random2(i_st + neighbor);
                    point = 0.5 + 0.5 * sin(time * 0.5 + 6.2831 * point);
                    vec2 diff = neighbor + point - f_st;
                    float dist = length(diff);
                    m_dist = min(m_dist, dist);
                  }
                }
                return m_dist;
              }
        
              void main() {
                vec2 uv = vUv;
                float scale = 8.0;
                
                // Create flowing cellular pattern
                float pattern = voronoi(uv * scale + vec2(sin(time * 0.2), cos(time * 0.3)));
                
                // Create dynamic flow movement
                vec2 flow = vec2(
                  sin(pattern * 6.0 + time) * 0.01,
                  cos(pattern * 4.0 - time) * 0.01
                );
                
                // Sample texture with flow distortion
                vec4 texColor = texture2D(image, uv + flow);
                
                // Add cellular highlights
                float cells = smoothstep(0.0, 0.4, pattern);
                vec3 cellColor = vec3(0.2, 0.4, 0.8) * cells;
                
                // Create organic color variation
                vec3 finalColor = mix(texColor.rgb, texColor.rgb + cellColor, pattern * 0.5);
                
                // Add subtle pulsing
                float pulse = sin(time + pattern * 5.0) * 0.5 + 0.5;
                finalColor += vec3(0.1, 0.2, 0.3) * pulse * pattern;
        
                gl_FragColor = vec4(finalColor, texColor.a);
              }
            `,
          },
        
         10: {
            vertex: `
              varying vec2 vUv;
              varying vec3 vPosition;
              uniform float time;
        
              void main() {
                vUv = uv;
                vPosition = position;
        
                // Add a wavy effect to the vertices
                float waveIntensity = 0.1;
                float frequency = 5.0;
                vec3 newPosition = position + normal * sin(position.x * frequency + time) * cos(position.y * frequency + time) * waveIntensity;
        
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
              }
            `,
            fragment: `
              varying vec2 vUv;
              varying vec3 vPosition;
              uniform float time;
              uniform sampler2D image;
        
              void main() {
                vec2 uv = vUv;
                
                // Edge detection
                vec2 texelSize = 1.0 / vec2(textureSize(image, 0));
                vec4 center = texture2D(image, uv);
                vec4 left = texture2D(image, uv - vec2(texelSize.x, 0.0));
                vec4 right = texture2D(image, uv + vec2(texelSize.x, 0.0));
                vec4 top = texture2D(image, uv - vec2(0.0, texelSize.y));
                vec4 bottom = texture2D(image, uv + vec2(0.0, texelSize.y));
                vec4 edge = abs(center - left) + abs(center - right) + abs(center - top) + abs(center - bottom);
                
                // Glow effect
                float glow = length(edge.rgb) * 2.0;
                vec3 glowColor = vec3(1.0, 0.5, 0.2); // Orange glow
        
                // Warp the UV coordinates
                vec2 warpedUv = uv + vec2(
                  sin(uv.y * 10.0 + time) * 0.02,
                  cos(uv.x * 10.0 + time) * 0.02
                );
        
                vec4 color = texture2D(image, warpedUv);
                
                // Mix original color with edge glow
                color.rgb = mix(color.rgb, glowColor, glow);
        
                gl_FragColor = color;
              }
            `,
      
          },
       

  };

  const mesh = useRef();
  const imageTexture = useLoader(THREE.TextureLoader, imageSrc);

  const uniforms = {
    time: { value: 0 },
    image: { value: imageTexture },
  };

  useFrame(({ clock }) => {
    uniforms.time.value = clock.getElapsedTime();
  });

  const selectedEffect = shaderEffects[effect] || shaderEffects[1]; // Fallback to default effect

  const material = shaderMaterial({
    vertexShader: selectedEffect.vertex,
    fragmentShader: selectedEffect.fragment,
    uniforms,
  });

  return (
    <mesh ref={mesh} material={material} color="red">
      <planeGeometry args={[4, 3, 32, 32]} />
    </mesh>
  );
};

const ImageEffects = ({ imageSrc, effect = 1 }) => {
  return (
    <div style={{ width: '50vw', height: '50vh'}}>
      <Canvas
        camera={{
          position: [0, 0, 1.5], fov: 50 
        }}
      >
        <ambientLight intensity={0.5} />
        <ShaderImage effect={effect} imageSrc={imageSrc} />
      </Canvas>
    </div>
  );
};

export default ImageEffects;