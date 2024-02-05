import React, { useEffect, useRef, useState } from "react";
import "./SingleCollectible.css";
import arrow from "../../asserts/images/arrow-left (1) 1.png";
import upload from "../../asserts/images/upload (1) 1.png";
import image2 from "../../asserts/images/WhatsApp Image 2023-07-27 at 6.37 6.png";
import cancel from "../../asserts/images/x-circle (1) 1.png";
import { AiOutlineLeft } from "react-icons/ai";
import N from "../../Assets/N.png";
import plus from "../../Assets/plus (1) 1.png";
import SingleCollectiblePopup from "../single_collectible_popup/SingleCollectiblePopup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import { Ipfs } from "../../Config/IpfsId";
import { Buffer } from "buffer";
import { useSelector } from "react-redux";
import { Contract } from "../../Config/Contract";
import COLLECTION_ABI from "./../../Config/Abi/create_collection.json";
import NFT_ABI from "./../../Config/Abi/nft_abi.json";
import { create } from "ipfs-http-client";
import { toast } from "react-toastify";
import { CircleSpinner } from "react-spinners-kit";
import { API_URL } from "../../constants/userConstants";
import { NotWhitListUserPopup } from "../../components/Upload/UploadNotification";

const SingleCollectible = () => {
  const navigate = useNavigate()
  const web3 = new Web3(window.ethereum);
  const [notWhitListPopup, setNotWhiteListPopup] = useState(false)
  const [mintLoading, setMintLoading] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [tokenId, setTokenId] = useState("")
  const [ipfsData, setIpfsData] = useState("")
  const { user } = useSelector((selector) => selector.auth);
  const [ipfsImageHash, SetIpfsImageHash] = useState("");
  const [collection, setCollection] = useState([]);
  const [account, setAccount] = useState();
  const [allcollection, setAllCollection] = useState("");
  const [putonsale, setPutonsale] = useState(false);
  const [instantsale, setInstantsale] = useState(false);
  const [unlock, setUnlock] = useState(false);
  const [imageUrl, setImageUrl] = useState("")
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [nftToken, setNftToken] = useState("");
  const [putOnSaleOpen, setPutOnSaleOpen] = useState(false);
  const [instantsaleOpen, setInstantsaleOpen] = useState(false);
  const [nftdata, setNftData] = useState({})
  const [collectionData, setCollectionData] = useState({
    singlecollectible_name: "",
    singlecollectible_date: "",
    singlecollectible_description: "",
    singlecollectible_additionalDetails: "",
    singlecollectible_itemsdetails: "",
  });
  const [imagefile, setImageFile] = useState([]);
  const inputImage = useRef(null);
  const handleClick = () => {
    inputImage.current.click();
  };
  // get singleCollection data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollectionData({
      ...collectionData,
      [name]: value,
    });
  };

  const handleChangeImg = (e) => {
    try {
      const files = e.target.files;
      const selectedFile = files[0];
      setImageFile(selectedFile);
      console.log(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      imageUpload(files[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // send req in backend and store in db
  const createNftDetails = async (nfthash, token, type) => {
    const formData = new FormData();
    formData.append("collection_id", collection.collectionId);
    formData.append("nft_token", token);
    formData.append("nft_name", collectionData.singlecollectible_name);
    formData.append("nft_owner", account);
    formData.append("image_hash", ipfsImageHash);
    formData.append("nfthashvalue", nfthash);
    formData.append("nft_date", collectionData.singlecollectible_date);
    formData.append(
      "nft_description",
      collectionData.singlecollectible_description
    );
    formData.append(
      "nft_additionalDetails",
      collectionData.singlecollectible_additionalDetails
    );
    formData.append(
      "nft_itemsdetails",
      collectionData.singlecollectible_itemsdetails
    );
    formData.append("pathname", `/item-1/${nfthash}/${token}/${collection.collectionId}`);
    formData.append("type", type);
    formData.append("image", imagefile);
    formData.append("nft_creator", account);

    try {
      const { data } = await axios.post(
        `${API_URL}/new-single-collection`,
        formData,
        {
          withCredentials: true,
        }
      );
      setNftData(data.nftData)
    } catch (error) {
      console.log(error);
    }
  };

  // upload image in ipfs and get the image in hashvalue
  async function imageUpload(file) {
    const result = await ipfs.add(
      { path: "/nft.jpg", content: file },
      { wrapWithDirectory: true, pin: true }
    );

    SetIpfsImageHash(result.cid.toString());
  }

  // const getIpfsImage = async () => {
  //   const imageHash = await imageUpload(files[0]);
  // };

  // request for ipfs

  const projectID = Ipfs.IpfsprojectID;
  const projectSecret = Ipfs.IpfsprojectSecret;
  const auth = "Basic " + Buffer.from(projectID + ":" + projectSecret).toString("base64");
  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  // ipfs sending data
  const ipfsDataSend = async () => {
    if (putOnSaleOpen == true) {
      setMintLoading(true)
    }
    let metadata = {
      collectionName: `${collection.name}`,
      nft_name: `${collectionData.singlecollectible_name}`,
      nft_imagehash: `${ipfsImageHash}`,
      nft_date: `${collectionData.singlecollectible_date}`,
      nft_description: `${collectionData.singlecollectible_description}`,
      nft_additionalDetails: `${collectionData.singlecollectible_additionalDetails}`,
      nft_itemsdetails: `${collectionData.singlecollectible_itemsdetails}`,
      nft_creator: `${account}`,
    };
    const metaData1 = JSON.stringify(metadata);
    try {
      const ipfsData = await ipfs.add(
        { path: "/metadata.json", content: metaData1 },
        { wrapWithDirectory: true, pin: true }
      );
      setIpfsData(ipfsData.cid.toString())
      if (putOnSaleOpen === true || instantsaleOpen === true) {
        return mintAndApproveMarket(ipfsData.cid.toString())
      }

      createSingleCollection(ipfsData.cid.toString());
      // createNewSingleCollection(ipfsData.cid.toString());
    } catch (error) {
      console.log(error);
    }
  };

  // this handleSubmit function is call when the create collection button is clickeds
  const handleSubmit = (e) => {
    e.preventDefault();
    // createNewSingleCollection();
    if (!collectionData.singlecollectible_name && !collectionData.singlecollectible_date && !collectionData.singlecollectible_additionalDetails && !collectionData.singlecollectible_description && !collectionData.singlecollectible_itemsdetails && !imagefile.name && !collection.length) {
      return toast.error("Please enter the all fields")
    }
    if (!collectionData.singlecollectible_name) {
      return toast.error("Please enter the Name field");
    }

    if (!collectionData.singlecollectible_date) {
      return toast.error("Please enter the Date field");
    }

    if (!collectionData.singlecollectible_additionalDetails) {
      return toast.error("Please enter the Additional Details field");
    }

    if (!collectionData.singlecollectible_description) {
      return toast.error("Please enter the Description field");
    } else if (collectionData.singlecollectible_description.length < 50) {
      return toast.error("Please write a minimum of 50 characters in the Description field");
    }

    if (!collectionData.singlecollectible_itemsdetails) {
      return toast.error("Please enter the Item Details field");
    }

    if (!imagefile || !imagefile.name) {
      return toast.error("Please select an image");
    }
    if (collection.length == 0) {
      return toast.error("Please select a collection");
    }
    if (putonsale == true || instantsale == true) {
      return setPutOnSaleOpen(true)
    }
    ipfsDataSend();
  };

  const createSingleCollection = async (hashmetaData) => {
    setLoading(true)

    try {
      const nftContractAddress = collection.collectionId;
      const ipfsHash = hashmetaData;
      const royalty = 0;
      const marketContract = "0x27951D68849A72a37e52d9E33e4541AF9CB432cE";
      // Contract instance
      const contractInstance = new web3.eth.Contract(
        NFT_ABI,
        nftContractAddress
      );

      // Call a function of the contract:
      const data = await contractInstance.methods
        .mint(ipfsHash, royalty, marketContract)
        .send({
          from: account,
        });
      console.log(data);
      console.log(data.logs[3]);
      if (data.transactionHash) {
        createNftDetails(hashmetaData, Number(data.logs[0].topics[3]), "mint")
        // send this value in for in app notification
        const pathname = `/item-1/${hashmetaData}/${Number(data.logs[0].topics[3])}/${nftContractAddress}`
        const datas = {
          ownerAddress: user.userid,
          tokenId: Number(data.logs[0].topics[3]),
          collectionId: collection.collectionId
        }
        nftOwner(datas)
        mintNotification(pathname)
        setLoading(false)
        navigate("/profile/created")
        toast.success("successfully minted")
      }
    } catch (error) {
      setLoading(false)
      if (error.message == "Returned error: MetaMask Tx Signature: User denied transaction signature.") {
        return toast.error("User denied transaction signature.")
      }
      console.log(error);
    }
  };
  // mint notification

  const mintNotification = async (pathname) => {
    const formData = new FormData()
    formData.append("user", user?._id)
    formData.append("notifyTo", user?._id)
    formData.append("Distillery", collectionData.singlecollectible_name)
    formData.append("notificationType", "mint")
    formData.append("pathname", pathname)
    formData.append("image", imagefile)

    try {
      const notification = await axios.post(`${API_URL}/notification`, formData, { withCredentials: true })
    } catch (error) {
      console.log(error);
    }
  }

  const mintAndApproveMarket = async (hashmetaData) => {

    try {
      const nftContractAddress = collection.collectionId;
      const ipfsHash = hashmetaData;
      const royalty = 0;
      const marketContract = "0x27951D68849A72a37e52d9E33e4541AF9CB432cE";

      // contract istance 
      const contractInstance = new web3.eth.Contract(
        NFT_ABI,
        nftContractAddress
      )
      console.log(contractInstance);
      // find gas limit 
      let limit = await contractInstance.methods
        .mintAndApproveMarket(ipfsHash, royalty, marketContract).estimateGas({ from: account })
      console.log(limit);
      // Call a funtion of the contract
      const PutOnsaleMint = await contractInstance.methods.mintAndApproveMarket(ipfsHash, royalty, marketContract).send({
        from: account,
      })

      setTokenId(Number(PutOnsaleMint.logs[0].topics[3]));
      const type = instantsale ? "instantSale" : "putonsale"
      createNftDetails(hashmetaData, Number(PutOnsaleMint.logs[0].topics[3]), type)
      const datas = {
        ownerAddress: user.userid,
        tokenId: Number(PutOnsaleMint.logs[0].topics[3]),
        collectionId: collection.collectionId
      }
      nftOwner(datas)
      toast.success("successfully minted")

      setMintLoading(false)

      setMintSuccess(true)
    } catch (error) {
      setMintLoading(false)
      if (error.message == "Returned error: MetaMask Tx Signature: User denied transaction signature.") {
        return toast.error("User denied transaction signature.")
      }
      console.log(error);

    }
  }
  useEffect(() => {
    setNftData(nftdata)
  }, [nftdata])

  const notWhiteListUser = () => {
    if (user?.whiteListUser == false) {
      setNotWhiteListPopup(true)
      toast.error("your are unAuthorized to create collection ")
    } else {
      navigate("/create_collection_Page")
    }
  }

  // clear all function 

  const clearAllFunction = () => {

    setCollectionData({
      ...collectionData,
      singlecollectible_name: "",
      singlecollectible_date: "",
      singlecollectible_description: "",
      singlecollectible_additionalDetails: "",
      singlecollectible_itemsdetails: "",
    });
    setCollection("")


  }
  const nftOwner = async (data) => {

    try {
      const owner = await axios.post(`${API_URL}/nft-owner`, { data })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const goBack = () => {
    window.history.back();
  };

  const getCollection = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/login-user-collection/${user._id}`, { withCredentials: true })
      setAllCollection(data.collection)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      setAccount(user.userid)
      getCollection()
    }
  }, [])
  return (
    <div className="singlecollectible">
      <div>
        {notWhitListPopup ? <NotWhitListUserPopup /> : (putOnSaleOpen || instantsaleOpen) && <SingleCollectiblePopup setPutOnSaleOpen={setPutOnSaleOpen}
          collectionId={collection.collectionId} ipfsDataSend={ipfsDataSend} mintLoading={mintLoading}
          mintSuccess={mintSuccess} tokenId={tokenId} account={account}
          imagefile={imagefile} ipfsData={ipfsData} ipfsImageHash={ipfsImageHash}
          collectionname={collectionData.singlecollectible_name} instantsale={instantsale} collection_description={collectionData.singlecollectible_description} user={user} loading={loading} />}
      </div>
      <div className="singlecollectible_container">
        <div className="singlecollectible_heading">
          <img src={arrow} className="singlecollection_backarrow" onClick={goBack} alt="" />
          <AiOutlineLeft className="singlecollection_mobilebackarrow" />
          <h3>Create single collectible</h3>
        </div>
        <div className="singlecollectible_Upload_responsive">

        </div>
        <div className="singlecollectible_contant_container">
          <form onSubmit={handleSubmit} className="singlecollectible_left">
            <div className="singlecollectible_Upload">
              <h4>Upload</h4>

            </div>
            <p>Drag or choose your file to upload</p>
            <div
              className="singlecollectible_image_upload"
              onClick={handleClick}
            >
              <input
                type="file"
                id="file"
                ref={inputImage}
                onChange={handleChangeImg}
              />
              <div className="image_upload">
                <img src={upload} alt="" />
                <p>PNG,WEBP,MP4</p>
              </div>
            </div>
            <h3>Item details</h3>
            <div className="singlecollectible_groupinput">
              <div className="singlecollectible_input">
                <p>Name</p>
                <div>
                  <input
                    type="text"
                    name="singlecollectible_name"
                    value={collectionData.singlecollectible_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="singlecollectible_input">
                <p>Date</p>
                <div>
                  <input
                    type="date"
                    name="singlecollectible_date"
                    value={collectionData.singlecollectible_date}
                    className="white-date-input"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="singlecollectible_input">
                <p>
                  Description
                </p>
                <div>
                  <input
                    type="text"
                    name="singlecollectible_description"
                    onChange={handleChange}
                    value={collectionData.singlecollectible_description}
                  />
                </div>
              </div>{" "}
              <div className="singlecollectible_input">
                <p>
                  Additional Details
                </p>
                <div>
                  <input
                    type="text"
                    name="singlecollectible_additionalDetails"
                    onChange={handleChange}
                    value={collectionData.singlecollectible_additionalDetails}
                  />
                </div>
              </div>
              <div className="singlecollectible_input borders">
                <p>
                  Item detail
                </p>
                <div>
                  <input
                    type="text"
                    name="singlecollectible_itemsdetails"
                    onChange={handleChange}
                    value={collectionData.singlecollectible_itemsdetails}
                  />
                </div>
              </div>
            </div>
            <div className="singlecollectible_toggle_btns1">
              <div className="singlecollectible_toggle_btn1">
                <p>Put on sale</p>
                <label className={`toggle_btn1 ${instantsale ? "disabled" : ""}`}>
                  <input
                    type="checkbox"
                    disabled={instantsale}
                    onChange={() => setPutonsale(!putonsale)}
                    name="singlecollectible_putonsale"
                  />
                  <span className="toggle_btn1_slider"></span>
                </label>
              </div>
              <p>You will receive bids on this item</p>
            </div>
            <div className="singlecollectible_toggle_btns1">
              <div className="singlecollectible_toggle_btn1">
                <p>Instant sale price</p>
                <label className={`toggle_btn1 ${putonsale ? "disabled" : ""}`}>
                  <input
                    type="checkbox"
                    disabled={putonsale}
                    onChange={() => setInstantsale(!instantsale)}
                    name="singlecollectible_instantsaleprice"
                  />
                  <span className="toggle_btn1_slider btn2"></span>
                </label>
              </div>
              <p>Enter the price for which the item will be instantly sold</p>
            </div>

            <div className="singlecollectible_choose_col">
              <h4>Choose collection</h4>
              <p>Choose an exiting collection or a create new one</p>
              <div className="singlecollectible_choose_col_card">
                <div>
                  <button onClick={notWhiteListUser} className="card1" type="button">
                    <div className="plus_round_div">
                      <img src={plus} className="plus_icon" />
                    </div>
                    <p>Create</p>
                  </button>
                </div>
                {allcollection &&
                  allcollection.map((item, id) => {
                    return (
                      <div key={id}>
                        <div
                          className={
                            collection == item ? "card1 clicked" : "card1"
                          }
                          onClick={() => setCollection(item)}
                        >
                          <div className="plus_round_div">
                            <img src={N} className="N_icon" />
                          </div>
                          <p>{item.collectiontitle}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="singlecollectible_create_item">

                {loading ? <div>
                  <button disabled={loading}><CircleSpinner size={30} color="#f1f1f1" /> </button>
                </div> : <input type="submit" value={"Submit"} />}
                {/* <p>Auto save</p> */}
              </div>
            </div>
          </form>
          <div className="singlecollectible_right">
            <div className="singlecollectible_right_container">
              <h2>Preview</h2>
              <p>Details you have entered</p>
              <div className="singlecollectible_right_card">
                {preview ? (
                  <img src={preview} alt="" />
                ) : (
                  <img src={image2} alt="" />
                )}
                <div className="singlecollectible_right_card_detail">
                  <h4>{collectionData.singlecollectible_name}</h4>
                  {
                    (collectionData.singlecollectible_description.length < 100) ? <p>{collectionData.singlecollectible_description}</p> : <p>{collectionData.singlecollectible_description.substring(0, 100)}..</p>
                  }
                </div>
                <div className="singlecollectible_right_card_bottom" onClick={clearAllFunction}>
                  <p>Clear details </p>
                  <img src={cancel} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCollectible;
