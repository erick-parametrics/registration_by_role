import React, { useEffect, useRef, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/*
This is use to validate the username...
Username MUST start with uppercase or lowercase letter then 
the next character can be a letter (either uppercase or lowercase),
numbers from 0-9, hyphen and underscore. Minimum 3 characters and 
maximum 23 characters after the first character.
*/
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

/*
This is use to validate the password...
Must contain at least 1 uppercase letter, 1 lowercase letter,
1 number from 0-9 and 1 special characters. Must be at least 
8 character long and maximum of 24 characters.
This is to ensure a stronger password is created.
*/
const PWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  // Set the focus on the user input when component loads.
  const userRef = useRef();

  // Set the focus on the error so it can be announced by a screen reader for accessibility.
  const errRef = useRef();

  // State for username.
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false); // Set focus on the input field.

  // State for password.
  const [password_, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false); // Set focus on the input field.

  // State for match password.
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false); // Set focus on the input field.

  // State for success and error messages.
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  /*
  Setting the focus when the component loads. This only happens when the component loads
  and will set the focus on that username input. 
  */
  useEffect(() => {
    userRef.current.focus();
  }, []);

  /*
  This useEffect hook is use to validate the username. Therefore, the 'user' must
  be pass as an argument in the dependecy array.
  */
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result); // For debugging purpose.
    console.log(user); // For debugging purpose.
    setValidName(result);
  }, [user]);

  /*
  This useEffect hook is use to validate the password and if the password matched. Therefore, the 'password' and 
  'matchPassword' must be pass as an argument in the dependecy array.
  */
  useEffect(() => {
    const result = PWORD_REGEX.test(password_);
    console.log(result); // For debugging purpose.
    console.log(password_); // For debugging purpose.
    setValidPassword(result);

    const match = password_ === matchPassword;
    setValidMatchPassword(match);
  }, [password_, matchPassword]);

  /*
  This useEffect hook is for error message.
  */
  useEffect(() => {
    setErrorMessage("");
  }, [user, password_, matchPassword]);

  return (
    <section>
      <p
        ref={errRef}
        className={errorMessage ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p>

      <h1>Register</h1>

      <form>
        {/* For Username */}
        <label htmlFor="username">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>

        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        ></input>

        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 caharacters. <br />
          Must begin with a letter. <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        {/* For Password */}
        <label htmlFor="password">
          Password:
          <span className={validPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPassword || !password_ ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>

        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={validPassword ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        ></input>

        <p
          id="pwdnote"
          className={
            passwordFocus && !validPassword ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 caharacters. <br />
          Must include uppercase and lowercase letter, a number and a special
          character.
          <br />
          Allowed special characters:
          <span aria-label="exclamation mark"> !</span>
          <span aria-label="at symbol"> @</span>
          <span aria-label="hashtag"> #</span>
          <span aria-label="dollar sign"> $</span>
          <span aria-label="percent"> %</span>
        </p>

        {/* For Confirm Password */}
        {/* Confirm password will also respond if changes is made in the password input field. */}
        <label htmlFor="confirm_password">
          Confirm Password:
          <span
            className={validMatchPassword && matchPassword ? "valid" : "hide"}
          >
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span
            className={
              validMatchPassword || !matchPassword ? "hide" : "invalid"
            }
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>

        <input
          type="password"
          id="confirm_password"
          onChange={(e) => setMatchPassword(e.target.value)}
          required
          aria-invalid={validMatchPassword ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        ></input>

        <p
          id="confirmnote"
          className={
            matchFocus && !validMatchPassword ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

        {/* Button is disabled (grayed out) until all the fields are validated. */}
        <button
          disabled={
            !validName || !validPassword || !validMatchPassword ? true : false
          }
        >
          Sign Up
        </button>
      </form>

      <p>
        Already registered?
        <br />
        <span className="line">
          {/* Put the router link once this is implemented in the actual application. */}
          <a href="#">Sign In</a>
        </span>
      </p>
    </section>
  );
};

export default Register;
