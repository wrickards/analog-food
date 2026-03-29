-- Fix vendor data inaccuracies
-- Run in Supabase SQL Editor

-- 1. Remove Re_ Grocery (does not exist in New York)
delete from vendors where name = 'Re_ Grocery';

-- 2. Fix Farm to People — correct address is 1100 Flushing Ave, Brooklyn
update vendors
set
  address   = '1100 Flushing Ave',
  city      = 'Brooklyn',
  state     = 'NY',
  zip       = '11237',
  lat       = 40.7074,
  lng       = -73.9343,
  hours     = 'Mon–Fri 9am–6pm (pickup / delivery)',
  tags      = array['delivery', 'CSA-style', 'organic', 'direct from farms', 'Bushwick'],
  highlights = array['Direct farmer relationships', 'Weekly curated boxes', 'Certified organic options', 'Transparent sourcing']
where name = 'Farm to People';
