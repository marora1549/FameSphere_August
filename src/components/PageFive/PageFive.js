import React, {useEffect} from "react";
import tick from "./green-tick.png";

const PageFive = ({name, response}) => {
  return (
      <div
        className="mw5 bg-white pa2-ns mt5 dib"
        style={{ maxWidth: "30%", maxHeight:'30%' }}
      >
        {(response === 'success' || response == "Username Already Exists")?
        <img
          src={tick}
          className="h3 w3"
          title="success icon"
          alt="tick-icon"
        />:""}
        <div className="center"><h3 className="">{(response === 'success' || response == "Username Already Exists")?"Congratulations": "Sorry"}, {name}!</h3></div>
        <p style={{ color: "#C0C0C0" }}>
          {response === "success" ? "We have onboarded you successfully. Look out for brand deals on your registerd Email-ID from FameSphere!" :
          response === "Username Already Exists" ? "You have already been onboarded. No further action is required." : 
          "There was an error during your onboarding. Please try again later."}
          
        </p>
      </div>
    );
}

export default PageFive;