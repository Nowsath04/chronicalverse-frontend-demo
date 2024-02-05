import React, { useEffect, useState, useRef } from "react";

import { FaFacebook, FaInstagramSquare, FaTelegram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import "./UploadNotification.css";
import { FaCopy } from "react-icons/fa";
import Maskgroup from "../../Assets/Maskgroup.png";
import { SlClose } from "react-icons/sl";
import iconcircle from "../../Assets/icon-circle.png";
import { BiInfoCircle } from "react-icons/bi";
import clap from "../../Assets/clap.png";
import { CircleSpinner, SpiralSpinner } from "react-spinners-kit";
import facebook from "../../Assets/facebook.png";
import instagram from "../../Assets/Instagram.png";
import twitter from "../../Assets/Twitter.png";
import Pinterest from "../../Assets/Pinterest.png";
import Walletplacebid from "../../Assets/Walletplacebid.png";
import Pencil from "../../Assets/Pencil.png";
import Insert from "../../Assets/Insert.png";
import { BigNumber } from "bignumber.js";
import Checkplacebid from "../../Assets/Checkplacebid.png";
import { RiLoader2Line } from "react-icons/ri";
import dollersymbol from "../../Assets/dollersymbol.png";
import FileUpload from "../../Assets/FileUpload.png";
import whitecheck from "../../Assets/whitecheck.png";
import { toast } from "react-toastify";
import MARKET_ABI from "../../Config/Abi/marketAbi.json"
import { Contract } from "../../Config/Contract";
import Web3, { errors } from "web3";
import { useSelector } from "react-redux";
import whatsappIcon from "../../Assets/XMLID_468_.png"
import axios from "axios";
// import { CircleSpinner } from "react-spinners-kit";
import { Link, useNavigate } from "react-router-dom";
import NFT_ABI from "./../../Config/Abi/nft_abi.json";
import { API_URL } from "../../constants/userConstants";
import { FaPinterest, FaTwitter } from "react-icons/fa6";
import { FacebookShareButton, InstapaperIcon, PinterestShareButton, TwitterShareButton } from "react-share";
export default function UploadNotification({ tokenId, collectionId, account, collection_description, imagefile, ipfsData, ipfsImageHash, collectionname, nftdata }) {
  const { user } = useSelector((selector) => selector.auth);

  const web3 = new Web3(window.ethereum);
  const [loading, setLoading] = useState(false)
  const [auctionDone, setAuctionDone] = useState(false)
  const [cancel, setCancel] = useState(false);
  const [current, setCurrent] = useState(new Date().getTime() / 1000);
  const [bidvalue, setBidvalue] = useState(0)
  const [startdate, setStartDate] = useState(Math.floor(new Date(new Date()).getTime() / 1000));
  const [endDateTimestamp, setendDateTimestamp] = useState();
  const [startDateTimestamp, setstartDateTimestamp] = React.useState(null);
  const [bidValue, setbidValue] = useState(null);
  const [bidprice, setBidprice] = useState();
  const handleCancel = async () => {

    setstartDateTimestamp(Math.floor(new Date(startdate).getTime() / 1000));
    let amount = bidprice * (10 ** 18);
    if (bidprice <= 0) {
      return toast.error("Enter Bid Price more than 0");
    }
    if (!bidprice) {
      return toast.error("Enter Bid Price");
    }
    // if(bidprice==0){
    // return   toast.error("Enter Bid Price more than 0");

    // }
    if (!endDateTimestamp) {
      return toast.error("Select Expiration Time  ");
    }
    setbidValue(amount);

    if (!bidprice) {
      toast.error("Enter Bid Price");
    }
    if (bidprice == 0) {
      toast.error("Enter Bid Price more than 0");
    }
    if (!endDateTimestamp) {
      return toast.error("Select Exipiration Time");
    }
    let nftContract = collectionId;
    let reservePrice = bidValue
    let endDate = Math.floor(endDateTimestamp);
    await autionHandler(reservePrice, endDate)
  };

  const autionHandler = async (reservePrice, endDate) => {
    setLoading(true)
    try {
      const marketContractAddress = "0x27951D68849A72a37e52d9E33e4541AF9CB432cE"
      const nftContract = collectionId
      let tokenAddress = "0x0000000000000000000000000000000000000000";
      const contractInstance = new web3.eth.Contract(
        MARKET_ABI,
        marketContractAddress
      );
      const option = {
        nftContract,
        number: Number(tokenId),
        reservePrice: Number(reservePrice),
        startdate,
        endDate,
        tokenAddress
      }
      console.log("option", option);
      let limit = await contractInstance.methods
        .createReserveAuction(
          nftContract,
          Number(tokenId),
          Number(reservePrice),
          Number(startdate),
          Number(endDate),
          tokenAddress
        )
        .estimateGas({ from: account });
      console.log(limit);

      let data = await contractInstance.methods
        .createReserveAuction(
          nftContract,
          Number(tokenId),
          Number(reservePrice),
          Number(startdate),
          Number(endDate),
          tokenAddress
        )
        .send(
          {
            from: account,
          })
      console.log(data);


      const formData = new FormData()
      formData.append("creater", user._id)
      formData.append("endTime", Math.floor(endDateTimestamp))
      formData.append("pathname", `/item-1/${ipfsData}/${tokenId}/${collectionId}`)
      formData.append("collectionName", collectionname)
      formData.append("ipfsImage", ipfsImageHash)
      formData.append("image", imagefile)
      formData.append("auctionPrice", bidValue / 10 ** 18)
      formData.append("auctionId", data.events.ReserveAuctionCreated.returnValues.auctionId)
      formData.append("tokenId", tokenId)
      formData.append("collectionId", collectionId)
      formData.append("description", collection_description)
      saveAuction(formData)
      const auctionId = data.events.ReserveAuctionCreated.returnValues.auctionId
      createBid(auctionId)
    } catch (error) {
      console.log(errors);
    }

  }


  const saveAuction = async (formdata,) => {
    try {
      const data = await axios.post(`${API_URL}/save-auction`, formdata, { withCredentials: true })
      updatePriceInNft()
    } catch (error) {
      console.log(error);
    }
  }

  // create bid information 
  const createBid = async (auctionId) => {

    const formData = new FormData()
    formData.append("owner", user._id)
    formData.append("bidprice", bidValue / 10 ** 18)
    formData.append("auctionId", auctionId)
    formData.append("tokenId", tokenId)
    formData.append("collectionId", collectionId)
    try {
      const bidInfo = await axios.post(`${API_URL}/bid`, formData, { withCredentials: true })
      console.log(bidInfo);
    } catch (error) {
      console.log(error);
    }
  }
  const updatePriceInNft = async () => {
    try {
      const value = {
        "nftOnsale": true,
        "amount": bidValue / 10 ** 18
      }
      const data = await axios.put(`${API_URL}/update-nft/${tokenId}/${collectionId}`, value, { withCredentials: true })
      setLoading(false)
      setAuctionDone(true)
      PutOnSaleNotification()
      toast.success(`your ${collectionname} on sale`)
    } catch (error) {
      console.log(error);
    }
  }

  //putonsale notification 

  const PutOnSaleNotification = async () => {
    const formData = new FormData()
    formData.append("user", user?._id)
    formData.append("notifyTo", user?._id)
    formData.append("Distillery", collectionname)
    formData.append("notificationType", "putonsale")
    formData.append("pathname", `/item-1/${ipfsData}/${tokenId}/${collectionId}`)
    formData.append("image", imagefile)

    try {
      const notification = await axios.post(`${API_URL}/notification`, formData, { withCredentials: true })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setbidValue(bidprice * (10 ** 18))
  })
  if (cancel) {
    return null;
  }

  return (
    <>
      <div className="home_popup_background">
        <div className="CheckoutNotification_Maindiv">
          <div className="CheckoutNotification">
            <div className="popup">
              <div className="popup_header">
                <h2>Follow steps</h2>
              </div>
              <div className="popup_paragraph">
                <p>
                  Minimum Bid
                </p>
              </div>
              <div className="popup_payment_div">
                <input type="number" className="ppopup_input" placeholder="Minimum Bid Price" name="bidamount" value={bidprice} onChange={(e) => setBidprice((e.target.value))} />
              </div>
              <div className="popup_payment_div" >
                <select className="popup_select" onChange={(e) =>
                  (e.target.value == "5minute" &&
                    setendDateTimestamp(current + 300)) ||
                  (e.target.value == "1day" &&
                    setendDateTimestamp(current + 86400)) ||
                  (e.target.value == "2day" &&
                    setendDateTimestamp(current + 172800)) ||
                  (e.target.value == "3day" &&
                    setendDateTimestamp(current + 259200)) ||
                  (e.target.value == "4day" &&
                    setendDateTimestamp(current + 345600)) ||
                  (e.target.value == "5day" &&
                    setendDateTimestamp(current + 432000)) ||
                  (e.target.value == "6day" &&
                    setendDateTimestamp(current + 518400))

                }>
                  <option value={null}>Select Expire date</option>
                  <option value="5minute">5 minutes</option>
                  <option value="1day">1 days</option>
                  <option value="2day">2 days</option>
                  <option value="3day">3 days</option>
                  <option value="4day">4 days</option>
                  <option value="5day">5 days</option>
                  <option value="6day">6 days</option>
                </select>
              </div>
              <div className="popup_button">
                {
                  auctionDone ? <Link to={"/profile/onsale"} className="btn">Done</Link> : <button onClick={handleCancel} disabled={loading} >{loading ? <CircleSpinner size={30} color="#ba00a7" loading={loading} /> : "START AUCTION"}</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export function Placebid3({ tokenId, collectionId, account, collectionname, nftdata, user, imagefile, ipfsData }) {
  console.log(nftdata);
  const web3 = new Web3(window.ethereum);
  const [serviceFee, setServiceFee] = useState(0)
  const [totelAmount, setTotelAmount] = useState(0)
  const [cancel, setCancel] = useState(false);
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [auctionDone, setAuctionDone] = useState(false)
  useEffect(() => {
    getServiceFee()
  })
  const handleCancel = () => {
    setCancel(!cancel);
  };

  useEffect(() => {
    console.log(nftdata);
  })
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const nftContract = collectionId; // replace
      const deadline = 1717314202; // replace
      const marketContract = "0x27951D68849A72a37e52d9E33e4541AF9CB432cE";
      const chainId = await web3.eth.getChainId();
      const msgParams = {
        types: {
          EIP712Domain: [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            { name: "chainId", type: "uint256" },
            { name: "verifyingContract", type: "address" }
          ],
          BuyFromPrivateSale: [
            { name: 'nftContract', type: 'address' },
            { name: 'tokenId', type: 'uint256' },
            { name: 'seller', type: 'address' },
            { name: 'price', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
          ]
        },
        domain: {
          name: 'ChronicleVerseMarket',
          version: 'V1',
          chainId: chainId.toString(),
          verifyingContract: marketContract
        },
        primaryType: "BuyFromPrivateSale",
        message: {
          nftContract: nftContract,
          tokenId: tokenId,
          seller: account.toString(),
          price: ((amount) * 1e18).toString(),
          deadline: deadline
        },
      };
      const typedData = JSON.stringify(msgParams);
      web3.currentProvider.sendAsync({
        method: 'eth_signTypedData_v3',
        params: [account, typedData],
        from: account.address,
      }, function (err, result) {
        if (err || result.error) {
          // reject(err)
        }
        const signature = result.result;
        console.log("signature", signature);
        const data = {
          signature,
          nftContract: nftContract,
          tokenId: tokenId,
          amount: Number(amount) * 1e18,
          userAccount: account,
          deadline: deadline
        }
        sendata(data)
      });

    } catch (error) {
      console.log(error);
    }

  }

  const sendata = async (formdata) => {
    try {
      const { data } = await axios.post(`${API_URL}/sign-order`, formdata, { withCredentials: true })
      console.log(data);
      updatePriceInNft()
      DirectSaleNotification()
      toast.success(`your ${collectionname} on sale`)
      setLoading(false)
      setAuctionDone(true)
    } catch (error) {
      console.log(error);
    }
  }
  const updatePriceInNft = async () => {
    try {
      const value = {
        "nftOnsale": true,
        "amount": amount
      }
      const data = await axios.put(`${API_URL}/update-nft/${tokenId}/${collectionId}`, value, { withCredentials: true })


    } catch (error) {
      console.log(error);
    }
  }
  if (cancel) {
    return null;
  }


  // directSale notification
  const DirectSaleNotification = async (pathname) => {
    const formData = new FormData()
    formData.append("user", user?._id)
    formData.append("notifyTo", user?._id)
    formData.append("Distillery", collectionname)
    formData.append("notificationType", "directsale")
    formData.append("pathname", `/item-1/${ipfsData}/${tokenId}/${collectionId}`)
    formData.append("image", imagefile)

    try {
      const notification = await axios.post(`${API_URL}/notification`, formData, { withCredentials: true })
    } catch (error) {
      console.log(error);
    }
  }
  const getServiceFee = async () => {
    try {
      // const amount = price * (10 ** 18)
      const marketContract = "0x27951D68849A72a37e52d9E33e4541AF9CB432cE";
      const contractInstance = await new web3.eth.Contract(
        MARKET_ABI,
        marketContract,
      );
      const nftContract = collectionId
      const tokenid = tokenId
      const auction_price = Number((amount) * (10 ** 18))
      const fee = await contractInstance.methods.getFees(nftContract, tokenid, auction_price).ca
      setServiceFee((Number(fee.foundationFee)) / (10 ** 18))
      const totalValue = Number(amount) + (Number(fee.foundationFee) / (10 ** 18))
      setTotelAmount(totalValue)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="home_popup_background">
        <div className="placebid2_Maindiv">
          <div className="placebid2">
            <div className="popup_placrbid2">
              <div className="popup_header">
                <h2>Instant sale</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="popup_payment_div">
                <div className="popup_payment">
                  <p>Enter Price</p>

                </div>
                <div className="popup_payment_div">
                  <input type="number" className="ppopup_input" placeholder="Enter NFT Price" name="bidamount" value={amount} onChange={(e) => setAmount((e.target.value))} />
                </div>
                <div className="popup_payment">

                </div>
                <div className="popup_payment">
                  <p>Nft Price</p>
                  <p className="griedient_text">{amount} Matic</p>
                </div>
              </div>
              <div className="popup_button">
                {auctionDone ? <Link to={"/profile/onsale"} className="btn">Done</Link> : <button disabled={loading} onClick={handleSubmit}>{loading ? <CircleSpinner size={30} color="#ba00a7" loading={loading} /> : "SALE"}</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PlaceBid({ setBidPopup, user, auctionDetails }) {
  const [serviceFee, setSericeFee] = useState("")
  const [totelAmount, setTotelAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [bidDone, setBidDone] = useState(false)
  const [cancel, setCancel] = useState(false);
  const [price, setPrice] = useState("")
  const web3 = new Web3(window.ethereum);
  const account = user.userid
  useEffect(() => {
    getServiceFee()
  }, [price])

  const placeBid = async () => {

    setLoading(true)
    const autionId = auctionDetails.auctionId
    const amount = price * (10 ** 18)
    console.log("amount", amount);
    const marketContract = "0x27951D68849A72a37e52d9E33e4541AF9CB432cE";
    try {
      const contractInstance = await new web3.eth.Contract(
        MARKET_ABI,
        marketContract,
      );
      const getReserveAuctionInfo = await contractInstance.methods.getReserveAuction(autionId).call()
      console.log("getReserveAuctionamount", Number(getReserveAuctionInfo.amount));
      console.log("getReserveAuctionInfo", getReserveAuctionInfo);
      console.log("actionId", autionId);
      const getMinBidAmount = await contractInstance.methods.getMinBidAmount(autionId).call()
      console.log("getMinBidAmount", Number(getMinBidAmount));
      if (Number(getMinBidAmount) > amount) {
        //
        setLoading(false)
        return toast.error(`Too Low Pls place a Bid Above ${Number(getMinBidAmount) / (10 ** 18)}`)
      }
      // Find gas limit
      let limit = await contractInstance.methods
        .placeBid(Number(amount), autionId)
        .estimateGas({ from: account, value: Number(amount) });
      console.log(limit);
      //Send the transaction
      const transactionReceipt = await contractInstance.methods
        .placeBid(amount, autionId)
        .send({
          from: account,
          value: Number(amount),
          gasLimit: Number(limit) + 5000,
        });
      updateLastBidUser(amount)
      UpdateAuctonData(amount)

    } catch (error) {
      setLoading(false)
      if (error.message == "Returned error: MetaMask Tx Signature: User denied transaction signature.") {
        setLoading(false)
        return toast.error("User denied transaction signature.")
      }

      if (error.data.message.includes("insufficient funds for gas")) {
        setLoading(false)
        return toast.error("insufficient balance.")
      }
      console.log(error.data.message);
    }
  }
  const updateLastBidUser = async (amount) => {
    const option = {
      bidprice: Number(amount) / 1e18,
      lastBidUser: user._id,
    }
    const { data } = await axios.put(`${API_URL}/bid-update/${auctionDetails.auctionId}/${auctionDetails.collectionId}/${auctionDetails.tokenId}/${option.bidprice}/${option.lastBidUser}`)
    console.log(data.owner);
    placebidNotification()
    placebidOwnerNotification(data.owner)
  }
  const handleCancel = () => {
    setCancel(!cancel);
    setBidPopup(false)
  };

  const UpdateAuctonData = async (amount) => {
    const option = {
      auctionPrice: Number(amount) / 1e18,
      lastBidUser: user._id,
    }


    try {
      const data = await axios.put(`${API_URL}/update-particular-action/${auctionDetails.tokenId}/${auctionDetails.collectionId}/${option.auctionPrice}`)
      console.log(data);
      const details = {
        bidprice: option.auctionPrice,
        BidUser: user?._id,
        tokenId: auctionDetails.tokenId,
        collectionId: auctionDetails.collectionId
      }
      sendBidDetails(details)
      setBidDone(true)
      setLoading(false)
      toast.success("Bid Placed Successfully")
    } catch (error) {
      console.log(error);
    }
  }
  if (cancel) {
    return null;
  }
  // placebid notification
  const placebidNotification = async () => {
    const formData = new FormData()
    formData.append("user", user?._id)
    formData.append("notifyTo", user?._id)
    formData.append("Distillery", auctionDetails.collectionName)
    formData.append("notificationType", "placedbid")
    formData.append("pathname", auctionDetails.pathname)
    formData.append("img", auctionDetails.image)
    try {
      const notification = await axios.post(`${API_URL}/notification`, formData, { withCredentials: true })
    } catch (error) {
      console.log(error);
    }
  }
  // send notification to bid nft owner
  const placebidOwnerNotification = async (to) => {
    const formData = new FormData()
    formData.append("user", user?._id)
    formData.append("notifyTo", to)
    formData.append("Distillery", auctionDetails.collectionName)
    formData.append("notificationType", "BidnftOwner")
    formData.append("pathname", auctionDetails.pathname)
    formData.append("img", auctionDetails.image)
    try {
      const notification = await axios.post(`${API_URL}/notification`, formData, { withCredentials: true })
    } catch (error) {
      console.log(error);
    }
  }
  const bidHandler = async () => {
    if (!price || price < 0) {
      return toast.error("please enter price")
    }
    if (price < 0) {
      return toast.error("please enter possitive value")
    }
    placeBid()
  }

  const sendBidDetails = async (data) => {

    try {
      const details = await axios.post(`${API_URL}/bid_details`, { data })
    } catch (error) {
      console.log(error);
    }
  }

  const getServiceFee = async () => {
    try {
      const amount = price * (10 ** 18)
      const marketContract = "0x27951D68849A72a37e52d9E33e4541AF9CB432cE";
      const contractInstance = await new web3.eth.Contract(
        MARKET_ABI,
        marketContract,
      );
      const nftContract = auctionDetails.collectionId
      const tokenId = auctionDetails.tokenId
      const auction_price = Number(amount)
      const fee = await contractInstance.methods.getFees(nftContract, tokenId, auction_price).call()
      setSericeFee((Number(fee.foundationFee)) / (10 ** 18))
      const totalValue = Number(price) + (Number(fee.foundationFee) / (10 ** 18))
      console.log(totalValue);
      console.log(Number(fee.foundationFee) / (10 ** 18));
      setTotelAmount(totalValue)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className="home_popup_background">
        <div className="placebid2_Maindiv">
          <div className="placebid2">
            <div className="popup_placrbid2">
              <div className="popup_header">
                <h2>Place a bid</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="popup_payment_div">
                <div className="popup_payment">
                  <p>Enter Price</p>

                </div>
                <div className="popup_payment_div">
                  <input type="number" className="ppopup_input" placeholder="Minimum Bid Price" name="bidamount" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="popup_payment">
                  <p>Service fee</p>
                  <p className="griedient_text">{serviceFee} Matic</p>
                </div>
                <div className="popup_payment">
                  <p>Total bid amount</p>
                  <p className="griedient_text">{totelAmount} Matic</p>
                </div>
              </div>
              <div className="popup_button">
                {
                  bidDone ? <div>
                    <Link to={"/profile/onsale"}>Done</Link>
                  </div> : <>
                    <button onClick={bidHandler} disabled={loading}>{loading ? <CircleSpinner size={30} color="#ba00a7" /> : "place a bid"}</button>
                    {
                      loading ? "" : <button onClick={handleCancel}>cancel</button>
                    }</>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function UploadNotification3({ setPurchasePopup, nftData }) {
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
    setPurchasePopup(false)
  };

  if (cancel) {
    return null;
  }

  const shareUrl = window.location.href;
  const title = "I brought this Nft";
  const instagramShareUrl = `https://www.instagram.com/sharing/share?url=${encodeURIComponent(shareUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(title + ': ' + shareUrl)}`;
  return (
    <>
      <div className="home_popup_background">
        <div className="CheckoutNotification_Maindiv">
          <div className="CheckoutNotification">
            <div className="popup3">
              <div className="popup_header3">
                <h2 className="popup_header3_heading">
                  Bravo! <img src={clap} />
                </h2>

              </div>
              <div className="popup_header3_paragraph">
                <p>
                  You successfully purchased{" "}
                  <span className="griedient_text">{nftData.nft_name}</span> from
                  Chronical verse
                </p>
              </div>
              <div className="popup_box_div3">
                <div className="popup_box3">
                  <div className="popup_box_div3_heading">
                    <div>Status</div>
                  </div>
                  <div className="popup_box_div3_paragraph">
                    <div className="griedient_text">Success</div>
                  </div>
                </div>
              </div>
              <div className="pop_continue">
                <Link to={"/profile/collectibles"}>Done</Link>
              </div>
              <div className="SocialMedia_font_div">
                <a className="facebook_div" href={facebookShareUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  <img src={facebook} alt="facebook" />
                </a>
                <a className="facebook_div" href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  <img src={twitter} alt="twitter" />
                </a>
                <a className="facebook_div" href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  <img src={whatsappIcon} alt="whatapp" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Placebid1() {
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
  };

  if (cancel) {
    return null;
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="CheckoutNotification_Maindiv">
          <div className="CheckoutNotification">
            <div className="placebid_div">
              <div className="placebid">
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="Walletplacebid_div">
                <div className="Walletplacebid">
                  <img src={Walletplacebid} />
                </div>
              </div>
              <div className="placebid_paragraph">
                <p>
                  You need to connect you wallet first to sign messages and send
                  transaction to Ethereum network
                </p>
              </div>
              <div className="placebid_continue">
                <p>Connect wallet</p>
              </div>
              <div className="popup_button">
                <button>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export function Placebid7() {
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
  };

  if (cancel) {
    return null;
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_placrbid3">
              <div className="placebid3_header">
                <h2>Follow steps</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="placebid3_img_div">
                <div className="placebid3_img">
                  <img src={Insert} />
                </div>
                <div className="Placebid_3_rightcontent">
                  <div className="Purchase_header">Deposit ETH</div>
                  <div className="Purchase_paragraph">
                    send transaction with your wallet
                  </div>
                </div>
              </div>
              <div className="placebid3_button_div_startnow">
                <button>Start now</button>
              </div>
              <div className="placebid3_img_div">
                <div className="placebid3_img">
                  <img src={Checkplacebid} />
                </div>
                <div className="Placebid_3_rightcontent">
                  <div className="Purchase_header">Approve</div>
                  <div className="Purchase_paragraph">
                    Checking balance and approving
                  </div>
                </div>
              </div>
              <div className="placebid3_button_div_startnow_none">
                <button>Start now</button>
              </div>
              <div className="placebid3_img_div">
                <div className="placebid3_img">
                  <img src={Pencil} />
                </div>
                <div className="Placebid_3_rightcontent">
                  <div className="Purchase_header">Signature</div>
                  <div className="Purchase_paragraph">
                    Create a signature to place a bit{" "}
                  </div>
                </div>
              </div>

              <div className="placebid3_button_div_done">
                <button>Done</button>
              </div>

              {/* <div className="placebid3_button_div_cancel">
              <button>Cancelled</button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function BuyDirectSalePopup({ nftData, setPurchasePopup, signOrderData, user }) {
  const [cancel, setCancel] = useState(false);
  const web3 = new Web3(window.ethereum);
  const [loading, setLoading] = useState(false)
  const [directSaleDone, setDirectSaleDone] = useState(false)
  const [serviceFee, setServiceFee] = useState()
  const [totelAmount, setTotelAmount] = useState()


  useEffect(() => {
    getServiceFee()
  }, [])
  const callDirectSale = async () => {
    setLoading(true)
    const amount = JSON.stringify(signOrderData.amount)
    const price = Number(amount)
    const bnValue = price.toString()
    const signature = signOrderData.signature
    const nftContract = signOrderData.nftContract
    const tokenId = signOrderData.tokenId
    const deadline = signOrderData.deadline
    const account = user.userid



    const paymentMode = "0x0000000000000000000000000000000000000000"
    const option = {
      amount: bnValue,
      signature,
      nftContract,
      tokenId,
      deadline,
      account,
      paymentMode
    }
    console.log(option);
    const marketContract = "0x27951D68849A72a37e52d9E33e4541AF9CB432cE";
    try {
      const contractInstance = await new web3.eth.Contract(
        MARKET_ABI,
        marketContract,
      );
      // Find gas limit
      let limit = await contractInstance.methods
        .buyFromPrivateSale(
          nftContract,
          paymentMode,
          bnValue,
          tokenId,
          deadline,
          signature
        )
        .estimateGas({ from: account });
      console.log(limit);

      const callContract = await contractInstance.methods
        .buyFromPrivateSale(
          nftContract,
          paymentMode,
          bnValue,
          tokenId,
          deadline,
          signature
        )
        .send(
          {
            from: account,
            value: bnValue,
            gasLimit: Number(limit) + 5000,
          })
      updateOwner(tokenId, nftContract)
    } catch (error) {
      setLoading(false)
      if (error.message == "Returned error: MetaMask Tx Signature: User denied transaction signature.") {
        setLoading(false)
        return toast.error("User denied transaction signature.")
      }
      if (error.data.message.includes("insufficient funds for gas")) {
        return toast.error("insufficient balance.")
      }
      console.log(error);
    }
  }

  //set top artist function

  const topArtists = async () => {
    try {
      const data = await axios.post("http://localhost:5000/topartists", { artist: nftData.nft_owner })
    } catch (error) {
      console.log(error);
    }
  }

  const updateOwner = async (tokenId, collectionId) => {
    try {
      const value = {
        "nft_owner": user.userid,
        "nftOnsale": false,
      }
      const data = await axios.put(`${API_URL}/update-nft/${tokenId}/${collectionId}`, value, { withCredentials: true })
      getNftOwner()
      topArtists()
      const datas = {
        ownerAddress: user.userid,
        tokenId: nftData.nfttoken,
        collectionId: nftData.collection_id
      }
      nftOwner(datas)
      setLoading(false)
      toast.success(`${nftData.nft_name} buyed successfull`)
      setDirectSaleDone(true)
    } catch (error) {
      console.log(error);
    }
  }
  const handleCancel = () => {
    setPurchasePopup(!true)
    setCancel(!cancel);
  };

  if (cancel) {
    return null;
  }

  const handleClick = () => {
    callDirectSale()
  }

  // get nft owner data 

  const getNftOwner = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/oneuser/${signOrderData.userAccount}`)
      directSaleOwnerNotification(data.user._id)
      directSaleBuyerNotification()

    } catch (error) {

    }
  }

  // send notification to nft owner
  const directSaleOwnerNotification = async (to) => {
    const formData = new FormData()
    formData.append("user", user._id)
    formData.append("notifyTo", to)
    formData.append("Distillery", nftData.nft_name)
    formData.append("notificationType", "yourdirectsalenftbuy")
    formData.append("pathname", nftData.pathname)
    formData.append("img", nftData.image)
    try {
      const notification = await axios.post(`${API_URL}/notification`, formData, { withCredentials: true })
    } catch (error) {
      console.log(error);
    }
  }
  // send notification to directSale nft buyer
  const directSaleBuyerNotification = async () => {
    const formData = new FormData()
    formData.append("user", user._id)
    formData.append("notifyTo", user._id)
    formData.append("Distillery", nftData.nft_name)
    formData.append("notificationType", "youbuydirectsale")
    formData.append("pathname", nftData.pathname)
    formData.append("img", nftData.image)
    try {
      const notification = await axios.post(`${API_URL}/notification`, formData, { withCredentials: true })
    } catch (error) {
      console.log(error);
    }
  }
  const nftOwner = async (data) => {

    try {
      const owner = await axios.post(`${API_URL}/nft-owner`, { data })
    } catch (error) {
      console.log(error);
    }
  }

  const getServiceFee = async () => {
    try {
      // const amount = price * (10 ** 18)
      const marketContract = "0x27951D68849A72a37e52d9E33e4541AF9CB432cE";
      const contractInstance = await new web3.eth.Contract(
        MARKET_ABI,
        marketContract,
      );
      const nftContract = signOrderData.nftContract
      const tokenId = signOrderData.tokenId
      const auction_price = Number((signOrderData.amount))
      const fee = await contractInstance.methods.getFees(nftContract, tokenId, auction_price).call()
      setServiceFee((Number(fee.foundationFee)) / (10 ** 18))
      const totalValue = Number(signOrderData.amount) / (10 ** 18) + (Number(fee.foundationFee) / (10 ** 18))
      setTotelAmount(totalValue)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      {
        directSaleDone ? <UploadNotification3 setPurchasePopup={setPurchasePopup} nftData={nftData} /> : <div className="home_popup_background">
          <div className="placebid3_Maindiv">
            <div className="placebid3">
              <div className="popup_placrbid3">
                <div className="placebid3_header">
                  <h2>Follow steps</h2>
                  <h2 onClick={handleCancel}>
                    <SlClose className="wrong_icon" />
                  </h2>
                </div>
                <div className="accept_img_div">
                  <div className="acceptbid_img">
                    <img src={dollersymbol} />
                  </div>
                  <div className="Placebid_3_rightcontent">
                    <div className="Acceptbid_paragraph">
                      PURCHASING
                      Sending transaction with your wallet
                    </div>
                  </div>
                </div>
                <div className="popup_payment_div">


                  <div className="popup_payment">
                    <p>Service fee</p>
                    <p className="griedient_text">{serviceFee} Matic</p>
                  </div>
                  <div className="popup_payment">
                    <p>Total  amount</p>
                    <p className="griedient_text">{totelAmount} Matic</p>
                  </div>
                </div>
                <div className="placebid3_button_div_cancel">
                  <button onClick={handleClick} disabled={loading} > {loading ? <CircleSpinner size={30} color="#ba00a7" /> : "I UNDERSTAND, CONTINUE"}</button>
                </div>
                <div className=" placebid3_button_div_startnow">
                  {
                    loading ? "" : <button onClick={handleCancel}>cancel</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </>
  );
}

export function AcceptBid({ setAcceptBidModel, bidDetails, user, nftData }) {
  const web3 = new Web3(window.ethereum);
  const [loading, setloading] = useState(false)
  const [cancel, setCancel] = useState(false);
  const [acceptBid, setAcceptDone] = useState(false)
  const [serviceFee, setServiceFee] = useState(0)
  const [totelAmount, setTotelAmount] = useState(0)
  //   setServiceFee
  // setTotelAmount
  const account = user?.userid
  console.log(bidDetails);
  const handleCancel = () => {
    setCancel(!cancel);
    setAcceptBidModel(false)

  };

  useEffect(() => {
    getServiceFee()
  }, [])
  const acceptBidFunction = async () => {
    setloading(true)
    const auctionId = bidDetails.auctionId;
    const marketContract = "0x27951D68849A72a37e52d9E33e4541AF9CB432cE";
    try {
      const contractInstance = await new web3.eth.Contract(
        MARKET_ABI,
        marketContract,
      )
      let limit = await contractInstance.methods
        .finalizeReserveAuction(auctionId)
        .estimateGas({ from: account });
      console.log(limit);
      const finalize = await contractInstance.methods.finalizeReserveAuction(auctionId).send(
        {
          from: account,
          gasLimit: Number(limit) + 5000,
        })
      const value = {
        "nft_owner": bidDetails.lastBidUser.userid,
        "nftOnsale": false,
      }
      const data = await axios.put(`${API_URL}/update-nft/${bidDetails.tokenId}/${bidDetails.collectionId}`, value, { withCredentials: true })
      finalizednftNotification()
      topArtists()
      const datas = {
        ownerAddress: bidDetails.lastBidUser.userid,
        tokenId: nftData.nfttoken,
        collectionId: nftData.collection_id
      }
      nftOwner(datas)
      setloading(false)
      setAcceptDone(true)
      toast.success(`you accept the Bid value`)
    } catch (error) {
      setloading(false)
      if (error.message == "Returned error: MetaMask Tx Signature: User denied transaction signature.") {

        return toast.error("User denied transaction signature.")
      }
      console.log(errors);
    }
  }
  const topArtists = async () => {
    try {
      const data = await axios.post("http://localhost:5000/topartists", { artist: nftData.nft_owner })
    } catch (error) {
      console.log(error);
    }
  }

  // send notification to finalize nft buyer
  const finalizednftNotification = async () => {
    const formData = new FormData()
    formData.append("user", user._id)
    formData.append("notifyTo", bidDetails.lastBidUser._id)
    formData.append("Distillery", nftData.nft_name)
    formData.append("notificationType", "youwinbid")
    formData.append("pathname", nftData.pathname)
    formData.append("img", nftData.image)
    try {
      const notification = await axios.post(`${API_URL}/notification`, formData, { withCredentials: true })
    } catch (error) {
      console.log(error);
    }
  }
  if (cancel) {
    return null;
  }

  const nftOwner = async (data) => {

    try {
      const owner = await axios.post(`${API_URL}/nft-owner`, { data })
    } catch (error) {
      console.log(error);
    }
  }
  const getServiceFee = async () => {
    try {
      // const amount = price * (10 ** 18)
      const marketContract = "0x27951D68849A72a37e52d9E33e4541AF9CB432cE";
      const contractInstance = await new web3.eth.Contract(
        MARKET_ABI,
        marketContract,
      );
      const nftContract = nftData.collection_id
      const tokenId = nftData.nfttoken
      const auction_price = Number((bidDetails.bidprice) * (10 ** 18))
      const fee = await contractInstance.methods.getFees(nftContract, tokenId, auction_price).call()
      setServiceFee((Number(fee.foundationFee)) / (10 ** 18))
      const totalValue = Number(bidDetails.bidprice) - (Number(fee.foundationFee) / (10 ** 18))
      setTotelAmount(totalValue)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_placrbid3">
              <div className="placebid3_header">
                <h2>Follow steps</h2>

              </div>
              <div className="accept_img_div">
                <div className="acceptbid_img">
                  <img src={Checkplacebid} />
                </div>
                <div className="Placebid_3_rightcontent">
                  <div className="Acceptbid_paragraph">
                    You are about to accept a bid for digital NFT from
                    chronicleverse
                  </div>
                </div>
              </div>
              <div className="popup_payment_div">
                <div className="accept_payment_heading">
                  <p>{nftData?.nft_name} </p>
                </div>
                <div className="popup_line_div"></div>
                <div className="popup_payment">
                  <p>Service fee</p>
                  <p className="griedient_text">{serviceFee} Matic</p>
                </div>
                <div className="popup_payment">
                  <p>Total bid amount</p>
                  <p className="griedient_text">{totelAmount} MATIC</p>
                </div>
              </div>
              <div className="placebid3_button_div_cancel">
                {
                  acceptBid ? <Link to={"/profile/collectibles"}>Done</Link> : <button onClick={acceptBidFunction} disabled={loading}> {loading ? <CircleSpinner size={30} color="#ba00a7" /> : "Accept bid"}</button>
                }
              </div>

              {
                (loading || acceptBid) ? "" : <div className="placebid3_button_div_startnow">
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export function Acceptbid2() {
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
  };

  if (cancel) {
    return null;
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_Acceptbid2">
              <div className="placebid3_header">
                <h2>Follow steps</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="placebid3_img_div">
                <div className="placebid3_img">
                  <img src={Insert} />
                </div>
                <div className="Purchasing_loading_content">
                  <div className="Purchase_header">Accept bid</div>
                  <div className="Purchase_paragraph">
                    send transaction with your wallet
                  </div>
                </div>
              </div>
              <div className="accept2_button_div_startnow">
                <button>Start now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Acceptbid3() {
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
  };

  if (cancel) {
    return null;
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_Acceptbid2">
              <div className="placebid3_header">
                <h2>Follow steps</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="placebid3_img_div">
                <div className="loader"></div>

                <div className="Purchasing_loading_content">
                  <div className="Purchase_header">Accept bid</div>
                  <div className="Purchase_paragraph">
                    send transaction with your wallet
                  </div>
                </div>
              </div>
              <div className="Accept_loader_button">
                <button>
                  <RiLoader2Line />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PutOnsale() {
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
  };

  if (cancel) {
    return null;
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="putonsale_Maindiv">
          <div className="putonsale">
            <div className="popup_putonsale">
              <div className="placebid3_header">
                <h2>Put on sale</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="putonsale_img_div">
                <div className="putonsale_img">
                  <img src={dollersymbol} />
                </div>
                <div className="Purchasing_loading_content">
                  <div className="Purchase_header">Instant sale price</div>
                  <div className="putonsale_Purchase_paragraph">
                    Enter the price for which the item will be instantly sold
                  </div>
                </div>
                <div>
                  <label className="toggle_btn_popup">
                    <input type="checkbox" />
                    <span className="toggle_btn_popup_slider"></span>
                  </label>
                </div>
              </div>
              <div className="putonsale_button_div_Continue">
                <button>Continue</button>
              </div>
              <div className="placebid3_button_div_cancel">
                <button>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PutOnsale2() {
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
  };

  if (cancel) {
    return null;
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="putonsale_Maindiv">
          <div className="putonsale">
            <div className="popup_putonsale">
              <div className="placebid3_header">
                <h2>Put on sale</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="putonsale_img_div">
                <div className="putonsale_img">
                  <img src={dollersymbol} />
                </div>
                <div className="Purchasing_loading_content">
                  <div className="Purchase_header">Instant sale price</div>
                  <div className="putonsale_Purchase_paragraph">
                    Enter the price for which the item will be instantly sold
                  </div>
                </div>
                <div>
                  <label className="toggle_btn_popup">
                    <input type="checkbox" />
                    <span className="toggle_btn_popup_slider"></span>
                  </label>
                </div>
              </div>
              <div className="popup_payment_div">
                <div className="accept_payment_heading">
                  <p>Enter your price</p>
                </div>
                <div className="popup_line_div"></div>
                <div className="popup_payment">
                  <p>Service fee</p>
                  <p className="griedient_text">1.5%</p>
                </div>
                <div className="popup_payment">
                  <p>Total bid amount</p>
                  <p className="griedient_text">0 ETH</p>
                </div>
              </div>
              <div className="putonsale_button_div_Continue">
                <button>Continue</button>
              </div>
              <div className="placebid3_button_div_cancel">
                <button>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PutOnsale3() {
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
  };

  if (cancel) {
    return null;
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_placrbid3">
              <div className="placebid3_header">
                <h2>Follow steps</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="placebid3_img_div">
                <div className="placebid3_img">
                  <img src={Checkplacebid} />
                </div>
                <div className="Placebid_3_rightcontent">
                  <div className="Purchase_header">Approve</div>
                  <div className="Purchase_paragraph">
                    Approve performing transactions with your wallet{" "}
                  </div>
                </div>
              </div>
              <div className="putonsale_button_div_Continue">
                <button>Start now</button>
              </div>
              <div className="placebid3_img_div">
                <div className="placebid3_img">
                  <img src={Pencil} />
                </div>
                <div className="Placebid_3_rightcontent">
                  <div className="Purchase_header">Signature</div>
                  <div className="Purchase_paragraph">
                    Create a signature to place a bit{" "}
                  </div>
                </div>
              </div>
              <div className="start_now_putonsale">
                <button>Start now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PutOnsale4() {
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
  };

  if (cancel) {
    return null;
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_placrbid3">
              <div className="placebid3_header">
                <h2>Follow steps</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="placebid3_img_div">
                <div className="loader"></div>
                <div className="Purchasing_loading_content">
                  <div className="Purchase_header">Accept bid</div>
                  <div className="Purchase_paragraph">
                    send transaction with your wallet
                  </div>
                </div>
              </div>
              <div className="putonsale_loader_button">
                <button>
                  <RiLoader2Line />
                </button>
              </div>
              <div className="placebid3_img_div">
                <div className="placebid3_img">
                  <img src={Pencil} />
                </div>
                <div className="Placebid_3_rightcontent">
                  <div className="Purchase_header">Signature</div>
                  <div className="Purchase_paragraph">
                    Create a signature to place a bit{" "}
                  </div>
                </div>
              </div>
              <div className="start_now_putonsale">
                <button>Start now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function NotWhitListUserPopup() {
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
  };

  if (cancel) {
    return null;
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_placrbid3">
              <div className="placebid3_header">
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="placebid3_img_div">
                <div className="Placebid_3_rightcontent">
                  <div className="Purchase_paragraph">
                    Whitelisted users can create NFTs; whitelist yourself by providing details in the Contact Us Page.
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PutOnsale6() {
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
  };

  if (cancel) {
    return null;
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_placrbid3">
              <div className="placebid3_header">
                <h2>Follow steps</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="placebid3_img_div">
                <div className="placebid3_img">
                  <img src={whitecheck} />
                </div>
                <div className="Placebid_3_rightcontent">
                  <div className="Purchase_header">Approve</div>
                  <div className="Purchase_paragraph">
                    Approve performing transactions with your wallet
                  </div>
                </div>
              </div>
              <div className="putonsale_button_div_done">
                <button>Done</button>
              </div>
              <div className="placebid3_img_div">
                <div className="placebid3_img">
                  <img src={Pencil} />
                </div>
                <div className="Placebid_3_rightcontent">
                  <div className="Purchase_header">Sign sell order</div>
                  <div className="Purchase_paragraph">
                    Sign sell order using your wallet
                  </div>
                </div>
              </div>
              <div className="putonsale_button_div_startnow6">
                <button>Start now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Transfertoken({ setTransferToken, user, nftData }) {
  const [cancel, setCancel] = useState(false);
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [transferDone, setTransferDone] = useState(false)
  const web3 = new Web3(window.ethereum);

  const handleCancel = () => {
    setCancel(!cancel);
    setTransferToken(false)
  };

  if (cancel) {
    return null;
  }
  function isValidEthereumAddress(address) {
    // Ethereum address regular expression
    const ethAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;

    // Test the address against the regular expression
    return ethAddressRegex.test(address);
  }

  // Example usag
  const HandleTransfer = async () => {
    if (!address) {
      return toast.error("Please Enter the To Address")
    }
    if (!isValidEthereumAddress(address)) {
      return toast.error("Please Enter vailed  Address")

    }
    setLoading(true)

    try {
      const user = await axios.get(`${API_URL}/findUser/${address}`)
    } catch (error) {
      console.log(error);
      setLoading(false)
      return toast.error("This Address Not registered")
    }

    try {
      const fromAddress = user.userid
      const toAddress = address
      const tokenid = nftData.nfttoken
      const marketContract = nftData.collection_id

      const contractInstance = new web3.eth.Contract(
        NFT_ABI,
        marketContract
      );
      let limit = await contractInstance.methods
        .safeTransferFrom(fromAddress, toAddress, Number(tokenid))
        .estimateGas({ from: fromAddress });
      console.log(limit);

      const transferToCall = await contractInstance.methods
        .safeTransferFrom(fromAddress, toAddress, Number(tokenid))
        .send(
          {
            from: fromAddress,
            value: 0,
            gasLimit: Number(limit) + 5000,
          })
      updateOwnerOnBE()
    } catch (error) {
      setLoading(false)
      if (error.message == "Returned error: MetaMask Tx Signature: User denied transaction signature.") {
        return toast.error("User denied transaction signature.")
      }
      console.log(error);
    }
  }

  const updateOwnerOnBE = async () => {
    const value = {
      "nft_owner": address
    }
    const data = await axios.put(`${API_URL}/update-nft/${nftData.nfttoken}/${nftData.collection_id}`, value, { withCredentials: true })
    const datas = {
      ownerAddress: address,
      tokenId: nftData.nfttoken,
      collectionId: nftData.collection_id
    }
    nftOwner(datas)
    setTransferDone(true)
    getReceiverData()
    setLoading(false)
    toast.success("Transfer successfuly")
  }

  // get receiver acc data

  const getReceiverData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/oneuser/${address}`)
      sendNfDNotificationReceiver(data.user._id)
      sendNfDNotificationSender(data.user._id)

    } catch (error) {
      console.log(error);
    }
  }

  // setNotificaton  for nftowner
  const sendNfDNotificationSender = async (to) => {
    const formData = new FormData()
    formData.append("user", to)
    formData.append("notifyTo", user._id)
    formData.append("Distillery", nftData.nft_name)
    formData.append("notificationType", "transfernftsend")
    formData.append("pathname", nftData.pathname)
    formData.append("img", nftData.image)
    try {
      const notification = await axios.post(`${API_URL}/notification`, formData, { withCredentials: true })
    } catch (error) {
      console.log(error);
    }
  }
  // setNotificaton  for receiverowner
  const sendNfDNotificationReceiver = async (to) => {
    const formData = new FormData()
    formData.append("user", user._id)
    formData.append("notifyTo", to)
    formData.append("Distillery", nftData.nft_name)
    formData.append("notificationType", "transfernftreceiver")
    formData.append("pathname", nftData.pathname)
    formData.append("img", nftData.image)
    try {
      const notification = await axios.post(`${API_URL}/notification`, formData, { withCredentials: true })
    } catch (error) {
      console.log(error);
    }
  }

  // send owner data on BE

  const nftOwner = async (data) => {

    try {
      const owner = await axios.post(`${API_URL}/nft-owner`, { data })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_transfer">
              <div className="transfer_header">
                <h2>Transfer token</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="transfer_paragraph">
                <p>You can transfer tokens from your address to another</p>
              </div>
              <div className="transfer_address_header">
                <h3>Receiver address</h3>
              </div>
              <div>
                <input placeholder="Paste address" className="transfer_input" value={address} onChange={(e) => setAddress(e.target.value)} />
                <div className="transfer_border_div"></div>
              </div>
              {transferDone ? <div className="putonsale_button_div_Continue"><Link to={"/profile/collectibles"}>Done</Link></div> : <div className="putonsale_button_div_Continue" onClick={HandleTransfer}>
                <button disabled={loading}>{loading ? <CircleSpinner size={30} color="#ba00a7" /> : "Continue"}</button>
              </div>}
              {(loading || transferDone) ? "" : <div className="placebid3_button_div_cancel">
                <button>Cancel</button>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Transfertoken2({ setRemoveSale, bidDetails, user, nftData }) {
  const [cancel, setCancel] = useState(false);
  const [loading, setloading] = useState(false)
  const [done, setDone] = useState(false)
  const web3 = new Web3(window.ethereum);

  const handleCancel = () => {
    setCancel(!cancel);
    setRemoveSale(false)
  };

  if (cancel) {
    return null;
  }

  const handleRemoveSale = async () => {
    setloading(true)
    try {
      const marketContractAddress = "0x27951D68849A72a37e52d9E33e4541AF9CB432cE"
      const contractInstance = new web3.eth.Contract(
        MARKET_ABI,
        marketContractAddress
      );
      console.log(contractInstance);
      const limit = await contractInstance.methods.cancelReserveAuction(bidDetails.auctionId).estimateGas({ from: user.userid })
      const removeSale = await contractInstance.methods.cancelReserveAuction(bidDetails.auctionId).send(
        {
          from: user.userid,
          gasLimit: Number(limit) + 5000,
        })
      updateOwnerOnBE()
      setloading(false)
      setDone(true)
    } catch (error) {

      setloading(false)
      if (error.message == "Returned error: MetaMask Tx Signature: User denied transaction signature.") {
        return toast.error("User denied transaction signature.")
      }
      console.log(error);
    }
  }
  const updateOwnerOnBE = async () => {
    try {
      const value = {
        "nftOnsale": false
      }
      const data = await axios.put(`${API_URL}/update-nft/${nftData.nfttoken}/${nftData.collection_id}`, value, { withCredentials: true })
      sendnotificationRFS()
      deleteAuctionDate()
      toast.success(`you removed ${nftData.nft_name} onsale`)
    } catch (error) {
      console.log(error);
    }

  }
  // send notification to owner RFS -remove from sale
  const sendnotificationRFS = async () => {
    const formData = new FormData()
    formData.append("user", user._id)
    formData.append("notifyTo", user._id)
    formData.append("Distillery", nftData.nft_name)
    formData.append("notificationType", "removefromsale")
    formData.append("pathname", nftData.pathname)
    formData.append("img", nftData.image)
    try {
      const notification = await axios.post(`${API_URL}/notification`, formData, { withCredentials: true })
    } catch (error) {
      console.log(error);
    }
  }

  const deleteAuctionDate = async () => {
    try {
      const { data } = await axios.delete(`${API_URL}/delete-particular-action/${nftData.nfttoken}/${nftData.collection_id}`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_transfer">
              <div className="transfer_header">
                <h2>Remove from sale</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="transfer_paragraph2">
                <p>
                  Do you really want to remove your item from sale
                </p>
              </div>
              {
                done ? <div className="placebid3_button_div_cancel">
                  <Link to={"/profile/collectibles"} >Done</Link>
                </div> : <>
                  <div className="placebid3_button_div_cancel">
                    <button onClick={handleRemoveSale} disabled={loading}>{loading ? <CircleSpinner size={30} color="#ba00a7" /> : "Remove now"}</button>
                  </div>
                  {
                    loading ? "" : <div className="putonsale_button_div_Continue">
                      <button onClick={handleCancel}>Cancel</button>
                    </div>
                  }</>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Transfertoken3({ setBurnToken, nftData, user }) {
  const [cancel, setCancel] = useState(false);
  const [loading,setLoading]=useState(false)
  const [done,setDone]=useState(false)
  const web3 = new Web3(window.ethereum);
  console.log(user.userid);
  const handleCancel = () => {
    setCancel(!cancel);
    setBurnToken(false)
  };
  const nftContractAddress = nftData.collection_id
  const burnToken = async () => {
    try {
      setLoading(true)
      const tokenId = Number(nftData.nfttoken)
      console.log(tokenId);
      const contractInstance = new web3.eth.Contract(NFT_ABI, nftContractAddress);
      console.log(contractInstance);
       const limit = await contractInstance.methods.burn(tokenId).estimateGas({ from: user.userid })
      const burnNft = await contractInstance.methods.burn(tokenId).send(
        {
          from: user.userid,
          gasLimit: Number(limit) + 5000,
        })
        sendnotificationRFS()
        deleteNft()
        setLoading(false)
        setDone(true)
    } catch (error) {
      setLoading(false)
      if (error.message == "Returned error: MetaMask Tx Signature: User denied transaction signature.") {
        return toast.error("User denied transaction signature.")
      }
      console.log(errors);
    }

  }
  if (cancel) {
    return null;
  }

  const deleteNft = async () => {
   try {
    const {data} =await axios.delete(`${API_URL}/deletenft/${nftData.nfttoken}/${nftData.collection_id}`)
    
   } catch (error) {
    console.log(error);
   }
  }
  const sendnotificationRFS = async () => {
    const formData = new FormData()
    formData.append("user", user._id)
    formData.append("notifyTo", user._id)
    formData.append("Distillery", nftData.nft_name)
    formData.append("notificationType", "burnToken")
    formData.append("img", nftData.image)
    try {
      const notification = await axios.post(`${API_URL}/notification`, formData, { withCredentials: true })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_transfer">
              <div className="transfer_header">
                <h2>Burn token</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="transfer_paragraph2">
                <p>
                  Do you really want to remove your item from sale ?
                </p>
              </div>
              <div className="placebid3_button_div_cancel">
                {
                  done ?<Link to={"/profile/onsale"}>Done</Link>:
                  <button onClick={burnToken} disabled={loading}>{loading ? <CircleSpinner size={30} color="#ba00a7" /> : "Continue"}</button>
                }
              </div>
              <div className="placebid3_button_div_cancel">
               {
                (loading || done)  ? "": <button onClick={handleCancel}>Cancel</button>
               }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Transfertoken4({ setReportNft, user }) {
  const [cancel, setCancel] = useState(false);
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [reportDone, setReportDone] = useState(false)
  const handleCancel = () => {
    setCancel(!cancel);
    setReportNft(false)
  };

  if (cancel) {
    return null;
  }

  const handleClick = () => {
    if (!content) {
      return toast.error("Please Enter Some Content")
    }
    setLoading(true)
    const data = {
      user: user._id,
      content
    }
    sendReport(data)
  }

  const sendReport = async (data) => {
    try {
      const report = await axios.post(`${API_URL}/report`, data)
      toast.success("Successfully Reported")
      setReportDone(true)
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_transfer">
              <div className="transfer_header">
                <h2>Report</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="transfer_paragraph">
                <p>
                  Describe why you think this item should be removed from
                  marketplace
                </p>
              </div>
              <div className="transfer_messagebox">
                <p>Message</p>
                <div className="form_input_container">
                  <textarea
                    type="text"
                    className="transfer_messagebox_input"
                    placeholder="Tell us the details"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
              {
                reportDone ? <div className="placebid3_button_div_cancel margin">
                  <button onClick={handleCancel}>Done</button>
                </div> : <>  <div className="transfer_button_div_sendnow">
                  <button type="button" onClick={handleClick} disabled={loading}>{loading ? <CircleSpinner size={30} color="#ba00a7" loading={loading} /> : "Send Now"}</button>
                </div>
                  {
                    loading ? "" : <div className="placebid3_button_div_cancel">
                      <button>Cancel</button>
                    </div>
                  }

                </>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Share({ setShare, nftData }) {
  const [url, setUrl] = useState("")
  useEffect(() => {
    const currentUrl = window.location.href;
    setUrl(currentUrl)
  }, [])
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
    setShare(false)
  };

  if (cancel) {
    return null;
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied Successfully');
  };


  const shareUrl = window.location.href;;
  const title = "Please share this";
  const imageUrl = nftData.image; // Replace with the URL of your image
  const instagramShareUrl = `https://telegram.me/share/url?url=${shareUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid3_Maindiv">
          <div className="placebid3">
            <div className="popup_transfer">
              <div className="transfer_header">
                <h2>Share The Link</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="transfer_paragraph">

              </div>
              <div className="transfer_messagebox background">
                <div className="form_input_container background">
                  <input
                    type="text"
                    value={`${url.substring(0, 30)}....${url.substring(103)}`}
                    className="transfer_messagebox_input share"
                    placeholder="Tell us the details"
                  />

                </div>
                <FaCopy className="icon" onClick={handleCopyClick} />
              </div>
              <div className="share_social_media_icon">
                <a
                  href={facebookShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="icons" />
                </a>
                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsTwitterX className="icons" />
                </a>
                <a
                  href={instagramShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTelegram className="icons" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


