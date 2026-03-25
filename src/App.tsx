import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'One Way Dream',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    tag: 'Game Dev',
    color: '#6366f1',
  },
  {
    title: 'YummyYummyMenu',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    tag: 'Frontend',
    color: '#8b5cf6',
  },
  {
    title: 'Project #3',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    tag: 'Deep Learning',
    color: '#a78bfa',
  },
];

const SKILLS = [
  'TypeScript',
  'React',
  'React Native',
  'Node.js',
  'AWS',
  'Figma',
  'Three.js',
  'GSAP',
  'Tailwind',
  'Machine Learning',
  'Deep Learning',
  'Reinforcement Learning',
];

const STREAKS = [
  [
    '18%',
    '8%',
    1100,
    260,
    -36,
    'rgba(109,40,217,0.95)',
    'rgba(90,20,180,0.0)',
    55,
    1,
  ],
  [
    '6%',
    '22%',
    900,
    190,
    -36,
    'rgba(80,20,160,0.80)',
    'rgba(60,0,140,0.0)',
    48,
    0.85,
  ],
  [
    '28%',
    '-4%',
    980,
    220,
    -36,
    'rgba(139,60,240,0.70)',
    'rgba(100,30,200,0.0)',
    52,
    0.9,
  ],
  [
    '-4%',
    '38%',
    860,
    170,
    -36,
    'rgba(60,10,130,0.75)',
    'rgba(40,0,110,0.0)',
    42,
    0.8,
  ],
  [
    '40%',
    '14%',
    1050,
    200,
    -36,
    'rgba(120,50,230,0.60)',
    'rgba(90,20,190,0.0)',
    60,
    0.7,
  ],
  [
    '12%',
    '52%',
    780,
    160,
    -36,
    'rgba(80,15,150,0.65)',
    'rgba(50,0,120,0.0)',
    44,
    0.75,
  ],
  [
    '55%',
    '5%',
    820,
    150,
    -36,
    'rgba(99,30,200,0.55)',
    'rgba(70,10,160,0.0)',
    50,
    0.65,
  ],
  [
    '32%',
    '40%',
    700,
    140,
    -36,
    'rgba(140,70,250,0.45)',
    'rgba(100,40,200,0.0)',
    46,
    0.55,
  ],
] as const;

