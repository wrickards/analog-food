import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-forest-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <Logo variant="dark" showTagline={true} />
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              { label: 'About', href: '#story' },
              { label: 'Add a source', href: 'mailto:hello@analogfood.com?subject=Add%20a%20farm%20or%20market' },
              { label: 'Press', href: 'mailto:press@analogfood.com' },
              { label: 'Contact', href: 'mailto:hello@analogfood.com' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-cream/60 hover:text-cream text-sm transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>© 2025 Analog Food. The signal before the noise.</p>
          <p>Made with intention. For our families, our communities, our earth.</p>
        </div>
      </div>
    </footer>
  )
}
