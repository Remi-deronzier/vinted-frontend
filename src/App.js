import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import OfferPage from "./pages/OfferPage";
import Home from "./Components/Home";
import Header from "./Components/Header";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://vinted-api-remi.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      alert("an error has occured");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <p>Downloading...</p>
  ) : (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home data={data} />
        </Route>
        <Route path="/offer/:id">
          <OfferPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
