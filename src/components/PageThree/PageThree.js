import React, {useState} from "react";
import axios from 'axios';
import user from "./user.png";
import users from "./users.png";
import "./PageThree.css";

const PageThree = ({onButtonClick, handleSubscriberCount}) => {
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [channelId, setChannelId]  = useState("");
  const [inputError, setInputError] = useState("");
  
  const getYtResponse = async (e) => {
    e.preventDefault();
    if(channelId){
      let yt_url = `https://www.googleapis.com/youtube/v3/channels?part=id,statistics&forUsername=${channelId}&key=AIzaSyCfZ01tmqBlJb4b1iiZODO_4Vu88emh_Sw`
      const response = await axios.get(yt_url);
      let count = response.data.items[0].statistics.subscriberCount;
      setSubscriberCount(count);
      handleSubscriberCount(count);
    }else{
      setInputError("Youtube Channel ID is required to proceed")
    }
  }

  const handleInputChange = (e) => {
    if(e.target.value){
      setInputError("");
    }
    setChannelId(e.target.value);
  };

  return (
    <main
      className="pt5 black-80 center"
      style={{ maxWidth: "40%", maxHeight: "30%", margin: "auto" }}
    >
      <form className="measure">
        <h2>Let's connect your Youtube Channel(Optional)</h2>
        <p style={{ color: "#C0C0C0" }}>
          We only store basic details like your subscriber count, number of videos, etc.
        </p>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3">
            <label
              className="left db lh-copy f6 mb1"
              htmlFor="workspace-name"
              style={{textAlign: 'left'}}
            >
              Youtube Channel ID
            </label>
            <input
              className="f6 br2 ph3 pv2 mb2 dib black w-100"
              type="text"
              name="channel-id"
              id="channel-id"
              size="30"
              placeholder="ASAPscience"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
              }}
              value={channelId}
              onChange={handleInputChange}
            />
            {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
          </div>
          <div className="mv3">
          {subscriberCount?
            <div className="mt3">
            <label
              className="left db lh-copy f6 mb1"
              htmlFor="workspace-name"
              style={{textAlign: 'left'}}
            >
              YouTube Subscriber Count: {subscriberCount}
            </label>
            <input
              className="f6 grow br2 ph3 pv2 mb2 dib white"
              style={{ borderStyle: "none", width: "100%", backgroundColor: '#F77B26' }}
              type="submit"
              value="Next"
              onClick={() => onButtonClick("pagefour")}
            />
          </div>
          :channelId?
          <input
              className="f6 grow br2 ph3 pv2 mb2 dib white"
              style={{ borderStyle: "none", width: "100%", backgroundColor: '#F77B26' }}
              type="submit"
              value="Get Details"
              onClick={getYtResponse}
            />:
            <input
              className="f6 grow br2 ph3 pv2 mb2 dib white"
              style={{ borderStyle: "none", width: "100%", backgroundColor: '#F77B26' }}
              type="submit"
              value="Skip"
              onClick={() => onButtonClick("pagefour")}
            />}
          
          </div>
        </fieldset>
      </form>
    </main>
  );

}

export default PageThree;