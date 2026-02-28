import { FileText, Search, CheckCircle, Banknote } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    num: '01',
    title: 'Apply Online',
    desc: 'Fill out our streamlined credit application — it only takes a few minutes.',
  },
  {
    icon: Search,
    num: '02',
    title: 'Quick Review',
    desc: 'Our team reviews your application and shops it to our network of lenders.',
  },
  {
    icon: CheckCircle,
    num: '03',
    title: 'Get Approved',
    desc: 'Receive your approval letter with competitive terms and rates.',
  },
  {
    icon: Banknote,
    num: '04',
    title: 'Get Funded',
    desc: 'Sign your docs and get funded. Your equipment is on its way.',
  },
]

export default function Process() {
  return (
    <section className="py-24 bg-surface-50 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-steel/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-steel mb-4">
            How It Works
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-brand-black mb-5">
            Four Steps to <span className="italic text-brand-steel">Funding</span>
          </h2>
          <p className="text-slate-500 leading-relaxed">
            We&apos;ve simplified the financing process so you can focus on what matters — running your business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[calc(100%-20%)] h-px bg-surface-300" />
              )}
              <div className="relative bg-white rounded-2xl border border-surface-200 p-7 hover:shadow-md hover:border-brand-steel/20 transition-all">
                <span className="absolute -top-3 -left-1 font-display text-5xl text-brand-steel/10 font-bold">
                  {step.num}
                </span>
                <div className="w-11 h-11 rounded-xl bg-brand-steel/10 flex items-center justify-center mb-5">
                  <step.icon className="w-5 h-5 text-brand-steel" />
                </div>
                <h3 className="font-semibold text-brand-black mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
