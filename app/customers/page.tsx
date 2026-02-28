'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  FileText,
  DollarSign,
  Calendar,
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface Application {
  id: string
  equipment_description: string
  equipment_cost: string
  amount_requested: string
  term_requested: string
  status: string
  created_at: string
  monthly_payment?: string
}

export default function CustomerPortal() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      const { data } = await supabase
        .from('applications')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false })

      setApps(data || [])
      setLoading(false)
    }
    init()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const statusBadge = (status: string) => {
    const map: Record<string, { cls: string; icon: React.ReactNode }> = {
      approved: {
        cls: 'bg-green-50 text-green-700 border-green-200',
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      },
      pending: {
        cls: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: <Clock className="w-3.5 h-3.5" />,
      },
      declined: {
        cls: 'bg-red-50 text-red-600 border-red-200',
        icon: <AlertCircle className="w-3.5 h-3.5" />,
      },
      funded: {
        cls: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: <DollarSign className="w-3.5 h-3.5" />,
      },
    }
    const s = map[status] || map.pending
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${s.cls}`}>
        {s.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-surface-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-steel mb-1">
                Customer Portal
              </p>
              <h1 className="font-display text-3xl text-brand-black">
                Your Applications
              </h1>
            </div>
            <div className="flex gap-3">
              <a
                href="/apply"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-steel text-white text-sm font-semibold rounded-xl hover:bg-brand-steel-dark transition-all"
              >
                New Application
              </a>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-surface-300 text-slate-500 text-sm font-medium rounded-xl hover:bg-white transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Applications */}
          {loading ? (
            <div className="bg-white rounded-2xl border border-surface-200 p-12 text-center text-slate-400">
              Loading your applications...
            </div>
          ) : apps.length === 0 ? (
            <div className="bg-white rounded-2xl border border-surface-200 p-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-semibold text-brand-black mb-2">No Applications Yet</h3>
              <p className="text-sm text-slate-400 mb-6">Submit a credit application to get started.</p>
              <a
                href="/apply"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-steel text-white text-sm font-semibold rounded-xl hover:bg-brand-steel-dark transition-all"
              >
                Apply Now
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-surface-200 p-6 hover:shadow-md hover:border-brand-steel/20 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-steel/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-brand-steel" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-black text-sm">
                          {app.equipment_description || 'Equipment Financing'}
                        </h3>
                        <p className="text-xs text-slate-400">
                          Submitted {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {statusBadge(app.status)}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: DollarSign, label: 'Amount', value: app.amount_requested || '—' },
                      { icon: DollarSign, label: 'Equipment Cost', value: app.equipment_cost || '—' },
                      { icon: Calendar, label: 'Term', value: app.term_requested || '—' },
                      { icon: DollarSign, label: 'Payment', value: app.monthly_payment || 'TBD' },
                    ].map((item, i) => (
                      <div key={i} className="bg-surface-50 rounded-lg p-3">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium text-brand-black">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {app.status === 'approved' && (
                    <div className="mt-4 pt-4 border-t border-surface-200">
                      <button className="inline-flex items-center gap-2 text-sm text-brand-steel hover:text-brand-steel-dark font-medium transition-colors">
                        <Download className="w-4 h-4" />
                        Download Approval Letter
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
