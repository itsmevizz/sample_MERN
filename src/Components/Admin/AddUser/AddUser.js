import React, { createContext, useContext, useState } from "react";
import { OpneContext } from "./Modal";
import { ShowUsersContext } from "../Home/Modal";
import axios from "axios";
function AddUser() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailErr, serEmailErr] = useState("");
  const [passErr, setPassErr] = useState(" ");
  const [nameErr, setNameErr] = useState(" ");
  const [passHide, setShowPass] = useState("password");

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
      setPassErr(
        "Minimum eight characters, at least one letter and one number"
      );
    } else {
      setPassErr("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (emailErr || nameErr || passErr) {
      validateEmail();
      validatePassword();
      validateName();
    } else {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios
        .post(
          "/admin/addUser",
          {
            name,
            email,
            password,
          },
          config
        )
        .then(async (data) => {
          setSuccess("User Added Successfully");
          setEmail('')
          setName('')
          setPassword('')
          setTimeout(() => {
            setSuccess("");
          }, 6000);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setTimeout(() => {
            setError(false);
          }, 5000);
        });
    }
  };

  return (
    <div className="row">
      <div className="col-xl">
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add User</h5>
          </div>
          <div className="card-body">
            {error ? (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            ) : (
              ""
            )}
            {success ? (
              <div class="alert alert-success" role="alert">
                {success}
              </div>
            ) : (
              ""
            )}
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label className="form-label" for="basic-default-fullname">
                   User Id
                </label>
                <span className="text-danger ms-2">{nameErr}</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    validateName();
                  }}
                  className="form-control"
                  id="basic-default-fullname"
                  placeholder=""
                />
              </div>
              <div className="mb-3">
                <label className="form-label" for="basic-default-email">
                  Email
                </label>
                <span className="text-danger ms-2">{emailErr}</span>
                <div className="input-group input-group-merge">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    onKeyUp={() => {
                      validateEmail();
                    }}
                  />
                </div>
                <div className="form-text"> </div>
              </div>
              <div className="mb-3">
                <label>Password</label>
                <span className="text-danger ms-2">{passErr}</span>
                <input
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyUp={() => {
                    validatePassword();
                  }}
                  type={passHide}
                ></input>
                <div>
                  <span
                    onClick={() => {
                      passHide === "password"
                        ? setShowPass("text")
                        : setShowPass("password");
                    }}
                    className="d-flex justify-content-end"
                    style={{ cursor: "pointer" }}
                  >
                    {passHide === "password" ? "Show" : "Hide"}
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
