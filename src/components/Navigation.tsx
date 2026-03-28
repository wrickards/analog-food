'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './Logo'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <Logo variant={scrolled ? 'light' : 'dark'} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Our Story', href: '#story' },
              { label: 'The Problem', href: '#dangers' },
              { label: 'Find Clean Food', href: '#find' },
              { label: 'Why It Matters', href: '#benefits' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`text-sm font-medium transition-colors hover:text-amber ${
                  scrolled ? 'text-forest' : 'text-white/90'
                }`}
                style={{ fontWeight: 500, letterSpacing: '0.5px' }}
              >
                {label}
              </a>
            ))}
            <a
              href="#newsletter"
              className="btn-primary text-sm py-2 px-5"
            >
              The Signal
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${scrolled ? 'bg-forest' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${scrolled ? 'bg-forest' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-forest' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-cream border-t border-cream-dark py-4 space-y-3">
            {[
              { label: 'Our Story', href: '#story' },
              { label: 'The Problem', href: '#dangers' },
              { label: 'Find Clean Food', href: '#find' },
              { label: 'Why It Matters', href: '#benefits' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-forest font-medium hover:text-amber"
              >
                {label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <a href="#newsletter" className="btn-primary block text-center text-sm">
                The Signal
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
