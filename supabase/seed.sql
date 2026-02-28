-- ============================================================
-- Seed Data: Categories & Products for Organic Tea
-- ============================================================

-- Categories
insert into public.categories (id, name, slug, description, display_order) values
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Green Tea', 'green-tea', 'Premium organic green teas sourced from the finest gardens.', 1),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Herbal Tea', 'herbal-tea', 'Caffeine-free herbal blends for relaxation and wellness.', 2),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Black Tea', 'black-tea', 'Bold and rich black teas with deep, full-bodied flavors.', 3),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Specialty Blends', 'specialty-blends', 'Curated signature blends exclusive to Aurum Tea.', 4),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Wellness Tea', 'wellness-tea', 'Functional teas to support immunity, digestion, and calm.', 5)
on conflict (slug) do nothing;

-- Products
insert into public.products (name, slug, description, price, compare_at_price, category_id, stock_quantity, weight_grams, is_published, badge, rating, tags) values
  -- Green Teas
  ('Aurum Matcha Supreme', 'aurum-matcha-supreme',
   'Ceremonial-grade organic matcha from the highlands. Rich in antioxidants with a smooth, umami-forward flavor profile.',
   85.00, 110.00,
   'a1b2c3d4-0001-4000-8000-000000000001',
   50, 100, true, '25% OFF', 4.8,
   '{"organic", "matcha", "premium"}'
  ),
  ('Jasmine Dragon Pearl', 'jasmine-dragon-pearl',
   'Hand-rolled green tea pearls infused with fresh jasmine blossoms. Unfurls in hot water to release a delicate floral aroma.',
   72.00, null,
   'a1b2c3d4-0001-4000-8000-000000000001',
   35, 80, true, null, 4.6,
   '{"organic", "jasmine", "artisan"}'
  ),
  ('Sencha Gold Reserve', 'sencha-gold-reserve',
   'First-flush Japanese sencha with vibrant green color and crisp, vegetal notes. Perfect for daily drinking.',
   60.00, null,
   'a1b2c3d4-0001-4000-8000-000000000001',
   100, 120, true, 'New', 4.5,
   '{"organic", "sencha", "japanese"}'
  ),

  -- Herbal Teas
  ('Chamomile Dreams', 'chamomile-dreams',
   'Pure Egyptian chamomile flowers, gently dried for maximum relaxation. Perfect bedtime companion with honeyed sweetness.',
   55.00, null,
   'a1b2c3d4-0002-4000-8000-000000000002',
   80, 60, true, null, 4.7,
   '{"organic", "chamomile", "caffeine-free"}'
  ),
  ('Rooibos Sunset Blend', 'rooibos-sunset-blend',
   'South African rooibos with hints of vanilla and cinnamon. Naturally sweet and caffeine-free with earthy warmth.',
   48.00, 60.00,
   'a1b2c3d4-0002-4000-8000-000000000002',
   60, 90, true, 'Sales', 4.4,
   '{"organic", "rooibos", "caffeine-free"}'
  ),
  ('Peppermint Revive', 'peppermint-revive',
   'Crisp, cooling peppermint leaves for digestive comfort and mental clarity. Refreshing hot or iced.',
   42.00, null,
   'a1b2c3d4-0002-4000-8000-000000000002',
   120, 50, true, null, 4.3,
   '{"organic", "peppermint", "digestive"}'
  ),

  -- Black Teas
  ('Earl Grey Royale', 'earl-grey-royale',
   'Classic bergamot-infused black tea with a twist of Ghanaian citrus. Bold, aromatic, and elegantly refined.',
   65.00, null,
   'a1b2c3d4-0003-4000-8000-000000000003',
   45, 100, true, null, 4.9,
   '{"organic", "earl-grey", "bergamot"}'
  ),
  ('Assam Golden Tips', 'assam-golden-tips',
   'Premium golden-tipped Assam with malty sweetness and brisk finish. Ideal with or without milk.',
   78.00, 95.00,
   'a1b2c3d4-0003-4000-8000-000000000003',
   25, 110, true, '25% OFF', 4.7,
   '{"organic", "assam", "premium"}'
  ),
  ('English Breakfast Classic', 'english-breakfast-classic',
   'A robust, full-bodied blend perfect for mornings. Rich copper-colored liquor with satisfying depth.',
   52.00, null,
   'a1b2c3d4-0003-4000-8000-000000000003',
   0, 120, true, 'Sold Out', 4.5,
   '{"organic", "breakfast", "classic"}'
  ),

  -- Specialty Blends
  ('Golden Turmeric Elixir', 'golden-turmeric-elixir',
   'Warming turmeric and ginger blend with black pepper for enhanced absorption. Anti-inflammatory and delicious.',
   68.00, null,
   'a1b2c3d4-0004-4000-8000-000000000004',
   40, 80, true, 'New', 4.6,
   '{"organic", "turmeric", "anti-inflammatory"}'
  ),
  ('Rose Oolong Romance', 'rose-oolong-romance',
   'Semi-oxidized oolong rolled with dried rose petals. Floral, buttery, and utterly enchanting.',
   92.00, null,
   'a1b2c3d4-0004-4000-8000-000000000004',
   20, 70, true, null, 4.8,
   '{"organic", "oolong", "rose", "artisan"}'
  ),
  ('Spiced Chai Royale', 'spiced-chai-royale',
   'Bold Assam base with cardamom, cinnamon, cloves, and star anise. The ultimate chai experience.',
   58.00, 72.00,
   'a1b2c3d4-0004-4000-8000-000000000004',
   65, 100, true, 'Sales', 4.7,
   '{"organic", "chai", "spiced"}'
  ),

  -- Wellness Teas
  ('Immunity Shield', 'immunity-shield',
   'Echinacea, elderberry, and vitamin C-rich rosehip blend. Your daily defense against seasonal challenges.',
   62.00, null,
   'a1b2c3d4-0005-4000-8000-000000000005',
   55, 70, true, null, 4.5,
   '{"organic", "immunity", "wellness"}'
  ),
  ('Calm & Restore', 'calm-and-restore',
   'Lavender, passionflower, and lemon balm for stress relief. Gently calming without drowsiness.',
   56.00, null,
   'a1b2c3d4-0005-4000-8000-000000000005',
   70, 60, true, null, 4.6,
   '{"organic", "calm", "stress-relief"}'
  ),
  ('Detox Morning Glow', 'detox-morning-glow',
   'Dandelion root, milk thistle, and lemongrass for gentle daily detoxification. Start your morning right.',
   50.00, 65.00,
   'a1b2c3d4-0005-4000-8000-000000000005',
   90, 80, true, '25% OFF', 4.4,
   '{"organic", "detox", "morning"}'
  )
on conflict (slug) do nothing;
