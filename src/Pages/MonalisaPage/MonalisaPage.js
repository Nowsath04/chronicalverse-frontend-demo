import React from "react";
import Group_186 from "../../Assets/monalisa.gif";
import blurImg from "../../Assets/blurImg.png";
import "./MonalisaPage.css";

export default function MonalisaPage() {
  return (
    <>
      <div className="MonalisaDiv">
        <div className="Monalisa_container">
          <div className="Monalisa_Content">
            <div className="Monalisa_Content_grident"></div>
            <div className="Monalisa_Contentleft">
              <div className="Monalisa_heading">
                Get more beautiful
                <br />
                <span> NFTs</span> here
              </div>
              <p className="Monalisa_paragraph">
                Lorem ipsum dolor sit amet consectetur. Viverra sagittis <br />
                dignissim amet cursus urna vitae et. Amet aliquet <br />
                volutpat ac at nunc.
              </p>
              <div className="Monalisabutton_div1">
                <button className="monalisa_content_button">Explore</button>
                <button className="monalisa_content_button">Create</button>
              </div>
            </div>
          </div>
          <div className="MonalisaFullImg">
            <img src={Group_186} className="monalisa-img" />
          </div>
          <div className="Monalisabutton_div2">
            <button className="Monalisa_button">Explore</button>
            <button className="Monalisa_button">Create</button>
          </div>
        </div>
      </div>
    </>
  );
}
