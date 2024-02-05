import React, { useState } from "react";
import "./General.css";
import arrow from "../../asserts/images/topArrow.png";
import dropdown_icon_btn from "../../Assets/dropdown_icon_btn.png";

const General = () => {
  const [show1, setshow1] = useState(false);
  const buttton1 = () => {
    setshow1(!show1);
    setshow2(false);
    setshow3(false);
  };
  const [show2, setshow2] = useState(false);
  const buttton2 = () => {
    setshow1(false);
    setshow2(!show2);
    setshow3(false);
  };
  const [show3, setshow3] = useState(false);
  const buttton3 = () => {
    setshow1(false);
    setshow2(false);
    setshow3(!show3);
  };
  return (
    <div style={{ width: "100%" }}>
      <div className="general1">
        <div className="general_div">
          <p>How do i connect my wallet to the platform?</p>
          {show1 ? (
            <img
              src={arrow}
              alt=""
              onClick={buttton1}
              className="active_arrow"
            />
          ) : (
            <img
              src={dropdown_icon_btn}
              alt=""
              onClick={buttton1}
              className="active_arrow2"
            />
          )}
        </div>
        <div
          className="general_hidden_div"
          style={{ display: show1 ? "flex" : "none" }}
        >
          <p>
          Select the 'Connect Wallet' option, then link your Metamask wallet to yours. 
          If you're not a Metamask user, you can easily create a wallet within Metamask.
          </p>
        </div>
        <div className="helpsupport_div"></div>
      </div>
      <div className="general3">
        <div className="general_div">
          <p>How do i create my NFT</p>
          {show3 ? (
            <img
              src={arrow}
              alt=""
              onClick={buttton3}
              className="active_arrow"
            />
          ) : (
            <img
              src={dropdown_icon_btn}
              alt=""
              onClick={buttton3}
              className="active_arrow2"
            />
          )}
        </div>
        <div
          className="general_hidden_div"
          style={{ display: show3 ? "flex" : "none" }}
        >
          <p>
          If you can create an NFT, you must be a whitelisted user. If you become a whitelisted user,
           kindly fill out the 'Contact Us' form, and then you can create NFTs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default General;
