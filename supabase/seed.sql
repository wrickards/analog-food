-- Analog Food — Supabase Seed Data
-- Run this AFTER schema.sql

-- ============================================================
-- VENDORS (NYC / Brooklyn area)
-- ============================================================

insert into vendors (name, type, lat, lng, address, city, state, zip, website, phone, hours, tags, highlights, verified)
values
  (
    'Brooklyn Grange Rooftop Farm', 'farm',
    40.7282, -73.9442,
    '37-18 Northern Blvd', 'Long Island City', 'NY', '11101',
    'https://brooklyngrangefarm.com', '718-708-5986',
    'Seasonal farm stand — check website for hours',
    array['organic', 'rooftop', 'CSA available', 'NYC'],
    array['Nation''s largest rooftop soil farm', 'Certified organic', 'CSA shares available', 'Community events and workshops'],
    true
  ),
  (
    'Grand Army Plaza Greenmarket', 'farmers-market',
    40.6739, -73.9700,
    'Grand Army Plaza', 'Brooklyn', 'NY', '11238',
    'https://www.grownyc.org/greenmarket/brooklyn-grand-army-plaza', null,
    'Saturdays 8am–4pm, year-round',
    array['GrowNYC', 'year-round', 'organic vendors', 'Brooklyn'],
    array['Year-round Saturday market', 'Multiple certified organic farms', 'Seasonal local produce', 'Artisan food producers'],
    true
  ),
  (
    'Farm to People', 'specialty-grocer',
    40.7074, -73.9343,
    '1100 Flushing Ave', 'Brooklyn', 'NY', '11237',
    'https://farmtopeople.com', null,
    'Mon–Fri 9am–6pm (pickup / delivery)',
    array['delivery', 'CSA-style', 'organic', 'direct from farms', 'Bushwick'],
    array['Direct farmer relationships', 'Weekly curated boxes', 'Certified organic options', 'Transparent sourcing'],
    true
  ),
  (
    'Windfall Farms at Union Square Greenmarket', 'farmers-market',
    40.7359, -73.9906,
    'Union Square Park (Vendor)', 'New York', 'NY', '10003',
    'https://www.grownyc.org/greenmarket/manhattan-union-square-m', null,
    'Mon, Wed, Fri, Sat 8am–6pm',
    array['GrowNYC', 'certified organic', 'vegetables', 'herbs'],
    array['Certified organic vegetables', 'Rare heirloom varieties', 'Year-round presence at Union Square', 'Hudson Valley grown'],
    true
  ),
  (
    'Stoneledge Farm CSA', 'csa',
    41.9848, -74.5285,
    '5349 County Route 22', 'South Cairo', 'NY', '12482',
    'https://stoneledgefarm.com', null,
    'CSA pickup points throughout NYC',
    array['CSA', 'certified organic', 'Hudson Valley', 'year-round'],
    array['Certified organic for 30+ years', 'Year-round CSA shares', 'Multiple NYC pickup locations', 'Community-focused'],
    true
  ),
  (
    'Prospect Park Farmers Market', 'farmers-market',
    40.6601, -73.9683,
    'Prospect Park W & 15th St', 'Brooklyn', 'NY', '11215',
    'https://www.grownyc.org', null,
    'Saturdays 8am–1pm (seasonal, May–Nov)',
    array['Brooklyn', 'seasonal', 'local farms', 'GrowNYC'],
    array['Local Brooklyn vendors', 'Seasonal produce', 'Artisan food products', 'Pet-friendly market'],
    true
  ),
  (
    'Greenhouse Holistic', 'specialty-grocer',
    40.7282, -73.9537,
    '23 Meadow St', 'Brooklyn', 'NY', '11206',
    'https://www.greenholisticnyc.com', null,
    'Mon–Sat 10am–8pm, Sun 11am–6pm',
    array['holistic', 'organic', 'supplements', 'local'],
    array['Certified organic grocery', 'Natural supplements and remedies', 'Local NYC producers', 'Knowledgeable staff'],
    true
  ),
  (
    'Queens County Farm Museum', 'farm',
    40.7416, -73.7425,
    '73-50 Little Neck Pkwy', 'Floral Park', 'NY', '11004',
    'https://queensfarm.org', null,
    'Farm stand Sat–Sun 10am–4pm (seasonal)',
    array['historic', 'educational', 'organic', 'farm stand'],
    array['NYC''s largest working farm', 'Historic farm since 1697', 'Seasonal farm stand', 'Educational programming and tours'],
    true
  ),
  (
    'Fort Greene Park Farmers Market', 'farmers-market',
    40.6908, -73.9742,
    'Washington Park (in Fort Greene Park)', 'Brooklyn', 'NY', '11205',
    'https://www.grownyc.org/greenmarket/brooklyn-fort-greene', null,
    'Saturdays 8am–3pm, year-round',
    array['Brooklyn', 'year-round', 'GrowNYC', 'organic'],
    array['Year-round Saturday market', 'Certified organic vendors', 'Baked goods and artisan products', 'Community gathering space'],
    true
  ),
  (
    'Carroll Gardens Greenmarket', 'farmers-market',
    40.6784, -74.0001,
    'Carroll Park (Smith St at Carroll)', 'Brooklyn', 'NY', '11231',
    'https://www.grownyc.org', null,
    'Sundays 8am–3pm (seasonal, May–Nov)',
    array['Brooklyn', 'seasonal', 'organic', 'community'],
    array['Neighborhood farmers market', 'Seasonal local produce', 'Eggs and dairy from certified farms', 'Family-friendly'],
    true
  ),
  (
    'Transmitter Park Greenmarket', 'farmers-market',
    40.7274, -73.9581,
    'Transmitter Park, Greenpoint Ave', 'Brooklyn', 'NY', '11222',
    'https://www.grownyc.org', null,
    'Saturdays 8am–3pm (seasonal)',
    array['Greenpoint', 'seasonal', 'organic', 'Brooklyn'],
    array['Waterfront market in Greenpoint', 'Certified organic produce', 'Local honey and preserves', 'Scenic East River location'],
    true
  ),
  (
    'Gorilla Coffee & Provisions', 'specialty-grocer',
    40.6826, -73.9793,
    '97 Fifth Ave', 'Brooklyn', 'NY', '11217',
    'https://gorillacoffee.com', null,
    'Daily 7am–7pm',
    array['coffee', 'organic', 'local', 'specialty'],
    array['Direct-trade organic coffee', 'Local organic grocery selection', 'Clean ingredient snacks', 'Brooklyn institution'],
    false
  ),
  (
    'Nutrition for Life', 'specialty-grocer',
    40.7594, -73.9745,
    '252 W 53rd St', 'New York', 'NY', '10019',
    null, null,
    'Mon–Fri 8am–8pm, Sat 9am–7pm',
    array['supplements', 'organic', 'natural', 'midtown'],
    array['Natural and organic grocery', 'Extensive supplement selection', 'Clean snacks and drinks', 'Knowledgeable nutrition staff'],
    false
  ),
  (
    'Manhattan Fruit Exchange', 'specialty-grocer',
    40.7424, -74.0048,
    '399 W 12th St (Chelsea Market)', 'New York', 'NY', '10014',
    'https://www.chelseamarket.com', null,
    'Mon–Sat 7am–8pm, Sun 8am–7pm',
    array['Chelsea Market', 'organic', 'local', 'fresh produce'],
    array['Inside Chelsea Market', 'Exceptional organic produce selection', 'Local and imported varieties', 'Seasonal specials'],
    true
  ),
  (
    'GrowNYC — Union Square Greenmarket', 'farmers-market',
    40.7361, -73.9906,
    'Union Square Park (N side)', 'New York', 'NY', '10003',
    'https://www.grownyc.org/greenmarket/manhattan-union-square-m', null,
    'Mon, Wed, Fri, Sat 8am–6pm, year-round',
    array['GrowNYC', 'flagship market', 'year-round', 'organic'],
    array['NYC''s flagship greenmarket', '140+ vendors at peak season', 'Multiple certified organic farms', 'Year-round operation'],
    true
  ),
  (
    'Smorgasburg Prospect Park', 'farmers-market',
    40.6627, -73.9692,
    'Prospect Park Bandshell', 'Brooklyn', 'NY', '11215',
    'https://www.smorgasburg.com', null,
    'Sundays 11am–6pm (April–October)',
    array['artisan food', 'organic vendors', 'Brooklyn', 'outdoor market'],
    array['Curated artisan food vendors', 'Many organic and clean-ingredient options', 'Brooklyn outdoor food market', 'Seasonal April–October'],
    false
  ),
  (
    'The Berry Farm at Hallockville', 'farm',
    40.9530, -72.5418,
    '6038 Sound Ave', 'Riverhead', 'NY', '11901',
    'https://hallockville.org', null,
    'Farm stand Sat–Sun 10am–4pm (seasonal)',
    array['Long Island', 'organic', 'berries', 'u-pick'],
    array['Certified organic berry farm', 'U-pick strawberries and blueberries', 'Historic North Fork farm', 'CSA shares available'],
    true
  ),
  (
    'Bodhitree Farm CSA', 'csa',
    41.3548, -74.3882,
    'Orange County Farm', 'Warwick', 'NY', '10990',
    'https://bodhitreefarm.com', null,
    'Weekly pickup at NYC drop points',
    array['CSA', 'biodynamic', 'organic', 'Hudson Valley'],
    array['Biodynamic and certified organic', 'Seasonal vegetable shares', 'NYC pickup locations', 'Small-scale family farm'],
    true
  ),
  (
    'Madura Farm at Inwood Greenmarket', 'farmers-market',
    40.8665, -73.9212,
    'Isham Park, Inwood', 'New York', 'NY', '10034',
    'https://www.grownyc.org', null,
    'Saturdays 8am–3pm (seasonal)',
    array['Inwood', 'seasonal', 'certified organic', 'uptown'],
    array['Northern Manhattan market', 'Certified organic vegetables', 'Fresh eggs and dairy', 'Underserved community access'],
    true
  ),
  (
    'Northshire Farm CSA', 'csa',
    41.8027, -73.8718,
    'Columbia County', 'Hudson', 'NY', '12534',
    null, null,
    'Weekly pickup at multiple NYC locations',
    array['CSA', 'certified organic', 'Columbia County', 'vegetables'],
    array['Certified organic since 2001', 'Seasonal vegetable and fruit shares', 'Brooklyn and Manhattan pickup points', 'Transparent farming practices'],
    false
  ),
  (
    'Integral Yoga Natural Foods', 'specialty-grocer',
    40.7330, -74.0065,
    '229 W 13th St', 'New York', 'NY', '10011',
    'https://integralyoganaturalfoods.com', null,
    'Mon–Fri 9am–9pm, Sat–Sun 9am–8:30pm',
    array['organic', 'vegetarian', 'supplements', 'West Village'],
    array['Organic grocery and bulk foods', 'Extensive vegan and vegetarian selection', 'Clean supplements', 'West Village staple since 1972'],
    true
  ),
  (
    'Park Slope Food Coop', 'specialty-grocer',
    40.6653, -73.9793,
    '782 Union St', 'Brooklyn', 'NY', '11215',
    'https://foodcoop.com', '718-622-0560',
    'Daily 8am–10pm (members)',
    array['cooperative', 'organic', 'local', 'bulk foods'],
    array['Member-owned food cooperative', 'Extensive organic selection', 'Below-market prices for members', 'Strong local sourcing commitment'],
    true
  );

