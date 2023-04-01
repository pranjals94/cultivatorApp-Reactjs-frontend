import React, { useContext, useEffect, useState } from "react";
import HttpService from "../Services/HttpService";
import { CultivatorAppContext } from "../context/CultivatorAppContext";
import AdminPage from "./Admin/AdminPage";
import Cultivator from "./Cultivator/Cultivator";
import Reception from "./Reception/Reception";
import Orientation from "./Orientation/Orientation";
import { useNavigate } from "react-router-dom";

const UserHomepage = () => {
  const a = useContext(CultivatorAppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const collection = document.getElementsByClassName(
      "modal-backdrop fade show"
    );
    collection[0]?.remove();
    HttpService.get(
      process.env.REACT_APP_API_URL + "/application/getuser"
    ).then(
      (response) => {
        a.setUser(response.data);
        console.log(response);
      },
      (error) => {
        //disable during development
        alert(error.message);
        navigate("/app/login");
      }
    );
  }, []);

  if (a.user.role === "ADMIN") return <AdminPage />;
  if (a.user.role === "CULTIVATOR") return <Cultivator />;
  if (a.user.role === "ORIENTATION") return <Orientation />;
  if (a.user.role === "RECEPTION") return <Reception />;
  return (
    <h5>Loading...!</h5>
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100vh",
    //   }}
    //   className="text-center">
    //   <span>
    //     <img src={loadingGif} alt="my-gif" />
    //     <br />
    //     <h3>Loading Please Wait ...!</h3>
    //     <br />
    //     <h6>(Taking long time, Check network or try reloading.)</h6>
    //   </span>
    // </div>
  );
};

export default UserHomepage;
