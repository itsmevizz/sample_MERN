import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Signup.css"
import "./util.css"

function Login() {
  const navigate = useNavigate()
  const inputRef = useRef()
  const navigation = useNavigate()
  const userData = localStorage.getItem('usedData')
  useEffect(() => {
    inputRef.current.focus()
    document.title = "Signup"
    if (userData) {
      navigation('/')
    }
  }, [])

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState('')
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailErr, serEmailErr] = useState("");
  const [passErr, setPassErr] = useState(" ");
  const [nameErr, setNameErr] = useState(" ");
  const [passHide, setShowPass] = useState("password")

  const validateName = () => {
    if (name === "" || name.match(/^\s*$/.test(name))) {
      setNameErr("*");
    } else if (!name.match(/^(?=.*[a-z])[a-z0-9]{0,10}$/)) {
      setNameErr("*");
    } else {
      setNameErr("");
    }
  };

  const validateEmail = () => {
    if (email === "" || /^\s*$/.test(email)) {
      serEmailErr("*");
    } else if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
      serEmailErr("Email Invalid");
    } else {
      serEmailErr("");
    }
  };
  const validatePassword = () => {
    if (password === " " || /^\s*$/.test(password)) {
      setPassErr("*");
    } else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      setPassErr("Minimum eight characters, at least one letter and one number");
    }else {
      setPassErr("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (emailErr || nameErr || passErr) {
      validateEmail()
      validatePassword()
      validateName()
    } else {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios
        .post(
          "/signup",
          {
            name,
            email,
            password,
          },
          config
        )
        .then(async (data) => {
          setSuccess(data.data)
          setTimeout(() => {
            setSuccess('')
          }, 5000)
        })
        .catch((err) => {
          setError(err.response.data.message);
          setTimeout(() => {
            setError(false)
          }, 2000)
        });
    }
  }

  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login1001">
            {error ? (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            ) : (
              ""
            )}
            {success ? (
              <div class="alert alert-success" role="alert">
                {success + ", You can login now"}
              </div>
            ) : (
              ""
            )}
            <form onSubmit={submitHandler} className="login100-form validate-form">
              <span className="login100-form-title p-b-20">
                <i className="zmdi zmdi-font">SignUp</i>
              </span>
              <span className="login100-form-title p-b-26">
                Welcome
              </span>
              <label>User Name</label> <span className="ms-2 text-danger">{nameErr}</span>
              <div className="wrap-input100 validate-input" >
                <input ref={inputRef} className="input100" value={name} onChange={(e) => {
                  setName(e.target.value)
                }} onKeyUp={() => {
                  validateName()
                }} type="text" name="name" />
                <span className="focus-input100" ></span>
              </div>
              <label>Email</label> <span className="text-danger ms-2">{emailErr}</span>
              <div className="wrap-input100 validate-input" >
                <input className="input100" value={email} onChange={(e) => {
                  setEmail(e.target.value)
                }}
                  onKeyUp={() => {
                    validateEmail()
                  }}
                  type="text" name="email" />
                <span className="focus-input100" ></span>
              </div>
              <div className="wrap-input1001 validate-input" data-validate="Enter password">
              <span  onClick={()=>{
                  passHide === "password"? setShowPass("text") : setShowPass('password')
                }} className="btn-show-pass">
                  {passHide === "password"? "Show" :"Hide" }
                </span>
                <label>Password</label>
                <span onClick={() => {
                  passHide === "password" ? setShowPass("text") : setShowPass('password')
                }} className="btn-show-pass">

                </span>
                <input className="input100" value={password} onChange={(e) => {
                  setPassword(e.target.value)
                }} onKeyUp={() => {
                  validatePassword()
                }} type={passHide} name="pass" />
                <span className="focus-input100" ></span>
              </div> <span className="text-danger showError">{passErr}</span>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn">
                    Login
                  </button>
                </div>
              </div>

              <div className="text-center p-t-20">
                <span className="txt1">
                  Already have an account?
                </span>

                <Link className="txt2 ms-1" to={"/login"} >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login