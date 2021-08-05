import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignupLoginModal.css";

const SignupModal = ({
  setShowSignupModal,
  setShowLoginModal,
  handleLoginSignup,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealedPwd, setIsRevealedPwd] = useState(false);

  let history = useHistory();

  const signup = async () => {
    const data = {
      email: email,
      username: username,
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
        "https://vinted-api-remi.herokuapp.com/user/signup",
        data
      );
      const token = response.data.token;
      const { username, avatar } = response.data.account;
      handleLoginSignup(token, avatar, username);
      setShowSignupModal(false);
      setShowLoginModal(false);
      history.push("/?onboarding=true");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup();
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
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

  const handleRedirectToLogin = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  // MODAL

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
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
        setShowSignupModal(false);
      }
    };
  }, [setShowSignupModal]);

  return (
    <div className="background-modal" id="modal">
      <div className="modal-signup-login">
        <span
          className="btn-close-signup-login-modal"
          onClick={handleCloseSignupModal}
        >
          <FontAwesomeIcon icon="window-close" />
        </span>
        <div className="signup-login-content">
          <h2 className="h2-signup-login">S'inscrire</h2>
          <form onSubmit={handleSubmit} className="form-signup-login">
            <input
              className="input-signup-login input"
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={handleUsername}
              required
            />
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
              S'inscrire
              <div className="loader-circle loader-circle-hidden">
                <div className="circle-loader circle-1"></div>
                <div className="circle-loader circle-2"></div>
                <div className="circle-loader circle-3"></div>
              </div>
            </button>
          </form>
          <p className="toggle-signup-loggin" onClick={handleRedirectToLogin}>
            Tu as déjà un compte ? Connecte-toi !
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
