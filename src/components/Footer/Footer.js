import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import LogoFooter from "../../Assets/Group 13047 xfn.svg"


export default function Footer() {
  return (
    <div className="hr_div">
      <hr className="hr_footer" />
      <div className="Footer">
        <div className="Footer_div">
          <div className="Footer_1">
            <Link className="LogoFooter" to={"/"}>
              <img src={LogoFooter}/>
            </Link>
            <p className="footer_heading_paragraph">
            Elevate your collection with the highest quality NFTs at ChronicleVerse.
            </p>
          </div>
          <div className="Footer_2">
            <h5>pages</h5>
            <div className="details-card-description-color">
              <Link to={"/"} className="footer_list_paragraph">Home</Link>
              <Link to={"/searchallcard"} className="footer_list_paragraph">
                Market place
              </Link>
              <Link to={"/about_us"} className="footer_list_paragraph">
                About Us
              </Link>
            </div>
          </div>
          <div className="Footer_3">
            <h5>Info</h5>
            <div className="details-card-description-color">
              <Link to={"/contact"} className="footer_list_paragraph">Contact Us</Link>
              <Link to={"/help_support"} className="footer_list_paragraph">
                Support
              </Link>
            </div>
          </div>
          <div className="Footer_1_responsive">
          <Link className="LogoFooter" to={"/"}>
              <img src={LogoFooter}/>
            </Link>
            <p className="footer_heading_paragraph">
            Elevate your collection with the highest quality NFTs at ChronicleVerse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
