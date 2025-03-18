import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./signUp.css";
import LocationPicker from "./LocationApi/LocationPicker";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import SignUp2 from "./SignUp2";

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
  const [success, setSuccess] = useState(false);

  const [value1, setValue1] = useState(null); // For latitude
  const [value2, setValue2] = useState(null); // For longitude

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    console.log(payload); // Log the payload to verify the data

    try {
      const response = await axios.post(REGISTER_URL, payload);
      console.log(response?.data);
      setSuccess(true);
      // Clear state
      setUserFirstName("");
      setUserLastName("");
      setPassword("");
      setCity("");
      setStreet("");
      setHomeNumber("");
      setPhoneNumber("");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg(alert("No Server Response"));
      } else if (err.response?.status === 409) {
        setErrMsg(alert("Username Taken"));
      } else {
        setErrMsg(alert("Registration Failed"));
      }
      errRef.current.focus();
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
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
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
                        className="form-control"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUserFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        ref={userRef}
                        autoComplete="off"
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
                      autoComplete="on"
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
                        value="Male"
                        onChange={(e) => setGender(e.target.value)}
                      />{" "}
                      Male
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
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
                    </div>
                  </div>
                  <div className="mt-3">
                    <label>Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      required
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Street</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Home Number</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => setHomeNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Location Picker */}
                  <div className="map-container mt-3">
                    <LocationPicker
                      setValue1={setValue1}
                      setValue2={setValue2}
                    />
                  </div>

                  {/* Terms of Services Modal */}
                  <div
                    className="modal fade"
                    id="termsModal"
                    tabIndex="-1"
                    aria-labelledby="termsModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="termsModalLabel">
                            Terms of Services
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => console.log("Modal closed")}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p>
                            Supplier Responsibilities Suppliers must: • Provide
                            items as described in the agreement. • Deliver items
                            on time to the agreed location. • Ensure items are
                            of good quality and free from defects. • Communicate
                            any issues or delays as soon as possible. Quality
                            Standards • All products must meet the agreed
                            quality and description. • Damaged or defective
                            items must be refunded. • If items do not meet
                            quality standards, the supplier is responsible for
                            fixing the issue. Delivery Terms • Items must be
                            delivered by [specific date]. • If there are delays,
                            the supplier must inform the organizer immediately.
                            • Late delivery penalties may apply (if agreed).
                            Payment Terms • Payment will be made after the items
                            are received and inspected. • If the items are
                            defective or not as agreed, payment may be delayed
                            or reduced. Return and Refunds • Suppliers must
                            accept returns for defective or incorrect items. •
                            Suppliers must process refunds within [10 Days]. •
                            Suppliers will cover costs for returns if the
                            problem is their fault. Termination • If the
                            supplier does not follow this policy, the agreement
                            may be ended. • Repeated issues like poor quality or
                            delays may lead to removal from future purchases.
                            Adding Products for Approval • When a supplier adds
                            a product, they must wait for approval from
                            customers. • The approval process takes up to 7 days
                            • Only approved products can be listed for purchase.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Policy Modal */}
                  <div
                    className="modal fade"
                    id="privacyModal"
                    tabIndex="-1"
                    aria-labelledby="privacyModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="privacyModalLabel">
                            Privacy Policy
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p>
                            • Return Policy When You Can Return an Item You can
                            return an item if: • It is damaged or broken. • It
                            is not what you ordered. • You request a return
                            within [e.g., 7 days] of receiving the item. Note:
                            The item must be in the same condition you received
                            it and in its original packaging. Items You Cannot
                            Return We cannot accept returns for: • Food or other
                            items that spoil. • Items marked as “final sale” or
                            “no returns.” Refunds You can get a refund if: • The
                            item you return follows our return rules. • We
                            inspect the item and confirm the problem. Refunds
                            will be sent back to your original payment method
                            within [e.g., 20 days]. How to Return an Item 1.
                            Contact us at [email/phone] within [e.g., 7 days] of
                            getting the item. 2. Share proof of the problem
                            (e.g., a photo). Our Role We will: • Help you with
                            the return process. • Work with the supplier to fix
                            any issues.
                          </p>
                        </div>
                      </div>
                    </div>
                    </div>
                  <button
                    type="submit"
                    className="btn btn-success w-100 mt-4"
                    data-bs-toggle="modal"
                    data-bs-target="#termsModal"
                  >
                    SIGN UP →
                  </button>
                </form>
              }
              />
          </Routes>
          {/* <SignUp2 /> */}
        </div>
      )}
    </>
  );
};

export default SignUp;
