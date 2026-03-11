import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { getActionVisual } from "../lib/brandAssets";
import { getCoreTechIconMeta } from "../lib/coreTechIcons";
import type { Profile } from "../types/content";

type HeroProps = {
  profile: Profile;
};

const heroMotion = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: "easeOut" as const },
  }),
};

const LazyNodeFieldBackdrop = lazy(async () => {
  const module = await import("./NodeFieldBackdrop");
  return { default: module.NodeFieldBackdrop };
});

export const Hero = ({ profile }: HeroProps) => {
  const isTestEnv = import.meta.env.MODE === "test" || import.meta.env.VITEST === true;
  const canObserve = typeof window !== "undefined" && typeof IntersectionObserver !== "undefined";
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [heroInView, setHeroInView] = useState(() => isTestEnv || !canObserve);
  const [nodeFieldReady, setNodeFieldReady] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.28]);
  const imageY = reduced ? 0 : plateY;
  const showNodeField = !isTestEnv && !reduced && !isMobile;
  const discordVisual = getActionVisual("Discord", profile.discord);

  useEffect(() => {
    if (heroInView || !canObserve) {
      return;
    }

    const target = rootRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHeroInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [canObserve, heroInView]);

  useEffect(() => {
    if (!showNodeField || nodeFieldReady || !heroInView) {
      return;
    }

    const runtime = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof runtime.requestIdleCallback === "function") {
      const idleId = runtime.requestIdleCallback(
        () => {
          setNodeFieldReady(true);
        },
        { timeout: 2000 },
      );

      return () => {
        if (typeof runtime.cancelIdleCallback === "function") {
          runtime.cancelIdleCallback(idleId);
        }
      };
    }

    const timeoutId = window.setTimeout(() => setNodeFieldReady(true), 1200);
    return () => window.clearTimeout(timeoutId);
  }, [heroInView, nodeFieldReady, showNodeField]);

  return (
    <header className="hero" id="top" ref={rootRef}>
      {showNodeField && nodeFieldReady ? (
        <Suspense fallback={<div className="nodefield-fallback hero-nodefield" aria-hidden="true" />}>
          <LazyNodeFieldBackdrop variant="hero" className="hero-nodefield" />
        </Suspense>
      ) : (
        <div className="nodefield-fallback hero-nodefield" aria-hidden="true" />
      )}
      <motion.div initial="hidden" animate={reduced ? undefined : "show"} className="hero-copy">
        <motion.p className="kicker" variants={heroMotion} custom={0.05}>
          Business Card • Senior Full-Stack Engineer • Platform Architecture
        </motion.p>
        <motion.h1 variants={heroMotion} custom={0.1}>
          <span>{profile.name.split(" ")[0]}</span> {profile.name.split(" ").slice(1).join(" ")}
        </motion.h1>
        <motion.h2 variants={heroMotion} custom={0.15}>
          {profile.headlineShort}
        </motion.h2>
        <motion.p className="hero-summary" variants={heroMotion} custom={0.2}>
          {profile.summary}
        </motion.p>
        <motion.div className="hero-actions" variants={heroMotion} custom={0.25}>
          <a
            className="ui-action ui-action-primary"
            href={profile.discord}
            target="_blank"
            rel="noreferrer"
          >
            <discordVisual.Icon
              className="ui-action-symbol"
              aria-hidden="true"
              color={discordVisual.color}
            />
            <span>Join Discord Community</span>
            <span className="ui-action-icon" aria-hidden="true">
              ↗
            </span>
          </a>
          <a className="ui-action ui-action-secondary" href="#projects">
            <span>View relevant projects</span>
            <span className="ui-action-icon" aria-hidden="true">
              →
            </span>
          </a>
          <a
            className="ui-action ui-action-ghost"
            href="/CV_LucasSantana_Dev(EN).pdf"
            target="_blank"
            rel="noreferrer"
          >
            <span>Download resume</span>
            <span className="ui-action-icon" aria-hidden="true">
              ↗
            </span>
          </a>
        </motion.div>
        <motion.ul className="hero-stack" variants={heroMotion} custom={0.3}>
          {profile.stack.map((item) => {
            const iconMeta = getCoreTechIconMeta(item);

            return (
              <li key={item}>
                <iconMeta.Icon aria-hidden="true" color={iconMeta.color} />
                <span>{item}</span>
              </li>
            );
          })}
        </motion.ul>
      </motion.div>
      <motion.figure className="hero-image" style={{ y: imageY }}>
        <motion.div className="hero-glow" style={{ scale: reduced ? 1 : glowScale }} />
        <div className="hero-blob-shell">
          <div className="hero-blob-mask">
            <img
              src={profile.heroImage}
              alt="Lucas Santana portrait"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </motion.figure>
    </header>
  );
};
