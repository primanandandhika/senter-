"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/landing/reveal";
import { Icon } from "@/components/shared/icon";

const stages = [
  {
    number: "01",
    label: "The shop total",
    title: "One number is a starting point.",
    body: "A simulated 24.8 kWh reading gives the shop an overall view of its energy use.",
    value: "24.8 kWh",
    detail: "SIMULATED DAILY ENERGY",
  },
  {
    number: "02",
    label: "The devices behind it",
    title: "Follow the energy to each device.",
    body: "The total opens into five appliance-level estimates, making the largest contributors easier to spot.",
    value: "5 devices",
    detail: "ILLUSTRATIVE MONITORING POINTS",
  },
  {
    number: "03",
    label: "A next step",
    title: "Turn a pattern into a question.",
    body: "A preliminary indicator can help an owner decide what to inspect. It is a prompt to verify, not a confirmed fault.",
    value: "Review operating hours",
    detail: "PRACTICAL NEXT STEP",
  },
];

const colors = ["#8052ff", "#8052ff", "#54c5a8", "#ffb829", "#bdbdbd"];
const applianceAnchors = [
  [-0.42, -0.23, 0.22], [-0.14, -0.4, -0.12], [0.19, -0.34, 0.18],
  [0.42, -0.08, -0.14], [0.34, 0.25, 0.16], [0.08, 0.39, -0.16],
  [-0.28, 0.31, 0.11], [-0.47, 0.05, -0.12],
];

type Particle = {
  sphere: [number, number, number];
  devices: [number, number, number];
  action: [number, number, number];
  color: string;
  size: number;
  phase: number;
};

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function createParticles(count: number): Particle[] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  return Array.from({ length: count }, (_, index) => {
    const y = 1 - (index / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const angle = goldenAngle * index;
    const shell = 0.76 + seeded(index, 1) * 0.24;
    const sphere: [number, number, number] = [
      Math.cos(angle) * ring * shell,
      y * shell,
      Math.sin(angle) * ring * shell,
    ];

    const anchor = applianceAnchors[index % applianceAnchors.length];
    const jitter = 0.105 + seeded(index, 2) * 0.18;
    const devices: [number, number, number] = [
      anchor[0] + (seeded(index, 3) - 0.5) * jitter * 2,
      anchor[1] + (seeded(index, 4) - 0.5) * jitter * 2,
      anchor[2] + (seeded(index, 5) - 0.5) * jitter * 2,
    ];

    const x = -0.78 + (index / (count - 1)) * 1.56;
    const action: [number, number, number] = [
      x,
      Math.sin(x * 5.2) * 0.28 + (seeded(index, 6) - 0.5) * 0.16,
      (seeded(index, 7) - 0.5) * 0.28,
    ];

    return {
      sphere,
      devices,
      action,
      color: colors[index % colors.length],
      size: 0.65 + seeded(index, 8) * 1.45,
      phase: seeded(index, 9) * Math.PI * 2,
    };
  });
}

function interpolateShape(particle: Particle, progress: number): [number, number, number] {
  const blend = (a: number, b: number, t: number) => a + (b - a) * t;
  const smooth = (value: number) => value * value * (3 - 2 * value);

  if (progress < 1 / 3) {
    const t = smooth(progress * 3);
    return particle.sphere.map((value, index) => blend(value, particle.devices[index], t)) as [number, number, number];
  }

  if (progress < 2 / 3) {
    const t = smooth((progress - 1 / 3) * 3);
    return particle.devices.map((value, index) => blend(value, particle.action[index], t)) as [number, number, number];
  }
  return particle.action;
}

