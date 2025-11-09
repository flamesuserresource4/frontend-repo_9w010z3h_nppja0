import Spline from '@splinetool/react-spline'

export default function AuthHero() {
  return (
    <section className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
      <Spline scene="https://prod.spline.design/6z5k3F0n7OeW3xss/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h2 className="text-2xl font-semibold">Welcome to Fintweet</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Track markets, gauge sentiment, and make informed moves with AI.</p>
      </div>
    </section>
  )
}
