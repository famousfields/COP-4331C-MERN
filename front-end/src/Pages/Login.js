import React, {useState,Effect} from 'react'
import axios from "axios"
import { useCookies } from "react-cookie";

function Login({onLogin}) 
{
    var loginEmail;
    var loginPassword;
    const [users,setUsers] = useState({});
    const [errorMessage,setErrorMessage] = useState("");
    const [isSubmitted,setIsSubmitted] = useState(false);
    const [email,setEmail] = useState("");
    const [loginResponse, setLoginResponse] = useState();

   const [cookies,setCookies] = useCookies(["userID"],["name"],["monthlyBudget"]);
    
    const [password,setPassword] = useState("");


     const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:5000/login', {email,password})
        .then(res=>{
            if(res.statusText === "OK")
            {
                console.log(res.data.user_id);
                setCookies("userID",res.data.user_id);
                setCookies("name",res.data.name)
                setLoginResponse(res);
                console.log(loginResponse);
            }
            else{
                console.log("Something went wrong when logging in");
            }
        })
        .catch(err=>console.log(err))

        // if(loginResponse){
        //    // setCookie("userID",json.user_id);
        //     history.push("/expenses");
        // }
        // else{
        //     console.error(loginResponse);
        // }
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

                    <div className='loginButtonsDiv'>
                        <input className = 'formButton' type='submit' value= "login"/>
                        <p>or</p>
                        <button className = 'formButton' onClick={redirectSignUp}>Signup</button>
                    </div>
                    
                </form>
            </div>

        </div>
    );
  return (
   loginResponse ?  <div className='login-response'>Successfull Login!</div> : loginForm
  )
}

export default Login;
