'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  FileText,
  Users,
  TrendingUp,
  Plus,
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface Deal {
  id: string
  business_name: string
  equipment_description: string
  amount_requested: string
  status: string
  created_at: string
}

export default function DealerPortal() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)

      const { data } = await supabase
        .from('deals')
        .select('*')
        .eq('dealer_id', user.id)
        .order('created_at', { ascending: false })

      setDeals(data || [])
      setLoading(false)
    }
    init()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const filteredDeals = deals.filter(
    (d) =>
      d.business_name?.toLowerCase().includes(search.toLowerCase()) ||
      d.equipment_description?.toLowerCase().includes(search.toLowerCase())
  )

  const statusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />
      case 'declined':
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  const statusBadge = (status: string) => {
    const cls: Record<string, string> = {
      approved: 'bg-green-50 text-green-700 border-green-200',
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      declined: 'bg-red-50 text-red-600 border-red-200',
    }
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${cls[status] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
        {statusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-surface-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-steel mb-1">
                Dealer Portal
              </p>
              <h1 className="font-display text-3xl text-brand-black">
                Welcome{user?.user_metadata?.name ? `, ${user.user_metadata.name}` : ''}
              </h1>
            </div>
            <div className="flex gap-3">
              <a
                href="/apply"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-steel text-white text-sm font-semibold rounded-xl hover:bg-brand-steel-dark transition-all"
              >
                <Plus className="w-4 h-4" />
                Submit Deal
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

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: FileText, label: 'Total Deals', value: deals.length.toString() },
              { icon: TrendingUp, label: 'Approved', value: deals.filter((d) => d.status === 'approved').length.toString() },
              { icon: Users, label: 'Pending', value: deals.filter((d) => d.status === 'pending').length.toString() },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-surface-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-steel/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-brand-steel" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-brand-black">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Deals Table */}
          <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
            <div className="p-6 border-b border-surface-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="font-semibold text-brand-black">Your Deals</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search deals..."
                  className="pl-9 pr-4 py-2 bg-surface-50 border border-surface-300 rounded-lg text-sm w-full sm:w-64 focus:border-brand-steel focus:ring-2 focus:ring-brand-steel/10 transition-all"
                />
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center text-slate-400">Loading...</div>
            ) : filteredDeals.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">No deals yet. Submit your first deal to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      <th className="px-6 py-3">Business</th>
                      <th className="px-6 py-3">Equipment</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100">
                    {filteredDeals.map((deal) => (
                      <tr key={deal.id} className="hover:bg-surface-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-brand-black">
                          {deal.business_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                          {deal.equipment_description}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {deal.amount_requested}
                        </td>
                        <td className="px-6 py-4">{statusBadge(deal.status)}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">
                          {new Date(deal.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
