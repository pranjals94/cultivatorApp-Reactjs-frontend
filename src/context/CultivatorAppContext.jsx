import { createContext } from "react";

export const CultivatorAppContext = createContext()

//------------(avoids props drilling)-----------works only within the component tree. cant' use with Navigate of react router dom-------------------------
//  import { CultivatorAppContext } from "../context/CultivatorAppContext"; //remember to import CultivatorAppContext and not CultivatorAppStates
//  const a = useContext(CultivatorAppContext); //CultivatorAppContext, not CultivatorAppStates

 