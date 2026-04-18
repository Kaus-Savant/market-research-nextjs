'use client';

import { useState } from 'react';
import { useDealContext } from '@/app/contexts/DealContext';

export default function Deals() {
  const { deals } = useDealContext();
  const [search, setSearch] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [filterAlign, setFilterAlign] = useState('');

  const sectors = [...new Set(deals.map(d => d.sector))];

  const filtered = deals.filter(d => {
    if (search && !`${d.company} ${d.sector} ${d.founder}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStage && d.status !== filterStage) return false;
    if (filterSector && d.sector !== filterSector) return false;
    if (filterAlign && d.align !== filterAlign) return false;
    return true;
  });

  const docScore = (d: any) => {
    let total = 0,
      filled = 0;
    const checks = [d.summary, d.aiFit, d.callInsights, d.pinGo, d.ddrDate, d.icMemo];
    checks.forEach(c => {
      total++;
      if (c) filled++;
    });
    return `${filled}/${total}`;
  };

  const statusPill = (status: string) => {
    const colors: Record<string, string> = {
      'New Opportunity': 'bg-blue-100 text-blue-700',
      Screening: 'bg-purple-100 text-purple-700',
      'Due Diligence': 'bg-amber-100 text-amber-700',
      IC: 'bg-green-100 text-green-700',
      Invested: 'bg-emerald-100 text-emerald-700',
      Rejected: 'bg-slate-100 text-slate-700',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  };

  const alignmentPill = (align: string | undefined) => {
    if (!align) return null;
    const colors: Record<string, string> = {
      High: 'bg-green-100 text-green-700',
      Medium: 'bg-amber-100 text-amber-700',
      Low: 'bg-red-100 text-red-700',
    };
    return colors[align] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="🔍 Search company, sector, founder..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 max-w-xs"
        />
        <select
          value={filterStage}
          onChange={e => setFilterStage(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Stages</option>
          <option value="New Opportunity">New Opportunity</option>
          <option value="Screening">Screening</option>
          <option value="Due Diligence">Due Diligence</option>
          <option value="IC">IC</option>
          <option value="Invested">Invested</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          value={filterSector}
          onChange={e => setFilterSector(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Sectors</option>
          {sectors.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={filterAlign}
          onChange={e => setFilterAlign(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Alignment</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-bold uppercase text-xs">#</th>
                <th className="px-4 py-3 text-left font-bold uppercase text-xs">Company</th>
                <th className="px-4 py-3 text-left font-bold uppercase text-xs">Sector</th>
                <th className="px-4 py-3 text-left font-bold uppercase text-xs">Stage</th>
                <th className="px-4 py-3 text-left font-bold uppercase text-xs">Geography</th>
                <th className="px-4 py-3 text-left font-bold uppercase text-xs">Pipeline</th>
                <th className="px-4 py-3 text-left font-bold uppercase text-xs">Alignment</th>
                <th className="px-4 py-3 text-left font-bold uppercase text-xs">Docs</th>
                <th className="px-4 py-3 text-left font-bold uppercase text-xs">Owner</th>
                <th className="px-4 py-3 text-left font-bold uppercase text-xs">Added</th>
                <th className="px-4 py-3 text-left font-bold uppercase text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((deal, i) => (
                  <tr
                    key={deal.id}
                    className={`border-b border-slate-200 hover:bg-slate-50 ${
                      deal.status === 'Rejected' ? 'opacity-60' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-xs text-slate-600">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{deal.company}</div>
                      <div className="text-xs text-slate-600">{deal.founder}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{deal.sector}</td>
                    <td className="px-4 py-3">
                      <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">
                        {deal.cstage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{deal.geo}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs font-bold px-3 py-1 rounded ${statusPill(deal.status)}`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {deal.align ? (
                        <span className={`inline-block text-xs font-bold px-3 py-1 rounded ${alignmentPill(deal.align)}`}>
                          {deal.align}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{docScore(deal)}</td>
                    <td className="px-4 py-3 text-slate-700">{deal.owner}</td>
                    <td className="px-4 py-3 text-slate-700">{deal.added}</td>
                    <td className="px-4 py-3">
                      <button className="px-3 py-1 border border-slate-300 rounded text-xs font-semibold hover:bg-slate-100 transition">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="px-6 py-12 text-center">
                    <div className="text-slate-500 text-sm">🔍 No deals match filters.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
