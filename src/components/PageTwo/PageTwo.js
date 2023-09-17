import React, { useState } from 'react';
import axios from 'axios';
import "./PageTwo.css";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import Offcanvas from 'react-bootstrap/Offcanvas';
import ShowModal from './PageIDModal';

function PageTwo(props){
  const [followerCount, setFollowerCount] = useState(null);
  const [igUsername, setIgUsername]  = useState("");
  const [inputError, setInputError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pageIdList, setPageIdList] = useState([]);
  const [igId, setIgId] = useState("");
  const [fbAccessToken, setFbAccessToken] = useState("");
  const [audienceCity, setAudienceCity] = useState("");
  const [showStepsBtn, setShowStepsBtn] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const handleClose = () => setShowSteps(false);
  const handleShow = (event) => {event.preventDefault();setShowSteps(true);}

  const handleIgId = (igID) => {getDemography(igID);setIgId(igID);}

  const responseFacebook = (response) => {
    if(!igUsername){
      setInputError("Instagram username is required to proceed");
    }else if(response && response.data && response.data.accessToken){
      let accessToken = response.data.accessToken;
      setFbAccessToken(accessToken);
      props.handleName(response.data.name);

      let fbEmail = response.data.email;
      const convertedEmail = fbEmail.replace(/\\u([\dA-Fa-f]{4})/g, (_, code) => {
        return String.fromCharCode(parseInt(code, 16));
      });
      if(convertedEmail !== props.inputEmail){
        props.onButtonClick("pageone")
        props.handleEmailError("Email ID mentioned doesn't match with the FaceBook Account")
        return;
      }

      if(accessToken){
        fetchInstagramData(accessToken);
      }
    }
  };

  const fetchInstagramData = async (accessToken) => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v16.0/me/accounts?access_token=${accessToken}`
      );
      
      // Extract Page IDs from the response
      const pageDict = response.data.data;
      let igAccountId;
      let tempPageIdList = [];
      let maxFollowers = 0;
      let maxFollowersCity = "";

      if(pageDict.length === 0){
        setInputError("This FaceBook account is not linked to any Page. Follow these steps to link your Instagram with an FB page");
        setShowStepsBtn(true);
        return;
      }else if(pageDict.length === 1){
        const pageId = pageDict[0].id;
        const instagramResponse = await axios.get(
          `https://graph.facebook.com/v16.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}`
        );
        igAccountId = instagramResponse.data.instagram_business_account.id
        handleIgId(igAccountId);
        const igInfoResponse = await axios.get(
          `https://graph.facebook.com/v16.0/${igAccountId}?fields=username,profile_picture_url,followers_count&access_token=${accessToken}`
        );

        const followerCount = igInfoResponse.data.followers_count;
        setFollowerCount(followerCount);
        props.handleFollowerCount(followerCount);

      }else{
        for(const item of pageDict){
          tempPageIdList.push(item.id);
        }
        console.log("page id list: " + tempPageIdList);
        setPageIdList([...tempPageIdList]);
        setShowModal(true);
      }
          
    } catch (error) {
      console.error('Error fetching Instagram data:', error);
    }
  };

  const getDemography = async (igAccountId) => {
    let apiResponse = await axios.get(
      `https://graph.facebook.com/v17.0/${igAccountId}/insights/audience_city/lifetime?access_token=${fbAccessToken}`
    );
    apiResponse = apiResponse.data;
    if (apiResponse.data.length > 0 && apiResponse.data[0].values.length > 0) {
      let maxFollowers = 0;
      let maxFollowersCity = "";
      Object.keys(apiResponse.data[0].values[0].value).forEach(city => {
        if (apiResponse.data[0].values[0].value[city] > maxFollowers) {
          maxFollowers = apiResponse.data[0].values[0].value[city];
          maxFollowersCity = city;
        }
      });
    
      if (maxFollowersCity) {
        const [city, state] = maxFollowersCity.split(', ');
        console.log("Audience City::", city);
        setAudienceCity(city);
        console.log("Audience State::", state);
        props.handleFollowersCity(city);
      } else {
        console.log("No city data available.");
      }
    } else {
      console.log("No data available.");
    }
  }

  const handleInputChange = (e) => {
    if(e.target.value){
      setInputError("");
    }
    setIgUsername(e.target.value);
  };

  return (
    <main
      className="pt5 black-80 center"
      style={{ maxWidth: "40%", maxHeight: "30%", margin: "auto" }}
    >
      
        {showModal===true && pageIdList.length > 0 && <ShowModal pageIdList={pageIdList} fbAccessToken={fbAccessToken} 
        onSelect={(selectedIgId) => handleIgId(selectedIgId)} onHide={() => setShowModal(false)} show={showModal} onShow={() => setShowModal(true)} 
        setFollowerCount={setFollowerCount}
        handleFollowerCount={props.handleFollowerCount}/>}
      
      { showSteps?
        <Offcanvas show={showSteps} onHide={handleClose} className="offcanvas-top-aligned">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Link your IG Creator account</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <iframe
            src="https://www.youtube.com/embed/VkWvYb52ARo"
            title="YouTube Video"
            width="320" // Set your desired width
            height="240" // Set your desired height
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          
            Step1: Go to <b>Facebook.com</b> and login with your account
            <br />
            Step2: Go to <b>Pages</b> in the left pane
            <br />
            Step3: Click on <b>Create New Page</b>
            <br />
            Step4: Enter the required details and click on <b>Create Page</b>
            <br />
            Step5: Click on <b>Settings</b> in the left pane
            <br />
            Step6: Click on <b>Linked Accounts</b>
            <br />
            Step7: Click on <b>Instagram</b> and Connect your Creator/ Business Instagram account by clicking on{" "}
            <b>Connect account</b> and enter you IG credentials
            <br />
            Step8: <b>Process Complete</b>, now proceed to onboarding.famesphere.com to continue your onboarding process.
            <br />
        
        </Offcanvas.Body>
      </Offcanvas>:<div></div>
      }
      <form className="measure">
        <h2>Let's connect your Instagram Account</h2>
        <p style={{ color: "#C0C0C0" }}>
          We only store basic details like your followers count, likes, etc.
        </p>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3">
            <label
              className="left db lh-copy f6 mb1"
              htmlFor="workspace-name"
              style={{textAlign: 'left'}}
            >
              IG Account ID
            </label>
            <input
              className="f6 br2 ph3 pv2 mb2 dib black w-100"
              type="text"
              name="ig-username"
              id="ig-username"
              size="30"
              placeholder="vaibhav_01"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
              }}
              value={igUsername}
          onChange={handleInputChange}
            />
            {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
          </div>
          <div className="mv3">
          {followerCount?
            <div className="mt3">
            <label
              className="left db lh-copy f6 mb1"
              htmlFor="workspace-name"
              style={{textAlign: 'left'}}
            >
              Your current IG Followers Count : {followerCount}
              <br/>
              {audienceCity ? `Your audience is majorly from ${audienceCity}` : ""}
              <br/>     
            </label>
            <div class="center">
              <div class="btn btn1">
                <div class="inner"></div>
                <button
                className="f6 grow br2 ph3 pv2 mb2 dib white"
                style={{
                  borderStyle: "none",
                  width: "100%"
                }}
                onClick={() => props.onButtonClick("pagethree")}
              >
                Next
              </button>       
            </div>
            </div>
          </div>
          :igUsername?
            showStepsBtn?
            <div class="center">
              <div class="btn btn1">
                <div class="inner"></div>
                <button
                className="f6 grow br2 ph3 pv2 mb2 dib white"
                style={{
                  borderStyle: "none",
                  width: "100%"
                }}
                onClick={handleShow}
              >
                Show Steps
              </button>       
            </div>
            </div>
            :
            <LoginSocialFacebook
            appId="1172418496798050"
            onResolve={responseFacebook}
            scope="instagram_basic,pages_show_list,email,
            public_profile,instagram_manage_insights,read_insights,pages_read_engagement"
            onReject={(error) => {
              console.log(error);
            }}
          > 
            <FacebookLoginButton/>
          </LoginSocialFacebook>
          
          :""}
          
          </div>
        </fieldset>
      </form>
    </main>
  );
}

export default PageTwo;