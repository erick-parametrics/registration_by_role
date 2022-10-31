import React, { useEffect, useRef, useState } from "react";
import {
  faCheck,
  faTimes,
  FaInfoCircle,
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
const PWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8-24}$/;

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
  const [password, setPassword] = useState("");
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
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  return <div>I am good!</div>;
};

export default Register;
