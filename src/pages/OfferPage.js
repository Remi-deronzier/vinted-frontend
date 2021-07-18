import { useParams } from "react-router-dom";

const OfferPage = () => {
  const { id } = useParams();
  return <div>Hello {id}</div>;
};

export default OfferPage;
