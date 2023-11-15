import React, {useState,Effect} from 'react'
import axios from "axios"
import { useHistory,useNavigate } from "react-router-dom";

function Login() 
{
    const [loginEmail,setLoginEmail] = useState('');
    const [loginPassword,setLoginPassword] = useState('');

    const history = useNavigate();
    const [users,setUsers] = useState({});
    const [errorMessage,setErrorMessage] = useState("");
    const [isSubmitted,setIsSubmitted] = useState(false);


     const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            fetch("https://localhost:5000/login",{
                loginEmail,loginPassword
            }).then(res=>{
                if(res.ok){
                   history(`/expenses/${res.id}`);
                }   
            })
        }
        catch(e){
            console.log(e.errorMessage);
        }
       
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
            <form onSubmit={handleSubmit}>
                <label> Email
                    <input
                        type='email'
                        required
                        placeholder='Email'
                        name='email'
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                </label>
                <label> password
                    <input
                        type='text'
                        required
                        placeholder='password'
                        name='pass'
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                </label>
                <input type='submit' value= "login" />
                <button onClick = {redirectSignUp}>   Sign up</button>
            </form>
        </div>
    );
  return (
   loginForm
  )
}

export default Login;
