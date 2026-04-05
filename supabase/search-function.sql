-- Analog Food — Ingredient fuzzy search function
-- Run this in Supabase SQL Editor (after schema.sql and seed files)
-- Creates an RPC function for improved ingredient search

CREATE OR REPLACE FUNCTION search_ingredients(query text)
RETURNS SETOF ingredients
LANGUAGE sql
STABLE
AS $$
  SELECT *
  FROM ingredients
  WHERE
    -- Exact or partial name match
    name ILIKE '%' || query || '%'
    -- Partial alias match (any alias contains the query)
    OR EXISTS (
      SELECT 1 FROM unnest(aliases) AS alias
      WHERE alias ILIKE '%' || query || '%'
    )
    -- Full-text search catches multi-word queries like "red dye" or "corn syrup"
    OR to_tsvector('english', name || ' ' || array_to_string(aliases, ' '))
       @@ plainto_tsquery('english', query)
  ORDER BY
    -- Exact name match first
    CASE WHEN lower(name) = lower(query) THEN 0
         -- Name starts with query
         WHEN name ILIKE query || '%' THEN 1
         -- Name contains query
         WHEN name ILIKE '%' || query || '%' THEN 2
         -- Alias exact match
         WHEN EXISTS (
           SELECT 1 FROM unnest(aliases) AS alias
           WHERE lower(alias) = lower(query)
         ) THEN 3
         -- Alias starts with query
         WHEN EXISTS (
           SELECT 1 FROM unnest(aliases) AS alias
           WHERE alias ILIKE query || '%'
         ) THEN 4
         -- Everything else (alias partial / full-text)
         ELSE 5
    END,
    -- Within same rank, high danger first
    CASE danger_level
      WHEN 'high' THEN 0
      WHEN 'medium' THEN 1
      WHEN 'low' THEN 2
    END
  LIMIT 5;
$$;

-- Grant public read access (anon key can call this)
GRANT EXECUTE ON FUNCTION search_ingredients(text) TO anon;
GRANT EXECUTE ON FUNCTION search_ingredients(text) TO authenticated;
