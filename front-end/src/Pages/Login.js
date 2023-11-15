import React, {useState,Effect} from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom";

function Login() 
{
    var loginEmail;
    var loginPassword;
    const [users,setUsers] = useState({});
    const [errorMessage,setErrorMessage] = useState("");
    const [isSubmitted,setIsSubmitted] = useState(false);


     const handleSubmit = async(e) =>{
    //     e.preventDefault();
    //     var user = {email:loginEmail.value,password:loginPassword.value};
    //     var js = JSON.stringify(obj);
    //     try{
    //         const response = await fetch("http://localhost:5000/login",{
    //         method:'POST',
    //         body: js,
    //         headers:{'Content-Type' : 'application/json'}
    //     });

    //     var result = JSON.parse(await response.text());
    //     if(result.id <= 0){
    //         setErrorMessage('User/Password combination incorrect');
    //     }
    //     else{
    //     }
    // }
    //     catch(e){
    //         alert(e.toString());
    //         return;
    //     }
      
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
            <div className='loginFormSurroundingBox'>
                <form onSubmit={handleSubmit}>
                    <label> Email
                        <input
                            className='inputBox'
                            type='email'
                            required
                            placeholder='Email'
                            name='email'
                            ref={(e) => loginEmail = e}
                        />
                    </label>
                    <br/>
                    <label> password
                        <input
                            className='inputBox'
                            type='text'
                            required
                            placeholder='password'
                            name='pass'
                            ref={(e) => loginPassword = e}
                        />
                    </label>
                    <br/>
                    <input className = 'formButton' type='submit' value= "login" />
                    <button className = 'formButton' onClick={redirectSignUp}>   Sign up</button>
                </form>
            </div>
        </div>
    );
  return (
   loginForm
  )
}

export default Login;
