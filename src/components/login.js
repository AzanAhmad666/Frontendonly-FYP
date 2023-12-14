import React from 'react';
import '../css/login.css';
import img from "../images/login-img.png";


const Login = () => {
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
                    <div className='col-12 col-lg-6 main-signin-padding'>
                        <div className='container container-bg'>
                            <form>
                                {/* sign-in or create account  */}
                                <div className='d-flex justify-content-center mb-3'>
                                    <h1 className='signin-text'>Sign In</h1>
                                    
                                </div>
                                {/* input fields  */}
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='email' placeholder='Enter Your Email' className='w-100 input-bg' />
                                </div>
                                <div className='mt-4 mb-4'>

                                    <label htmlFor='email'></label>
                                    <input type='email' placeholder='Enter Your Password' className='w-100 input-bg' />
                                </div>
                                <div className='mt-3 mb-4'>
                                    <a href='' className='forget-pass'>Forget Password?</a>
                                </div>
                                {/* Sign-in button  */}
                                <div className='d-flex mb-3 justify-content-end'>
                                    <button className='signin-button text-white'>
                                        Sign in
                                    </button>
                                </div>
                                {/* doesnt have acccount  */}
                                <div className='doesnt-have-account' >
                                    <p>Doesn't have an account?</p>
                                      <a href='' className='create-account-text'> Create account </a>
                                    </div>
                            </form></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
