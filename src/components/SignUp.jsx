import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./signUp.css";
import LocationPicker from "./LocationApi/LocationPicker";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import axios from "axios";

const SignUp = () => {
  const REGISTER_URL =
    "https://bulkify-back-end.vercel.app/api/v1/customers/register";

  const userRef = useRef();
  const errRef = useRef();

  // Form state variables
  const [firstName, setUserFirstName] = useState("");
  const [lastName, setUserLastName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [homeNumber, setHomeNumber] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errors, setErrors] = useState({}); // New state for field-specific errors
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);




  const [value1, setValue1] = useState(null); // For latitude
  const [value2, setValue2] = useState(null); // For longitude

  // Helper function to check if fields are empty and set error messages
  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required ";
    if (firstName.length < 4) newErrors.firstName = "Minimum Vaild Length is : 4";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    // if (!password.trim()) newErrors.password = "Password is required";
    // Check if the phone number is empty
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    else if (phoneNumber.length !== 11) {
      newErrors.phoneNumber = "Phone number should be 11 characters";
    }
    else if (!/^\d+$/.test(phoneNumber)) {
      // Validate if the phone number contains only numbers
      newErrors.phoneNumber = "Phone number should contain only digits";
    }


    if (!city.trim()) newErrors.city = "City is required";
    if (!street.trim()) newErrors.street = "Street is required";
    if (!homeNumber.trim()) newErrors.homeNumber = "Home number is required";
    if (!gender) newErrors.gender = "Gender is required";
    return newErrors;
  };

  const loc = document.getElementsByClassName("location-details")[0]; // Assuming you want the first element

  if (loc && window.getComputedStyle(loc).display === "none") {
    alert("Please Select Your Location");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const alertElement = document.getElementById("alert");
      if (alertElement) {
        alertElement.scrollIntoView({ behavior: "smooth" });
      }
      return;
    } else {
      setErrors({}); // Clear errors if no validation issues
    }

    const payload = {
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      city,
      street,
      homeNumber,
      coordinates: [value2, value1],
    };

    try {
      const response = await axios.post(REGISTER_URL, payload);
      setSuccess(true);
      // Clear state
      setUserFirstName("");
      setUserLastName("");
      setPassword("");
      setCity("");
      setStreet("");
      setHomeNumber("");
      setPhoneNumber("");
      console.log("Server Response:", response.data); // Log the server response
    } catch (err) {
      if (err.response) {
        const pp = document.getElementById("alert");
        if (pp && err.response.data && err.response.data.err) {
          for (let index = 0; index < err.response.data.err.length; index++) {
            setErrMsg(err.response.data.err[index]);
          }
        }
        if (errRef.current) {
          errRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <div className="signup-container">
          <p
            ref={errRef}
            className={`alert alert-danger ${errMsg ? 'd-block' : 'd-none'} text-center mx-auto`}
            aria-live="assertive"
            id="alert"
            style={{
              backgroundColor: "#ff4d4d", // Error background color (red)
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "90%", // Max width for responsiveness
              width: "400px",  // Default width on larger screens
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", // Add shadow for pop-up effect
            }}
          >
            
            {errMsg}
          </p>

          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route
              path="/"
              element={
                <form onSubmit={handleSubmit}>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>First Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        ref={userRef}
                        value={firstName}
                        onChange={(e) => setUserFirstName(e.target.value)}
                      />

                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="col-md-6">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        ref={userRef}
                        value={lastName}
                        onChange={(e) => setUserLastName(e.target.value)}
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                  </div>
                  <div className="mt-3">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="mt-3 custom-radio">
                    <label>Gender</label>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          onChange={(e) => setGender(e.target.value)}
                        />{" "} Male
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          onChange={(e) => setGender(e.target.value)}
                        />{" "} Female
                      </div>
                    </div>
                    {errors.gender && <div className="text-danger">{errors.gender}</div>}
                  </div>
                  <div className="mt-3">
                    <label>Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"} // Toggle between text and password
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className="input-group-text"
                        onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? "🙈" : "👁"} {/* Icons for visibility toggle */}
                      </span>
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                  </div>
                  <div className="mt-3">
                    <label>Phone</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                  </div>
                  <div className="mt-3">
                    <label>City</label>
                    <input
                      type="text"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Street</label>
                      <input
                        type="text"
                        className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                      {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                    </div>
                    <div className="col-md-6">
                      <label>Home Number</label>
                      <input
                        type="text"
                        className={`form-control ${errors.homeNumber ? 'is-invalid' : ''}`}
                        value={homeNumber}
                        onChange={(e) => setHomeNumber(e.target.value)}
                      />
                      {errors.homeNumber && <div className="invalid-feedback">{errors.homeNumber}</div>}
                    </div>
                  </div>

                  {/* Location Picker */}
                  <div className="map-container mt-3">
                    <LocationPicker
                      setValue1={setValue1}
                      setValue2={setValue2}
                    />
                  </div>



                  <button
                    className="btn btn-success mt-4 d-flex justify-content-center w-100"
                    type="submit"
                  >
                    Register
                  </button>
                </form>
              }
            />
          </Routes>
        </div>
      )}
    </>
  );
};

export default SignUp;
