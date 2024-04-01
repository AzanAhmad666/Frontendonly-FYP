import React, { useState } from 'react';
import '../css/login.css';
import { Link,useNavigate } from 'react-router-dom';
import img from "../images/login-img.png";
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

const LoginFreelancer = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['token']);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        // Include any other headers as needed
    
        const raw = JSON.stringify({
          email: email,
          password: password,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };
          try {
            const response = await fetch('http://localhost:3000/api/v1/Freelancer/login', requestOptions);
            const result = await response.json();
      
            // Check the response from the server
            
            if(result.success){
                console.log(result)
                setCookie('token',result.token)
                setCookie('freelancer', result.freelancer)
                setCookie('freelancerID', result.freelancer._id)
                setCookie('userType','freelancer')
                console.log(result.freelancer._id)
                //console.log("cookies token: ", cookies.token)
                toast.success("Login Successfull")
                navigate('/FreelancerHome')
            }
            else{
                toast.error(result.message)
            }
      
            // Handle success or show an error message to the user
          } catch (error) {
            console.error('Error:', error);
          }
        };


    return (
        <div className='login'>
            {/* outsource div  */}
            <div className=' d-flex allign-item-center justify-content-center  '>
                <h1 className='outsource-heading'>OutsourcePro</h1>
            </div>
            {/* main body */}
            <div className='container'>
                <div className='row'>
                    {/* image column  */}
                    <div className=' d-none d-lg-flex col-md-6 image-padding'>
                        <img src={img}  className='signin-img'></img>
                    </div>
                    {/* sign-up column  */}
                    <div className='col-12 col-lg-6 main-signin-padding1'>
                        <div className='container container-bg1'>
                            <form>
                                {/* sign-in or create account  */}
                                <div className='d-flex justify-content-center mb-3'>
                                    <h1 className='signin-text'>Sign In</h1>
                                    
                                </div>
                                {/* input fields  */}
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='email' placeholder='Enter Your Email' className='w-100 input-bg' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='mt-4 mb-4'>

                                    <label htmlFor='email'></label>
                                    <input type='password' placeholder='Enter Your Password' className='w-100 input-bg' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className='mt-3 mb-4'>
                                    <Link to='/forgetpassword' className='forget-pass'>Forget Password?</Link>
                                </div>
                                {/* Sign-in button  */}
                                <div className='d-flex mb-3 justify-content-end'>
                                    <button className='signin-button text-white' onClick={handleLogin}>
                                        Sign in
                                    </button>
                                </div>
                                {/* doesnt have acccount  */}
                                <div className='doesnt-have-account' >
                                    <p>Doesn't have an account?</p>
                                      <Link to='/SignupFreelancer' className='create-account-text'> Create account </Link>
                                    </div>
                            </form></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginFreelancer;
