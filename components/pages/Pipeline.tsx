'use client';

import { useDealContext } from '@/app/contexts/DealContext';

export default function Pipeline() {
  const { deals } = useDealContext();

  const stages = [
    { key: 'New Opportunity', label: 'New Opportunity', color: 'text-blue-600' },
    { key: 'Screening', label: 'Screening', color: 'text-purple-600' },
    { key: 'Due Diligence', label: 'Due Diligence', color: 'text-amber-600' },
    { key: 'IC', label: 'Inv. Committee', color: 'text-green-600' },
    { key: 'Rejected', label: 'Rejected', color: 'text-red-600' },
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {stages.map(stage => {
        const stageDeal = deals.filter(d => d.status === stage.key);
        return (
          <div key={stage.key} className="bg-slate-200 rounded-lg border border-slate-300">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-300 flex items-center justify-between">
              <span className={`text-sm font-bold uppercase tracking-wide ${stage.color}`}>
                {stage.label}
              </span>
              <span className="bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-full">
                {stageDeal.length}
              </span>
            </div>
            {/* Cards */}
            <div className="p-2 space-y-2 min-h-96">
              {stageDeal.length > 0 ? (
                stageDeal.map(deal => (
                  <div
                    key={deal.id}
                    className={`bg-white p-3 rounded-md border-l-4 cursor-pointer hover:shadow-md transition-all ${
                      deal.align === 'High'
                        ? 'border-green-500'
                        : deal.align === 'Medium'
                        ? 'border-amber-500'
                        : 'border-red-500'
                    }`}
                  >
                    <div className="font-semibold text-sm text-slate-900">{deal.company}</div>
                    <div className="text-xs text-slate-600 mt-1">
                      {deal.founder} · {deal.geo}
                    </div>
                    <div className="flex gap-1 flex-wrap mt-2">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">
                        {deal.sector}
                      </span>
                      <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded">
                        {deal.cstage}
                      </span>
                      {deal.align && (
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            deal.align === 'High'
                              ? 'bg-green-100 text-green-700'
                              : deal.align === 'Medium'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {deal.align}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 mt-2">
                      {deal.ask} · {deal.added}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-slate-500 text-sm">No deals</div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
