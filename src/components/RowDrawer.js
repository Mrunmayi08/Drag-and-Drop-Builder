import React from "react";
import ImageUrlForm from "./ImageUrlForm";
import "./RowDrawer.scss";
import {
  IconColumns1,
  IconColumns2,
  IconColumns3,
  IconColumns4,
  IconColumns5,
  IconColumns6,
} from "@tabler/icons-react";
const RowDrawer = ({
  isOpen,
  onClose,
  addRow,
  isColumnDrawerOpen,
  isRowDrawerOpen,
  columnCallback,
  isImageDrawer,
  imageCallback,
  handleDragStart,
}) => {
  // Define options for adding rows and columns
  const rowOptions = [
    { label: "1 COLUMN", icon: "🖼️" },
    { label: "2 COLUMN", icon: "🖼️" },
    { label: "3 COLUMN", icon: "🖼️" },
    { label: "4 COLUMN", icon: "🖼️" },
    { label: "5 COLUMN", icon: "🖼️" },
    // { label: "6 COLUMN", icon: "🖼️" },
    // { label: "LEFT SIDEBAR", icon: "🖼️" },
    // { label: "RIGHT SIDEBAR", icon: "🖼️" },
  ];

  // Define options for adding elements
  const elementOptions = [
    { label: "Text", icon: "🖋️" },
    { label: "Image", icon: "🖼️" },
  ];

  // Determine the options to display based on the drawer type
  const options = isRowDrawerOpen ? rowOptions : elementOptions;

  // Callback handler for the image drawer
  const handleImageCallback = (url, text, type) => {
    imageCallback(url, text, type);
    onClose();
  };

  return (
    <div className={`drawer-overlay ${isOpen ? "open" : ""}`}>
      <div className="drawer">
        <div className="drawer-header">
          <h2 className="drawer-title">
            {isRowDrawerOpen
              ? "Add Row"
              : isImageDrawer
              ? "Media Editor"
              : "Add Element"}
          </h2>
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="grid-container">
          {/* Render the image form if the image drawer is open */}
          {isImageDrawer ? (
            <ImageUrlForm
              imageCallback={(url, text, type) =>
                handleImageCallback(url, text, type)
              }
            />
          ) : (
            // Render grid options for row or element selection
            options.map((option, index) => (
              <div
                key={index}
                draggable={isRowDrawerOpen}
                onDragStart={() => handleDragStart(index + 1)}
                className="grid-item"
                onClick={() =>
                  isRowDrawerOpen
                    ? addRow(index + 1)
                    : columnCallback(option.label)
                }
              >
                <div className="grid-item-icon">
                  <IconColumns3 stroke={1} />
                </div>
                <div className="grid-item-label">{option.label}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RowDrawer;
