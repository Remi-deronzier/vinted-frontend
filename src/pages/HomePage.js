import { Link, useLocation, useHistory } from "react-router-dom";
import Product from "../Components/Product";
import "./HomePage.css";
import Loader from "../Components/Loader";
import welcomeImage from "../assets/images/welcome-image-crop.png";
import { useState, useEffect } from "react";
import axios from "axios";
import * as qs from "qs";

const Home = ({
  limit,
  setLimit,
  setShowLoginModal,
  setShowSignupModal,
  isConnected,
  debouncedSearch,
  sort,
  rangeValues,
}) => {
  const location = useLocation();
  const params = qs.parse(location.search.slice(1));
  const pageNumber = params.page ? params.page : 1;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState([]);
  const [numberOfOffers, setNumberOfOffers] = useState(0);

  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const queryParams = qs.stringify({
          page: debouncedSearch ? 1 : pageNumber, // manage event : a user make a research but is on a page higher than 1, thus no results would be displayes which is annoying
          title: debouncedSearch,
          priceMin: rangeValues[0],
          priceMax: rangeValues[1],
          sort: !sort ? "price-asc" : "price-desc",
          limit: limit,
        });
        const response = await axios.get(
          `https://vinted-api-remi.herokuapp.com/offers?${queryParams}`
        );
        setData(response.data);
        setIsLoading(false);
        const numberOfPages = Math.ceil(response.data.count / limit);
        const arrayPage = new Array(numberOfPages)
          .fill(0)
          .map((element, index) => index + 1);
        setPage(arrayPage);
        setNumberOfOffers(response.data.count);
        document.title = "Vinted | La boutique de Rémi";
      } catch (error) {
        alert("an error has occured");
      }
    };
    fetchData();
  }, [pageNumber, limit, debouncedSearch, sort, rangeValues]);

  const handleChangeSelect = (e) => {
    setLimit(e.target.value);
    const maxPage = Math.ceil(numberOfOffers / e.target.value);
    history.push(
      pageNumber <= maxPage ? `/?page=${pageNumber}` : `/?page=${maxPage}`
    ); // manage the fact that when a user wants to display a high limit but is on a big page number, something is displayed instead of a blank page
  };

  const handleLoginModalTrue = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <main>
        <div className="carousel-presentation">
          <img
            src={welcomeImage}
            alt="femme heureuse"
            className="welcome-img"
          />
          <div className="call-to-action-send">
            <p className="ready-to-sort-out">
              Prêts à faire du tri dans vos placards ?
            </p>
            <Link to="/publish">
              <button
                className="btn-green btn-sort-out"
                onClick={!isConnected ? handleLoginModalTrue : undefined}
              >
                Vends maintenant
              </button>
            </Link>
            <p className="discover-running">Découvrir comment ça marche</p>
          </div>
        </div>
        <div className="container">
          <div className="filter">
            <h1>Fil d'actu</h1>
            <label className="label-page-nb-display">
              Nombre de résultats à afficher :
              <select
                value={limit}
                onChange={handleChangeSelect}
                className="select-page-nb-display"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
          {numberOfOffers === 0 ? (
            <p className="p-no-results">😥 Aucun résultat trouvé !</p>
          ) : (
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
          )}
        </div>
        <ul className="page-navigation">
          {page.map((element, index) => {
            return (
              <Link
                key={index}
                to={`/?page=${index + 1}`}
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
