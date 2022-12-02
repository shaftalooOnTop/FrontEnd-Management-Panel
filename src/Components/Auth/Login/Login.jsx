import React, { useState ,useEffect} from "react";
import { getbearer } from "../../../services/axios";

export const Login = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [loginFlag,setLogin] = useState ("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass)

        getbearer({
        
                "phoneNumber": "",
                "password": pass,
                "fullName": "",
                "email": email
            
        })

        .then((x)=>{
            console.log(x)
            console.log(10)
            setLogin("Logged in")
          })

          
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              setLogin("Account not found!")
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
              
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          })

          
          

        /*if (email===adminuser.email && pass==adminuser.password ){
            console.log ("Login Succesfull")
            console.log (loginFlag)
            setLogin("Logged in")
        }   else {
            console.log ("Login Failed")
            setLogin("ACCOUNT NOT FOUND!")
        }*/
    }
    const adminuser = { 
        email : "admin@admin.com",
        password : "admin1234"
    }

    useEffect (()=>{}, [loginFlag])

    return (

        <div className="auth-form-container">
            <h1>LOGIN</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">E-Mail</label>
                <input value={email} required onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Example@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} required onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" >Log In</button>
            </form>
            <p>Don't have an account? <a className="link-btn" onClick={() => props.onFormSwitch('register')}>Register Now</a></p>
            <span className="loginError">{loginFlag}</span>
        </div>
    )
}