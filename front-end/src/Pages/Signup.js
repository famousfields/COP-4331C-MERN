import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Signup() 
{
    const [email,setEmail] = useState("");
    const [name, setName] = useState("");
    const [passwordTry1,setPasswordTry1] = useState("");
    const [passwordTry2,setPasswordTry2] = useState("");
    const [password,setPassword] = useState();
    const [cookies, setCookies] = useCookies(["userID"]);
    const [errorMessage,setErrorMessage] = useState();
    const [isSubmitted,setIsSubmitted] = useState(false);
    const [signupStatus,setSignupStatus]= useState("");
    
    const handleInvalid = (e) =>{
        e.preventDefault()
        const passwordMessage = !password && (!passwordTry1 ? "enter a password" : ! passwordTry2 ? "reenter your password" : "ensure your passwords match");
        setErrorMessage({name: "input", message: `Please ${!email && !passwordTry1 ? "enter a email and password" : [!email && "enter a email", passwordMessage].filter(i=>i).join(" and ")}.`});
    }

    useEffect(()=>{
        setPassword(passwordTry1 === passwordTry2 ? passwordTry1 : "");
    },[passwordTry1,passwordTry2])

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            if(name &&email && password)
            {
                const response = await axios.post('http://localhost:5000/signup', {name, email , password})
                let responseData;
                if(response.statusText === 'OK')
                {
                    responseData = response.data;
                    setSignupStatus(responseData.data)
                    console.log(signupStatus)
                    setIsSubmitted(true);
                }
                else if(response.data.msg==='Error Sending mail'){
                    setErrorMessage("Please enter a valid email")
                    return
                }
                setIsSubmitted(true);

            } 
            else{
                handleInvalid(e);
                return
            }
        }catch(error){
            console.error(error)
        }
       
    }

    const handleBad = () =>{
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    }

    useEffect(()=>{
        setErrorMessage([])
    },[isSubmitted])
    
     const signupForm = (
        <div className="form-container">

            <div className='signupFormSurroundingBox'>
                <form onSubmit={handleSubmit}>
                    <label style = {{
                        paddingRight : '85px'
                    }}> Enter Name  </label>
                            <input
                            className='inputBox'
                            type = 'text'
                            required
                            name='name'
                            placeholder='name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                    />
                   
                    <br/>
                    <label style = {{
                        paddingRight : '90px'
                    }}> Enter Email </label>
                        <input
                        className='inputBox'
                        type = 'text'
                        required
                        name='email'
                        placeholder='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    
                    <br/>
                    <label style = {{
                        paddingRight : '50px'
                    }}>Enter Password</label>
                        <input
                        className='inputBox'
                        type = 'password'
                        required
                        name='password'
                        placeholder='password'
                        value={passwordTry1}
                        onChange={e => setPasswordTry1(e.target.value)}
                        //onBlur={e => setErrorMmessage}
                        />
                    
                    <br/>
                    <label style = {{
                        paddingRight : '0px'
                    }}>Re-Enter Password </label>
                        <input
                        className='inputBox'
                        type = 'password'
                        required
                        name='password'
                        placeholder='password'
                        value={passwordTry2}
                        onChange={e => setPasswordTry2(e.target.value)}
                        //onBlur={e => setErrorMmessage}
                        />
                    
                    <input
                    className='formButton'
                    type = 'submit'
                    value= "signup"
                    />

                    {errorMessage?.message ?  <div className="error">
                        {errorMessage.message}
                    </div>: isSubmitted && <div className='signupmsg'>Please verify email</div>
                    }
                    

                    
                    
                </form>
            </div>
        </div>
     )
    
  return (
    cookies.userID ?  <div className='error'>looks like youre already signed in</div> : signupForm
  )
}

export default Signup