function EnergyParticleCanvas({ progressRef, requestDrawRef }: {
  progressRef: MutableRefObject<number>;
  requestDrawRef: MutableRefObject<() => void>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const reducedMotion = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const particles = createParticles(1120);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = media.matches;
    const pointerState = pointer.current;
    const view = { width: 1, height: 1, dpr: 1, rotationX: -0.18, rotationY: 0 };
    let frame = 0;
    let visible = false;
    let lastDraw = 0;

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      view.width = Math.max(1, box.width);
      view.height = Math.max(1, box.height);
      view.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(view.width * view.dpr);
      canvas.height = Math.round(view.height * view.dpr);
      context.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    };

    const draw = (time: number) => {
      frame = 0;
      if (!visible) return;
      if (time - lastDraw < 30) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastDraw = time;

      const { width, height } = view;
      context.clearRect(0, 0, width, height);
      const rawProgress = progressRef.current;
      const interaction = reducedMotion.current
        ? rawProgress < 1 / 3 ? 0 : rawProgress < 2 / 3 ? 0.5 : 1
        : rawProgress;
      const scale = Math.min(width, height) * (0.405 + interaction * 0.025);

      pointerState.x += (pointerState.targetX - pointerState.x) * 0.055;
      pointerState.y += (pointerState.targetY - pointerState.y) * 0.055;
      const idleTurn = reducedMotion.current ? 0 : time * 0.00008;
      const rotationY = reducedMotion.current ? 0 : idleTurn + pointerState.x * 0.42;
      const rotationX = reducedMotion.current ? -0.18 : -0.18 + pointerState.y * 0.26;
      const sinY = Math.sin(rotationY);
      const cosY = Math.cos(rotationY);
      const sinX = Math.sin(rotationX);
      const cosX = Math.cos(rotationX);
      const centerX = width * 0.5;
      const centerY = height * 0.49;
      const points: Array<{ x: number; y: number; z: number; color: string; size: number; alpha: number }> = [];

      for (const particle of particles) {
        const shape = interpolateShape(particle, interaction);
        const drift = reducedMotion.current ? 0 : Math.sin(time * 0.00055 + particle.phase) * 0.008;
        const px = shape[0] + drift;
        const py = shape[1];
        const pz = shape[2];
        const rotatedX = px * cosY - pz * sinY;
        const rotatedZ = px * sinY + pz * cosY;
        const tiltedY = py * cosX - rotatedZ * sinX;
        const tiltedZ = py * sinX + rotatedZ * cosX;
        const perspective = 1 + tiltedZ * 0.19;
        points.push({
          x: centerX + rotatedX * scale * perspective,
          y: centerY + tiltedY * scale * perspective,
          z: tiltedZ,
          color: particle.color,
          size: particle.size,
          alpha: 0.19 + ((tiltedZ + 1) / 2) * 0.68,
        });
      }

      if (interaction > 0.24 && interaction < 0.77) {
        const lineProgress = Math.min(1, (interaction - 0.24) * 5.5);
        const anchors = applianceAnchors.map(([x, y, z]) => {
          const rotatedX = x * cosY - z * sinY;
          const rotatedZ = x * sinY + z * cosY;
          const tiltedY = y * cosX - rotatedZ * sinX;
          return [centerX + rotatedX * scale, centerY + tiltedY * scale] as const;
        });
        context.save();
        context.globalAlpha = lineProgress * 0.32;
        context.strokeStyle = "#8f78d7";
        context.lineWidth = 0.7;
        context.setLineDash([3, 7]);
        for (let index = 0; index < anchors.length; index += 1) {
          const next = (index + 1) % anchors.length;
          context.beginPath();
          context.moveTo(anchors[index][0], anchors[index][1]);
          context.lineTo(anchors[next][0], anchors[next][1]);
          context.stroke();
          if (index < 4) {
            context.beginPath();
            context.moveTo(anchors[index][0], anchors[index][1]);
            context.lineTo(centerX, centerY);
            context.stroke();
          }
        }
        context.restore();
      }

      points.sort((a, b) => a.z - b.z);
      for (const point of points) {
        context.globalAlpha = point.alpha;
        context.fillStyle = point.color;
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      if (!reducedMotion.current || Math.abs(pointerState.targetX - pointerState.x) > 0.001 || Math.abs(pointerState.targetY - pointerState.y) > 0.001) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const start = () => {
      if (visible && !frame) frame = window.requestAnimationFrame(draw);
    };
    requestDrawRef.current = start;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    }, { rootMargin: "120px 0px" });
    observer.observe(canvas);

    const onPointerMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointerState.targetX = ((event.clientX - box.left) / box.width - 0.5) * 2;
      pointerState.targetY = ((event.clientY - box.top) / box.height - 0.5) * 2;
      start();
    };
    const onPointerLeave = () => {
      pointerState.targetX = 0;
      pointerState.targetY = 0;
      start();
    };
    const onMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion.current = event.matches;
      start();
    };
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });
    media.addEventListener("change", onMotionPreference);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      media.removeEventListener("change", onMotionPreference);
      if (frame) window.cancelAnimationFrame(frame);
      requestDrawRef.current = () => {};
    };
  }, [progressRef, requestDrawRef]);

  return <canvas className="energy-particle-canvas" ref={canvasRef} aria-hidden="true" />;
}

