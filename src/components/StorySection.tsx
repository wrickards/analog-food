export default function StorySection() {
  return (
    <section id="story" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Narrative */}
          <div>
            <p className="text-amber font-medium tracking-widest uppercase text-sm mb-4">Our Story</p>
            <h2 className="section-heading text-forest mb-8">
              A body&apos;s signal. A son&apos;s reaction. A mission.
            </h2>
            <div className="prose prose-lg text-forest/80 space-y-5 leading-relaxed">
              <p>
                It started in 2017, during business school. The founder had been living with
                eczema for years &mdash; flares he&apos;d accepted as normal. Then one evening, after a
                meal with yogurt, he noticed a burning sensation he couldn&apos;t ignore. On a hunch,
                he cut out dairy. Then gluten. The difference was <em>immediate</em> and undeniable:
                clearer skin, more energy, a sharpness he hadn&apos;t realized he&apos;d been missing.
              </p>
              <p>
                That moment planted a seed. He started reading labels. Researching ingredients.
                Asking why foods that were commonplace on American shelves were banned or
                heavily restricted in Europe, Canada, and Japan. The answer was never reassuring.
              </p>
              <p>
                As his son grew, a new concern took shape. They began noticing reactions &mdash;
                irritability, stomach upset, a pattern that tracked with certain foods. The
                culprit, eventually identified through careful elimination: <strong>Red 40</strong>,
                a petroleum-derived synthetic dye found in everything from children&apos;s vitamins
                to birthday cake frosting to fruit punch. By the time his son was 5, the
                reactions were unmistakable and increasingly alarming.
              </p>

              {/* Red 40 callout */}
              <div className="border-l-4 border-red-500 bg-red-50 rounded-r-xl p-6 my-8 not-prose">
                <p className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-2">
                  A dye the EU flags. A child who paid the price.
                </p>
                <p className="text-forest/90 leading-relaxed mb-3">
                  Red 40 is one of over 64 ingredients legal in the US but banned or restricted
                  abroad. The European Union requires a warning label on any food containing it:
                  <em> &ldquo;may have an adverse effect on activity and attention in children.&rdquo;</em>{' '}
                  In the US, it requires no such warning. It&apos;s in hundreds of products marketed
                  directly to kids.
                </p>
                <p className="text-forest/90 leading-relaxed font-medium">
                  Watching his son become violently ill hours after consuming it &mdash; repeatedly,
                  predictably &mdash; was the moment the mission stopped being personal and became
                  something that needed to exist in the world.
                </p>
              </div>

              <p>
                Then came the trip to Australia and New Zealand. And everything crystallized.
                The food tasted <em>different</em>. More alive. The energy was steadier, the brain
                fog lifted. When he learned that so many of the additives saturating American
                shelves are simply illegal in those countries, the path forward became obvious:
                stop keeping this to himself. Build something that helps others find the same
                clarity.
              </p>
              <p>
                Analog Food is that something &mdash; built for every parent who&apos;s ever wondered why
                their kid reacts to certain foods, and for every person whose body has been
                quietly trying to tell them something.
              </p>
            </div>
          </div>

          {/* Right: Cards */}
          <div className="space-y-6 lg:pt-16">
            {/* Pollan quote */}
            <div className="bg-forest text-cream rounded-2xl p-8">
              <div className="text-4xl text-amber font-serif mb-4">&ldquo;</div>
              <blockquote className="font-serif text-xl italic leading-relaxed mb-6">
                Eat food. Not too much. Mostly plants. Don&apos;t eat anything your great-grandmother
                wouldn&apos;t recognize as food.
              </blockquote>
              <div className="flex items-center gap-3 border-t border-cream/20 pt-4">
                <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center">
                  <span className="text-amber font-serif font-bold">MP</span>
                </div>
                <div>
                  <p className="font-semibold text-cream">Michael Pollan</p>
                  <p className="text-cream/60 text-sm">Author, In Defense of Food</p>
                </div>
              </div>
            </div>

            {/* Stat card */}
            <div className="bg-amber text-white rounded-2xl p-8">
              <div className="font-serif text-6xl font-bold mb-2">64+</div>
              <div className="text-xl font-semibold mb-3">
                Ingredients banned abroad, legal in the US
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                From petroleum-derived dyes to hormone-disrupting pesticides, the US food
                system allows substances that dozens of other nations have deemed too risky
                for their citizens.
              </p>
            </div>

            {/* Red 40 info box */}
            <div className="bg-white border border-red-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold text-lg">R40</span>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-1">Red 40 (Allura Red AC)</h4>
                  <p className="text-forest/70 text-sm leading-relaxed mb-3">
                    Petroleum-derived dye found in hundreds of American food products.
                    EU requires a warning: <em>&ldquo;may have an adverse effect on activity
                    and attention in children.&rdquo;</em>
                  </p>
                  <a href="#decoder" className="text-amber font-semibold text-sm hover:underline">
                    Look it up in our decoder &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
