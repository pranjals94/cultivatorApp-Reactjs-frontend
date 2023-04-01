import React, { Component, useState, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import pic from "./GEV-Logo.png";
import axios from "axios";
import { CultivatorAppContext } from "../context/CultivatorAppContext";

const PersonForm = () => {

  const {userRole, setUserRole} = useContext(CultivatorAppContext)

  const [visitor, setVisitor] = useState({
    name: "",
  });

  const onchangeHandler = (e) => {
    let temp = { name: "" };
    temp[e.target.name] = e.target.value;
    setVisitor(temp);
  };

  const onSubmit = () => {
    setUserRole('Hello')
    axios.post("http://127.0.0.1:8000/addVisitor", visitor).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
        {userRole}
      <div className="col-sm-4 border rounded border-secondary mx-auto ">
        <main className="px-3 ">
          <div className="text-center">
            <img
              style={{ width: "10rem", height: "10rem" }}
              className="card-img-top"
              src={pic}
              alt="Card image cap"
            />
            <h4>
              <b>Registration</b>
            </h4>
          </div>
          <hr></hr>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                aria-describedby="name"
                placeholder="Enter name"
                onChange={(e) => onchangeHandler(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNo">Phone No.</label>
              <input
                type="number"
                className="form-control"
                id="phoneNo"
                placeholder="Enter Phone No."
              />
            </div>
            <div className="form-group">
              <label htmlFor="nearestRailwayStation">
                Nearest Railway Station
              </label>
              <input
                type="number"
                className="form-control"
                id="nearestRailwayStation"
                placeholder="Nearest Railway Station"
              />
            </div>

            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header>More</Accordion.Header>
                <Accordion.Body>
                  <div className="form-group">
                    <label className="mr-3" htmlFor="gender">
                      Gender
                    </label>
                    <div className="col">
                      <div className="form-check form-check-inline">
                        <input
                          style={{ marginTop: ".3rem" }}
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="gender"
                          value="option1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1">
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          style={{ marginTop: ".3rem" }}
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="gender"
                          value="option2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2">
                          Female
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          style={{ marginTop: ".3rem" }}
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="gender"
                          value="option2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2">
                          Trans
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="number"
                      className="form-control"
                      id="city"
                      placeholder="Enter City"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="profession/education">
                      Profession/Education
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="profession/education"
                      placeholder="Profession/Education"
                    />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </form>
        </main>
        <div className="text-center mt-3">
          <Button onClick={onSubmit} className="mb-3 " variant="primary">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonForm;
