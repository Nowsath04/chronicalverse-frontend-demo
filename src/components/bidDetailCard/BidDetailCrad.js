import React from 'react'

const BidDetailCrad = ({data,type}) => {
    console.log(data);
    return (
        <div className="itemDetailCard margin">
          <img src={data?.BidUser.imgpath} alt="" className="follower_profile_img" />
          <div className="Info_content">
            <p>{data?.BidUser.name}</p>
            <h4>{data.bidprice} Matic</h4>
          </div>
        </div>
      );
}

export default BidDetailCrad
