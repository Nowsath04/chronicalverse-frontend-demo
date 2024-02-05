import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../constants/userConstants'
import BidDetailCrad from '../../../components/bidDetailCard/BidDetailCrad'

const Bids = ({ nftData }) => {
const [bidDetals,setBidDetails]=useState([])
  const getBidDetails = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/bid_details/${nftData.collection_id}/${nftData.nfttoken}`)
      console.log(data);
      setBidDetails(data.bidDetails)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getBidDetails()
  },[nftData])
  return (
    <div className='info'>
    {
     bidDetals? bidDetals.map((data,index)=>{
      return <BidDetailCrad data={data}/>
     }):""
    }
    </div>
  )
}

export default Bids