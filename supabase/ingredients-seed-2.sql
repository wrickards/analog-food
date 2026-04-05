-- Analog Food — Ingredient Database Expansion (155 additional entries)
-- Run this in Supabase SQL Editor AFTER the original seed.sql
-- This INSERT uses ON CONFLICT DO NOTHING so it is safe to re-run

INSERT INTO ingredients (name, aliases, danger_level, description, banned_in, clean_alternative, personal_note)
VALUES

-- ============================================================
-- SYNTHETIC DYES & COLORINGS
-- ============================================================

(
  'Blue 1 (Brilliant Blue)',
  ARRAY['Blue 1', 'FD&C Blue No. 1', 'Brilliant Blue FCF', 'E133', 'CI 42090'],
  'medium',
  'A synthetic blue dye used in beverages, candy, baked goods, and breakfast cereals. Derived from petroleum. Some studies suggest it may cross the blood-brain barrier in certain conditions. The EU requires a warning label on foods containing it citing possible effects on activity and attention in children.',
  ARRAY['EU (warning label required)', 'Norway', 'Finland'],
  'Spirulina extract or butterfly pea flower for natural blue coloring. Many brands now use these for blue-hued products.',
  null
),

(
  'Blue 2 (Indigo Carmine)',
  ARRAY['Blue 2', 'FD&C Blue No. 2', 'Indigo Carmine', 'E132', 'CI 73015'],
  'medium',
  'A synthetic blue dye used in candy, pet food, and some baked goods. Animal studies have shown tumor development at high doses. Linked to behavioral effects in children. Requires a warning label in the EU.',
  ARRAY['EU (warning label required)', 'Norway'],
  'Spirulina or indigo from natural plant sources for blue coloring.',
  null
),

(
  'Red 3 (Erythrosine)',
  ARRAY['Red 3', 'FD&C Red No. 3', 'Erythrosine', 'E127', 'CI 45430'],
  'high',
  'A cherry-pink synthetic dye used in maraschino cherries, candy, and some cereals. The FDA actually banned its use in cosmetics and externally applied drugs in 1990 due to cancer risk — yet it remains permitted in food. Animal studies linked it to thyroid tumors at high doses. The FDA has proposed revoking its food authorization.',
  ARRAY['EU (banned)', 'Norway', 'Austria', 'Japan (restricted)'],
  'Beet juice, pomegranate extract, or hibiscus for natural red-pink color. Choose maraschino cherries made without artificial dyes.',
  null
),

(
  'Green 3 (Fast Green)',
  ARRAY['Green 3', 'FD&C Green No. 3', 'Fast Green FCF', 'E143', 'CI 42053'],
  'medium',
  'A synthetic green dye rarely used in US foods today but still FDA-approved. Found occasionally in canned peas, mint-flavored candy, and some beverages. Animal studies showed bladder and testes tumors at high doses. Banned in the EU.',
  ARRAY['EU (banned)', 'Japan (not approved)'],
  'Spinach juice, matcha, or chlorophyll extract for natural green coloring.',
  null
),

(
  'Orange B',
  ARRAY['Orange B', 'FD&C Orange B', 'CI 19235'],
  'high',
  'A synthetic orange dye approved only for use in hot dog and sausage casings in the US. Its use is extremely limited but it remains on the FDA approved list. Banned in most other countries due to lack of safety data and cancer concerns.',
  ARRAY['EU (not approved)', 'Canada (not approved)', 'UK (not approved)', 'Australia (not approved)'],
  'Paprika extract or annatto for natural orange-red color in meat products.',
  null
),

(
  'Citrus Red 2',
  ARRAY['Citrus Red 2', 'FD&C Citrus Red No. 2', 'CI 12156'],
  'high',
  'A synthetic dye approved only for coloring the skin of oranges not intended for processing. It is applied to the peel of Florida oranges to make them appear more orange. It does not penetrate the flesh under normal conditions, but the peel is used in zest and marmalade. Animal studies showed cancer risk. Banned in most countries.',
  ARRAY['EU (not approved)', 'Canada (not approved)', 'UK (not approved)'],
  'Choose certified organic oranges, which cannot be treated with Citrus Red 2. If using zest, buy organic.',
  null
),

(
  'Caramel Color (Class III & IV)',
  ARRAY['Caramel Color', 'Caramel Coloring', 'E150c', 'E150d', 'Class III caramel', 'Class IV caramel', 'ammonia caramel', 'ammonia-sulfite caramel'],
  'high',
  'There are four classes of caramel color. Classes III and IV are made using ammonia and are found in colas, beer, soy sauce, and many dark-colored foods. The manufacturing process creates a byproduct called 4-methylimidazole (4-MEI), which is classified as a possible carcinogen by the IARC. California requires a cancer warning label on products with significant 4-MEI levels. Classes I and II (plain or caustic-sulfite) do not carry the same concern.',
  ARRAY['California (Prop 65 warning required above threshold)', 'EU (restricted use levels for Class IV)'],
  'Look for beverages colored with natural caramel (Class I or II), fruit juices, or no added color. Choose colas labeled "no caramel color" or made with Class I caramel.',
  null
),

(
  'Annatto',
  ARRAY['Annatto', 'Annatto extract', 'E160b', 'bixin', 'norbixin', 'achiote'],
  'low',
  'A natural yellow-orange colorant derived from the seeds of the achiote tree. Used in cheese, butter, popcorn, and cereals. Generally considered safe and natural. However, some people experience allergic reactions — particularly those with sensitivities to other food dyes. It has been linked to IgE-mediated allergic reactions and anaphylaxis in rare cases. It is one of the few natural colorants that can cause genuine allergic responses.',
  ARRAY['Not banned in major markets'],
  'Turmeric for yellow-orange color, or simply no added color. If you have dye sensitivities, check for annatto even in "natural" products.',
  null
),

-- ============================================================
-- PRESERVATIVES
-- ============================================================

(
  'Potassium Sorbate',
  ARRAY['Potassium Sorbate', 'E202', 'potassium (E,E)-hexa-2,4-dienoate'],
  'medium',
  'One of the most widely used food preservatives, found in cheese, wine, dried fruit, yogurt, and packaged baked goods. Generally recognized as safe (GRAS) by the FDA. However, it can react with ascorbic acid (Vitamin C) to form benzene, a known carcinogen — the same concern as sodium benzoate. Some people experience skin and mucous membrane irritation. In high concentrations it has shown genotoxic activity in lab studies, though typical food levels are far lower.',
  ARRAY['Not banned in major markets, though used at controlled levels in EU (E202)'],
  'Products preserved with vitamin E (tocopherols), rosemary extract, or through refrigeration and vacuum sealing rather than chemical preservatives.',
  null
),

(
  'Sodium Benzoate',
  ARRAY['Sodium Benzoate', 'E211', 'benzoate of soda', 'C6H5COONa'],
  'medium',
  'A widely used preservative found in sodas, fruit juices, pickles, and condiments. On its own, sodium benzoate poses limited risk. The problem: when combined with ascorbic acid (Vitamin C) — a common co-ingredient in beverages — it can form benzene, a known carcinogen classified as Group 1 by the IARC. Many sodas contain both. Also linked to hyperactivity in children in the same UK study that flagged artificial dyes.',
  ARRAY['Russia (banned in some applications)', 'EU (restricted, E211, requires activity/attention warning when combined with artificial colors)'],
  'Choose beverages preserved with citric acid alone, or opt for naturally fermented products. Read labels for the sodium benzoate + ascorbic acid combination.',
  null
),

(
  'Calcium Propionate',
  ARRAY['Calcium Propionate', 'E282', 'calcium propanoate', 'propionic acid calcium salt'],
  'medium',
  'The most common mold inhibitor in commercial bread, baked goods, and processed cheese. Generally recognized as safe. However, some research links it to behavioral changes and irritability in children, and a small number of studies suggest it may affect gut microbiome balance at high intake levels. Its widespread use in American bread means people who eat commercial bread regularly may have significant cumulative exposure.',
  ARRAY['Not banned in major markets'],
  'Bread made fresh without preservatives, sourdough (naturally preserved by lactic acid), or bread from local bakeries that bake daily without chemical preservatives.',
  null
),

(
  'TBHQ (tert-Butylhydroquinone)',
  ARRAY['TBHQ', 'tert-butylhydroquinone', 'tertiary butylhydroquinone', 'E319', 'antioxidant 319'],
  'high',
  'A petroleum-derived preservative used in fast food, crackers, chips, frozen meals, and cooking oils to prevent oxidation. At low doses it is considered safe by US regulators. However, the National Toxicology Program found evidence of tumor formation in animal studies, and the European Food Safety Authority has flagged concerns about genotoxicity. Studies have also linked TBHQ to impaired immune response — specifically, it may weaken the effectiveness of flu vaccines. It is restricted in Japan and has a strict upper limit in the EU.',
  ARRAY['Japan (not permitted)', 'EU (strict maximum limits, E319)'],
  'Cold-pressed, unrefined oils in dark glass bottles. Oils preserved with vitamin E (tocopherols) or rosemary extract. Buy smaller quantities and store properly to avoid rancidity without chemical preservatives.',
  null
),

(
  'Sulfur Dioxide',
  ARRAY['Sulfur Dioxide', 'E220', 'SO2', 'sulfurous anhydride'],
  'medium',
  'A preservative and antioxidant used in dried fruits, wine, fruit juices, and some preserved vegetables. Can trigger asthma attacks and allergic reactions — the FDA requires labeling when sulfite levels exceed 10 ppm. People with asthma are particularly sensitive. The EU requires warning labels. Historically used to preserve the orange color of dried apricots (natural dried apricots are brown).',
  ARRAY['Australia (mandatory disclosure)', 'EU (mandatory "contains sulfites" labeling)', 'USA (requires label disclosure above 10ppm)'],
  'Unsulfured dried fruit (darker in color but chemical-free). Look for "no sulfites added" on wine labels, or choose organic wine.',
  null
),

(
  'Sodium Sulfite',
  ARRAY['Sodium Sulfite', 'E221', 'disodium sulfite', 'Na2SO3'],
  'medium',
  'A sulfite preservative used in wine, dried fruit, and some processed foods. Like all sulfites, it can cause asthma attacks and allergic reactions in sensitive individuals. The FDA banned its use on fresh fruits and vegetables in 1986 after reports of severe reactions and deaths. It remains permitted in processed foods with mandatory disclosure.',
  ARRAY['USA (banned on fresh produce since 1986)', 'Australia (mandatory disclosure)', 'EU (E221, mandatory labeling)'],
  'Sulfite-free wine and unsulfured dried fruit. Fresh whole fruits and vegetables contain no sulfites.',
  null
),

(
  'Sodium Metabisulfite',
  ARRAY['Sodium Metabisulfite', 'E223', 'sodium pyrosulfite', 'disodium metabisulfite', 'Na2S2O5'],
  'medium',
  'A sulfite compound used as a preservative in wine, beer, fruit juices, dried fruit, and some seafood. Like other sulfites, it can trigger severe reactions in asthmatics and sulfite-sensitive individuals. Also used as an antioxidant to prevent browning. One of the stronger sulfite compounds commonly used.',
  ARRAY['EU (E223, mandatory sulfite labeling)', 'Australia (mandatory disclosure)'],
  'Choose products labeled "no sulfites" or "sulfite-free." For wine, look for organic or natural wines made without added sulfites.',
  null
),

