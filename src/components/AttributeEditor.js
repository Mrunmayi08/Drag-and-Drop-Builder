// components/AttributeEditor.js
import React from "react";

const AttributeEditor = ({ element, updateElement }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateElement(element.id, { ...element.attributes, [name]: value });
  };

  return (
    <div className="attribute-editor">
      <h3>Edit Attributes</h3>
      {element.type === "text" && (
        <input
          type="text"
          name="text"
          value={element.attributes.text}
          onChange={handleChange}
        />
      )}
      {element.type === "image" && (
        <>
          <input
            type="text"
            name="src"
            placeholder="Image URL"
            value={element.attributes.src}
            onChange={handleChange}
          />
          <input
            type="text"
            name="alt"
            placeholder="Alt Text"
            value={element.attributes.alt}
            onChange={handleChange}
          />
        </>
      )}
    </div>
  );
};

export default AttributeEditor;
