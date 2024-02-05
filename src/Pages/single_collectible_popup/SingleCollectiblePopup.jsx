import React, { useState } from "react";
import "./SingleCollectiblePopup.css";
import Cancel from "../../asserts/images/x-circle (1) 1.png";
import upload from "../../asserts/images/Line.png";
import pencil from "../../asserts/images/pencil.png";
import bag from "../../asserts/images/bag.png";
import Checkplacebid from "../../Assets/Checkplacebid.png";
import Placebid2, { Placebid3 } from "../../components/Upload/UploadNotification"
import { useEffect } from "react";
const SingleCollectiblePopup = ({ setPutOnSaleOpen, user, ipfsDataSend, mintLoading, collection_description, mintSuccess, tokenId, collectionId, account, imagefile, ipfsData, ipfsImageHash, collectionname, instantsale, nftdata }) => {
  console.log(collectionId);
  useEffect(() => {
    if (mintSuccess) {
      setminting(true)
    }
  })
  const [cancel, setCancel] = useState(false);
  const [putOnsale, setPutOnSale] = useState(false)
  const [directSale, setDirectSale] = useState(false)
  const [minting, setminting] = useState(false)
  const handleCancel = () => {
    setPutOnSaleOpen(false);
  };
  if (cancel) {
    return null;
  }
  const handleClick = () => {

    if (instantsale === true) {
      return setDirectSale(true)
    }
    setPutOnSale(true)
  }
  console.log("nftdata", nftdata);

  return (
    <>
      {
        putOnsale ? <Placebid2 tokenId={tokenId} collection_description={collection_description} collectionId={collectionId} account={account} imagefile={imagefile} ipfsData={ipfsData} ipfsImageHash={ipfsImageHash} collectionname={collectionname} nftdata={nftdata} /> : directSale ?
          <Placebid3 tokenId={tokenId} user={user} collectionId={collectionId} account={account} collectionname={collectionname} nftdata={nftdata} imagefile={imagefile} ipfsData={ipfsData} /> : <div className="home_popup_background">
            <div className="SingleCollectiblePopup">
              <div className="SingleCollectiblePopup_heading">
                <h3>Follow steps</h3>
              </div>
              <div className="SingleCollectiblePopupStep">
                <div className="SingleCollectiblePopup_upload">
                  <div className="SingleCollectiblePopup_upload1">
                    <div className="div1">
                      {
                        mintSuccess ? <><div className="placebid3_img">
                          <img src={Checkplacebid} alt="" /></div> </> : <>{mintLoading ? <div className="loader"></div> : <><div className="circle"></div>
                            <img src={upload} alt="" /></>}</>
                      }
                    </div>
                    <div className="content">
                      <h4>Upload files @ Mint token</h4>
                      <p>Upload files @ Mint token</p>
                    </div>
                  </div>
                  <button onClick={ipfsDataSend} disabled={mintLoading || mintSuccess} className={mintSuccess ? "placebid3_button_div" : ""}>{
                    mintSuccess ? "Done" : "Start now"
                  }</button>
                  {/* <button className="done">Done</button> */}
                </div>
                <div className="SingleCollectiblePopup_upload">
                  <div className="SingleCollectiblePopup_upload1">
                    <div className="div1">
                      <div className="circle"></div>
                      <img src={pencil} alt="" />
                    </div>
                    <div className="content">
                      <h4>Sign sell order</h4>
                      <p>Sign sell order using your wallet</p>
                    </div>
                  </div>
                  <button disabled={!minting} className={minting ? "" : "placebid3_button_div"} onClick={handleClick}>Start now</button>
                </div>
                <div className="SingleCollectiblePopup_upload">
                  <div className="SingleCollectiblePopup_upload1">
                    <div className="div1">
                      <div className="circle"></div>
                      <img src={bag} alt="" />
                    </div>
                    <div className="content">
                      <h4>Sign Lock order</h4>
                      <p>Sign lock order using your wallet</p>
                    </div>
                  </div>
                  <button>Start now</button>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default SingleCollectiblePopup;
