import logoVinted from "../assets/images/vinted-logo.png";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header>
      <div className="wrapper-header container">
        <div className="header-call1">
          <Link to="/">
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
          <button className="btn-signUp">S'inscrire</button>
          <button className="btn-logIn">Se connecter</button>
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
