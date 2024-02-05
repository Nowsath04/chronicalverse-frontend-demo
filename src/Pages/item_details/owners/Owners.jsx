import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../constants/userConstants'
import OwnerCard from '../../../components/ownerCard/OwnerCard'

const Owners = ({ nftData }) => {
  const [owner, setOwner] = useState([])
  const getOwners = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/nft-owner/${nftData.nfttoken}/${nftData.collection_id}`)
      setOwner(data.getallOwner)
      console.log(data.getallOwner);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getOwners()
  }, [nftData])
  return (
    <div>
      {owner && owner.map((value, index) =>( 
        <OwnerCard data={value.owner}  />
      ))}
    </div>
  )
}

export default Owners