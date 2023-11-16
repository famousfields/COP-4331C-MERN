import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email,setEmail] = useState("");
    const [password1,setPassword1] = useState("");
    const [password2,setPassword2] = useState("");
    const [validEmail,setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const history = useNavigate();
    
    // const [userCredentials, setUserCredentials] = useState([
    //     email = "",
    //     finalPass = ""
    // ])
    function comparePass(){
        if(password1 === password2)
        setValidPassword(password1);
    }
    const handleSubmit = async(e) => {
        const js = JSON.stringify({"email":email,"passpassword":password1})
        const result = await fetch("/users",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
              },
              body :js
        });
            let json;
            try{
                json = await result.json();
            }
            catch{
                console.error(e);
            }
            if(result.ok)
            {
                result.send(json)
                // if(validEmail&&validPassword){
                //     setUserCredentials(email,finalPass);
                //     result.send(userCredentials);
                // }
                // else if(validEmail && !validPassword){
                //     console.log("passwords do not match");
                //     return window.location.assign("/login");
                // }
            }
    }

     const signupForm = (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label> enter email
                    <input
                    type = 'text'
                    required
                    placeholder='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label> enter password
                    <input
                    type = 'password'
                    required
                    placeholder='password'
                    value={password1}
                    onChange={e => setPassword1(e.target.value)}
                    //onBlur={e => setErrorMmessage}
                    />
                </label>
                <label> re-enter password
                    <input
                    type = 'password'
                    required
                    placeholder='re-enter password'
                    value={password2}
                    onChange={(e => setPassword2(e.target.value)) && comparePass}
                    />
                </label>
                <input
                type = 'submit'
                value= "signup"
                />
            </form>
        </div>
     )
    
  return (
    signupForm
  )
}

export default Signup
