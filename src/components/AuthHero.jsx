import { motion } from 'framer-motion'

function Sparkline({ color = '#60a5fa', delay = 0 }) {
  const path = 'M0 60 C 40 40, 80 80, 120 55 S 200 60, 240 35 S 320 70, 380 45 S 460 60, 520 40 S 600 65, 680 30'
  return (
    <svg viewBox="0 0 680 120" className="w-[680px] h-[120px] opacity-70">
      <defs>
        <linearGradient id={`glow-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
        <filter id="soft-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#glow-${color})`}
        strokeWidth="3"
        filter="url(#soft-glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, ease: 'easeInOut', delay }}
      />
    </svg>
  )
}

function CandlesRow({ delay = 0 }) {
  const bars = Array.from({ length: 28 }, (_, i) => i)
  return (
    <div className="flex items-end gap-2">
      {bars.map((i) => (
        <motion.div
          key={i}
          className="w-2 rounded-sm bg-emerald-400/70 dark:bg-emerald-400/60"
          initial={{ height: 8 + (i % 4) * 6, opacity: 0 }}
          animate={{ height: 12 + ((i * 7) % 16) + 8, opacity: 1 }}
          transition={{ duration: 1.6, repeat: Infinity, repeatType: 'mirror', delay: delay + i * 0.06, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function AuthHero() {
  return (
    <section className="relative h-[460px] w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      {/* Animated Finance Background */}
      <div className="absolute inset-0 p-6 grid grid-rows-3 pointer-events-none select-none">
        <div className="flex items-center gap-6 overflow-hidden">
          <Sparkline color="#22d3ee" delay={0.1} />
          <Sparkline color="#818cf8" delay={0.4} />
        </div>
        <div className="flex items-end justify-center">
          <CandlesRow delay={0.2} />
        </div>
        <div className="flex items-center gap-6 overflow-hidden">
          <Sparkline color="#34d399" delay={0.3} />
          <Sparkline color="#f59e0b" delay={0.6} />
        </div>
      </div>

      {/* Subtle grid to suggest market structure */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Gradient vignette to focus content */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Copy + CTA */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Fintweet — Markets, Sentiment, and AI</h2>
          <p className="text-sm md:text-base text-slate-300 mt-2">
            A focused trading workspace with real‑time trends, social sentiment, and AI‑powered signals. Track, compare, and act with confidence.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-300">
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5">Realtime trends</div>
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5">AI predictions</div>
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5">Sentiment heatmaps</div>
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5">Secure watchlists</div>
          </div>
        </div>
      </div>
    </section>
  )
}
