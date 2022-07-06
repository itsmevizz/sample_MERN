import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";
import "./util.css";

function Login() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState(" ");
  const [err, setErr] = useState("");
  const [PassErr, setPassErr] = useState(" ");
  const [passHide, setShowPass] = useState("password")
  const navigation = useNavigate();
  const auth = Cookies.get("token");
  const inpurRef = useRef();
  useEffect(() => {
    document.title = "Admin-Login"
    if (auth) {
      navigation("/admin/home");
    }
    inpurRef.current.focus();
  }, []);

  const validateId = () => {
    if (name === "" && /^\s*$/.test(name)) {
      setNameErr("Required*");
    } else if (!name.match(/^(?=.*[a-z])[a-z0-9]{0,10}$/)) {
      setNameErr("*");
    } else {
      setNameErr("");
    }
  };

  const validatePass = () => {
    if (name === "" && /^\s*$/.test(password)) {
      setNameErr("Required*");
    } else if (!password.match(/^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/)) {
      setPassErr("*");
    } else {
      setPassErr("");
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (nameErr || PassErr ) {
      console.log(nameErr, PassErr);
      validateId();
      validatePass();
    }else{
      await axios
        .post("/admin/admin_login", {
          name,
          password,
        })
        .then(() => {
          navigation("/admin/home");
        })
        .catch((err) => {
          setError(err.response.data.message);
          setTimeout(() => {
            setError("");
          }, 3000);
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
                <i className="zmdi zmdi-font">Admin Login</i>
              </span>
              <span className="login100-form-title p-b-26"></span>

              <div className="wrap-input100 validate-input">
                <label>User Id</label>{" "}
                <span className="ms-2 text-danger">{nameErr}</span>
                <input
                  ref={inpurRef}
                  className="input100"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onKeyUp={() => {
                    validateId();
                  }}
                  type="text"
                  name="name"
                />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input">
              <span  onClick={()=>{
                  passHide === "password"? setShowPass("text") : setShowPass('password')
                }} className="btn-show-pass">
                  {passHide === "password"? "Show" :"Hide" }
                </span>
                <label>Password </label>
                <span className="text-danger ms-2">{PassErr}</span>
                <input
                  className="input100"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyUp={() => {
                    validatePass();
                  }}
                  type={passHide}
                  name="pass"
                />
                <span className="focus-input100"></span>
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
