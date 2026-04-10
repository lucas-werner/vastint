import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);

  const splitText = (text) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="inline-block overflow-hidden pb-1" style={{ marginRight: '0.4em' }}>
        <span className="inline-block translate-y-full opacity-0 philosophy-word">{word}</span>
      </span>
    ));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.philosophy-bg', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: 100,
        ease: 'none'
      });

      gsap.to('.philosophy-word', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const imageSrc = "https://images.unsplash.com/photo-1541888086225-c89b3f3b97b0?q=80&w=2070&auto=format&fit=crop";

  return (
    <section
      ref={containerRef}
      className="relative w-full py-40 px-6 md:px-16 bg-surface overflow-hidden flex items-center justify-center border-y border-surfaceHighlight"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.05]">
        <div
          className="philosophy-bg absolute -top-[20%] -left-[10%] w-[120%] h-[140%] bg-cover bg-center grayscale mix-blend-screen"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="mb-12 font-sans text-xl md:text-2xl text-text/70 max-w-2xl font-light">
          {splitText("Most organizations see compliance as a paper exercise.")}
        </div>

        <div className="font-drama italic text-5xl md:text-7xl lg:text-8xl text-heading leading-[1.1]">
          {splitText("We build the")}
          <br />
          <span className="text-accent drop-shadow-sm">{splitText("foundation for control.")}</span>
        </div>
      </div>
    </section>
  );
}
