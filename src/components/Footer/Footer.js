import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div className="hr_div">
      <hr className="hr_footer" />
      <div className="Footer">
        <div className="Footer_div">
          <div className="Footer_1">
            <h3>Logo</h3>
            <p className="footer_heading_paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vel,
              perferendis obcaecati dolor delectus.
            </p>
          </div>
          <div className="Footer_2">
            <h5>Stacks</h5>
            <div className="details-card-description-color">
              <Link className="footer_list_paragraph">Download</Link>
              <Link className="footer_list_paragraph">Connect wallet</Link>
              <Link to={"/create_collection"} className="footer_list_paragraph">
                Create collection
              </Link>
            </div>
          </div>
          <div className="Footer_3">
            <h5>Info</h5>
            <div className="details-card-description-color">
              <Link className="footer_list_paragraph">Discover</Link>
              <Link to={"/dashboard"} className="footer_list_paragraph">
                Demos
              </Link>
              <Link to={"/help_support"} className="footer_list_paragraph">
                Support
              </Link>
            </div>
          </div>
          <div className="Footer_1_responsive">
            <h3>Logo</h3>
            <p className="footer_heading_paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vel,
              perferendis obcaecati dolor delectus.
            </p>
          </div>
          <div className="Footer_4">
            <h5>Join news letter</h5>

            <p className="footer_paragraph">
              Subscribe to receive our latest updates
            </p>
            <div className="FooterInput_div">
              <input
                type="text"
                className="Footer_input"
                placeholder="example@gmail.com"
              />
              <button className="FooterSearch_button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
