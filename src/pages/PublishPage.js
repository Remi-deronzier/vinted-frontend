import "./PublishPage.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";

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
    const objFiles = files.reduce((obj, file, index) => {
      obj[`picture${index + 1}`] = file;
      return obj;
    }, {});
    console.log(objFiles);
    formData.append("file", { ...files });
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    console.log(formData);
    try {
      await axios.post(
        "https://vinted-api-remi.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + isConnected,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      history.push("/");
    } catch (error) {
      alert("an error has occured");
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = [...files, acceptedFiles];
      setFiles(newFiles);
      const currentPreview = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      const newPreview = [...preview, currentPreview];
      setPreview(newPreview);
    },
    [files, preview]
  );

  const { getRootProps, getInputProps } = useDropzone(
    {
      onDrop,
      disabled: files.length > 4,
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

  return (
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
                  return <img src={url} alt={files[index].name} key={index} />;
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
              type="text"
              placeholder="Ex : 8,00 €"
              id="price"
              value={price}
              onChange={handleChangePrice}
              required
              className="input input-publish"
            />
          </div>
          <div className="div-btn-add-publish">
            <button type="submit" className="btn-green btn-add-publish">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishPage;
