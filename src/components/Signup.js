import React, { useState } from 'react';
import '../css/signup.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [companyName, setCompanyName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [focalPersonName, setFocalPersonName] = useState('');
  const [focalPersonEmail, setFocalPersonEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      companyname: companyName,
      businessAddress: businessAddress,
      name: focalPersonName,
      email: focalPersonEmail,
      password: password,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

  if (password===confirmPassword){
    try {
      const response = await fetch('http://localhost:3000/api/v1/Company/register', requestOptions);
      const result = await response.json();

      // Check the response from the server
      console.log(result);

      // Handle success or show an error message to the user
      if (result.success) {
        // You can redirect the user to a success page or perform other actions
        console.log('Signup successful!');
        toast.success('Signup successful');
        navigate('/login')
      } else {
        console.error('Signup failed:', result.message);
        toast.error("Signup Failed");
      }
    }
  
    catch (error) {
      console.error('Error:', error);
    }
  }
  else{
    toast.error("Password and confirm password are not matching")
  }
  };

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
                                    <input type='text' placeholder='Enter Your Company Name' className='w-100 input-bg' value={companyName} onChange={(e)=>setCompanyName(e.target.value)} />
                                </div>
                                {/* name  */}
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='text' placeholder='Enter Your Bussniess Address' className='w-100 input-bg' value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)} />
                                </div>
                                {/* username 
                                 */}
                                 <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='text' placeholder='Enter Focal Person Name' className='w-100 input-bg' value={focalPersonName}
          onChange={(e) => setFocalPersonName(e.target.value)} />
                                </div>
                                {/* [Password ] */}
                                <div className='mt-4 mb-4'>

                                    <label htmlFor='email'></label>
                                    <input type='email' placeholder='Enter Focal Person Email' className='w-100 input-bg' value={focalPersonEmail}
          onChange={(e) => setFocalPersonEmail(e.target.value)} />
                                </div>
                                {/* enter password  */}
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='password' placeholder='Enter Your Password' className='w-100 input-bg' value={password}
          onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                {/* re-enter password  */}
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='password' placeholder='Re-enter Password' className='w-100 input-bg' value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                
                                {/* Sign-in button  */}
                                <div className='d-flex mt-4 mb-3 justify-content-end'>
                                    <button className='signin-button text-white' onClick={handleSignup}>
                                        Sign Up
                                    </button>
                                </div>
                               
                            </form></div>
                    </div>
                
           
        </div>
    );
};
export default Signup;