(
  'Potassium Bisulfite',
  ARRAY['Potassium Bisulfite', 'E228', 'potassium hydrogen sulfite', 'KHSO3'],
  'medium',
  'A sulfite preservative used primarily in wine and some processed foods. Shares the same concerns as other sulfites — asthma triggers, allergic reactions, and required disclosure. Less commonly encountered than sodium metabisulfite but used in similar applications.',
  ARRAY['EU (E228, mandatory sulfite labeling)', 'Australia (mandatory disclosure)'],
  'Sulfite-free wines, natural fermentation-preserved foods, and fresh whole ingredients.',
  null
),

(
  'Benzoic Acid',
  ARRAY['Benzoic Acid', 'E210', 'benzenecarboxylic acid', 'phenylformic acid'],
  'medium',
  'The acid form of sodium benzoate, used as a preservative in acidic foods like fruit juices, carbonated drinks, and pickles. Carries the same benzene formation risk as sodium benzoate when combined with Vitamin C. Occurs naturally in very small amounts in cranberries and prunes, but the synthetic form is used at much higher concentrations in processed food.',
  ARRAY['EU (E210, restricted maximum levels)', 'Russia (restricted)'],
  'Naturally preserved or fermented foods. Avoid beverages combining benzoic acid with ascorbic acid (Vitamin C).',
  null
),

(
  'Sorbic Acid',
  ARRAY['Sorbic Acid', 'E200', '2,4-hexadienoic acid', 'hexa-2,4-dienoic acid'],
  'low',
  'The acid form of potassium sorbate, used to inhibit mold and yeast in cheese, wine, baked goods, and dried fruit. Generally recognized as safe. Originally derived from rowan berries; now produced synthetically. Among the milder preservatives in the food supply, with a good safety record across decades of use.',
  ARRAY['Not banned in major markets'],
  'Products preserved naturally through refrigeration, fermentation, or vacuum sealing. Low concern but unnecessary in whole foods.',
  null
),

(
  'Methylparaben',
  ARRAY['Methylparaben', 'E218', 'methyl 4-hydroxybenzoate', 'methyl parahydroxybenzoate'],
  'medium',
  'A paraben preservative used in some processed foods, beverages, and condiments to prevent mold. Parabens mimic estrogen in the body (they are xenoestrogens) and can bind to estrogen receptors. Research has detected methylparaben in human breast tissue. The EU has restricted certain parabens in cosmetics and banned propylparaben and butylparaben in leave-on cosmetics, though methylparaben remains permitted in food at low levels.',
  ARRAY['EU (restricted in cosmetics, E218 permitted in food with limits)', 'Denmark (restricted in products for children under 3)'],
  'Foods without parabens — look for products preserved with vitamin E, rosemary extract, or natural fermentation. Parabens are more common in cosmetics than food, but check labels on sauces, jams, and beverages.',
  null
),

(
  'Propionic Acid',
  ARRAY['Propionic Acid', 'E280', 'propanoic acid', 'methylacetic acid'],
  'medium',
  'The acid form of calcium propionate, used as a mold inhibitor in bread and dairy products. Produced naturally in small amounts during fermentation. At food-use levels it is generally regarded as safe, but shares the same concerns as calcium propionate regarding behavioral effects in children and potential gut microbiome disruption at high exposure levels.',
  ARRAY['Not banned in major markets'],
  'Freshly baked bread, sourdough, or products from local bakeries that bake without chemical preservatives.',
  null
),

-- ============================================================
-- ARTIFICIAL SWEETENERS
-- ============================================================

(
  'Sucralose',
  ARRAY['Sucralose', 'Splenda', 'E955', 'trichlorogalactosucrose'],
  'medium',
  'A chlorinated artificial sweetener about 600 times sweeter than sugar, found in diet beverages, sugar-free baked goods, yogurt, protein bars, and thousands of "reduced calorie" products. Long considered one of the safer artificial sweeteners. However, recent studies have raised new concerns: a 2023 study published in Nature Medicine found sucralose-6-acetate (a metabolite) is genotoxic. Other research suggests it may alter gut microbiome composition, reduce insulin sensitivity, and paradoxically contribute to glucose intolerance. Not yet banned anywhere, but the science is shifting.',
  ARRAY['Not currently banned, under review in some jurisdictions'],
  'Stevia (look for pure stevia leaf extract, not highly processed stevia blends), monk fruit sweetener, or small amounts of raw honey or maple syrup.',
  null
),

(
  'Acesulfame Potassium',
  ARRAY['Acesulfame Potassium', 'Ace-K', 'acesulfame K', 'E950', 'Sweet One', 'Sunett'],
  'medium',
  'An artificial sweetener about 200 times sweeter than sugar, widely used in diet drinks, sugar-free gum, baked goods, and tabletop sweeteners — often blended with sucralose or aspartame. Original FDA approval was based on studies critics say were flawed. Animal studies suggested possible cancer risk at high doses. It contains acetoacetamide, which has shown thyroid effects in animals. Poorly studied relative to newer sweeteners. Passes through the body largely unchanged, meaning it enters waterways.',
  ARRAY['Not banned in major markets'],
  'Stevia or monk fruit sweetener. Look for products sweetened with single natural sweeteners rather than blends of multiple artificial ones.',
  null
),

(
  'Neotame',
  ARRAY['Neotame', 'E961', 'N-(N-(3,3-dimethylbutyl)-L-alpha-aspartyl)-L-phenylalanine 1-methyl ester'],
  'medium',
  'A derivative of aspartame that is approximately 7,000–13,000 times sweeter than sugar. Used in very small quantities in baked goods, beverages, and chewing gum. Because it is used in such tiny amounts, it does not require labeling as a source of phenylalanine (unlike aspartame). Limited independent long-term safety data. Chemically similar to aspartame and shares some of its metabolic concerns.',
  ARRAY['Not approved in some countries, limited global use'],
  'Stevia, monk fruit, or simply reducing overall sweetener use. Neotame is rarely encountered — reading ingredient labels will reveal its presence.',
  null
),

(
  'Advantame',
  ARRAY['Advantame', 'E969'],
  'medium',
  'The newest artificial sweetener approved by the FDA (2014), approximately 20,000 times sweeter than sugar. Used in tiny amounts in baked goods, soft drinks, and chewing gum. Like neotame, it is derived from aspartame but at such low usage levels it does not require phenylalanine warnings. Very limited independent safety research has been conducted outside of manufacturer-funded studies.',
  ARRAY['Limited global approval'],
  'Natural sweeteners with established long-term safety records — stevia, monk fruit, or raw honey in moderation.',
  null
),

(
  'Cyclamate',
  ARRAY['Cyclamate', 'sodium cyclamate', 'calcium cyclamate', 'E952', 'Sucaryl'],
  'high',
  'An artificial sweetener banned in the United States since 1969 after a study linked it to bladder cancer in rats. Still widely used in over 130 countries including Canada, the UK, and the EU. The FDA has never reversed its ban despite subsequent studies casting doubt on the original findings. The gap between US policy and international use makes it unusual among food additives.',
  ARRAY['USA (banned since 1969)', 'Japan (not approved)'],
  'If traveling or buying imported products, check for E952 or cyclamate on the label. In the US, check imported diet beverages and candies.',
  null
),

-- ============================================================
-- EMULSIFIERS & STABILIZERS
-- ============================================================

(
  'Polysorbate 80',
  ARRAY['Polysorbate 80', 'E433', 'Tween 80', 'polyoxyethylene sorbitan monooleate', 'PEG-80 sorbitan'],
  'medium',
  'An emulsifier derived from sorbitol and oleic acid used in ice cream, salad dressings, baked goods, and vitamins. Animal studies by Chassaing et al. (2015) published in Nature found that at doses comparable to human consumption, polysorbate 80 altered gut microbiota, promoted intestinal inflammation, increased intestinal permeability, and contributed to metabolic syndrome and obesity in mice. Human gut bacteria studies have shown similar disruption. Widely used, difficult to avoid in processed foods.',
  ARRAY['Not banned in major markets'],
  'Ice cream made with simple ingredients — cream, milk, eggs, sugar. Homemade salad dressings with olive oil and vinegar. Avoid ultra-processed foods where emulsifiers are structural ingredients.',
  null
),

(
  'Polysorbate 60',
  ARRAY['Polysorbate 60', 'E435', 'Tween 60', 'polyoxyethylene sorbitan monostearate'],
  'medium',
  'A close relative of polysorbate 80, used in non-dairy whipped toppings, baked goods, cake mixes, and some icings. Shares similar gut microbiome disruption concerns. Less studied than polysorbate 80 but used in the same category of ultra-processed foods where multiple emulsifiers are often combined.',
  ARRAY['Not banned in major markets'],
  'Whipped cream made from real cream. Homemade baked goods using butter and eggs as natural emulsifiers.',
  null
),

(
  'Carboxymethyl Cellulose',
  ARRAY['Carboxymethyl Cellulose', 'CMC', 'E466', 'cellulose gum', 'sodium carboxymethylcellulose'],
  'medium',
  'A synthetic fiber derived from cellulose used as a thickener and emulsifier in ice cream, salad dressings, gluten-free products, and processed meats. The same 2015 Nature study that flagged polysorbate 80 also found CMC disrupted gut microbiota and promoted inflammation. One of the most widely used food additives; appears under the innocuous name "cellulose gum" on many labels.',
  ARRAY['Not banned in major markets'],
  'Whole foods with natural texture. Ice cream with minimal ingredients. Fermented foods that are preserved and thickened naturally.',
  null
),

(
  'Soy Lecithin',
  ARRAY['Soy Lecithin', 'lecithin', 'E322', 'soya lecithin'],
  'low',
  'An emulsifier derived from soybeans, used in chocolate, margarine, baked goods, and salad dressings to prevent separation. Generally considered safe. Key concerns: most soy in the US is genetically modified, and the lecithin is often derived from GM soy. Also, most commercial soy is grown with glyphosate. People with soy allergies are usually not reactive to soy lecithin (the protein is largely removed), but sensitivity varies. Sunflower lecithin is a cleaner alternative.',
  ARRAY['Not banned in major markets'],
  'Sunflower lecithin (non-GMO, no glyphosate concerns) or products that use egg yolk as a natural emulsifier. Look for "sunflower lecithin" on the label.',
  null
),

(
  'Mono and Diglycerides',
  ARRAY['Mono and Diglycerides', 'monoglycerides', 'diglycerides', 'E471', 'glycerol monostearate', 'GMS'],
  'medium',
  'Emulsifiers made from glycerol and fatty acids, used in bread, margarine, peanut butter, and ice cream to improve texture and extend shelf life. They are technically fats — and some contain trans fats (industrially produced through partial hydrogenation). Crucially, US labeling regulations allow foods to claim "0g trans fat" even if they contain mono and diglycerides with trans fat content, as long as the amount per serving is below 0.5g. This is a labeling loophole that allows real trans fat consumption to go unreported.',
  ARRAY['EU (trans fat restrictions affect production, E471)'],
  'Natural peanut butter with only peanuts and salt. Bread baked without dough conditioners. Look for products without mono and diglycerides if you are avoiding trans fats.',
  null
),

(
  'DATEM',
  ARRAY['DATEM', 'E472e', 'diacetyl tartaric acid esters of mono- and diglycerides', 'diacetyl tartaric ester of monoglyceride'],
  'medium',
  'A dough conditioner and emulsifier used extensively in commercial bread, rolls, and bagels to improve dough strength and volume. Made from mono and diglycerides combined with tartaric acid. Like mono and diglycerides, it can contain trans fats that are not disclosed on the nutrition label. Animal studies have shown heart muscle fibrosis at high doses. Its pervasive use in commercial baking makes it one of the harder emulsifiers to avoid.',
  ARRAY['EU (E472e, trans fat production restrictions)'],
  'Bread made from simple ingredients: flour, water, yeast, salt. Sourdough. Artisan or bakery bread that lists ingredients without dough conditioners.',
  null
),

