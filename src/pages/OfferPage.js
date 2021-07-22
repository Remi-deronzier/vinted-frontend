import { useParams } from "react-router-dom";
import "./OfferPage.css";
import { currencyFormat } from "../helpers/helper";
import avatar from "../assets/images/avatar.png";
import { useState, useEffect } from "react";
import axios from "axios";

const OfferPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-api-remi.herokuapp.com/offer/${id}`
        );
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        alert("an error has occured");
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Downloading...</p>
  ) : (
    <div className="offer-page">
      <div className="container-offer-page">
        <div className="image-product">
          <img
            src={product.product_image[0].url}
            alt={product.product_name}
            className="img-product-offerPage"
          />
        </div>
        <div className="detail-product">
          <div className="detail-main-content">
            <div className="detail-call1">
              <p className="price-product">
                {currencyFormat(product.product_price)}
              </p>
              {product.product_details.find((e) => e.hasOwnProperty("MARQUE"))
                .MARQUE !== "" ? (
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
              {product.product_details.find((e) => e.hasOwnProperty("TAILLE"))
                .TAILLE !== "" ? (
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
              {product.product_details.find((e) => e.hasOwnProperty("ÉTAT"))
                .ÉTAT !== "" ? (
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
              {product.product_details.find((e) => e.hasOwnProperty("COULEUR"))
                .COULEUR !== "" ? (
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
              ).EMPLACEMENT !== "" ? (
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
              <p className="description-product">
                {product.product_description}
              </p>
              <div className="avatar-description">
                <img
                  className="avatar-image"
                  src={
                    product.owner.account.avatar
                      ? product.owner.account.avatar.url
                      : avatar
                  }
                  alt={product.owner.account.username}
                />
                <p className="avatar-username">
                  {product.owner.account.username}
                </p>
              </div>
            </div>
          </div>
          <button className="btn-green">Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
