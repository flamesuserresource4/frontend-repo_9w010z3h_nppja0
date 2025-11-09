import { useEffect, useState, useMemo } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  TimeSeriesScale,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, TimeSeriesScale)

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ChartsPanel({ ticker }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!ticker) return
    let active = true
    async function load() {
      setLoading(true)
      try {
        const res = await fetch(`${BACKEND}/history?ticker=${ticker}`)
        const d = await res.json()
        if (active) setData(d)
      } catch (e) { console.error(e) }
      finally { if (active) setLoading(false) }
    }
    load()
    const id = setInterval(load, 60_000)
    return () => { active = false; clearInterval(id) }
  }, [ticker])

  const priceConfig = useMemo(() => {
    if (!data) return null
    return {
      labels: data.prices.map(p => p.date),
      datasets: [{
        label: `${data.ticker} Close`,
        data: data.prices.map(p => p.close),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.2)',
        tension: 0.3,
        pointRadius: 0
      }]
    }
  }, [data])

  const sentConfig = useMemo(() => {
    if (!data) return null
    return {
      labels: data.sentiment.map(s => s.date),
      datasets: [
        { label: 'Positive', data: data.sentiment.map(s => s.positive), backgroundColor: 'rgba(16,185,129,0.6)' },
        { label: 'Neutral', data: data.sentiment.map(s => s.neutral), backgroundColor: 'rgba(148,163,184,0.6)' },
        { label: 'Negative', data: data.sentiment.map(s => s.negative), backgroundColor: 'rgba(244,63,94,0.6)' },
      ]
    }
  }, [data])

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur rounded-xl border border-slate-200/60 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Price History</h3>
          <span className="text-sm text-slate-500">{ticker}</span>
        </div>
        {loading && <p className="text-sm text-slate-500">Loading…</p>}
        {priceConfig && <Line data={priceConfig} options={{ responsive: true, maintainAspectRatio: false }} height={220} />}
      </div>
      <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur rounded-xl border border-slate-200/60 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Sentiment</h3>
          <span className="text-sm text-slate-500">{ticker}</span>
        </div>
        {sentConfig && <Bar data={sentConfig} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} height={220} />}
      </div>
    </div>
  )
}
