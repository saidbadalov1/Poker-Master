import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About PokerMaster</h4>
          <p>
            Learn and master poker hands with our interactive tools. Perfect for
            beginners and experienced players alike.
          </p>
          <div className="social-links">
            <a
              href="https://github.com/saidbadalov1"
              target="_blank"
              rel="noopener noreferrer"
            >
              ⌥
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Hand Rankings</Link>
            </li>
            <li>
              <Link to="/quiz">Quiz Mode</Link>
            </li>
            <li>
              <Link to="/game">Practice Game</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul className="footer-links">
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Poker Rules
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Strategy Guide
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} PokerMaster. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
