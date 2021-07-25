import "./App.css";
import "./assets/css/fonts.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OfferPage from "./pages/OfferPage";
import Home from "./pages/HomePage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SignupModal from "./Components/SignupModal";
import LoginModal from "./Components/LoginModal";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
library.add(faSearch, faEye);

function App() {
  const [limit, setLimit] = useState(5);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isConnected, setIsConnected] = useState(Cookies.get("token") || "");

  console.log(isConnected);

  return (
    <Router>
      <Header
        setShowSignupModal={setShowSignupModal}
        setShowLoginModal={setShowLoginModal}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      {showSignupModal && (
        <SignupModal
          setShowSignupModal={setShowSignupModal}
          setShowLoginModal={setShowLoginModal}
        />
      )}
      {showLoginModal && (
        <LoginModal
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
          setIsConnected={setIsConnected}
        />
      )}
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
