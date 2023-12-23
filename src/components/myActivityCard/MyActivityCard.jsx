import React from "react";
import "./MyActivityCard.css";
import user from "../../asserts/images/followers_user.png";
const MyActivityCard = () => {
  return (
    <div className="myactivitycard">
      <div className="myactivitycard_left">
        <img src={user} alt="" />
        <div className="myactivitycard_left_container">
          <div>
            <h4>Something went wrong</h4>
            <p className="activity_p">
              Can’t display activity card. Try again later
            </p>
            <p className="activity_responsive_p">
              Can’t display activity......
            </p>
          </div>
          <p>2 days</p>
        </div>
      </div>
    </div>
  );
};

export default MyActivityCard;
