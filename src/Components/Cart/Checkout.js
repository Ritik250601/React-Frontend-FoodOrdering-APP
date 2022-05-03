import React, { useContext, useRef } from "react";
import CartContext from "../../Store/Cart-context";
import {
  MDBContainer,
  MDBCardTitle,
  MDBCardHeader,
  MDBCardBody,
  MDBCardText,
} from "mdb-react-ui-kit";
import classes from "./Checkout.module.css";

const Checkout = () => {


  // Cart info
  const cartCtx = useContext(CartContext);
  const checkoutItems = cartCtx.items;
  const cartItemInfo = cartCtx.cartItemInfo;

  //useRef() hook for storing user input value by ref
  const inputCityRef = useRef();
  const inputStreetRef = useRef();
  const inputLandmarkRef = useRef();
  const inputPincodeRef = useRef();

  //checkout handler method
  const checkoutHandler = (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    const city = inputCityRef.current.value;
    const street = inputStreetRef.current.value;
    const landmark = inputLandmarkRef.current.value;
    const pincode = inputPincodeRef.current.value;

    fetch('https://spring-boot-food-ordering-app.herokuapp.com/private/orders', {
      method:'POST',
      headers:{'Content-Type':'application/json',  Authorization: `Bearer ${token}`},
      body:JSON.stringify({
       city:city,
       street:street,
       landmark:landmark,
       pincode:pincode,
      //  orderId:

      })
    }).then(console.log("send"))
      .catch(error => console.log(error))


  };

  return (
    <>
      <MDBCardTitle style={{ textAlign: "center", marginTop: "2rem" }}>
        Fill the details to Order
      </MDBCardTitle>
      <MDBContainer
        className="border d-flex align-items-center justify-content-center"
        style={{ marginTop: "10rem", maxWidth: "50rem" }}
      >
        <form>
          <div className="form-group">
            <label htmlFor="form1Example1">Enter Your City</label>
            <input
              className="form-control"
              type="text"
              id="form1Example1"
              label="Enter your city"
              ref={inputCityRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="form4Example4">Enter Your Street</label>
            <input
              className="form-control"
              type="text"
              id="form4Example4"
              label="Enter your city"
              ref={inputStreetRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="form2Example2">Enter Your Land Mark</label>
            <input
              className="form-control"
              type="text"
              id="form2Example2"
              label="Enter your city"
              ref={inputLandmarkRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="form3Example3">Enter Your Pincode</label>
            <input
              className="form-control"
              type="text"
              id="form3Example3"
              label="Enter your city"
              ref={inputPincodeRef}
            />
          </div>
        </form>
      </MDBContainer>
      <button className={classes.button} onClick={checkoutHandler} type="submit">
        Checkout
      </button>

      <MDBCardHeader>Cart Total</MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>
          Subtotal ({cartItemInfo.quantity})items : {cartItemInfo.total_price} ₹
        </MDBCardTitle>
        <MDBCardText>
          Your order is eligible for FREE Delivery. Select this option at
          checkout. Details
        </MDBCardText>
      </MDBCardBody>
    </>
  );
};

export default Checkout;
