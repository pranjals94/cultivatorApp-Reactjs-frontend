import React, { useContext, useEffect, useState } from "react";
import HttpService from "../../Services/HttpService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { CultivatorAppContext } from "../../context/CultivatorAppContext";

const Modaltabs = (props) => {
  const a = useContext(CultivatorAppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    email: "",
    gender: "",
  });

  function handleEditSave() {
    setFormData(a.temp);
    const collapseElement = document.getElementById("collapseExample");
    props.setCollapseExpanded(collapseElement?.classList.contains("show"));
    // console.log("collapse show from handler",test?.classList.contains("show"))
  }

  const onchangeHandler = (e) => {
    let temp = { ...formData }; //this is necessery else wont work as expected
    temp[e.target.name] = e.target.value;
    setFormData(temp);
  };

  const onSave = () => {
    // setReloadPage(!reloadPage); // just toggle the state to reload page including use effect dependency
    HttpService.post("/application/createperson", formData).then(
      (response) => {
        console.log(response);
        alert(response.data.msg);
        window.location.reload(false);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      }
    );
  };

  return (
    <div className="my-3 mx-3 border rounded">
      <ul className="nav nav-pills my-1 mx-2" id="pills-tab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="pills-details-tab"
            data-toggle="pill"
            href="#pills-details"
            role="tab"
            aria-controls="pills-details"
            aria-selected="true">
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-Family-tab"
            data-toggle="pill"
            href="#pills-Family"
            role="tab"
            aria-controls="pills-Family"
            aria-selected="false">
            Family
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-contact-tab"
            data-toggle="pill"
            href="#pills-contact"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false">
            Contact
          </a>
        </li>
      </ul>
      <hr className="mt-1" />
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-details"
          role="tabpanel"
          aria-labelledby="pills-details-tab">
          <div className="row pb-3">
            <div className="col-9">
              {" "}
              Name: {a.temp?.name}
              <br />
              Phone: {a.temp?.phone_no}
              <br />
              Email: {a.temp?.email}
              <br />
              Gender: {a.temp?.gender}
              <br />
            </div>
            <div className="col-3 mt-4">
              <button
                onClick={handleEditSave}
                className="btn btn-primary"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample">
                {props.collapseExpanded ? (
                  "Edit"
                ) : (
                  <FontAwesomeIcon
                    className="fa-2x"
                    data-toggle="collapse"
                    data-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    icon={faCircleArrowUp}
                  />
                )}
              </button>
            </div>
          </div>

          <div className="collapse mb-3 mx-3" id="collapseExample">
            <div className="card card-body">
              {/* //---------Form-------------- */}
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
                      value={formData?.name}
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
                      value={formData?.phone_no}
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
                    value={formData?.email}
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
                    value={formData?.gender}
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
                      <option value="default">Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputZip">Zip</label>
                    <input type="text" className="form-control" id="inputZip" />
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onSave();
                  }}
                  className="btn btn-primary">
                  Save
                </button>
              </form>
              {/* //----------form ends--------------- */}
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-Family"
          role="tabpanel"
          aria-labelledby="pills-Family-tab">
          ...
        </div>
        <div
          className="tab-pane fade"
          id="pills-contact"
          role="tabpanel"
          aria-labelledby="pills-contact-tab">
          ...
        </div>
      </div>
    </div>
  );
};

export default Modaltabs;
