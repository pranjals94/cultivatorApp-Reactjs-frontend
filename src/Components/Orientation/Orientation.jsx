import React, { useEffect } from "react";
import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";
import HttpService from "../../Services/HttpService";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Orientation = () => {
  const [userData, setuserdata] = useState({});
  const [orientations, setOrientations] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [showAddVisitorButton, setShowAddVisitorButton] = useState(null);
  const [showAddVisitorForm, setShowAddVisitorForm] = useState(false);
  const [formData, setFormData] = useState({
    orientation_id: "",
    visitor_name: "",
    phone_no: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    HttpService.get(
      process.env.REACT_APP_API_URL + "/application/getuser"
    ).then(
      (response) => {
        setuserdata(response.data);
        console.log(response);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );

    HttpService.get(
      process.env.REACT_APP_API_URL + "/orientation/getorientations"
    ).then(
      (response) => {
        console.log("from list persons component");
        setOrientations(response.data.orientations);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );
  }, []);

  function logout() {
    HttpService.get(process.env.REACT_APP_API_URL + "/auth/logout").then(
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
  const handleOrientation = (e) => {
    if (e.target.value == 0) {
      setParticipants([]);
      setShowAddVisitorButton(false);
      return;
    }
    let temp = { ...formData };
    temp["orientation_id"] = e.target.value;
    setFormData(temp);
    setShowAddVisitorButton(true);

    HttpService.get(
      process.env.REACT_APP_API_URL +
        "/orientation/getparticipants?orientation_id=" +
        e.target.value.toString()
    ).then(
      (response) => {
        setParticipants(response.data.participants);
      },
      (error) => {
        alert("OOps!.. Somwthing went wrong");
      }
    );
  };

  function handleMarkAttendance(e) {
    HttpService.get(
      process.env.REACT_APP_API_URL +
        "/orientation/markAttendance?participant_id=" +
        e.toString()
    ).then(
      (response) => {
        alert("Attendance marked .");
      },
      (error) => {
        alert("OOps!.. Somwthing went wrong");
      }
    );
  }

  function addVisitor() {
    HttpService.post(
      process.env.REACT_APP_API_URL + "/orientation/addvisitor",
      formData
    ).then(
      (response) => {
        alert("Attendance marked .");
      },
      (error) => {
        alert("OOps!.. Somwthing went wrong");
      }
    );
  }

  function handleFormInputChange(e) {
    let temp = { ...formData };
    temp[e.target.name] = e.target.value;
    setFormData(temp);
  }

  return (
    <>
      <Modal
        size="lg"
        animation={false}
        show={showAddVisitorForm}
        onHide={() => setShowAddVisitorForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Visitor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="visitor_name"
                value={formData.name}
                className="form-control"
                id="name"
                onChange={(e) => handleFormInputChange(e)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="phone_no" className="form-label">
                Phone No
              </label>
              <input
                type="number"
                name="phone_no"
                value={formData.phone_no}
                className="form-control"
                id="phone_no"
                onChange={(e) => handleFormInputChange(e)}
              />
            </div>

            <div className="col-12 d-flex">
              <div className="mx-auto">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addVisitor();
                  }}
                  className="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* //-----------------------modal ends---------------------------- */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <b className="navbar-brand pl-3">ORIENTATION</b>
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
            Welcome {userData.role}{" "}
            <i style={{ color: "red" }}>{userData.nameOfUser}</i> !
          </span>
          <span className="navbar-text pr-3">
            <Button onClick={logout} variant="primary">
              Logout
            </Button>
          </span>
        </div>
      </nav>
      {/* //----------------------------------------------------------------------- */}
      <div className="row g-3 mt-3">
        {" "}
        {/*bootstrap grid, g-3 means 3 colums per row*/}
        <div className="col-md-4"></div>
        <div className="col-md-4 d-flex justify-content-center">
          {" "}
          <div className="container border rounded pb-3">
            <h5>Select an Orientation.</h5>
            <select
              id="selectedCultivator"
              className="form-select"
              aria-label="Default select example"
              // (indx, item.name, item.id)
              onChange={(e) => handleOrientation(e)}>
              <option value={0} label={"Select One ..."}></option>
              {orientations.map((item, indx) => (
                <option
                  key={indx}
                  label={item.orientation_name}
                  value={item.id}>
                  {item.orientation_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-4 text-center">
          {showAddVisitorButton ? (
            <button
              onClick={() => setShowAddVisitorForm(true)}
              className="btn btn-primary mt-4">
              Add Visitor
            </button>
          ) : null}
        </div>
      </div>

      {/* //-----------------table starts--------------------- */}
      <div className="container border text-center rounded mt-3">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Sl No.</th>
                <th scope="col">Visitor name</th>
                <th scope="col">Mark Attendance</th>
                <th scope="col">Check in time.</th>
                <th scope="col">Attended</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((item, indx) => (
                <tr key={indx} data-toggle="modal" data-target="#exampleModal">
                  <th scope="row">{indx + 1}</th>
                  <td>{item.visitor_name}</td>
                  <td>
                    {" "}
                    {item.attended ? null : (
                      <button
                        onClick={() => handleMarkAttendance(item.id)}
                        className="btn btn-primary"
                        type="button">
                        Mark Present
                      </button>
                    )}
                  </td>
                  <td>{item.check_in_time}</td>
                  <td>{item.attended ? "Present" : null}</td>
                  <td>
                    <span className={item.role ? "userHighliter px-2" : null}>
                      {item.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orientation;
