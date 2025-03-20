import { PokerHand } from "../types";
import { formatCardText } from "../utils/cardHelpers";

interface HandCardProps {
  hand: PokerHand;
  onClick: () => void;
  isSelected: boolean;
}

export function HandCard({ hand, onClick, isSelected }: HandCardProps) {
  return (
    <div
      className={`hand-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <h3>{hand.name}</h3>
      <p>{hand.description}</p>
      <div className="example">{formatCardText(hand.example)}</div>
    </div>
  );
}
