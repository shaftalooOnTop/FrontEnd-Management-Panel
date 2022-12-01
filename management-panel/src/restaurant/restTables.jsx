import React from 'react'
import {CartContext , TableContext} from "./cart"
import { useState ,useContext} from "react";
import { useEffect } from 'react';

export function RestTables() {
    //const [tbList,setTbList] = useState( [{"name" : "2 Sit table" , "count" : 0 , "price" : 20}, {"name" : "4 Sit table" , "count" : 0, "price" : 40 } , {"name" : "6 Sit table" , "count" : 0 , "price" : 60}])
    const {tbList,setTbList} = useContext (TableContext);
    const {cart,setCart} = useContext (CartContext);

    const [flag, setFlag] = useState(0);
    var forFlag = 0;
  
    console.log("khar")

    tbList.forEach (e =>{
        e["image"] = "https://static.rigg.uk/Files/casestudies/bistrotpierretables/sz/w960/bistrolargeroundrestauranttablewoodtopmetalbase.jpg";
        e["capacity"] = 10;
      })
  
  
    function inc (t) {
      t.count+=1
      console.log("ezafe")
      for (let i = 0 ; i < cart.length ; i++){
        if (t.name === cart[i].name) {
          forFlag=1;
          cart[i].order+=1
          break ;
        }
      }
      if (forFlag===0) {
        cart.push({
          name : t.name,
          price : t.price ,
          order : 1 ,
        });
      }
      
  
      forFlag = 0
      if (flag ===1 ) setFlag(0)
      else setFlag(1)
    }
  
    function dec (t) {
      t.count-=1
      for (let i = 0 ; i < cart.length ; i++){
        if (t.name === cart[i].name) {
          cart[i].order-=1;
          if (cart[i].order===0){
            setCart( cart.filter( a=>
              a.name !== t.name
            ))
            break;
          }
        }
      }
      if (flag ===1 ) setFlag(0)
      else setFlag(1)
    }

    useEffect (() => {
    },[flag])
  return (
              <div className="tabList">
                {tbList?.map(x => (
                  <div className="newCard">
                    <img src={x.image} className="imageCard" />
                    <h2 className="cardTitle">{x.name}</h2>
                    <div className="foodDetails">
                      <p className="cardDetails">{x.capacity}</p>
                    </div>
                    <p className="price">{x.price}$</p>
                    <div className="ButtonGroup">
                    <button className="cardButton" onClick={() => {if (x.count > 0 ) {dec(x)}}} >-</button>
                      <span className="cardButton">{x.count}</span>
                      <button className="cardButton" onClick={() => inc(x)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
  )
}
