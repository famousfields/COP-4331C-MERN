import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Signup from './Pages/Signup';
import About from './Pages/About';
import Home from './Pages/Home';
import Login from './Pages/Login';
import "./App.css";
import UserExpenses from './Pages/UserExpenses';
import Navbar from './Components/Navbar';
import { CookiesProvider,useCookies } from "react-cookie";

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
    <>
      <Navbar/>
      <div className='App'>
          <Switch>
              <Route exact path = "/" >
                {cookies.userID ? <Redirect to="/expenses"/> : <Home/> } 
              </Route>
              <Route path = "/signup">
                <RequireUser loggedOut><Signup /></RequireUser>
              </Route>
              <Route path = "/login" >
                <RequireUser loggedOut><Login /></RequireUser>
              </Route>
              <Route path = "/about">
                <About />
              </Route>
              <Route path='/expenses' >
                <RequireUser ><UserExpenses /></RequireUser>
              </Route>
          </Switch>  
      </div>
    </>
  );
}

export default App;
