import { Link } from "react-router-dom";
import Product from "./Product";
import "./Home.css";
import welcomImage from "../assets/images/welcome-image.jpg";

const Home = ({ data, page, handlePage, limit, handleChangeSelect }) => {
  return (
    <main>
      <img src={welcomImage} alt="femme heureuse" className="welcome-img" />
      <div className="container">
        <div className="filter">
          <h1>Fil d'actu</h1>
          <label className="label-page-nb-display">
            Nombre de résultats à afficher :
            <select
              value={limit}
              onChange={handleChangeSelect}
              className="select-page-nb-display"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
        <div className="main-content">
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
      </div>
      <ul className="page-navigation">
        {page.map((element, index) => {
          return (
            <Link key={index} to="/" className="page-number">
              <li onClick={() => handlePage(element)}>{element}</li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
};
export default Home;
