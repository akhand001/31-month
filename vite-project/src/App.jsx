import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Heart, Star, Music, Sparkles, Moon, Sun, Zap, Gift, Coffee,
  MapPin, Play, Pause, SkipForward, Volume2, Headphones,
  Camera, Flame, Feather, Rainbow, Wind, Leaf, Snowflake,
  MessageCircle, Clock, Navigation, Telescope, Infinity
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES & KEYFRAMES
───────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Syne:wght@400;600;700;800&family=Space+Mono:ital@0;1&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --pink:   #ff6b9d;
      --rose:   #ff3d7f;
      --purple: #b44fff;
      --violet: #7b2fff;
      --blue:   #4fc3f7;
      --cyan:   #00e5ff;
      --gold:   #ffd700;
      --glass:  rgba(255,255,255,0.04);
      --glass2: rgba(255,255,255,0.08);
      --border: rgba(255,255,255,0.10);
      --shadow: rgba(180,79,255,0.25);
      --glow-pink: 0 0 30px rgba(255,107,157,0.4);
      --glow-purple: 0 0 30px rgba(180,79,255,0.4);
    }

    body {
      background: #020008;
      color: #f0e6ff;
      font-family: 'Syne', sans-serif;
      overflow-x: hidden;
      cursor: none;
    }

    /* ── PARALLEL UNIVERSE OVERRIDES ── */
    body.parallel * {
      filter: grayscale(1) !important;
      animation-duration: 8s !important;
      transition-duration: 2s !important;
    }
    body.parallel .universe-text { opacity: 1 !important; }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #020008; }
    ::-webkit-scrollbar-thumb { background: var(--purple); border-radius: 2px; }

    /* ── CURSOR ── */
    .cursor-dot {
      width: 8px; height: 8px;
      background: var(--pink);
      border-radius: 50%;
      position: fixed; top: 0; left: 0;
      pointer-events: none; z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, background 0.2s;
      box-shadow: 0 0 10px var(--pink), 0 0 20px var(--pink);
    }
    .cursor-ring {
      width: 36px; height: 36px;
      border: 1.5px solid rgba(255,107,157,0.6);
      border-radius: 50%;
      position: fixed; top: 0; left: 0;
      pointer-events: none; z-index: 9998;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s, border-color 0.3s;
    }
    .cursor-ring.hovered {
      width: 60px; height: 60px;
      border-color: var(--purple);
      background: rgba(180,79,255,0.08);
    }
    .cursor-trail {
      width: 6px; height: 6px;
      border-radius: 50%;
      position: fixed;
      pointer-events: none; z-index: 9997;
      transform: translate(-50%, -50%);
    }

    /* ── KEYFRAMES ── */
    @keyframes float {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      33%      { transform: translateY(-18px) rotate(2deg); }
      66%      { transform: translateY(-8px) rotate(-1deg); }
    }
    @keyframes float2 {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      50%      { transform: translateY(-24px) rotate(-3deg); }
    }
    @keyframes pulseGlow {
      0%,100% { box-shadow: 0 0 20px rgba(255,107,157,0.4), 0 0 40px rgba(255,107,157,0.2); }
      50%      { box-shadow: 0 0 40px rgba(255,107,157,0.8), 0 0 80px rgba(255,107,157,0.4), 0 0 120px rgba(180,79,255,0.2); }
    }
    @keyframes heartbeat {
      0%,100% { transform: scale(1); }
      14%     { transform: scale(1.2); }
      28%     { transform: scale(1); }
      42%     { transform: scale(1.15); }
      70%     { transform: scale(1); }
    }
    @keyframes spinRecord {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-40px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.6); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes rippleOut {
      0%   { transform: scale(0); opacity: 0.8; }
      100% { transform: scale(4); opacity: 0; }
    }
    @keyframes tonearmSwing {
      0%   { transform: rotate(-25deg); }
      100% { transform: rotate(-8deg); }
    }
    @keyframes tonearmLift {
      0%   { transform: rotate(-8deg); }
      100% { transform: rotate(-25deg); }
    }
    @keyframes gradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes orbitStar {
      0%   { transform: rotate(0deg) translateX(120px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
    }
    @keyframes cineFadeIn {
      from { opacity: 0; transform: translateY(60px) scale(0.95); filter: blur(12px); }
      to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    }
    @keyframes cineGlow {
      0%,100% { text-shadow: 0 0 20px var(--pink), 0 0 40px var(--purple); }
      50%      { text-shadow: 0 0 60px var(--pink), 0 0 120px var(--purple), 0 0 200px var(--blue); }
    }
    @keyframes toastIn {
      from { opacity: 0; transform: translateX(120px) scale(0.8); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes toastOut {
      from { opacity: 1; transform: translateX(0) scale(1); }
      to   { opacity: 0; transform: translateX(120px) scale(0.8); }
    }
    @keyframes energyFill {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes starTwinkle {
      0%,100% { opacity: 0.2; transform: scale(0.8); }
      50%     { opacity: 1; transform: scale(1.2); }
    }
    @keyframes auraPulse {
      0%,100% { opacity: 0.3; transform: scale(1); }
      50%     { opacity: 0.6; transform: scale(1.05); }
    }
    @keyframes cardFloat3D {
      0%,100% { transform: perspective(1200px) rotateY(0deg) translateY(0px); }
      50%     { transform: perspective(1200px) rotateY(2deg) translateY(-8px); }
    }
    @keyframes infiniteScroll {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes blinkCursor {
      0%,100% { opacity: 1; }
      50%     { opacity: 0; }
    }

    /* ── UTILITY CLASSES ── */
    .font-garamond { font-family: 'Cormorant Garamond', serif; }
    .font-mono     { font-family: 'Space Mono', monospace; }
    .font-syne     { font-family: 'Syne', sans-serif; }

    .glass {
      background: var(--glass);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid var(--border);
    }
    .glass2 {
      background: var(--glass2);
      backdrop-filter: blur(30px) saturate(200%);
      -webkit-backdrop-filter: blur(30px) saturate(200%);
      border: 1px solid rgba(255,255,255,0.15);
    }

    .shimmer-text {
      background: linear-gradient(90deg, var(--pink), var(--purple), var(--blue), var(--pink));
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.5rem, 6vw, 5rem);
      font-weight: 300;
      font-style: italic;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .hover-lift {
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
    }
    .hover-lift:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 20px 60px rgba(180,79,255,0.3);
    }

    .timeline-card {
      transition: transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s ease, opacity 0.5s ease;
      transform-style: preserve-3d;
      will-change: transform;
    }
    .timeline-card:hover {
      z-index: 10;
      box-shadow: 0 30px 80px rgba(180,79,255,0.4), 0 0 0 1px rgba(255,107,157,0.3);
    }

    .vinyl-groove {
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.04);
    }

    .energy-bar-fill {
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--violet), var(--purple), var(--pink), var(--rose));
      background-size: 200% 100%;
      animation: gradientShift 2s ease infinite;
      transition: width 0.8s cubic-bezier(0.34,1.56,0.64,1);
      position: relative;
      overflow: hidden;
    }
    .energy-bar-fill::after {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
      animation: shimmer 1.5s linear infinite;
    }

    .mood-btn {
      transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
      position: relative; overflow: hidden;
    }
    .mood-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%);
      opacity: 0; transition: opacity 0.3s;
    }
    .mood-btn:hover::before { opacity: 1; }
    .mood-btn.active {
      transform: scale(1.1);
      box-shadow: 0 0 20px currentColor;
    }

    .easter-egg {
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease;
    }
    .easter-egg:hover {
      transform: scale(1.4) rotate(10deg);
      filter: brightness(1.5);
    }

    /* ── CINEMATIC ENDING ── */
    .cine-overlay {
      position: fixed; inset: 0;
      background: #000;
      z-index: 9000;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      overflow: hidden;
    }
    .cine-stars {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 20% 50%, rgba(180,79,255,0.15) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 20%, rgba(255,107,157,0.1) 0%, transparent 40%);
    }
    .cine-line {
      opacity: 0;
      animation: cineFadeIn 1.2s cubic-bezier(0.23,1,0.32,1) forwards;
    }

    /* ── UNIVERSE TOGGLE ── */
    .universe-text {
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Space Mono', monospace;
      font-size: clamp(1rem, 3vw, 2rem);
      color: #333;
      text-align: center;
      z-index: 100;
      pointer-events: none;
      opacity: 0;
      transition: opacity 2s ease;
      letter-spacing: 0.2em;
    }

    /* ── TOAST ── */
    .toast-enter { animation: toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
    .toast-exit  { animation: toastOut 0.3s ease forwards; }

    /* ── SCROLLBAR HIDE ── */
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────
   TIMELINE DATA — 31 COMPLETE MILESTONES
───────────────────────────────────────────────────────────── */
const TIMELINE_DATA = [
  { month: 1, date: "Aug 2023", title: "You", icon: "✨", color: "#ff6b9d",
    text: "Meri jaan, you are the most beautiful part of my life. Just having you makes everything feel right." },

  { month: 2, date: "Sep 2023", title: "Your Presence", icon: "🌙", color: "#b44fff",
    text: "My love, your presence itself brings peace to me. You don’t even try, but you heal me." },

  { month: 3, date: "Oct 2023", title: "Your Smile", icon: "😊", color: "#7b2fff",
    text: "Meri kareja, your smile is my favorite thing in this world. It makes everything better." },

  { month: 4, date: "Nov 2023", title: "Your Love", icon: "💬", color: "#ff3d7f",
    text: "Meri jaan, the way you love me is something I never knew I needed. It feels so pure." },

  { month: 5, date: "Dec 2023", title: "Your Warmth", icon: "❄️", color: "#4fc3f7",
    text: "Meri patni, your warmth feels like home. No matter what happens, you are my comfort." },

  { month: 6, date: "Jan 2024", title: "Your Heart", icon: "🎆", color: "#ffd700",
    text: "My love, your heart is so soft and beautiful. I feel lucky to be loved by you." },

  { month: 7, date: "Feb 2024", title: "Your Care", icon: "💝", color: "#ff6b9d",
    text: "Meri sugga, the way you care for me is something I can never explain in words." },

  { month: 8, date: "Mar 2024", title: "Your Strength", icon: "🌧️", color: "#7b2fff",
    text: "Meri jaan, you are stronger than you think. And I admire you for that every day." },

  { month: 9, date: "Apr 2024", title: "Your Presence", icon: "🌸", color: "#ff6b9d",
    text: "Meri kareja, even your silence feels comforting. Just you being there is enough." },

  { month: 10, date: "May 2024", title: "Your Understanding", icon: "🎵", color: "#b44fff",
    text: "My love, you understand me without me saying anything. That means everything to me." },

  { month: 11, date: "Jun 2024", title: "Your Energy", icon: "🚗", color: "#00e5ff",
    text: "Meri sugga, your energy brings life into my world. You make everything brighter." },

  { month: 12, date: "Jul 2024", title: "Your Importance", icon: "🎂", color: "#ffd700",
    text: "Meri patni, you are not just important… you are everything to me." },

  { month: 13, date: "Aug 2024", title: "Your Soul", icon: "🌿", color: "#4fc3f7",
    text: "Meri jaan, your soul is so pure. Being with you feels peaceful." },

  { month: 14, date: "Sep 2024", title: "Your Nature", icon: "🏠", color: "#ff3d7f",
    text: "Meri sugga, your nature is so beautiful. You make everyone feel loved." },

  { month: 15, date: "Oct 2024", title: "Your Beauty", icon: "🔭", color: "#b44fff",
    text: "Meri kareja, you are beautiful in every way, inside and outside." },

  { month: 16, date: "Nov 2024", title: "Your Support", icon: "🫂", color: "#7b2fff",
    text: "Meri jaan, you always support me, even when I don’t deserve it." },

  { month: 17, date: "Dec 2024", title: "Your Vibe", icon: "👨‍🍳", color: "#ffd700",
    text: "Meri sugga, your vibe is my favorite place to be." },

  { month: 18, date: "Jan 2025", title: "Your Promises", icon: "📝", color: "#ff6b9d",
    text: "Meri jaan, I trust you more than anything. Your words mean everything to me." },

  { month: 19, date: "Feb 2025", title: "Your Words", icon: "💌", color: "#b44fff",
    text: "Meri kareja, every word you say touches my heart deeply." },

  { month: 20, date: "Mar 2025", title: "Your Growth", icon: "🌱", color: "#4fc3f7",
    text: "Meri jaan, seeing you grow makes me proud every single day." },

  { month: 21, date: "Apr 2025", title: "Your Magic", icon: "🎤", color: "#ff3d7f",
    text: "Meri sugga, there is something magical about you that I can’t explain." },

  { month: 22, date: "May 2025", title: "Your Efforts", icon: "📷", color: "#b44fff",
    text: "Meri jaan, I see your efforts, and I value them more than you know." },

  { month: 23, date: "Jun 2025", title: "Your Depth", icon: "📖", color: "#7b2fff",
    text: "Meri kareja, you are deeper than anyone I’ve ever known." },

  { month: 24, date: "Jul 2025", title: "Your Love Again", icon: "🥂", color: "#ffd700",
    text: "Meri patni, loving you feels new every single day." },

  { month: 25, date: "Aug 2025", title: "Your Calmness", icon: "🌧️", color: "#4fc3f7",
    text: "Meri jaan, you bring calmness into my chaos." },

  { month: 26, date: "Sep 2025", title: "Your Value", icon: "💔", color: "#ff3d7f",
    text: "Meri sugga, I can never lose you… you are too precious to me." },

  { month: 27, date: "Oct 2025", title: "Your Presence Again", icon: "🕯️", color: "#b44fff",
    text: "Meri jaan, your presence alone makes my life better." },

  { month: 28, date: "Nov 2025", title: "Your Dreams", icon: "🌠", color: "#7b2fff",
    text: "Meri kareja, I believe in your dreams and in you." },

  { month: 29, date: "Dec 2025", title: "Your Magic Again", icon: "🧣", color: "#ff6b9d",
    text: "Meri jaan, nothing about you ever feels ordinary. You are special." },

  { month: 30, date: "Jan 2026", title: "Your Impact", icon: "📬", color: "#00e5ff",
    text: "Meri sugga, you changed my life in the best way possible." },

  { month: 31, date: "Feb 2026", title: "Forever You", icon: "♾️", color: "#ffd700",
    text: "Meri jaan, you are my everything. My love, I just want you forever." }
];
/* ─────────────────────────────────────────────────────────────
   MOOD THEMES
───────────────────────────────────────────────────────────── */
const MOOD_THEMES = {
  cosmos:   { name: "Cosmos",  bg: "radial-gradient(ellipse at 20% 50%, #1a003a 0%, #020008 50%, #000d1a 100%)", accent: "#b44fff", secondary: "#ff6b9d" },
  aurora:   { name: "Aurora",  bg: "radial-gradient(ellipse at 20% 50%, #002a1a 0%, #020008 50%, #001a2a 100%)", accent: "#00e5ff", secondary: "#7fff6b" },
  dusk:     { name: "Dusk",    bg: "radial-gradient(ellipse at 20% 50%, #2a1500 0%, #080005 50%, #1a0020 100%)", accent: "#ffa040", secondary: "#ff6b9d" },
  midnight: { name: "Midnight",bg: "radial-gradient(ellipse at 20% 50%, #000520 0%, #010010 50%, #020008 100%)", accent: "#4fc3f7", secondary: "#b44fff" },
};

/* ─────────────────────────────────────────────────────────────
   EASTER EGGS
───────────────────────────────────────────────────────────── */
const EASTER_EGGS = [
  { id: "ee1", symbol: "🌙", msg: "She loves moonlight — and so does every poem ever written about her", energy: 5  },
  { id: "ee2", symbol: "⭐", msg: "There are 31 stars for 31 months. You found one.", energy: 8  },
  { id: "ee3", symbol: "🦋", msg: "Chaos theory says a butterfly's wings can change everything. So can a smile.", energy: 6  },
  { id: "ee4", symbol: "💎", msg: "Under pressure, carbon becomes a diamond. Under love, people become art.", energy: 10 },
  { id: "ee5", symbol: "🔮", msg: "The future shows only two silhouettes, always side by side.", energy: 7  },
  { id: "ee6", symbol: "🌺", msg: "Her laugh grows things. Entire gardens. Absolute fact.", energy: 6  },
  { id: "ee7", symbol: "🎴", msg: "Every card in this universe has your face on the queen.", energy: 9  },
];

/* ─────────────────────────────────────────────────────────────
   CANVAS PHYSICS ENGINE
───────────────────────────────────────────────────────────── */
const PhysicsCanvas = ({ isParallel, mood }) => {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ particles: [], ripples: [], orbs: [null, null], mouse: { x: -999, y: -999 }, raf: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const accentColor = isParallel ? "rgba(80,80,80," : `rgba(${hexToRgb(MOOD_THEMES[mood]?.accent || "#b44fff")},`;
    const pinkColor   = isParallel ? "rgba(60,60,60," : "rgba(255,107,157,";

    // Init particles
    const COUNT = Math.min(90, Math.floor((W * H) / 14000));
    stateRef.current.particles = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      color: i % 3 === 0 ? pinkColor : i % 3 === 1 ? accentColor : "rgba(79,195,247,",
    }));

    // Quantum entanglement orbs
    stateRef.current.orbs = [
      { x: W * 0.3, y: H * 0.5, vx: 0, vy: 0, tx: W * 0.3, ty: H * 0.5, r: 14, hue: 300 },
      { x: W * 0.7, y: H * 0.5, vx: 0, vy: 0, tx: W * 0.7, ty: H * 0.5, r: 14, hue: 340 },
    ];

    const handleMouseMove = e => {
      stateRef.current.mouse = { x: e.clientX, y: e.clientY };
      // Orb 1 follows mouse
      stateRef.current.orbs[0].tx = e.clientX;
      stateRef.current.orbs[0].ty = e.clientY;
    };
    const handleClick = e => {
      stateRef.current.ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.8, maxR: 140 });
    };
    const handleResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);

    const CONNECT_DIST = 120;
    const MOUSE_DIST   = 160;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { particles, ripples, orbs, mouse } = stateRef.current;
      const speed = isParallel ? 0.15 : 1;

      // ── PARTICLES ──
      particles.forEach(p => {
        p.x += p.vx * speed; p.y += p.vy * speed;
        p.pulse += p.pulseSpeed * speed;
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;

        const pAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${pAlpha})`;
        ctx.fill();

        // Mouse repulsion glow
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < MOUSE_DIST) {
          const glow = 1 - dm / MOUSE_DIST;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 + glow * 3), 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${glow * 0.4})`;
          ctx.fill();
        }
      });

      // ── CONSTELLATION LINES ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < CONNECT_DIST) {
            const a = (1 - d / CONNECT_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isParallel ? `rgba(80,80,80,${a})` : `rgba(180,79,255,${a})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // ── QUANTUM ENTANGLEMENT LINE ──
      if (orbs[0] && orbs[1]) {
        const grad = ctx.createLinearGradient(orbs[0].x, orbs[0].y, orbs[1].x, orbs[1].y);
        grad.addColorStop(0, isParallel ? "rgba(80,80,80,0.4)" : "rgba(255,107,157,0.4)");
        grad.addColorStop(0.5, isParallel ? "rgba(60,60,60,0.1)" : "rgba(180,79,255,0.1)");
        grad.addColorStop(1, isParallel ? "rgba(80,80,80,0.4)" : "rgba(79,195,247,0.4)");
        ctx.beginPath();
        ctx.moveTo(orbs[0].x, orbs[0].y);

        // Bezier curve for entanglement
        const mx = (orbs[0].x + orbs[1].x) / 2;
        const my = (orbs[0].y + orbs[1].y) / 2 - 60 * Math.sin(Date.now() * 0.001 * speed);
        ctx.quadraticCurveTo(mx, my, orbs[1].x, orbs[1].y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Update orbs with spring physics
        orbs.forEach((o, idx) => {
          const target = idx === 0
            ? { x: o.tx, y: o.ty }
            : { x: W - orbs[0].x + (Math.sin(Date.now() * 0.0015 * speed) * 80), y: H - orbs[0].y + (Math.cos(Date.now() * 0.0015 * speed) * 60) };

          const spring = 0.04 * speed;
          const damp   = 0.88;
          o.vx += (target.x - o.x) * spring;
          o.vy += (target.y - o.y) * spring;
          o.vx *= damp; o.vy *= damp;
          o.x += o.vx; o.y += o.vy;

          // Orb glow
          const orbGrad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 5);
          orbGrad.addColorStop(0, isParallel ? "rgba(120,120,120,0.6)" : idx === 0 ? "rgba(255,107,157,0.6)" : "rgba(79,195,247,0.6)");
          orbGrad.addColorStop(0.4, isParallel ? "rgba(80,80,80,0.2)" : idx === 0 ? "rgba(180,79,255,0.2)" : "rgba(180,79,255,0.2)");
          orbGrad.addColorStop(1, "transparent");
          ctx.beginPath(); ctx.arc(o.x, o.y, o.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = orbGrad; ctx.fill();

          ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
          ctx.fillStyle = isParallel ? "rgba(150,150,150,0.9)" : idx === 0 ? "rgba(255,107,157,0.9)" : "rgba(79,195,247,0.9)";
          ctx.fill();

          // Label
          ctx.font = "11px 'Syne', sans-serif";
          ctx.fillStyle = isParallel ? "rgba(100,100,100,0.7)" : "rgba(255,255,255,0.7)";
          ctx.textAlign = "center";
          ctx.fillText(idx === 0 ? "Akhand" : "Anshul", o.x, o.y + o.r + 18);
        });
      }

      // ── RIPPLES ──
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += 4 * speed; rip.alpha -= 0.018 * speed;
        if (rip.alpha <= 0 || rip.r > rip.maxR) { ripples.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = isParallel ? `rgba(120,120,120,${rip.alpha})` : `rgba(255,107,157,${rip.alpha})`;
        ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(rip.x, rip.y, rip.r * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = isParallel ? `rgba(80,80,80,${rip.alpha * 0.4})` : `rgba(180,79,255,${rip.alpha * 0.4})`;
        ctx.lineWidth = 0.8; ctx.stroke();
      }

      stateRef.current.raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [isParallel, mood]);

  return (
    <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />
  );
};

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "180,79,255";
}

/* ─────────────────────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────────────────────── */
const MagicCursor = ({ isParallel }) => {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const trailRef = useRef([]);
  const posRef   = useRef({ x: 0, y: 0 });
  const MAX_TRAIL = 12;

  useEffect(() => {
    // Create trail dots
    const trails = Array.from({ length: MAX_TRAIL }, () => {
      const d = document.createElement("div");
      d.className = "cursor-trail";
      document.body.appendChild(d);
      return { el: d, x: 0, y: 0 };
    });
    trailRef.current = trails;

    const moveDot = e => {
      const x = e.clientX, y = e.clientY;
      posRef.current = { x, y };
      if (dotRef.current) {
        dotRef.current.style.left = x + "px";
        dotRef.current.style.top  = y + "px";
      }
    };

    let rafId;
    let frame = 0;
    const animRing = () => {
      const { x, y } = posRef.current;
      if (ringRef.current) {
        const cx = parseFloat(ringRef.current.style.left || "0");
        const cy = parseFloat(ringRef.current.style.top  || "0");
        const nx = cx + (x - cx) * 0.15;
        const ny = cy + (y - cy) * 0.15;
        ringRef.current.style.left = nx + "px";
        ringRef.current.style.top  = ny + "px";
      }
      // Trail
      if (frame % 2 === 0) {
        for (let i = trails.length - 1; i > 0; i--) {
          trails[i].x = trails[i-1].x;
          trails[i].y = trails[i-1].y;
        }
        trails[0].x = x; trails[0].y = y;
      }
      trails.forEach((t, i) => {
        const age = i / trails.length;
        t.el.style.left = t.x + "px";
        t.el.style.top  = t.y + "px";
        t.el.style.opacity = isParallel ? "0" : `${(1 - age) * 0.35}`;
        const c = i % 2 === 0 ? `rgba(255,107,157,${1-age})` : `rgba(180,79,255,${1-age})`;
        t.el.style.background = c;
        t.el.style.width  = `${5 * (1 - age * 0.7)}px`;
        t.el.style.height = `${5 * (1 - age * 0.7)}px`;
      });
      frame++;
      rafId = requestAnimationFrame(animRing);
    };

    const handleOver = e => {
      const el = e.target;
      const isClickable = el.tagName === "BUTTON" || el.tagName === "A" || el.closest("button") || el.closest("a") || el.classList.contains("easter-egg") || el.classList.contains("timeline-card") || el.classList.contains("mood-btn");
      if (ringRef.current) {
        if (isClickable) ringRef.current.classList.add("hovered");
        else             ringRef.current.classList.remove("hovered");
      }
    };

    document.addEventListener("mousemove", moveDot);
    document.addEventListener("mouseover", handleOver);
    animRing();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", moveDot);
      document.removeEventListener("mouseover", handleOver);
      trails.forEach(t => t.el.remove());
    };
  }, [isParallel]);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   TOAST SYSTEM
───────────────────────────────────────────────────────────── */
const ToastContainer = ({ toasts }) => (
  <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 8000, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
    {toasts.map(t => (
      <div key={t.id} className={`toast-enter glass2`} style={{
        maxWidth: "360px", padding: "1rem 1.25rem", borderRadius: "16px",
        display: "flex", alignItems: "flex-start", gap: "0.75rem",
        borderLeft: `3px solid var(--pink)`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.6), var(--glow-pink)",
      }}>
        <span style={{ fontSize: "1.5rem" }}>{t.icon}</span>
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--pink)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
            Easter Egg Found! +{t.energy}⚡
          </div>
          <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.5, fontFamily: "'Cormorant Garamond', serif" }}>
            {t.msg}
          </div>
        </div>
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────────────────────
   ENERGY METER
───────────────────────────────────────────────────────────── */
const EnergyMeter = ({ energy, onFull }) => {
  const pct = Math.min(100, energy);
  const prevFull = useRef(false);
  useEffect(() => {
    if (pct >= 100 && !prevFull.current) { prevFull.current = true; onFull(); }
  }, [pct, onFull]);

  return (
    <div style={{
      position: "fixed", top: "1.5rem", left: "50%", transform: "translateX(-50%)",
      zIndex: 500, display: "flex", alignItems: "center", gap: "0.75rem",
      padding: "0.5rem 1.25rem 0.5rem 0.75rem",
      background: "rgba(2,0,8,0.8)", backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,107,157,0.2)", borderRadius: "50px",
    }}>
      <Zap size={14} color="var(--pink)" />
      <div style={{ position: "relative", width: "160px", height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
        <div className="energy-bar-fill" style={{ width: `${pct}%`, borderRadius: "3px" }} />
      </div>
      <span style={{ fontSize: "0.7rem", fontFamily: "'Space Mono', monospace", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
        {pct < 100 ? `${Math.floor(pct)}%` : "✦ FULL ✦"}
      </span>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   AI TEXT GENERATOR
───────────────────────────────────────────────────────────── */
const LOVE_LINES = [
  "Calculating the exact weight of 31 months of laughter...",
  "Running sentiment analysis on 9,327+ text messages...",
  "Compressing 744 days of memories into this moment...",
  "Neural pathway: You → My entire nervous system → Home.",
  "Loading Anshul.exe... complete. World rendering in HD.",
  "Error 200: Extraordinary human detected. Heart rate: elevated.",
  "Searching for words adequate enough to describe you... search failed.",
  "Probability of finding someone like you: 1 in 8,000,000,000. Yet here we are.",
  "Time elapsed since falling for you: Too long to count, not long enough.",
  "Anshul : the variable that made all my equations make sense.",
];

const AITextGenerator = ({ addEnergy }) => {
  const [lineIdx, setLineIdx]     = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping]   = useState(true);
  const charRef = useRef(0);
  const timerRef = useRef(null);

  const type = useCallback(() => {
    const line = LOVE_LINES[lineIdx];
    if (charRef.current < line.length) {
      setDisplayed(line.slice(0, charRef.current + 1));
      charRef.current++;
      timerRef.current = setTimeout(type, 35 + Math.random() * 25);
    } else {
      setIsTyping(false);
      timerRef.current = setTimeout(() => {
        charRef.current = 0;
        setLineIdx(i => (i + 1) % LOVE_LINES.length);
        setIsTyping(true);
      }, 2800);
    }
  }, [lineIdx]);

  useEffect(() => {
    setDisplayed("");
    charRef.current = 0;
    setIsTyping(true);
    timerRef.current = setTimeout(type, 300);
    return () => clearTimeout(timerRef.current);
  }, [lineIdx, type]);

  return (
    <div className="glass" style={{
      borderRadius: "16px", padding: "1.5rem",
      border: "1px solid rgba(0,229,255,0.2)",
      boxShadow: "0 0 30px rgba(0,229,255,0.08)",
      cursor: "default",
    }} onClick={() => addEnergy(2)}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", fontFamily: "'Space Mono', monospace", color: "rgba(255,255,255,0.3)" }}>
          love_engine_v31.sh
        </span>
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#00e5ff", lineHeight: 1.7, minHeight: "2.5em" }}>
        <span style={{ color: "rgba(0,229,255,0.5)" }}>~/universe $ </span>
        {displayed}
        <span style={{ animation: "blinkCursor 1s infinite", color: "#00e5ff" }}>|</span>
      </div>
      <div style={{ marginTop: "0.75rem", fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", fontFamily: "'Space Mono', monospace" }}>
        // click to charge energy ⚡
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   VINYL RECORD
───────────────────────────────────────────────────────────── */
const VinylRecord = ({ addEnergy }) => {
  const [playing, setPlaying]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed]   = useState(0);
  const timerRef = useRef(null);
  const DURATION = 183; // seconds

  const toggle = () => {
    setPlaying(p => !p);
    addEnergy(4);
  };

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setElapsed(e => {
          if (e >= DURATION) { setPlaying(false); return 0; }
          return e + 1;
        });
        setProgress(p => Math.min(100, p + 100 / DURATION));
      }, 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [playing]);

  const fmtTime = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const r = 74, circumference = 2 * Math.PI * r;
  const dash = (progress / 100) * circumference;

  return (
    <div className="glass2 hover-lift" style={{
      borderRadius: "24px", padding: "2.5rem 2rem",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem",
      border: "1px solid rgba(255,107,157,0.15)",
      boxShadow: playing ? "0 0 60px rgba(255,107,157,0.2), 0 0 120px rgba(180,79,255,0.1)" : "none",
      transition: "box-shadow 0.8s ease",
      cursor: "pointer",
    }}>
      <div style={{ position: "relative", width: "200px", height: "200px" }}>
        {/* Progress Ring */}
        <svg width="200" height="200" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
          <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          <circle cx="100" cy="100" r={r} fill="none"
            stroke="url(#vinylGrad)" strokeWidth="3"
            strokeDasharray={`${dash} ${circumference}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
          <defs>
            <linearGradient id="vinylGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b9d" />
              <stop offset="100%" stopColor="#b44fff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Record */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          width: "176px", height: "176px", borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #2a1a2e, #0a0010)",
          animation: playing ? "spinRecord 4s linear infinite" : "none",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}>
          {/* Grooves */}
          {[30,50,65,75,82,87,91].map(r => (
            <div key={r} className="vinyl-groove" style={{
              position: "absolute", top: `${50-r/2}%`, left: `${50-r/2}%`,
              width: `${r}%`, height: `${r}%`,
              border: "1px solid rgba(255,255,255,0.03)",
            }} />
          ))}
          {/* Center label */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "60px", height: "60px", borderRadius: "50%",
            background: "radial-gradient(circle, #2a0040, #0d0020)",
            border: "1px solid rgba(180,79,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column",
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#b44fff", boxShadow: "0 0 8px #b44fff" }} />
          </div>
        </div>

        {/* Tonearm */}
        <div style={{
          position: "absolute", top: "0", right: "-10px",
          width: "80px", height: "80px",
          transformOrigin: "top right",
          animation: playing ? "tonearmSwing 1.5s ease forwards" : "tonearmLift 0.8s ease forwards",
          pointerEvents: "none",
        }}>
          <div style={{
            width: "70px", height: "3px",
            background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
            borderRadius: "2px",
            boxShadow: "0 0 6px rgba(255,255,255,0.2)",
            position: "absolute", top: "30px", right: 0,
            transformOrigin: "right center",
            transform: "rotate(20deg)",
          }} />
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#ff6b9d", boxShadow: "0 0 6px #ff6b9d",
            position: "absolute", top: "27px", left: "3px",
          }} />
        </div>
      </div>

      {/* Track Info */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", marginBottom: "0.25rem" }}>
          Apki Baaton Mein Aisa Uljha Jiya
        </div>
        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
          A VOICE NOTE • {fmtTime(elapsed)} / {fmtTime(DURATION)}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Volume2 size={16} color="rgba(255,255,255,0.3)" />
        <button onClick={toggle} style={{
          width: "52px", height: "52px", borderRadius: "50%",
          background: "linear-gradient(135deg, var(--pink), var(--purple))",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: playing ? "0 0 20px rgba(255,107,157,0.6)" : "none",
          transition: "box-shadow 0.4s ease",
        }}>
          {playing ? <Pause size={20} color="#fff" /> : <Play size={20} color="#fff" style={{ marginLeft: 2 }} />}
        </button>
        <Headphones size={16} color="rgba(255,255,255,0.3)" />
      </div>

      <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", fontFamily: "'Space Mono', monospace", textAlign: "center" }}>
        // simulated voice note — the feelings are real
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   3D TIMELINE
───────────────────────────────────────────────────────────── */
const Timeline3D = ({ addEnergy }) => {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const scrollRef = useRef(null);

  const goTo = idx => { setActive(idx); addEnergy(1.5); };
  const prev = () => goTo(Math.max(0, active - 1));
  const next = () => goTo(Math.min(TIMELINE_DATA.length - 1, active + 1));

  const getStyle = idx => {
    const diff = idx - active;
    const abs  = Math.abs(diff);
    if (abs > 3) return { display: "none" };

    const rotY    = diff * 38;
    const tx      = diff * 280;
    const tz      = -abs * 120;
    const scale   = 1 - abs * 0.12;
    const opacity = 1 - abs * 0.28;
    const zi      = 10 - abs;

    return {
      display: "flex", flexDirection: "column",
      position: "absolute", width: "320px",
      transform: `perspective(1400px) rotateY(${rotY}deg) translateX(${tx}px) translateZ(${tz}px) scale(${scale})`,
      opacity, zIndex: zi,
      transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
      left: "50%", marginLeft: "-160px",
    };
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Month dots nav */}
      <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "2.5rem", flexWrap: "wrap", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
        {TIMELINE_DATA.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === active ? "24px" : "8px",
            height: "8px",
            borderRadius: "4px",
            background: i === active ? `linear-gradient(90deg, var(--pink), var(--purple))` : "rgba(255,255,255,0.15)",
            border: "none", cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }} />
        ))}
      </div>

      {/* 3D Stage */}
      <div style={{ position: "relative", height: "480px", display: "flex", alignItems: "center", justifyContent: "center", perspective: "1400px" }}>
        {TIMELINE_DATA.map((item, idx) => (
          <div
            key={item.month}
            className="timeline-card"
            style={getStyle(idx)}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => { goTo(idx); addEnergy(2); }}
          >
            <div className="glass2" style={{
              borderRadius: "24px", overflow: "hidden",
              border: `1px solid ${idx === active ? item.color + "50" : "rgba(255,255,255,0.07)"}`,
              boxShadow: idx === active ? `0 0 40px ${item.color}30, 0 20px 60px rgba(0,0,0,0.6)` : "0 8px 32px rgba(0,0,0,0.5)",
              cursor: "pointer",
            }}>
              {/* Card Header */}
              <div style={{
                padding: "1.5rem 1.5rem 1rem",
                background: `linear-gradient(135deg, ${item.color}22 0%, transparent 100%)`,
                borderBottom: `1px solid ${item.color}20`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div>
                    <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", marginBottom: "0.3rem", fontWeight: 600 }}>
                      MONTH {String(item.month).padStart(2,"0")} · {item.date}
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, lineHeight: 1.2, color: "#fff" }}>
                      {item.title}
                    </div>
                  </div>
                  <div style={{
                    fontSize: "2rem", width: "52px", height: "52px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${item.color}18`, borderRadius: "12px",
                    border: `1px solid ${item.color}30`,
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                </div>
                {/* Month progress bar */}
                <div style={{ height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "1px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(item.month / 31) * 100}%`, background: `linear-gradient(90deg, ${item.color}, transparent)`, borderRadius: "1px" }} />
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.75)", lineHeight: 1.75,
                  fontStyle: "italic",
                }}>
                  "{item.text}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", marginTop: "1.5rem" }}>
        <button onClick={prev} disabled={active === 0} style={{
          padding: "0.6rem 1.5rem", borderRadius: "50px",
          background: active === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,107,157,0.15)",
          border: `1px solid ${active === 0 ? "rgba(255,255,255,0.08)" : "rgba(255,107,157,0.3)"}`,
          color: active === 0 ? "rgba(255,255,255,0.2)" : "var(--pink)",
          cursor: active === 0 ? "default" : "pointer",
          fontSize: "0.8rem", letterSpacing: "0.05em", fontWeight: 600,
          transition: "all 0.3s ease",
        }}>← Prev</button>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)" }}>
            {TIMELINE_DATA[active].title}
          </div>
          <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", marginTop: "2px" }}>
            {active + 1} / 31
          </div>
        </div>

        <button onClick={next} disabled={active === 30} style={{
          padding: "0.6rem 1.5rem", borderRadius: "50px",
          background: active === 30 ? "rgba(255,255,255,0.04)" : "rgba(255,107,157,0.15)",
          border: `1px solid ${active === 30 ? "rgba(255,255,255,0.08)" : "rgba(255,107,157,0.3)"}`,
          color: active === 30 ? "rgba(255,255,255,0.2)" : "var(--pink)",
          cursor: active === 30 ? "default" : "pointer",
          fontSize: "0.8rem", letterSpacing: "0.05em", fontWeight: 600,
          transition: "all 0.3s ease",
        }}>Next →</button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CINEMATIC ENDING
