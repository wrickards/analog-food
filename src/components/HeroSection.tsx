'use client'
import { useRef } from 'react'

const stats = [
  { value: '64+', label: 'Ingredients banned abroad, legal here' },
  { value: '4,000+', label: 'Additives in the US food supply' },
  { value: '30%', label: 'Higher cancer rates vs. EU' },
  { value: '80%+', label: 'Americans with glyphosate in urine' },
]

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1E3A2F 0%, #2D5A3D 50%, #1a3028 100%)',
      }}
    >
      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F0E4' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Main content */}
          <div className="flex-1 max-w-2xl">
            <p
              className="font-medium tracking-widest uppercase text-sm mb-6 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards', color: '#8FAF85', letterSpacing: '4px' }}
            >
              EAT CLOSE TO THE EARTH
            </p>
            <h1
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              The signal
              <br />
              <em style={{ color: '#C8883A', fontStyle: 'italic' }}>before</em>{' '}the noise.
            </h1>
            <p
              className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl opacity-0 animate-fade-up"
              style={{ animationDelay: '0.35s', animationFillMode: 'forwards', fontWeight: 300 }}
            >
              The rest of the world already knows what the US is slowly waking up to &mdash; most
              of what&apos;s on American shelves is engineered, not grown. We&apos;re connecting you
              to cleaner food, one zip code at a time.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              <a
                href="#find"
                className="btn-primary text-base py-3.5 px-8 text-center"
              >
                Find clean food near me
              </a>
              <a
                href="#story"
                className="btn-ghost text-base py-3.5 px-8 text-center"
              >
                Our story
              </a>
            </div>
          </div>

          {/* Right: Floating stat pills */}
          <div className="flex-shrink-0 hidden lg:flex flex-col gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white opacity-0 hover:bg-white/15 transition-colors cursor-default"
                style={{
                  animation: `fadeUp 0.6s ease-out ${0.6 + i * 0.15}s forwards, float ${3 + i * 0.5}s ease-in-out ${1 + i * 0.3}s infinite`,
                }}
              >
                <div className="font-serif text-3xl font-bold text-amber">{stat.value}</div>
                <div className="text-sm text-white/70 max-w-[180px] leading-tight mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stats row */}
        <div className="lg:hidden mt-12 grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.6 + i * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="font-serif text-2xl font-bold text-amber">{stat.value}</div>
              <div className="text-xs text-white/70 leading-tight mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