-- ============================================================
-- INGREDIENTS
-- ============================================================

insert into ingredients (name, aliases, danger_level, description, banned_in, clean_alternative, personal_note)
values
  (
    'Red 40 (Allura Red)',
    array['Red 40', 'Allura Red AC', 'FD&C Red No. 40', 'E129'],
    'high',
    'A petroleum-derived synthetic dye used to color foods red or orange. Linked to hyperactivity in children, allergic reactions, and possible carcinogenic effects. The EU requires warning labels on foods containing it.',
    array['European Union (warning label required)', 'Norway', 'Finland', 'France (partial ban)'],
    'Beet juice powder, pomegranate juice concentrate, or hibiscus extract for natural red color',
    'Analog Food''s founder has experienced this firsthand — his son becomes violently ill hours after consuming Red 40.'
  ),
  (
    'BHA (Butylated Hydroxyanisole)',
    array['BHA', 'E320', 'tert-Butyl-4-hydroxyanisole'],
    'high',
    'A synthetic antioxidant preservative used in cereals, butter, snack foods, and beer. Listed as a possible human carcinogen by the National Toxicology Program. Disrupts hormone function.',
    array['Japan', 'United Kingdom', 'European Union (restricted)', 'Australia (restricted)'],
    'Rosemary extract, vitamin E (tocopherols), or ascorbic acid as natural preservatives',
    null
  ),
  (
    'BHT (Butylated Hydroxytoluene)',
    array['BHT', 'E321', 'dibutylhydroxytoluene'],
    'medium',
    'A synthetic preservative chemically similar to BHA. Found in cereals, chips, and cosmetics. Some studies suggest carcinogenic properties. Precautionary bans in several countries.',
    array['United Kingdom', 'Japan', 'Romania', 'Sweden', 'Australia (restricted)'],
    'Vitamin E (tocopherols), rosemary extract, or smaller batch production without synthetic preservation',
    null
  ),
  (
    'Potassium Bromate',
    array['Potassium Bromate', 'E924', 'bromated flour'],
    'high',
    'Added to bread flour to strengthen dough and improve rise. Classified as a possible carcinogen by the IARC. Residual bromate remains in finished baked goods. Banned in most countries since the 1990s.',
    array['European Union', 'United Kingdom', 'Canada', 'China', 'Brazil', 'Nigeria', 'Sri Lanka'],
    'Ascorbic acid (vitamin C), malted barley flour, or simply unbromated unbleached flour',
    null
  ),
  (
    'rBGH / rBST',
    array['rBGH', 'rBST', 'recombinant bovine growth hormone', 'Posilac'],
    'high',
    'Synthetic growth hormone injected into dairy cows to increase milk production. Increases IGF-1 levels in milk, which has been linked to breast, colon, and prostate cancers.',
    array['European Union', 'Canada', 'Australia', 'New Zealand', 'Japan', 'Israel'],
    'Certified organic dairy products or products labeled "rBGH-free" or "rBST-free"',
    null
  ),
  (
    'Atrazine',
    array['Atrazine', '2-chloro-4-ethylamino-6-isopropylamino-s-triazine'],
    'high',
    'One of the most widely used herbicides in the US, applied to corn, sugarcane, and sorghum. A powerful endocrine disruptor linked to reproductive harm. Contaminates drinking water. Banned in the EU since 2004.',
    array['European Union', 'Switzerland', 'Germany', 'Austria', 'Italy', 'Sweden', '36+ countries total'],
    'Choose certified organic produce, especially corn. Support farms using cover crops and integrated pest management.',
    null
  ),
  (
    'Chlorpyrifos',
    array['Chlorpyrifos', 'Dursban', 'Lorsban', 'CPF'],
    'high',
    'An organophosphate pesticide used on fruits, vegetables, and nuts. Linked to neurodevelopmental harm in children, including lower IQ and developmental delays.',
    array['European Union', 'United Kingdom', 'Canada', 'Australia', 'New Zealand', 'China'],
    'Buy certified organic produce, especially apples, citrus, and grapes. Wash all produce thoroughly.',
    null
  ),
  (
    'High Fructose Corn Syrup',
    array['HFCS', 'corn syrup', 'glucose-fructose syrup', 'isoglucose'],
    'medium',
    'A highly processed sweetener derived from corn starch. Metabolized differently than regular sugar, contributing to fatty liver disease, obesity, insulin resistance, and metabolic syndrome.',
    array['European Union (restricted/replaced)', 'Hungary', 'France (sugar tax targeting it)'],
    'Raw honey, pure maple syrup, or date syrup. Look for products sweetened with organic cane sugar.',
    null
  ),
  (
    'Aspartame',
    array['Aspartame', 'NutraSweet', 'Equal', 'E951'],
    'medium',
    'An artificial sweetener used in diet sodas and "sugar-free" products. The WHO classified it as "possibly carcinogenic" in 2023. Breaks down into methanol and aspartic acid in the body.',
    array['Not fully banned, but restricted in some EU contexts', 'Under review by WHO'],
    'Stevia leaf extract (organic), monk fruit sweetener, or simply reducing overall sweetener use',
    null
  ),
  (
    'Titanium Dioxide',
    array['Titanium Dioxide', 'TiO2', 'E171', 'CI 77891'],
    'medium',
    'A white pigment used to make foods like candy, chewing gum, and frosting appear bright white. The EU banned it in 2022 after EFSA concluded it could cause DNA damage. Nanoparticles may accumulate in organs.',
    array['European Union (banned 2022)', 'United Kingdom (under review)', 'France (banned 2020)'],
    'Natural white colorings from calcium carbonate, starch, or simply no artificial whitening agent',
    null
  ),
  (
    'Brominated Vegetable Oil',
    array['BVO', 'Brominated Vegetable Oil', 'E443'],
    'high',
    'Used to keep citrus flavoring suspended in sodas. Bromine accumulates in body fat and breast milk. Linked to memory loss, nerve damage, and skin lesions at high doses. The FDA revoked its authorization in 2024.',
    array['European Union', 'India', 'Japan', 'United Kingdom', 'Canada'],
    'Choose beverages without artificial emulsifiers. Natural citrus oils do not require BVO as a carrier.',
    null
  ),
  (
    'Propyl Paraben',
    array['Propyl Paraben', 'E216', 'propylhydroxybenzoate'],
    'medium',
    'A preservative used in baked goods, tortillas, and food dyes. Acts as a xenoestrogen (mimics estrogen), linked to reproductive harm, reduced sperm count, and early puberty. The EU banned it in foods in 2006.',
    array['European Union', 'Denmark', 'Japan'],
    'Naturally preserved foods using vitamin E, rosemary extract, or lacto-fermentation',
    null
  ),
  (
    'Azodicarbonamide',
    array['ADA', 'Azodicarbonamide', 'E927a', 'flour bleaching agent'],
    'medium',
    'A flour bleaching and dough conditioning agent used in breads and fast food buns. Also used to make yoga mats and shoe soles. Breaks down into semicarbazide during baking, a potential carcinogen. Linked to asthma.',
    array['European Union', 'United Kingdom', 'Australia', 'Singapore (fined if used)'],
    'Bread made with unbromated, unbleached flour. European-style bread production uses neither ADA nor potassium bromate.',
    null
  ),
  (
    'Yellow 5 (Tartrazine)',
    array['Yellow 5', 'Tartrazine', 'FD&C Yellow No. 5', 'E102'],
    'medium',
    'A synthetic lemon-yellow dye derived from coal tar. Linked to hyperactivity in children, hives, and asthma. The EU requires a warning label citing effects on activity and attention in children.',
    array['Norway', 'Austria', 'EU (warning label required)', 'Finland'],
    'Turmeric, saffron, or beta-carotene for natural yellow coloring',
    null
  ),
  (
    'Yellow 6 (Sunset Yellow)',
    array['Yellow 6', 'Sunset Yellow', 'FD&C Yellow No. 6', 'E110'],
    'medium',
    'A coal tar-derived orange-yellow dye used in beverages, candy, and baked goods. EU-required warning label cites attention and hyperactivity effects in children. Linked to adrenal gland and kidney tumors in animal studies.',
    array['Norway', 'Finland', 'EU (warning label required)'],
    'Annatto, paprika extract, or beta-carotene for natural orange-yellow hues',
    null
  ),
  (
    'Sodium Nitrate / Nitrite',
    array['Sodium Nitrate', 'Sodium Nitrite', 'E249', 'E250', 'E251', 'E252'],
    'high',
    'Preservatives and color fixers used in processed meats like bacon, hot dogs, and deli meats. Form nitrosamines in the body, which are potent carcinogens. Linked to colorectal cancer, Type 1 diabetes, and Alzheimer''s disease.',
    array['EU (restricted, phased out in organic meats)', 'UK (phased out plan)', 'France (partial ban on cured meats)'],
    'Uncured meats preserved with celery juice or sea salt. Look for "no added nitrates/nitrites" labels.',
    null
  ),
  (
    'Glyphosate',
    array['Glyphosate', 'Roundup', 'N-(phosphonomethyl)glycine'],
    'high',
    'The world''s most widely used herbicide, applied to GMO crops and used as a desiccant on oats and wheat before harvest. The WHO classified it as "probably carcinogenic." Found in urine samples of 80%+ of Americans.',
    array['Austria', 'Vietnam', 'Sri Lanka', 'Thailand (partial)', 'Mexico (phase-out)', '14+ countries total'],
    'Certified organic oats, wheat, and legumes. Glyphosate cannot be used on certified organic crops.',
    null
  ),
  (
    'Olestra (Olean)',
    array['Olestra', 'Olean', 'sucrose polyester'],
    'medium',
    'A fat substitute that passes through the body undigested. Causes gastrointestinal distress and depletes fat-soluble vitamins (A, D, E, K). Still used in some fat-free snack chips in the US.',
    array['European Union', 'United Kingdom', 'Canada'],
    'Whole food snacks with naturally occurring healthy fats. Air-popped popcorn with olive oil.',
    null
  ),
  (
    'Saccharin',
    array['Saccharin', 'Sweet''N Low', 'E954', 'sodium saccharin'],
    'low',
    'The oldest artificial sweetener. Previously carried a warning label for bladder cancer risk; that label was removed in 2000. Recent studies link it to disruption of gut microbiome and may impair glucose tolerance.',
    array['Canada (was banned 1977–2014)', 'Previously restricted in EU'],
    'Stevia, monk fruit, or erythritol for zero-calorie sweetening without synthetic chemistry',
    null
  ),
  (
    'Carmine (Red 4)',
    array['Carmine', 'Red 4', 'cochineal extract', 'E120', 'crimson lake'],
    'low',
    'A red dye made from crushed cochineal insects. While natural, it causes severe allergic reactions including anaphylaxis in some people. The FDA requires it to be labeled by name. Concerns exist around mislabeling in "natural" products.',
    array['Not banned, but requires mandatory labeling in EU and US'],
    'Beet juice powder, raspberry extract, or hibiscus concentrate for natural red',
    null
  );
