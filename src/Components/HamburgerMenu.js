import "./HamburgerMenu.css";

import { Link } from "react-router-dom";

const HamburgerMenu = ({
  isConnected,
  handleLoginModalTrue,
  handleSignupModalTrue,
  handleLogout,
}) => {
  return (
    <div className="navigation">
      <input type="checkbox" id="checkbox" className="navigation-checkbox" />
      <label htmlFor="checkbox" className="navigation-btn">
        <span className="navigation-icon"></span>
      </label>
      <div className="menu">
        <ul>
          <li className="menu-content">
            <Link to={isConnected && "/publish"}>
              <button
                className="btn-send-clothes btn-green btn-menu-hamburger"
                onClick={!isConnected ? handleLoginModalTrue : undefined}
              >
                Vends tes articles
              </button>
            </Link>
          </li>
          {!isConnected ? (
            <>
              <li className="menu-content">
                <button
                  className="btn-signUp btn-white-border-green btn-menu-hamburger"
                  onClick={handleSignupModalTrue}
                >
                  S'inscrire
                </button>
              </li>
              <li className="menu-content">
                <button
                  className="btn-logIn btn-white-border-green btn-menu-hamburger btn-logIn-menu-hamburger"
                  onClick={handleLoginModalTrue}
                >
                  Se connecter
                </button>
              </li>
            </>
          ) : (
            <li className="menu-content">
              <button
                onClick={handleLogout}
                className="btn-white-border-green btn-menu-hamburger"
              >
                Se déconnecter
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
