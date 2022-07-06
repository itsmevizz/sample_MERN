import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import "./util.css";

function Login() {
  const navigate = useNavigate()
  const inputRef = useRef();
  const userData = localStorage.getItem('usedData')
  useEffect(() => {
    inputRef.current.focus();
    document.title = "Login"
    if (userData) {
      navigate('/')
    } else {
    }
  }, [userData]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailErr, serEmailErr] = useState("");
  const [passErr, setPassErr] = useState(" ");
  const [passHide, setShowPass] = useState("password")
  


  const validEmail = () => {
    if (email === "" || /^\s*$/.test(email)) {
      serEmailErr("*");
    } else if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
      serEmailErr("Email Invalid");
    } else {
      serEmailErr("");
    }
  };
  const validPassword = () => {
    if (password === " " || /^\s*$/.test(password)) {
      setPassErr("*");
    } else if (password.length < 3) {
      setPassErr("Password atleast 3");
    }else {
      setPassErr("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (emailErr || passErr) {
      validEmail()
      validPassword()
    } else {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios
        .post(
          "/login",
          {
            email,
            password,
          },
          config
        )
        .then(async (data) => {
          localStorage.setItem("usedData", JSON.stringify(data.data));
          navigate('/')
        })
        .catch((err) => {
          setError(err.response.data.message);
          setTimeout(()=>{
            setError(false)
          },3000)
        });
    }
  };

  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
          {error ? (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            ""
          )}
            <form
              onSubmit={submitHandler}
              className="login100-form validate-form"
            >
              <span className="login100-form-title p-b-48">
                <i className="zmdi zmdi-font">Login</i>
              </span>
              <span className="login100-form-title p-b-26">Welcome</span>

              <div className="wrap-input100 validate-input">
                <label> Email</label>
                <span className="ms-1"> {emailErr ? ":" : ""}</span>
                <span className="text-danger ms-2">{emailErr}</span>
                <input
                  ref={inputRef}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onKeyUp={() => {
                    validEmail()
                  }}
                  className="input100"
                  type="text"
                  name="email"
                />
                <span className="focus-input100"></span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <span  onClick={()=>{
                  passHide === "password"? setShowPass("text") : setShowPass('password')
                }} className="btn-show-pass">
                  {passHide === "password"? "Show" :"Hide" }
                </span>
                <label> Password</label><span className="text-danger ms-2">{passErr}</span>
                <input
                  className="input100"
                  type={passHide}
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyUp={() => {
                    validPassword();
                  }}
                />
                <span className="focus-input100"></span>
                {/* <div className="show">
                <span>Show</span>
              </div> */}
              </div>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn">Login</button>
                </div>
              </div>

              <div className="text-center p-t-115">
                <span className="txt1">Don’t have an account?</span>
                <Link className="txt2 ms-1 atag" to={"/signup"}>
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
