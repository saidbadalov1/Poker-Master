import { JSX } from "react";

const SYMBOLS = {
  "♠": "spade",
  "♣": "club",
  "♥": "heart",
  "♦": "diamond",
};

export function formatCardText(text: string): JSX.Element {
  const parts = text.split(/([♠♣♥♦])/);
  return (
    <>
      {parts.map((part, index) => {
        if (part in SYMBOLS) {
          return (
            <span
              key={index}
              className={`card-symbol ${SYMBOLS[part as keyof typeof SYMBOLS]}`}
            >
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
