const dangers = [
  {
    badge: "Founder's Experience",
    badgeColor: 'bg-red-100 text-red-700',
    title: 'Red 40 (Allura Red)',
    description: 'A petroleum-derived synthetic dye that colors foods red and orange. The EU mandates warning labels. Linked to hyperactivity in children and violent allergic reactions in sensitive individuals.',
    bannedIn: 'EU (warning required), Norway, Finland',
    icon: '🔴',
    highlight: true,
  },
  {
    badge: 'Possible Carcinogen',
    badgeColor: 'bg-orange-100 text-orange-700',
    title: 'BHA & BHT',
    description: 'Synthetic preservatives found in cereals, chips, and packaged snacks. BHA is listed as a possible human carcinogen by the US National Toxicology Program. Both disrupt hormone function.',
    bannedIn: 'Japan, UK, parts of EU',
    icon: '⚗️',
  },
  {
    badge: 'Carcinogen',
    badgeColor: 'bg-red-100 text-red-700',
    title: 'Potassium Bromate',
    description: 'Added to bread flour to strengthen dough. Classified as a possible carcinogen by the IARC. Banned in most countries since the 1990s. Residual bromate remains in finished baked goods.',
    bannedIn: 'EU, UK, Canada, China, Brazil',
    icon: '🍞',
  },
  {
    badge: 'Endocrine Disruptor',
    badgeColor: 'bg-purple-100 text-purple-700',
    title: 'rBGH / rBST',
    description: 'Synthetic growth hormone injected into dairy cows. Increases IGF-1 levels in milk, linked to breast, colon, and prostate cancers. Banned in all major dairy-producing nations except the US.',
    bannedIn: 'EU, Canada, Australia, NZ, Japan',
    icon: '🥛',
  },
  {
    badge: 'Factory Farming',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    title: 'Chlorine-Washed Chicken',
    description: 'US factory farms use chlorinated water baths to kill bacteria on chicken carcasses — a practice that masks unsanitary slaughter conditions. The EU has banned chlorine-washed poultry imports.',
    bannedIn: 'EU, UK (import ban)',
    icon: '🐔',
  },
  {
    badge: 'Endocrine Disruptor',
    badgeColor: 'bg-purple-100 text-purple-700',
    title: 'Atrazine & Chlorpyrifos',
    description: 'Widely used agricultural pesticides that contaminate drinking water and disrupt the endocrine system. Linked to reproductive harm, neurodevelopmental damage in children, and cancer.',
    bannedIn: 'EU (since 2004/2020), UK, Canada',
    icon: '🌿',
  },
]

export default function DangerSection() {
  return (
    <section id="dangers" className="py-24 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber font-medium tracking-widest uppercase text-sm mb-4">
            The Problem
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-6">
            What&apos;s hiding in your food
          </h2>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto leading-relaxed">
            These six substances are common in American grocery stores and fast food.
            Regulators in Europe, Canada, and Japan have banned or severely restricted all of them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dangers.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border transition-transform hover:-translate-y-1 ${
                item.highlight
                  ? 'bg-red-950/30 border-red-800/50'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-cream mb-3">{item.title}</h3>
              <p className="text-cream/70 text-sm leading-relaxed mb-5">{item.description}</p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-xs text-amber font-medium uppercase tracking-wider mb-1">Banned in</p>
                <p className="text-cream/60 text-sm">{item.bannedIn}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#decoder"
            className="inline-flex items-center gap-2 text-amber hover:text-amber-light font-semibold transition-colors"
          >
            Search the full ingredient database
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
