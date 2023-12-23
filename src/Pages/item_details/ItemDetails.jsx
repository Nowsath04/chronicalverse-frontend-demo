import React, { useEffect, useState } from "react";
import "./itemDetails.css";
import profile from "../../asserts/images/profile.png";
import card_img from "../../asserts/images/WhatsApp Image 2023-07-27 at 6.37 6.png";
import {
  AiOutlineShareAlt,
  AiOutlineClose,
  AiTwotoneHeart,
} from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import price from "../../asserts/images/doller.png";
import transfer from "../../asserts/images/transfer.png";
import close1 from "../../asserts/images/close.png";
import close2 from "../../asserts/images/close2.png";
import report from "../../asserts/images/report.png";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import popup_img from "../../asserts/images/popup_arrow.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { AcceptBid, BuyDirectSalePopup, PlaceBid, Transfertoken, Transfertoken2, Transfertoken3 } from "../../components/Upload/UploadNotification";
import { API_URL } from "../../constants/userConstants";
import { toast } from "react-toastify";

const ItemDetails = () => {
  const { id } = useParams();
  const [purchaseNow, setPurchaseNow] = useState(false)
  const [purchasePopup, setPurchasePopup] = useState(false)
  const [bidDetails, setBidDetails] = useState([])
  const [acceptBidModel, setAcceptBidModel] = useState(false)
  const [owner, setOwner] = useState(false)
  const [burnToken, setBurnToken] = useState(false)
  const { token } = useParams();
  const [saleOver, setSaleOver] = useState(false)
  const { collectionId } = useParams();
  const [popup, setPopup] = useState(false);
  const [nftData, setNftData] = useState();
  const [activeLink, setActiveLink] = useState("info");
  const [bidPopup, setBidPopup] = useState(false)
  const [liked, setLiked] = useState(false)
  const [removeSale, setRemoveSale] = useState(false)
  const [signOrderData, setSignOrderData] = useState([])
  const [auctionDetails, setAuctionDetails] = useState([])
  const { user } = useSelector((selector) => selector.auth);
  const [transferToken, setTransferToken] = useState(false)
  const currentTime = Math.floor(Date.now() / 1000);
  const getAllNftData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/getnft/${id}/${token}/${collectionId}`,
        {
          withCredentials: true,
        }
      );

      setNftData(data.data)

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllNftData()
    // getBidDetails()
  }, [])

  useEffect(() => {
    if (nftData?.type === "putonsale") {
      getAuctonData()
    }
    if (nftData?.type === "instantSale") {
      setPurchaseNow(true)
      getSignature()
    }

  }, [nftData, user])


  const placeBidHandler = () => {
    if (!user) {
      return toast.error("please connect wallet")
    }
    setBidPopup(true)
  }
  // if the nft is instant sale the we need the signature to buy th nft so
  const getSignature = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/sign-order/${nftData.nfttoken}/${nftData.collection_id}`)
      if (user.userid === nftData.nft_owner) {
        setOwner(true)
      }
      setSignOrderData(data)
    } catch (error) {
      console.log(error);
    }
  }
  const directSaleHandler = () => {
    setPurchasePopup(true)
  }

  // // get auction data
  const getAuctonData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/get-particular-action/${nftData.nfttoken}/${nftData.collection_id}`)
      setAuctionDetails(data.draft)
      getBidDetails(data.draft.auctionId)
      if (currentTime >= data.draft.endTime) {
        setSaleOver(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getBidDetails = async (auctionId) => {
    try {
      const { data } = await axios.get(`${API_URL}/bid/${auctionId}/${nftData.collection_id}/${nftData.nfttoken}/`)
      console.log(data[0]);
      setBidDetails(data[0])
      if (user.userid === nftData.nft_owner) {
        setOwner(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const finalAuction = () => {
    setAcceptBidModel(true)
  }

  const handleTransferToken = () => {
    setTransferToken(true)
  }
  const burnHandleClick = () => {
    setBurnToken(true)
  }

  const handleRemoveSale = () => {
    setRemoveSale(true)

  }
  // like function

  const handleLike = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/likeNft/${user._id}/${nftData._id}`)
      if (data.message == "successfully added") {

        setLiked(true)
        toast.success("favorites added")
      }
      if (data.message == "successfully removed") {
        setLiked(false)
        toast.success("favorites removed")

      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    userFavoritesNft()
  }, [user, nftData])

  const userFavoritesNft = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/likeNft/${user._id}`)
      const nftdata = data.likedNft
      nftdata.map((data) => {
        if (data._id == nftData._id) {
          setLiked(true)
        }
      })
    } catch (error) {

    }
  }
  return (
    removeSale ? <Transfertoken2 setRemoveSale={setRemoveSale} bidDetails={bidDetails} user={user} nftData={nftData} /> : burnToken ? <Transfertoken3 setBurnToken={setBurnToken} nftData={nftData} user={user} /> :
      transferToken ? <Transfertoken setTransferToken={setTransferToken} nftData={nftData} user={user} /> : acceptBidModel ? <AcceptBid setAcceptBidModel={setAcceptBidModel} nftData={nftData} bidDetails={bidDetails} user={user} /> : purchasePopup ? <BuyDirectSalePopup nftData={nftData} setPurchasePopup={setPurchasePopup} signOrderData={signOrderData} user={user} /> : bidPopup ? <PlaceBid setBidPopup={setBidPopup} auctionDetails={auctionDetails} user={user} /> : <div className="itemdetails_div">
        <div className="itemdetails">
          <div className="itemdetails_container">
            <div className="itemdetails_top">
              <div className="itemdetails_top_left">
                <p className="itemdetails_heading">{nftData ? nftData.nft_name : ""}</p>
                <p className="itemdetails_des_heading">Description</p>
                <p className="itemdetails_des">
                  {nftData ? nftData.nft_description : ""}
                </p>
                {nftData?.nftOnsale === false ? "" : <div className="itemdetails_card">
                  {bidDetails?.lastBidUser ? <img src={bidDetails.lastBidUser.imgpath} alt="" /> : ""}
                  <div className="itemdetails_card_left">
                    {
                      bidDetails?.lastBidUser ? <div className="itemdetails_card_left_name">
                        HIGHEST BID BY {bidDetails.lastBidUser.name}
                      </div> : purchaseNow ? <div className="itemdetails_card_left_name">NFT price is</div>: <div className="itemdetails_card_left_name">
                        Pls Bid Above
                      </div>
                    }

                    <div className="itemdetails_card_left_price">
                      {
                        purchaseNow ? <div className="color">{nftData ? nftData?.amount : ""} Matic</div> :
                          <div className="color">{bidDetails ? bidDetails.bidprice : ""} Matic</div>
                      }

                      {/* <div className="color">$2,764.89</div> */}
                    </div>
                    <div className="itemdetails_card_left_btn">
                      {(owner && saleOver && nftData?.nftOnsale === false) ? "" : (owner && saleOver && !bidDetails?.lastBidUser) ? <div>
                        <button onClick={handleRemoveSale}>cancel  Auction</button>
                      </div> : (owner && saleOver) ?
                        <div>
                          <button onClick={finalAuction}>Finalize Auction</button>
                        </div>
                        : owner ? <div>
                          <button>You are the Owner</button>
                        </div> : saleOver ? <div>
                          <button >Auction Is Over</button>
                        </div> : purchaseNow ? <div>
                          <button onClick={directSaleHandler}>Purchase Now</button>
                        </div> : <div>
                          <button onClick={placeBidHandler}>Place bid</button>
                        </div>
                      }

                    </div>
                    <div className="itemdetails_card_left_fee">
                      <p>Service Fee</p>
                      <p className="color">1.5%</p>
                      <p>2.563 ETH</p>
                      <p>$ 4,540.50</p>
                    </div>
                  </div>


                </div>
                }
              </div>
              <div className="itemdetails_top_right">
                <img src={nftData ? nftData.image : ""} alt="" />
                <div className="social_icon">
                  <div>
                    <div className="more">
                      <AiOutlineClose className="icon" />
                    </div>
                  </div>
                  <div>
                    <div className="more" onClick={handleLike}>
                      <AiTwotoneHeart className={liked ? "icon liked_icon" : "icon"} />
                    </div>
                  </div>
                  <div>
                    <div className="more">
                      <AiOutlineShareAlt className="icon" />
                    </div>
                  </div>
                  <div onClick={() => setPopup(!popup)}>
                    <div className="more">
                      <BiDotsHorizontalRounded className="icon last" />
                    </div>
                  </div>
                </div>

                <div
                  className="item_detail_popup"
                  style={{ display: popup ? "flex" : "none" }}
                >
                  <img src={popup_img} alt="" className="arrow"></img>
                  {
                    ((owner && bidDetails?.lastBidUser && !saleOver) || (saleOver && nftData?.nftOnsale && owner)) ? <div>Bid Is onGoing</div> :
                      <>
                        {/* {
                          owner ? <div>
                            <img src={price} alt="" />
                            <p>Change price</p>
                          </div> : ""
                        } */}
                        {
                          owner ? <div >
                            <img src={transfer} alt="" />
                            <p onClick={handleTransferToken}>Transfer token</p>
                          </div> : ""
                        }
                        {
                          purchaseNow ? "" : (owner && saleOver && !bidDetails?.lastBidUser && nftData.nftOnsale) ? <div>
                            <img src={close1} alt="" />
                            <p onClick={handleRemoveSale}>Remove from sale</p>
                          </div> : ""
                        }
                        {
                          // owner ? <div onClick={burnHandleClick}>
                          //   <img src={close2} alt="" />
                          //   <p>Burn token</p>
                          // </div> : ""
                        }</>
                  }
                  {
                    owner ? "" : <div>
                      <img src={report} alt="" />
                      <p>Report</p>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="itemdetails_link_container">
            <div className="itemdetails_link">
              {/* {navlink.map((data, index) => {
       return (
         <NavLink
           to={`/item-1/${id}/${token}/${collectionId}/${data.to}`}
           className={({ isActive }) =>
             isActive ? "itemdetails_active" : ""
           }
         >
           {data.name}
         </NavLink>
       );
     })} */}
              <NavLink
                to={`/item-1/${id}/${token}/${collectionId}/info`}
                id="1"
                className={activeLink == "info" ? "itemdetails_active" : ""}
                onClick={() => setActiveLink("info")}            >
                Info
              </NavLink>

              <NavLink
                to={`/item-1/${id}/${token}/${collectionId}/owners`}
                id="2"
                className={activeLink == "owners" ? "itemdetails_active" : ""}
                onClick={() => setActiveLink("owners")}             >
                Owners
              </NavLink>

              <NavLink
                to={`/item-1/${id}/${token}/${collectionId}/history`}
                id="3"
                className={activeLink == "history" ? "itemdetails_active" : ""}
                onClick={() => setActiveLink("history")}        >
                History
              </NavLink>
              <NavLink
                to={`/item-1/${id}/${token}/${collectionId}/bids`}
                id="4"
                className={activeLink == "bids" ? "itemdetails_active" : ""}
                onClick={() => setActiveLink("bids")}               >
                Bids
              </NavLink>
            </div>
          </div>
          <div className="itemdetails_bottom">
            <Outlet />
          </div>
        </div>
      </div>

  );
};

export default ItemDetails;
