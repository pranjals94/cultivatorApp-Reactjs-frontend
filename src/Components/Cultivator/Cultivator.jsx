import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import HttpService from "../../Services/HttpService";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { CultivatorAppContext } from "../../context/CultivatorAppContext";
import ListAssignedPersons from "./ListAssignedPersons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

const Cultivator = () => {
  const a = useContext(CultivatorAppContext);
  // const [userData, setUserData] = useState({});
  const [assignedPersons, setAssignedPersons] = useState([]);
  const navigate = useNavigate();
  const [viewSideBar, setViewSideBar] = useState(false);

  useEffect(() => {
    
  //   setAssignedPersons([
  //     {
  //       id: 1,
  //       name: "Bisleri",
  //       phone_no: 94775874783,
  //       email: "bisleri@iut.com",
  //       gender: "N/A"
  //     },
  //     {
  //       id: 1,
  //       name: "Bisleri",
  //       phone_no: 94775874783,
  //       email: "bisleri@iut.com",
  //       gender: "N/A"
  //     },
  //     {
  //       id: 1,
  //       name: "Bisleri",
  //       phone_no: 94775874783,
  //       email: "bisleri@iut.com",
  //       gender: "N/A"
  //     },
  //   ]); //for fast development only

    HttpService.get(
      "/cultivator/assigned_persons/" + a.user.person_id.toString()
    ).then(
      (response) => {
        setAssignedPersons(response.data.assigned_persons);
        // console.log(response);
      },
      (error) => {
        // alert(error.response.data);
      }
    );
  }, []);

  function logout() {
    HttpService.get("/auth/logout").then(
      (response) => {
        navigate("/");
        console.log("log out = ", response);
      },
      (error) => {
        console.log(error);
        alert("OOps!.. Somwthing went wrong");
      }
    );
  }

  const showSidebar = () => {
    setViewSideBar(!viewSideBar);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="d-flex align-items-center">
          {!viewSideBar ? (
            <FontAwesomeIcon
              onClick={showSidebar}
              className="d-lg-none fa-2x border rounded p-2 ml-2"
              icon={faCircleArrowRight}
            />
          ) : (
            <FontAwesomeIcon
              onClick={showSidebar}
              className="d-lg-none fa-2x border rounded p-2 ml-2"
              icon={faCircleArrowLeft}
            />
          )}
          <a className="navbar-brand ml-2" href="#">
            CULTIVATOR
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item active">
              <Link className="nav-link" to={""}>
                Home
              </Link>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
          </ul>
          <span className="navbar-text pr-3">
            Welcome {a.user.role}{" "}
            <i style={{ color: "red" }}>{a.user.nameOfUser}</i> !
          </span>
          <span className="navbar-text pr-3">
            <Button onClick={logout} variant="primary">
              Logout
            </Button>
          </span>
        </div>
      </nav>
      {/* //------------------nav bar ends------------------------------- */}
      <div className="container-fluid">
        <div className="row pt-3">
          <div
            className={
              !viewSideBar
                ? "d-none d-lg-block col-sm-2"
                : "mobileSideBarPositionAbsolute border rounded col-sm-5"
            }>
            <div style={{ maxWidth: "auto" }}>
              <Sidebar />
            </div>
          </div>
          <div className="col-sm-10">
            {/* //-----------------------Tabs  start----------------------------- */}
            <div className="container border text-center rounded mt-3 ">
              <nav className="pt-3">
                <div className="nav nav-pills" id="pills-tab" role="tablist">
                  <a
                    className="nav-item nav-link active"
                    id="nav-assigned-tab"
                    data-toggle="tab"
                    href="#nav-assigned"
                    role="tab"
                    aria-controls="nav-assigned"
                    aria-selected="true">
                    Assigned
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false">
                    Profile
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-contact-tab"
                    data-toggle="tab"
                    href="#nav-contact"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false">
                    Contact
                  </a>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-assigned"
                  role="tabpanel"
                  aria-labelledby="nav-assigned-tab">
                  {/* //----------------list assigned person table----------- */}
                  <ListAssignedPersons assignedPersons={assignedPersons} />{" "}
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab">
                  ...
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab">
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cultivator;
