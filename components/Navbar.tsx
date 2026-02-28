'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Portals',
    href: '#',
    children: [
      { label: 'Dealer Portal', href: '/dealers' },
      { label: 'Customer Portal', href: '/customers' },
    ],
  },
  { label: 'Apply Now', href: '/apply' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [portalOpen, setPortalOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-surface-200'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-brand-steel rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="text-white font-display text-xl font-bold">A</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-brand-steel-light rounded-full opacity-60" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-brand-black leading-tight">
                Avanti
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-brand-steel font-medium -mt-0.5">
                Equipment Finance
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setPortalOpen(true)}
                  onMouseLeave={() => setPortalOpen(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-steel transition-colors rounded-lg hover:bg-surface-100">
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${portalOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {portalOpen && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-surface-200 py-2 animate-fade-up">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:text-brand-steel hover:bg-surface-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : link.label === 'Apply Now' ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="ml-2 px-5 py-2.5 bg-brand-steel text-white text-sm font-semibold rounded-lg hover:bg-brand-steel-dark transition-all hover:shadow-lg hover:shadow-brand-steel/20 active:scale-[0.98]"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-steel transition-colors rounded-lg hover:bg-surface-100"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden pb-6 border-t border-surface-200 mt-2 pt-4 animate-fade-up">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="block px-6 py-2.5 text-sm text-slate-600 hover:text-brand-steel"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 text-sm font-medium ${
                    link.label === 'Apply Now'
                      ? 'mt-3 mx-4 text-center bg-brand-steel text-white rounded-lg'
                      : 'text-slate-600 hover:text-brand-steel'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
