import React, { useEffect, useState } from "react";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import Vector from "../../Assets/Vector.png";
import Allcardfunction from "../AllCardCollection/Allcardfunction";
import { SearchCardDetails } from "./SearchCardData";
import { AiOutlineSearch } from "react-icons/ai";
import "./SearchAllCard.css";
import SearchCard from "./SearchCard";
import Group_187 from "../../Assets/Group 187.png";
import axios from "axios";
import { API_URL } from "../../constants/userConstants";

export default function SearchAllCard() {
  const [filterPopup, setFilterPopup] = useState(false);
  const [headingContent, setHeadingContent] = useState("All");
  const [headingContent2, setHeadingContent2] = useState("All");
  const [headingContent3, setHeadingContent3] = useState("All");
  const [headingContent4, setHeadingContent4] = useState("All");
  const [filterTrue, setFilterTrue] = useState(false);

  const [filter1, setFilter1] = useState(false);
  const [filter2, setFilter2] = useState(false);
  const [filter3, setFilter3] = useState(false);
  const [filter4, setFilter4] = useState(false);

  const [dropdownHeadingContent1, setDropdownHeadingContent1] = useState("All");
  const [dropdownHeadingContent2, setDropdownHeadingContent2] = useState("All");
  const [dropdownHeadingContent3, setDropdownHeadingContent3] = useState("All");
  const [dropdownHeadingContent4, setDropdownHeadingContent4] = useState("All");

  const [selectDropdown, setSelectDropdown] = useState(false);
  const [selectDropdown2, setSelectDropdown2] = useState(false);
  const [selectDropdown3, setSelectDropdown3] = useState(false);
  const [selectDropdown4, setSelectDropdown4] = useState(false);
  const [selectTrue, setSelectTrue] = useState(false);
  const [selectTrue2, setSelectTrue2] = useState(false);
  const [selectTrue3, setSelectTrue3] = useState(false);
  const [selectTrue4, setSelectTrue4] = useState(false);
  const [searchInput, setSearchInput] = useState("")
  const [nftdata, setNftData] = useState([])
  // selectDropdown-1

  const handleSelectDropdown = () => {
    setSelectDropdown(!selectDropdown);
    setSelectTrue(!selectTrue);
    setSelectDropdown2(false);
    setSelectDropdown3(false);
    setSelectDropdown4(false);
  };

  const handleselect_input = (newContent) => {
    setDropdownHeadingContent1(newContent);
    setSelectDropdown(false);
  };

  // selectDropdown-2

  const handleSelectDropdown2 = () => {
    setSelectDropdown2(!selectDropdown2);
    setSelectTrue2(!selectTrue2);
    setSelectDropdown(false);
    setSelectDropdown3(false);
    setSelectDropdown4(false);
  };

  const handleselect_input2 = (newContent) => {
    setDropdownHeadingContent2(newContent);
    setSelectDropdown2(false);
  };

  // selectDropdown-3

  const handleSelectDropdown3 = () => {
    setSelectDropdown3(!selectDropdown3);
    setSelectTrue3(!selectTrue3);
    setSelectDropdown2(false);
    setSelectDropdown(false);
    setSelectDropdown4(false);
  };

  const handleselect_input3 = (newContent) => {
    setDropdownHeadingContent3(newContent);
    setSelectDropdown3(false);
  };

  // selectDropdown-4

  const handleSelectDropdown4 = () => {
    setSelectDropdown4(!selectDropdown4);
    setSelectTrue4(!selectTrue4);
    setSelectDropdown2(false);
    setSelectDropdown3(false);
    setSelectDropdown(false);
  };

  const handleselect_input4 = (newContent) => {
    setDropdownHeadingContent4(newContent);
    setSelectDropdown4(false);
  };

  const filter1div = () => {
    setFilter1(!filter1);
    setFilter2(false);
    setFilter3(false);
    setFilter4(false);
    setHeadingContent("All");
  };

  const handleDropdownItemClick = (newContent) => {
    setHeadingContent(newContent);
    setFilter1(false); // Close the dropdown when an item is clicked
  };

  const filter2div = () => {
    setFilter1(false);
    setFilter2(!filter2);
    setFilter3(false);
    setFilter4(false);
    setHeadingContent2("All");
  };

  const handleDropdownItemClick2 = (newContent) => {
    setHeadingContent2(newContent);
    setFilter2(false); // Close the dropdown when an item is clicked
  };

  const filter3div = () => {
    setFilter1(false);
    setFilter2(false);
    setFilter3(!filter3);
    setFilter4(false);
    setHeadingContent3("All");
  };

  const handleDropdownItemClick3 = (newContent) => {
    setHeadingContent3(newContent);
    setFilter3(false);
    // Close the dropdown when an item is clicked
  };

  const filter4div = () => {
    setFilter1(false);
    setFilter2(false);
    setFilter3(false);
    setFilter4(!filter4);
    setHeadingContent4("All");
  };

  const handleDropdownItemClick4 = (newContent) => {
    setHeadingContent4(newContent);
    setFilter4(false); // Close the dropdown when an item is clicked
  };

  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setFilterTrue(false); // Close the dropdown when a filter is clicked
  };

  const getAllNftData = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/nft-all-data?keyword=${searchInput}`,
        {
          withCredentials: true,
        }
      );
      console.log("data", data.data);
      setNftData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNftData()
  }, [searchInput])

  return (
    <div style={{ overflow: "hidden" }} className="SearchAllcard">
      <div className="Allcard">
        <div className="SearchAllcard_Input_div">
          <div className="SearchAllcard_div_grident">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Type your key words"
              className="SearchAllcard_Input"
            />
            <button className="SearchAllcard_Input_button">
              <AiOutlineSearch />

            </button>
          </div>
        </div>
        {/* <div className="Search_Allcard_header_div">
          <div className="Search_Allcard_header">
            <div className="Search_heading_allcards">
              <h4>
                Your<span>NFTs</span>
              </h4>
            </div>
            <button className="Search_vectorImg">
              <img src={Vector} onClick={() => setFilterPopup(!filterPopup)} />
              {filterPopup && (
                <div className="search_filter_popup">
                  <div className="search_filter_popup_div">
                    <div className="Menu_arrowbar_filter">
                      <img src={Group_187} />
                    </div>
                    <div className="filter_content_div">
                      <div className="filter_pop_name">Price</div>
                      <div className="filter_pop_button">
                        <div onClick={filter1div}>{headingContent}</div>
                        <div>
                          <RiArrowDropDownLine
                            className="filter_popup_dropdown"
                            onClick={filter1div}
                          />
                        </div>
                      </div>
                      <div
                        style={{ display: filter1 ? "flex" : "none" }}
                        className="filter_dropdown_content"
                      >
                        <div
                          className="filter_dropdown_content_list"
                          onClick={() => handleDropdownItemClick("Highest")}
                        >
                          Highest
                        </div>
                        <div
                          className="filter_dropdown_content_list"
                          onClick={() => handleDropdownItemClick("Lowest")}
                        >
                          Lowest
                        </div>
                      </div>
                      <div className="filter_bottom_div"></div>
                    </div>
                    <div className="filter_content_div">
                      <div className="filter_pop_name">Likes</div>
                      <div className="filter_pop_button">
                        <div onClick={filter2div}>{headingContent2}</div>
                        <div>
                          <RiArrowDropDownLine
                            className="filter_popup_dropdown"
                            onClick={filter2div}
                          />
                        </div>
                      </div>
                      <div
                        style={{ display: filter2 ? "flex" : "none" }}
                        className="filter_dropdown_content"
                      >
                        <div
                          className="filter_dropdown_content_list"
                          onClick={() => handleDropdownItemClick2("Mostly")}
                        >
                          Mostly
                        </div>
                        <div
                          className="filter_dropdown_content_list"
                          onClick={() => handleDropdownItemClick2("Lowest")}
                        >
                          Lowest
                        </div>
                      </div>
                      <div className="filter_bottom_div"></div>
                    </div>
                    <div className="filter_content_div">
                      <div className="filter_pop_name">Creator</div>
                      <div className="filter_pop_button">
                        <div onClick={filter3div}>{headingContent3}</div>
                        <div>
                          <RiArrowDropDownLine
                            className="filter_popup_dropdown"
                            onClick={filter3div}
                          />
                        </div>
                      </div>
                      <div
                        style={{ display: filter3 ? "flex" : "none" }}
                        className="filter_dropdown_content"
                      >
                        <div
                          className="filter_dropdown_content_list"
                          onClick={() => handleDropdownItemClick3("Mostly")}
                        >
                          Mostly
                        </div>
                        <div
                          className="filter_dropdown_content_list"
                          onClick={() => handleDropdownItemClick3("Lowest")}
                        >
                          Lowest
                        </div>
                      </div>
                      <div className="filter_bottom_div"></div>
                    </div>
                    <div className="filter_content_div">
                      <div className="filter_pop_name">Timeframe</div>
                      <div className="filter_pop_button">
                        <div onClick={filter4div}>{headingContent4}</div>
                        <div>
                          <RiArrowDropDownLine
                            className="filter_popup_dropdown"
                            onClick={filter4div}
                          />
                        </div>
                      </div>
                      <div
                        style={{ display: filter4 ? "flex" : "none" }}
                        className="filter_dropdown_content"
                      >
                        <div
                          className="filter_dropdown_content_list"
                          onClick={() => handleDropdownItemClick4("Mostly")}
                        >
                          Mostly
                        </div>
                        <div
                          className="filter_dropdown_content_list"
                          onClick={() => handleDropdownItemClick4("Lowest")}
                        >
                          Lowest
                        </div>
                      </div>
                      <div className="filter_bottom_div_4"></div>
                    </div>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div> */}
      </div>
      {/* <div className="activebutton_div">
        <ul className="activebutton">
          <li>
            <button
              className={`selected_button ${
                selectedFilter === "All" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("All")}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={`selected_button ${
                selectedFilter === "Art" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("Art")}
            >
              Art
            </button>
          </li>
          <li>
            <button
              className={`selected_button ${
                selectedFilter === "Game" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("Game")}
            >
              Game
            </button>
          </li>
          <li>
            <button
              className={`selected_button ${
                selectedFilter === "Music" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("Music")}
            >
              Music
            </button>
          </li>
          <li>
            <button
              className={`selected_button ${
                selectedFilter === "Photography" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("Photography")}
            >
              Photography
            </button>
          </li>
          <li>
            <button
              className={`selected_button ${
                selectedFilter === "Video" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("Video")}
            >
              Video
            </button>
          </li>
          <li>
            <button
              className={`selected_button ${
                selectedFilter === "Domains" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("Domains")}
            >
              Domains
            </button>
          </li>
          <div class="AllCarddropdown">
            <RiArrowDropDownLine
              className={
                filterTrue ? "AllCarddropdownicon_down" : "AllCarddropdownicon"
              }
            />
            <button
              onClick={() => setFilterTrue(!filterTrue)}
              className="AllCarddropdownbtn"
            >
              Filter
            </button>
          </div>
        </ul>
      </div> */}
      {/* {filterTrue && (
        <div className="select_div">
          <div className="selectmaindiv">
            <div className="selectinput_header">
              <div className="selectinput_name">Price</div>
              <div className="select_input_icon_div">
                <RiArrowDropDownLine
                  className={
                    selectTrue ? "select_input_icon_up" : "select_input_icon"
                  }
                  onClick={handleSelectDropdown}
                />
                <div className="select_input">{dropdownHeadingContent1}</div>
              </div>
              {selectDropdown && (
                <div className="select_input_option_div">
                  <div
                    className="selectoption"
                    onClick={() => {
                      handleselect_input("All");
                    }}
                  >
                    All
                  </div>
                  <div
                    className="selectoption"
                    onClick={() => {
                      handleselect_input("This Month");
                    }}
                  >
                    This Month
                  </div>
                  <div
                    className="selectoption"
                    onClick={() => {
                      handleselect_input("This Year");
                    }}
                  >
                    This Year
                  </div>
                </div>
              )}
            </div>
            <div className="selectinput_header">
              <div className="selectinput_name">Price</div>
              <div className="select_input_icon_div">
                <RiArrowDropDownLine
                  className={
                    selectTrue2 ? "select_input_icon_up" : "select_input_icon"
                  }
                  onClick={handleSelectDropdown2}
                />
                <div className="select_input">{dropdownHeadingContent2}</div>
              </div>
              {selectDropdown2 && (
                <div className="select_input_option_div">
                  <div
                    className="selectoption"
                    onClick={() => {
                      handleselect_input2("All");
                    }}
                  >
                    All{" "}
                  </div>
                  <div
                    className="selectoption"
                    onClick={() => {
                      handleselect_input2("This Month");
                    }}
                  >
                    This Month
                  </div>
                  <div
                    className="selectoption"
                    onClick={() => {
                      handleselect_input2("This Year");
                    }}
                  >
                    This Year
                  </div>
                </div>
              )}
            </div>{" "}
            <div className="selectinput_header">
              <div className="selectinput_name">Price</div>
              <div className="select_input_icon_div">
                <RiArrowDropDownLine
                  className={
                    selectTrue3 ? "select_input_icon_up" : "select_input_icon"
                  }
                  onClick={handleSelectDropdown3}
                />
                <div className="select_input">{dropdownHeadingContent3}</div>
              </div>
              {selectDropdown3 && (
                <div className="select_input_option_div">
                  <div
                    className="selectoption"
                    onClick={() => {
                      handleselect_input3("All");
                    }}
                  >
                    All{" "}
                  </div>
                  <div
                    className="selectoption"
                    onClick={() => {
                      handleselect_input3("This Month");
                    }}
                  >
                    This Month
                  </div>
                  <div
                    className="selectoption"
                    onClick={() => {
                      handleselect_input3("This Year");
                    }}
                  >
                    This Year
                  </div>
                </div>
              )}
            </div>{" "}
            <div className="selectinput_header">
              <div className="selectinput_name">Price</div>
              <div className="select_input_icon_div">
                <RiArrowDropDownLine
                  className={
                    selectTrue4 ? "select_input_icon_up" : "select_input_icon"
                  }
                  onClick={handleSelectDropdown4}
                />
                <div className="select_input">{dropdownHeadingContent4}</div>
              </div>
              {selectDropdown4 && (
                <div className="select_input_option_div">
                  <div
                    className="selectoption"
                    onClick={() => {
                      handleselect_input4("All");
                    }}
                  >
                    All{" "}
                  </div>
                  <div
                    className="selectoption"
                    onClick={() => {
                      handleselect_input4("This Month");
                    }}
                  >
                    This Month
                  </div>
                  <div
                    className="selectoption"
                    onClick={() => {
                      handleselect_input4("This Year");
                    }}
                  >
                    This Year
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )} */}
      <div className="Search_AllCardMainDiv">
        <div className="Search_AllCard_div">
          {nftdata.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Allcardfunction item={item} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="Search_loading">
        <h5 style={{ textAlign: "center", color: "white" }}>loading 🏐</h5>
      </div>
    </div>
  );
}
