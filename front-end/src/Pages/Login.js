import React, {useState,Effect} from 'react'
import axios from "axios"
//import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

function Login({onLogin}) 
{
    var loginEmail;
    var loginPassword;
    const history = useNavigate();
    const [users,setUsers] = useState({});
    const [errorMessage,setErrorMessage] = useState("");
    const [isSubmitted,setIsSubmitted] = useState(false);
    const [email,setEmail] = useState("");
    const [loginResponse, setLoginResponse] = useState();
   // const [cookies, setCookie] = useCookies(["userID"]);
    
    const [password,setPassword] = useState("");


     const handleSubmit = async(e) =>{
        e.preventDefault()
        await axios.post('http://localhost:5000/login', {email,password})
        .then(res=>console.log(res))
        .then((d)=>setLoginResponse(d))
        .catch(err=>console.log(err))
        if(loginResponse){
           // setCookie("userID",json.user_id);
            console.log("user logged in",loginResponse)
            history.push("/expenses");
        }
        else{
            console.error(loginResponse);
        }
     }

    const redirectSignUp = () => {
        return window.location.assign("/signup");
    }

    const loginForm = (
        <div className="form-container">
            <div className='loginFormSurroundingBox'>
                <form onSubmit={handleSubmit}>
                    <label style = {{
                        paddingRight : '40px'
                    }}> Email:</label>
                        <input
                            className='inputBox'
                            type='email'
                            required
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    <br/>
                    <label> Password:</label>
                        <input
                            className='inputBox'
                            type='password'
                            required
                            placeholder='password'
                            name='pass'
                            value={password}                        
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    
                    <br/>
                    <input className = 'formButton' type='submit' value= "login"/>
                    <button className = 'formButton' onClick={redirectSignUp}>   Sign up</button>
                </form>
            </div>

        </div>
    );
  return (
   loginResponse ?  <div className='login-response'>Successfull Login!</div> : loginForm
  )
}

export default Login;
