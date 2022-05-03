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
import AuthContext from '../../Store/auth-context';
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
    // Style
    const myStyle = {
        marginTop:'10rem',
        maxWidth:"50rem"
    }

// Context API
const authCtx = useContext(AuthContext);

// useState Hook 
const [isLogin, setIsLogin] = useState(true);
const [emailInput, setEmailInput] = useState('');
const [passwordInput, setPsswordInput] = useState('');

const navigate = useNavigate();

  
// email and password change handler
  const emailChangeHandler = (event) => {
      setEmailInput(event.target.value);
  };

  const passwordChangeHandler = (event) => {
      setPsswordInput(event.target.value);
  }

// form submit handler
  const submitHandler = (event) => {
      event.preventDefault();
      const enteredEmail = emailInput;
      const enteredPassword = passwordInput;

      fetch('https://spring-boot-food-ordering-app.herokuapp.com/public/token', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
              userName:enteredEmail,
              password:enteredPassword
          })
        }).then(data => data.json())
          .then(data => {
            console.log(data)
            if(data.token){
              authCtx.login(data.token)
              navigate('/home')
            }
      
          }).catch(error => console.log(error))
      

  }


  return (
      <MDBContainer className="border d-flex align-items-center justify-content-center" style={myStyle}>
    <form onSubmit={submitHandler}>
      <MDBInput className='mb-4' type='text' id='form2Example1' label='email' value={emailInput} onChange={emailChangeHandler}/>
      <MDBInput className='mb-4' type='password' id='form2Example2' label='Password' value={passwordInput} onChange={passwordChangeHandler}/>

      <MDBRow className='mb-4'>
        <MDBCol className='d-flex justify-content-center'>
          <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
        </MDBCol>
        <MDBCol>
        {isLogin  &&  <Link to='#!'>Forgot password?</Link>}
        </MDBCol>
      </MDBRow>

      <MDBBtn type='submit' className='mb-4' block>
        {isLogin && 'Sign in'}
        {!isLogin && 'Sign up'}
      </MDBBtn>

      <div className='text-center'>
        {isLogin &&  <p>
          Not a member? <button type='button' style={{color:'blue', border:'none'}} onClick={ () => {setIsLogin(false)}}>Register</button>
        </p>}
       
        <p >or sign up with:</p>
        {authCtx.isLoggedIn && <p>yes you logged in</p>}

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



export default Login;