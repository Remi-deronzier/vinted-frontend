import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignupLoginModal.css";

const SignupModal = ({ setShowSignupModal, setShowLoginModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealedPwd, setIsRevealedPwd] = useState(false);

  // Prevent scrolling when the modal is activated
  // Enable again scrolling when the modal is desactivated
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const signup = async () => {
    const data = {
      email: email,
      username: username,
      password: password,
    };
    try {
      const response = await axios.post(
        "https://vinted-api-remi.herokuapp.com/user/signup",
        data
      );
      Cookies.set("token", response.data.token, { expires: 7 });
      setShowSignupModal(false);
      setShowLoginModal(false);
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

  return (
    <div className="modal-signup-login">
      <div className="signup-login-content">
        <h2 className="h2-signup-login">S'inscrire</h2>
        <form onSubmit={handleSubmit} className="form-signup-login">
          <input
            className="input-signup-login"
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={handleUsername}
            required
          />
          <input
            className="input-signup-login"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
            required
          />
          <div className="div-password">
            <input
              className="input-signup-login"
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
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
