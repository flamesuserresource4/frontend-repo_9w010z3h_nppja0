import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Watchlist({ onSelect }) {
  const [items, setItems] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BACKEND}/watchlist`)
        const data = await res.json()
        setItems(data.tickers || [])
      } catch (e) { console.error(e) }
    }
    load()
  }, [])

  async function toggle(ticker) {
    try {
      const res = await fetch(`${BACKEND}/watchlist?ticker=${ticker}`, { method: 'POST' })
      const data = await res.json()
      setItems(data.tickers || [])
    } catch (e) { console.error(e) }
  }

  function onAdd(e) {
    e.preventDefault()
    const t = input.trim().toUpperCase()
    if (!t) return
    toggle(t)
    setInput('')
  }

  return (
    <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur rounded-xl border border-slate-200/60 dark:border-slate-800 p-4">
      <h3 className="font-semibold mb-3">Watchlist</h3>
      <form onSubmit={onAdd} className="flex gap-2 mb-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add ticker e.g. AAPL" className="flex-1 px-3 py-2 rounded-md border bg-white/60 dark:bg-slate-900/50" />
        <button className="px-3 py-2 rounded-md bg-indigo-600 text-white">Add</button>
      </form>
      <ul className="space-y-2">
        {items.length === 0 && <li className="text-sm text-slate-500">No tickers yet</li>}
        {items.map(t => (
          <li key={t} className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-800/50">
            <button onClick={() => onSelect(t)} className="font-medium hover:underline">{t}</button>
            <button onClick={() => toggle(t)} className="text-yellow-500"><Star size={18} fill="currentColor" /></button>
          </li>
        ))}
      </ul>
    </div>
  )
}
