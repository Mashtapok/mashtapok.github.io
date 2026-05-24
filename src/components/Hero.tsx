import { ArrowRight } from 'lucide-react';
import { Cloud, Clouds, useTexture, useVideoTexture } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import {
  ClampToEdgeWrapping,
  LinearFilter,
  MeshLambertMaterial,
  NoColorSpace,
  Vector2,
  type Group,
  type ShaderMaterial,
} from 'three';
import {
  cloudTexture,
  ease,
  heroDepthMap,
  heroMediaSize,
  heroVideo,
  navItems,
  primaryText,
  profile,
  showHeroClouds,
} from '../data';
import { WordsPullUp } from './TextAnimations';

const heroVideoVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const heroVideoFragmentShader = `
  uniform sampler2D uVideo;
  uniform sampler2D uDepth;
  uniform vec2 uPointer;
  uniform vec2 uResolution;
  uniform vec2 uMediaResolution;
  uniform float uStrength;

  varying vec2 vUv;

  vec2 coverUv(vec2 uv) {
    float screenAspect = uResolution.x / uResolution.y;
    float mediaAspect = uMediaResolution.x / uMediaResolution.y;
    vec2 ratio = vec2(
      min(screenAspect / mediaAspect, 1.0),
      min(mediaAspect / screenAspect, 1.0)
    );

    return uv * ratio + (1.0 - ratio) * 0.5;
  }

  void main() {
    vec2 baseUv = mix(vec2(0.5), vUv, 0.94);
    vec2 depthUv = coverUv(baseUv);
    float depth = texture2D(uDepth, depthUv).r;
    float nearDepth = smoothstep(0.08, 0.92, depth);
    vec2 shiftedUv = coverUv(baseUv + uPointer * (nearDepth - 0.35) * uStrength);
    vec3 color = texture2D(uVideo, clamp(shiftedUv, vec2(0.001), vec2(0.999))).rgb;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function HeroVideoPlane() {
  const materialRef = useRef<ShaderMaterial>(null);
  const pointerTarget = useRef(new Vector2(0, 0));
  const pointer = useRef(new Vector2(0, 0));
  const { size, viewport } = useThree();
  const videoTexture = useVideoTexture(heroVideo, {
    crossOrigin: 'anonymous',
    muted: true,
    loop: true,
    playsInline: true,
  });
  const depthTexture = useTexture(heroDepthMap);
  const uniforms = useMemo(
    () => ({
      uVideo: { value: videoTexture },
      uDepth: { value: depthTexture },
      uPointer: { value: new Vector2(0, 0) },
      uResolution: { value: new Vector2(size.width, size.height) },
      uMediaResolution: { value: new Vector2(heroMediaSize[0], heroMediaSize[1]) },
      uStrength: { value: 0.01 },
    }),
    [depthTexture, size.height, size.width, videoTexture],
  );

  useEffect(() => {
    depthTexture.colorSpace = NoColorSpace;
    depthTexture.minFilter = LinearFilter;
    depthTexture.magFilter = LinearFilter;
    depthTexture.wrapS = ClampToEdgeWrapping;
    depthTexture.wrapT = ClampToEdgeWrapping;
    depthTexture.needsUpdate = true;
  }, [depthTexture]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerTarget.current.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    };
    const handlePointerLeave = () => {
      pointerTarget.current.set(0, 0);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  useFrame(() => {
    if (!materialRef.current) {
      return;
    }

    pointer.current.lerp(pointerTarget.current, 0.045);
    materialRef.current.uniforms.uPointer.value.copy(pointer.current);
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={heroVideoVertexShader}
        fragmentShader={heroVideoFragmentShader}
      />
    </mesh>
  );
}

function HeroVideoLayer() {
  return (
    <Canvas className="h-full w-full" dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <Suspense fallback={null}>
        <HeroVideoPlane />
      </Suspense>
    </Canvas>
  );
}

type DriftingCloudProps = {
  seed: number;
  start: number;
  y: number;
  z: number;
  scale: [number, number, number];
  bounds: [number, number, number];
  volume: number;
  opacity: number;
};

function DriftingCloud({ seed, start, y, z, scale, bounds, volume, opacity }: DriftingCloudProps) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) {
      return;
    }

    const travelWidth = 38;
    ref.current.position.x = -19 + ((clock.elapsedTime * 0.16 + start) % travelWidth);
    ref.current.position.y = y + Math.sin(clock.elapsedTime * 0.12 + seed) * 0.18;
  });

  return (
    <Cloud
      ref={ref}
      seed={seed}
      position={[-19 + start, y, z]}
      scale={scale}
      bounds={bounds}
      volume={volume}
      opacity={opacity}
      color="#ffd0a3"
      fade={24}
      segments={32}
      speed={0.025}
      growth={2.5}
    />
  );
}

function HeroCloudLayer() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 14], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight color="#ffc188" intensity={1.15} />
        <directionalLight color="#ff9152" intensity={3.2} position={[-8, 4, 7]} />
        <pointLight color="#ffd2a3" intensity={1.6} position={[-6, -2, 5]} />
        <Clouds texture={cloudTexture} material={MeshLambertMaterial} limit={120} frustumCulled={false}>
          <DriftingCloud
            seed={4}
            start={0}
            y={2.1}
            z={0}
            scale={[1.6, 0.85, 1]}
            bounds={[6.5, 1.3, 1.4]}
            volume={7}
            opacity={0.36}
          />
          <DriftingCloud
            seed={12}
            start={13}
            y={0.95}
            z={-1.4}
            scale={[2, 0.9, 1]}
            bounds={[7.5, 1.2, 1.3]}
            volume={6.5}
            opacity={0.3}
          />
          <DriftingCloud
            seed={21}
            start={26}
            y={2.85}
            z={-2}
            scale={[1.35, 0.75, 1]}
            bounds={[5.5, 1, 1.1]}
            volume={5.5}
            opacity={0.28}
          />
        </Clouds>
      </Suspense>
    </Canvas>
  );
}

export function Hero() {
  return (
    <section className="h-screen bg-black p-4 md:p-6">
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video className="absolute inset-0 z-0 h-full w-full object-cover" src={heroVideo} autoPlay loop muted playsInline />
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <HeroVideoLayer />
        </div>
        {showHeroClouds ? (
          <div className="pointer-events-none absolute inset-0 z-[2]">
            <HeroCloudLayer />
          </div>
        ) : null}
        <div className="noise-overlay pointer-events-none absolute inset-0 z-[3] opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8">
          <ul className="flex items-center gap-3 whitespace-nowrap sm:gap-6 md:gap-12 lg:gap-14">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[10px] transition-colors sm:text-xs md:text-sm"
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = primaryText;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)';
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-6 sm:px-6 md:px-8 md:pb-8 lg:px-10 lg:pb-10">
          <div className="grid grid-cols-12 items-end gap-y-5 md:gap-6">
            <div className="col-span-12 lg:col-span-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary/70 sm:text-sm">{profile.role}</p>
              <h1 className="m-0 font-medium leading-[0.85] tracking-[-0.07em]">
                <WordsPullUp
                  text={profile.name}
                  className="text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[11vw] xl:text-[10vw] 2xl:text-[10vw]"
                />
              </h1>
            </div>

            <div className="col-span-12 flex max-w-xl flex-col items-start gap-5 justify-self-start sm:max-w-md lg:col-span-4 lg:justify-self-end">
              <motion.p
                className="m-0 text-xs leading-[1.35] text-primary/70 sm:text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
              >
                React, TypeScript and Node.js engineer building high-load product interfaces, SSR platforms, commerce video flows
                and 3D/data-heavy tools.
              </motion.p>

              <motion.a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-[gap] duration-300 hover:gap-3 sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
              >
                Write me
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
