import { useState } from "react";
import { pokerHands } from "../data/pokerHands";
import { HandCard } from "../components/HandCard";
import { HandDetail } from "../components/HandDetail";
import { Link } from "react-router-dom";

export const Home = () => {
  const [currentHand, setCurrentHand] = useState<(typeof pokerHands)[0] | null>(
    null
  );

  return (
    <div className="home-container">
      <div className="decorative-card top-left" />
      <div className="decorative-card top-right" />
      <div className="bottom-left decorative-card" />
      <div className="bottom-right decorative-card" />

      <div className="hero-section">
        <div className="hero-card" />
        <div className="hero-card" />
        <div className="hero-card" />
        <div className="hero-card" />
        <h1>Poker Hand Rankings</h1>
        <p className="hero-description">
          Learn and master Texas Hold'em poker hands. All poker hands ranked
          from highest to lowest!
        </p>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number">10</div>
          <div className="stat-label">Different Hands</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">52</div>
          <div className="stat-label">Cards</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{Math.pow(2, 10)}</div>
          <div className="stat-label">Possibilities</div>
        </div>
      </div>

      <div className="content-section">
        <div className="hands-grid">
          {pokerHands.map((hand) => (
            <HandCard
              key={hand.name}
              hand={hand}
              onClick={() => setCurrentHand(hand)}
              isSelected={currentHand?.name === hand.name}
            />
          ))}
        </div>
        {currentHand && (
          <>
            <div
              className="active detail-overlay"
              onClick={() => setCurrentHand(null)}
            />
            <div className="active detail-section">
              <HandDetail
                hand={currentHand}
                onClose={() => setCurrentHand(null)}
              />
            </div>
          </>
        )}
      </div>

      <div className="features-section">
        <h2 className="features-title">Features</h2>
        <div className="features-grid">
          <Link to="/quiz">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Quiz Mode</h3>
              <p>Test your knowledge and learn poker hands.</p>
            </div>
          </Link>

          <Link to="/game">
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Practice Mode</h3>
              <p>Practice with real poker hand scenarios.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
