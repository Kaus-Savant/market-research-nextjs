'use client';

import { useDealContext } from '@/app/contexts/DealContext';

export default function Invested() {
  const { deals } = useDealContext();
  const inv = deals.filter(d => d.status === 'Invested');

  return (
    <div className="bg-white rounded-lg border border-slate-300 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-300">
        <h3 className="text-sm font-bold text-slate-900">✅ Invested Portfolio</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Company</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Sector</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Stage</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Ask</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Geography</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Date Invested</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            {inv.length > 0 ? (
              inv.map(d => (
                <tr key={d.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-3">
                    <div className="font-semibold text-slate-900">{d.company}</div>
                    <div className="text-xs text-slate-600">{d.founder}</div>
                  </td>
                  <td className="px-6 py-3 text-slate-700">{d.sector}</td>
                  <td className="px-6 py-3">
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">
                      {d.cstage}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-slate-700">{d.ask}</td>
                  <td className="px-6 py-3 text-slate-700">{d.geo}</td>
                  <td className="px-6 py-3 text-slate-700">{d.icDate || d.added}</td>
                  <td className="px-6 py-3">
                    <button className="px-3 py-1 border border-slate-300 rounded text-xs font-semibold hover:bg-slate-100 transition">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="text-slate-500 text-sm">✅ No investments yet.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
