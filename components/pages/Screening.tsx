'use client';

import { useDealContext } from '@/app/contexts/DealContext';

export default function Screening() {
  const { deals } = useDealContext();
  const screen = deals.filter(d => ['Screening', 'New Opportunity'].includes(d.status));

  return (
    <div className="bg-white rounded-lg border border-slate-300 shadow-sm">
      {/* Warning */}
      <div className="bg-slate-100 border-b border-slate-300 px-6 py-4 flex gap-3">
        <span className="text-xl">🔍</span>
        <div className="text-sm text-slate-700">
          <strong>SOP §3 Stage 2:</strong> 3-step screening is mandatory before advancing to Due Diligence. Select a
          deal below to complete each step in sequence.
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Company</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Sector</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Stage</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">AI Screen</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Founder Call</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Team Call / PIN</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Owner</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            {screen.length > 0 ? (
              screen.map(d => (
                <tr key={d.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-3 font-semibold text-slate-900">{d.company}</td>
                  <td className="px-6 py-3 text-slate-700">{d.sector}</td>
                  <td className="px-6 py-3">
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">
                      {d.cstage}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {d.aiFit ? (
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded ${
                          d.aiFit === 'High'
                            ? 'bg-green-100 text-green-700'
                            : d.aiFit === 'Medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {d.aiFit}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    {d.callDate ? (
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded">Done</span>
                    ) : (
                      <span className="text-slate-500 text-xs">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    {d.pinGo ? (
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded ${
                          d.pinGo === 'Go'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {d.pinGo}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-slate-700">{d.owner}</td>
                  <td className="px-6 py-3 flex gap-1">
                    <button className="px-3 py-1 bg-slate-800 text-white rounded text-xs font-semibold hover:bg-blue-700 transition">
                      Screen →
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
                  <div className="text-slate-500 text-sm">✅ No deals in screening queue.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
