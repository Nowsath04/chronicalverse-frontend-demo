import React, { useEffect, useState } from "react";
import "./itemDetails.css";
import profile from "../../asserts/images/profile.png";
import card_img from "../../asserts/images/WhatsApp Image 2023-07-27 at 6.37 6.png";
import {
  AiOutlineShareAlt,
  AiOutlineClose,
} from "react-icons/ai";
import { TiHeart } from "react-icons/ti";
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
import { AcceptBid, BuyDirectSalePopup, PlaceBid, Share, Transfertoken, Transfertoken2, Transfertoken3, Transfertoken4 } from "../../components/Upload/UploadNotification";
import { API_URL } from "../../constants/userConstants";
import { toast } from "react-toastify";
import Bids from "./bids/Bids";
import Info from "./info/Info";
import Owners from "./owners/Owners";
import History from "./history/History";
import loading_img from "../../asserts/images/pending_FILL0_wght400_GRAD0_opsz24 1 1.png"

const ItemDetails = () => {

  const { user } = useSelector((selector) => selector.auth);
  const [info, setInfo] = useState(true)
  const [ownerSection, setOwnerSection] = useState(false)
  const [history, setHistory] = useState(false)
  const [usd, setUsd] = useState("")
  const [bid, setBid] = useState(false)
  const { id } = useParams();
  const [reportNft, setReportNft] = useState(false)
  const [share, setShare] = useState(false)
  const [purchaseNow, setPurchaseNow] = useState(false)
  const [purchasePopup, setPurchasePopup] = useState(false)
  const [bidDetails, setBidDetails] = useState([])
  const [acceptBidModel, setAcceptBidModel] = useState()
  const [owner, setOwner] = useState(false)
  const [ownerAndCreater, setOwnerAndCreated] = useState(false)
  const [burnToken, setBurnToken] = useState(false)
  const { token } = useParams();
  const [saleOver, setSaleOver] = useState(false)
  const { collectionId } = useParams();
  const [popup, setPopup] = useState(false);
  const [nftData, setNftData] = useState();
  const [bidPopup, setBidPopup] = useState(false)
  const [liked, setLiked] = useState(false)
  const [removeSale, setRemoveSale] = useState(false)
  const [signOrderData, setSignOrderData] = useState([])
  const [auctionDetails, setAuctionDetails] = useState([])
  const [transferToken, setTransferToken] = useState(false)
  const currentTime = Math.floor(Date.now() / 1000);
  const getAllNftData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/getnft/${id}/${token}/${collectionId}`,

        {
          withCredentials: true,
        }
      );
      if (user?.userid === data.data?.nft_owner) {
        setOwner(true)
      }
      if (user?.userid === data.data?.nft_owner && user?.userid === data.data?.nftCreator) {
        setOwnerAndCreated(true)
      }
      setNftData(data.data)

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllNftData()
    // getBidDetails()
  }, [user])
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
      if (user?.userid === nftData.nft_owner) {
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
      if (user?.userid === nftData.nft_owner) {
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

  // handleOwnerClick function

  const handleOwnerClick = () => {
    setOwnerSection(true)
    setInfo(false)
    setHistory(false)
    setBid(false)

  }

  //handleInfo function

  const handleInfo = () => {
    setOwnerSection(false)
    setInfo(true)
    setHistory(false)
    setBid(false)

  }
  const handleHistory = () => {
    setOwnerSection(false)
    setHistory(true)
    setInfo(false)
    setBid(false)

  }

  const handleBids = () => {
    setOwnerSection(false)
    setBid(true)
    setHistory(false)
    setInfo(false)
  }

  const getUsd = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd');
      const data = await response.json();

      const maticToUSDExchangeRate = data['matic-network'].usd;
      console.log(maticToUSDExchangeRate);
      setUsd(maticToUSDExchangeRate)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUsd()
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const goBack = () => {
    window.history.back();
  };
  return (


    <div className="itemdetails_div">

      {
        reportNft ? <Transfertoken4 setReportNft={setReportNft} user={user} /> :
          share ? <Share setShare={setShare} nftData={nftData} /> :
            removeSale ? <Transfertoken2 setRemoveSale={setRemoveSale} bidDetails={bidDetails} user={user} nftData={nftData} /> : burnToken ? <Transfertoken3 setBurnToken={setBurnToken} nftData={nftData} user={user} /> :
              transferToken ? <Transfertoken setTransferToken={setTransferToken} nftData={nftData} user={user} /> : acceptBidModel ? <AcceptBid setAcceptBidModel={setAcceptBidModel} nftData={nftData} bidDetails={bidDetails} user={user} /> : purchasePopup ?
                <BuyDirectSalePopup nftData={nftData} setPurchasePopup={setPurchasePopup} signOrderData={signOrderData} user={user} /> : bidPopup ?
                  <PlaceBid setBidPopup={setBidPopup} auctionDetails={auctionDetails} user={user} /> : ""
      }
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
                    </div> : purchaseNow ? <div className="itemdetails_card_left_name">NFT price is</div> : <div className="itemdetails_card_left_name">
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
                  {
                    user ? <>

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

                        {
                          purchaseNow ? <p>{nftData?.amount} <span className="color">Matic</span></p> : bidDetails ? <p>{bidDetails.bidprice} <span className="color">Matic</span></p> : ""
                        }
                        {
                          purchaseNow ? <p>$ {(nftData?.amount * usd).toString().substring(0, 7)} </p> : bidDetails ? <p>$ {(bidDetails.bidprice * usd).toString().substring(0, 7)}</p> : ""
                        }
                      </div>
                    </> : ""
                  }
                </div>


              </div>
              }
            </div>
            <div className="itemdetails_top_right">
              <img src={nftData ? nftData.image : ""} alt="" />
              {
                user ? <>
                  <div className="social_icon">
                    <div>
                      <div className="more" onClick={goBack}>
                        <AiOutlineClose className="icon" />
                      </div>
                    </div>
                    <div>
                      <div className="more" onClick={handleLike}>
                        <TiHeart className={liked ? "icon liked_icon" : "icon"} />
                      </div>
                    </div>
                    <div >
                      <div className="more" onClick={() => setShare(true)}>
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
                      ((owner && bidDetails?.lastBidUser && !saleOver) || (!saleOver && nftData?.nftOnsale && owner && nftData.type == "putonsale") || (saleOver && nftData?.nftOnsale && owner && nftData.type == "putonsale")) ? <div>
                        <img src={loading_img} alt="" />
                        <p>Bid Is onGoing</p></div> :
                        <>

                          {
                            (owner && !nftData?.nftOnsale) ? <div >
                              <img src={transfer} alt="" />
                              <p onClick={handleTransferToken}>Transfer token</p>
                            </div> : ""
                          }
                        </>

                    }
                    {
                      owner ? "" : <div onClick={() => setReportNft(true)}>
                        <img src={report} alt="" />
                        <p>Report</p>
                      </div>
                    }
                    {
                      purchaseNow ? "" : (owner && !bidDetails?.lastBidUser && nftData?.nftOnsale) ? <div>
                        <img src={close1} alt="" />
                        <p onClick={handleRemoveSale}>Remove from sale</p>
                      </div> : ""
                    }
                    {
                      (purchaseNow && ownerAndCreater) ? <div>
                        <img src={close2} alt="" />
                        <p onClick={burnHandleClick} >Burn Token </p>
                      </div> : (ownerAndCreater && nftData?.nftOnsale === false) ? <div>
                        <img src={close2} alt="" />
                        <p onClick={burnHandleClick} >Burn Token </p>
                      </div> : ""
                    }
                  </div>

                </> : ""
              }
            </div>
          </div>
        </div>
        {/* itemdetails_active */}
        <div className="itemdetails_link_container">
          <div className="itemdetails_link">
            <div className={info ? "itemdetails_active" : ""} onClick={handleInfo}>
              Info
            </div>
            <div onClick={handleOwnerClick} className={ownerSection ? "itemdetails_active" : ""}>
              Owners
            </div>
            <div onClick={handleHistory} className={history ? "itemdetails_active" : ""}>
              History
            </div>
            <div onClick={handleBids} className={bid ? "itemdetails_active" : ""}>
              Bids
            </div>
          </div>
        </div>
        <div className="itemdetails_bottom">
          {
            info ? <Info nftData={nftData} /> : ownerSection ? <Owners nftData={nftData} /> : history ? <History nftData={nftData} /> : bid ? <Bids nftData={nftData} /> : ""
          }
        </div>
      </div>
    </div>

  );
};

export default ItemDetails;
