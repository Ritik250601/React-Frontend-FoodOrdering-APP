import React,{useState, useContext} from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBContainer
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';


function SignUp(props) {
    // Style
    const myStyle = {
        marginTop:'10rem',
        maxWidth:'50rem'

    }

// Context API

// useState Hook 

const [error, setError] = useState(false);
const [registerSuccess, setRergisterSuccess] = useState(false);
// .......useState hook for taking form data


const [emailInput, setEmailInput] = useState('');
const [userNameInput, setUserNameInput] = useState('');
const [firstNameInput, setFirstNameInput] = useState('');
const [lastNameInput, setLastNameInput] = useState('');
const [passwordInput, setPsswordInput] = useState('');
const [confirmPasswordInput, setConfirmPasswordInput] = useState('');


//useNavigation hook()

const navigate = useNavigate();

  
// form change Handler
  const emailChangeHandler = (event) => {
      setEmailInput(event.target.value);
  };
  const userNameChangeHandler = (event) => {
      setUserNameInput(event.target.value);
  }
  const firstNameChangeHandler = (event) => {
      setFirstNameInput(event.target.value);
  }
  const lastNameChangeHandler = (event) => {
      setLastNameInput(event.target.value);
  }

  const passwordChangeHandler = (event) => {
      setPsswordInput(event.target.value);
  }

  const confirmPasswordChangeHandler = (event) => {
      setConfirmPasswordInput(event.target.value);
  }


// form submit handler
  const submitHandler = (event) => {
      event.preventDefault();
      const enteredEmail = emailInput;
      const eneteredUserName = userNameInput;
      const enteredFirstName = firstNameInput;
      const enteredLastName = lastNameInput;
      const enteredPassword = passwordInput;
      const enteredConfirmPassword = confirmPasswordInput;


      if(enteredPassword !== enteredConfirmPassword){
        setError(true)
          return
      }
      fetch('https://spring-boot-food-ordering-app.herokuapp.com/public/registration', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
              email:enteredEmail,
              user_name:eneteredUserName,
              first_name:enteredFirstName,
              last_name:enteredLastName,
              password:enteredPassword
          })
        }).then(setError(false, 
          setRergisterSuccess(true)
          )
        )
          .catch(error => console.log(error))
      
      

          registerSuccess && navigate("/login")

  }


  return (
      <MDBContainer className="border d-flex align-items-center justify-content-center" style={myStyle}>
 <form onSubmit={submitHandler}>
      <MDBInput className='mb-4' type='text' id='form2Example1' label='email' value={emailInput} onChange={emailChangeHandler}/>
      <MDBInput className='mb-4' type='text' id='form2Example2' label='username' value={userNameInput} onChange={userNameChangeHandler}/>
      <MDBInput className='mb-4' type='text' id='form2Example3' label='First Name' value={firstNameInput} onChange={firstNameChangeHandler}/>
      <MDBInput className='mb-4' type='text' id='form2Example4' label='Last Name' value={lastNameInput} onChange={lastNameChangeHandler}/>
      <MDBInput className='mb-4' type='password' id='form2Example5' label='password' value={passwordInput} onChange={passwordChangeHandler}/>
      <MDBInput className='mb-4' type='password' id='form2Example6' label='Confirm Password' value={confirmPasswordInput} onChange={confirmPasswordChangeHandler}/>

      <MDBRow className='mb-4'>
        <MDBCol className='d-flex justify-content-center'>
          <MDBCheckbox id='form2Example7' label='Remember me' defaultChecked />
        </MDBCol>
      </MDBRow>

      <MDBBtn type='submit' className='mb-4' block>
        Sign up
      </MDBBtn>

      <div className='text-center'>
        {/* {isLogin &&  <p>
          Not a member? <button type='button' style={{color:'blue', border:'none'}} onClick={ () => {setIsLogin(false)}}>Register</button>
        </p>}
     */}
     {error && <p style={{color:"red"}}>something went wrong!!</p>}

        <MDBBtn floating className='mx-1'>
          <MDBIcon fab icon='facebook-f' />
        </MDBBtn>

        <MDBBtn floating className='mx-1'>
          <MDBIcon fab icon='google' />
        </MDBBtn>

        <MDBBtn floating className='mx-1'>
          <MDBIcon fab icon='twitter' />
        </MDBBtn>

        <MDBBtn floating className='mx-1'>
          <MDBIcon fab icon='github' />
        </MDBBtn>
      </div>
    </form> 
    </MDBContainer>
  );
}



export default SignUp;