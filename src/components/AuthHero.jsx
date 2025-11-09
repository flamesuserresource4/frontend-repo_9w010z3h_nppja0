import Spline from '@splinetool/react-spline'

export default function AuthHero() {
  return (
    <section className="relative h-[460px] w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-black">
      <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Fintweet — Markets, Sentiment, and AI</h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
          A sleek dashboard for tracking stocks with real‑time trends, social sentiment, and AI‑powered predictions. Explore the data, build a watchlist, and act with confidence.
        </p>
      </div>
    </section>
  )
}
