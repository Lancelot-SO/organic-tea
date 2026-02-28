-- Seed script for tea product categories
-- Safe to re-run: uses ON CONFLICT to upsert by slug

INSERT INTO categories (name, slug, display_order) VALUES
    ('Anti-Inflammatory Teas',       'anti-inflammatory-teas',       1),
    ('Aphrodisiac - Power Teas',     'aphrodisiac-power-teas',       2),
    ('Beauty Teas',                  'beauty-teas',                  3),
    ('Blood Pressure Teas',          'blood-pressure-teas',          4),
    ('Cholesterol Management Teas',  'cholesterol-management-teas',  5),
    ('Cramps',                       'cramps',                       6),
    ('Detox Teas',                   'detox-teas',                   7),
    ('Digestion',                    'digestion',                    8),
    ('Gift Card',                    'gift-card',                    9),
    ('Liver & Kidneys',              'liver-kidneys',                10),
    ('SWEETNER',                     'sweetner',                     11),
    ('Teas for Immune System Boost', 'teas-for-immune-system-boost', 12),
    ('Uncategorized',                'uncategorized',                13),
    ('Weight Loss Teas',             'weight-loss-teas',             14)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    display_order = EXCLUDED.display_order;
