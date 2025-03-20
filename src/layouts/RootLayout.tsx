import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Footer } from "../components/Footer";

export function RootLayout() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <header className={`main-nav ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">
              <span className="logo-text">Poker</span>
              <span className="logo-accent">Master</span>
            </Link>
          </div>

          <button
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={isMenuOpen ? "active" : ""}>
            <ul>
              <li>
                <NavLink to="/" onClick={closeMenu}>
                  Hand Rankings
                </NavLink>
              </li>
              <li>
                <NavLink to="/quiz" onClick={closeMenu}>
                  Quiz
                </NavLink>
              </li>
              <li>
                <NavLink to="/game" onClick={closeMenu}>
                  Poker Game
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
