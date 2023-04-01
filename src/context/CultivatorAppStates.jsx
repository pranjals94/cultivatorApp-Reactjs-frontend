import { any } from "prop-types";
import React, { useState } from "react";
import { CultivatorAppContext } from "./CultivatorAppContext";

function CultivatorAppStates({ children }) {
  const [user, setUser] = useState({});

  // for development

  // const [user, setUser] = useState({
  //   nameOfUser: " userDetails.person.name",
  //   role: "RECEPTION",
  //   user_id: "userDetails.id",
  //   person_id: "userDetails.person.id",
  // });

  const [temp, setTemp] = useState(null);
  const Context_testData = { name: "Billu", age: "24" };
  return (
    <CultivatorAppContext.Provider
      value={{ Context_testData, user, setUser, temp, setTemp }}>
      {children}
    </CultivatorAppContext.Provider>
  );
}

export default CultivatorAppStates;
