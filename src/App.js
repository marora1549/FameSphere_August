import Logo from "./components/Logo/Logo";
import PageOne from "./components/PageOne/PageOne";
import PageTwo from "./components/PageTwo/PageTwo";
import PageThree from "./components/PageThree/PageThree";
import PageFour from "./components/PageFour/PageFour";
import PageFive from "./components/PageFive/PageFive";
import "./App.css";
import React, { useState } from "react";
import tachyons from "tachyons";
import MultiStepProgressBar from "./components/MultiStepProgressBar/MultiStepProgressBar";

function App() {
  const [page, setPage] = useState("pageone");
  const [userInputEmail, setUserInputEmail] = useState(null);
  const [name, setName] = useState(null);
  const [followerCount, setFollowerCount] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [city, setCity] = useState(null);
  const [APIResponse, setAPIResponse] = useState('');

  const nextPage = (page) => {
    setPage(page);
  };

  const handleName = (name) => {
    setName(name);
  }

  const handleEmail = (email) => {
    console.log("global user input email set to: ", email);
    setUserInputEmail(email);
  };

  const handleFollowerCount = (count) => {
    console.log("global follower count set to: ", count);
    setFollowerCount(count);
  };

  const handleFollowersCity = (city) => {
    console.log("global follower's city set to: ", city);
    setCity(city);
  };

  const handleSubscriberCount = (count) => {
    setSubscriberCount(count);
  };

  const handleEmailError = (emailError) => {
    setEmailError(emailError);
  }

  const handleAPIResponse = (response) => {
    console.log("global API response set to: ", response);
    setAPIResponse(response);
  }

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        if(userInputEmail){
          setPage("pagetwo");
        }
        break;
      case "3":
        if(userInputEmail && followerCount){
          setPage("pagethree");
        }
        break;
      case "4":
        if(name && followerCount && userInputEmail){
          setPage("pagefour");
        }  
        break;
      case "5":
        if(name && followerCount && userInputEmail){
          setPage("pagefive");
        }
      default:
        setPage("1");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh"  }}>
    <div className="App" style={{ flex: 1 }}>
      <Logo />
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          pageone: <PageOne onButtonClick={nextPage} 
                            userInputEmail={userInputEmail}
                            handleEmail={handleEmail} 
                            emailError={emailError}
                            handleEmailError={handleEmailError}/>,

          pagetwo: <PageTwo onButtonClick={nextPage} 
                            handleFollowerCount={handleFollowerCount} 
                            handleName={handleName} 
                            inputEmail={userInputEmail}
                            handleEmailError={handleEmailError}
                            handleFollowersCity={handleFollowersCity}
                            />,
          pagethree: <PageThree onButtonClick={nextPage} handleSubscriberCount={handleSubscriberCount}/>,
          pagefour: <PageFour onButtonClick={nextPage} 
                              emailId={userInputEmail}  
                              followerCount={followerCount} 
                              subscriberCount={subscriberCount}
                              city={city}
                              handleAPIResponse={handleAPIResponse}/>,
          pagefive: <PageFive name={name}
                              response={APIResponse}/>
        }[page]
      }
      </div>
      <div className="hide-on-small-screen"
          style={{
            width: "30%",
            borderRadius: "20px",
            overflow: "hidden",
            margin:"20px"
          }}
        >
          <img
            src={process.env.PUBLIC_URL + `/graphics/famesphere-${page.substring(4)}.png`}
            alt={`famesphere${page.substring(4)}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
      display: "block",
            }}
          />
        </div>
      </div>
  );
}

export default App;
