import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Redirect, useLocation } from "react-router-dom";
import CheckoutForm from "../Components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JMdcDITVWFkdDVZu0Th9OcJZUjJzK52rl4M3D9pJcY6aJFdt2DVXEDDNtkS64SRya9DHu78uQp9f6l8pTH4gNEb00T8OPmEOW"
);

function PaymentPage({ isConnected }) {
  const location = useLocation();
  const product = location.state;

  useEffect(() => {
    document.title = "Paiement";
  }, []);

  return isConnected ? (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm product={product} />
      </Elements>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default PaymentPage;
