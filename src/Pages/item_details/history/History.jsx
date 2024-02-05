import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../constants/userConstants'
import axios from 'axios'
import OwnerCard from '../../../components/ownerCard/OwnerCard'
import BidDetailCrad from '../../../components/bidDetailCard/BidDetailCrad'

const History = ({ nftData }) => {
  const [owner, setOwner] = useState([])
  const [bidDetals, setBidDetails] = useState([])

  const getOwners = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/nft-owner/${nftData.nfttoken}/${nftData.collection_id}`)
      setOwner(data.getallOwner)
      console.log(data.getallOwner);
    } catch (error) {
      console.log(error);
    }
  }
  const getBidDetails = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/bid_details/${nftData.collection_id}/${nftData.nfttoken}`)
      console.log(data);
      setBidDetails(data.bidDetails)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getOwners()
    getBidDetails()

  }, [nftData])
  return (
    <div>
      <p>Owner</p>
      {owner && owner.map((value, index) => (
        <OwnerCard data={value.owner} />
      ))}

      {
        nftData?.type == "putonsale" ? <><p>Bids Details</p>
          {
            bidDetals ? bidDetals.map((data, index) => {
              return <BidDetailCrad data={data} />
            }) : ""
          }
        </> : ""
      }
    </div>
  )
}

export default History