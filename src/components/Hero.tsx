import { motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Profile } from "../types/content";

type HeroProps = {
  profile: Profile;
};

const PROCESSES = [
  { name: "lucky",         type: "SaaS · Discord",    stack: "TS · Node · Prisma", state: "LIVE",   url: "https://lucky.lucassantana.tech" },
  { name: "forgekit",      type: "DX · AI Toolkit",   stack: "TS · AI · MCP",      state: "ACTIVE", url: null },
  { name: "evidence-rag",  type: "AI · RAG Pipeline", stack: "Python · LangChain", state: "DEV",    url: null },
  { name: "portfolio",     type: "Personal Site",      stack: "React · GSAP · R3F", state: "LIVE",   url: "https://lucassantana.tech" },
] as const;

type ProcessState = (typeof PROCESSES)[number]["state"];

const stateClass: Record<ProcessState, string> = {
  LIVE:   "term-state-live",
  ACTIVE: "term-state-active",
  DEV:    "term-state-dev",
};

const stateIcon: Record<ProcessState, string> = {
  LIVE:   "●",
  ACTIVE: "●",
  DEV:    "○",
};

const useClock = () => {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Sao_Paulo",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Sao_Paulo",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const CMD = "status --verbose";

const fade = (delay: number) =>
  ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.45, delay, ease: "easeOut" as const },
  }) as const;

export const Hero = ({ profile }: HeroProps) => {
  const reduced = useReducedMotion();
  const isTestEnv = import.meta.env.MODE === "test" || import.meta.env.VITEST === true;
  const cmdRef = useRef<HTMLSpanElement>(null);
  const [cmdDone, setCmdDone] = useState(reduced || isTestEnv);
  const time = useClock();

  useLayoutEffect(() => {
    if (reduced || isTestEnv || !cmdRef.current) return;
    let i = 0;
    const el = cmdRef.current;
    el.textContent = "";
    const id = setInterval(() => {
      el.textContent = CMD.slice(0, i + 1);
      i++;
      if (i >= CMD.length) {
        clearInterval(id);
        setCmdDone(true);
      }
    }, 48);
    return () => clearInterval(id);
  }, [reduced, isTestEnv]);

  return (
    <header className="hero" id="top">
      <motion.div
        className="term-win"
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" as const }}
      >
        {/* Chrome header */}
        <div className="term-chrome">
          <div className="term-dots">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
          </div>
          <span className="term-win-title">lucas@portfolio — zsh</span>
          <span className="term-clock" aria-label="Current time in Brazil">
            {time} UTC-3
          </span>
        </div>

        {/* Body */}
        <div className="term-body">
          {/* Command prompt */}
          <div className="term-line">
            <span className="term-prompt-user">lucas</span>
            <span className="term-prompt-at">@</span>
            <span className="term-prompt-host">prod</span>
            <span className="term-prompt-sep">:</span>
            <span className="term-prompt-path">~</span>
            <span className="term-prompt-dollar">$</span>
            <span ref={cmdRef} className="term-prompt-cmd" aria-label={`Command: ${CMD}`}>
              {(reduced || isTestEnv) ? CMD : ""}
            </span>
          </div>

          {/* Output */}
          {cmdDone ? (
            <>
              {/* Identity block */}
              <motion.div className="term-output" {...fade(0.05)}>
                <p className="term-comment">
                  # Senior Full-Stack Engineer · Platform Architecture · AI Native
                </p>
                <div className="term-kv-block">
                  <div className="term-kv">
                    <span className="term-key">NAME</span>
                    <span className="term-val">Lucas Santana</span>
                  </div>
                  <div className="term-kv">
                    <span className="term-key">LOCATION</span>
                    <span className="term-val">Brazil (UTC-3) → Remote</span>
                  </div>
                  <div className="term-kv">
                    <span className="term-key">STACK</span>
                    <span className="term-val">Node.js · TypeScript · React · AWS</span>
                  </div>
                  <div className="term-kv">
                    <span className="term-key">FOCUS</span>
                    <span className="term-val">Platform Architecture · AI Native</span>
                  </div>
                  <div className="term-kv">
                    <span className="term-key">STATUS</span>
                    <span className="term-val term-val-green">● Open to senior IC / Staff roles</span>
                  </div>
                </div>
              </motion.div>

              {/* Process table */}
              <motion.div className="term-output" {...fade(0.18)}>
                <p className="term-comment"># Active systems</p>
                <div className="term-table-head">
                  <span>PROCESS</span>
                  <span>TYPE</span>
                  <span>STACK</span>
                  <span>STATE</span>
                </div>
                <div className="term-divider" aria-hidden="true">
                  {"─".repeat(64)}
                </div>
                {PROCESSES.map((proc) => (
                  <div key={proc.name} className="term-table-row">
                    <span className="term-proc-name">{proc.name}</span>
                    <span className="term-proc-type">{proc.type}</span>
                    <span className="term-proc-stack">{proc.stack}</span>
                    <span className={stateClass[proc.state]}>
                      {stateIcon[proc.state]} {proc.state}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div {...fade(0.32)}>
                <div className="term-actions">
                  <a className="term-action-link" href="#projects">
                    &gt; view --projects
                  </a>
                  <a
                    className="term-action-link"
                    href={profile.discord}
                    target="_blank"
                    rel="noreferrer"
                  >
                    &gt; join --discord
                  </a>
                  <a
                    className="term-action-link term-action-link-live"
                    href="/CV_LucasSantana_Dev(EN).pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    &gt; download --resume
                  </a>
                </div>
              </motion.div>

              {/* New prompt with cursor */}
              <motion.div className="term-line" style={{ marginTop: "1rem", marginBottom: 0 }} {...fade(0.42)}>
                <span className="term-prompt-user">lucas</span>
                <span className="term-prompt-at">@</span>
                <span className="term-prompt-host">prod</span>
                <span className="term-prompt-sep">:</span>
                <span className="term-prompt-path">~</span>
                <span className="term-prompt-dollar">$</span>
                <span className="term-cursor" aria-hidden="true" />
              </motion.div>
            </>
          ) : (
            <span className="term-cursor" aria-hidden="true" />
          )}
        </div>
      </motion.div>
    </header>
  );
};
