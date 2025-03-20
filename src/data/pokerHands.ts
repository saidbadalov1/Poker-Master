import {
  generateRoyalFlush,
  generateStraightFlush,
  generateFourOfAKind,
  generateFullHouse,
  generateFlush,
  generateStraight,
  generateThreeOfAKind,
  generateTwoPair,
  generateOnePair,
  generateHighCard,
} from "../utils/cardGenerator";

export interface PokerHand {
  id: number;
  name: string;
  description: string;
  example: string;
  rank: number;
}

export const generatePokerHands = (): PokerHand[] => [
  {
    id: 1,
    name: "Royal Flush",
    description: "Five consecutive cards of the same suit from 10 to Ace",
    example: generateRoyalFlush(),
    rank: 1,
  },
  {
    id: 2,
    name: "Straight Flush",
    description: "Five consecutive cards of the same suit",
    example: generateStraightFlush(),
    rank: 2,
  },
  {
    id: 3,
    name: "Four of a Kind",
    description: "Four cards of the same value",
    example: generateFourOfAKind(),
    rank: 3,
  },
  {
    id: 4,
    name: "Full House",
    description: "Three of a kind and a pair",
    example: generateFullHouse(),
    rank: 4,
  },
  {
    id: 5,
    name: "Flush",
    description: "Five cards of the same suit",
    example: generateFlush(),
    rank: 5,
  },
  {
    id: 6,
    name: "Straight",
    description: "Five consecutive cards",
    example: generateStraight(),
    rank: 6,
  },
  {
    id: 7,
    name: "Three of a Kind",
    description: "Three cards of the same value",
    example: generateThreeOfAKind(),
    rank: 7,
  },
  {
    id: 8,
    name: "Two Pairs",
    description: "Two different pairs",
    example: generateTwoPair(),
    rank: 8,
  },
  {
    id: 9,
    name: "One Pair",
    description: "Two cards of the same value",
    example: generateOnePair(),
    rank: 9,
  },
  {
    id: 10,
    name: "High Card",
    description: "Highest value card",
    example: generateHighCard(),
    rank: 10,
  },
];

export const pokerHands = generatePokerHands();
