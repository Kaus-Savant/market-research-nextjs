'use client';

import { useState } from 'react';
import { useDealContext } from '@/app/contexts/DealContext';

interface NewDealProps {
  onSuccess?: () => void;
}

export default function NewDeal({ onSuccess }: NewDealProps) {
  const { deals } = useDealContext();
  const [formData, setFormData] = useState({
    company: '',
    founder: '',
    sector: '',
    cstage: '',
    geo: '',
    ask: '',
    source: '',
    owner: '',
    url: '',
    summary: '',
    notes: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.company ||
      !formData.founder ||
      !formData.sector ||
      !formData.cstage ||
      !formData.geo ||
      !formData.ask ||
      !formData.source ||
      !formData.owner ||
      !formData.summary
    ) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      const newDealId = 'D' + String(deals.length + 1).padStart(3, '0');
      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          dealId: newDealId,
          status: 'New Opportunity',
          added: new Date().toISOString().split('T')[0],
        }),
      });

      if (response.ok) {
        (window as any).showToast?.(`Deal "${formData.company}" logged successfully! ✅`, 'success');
        setFormData({
          company: '',
          founder: '',
          sector: '',
          cstage: '',
          geo: '',
          ask: '',
          source: '',
          owner: '',
          url: '',
          summary: '',
          notes: '',
        });
        onSuccess?.();
      }
    } catch (error) {
      console.error('Error creating deal:', error);
      alert('Failed to create deal');
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-4">➕ Log New Opportunity</h3>

        {/* SOP Warning */}
        <div className="bg-amber-50 border border-yellow-300 rounded-lg p-4 mb-6 flex gap-3">
          <span className="text-xl">⚠️</span>
          <div className="text-sm text-amber-900">
            <strong>SOP Requirement:</strong> 100% of deals must be logged before any evaluation. Complete all required
            fields to create a Deal Entry Record.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">
                Company Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. AcmeTech Pvt Ltd"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">
                Founder Name(s) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="founder"
                value={formData.founder}
                onChange={handleChange}
                placeholder="e.g. Ananya Sharma"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">
                Sector <span className="text-red-600">*</span>
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select sector</option>
                <option>HealthTech</option>
                <option>FinTech</option>
                <option>EdTech</option>
                <option>AgriTech</option>
                <option>CleanTech</option>
                <option>DeepTech / AI</option>
                <option>SaaS / B2B</option>
                <option>Consumer</option>
                <option>Logistics</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">
                Company Stage <span className="text-red-600">*</span>
              </label>
              <select
                name="cstage"
                value={formData.cstage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select stage</option>
                <option>Pre-Seed</option>
                <option>Seed</option>
                <option>Series A</option>
                <option>Series B</option>
                <option>Series C+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">
                Geography <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="geo"
                value={formData.geo}
                onChange={handleChange}
                placeholder="e.g. India – Bengaluru"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">
                Ask (₹ / $) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="ask"
                value={formData.ask}
                onChange={handleChange}
                placeholder="e.g. ₹5 Cr / $600K"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">
                Source <span className="text-red-600">*</span>
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option>Inbound – Email</option>
                <option>Inbound – Platform</option>
                <option>Referral – Founder</option>
                <option>Referral – LP</option>
                <option>Outbound – Event</option>
                <option>Outbound – Network</option>
              </select>
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">
                Assigned Associate <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                placeholder="e.g. Priya Mehta"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">Website / LinkedIn</label>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 5 */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">
              Pitch Deck / Intro Summary <span className="text-red-600">*</span>
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Paste a brief summary of the pitch deck or intro email..."
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-600 mt-1">This constitutes the Deal Entry Record (SOP §3 Stage 1)</p>
          </div>

          {/* Row 6 */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">Initial Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any initial observations..."
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-slate-800 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
            >
              ✅ Log Deal & Enter Pipeline
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  company: '',
                  founder: '',
                  sector: '',
                  cstage: '',
                  geo: '',
                  ask: '',
                  source: '',
                  owner: '',
                  url: '',
                  summary: '',
                  notes: '',
                })
              }
              className="px-6 py-2 border border-slate-300 rounded-md text-sm font-semibold hover:bg-slate-100 transition"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
