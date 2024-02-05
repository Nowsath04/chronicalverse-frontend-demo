import React from "react";
import notification from "../../Assets/notification.png";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/userConstants";
import axios from "axios";
export default function NotificationCard({ item ,setUpdateNoti,user,updateNotification}) {
  console.log(item);
  console.log(item);
  const handleClick=()=>{
    if(item?.notificationType =="burnToken"){
     return "hello"
    }
    const pathname=item.pathname
    window.location.replace(pathname)
  }
  return (
    <div onClick={handleClick}
      // onClick={() => setOpen(false)}
      className="bell_notification_content"
    >
      <div className="bell_notification_img"  onClick={updateNotification}>
        <img src={item.img ? item.img : notification} className="image_notification_bar" alt="" />
        <div className="bell_notification_list">
          <li
            style={{
              fontSize: "14px",
              color: "#FFFFFF",
              marginBottom: "5px",
            }}
          >
            {item?.notificationType=="newcollection"?`you created new ${item.Distillery} collection`:
            item?.notificationType=="mint"?`You created new nft token ${item.Distillery}`
            :item?.notificationType=="directsale"?`You  ${item.Distillery} nft on sale`
            :item?.notificationType=="putonsale"?`You  ${item.Distillery} nft on sale`
            :item?.notificationType=="BidnftOwner"?`${item.user.name} place bid in you nft`
            :item?.notificationType=="placedbid"?`You have bid on ${item.Distillery} nft`
            :item?.notificationType=="youbuydirectsale"?`You purchased ${item.Distillery} nft`
            :item?.notificationType=="youwinbid"?`you won  ${item.Distillery} nft`
            :item?.notificationType=="transfernftreceiver"?`you Received ${item.Distillery} nft from ${user?.name}`
            :item?.notificationType=="transfernftsend"?`you sent ${item.Distillery} nft to ${user?.name}`
            :item?.notificationType=="removefromsale"?`you removed ${item.Distillery} from sale`:
            item?.notificationType =="yourdirectsalenftbuy" ?`Your ${item.Distillery} has been bought.`
            :item?.notificationType =="burnToken" ?`Your burned ${item.Distillery} nft.`:""
          }
          </li>
          <li
            style={{
              marginBottom: "5px",
              fontSize: "14px",
              color: "#FFFFFF",
            }}
          >
            {moment(item.created_at && item.created_at).format("MMMM Do YYYY")}
          </li>
          <li
            style={{
              fontSize: "12px",
              color: "#FF00D6",
              fontWeight: "700",
            }}
          >
            {item.content3}
          </li>
        </div>
        <div className="bell_notification_absolute_div">
          {
            item.viewed===false?<div className="bell_notification_absolute"></div>:""
          }
          
        </div>
      </div>
    </div>
  );
}
