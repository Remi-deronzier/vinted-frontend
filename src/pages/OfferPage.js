import { useParams } from "react-router-dom";
import "./OfferPage.css";

const OfferPage = () => {
  const { id } = useParams();
  return <div className="offer-page">Hello {id}</div>;
};

export default OfferPage;
