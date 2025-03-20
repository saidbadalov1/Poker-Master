const CARD_VALUES = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const CARD_SUITS = ["♠", "♣", "♥", "♦"] as const;

interface Card {
  value: string;
  suit: (typeof CARD_SUITS)[number];
}

export const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const suit of CARD_SUITS) {
    for (const value of CARD_VALUES) {
      deck.push({ value, suit });
    }
  }
  return deck;
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const formatCards = (cards: Card[]): string => {
  return cards.map((card) => `${card.value}${card.suit}`).join(" ");
};

export const generateRandomHand = (numCards: number): string => {
  const deck = shuffleDeck(generateDeck());
  const selectedCards = deck.slice(0, numCards);
  return formatCards(selectedCards);
};

export const generateRoyalFlush = (): string => {
  const suit = CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
  return `10${suit} J${suit} Q${suit} K${suit} A${suit}`;
};

export const generateStraightFlush = (): string => {
  const suit = CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
  const startIndex = Math.floor(Math.random() * 9);
  const values = CARD_VALUES.slice(startIndex, startIndex + 5);
  return values.map((value) => `${value}${suit}`).join(" ");
};

export const generateFourOfAKind = (): string => {
  const value = CARD_VALUES[Math.floor(Math.random() * CARD_VALUES.length)];
  const kicker = CARD_VALUES.find((v) => v !== value) || CARD_VALUES[0];
  const kickerSuit = CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
  return `${value}♠ ${value}♣ ${value}♥ ${value}♦ ${kicker}${kickerSuit}`;
};

export const generateFullHouse = (): string => {
  const [value1, value2] = CARD_VALUES.sort(() => Math.random() - 0.5).slice(
    0,
    2
  );
  return `${value1}♠ ${value1}♣ ${value1}♥ ${value2}♦ ${value2}♠`;
};

export const generateFlush = (): string => {
  const suit = CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
  const values = CARD_VALUES.sort(() => Math.random() - 0.5).slice(0, 5);
  return values.map((value) => `${value}${suit}`).join(" ");
};

export const generateStraight = (): string => {
  const startIndex = Math.floor(Math.random() * 9);
  const values = CARD_VALUES.slice(startIndex, startIndex + 5);
  return values
    .map((value) => {
      const suit = CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
      return `${value}${suit}`;
    })
    .join(" ");
};

export const generateThreeOfAKind = (): string => {
  const value = CARD_VALUES[Math.floor(Math.random() * CARD_VALUES.length)];
  const [kicker1, kicker2] = CARD_VALUES.filter((v) => v !== value)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  return `${value}♠ ${value}♣ ${value}♥ ${kicker1}♦ ${kicker2}♠`;
};

export const generateTwoPair = (): string => {
  const [value1, value2, kicker] = CARD_VALUES.sort(
    () => Math.random() - 0.5
  ).slice(0, 3);
  return `${value1}♠ ${value1}♣ ${value2}♥ ${value2}♦ ${kicker}♠`;
};

export const generateOnePair = (): string => {
  const value = CARD_VALUES[Math.floor(Math.random() * CARD_VALUES.length)];
  const kickers = CARD_VALUES.filter((v) => v !== value)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return `${value}♠ ${value}♣ ${kickers[0]}♥ ${kickers[1]}♦ ${kickers[2]}♠`;
};

export const generateHighCard = (): string => {
  return generateRandomHand(5);
};
