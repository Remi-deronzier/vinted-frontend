import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignupLoginModal.css";
import { useHistory } from "react-router-dom";

const LoginModal = ({
  setShowLoginModal,
  setShowSignupModal,
  handleLoginSignup,
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
      // Disable the submit button
      document
        .querySelector("#submit-btn")
        .setAttribute("disabled", "disabled");
      // Launch the loader
      document
        .querySelector(".loader-circle")
        .classList.remove("loader-circle-hidden");
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
    setEmail("");
    setPassword("");
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
    const modal = document.getElementById("modal");
    window.onclick = function (event) {
      if (event.target === modal) {
        setShowLoginModal(false);
      }
    };
  }, [setShowLoginModal]);

  return (
    <div className="background-modal" id="modal">
      <div className="modal-signup-login">
        <span
          className="btn-close-signup-login-modal"
          onClick={handleCloseLoginModal}
        >
          <FontAwesomeIcon icon="window-close" />
        </span>
        <div className="signup-login-content">
          <h2 className="h2-signup-login">Se connecter</h2>
          <form onSubmit={handleSubmit} className="form-signup-login">
            <input
              className="input-signup-login input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
              required
            />
            <div className="div-password">
              <input
                className="input-signup-login input"
                type={isRevealedPwd ? "text" : "password"}
                placeholder="Mot de passe"
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
            <button
              type="submit"
              className="btn-signup-login btn-green"
              id="submit-btn"
            >
              Se connecter
              <div className="loader-circle loader-circle-hidden">
                <div className="circle-loader circle-1"></div>
                <div className="circle-loader circle-2"></div>
                <div className="circle-loader circle-3"></div>
              </div>
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
