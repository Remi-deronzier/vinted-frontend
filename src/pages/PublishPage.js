import "./PublishPage.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PublishPage = ({ isConnected }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);

  let history = useHistory();

  useEffect(() => {
    document.title = "Vends ton article - Vinted";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`picture${index + 1}`, file);
    });
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    try {
      // Disable the submit button
      document
        .querySelector("#submit-btn")
        .setAttribute("disabled", "disabled");
      // Launch the loader
      document
        .querySelector(".loader-circle")
        .classList.remove("loader-circle-hidden");
      // axios
      const response = await axios.post(
        "https://vinted-api-remi.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + isConnected,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Enable the button after the request
      document.querySelector("#submit-btn").removeAttribute("disabled");
      // Stop the loader
      document
        .querySelector(".loader-circle")
        .classList.add("loader-circle-hidden");
      history.push(`/offer/${response.data._id}`);
    } catch (error) {
      alert("an error has occured");
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      const currentPreview = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      const newPreview = [...preview, ...currentPreview];
      setPreview(newPreview);
    },
    [files, preview]
  );

  const { getRootProps, getInputProps } = useDropzone(
    {
      onDrop,
      disabled: files.length > 4,
      maxFiles: 5 - files.length,
      accept: "image/jpeg, image/png",
    },
    [files]
  );

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeBrand = (e) => {
    setBrand(e.target.value);
  };

  const handleChangeSize = (e) => {
    setSize(e.target.value);
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };

  const handleChangeCondition = (e) => {
    setCondition(e.target.value);
  };

  const handleChangeLocation = (e) => {
    setCity(e.target.value);
  };

  const handleDeletePicture = (index) => {
    const newFiles = [...files];
    const newFilesDeleted = newFiles
      .slice(0, index)
      .concat(newFiles.slice(index + 1));
    const newPreview = [...preview];
    const newFPreviewDeleted = newPreview
      .slice(0, index)
      .concat(newPreview.slice(index + 1));
    setPreview(newFPreviewDeleted);
    setFiles(newFilesDeleted);
  };

  return isConnected ? (
    <div className="publish-page">
      <div className="container">
        <h1 className="publish-page-h1">Vends ton article</h1>
        <form onSubmit={handleSubmit}>
          <div className="publish-picture">
            <p className="p-publish-picture">Ajoute jusqu'à 5 photos</p>
            <div
              {...getRootProps({
                className:
                  preview.length === 0
                    ? "dropzone-no-pictures"
                    : "dropzone-with-pictures",
              })}
            >
              <input {...getInputProps()} />{" "}
              <aside>
                {preview.map((url, index) => {
                  return (
                    <div key={index}>
                      <img src={url} alt={files[index].name} />
                      <FontAwesomeIcon
                        icon="window-close"
                        className="icon-delete-picture"
                        onClick={() => handleDeletePicture(index)}
                      />
                    </div>
                  );
                })}
              </aside>
              {files.length <= 4 && (
                <button
                  className={
                    preview.length === 0
                      ? "btn-white-border-green btn-add-no-pictures-publish"
                      : "btn-white-border-green btn-add-with-pictures-publish"
                  }
                >
                  {preview.length === 0 ? "+ Ajoute des photos" : "+"}
                </button>
              )}
            </div>
          </div>
          <div className="publish-title-description">
            <div className="publish-title">
              <label className="label-publish-page" htmlFor="title">
                Titre
              </label>
              <input
                type="text"
                placeholder="Ex : chemise"
                id="title"
                value={title}
                onChange={handleChangeTitle}
                required
                className="input input-publish"
              />
            </div>
            <div className="publish-description">
              <label htmlFor="description" className="label-publish-page">
                Décris ton article
              </label>
              <textarea
                type="text"
                placeholder="Ex : porté quelque fois, taille correctement"
                id="description"
                value={description}
                onChange={handleChangeDescription}
                required
                className="input input-publish textarea-description"
              />
            </div>
          </div>
          <div className="publish-details">
            <div className="publish-details-card">
              <label className="label-publish-page" htmlFor="title">
                Marque
              </label>
              <input
                type="text"
                placeholder="Ex : Zara"
                id="brand"
                value={brand}
                onChange={handleChangeBrand}
                className="input input-publish"
              />
            </div>
            <div className="publish-details-card">
              <label htmlFor="size" className="label-publish-page">
                Taille
              </label>
              <input
                type="text"
                placeholder="Ex : L/40/12"
                id="size"
                value={size}
                onChange={handleChangeSize}
                className="input input-publish"
              />
            </div>
            <div className="publish-details-card">
              <label htmlFor="color" className="label-publish-page">
                Couleur
              </label>
              <input
                type="text"
                placeholder="Ex : Fushia"
                id="color"
                value={color}
                onChange={handleChangeColor}
                className="input input-publish"
              />
            </div>
            <div className="publish-details-card">
              <label htmlFor="condition" className="label-publish-page">
                État
              </label>
              <input
                type="text"
                placeholder="Ex : Neuf avec étiquette"
                id="condition"
                value={condition}
                onChange={handleChangeCondition}
                className="input input-publish"
              />
            </div>
            <div className="publish-details-card">
              <label htmlFor="city" className="label-publish-page">
                Lieu
              </label>
              <input
                type="text"
                placeholder="Ex : Paris"
                id="city"
                value={city}
                onChange={handleChangeLocation}
                className="input input-publish"
              />
            </div>
          </div>
          <div className="publish-price">
            <label htmlFor="price" className="label-publish-page">
              Prix
            </label>
            <input
              type="number"
              placeholder="Ex : 8,00 €"
              id="price"
              value={price}
              onChange={handleChangePrice}
              required
              className="input input-publish"
            />
          </div>
          <div className="div-btn-add-publish">
            <button
              type="submit"
              className="btn-green btn-add-publish"
              id="submit-btn"
            >
              Ajouter
              <div className="loader-circle loader-circle-hidden">
                <div className="circle-loader circle-1"></div>
                <div className="circle-loader circle-2"></div>
                <div className="circle-loader circle-3"></div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default PublishPage;
