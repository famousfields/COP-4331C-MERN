import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [email,setEmail] = useState("");
    const [name, setName] = useState("");
    const [password1,setPassword1] = useState("");
    const [password2,setPassword2] = useState("");
    const [password,setPassword] = useState("");
    const [validEmail,setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const history = useNavigate();
    
    // const [userCredentials, setUserCredentials] = useState([
    //     email = "",
    //     finalPass = ""
    // ])
    function comparePass(){
        if(password1 === password2)
        setValidPassword(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/users', {name,email,password})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        // const js = JSON.stringify({"email":email,"passpassword":password1})
        // const result = await fetch("/users",{
        //     method:"POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //       },
        //       body :js
        // });
        //     let json;
        //     try{
        //         json = await result.json();
        //     }
        //     catch(e){
        //         console.error(e);
        //     }
        //     if(result.ok)
        //     {
        //         result.send(json)
        //     }
    }

     const signupForm = (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
            <label> enter name
                    <input
                    type = 'text'
                    required
                    name='name'
                    placeholder='name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
            </label>
                <label> enter email
                    <input
                    type = 'text'
                    required
                    name='email'
                    placeholder='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label> enter password
                    <input
                    type = 'password'
                    required
                    name='password'
                    placeholder='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    //onBlur={e => setErrorMmessage}
                    />
                </label>
                {/* <label> re-enter password
                    <input
                    type = 'password'
                    required
                    placeholder='re-enter password'
                    value={password2}
                    onChange={(e => setPassword2(e.target.value))}
                    />
                </label> */}
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
