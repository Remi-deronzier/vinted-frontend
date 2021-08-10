import { useState, useEffect, useCallback } from "react";

import LoaderSubmission from "./LoaderSubmission";

import "./SignupLoginModal.css";

import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignupModal = ({
  setShowSignupModal,
  setShowLoginModal,
  handleLoginSignup,
  handleLoaderSubmission,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealedPwd, setIsRevealedPwd] = useState(false);
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState([]);

  let history = useHistory();

  const signup = async () => {
    const formData = new FormData();
    formData.append("picture", file[0]);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    try {
      handleLoaderSubmission();
      const response = await axios.post(
        "https://vinted-api-remi.herokuapp.com/user/signup",
        formData
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
    const modal = document.getElementById("modal"); // Close modal when the user clicks outside the modal
    window.onclick = function (event) {
      if (event.target === modal) {
        setShowSignupModal(false);
      }
    };
  }, [setShowSignupModal]);

  // UPLOAD A PICTURE FOR A NEW USER

  const onDrop = useCallback((acceptedFile) => {
    const newFiles = acceptedFile;
    setFile(newFiles);
    const currentPreview = URL.createObjectURL(...acceptedFile);
    const newPreview = [currentPreview];
    setPreview(newPreview);
  }, []);

  const { getRootProps, getInputProps } = useDropzone(
    {
      onDrop,
      disabled: file.length > 0,
      maxFiles: 1,
      accept: "image/jpeg, image/png",
    },
    [file]
  );

  const handleDeletePicture = () => {
    setPreview([]);
    setFile([]);
  };

  return (
    <div className="background-modal" id="modal">
      <div className="modal-signup-login">
        <span className="btn-close" onClick={handleCloseSignupModal}>
          <FontAwesomeIcon icon="window-close" />
        </span>
        <div className="signup-login-content">
          <h2 className="h2-signup-login">S'inscrire</h2>
          <form onSubmit={handleSubmit} className="form-signup-login">
            <input
              className="input-signup-login input"
              type="text"
              placeholder="Nom d'utilisateur *"
              value={username}
              onChange={handleUsername}
              required
            />
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
            <div
              {...getRootProps({
                className:
                  preview.length === 0
                    ? "dropzone-no-pictures-signup"
                    : "dropzone-with-pictures-signup",
              })}
            >
              <input {...getInputProps()} />{" "}
              <aside>
                {preview.length !== 0 && (
                  <div>
                    <img src={preview[0]} alt={file[0].name} />
                    <FontAwesomeIcon
                      icon="window-close"
                      className="btn-close"
                      onClick={handleDeletePicture}
                    />
                  </div>
                )}
              </aside>
              {file.length < 1 && (
                <button
                  className="btn-white-border-green btn-add-no-pictures-publish"
                  type="button"
                >
                  + Choisis une photo de profil
                </button>
              )}
            </div>
            <p className="p-mandatory-fields-login-signup">
              <span className="asterisk">* </span>Champs obligatoires
            </p>
            <button
              type="submit"
              className="btn-signup-login btn-green"
              id="submit-btn"
            >
              S'inscrire
              <LoaderSubmission />
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
