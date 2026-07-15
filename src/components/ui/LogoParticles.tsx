"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface LogoParticlesProps {
  className?: string;
  /** Canvas box size in px (square). Default 320. */
  size?: number;
}

interface Particle {
  current: THREE.Vector3;
  velocity: THREE.Vector3;
  target: THREE.Vector3;
  seed: number;
}

/** Sample a cubic bezier at t (SVG-space coordinates). */
function cubicBezier(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number
): [number, number] {
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  return [
    a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
  ];
}

function lerp2(p0: [number, number], p1: [number, number], t: number): [number, number] {
  return [p0[0] + (p1[0] - p0[0]) * t, p0[1] + (p1[1] - p0[1]) * t];
}

type ShapePoint = { pos: [number, number]; kind: "arc" | "bracket" };

/** Builds the Codeworth "nest + <>" mark as a cloud of SVG-space points (viewBox 0..36). */
function buildLogoPoints(): ShapePoint[] {
  const pts: ShapePoint[] = [];
  const N_ARC = 34;
  const N_BRACKET = 22;

  // Outer nest arc: M8 22 C10 17,14 14,18 14 C22 14,26 17,28 22
  for (let i = 0; i <= N_ARC; i++) {
    const t = i / N_ARC;
    pts.push({ pos: cubicBezier([8, 22], [10, 17], [14, 14], [18, 14], t), kind: "arc" });
  }
  for (let i = 0; i <= N_ARC; i++) {
    const t = i / N_ARC;
    pts.push({ pos: cubicBezier([18, 14], [22, 14], [26, 17], [28, 22], t), kind: "arc" });
  }

  // Inner nest arc: M10.5 25 C12.5 20.5,15.5 18,18 18 C20.5 18,23.5 20.5,25.5 25
  for (let i = 0; i <= N_ARC; i++) {
    const t = i / N_ARC;
    pts.push({ pos: cubicBezier([10.5, 25], [12.5, 20.5], [15.5, 18], [18, 18], t), kind: "arc" });
  }
  for (let i = 0; i <= N_ARC; i++) {
    const t = i / N_ARC;
    pts.push({ pos: cubicBezier([18, 18], [20.5, 18], [23.5, 20.5], [25.5, 25], t), kind: "arc" });
  }

  // Left bracket "<": M13 26 L10 23.5 L13 21
  for (let i = 0; i <= N_BRACKET; i++) {
    const t = i / N_BRACKET;
    pts.push({ pos: lerp2([13, 26], [10, 23.5], t), kind: "bracket" });
  }
  for (let i = 0; i <= N_BRACKET; i++) {
    const t = i / N_BRACKET;
    pts.push({ pos: lerp2([10, 23.5], [13, 21], t), kind: "bracket" });
  }

  // Right bracket ">": M23 21 L26 23.5 L23 26
  for (let i = 0; i <= N_BRACKET; i++) {
    const t = i / N_BRACKET;
    pts.push({ pos: lerp2([23, 21], [26, 23.5], t), kind: "bracket" });
  }
  for (let i = 0; i <= N_BRACKET; i++) {
    const t = i / N_BRACKET;
    pts.push({ pos: lerp2([26, 23.5], [23, 26], t), kind: "bracket" });
  }

  return pts;
}

/** Soft circular sprite drawn to a canvas — avoids shipping an image asset. */
function makeDotTexture(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.8)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Three.js particle simulation of the Codeworth mark: particles spring-simulate
 * from a scattered cloud into the "nest + <>" logo shape, then idle-drift with
 * per-particle noise (gentle physics, not a static render).
 */
export function LogoParticles({ className, size = 320 }: LogoParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const shapePoints = buildLogoPoints();
    const scale = 0.28;
    const particles: Particle[] = shapePoints.map(({ pos, kind }, i) => {
      const tx = (pos[0] - 18) * scale;
      const ty = -(pos[1] - 18) * scale;
      const tz = kind === "bracket" ? 0.35 + Math.random() * 0.2 : (Math.random() - 0.5) * 0.3;
      const target = new THREE.Vector3(tx, ty, tz);

      const scatterRadius = 5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const current = prefersReducedMotion
        ? target.clone()
        : new THREE.Vector3(
            scatterRadius * Math.sin(phi) * Math.cos(theta),
            scatterRadius * Math.sin(phi) * Math.sin(theta),
            scatterRadius * Math.cos(phi)
          );

      return { current, velocity: new THREE.Vector3(), target, seed: i * 12.9898 };
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles.length * 3);
    const colors = new Float32Array(particles.length * 3);

    const arcColorA = new THREE.Color("#818cf8"); // indigo-400
    const arcColorB = new THREE.Color("#312e81"); // indigo-900
    const bracketColor = new THREE.Color("#fcd34d"); // amber-300

    shapePoints.forEach(({ kind }, i) => {
      const c = kind === "bracket" ? bracketColor : arcColorA.clone().lerp(arcColorB, Math.random());
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    });

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.16,
      map: makeDotTexture(),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    const resize = () => {
      const w = container.clientWidth || size;
      const h = container.clientHeight || size;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    container.addEventListener("pointermove", onPointerMove);

    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();
    let elapsed = 0;

    const renderStaticFrame = () => {
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      particles.forEach((p, i) => {
        posAttr.setXYZ(i, p.target.x, p.target.y, p.target.z);
      });
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) {
      renderStaticFrame();
    } else {
      const animate = () => {
        if (!running) return;
        raf = requestAnimationFrame(animate);
        const dt = Math.min(clock.getDelta(), 1 / 30);
        elapsed += dt;
        const t = elapsed;

        const springK = 5.2;
        const damping = 3.4;
        const settle = Math.min(t / 2.5, 1); // assembly progress, 0 -> 1

        const posAttr = geometry.attributes.position as THREE.BufferAttribute;
        particles.forEach((p, i) => {
          const noiseAmp = 0.05 * settle;
          const nx = Math.sin(t * 0.6 + p.seed) * noiseAmp;
          const ny = Math.cos(t * 0.5 + p.seed * 1.3) * noiseAmp;
          const nz = Math.sin(t * 0.4 + p.seed * 0.7) * noiseAmp;

          const dx = p.target.x + nx - p.current.x;
          const dy = p.target.y + ny - p.current.y;
          const dz = p.target.z + nz - p.current.z;

          p.velocity.x += dx * springK * dt;
          p.velocity.y += dy * springK * dt;
          p.velocity.z += dz * springK * dt;
          p.velocity.multiplyScalar(Math.max(0, 1 - damping * dt));

          p.current.x += p.velocity.x * dt;
          p.current.y += p.velocity.y * dt;
          p.current.z += p.velocity.z * dt;

          posAttr.setXYZ(i, p.current.x, p.current.y, p.current.z);
        });
        posAttr.needsUpdate = true;

        group.rotation.y = t * 0.12 + pointerX * 0.25;
        group.rotation.x = pointerY * -0.15;

        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(animate);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.map?.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
