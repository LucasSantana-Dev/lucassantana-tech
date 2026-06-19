import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Group } from "three";
import { BufferAttribute, BufferGeometry, CanvasTexture } from "three";

type NodeFieldBackdropProps = {
  variant: "hero" | "architecture";
  className?: string;
};

type NodeFieldProps = {
  nodeCount: number;
  spread: number;
  drift: number;
};

const buildNodeData = (nodeCount: number, spread: number) => {
  const base = new Float32Array(nodeCount * 3);
  const phases = new Float32Array(nodeCount * 3);

  for (let i = 0; i < nodeCount; i++) {
    base[i * 3] = (Math.random() - 0.5) * spread;
    base[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.62;
    base[i * 3 + 2] = (Math.random() - 0.5) * spread;
    phases[i * 3] = Math.random() * Math.PI * 2;
    phases[i * 3 + 1] = Math.random() * Math.PI * 2;
    phases[i * 3 + 2] = Math.random() * Math.PI * 2;
  }

  return { base, phases };
};

const buildProximityEdges = (
  positions: Float32Array,
  nodeCount: number,
  spread: number,
): number[] => {
  const threshold = spread * 0.38;
  const thresholdSq = threshold * threshold;
  const maxConns = 4;
  const edges: number[] = [];
  const connCount = new Int32Array(nodeCount);

  for (let i = 0; i < nodeCount; i++) {
    if (connCount[i] >= maxConns) continue;
    for (let j = i + 1; j < nodeCount; j++) {
      if (connCount[j] >= maxConns) continue;
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < thresholdSq) {
        edges.push(i, j);
        connCount[i]++;
        connCount[j]++;
        if (connCount[i] >= maxConns) break;
      }
    }
  }

  return edges;
};

const makeGlowTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(220, 200, 255, 1)");
  gradient.addColorStop(0.3, "rgba(167, 139, 250, 0.8)");
  gradient.addColorStop(0.65, "rgba(139, 92, 246, 0.3)");
  gradient.addColorStop(1, "rgba(109, 40, 217, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fill();
  return new CanvasTexture(canvas);
};

const NodeField = ({ nodeCount, spread, drift }: NodeFieldProps) => {
  const groupRef = useRef<Group>(null);

  const { base, phases, edgeIndices } = useMemo(() => {
    const { base, phases } = buildNodeData(nodeCount, spread);
    const edgeIndices = buildProximityEdges(base, nodeCount, spread);
    return { base, phases, edgeIndices };
  }, [nodeCount, spread]);

  const nodePositions = useMemo(() => new Float32Array(nodeCount * 3), [nodeCount]);
  const edgePositions = useMemo(
    () => new Float32Array(edgeIndices.length * 3),
    [edgeIndices.length],
  );

  const glowTexture = useMemo(() => makeGlowTexture(), []);

  const nodesGeo = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(nodePositions, 3));
    return g;
  }, [nodePositions]);

  const edgesGeo = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(edgePositions, 3));
    return g;
  }, [edgePositions]);

  useEffect(
    () => () => {
      nodesGeo.dispose();
      edgesGeo.dispose();
      glowTexture.dispose();
    },
    [nodesGeo, edgesGeo, glowTexture],
  );

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    const amp = 0.18;
    const freq = 0.36;

    for (let i = 0; i < nodeCount; i++) {
      const px = phases[i * 3];
      const py = phases[i * 3 + 1];
      const pz = phases[i * 3 + 2];
      nodePositions[i * 3] = base[i * 3] + Math.sin(t * freq + px) * amp;
      nodePositions[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * freq * 0.8 + py) * amp;
      nodePositions[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * freq * 0.58 + pz) * amp * 0.7;
    }

    for (let e = 0; e < edgeIndices.length; e++) {
      const ni = edgeIndices[e];
      edgePositions[e * 3] = nodePositions[ni * 3];
      edgePositions[e * 3 + 1] = nodePositions[ni * 3 + 1];
      edgePositions[e * 3 + 2] = nodePositions[ni * 3 + 2];
    }

    nodesGeo.attributes.position.needsUpdate = true;
    edgesGeo.attributes.position.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * drift + pointer.x * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.28) * 0.07 + pointer.y * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={nodesGeo}>
        <pointsMaterial
          map={glowTexture}
          size={0.42}
          sizeAttenuation
          transparent
          opacity={0.88}
          depthWrite={false}
          alphaTest={0.02}
        />
      </points>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.22} depthWrite={false} />
      </lineSegments>
    </group>
  );
};

const useMobileMode = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isMobile;
};

export const NodeFieldBackdrop = ({ variant, className }: NodeFieldBackdropProps) => {
  const reduce = useReducedMotion();
  const isMobile = useMobileMode();
  const canvasReady =
    typeof window !== "undefined" && typeof ResizeObserver !== "undefined";

  const config = useMemo(() => {
    if (variant === "hero") {
      return isMobile
        ? { nodeCount: 52, spread: 7.0, drift: 0.12 }
        : { nodeCount: 140, spread: 9.4, drift: 0.17 };
    }
    return isMobile
      ? { nodeCount: 38, spread: 6.2, drift: 0.1 }
      : { nodeCount: 96, spread: 8.0, drift: 0.14 };
  }, [isMobile, variant]);

  if (reduce || !canvasReady) {
    return <div className={`nodefield-fallback ${className ?? ""}`.trim()} aria-hidden="true" />;
  }

  return (
    <div className={`nodefield-canvas ${className ?? ""}`.trim()} aria-hidden="true">
      <Canvas
        dpr={isMobile ? [1, 1.2] : [1, 1.6]}
        camera={{ position: [0, 0, 7.6], fov: variant === "hero" ? 52 : 48 }}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance" }}
      >
        <NodeField {...config} />
      </Canvas>
    </div>
  );
};
