'use client';

import { useDealContext } from '@/app/contexts/DealContext';

interface TopbarProps {
  title: string;
  subtitle: string;
  onAddDeal: () => void;
}

export default function Topbar({ title, subtitle, onAddDeal }: TopbarProps) {
  const { deals } = useDealContext();

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Company',
      'Founder',
      'Sector',
      'Co.Stage',
      'Geography',
      'Ask',
      'Source',
      'Owner',
      'Status',
      'Alignment',
      'AI Score',
      'Call Date',
      'PIN',
      'DDR',
      'IC Decision',
      'Added',
    ];
    const rows = deals.map(d => [
      d.dealId,
      d.company,
      d.founder,
      d.sector,
      d.cstage,
      d.geo,
      d.ask,
      d.source,
      d.owner,
      d.status,
      d.align || '',
      d.aiFit || '',
      d.callDate || '',
      d.pinGo || '',
      d.ddrDate ? 'Complete' : '',
      d.icDecision || '',
      d.added,
    ]);

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `silverx_deals_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border-b border-slate-300 px-7 h-14 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        <span className="text-sm text-slate-500">{subtitle}</span>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded-md hover:bg-slate-100 transition-colors"
        >
          ⬇ Export CSV
        </button>
        <button
          onClick={onAddDeal}
          className="px-4 py-2 text-sm font-semibold bg-slate-800 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          + Add New Deal
        </button>
      </div>
    </div>
  );
}
