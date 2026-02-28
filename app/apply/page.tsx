'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface FormData {
  // Business Info
  business_name: string
  dba: string
  business_address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  federal_tax_id: string
  years_in_business: string
  entity_type: string
  // Owner Info
  owner_name: string
  owner_title: string
  owner_ssn: string
  owner_dob: string
  owner_address: string
  owner_phone: string
  owner_email: string
  ownership_pct: string
  // Equipment Info
  equipment_description: string
  equipment_cost: string
  vendor_name: string
  // Financing
  amount_requested: string
  term_requested: string
  additional_info: string
}

const initialForm: FormData = {
  business_name: '', dba: '', business_address: '', city: '', state: '', zip: '',
  phone: '', email: '', federal_tax_id: '', years_in_business: '', entity_type: '',
  owner_name: '', owner_title: '', owner_ssn: '', owner_dob: '', owner_address: '',
  owner_phone: '', owner_email: '', ownership_pct: '',
  equipment_description: '', equipment_cost: '', vendor_name: '',
  amount_requested: '', term_requested: '', additional_info: '',
}

export default function ApplyPage() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const { error } = await supabase.from('applications').insert([form])
      if (error) throw error
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full px-4 py-3 bg-surface-50 border border-surface-300 rounded-xl text-sm text-brand-black placeholder:text-slate-400 transition-all hover:border-surface-300 focus:border-brand-steel focus:ring-2 focus:ring-brand-steel/10'

  if (status === 'success') {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-24 bg-surface-50 min-h-screen">
          <div className="max-w-xl mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-display text-4xl text-brand-black mb-4">
              Application Submitted!
            </h1>
            <p className="text-slate-500 leading-relaxed mb-8">
              Thank you for applying. Our team will review your application and
              get back to you within 24 hours.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-steel text-white font-semibold rounded-xl hover:bg-brand-steel-dark transition-all"
            >
              Back to Home
            </a>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-surface-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-steel mb-4">
              Credit Application
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-brand-black mb-4">
              Apply for <span className="italic text-brand-steel">Financing</span>
            </h1>
            <p className="text-slate-500 leading-relaxed max-w-2xl">
              Complete the form below and our team will review your application.
              Most decisions are made within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Business Info */}
            <section className="bg-white rounded-2xl border border-surface-200 p-8">
              <h2 className="font-semibold text-lg text-brand-black mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-steel/10 text-brand-steel text-sm font-bold flex items-center justify-center">
                  1
                </span>
                Business Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Legal Business Name *
                  </label>
                  <input name="business_name" required value={form.business_name} onChange={handleChange} className={inputCls} placeholder="ABC Company, LLC" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">DBA</label>
                  <input name="dba" value={form.dba} onChange={handleChange} className={inputCls} placeholder="Doing business as" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Entity Type</label>
                  <select name="entity_type" value={form.entity_type} onChange={handleChange} className={inputCls}>
                    <option value="">Select...</option>
                    <option>LLC</option>
                    <option>Corporation</option>
                    <option>S-Corp</option>
                    <option>Sole Proprietor</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Business Address *</label>
                  <input name="business_address" required value={form.business_address} onChange={handleChange} className={inputCls} placeholder="123 Main St" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">City *</label>
                  <input name="city" required value={form.city} onChange={handleChange} className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">State *</label>
                    <input name="state" required value={form.state} onChange={handleChange} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">ZIP *</label>
                    <input name="zip" required value={form.zip} onChange={handleChange} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Phone *</label>
                  <input name="phone" required type="tel" value={form.phone} onChange={handleChange} className={inputCls} placeholder="(555) 555-5555" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Email *</label>
                  <input name="email" required type="email" value={form.email} onChange={handleChange} className={inputCls} placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Federal Tax ID (EIN)</label>
                  <input name="federal_tax_id" value={form.federal_tax_id} onChange={handleChange} className={inputCls} placeholder="XX-XXXXXXX" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Years in Business</label>
                  <input name="years_in_business" value={form.years_in_business} onChange={handleChange} className={inputCls} placeholder="e.g. 5" />
                </div>
              </div>
            </section>

            {/* Owner Info */}
            <section className="bg-white rounded-2xl border border-surface-200 p-8">
              <h2 className="font-semibold text-lg text-brand-black mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-steel/10 text-brand-steel text-sm font-bold flex items-center justify-center">
                  2
                </span>
                Owner / Guarantor Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Full Name *</label>
                  <input name="owner_name" required value={form.owner_name} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Title</label>
                  <input name="owner_title" value={form.owner_title} onChange={handleChange} className={inputCls} placeholder="CEO, Owner, etc." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">SSN</label>
                  <input name="owner_ssn" type="password" value={form.owner_ssn} onChange={handleChange} className={inputCls} placeholder="XXX-XX-XXXX" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Date of Birth</label>
                  <input name="owner_dob" type="date" value={form.owner_dob} onChange={handleChange} className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Home Address</label>
                  <input name="owner_address" value={form.owner_address} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Phone</label>
                  <input name="owner_phone" type="tel" value={form.owner_phone} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Email</label>
                  <input name="owner_email" type="email" value={form.owner_email} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">% Ownership</label>
                  <input name="ownership_pct" value={form.ownership_pct} onChange={handleChange} className={inputCls} placeholder="e.g. 100" />
                </div>
              </div>
            </section>

            {/* Equipment & Financing */}
            <section className="bg-white rounded-2xl border border-surface-200 p-8">
              <h2 className="font-semibold text-lg text-brand-black mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-steel/10 text-brand-steel text-sm font-bold flex items-center justify-center">
                  3
                </span>
                Equipment & Financing Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Equipment Description *
                  </label>
                  <textarea
                    name="equipment_description"
                    required
                    value={form.equipment_description}
                    onChange={handleChange}
                    rows={3}
                    className={inputCls}
                    placeholder="e.g. 2024 CAT 320 Excavator, John Deere 8R Tractor..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Equipment Cost *</label>
                  <input name="equipment_cost" required value={form.equipment_cost} onChange={handleChange} className={inputCls} placeholder="$0.00" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Vendor / Dealer Name</label>
                  <input name="vendor_name" value={form.vendor_name} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Amount Requested</label>
                  <input name="amount_requested" value={form.amount_requested} onChange={handleChange} className={inputCls} placeholder="$0.00" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Preferred Term</label>
                  <select name="term_requested" value={form.term_requested} onChange={handleChange} className={inputCls}>
                    <option value="">Select...</option>
                    <option>24 months</option>
                    <option>36 months</option>
                    <option>48 months</option>
                    <option>60 months</option>
                    <option>72 months</option>
                    <option>84 months</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Additional Information</label>
                  <textarea
                    name="additional_info"
                    value={form.additional_info}
                    onChange={handleChange}
                    rows={3}
                    className={inputCls}
                    placeholder="Any other details that may help with your application..."
                  />
                </div>
              </div>
            </section>

            {/* Authorization */}
            <section className="bg-white rounded-2xl border border-surface-200 p-8">
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                By submitting this application, I certify that the information provided is
                true and accurate. I authorize Avanti Equipment Finance, LLC, or its
                designees, to obtain any information from business or consumer reporting
                agencies for the purpose of evaluating this credit application.
              </p>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-steel text-white font-semibold rounded-xl hover:bg-brand-steel-dark transition-all hover:shadow-lg hover:shadow-brand-steel/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Application
                  </>
                )}
              </button>
              {status === 'error' && (
                <p className="mt-4 text-sm text-red-500">
                  Something went wrong. Please try again or call us directly.
                </p>
              )}
            </section>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
