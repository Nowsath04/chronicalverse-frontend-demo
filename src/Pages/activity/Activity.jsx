import React, { useState } from "react";
import { activityNav } from "./data";
import "./Activity.css";
import Vector from "../../Assets/Vector.png";
// import user from "../../asserts/images/followers_user.png";
import { NavLink, Outlet } from "react-router-dom";
import Group_187 from "../../Assets/Group 187.png";

const Activity = () => {
  const [activityBox, setActivityBox] = useState(false);

  return (
    <div className="activity_div">
      <div className="activity">
        <div className="activity_left">
          <div className="activity_left_content">
            <h4>Activity</h4>
            <div>
              <img
                src={Vector}
                className="Activity_vecter_img"
                onClick={() => setActivityBox(!activityBox)}
              />
              {activityBox && (
                <div className="activity_notification_ManuBar">
                  <div className="activity_notification_ManuBar_div">
                    <div className="Menu_arrowbar_activity">
                      <img src={Group_187} />
                    </div>
                    <div className="checkbox_div">
                      <div className="activity_right_box_top_responsive">
                        <div className="check_box">
                          <input type="checkbox" />
                          <p>Bids</p>
                        </div>
                        <div className="check_box">
                          <input type="checkbox" />
                          <p>Likes</p>
                        </div>
                        <div className="check_box">
                          <input type="checkbox" />
                          <p>Purchase</p>
                        </div>
                        <div className="check_box">
                          <input type="checkbox" />
                          <p>Listings</p>
                        </div>
                        <div className="check_box">
                          <input type="checkbox" />
                          <p>Transfers</p>
                        </div>
                        <div className="check_box">
                          <input type="checkbox" />
                          <p>Followings</p>
                        </div>
                        <div className="check_box">
                          <input type="checkbox" />
                          <p>Sales</p>
                        </div>
                        <div className="check_box">
                          <input type="checkbox" />
                          <p>Burns</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="activity_nav">
            <div className="borderbottom_activity"></div>
            {activityNav.map((data, index) => {
              return (
                <NavLink
                  to={data.to}
                  className={({ isActive }) =>
                    isActive ? "activity_active" : ""
                  }
                >
                  {data.heading}
                </NavLink>
              );
            })}
          </div>
          <div className="activity_left_bottom">
            <Outlet />
          </div>
        </div>
        <div className="activity_right">
          <form className="activity_right_box">
            <div className="activity_right_box_top">
              <div className="check_box">
                <input type="checkbox" />
                <p>Bids</p>
              </div>
              <div className="check_box">
                <input type="checkbox" />
                <p>Likes</p>
              </div>
              <div className="check_box">
                <input type="checkbox" />
                <p>Purchase</p>
              </div>
              <div className="check_box">
                <input type="checkbox" />
                <p>Listings</p>
              </div>
              <div className="check_box">
                <input type="checkbox" />
                <p>Transfers</p>
              </div>
              <div className="check_box">
                <input type="checkbox" />
                <p>Followings</p>
              </div>
              <div className="check_box">
                <input type="checkbox" />
                <p>Sales</p>
              </div>
              <div className="check_box">
                <input type="checkbox" />
                <p>Burns</p>
              </div>
            </div>
            <div className="activity_right_box_bottom">
              <div>
                <button>Select all</button>
              </div>
              <div>
                <button>Unselect all</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Activity;
