import { useReducedMotion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { BufferAttribute, BufferGeometry } from "three";

type NodeFieldBackdropProps = {
  variant: "hero" | "architecture";
  className?: string;
};

type NodeFieldProps = {
  nodeCount: number;
  edgeCount: number;
  spread: number;
  drift: number;
};

const buildNodes = (nodeCount: number, spread: number) => {
  const positions = new Float32Array(nodeCount * 3);

  for (let i = 0; i < nodeCount; i += 1) {
    const offset = i * 3;
    positions[offset] = (Math.random() - 0.5) * spread;
    positions[offset + 1] = (Math.random() - 0.5) * spread;
    positions[offset + 2] = (Math.random() - 0.5) * spread;
  }

  return positions;
};

const buildEdges = (nodes: Float32Array, edgeCount: number) => {
  const edges = new Float32Array(edgeCount * 6);
  const nodeCount = nodes.length / 3;

  for (let i = 0; i < edgeCount; i += 1) {
    const a = Math.floor(Math.random() * nodeCount);
    const b = (a + 1 + Math.floor(Math.random() * (nodeCount - 1))) % nodeCount;
    const edgeOffset = i * 6;
    const aOffset = a * 3;
    const bOffset = b * 3;

    edges[edgeOffset] = nodes[aOffset];
    edges[edgeOffset + 1] = nodes[aOffset + 1];
    edges[edgeOffset + 2] = nodes[aOffset + 2];
    edges[edgeOffset + 3] = nodes[bOffset];
    edges[edgeOffset + 4] = nodes[bOffset + 1];
    edges[edgeOffset + 5] = nodes[bOffset + 2];
  }

  return edges;
};

const useMobileMode = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const sync = () => setIsMobile(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return isMobile;
};

const NodeField = ({ nodeCount, edgeCount, spread, drift }: NodeFieldProps) => {
  const rootRef = useRef<Group>(null);
  const { nodes, edges } = useMemo(() => {
    const nodePositions = buildNodes(nodeCount, spread);
    return { nodes: nodePositions, edges: buildEdges(nodePositions, edgeCount) };
  }, [edgeCount, nodeCount, spread]);

  const nodesGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(nodes, 3));
    return geometry;
  }, [nodes]);

  const edgesGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(edges, 3));
    return geometry;
  }, [edges]);

  useFrame(({ clock, pointer }) => {
    if (!rootRef.current) return;
    const time = clock.getElapsedTime();
    rootRef.current.rotation.y = time * drift + pointer.x * 0.2;
    rootRef.current.rotation.x = Math.sin(time * 0.35) * 0.08 + pointer.y * 0.12;
  });

  return (
    <group ref={rootRef}>
      <points geometry={nodesGeometry}>
        <pointsMaterial color="#A78BFA" size={0.055} sizeAttenuation transparent opacity={0.9} />
      </points>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#8B5CF6" transparent opacity={0.22} />
      </lineSegments>
    </group>
  );
};

export const NodeFieldBackdrop = ({ variant, className }: NodeFieldBackdropProps) => {
  const reduce = useReducedMotion();
  const isMobile = useMobileMode();
  const canvasReady =
    typeof window !== "undefined" && typeof ResizeObserver !== "undefined";

  const config = useMemo(() => {
    if (variant === "hero") {
      return isMobile
        ? { nodeCount: 34, edgeCount: 58, spread: 6.3, drift: 0.12 }
        : { nodeCount: 88, edgeCount: 220, spread: 8.4, drift: 0.2 };
    }

    return isMobile
      ? { nodeCount: 28, edgeCount: 44, spread: 5.8, drift: 0.1 }
      : { nodeCount: 64, edgeCount: 156, spread: 7.4, drift: 0.17 };
  }, [isMobile, variant]);

  if (reduce || !canvasReady) {
    return <div className={`nodefield-fallback ${className ?? ""}`.trim()} aria-hidden="true" />;
  }

  return (
    <div className={`nodefield-canvas ${className ?? ""}`.trim()} aria-hidden="true">
      <Canvas
        dpr={isMobile ? [1, 1.2] : [1, 1.55]}
        camera={{ position: [0, 0, 7.2], fov: variant === "hero" ? 54 : 48 }}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight intensity={0.9} color="#A78BFA" position={[2.5, 3, 2.2]} />
        <NodeField {...config} />
      </Canvas>
    </div>
  );
};
