import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import pic from "../GEV-Logo.png";
import HttpService from "../Services/HttpService";
import { useNavigate } from "react-router-dom";
import { CultivatorAppContext } from "../context/CultivatorAppContext";
import { Cookies } from "react-cookie";

const LogIn = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [login_credentials, setLogin_credentials] = useState({
    username: "",
    password: "",
  });

  const a = useContext(CultivatorAppContext);

  useEffect(() => {
    a.setUser({});
    const token = cookies.get("access_token");
    // console.log("cookie token", token)
    if (token) {
      HttpService.get(
        process.env.REACT_APP_API_URL + "/application/getuser"
      ).then(
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

  const onchangeHandler = (e) => {
    let temp = login_credentials;
    temp[e.target.name] = e.target.value;
    setLogin_credentials(temp);
  };

  //-----------------------------------------------------------------------------------------------------
  const OnLogIn = () => {
    HttpService.post(
      process.env.REACT_APP_API_URL + "/auth/login",
      login_credentials
    ).then(
      (response) => {
        navigate("/app/userhomepage");
      },
      (error) => {
        // alert("Invalid username or password");
        console.log(error);
        alert(error.message);
      }
    );
  };

  //----------------------------------------------------------------------------------------------------
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
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
              <b>Log In</b>
            </h4>
          </div>
          <hr></hr>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                aria-describedby="username"
                placeholder="Enter Username"
                onChange={(e) => onchangeHandler(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                aria-describedby="password"
                placeholder="Enter Password"
                onChange={(e) => onchangeHandler(e)}
              />
            </div>
          </form>
        </main>
        <div className="text-center mt-3">
          <Button onClick={OnLogIn} className="mb-3 " variant="primary">
            Go
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
