import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Intake & Scope",
    desc: "We map the processing activities, data flows, and ownership structure to determine the scope of the DTIA.",
    Graphic: () => (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
        <g className="spin-slow origin-center">
          <circle cx="100" cy="100" r="60" fill="none" stroke="#874641" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.2" />
          <rect x="85" y="85" width="30" height="30" fill="none" stroke="#874641" strokeWidth="2" transform="rotate(45 100 100)" />
        </g>
      </svg>
    )
  },
  {
    num: "02",
    title: "Country & Risk Analysis",
    desc: "We analyze the legal framework of the country and the specific processing to ensure an equivalent level of protection.",
    Graphic: () => (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
        <defs>
          <linearGradient id="laserGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#874641" stopOpacity="0"/>
            <stop offset="50%" stopColor="#874641" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#874641" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#ffffff" fillOpacity="0.1"/>
        </pattern>
        <rect width="200" height="200" fill="url(#grid)" />
        <rect className="laser-beam" x="0" y="-10" width="200" height="40" fill="url(#laserGrad)" />
        <line className="laser-line" x1="0" x2="200" y1="10" y2="10" stroke="#874641" strokeWidth="2" />
      </svg>
    )
  },
  {
    num: "03",
    title: "Delivery & Review",
    desc: "A structured, audit-proof DTIA report with clear conclusions, recommendations, and a reassessment structure.",
    Graphic: () => (
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
        <path
          className="waveform"
          d="M0,100 L40,100 L50,60 L60,140 L70,80 L80,110 L90,95 L100,100 L200,100"
          fill="none"
          stroke="#874641"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="200"
          strokeDashoffset="200"
        />
        <circle cx="100" cy="100" r="6" fill="#874641" className="pulse-dot" />
      </svg>
    )
  }
];

export default function Protocol() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.laser-beam', { y: 220, duration: 2, repeat: -1, ease: 'linear' });
      gsap.to('.laser-line', { y: 220, duration: 2, repeat: -1, ease: 'linear' });

      gsap.to('.waveform', { strokeDashoffset: 0, duration: 2, repeat: -1, ease: 'power2.inOut' });
      gsap.to('.pulse-dot', { opacity: 0, scale: 2, duration: 1, repeat: -1, ease: 'power2.out', transformOrigin: 'center' });

      const cards = gsap.utils.toArray('.protocol-card');

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: '.protocol-wrapper',
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            animation: gsap.to(card, {
              scale: 0.9,
              opacity: 0.5,
              filter: 'blur(10px)',
              duration: 1,
              ease: "none"
            }),
            scrub: true,
          });
        } else {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: "+=50%",
            pin: true,
          });
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="protocol"
      className="protocol-wrapper relative w-full bg-background"
    >
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="protocol-card h-screen w-full flex items-center justify-center sticky top-0 bg-background"
          style={{ zIndex: idx }}
        >
          <div className="w-full max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div className="order-2 md:order-1 flex flex-col items-start pr-0 md:pr-12">
              <span className="font-mono text-xl text-accent mb-6 border-b border-surfaceHighlight pb-2 uppercase tracking-widest">
                Phase {step.num}
              </span>
              <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-text leading-tight mb-6">
                {step.title}
              </h2>
              <p className="font-sans text-lg text-text/70 leading-relaxed font-light">
                {step.desc}
              </p>
            </div>

            <div className="order-1 md:order-2 aspect-square relative w-full max-w-md mx-auto bg-surface/50 border border-surfaceHighlight rounded-full flex items-center justify-center p-12 overflow-hidden shadow-2xl">
              <step.Graphic />
              <div className="absolute inset-0 rounded-full border border-surfaceHighlight/30 m-4 pointer-events-none"></div>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
}
