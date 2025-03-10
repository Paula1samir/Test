import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'https://bulkify-back-end.vercel.app/api/v1/customers/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setUserFirstName] = useState('');
    const [lastName, setUserLastName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    // const [validPwd, setValidPwd] = useState(false);
    // const [pwdFocus, setPwdFocus] = useState(false);
    
    const [gender,setGender] = useState('Male');
    const [email,setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [homeNumber, setHomeNumber] = useState('');
    const [coordinates, setCoordinates] = useState('');


    // const [matchPwd, setMatchPwd] = useState('');
    // const [validMatch, setValidMatch] = useState(false);
    // const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(firstName));
    }, [firstName])

    // useEffect(() => {
    //     setValidPwd(PWD_REGEX.test(password));
    //     setValidMatch(password === matchPwd);
    // }, [password, matchPwd])

    // useEffect(() => {
    //     setErrMsg('');
    // }, [firstName, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(firstName);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    gender,
                    phoneNumber,
                    nationalId,
                    city,
                    street,
                    homeNumber,
                    coordinates
                }
            
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUserFirstName('');
            setUserLastName('');
            setPassword('');
            // setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

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
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="FirstName">
                            FirstName :
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !firstName ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="FirstName"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUserFirstName(e.target.value)}
                            value={firstName}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && firstName && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <label htmlFor="LastName">
                        LastName :
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !firstName ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="LastName"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUserLastName(e.target.value)}
                            value={firstName}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />

                        <label htmlFor="password">
                            Password:
                            {/* <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} /> */}
                            {/* <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} /> */}
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            // aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            // onFocus={() => setPwdFocus(true)}
                            // onBlur={() => setPwdFocus(false)}
                        />
                        {/* <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p> */}
                            
                            {/* <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            /> */}

                        <label htmlFor="email"> Email :</label>
                        <input type="email"
                         name="email"
                          id="email" 
                          onChange={(e) => setEmail(e.target.value)}
                          >
                        </ input>

                        <label htmlFor="number"> number :</label>
                        <input type="text"
                         name="number"
                          id="number" 
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          >
                        </ input>

                        <label htmlFor="nationalID"> nationalID :</label>
                        <input type="text"
                         name="nationalID"
                          id="nationalID" 
                          onChange={(e) => setNationalId(e.target.value)}
                          >
                        </ input>
                        <label htmlFor="city"> city :</label>
                        <input type="text"
                         name="city"
                          id="city" 
                          onChange={(e) => setCity(e.target.value)}
                          >
                        </ input>
                        <label htmlFor="street"> street :</label>
                        <input type="text"
                         name="street"
                          id="street" 
                          onChange={(e) => setStreet(e.target.value)}
                          >
                        </ input>
                        <label htmlFor="street"> Gender :</label>
                        <input type="text"
                         name="street"
                          id="gender" 
                          onChange={(e) => setGender(e.target.value)}
                          >
                        </ input>
                        <label htmlFor="homeNumber"> homeNumber :</label>
                        <input type="text"
                         name="homeNumber"
                          id="homeNumber" 
                          onChange={(e) => setHomeNumber(e.target.value)}
                          >
                        </ input>
                        <label htmlFor="coordinates"> coordinates :</label>
                        <input type="text"
                         name="coordinates"
                          id="coordinates" 
                          onChange={(e) => setCoordinates(e.target.value)}
                          >
                        </ input>

                        
{/* 
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p> */}
                        <button>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register