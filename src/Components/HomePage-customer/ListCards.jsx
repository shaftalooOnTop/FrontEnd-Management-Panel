import axios from "axios";
import React from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { Card } from "./card";
import { getRestaurantCards } from "../../services/axios";

import './homePageCustomer.css'

export const ListCardRes = () => {

    const filters = ['all', 'fast-food', 'chicken']
    const [cards, setCards] = useState();
    const [data, setData] = useState([])
    const [currentFilter, setCurrentFilter] = useState("all")

    useEffect(() => {
      getRestaurantCards()
      .then((response)=>{
        console.log("response : ", response.data)
        setData(response.data)
      
        const newCard =[];
        response.data.forEach((item) => 
        {
          newCard.push( {
            id : item.id,
            name : item.name,
            location : item.address,
            tags : item.tag
          })
        })
        setCards(newCard)
      })
    .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
          
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
    }, [,currentFilter])

    const dataGen = () => {
      const tmp=[]
      data.forEach(item=>{
        console.log(item);
        tmp.push(
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            location={item.address}
          />
        )
      })
      return tmp;
    }

    /*const changeFilter = (p) => {
      setCurrentFilter(p)
      console.log(currentFilter)
    }
    */

    return (
        
        <div className="homePage-customer">
          <div className="container">
            <div>
              <div className="filters">
                {filters.map((filter) => (
                    <button /*onClick={changeFilter(filter)}*/ className="simple-filter">{filter}</button>
                  ))}
              </div>
            </div>
            <div className="cards-list">
              <div className="simple-card-inlist">
                <InfiniteScroll
                  dataLength={data.length}
                  next={getRestaurantCards}
                  hasMore={true}
                  loader={<p>loading...</p>}
                  >
                  {dataGen()}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
    )
}