(
  'SSL (Sodium Stearoyl Lactylate)',
  ARRAY['SSL', 'Sodium Stearoyl Lactylate', 'E481', 'sodium stearoyl-2-lactylate'],
  'low',
  'A dough conditioner and emulsifier made from stearic acid and lactic acid, used in bread, rolls, and tortillas. Generally considered safer than DATEM and mono and diglycerides — it does not carry trans fat concerns in the same way. Commonly found in commercial baked goods. The lactic acid component means it may technically be animal-derived (though synthetic versions exist), which matters to vegans.',
  ARRAY['Not banned in major markets'],
  'Bread with minimal ingredient lists — flour, water, salt, yeast. Certified vegan breads explicitly note their emulsifier sources.',
  null
),

(
  'Propylene Glycol',
  ARRAY['Propylene Glycol', 'E1520', 'propane-1,2-diol', '1,2-propanediol', 'PG'],
  'medium',
  'A synthetic solvent and humectant used in salad dressings, cake mixes, flavoring agents, and some packaged foods to retain moisture and carry flavors. It is also an ingredient in antifreeze (though food-grade propylene glycol is different from the automotive version) and e-cigarette fluid. The FDA classifies it as GRAS, but the EU has more restrictive limits on its use in food. High doses can cause kidney damage, and it accumulates in the body faster than it is metabolized. Used far more liberally in American food than European.',
  ARRAY['EU (E1520, restricted to specific uses and maximum levels)', 'UK (restricted)'],
  'Whole food condiments like mustard, vinegar-based dressings, or homemade versions. Propylene glycol is a marker of highly processed food — its presence indicates significant industrial processing.',
  null
),

(
  'Xanthan Gum',
  ARRAY['Xanthan Gum', 'E415', 'xanthan'],
  'low',
  'A polysaccharide produced by bacterial fermentation of sugar, used as a thickener and stabilizer in salad dressings, sauces, gluten-free baked goods, and dairy products. Generally well-tolerated and considered safe. Some people with corn or soy allergies may react if the xanthan gum was fermented on those substrates. In very large amounts it can have laxative effects. Overall, it is among the less concerning food additives — low risk for most people.',
  ARRAY['Not banned in major markets'],
  'Low concern. If you have corn or soy allergies, look for xanthan gum derived from sugar beets or glucose. Alternatives include guar gum, arrowroot powder, or simply less processed foods that do not require thickeners.',
  null
),

(
  'Guar Gum',
  ARRAY['Guar Gum', 'E412', 'guaran', 'guar flour'],
  'low',
  'A natural fiber derived from guar beans, used as a thickener in ice cream, baked goods, sauces, and gluten-free products. Generally considered safe and well-tolerated. Has some beneficial properties — it can help lower blood sugar and cholesterol in large amounts. At very high doses it can cause digestive discomfort. One of the cleaner food thickeners in common use.',
  ARRAY['Not banned in major markets'],
  'Low concern. Among the safest thickeners available. Naturally present in legumes.',
  null
),

(
  'Polydextrose',
  ARRAY['Polydextrose', 'E1200', 'polydextrose fiber'],
  'low',
  'A synthetic soluble fiber made from glucose, used as a low-calorie bulking agent in reduced-sugar and reduced-fat foods — cookies, candy, ice cream, and meal replacement bars. The FDA classifies it as GRAS. It passes largely undigested and can cause gas and bloating at high intake levels. Used to add bulk and improve texture in "light" products while keeping calorie counts down.',
  ARRAY['Not banned in major markets'],
  'Whole foods with naturally occurring fiber — vegetables, fruits, legumes, whole grains. Skip the "light" and "reduced sugar" processed foods that rely on polydextrose as a filler.',
  null
),

-- ============================================================
-- FLAVOR ENHANCERS
-- ============================================================

(
  'MSG (Monosodium Glutamate)',
  ARRAY['MSG', 'Monosodium Glutamate', 'E621', 'sodium glutamate', 'glutamic acid sodium salt'],
  'medium',
  'A flavor enhancer made from the sodium salt of glutamic acid, used in chips, fast food, instant noodles, processed meats, and restaurant food. MSG is one of the most misunderstood food additives. The FDA considers it safe. "Chinese Restaurant Syndrome" — the idea that MSG causes headaches and numbness — has largely not been replicated in double-blind studies. However, some research suggests glutamate overconsumption may affect brain chemistry, and MSG is often a marker of heavily processed food. The medium rating here reflects uncertainty and individual sensitivity, not broad danger. Some countries restrict its use in infant formula and foods for young children.',
  ARRAY['EU (E621, not permitted in baby food)', 'Australia/New Zealand (restricted in infant formula)'],
  'Food seasoned with real ingredients — herbs, spices, fermented foods like miso and parmesan naturally contain glutamates. Cooking with whole ingredients eliminates the need for MSG as a flavor shortcut.',
  null
),

(
  'Disodium Inosinate',
  ARRAY['Disodium Inosinate', 'E631', 'sodium inosinate', 'IMP', 'inosinic acid disodium salt'],
  'medium',
  'A flavor enhancer derived from meat, fish, or fermented tapioca. Always used in combination with MSG or disodium guanylate — the three synergistically amplify each other''s umami flavor effect. Not suitable for vegetarians or vegans despite its innocent-sounding name (it is often derived from animal sources). People with gout should avoid it as it breaks down into purines. A signal that a food is heavily flavor-engineered.',
  ARRAY['EU (E631, not permitted in baby food)'],
  'Food with real seasoning. If you see disodium inosinate on a label, it is usually accompanied by MSG and disodium guanylate — a combination that signals heavy artificial flavoring.',
  null
),

(
  'Disodium Guanylate',
  ARRAY['Disodium Guanylate', 'E627', 'sodium guanylate', 'GMP', 'guanosine monophosphate disodium'],
  'medium',
  'A flavor enhancer derived from dried fish, dried seaweed, or sometimes yeast. Like disodium inosinate, it is used with MSG to create a synergistic umami effect, allowing manufacturers to use less MSG while achieving a stronger flavor hit. Not vegetarian or vegan in most cases. People with gout should avoid it. Its presence on a label is a reliable indicator of a heavily engineered food product.',
  ARRAY['EU (E627, not permitted in baby food)'],
  'Cook with naturally umami-rich whole ingredients: tomatoes, mushrooms, parmesan, miso, nutritional yeast, anchovies.',
  null
),

(
  'Autolyzed Yeast Extract',
  ARRAY['Autolyzed Yeast Extract', 'AYE', 'yeast extract', 'autolyzed yeast'],
  'medium',
  'A flavor enhancer made from yeast cells that have been broken down by their own enzymes. It is naturally rich in glutamates — which is why it functions like MSG and can be used in its place while appearing on the label as a "natural" ingredient. This is a legal and deliberate strategy by manufacturers. People sensitive to MSG may react to autolyzed yeast extract as well. Common in chips, soups, crackers, and frozen meals.',
  ARRAY['Not banned in major markets'],
  'Read labels carefully. "Autolyzed yeast extract" and "yeast extract" are common MSG substitutes in products marketed as "No MSG Added." Cook from scratch with herbs, spices, and real umami sources.',
  null
),

(
  'Hydrolyzed Vegetable Protein',
  ARRAY['Hydrolyzed Vegetable Protein', 'HVP', 'hydrolyzed soy protein', 'hydrolyzed corn protein', 'hydrolyzed wheat protein', 'hydrolyzed plant protein'],
  'medium',
  'A flavor enhancer made by breaking down plant proteins (usually soy, corn, or wheat) with acid or enzymes to release free glutamic acid. The free glutamates function identically to MSG as a flavor enhancer — and like autolyzed yeast extract, it allows manufacturers to avoid putting "MSG" on the label while achieving the same effect. The hydrolysis process can also generate small amounts of 3-MCPD, a potential carcinogen, though at low levels in most products.',
  ARRAY['Not banned in major markets; EU monitors 3-MCPD levels'],
  'Whole food cooking with real ingredients. Bone broth, miso, and aged cheeses provide natural umami without processing shortcuts.',
  null
),

(
  'Natural Flavors',
  ARRAY['Natural Flavors', 'natural flavor', 'natural flavoring', 'WONF', 'with other natural flavors', 'natural and artificial flavors'],
  'medium',
  'One of the most common — and misleading — ingredients on American food labels. The FDA defines "natural flavors" as flavors derived from plant or animal sources, but does not require disclosure of what those sources are. A single "natural flavor" ingredient can represent dozens of individual chemical compounds. They can be derived from beaver anal glands (castoreum, used in vanilla and raspberry flavor), insects, shellfish, or meat — none of which would be apparent to a vegetarian, vegan, kosher, or halal consumer. The medium rating is not for safety but for transparency: "natural flavors" systematically obscures what you are eating.',
  ARRAY['EU (more prescriptive labeling requirements under Regulation 1334/2008)', 'Switzerland (stricter natural flavor definitions)'],
  'Products that list actual flavor sources: "vanilla extract," "lemon oil," "real strawberry." Buy products where the flavor comes from the whole food ingredient, not an engineered extract.',
  null
),

(
  'Artificial Flavors',
  ARRAY['Artificial Flavors', 'artificial flavor', 'artificial flavoring', 'synthetic flavor'],
  'medium',
  'Synthetic chemical compounds designed to mimic natural flavors, derived from petroleum or other non-food sources. The FDA allows hundreds of artificial flavor compounds without individual disclosure — "artificial flavors" can legally represent a single compound or a complex mixture of hundreds. While most individual artificial flavor chemicals are approved at low doses, the long-term effects of consuming combinations of synthetic flavor compounds across many products simultaneously is essentially unstudied. Their presence is a reliable marker of heavily processed food.',
  ARRAY['EU (more restrictive approved list under Regulation 1334/2008)', 'Many countries require specific disclosure of flavor type'],
  'Whole foods with naturally occurring flavor. Products that source flavor from real ingredients — real vanilla beans, real fruit, real herbs. The presence of artificial flavors usually indicates the product lacks the real ingredient it is pretending to taste like.',
  null
),

-- ============================================================
-- BLEACHING & MATURING AGENTS
-- ============================================================

(
  'Chlorine Dioxide',
  ARRAY['Chlorine Dioxide', 'E926', 'chlorine oxide', 'ClO2'],
  'medium',
  'A bleaching agent used in flour to whiten and mature it rapidly. Also used to sanitize drinking water and food processing equipment. As a flour treatment, it leaves no residue at permitted levels. Banned in the EU as a flour treatment agent. Distinct from bleach (sodium hypochlorite) but similarly reactive. Concerns relate to the destruction of naturally occurring nutrients in wheat during bleaching.',
  ARRAY['EU (banned as flour treatment, E926)', 'UK (banned)', 'Australia (not permitted as flour bleach)'],
  'Unbleached flour — look for "unbleached" on the label. Whole wheat flour. Freshly milled flour from small mills.',
  null
),

