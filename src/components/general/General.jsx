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
            Lorem ipsum dolor sit amet consectetur. Nunc felis sagittis blandit
            urna sit hac eu ultricies ut. In tortor quis ultrices euismod vel
            imperdiet vitae duis lacus. Et aliquam quam massa ultrices quam
            aliquet mauris faucibus nec. Elit posuere augue sit molestie urna
            semper. Maecenas tempus eget aliquam consequat congue rhoncus
            fringilla. Lorem venenatis nec aliquam gravida. Interdum nulla nibh
            id elit adipiscing montes ut sagittis.
          </p>
          <div>
            <button>Learn more</button>
          </div>
        </div>
        <div className="helpsupport_div"></div>
      </div>
      <div className="general1">
        <div className="general_div">
          <p>How this is works</p>
          {show2 ? (
            <img
              src={arrow}
              alt=""
              onClick={buttton2}
              className="active_arrow"
            />
          ) : (
            <img
              src={dropdown_icon_btn}
              alt=""
              onClick={buttton2}
              className="active_arrow2"
            />
          )}
        </div>
        <div
          className="general_hidden_div"
          style={{ display: show2 ? "flex" : "none" }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur. Nunc felis sagittis blandit
            urna sit hac eu ultricies ut. In tortor quis ultrices euismod vel
            imperdiet vitae duis lacus. Et aliquam quam massa ultrices quam
            aliquet mauris faucibus nec. Elit posuere augue sit molestie urna
            semper. Maecenas tempus eget aliquam consequat congue rhoncus
            fringilla. Lorem venenatis nec aliquam gravida. Interdum nulla nibh
            id elit adipiscing montes ut sagittis.
          </p>
          <div>
            <button>Learn more</button>
          </div>
        </div>
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
            Lorem ipsum dolor sit amet consectetur. Nunc felis sagittis blandit
            urna sit hac eu ultricies ut. In tortor quis ultrices euismod vel
            imperdiet vitae duis lacus. Et aliquam quam massa ultrices quam
            aliquet mauris faucibus nec. Elit posuere augue sit molestie urna
            semper. Maecenas tempus eget aliquam consequat congue rhoncus
            fringilla. Lorem venenatis nec aliquam gravida. Interdum nulla nibh
            id elit adipiscing montes ut sagittis.
          </p>
          <div>
            <button>Learn more</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
