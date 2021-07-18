import { Link } from "react-router-dom";
import Product from "./Product";
import "./Home.css";

const Home = ({ data }) => {
  return (
    <main>
      <div className="container main-content">
        {data.offers.map((offer) => {
          return (
            <div key={offer._id} className="product">
              <Link to={`/offer/${offer._id}`}>
                <Product offer={offer} />
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
