import React from "react";
import { useState } from "react";
import './homePageCustomer.css'

export function  Card  ({name, location}) {

  const image_res = "https://foodexiran.com/wp-content/uploads/2022/08/store-banner.jpg";
  const logo_res = "https://wpcdn.us-east-1.vip.tn-cloud.net/www.klkntv.com/content/uploads/2020/08/KFC-LOGO-1024x881.jpg";
  const tags = ["chicken", "fast-food"]

    return (
      <div className="card">
        <div className="card-top">
          <img className="img-res"
               src={image_res} 
               alt="restaurant-card" />
        </div>
        <div className="card-discription">
          <img className="logo" 
               src={logo_res}
               alt="logo" />
          <h1>{name}</h1>
        </div>
        <p className="location">Location : <span className="simple-loc">{location}</span></p>
        <p className="tags">tags : 
          {tags?.map((tag) => (
            <span className="simple-tag" id={tags.indexOf(tag)}>{tag}</span>
           ))}
        </p>      
      </div>
    )
}