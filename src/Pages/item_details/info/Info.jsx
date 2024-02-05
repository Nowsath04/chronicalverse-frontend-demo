import React, { useEffect, useState } from 'react'
import "./Info.css"
import ItemDetailCard from '../../../components/itemDetailCard/ItemDetailCard'
import { card_info } from '../Data'
import axios from 'axios'
import { API_URL } from '../../../constants/userConstants'
const Info = ({ nftData }) => {
  console.log(nftData);
  const [owner, setOwner] = useState([])
  const [creater, setCreater] = useState([])
  const [sameOwnandCre, setSameOwnandCre] = useState(false)
  const nftCreater = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/oneuser/${nftData.nftCreator}`)
      setCreater(data.user)
    } catch (error) {
      console.log(error);
    }
  }

  const nftOwner = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/oneuser/${nftData.nft_owner}`)
      setOwner(data.user)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    nftCreater()
    nftOwner()
    if (nftData) {
      if (nftData?.nftCreator == nftData?.nft_owner) {
        setSameOwnandCre(true)
      }
    }
  }, [nftData])
  return (
    <div className='Info'>


      {
        sameOwnandCre ? <div className="itemDetailCard">
          <img src={owner.imgpath} alt="" className="follower_profile_img" />
          <div className="Info_content">
            <p>{owner.name} <span>(owner,creater)</span></p>
            <h4>{`${owner?.userid?.substring(0, 20)}..${owner?.userid?.substring(30)}`}</h4>
          </div>
        </div> : <>
          <ItemDetailCard data={owner} type={"Owner"} />
          <ItemDetailCard data={creater} type={"Creater"} /></>
      }


    </div>
  )
}

export default Info