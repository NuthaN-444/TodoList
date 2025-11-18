import React, {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import { UseTodoContext } from '../context/TodoContext'
import axios from 'axios';




const Signup = () => {
  const navigate = useNavigate();
  const {isUserLogin,setIsUserLogin} = UseTodoContext();


 const [emailValue,setEmailValue] = useState("")
  const [passwordValue,setPasswordValue] = useState("")
  const [userValue,setUserValue] = useState("")
  const [confirmPasswordValue,setConfirmPasswordValue] = useState("")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email_value = document.querySelector("#email-value");



  const submitHandler = async(e) => {
    e.preventDefault();
    let isSignedup = false;
    

    //confirm Password Check pattern
    if(passwordValue!==confirmPasswordValue){
      document.querySelector(".confirm-password-error").style.display="initial";
      isSignedup = false;
    }else {
      document.querySelector(".confirm-password-error").style.display="none";
      isSignedup = true;
    }

    //Email Check pattern
    if (!emailRegex.test(emailValue)){
      document.querySelector(".email-error").style.display="initial";
      isSignedup = false;
    } else {
      document.querySelector(".email-error").style.display="none";
      isSignedup = true;
    }

    if(!isSignedup) return;

    try{
      const response = await axios.post("http://localhost:5000/api/signup",{name:userValue,email:emailValue,password:passwordValue});
      console.log("Server response:",response.data);
      if(response.data === "Signup Successful"){
        setIsUserLogin(true);
        navigate("/");
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.log("axios error : ",error);
    }

    setUserValue("")
    setPasswordValue("")
    setConfirmPasswordValue("")
    setEmailValue("")
}

  return (
    <>
{ isUserLogin ? <Navigate to="/" /> :(
    <div className='bg-Signup-page'>
    <div className='Signup-page-div'>
      <h3>Signup</h3>
      <form onSubmit={submitHandler}>


        <div className='UserName-block'>
            <h4 className='UserName-password-h4'>Username</h4>
            <input name='name' value={userValue} onChange={(e) => {setUserValue(e.target.value)}} type="text"className='input-design' id='UserName-value'/><br/>
          </div><br/>


          <div className='password-block'>
            <h4 className='email-password-h4'>Password</h4>
            <input name='password' value={passwordValue} onChange={(e) => {setPasswordValue(e.target.value)}} type="password" className='input-design'/><br/>
            <p className='password-error'>Incorrect password</p>
          </div><br />



          <div className='confirm-password-block'>
            <h4 className='email-password-h4'>Confirm Password</h4>
            <input value={confirmPasswordValue} onChange={(e) => {setConfirmPasswordValue(e.target.value)}} type="password" className='input-design'/><br/>
            <p className='confirm-password-error'>The passwords you entered do not match.</p>
          </div><br />


          <div className='email-block'>
            <h4 className='email-password-h4'>Email Address</h4>
            <input name='email' value={emailValue} onChange={(e) => {setEmailValue(e.target.value)}} type="email"className='input-design' id='email-value'/><br/>
            <p className='email-error'>Enter a valid email</p>
          </div>



          <input type="submit" className='submit-btn' value={"SignUp"}/><br/>
         <h4  style={{color:" rgba(0, 174, 255, 1)",cursor:"pointer"}} onClick={() => navigate("/login")} className='already-have-account'>Existing user ? Login!</h4>
      </form>
    </div>
    </div>
  )}
    </>
  )
}

export default Signup
