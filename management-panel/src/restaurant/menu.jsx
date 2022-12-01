import { useState ,useContext} from "react";
import { CartContext } from "./cart";
import  TodoModal  from "../Components/TodoModal";
import AddFood from "../Components/AddFood";



export function  RstMenu  ({foodTags,foods }) {
  const {cart,setCart} = useContext (CartContext);
  const [flag, setFlag] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [addFoodOpen, setAddFoodOpen] = useState(false);

  var forFlag = 0;



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

    return (
    
        <>
          <div className="menu">
            <div> 
              <div className="categories">
                {foodTags?.map (tag => (
                  //JSON.stringify(tag.categories)
                    <button /*onClick={() => loadMenu(tag)}*/ className="catButton">{tag}</button>
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
                      <p className="cardDetails">{x.details}</p>
                    </div>
                    <p className="price">{x.price}$</p>
                  </div>
                ))}

              <div className="addCard" onClick={() => setModalOpen(true)}>
                  <p>+</p>
              </div>
              <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
              </div>
            </div>  
          </div>
          
          
        </>
    )
}