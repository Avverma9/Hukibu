/* eslint-disable no-unused-vars */
import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Hukibu Admin
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/user">
              Manage Users <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/child">
              Manage Child
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Course
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/get-courses">
                Add a course
              </a>
              <a className="dropdown-item" href="#">
                Update Price
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="/tasks">
              Tasks
            </a>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" href="/survey">
              Survey
            </a>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" href="/enguaries">
              Enquaries
            </a>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" href="/content">
              Content
            </a>
          </li> */}
          <li className="nav-item">
            <a className="nav-link" href="/activities">
              Activities
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/materials">
              Materials
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/all-instructor">
              Instructor
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/all-steps">
              Steps
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
