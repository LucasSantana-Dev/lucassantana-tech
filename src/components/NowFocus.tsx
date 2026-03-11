import { motion } from "motion/react";
import { useState } from "react";
import { getActionVisual, getNowTitleLogo } from "../lib/brandAssets";
import type { NowItem } from "../types/content";
import { Reveal } from "./Reveal";

type NowFocusProps = {
  items: NowItem[];
};

export const NowFocus = ({ items }: NowFocusProps) => {
  const [failedTitleLogos, setFailedTitleLogos] = useState<Record<string, boolean>>({});

  return (
    <section className="section" id="now" aria-labelledby="now-title">
      <Reveal>
        <p className="section-tag">Now</p>
        <h2 id="now-title">What I am building right now</h2>
      </Reveal>
      <div className="now-grid">
        {items.map((item, index) => {
          const titleLogo = getNowTitleLogo(item.title);

          return (
            <Reveal
              key={item.title}
              axis="x"
              distance={index % 2 === 0 ? -20 : 20}
              delay={index * 0.04}
            >
              <motion.article className="now-card glass-card" whileHover={{ y: -4 }}>
                <header>
                  <div className="now-title-wrap">
                    {titleLogo && !failedTitleLogos[item.title] ? (
                      <img
                        className={`now-title-logo${
                          item.title.toLowerCase().includes("lucky") ? " now-title-logo-square" : ""
                        }`}
                        src={titleLogo.src}
                        alt={titleLogo.alt}
                        width={titleLogo.width}
                        height={titleLogo.height}
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                          if (
                            titleLogo.fallbackSrc &&
                            event.currentTarget.currentSrc !== titleLogo.fallbackSrc
                          ) {
                            event.currentTarget.src = titleLogo.fallbackSrc;
                            return;
                          }

                          setFailedTitleLogos((current) => ({ ...current, [item.title]: true }));
                        }}
                      />
                    ) : null}
                    <h3>{item.title}</h3>
                  </div>
                  <span className="now-status">{item.status}</span>
                </header>
                <p>{item.summary}</p>
                <div className="now-links">
                  {item.links.map((link) => {
                    const actionVisual = getActionVisual(link.label, link.url);

                    return (
                      <a
                        key={link.label + link.url}
                        className="ui-action ui-action-chip ui-action-secondary"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <actionVisual.Icon
                          className="ui-action-symbol"
                          aria-hidden="true"
                          color={actionVisual.color}
                        />
                        <span>{link.label}</span>
                        <span className="ui-action-icon" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    );
                  })}
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
