import { useEffect, useState } from 'react'
import HomeHeader from './components/HomeHeader'
import AuthHero from './components/AuthHero'
import FeatureGrid from './components/FeatureGrid'
import AuthModal from './components/AuthModal'

export default function App() {
  const [dark, setDark] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('fintweet-theme')
    if (saved) setDark(saved === 'dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('fintweet-theme', dark ? 'dark' : 'light')
  }, [dark])

  const openLogin = () => { setAuthMode('login'); setAuthOpen(true) }
  const openSignup = () => { setAuthMode('signup'); setAuthOpen(true) }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <HomeHeader dark={dark} onToggleTheme={() => setDark(v => !v)} onLogin={openLogin} onSignup={openSignup} />

        <AuthHero />

        <section className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur">
              <h2 className="text-xl font-semibold">A smarter home for your investing</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Fintweet blends live market data with AI-powered sentiment and predictions, so you can spot trends early and act with confidence.
                Create an account to save a watchlist, sync preferences, and unlock richer insights.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={openSignup} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700">Get started free</button>
                <button onClick={openLogin} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50">I already have an account</button>
              </div>
            </div>

            <FeatureGrid />
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-gradient-to-br from-indigo-600/10 to-sky-500/10">
              <h3 className="font-medium">Your account</h3>
              {user ? (
                <div className="mt-2 text-sm">
                  <p>Signed in as <span className="font-medium">{user.name}</span></p>
                  <p className="text-slate-600 dark:text-slate-300">{user.email}</p>
                  <button onClick={() => setUser(null)} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50">Sign out</button>
                </div>
              ) : (
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  <p>Create an account to save your watchlist and personalize your dashboard.</p>
                  <div className="mt-3 flex gap-2">
                    <button onClick={openSignup} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-3 py-2 text-sm hover:bg-indigo-700">Sign up</button>
                    <button onClick={openLogin} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50">Log in</button>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="font-medium">Why Fintweet?</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
                <li>Clean UI with dark mode</li>
                <li>Auto-refreshing market data</li>
                <li>AI-driven predictions and sentiment</li>
                <li>Secure and privacy-minded</li>
              </ul>
            </div>
          </aside>
        </section>

        <footer className="text-center text-xs text-slate-500 pt-6">
          © {new Date().getFullYear()} Fintweet • Finance x Sentiment x AI
        </footer>
      </div>

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSuccess={(u) => setUser(u)}
      />
    </div>
  )
}
