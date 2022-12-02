import { useState ,useContext ,useEffect} from "react";
import { CartContext} from "./cart";
import { OrderPage } from "./order";
import { getMenu ,getRestaurant} from "../Services/axios";
import  TodoModal  from "../Components/TodoModal";
import  AddFood  from "../Components/AddFood";

export function  RstMenu  ({id}) {
  const {cart,setCart} = useContext (CartContext);
  const [foodTags,setFoodTags] = useState ();
  const [foods,setFoods] = useState();
  const [flag, setFlag] = useState(0);
  const [restMenu,setMenu] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [addFoodOpen, setAddFoodOpen] = useState(false);

  //var imgURL= "data:image/png;base64,";
  var forFlag = 0;

  console.log("khar")

  useEffect(() => {
    getRestaurant(id).then (m => {
      //console.log(m.data[0].categories[0])
      setMenu(m.data.menu)
    }).catch()
  },[])

  function loadMenu (i) {
    setFoods(i.foods)
  }

  function inc (t) {
    t.foodCnt+=1
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
    t.foodCnt-=1
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

    return (
    
        <>
          <div className="menu">
            <div> 
              <div className="categories">
                {restMenu?.map (tag => (
                  //JSON.stringify(tag.categories)
                  <button onClick={() => loadMenu(tag)} className="catButton">{tag.categoryName}</button>
                ))}
                <button className="catButton addButton" onClick={() => setModalOpen(true)}>Add</button>
                
                <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
              </div>

              <div className="foods">
                {foods?.map(x => (
                  <div className="newCard">
                    <img src={x.image} className="imageCard" />
                    <h2 className="cardTitle">{x.name}</h2>
                    <div className="foodDetails">
                      <p className="cardDetails">{/*x.details*/}{x.foodDescription}</p>
                    </div>
                    <p className="price">{x.price}$</p>
                    <div className="ButtonGroup">
                    <button className="cardButton" onClick={() => {if (x.foodCnt > 0 && x.foodCnt <= x.count ) {dec(x)}}} >-</button>
                      <span className="cardButton">{x.foodCnt}</span>
                      <button className="cardButton" onClick={() => inc(x)}>+</button>
                    </div>
                  </div>
                ))}
                <div className="addCard" onClick={() => setAddFoodOpen(true)}>
                  <p>+</p>
              </div>
              <AddFood type="add" addFoodOpen={addFoodOpen} setAddFoodOpen={setAddFoodOpen} />
              </div>
            </div>  
          </div>
        </>
    )
}