import React, {useState,useEffect} from 'react'

function Login() 
{
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [badEmail,setBadEmail] = useState(false);
    const [validUserData,setValidUserData] = useState(false);
    const [badPass,setBadPass] = useState(false);
    const [userData,setUserData] = useState([{}]);
    const [errorMessage,setErrorMessage] = usestate("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        const body = JSON.stringify({email,password});
        console.log(body);

        const response = await fetch("/api")
        let json;
        try 
        {
            json = await response.json();
        }
        catch (e)
        {
            console.error(e);
            setErrorMessages({name: "json", message: "The response from the server could not be parsed."})
            setIsSubmitted(false);
            return;
        }
        if(response.ok){
            setValidUserData(true);
            setErrorMessage(null);
            data => {
                setUserData(data);
            }
        }
        else
        {
            //check which field in form is incorrect and adjust accordingly
        }
    }

    const loginForm = (
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
        </form>
    );
  return (
   loginForm
  )
}

export default Login;