function CustomGlow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const streakRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    streakRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        scaleX: 1 + 0.06 * (i % 3),
        scaleY: 1 + 0.04 * (i % 2),
        opacity: `+=${0.08 + (i % 3) * 0.04}`,
        duration: 4.5 + i * 0.9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.55,
      });
    });

    const DEPTHS = [28, -18, 22, -14, 18, -24, 16, -20];
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      streakRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          x: nx * DEPTHS[i],
          y: ny * DEPTHS[i] * 0.5,
          duration: 2.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          mixBlendMode: 'screen',
        }}
      >
        {STREAKS.map(([left, top, w, h, rot, c1, c2, blur, opacity], i) => (
          <div
            key={i}
            ref={(el) => {
              streakRefs.current[i] = el;
            }}
            style={{
              position: 'absolute',
              left,
              top,
              width: w,
              height: h,
              background: `radial-gradient(ellipse at center, ${c1} 0%, ${c2} 70%)`,
              borderRadius: '50%',
              transform: `rotate(${rot}deg)`,
              transformOrigin: 'center center',
              filter: `blur(${blur}px)`,
              opacity,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* Dark center shadow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 55% at 48% 44%, rgba(10,10,15,0.55) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 260,
          background: 'linear-gradient(to bottom, transparent, #0a0a0f)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle dot grid — masked to center */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 44%, black 20%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 44%, black 20%, transparent 100%)',
        }}
      />
    </div>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { opacity: 1, duration: 0.1 });
      gsap.to(dot, { opacity: 1, duration: 0.1 });
      gsap.to(cursor, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(dot, { x: e.clientX - 3, y: e.clientY - 3, duration: 0.1 });
    };
    const hoverIn = () =>
      gsap.to(cursor, { scale: 2.5, opacity: 0.4, duration: 0.3 });
    const hoverOut = () =>
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button, .hoverable').forEach((el) => {
      el.addEventListener('mouseenter', hoverIn);
      el.addEventListener('mouseleave', hoverOut);
    });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    gsap.to(marquee, { xPercent: -50, duration: 18, ease: 'none', repeat: -1 });
  }, []);

  useEffect(() => {
    const phrase = phraseRef.current;
    if (!phrase) return;
    gsap.fromTo(
      phrase.querySelectorAll('.phrase-word'),
      { y: 80, opacity: 0, rotateX: -40 },
      {
        scrollTrigger: { trigger: phrase, start: 'top 75%' },
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power4.out',
      }
    );
    gsap.fromTo(
      phrase,
      { scale: 0.95 },
      {
        scrollTrigger: { trigger: phrase, start: 'top 80%' },
        scale: 1,
        duration: 1.4,
        ease: 'power3.out',
      }
    );
  }, []);

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.section-title', {
        scrollTrigger: { trigger: '.section-title', start: 'top 80%' },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.project-card', {
        scrollTrigger: { trigger: '.project-card', start: 'top 85%' },
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });
      gsap.from('.skill-chip', {
        scrollTrigger: { trigger: '.skill-chip', start: 'top 85%' },
        scale: 0.7,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.hero-word',
      { y: 120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.5,
      }
    );
    gsap.fromTo(
      '.hero-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: 'power3.out' }
    );
    gsap.fromTo(
      '.hero-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 1.4, ease: 'power3.out' }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        background: '#0a0a0f',
        color: '#e2e8f0',
        fontFamily: "'Inter', sans-serif",
        minHeight: '100vh',
        overflowX: 'hidden',
        cursor: 'none',
      }}
    >
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: 32,
          height: 32,
          border: '1.5px solid rgba(139,92,246,0.8)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          top: 0,
          left: 0,
          mixBlendMode: 'difference',
          opacity: 0,
        }}
      />
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          width: 6,
          height: 6,
          background: '#a78bfa',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          top: 0,
          left: 0,
          opacity: 0,
        }}
      />

      {/* Noise overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Ambient glow blobs */}
      <div
        style={{
          position: 'fixed',
          top: '10%',
          left: '15%',
          width: 400,
          height: 400,
          background:
            'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '20%',
          right: '10%',
          width: 350,
          height: 350,
          background:
            'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(40px)',
        }}
      />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* DOT GRID*/}
        <motion.section
          id="home"
          style={{
            opacity: heroOpacity,
            y: heroY,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <CustomGlow />

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 220,
              background: 'linear-gradient(to bottom, transparent, #0a0a0f)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 48px',
              paddingTop: 100,
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            <p
              className="hero-word"
              style={{
                color: '#a78bfa',
                fontSize: 14,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: 16,
                opacity: 0,
              }}
            >
              Available for work
            </p>
            <h1
              className="hero-word"
              style={{
                fontSize: 'clamp(48px, 8vw, 96px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-2px',
                margin: 0,
                opacity: 0,
              }}
            >
              Samy
            </h1>
            <h1
              className="hero-word"
              style={{
                fontSize: 'clamp(48px, 8vw, 96px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-2px',
                margin: 0,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(167,139,250,0.5)',
                opacity: 0,
              }}
            >
              Frontend Dev &amp; AI Enthusiast
            </h1>
            <p
              className="hero-sub"
              style={{
                marginTop: 32,
                fontSize: 18,
                color: '#64748b',
                maxWidth: 520,
                lineHeight: 1.7,
                opacity: 0,
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </motion.section>

        {/* "HOW FAR WILL YOU GO?"*/}
        <section
          style={{
            padding: '140px 48px',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            ref={phraseRef}
            style={{ maxWidth: 1100, margin: '0 auto', perspective: '800px' }}
          >
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              {'How far'.split(' ').map((word, i) => (
                <span
                  key={i}
                  className="phrase-word"
                  style={{
                    display: 'inline-block',
                    fontSize: 'clamp(52px, 10vw, 130px)',
                    fontWeight: 900,
                    letterSpacing: '-3px',
                    lineHeight: 1,
                    marginRight: '0.25em',
                    color: '#e2e8f0',
                    opacity: 0,
                  }}
                >
                  {word}
                </span>
              ))}
              {'will you'.split(' ').map((word, i) => (
                <span
                  key={i + 10}
                  className="phrase-word"
                  style={{
                    display: 'inline-block',
                    fontSize: 'clamp(52px, 10vw, 130px)',
                    fontWeight: 900,
                    letterSpacing: '-3px',
                    lineHeight: 1,
                    marginRight: '0.25em',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(167,139,250,0.6)',
                    opacity: 0,
                  }}
                >
                  {word}
                </span>
              ))}
              <span
                className="phrase-word"
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(52px, 10vw, 130px)',
                  fontWeight: 900,
                  letterSpacing: '-3px',
                  lineHeight: 1,
                  background:
                    'linear-gradient(135deg, #6366f1, #a78bfa, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  opacity: 0,
                }}
              >
                go?
              </span>
            </div>
            <p
              className="phrase-word"
              style={{
                marginTop: 32,
                fontSize: 16,
                color: '#475569',
                maxWidth: 480,
                lineHeight: 1.8,
                opacity: 0,
              }}
            >
              In love of pushing boundaries with every project.
            </p>
          </div>
          <div
            style={{
              marginTop: 80,
              overflow: 'hidden',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              padding: '16px 0',
            }}
          >
            <div
              ref={marqueeRef}
              style={{
                display: 'flex',
                gap: 48,
                whiteSpace: 'nowrap',
                width: 'max-content',
              }}
            >
              {[...Array(2)].map((_, dupIdx) => (
                <div key={dupIdx} style={{ display: 'flex', gap: 48 }}>
                  {[
                    'React',
                    '✦',
                    'TypeScript',
                    '✦',
                    'GSAP',
                    '✦',
                    'Motion Design',
                    '✦',
                    'Three.js',
                    '✦',
                    'Node.js',
                    '✦',
                    'Tailwind CSS',
                    '✦',
                    'Next.js',
                    '✦',
                    'ML/AI',
                    '✦',
                    'DL/RL',
                    '✦',
                    'UI/UX',
                    '✦',
                    'Framer Motion',
                    '✦',
                  ].map((item, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 13,
                        fontWeight: item === '✦' ? 400 : 600,
                        color: item === '✦' ? '#6366f1' : '#334155',
                        letterSpacing: item === '✦' ? 0 : '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="work"
          ref={gridRef}
          style={{ padding: '120px 48px', maxWidth: 1100, margin: '0 auto' }}
        >
          <p
            className="section-title"
            style={{
              color: '#a78bfa',
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Selected Work
          </p>
          <h2
            className="section-title"
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800,
              margin: '0 0 60px',
              letterSpacing: '-1px',
            }}
          >
            Projects
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="project-card hoverable"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12,
                  padding: 28,
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color 0.3s, transform 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    `${p.color}66`;
                  (e.currentTarget as HTMLDivElement).style.transform =
                    'translateY(-6px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLDivElement).style.transform =
                    'translateY(0)';
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    background: `${p.color}22`,
                    border: `1px solid ${p.color}44`,
                    borderRadius: 4,
                    fontSize: 12,
                    color: p.color,
                    marginBottom: 16,
                  }}
                >
                  {p.tag}
                </div>
                <h3
                  style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px' }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: '#64748b',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    marginTop: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: p.color,
                    fontSize: 13,
                  }}
                >
                  View Project <span style={{ fontSize: 16 }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          style={{
            padding: '80px 48px 120px',
            maxWidth: 1100,
            margin: '0 auto',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <p
            className="section-title"
            style={{
              color: '#a78bfa',
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Expertise
          </p>
          <h2
            className="section-title"
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800,
              margin: '0 0 48px',
              letterSpacing: '-1px',
            }}
          >
            Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="skill-chip hoverable"
                style={{
                  padding: '8px 18px',
                  background: 'rgba(99,102,241,0.08)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  borderRadius: 100,
                  fontSize: 14,
                  color: '#c4b5fd',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.background =
                    'rgba(99,102,241,0.2)';
                  (e.currentTarget as HTMLSpanElement).style.borderColor =
                    'rgba(99,102,241,0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.background =
                    'rgba(99,102,241,0.08)';
                  (e.currentTarget as HTMLSpanElement).style.borderColor =
                    'rgba(99,102,241,0.2)';
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* CONTACT*/}
        <section
          id="contact"
          style={{
            padding: '120px 48px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'center',
          }}
        >
          <p
            className="section-title"
            style={{
              color: '#a78bfa',
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Contact
          </p>
          <h2
            className="section-title"
            style={{
              fontSize: 'clamp(32px, 6vw, 64px)',
              fontWeight: 800,
              margin: '0 0 16px',
              letterSpacing: '-1.5px',
            }}
          >
            Let's work together
          </h2>
          <p style={{ color: '#64748b', fontSize: 18, marginBottom: 40 }}>
            Open for freelance and full-time opportunities.
          </p>
          <a
            href="mailto:hello@magnetarstar.dev"
            className="hoverable"
            style={{
              display: 'inline-block',
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.4)',
              color: '#a78bfa',
              padding: '14px 36px',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'rgba(99,102,241,0.3)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'rgba(99,102,241,0.15)')
            }
          >
            samy.ba.mail@proton.me
          </a>
        </section>
      </main>

      {/*FOOTER*/}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '24px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#334155',
          fontSize: 13,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span>© {new Date().getFullYear()} Samy Bacha Aka magnetarstar </span>
        <span>Built with React + GSAP + Framer Motion</span>
      </footer>
    </div>
  );
}
