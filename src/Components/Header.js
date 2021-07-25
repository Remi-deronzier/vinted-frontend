import logoVinted from "../assets/images/vinted-logo.png";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import avatar from "../assets/images/avatar.png";

const Header = ({
  setShowSignupModal,
  setShowLoginModal,
  isConnected,
  setIsConnected,
}) => {
  const handleSignupModalTrue = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };
  const handleLoginModalTrue = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };
  const handleSignupLoginModalFalse = () => {
    setShowSignupModal(false);
    setShowLoginModal(false);
  };
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("avatar");
    setIsConnected("");
  };

  return (
    <header>
      <div className="wrapper-header container">
        <div className="header-call1">
          <Link to="/" onClick={handleSignupLoginModalFalse}>
            <img className="logo-vinted" src={logoVinted} alt="logo Vinted" />
          </Link>
          <div className="search-bar">
            <FontAwesomeIcon icon="search" className="icon-search" />
            <input
              type="text"
              placeholder="Rechercher des articles"
              className="search-input"
            />
          </div>
          {!isConnected ? (
            <div className="signup-login-div-header">
              <button className="btn-signUp" onClick={handleSignupModalTrue}>
                S'inscrire
              </button>
              <button className="btn-logIn" onClick={handleLoginModalTrue}>
                Se connecter
              </button>
            </div>
          ) : (
            <div className="login-header">
              <button onClick={handleLogout} className="btn-green">
                Se déconnecter
              </button>
              <img
                src={Cookies.get("avatar") || avatar}
                alt="avatar"
                className="avatar-header"
              />
            </div>
          )}
        </div>
        <div className="header-call2">
          <button className="btn-send-clothes btn-green">
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
