'use client';

import { useDealContext } from '@/app/contexts/DealContext';

export default function Dashboard() {
  const { deals } = useDealContext();

  const total = deals.length;
  const screened = deals.filter(d => !['New Opportunity'].includes(d.status)).length;
  const dd = deals.filter(d => d.status === 'Due Diligence').length;
  const ic = deals.filter(d => d.status === 'IC').length;
  const invested = deals.filter(d => d.status === 'Invested').length;
  const rejected = deals.filter(d => d.status === 'Rejected').length;

  const KPICard = ({ value, label, variant = 'default' }: any) => {
    const colors = {
      default: 'text-slate-900',
      blue: 'text-blue-600',
      yellow: 'text-amber-600',
      green: 'text-green-600',
      red: 'text-red-600',
    };
    return (
      <div className="bg-white rounded-lg p-4 border border-slate-300 text-center shadow-sm">
        <div className={`text-2xl font-bold ${colors[variant as keyof typeof colors]}`}>{value}</div>
        <div className="text-xs uppercase tracking-wide text-slate-600 mt-1">{label}</div>
      </div>
    );
  };

  const funnelStages = [
    { label: 'Sourced', value: total, cls: 'bg-blue-600', percent: 100 },
    { label: 'Screened', value: screened, cls: 'bg-purple-600', percent: total > 0 ? (screened / total) * 100 : 0 },
    { label: 'Diligence', value: dd, cls: 'bg-amber-600', percent: total > 0 ? (dd / total) * 100 : 0 },
    { label: 'IC', value: ic, cls: 'bg-green-600', percent: total > 0 ? (ic / total) * 100 : 0 },
    { label: 'Rejected', value: rejected, cls: 'bg-red-600', percent: total > 0 ? (rejected / total) * 100 : 0 },
  ];

  const recent = [...deals].sort((a, b) => b.added.localeCompare(a.added)).slice(0, 6);

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
    <div className="space-y-6">
      {/* KPI Strip */}
      <div className="grid grid-cols-6 gap-4">
        <KPICard value={total} label="Total Sourced" />
        <KPICard value={screened} label="Screened" variant="blue" />
        <KPICard value={dd} label="In Diligence" variant="yellow" />
        <KPICard value={ic} label="In IC" variant="yellow" />
        <KPICard value={invested} label="Invested" variant="green" />
        <KPICard value={rejected} label="Rejected" variant="red" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Funnel */}
        <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">📉 Pipeline Funnel</h3>
          <div className="space-y-3">
            {funnelStages.map((stage, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{stage.label}</span>
                  <span className="text-xs font-semibold text-slate-600">{stage.value}</span>
                </div>
                <div className="w-full bg-slate-200 rounded h-2 overflow-hidden">
                  <div
                    className={`${stage.cls} h-full transition-all`}
                    style={{ width: `${Math.max(stage.percent, 8)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Breakdown */}
        <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">📂 Stage Breakdown</h3>
          <div className="space-y-2">
            {[
              { label: 'New Opportunity', count: deals.filter(d => d.status === 'New Opportunity').length, bg: 'bg-blue-100', text: 'text-blue-700' },
              { label: 'Screening', count: deals.filter(d => d.status === 'Screening').length, bg: 'bg-purple-100', text: 'text-purple-700' },
              { label: 'Due Diligence', count: deals.filter(d => d.status === 'Due Diligence').length, bg: 'bg-amber-100', text: 'text-amber-700' },
              { label: 'IC', count: deals.filter(d => d.status === 'IC').length, bg: 'bg-green-100', text: 'text-green-700' },
              { label: 'Invested', count: deals.filter(d => d.status === 'Invested').length, bg: 'bg-emerald-100', text: 'text-emerald-700' },
              { label: 'Rejected', count: deals.filter(d => d.status === 'Rejected').length, bg: 'bg-slate-100', text: 'text-slate-700' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0">
                <span className="text-sm text-slate-700">{item.label}</span>
                <span className={`${item.bg} ${item.text} text-xs font-bold px-3 py-1 rounded-full`}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-slate-300 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-300 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">🕐 Recent Activity</h3>
          <a href="#" className="text-sm text-slate-600 hover:text-slate-900 font-semibold">
            View All →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-bold uppercase text-xs">Company</th>
                <th className="px-6 py-3 text-left font-bold uppercase text-xs">Sector</th>
                <th className="px-6 py-3 text-left font-bold uppercase text-xs">Stage/Geo</th>
                <th className="px-6 py-3 text-left font-bold uppercase text-xs">Pipeline</th>
                <th className="px-6 py-3 text-left font-bold uppercase text-xs">Alignment</th>
                <th className="px-6 py-3 text-left font-bold uppercase text-xs">Owner</th>
                <th className="px-6 py-3 text-left font-bold uppercase text-xs">Added</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(deal => (
                <tr key={deal.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-3 font-semibold text-slate-900">{deal.company}</td>
                  <td className="px-6 py-3 text-slate-700">{deal.sector}</td>
                  <td className="px-6 py-3">
                    <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded mr-2">
                      {deal.cstage}
                    </span>
                    <span className="text-xs text-slate-600">{deal.geo}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded ${statusPill(deal.status)}`}>
                      {deal.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {deal.align ? (
                      <span className={`inline-block text-xs font-bold px-3 py-1 rounded ${alignmentPill(deal.align)}`}>
                        {deal.align}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-6 py-3 text-slate-700">{deal.owner}</td>
                  <td className="px-6 py-3 text-slate-700">{deal.added}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
