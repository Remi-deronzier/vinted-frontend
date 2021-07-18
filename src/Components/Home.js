import { Link } from "react-router-dom";
import Product from "./Product";

const Home = ({ data }) => {
  return (
    <main>
      {data.offers.map((offer) => {
        return (
          <div>
            <Link to={`/offer/${offer._id}`}>
              <Product offer={offer} />
            </Link>
          </div>
        );
      })}
    </main>
  );
};

export default Home;
