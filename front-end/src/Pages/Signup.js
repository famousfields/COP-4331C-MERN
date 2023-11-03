import React, {useState} from 'react'

function Signup() {
    const [email,setEmail] = useState("");
    const [password1,setPassword1] = useState("");
    const [password2,setPassword2] = useState("");
    const[finalPass,setFinalPass] = useState("");
    const [validEmail,setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    // const [userCredentials, setUserCredentials] = useState([
    //     email = "",
    //     finalPass = ""
    // ])

    const handleSubmit = async(e) => {
        // const result = await fetch("/users")
        //     let json;
        //     try{
        //         json = await result.json();
        //     }
        //     catch{
        //         console.error(e);
        //     }
        //     if(result.ok)
        //     {
        //         if(validEmail&&validPassword){
        //             setUserCredentials(email,finalPass);
        //         }
        //         result.send(userCredentials);
        //     }
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
                    onChange={e => setPassword2(e.target.value)}
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
