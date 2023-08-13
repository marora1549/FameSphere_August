import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import './UserProfile.css'
import "../PageOne/PageOne.css";
import axios from "axios";

function ShowModal(props) {
    const [rowData, setRowData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIgId, setSelectedIgId] = useState(null);
    const [selectionError, setSelctionError] = useState(null);
    
    console.log("props.pageIdList :: ", props.pageIdList);
    const { pageIdList, fbAccessToken } = props;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const promises = pageIdList?.map(async (pageId) => {
            const pageRes = await axios.get(
              `https://graph.facebook.com/v16.0/${pageId}?fields=instagram_business_account&access_token=${fbAccessToken}`
            );
            const igAccountId = pageRes?.data?.instagram_business_account?.id;
            if (igAccountId) {
              const igAccountRes = await axios.get(
                `https://graph.facebook.com/v16.0/${igAccountId}?fields=username,profile_picture_url,followers_count&access_token=${fbAccessToken}`
              );
              return igAccountRes.data;
            }
          });
  
          const results = await Promise.all(promises);
          setRowData(results.filter((data) => data !== undefined));
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [pageIdList, fbAccessToken]);

    const UserDisplay = ({user, isSelected, handleSelectionChange}) => {
        return (
            <div key={user.id} className="profile-item">
          <Row className="align-items-center">
            <Col xs={3} className="profile-photo">
              <img src={user.profile_picture_url} alt={`Profile of ${user.username}`} />
            </Col>
            <Col xs={7} className="profile-info">
              <div className="profile-username">{user.username}</div>
              <div className="profile-followers">{user.followers_count} followers</div>
            </Col>
            <Col xs={2} className="profile-radio">
              <input type="radio" name="selected-profile" 
              value={user.id} 
              checked={isSelected}
              onChange={handleSelectionChange}/>
            </Col>
          </Row>
        </div>
        );
      };

      const handleSelectionChange = (event) => {
        setSelectedIgId(event.target.value);
      };
    
      const handleConfirm = () => {
        if(selectedIgId === null){
            setSelctionError("Please select one Instagram ID to proceed");
            return;
        }
        props.onSelect(selectedIgId);
        const followerCount = rowData.find((data) => data.id === selectedIgId)?.followers_count || 0;
        console.log("follower count set to: ", followerCount);
        props.setFollowerCount(followerCount);
        props.handleFollowerCount(followerCount);
        props.onHide();
      };
      console.log("return  :: rowData", rowData);

    return (
    <div>
        <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
        <Modal.Title>Choose Instagram account you want to register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
            {selectionError && <Row className="align-items-center">
                <p style={{ color: 'red' }}>{selectionError}</p>
                </Row>}
            {isLoading &&
            <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            </div>}
            {rowData.map((user) => (
                    <UserDisplay
                    key={user.id}
                    user={user}
                    isSelected={selectedIgId === user.id}
                    handleSelectionChange={handleSelectionChange}
                    />
                    ))}
            </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
            Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
            Confirm
        </Button>
        </Modal.Footer>
        </Modal>
    </div>
        
      );

}

export default ShowModal;