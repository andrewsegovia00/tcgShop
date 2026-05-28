import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'poke-sv-base-en',
    name: 'Pokémon Scarlet & Violet Base Set Booster Box',
    tcg: 'pokemon',
    language: 'english',
    type: 'booster-box',
    price: 144.99,
    stock: 15,
    description:
      'The Scarlet & Violet Base Set introduces Pokémon ex cards with stunning artwork. Each booster box contains 36 packs, with 10 cards per pack. Features over 190 cards including powerful Pokémon ex and full-art illustrations.',
    imageUrl:
      'https://placehold.co/300x400/fef9c3/854d0e?text=Pokemon+SV+Box+EN',
    featured: true,
  },
  {
    id: 'poke-sv-base-jp',
    name: 'Pokémon Scarlet & Violet Base Set Booster Box',
    tcg: 'pokemon',
    language: 'japanese',
    type: 'booster-box',
    price: 89.99,
    stock: 20,
    description:
      'Japanese edition of the Scarlet & Violet Base Set. 30 packs per box with 7 cards each. Japanese cards often feature different artwork and card numbering, making them highly sought after by collectors.',
    imageUrl:
      'https://placehold.co/300x400/fef9c3/854d0e?text=Pokemon+SV+Box+JP',
    featured: true,
  },
  {
    id: 'ygo-phantom-nightmare-en',
    name: 'Yu-Gi-Oh! Phantom Nightmare Booster Box',
    tcg: 'yugioh',
    language: 'english',
    type: 'booster-box',
    price: 79.99,
    stock: 10,
    description:
      'Phantom Nightmare brings new support for popular archetypes. Each booster box contains 24 packs with 9 cards each. Includes Ultra Rares, Super Rares, and rare Secret Rare pulls.',
    imageUrl:
      'https://placehold.co/300x400/ede9fe/4c1d95?text=YGO+Phantom+Box+EN',
    featured: true,
  },
  {
    id: 'ygo-phantom-nightmare-jp',
    name: 'Yu-Gi-Oh! Phantom Nightmare Booster Box',
    tcg: 'yugioh',
    language: 'japanese',
    type: 'booster-box',
    price: 64.99,
    stock: 8,
    description:
      'Japanese Phantom Nightmare booster box. Japanese Yu-Gi-Oh sets often release months before the international version. 30 packs per box, 7 cards per pack. Chance at quarter-century secret rares.',
    imageUrl:
      'https://placehold.co/300x400/ede9fe/4c1d95?text=YGO+Phantom+Box+JP',
    featured: false,
  },
  {
    id: 'mtg-karlov-manor-en',
    name: 'MTG Murders at Karlov Manor Draft Booster Box',
    tcg: 'mtg',
    language: 'english',
    type: 'booster-box',
    price: 109.99,
    stock: 12,
    description:
      'Solve the mystery in Ravnica with the Murders at Karlov Manor Draft Booster Box. Contains 36 packs, each with 15 cards optimized for draft play. Features the new "Disguise" and "Cloak" mechanics.',
    imageUrl:
      'https://placehold.co/300x400/dcfce7/14532d?text=MTG+Karlov+Box+EN',
    featured: true,
  },
  {
    id: 'mtg-lost-caverns-en',
    name: "MTG The Lost Caverns of Ixalan Collector Booster Box",
    tcg: 'mtg',
    language: 'english',
    type: 'booster-box',
    price: 219.99,
    stock: 5,
    description:
      "Dive deep with The Lost Caverns of Ixalan Collector Booster Box. Contains 12 collector packs, each guaranteed to have multiple rare and mythic rare cards plus extended art and special treatments.",
    imageUrl:
      'https://placehold.co/300x400/dcfce7/14532d?text=MTG+Ixalan+Box+EN',
    featured: false,
  },
  {
    id: 'poke-twilight-masquerade-en',
    name: 'Pokémon Twilight Masquerade Booster Pack',
    tcg: 'pokemon',
    language: 'english',
    type: 'booster-pack',
    price: 4.99,
    stock: 100,
    description:
      'Single booster pack from the Twilight Masquerade set. Contains 10 cards with a chance to pull ex Pokémon, full-art trainers, and hyper rares. Features Ogerpon and other Kitakami Pokémon.',
    imageUrl:
      'https://placehold.co/300x400/fef9c3/854d0e?text=Pokemon+TM+Pack+EN',
    featured: false,
  },
  {
    id: 'poke-twilight-masquerade-jp',
    name: 'Pokémon Twilight Masquerade Booster Pack',
    tcg: 'pokemon',
    language: 'japanese',
    type: 'booster-pack',
    price: 3.49,
    stock: 150,
    description:
      'Japanese single booster pack from the Twilight Masquerade set. 7 cards per pack with higher pull rates for rare cards compared to the English version. Great for collectors and players.',
    imageUrl:
      'https://placehold.co/300x400/fef9c3/854d0e?text=Pokemon+TM+Pack+JP',
    featured: false,
  },
  {
    id: 'ygo-legacy-destruction-en',
    name: 'Yu-Gi-Oh! Legacy of Destruction Booster Pack',
    tcg: 'yugioh',
    language: 'english',
    type: 'booster-pack',
    price: 3.99,
    stock: 80,
    description:
      'Single pack from the Legacy of Destruction set. 9 cards per pack with new support for Dragon, Fiend, and Warrior archetypes. Chance at Ultra Rares and Secret Rares in every pack.',
    imageUrl:
      'https://placehold.co/300x400/ede9fe/4c1d95?text=YGO+LEDE+Pack+EN',
    featured: false,
  },
  {
    id: 'ygo-legacy-destruction-jp',
    name: 'Yu-Gi-Oh! Legacy of Destruction Booster Pack',
    tcg: 'yugioh',
    language: 'japanese',
    type: 'booster-pack',
    price: 3.49,
    stock: 90,
    description:
      'Japanese single booster pack from Legacy of Destruction. 7 cards per pack. Japanese packs are often sleeved and pristine, making them popular with collectors chasing quarter-century secret rares.',
    imageUrl:
      'https://placehold.co/300x400/ede9fe/4c1d95?text=YGO+LEDE+Pack+JP',
    featured: false,
  },
  {
    id: 'mtg-thunder-junction-pack-en',
    name: 'MTG Outlaws of Thunder Junction Play Booster Pack',
    tcg: 'mtg',
    language: 'english',
    type: 'booster-pack',
    price: 4.99,
    stock: 120,
    description:
      'Single Play Booster Pack from Outlaws of Thunder Junction. 14 cards per pack, replacing both Draft and Set boosters. Guaranteed rare or mythic rare, plus a chance at The Big Score bonus cards.',
    imageUrl:
      'https://placehold.co/300x400/dcfce7/14532d?text=MTG+OTJ+Pack+EN',
    featured: false,
  },
  {
    id: 'mtg-thunder-junction-pack-jp',
    name: 'MTG Outlaws of Thunder Junction Play Booster Pack',
    tcg: 'mtg',
    language: 'japanese',
    type: 'booster-pack',
    price: 3.99,
    stock: 60,
    description:
      'Japanese edition Play Booster Pack from Outlaws of Thunder Junction. Features Japanese card art and text. Popular with collectors who appreciate the distinct Japanese card frame and typography.',
    imageUrl:
      'https://placehold.co/300x400/dcfce7/14532d?text=MTG+OTJ+Pack+JP',
    featured: false,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
