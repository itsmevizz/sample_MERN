import React, { useEffect, useState } from "react";
import "../assets/vendor/css/core.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/apex-charts/apex-charts.css";
import Home from "../Home/Home";
import AddUser from "../AddUser/AddUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function SideNabar() {

  const navigate = useNavigate();
  const [addUser, setAddUserOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/admin");
    }
  }, []);

  const logOut = () => {
    axios({
      method: "post",
      url: "/admin/admin_logout",
    }).then(() => {
      // Cookies.remove("token")
      navigate("/admin");
    });
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <aside
          id="layout-menu"
          className="layout-menu menu-vertical menu bg-menu-theme"
        >
          <div className="menu-inner-shadow"></div>

          <ul className="menu-inner py-1 mt-3">
            <li className="menu-item active">
              <a className="menu-link">
                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Welcome Admin</div>
              </a>
            </li>
            <li className="menu-header small text-uppercase">
              <span className="menu-header-text">Users Managment</span>
            </li>
            <li className="menu-item">
              <a className="menu-link">
                <i className="menu-icon tf-icons bx bx-table"></i>
                <div>Users</div>
              </a>
            </li>
          </ul>
        </aside>

        <div className="layout-page">
          <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a
                className="nav-item nav-link px-0 me-xl-4"
                href="javascript:void(0)"
              >
                <i className="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div
              className="navbar-nav-right d-flex align-items-center"
              id="navbar-collapse"
            >
              <div className="navbar-nav align-items-center">
                <div className="nav-item d-flex align-items-center">
                  <i className="bx bx-search fs-4 lh-0"></i>
                  
                </div>
              </div>

              <ul className="navbar-nav flex-row align-items-center ms-auto">
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <a
                    className="nav-link dropdown-toggle hide-arrow"
                    href="javascript:void(0);"
                    data-bs-toggle="dropdown"
                  >
                    <div className="avatar">
                      <img
                        src="../../../../avatar.png"
                        alt
                        className="w-px-40 h-auto rounded-circle"
                      />
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              <img
                                src="../../../../avatar.png"
                                alt
                                className="w-px-40 h-auto rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block">vishnu</span>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <i className="bx bx-power-off me-2"></i>
                      <span
                        className="align-middle"
                        onClick={() => {
                          logOut();
                        }}
                      >
                        Log Out
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          <div class="container-xxl flex-grow-1 container-p-y">
            <div>
              <button
                className="btn btn-large btn-info mb-3"
                onClick={() => {
                  if (addUser) {
                    setAddUserOpen(false);
                  } else {
                    setAddUserOpen(true);
                  }
                }}
              >
                {addUser ? "User List" : "Add User"}
              </button>
            </div>
            {addUser ? <AddUser /> : <Home />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNabar;
