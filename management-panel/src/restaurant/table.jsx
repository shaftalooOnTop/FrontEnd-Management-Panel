import React, { useState , useEffect , useContext} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./table.css"
import { OrderPage } from "./order";
import { CartContext , TableContext } from "./cart";
//import {RestTables} from "./restTables"

export function Tables () {

    const [time, setTime] = React.useState('');
    const [date, setDate] = React.useState('');
    const [nav,setNav] = useState ();
    
    
    const handleDate = (event) => {
        setDate(event.target.value);    
    };
    const handleTime = (event) => {
        setTime(event.target.value);
    };
///////////////////////////////////////////////////////////////////////////////

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
    setFlag (() => !flag)
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
    setFlag (() => !flag)
    }

    function handleSubmit () {
        setNav(
            <div className="tabList">
                {tbList?.map(x => (
                  <div className="newCard">
                    <img src={x.image} className="imageCard" />
                    <h2 className="cardTitle">{x.name}</h2>
                    <div className="foodDetails">
                      <p className="cardDetails">Capacity: {x.capacity}</p>
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

    useEffect (() => {  
    },[flag,cart])
    
      return (
        <>
        <div className="tableAll">
            <div className="DateTime">
                <div className="date">
                    <Box className="dateBox" color="black">
                    <FormControl fullWidth color="black">
                        <InputLabel id="demo-simple-select-label" color="black">Date</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={date}
                        label="Age"
                        onChange={handleDate}

                        >
                        <MenuItem value={"Saturday"}>Saturday</MenuItem>
                        <MenuItem value={"Sunday"}>Sunday</MenuItem>
                        <MenuItem value={"Monday"}>Monday</MenuItem>
                        <MenuItem value={"Teuseday"}>Teuseday</MenuItem>
                        <MenuItem value={"Wedensday"}>Wedensday</MenuItem>
                        <MenuItem value={"Thursday"}>Thursday</MenuItem>
                        <MenuItem value={"Friday"}>Friday</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                </div>
                <div className="time">
                    <Box className="timeBox">
                    <FormControl fullWidth color="black">
                        <InputLabel id="demo-simple-select-label" color="black">Time</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={time}
                        label="Age"
                        onChange={handleTime}
                        color="black"
                        >
                        <MenuItem value={10} color="black">12</MenuItem>
                        <MenuItem value={20}>14</MenuItem>
                        <MenuItem value={30}>16</MenuItem>
                        <MenuItem value={30}>18</MenuItem>
                        <MenuItem value={30}>20</MenuItem>
                        <MenuItem value={30}>22</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                </div>
                <div className="submit">
                    <button className="submitTime" onClick={handleSubmit} >SUBMIT</button>
                </div>
                
            </div>

            <div className="TablesShow">
                {nav}
            </div>
        
        </div>

        <div className="cartShow">
            <OrderPage/>
        </div>
        
        </>
      )
}