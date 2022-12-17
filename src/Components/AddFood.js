import React, { useEffect, useState } from "react";
import styles from "../styles/modules/modal.module.css";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { postFood } from "../Services/axios";
import './addFood.css';
const dropin = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};


function AddFood({ type, addFoodOpen, setAddFoodOpen, todo, categoryId }) {
  const [foodName, setFoodName] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [foodInventory,setFoodInventory] = useState("");
  const [status, setStauts] = useState("incomplete");
  const dispatch = useState(""); //need more

  useEffect(() => {
    if (type === "update" && todo) {
      setFoodName(todo.foodName);
      setStauts(todo.status);
    } else {
      setFoodName("");
      setStauts("incomplete");
    }
  }, [type.todo, addFoodOpen]);

  // useEffect(() =>{}, [title]);

  const handleSumbit = (e) => {
    e.preventDefault();
    if (foodName === "") {
      toast.error("Please enter a Name.");
      return;
    } else if (foodDescription === "") {
      toast.error("Please enter a Food Description.")
    }
    if (foodName && foodDescription) {
      if (type === "add") {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(imgFile);
        fileReader.onload = (event) => {
          console.log(categoryId);
          postFood({
            "restaurantId": 2,
            "name": foodName,
            "price": foodPrice,
            "image": event.target.result,
            "categoryid": categoryId,
            "count": foodInventory,
            "foodDescription": foodDescription,
          } ).then(() => {console.log(categoryId)})
        }
        

        toast.success("Food Added Successfully");
        setAddFoodOpen(false);
      }
      //for edit
      // if (type === "update") {
      //   if (todo.foodName !== foodName || todo.status !== status) {
      //     dispatch(
      //       updateTodo({
      //         ...todo,
      //         foodName,
      //         status,
      //       })
      //     );
      //   } else {
      //     toast.error("No Changes Made");
      //     return;
      //   }
      // }
      setAddFoodOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {addFoodOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropin}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onClick={() => setAddFoodOpen(false)}
              onKeyDown={() => setAddFoodOpen(false)}
              tabIndex={0}
              role="button"
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <form className={styles.form} onSubmit={(e) => handleSumbit(e)}>
              <h1 className={styles.formTitle}>
                {type === "update" ? "Update" : "add"} Food
              </h1>
              <label htmlFor="title">
                Name
                <input
                  value={foodName}
                  type="text"
                  id="title"
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </label>
              
              <label htmlFor="title">
                Description
                <input
                  value={foodDescription}
                  type="text"
                  id="title"
                  onChange={(e) => setFoodDescription(e.target.value)}
                />
              </label>
              <label className="uploadImg" for="imageUpload">Upload Food picture 
              <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={(e) => {setImgFile(e.target.files[0])
              // console.log(e.target.files)
              }} />
              </label>
              <label for="price">Price </label>
              <input className="Label" type="number" id="price" name="price" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)}/>
              <label for="inventory"> Inventory </label>
              <input className="Label" type="number" id="inventory" name="inventory" value={foodInventory} onChange={(e) => setFoodInventory(e.target.value)}/>
              <div className={styles.buttonContainer}>
                <Button type="submit" className={styles.submit}>
                  {type === "update" ? "Update" : "Add"} Food
                </Button>
                <Button
                  type="button"
                  className={styles.submit}
                  onClick={() => setAddFoodOpen(false)}
                  onKeyDown={() => setAddFoodOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddFood;