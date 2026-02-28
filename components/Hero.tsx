import Link from 'next/link'
import { ArrowRight, Shield, Clock, TrendingUp } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-surface-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large steel circle */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-brand-steel/[0.04]" />
        <div className="absolute top-1/2 -left-48 w-[400px] h-[400px] rounded-full bg-brand-steel/[0.03]" />
        {/* Diagonal line accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <svg className="w-full h-full opacity-[0.03]" viewBox="0 0 500 800" fill="none">
            <line x1="0" y1="0" x2="500" y2="800" stroke="#4d748c" strokeWidth="1" />
            <line x1="50" y1="0" x2="500" y2="700" stroke="#4d748c" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="500" y2="600" stroke="#4d748c" strokeWidth="0.5" />
          </svg>
        </div>
        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #4d748c 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-steel/10 rounded-full mb-8">
                <div className="w-1.5 h-1.5 bg-brand-steel rounded-full animate-pulse" />
                <span className="text-brand-steel text-xs font-semibold uppercase tracking-wider">
                  Financing Made Simple
                </span>
              </div>
            </div>

            <h1 className="animate-fade-up animate-fade-up-delay-1">
              <span className="block font-display text-5xl sm:text-6xl lg:text-7xl text-brand-black leading-[1.05] mb-2">
                Equipment
              </span>
              <span className="block font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-2">
                <span className="text-gradient-steel">Financing</span>
              </span>
              <span className="block font-display text-5xl sm:text-6xl lg:text-7xl text-brand-black leading-[1.05]">
                That Moves
              </span>
              <span className="block font-display italic text-5xl sm:text-6xl lg:text-7xl text-brand-steel/80 leading-[1.05]">
                Forward.
              </span>
            </h1>

            <p className="mt-8 text-lg text-slate-500 leading-relaxed max-w-lg animate-fade-up animate-fade-up-delay-2">
              From heavy machinery to specialized tools — we get your business the
              equipment it needs with fast approvals and competitive rates.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up animate-fade-up-delay-3">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-steel text-white font-semibold rounded-xl hover:bg-brand-steel-dark transition-all hover:shadow-xl hover:shadow-brand-steel/20 active:scale-[0.98] group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-surface-300 text-slate-600 font-semibold rounded-xl hover:border-brand-steel/30 hover:text-brand-steel transition-all"
              >
                Talk to Us
              </Link>
            </div>
          </div>

          {/* Right - Stats Card */}
          <div className="animate-fade-up animate-fade-up-delay-4">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-surface-200 p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-steel mb-8">
                  Why Avanti
                </p>
                <div className="space-y-8">
                  {[
                    {
                      icon: Clock,
                      title: 'Same-Day Decisions',
                      desc: 'Fast credit decisions so your projects stay on schedule.',
                    },
                    {
                      icon: TrendingUp,
                      title: '$10K – $5M+',
                      desc: 'Flexible financing for equipment of any size or type.',
                    },
                    {
                      icon: Shield,
                      title: 'Trusted Partners',
                      desc: 'We work with top lenders to get you the best rates.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="w-12 h-12 rounded-xl bg-brand-steel/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-brand-steel" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-black mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative floating element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-steel/5 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-steel/[0.03] rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
