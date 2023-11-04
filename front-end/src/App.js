import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './Pages/Signup';
import About from './Pages/About';
import Home from './Pages/Home';
import Login from './Pages/Login';
import "./App.css";
import UserExpenses from './Pages/UserExpenses';
import Navbar from './Components/Navbar';

function App() {
  // const [backendData,setBackendData] = useState([{}])
  // useEffect(()=>
  // {
  //   fetch("/api").then(
  //     response => response.json()
  //   ).then(
  //     data => 
  //     {
  //       setBackendData(data);
  //     }
  //   )
  // },[])

  return (
    // <div >
    //  {typeof backendData.users === 'undefined' ? (<p>Loading...</p>) : (backendData.users.map((user,i) =>
    //  (<p key = {i}>{user}</p>)) 
    //  )}
    // </div>
    <>
      <div className='App'>
        <Navbar/>
        <BrowserRouter>
          <Routes>
            <Route exact path = "/" element = {<Home/>}/>
            <Route path = "/signup" element = {<Signup/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/about" element = {<About/>}/>
            <Route path='/expenses' element={<UserExpenses/>}/>
          </Routes>
        </BrowserRouter>
        
      </div>
    </>
      
  );
}

export default App;
