import React, {useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";

function Login() 
{
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [errorMessage,setErrorMessage] = useState("");
    const [isSubmitted,setIsSubmitted] = useState(false);


    const handleSubmit = async() =>{
        let item = {email,password}
        let resut = await fetch("/users")
        // try{
        //     const response = await fetch("/users")
        //     console.log(response.data);
        // }
        // catch (err){
        //     console.log("something went wrong");
        //     setErrorMessage({name: "json", message: "The response from the server could not be parsed."})
        //     setIsSubmitted(false);
        //     return;
        // }
        // if(response.ok){
        //     r;
        // }
        // else{
        //     console.log("Error encountered logging you in");
        // }
        //history.push("/userexpenses");
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
                        placeholder='Email'
                        value={email}
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label> password
                    <input
                        type='text'
                        required
                        placeholder='password'
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
