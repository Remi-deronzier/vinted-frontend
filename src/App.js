import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OfferPage from "./pages/OfferPage";
import Home from "./pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
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