(
  'Benzoyl Peroxide',
  ARRAY['Benzoyl Peroxide', 'E928', 'dibenzoyl peroxide', 'BPO'],
  'medium',
  'A flour bleaching agent used to whiten flour and accelerate aging (maturation). Reacts with flour proteins to improve baking characteristics. Banned in the EU and many other countries. In the US it is permitted in flour. Primarily a bleaching agent rather than a preservative. Its presence is a sign of heavily processed white flour.',
  ARRAY['EU (banned as food additive, E928)', 'UK (banned)', 'Australia (not permitted in flour)', 'China (banned in flour)'],
  'Unbleached flour. Whole grain flours that have not been chemically treated.',
  null
),

(
  'Calcium Peroxide',
  ARRAY['Calcium Peroxide', 'E930', 'calcium dioxide', 'CaO2'],
  'low',
  'A dough conditioner and flour bleaching agent that releases oxygen when it contacts water in dough. Used to improve the handling properties of dough. Banned in the EU as a flour treatment. Generally considered to leave no significant residue and low health risk, but its use is a sign of industrial flour processing.',
  ARRAY['EU (banned as flour treatment, E930)', 'UK (banned)'],
  'Unbleached, unconditioned flour from trusted mills. Sourdough bread made with simple ingredients.',
  null
),

-- ============================================================
-- THICKENERS & TEXTURIZERS
-- ============================================================

(
  'Modified Food Starch',
  ARRAY['Modified Food Starch', 'modified starch', 'modified corn starch', 'modified tapioca starch', 'modified potato starch', 'E1404', 'E1412', 'E1414', 'E1422'],
  'low',
  'Starch that has been physically, enzymatically, or chemically treated to alter its properties — improving stability, texture, or how it behaves at different temperatures. Found in soups, sauces, frozen meals, baby food, and countless processed foods. "Modified" refers to the processing, not genetic modification. Generally considered safe. The main concerns are that it provides empty calories, may be derived from GM corn, and is often used to reduce the real-food content of products while maintaining an appealing texture.',
  ARRAY['Not banned in major markets'],
  'Whole food thickeners: arrowroot powder, tapioca flour, or simply reducing liquids naturally. Cook from scratch where the natural texture of ingredients provides body.',
  null
),

(
  'Methylcellulose',
  ARRAY['Methylcellulose', 'E461', 'methyl cellulose', 'Methocel'],
  'low',
  'A synthetic fiber derived from plant cellulose, used as a thickener, emulsifier, and bulking agent in diet foods, sauces, and as a fat replacer. Unusual property: it gels when heated and liquefies when cooled (opposite of gelatin). Widely used in plant-based meat alternatives for their texture. Generally considered safe — it passes through the body undigested and is used medicinally as a laxative. Its presence is primarily a marker of heavily engineered food.',
  ARRAY['Not banned in major markets'],
  'Whole plant-based foods. If eating plant-based meats, look for versions with shorter, more recognizable ingredient lists.',
  null
),

(
  'Hydroxypropyl Methylcellulose',
  ARRAY['Hydroxypropyl Methylcellulose', 'HPMC', 'E464', 'hypromellose'],
  'low',
  'A semi-synthetic polymer derived from cellulose, used as a thickener, stabilizer, and emulsifier in sauces, dressings, gluten-free baked goods, and plant-based products. Also used in pharmaceutical tablet coatings and eye drops. Generally considered safe — passes through the body without being absorbed. Primarily a marker of highly processed food formulation.',
  ARRAY['Not banned in major markets'],
  'Naturally gluten-free whole grains like rice, quinoa, and oats. Homemade sauces thickened with arrowroot or reduction.',
  null
),

(
  'Alginate',
  ARRAY['Alginate', 'sodium alginate', 'alginic acid', 'E400', 'E401', 'E402', 'E403', 'E404', 'potassium alginate', 'calcium alginate'],
  'low',
  'A natural polysaccharide extracted from brown seaweed, used as a thickener and gelling agent in ice cream, salad dressings, and some restructured foods (like imitation crab). Also used in the food industry to create "fake" foods — spherified liquids, restructured olives, and the like. Generally considered safe and natural. Some people with seaweed allergies may react.',
  ARRAY['Not banned in major markets'],
  'Real whole foods rather than restructured or spherified imitations. Real olives, real crab. For thickening, agar-agar (also seaweed-derived) or arrowroot.',
  null
),

(
  'Locust Bean Gum',
  ARRAY['Locust Bean Gum', 'carob bean gum', 'E410', 'LBG', 'carob gum'],
  'low',
  'A natural thickener derived from the seeds of the carob tree, used in dairy products, ice cream, and gluten-free baked goods. One of the cleaner food thickeners available. Has shown some beneficial prebiotic properties. Generally safe for most people, though some infants may have difficulty digesting it — hence its prohibition in infant formula in the EU.',
  ARRAY['EU (not permitted in infant formula)'],
  'Low concern for adults. One of the more natural thickeners in commercial use.',
  null
),

(
  'Microcrystalline Cellulose',
  ARRAY['Microcrystalline Cellulose', 'MCC', 'E460', 'cellulose', 'powdered cellulose'],
  'low',
  'Purified wood pulp or cotton fiber used as an anti-caking agent, texturizer, and fat substitute in shredded cheese, table-top sweeteners, baked goods, and low-fat products. While plant-derived and generally safe, it provides no nutritional value. Its use in shredded cheese to prevent clumping is controversial — it slightly dilutes the cheese content. Large amounts may reduce absorption of nutrients.',
  ARRAY['Not banned in major markets'],
  'Block cheese that you shred yourself. Whole grain products. Foods without anti-caking agents.',
  null
),

-- ============================================================
-- ANTI-CAKING AGENTS
-- ============================================================

(
  'Silicon Dioxide',
  ARRAY['Silicon Dioxide', 'E551', 'silica', 'amorphous silica', 'synthetic amorphous silica', 'SiO2'],
  'low',
  'An anti-caking agent made from silica (the same material as quartz and glass) used in powdered foods, table salt, spice mixes, and supplements to prevent clumping. Food-grade silicon dioxide is amorphous (not crystalline), unlike industrial silica which is linked to lung disease when inhaled. At food use levels it is generally considered safe. Concerns exist about nanoparticle forms that may cross the gut barrier — EU restricted nanoform silicon dioxide (E551) in 2023.',
  ARRAY['EU (nanoform E551 suspended 2023, traditional use permitted with restrictions)'],
  'Low concern for traditional forms. Buy fresh spices in whole form and grind yourself. Choose sea salt without anti-caking agents.',
  null
),

(
  'Sodium Aluminosilicate',
  ARRAY['Sodium Aluminosilicate', 'E554', 'sodium silicoaluminate', 'aluminosilicate', 'aluminum sodium silicate'],
  'medium',
  'An aluminum-containing anti-caking agent used in table salt, powdered mixes, and processed foods. The concern is aluminum — accumulation in the body has been linked to neurological effects, and aluminum exposure is associated with Alzheimer''s disease risk, though the causal relationship is debated. The EU has stricter limits on aluminum in food than the US.',
  ARRAY['EU (E554, restricted daily tolerable intake for aluminum compounds)'],
  'Sea salt or Himalayan salt without anti-caking agents. Look for salt labeled "no additives" or "anti-caking agent free." Many natural salts naturally resist clumping.',
  null
),

(
  'Yellow Prussiate of Soda',
  ARRAY['Yellow Prussiate of Soda', 'sodium ferrocyanide', 'E535', 'tetrasodium ferrocyanide'],
  'medium',
  'A cyanide-derived anti-caking agent used in table salt. Despite the alarming name, food-grade sodium ferrocyanide is considered a tightly bound, stable compound that does not release toxic cyanide under normal conditions. However, its name and origin understandably concern consumers. It is one of several aluminum-free anti-caking agents, but the presence of a cyanide-derived compound in table salt is not something most people are aware of.',
  ARRAY['EU (E535, permitted but restricted maximum levels)', 'Some countries require disclosure'],
  'Sea salt, kosher salt, or salt labeled with no anti-caking agents. Himalayan pink salt. Real salt without processing additives.',
  null
),

(
  'Magnesium Silicate',
  ARRAY['Magnesium Silicate', 'E553a', 'magnesium trisilicate', 'talc (food grade)'],
  'medium',
  'An anti-caking agent used in table salt, powdered sugar, and some food-grade applications. Chemically related to talc. The concern: industrial talc has been linked to ovarian cancer when used as a personal care product, and some talc deposits contain asbestos. Food-grade magnesium silicate is processed differently and asbestos contamination is regulated, but the chemical family raises legitimate questions about regulatory oversight. Limited safety research specific to food-grade use.',
  ARRAY['EU (E553a, restricted to specific applications)'],
  'Salt without anti-caking agents. Pure spices and powders. Read labels on table salt — many brands add anti-caking agents unnecessarily.',
  null
),

-- ============================================================
-- PESTICIDE RESIDUES
-- ============================================================

(
  'Imidacloprid',
  ARRAY['Imidacloprid', 'Admire', 'Confidor', 'Gaucho', 'Merit', 'Provado', 'neonicotinoid'],
  'high',
  'A neonicotinoid insecticide — the world''s most widely used class of insecticides — applied to corn, cotton, soybeans, leafy vegetables, and fruit trees. Imidacloprid is highly toxic to bees and other pollinators; it accumulates in pollen and nectar and is linked to colony collapse disorder. It is systemic, meaning it is absorbed throughout the plant and cannot be washed off. Research links it to developmental neurotoxicity in children. Banned for outdoor agricultural use in the EU.',
  ARRAY['EU (banned for outdoor agricultural use 2018)', 'Canada (restricted outdoor use)', 'Brazil (restricted)'],
  'Certified organic produce — neonicotinoids cannot be used on certified organic crops. Look for pollinator-friendly certification.',
  null
),

(
  'Permethrin',
  ARRAY['Permethrin', 'Ambush', 'Pounce', 'Dragnet', 'pyrethroid insecticide'],
  'medium',
  'A synthetic pyrethroid insecticide used on vegetables, fruit, cotton, and grains. Highly toxic to fish and aquatic invertebrates. The EPA classifies it as a possible human carcinogen. Found as a residue on spinach, lettuce, strawberries, and other produce. Also widely used in military clothing and some household applications.',
  ARRAY['EU (restricted use, some applications banned)', 'Not permitted on certain crops in multiple countries'],
  'Buy certified organic leafy greens and soft-skinned fruits. Permethrin is on the EWG Dirty Dozen list of highest-residue produce.',
  null
),

(
  'Malathion',
  ARRAY['Malathion', 'Cythion', 'Dielathion', 'Fyfanon', 'organophosphate pesticide'],
  'high',
  'An organophosphate insecticide used on fruit, vegetables, and grain. The WHO upgraded its classification to "probably carcinogenic to humans" (Group 2A) in 2015. Like chlorpyrifos, it inhibits the enzyme acetylcholinesterase, affecting the nervous system. Found on oats, sweet peppers, strawberries, and spinach. Still widely used in the US; its use on oats is of particular concern given how much oat-based food children eat.',
  ARRAY['EU (banned)', 'UK (not approved for most uses)', 'Canada (restricted)'],
  'Certified organic oats, strawberries, and leafy greens. Check the EWG Dirty Dozen list annually for current high-residue crops.',
  null
),

