import { useState, useEffect } from "react";
import { pokerHands } from "../data/pokerHands";

interface Card {
  value: string;
  suit: "♠" | "♣" | "♥" | "♦";
}

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
const CARD_SUITS: ["♠", "♣", "♥", "♦"] = ["♠", "♣", "♥", "♦"];

const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const suit of CARD_SUITS) {
    for (const value of CARD_VALUES) {
      deck.push({ value, suit });
    }
  }
  return deck;
};

const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const formatCard = (card: Card) => {
  const symbolClass =
    card.suit === "♥" || card.suit === "♦" ? "heart" : "spade";
  return (
    <span className="game-card">
      <span className="card-value">{card.value}</span>
      <span className={`card-symbol ${symbolClass}`}>{card.suit}</span>
    </span>
  );
};

const getCardValue = (value: string): number => {
  const valueMap: { [key: string]: number } = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };
  return valueMap[value];
};

const isRoyalFlush = (cards: Card[]): boolean => {
  if (!isFlush(cards)) return false;
  const values = cards
    .map((card) => getCardValue(card.value))
    .sort((a, b) => a - b);
  return values.join(",") === "10,11,12,13,14";
};

const isStraightFlush = (cards: Card[]): boolean => {
  return isFlush(cards) && isStraight(cards);
};

const isFourOfAKind = (cards: Card[]): boolean => {
  const valueCounts = getValueCounts(cards);
  return Object.values(valueCounts).includes(4);
};

const isFullHouse = (cards: Card[]): boolean => {
  const valueCounts = getValueCounts(cards);
  const counts = Object.values(valueCounts);
  return counts.includes(3) && counts.includes(2);
};

const isFlush = (cards: Card[]): boolean => {
  const suit = cards[0].suit;
  return cards.every((card) => card.suit === suit);
};

const isStraight = (cards: Card[]): boolean => {
  const values = cards
    .map((card) => getCardValue(card.value))
    .sort((a, b) => a - b);

  if (values.join(",") === "2,3,4,5,14") return true;

  for (let i = 1; i < values.length; i++) {
    if (values[i] !== values[i - 1] + 1) return false;
  }
  return true;
};

const isThreeOfAKind = (cards: Card[]): boolean => {
  const valueCounts = getValueCounts(cards);
  return Object.values(valueCounts).includes(3);
};

const isTwoPair = (cards: Card[]): boolean => {
  const valueCounts = getValueCounts(cards);
  const pairs = Object.values(valueCounts).filter((count) => count === 2);
  return pairs.length === 2;
};

const isOnePair = (cards: Card[]): boolean => {
  const valueCounts = getValueCounts(cards);
  return Object.values(valueCounts).includes(2);
};

const getValueCounts = (cards: Card[]): { [key: string]: number } => {
  return cards.reduce((counts: { [key: string]: number }, card) => {
    counts[card.value] = (counts[card.value] || 0) + 1;
    return counts;
  }, {});
};

const findBestHand = (playerCards: Card[], communityCards: Card[]): number => {
  const allCards = [...playerCards, ...communityCards];
  const combinations = getCombinations(allCards, 5);

  for (const combo of combinations) {
    if (isRoyalFlush(combo)) return 1;
    if (isStraightFlush(combo)) return 2;
    if (isFourOfAKind(combo)) return 3;
    if (isFullHouse(combo)) return 4;
    if (isFlush(combo)) return 5;
    if (isStraight(combo)) return 6;
    if (isThreeOfAKind(combo)) return 7;
    if (isTwoPair(combo)) return 8;
    if (isOnePair(combo)) return 9;
  }
  return 10;
};

const getCombinations = (cards: Card[], r: number): Card[][] => {
  const combinations: Card[][] = [];
  const combine = (arr: Card[], n: number, start: number, combo: Card[]) => {
    if (n === 0) {
      combinations.push([...combo]);
      return;
    }
    for (let i = start; i <= arr.length - n; i++) {
      combo.push(arr[i]);
      combine(arr, n - 1, i + 1, combo);
      combo.pop();
    }
  };
  combine(cards, r, 0, []);
  return combinations;
};

export const PokerGame = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const [gameStage, setGameStage] = useState<
    "initial" | "flop" | "turn" | "river" | "showdown"
  >("initial");
  const [selectedHand, setSelectedHand] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [bestHandId, setBestHandId] = useState<number | null>(null);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newDeck = shuffleDeck(generateDeck());
    const playerCards = newDeck.slice(0, 2);
    const remainingDeck = newDeck.slice(2);

    setDeck(remainingDeck);
    setPlayerHand(playerCards);
    setCommunityCards([]);
    setGameStage("initial");
    setSelectedHand(null);
    setShowResult(false);
    setIsCorrect(null);
    setBestHandId(null);
  };

  const dealNextStage = () => {
    switch (gameStage) {
      case "initial":
        const flopCards = deck.slice(0, 3);
        setCommunityCards(flopCards);
        setDeck(deck.slice(3));
        setGameStage("flop");
        break;
      case "flop":
        const turnCard = deck.slice(0, 1);
        setCommunityCards([...communityCards, ...turnCard]);
        setDeck(deck.slice(1));
        setGameStage("turn");
        break;
      case "turn":
        const riverCard = deck.slice(0, 1);
        const newCommunityCards = [...communityCards, ...riverCard];
        setCommunityCards(newCommunityCards);
        setDeck(deck.slice(1));
        setGameStage("river");

        const bestHand = findBestHand(playerHand, newCommunityCards);
        setBestHandId(bestHand);
        break;
      case "river":
        setGameStage("showdown");
        break;
    }
  };

  const handleHandSelect = (handId: number) => {
    setSelectedHand(handId);
    setShowResult(true);
    setIsCorrect(handId === bestHandId);
  };

  return (
    <div className="poker-game">
      <div className="game-table">
        <div className="community-cards">
          {communityCards.map((card, index) => (
            <div key={index} className="card">
              {formatCard(card)}
            </div>
          ))}
        </div>

        <div className="player-hand">
          {playerHand.map((card, index) => (
            <div key={index} className="card">
              {formatCard(card)}
            </div>
          ))}
        </div>

        {gameStage !== "showdown" && (
          <button className="deal-button" onClick={dealNextStage}>
            {gameStage === "initial"
              ? "Deal Flop"
              : gameStage === "flop"
              ? "Deal Turn"
              : "Deal River"}
          </button>
        )}

        {gameStage === "showdown" && !selectedHand && (
          <div className="hand-selection">
            <h3>What's Your Hand?</h3>
            <div className="hand-options">
              {pokerHands.map((hand) => (
                <button
                  key={hand.id}
                  className="hand-option"
                  onClick={() => handleHandSelect(hand.id)}
                >
                  {hand.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {showResult && (
          <div className="game-result">
            <p className={isCorrect ? "correct-text" : "wrong-text"}>
              {isCorrect ? "Correct!" : "Wrong!"}
              {!isCorrect && bestHandId && (
                <span>
                  Your best hand:{" "}
                  {pokerHands.find((h) => h.id === bestHandId)?.name}
                </span>
              )}
            </p>
            <button className="next-button" onClick={startNewGame}>
              New Hand
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
