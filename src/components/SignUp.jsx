import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css";
import SignUp2 from "./SignUp2";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useRef, useState } from "react";
import axios from "axios";

export default function SignUp() {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const REGISTER_URL = "https://bulkify-back-end.vercel.app/api/v1/customers/register";

  const [showSignUp2, setShowSignUp2] = useState(false);
  // const userRef = useRef();
  const errRef = useRef();

  const [firstName, setUserFirstName] = useState('');
  const [lastName, setUserLastName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(firstName);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, {
        firstName,
        lastName,
        email,
        password,
        gender,
      });
      console.log(response?.data);
      setUserFirstName('');
      setUserLastName('');
      setPassword('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  if (showSignUp2) {
    return <SignUp2 />;
  }

  return (
    <div className="signup-container">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp2" element={<SignUp2 />} />
        <Route
          path="/"
          element={
            <form onSubmit={handleSubmit}>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setUserFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setUserLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-3">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-3">
                <label>Gender</label>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                  />{" "}
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                  />{" "}
                  Female
                </div>
              </div>
              <div className="mt-3">
                <label>Password</label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <label>Confirm Password</label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                    required
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>
              <span
                  className="btn btn-success w-100 mt-4"
                  onClick={() => setShowSignUp2(true)}
                >
                  NEXT
                </span>
              <div className="text-center mt-3">or</div>
              <button type="button" className="btn btn-light w-100 mt-2">
                Sign up as supplier
              </button>
            </form>
          }
        />
      </Routes>
    </div>
  );
}
