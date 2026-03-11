import { Reveal } from "./Reveal";

const signals = [
  "TypeScript",
  "Node.js",
  "React 19",
  "AWS",
  "MCP",
  "Cloud Architecture",
  "Delivery at Scale",
];

export const SignalMarquee = () => {
  const rail = [...signals, ...signals];

  return (
    <section className="signal-strip" aria-label="Core engineering signals">
      <Reveal amount={0.1}>
        <div className="signal-track">
          {rail.map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <em>•</em>
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
};
