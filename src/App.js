import "./App.css";
import "./assets/css/fonts.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDebounce } from "use-debounce";
import OfferPage from "./pages/OfferPage";
import HomePage from "./pages/HomePage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SignupModal from "./Components/SignupModal";
import LoginModal from "./Components/LoginModal";
import PublishPage from "./pages/PublishPage";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faEye,
  faWindowClose,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
library.add(faSearch, faEye, faWindowClose, faQuestionCircle);

function App() {
  const [limit, setLimit] = useState(5);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isConnected, setIsConnected] = useState(Cookies.get("token") || "");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [rangeValues, setRangeValues] = useState([0, 300]);
  const [finalRangeValues, setFinalRangeValues] = useState([0, 300]);
  const [debouncedFinalRangeValues] = useDebounce(finalRangeValues, 500);
  const [sort, setSort] = useState(false);
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

  return (
    <Router>
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
      {showSignupModal && (
        <SignupModal
          setShowSignupModal={setShowSignupModal}
          setShowLoginModal={setShowLoginModal}
          handleLoginSignup={handleLoginSignup}
        />
      )}
      {showLoginModal && (
        <LoginModal
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
          handleLoginSignup={handleLoginSignup}
        />
      )}
      <Switch>
        <Route exact path="/">
          <HomePage
            limit={limit}
            setLimit={setLimit}
            setShowSignupModal={setShowSignupModal}
            setShowLoginModal={setShowLoginModal}
            isConnected={isConnected}
            debouncedSearch={debouncedSearch}
            rangeValues={debouncedFinalRangeValues}
            sort={debouncedSort}
          />
        </Route>
        <Route path="/offer/:id">
          <OfferPage />
        </Route>
        <Route path="/publish">
          <PublishPage isConnected={isConnected} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
