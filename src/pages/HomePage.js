import { useState, useEffect } from "react";

import Product from "../Components/Product";
import Loader from "../Components/Loader";

import "./HomePage.css";
import welcomeImage from "../assets/images/welcome-image-crop.png";

import { Link, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import * as qs from "qs";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({
  setShowLoginModal,
  isConnected,
  debouncedSearch,
  sort,
  rangeValues,
}) => {
  const [data, setData] = useState({});
  const [isLoadingHomePage, setIsLoadingHomePage] = useState(true);
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);
  const [page, setPage] = useState([]);
  const [numberOfOffers, setNumberOfOffers] = useState(0);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const location = useLocation();
  const params = qs.parse(location.search.slice(1));

  const onboarding = params.onboarding;
  const paymentSuccessful = params.paymentSuccessful;
  const pageNumber =
    params.page &&
    Number(params.page) <= page.length &&
    Number(params.page) >= 1
      ? Number(params.page)
      : Number(params.page) > page.length
      ? page.length
      : 1; // prevent user from entering bad page numbers in the URL
  const limit =
    !isNaN(Number(params.limit)) && Number(params.limit) >= 2
      ? params.limit
      : 5; // prevent user from entering bad limit numbers in the URL

  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingOffers(true);
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
        setIsLoadingHomePage(false);
        setIsLoadingOffers(false);
        const numberOfPages = Math.ceil(response.data.count / limit);
        const arrayPage = new Array(numberOfPages)
          .fill(0)
          .map((element, index) => index + 1); // [1, 2 .... last page]
        setPage(arrayPage);
        setNumberOfOffers(response.data.count);
        document.title = "Vinted | La boutique de Rémi";
      } catch (error) {
        alert("an error has occured");
      }
    };
    fetchData();
  }, [pageNumber, limit, debouncedSearch, sort, rangeValues]);

  useEffect(() => {
    if (onboarding) {
      setIsWelcomeModalOpen(true);
    }
  }, [onboarding]); // trigger a welcome modal when the user sign up for the first time

  useEffect(() => {
    if (paymentSuccessful) {
      setIsPaymentModalOpen(true);
    }
  }, [paymentSuccessful]); // trigger a modal when the payment was successful

  const handleChangeSelect = (e) => {
    const maxPage = Math.ceil(numberOfOffers / e.target.value);
    history.push(
      pageNumber <= maxPage
        ? `/?page=${pageNumber}&limit=${e.target.value}`
        : `/?page=${maxPage}&limit=${e.target.value}`
    ); // manage the fact that when a user wants to display a high limit but is on a big page number, something is displayed instead of a blank page
  };

  const handleWelcomeModalClose = () => {
    setIsWelcomeModalOpen(false);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  const handleAfterOpenFunc = () => {
    setTimeout(() => {
      setIsWelcomeModalOpen(false);
      setIsPaymentModalOpen(false);
    }, 7000);
  };

  const handleSell = () => {
    if (isConnected) {
      history.push("/publish");
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <Modal
        isOpen={isWelcomeModalOpen}
        onRequestClose={handleWelcomeModalClose}
        onAfterOpen={handleAfterOpenFunc}
        ariaHideApp={false}
        className="home-page-modal"
      >
        Bonjour{" "}
        <span className="username-welcome-modal">
          {Cookies.get("username")}
        </span>
        , bienvenue sur Vinted ! 🎉
      </Modal>
      <Modal
        isOpen={isPaymentModalOpen}
        onRequestClose={handlePaymentModalClose}
        onAfterOpen={handleAfterOpenFunc}
        ariaHideApp={false}
        className="home-page-modal"
      >
        Paiement effectué avec succès ! 😊
      </Modal>
      {isLoadingHomePage ? (
        <Loader className="container-loader-main" />
      ) : (
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
              <button
                className="btn-green"
                id="btn-sort-out"
                onClick={handleSell}
              >
                Vends maintenant
              </button>
              <Link to="/how-it-works">
                <p className="discover-running">Découvrir comment ça marche</p>
              </Link>
            </div>
          </div>
          {isLoadingOffers ? (
            <Loader className="container-loader-offers" />
          ) : (
            <>
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
                      <option value="2">2</option>
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
              {/* PAGINATION */}
              {numberOfOffers !== 0 && (
                <ul className="page-navigation">
                  {pageNumber > 1 && (
                    <Link
                      to={`/?page=${Number(pageNumber) - 1}&limit=${limit}`}
                    >
                      <li>
                        <FontAwesomeIcon
                          icon="arrow-circle-left"
                          className="icon-arrow-page-navigation"
                        />{" "}
                      </li>
                    </Link>
                  )}
                  <Link to={`/?page=1&limit=${limit}`} className="page-number">
                    <li>1</li>
                  </Link>
                  {pageNumber > 3 && (
                    <li>
                      <FontAwesomeIcon
                        icon="ellipsis-h"
                        className="icon-ellipsis-dots"
                      />
                    </li>
                  )}
                  {page
                    .filter(
                      (element) =>
                        (element === pageNumber ||
                          element === pageNumber + 1 ||
                          element === pageNumber - 1) &&
                        element !== 1 &&
                        element !== page.length
                    )
                    .map((element) => {
                      return (
                        <Link
                          key={element}
                          to={`/?page=${element}&limit=${limit}`}
                          className="page-number"
                        >
                          <li>{element}</li>
                        </Link>
                      );
                    })}
                  {pageNumber < page.length - 2 && (
                    <li>
                      <FontAwesomeIcon
                        icon="ellipsis-h"
                        className="icon-ellipsis-dots"
                      />
                    </li>
                  )}
                  {page.length > 1 && (
                    <Link
                      to={`/?page=${page.length}&limit=${limit}`}
                      className="page-number"
                    >
                      <li>{page.length}</li>
                    </Link>
                  )}
                  {pageNumber < page.length && (
                    <Link
                      to={`/?page=${Number(pageNumber) + 1}&limit=${limit}`}
                    >
                      <li>
                        <FontAwesomeIcon
                          icon="arrow-circle-right"
                          className="icon-arrow-page-navigation"
                        />{" "}
                      </li>
                    </Link>
                  )}
                </ul>
              )}
            </>
          )}
        </main>
      )}
    </>
  );
};

export default Home;
