import React from 'react';
import '../css/signup.css';


const Signup = () => {
    return (
        <div className='login'>
            {/* outsource div  */}
            <div className=' d-flex allign-item-center justify-content-center  '>
                <h1 className='outsource-heading'>OutsourcePro</h1>
            </div>
            {/* main body */}                             
                    {/* sign-up column  */}
                    <div className=' main-signin-padding'>
                        <div className='container container-bg'>
                            <form>
                                {/* sign-in or create account  */}
                                <div className='d-flex justify-content-center mb-3'>
                                    <h1 className='signin-text'>Sign Up</h1>
                                    
                                </div>
                                {/* input fields  */}
                                {/* email  */}
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='email' placeholder='Enter Your Email' className='w-100 input-bg' />
                                </div>
                                {/* name  */}
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='email' placeholder='Enter Your Full Name' className='w-100 input-bg' />
                                </div>
                                {/* username 
                                 */}
                                 <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='email' placeholder='Enter Your UserName' className='w-100 input-bg' />
                                </div>
                                {/* [Password ] */}
                                <div className='mt-4 mb-4'>

                                    <label htmlFor='email'></label>
                                    <input type='email' placeholder='Enter Your Password' className='w-100 input-bg' />
                                </div>
                                {/* re-enter password  */}
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='email' placeholder='Re-enter Password' className='w-100 input-bg' />
                                </div>
                                
                                {/* Sign-in button  */}
                                <div className='d-flex mt-4 mb-3 justify-content-end'>
                                    <button className='signin-button text-white'>
                                        Sign Up
                                    </button>
                                </div>
                               
                            </form></div>
                    </div>
                
           
        </div>
    );
};
export default Signup;