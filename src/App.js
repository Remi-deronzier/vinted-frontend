import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import OfferPage from "./pages/OfferPage";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState([]);
  const [pageChoice, setPageChoice] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const fetchDataHome = async () => {
      try {
        const response = await axios.get(
          `https://vinted-api-remi.herokuapp.com/offers?limit=${limit}`
        );
        setData(response.data);
        setIsLoading(false);
        const numberOfPages = Math.ceil(response.data.count / limit);
        const arrayPage = new Array(numberOfPages)
          .fill(0)
          .map((element, index) => index + 1);
        setPage(arrayPage);
      } catch (error) {
        alert("an error has occured");
      }
    };
    fetchDataHome();
  }, [limit]);

  useEffect(() => {
    const fetchDataPage = async () => {
      try {
        const response = await axios.get(
          `https://vinted-api-remi.herokuapp.com/offers?page=${pageChoice}&limit=${limit}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        alert("an error has occured");
      }
    };
    fetchDataPage();
  }, [pageChoice, limit]);

  const handlePage = (page) => {
    setPageChoice(page);
    setIsLoading(true);
  };

  const handleChangeSelect = (e) => {
    setLimit(e.target.value);
  };

  return isLoading ? (
    <p>Downloading...</p>
  ) : (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home
            data={data}
            page={page}
            handlePage={handlePage}
            limit={limit}
            handleChangeSelect={handleChangeSelect}
          />
        </Route>
        {/* <Route path="./offers/:test">
          {" "}
          {isLoading ? (
            <p>Downloading...</p>
          ) : (
            <Home data={data} page={page} handlePage={handlePage} />
          )}
        </Route> */}
        <Route path="/offer/:id">
          <OfferPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
