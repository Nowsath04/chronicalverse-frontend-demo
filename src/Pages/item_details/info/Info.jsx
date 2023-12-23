import React from 'react'
import "./Info.css"
import ItemDetailCard from '../../../components/itemDetailCard/ItemDetailCard'
import { card_info } from '../Data'
const Info = ({data}) => {
  return (
    <div className='Info'>
    {
      card_info.map(( data,index)=>{
        return(
          <ItemDetailCard data={data}/>
        )
      })
    }
    </div>
  )
}

export default Info