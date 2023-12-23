import React from "react";
import "./NotfoundPage.css";
import notfound_img from "../../asserts/images/notfound_img.png";
import { AiOutlineSearch } from "react-icons/ai";
const NotFoundPage = () => {
  return (
    <div className="notfound">
      <img src={notfound_img} alt="" />
      <h4>
        Sorry, we couldn’t find any results for
        <br /> this search
      </h4>
      <p>Maybe give one of these a try?</p>
      <form className="notfound_search">
        <input type="text" placeholder="Type your key words" />
        <button type="button">
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
};

export default NotFoundPage;
