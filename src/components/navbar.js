import React from "react";
import "./navbar.scss";
import isEmpty from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faDesktop,
  faMobileAlt,
  faLightbulb,
  faCogs,
  faExternalLinkAlt,
  faUndo,
  faRedo,
  faColumns,
  faBars,
  faCode,
  faEye,
  faSave,
  faUser,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ addBlock, handlePreview, handleSave, savedLayout }) => {
  console.log("savedLayout", savedLayout);
  return (
    <div className="nav-bar">
      <div className="nav-left">
        <div className="section-nav">
          <button className="nav-btn">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
        <div className="section-nav">
          {/* <button className="nav-btn">
            <FontAwesomeIcon icon={faArrowRight} />
          </button> */}
          <button className="nav-btn">
            <FontAwesomeIcon icon={faDesktop} />
          </button>

          <button className="nav-btn">
            <FontAwesomeIcon icon={faMobileAlt} />
          </button>
          <button className="nav-btn">
            <FontAwesomeIcon icon={faLightbulb} />
          </button>
        </div>
        <div className="section-nav">
          <button className="nav-btn" title="Settings">
            <FontAwesomeIcon icon={faCogs} />
            Settings
          </button>
          <button className="nav-btn" title="Pop up">
            <FontAwesomeIcon icon={faPenToSquare} />
            Pop up
          </button>
          <button className="nav-btn">
            <FontAwesomeIcon icon={faUndo} />
          </button>
          <button className="nav-btn">
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>
      </div>
      <div className="nav-right">
        <div className="section-nav">
          <button className="nav-btn" title="Sections">
            <FontAwesomeIcon icon={faColumns} />
            Sections
          </button>
          <button className="nav-btn" title="Rows" onClick={() => addBlock()}>
            <FontAwesomeIcon icon={faBars} />
            Rows
          </button>
          <button className="nav-btn" title="Columns">
            <FontAwesomeIcon icon={faColumns} />
            Columns
          </button>
          <button className="nav-btn" title="Elements">
            <FontAwesomeIcon icon={faCode} />
            Elements
          </button>
          {/*  */}
        </div>
        <div className="section-nav">
          <button
            className="nav-btn"
            title="Preview"
            disabled={savedLayout}
            onClick={() => handlePreview()}
          >
            <FontAwesomeIcon icon={faEye} />
            Preview
          </button>
          <button
            className="nav-btn"
            title="Save"
            onClick={() => handleSave()}
            disabled={savedLayout}
          >
            <FontAwesomeIcon icon={faSave} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
