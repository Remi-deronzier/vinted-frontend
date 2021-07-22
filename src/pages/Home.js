import { Link, useLocation } from "react-router-dom";
import Product from "../Components/Product";
import "./Home.css";
import welcomImage from "../assets/images/welcome-image.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import * as qs from "qs";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({ limit, setLimit, showSignupModal, setShowSignupModal }) => {
  const location = useLocation();
  const params = qs.parse(location.search.slice(1));
  console.log(params);
  const pageNumber = params.page ? params.page : 1;
  console.log(pageNumber);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState([]);
  // MOADAL
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealedPwd, setIsRevealedPwd] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-api-remi.herokuapp.com/offers?page=${pageNumber}&limit=${limit}`
        );
        setData(response.data);
        setIsLoading(false);
        const numberOfPages = Math.ceil(response.data.count / limit);
        const arrayPage = new Array(numberOfPages)
          .fill(0)
          .map((element, index) => index + 1);
        setPage(arrayPage);
      } catch (error) {
        alert("an error has occured");
      }
    };
    fetchData();
  }, [pageNumber, limit]);

  const handleChangeSelect = (e) => {
    setLimit(e.target.value);
  };

  const handleRevealPwd = () => {
    setIsRevealedPwd(!isRevealedPwd);
  };

  // MODAL

  const signup = async () => {
    const data = {
      email: email,
      username: username,
      password: password,
    };
    try {
      const response = await axios.post(
        "https://vinted-api-remi.herokuapp.com/user/signup",
        data
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signup();
    Cookies.set("token", data.token);
    setUsername("");
    setEmail("");
    setPassword("");
    setShowSignupModal(false);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return isLoading ? (
    <p>Dowloading...</p>
  ) : (
    <>
      {" "}
      {showSignupModal && (
        <div className="modal-signup">
          <div className="signup-content">
            <h2 className="h2-signup">S'inscrire</h2>
            <form onSubmit={handleSubmit} className="form-signup">
              <input
                className="input-signup"
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={handleUsername}
                required
              />
              <input
                className="input-signup"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
                required
              />
              <div className="div-password">
                <input
                  className="input-signup"
                  type={isRevealedPwd ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={handlePassword}
                  required
                />
                <FontAwesomeIcon
                  icon="eye"
                  className="icon-eye"
                  onClick={handleRevealPwd}
                />
              </div>
              <button type="submit" className="btn-signup btn-green">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      )}
      <main>
        <img src={welcomImage} alt="femme heureuse" className="welcome-img" />
        <div className="container">
          <div className="filter">
            <h1>Fil d'actu</h1>
            <label className="label-page-nb-display">
              Nombre de résultats à afficher :
              <Link to={`/?page=${pageNumber}&limit=${limit}`}>
                <select
                  value={limit}
                  onChange={handleChangeSelect}
                  className="select-page-nb-display"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </Link>
            </label>
          </div>
          <div className="main-content">
            {data.offers.map((offer) => {
              return (
                <div key={offer._id} className="product">
                  <Link to={`/offer/${offer._id}`}>
                    <Product offer={offer} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <ul className="page-navigation">
          {page.map((element, index) => {
            return (
              <Link
                key={index}
                to={`/?page=${index + 1}&limit=${limit}`}
                className="page-number"
              >
                <li>{element}</li>
              </Link>
            );
          })}
        </ul>
      </main>
    </>
  );
};
export default Home;
