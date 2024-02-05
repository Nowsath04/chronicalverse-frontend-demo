import React from 'react'

const OwnerCard = ({data}) => {
   console.log(data);
  return (
    <div className="itemDetailCard margin">
    <img src={data.imgpath} alt="" className="follower_profile_img" />
    <div className="Info_content">
      <p>{data.name} </p>
      <h4>{`${data?.userid?.substring(0,20)}..${data?.userid?.substring(30)}`}</h4>
    </div>
  </div>
  )
}

export default OwnerCard
