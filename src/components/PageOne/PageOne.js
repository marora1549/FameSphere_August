import React, { useState } from 'react';
import "./PageOne.css";
// import GradientButton from 'react-linear-gradient-button';

const PageOne = (props) => {
  let email = "";

  const validateEmail = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      props.handleEmailError('Email is required');
    } else if (!emailPattern.test(email)) {
      props.handleEmailError('Invalid email format');
    } else {
      props.handleEmailError('');
      props.handleEmail(email);
      props.onButtonClick("pagetwo");
    }
  };

  const handleInputChange = (e) => {
    email = e.target.value;
  };

  return (
    <main
      className="pt5 black-80 center"
      style={{ maxWidth: "40%", maxHeight: "30%", margin: "auto" }}
    >
      <form className="measure">
        <h2>Welcome to FameSphere!</h2>
        <p style={{ color: "#C0C0C0" }}>Enter the Email-ID connected to your instagram account</p>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3">
            <label
              className="db lh-copy f6 mb1"
              htmlFor="email-id"
              style={{ textAlign: "left" }}
            >
              Email ID
            </label>
            <input
              className="f6 br2 ph3 pv2 mb2 dib black w-100"
              type="text"
              name="email-id"
              id="email-id"
              size="30"
              placeholder="name@email.com"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
              }}
              value={props.userInputEmail}
            onChange={handleInputChange}
            />
            {props.emailError && <p style={{ color: 'red' }}>{props.emailError}</p>}
          </div>
          
        </fieldset>
          <div class="center">
          <div class="btn btn1">
            <div class="inner"></div>
            <button
            className="f6 grow br2 ph3 pv2 mb2 dib white"
            style={{
              borderStyle: "none",
              width: "100%"
            }}
            onClick={validateEmail}
          >
            Create Account
          </button>       
        </div>
        </div>
      </form>
    </main>
  );
};

export default PageOne;
