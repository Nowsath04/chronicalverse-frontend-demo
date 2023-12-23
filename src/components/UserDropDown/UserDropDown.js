import React from "react";
import "./UserDropDown.css";
import Group_187 from "../../Assets/Group 187.png";
import { FiCopy } from "react-icons/fi";
import eth from "../../Assets/eth 1.png";
import image from "../../Assets/image.png";
import LightBulb from "../../Assets/LightBulb.png";
import profile from "../../Assets/profile.png";
import Signout from "../../Assets/Signout.png";
import ToggleButton from "../ToggleButton/ToggleButton";
import ToggleButton2 from "../ToggleButton/ToggleButton2";
// import { Switch } from "antd";

export default function UserDropDown() {
  return (
    <div className="UserDropDown_ManuBar">
      <div className="UserDropDown_ManuBar_div">
        <div className="Menu_arrowbar_userdropdown">
          <img src={Group_187} />
        </div>
        <div className="UserDropDown_Heading">
          <h3>Rabindra de alwiz</h3>
          <p>
            0GFHRYTIU77XJXZ...TEY647UHFG <FiCopy className="Copy_Icon" />
          </p>
        </div>
        <div className="UserDropDown_Box_div">
          <div className="UserDropDown_Box">
            <div className="UserDropDown_Box_Content_div">
              <img src={eth} />
              <div className="UserDropDown_Box_Content">
                <p>Balance</p>
                <h3>7.00879 ETH</h3>
              </div>
            </div>
            <div className="UserDropDown_Box_button">
              <button>Manage Metamask</button>
            </div>
          </div>
        </div>
        <div className="UserDropDown_list_div">
          <div className="UserDropDown_list">
            <ul>
              <li>
                <img src={profile} />
                My profile
              </li>
              <hr />
              <li>
                <img src={image} />
                My items
              </li>
              <hr />
              <li>
                <img src={LightBulb} />
                Dark theme
                {/* <Switch className="Switch_btn"/> */}
                <label className="toggle_btn_dropdown">
                  <input type="checkbox" />
                  <span className="toggle_btn_dropdown_slider"></span>
                </label>
              </li>
              <hr />
              <li>
                <img src={Signout} />
                Disconnect
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
