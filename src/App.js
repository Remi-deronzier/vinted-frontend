import { useState } from "react";

import OfferPage from "./pages/OfferPage";
import PaymentPage from "./pages/PaymentPage";
import HowItWorks from "./pages/HowItWorks";
import HomePage from "./pages/HomePage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SignupModal from "./Components/SignupModal";
import LoginModal from "./Components/LoginModal";
import PublishPage from "./pages/PublishPage";

import "./App.css";
import "./assets/css/fonts.css";

import Cookies from "js-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faEye,
  faWindowClose,
  faQuestionCircle,
  faArrowCircleRight,
  faArrowCircleLeft,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSearch,
  faEye,
  faWindowClose,
  faQuestionCircle,
  faArrowCircleRight,
  faArrowCircleLeft,
  faEllipsisH
);

const App = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isConnected, setIsConnected] = useState(Cookies.get("token") || "");
  const [search, setSearch] = useState("");
  const [rangeValues, setRangeValues] = useState([0, 300]);
  const [finalRangeValues, setFinalRangeValues] = useState([0, 300]);
  const [sort, setSort] = useState(false);

  const [debouncedSearch] = useDebounce(search, 1000);
  const [debouncedFinalRangeValues] = useDebounce(finalRangeValues, 500);
  const [debouncedSort] = useDebounce(sort, 500);

  const handleLoginSignup = (token, avatar, username) => {
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("username", username, { expires: 7 });
    if (avatar) {
      Cookies.set("avatar", avatar.secure_url, {
        expires: 7,
      });
    }
    setIsConnected(Cookies.get("token"));
  };

  const handleLoaderSubmission = () => {
    document.querySelector("#submit-btn").setAttribute("disabled", "disabled"); // Disable the submit button;
    document
      .querySelector(".loader-circle")
      .classList.remove("loader-circle-hidden"); // Launch the loader
  };

  const handleLoaderEnding = () => {
    // Enable the button after the request
    document.querySelector("#submit-btn").removeAttribute("disabled");
    // Stop the loader
    document
      .querySelector(".loader-circle")
      .classList.add("loader-circle-hidden");
  };

  return (
    <Router>
      {showSignupModal && (
        <SignupModal
          setShowSignupModal={setShowSignupModal}
          setShowLoginModal={setShowLoginModal}
          handleLoginSignup={handleLoginSignup}
          handleLoaderSubmission={handleLoaderSubmission}
          handleLoaderEnding={handleLoaderEnding}
        />
      )}
      {showLoginModal && (
        <LoginModal
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
          handleLoginSignup={handleLoginSignup}
          handleLoaderSubmission={handleLoaderSubmission}
          handleLoaderEnding={handleLoaderEnding}
        />
      )}
      <Header
        setShowSignupModal={setShowSignupModal}
        setShowLoginModal={setShowLoginModal}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        search={search}
        setSearch={setSearch}
        setRangeValues={setRangeValues}
        rangeValues={rangeValues}
        setFinalRangeValues={setFinalRangeValues}
        sort={sort}
        setSort={setSort}
      />
      <Switch>
        <Route exact path="/">
          <HomePage
            setShowSignupModal={setShowSignupModal}
            setShowLoginModal={setShowLoginModal}
            isConnected={isConnected}
            debouncedSearch={debouncedSearch}
            rangeValues={debouncedFinalRangeValues}
            sort={debouncedSort}
          />
        </Route>
        <Route path="/offer/:id">
          <OfferPage
            isConnected={isConnected}
            setShowLoginModal={setShowLoginModal}
          />
        </Route>
        <Route path="/publish">
          <PublishPage
            isConnected={isConnected}
            handleLoaderSubmission={handleLoaderSubmission}
          />
        </Route>
        <Route path="/payment">
          <PaymentPage
            isConnected={isConnected}
            handleLoaderSubmission={handleLoaderSubmission}
            handleLoaderEnding={handleLoaderEnding}
          />
        </Route>
        <Route path="/how-it-works">
          <HowItWorks />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
