import React, { useEffect, useState } from 'react'
import Allcardfunction from '../../components/AllCardCollection/Allcardfunction';
import axios from 'axios';
import { API_URL } from '../../constants/userConstants';
import { AiOutlineSearch } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

const HotCollectionPage = () => {
    const [searchInput, setSearchInput] = useState("")
    const [usd, setUsd] = useState("")
    const [nftdata, setNftData] = useState([])
    const params=useParams()
    const getAllNftData = async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}/get-singlecollection-nft/${params.id}?keyword=${searchInput}`,
            {
              withCredentials: true,
            }
          );
          console.log("data", data.data);
          setNftData(data.getallNft);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getAllNftData()
      }, [searchInput])
      const getUsd = async () => {
        try {
          const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd');
          const data = await response.json();
    
          const maticToUSDExchangeRate = data['matic-network'].usd;
          setUsd(maticToUSDExchangeRate)
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        getUsd()
      }, [])
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
              {nftdata?nftdata.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <Allcardfunction item={item} usd={usd}/>
                  </React.Fragment>
                );
              }):""}
            </div>
          </div>
          <div className="Search_loading">
            <h5 style={{ textAlign: "center", color: "white" }}>loading 🏐</h5>
          </div>
        </div>
      );
}

export default HotCollectionPage
