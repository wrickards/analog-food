'use client'
import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [zip, setZip] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !zip) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, zip }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(`You're on the list. The Signal lands in your inbox weekly, tuned to ${zip}.`)
        setEmail('')
        setZip('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="newsletter" className="py-24 bg-forest">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-amber/20 text-amber px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <span>✦</span>
          <span>Weekly digest</span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-2">
          The Signal
        </h2>
        <p className="text-amber font-medium tracking-wider uppercase text-sm mb-6">
          Analog Food&apos;s weekly digest
        </p>
        <p className="text-cream/70 text-base mb-10 leading-relaxed max-w-xl mx-auto" style={{ fontWeight: 300 }}>
          A weekly read on what&apos;s real &mdash; new farms and markets near you, ingredient alerts,
          seasonal picks, and what&apos;s quietly entering (and leaving) American food shelves.
          Curated for your zip code. Named for what food was before they processed it.
        </p>

        {status === 'success' ? (
          <div className="bg-green-800/30 border border-green-500/30 rounded-2xl p-8">
            <div className="text-4xl mb-3">✦</div>
            <p className="text-cream font-semibold text-lg">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-white/10 border border-white/20 text-cream placeholder-cream/40 rounded-xl px-5 py-3.5 focus:outline-none focus:border-amber transition-colors"
            />
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Zip code"
              maxLength={5}
              required
              className="w-32 bg-white/10 border border-white/20 text-cream placeholder-cream/40 rounded-xl px-5 py-3.5 focus:outline-none focus:border-amber transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary py-3.5 px-6 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'loading' ? 'Signing up...' : 'Join free'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-400 text-sm mt-3">{message}</p>
        )}

        <p className="text-cream/40 text-xs mt-6">
          No spam, ever. Unsubscribe anytime. We&apos;ll never sell your data.
        </p>
      </div>
    </section>
  )
}
