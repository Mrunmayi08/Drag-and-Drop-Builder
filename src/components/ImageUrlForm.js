import React, { useState } from "react";
import "./ImageUrlForm.scss";

const ImageUrlForm = ({ imageCallback }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [textValue, setText] = useState("");
  const [selected, setSelected] = useState("");

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
    setSelected("Image");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    imageCallback(imageUrl, textValue, selected);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="input_wrapper">
          <label
            htmlFor="text"
            style={{ marginBottom: "10px" }}
            className="label"
          >
            Enter text:
          </label>
          <input
            type="text"
            id="text"
            value={textValue}
            onChange={handleTextChange}
            placeholder="Enter a text"
            className="input"
          />
        </div>
        <div className="input_wrapper">
          <label
            htmlFor="imageUrl"
            style={{ marginBottom: "10px" }}
            className="label"
          >
            Enter Image URL:
          </label>
          <input
            type="text"
            id="text"
            value={imageUrl}
            onChange={handleInputChange}
            placeholder="Enter a valid image URL"
            className="input"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ImageUrlForm;
