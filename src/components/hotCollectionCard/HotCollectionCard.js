import React, { useEffect, useState } from 'react'
import heart from "../../asserts/images/heart.png";
import { Link } from 'react-router-dom';
import "./HotCollectionCard.css"
import Web3 from "web3";
import NFT_API from "./../../Config/Abi/nft_abi.json";
import "./HotCollectionCard.css"
import { Contract } from '../../Config/Contract';
// const HotCollectionCard = ({ data }) => {
//   const web3 = new Web3(window.ethereum);
//   const [name,setName]=useState("")
//  async function getUserCollections() {
//     try {
//       let collectionContractAddress = data.lastDocument.collection_id//Metamask logged in Address
//       const contractInstance = new web3.eth.Contract(
//         NFT_API,
//         collectionContractAddress
//       );
//       console.log(contractInstance);
//       const collectionName=await contractInstance.methods.name().call()
//       setName(collectionName)
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     getUserCollections()
//   }, [data])
//   return (
//     <div className="ProfileCard homepage">
//       <div className='ProfileCard_image_container'>
//         <div className='ProfileCard_image_count'>
//           + {data.documentCount - 1}
//         </div>
//         <img src={data.lastDocument?.image} alt="" />
//       </div>
//       <div className="ProfileCard_name">
//         <p>{name?name:""}</p>
//         <div className="heart_value">
//         </div>
//       </div>
//       <div className="ProfileCard_paragraph">
//         <p>
//           {`${data.lastDocument?.nft_description.substring(0, 95)} ...`}
//         </p>
//       </div>
//       <div className="ProfileCard_bid">
//       </div>
//       <div className="ProfileCard_bid_dollor">
//         <p>{data.lastDocument?.price_USD}</p>
//       </div>
//       <Link to={`hotcollection/${data.lastDocument.collection_id}`}>View Collection </Link>
//     </div>
//   );
// }

// export default HotCollectionCard


import { AiFillHeart } from "react-icons/ai";

export default function HotCollectionCard({ data }) {
  const web3 = new Web3(window.ethereum);
  const [name, setName] = useState("")
  async function getUserCollections() {
    try {
      let collectionContractAddress = data.lastDocument.collection_id//Metamask logged in Address
      const contractInstance = new web3.eth.Contract(
        NFT_API,
        collectionContractAddress
      );
      console.log(contractInstance);
      const collectionName = await contractInstance.methods.name().call()
      setName(collectionName)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserCollections()
  }, [data])
  return (
    <div className="Card2">
      <div className="topnft_card2_div">
        <div className="topnft_card2">
          <div className="topnft_img2">
            <img src={data.lastDocument?.image} />
            <div className='ProfileCard_image_count'>+{data.documentCount - 1}
            </div>
          </div>
          <div className="topnftcard_content2">
            <div>
              <p>{name ? name : ""}</p>
            </div>
            <div
              style={{
                color: "#B8B8B8",
                fontSize: "0.8rem",
                display: "flex",
                gap: "5px",
              }}
            >

            </div>
          </div>
          <p className="topnftcard_content2_P"> {`${data.lastDocument?.nft_description.substring(0, 60)} ...`}</p>
          {/* <div className="topnftcard_content2_price">
            <div
              style={{ fontSize: "14px", fontWeight: "400", color: "white" }}
            >
              {item.leftText2}
            </div>
            <div>
              <div className="griedient_text_card">{item.rightText2}</div>
              <div style={{ color: " #B8B8B8", fontSize: "0.8rem" }}>
                {item.rightText3}
              </div>
            </div>
          </div> */}
          <div className="topnftcard_button2">
            <Link to={`hotcollection/${data.lastDocument.collection_id}`}>View Collection </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
