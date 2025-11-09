import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[360px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative h-full flex flex-col items-start justify-end p-8 text-white/90">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Fintweet</h1>
        <p className="mt-2 max-w-xl text-sm md:text-base text-white/80">
          Financial sentiment and stock tracking dashboard with AI-driven next-day price predictions.
        </p>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent" />
      </div>
    </section>
  );
}
