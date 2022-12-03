import React from "react";
import './order.css'
import { CartContext } from "./cart";
import { useContext , useState } from "react";
//import { Recepite } from "./recepite dialog";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
//import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { ButtonGroup} from '@mui/material';
import { useEffect } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {/*<CloseIcon />*/}
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};




export function OrderPage () {
    const {cart,setCart} = useContext (CartContext);
    const [modal, setModal] = useState(false);
    const [prov,setProv] = useState();

    var cartSum=0

    useEffect (()=> {

    },[cart])

    function sum (cart) {
        cartSum=0
        for (let i = 0 ; i < cart.length ; i++){
          cartSum+=cart[i].order*cart[i].price
        }
    
        return (
          cartSum
          )
      }


      const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

 
    return (
      <>
        <div className="cart">
          

              <h2 className="orderHeader">Order list</h2>

              <div className="List">
                {console.log("salam")}
                  {cart?.map (x => (
                    <p className="orderList">{x.order}x : {x.name} : {x.order*x.price}$</p>
                ))}
              </div>

              <div className="totalPrice">
                <div className="totalPriceButton">Total price : {sum(cart)}$</div>
              </div>
              
              {cartSum > 0 ? <button className="pay" onClick={handleClickOpen} >Pay</button> : null}
          
        </div>

        <div className="payDialog">
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            className="payDialog"
          >
            <DialogContent dividers className="dialog">
            <div className="dialogList">
          

              <h2 className="orderHeader">Your order</h2>

              <div className="ListDialog">
                {console.log("salam")}
                  {cart?.map (x => (
                    <p className="orderList">{x.order}x : {x.name} : {x.order*x.price}$</p>
                ))}
              </div>

              <div className="totalPrice">
                <div className="totalPriceButton">Total price : {sum(cart)}$</div>
              </div>

              <h3 className="methods">Payment methods:</h3>
              <div className="tabG">
                <button className="buttG">In Place</button>
                <button className="buttG middle">Credit Card</button>
                <button className="buttG">Account</button>
              </div>
          
            </div>

            </DialogContent>
                

          </BootstrapDialog>
        </div>
        
        </>
    )
}