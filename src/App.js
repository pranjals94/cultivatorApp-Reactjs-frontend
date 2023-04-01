
import './App.css';
import { Routes, Route,  } from 'react-router-dom'


//-------------page/ component imports---------------
import CultivatorHomePage from './Components/CultivatorAppHomePage'
import LogIn from './Components/Login'
import UserHomepage from './Components/UsersHomePage';
import CultivatorAppStates from './context/CultivatorAppStates';
import TestComponent from './Components/TestComponents/TestComponents';


function App() {
  // console.log("process variables",process.env)
  return (
    <>

      <div className="axiosLoading"></div>
      <AppRoutes/>
    </>
  )
function AppRoutes(){
    return (
      <CultivatorAppStates>
        <Routes>
        <Route path='/testcomponent' element={<TestComponent />} />
          <Route path='/' element={<CultivatorHomePage />} />
          <Route path='/app/login' element={<LogIn/>} />
          <Route path='/app/userhomepage' element={<UserHomepage/>} />
          <Route path='*' element={<div><h4>From React JS: Page Not Found</h4></div>} />
        </Routes>
      </CultivatorAppStates>  
    )
  }

}



export default App;