export function EnergyScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const requestDraw = useRef<() => void>(() => {});
  const activeContent = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const reduceMotion = useRef(false);
  const current = stages[activeStage];

  useEffect(() => {
    const content = activeContent.current;
    if (!content) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.fromTo(content.children,
      { autoAlpha: 0, y: reduced ? 0 : 9 },
      { autoAlpha: 1, y: 0, duration: reduced ? 0.12 : 0.32, stagger: reduced ? 0 : 0.035, ease: "power2.out", overwrite: true },
    );
  }, [activeStage]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: reduceMotion.current ? 0 : 0.55,
      onUpdate: (self) => {
        progress.current = self.progress;
        requestDraw.current();
        const nextStage = Math.min(2, Math.floor(self.progress * 3));
        setActiveStage((previous) => previous === nextStage ? previous : nextStage);
      },
    });

    return () => trigger.kill();
  }, []);

  const goToStage = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const bounds = section.getBoundingClientRect();
    const sectionTop = window.scrollY + bounds.top;
    const scrollable = Math.max(0, section.offsetHeight - window.innerHeight);
    const stagePosition = index === 0 ? 0.04 : index === 1 ? 0.5 : 0.96;
    window.scrollTo({
      top: sectionTop + scrollable * stagePosition,
      behavior: reduceMotion.current ? "auto" : "smooth",
    });
  };

  return (
    <section className="energy-scroll-story p-5" id="overview" ref={sectionRef} aria-labelledby="energy-story-title">
      <div className="energy-story-sticky">
        <div className="container energy-story-inner">
          <div className="energy-story-left">
            <Reveal className="hero-copy energy-story-copy">
              <span className="section-kicker">SMART ENERGY MONITORING PLATFORM</span>
              <h1 id="energy-story-title">
                <span className="hero-heading-line text-5xl xl:text-6xl">Know Your Energy.</span>
                <span className="hero-heading-line text-5xl xl:text-6xl">Take Control.</span>
              </h1>
              <p>Monitor electricity consumption at every appliance, discover unusual usage patterns, and make smarter energy decisions for your business.</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/dashboard">Explore Dashboard <Icon name="arrow-up-right" size={16} /></Link>
                <a className="text-action" href="#how-it-works">Discover How It Works <Icon name="arrow-right" size={16} /></a>
              </div>
              <div className="hero-trust"><span className="demo-pulse"><i /></span><span>Interface prototype</span><span className="trust-divider" /><span>Simulated data</span></div>
            </Reveal>

            <div className="energy-story-details">
            <div className="energy-story-active" ref={activeContent} aria-live="polite" aria-atomic="true">
              <span className="energy-story-stage-label">{current.number} / {current.detail}</span>
              <h3>{current.title}</h3>
              <p>{current.body}</p>
              <strong>{current.value}</strong>
            </div>

            <nav className="energy-story-steps" aria-label="Energy story stages">
              {stages.map((stage, index) => (
                <button
                  key={stage.number}
                  className={index === activeStage ? "is-active" : ""}
                  type="button"
                  aria-pressed={index === activeStage}
                  onClick={() => goToStage(index)}
                >
                  <span>{stage.number}</span>{stage.label}
                </button>
              ))}
            </nav>
            <span className="energy-story-disclaimer">Illustrative interface only. No live devices are connected.</span>
            </div>
          </div>

          <div className="energy-story-visual" role="img" aria-label={`Interactive particle visualization: ${current.label}`}>
            <div className={`energy-particle-aura stage-${activeStage}`} />
            <div className="energy-orbit orbit-one" />
            <div className="energy-orbit orbit-two" />
            <EnergyParticleCanvas progressRef={progress} requestDrawRef={requestDraw} />
            <span className="particle-caption particle-caption-top">{activeStage === 0 ? "TOTAL METER" : activeStage === 1 ? "APPLIANCE NETWORK" : "PRACTICAL NEXT STEP"}</span>
            <span className="particle-caption particle-caption-bottom">MOVE YOUR POINTER · SCROLL TO TRACE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
