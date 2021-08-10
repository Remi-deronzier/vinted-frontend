import { useEffect } from "react";

import LoaderSubmission from "./LoaderSubmission";
import { currencyFormat } from "../helpers/helper";

import "./CheckoutForm.css";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const CheckoutForm = ({
  product,
  handleLoaderSubmission,
  handleLoaderEnding,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const protectionFees = 0.4;
  const deliveryFees = 0.8;
  const total = product.product_price + protectionFees + deliveryFees;

  let history = useHistory();

  useEffect(() => {
    document.body.style.background = "var(--grey-background)"; // put body background to color white
    return () => {
      document.body.style.background = "white"; // reset body background to color white
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      handleLoaderSubmission();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: Cookies.get("token"),
      });
      if (stripeResponse.error.message === "Your card number is incomplete.") {
        alert(stripeResponse.error.message + " Edit the information");
        handleLoaderEnding();
      }
      const data = {
        stripeToken: stripeResponse.token.id,
        amount: (total * 100).toFixed(0), // unit: cents
        description: product.product_description,
      };
      const response = await axios.post(
        "https://vinted-api-remi.herokuapp.com/pay",
        data
      );
      if (response.data.status === "succeeded") {
        history.push("/?paymentSuccessful=true");
      }
    } catch (error) {
      alert("an error has occured");
    }
  };

  return (
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
            payer <span className="bold">{currencyFormat(total)}</span> (frais
            de protection et frais port inclus).{" "}
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
          id="submit-btn"
        >
          Payer
          <LoaderSubmission />
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
