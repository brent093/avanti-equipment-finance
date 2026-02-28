'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    const role = data.user?.user_metadata?.role
    if (role === 'dealer') {
      window.location.href = '/dealers'
    } else {
      window.location.href = '/customers'
    }
  }

  const inputCls =
    'w-full px-4 py-3 bg-surface-50 border border-surface-300 rounded-xl text-sm text-brand-black placeholder:text-slate-400 transition-all focus:border-brand-steel focus:ring-2 focus:ring-brand-steel/10'

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 bg-brand-steel rounded-lg flex items-center justify-center">
            <span className="text-white font-display text-xl font-bold">A</span>
          </div>
          <div>
            <p className="font-semibold text-brand-black leading-tight">Avanti</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-brand-steel">
              Equipment Finance
            </p>
          </div>
        </Link>

        <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-8">
          <h1 className="font-display text-2xl text-brand-black text-center mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-400 text-center mb-8">
            Sign in to your portal
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls + ' pr-11'}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-steel text-white font-semibold rounded-xl hover:bg-brand-steel-dark transition-all disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Need an account?{' '}
          <Link href="/contact" className="text-brand-steel hover:underline font-medium">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  )
}
