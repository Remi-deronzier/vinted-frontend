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

  // Prevent scrolling when the modal is activated
  // Enable again scrolling when the modal is desactivated
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const login = async () => {
    const data = {
      email: email,
      password: password,
    };
    try {
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

  return (
    <div className="modal-signup-login">
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
          <button type="submit" className="btn-signup-login btn-green">
            Se connecter
          </button>
        </form>
        <p className="toggle-signup-loggin" onClick={handleRedirectToSignup}>
          Pas encore de compte ? Inscris-toi !
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
