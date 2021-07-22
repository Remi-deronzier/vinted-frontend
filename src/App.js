import "./App.css";
import "./assets/css/fonts.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OfferPage from "./pages/OfferPage";
import Home from "./pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faEye);

function App() {
  const [limit, setLimit] = useState(5);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <Router>
      <Header
        showSignupModal={showSignupModal}
        setShowSignupModal={setShowSignupModal}
      />
      <Switch>
        <Route exact path="/">
          <Home
            limit={limit}
            setLimit={setLimit}
            showSignupModal={showSignupModal}
            setShowSignupModal={setShowSignupModal}
          />
        </Route>
        <Route path="/offer/:id">
          <OfferPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
