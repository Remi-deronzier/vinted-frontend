import logoVinted from "../assets/images/vinted-logo.png";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import avatar from "../assets/images/avatar.png";
import { useHistory } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";

const Header = ({
  setShowSignupModal,
  setShowLoginModal,
  isConnected,
  setIsConnected,
  search,
  setSearch,
  setRangeValues,
  setFinalRangeValues,
  rangeValues,
  setSort,
}) => {
  let history = useHistory();

  const handleSignupModalTrue = () => {
    setShowSignupModal(true);
  };

  const handleLoginModalTrue = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("avatar");
    Cookies.remove("username");
    setIsConnected("");
    history.push("/");
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleRange = (values) => {
    setRangeValues(values);
  };

  const handleFinalRange = (values) => {
    setFinalRangeValues(values);
  };

  const handleSort = (event) => {
    setSort(event.target.checked);
  };

  return (
    <header>
      <div className="wrapper-header container">
        <div className="header-call1">
          <Link to="/" className="div-logo">
            <img className="logo-vinted" src={logoVinted} alt="logo Vinted" />
          </Link>
          <div className="div-filter">
            <div className="search-bar">
              <FontAwesomeIcon icon="search" className="icon-search" />
              <input
                type="text"
                placeholder="Rechercher des articles"
                className="search-input"
                onChange={handleChangeSearch}
                value={search}
              />
            </div>
            <div className="filter-range-sort">
              <div className="filter-range">
                <p className="p-filter-range-sort">Prix entre : </p>
                <Range
                  step={5}
                  min={0}
                  max={300}
                  values={rangeValues}
                  onChange={(values) => handleRange(values)}
                  onFinalChange={(values) => handleFinalRange(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      className="track"
                      {...props}
                      style={{
                        background: getTrackBackground({
                          values: rangeValues,
                          colors: ["#ccc", "#09b0ba", "#ccc"],
                          min: 0,
                          max: 300,
                        }),
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div className="trackThumb" {...props}>
                      <div className="thumb-price">
                        {rangeValues[props.key]} €
                      </div>
                    </div>
                  )}
                />
              </div>
              <div className="toggle-filter-price">
                <p className="p-filter-range-sort">Trier par prix : </p>
                <input
                  className="input-filter-price"
                  type="checkbox"
                  id="toggle"
                  onChange={handleSort}
                />
                <label className="lb-filter-price" htmlFor="toggle"></label>
              </div>
            </div>
          </div>
          {!isConnected ? (
            <div className="signup-login-div-header">
              <button
                className="btn-signUp btn-white-border-green"
                onClick={handleSignupModalTrue}
              >
                S'inscrire
              </button>
              <button
                className="btn-logIn btn-white-border-green"
                onClick={handleLoginModalTrue}
              >
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
          <Link to={isConnected && "/publish"}>
            <button
              className="btn-send-clothes btn-green"
              onClick={!isConnected ? handleLoginModalTrue : undefined}
            >
              Vends tes articles
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
