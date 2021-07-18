import { currencyFormat } from "../helpers/helper";
import "./Product.css";
import avatar from "../assets/images/avatar.png";

const Product = ({ offer }) => {
  return (
    <>
      <div className="owner-details">
        <img
          src={
            offer.owner.account.avatar ? offer.owner.account.avatar.url : avatar
          }
          alt={offer.owner.account.username}
          className="avatar"
        />
        <span className="owner-username">{offer.owner.account.username}</span>
      </div>
      <img
        src={offer.product_image[0].url}
        alt={offer.product_name}
        className="product-image"
      />
      <div className="product-details">
        <p className="product-price">{currencyFormat(offer.product_price)}</p>
        <p className="product-size">
          {offer.product_details.find((e) => e.hasOwnProperty("TAILLE"))
            ? offer.product_details.find((e) => e.hasOwnProperty("TAILLE"))
                .TAILLE
            : ""}
        </p>
        <p className="product-brand">
          {offer.product_details.find((e) => e.hasOwnProperty("MARQUE"))
            ? offer.product_details.find((e) => e.hasOwnProperty("MARQUE"))
                .MARQUE
            : ""}
        </p>
      </div>
    </>
  );
};

export default Product;