(
  'Thiabendazole',
  ARRAY['Thiabendazole', 'TBZ', 'Mertect', 'Tecto', 'Arbotect', 'E233'],
  'medium',
  'A fungicide used post-harvest on citrus fruits, bananas, apples, and potatoes to prevent mold during storage and shipping. Applied to the skin, it can penetrate into the flesh. Particularly relevant for citrus zest — if you use lemon or orange zest, you are consuming the outer skin where thiabendazole is concentrated. Animal studies have shown reproductive toxicity.',
  ARRAY['EU (E233 not permitted as food additive; restricted pesticide residue levels)', 'Japan (strict residue limits)'],
  'Buy certified organic citrus if you use the zest. Organic bananas for children. Wash all conventionally grown produce — though washing reduces but does not eliminate systemic fungicides.',
  null
),

(
  'Imazalil',
  ARRAY['Imazalil', 'enilconazole', 'Magnate', 'Freshgard', 'Fungaflor'],
  'medium',
  'A post-harvest fungicide applied to citrus fruit, bananas, and some other produce to prevent mold. Like thiabendazole, it is applied to the skin and penetrates into the fruit. Classified as a possible human carcinogen by the EPA. Detected at high levels in orange juice. The EWG found imazalil on 90% of conventionally grown oranges tested.',
  ARRAY['EU (under review, residue limits tightened)', 'Several countries have lower tolerance levels than US'],
  'Organic oranges and citrus — especially if using the peel or consuming orange juice frequently. Wash citrus thoroughly before zesting, though washing does not remove systemic fungicides.',
  null
),

(
  'Diphenylamine',
  ARRAY['Diphenylamine', 'DPA', 'N-phenylaniline'],
  'medium',
  'A post-harvest wax coating applied to apples to prevent superficial scald (skin browning) during cold storage. Apples treated with DPA can be stored for up to 12 months. DPA can oxidize to form nitrosamines, which are known carcinogens. The EU banned DPA on apples and pears in 2012 after the industry failed to provide adequate safety data. US apples are frequently treated — meaning American apples cannot legally be exported to the EU.',
  ARRAY['EU (banned on apples and pears since 2012)', 'Russia (banned)', 'Many export markets restrict US apple imports for this reason'],
  'Buy certified organic apples. At minimum, peel conventionally grown apples. The EWG consistently ranks apples among the Dirty Dozen for pesticide residues.',
  null
),

(
  'Chlormequat',
  ARRAY['Chlormequat', 'chlormequat chloride', 'CCC', 'chlorocholine chloride', 'Cycocel'],
  'high',
  'A plant growth regulator used on oats, wheat, and rye to shorten stalks and prevent lodging (falling over). Not a pesticide per se, but a synthetic chemical that persists on grain. A 2024 EWG study found chlormequat in 80% of oat-based foods tested, including Quaker Oats products. Animal studies link it to reproductive toxicity, delayed puberty, and disrupted hormone function. The EPA has been expanding permitted uses of chlormequat in the US, while the EU maintains much stricter limits.',
  ARRAY['EU (strict maximum residue limits)', 'UK (tighter limits than US)'],
  'Certified organic oats and oat-based products — chlormequat cannot be used on organic crops. Check EWG''s annual updated findings on chlormequat in oat products.',
  null
),

-- ============================================================
-- GROWTH HORMONES & ANTIBIOTICS IN MEAT/DAIRY
-- ============================================================

(
  'Zeranol',
  ARRAY['Zeranol', 'Ralgro', 'zearalanol'],
  'high',
  'A synthetic estrogen growth hormone implanted in beef cattle to accelerate weight gain. Made from the same chemical family as zearalenone, a mycotoxin produced by mold on grain. It is a potent estrogen mimic — more potent than the estrogens naturally produced by the human body. No withdrawal period is required before slaughter, meaning residues can be present in beef at the time of consumption. Banned in the EU since 1989.',
  ARRAY['EU (banned since 1989)', 'Canada (banned)', 'Australia (banned)', 'Japan (banned)'],
  'USDA Certified Organic beef (hormone use prohibited). Beef labeled "no hormones administered" (verified by USDA). Grass-fed, pasture-raised beef from farms that explicitly do not use growth hormones.',
  null
),

(
  'Melengestrol Acetate',
  ARRAY['Melengestrol Acetate', 'MGA', 'Melengestrol'],
  'high',
  'A synthetic progestin used as a growth promotant in beef heifers, administered through feed. Unlike implanted hormones, it is mixed directly into cattle feed. As a synthetic steroid hormone with progestational activity, residues in beef tissue raise endocrine disruption concerns. Banned in the EU, Canada, and many other markets that import beef.',
  ARRAY['EU (banned)', 'Canada (banned)', 'Most major beef-importing countries outside the US ban its use'],
  'USDA Certified Organic beef. Beef labeled "no hormones added" with USDA verification. Direct-from-farm beef from producers who can confirm their practices.',
  null
),

(
  'Trenbolone Acetate',
  ARRAY['Trenbolone Acetate', 'TBA', 'Finaplix', 'Revalor'],
  'high',
  'A powerful synthetic androgen (male hormone) implanted in beef cattle and sheep for growth promotion. Structurally related to testosterone but significantly more potent. Environmental studies have shown that trenbolone metabolites in cattle manure runoff can cause feminization of male fish at extremely low concentrations. Residue concerns exist in beef liver and kidney. Banned for decades in the EU and many other markets.',
  ARRAY['EU (banned since 1989)', 'Canada (banned)', 'Australia (banned)', 'Most major beef-importing countries'],
  'USDA Certified Organic beef. Verified hormone-free beef from trusted farms. Reducing overall beef consumption, particularly non-organic ground beef which blends meat from many animals.',
  null
),

(
  'Ractopamine',
  ARRAY['Ractopamine', 'Paylean (pigs)', 'Optaflexx (cattle)', 'Topmax (turkeys)', 'phenethanolamine'],
  'high',
  'A beta-agonist drug fed to pigs, cattle, and turkeys in the final weeks before slaughter to promote lean muscle growth. Banned in over 160 countries including the entire EU, China, Russia, and most of Asia — which is why US pork and beef exports face trade barriers. Classified as a drug, not a hormone, meaning it does not require a withdrawal period. Human exposure studies are limited. It acts on the same receptors as adrenaline, and there are documented cases of cardiovascular effects in livestock. The Codex Alimentarius Commission refused to endorse ractopamine safety standards.',
  ARRAY['EU (banned)', 'China (banned — rejected shipments of US pork)', 'Russia (banned)', 'Taiwan (banned until 2021)', '160+ countries total'],
  'USDA Certified Organic pork, beef, or turkey (ractopamine is prohibited). Look for "ractopamine-free" certification. Chipotle, Applegate, and some other brands have committed to ractopamine-free sourcing.',
  null
),

(
  'Routine Antibiotic Use in Livestock',
  ARRAY['subtherapeutic antibiotics', 'growth-promoting antibiotics', 'antibiotic growth promoters', 'AGP', 'medically important antibiotics in feed'],
  'high',
  'For decades, low-dose antibiotics — including medically important ones like tetracyclines, penicillin, and erythromycin — were added to livestock feed not to treat disease, but to promote faster growth. The FDA began restricting this practice in 2017 (Guidance 213), requiring veterinary oversight. However, "disease prevention" use still allows broad prophylactic antibiotic use. The WHO has classified this practice as a critical driver of antimicrobial resistance (AMR) — arguably the most significant long-term food safety issue. Antibiotic residues in meat are regulated, but the resistance crisis is not about the residues: it is about the bacteria that develop resistance on farms and spread to humans.',
  ARRAY['EU (banned growth-promoting antibiotics since 2006)', 'UK (strict veterinary controls)', 'Denmark (model program with dramatic reduction)', 'Many countries ban medically important antibiotic use in healthy animals'],
  'USDA Certified Organic meat (no antibiotics ever, by law). Meat labeled "raised without antibiotics" (look for USDA Process Verified claim). Ask your butcher about sourcing. Reducing overall consumption of industrially raised meat.',
  null
),

-- ============================================================
-- CONTROVERSIAL BUT COMMON
-- ============================================================

(
  'Carrageenan',
  ARRAY['Carrageenan', 'E407', 'Irish moss extract', 'carrageenin', 'degraded carrageenan', 'poligeenan'],
  'medium',
  'A thickener and stabilizer extracted from red seaweed, used in dairy alternatives, infant formula, deli meats, and chocolate milk. Controversy centers on degraded carrageenan (poligeenan) — a lower molecular weight form that causes intestinal inflammation and cancer in animal models. The food-grade undegraded form is different, but some researchers argue it degrades in the acidic human stomach. The EU banned carrageenan from infant formula in 2018 after the European Food Safety Authority found it could not be confirmed safe for infants. The National Organic Standards Board has repeatedly voted to remove it from organic certification, but the USDA has not acted on that recommendation.',
  ARRAY['EU (banned in infant formula since 2018)', 'EU infant formula directive forbids its use for infants under 12 months'],
  'Dairy alternatives without carrageenan — these are increasingly available as the market responds to consumer demand. Coconut milk in cans. Almond and oat milks brands like Elmhurst that use no gums or carrageenan.',
  null
),

(
  'Refined Vegetable Oils',
  ARRAY['refined vegetable oil', 'canola oil', 'soybean oil', 'corn oil', 'cottonseed oil', 'sunflower oil (refined)', 'safflower oil (refined)', 'vegetable oil'],
  'medium',
  'Industrial seed oils — canola, soybean, corn, cottonseed, sunflower, and safflower — processed through high-heat refining, bleaching, and deodorizing (the RBD process). These oils are extremely high in omega-6 polyunsaturated fatty acids (PUFAs). The American diet already has a severely imbalanced omega-6 to omega-3 ratio (roughly 15–20:1 vs. the ancestral 1–4:1). Excess omega-6 drives inflammation. The high-temperature processing also creates oxidized lipids and trans fats. Most processed foods and restaurant food is cooked in these oils. Canola specifically is almost entirely GMO in the US.',
  ARRAY['Some countries restrict partially hydrogenated versions; refining process itself not banned'],
  'Cold-pressed extra virgin olive oil, avocado oil, coconut oil, butter, ghee, and tallow for cooking. These fats are more stable at cooking temperatures and have more balanced fatty acid profiles.',
  null
),

(
  'Palm Oil',
  ARRAY['Palm Oil', 'palm kernel oil', 'palmitate', 'sodium palmitate', 'RSPO palm oil', 'E570 (stearic acid from palm)'],
  'medium',
  'A saturated vegetable fat used in about half of all packaged foods — cookies, crackers, bread, chocolate, lipstick, soap, and biofuel. Palm oil itself is nutritionally similar to butter. The primary concern is environmental and ethical: palm plantations are a leading driver of rainforest destruction in Indonesia and Malaysia, home to orangutans, tigers, and elephants. The refining process also produces glycidyl esters, which the EFSA has classified as probable genotoxic carcinogens. RSPO (Roundtable on Sustainable Palm Oil) certification exists but is widely criticized for weak enforcement.',
  ARRAY['Not banned — environmental and processing concerns rather than direct food safety bans'],
  'Look for RSPO-certified palm oil if you choose products containing it. Better: choose products using olive oil, coconut oil, or sunflower oil instead. Many European brands have moved away from palm oil.',
  null
),

(
  'Enriched Bleached White Flour',
  ARRAY['enriched bleached flour', 'bleached enriched flour', 'enriched wheat flour', 'white flour', 'bleached flour', 'all-purpose flour (bleached)'],
  'medium',
  'White flour is made by removing the bran and germ from wheat, eliminating most of the fiber, vitamins, and minerals. Bleached flour goes further — it is chemically whitened and matured using chlorine dioxide, benzoyl peroxide, or other agents. The result is then "enriched" with a handful of synthetic vitamins (niacin, iron, thiamine, riboflavin, folic acid) to partially replace what was removed. The enrichment replaces perhaps 5 of the 30+ nutrients lost. The bleaching process destroys carotenoids and may leave trace chemical residues.',
  ARRAY['EU (bleached flour agents banned)', 'UK (banned bleaching)', 'Australia (banned bleaching agents in flour)'],
  'Unbleached, unbromated flour for baking. Whole wheat flour. Ancient grain flours (spelt, einkorn, emmer). Sourdough made from these flours.',
  null
),

