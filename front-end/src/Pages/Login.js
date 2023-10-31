import React, {useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";

function Login() 
{
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [badEmail,setBadEmail] = useState(false);
    const [validUserData,setValidUserData] = useState(false);
    const [badPass,setBadPass] = useState(false);
    const [userData,setUserData] = useState([{}]);
    const [errorMessage,setErrorMessage] = useState("");
    const [isSubmitted,setIsSubmitted] = useState(false);

    const handleSubmit = async() => {
        // try 
        // {
        //     const response = await fetch("/api")
        //     console.log(response);
        // }
        // catch (err)
        // {
        //     console.log("something went wrong");
        //     setErrorMessage({name: "json", message: "The response from the server could not be parsed."})
        //     setIsSubmitted(false);
        //     return;
        // }

    }

    const redirectSignUp = () => {
        return window.location.assign("/signup");
    }

    const loginForm = (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label> Email
                    <input
                        type='text'
                        required
                        value={email}
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label> password
                    <input
                        type='text'
                        required
                        value={password}
                        name='pass'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <input type='submit' value= "login" />
                <button onClick={redirectSignUp}>   Sign up</button>
            </form>
        </div>
    );
  return (
   loginForm
  )
}

export default Login;
