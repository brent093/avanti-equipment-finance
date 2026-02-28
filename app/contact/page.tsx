'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const { error } = await supabase.from('contact_messages').insert([form])
      if (error) throw error
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full px-4 py-3 bg-surface-50 border border-surface-300 rounded-xl text-sm text-brand-black placeholder:text-slate-400 transition-all hover:border-surface-300 focus:border-brand-steel focus:ring-2 focus:ring-brand-steel/10'

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-surface-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-steel mb-4">
                Get in Touch
              </p>
              <h1 className="font-display text-4xl sm:text-5xl text-brand-black mb-6">
                Let&apos;s Talk <span className="italic text-brand-steel">Financing</span>
              </h1>
              <p className="text-slate-500 leading-relaxed mb-12 max-w-md">
                Have questions about equipment financing? Ready to get started? Reach
                out and we&apos;ll get back to you quickly.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Phone,
                    label: 'Call Us',
                    values: ['Office: (617) 843-5612', 'Direct: (603) 459-9731'],
                  },
                  {
                    icon: Mail,
                    label: 'Email',
                    values: ['brent@avantiequipfi.com'],
                  },
                  {
                    icon: MapPin,
                    label: 'Location',
                    values: ['New Hampshire'],
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-steel/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-brand-steel" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-black text-sm mb-1">{item.label}</p>
                      {item.values.map((v, j) => (
                        <p key={j} className="text-sm text-slate-500">{v}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white rounded-2xl border border-surface-200 p-8 lg:p-10 h-fit">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-brand-black mb-2">Message Sent!</h3>
                  <p className="text-sm text-slate-500">We&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className={inputCls}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        className={inputCls}
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        className={inputCls}
                        placeholder="(555) 555-5555"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      className={inputCls}
                      placeholder="Tell us about your equipment financing needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-steel text-white font-semibold rounded-xl hover:bg-brand-steel-dark transition-all hover:shadow-lg hover:shadow-brand-steel/20 disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                  {status === 'error' && (
                    <p className="text-sm text-red-500 text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
