import React, { useEffect, useContext } from "react";
import { CultivatorAppContext } from "../../context/CultivatorAppContext";
import ListAssignedPersons from "./ListAssignedPersons";
import ListAssignedPersonsAll from "./ListAssignedPersonsAll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";
import HttpService from "../../Services/HttpService";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const Cultivator = () => {
  const a = useContext(CultivatorAppContext);
  // const [userData, setUserData] = useState({});
  const [assignedPersons, setAssignedPersons] = useState([]);
  const [assignedPersonsAll, setAssignedPersonsAll] = useState([]);
  const [activeTab, setActiveTab] = useState([]);
  const navigate = useNavigate();
  const [viewSideBar, setViewSideBar] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone_no: Number,
    gender: "",
    email: "",
  });

  useEffect(() => {
    
    HttpService.get(
      process.env.REACT_APP_API_URL +
        "/cultivator/assigned_persons/" +
        a.user.person_id
    ).then(
      (response) => {
        setAssignedPersons(response.data.guests);
        // console.log(response);
      },
      (error) => {
        // alert(error.response.data);
      }
    );

    HttpService.get(
      process.env.REACT_APP_API_URL +
        "/cultivator/assigned_persons_all/" +
        a.user.person_id
    ).then(
      (response) => {
        setAssignedPersonsAll(response.data.guests);
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

  const onchangeHandler = (e) => {
    let temp = formData;
    temp[e.target.name] = e.target.value;
    setFormData(temp);
  };

  const onSubmit = () => {
    console.log("form data", formData);
    setReloadPage(!reloadPage); // just toggle the state to reload page including use effect dependency
    HttpService.post("/common/createperson", formData).then(
      (response) => {
        console.log(response);
        alert(response.data.msg);
      },
      (error) => {
        console.log(error);
        alert(error.response.data.detail);
      }
    );
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
                    Assigned Visitors
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false">
                    Current Visitors
                  </a>
                  <a
                    className="nav-link"
                    id="add-new-person-tab"
                    data-toggle="tab"
                    href="#add-new-person"
                    role="tab"
                    aria-controls="add-new-person"
                    aria-selected="false">
                    Add Visitor
                  </a>
                  <a>
                  {/* <h1>
                        {a.user.person_id}
                  </h1> */}
                  </a>
                  {/* <div className="input-group">
                    {/* <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      aria-label="Input group example"
                      aria-describedby="btnGroupAddon2"
                    /> 
                     <div className="input-group-text" id="btnGroupAddon2">
                      <FontAwesomeIcon className="fa-1x" icon={faSearch} />
                    </div> 
                  </div> */}
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-assigned"
                  role="tabpanel"
                  aria-labelledby="nav-assigned-tab">
                  {/* //----------------list assigned person table----------- */}
                  <ListAssignedPersonsAll
                    assignedPersonsAll={assignedPersonsAll}
                  />{" "}
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab">
                  <ListAssignedPersons
                    assignedPersons={assignedPersons}
                    tabProp={2}
                  />{" "}
                </div>
                <div
                  className="tab-pane fade "
                  id="add-new-person"
                  role="tabpanel"
                  aria-labelledby="add-new-person-tab">
                  {/* //------------------Add new person from starts------------------------- */}
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="fullname">Full name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullname"
                          placeholder="Enter Full Name"
                          name="name"
                          onChange={(e) => onchangeHandler(e)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input
                          type="number"
                          className="form-control"
                          id="phonenumber"
                          placeholder="Enter Mobile No."
                          name="phone_no"
                          onChange={(e) => onchangeHandler(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="eg: harekrishna@xyz.com"
                        name="email"
                        onChange={(e) => onchangeHandler(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <input
                        type="text"
                        className="form-control"
                        id="gender"
                        placeholder="Gender"
                        name="gender"
                        onChange={(e) => onchangeHandler(e)}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputCity"
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">State</label>
                        <select id="inputState" className="form-control">
                          <option selected>Choose...</option>
                          <option>...</option>
                        </select>
                      </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputZip"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                          Check me out
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onSubmit();
                      }}
                      className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                  {/* //-------------------------Addnew person form ends----------------- */}
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
