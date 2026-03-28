const benefits = [
  {
    icon: '🧠',
    title: 'Mental Clarity',
    body: 'Removing synthetic dyes, MSG, and artificial sweeteners has been linked to improved focus, reduced brain fog, and better cognitive performance throughout the day.',
  },
  {
    icon: '⚡',
    title: 'Sustained Energy',
    body: 'Whole, unprocessed foods stabilize blood sugar rather than spiking it. Local, seasonal produce is harvested at peak ripeness — delivering more nutrients per bite.',
  },
  {
    icon: '😌',
    title: 'Mood & Wellbeing',
    body: 'Emerging research connects gut microbiome health to mood and anxiety. Pesticides and artificial additives disrupt gut flora; organic, fermented, and whole foods support it.',
  },
  {
    icon: '💪',
    title: 'Physical Performance',
    body: 'Athletes and coaches increasingly report better recovery, reduced inflammation, and improved endurance when eliminating processed foods from their diets.',
  },
  {
    icon: '👶',
    title: 'Our Children',
    body: "Children's developing nervous systems are especially vulnerable to neurotoxic pesticides and synthetic dyes. Cleaner food is not a luxury for kids — it's protection.",
  },
]

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber font-medium tracking-widest uppercase text-sm mb-4">
            Why It Matters
          </p>
          <h2 className="section-heading text-forest mb-4">
            What changes when you eat clean
          </h2>
          <p className="text-forest/70 text-lg max-w-2xl mx-auto">
            The science on clean eating is no longer fringe. Here&apos;s what people experience
            when they remove harmful additives and choose locally grown food.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.slice(0, 3).map((b, i) => (
            <div key={i} className="card hover:-translate-y-1 transition-transform">
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="font-serif text-xl font-bold text-forest mb-3">{b.title}</h3>
              <p className="text-forest/70 leading-relaxed text-sm">{b.body}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto lg:max-w-none lg:grid-cols-2 lg:w-2/3 lg:mx-auto">
          {benefits.slice(3).map((b, i) => (
            <div key={i} className="card hover:-translate-y-1 transition-transform">
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="font-serif text-xl font-bold text-forest mb-3">{b.title}</h3>
              <p className="text-forest/70 leading-relaxed text-sm">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
