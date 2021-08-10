import { useState, useEffect } from "react";

import Loader from "../Components/Loader";
import { currencyFormat } from "../helpers/helper";

import "./OfferPage.css";
import fillImage from "../assets/images/icon-clothes.png";

import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OfferPage = ({ isConnected, setShowLoginModal }) => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-api-remi.herokuapp.com/offer/${id}`
        );
        setProduct(response.data);
        setIsLoading(false);
        document.title = `${response.data.product_name} - Vinted`;
        document.body.style.background = "var(--grey-background)"; // put body background to color white
      } catch (error) {
        alert("an error has occured");
      }
    };
    fetchData();
    return () => {
      document.body.style.background = "white"; // reset body background to color white
    };
  }, [id]);

  const responsive = {
    // responsive for the carousel
    desktop: {
      breakpoint: { max: 3000, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: !product.product_image
        ? 1
        : product.product_image.length === 1
        ? 1
        : 2,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
    },
  };

  const handleBuy = () => {
    if (isConnected) {
      history.push("/payment", product);
    } else {
      setShowLoginModal(true);
    }
  };

  return isLoading ? (
    <Loader className="container-loader-main" />
  ) : (
    <div className="container-offer-page">
      <div className="image-product">
        <Carousel
          responsive={responsive}
          keyBoardControl={true}
          containerClass="carousel-container-image"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item"
          response={responsive}
          draggable={true}
          // additionalTransfrom={-10 * 4} // not working ???
          sliderClass="carousel-track"
        >
          {product.product_image ? (
            product.product_image.map((image, index) => {
              return (
                <img
                  src={image.secure_url}
                  alt={product.product_name}
                  className="img-product-offerPage"
                  key={index}
                />
              );
            })
          ) : (
            <img
              src={fillImage}
              alt="icon representing clothes"
              className="img-product-offerPage"
            />
          )}
        </Carousel>
      </div>
      <div className="detail-product">
        <div className="detail-main-content">
          <div className="detail-call1">
            <p className="price-product">
              {currencyFormat(product.product_price)}
            </p>
            {product.product_details.find((e) => e.hasOwnProperty("MARQUE")) ? (
              <div className="div-label-product-details">
                <p className="label-product-details">MARQUE</p>
                <span className="value-product-details">
                  {
                    product.product_details.find((e) =>
                      e.hasOwnProperty("MARQUE")
                    ).MARQUE
                  }
                </span>
              </div>
            ) : null}
            {product.product_details.find((e) => e.hasOwnProperty("TAILLE")) ? (
              <div className="div-label-product-details">
                <p className="label-product-details">TAILLE</p>
                <span className="value-product-details">
                  {
                    product.product_details.find((e) =>
                      e.hasOwnProperty("TAILLE")
                    ).TAILLE
                  }
                </span>
              </div>
            ) : null}
            {product.product_details.find((e) => e.hasOwnProperty("ÉTAT")) ? (
              <div className="div-label-product-details">
                <p className="label-product-details">ÉTAT</p>
                <span className="value-product-details">
                  {
                    product.product_details.find((e) =>
                      e.hasOwnProperty("ÉTAT")
                    ).ÉTAT
                  }
                </span>
              </div>
            ) : null}
            {product.product_details.find((e) =>
              e.hasOwnProperty("COULEUR")
            ) ? (
              <div className="div-label-product-details">
                <p className="label-product-details">COULEUR</p>
                <span className="value-product-details">
                  {
                    product.product_details.find((e) =>
                      e.hasOwnProperty("COULEUR")
                    ).COULEUR
                  }
                </span>
              </div>
            ) : null}
            {product.product_details.find((e) =>
              e.hasOwnProperty("EMPLACEMENT")
            ) ? (
              <div className="div-label-product-details">
                <p className="label-product-details">EMPLACEMENT</p>
                <span className="value-product-details">
                  {
                    product.product_details.find((e) =>
                      e.hasOwnProperty("EMPLACEMENT")
                    ).EMPLACEMENT
                  }
                </span>
              </div>
            ) : null}
          </div>
          <div className="detail-call2">
            <p className="title-product">{product.product_name}</p>
            <div className="avatar-product-description">
              <div className="product-description-fade-tooltip">
                <div className="fade description-product">
                  <p>{product.product_description}</p>
                </div>
                <span data-tip={product.product_description}>
                  {" "}
                  <FontAwesomeIcon
                    icon="question-circle"
                    className="icon-info"
                  />{" "}
                </span>
                <ReactTooltip
                  place="right"
                  type="dark"
                  effect="solid"
                  className="tooltip"
                />
              </div>
              <div className="avatar-description">
                {product.owner.account.avatar ? (
                  <img
                    src={product.owner.account.avatar.secure_url}
                    alt="avatar"
                    className="avatar-image"
                  />
                ) : (
                  <Avatar
                    name={product.owner.account.username}
                    className="avatar-image"
                    size="5rem"
                    textSizeRatio={1.75}
                  />
                )}
                <p className="avatar-username">
                  {product.owner.account.username}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className="btn-green btn-buy" onClick={handleBuy}>
          Acheter
        </button>
      </div>
    </div>
  );
};

export default OfferPage;
