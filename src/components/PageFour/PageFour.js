import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import PasswordStrengthBar from 'react-password-strength-bar';


const PageFour = ({onButtonClick, emailId, followerCount, subscriberCount, city, handleAPIResponse}) => {
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validatePassword = (e) => {
    e.preventDefault();
    if(!password){
      setInputError("Password is required to proceed");
    }else if(passwordScore > 1){
      famesphereRegister();
    }else{
      setInputError("Password is too weak to proceed");
    }
  }

  const famesphereRegister = async () => {
    setLoading(true);
    const baseUrl = 'https://onboarding.famesphere.tech:3002/'; 
    const response = axios.post(baseUrl + 'signup',
    {
    userid: emailId,
    password: password,
    email: emailId,
    signkey: 'abcxyz',
    }).then(response => {
      console.log("signup response::" + response.data);
      axios.post(baseUrl + 'updateFollowerCount',
        {
          igfollowers: followerCount,
          ytsubscribers: subscriberCount,
          igfollowerscity: city,
        },
        {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        }
      );
      handleAPIResponse("success");
    }).catch( error => {
      if (error.response) {
        console.error('Server Error:', error.response.status);
        handleAPIResponse(error.response.data.message);
      } else if (error.request) {
        handleAPIResponse("Network Error");
        console.error('Network Error:', error.request);
      } else {
        handleAPIResponse("Unknown Error");
        console.error('Error:', error.message);
      }
      console.error(error);
    }).finally(() => {
      setLoading(false);
      onButtonClick("pagefive");
    });
    }
  return (
    <main
      className="pt5 black-80 center"
      style={{ maxWidth: "40%", maxHeight: "30%", margin: "auto" }}
    >
      <form className="measure">
        <h2>Set Password!</h2>
        <p style={{ color: "#C0C0C0" }}>This will be used for accessing your FameSphere account</p>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3">
            <label
              className="db lh-copy f6 mb1"
              htmlFor="email-id"
              style={{ textAlign: "left" }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="f6 br2 ph3 pv2 mb2 dib black w-100"
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                size="30"
                placeholder="Password"
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#EAEEF5",
                  paddingRight: '40px',
                }}
                value={password}
                onChange={handleInputChange}
              />
              <span
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-60%)',
                  cursor: 'pointer',
                }}
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <PasswordStrengthBar password={password}               
            onChangeScore={setPasswordScore}/>
            {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
          </div>
          
        </fieldset>

        <Button onClick={validatePassword}
        style={{
          borderStyle: "none",
          width: "100%",
          backgroundColor: "#F77B26",
        }}>
          {isLoading?
          <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        :
       'Create Account'}
        </Button>
      </form>
    </main>
  );
}

export default PageFour;