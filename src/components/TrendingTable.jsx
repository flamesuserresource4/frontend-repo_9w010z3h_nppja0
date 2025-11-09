import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function TrendingTable({ onSelect, watchlist, toggleWatch }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const res = await fetch(`${BACKEND}/trending`)
        const data = await res.json()
        if (active) setRows(data)
      } catch (e) {
        console.error(e)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    const id = setInterval(load, 60_000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  return (
    <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur rounded-xl border border-slate-200/60 dark:border-slate-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
        <h2 className="font-semibold">Trending Stocks</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500">
            <tr>
              <th className="text-left px-4 py-2">Watch</th>
              <th className="text-left px-4 py-2">Ticker</th>
              <th className="text-right px-4 py-2">Open</th>
              <th className="text-right px-4 py-2">Close</th>
              <th className="text-right px-4 py-2">Volume</th>
              <th className="text-right px-4 py-2">% Change</th>
              <th className="text-right px-4 py-2">AI Next Close</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-6" colSpan={7}>Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="px-4 py-6" colSpan={7}>No data</td></tr>
            ) : (
              rows.map((r) => (
                <Row key={r.ticker} row={r} onSelect={onSelect} watched={watchlist.includes(r.ticker)} toggleWatch={toggleWatch} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Row({ row, onSelect, watched, toggleWatch }) {
  const [pred, setPred] = useState(null)

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const res = await fetch(`${BACKEND}/predict?ticker=${row.ticker}`)
        const data = await res.json()
        if (active) setPred(data)
      } catch (e) { console.error(e) }
    }
    load()
    return () => { active = false }
  }, [row.ticker])

  const pctClass = row.percent_change >= 0 ? 'text-emerald-600' : 'text-rose-600'

  return (
    <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
      <td className="px-4 py-2">
        <button onClick={() => toggleWatch(row.ticker)} className={`p-1 rounded hover:scale-105 transition ${watched ? 'text-yellow-500' : 'text-slate-400'}`} aria-label="Toggle watch">
          <Star size={18} fill={watched ? 'currentColor' : 'none'} />
        </button>
      </td>
      <td className="px-4 py-2 font-medium">
        <button onClick={() => onSelect(row.ticker)} className="hover:underline">{row.ticker}</button>
      </td>
      <td className="px-4 py-2 text-right">{Number(row.open).toFixed(2)}</td>
      <td className="px-4 py-2 text-right">{Number(row.close).toFixed(2)}</td>
      <td className="px-4 py-2 text-right">{Intl.NumberFormat().format(row.volume)}</td>
      <td className={`px-4 py-2 text-right font-medium ${pctClass}`}>{row.percent_change.toFixed(2)}%</td>
      <td className="px-4 py-2 text-right">{pred ? pred.predicted_close.toFixed(2) : '—'}</td>
    </tr>
  )
}
