import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function ShufflerCard() {
  const [countries, setCountries] = useState(["United States", "India", "United Kingdom"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountries((prev) => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 bg-surface rounded-[2rem] border border-surfaceHighlight p-6 shadow-xl overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-4 left-4 font-mono text-xs text-accent">01 // Faster reassessment</div>
      <div className="relative w-full max-w-[200px] h-32 perspective-[1000px]">
        {countries.map((country, idx) => {
          const isTop = idx === 0;
          return (
            <div
              key={country}
              className="absolute inset-0 bg-background border border-surfaceHighlight rounded-xl flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-sans text-sm font-medium"
              style={{
                transform: `translateY(${idx * 15}px) scale(${1 - idx * 0.1})`,
                opacity: 1 - idx * 0.3,
                zIndex: 10 - idx,
                boxShadow: isTop ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none'
              }}
            >
              {country}
            </div>
          );
        })}
      </div>
      <div className="mt-8 text-center px-4 relative z-10 bg-surface/80 backdrop-blur-sm -mx-2 rounded-lg">
        <h3 className="font-sans font-bold text-text mb-1">Country Analyses</h3>
        <p className="font-sans text-xs text-text/60">Direct insight into foreign legislation.</p>
      </div>
    </div>
  );
}

function TypewriterCard() {
  const [text, setText] = useState("");
  const fullText = ">_ Updating risk profile... \n>_ Analyzing Schrems II compliance...\n>_ SCCs insufficient without TBMs.\n>_ Status: Action Required.";

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, currentIdx));
      currentIdx++;
      if (currentIdx > fullText.length) {
        setTimeout(() => { currentIdx = 0; }, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 bg-surface rounded-[2rem] border border-surfaceHighlight p-6 shadow-xl flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <div className="font-mono text-xs text-accent">02 // Supply chain control</div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="font-mono text-[10px] text-text/50 uppercase tracking-widest">Live Feed</span>
        </div>
      </div>

      <div className="flex-1 bg-background rounded-xl border border-surfaceHighlight p-4 font-mono text-xs text-text/80 whitespace-pre-wrap overflow-hidden leading-relaxed">
        {text}<span className="inline-block w-2- h-3 bg-accent animate-pulse ml-1"></span>
      </div>

      <div className="mt-4">
        <h3 className="font-sans font-bold text-text mb-1">Legal Updates</h3>
        <p className="font-sans text-xs text-text/60">Continuous control over privacy risks.</p>
      </div>
    </div>
  );
}

function SchedulerCard() {
  const gridRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      tl.set(cursorRef.current, { x: 0, y: 150, opacity: 0 })
        .to(cursorRef.current, { opacity: 1, duration: 0.3 })
        .to(cursorRef.current, { x: 80, y: 40, duration: 1, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.cell-target', { backgroundColor: '#874641', color: '#ffffff', duration: 0.2 }, "-=0.1")
        .to(cursorRef.current, { x: 180, y: 120, duration: 0.8, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.btn-save', { backgroundColor: '#874641', color: '#ffffff', duration: 0.2 }, "-=0.1")
        .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5 })
        .set('.cell-target', { backgroundColor: 'transparent', color: 'inherit' })
        .set('.btn-save', { backgroundColor: 'var(--tw-colors-background)', color: 'var(--tw-colors-text)' });

    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="relative h-64 bg-surface rounded-[2rem] border border-surfaceHighlight p-6 shadow-xl flex flex-col justify-between overflow-hidden">
      <div className="font-mono text-xs text-accent mb-4">03 // Demonstrably in control</div>

      <div className="relative flex-1 flex flex-col items-center justify-center">
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 w-full px-2">
          {['S','M','T','W','T','F','S'].map((day, i) => (
            <div key={i} className={`h-8 rounded border border-surfaceHighlight flex items-center justify-center font-mono text-[10px] ${i === 3 ? 'cell-target' : ''}`}>
              {day}
            </div>
          ))}
        </div>
        <div className="btn-save w-24 h-6 rounded-full bg-background border border-surfaceHighlight flex items-center justify-center font-sans text-[10px] transition-colors">
          Confirm Audit
        </div>

        {/* Animated Cursor */}
        <div ref={cursorRef} className="absolute top-0 left-0 text-white drop-shadow-lg z-20 pointer-events-none">
          <MousePointer2 size={18} fill="#874641" stroke="white" strokeWidth={2} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-sans font-bold text-text mb-1">Audit-proof Workflow</h3>
        <p className="font-sans text-xs text-text/60">Planned reassessment moments.</p>
      </div>
    </div>
  );
}

export default function Features() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="py-24 px-6 md:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card"><ShufflerCard /></div>
          <div className="feature-card"><TypewriterCard /></div>
          <div className="feature-card"><SchedulerCard /></div>
        </div>
      </div>
    </section>
  );
}
