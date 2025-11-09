import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Metric({ label, value, highlight }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-zinc-500">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{value}</span>
    </div>
  );
}

export default function TrendingStocks({ watchlist, onToggleWatch }) {
  const [stocks, setStocks] = useState([
    { ticker: 'AAPL', open: 220.4, close: 222.1, volume: 53423121, change: 0.78 },
    { ticker: 'MSFT', open: 398.2, close: 402.5, volume: 22312312, change: 1.09 },
    { ticker: 'NVDA', open: 930.1, close: 921.8, volume: 45212211, change: -0.89 },
    { ticker: 'TSLA', open: 178.9, close: 181.6, volume: 81231121, change: 1.51 },
  ]);
  const [predictions, setPredictions] = useState({});

  useEffect(() => {
    async function fetchPreds() {
      try {
        const results = await Promise.all(
          stocks.map(async (s) => {
            const res = await fetch(`${API_BASE}/predict?ticker=${s.ticker}`);
            if (!res.ok) throw new Error('Network');
            const data = await res.json();
            return [s.ticker, data.predicted_close];
          })
        );
        setPredictions(Object.fromEntries(results));
      } catch (e) {
        // If backend not ready, fall back to simple heuristic display
        const fallback = Object.fromEntries(
          stocks.map((s) => [s.ticker, Number((s.close * (1 + s.change / 100)).toFixed(2))])
        );
        setPredictions(fallback);
      }
    }
    fetchPreds();
    const id = setInterval(fetchPreds, 60000);
    return () => clearInterval(id);
  }, [stocks]);

  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Trending Stocks</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stocks.map((s) => {
          const isWatched = watchlist.includes(s.ticker);
          return (
            <div key={s.ticker} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold">{s.ticker}</h3>
                  <p className={`text-xs mt-1 ${s.change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{s.change}% today</p>
                </div>
                <button
                  aria-label="Toggle watch"
                  className={`p-2 rounded-lg border transition-colors ${isWatched ? 'text-amber-500 border-amber-300/50 bg-amber-50 dark:bg-amber-500/10' : 'text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
                  onClick={() => onToggleWatch(s.ticker)}
                >
                  <Star size={16} fill={isWatched ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Metric label="Open" value={`$${s.open.toFixed(2)}`} />
                <Metric label="Close" value={`$${s.close.toFixed(2)}`} />
                <Metric label="Volume" value={s.volume.toLocaleString()} />
                <Metric label="AI Next Close" value={`$${(predictions[s.ticker] ?? '—')}`} highlight />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
