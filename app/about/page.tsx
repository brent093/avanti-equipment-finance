import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import { Target, Users, Handshake, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-surface-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-steel mb-4">
                About Avanti
              </p>
              <h1 className="font-display text-5xl sm:text-6xl text-brand-black mb-6">
                Built on Trust, <br />
                <span className="italic text-brand-steel">Driven by Results.</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
                Avanti Equipment Finance is an equipment financing brokerage dedicated
                to helping businesses acquire the equipment they need to grow. We work
                with a network of trusted lenders to find the best rates and terms for
                every client.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Target,
                  title: 'Focused',
                  desc: 'We specialize in equipment financing — it\'s all we do, and we do it well.',
                },
                {
                  icon: Users,
                  title: 'Personal',
                  desc: 'You work directly with our team — no call centers, no runaround.',
                },
                {
                  icon: Handshake,
                  title: 'Transparent',
                  desc: 'Clear terms, honest communication, and no hidden fees. Ever.',
                },
                {
                  icon: Award,
                  title: 'Competitive',
                  desc: 'We shop your deal across our lender network to get you the best rate.',
                },
              ].map((val, i) => (
                <div
                  key={i}
                  className="p-7 rounded-2xl border border-surface-200 bg-surface-50"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-steel/10 flex items-center justify-center mb-5">
                    <val.icon className="w-5 h-5 text-brand-steel" />
                  </div>
                  <h3 className="font-semibold text-lg text-brand-black mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-20 bg-surface-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-steel mb-4">
                  Our Approach
                </p>
                <h2 className="font-display text-4xl text-brand-black mb-6">
                  A Broker That Works <span className="italic text-brand-steel">For You</span>
                </h2>
                <div className="space-y-5 text-slate-500 leading-relaxed">
                  <p>
                    As an equipment financing brokerage, we don&apos;t lend our own money.
                    Instead, we leverage relationships with dozens of lenders to find the
                    financing solution that fits your business best.
                  </p>
                  <p>
                    This means you get access to more options, better rates, and a
                    dedicated team that handles the entire process — from application to
                    funding.
                  </p>
                  <p>
                    Whether you&apos;re a startup or an established company, we have lender
                    partners who specialize in businesses at every stage.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-surface-200 p-10">
                <div className="space-y-6">
                  {[
                    { num: '50+', label: 'Lender Partners' },
                    { num: '$10K–$5M+', label: 'Financing Range' },
                    { num: '24hr', label: 'Typical Approval Time' },
                    { num: 'A–D', label: 'All Credit Profiles' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-4 border-b border-surface-200 last:border-0"
                    >
                      <span className="font-display text-2xl text-brand-steel">
                        {stat.num}
                      </span>
                      <span className="text-sm text-slate-500">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