───────────────────────────────────────────────────────────── */
const CinematicEnding = ({ onClose }) => {
  const PHASES = [
    { delay: 0.5,  size: "clamp(0.9rem,2vw,1.2rem)", color: "rgba(255,255,255,0.4)", font: "'Space Mono', monospace", text: "[ ENERGY MATRIX: FULLY CHARGED ]" },
    { delay: 2.2,  size: "clamp(1rem,2.5vw,1.5rem)", color: "rgba(180,79,255,0.7)", font: "'Syne', sans-serif", text: "To: Meri Patni" },
    { delay: 4.0,  size: "clamp(0.85rem,2vw,1rem)",  color: "rgba(255,255,255,0.35)", font: "'Space Mono', monospace", text: "∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿" },
    { delay: 5.5,  size: "clamp(2rem,6vw,4.5rem)",   color: "#fff", font: "'Cormorant Garamond', serif", italic: true, text: "Thirty-one months." },
    { delay: 7.5,  size: "clamp(1.5rem,4vw,3rem)",   color: "rgba(255,107,157,0.9)", font: "'Cormorant Garamond', serif", italic: true, text: "Thirty-one reasons." },
    { delay: 9.5,  size: "clamp(1rem,2.5vw,1.6rem)", color: "rgba(255,255,255,0.6)", font: "'Cormorant Garamond', serif", text: "Not one moment I would undo." },
    { delay: 11.5, size: "clamp(0.85rem,2vw,1rem)",  color: "rgba(255,255,255,0.35)", font: "'Space Mono', monospace", text: "∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿" },
    { delay: 13.0, size: "clamp(0.9rem,2vw,1.1rem)", color: "rgba(79,195,247,0.7)", font: "'Syne', sans-serif", text: "You changed the frequency of my entire existence." },
    { delay: 15.0, size: "clamp(0.85rem,1.8vw,1rem)",color: "rgba(255,255,255,0.5)", font: "'Cormorant Garamond', serif", italic: true, text: "You are the only theory I've ever been certain of." },
    { delay: 17.0, size: "clamp(2.5rem,8vw,6rem)",   color: "transparent", font: "'Cormorant Garamond', serif", italic: true, shimmer: true, text: "I love you." },
    { delay: 20.0, size: "clamp(1.5rem,4vw,2.8rem)", color: "transparent", font: "'Cormorant Garamond', serif", italic: true, shimmer: true, text: "— Akhand Pratap ♾" },
    { delay: 22.5, size: "clamp(0.7rem,1.5vw,0.85rem)", color: "rgba(255,255,255,0.2)", font: "'Space Mono', monospace", text: "// 31 months complete. Loading forever.exe..." },
  ];

  const CineStars = () => {
    const stars = useMemo(() => Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      dur: Math.random() * 4 + 3,
    })), []);

    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {stars.map(s => (
          <div key={s.id} style={{
            position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            borderRadius: "50%", background: "#fff",
            animation: `starTwinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
          }} />
        ))}
      </div>
    );
  };

  return (
    <div className="cine-overlay" onClick={onClose}>
      <div className="cine-stars" />
      <CineStars />

      {/* Floating hearts */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${10 + i * 12}%`, bottom: "-40px",
          fontSize: `${1 + Math.random()}rem`,
          animation: `float ${3 + i * 0.5}s ${i * 0.4}s ease-in-out infinite`,
          opacity: 0.15,
        }}>❤</div>
      ))}

      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: "1.5rem",
        textAlign: "center", padding: "2rem",
        maxWidth: "700px", width: "100%",
      }}>
        {PHASES.map((phase, i) => (
          <div key={i} className="cine-line" style={{
            animationDelay: `${phase.delay}s`,
            fontSize: phase.size,
            fontFamily: phase.font,
            fontStyle: phase.italic ? "italic" : "normal",
            lineHeight: 1.3,
            letterSpacing: phase.shimmer ? "-0.02em" : "0.03em",
            ...(phase.shimmer ? {
              background: "linear-gradient(90deg, var(--pink), var(--purple), var(--blue), var(--pink))",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: `cineFadeIn 1.2s cubic-bezier(0.23,1,0.32,1) ${phase.delay}s forwards, shimmer 3s linear ${phase.delay + 1.2}s infinite, cineGlow 3s ease-in-out ${phase.delay + 1}s infinite`,
            } : {
              color: phase.color,
              animation: `cineFadeIn 1.2s cubic-bezier(0.23,1,0.32,1) ${phase.delay}s forwards`,
            }),
          }}>
            {phase.text}
          </div>
        ))}
      </div>

      <div style={{
        position: "absolute", bottom: "2rem",
        fontSize: "0.7rem", fontFamily: "'Space Mono', monospace",
        color: "rgba(255,255,255,0.15)", letterSpacing: "0.1em",
        animation: `cineFadeIn 1s 24s forwards`,
        opacity: 0,
      }}>
        tap anywhere to close
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────── */
const HeroSection = ({ isParallel, addEnergy }) => {
  const [showSub, setShowSub] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShowSub(true), 1200); return () => clearTimeout(t); }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center", position: "relative" }}>
      {/* Aura rings */}
      {[1,2,3].map(i => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: `${i * 260}px`, height: `${i * 260}px`,
          borderRadius: "50%",
          border: `1px solid rgba(180,79,255,${0.08 - i * 0.02})`,
          animation: `auraPulse ${3 + i}s ${i * 0.4}s ease-in-out infinite`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Month badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        padding: "0.4rem 1.2rem", borderRadius: "50px",
        background: "rgba(180,79,255,0.12)", border: "1px solid rgba(180,79,255,0.3)",
        marginBottom: "2rem",
        animation: "fadeInDown 0.8s 0.3s both",
      }}>
        <Infinity size={12} color="var(--purple)" />
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--purple)", fontWeight: 700 }}>
          MONTH 31 · A LOVE DIMENSION
        </span>
        <Infinity size={12} color="var(--purple)" />
      </div>

      {/* Main title */}
      <div style={{ animation: "fadeInUp 1s 0.6s both" }}>
        <h1 className="section-title shimmer-text" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", marginBottom: "0.5rem" }}>
          Meri Jaan,
        </h1>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 4vw, 3rem)",
          fontWeight: 300, color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem",
        }}>
          you are my favourite
        </h2>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 300, color: "rgba(255,255,255,0.9)",
        }}>
          dimension of reality.
        </h2>
      </div>

      {showSub && (
        <div style={{ animation: "fadeInUp 0.8s both", marginTop: "2.5rem", maxWidth: "580px" }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            color: "rgba(255,255,255,0.5)", lineHeight: 1.8, fontStyle: "italic",
          }}>
            "943 days. Every single one worth it."
          </p>
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            {[{ n: "31", label: "Months" }, { n: "744", label: "Days" }, { n: "∞", label: "More to come" }].map(s => (
              <div key={s.label} className="glass" style={{
                padding: "1rem 1.5rem", borderRadius: "16px",
                textAlign: "center", minWidth: "100px",
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "var(--pink)" }}>{s.n}</div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: "3rem",
        animation: "float2 3s ease-in-out infinite",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
      }}>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, var(--pink))" }} />
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>SCROLL</span>
      </div>

      {/* Easter Egg — star orbit */}
      <div style={{ position: "absolute", top: "20%", right: "5%", animation: "orbitStar 12s linear infinite", pointerEvents: "none" }}>
        <div className="easter-egg" style={{ pointerEvents: "all" }} onClick={() => addEnergy(8)}>
          <Star size={16} color="var(--gold)" fill="var(--gold)" />
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   MOOD CONTROL PANEL
───────────────────────────────────────────────────────────── */
const MoodPanel = ({ mood, setMood, isParallel, setIsParallel }) => {
  const moods = Object.entries(MOOD_THEMES);

  return (
    <div style={{
      position: "fixed", left: "1.5rem", top: "50%", transform: "translateY(-50%)",
      zIndex: 500, display: "flex", flexDirection: "column", gap: "0.75rem",
    }}>
      <div style={{ fontSize: "0.55rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textAlign: "center", marginBottom: "0.25rem", fontWeight: 700 }}>
        MOOD
      </div>
      {moods.map(([key, val]) => (
        <button key={key} className={`mood-btn ${mood === key ? "active" : ""}`} onClick={() => setMood(key)} style={{
          width: "34px", height: "34px", borderRadius: "10px",
          background: mood === key ? val.accent : "rgba(255,255,255,0.05)",
          border: `1px solid ${mood === key ? val.accent : "rgba(255,255,255,0.1)"}`,
          cursor: "pointer",
          color: val.accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem",
        }}>
          {key === "cosmos" ? "🌌" : key === "aurora" ? "🌊" : key === "dusk" ? "🌅" : "🌙"}
        </button>
      ))}

      <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", margin: "0.25rem 0" }} />

      {/* Parallel Universe Toggle */}
      <button
        onClick={() => setIsParallel(p => !p)}
        style={{
          width: "34px", height: "34px", borderRadius: "10px",
          background: isParallel ? "rgba(100,100,100,0.3)" : "rgba(180,79,255,0.12)",
          border: `1px solid ${isParallel ? "rgba(100,100,100,0.4)" : "rgba(180,79,255,0.3)"}`,
          cursor: "pointer", fontSize: "1rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.4s ease",
          title: "Parallel Universe",
        }}
        title={isParallel ? "Return to Love Dimension" : "Enter Parallel Universe"}
      >
        {isParallel ? <Moon size={14} color="rgba(120,120,120,0.7)" /> : <Sparkles size={14} color="var(--purple)" />}
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   FLOATING EASTER EGGS LAYER
───────────────────────────────────────────────────────────── */
const EasterEggLayer = ({ found, onFind }) => {
  const positions = [
    { top: "28%",  left: "8%"  },
    { top: "55%",  right: "6%" },
    { top: "75%",  left: "12%" },
    { top: "40%",  right: "4%" },
    { top: "88%",  left: "6%"  },
    { top: "62%",  right: "10%"},
    { top: "15%",  left: "15%" },
  ];

  return (
    <>
      {EASTER_EGGS.map((egg, i) => {
        if (found.includes(egg.id)) return null;
        return (
          <div key={egg.id} className="easter-egg" onClick={() => onFind(egg)} style={{
            position: "fixed", ...positions[i], zIndex: 200,
            fontSize: "1.4rem", userSelect: "none",
            animation: `float${i % 2 === 0 ? "" : "2"} ${4 + i * 0.5}s ${i * 0.3}s ease-in-out infinite`,
            filter: "drop-shadow(0 0 8px rgba(255,107,157,0.4))",
          }}>
            {egg.symbol}
          </div>
        );
      })}
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────────────── */
export default function App() {
  const [mood, setMood]             = useState("cosmos");
  const [isParallel, setIsParallel] = useState(false);
  const [energy, setEnergy]         = useState(0);
  const [toasts, setToasts]         = useState([]);
  const [foundEggs, setFoundEggs]   = useState([]);
  const [showCinema, setShowCinema] = useState(false);
  const [cinematicDone, setCinematicDone] = useState(false);
  const toastIdRef = useRef(0);

  // Parallel universe body class
  useEffect(() => {
    document.body.classList.toggle("parallel", isParallel);
  }, [isParallel]);

  // Background
  useEffect(() => {
    const theme = MOOD_THEMES[mood];
    document.body.style.background = theme.bg;
  }, [mood]);

  const addEnergy = useCallback(amount => {
    if (cinematicDone) return;
    setEnergy(e => Math.min(100, e + amount));
  }, [cinematicDone]);

  const onEggFind = useCallback(egg => {
    setFoundEggs(f => [...f, egg.id]);
    addEnergy(egg.energy);
    const id = ++toastIdRef.current;
    setToasts(t => [...t, { id, icon: egg.symbol, msg: egg.msg, energy: egg.energy }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  }, [addEnergy]);

  const onEnergyFull = useCallback(() => {
    if (!cinematicDone) { setTimeout(() => setShowCinema(true), 500); }
  }, [cinematicDone]);

  const closeCinema = () => { setShowCinema(false); setCinematicDone(true); };

  const theme = MOOD_THEMES[mood];

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <GlobalStyles />

      {/* Canvas Background */}
      <PhysicsCanvas isParallel={isParallel} mood={mood} />

      {/* Magic Cursor */}
      <MagicCursor isParallel={isParallel} />

      {/* Energy Meter */}
      <EnergyMeter energy={energy} onFull={onEnergyFull} />

      {/* Mood Panel */}
      <MoodPanel mood={mood} setMood={setMood} isParallel={isParallel} setIsParallel={setIsParallel} />

      {/* Easter Eggs */}
      <EasterEggLayer found={foundEggs} onFind={onEggFind} />

      {/* Parallel Universe Overlay Text */}
      <div className="universe-text" style={{ opacity: isParallel ? 1 : 0, transition: "opacity 2s ease" }}>
        ERROR 404:<br />
        LOVE NOT FOUND<br /><br />
        <span style={{ fontSize: "0.6em", opacity: 0.5 }}>this universe is empty without you</span>
      </div>

      {/* Toasts */}
      <ToastContainer toasts={toasts} />

      {/* Cinematic Ending */}
      {showCinema && <CinematicEnding onClose={closeCinema} />}

      {/* ── PAGE CONTENT ── */}
      <main style={{ position: "relative", zIndex: 1 }}>

        {/* HERO */}
        <HeroSection isParallel={isParallel} addEnergy={addEnergy} />

        {/* ── AI TERMINAL SECTION ── */}
        <section style={{ padding: "4rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--cyan)", fontWeight: 700, marginBottom: "1rem" }}>
              LOVE ENGINE · PROCESSING
            </div>
            <h2 className="section-title" style={{ color: "rgba(255,255,255,0.9)" }}>
              <span style={{ fontStyle: "normal" }}>What the</span> universe<br />
              <span style={{ fontStyle: "italic" }}>computed about us</span>
            </h2>
          </div>
          <AITextGenerator addEnergy={addEnergy} />
        </section>

        {/* ── DIVIDER ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1rem 3rem", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(180,79,255,0.3))" }} />
          <Heart size={14} color="var(--pink)" fill="var(--pink)" style={{ animation: "heartbeat 2s ease-in-out infinite" }} />
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(180,79,255,0.3))" }} />
        </div>

        {/* ── TIMELINE SECTION ── */}
        <section style={{ padding: "5rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--pink)", fontWeight: 700, marginBottom: "1rem" }}>
              31 MONTHS · 31 STORIES
            </div>
            <h2 className="section-title">
              Our <span className="shimmer-text">Timeline</span>
            </h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem",
              color: "rgba(255,255,255,0.4)", marginTop: "1rem",
              fontStyle: "italic",
            }}>
              Every month, a universe of its own.
            </p>
          </div>
          <Timeline3D addEnergy={addEnergy} />
        </section>

        {/* ── DIVIDER ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1rem 3rem", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(79,195,247,0.3))" }} />
          <Music size={14} color="var(--blue)" />
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(79,195,247,0.3))" }} />
        </div>

        {/* ── VINYL / VOICE NOTE SECTION ── */}
        <section style={{ padding: "5rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--purple)", fontWeight: 700, marginBottom: "1rem" }}>
                A MOMENT IN SOUND
              </div>
              <h2 className="section-title">
                Play the <span className="shimmer-text" style={{ fontStyle: "normal" }}>memory</span>
              </h2>
            </div>
            <VinylRecord addEnergy={addEnergy} />

            {/* Hidden Easter Egg in this section */}
            <span className="easter-egg" onClick={() => onEggFind(EASTER_EGGS[3])} style={{
              position: "absolute", right: "3rem",
              fontSize: "1.2rem", cursor: "pointer",
            }}>💎</span>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1rem 3rem", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(255,107,157,0.3))" }} />
          <Sparkles size={14} color="var(--pink)" />
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(255,107,157,0.3))" }} />
        </div>

        {/* ── REASON CARDS ── */}
        <section style={{ padding: "5rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--gold)", fontWeight: 700, marginBottom: "1rem" }}>
              IRREFUTABLE EVIDENCE
            </div>
            <h2 className="section-title">
              Why you are my<br /><span className="shimmer-text">favourite human</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🧠", title: "Your Mind",          desc: "The way you think — unexpected, layered, honest. Conversations with you are the most interesting place I've ever been." },
              { icon: "😂", title: "Your Laugh",          desc: "It is architecturally unsound. It brings rooms down. It is my favourite sound in any frequency, in any universe." },
              { icon: "💪", title: "Your Strength",       desc: "You've carried things quietly that most people would broadcast. That quiet dignity is one of the most beautiful things about you." },
              { icon: "🎨", title: "Your Creativity",     desc: "The way you see things — the angle you choose, the detail you notice. You've made me see the whole world differently." },
              { icon: "🌙", title: "Your 3 AM Voice",     desc: "Soft, unhurried, completely unguarded. I think the truest version of you lives in that voice, and I'm lucky to have heard it." },
              { icon: "❤️", title: "Your Heart",          desc: "It is enormous. You love carefully, deeply, with your full attention. Being loved by you is the rarest privilege of my life." },
            ].map((card, i) => (
              <div
                key={i}
                className="glass hover-lift"
                onClick={() => addEnergy(1.5)}
                style={{
                  borderRadius: "20px", padding: "1.75rem",
                  border: "1px solid rgba(255,255,255,0.07)",
                  cursor: "default",
                  animation: `fadeInUp 0.6s ${0.1 * i}s both`,
                }}
              >
                <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", marginBottom: "0.6rem", color: "rgba(255,255,255,0.9)" }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL LETTER ── */}
        <section style={{ padding: "6rem 2rem", maxWidth: "750px", margin: "0 auto" }}>
          <div className="glass2" style={{
            borderRadius: "32px", padding: "3.5rem",
            border: "1px solid rgba(255,107,157,0.15)",
            boxShadow: "0 0 80px rgba(180,79,255,0.1), 0 40px 80px rgba(0,0,0,0.6)",
            textAlign: "center", cursor: "default",
          }} onClick={() => addEnergy(5)}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--pink)", fontWeight: 700, marginBottom: "2rem" }}>
              A LETTER · FROM AKHAND PRATAP
            </div>
            <Heart size={28} color="var(--pink)" fill="var(--pink)" style={{ animation: "heartbeat 2s ease-in-out infinite", marginBottom: "1.5rem" }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)",
              fontStyle: "italic", lineHeight: 2, color: "rgba(255,255,255,0.8)",
              marginBottom: "2rem",
            }}>
              Dear Anshul,
              <br /><br />
              I have tried to find the right words for thirty-one months and I don't think they exist yet. Not in English, not in Hindi, not in whatever language the stars use to explain why two people find each other in a universe this wide.
              <br /><br />
              So I'll say the inadequate thing: you are the best thing that has ever made me rethink every plan I had for my life. Every quiet Tuesday. Every argument that ended with me knowing you better. Every time you fell asleep mid-sentence and somehow I loved you more.
              <br /><br />
              I don't know what comes next. But I know I want to find out with you Meri jaaan.
            </p>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, var(--pink), transparent)", margin: "0 auto 1.5rem" }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem",
              color: "rgba(255,255,255,0.5)", fontStyle: "italic",
            }}>
              — with every atom I own,<br />
              <span style={{ color: "var(--pink)" }}>Akhand Pratap Chaurasiya ♾</span>
            </p>
          </div>
        </section>

        {/* ── CTA TO TRIGGER CINEMA ── */}
        {!cinematicDone && (
          <section style={{ padding: "3rem 2rem 8rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", marginBottom: "1.5rem", letterSpacing: "0.1em" }}>
              // fill the energy meter to unlock the final message
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={() => addEnergy(20)}
                style={{
                  padding: "0.8rem 2rem", borderRadius: "50px",
                  background: "linear-gradient(135deg, rgba(255,107,157,0.15), rgba(180,79,255,0.15))",
                  border: "1px solid rgba(255,107,157,0.3)",
                  color: "var(--pink)", cursor: "pointer",
                  fontSize: "0.8rem", letterSpacing: "0.1em", fontWeight: 600,
                  transition: "all 0.3s ease",
                }}
              >
                <Flame size={13} style={{ marginRight: "0.4rem", verticalAlign: "middle" }} />
                Charge 20%
              </button>
              <button
                onClick={() => { setEnergy(100); }}
                style={{
                  padding: "0.8rem 2rem", borderRadius: "50px",
                  background: "linear-gradient(135deg, rgba(180,79,255,0.2), rgba(79,195,247,0.15))",
                  border: "1px solid rgba(180,79,255,0.3)",
                  color: "var(--purple)", cursor: "pointer",
                  fontSize: "0.8rem", letterSpacing: "0.1em", fontWeight: 600,
                  transition: "all 0.3s ease",
                }}
              >
                <Zap size={13} style={{ marginRight: "0.4rem", verticalAlign: "middle" }} />
                Unlock Finale
              </button>
            </div>
          </section>
        )}

        {cinematicDone && (
          <section style={{ padding: "2rem 2rem 8rem", textAlign: "center" }}>
            <div className="glass" style={{ display: "inline-block", padding: "0.75rem 2rem", borderRadius: "50px", border: "1px solid rgba(255,107,157,0.2)" }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
                ✦ finale unlocked · forever loading
              </span>
            </div>
          </section>
        )}

        {/* ── FOOTER ── */}
        <footer style={{
          textAlign: "center", padding: "3rem 2rem 4rem",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(255,255,255,0.25)", marginBottom: "0.5rem" }}>
            made with every last bit of love
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.15)", letterSpacing: "0.1em" }}>
            akhand pratap → anshul · month 31 · 2026
          </div>
          <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
            {["🌌", "♾️", "✨", "💖", "🌙"].map((e, i) => (
              <span key={i} style={{ fontSize: "1rem", animation: `starTwinkle ${2 + i * 0.4}s ${i * 0.2}s ease-in-out infinite`, cursor: "pointer" }}
                onClick={() => addEnergy(2)}>{e}</span>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}