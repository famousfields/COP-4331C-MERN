import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './Pages/Signup';
import About from './Pages/About';
import Home from './Pages/Home';
import Login from './Pages/Login';
import "./App.css";
import UserExpenses from './Pages/UserExpenses';
import Navbar from './Components/Navbar';
import { useCookies } from "react-cookie";
import {Redirect} from "react-router-dom";


function App() {
 const [cookies] = useCookies(["userID"]);

 const RequireUser = ({children, loggedOut=false})=>{
  if (loggedOut === !cookies.userID) {
    return children;
  } else return <Redirect to="/" />
}

  
  return (
    // <div >
    //  {typeof backendData.users === 'undefined' ? (<p>Loading...</p>) : (backendData.users.map((user,i) =>
    //  (<p key = {i}>{user}</p>)) 
    //  )}
    // </div>
    <CookiesProvider>
      <div className='App'>
        <Navbar/>
          <BrowserRouter>
            <Routes>
              <Route exact path = "/" >
                {cookies.userID ? <Redirect to="/expenses"/>: <Redirect to="/login"/>}  
              </Route>
              <Route path = "/signup">
                <RequireUser loggedOut><Signup /></RequireUser>
              </Route>
              <Route path = "/login" >
                <RequireUser loggedOut><Login /></RequireUser>
              </Route>
              <Route path = "/about">
                <RequireUser ><About /></RequireUser>
              </Route>
              <Route path='/expenses' >
                <RequireUser ><UserExpenses /></RequireUser>
              </Route>
            </Routes>
          </BrowserRouter>  
      </div>
    </CookiesProvider>
  );
}

export default App;
