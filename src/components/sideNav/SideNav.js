import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFile,
  faThLarge,
  faEnvelope,
  faComment,
  faUser,
  faHeart,
  faChartLine,
  faDatabase,
  faCalendar,
  faCog,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "./sideNav.scss"; // Assuming SCSS is used for styling

const SideNav = () => {
  return (
    <div className="side-nav">
      {/* Add Button */}
      <div className="nav-item active">
        <button className="nav-button">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {/* Other Icons */}
      <div className="nav-item">
        <button className="nav-button">
          <FontAwesomeIcon icon={faFile} />
        </button>
      </div>
      <div className="nav-item">
        <button className="nav-button">
          <FontAwesomeIcon icon={faThLarge} />
        </button>
      </div>
      <div className="nav-item">
        <button className="nav-button">
          <FontAwesomeIcon icon={faEnvelope} />
        </button>
      </div>
      <div className="nav-item">
        <button className="nav-button">
          <FontAwesomeIcon icon={faComment} />
        </button>
      </div>
      <div className="nav-item">
        <button className="nav-button">
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
      <div className="nav-item">
        <button className="nav-button">
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
      <div className="nav-item">
        <button className="nav-button">
          <FontAwesomeIcon icon={faChartLine} />
        </button>
      </div>
      <div className="nav-item">
        <button className="nav-button">
          <FontAwesomeIcon icon={faDatabase} />
        </button>
      </div>
      <div className="nav-item">
        <button className="nav-button">
          <FontAwesomeIcon icon={faCalendar} />
        </button>
      </div>
      <div className="nav-item">
        <button className="nav-button">
          <FontAwesomeIcon icon={faCog} />
        </button>
      </div>
      <div className="nav-item">
        <button className="nav-button">
          <FontAwesomeIcon icon={faStar} />
        </button>
      </div>
    </div>
  );
};

export default SideNav;
