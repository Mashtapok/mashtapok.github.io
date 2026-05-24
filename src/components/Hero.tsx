import { ArrowRight } from 'lucide-react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import {
  ClampToEdgeWrapping,
  LinearFilter,
  NoColorSpace,
  TextureLoader,
  Vector2,
  VideoTexture,
  type ShaderMaterial,
} from 'three';
import {
  ease,
  heroDepthMap,
  heroMediaSize,
  heroVideoSources,
  navItems,
  primaryText,
  profile,
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
  uniform float uStrength;

  varying vec2 vUv;

  void main() {
    vec2 baseUv = mix(vec2(0.5), vUv, 0.94);
    float depth = texture2D(uDepth, baseUv).r;
    float nearDepth = smoothstep(0.08, 0.92, depth);
    vec2 shiftedUv = baseUv + uPointer * (nearDepth - 0.35) * uStrength;
    vec3 color = texture2D(uVideo, clamp(shiftedUv, vec2(0.001), vec2(0.999))).rgb;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function useHeroVideoTexture(sources: typeof heroVideoSources) {
  const { gl } = useThree();
  const texture = useMemo(() => {
    const video = Object.assign(document.createElement('video'), {
      crossOrigin: 'anonymous',
      loop: true,
      muted: true,
      playsInline: true,
      preload: 'auto',
    });

    sources.forEach(({ src, type }) => {
      const source = document.createElement('source');

      source.src = src;
      source.type = type;
      video.appendChild(source);
    });

    const videoTexture = new VideoTexture(video);

    videoTexture.colorSpace = gl.outputColorSpace;

    return videoTexture;
  }, [gl.outputColorSpace, sources]);

  useEffect(() => {
    const video = texture.source.data as HTMLVideoElement;

    video.load();
    const playPromise = video.play();

    playPromise?.catch(() => undefined);

    return () => {
      video.pause();
      video.replaceChildren();
      video.load();
      texture.dispose();
    };
  }, [texture]);

  return texture;
}

function HeroVideoPlane() {
  const materialRef = useRef<ShaderMaterial>(null);
  const pointerTarget = useRef(new Vector2(0, 0));
  const pointer = useRef(new Vector2(0, 0));
  const { viewport } = useThree();
  const videoTexture = useHeroVideoTexture(heroVideoSources);
  const depthTexture = useLoader(TextureLoader, heroDepthMap);
  const mediaAspect = heroMediaSize[0] / heroMediaSize[1];
  const viewportAspect = viewport.width / viewport.height;
  const planeScale: [number, number, number] =
    viewportAspect > mediaAspect
      ? [viewport.width, viewport.width / mediaAspect, 1]
      : [viewport.height * mediaAspect, viewport.height, 1];
  const uniforms = useMemo(
    () => ({
      uVideo: { value: videoTexture },
      uDepth: { value: depthTexture },
      uPointer: { value: new Vector2(0, 0) },
      uStrength: { value: 0.01 },
    }),
    [depthTexture, videoTexture],
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
  });

  return (
    <mesh scale={planeScale}>
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

export function Hero() {
  return (
    <section className="h-screen bg-black p-4 md:p-6">
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video className="absolute inset-0 z-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="auto">
          {heroVideoSources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <HeroVideoLayer />
        </div>
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
