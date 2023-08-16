import { useContext, useState } from "react";
import AuthContext from "../contexts/LoginContext/AuthContext";
import React from 'react';
import 'reactjs-popup/dist/index.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RentalCarWebAPI_URL } from "../utils/settings";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validatePassword } from '../components/Utilities'
import { usePopup } from "../contexts/PopupContext/PopupContext";

const LoginPopup = () => {
  let [errorMessage, setErrorMessage] = useState("");
  let [enteredUserName, setEnteredUserName] = useState("");
  let [enteredPassword, setEnteredPassword] = useState("");
  let { isLoggedIn, roleId, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function onJoinNowClick() {
    closePopup()
  }

  function onPopupClose() {
    setErrorMessage("")
    setEnteredUserName("")
    setEnteredPassword("")
  }

  function onChangeUserName(e) {
    setEnteredUserName(e.target.value)
    setErrorMessage("")
  }

  function onChangePassword(e) {
    setEnteredPassword(e.target.value)
    setErrorMessage("")
  }

  function setErrorAndToastify(message) {
    setErrorMessage(message);
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }

  function requestLogin() {
    return axios
      .post(RentalCarWebAPI_URL + "/users/login", {
        firstname: "a",
        lastname: "a",
        username: enteredUserName,
        password: enteredPassword,
        email: "a@a",
        imagename: "a",
        imagedata: "a"
      })
  }

  function onLogin() {
    // let message = validatePassword(enteredPassword);
    // if(message) {
    //   console.log(message)
    //   setErrorMessage(message == 'Required'? 'Password required' : "Invalid user name or password,  \n please enter your user name and passowrd.");
    //   return;
    // }

    if (enteredUserName) {
      requestLogin().then((response) => {
        if (response.data) {

          login(response.data);

          toast.success(`Welcome back ${response.data.userResponse.firstName} ${response.data.userResponse.lastName}`,  {
            position: toast.POSITION.TOP_CENTER
          });
          closePopup()
          var userId = response.data.userResponse.userId
          roleId == 1 ? navigate("/CarList") : (roleId > 1 ? navigate("/Reservation") : '');
        } else throw Error("No response.data");
      })
        .catch((error) => {
    
          if (error.code == "ERR_NETWORK") {
            setErrorAndToastify(`Server is unavailable. \n Please contact your support.`)
            return;
          }

          if (error.response) {
            if (error.response.data)
              setErrorAndToastify(error.response.data)
            else
              setErrorAndToastify("Something went wrong. \n  Please contact your support.")
          }
        });
    } else {
      setErrorAndToastify('Must enter a User Name')
    }
  }

  function getToastContainer() {
    return <ToastContainer
      autoClose={1000}
      rtl={false}
    />
  }
  const [popupOpen, setPopupOpen] = useState(false)

  function getSignInUI() {
    return (<div className="popupLoginFrame"
  
      onClose={onPopupClose}>
        <div className="arrow-up"></div>
      <div className='popup-wrapper'>
        <h1 className="signInMainTitle" style={{ marginTop: "5vmin" }}>Sign In to I&G Rental Car</h1>
        <form className="loginForm">

          <input
            type="text"
            placeholder="User Name"
            //autoComplete="off"
            name="username"
            value={enteredUserName}
            onChange={onChangeUserName}>
          </input>

          <input
            type="password"
            placeholder="Password"
            name="password"
            // autoComplete="off"
            value={enteredPassword}
            onChange={onChangePassword}>
          </input>

          {errorMessage ? (
            <div className="text-danger new-line">{errorMessage}</div>
          ) : (
            ""
          )}


          <div>
            <Link to="Registration" className='continuePopout' onClick={onJoinNowClick}>Join now</Link></div>
          <div>
            <button variant="primary" className='continuePopout' type="button" onClick={onLogin}>
              Continue
            </button>
          </div>


        </form>

      </div>
    </div>)
  }

  function onSignOut(e) {
    logout(e)
    navigate("/Home")
  }

  function getSignOutUI() {
    return <button className='signInOut' onClick={onSignOut}>SIGN OUT</button>
  }

  const { isPopupOpen, closePopup, openPopup } = usePopup()

  return (<>{getToastContainer()}
    {(isLoggedIn ? getSignOutUI() :
      <>
        <button className="signInOut" style={{ marginLeft: 'auto', zIndex: 9999 }} onClick={() => {
          isPopupOpen ? closePopup() : openPopup()
        }}>{isLoggedIn ? "Sign out" : "Sign in / Join"}</button>
        {isPopupOpen && getSignInUI()}
      </>)}

  </>)
};

export default LoginPopup;
