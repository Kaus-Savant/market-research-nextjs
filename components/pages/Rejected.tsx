'use client';

import { useDealContext } from '@/app/contexts/DealContext';

export default function Rejected() {
  const { deals } = useDealContext();
  const rej = deals.filter(d => d.status === 'Rejected');

  return (
    <div className="bg-white rounded-lg border border-slate-300 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-300">
        <h3 className="text-sm font-bold text-slate-900">✗ Rejected Deals (All stages tracked per SOP §4)</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Company</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Sector</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Rejected At</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Reason</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Alignment</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Date</th>
              <th className="px-6 py-3 text-left font-bold uppercase text-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            {rej.length > 0 ? (
              rej.map(d => (
                <tr key={d.id} className="border-b border-slate-200 hover:bg-slate-50 opacity-70">
                  <td className="px-6 py-3">
                    <div className="font-semibold text-slate-900">{d.company}</div>
                    <div className="text-xs text-slate-600">{d.founder}</div>
                  </td>
                  <td className="px-6 py-3 text-slate-700">{d.sector}</td>
                  <td className="px-6 py-3">
                    <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded">
                      {d.rejectedAt || 'Unknown stage'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-slate-700 text-xs">{d.rejectedReason || '—'}</td>
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
                  <td className="px-6 py-3 text-slate-700">{d.added}</td>
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
                  <div className="text-slate-500 text-sm">✗ No rejected deals.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
