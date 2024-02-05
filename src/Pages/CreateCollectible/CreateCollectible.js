import React, { useEffect } from "react";
import "./createCollectible.css";
import arrow from "../../Assets/arrow-left (1) 1.png";
import image1 from "../../Assets/Group 295.png";
import image2 from "../../Assets/WhatsApp Image 2023-07-27 at 6.37 6.png";
import { Link } from "react-router-dom";
import mobilebackarrow from "../../Assets/mobileBackarrow.png";
import { AiOutlineLeft } from "react-icons/ai";

const CreateCollectible = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="create_collectible">
      <div className="create_collectible_container">
        <div className="create_collectible_top">
          <img src={arrow} className="backarrow" alt="" onClick={goBack} />
          {/* <AiOutlineLeft className="createcollection_mobilebackarrow" onClick={goBack}  /> */}
          <h3>Create collection</h3>
          <p>
            Choose “Single” if you want your collectible to be one of a kind or
            “Multiple” if you want to sell one collectible multiple times
          </p>
        </div>
        <div className="create_collectible_bottom">
          <div className="create_collectible_card">
            <div>
              <div className="create_collectible_left_box">
                <img src={image2} alt="" />
                <div>
                  <Link to={"/createsinglecollection"}>Single Collectible</Link>
                </div>
              </div>
            </div>
          
          </div>
        </div>
        <div className="create_collectible_footer">
          We do not own your private keys and cannot access your funds without
          your confirmation.
        </div>
      </div>
    </div>
  );
};

export default CreateCollectible;
