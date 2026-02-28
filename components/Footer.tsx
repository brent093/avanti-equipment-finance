import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white relative overflow-hidden">
      {/* Subtle accent line at top */}
      <div className="h-1 bg-gradient-to-r from-brand-steel via-brand-steel-light to-brand-steel" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-brand-steel rounded-lg flex items-center justify-center">
                <span className="text-white font-display text-lg font-bold">A</span>
              </div>
              <div>
                <p className="font-semibold text-white leading-tight">Avanti</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-brand-steel-light">
                  Equipment Finance
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fast, flexible equipment financing solutions built for businesses that move forward.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-steel-light mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Apply Now', href: '/apply' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-steel-light mb-5">
              Portals
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Dealer Portal', href: '/dealers' },
                { label: 'Customer Portal', href: '/customers' },
                { label: 'Login', href: '/login' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-steel-light mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-steel mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-slate-400">Office: (617) 843-5612</p>
                  <p className="text-slate-400">Direct: (603) 459-9731</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-steel flex-shrink-0" />
                <a
                  href="mailto:brent@avantiequipfi.com"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  brent@avantiequipfi.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-steel flex-shrink-0" />
                <span className="text-slate-400 text-sm">New Hampshire</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} Avanti Equipment Finance, LLC. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            www.avantiequipmentfinance.com
          </p>
        </div>
      </div>
    </footer>
  )
}
