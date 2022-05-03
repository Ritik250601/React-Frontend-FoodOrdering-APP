import React, { useEffect, useState, useContext } from "react";
import classes from './Card.module.css';
import CartContext from "../../../Store/Cart-context";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Cards() {
  // useNavigate hook() for sending the user on other url without reload
   let navigate = useNavigate();

  //  useContext hook() for adding the item int the  Cart context
  const cartCtx = useContext(CartContext);
  

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemOverviewClickHandler = (event) => {
    const itemId = event.target.id;
    const overViewItem = meals.filter((item) => item.id === parseInt(itemId))
    navigate("/item-overview", { state:overViewItem[0]});
  };


  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("https://spring-boot-food-ordering-app.herokuapp.com/public/meals/");

      if (!response) {
        throw new Error("something went Wrong");
      }
      const responseData = await response.json();


      setMeals(responseData);
      setIsLoading(false);
    };

    fetchMeals()
      .then()
      .catch((error) => {
      });
  }, []);


//  addToCart Handler

const  addTocart = (event) => {
  const id = event.target.value;
  const itemToCart = meals.filter((item) => item.id === parseInt(id));
  const cartItem = {item:itemToCart[0], quantity:1};    
    cartCtx.addItem(cartItem);
    navigate("/cart");
  

} 



  const mealList = meals.map((object) => (
   
    <MDBCol key={object.id} >
      <MDBCard
        className="bg-image hover-zoom h-40" style={{maxHeight:"25rem", maxWidth:"25rem"}}
        
      >
        <MDBCardImage
          id={object.id}
          onClick={itemOverviewClickHandler}
          src={`https://spring-boot-food-ordering-app.herokuapp.com/welcome/images/${object.image}`}
          alt="..."
          position="top"
          style={{ minHeight:"5rem",minWidth:"8rem", maxWidth: "15rem", maxHeight:"25rem", }}
        />
        <MDBCardBody  style={{maxHeight:"8rem"}}>
          <MDBCardTitle>{object.name}</MDBCardTitle>
          <MDBCardText>{object.short_desc}</MDBCardText>
          <MDBCardText className="d-inline p-2">
            Price: {object.price} $
          </MDBCardText>
          <MDBBtn
            className="d-inline p-2"
            id={object.id}
            onClick={itemOverviewClickHandler}
            style={{ backgroundColor: "#aa2727", border: "1px solid #aa2727" }}
          >
            Quick View
          </MDBBtn>
        </MDBCardBody>
          <button className={classes.button} onClick={addTocart} value={object.id}>+ Add</button>
      </MDBCard>
    </MDBCol>
  ));
  return (
    <>
      <MDBContainer className="my-5">
        <MDBRow className="row-cols-1 row-cols-md-3 g-4">
          {isLoading && <p>is Loading...</p>}
          {!isLoading && mealList}
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Cards;