(
  'Refined Salt (Iodized Table Salt)',
  ARRAY['table salt', 'iodized salt', 'refined salt', 'sodium chloride (refined)', 'free-flowing salt'],
  'low',
  'Standard table salt is mined salt that has been heavily refined to remove naturally occurring minerals, then has anti-caking agents added (silicon dioxide, sodium aluminosilicate, or others), and iodine added back as potassium iodide. The refining removes trace minerals like magnesium and potassium. The anti-caking agents carry their own concerns (see Silicon Dioxide, Sodium Aluminosilicate entries). The iodization is genuinely beneficial — iodine deficiency is a real public health concern. This is a low-risk entry, but the additives are unnecessary.',
  ARRAY['Not banned — anti-caking agent restrictions vary by country'],
  'Real sea salt, Himalayan pink salt, or Celtic grey salt — these contain trace minerals and typically do not require anti-caking agents. If iodine is a concern, get it from seaweed, seafood, or dairy rather than table salt.',
  null
),

-- ============================================================
-- ADDITIONAL HIGH-PRIORITY ITEMS
-- ============================================================

(
  'BVO (Brominated Vegetable Oil)',
  ARRAY['BVO', 'Brominated Vegetable Oil', 'E443', 'vegetable oil, brominated'],
  'high',
  'A synthetic emulsifier made by bonding bromine to vegetable oil, used to keep citrus flavors suspended in beverages like Mountain Dew, some sports drinks, and fruit sodas. Bromine accumulates in body fat and breast milk. Linked to memory loss, nerve damage, skin and mucous membrane issues at high doses. The FDA revoked its authorization in 2024 after decades of advocacy. PepsiCo and Coca-Cola began removing it from products after consumer campaigns in 2014. Its removal is now legally required in the US.',
  ARRAY['EU (never approved, E443 revoked)', 'India (banned)', 'Japan (banned)', 'USA (FDA revoked authorization 2024)'],
  'Most major beverage brands have already removed BVO. Check labels on store-brand citrus sodas and sports drinks — smaller manufacturers may still be using up existing supplies.',
  null
),

(
  'Partially Hydrogenated Oils',
  ARRAY['Partially Hydrogenated Oils', 'PHO', 'partially hydrogenated vegetable oil', 'partially hydrogenated soybean oil', 'partially hydrogenated cottonseed oil', 'partially hydrogenated corn oil', 'trans fat'],
  'high',
  'Vegetable oils processed with hydrogen gas to make them solid at room temperature, creating industrial trans fats. Once ubiquitous in margarine, shortening, crackers, cookies, fried food, and non-dairy creamers. The FDA removed partially hydrogenated oils from the GRAS list in 2015 and banned their addition to food by 2018 (with limited exceptions). Trans fats raise LDL cholesterol, lower HDL cholesterol, and dramatically increase cardiovascular disease risk. The WHO estimates trans fats cause 500,000 premature deaths globally per year and is pursuing their global elimination by 2023.',
  ARRAY['USA (banned 2018)', 'EU (banned since 2021, limit of 2g/100g fat)', 'Canada (banned 2018)', 'UK (banned)', 'Denmark (first country to ban, 2003)'],
  'Check labels carefully — products can still legally claim "0g trans fat" if the serving contains less than 0.5g. Look for "partially hydrogenated" in the ingredient list directly. Butter, ghee, and unrefined coconut oil are better solid fat choices.',
  null
),

(
  'Artificial Butter Flavor',
  ARRAY['Artificial Butter Flavor', 'diacetyl', 'acetoin', 'butter flavor', 'natural butter flavor'],
  'high',
  'The synthetic compound responsible for microwave popcorn''s butter flavor is primarily diacetyl. Workers in microwave popcorn factories developed a severe and irreversible lung disease called "popcorn lung" (bronchiolitis obliterans) from inhaling diacetyl vapor. Several manufacturers reformulated after lawsuits, replacing diacetyl with acetoin — which metabolizes back into diacetyl in the body. The FDA has listed diacetyl as GRAS when consumed, but inhalation is the primary route of harm for factory workers and heavy microwave popcorn users who breathe the steam when opening bags.',
  ARRAY['EU (occupational exposure limits for diacetyl)', 'OSHA has proposed workplace exposure limits'],
  'Air-popped popcorn seasoned with real butter, olive oil, nutritional yeast, or spices. When you must microwave, open the bag away from your face and let steam dissipate before eating.',
  null
),

(
  'Acrylamide',
  ARRAY['Acrylamide', 'propenamide', 'acrylic amide'],
  'high',
  'Not a food additive — acrylamide forms naturally when starchy foods are cooked at high temperatures (above 250°F/120°C) through a reaction between sugars and the amino acid asparagine. Present in French fries, potato chips, bread crusts, breakfast cereals, coffee, crackers, and toast. The IARC classifies it as a probable human carcinogen (Group 2A). California requires Prop 65 cancer warning labels on products with high acrylamide levels, leading to the Starbucks coffee lawsuit. The EU has established benchmark levels and requires food businesses to monitor acrylamide formation.',
  ARRAY['EU (benchmark regulation since 2018, required mitigation steps)', 'California (Prop 65 warning required above thresholds)'],
  'Lower-temperature cooking. Boiling or steaming instead of frying. Lighter toasting. Storing potatoes at cool (not refrigerator) temperatures — cold storage increases sugar content and acrylamide formation. Soaking cut potatoes before frying.',
  null
),

(
  'Perfluoroalkyl Substances (PFAS)',
  ARRAY['PFAS', 'PFOA', 'PFOS', 'perfluorooctanoic acid', 'perfluorooctane sulfonate', 'forever chemicals', 'GenX', 'PFBS', 'fluoropolymers'],
  'high',
  '"Forever chemicals" that do not break down in the environment or the human body. They leach from non-stick cookware (Teflon/PTFE coatings), microwave popcorn bags, fast food wrappers, pizza boxes, and food packaging into food. Found in the blood of virtually all Americans. Linked to cancer (kidney, testicular), thyroid disease, immune suppression, reproductive harm, and developmental toxicity. The EPA set near-zero drinking water limits for several PFAS in 2024.',
  ARRAY['EU (comprehensive PFAS restrictions under development)', 'Denmark (banned PFAS in food packaging 2020)', 'US FDA (voluntary phase-out of some PFAS in food packaging)'],
  'Cast iron, stainless steel, or ceramic cookware instead of non-stick. Avoid microwave popcorn bags, grease-resistant fast food packaging, and water-repellent food containers. Filter drinking water with certified PFAS-removing filters.',
  null
),

(
  'Nitrosamines',
  ARRAY['Nitrosamines', 'N-nitrosamines', 'NDMA', 'N-nitrosodimethylamine', 'NDEA', 'nitrosamine contamination'],
  'high',
  'Carcinogenic compounds formed when nitrates or nitrites (from preservatives or vegetables) react with proteins (amines) under heat or in the acidic stomach environment. Found in processed meats, cured fish, beer, and some cheeses. Also formed in the body after consuming nitrite-preserved meats. The IARC classifies processed meat consumption as a Group 1 carcinogen — the nitrosamines from nitrite preservation are a key mechanism. Vitamin C (ascorbic acid) inhibits nitrosamine formation, which is why some manufacturers add it to cured meats.',
  ARRAY['EU (restrictions on nitrite levels in cured meats, phase-down plan)', 'UK (phasing out in bacon and ham)'],
  'Uncured meats preserved with celery juice or sea salt (though celery juice contains natural nitrates, the nitrosamine formation is lower). Vitamin C with cured meats reduces conversion. Minimize consumption of processed meats overall.',
  null
),

(
  'Bisphenol A (BPA)',
  ARRAY['BPA', 'Bisphenol A', 'bisphenol', '4,4-isopropylidenediphenol'],
  'high',
  'A synthetic estrogen used to make polycarbonate plastics and epoxy resins that line the inside of most food and beverage cans. BPA leaches from can linings into food — particularly acidic foods like tomatoes. A potent endocrine disruptor that mimics estrogen and has been linked to hormone-sensitive cancers, reproductive harm, early puberty, obesity, and cardiovascular disease. Many manufacturers have shifted to "BPA-free" alternatives, but some replacements (BPS, BPF) appear to carry similar endocrine disruption profiles.',
  ARRAY['EU (banned in baby bottles 2011, banned in food contact materials for infants 2018, comprehensive restriction under development)', 'Canada (declared toxic substance)', 'France (banned in food packaging 2015)', 'China (banned in baby bottles)'],
  'Buy tomatoes and beans in glass jars or Tetra Paks. Look for BPA-free cans (Eden Organics was an early adopter). Reduce overall reliance on canned food. Fresh and frozen alternatives avoid the can lining issue entirely.',
  null
),

(
  'Artificial Vanilla (Vanillin)',
  ARRAY['Vanillin', 'artificial vanilla', 'synthetic vanillin', 'ethyl vanillin', 'lignin vanillin'],
  'low',
  'The primary compound in vanilla flavor, produced synthetically from lignin (wood pulp), guaiacol (coal tar), or in some cases from beaver castoreum (though this is now rare and expensive). Used in chocolate, baked goods, cereals, and beverages where real vanilla is cost-prohibitive. Synthetic vanillin itself is considered safe. The concern is transparency — products labeled "vanilla flavor" without specifying "pure vanilla extract" contain synthetic vanillin. At low risk, but worth understanding what you''re actually buying.',
  ARRAY['Not banned in major markets'],
  'Products using "pure vanilla extract" rather than "vanilla flavor." Fair-trade vanilla extract or vanilla bean paste. The cost difference is real but the flavor and ingredient quality are meaningfully different.',
  null
),

(
  'Carnauba Wax',
  ARRAY['Carnauba Wax', 'E903', 'Brazil wax', 'palm wax', 'Copernicia cerifera wax'],
  'low',
  'A natural wax from the leaves of the Brazilian carnauba palm tree, used as a coating on fruits, vegetables, candy, and chewing gum to give a shiny appearance and extend shelf life. Generally considered safe and plant-derived. The main concern is that wax coatings on fresh produce (apples, cucumbers, peppers) are applied on top of — and can trap — pesticide residues, making washing less effective. The wax itself is not the problem; the sealed-in pesticides may be.',
  ARRAY['Not banned in major markets'],
  'Organic produce (lower pesticide load under the wax). Peeling wax-coated vegetables. Buying from local farmers who know their post-harvest handling practices.',
  null
),

(
  'Sodium Phosphate',
  ARRAY['Sodium Phosphate', 'E339', 'trisodium phosphate', 'TSP', 'disodium phosphate', 'monosodium phosphate', 'sodium orthophosphate'],
  'medium',
  'Phosphate salts used as emulsifiers, pH buffers, and moisture retainers in processed cheese, deli meats, frozen meals, and fast food. Americans consume far more phosphate than needed from the combination of natural food phosphates and the phosphate additives in processed foods. Excess phosphate intake is linked to accelerated kidney aging in healthy people and dramatically accelerated kidney disease progression in those with kidney disease. Also associated with cardiovascular calcification. People with kidney disease are specifically told to avoid high-phosphate foods.',
  ARRAY['Not banned in major markets; EU controls maximum levels (E339)'],
  'Real cheese (natural phosphates are less bioavailable than additive phosphates). Fresh rather than processed meats. Minimizing ultra-processed foods where multiple phosphate additives stack up.',
  null
),

