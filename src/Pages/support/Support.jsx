import React, { useState } from "react";
import "./Support.css";
import { BsFillPersonFill } from "react-icons/bs";
import { BiSolidMessage } from "react-icons/bi";
import { FaProductHunt } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import General from "../../components/general/General";
import generalSvg from "../../Assets/property 1.svg";

const Support = () => {
  const [general, setGeneral] = useState(true);
  const [support, setSupport] = useState(false);
  const [hosting, setHosting] = useState(false);
  const [product, setProduct] = useState(false);

  const generaldiv = () => {
    setGeneral(true);
    setSupport(false);
    setHosting(false);
    setProduct(false);
  };
  const hostingdiv = () => {
    setSupport(false);
    setGeneral(false);
    setHosting(true);
    setProduct(false);
  };
  const productdiv = () => {
    setSupport(false);
    setGeneral(false);
    setHosting(false);
    setProduct(true);
  };
  const supportdiv = () => {
    setSupport(true);
    setGeneral(false);
    setHosting(false);
    setProduct(false);
  };

  return (
    <div className="Help_support">
      <div className="support">
        <div className="support_top">
          <p>Learn how to get started</p>
          <h4>Frequently asked questions</h4>
          <div>
            Join stacks community now to get free updates and also alot of
            freebies are waiting for you or CONTACT SUPPORT
          </div>
        </div>
        <div className="support_bottom">
          <div className="helpsupport_div2"></div>
          <div className="support_bottom_left">
            <div className="support_bottom_left_content">
              <div className="icon" onClick={generaldiv}>
                <BsFillPersonFill className={general ? "icon_color" : ""} />
                <p className={general ? "icon_active" : ""}>General</p>
              </div>

            </div>
          </div>
          <div className="support_bottom_right">
            <div
              className="general"
              style={{ display: general ? "flex" : "none" }}
            >
              <General />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
