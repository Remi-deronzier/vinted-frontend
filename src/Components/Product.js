import { currencyFormat } from "../helpers/helper";

const Product = ({ offer }) => {
  return (
    <>
      <img
        src={offer.owner.account.avatar.url}
        alt={offer.owner.account.username}
      />
      <img src={offer.product_image[0].url} alt={offer.product_name} />
      <p>{currencyFormat(offer.product_price)}</p>
      <p>
        {offer.product_details.find((e) => e.hasOwnProperty("TAILLE"))
          ? offer.product_details.find((e) => e.hasOwnProperty("TAILLE")).TAILLE
          : ""}
      </p>
      <p>
        {offer.product_details.find((e) => e.hasOwnProperty("MARQUE"))
          ? offer.product_details.find((e) => e.hasOwnProperty("MARQUE")).MARQUE
          : ""}
      </p>
    </>
  );
};

export default Product;
