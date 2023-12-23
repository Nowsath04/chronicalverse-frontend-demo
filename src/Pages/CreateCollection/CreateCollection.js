import React, { useEffect, useState } from "react";
import "./CreateCollection.css";
import { create } from "ipfs-http-client";
import arrow from "../../asserts/images/arrow-left (1) 1.png";
import banner_img from "../../asserts/images/WhatsApp Image 2023-07-27 at 6.43 4.png";
// import profile_img from "../../asserts/images/WhatsApp Image 2023-07-27 at 1.19 8.png";
import { Link, json, useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { Buffer } from "buffer";
import axios from "axios";
import { Contract } from "../../Config/Contract";
import Web3 from "web3";
import COLLECTION_ABI from "./../../Config/Abi/create_collection.json";
import { useSelector } from "react-redux";
import { Ipfs } from "../../Config/IpfsId";
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';
import { API_URL } from "../../constants/userConstants";


const CreateCollection = () => {
  const web3 = new Web3(window.ethereum);

  const navigate = useNavigate()

  const { user } = useSelector((selector) => selector.auth);
console.log(user);
  const [account, setAccount] = useState();
  let [loading, setLoading] = useState(false)
  const [ipfsHashValue, setIpfsHashValue] = useState("");
  const [collectionData, setCollectionData] = useState({
    collectiontitle: "",
    collectionurl: "",
    collectiondescription: "",
  });

  // get user account

  useEffect(() => {
    if (user) {
      setAccount(user.userid);
    }
  });

  // request for ipfs

  const projectID = Ipfs.IpfsprojectID;
  const projectSecret = Ipfs.IpfsprojectSecret;
  const auth =
    "Basic " + Buffer.from(projectID + ":" + projectSecret).toString("base64");
  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  // get collection Data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollectionData({
      ...collectionData,
      [name]: value,
    });
  };

  //send req in backend

  const creatNewCollection = async (ipfsData) => {
    const formData = new FormData();
    formData.append("collectiontitle", collectionData.collectiontitle);
    formData.append("collectionurl", collectionData.collectionurl);
    formData.append(
      "collectiondescription",
      collectionData.collectiondescription
    );
    formData.append("ipfshashvalue", ipfsData);
    const data = await axios.post(
      `${API_URL}/new-collection`,
      formData,
      {
        withCredentials: true,
      }
    );
  };

  // ipfs sending data

  const ipfsDataSend = async () => {
    setLoading(true)
    let metadata = {
      collectiontitle: `${collectionData.collectiontitle}`,
      collectionurl: `${collectionData.collectionurl}`,
      collectiondescription: `${collectionData.collectiondescription}`,
    };

    const metaData1 = JSON.stringify(metadata);
    try {
      const ipfsData = await ipfs.add(
        { path: "/metadata.json", content: metaData1 },
        { wrapWithDirectory: true, pin: true }
      );
      createCollection(ipfsData.cid.toString());
    } catch (error) {
      console.log(error);
    }
  };

  // this handleSubmit function is call when the create collection button is clicked

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!collectionData.collectiontitle && !collectionData.collectionurl && !collectionData.collectiondescription) {
      return toast.error("Please enter all fields")
    }
    if (!collectionData.collectiontitle) {
      return toast.error("Please enter Collection Title")
    } if (!collectionData.collectionurl) {
      return toast.error("Please enter Collection Url")
    } if (!collectionData.collectiondescription) {
      return toast.error("Please enter Collection Description")
    }
    ipfsDataSend();
  };

  // contract for create new collection

  const createCollection = async (hashmetaData) => {
    try {
      const collectionContractAddress = Contract.collectionContract;
      let collectionName = collectionData.collectiontitle; // Replace
      let ipfsHash = hashmetaData; //Replace
      const contractInstance = new web3.eth.Contract(
        COLLECTION_ABI,
        collectionContractAddress
      );
      console.log("collectionContractAddress", contractInstance);
      // Find gas limit
      const limit = await contractInstance.methods
        .createCollection(collectionName, ipfsHash)
        .estimateGas({ from: account });
      const adjustedGasLimit = Number(limit) + Number(5000);
      console.log("limit", limit);
      const createCollection = await contractInstance.methods
        .createCollection(collectionName, ipfsHash)
        .send({
          from: account,
        });
      console.log("createCollection", createCollection);
      creatNewCollection(hashmetaData);
      getNotification(collectionName)
      toast.success("Collection created successfully")
      navigate("/createsinglecollection")
    } catch (error) {
      setLoading(false);
      if (error.message == "Returned error: MetaMask Tx Signature: User denied transaction signature.") {
        return toast.error("User denied transaction signature.")
      }
      if (error.data.message == "execution reverted: Collection Master : COLLECTION_EXISTS") {
        toast.error("Collection Name is already exists")
      }
    }
  };

  const getNotification = async (collectionName) => {
    let body2 = {
      user: user?._id,
      notifyTo:user?._id,
      Distillery: collectionName,
      notificationType: "newcollection",
    };
    try {
      const notification = await axios.post(`${API_URL}/notification`, body2)
    
    } catch (error) {
console.log(error);
    }
  }


  return (

    <>
      {
        loading ? <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "90vh",
            alignItems: "center",
          }}
        >
          <ReactLoading
            type={"spin"}
            color={"#c100a2"}
            height={"5%"}
            width={"5%"}
          />
        </div> :

          <div className="create_collection">
            <div className="create_collection_container">
              <div className="create_collection_heading">
                <img src={arrow} className="backarrow" />
                <AiOutlineLeft className="createcollectionpage_mobilebackarrow" />
                <p>Create collection page</p>
              </div>
              <form
                className="create_collection_form_container"
                onSubmit={handleSubmit}
              >
                <div className="create_collection_image">
                  <img
                    src={banner_img}
                    alt=""
                    className="create_collection_bannerimg"
                  />
                </div>
                <div className="create_collection_input_group">
                  <p>Collection title</p>
                  <div className="create_collection_input">
                    <input
                      type="text"
                      name="collectiontitle"
                      value={collectionData.collectiontitle}
                      onChange={handleChange}
                    />
                  </div>
                  <p>Collection url</p>
                  <div className="create_collection_input">
                    <input
                      type="text"
                      name="collectionurl"
                      value={collectionData.collectionurl}
                      onChange={handleChange}
                    />
                  </div>
                  <p>Collection description</p>
                  <div className="create_collection_input_textarea">
                    <textarea
                      type="text"
                      name="collectiondescription"
                      value={collectionData.collectiondescription}
                      onChange={handleChange}
                    />
                  </div>
                  <input type="submit" value="Create collection" />
                </div>
              </form>
            </div>
          </div>
      }
    </>
  );
};

export default CreateCollection;
