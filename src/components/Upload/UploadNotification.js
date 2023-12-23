import React, { useEffect, useState } from "react";
import "./UploadNotification.css";
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
import axios from "axios";
// import { CircleSpinner } from "react-spinners-kit";
import { Link, useNavigate } from "react-router-dom";
import NFT_ABI from "./../../Config/Abi/nft_abi.json";
import { API_URL } from "../../constants/userConstants";
export default function UploadNotification({ tokenId, collectionId, account,collection_description, imagefile, ipfsData, ipfsImageHash, collectionname,nftdata }) {
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
      formData.append("description",collection_description)
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
                <h2 onClick={() => setCancel(true)}>
                  <SlClose className="wrong_icon" />
                </h2>
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
                  auctionDone ? <Link to={"/profile"} className="btn">Done</Link> : <button onClick={handleCancel} disabled={loading} >{loading ? <CircleSpinner size={30} color="#ba00a7" loading={loading} /> : "START AUCTION"}</button>
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
  const [cancel, setCancel] = useState(false);
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [auctionDone, setAuctionDone] = useState(false)
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
  return (
    <>
      <div className="home_popup_background">
        <div className="placebid2_Maindiv">
          <div className="placebid2">
            <div className="popup_placrbid2">
              <div className="popup_header">
                <h2>Put on sale</h2>
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="popup_payment_div">
                <div className="popup_payment">
                  <p>Enter Price</p>

                </div>
                <div className="popup_payment_div">
                  <input type="number" className="ppopup_input" placeholder="Minimum Bid Price" name="bidamount" value={amount} onChange={(e) => setAmount((e.target.value))} />
                </div>
                <div className="popup_payment">
                  <p>Service fee</p>
                  <p className="griedient_text">0 ETH</p>
                </div>
                <div className="popup_payment">
                  <p>Total bid amount</p>
                  <p className="griedient_text">0 ETH</p>
                </div>
              </div>
              <div className="popup_button">
                {auctionDone ? <Link to={"/profile/onsale"} className="btn">Done</Link> : <button disabled={loading} onClick={handleSubmit}>{loading ? <CircleSpinner size={30} color="#ba00a7" loading={loading} /> : "START AUCTION"}</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PlaceBid({ setBidPopup, user, auctionDetails }) {
  const [loading, setLoading] = useState(false)
  const [bidDone, setBidDone] = useState(false)
  const [cancel, setCancel] = useState(false);
  const [price, setPrice] = useState("")
  const web3 = new Web3(window.ethereum);
  const account = user.userid
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
      ); console.log(amount);
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
      if (error.message == "Returned error: MetaMask Tx Signature: User denied transaction signature.") {
        setLoading(false)
        return toast.error("User denied transaction signature.")
      }
      console.log(error);
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
    placeBid()
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
                  <p className="griedient_text">0 ETH</p>
                </div>
                <div className="popup_payment">
                  <p>Total bid amount</p>
                  <p className="griedient_text">0 ETH</p>
                </div>
              </div>
              <div className="popup_button">
                {
                  bidDone ? <div>
                    <button>Done</button>
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

export function UploadNotification3({ setPurchasePopup }) {
  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(!cancel);
    setPurchasePopup(false)
  };

  if (cancel) {
    return null;
  }

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
                <h2 onClick={handleCancel}>
                  <SlClose className="wrong_icon" />
                </h2>
              </div>
              <div className="popup_header3_paragraph">
                <p>
                  You successfully purchased{" "}
                  <span className="griedient_text">monalisa#88/208</span> from
                  Chronical verse
                </p>
              </div>
              <div className="popup_box_div3">
                <div className="popup_box3">
                  <div className="popup_box_div3_heading">
                    <div>Status</div>
                    <div>Transaction ID</div>
                  </div>
                  <div className="popup_box_div3_paragraph">
                    <div className="griedient_text">Processing</div>
                    <div className="pop3_id">0SJhBVSHH...SDGYVGY</div>
                  </div>
                </div>
              </div>
              <div className="pop_continue">
                <Link to={"/profile/collectibles"}>Done</Link>
              </div>
              <div className="SocialMedia_font_div">
                <div className="facebook_div">
                  <img src={facebook} />
                </div>
                <div className="facebook_div">
                  <img src={twitter} />
                </div>
                <div className="facebook_div">
                  <img src={instagram} />
                </div>
                <div className="facebook_div">
                  <img src={Pinterest} />
                </div>
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
      if (error.message == "Returned error: MetaMask Tx Signature: User denied transaction signature.") {
        setLoading(false)
        return toast.error("User denied transaction signature.")
      }
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
      setLoading(false)
      getNftOwner()
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
  return (
    <>
      {
        directSaleDone ? <UploadNotification3 setPurchasePopup={setPurchasePopup} /> : <div className="home_popup_background">
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
                    <p className="griedient_text">0 ETH</p>
                  </div>
                  <div className="popup_payment">
                    <p>Total  amount</p>
                    <p className="griedient_text">{nftData.amount}</p>
                  </div>
                </div>
                <div className="placebid3_button_div_cancel">
                  <button onClick={handleClick} disabled={loading} > {loading ? <CircleSpinner size={30} color="#ba00a7" /> : "I UNDERSTAND, CONTINUE"}</button>
                </div>
                <div className=" placebid3_button_div_startnow">
                  {
                    loading ? "" : <button onClick={handleCancel}>Cancelled</button>
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
  const [acceptBid,setAcceptDone]=useState()
  const account = user.userid
  console.log(bidDetails);
  const handleCancel = () => {
    setCancel(!cancel);
    setAcceptBidModel(false)

  };

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
      setloading(false)
      toast.success(`you accept the Bid value`)
    } catch (error) {
      setloading(false)
      if (error.message == "Returned error: MetaMask Tx Signature: User denied transaction signature.") {

        return toast.error("User denied transaction signature.")
      }
      console.log(errors);
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
                  <p>{bidDetails.bidprice} for 1 edition</p>
                </div>
                <div className="popup_line_div"></div>
                <div className="popup_payment">
                  <p>Service fee</p>
                  <p className="griedient_text">0 ETH</p>
                </div>
                <div className="popup_payment">
                  <p>Total bid amount</p>
                  <p className="griedient_text">{bidDetails.bidprice} MATIC</p>
                </div>
              </div>
              <div className="placebid3_button_div_cancel">
                <button onClick={acceptBidFunction} disabled={loading}> {loading ? <CircleSpinner size={30} color="#ba00a7" /> : "Accept bid"}</button>
              </div>

              {
                loading ? "" : <div className="placebid3_button_div_startnow">
                  <button>Cancelled</button>
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

export function PutOnsale5() {
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
                <div className="aprove_div">
                  <img src={FileUpload} />
                </div>
                <div className="Placebid_3_rightcontent">
                  <div className="Purchase_header">Approve</div>
                  <div className="Purchase_paragraph">
                    Approve performing transactions with your wallet{" "}
                  </div>
                </div>
              </div>
              <div className="putonsale_button_div_Failed">
                <button>Failed</button>
                <div className="failed_paragraph">
                  Something went wrong, please try again
                </div>
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

  const HandleTransfer = async () => {
    if (!address) {
      return toast.error("Please Enter the To Address")
    }
    setLoading(true)
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
              {transferDone ? <div className="putonsale_button_div_Continue"><button>Done</button></div> : <div className="putonsale_button_div_Continue" onClick={HandleTransfer}>
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
              <div className="placebid3_button_div_cancel">
                <button onClick={handleRemoveSale}>{loading ? <CircleSpinner size={30} color="#ba00a7" /> : "Remove now"}</button>
              </div>
              {
                loading ? "" : <div className="putonsale_button_div_Continue">
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

export function Transfertoken3({ setBurnToken, nftData, user }) {
  const [cancel, setCancel] = useState(false);
  const web3 = new Web3(window.ethereum);

  const handleCancel = () => {
    setCancel(!cancel);
    setBurnToken(false)
  };
  const nftContractAddress = Contract.ChronicleVerseNFT
  const burnToken = async () => {
    try {
      const tokenId = nftData.nfttoken
      const contractInstance = new web3.eth.Contract(NFT_ABI, nftContractAddress);
      let limit = await contractInstance.methods
        .burn(tokenId)
        .estimateGas({ from: user.userid });
    } catch (error) {
      console.log(errors);
    }

  }
  if (cancel) {
    return null;
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
                  Do you really want to remove your item from sale ? You can put
                  it on sale anytime
                </p>
              </div>
              <div className="transfer_button_div_Continue">
                <button onClick={burnToken}>Continue</button>
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

export function Transfertoken4() {
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
                  />
                </div>
              </div>
              <div className="transfer_button_div_sendnow">
                <button>Send now</button>
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
