import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Signup() {
    const [email,setEmail] = useState("");
    const [name, setName] = useState("");
    const [passwordTry1,setPasswordTry1] = useState("");
    const [passwordTry2,setPasswordTry2] = useState("");
    const [password,setPassword] = useState();
    const [cookies, setCookies] = useCookies(["userID"]);
    const [errorMessage,setErrorMessage] = useState();
    const [isSubmitted,setIsSubmitted] = useState(false);
    
    const handleInvalid = (e) =>{
        e.preventDefault()
        const passwordMessage = !password && (!passwordTry1 ? "enter a password" : ! passwordTry2 ? "reenter your password" : "ensure your passwords match");
        setErrorMessage({name: "input", message: `Please ${!email && !passwordTry1 ? "enter a username and password" : [!email && "enter a username", passwordMessage].filter(i=>i).join(" and ")}.`});
    }

    useEffect(()=>{
        setPassword(passwordTry1 === passwordTry2 ? passwordTry1 : "");
    },[passwordTry1,passwordTry2])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name &&email && password)
        {
            axios.post('http://localhost:5000/signup', {name, email,password})
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            setIsSubmitted(true);
        }
        else{
            handleInvalid(e);
        }
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
                    value={passwordTry1}
                    onChange={e => setPasswordTry1(e.target.value)}
                    //onBlur={e => setErrorMmessage}
                    />
                </label>
                <label> re-enter password
                    <input
                    type = 'password'
                    required
                    name='password'
                    placeholder='password'
                    value={passwordTry2}
                    onChange={e => setPasswordTry2(e.target.value)}
                    //onBlur={e => setErrorMmessage}
                    />
                </label>
                <input
                type = 'submit'
                value= "signup"
                />
                {isSubmitted&& <div>...Pending</div>}
                {errorMessage?.message && <div className="error">{errorMessage.message}</div>}
            </form>
        </div>
     )
    
  return (
    cookies.userID ?  <div className='error'>looks like youre already signed in</div> : signupForm
  )
}

export default Signup
