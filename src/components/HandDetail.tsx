import { PokerHand } from "../types";
import { formatCardText } from "../utils/cardHelpers";

interface HandDetailProps {
  hand: PokerHand;
  onClose: () => void;
}

export const HandDetail = ({ hand, onClose }: HandDetailProps) => {
  return (
    <>
      <div className="detail-overlay" onClick={onClose}></div>
      <div className="hand-detail">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h3>{hand.name}</h3>
        <p>{hand.description}</p>
        <div className="example">{formatCardText(hand.example)}</div>
        <p>Sıralama: {hand.rank}</p>
      </div>
    </>
  );
};
