import { currencyFormat } from "../helpers/helper";
import "./Product.css";
import fillImage from "../assets/images/icon-clothes.png";
import Avatar from "react-avatar";

const Product = ({ offer }) => {
  return (
    <>
      <div className="owner-details">
        {offer.owner.account.avatar ? (
          <img
            src={offer.owner.account.avatar.secure_url}
            alt={offer.owner.account.username}
            className="avatar"
          />
        ) : (
          <Avatar
            name={offer.owner.account.username}
            className="avatar"
            size="2.5rem"
            textSizeRatio={1.5}
          />
        )}
        <span className="owner-username">{offer.owner.account.username}</span>
      </div>
      <img
        src={
          offer.product_image ? offer.product_image[0].secure_url : fillImage
        }
        alt={offer.product_name}
        className="product-image"
      />
      <div className="product-details">
        <p className="product-price">{currencyFormat(offer.product_price)}</p>
        {offer.product_details.find((e) => e.hasOwnProperty("TAILLE")) && (
          <p className="product-size">
            {
              offer.product_details.find((e) => e.hasOwnProperty("TAILLE"))
                .TAILLE
            }
          </p>
        )}
        {offer.product_details.find((e) => e.hasOwnProperty("MARQUE")) && (
          <p className="product-brand">
            {
              offer.product_details.find((e) => e.hasOwnProperty("MARQUE"))
                .MARQUE
            }
          </p>
        )}
      </div>
    </>
  );
};

export default Product;