(
  'Potassium Chloride',
  ARRAY['Potassium Chloride', 'KCl', 'E508', 'potassium salt', 'salt substitute'],
  'low',
  'A mineral salt used as a sodium substitute in "reduced sodium" products and as a salt enhancer. Generally safe and naturally occurring — it''s an essential mineral. However, people with kidney disease or taking ACE inhibitors or potassium-sparing diuretics must limit potassium intake, and potassium chloride in processed foods can accumulate to dangerous levels for them. At high doses it has a bitter, metallic taste that manufacturers mask by combining it with other flavor enhancers.',
  ARRAY['Not banned in major markets'],
  'Low concern for healthy adults. Reduce overall sodium and potassium chloride by cooking whole foods rather than relying on processed "reduced sodium" products.',
  null
),

(
  'Citric Acid',
  ARRAY['Citric Acid', 'E330', 'citric acid anhydrous', '2-hydroxypropane-1,2,3-tricarboxylic acid'],
  'low',
  'A naturally occurring acid found in citrus fruits, now predominantly produced commercially through mold fermentation of corn syrup (Aspergillus niger). Used as a preservative, flavoring, and pH adjuster in virtually all processed foods, beverages, and candy. Generally considered very safe. The concern for some people: commercial citric acid is always produced from mold fermentation on corn (often GM corn) and contains trace amounts of mold proteins, which have triggered reactions in people with mold sensitivities. This is a low-incidence issue but worth knowing for allergy-prone individuals.',
  ARRAY['Not banned in major markets'],
  'Low concern for most people. If you have mold sensitivities or corn allergies, check for citric acid reactions. Naturally sour flavors from real lemon juice or vinegar.',
  null
),

(
  'Natural and Artificial Flavors (Combined)',
  ARRAY['natural and artificial flavors', 'natural & artificial flavors', 'WONF (with other natural flavors)', 'flavors'],
  'medium',
  'When a label reads "natural and artificial flavors" together, it indicates both categories are present but neither is identified. This combined listing is the maximum level of opacity available to manufacturers — it obscures both the natural sources (which could include animal derivatives, allergens, or castoreum) and the synthetic compounds. One flavor may represent dozens of individual chemical compounds. The medium rating reflects the transparency problem, not proven harm from any specific compound.',
  ARRAY['EU (more disclosure requirements under Regulation 1334/2008)'],
  'Choose products where flavor comes from named whole food ingredients: "lemon juice," "vanilla extract," "real strawberry." The more specific the label, the less is being hidden.',
  null
),

(
  'Trisodium Phosphate (TSP) in Cereal',
  ARRAY['Trisodium Phosphate', 'TSP in food', 'E339iii', 'trisodium orthophosphate'],
  'medium',
  'Trisodium phosphate — the same compound sold in hardware stores as a heavy-duty cleaning agent — is an FDA-approved food additive used in breakfast cereals (including Honey Smacks and some Chex varieties) to control pH and improve texture. At food-use concentrations it is considered safe by the FDA. The concern is less about direct toxicity at these levels and more about what its presence signals: heavily industrialized food processing with pH adjustment requirements.',
  ARRAY['Not banned in major markets; hardware-store TSP and food-grade TSP are the same compound at different purity levels'],
  'Whole grain cereals without pH adjusters. Oatmeal. Muesli. Products with short, recognizable ingredient lists.',
  null
),

(
  'Acetylated Distarch Adipate',
  ARRAY['Acetylated Distarch Adipate', 'E1422', 'modified starch E1422', 'distarch adipate acetylated'],
  'low',
  'A chemically modified starch made from corn, potato, or wheat starch, used as a thickener and stabilizer in sauces, soups, frozen foods, and baby food. The modification makes it more stable under heat, cold, and acidity. Generally considered safe, but its presence in baby food has raised concerns in the EU, which has stricter limits on modified starches in foods for infants and young children. A reliable marker of heavily processed food.',
  ARRAY['EU (restricted in foods for infants under 12 months, specific maximum levels for young children)'],
  'Homemade baby food using whole foods. Adult products with natural thickeners.',
  null
),

(
  'Sodium Nitrate',
  ARRAY['Sodium Nitrate', 'E251', 'Chile saltpeter', 'NaNO3', 'sodium nitrate preservative'],
  'high',
  'A preservative and color fixative used in cured meats — particularly salami, pepperoni, and other dry-cured products. Converted to nitrite in the body, which then can form carcinogenic nitrosamines when it reacts with amines from protein. Distinct from sodium nitrite (E250) in its rate of conversion — nitrate is slower-acting and used in products requiring longer curing times. The IARC classifies processed meats containing these preservatives as Group 1 carcinogens.',
  ARRAY['EU (restricted use levels, phase-down plan for deli meats)', 'UK (phasing out of cured meats)', 'EU (not permitted in organic certified meats)'],
  'Uncured meats labeled "no nitrates or nitrites added" using celery juice or sea salt. Reduced consumption of all processed meats. Fresh-cooked meat without preservatives.',
  null
),

(
  'Carmine',
  ARRAY['Carmine', 'Red 4', 'cochineal extract', 'E120', 'crimson lake', 'natural red 4', 'CI 75470'],
  'low',
  'A red dye made from dried and crushed cochineal insects (Dactylopius coccus). Used in yogurt, fruit drinks, candy, and cosmetics. The FDA requires it to be listed by name rather than simply as "natural color." While natural in origin, carmine can cause severe allergic reactions — including anaphylaxis — in sensitive individuals. Concerns also exist around mislabeling in products claiming to be "all natural" or "plant-based," as carmine is an animal product and not acceptable to vegans, vegetarians, or those following halal or kosher diets.',
  ARRAY['Not banned, but mandatory labeling by name required in US and EU'],
  'Check ingredient labels on pink and red foods. Look for beet juice powder, raspberry extract, or hibiscus for natural red coloring without insect derivatives. Certified vegan products do not contain carmine.',
  null
),

(
  'Titanium Dioxide',
  ARRAY['Titanium Dioxide', 'TiO2', 'E171', 'CI 77891', 'titanium white'],
  'medium',
  'A white pigment used to make candy, chewing gum, frosting, and some sauces appear bright white. The EU banned it in 2022 after the European Food Safety Authority concluded it could cause DNA damage, with nanoparticles potentially accumulating in organs including the liver and kidney. The FDA still considers it safe at current use levels. The US and EU are now significantly misaligned on this ingredient.',
  ARRAY['EU (banned as food additive since 2022)', 'UK (under review post-Brexit)'],
  'Candy and gum without artificial whiteners. Many manufacturers have reformulated without TiO2 in response to the EU ban — check labels for updated ingredient lists.',
  null
),

(
  'Azodicarbonamide (ADA)',
  ARRAY['ADA', 'Azodicarbonamide', 'E927a', 'flour bleaching agent', 'dough conditioner', 'azo bis formamide'],
  'medium',
  'A flour bleaching and dough conditioning agent used in breads, rolls, and fast food buns. Also used industrially to make yoga mats, shoe soles, and foam plastics. Breaks down during baking into semicarbazide and urethane (ethyl carbamate) — both potential carcinogens. Linked to asthma in workers who handle it as a powder. Subway reformulated its bread without ADA following a consumer campaign in 2014. Banned in the EU, UK, and Australia.',
  ARRAY['EU (banned)', 'UK (banned)', 'Australia (banned)', 'Singapore (banned — $450K fine for use)'],
  'Bread made without dough conditioners — sourdough, artisan bread, European-style bread. Check fast food restaurant bread ingredients when available.',
  null
),

(
  'Potassium Bromate',
  ARRAY['Potassium Bromate', 'E924', 'bromated flour', 'bromate'],
  'high',
  'A flour maturing agent that strengthens dough and improves rise. Classified as a possible carcinogen by the IARC (Group 2B). Residual bromate remains in finished baked goods when bread is not baked long enough at a high enough temperature. Banned in most countries since the 1990s. Still legal in the US — the FDA proposed a ban in 1991 but never finalized it. California requires a Prop 65 cancer warning label on bromated baked goods.',
  ARRAY['EU (banned)', 'UK (banned)', 'Canada (banned)', 'China (banned)', 'Brazil (banned)', 'Nigeria (banned)', 'Sri Lanka (banned)', 'California (Prop 65 warning required)'],
  'Bread labeled "unbromated." Most artisan and bakery bread is unbromated. Whole grain bread. European bread brands. Look for "no potassium bromate" on commercial bread packaging.',
  null
),

(
  'BHA (Butylated Hydroxyanisole)',
  ARRAY['BHA', 'E320', 'tert-Butyl-4-hydroxyanisole', 'butylhydroxyanisole', '(1,1-dimethylethyl)-4-methoxyphenol'],
  'high',
  'A synthetic antioxidant preservative used in cereals, butter, snack foods, potato chips, and beer to prevent fats from going rancid. Listed as a possible human carcinogen (Group 2B) by the National Toxicology Program. Animal studies found tumor promotion in the forestomach. Also an endocrine disruptor that interferes with hormone signaling. The EU, UK, and Japan restrict its use significantly more than the US.',
  ARRAY['Japan (banned in many applications)', 'EU (strict maximum limits, E320)', 'UK (restricted)'],
  'Snacks preserved with vitamin E (tocopherols), rosemary extract, or in packaging that uses oxygen-barrier technology instead of chemical antioxidants.',
  null
),

(
  'BHT (Butylated Hydroxytoluene)',
  ARRAY['BHT', 'E321', 'dibutylhydroxytoluene', 'butylhydroxytoluene', '2,6-di-tert-butyl-p-cresol'],
  'medium',
  'A synthetic antioxidant preservative chemically similar to BHA, used in cereals, chips, instant mashed potatoes, and food packaging to prevent rancidity. Some studies suggest carcinogenic properties; others suggest it may have protective effects at low doses. Less definitively concerning than BHA but similarly precautionary restrictions apply in several countries. Also found in cosmetics and petroleum products.',
  ARRAY['UK (restricted)', 'Japan (banned in some applications)', 'Romania (banned)', 'Sweden (banned)', 'Australia (restricted in some applications)'],
  'Products preserved with natural antioxidants — vitamin E, rosemary extract, or citric acid. Fresh, minimally processed snacks.',
  null
),

(
  'High Fructose Corn Syrup',
  ARRAY['HFCS', 'High Fructose Corn Syrup', 'corn syrup', 'glucose-fructose syrup', 'isoglucose', 'HFCS-55', 'HFCS-42', 'fructose corn syrup'],
  'medium',
  'A highly processed sweetener derived from corn starch, used in sodas, condiments, bread, candy, and yogurt. The fructose component is metabolized differently from glucose — almost entirely in the liver — contributing to fatty liver disease, insulin resistance, obesity, and metabolic syndrome when consumed in excess. Not uniquely more dangerous than sugar, but its extremely low cost has led to it being added to a vast range of foods where sugar previously was not used, dramatically increasing total fructose consumption.',
  ARRAY['EU (quota restrictions limiting isoglucose until 2017; now price-competitive)', 'Hungary (sugar tax targeting it)'],
  'Water, unsweetened beverages, products sweetened with small amounts of organic cane sugar or honey. Read labels — HFCS hides in bread, condiments, and foods not typically thought of as sweet.',
  null
),

