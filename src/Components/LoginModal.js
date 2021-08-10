import { useState, useEffect } from "react";

import LoaderSubmission from "./LoaderSubmission";

import "./SignupLoginModal.css";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginModal = ({
  setShowLoginModal,
  setShowSignupModal,
  handleLoginSignup,
  handleLoaderSubmission,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealedPwd, setIsRevealedPwd] = useState(false);

  let history = useHistory();

  const login = async () => {
    const data = {
      email: email,
      password: password,
    };
    try {
      handleLoaderSubmission();
      const response = await axios.post(
        "https://vinted-api-remi.herokuapp.com/user/login",
        data
      );
      const token = response.data.token;
      const { username, avatar } = response.data.account;
      handleLoginSignup(token, avatar, username);
      setShowLoginModal(false);
      setShowSignupModal(false);
      history.push("/publish");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRevealPwd = () => {
    setIsRevealedPwd(!isRevealedPwd);
  };

  const handleRedirectToSignup = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };

  // MODAL

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  // Prevent scrolling when the modal is activated
  // Enable again scrolling when the modal is desactivated
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const modal = document.getElementById("modal"); // Close modal when the user clicks outside the modal
    window.onclick = function (event) {
      if (event.target === modal) {
        setShowLoginModal(false);
      }
    };
  }, [setShowLoginModal]);

  return (
    <div className="background-modal" id="modal">
      <div className="modal-signup-login">
        <span className="btn-close" onClick={handleCloseLoginModal}>
          <FontAwesomeIcon icon="window-close" />
        </span>
        <div className="signup-login-content">
          <h2 className="h2-signup-login">Se connecter</h2>
          <form onSubmit={handleSubmit} className="form-signup-login">
            <input
              className="input-signup-login input"
              type="email"
              placeholder="Email *"
              value={email}
              onChange={handleEmail}
              required
            />
            <div className="div-password">
              <input
                className="input-signup-login input"
                type={isRevealedPwd ? "text" : "password"}
                placeholder="Mot de passe *"
                value={password}
                onChange={handlePassword}
                required
              />
              <FontAwesomeIcon
                icon="eye"
                className="icon-eye"
                onClick={handleRevealPwd}
              />
            </div>
            <p className="p-mandatory-fields-login-signup">
              <span className="asterisk">* </span>Champs obligatoires
            </p>
            <button
              type="submit"
              className="btn-signup-login btn-green"
              id="submit-btn"
            >
              Se connecter
              <LoaderSubmission />
            </button>
          </form>
          <p className="toggle-signup-loggin" onClick={handleRedirectToSignup}>
            Pas encore de compte ? Inscris-toi !
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
