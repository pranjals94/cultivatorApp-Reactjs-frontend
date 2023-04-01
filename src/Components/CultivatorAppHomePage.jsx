import React, { useContext, useEffect } from "react";
import pic from "../GEV-Logo.png";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import HttpService from "../Services/HttpService";
import { Cookies } from "react-cookie";

import { CultivatorAppContext } from "../context/CultivatorAppContext";

const CultivatorHomePage = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const a = useContext(CultivatorAppContext);

  useEffect(() => {
    a.setUser({});
    const token = cookies.get("access_token");
    console.log("cookie token", token)
    if (token) {
      HttpService.get("/application/getuser").then(
        (response) => {
          a.setUser(response.data);
          navigate("/app/userhomepage");
        },
        (error) => {
          // console.log(error)
          // alert("OOps!.. Somwthing went wrong");
        }
      );
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <div
        style={{
          backgroundImage: `url(${require("../Radha-Madanmohan-Temple.jpg")})`,
          height: "75vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
        className="col-sm-4 border rounded border-secondary mx-auto text-center pt-2 ">
        <h5>GEV Cultivator App</h5>
        <div style={{ position: "absolute", bottom: "0px" }}>
          <Button
            onClick={() => navigate("/app/login")}
            className="mb-3 "
            variant="primary">
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CultivatorHomePage;