(
  'Aspartame',
  ARRAY['Aspartame', 'NutraSweet', 'Equal', 'E951', 'aspartyl-phenylalanine-1-methyl ester', 'L-aspartyl-L-phenylalanine methyl ester'],
  'medium',
  'An artificial sweetener about 200 times sweeter than sugar, found in diet sodas, sugar-free gum, tabletop sweeteners, and "light" yogurts. Must carry a warning for people with phenylketonuria (PKU) as it contains phenylalanine. In 2023, the WHO classified it as "possibly carcinogenic to humans" (Group 2B) based on limited evidence from observational studies. The FDA and EFSA maintain it is safe at current consumption levels. Breaks down into methanol and aspartic acid in the body.',
  ARRAY['Not fully banned, under review following WHO 2023 classification', 'EU requires PKU warning label'],
  'Stevia leaf extract, monk fruit sweetener, or simply choosing unsweetened products and reducing overall sweetness expectations.',
  null
),

(
  'Saccharin',
  ARRAY['Saccharin', "Sweet'N Low", 'E954', 'sodium saccharin', 'benzoic sulfimide'],
  'low',
  'The oldest artificial sweetener, discovered in 1879. From 1977 to 2000 the FDA required a cancer warning label after bladder cancer was found in male rats. The label was removed in 2000 when regulators determined the rat mechanism did not apply to humans. Recent studies link saccharin to disruption of gut microbiome composition and potential impairment of glucose tolerance at normal consumption doses.',
  ARRAY['Canada (was banned 1977-2014, now permitted)', 'Previously required warning labels in US (removed 2000)'],
  'Stevia or monk fruit sweetener for zero-calorie options. Reduce overall reliance on sweeteners rather than substituting one artificial option for another.',
  null
),

(
  'Tertiary Butylhydroquinone',
  ARRAY['TBHQ', 'tertiary butylhydroquinone', 'tert-butylhydroquinone', 'E319', 'antioxidant 319'],
  'high',
  'A petroleum-derived preservative. Duplicate entry — see the main TBHQ entry for full detail.',
  ARRAY['Japan (not permitted)', 'EU (strict maximum limits, E319)'],
  'Cold-pressed, unrefined oils preserved with vitamin E (tocopherols) or rosemary extract.',
  null
),

(
  'Brominated Vegetable Oil',
  ARRAY['Brominated Vegetable Oil', 'BVO', 'E443', 'brominated oil'],
  'high',
  'Duplicate entry — see BVO entry for full detail. FDA revoked authorization in 2024.',
  ARRAY['EU (never approved)', 'India (banned)', 'Japan (banned)', 'USA (FDA revoked 2024)'],
  'Check labels on citrus sodas and sports drinks. Major brands have removed BVO; smaller regional brands may still use existing inventory.',
  null
),

(
  'Glyphosate',
  ARRAY['Glyphosate', 'Roundup', 'N-(phosphonomethyl)glycine', 'isopropylamine salt of glyphosate', 'Rodeo', 'Accord'],
  'high',
  'The world''s most widely used herbicide, applied to GMO crops (Roundup Ready corn, soy, canola, cotton, sugar beets) and used as a pre-harvest desiccant on oats, wheat, and legumes. The WHO''s IARC classified it as "probably carcinogenic" in 2015. Found in urine samples of over 80% of Americans tested. Bayer/Monsanto has paid over $10 billion in settlements related to non-Hodgkin lymphoma claims. Also an antibiotic that disrupts gut microbiome. Found in oat-based cereals, whole wheat bread, and chickpeas even when not labeled GMO.',
  ARRAY['Austria (banned)', 'Vietnam (banned)', 'Sri Lanka (banned)', 'Thailand (partial ban)', 'Mexico (phase-out)', '14+ countries total', 'EU (under contentious renewal review)'],
  'Certified organic oats, wheat, and legumes — glyphosate cannot be used on certified organic crops. Test results from EWG show organic oat products have dramatically lower glyphosate levels.',
  null
),

(
  'Chlorpyrifos',
  ARRAY['Chlorpyrifos', 'Dursban', 'Lorsban', 'CPF', 'chlorpyrifos-ethyl'],
  'high',
  'An organophosphate pesticide used on fruits, vegetables, and nuts. Linked to neurodevelopmental harm in children, including lower IQ, developmental delays, and autism spectrum disorders. A 2021 federal appeals court ruled the EPA must ban it; the EPA finalized a ban on food uses in February 2022. Some residues may remain on food from prior use. Still legal for some non-food agricultural uses.',
  ARRAY['EU (banned)', 'UK (banned)', 'Canada (banned food uses)', 'Australia (banned)', 'New Zealand (banned)', 'USA (food use banned 2022)'],
  'Buy certified organic produce, especially apples, citrus, and grapes. Wash all produce thoroughly.',
  null
),

(
  'Atrazine',
  ARRAY['Atrazine', '2-chloro-4-ethylamino-6-isopropylamino-s-triazine', 'atrazine herbicide'],
  'high',
  'One of the most widely used herbicides in the US, applied to corn, sugarcane, and sorghum. A powerful endocrine disruptor linked to reproductive harm, feminization of male frogs at parts-per-billion concentrations, and potential human cancer risk. Contaminates drinking water — detected in tap water across the Midwest during runoff season. Banned in the EU since 2004.',
  ARRAY['EU (banned since 2004)', 'Switzerland (banned)', 'Germany (banned)', 'Austria (banned)', 'Italy (banned)', 'Sweden (banned)', '36+ countries total'],
  'Choose certified organic produce, especially corn. Support farms using cover crops and integrated pest management. Filter drinking water, particularly in agricultural regions.',
  null
),

(
  'rBGH / rBST',
  ARRAY['rBGH', 'rBST', 'recombinant bovine growth hormone', 'Posilac', 'recombinant bovine somatotropin', 'bovine somatotropin'],
  'high',
  'Synthetic growth hormone injected into dairy cows to increase milk production by 10–15%. Manufactured by Monsanto/Bayer under the brand name Posilac. Increases IGF-1 (insulin-like growth factor 1) levels in milk, which has been linked to breast, colon, and prostate cancers. The treated cows also suffer higher rates of mastitis, requiring more antibiotics. Banned in the EU, Canada, Australia, New Zealand, Japan, and many other countries — these nations refuse US dairy products that cannot be certified rBGH-free.',
  ARRAY['EU (banned)', 'Canada (banned)', 'Australia (banned)', 'New Zealand (banned)', 'Japan (banned)', 'Israel (banned)'],
  'Certified organic dairy products (rBGH prohibited). Dairy labeled "rBGH-free," "rBST-free," or "no artificial hormones." Grass-fed dairy from farms that explicitly do not use growth hormones.',
  null
),

(
  'Red 40 (Allura Red)',
  ARRAY['Red 40', 'Allura Red AC', 'FD&C Red No. 40', 'E129', 'CI 16035'],
  'high',
  'A petroleum-derived synthetic dye used to color foods red or orange — found in candy, fruit snacks, cereals, sports drinks, maraschino cherries, and medications. Linked to hyperactivity in children in the landmark McCann et al. study, after which the EU required warning labels on any food containing six specified dyes including Red 40. The FDA has not required a warning label. Some people experience allergic reactions including hives and swelling. Possible carcinogenic effects in animal studies.',
  ARRAY['EU (warning label required: "may have an adverse effect on activity and attention in children")', 'Norway (banned)', 'Finland (previously banned)', 'France (partial restrictions)'],
  'Beet juice powder, pomegranate juice concentrate, or hibiscus extract for natural red color. Read labels on anything red or orange — Red 40 is extraordinarily widespread.',
  'Analog Food''s founder has experienced this firsthand — his son becomes violently ill hours after consuming Red 40.'
),

(
  'Yellow 5 (Tartrazine)',
  ARRAY['Yellow 5', 'Tartrazine', 'FD&C Yellow No. 5', 'E102', 'CI 19140', 'acid yellow 23'],
  'medium',
  'A synthetic lemon-yellow dye derived from coal tar. Among the six dyes that triggered the EU warning label requirement following the McCann et al. study on children''s behavior. Linked to hyperactivity in children, hives, and asthma — particularly in aspirin-sensitive individuals, as there appears to be cross-reactivity. Found in candy, sports drinks, cereals, some pickles, and medications. Requires the EU activity/attention warning label.',
  ARRAY['Norway (banned)', 'Austria (previously banned)', 'EU (warning label: "may have an adverse effect on activity and attention in children")', 'Finland (restricted)'],
  'Turmeric, saffron, or beta-carotene for natural yellow coloring. Choose foods without artificial dyes — particularly for children.',
  null
),

(
  'Yellow 6 (Sunset Yellow)',
  ARRAY['Yellow 6', 'Sunset Yellow', 'FD&C Yellow No. 6', 'E110', 'CI 15985', 'orange yellow S'],
  'medium',
  'A coal tar-derived orange-yellow dye in beverages, candy, baked goods, and cereals. One of the six dyes subject to EU warning labels. Linked to attention and hyperactivity effects in children in the McCann study. Animal studies found adrenal gland and kidney tumors at high doses. Often co-occurs with Yellow 5 and Red 40 in multi-colored products.',
  ARRAY['Norway (banned)', 'Finland (previously banned)', 'EU (warning label required)'],
  'Annatto, paprika extract, or beta-carotene for natural orange-yellow hues. Avoid products combining multiple synthetic dyes.',
  null
),

(
  'Sodium Nitrite',
  ARRAY['Sodium Nitrite', 'E250', 'sodium nitrite preservative', 'NaNO2', 'nitrite'],
  'high',
  'A preservative and color fixative used in bacon, hot dogs, deli meats, and canned cured meats to prevent botulism and maintain the characteristic pink-red color. Reacts with amines in protein to form nitrosamines — potent carcinogens — particularly during high-heat cooking like frying bacon. The IARC classifies processed meat consumption (largely due to this mechanism) as a Group 1 carcinogen, the same category as tobacco. The EU is phasing down permitted nitrite levels in deli meats over public health concerns.',
  ARRAY['EU (phase-down of maximum permitted levels in cured meats)', 'UK (phasing out in bacon and ham)', 'EU organic certification (not permitted)'],
  'Uncured bacon and deli meats preserved with celery juice or sea salt. Minimize frying cured meats at high temperatures — boiling or baking reduces nitrosamine formation. Reduce overall processed meat consumption.',
  null
),

(
  'Propyl Paraben',
  ARRAY['Propyl Paraben', 'E216', 'propylhydroxybenzoate', 'propyl 4-hydroxybenzoate', 'propyl p-hydroxybenzoate'],
  'medium',
  'A paraben preservative used in baked goods, tortillas, and food dyes. Acts as a xenoestrogen — mimics estrogen by binding to estrogen receptors. Linked to reproductive harm including reduced sperm count and early puberty in animal studies. The EU banned propylparaben and butylparaben in cosmetics for children under 3 in 2014 and restricted their use in cosmetics broadly. While primarily a cosmetic concern, food use continues in the US.',
  ARRAY['EU (banned in cosmetics for children under 3, restricted in all leave-on cosmetics)', 'Denmark (restricted in baby products)', 'Japan (restricted)'],
  'Foods preserved with vitamin E, rosemary extract, or natural fermentation. Parabens are more common in cosmetics than food but still appear in commercially baked goods and sauces.',
  null
)

ON CONFLICT (name) DO NOTHING;
