import React, { useEffect } from "react";
import Group_186 from "../../Assets/monalisa.gif";
import blurImg from "../../Assets/blurImg.png";
import "./MonalisaPage.css";
import { useNavigate } from "react-router-dom";

export default function MonalisaPage() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/searchallcard")
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
              Explore a realm of beauty with our exquisite collection of NFTs.<br />
              Elevate your digital art experience and  <br />
              discover stunning creations here.
              </p>
              <div className="Monalisabutton_div1">
                <button onClick={handleClick} className="monalisa_content_button">Explore</button>
              </div>
            </div>
          </div>
          <div className="MonalisaFullImg">
            <img src={Group_186} className="monalisa-img" />
          </div>
          <div className="Monalisabutton_div2">
            <button onClick={handleClick} className="Monalisa_button">Explore</button>
          
          </div>
        </div>
      </div>
    </>
  );
}
