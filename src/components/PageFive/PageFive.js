import React, {useEffect} from "react";
import tick from "./green-tick.png";

const PageFive = ({name}) => {
  return (
      <div
        className="mw5 bg-white pa2-ns mt5 dib"
        style={{ maxWidth: "30%", maxHeight:'30%' }}
      >
        <img
          src={tick}
          className="h3 w3"
          title="success icon"
          alt="tick-icon"
        />
        <div className="center"><h3 className="">Congratulations, {name}!</h3></div>
        <p style={{ color: "#C0C0C0" }}>
          You have completed the onboarding successfully!
        </p>
      </div>
    );
}

export default PageFive;