import { useEffect } from "react";

import CheckoutForm from "../Components/CheckoutForm";

import { Redirect, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51JMdcDITVWFkdDVZu0Th9OcJZUjJzK52rl4M3D9pJcY6aJFdt2DVXEDDNtkS64SRya9DHu78uQp9f6l8pTH4gNEb00T8OPmEOW"
);

function PaymentPage({ isConnected, handleLoaderSubmission }) {
  const location = useLocation();
  const product = location.state;

  useEffect(() => {
    document.title = "Paiement";
  }, []);

  return isConnected ? (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          product={product}
          handleLoaderSubmission={handleLoaderSubmission}
        />
      </Elements>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default PaymentPage;
