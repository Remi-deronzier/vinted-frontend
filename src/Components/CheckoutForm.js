import LoaderSubmission from "./LoaderSubmission";
import "./CheckoutForm.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { currencyFormat } from "../helpers/helper";

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const protectionFees = 0.4;
  const deliveryFees = 0.8;
  const total = product.product_price + protectionFees + deliveryFees;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: Cookies.get("token"),
      });
      const data = {
        stripeToken: stripeResponse.token.id,
        amount: total * 100,
        description: product.product_description,
      };
      const response = await axios.post(
        "https://vinted-api-remi.herokuapp.com/pay",
        data
      );
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      alert("an error has occured");
    }
  };

  return (
    <>
      {!completed ? (
        <div className="container-form-payment">
          <form onSubmit={handleSubmit} className="payment-form">
            <h2>Résumé de la commande</h2>
            <div className="payment-details">
              <div className="line-payment-form">
                <span>Commande</span>
                <span>{currencyFormat(product.product_price)}</span>
              </div>
              <div className="line-payment-form">
                <span>Frais protection acheteurs</span>
                <span>{currencyFormat(protectionFees)}</span>
              </div>
              <div className="line-payment-form">
                <span>Frais de port</span>
                <span>{currencyFormat(deliveryFees)}</span>
              </div>
            </div>
            <div className="payment-summary">
              <div className="line-payment-form line-total">
                <span>Total</span>
                <span>{currencyFormat(total)}</span>
              </div>
              <p className="payment-description">
                Il ne vous reste plus qu'une étape pour vous offrir{" "}
                <span className="bold">{product.product_name}</span>. Vous allez
                payer <span className="bold">{currencyFormat(total)}</span>{" "}
                (frais de protection et frais port inclus).{" "}
              </p>
            </div>
            <CardElement
              className="card-element"
              options={{
                hidePostalCode: true,
              }}
            />
            <button
              type="submit"
              className="btn-green btn-payment"
              disabled={!stripe}
            >
              Payer
              <LoaderSubmission />
            </button>
          </form>
        </div>
      ) : (
        <p className="paiement-effectue">Paiement effectué ! </p>
      )}
    </>
  );
};

export default CheckoutForm;
