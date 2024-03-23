import React, { useState } from 'react';
import '../css/signup.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignupFreelancer = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
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
        const response = await fetch('http://localhost:3000/api/v1/Freelancer/register', requestOptions);
        const result = await response.json();
  
        // Check the response from the server
        console.log(result);
  
        // Handle success or show an error message to the user
        if (result.success) {
          // You can redirect the user to a success page or perform other actions
          console.log('Signup successful!');
          console.log('Signup successful!');
          toast.success('Signup successful');
          navigate('/loginFreelancer')
        } else {
          console.error('Signup failed:', result.message);
          toast.error("Signup failed")
        }
      } catch (error) {
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
                                    <input type='text' placeholder='Enter Your First Name' className='w-100 input-bg' value={firstname} onChange={(e)=>setFirstname(e.target.value)} />
                                </div>
                                {/* name  */}
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='text' placeholder='Enter Your Last Name' className='w-100 input-bg' value={lastname} onChange={(e)=>setLastname(e.target.value)} />
                                </div>
                                {/* username 
                                 */}
                                 <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='text' placeholder='Enter Your Username' className='w-100 input-bg' value={username} onChange={(e)=>setUsername(e.target.value)} />
                                </div>
                                {/* [Password ] */}
                                <div className='mt-4 mb-4'>

                                    <label htmlFor='email'></label>
                                    <input type='email' placeholder='Enter Your Email' className='w-100 input-bg' value={email} onChange={(e)=>setEmail(e.target.value)} />
                                </div>
                                {/* enter password  */}
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='password' placeholder='Enter Your Password' className='w-100 input-bg' value={password} onChange={(e)=>setPassword(e.target.value)} />
                                </div>
                                {/* re-enter password  */}
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='email'></label>
                                    <input type='password' placeholder='Re-Enter Your Password' className='w-100 input-bg' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
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
export default SignupFreelancer;