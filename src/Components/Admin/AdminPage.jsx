import React, { useEffect, useContext } from "react";
import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";
import HttpService from "../../Services/HttpService";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ListPersons from "./ListPersons";
import { CultivatorAppContext } from "../../context/CultivatorAppContext";

const AdminPage = () => {
  // const [userData, setUserData] = useState({});
  const a = useContext(CultivatorAppContext);
  // console.log("adminpage",a.user.role)
  const [reloadPage, setReloadPage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone_no: Number,
    gender: "",
    email: "",
  });

  const [persons, setPersons] = useState([]); // for build
  // const [persons, setPersons] = useState([
  //   { id: 1, name: "pranjal", role: "ADMIN" },
  //   { id: 2, name: "Chandan" },
  //   { id: 3, name: "Chandan" },
  //   { id: 4, name: "Chandan" },
  //   { id: 5, name: "Chandan" },
  //   { id: 6, name: "Chandan", role: "Cultivator" },
  // ]);
  const [roles, setRoles] = useState([]); // for build
  // const [roles, setRoles] = useState([
  //   { id: 1, name: "ADMIN" },
  //   { id: 2, name: "Cultivator" },
  //   { id: 3, name: "Orientation" },
  // ]);

  const navigate = useNavigate();

  useEffect(() => {
    // HttpService.get("/common/getuser").then(
    //   (response) => {
    //     setUserData(response.data);
    //     console.log(response);
    //   },
    //   (error) => {
    //     // alert("OOps!.. Somwthing went wrong");
    //   }
    // );

    HttpService.get(process.env.REACT_APP_API_URL + "/admin/listpersons").then(
      (response) => {
        console.log("from list persons component");
        setPersons(response.data.persons);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );

    HttpService.get(process.env.REACT_APP_API_URL + "/common/getroles").then(
      (response) => {
        setRoles(response.data.roles);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );
  }, [reloadPage]);

  function logout() {
    HttpService.get(process.env.REACT_APP_API_URL + "/auth/logout").then(
      (response) => {
        navigate("/");
        console.log(process.env.REACT_APP_API_URL + "log out = ", response);
      },
      (error) => {
        console.log(error);
        alert("aOOps!.. Somwthing went wrong");
      }
    );
  }

  const onchangeHandler = (e) => {
    let temp = formData;
    temp[e.target.name] = e.target.value;
    setFormData(temp);
  };

  const onSubmit = () => {
    console.log("form data", formData);
    setReloadPage(!reloadPage); // just toggle the state to reload page including use effect dependency
    HttpService.post(
      process.env.REACT_APP_API_URL + "/common/createperson",
      formData
    ).then(
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

  // console.log(" Admin page reload", reloadPage);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <b className="navbar-brand pl-3">ADMINISTRATOR</b>
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
            <li className="nav-item active">
              <Link className="nav-link" to={"/"}>
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
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
      {/* //----------------------------Tabs start----------------------- */}
      <div className="container border text-center rounded mt-3">
        <ul className="nav nav-pills pt-3" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link"
              id="add-new-person-tab"
              data-toggle="tab"
              href="#add-new-person"
              role="tab"
              aria-controls="add-new-person"
              aria-selected="false">
              Add New Person
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link active"
              id="list-persons-tab"
              data-toggle="tab"
              href="#list-persons"
              role="tab"
              aria-controls="list-persons"
              aria-selected="true">
              List Persons
            </a>
          </li>
        </ul>
        <hr />
        <div className="tab-content" id="myTabContent">
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
                  <input type="text" className="form-control" id="inputCity" />
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
                  <input type="text" className="form-control" id="inputZip" />
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
          <div
            className="tab-pane fade show active"
            id="list-persons"
            role="tabpanel"
            aria-labelledby="list-persons-tab">
            <ListPersons persons={persons} roles={roles} />
            {/* // child components use effect does not run when parent 
            components any of the state is changed */}
          </div>
        </div>
      </div>
      {/* //----------------------------Tab ends----------------------- */}
    </>
  );
};

export default AdminPage;
