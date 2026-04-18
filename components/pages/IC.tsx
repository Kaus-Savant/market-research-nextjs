'use client';

import { useDealContext } from '@/app/contexts/DealContext';

export default function IC() {
  const { deals } = useDealContext();
  const ic = deals.filter(d => d.status === 'IC');

  return (
    <div className="bg-white rounded-lg border border-slate-300 shadow-sm">
      {/* Warning */}
      <div className="bg-slate-100 border-b border-slate-300 px-6 py-4 flex gap-3">
        <span className="text-xl">⚖️</span>
        <div className="text-sm text-slate-700">
          <strong>SOP §3 Stage 4:</strong> Investment Committee requires IC Memo. Output: Term Sheet OR
          Rejection/Defer Note. Owner: Partner.
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Company</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Sector</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Ask</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Alignment</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">IC Memo</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">IC Decision</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Owner</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            {ic.length > 0 ? (
              ic.map(d => (
                <tr key={d.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-3 font-semibold text-slate-900">{d.company}</td>
                  <td className="px-6 py-3 text-slate-700">{d.sector}</td>
                  <td className="px-6 py-3 text-slate-700">{d.ask}</td>
                  <td className="px-6 py-3">
                    {d.align ? (
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded ${
                          d.align === 'High'
                            ? 'bg-green-100 text-green-700'
                            : d.align === 'Medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {d.align}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-6 py-3">
                    {d.icMemo ? (
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded">Ready</span>
                    ) : (
                      <span className="text-amber-600 font-semibold text-xs">⚠ Missing</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    {d.icDecision ? (
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded ${
                          d.icDecision === 'Term Sheet'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {d.icDecision}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-slate-700">{d.owner}</td>
                  <td className="px-6 py-3 flex gap-2">
                    <button className="px-3 py-1 bg-slate-800 text-white rounded text-xs font-semibold hover:bg-blue-700 transition">
                      IC Decision
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200 transition">
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center">
                  <div className="text-slate-500 text-sm">⚖️ No deals awaiting IC.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
