import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative bg-brand-black rounded-3xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 800 400" fill="none">
              <circle cx="700" cy="50" r="200" stroke="#4d748c" strokeWidth="0.5" />
              <circle cx="700" cy="50" r="150" stroke="#4d748c" strokeWidth="0.5" />
              <circle cx="100" cy="350" r="120" stroke="#4d748c" strokeWidth="0.5" />
            </svg>
          </div>
          {/* Steel accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-steel via-brand-steel-light to-brand-steel" />

          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center">
            <h2 className="font-display text-3xl sm:text-5xl text-white mb-5">
              Ready to Move <span className="italic text-brand-steel-light">Forward?</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Get a fast, hassle-free quote on equipment financing. Our team is ready
              to help you find the perfect solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-steel text-white font-semibold rounded-xl hover:bg-brand-steel-light transition-all hover:shadow-xl hover:shadow-brand-steel/30 group"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:6034599731"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                <Phone className="w-4 h-4" />
                (603) 459-9731
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
