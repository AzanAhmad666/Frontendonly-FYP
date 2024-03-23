import '../css/signup.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useState, setError } from 'react';

const ForgetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [showOTPField, setShowOTPField] = useState(false); // State to manage the visibility of OTP field
    const [otp, setOTP] = useState('');
    const [showResetPasswordFields, setShowResetPasswordFields] = useState(false); // State to manage the visibility of reset password fields
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleForgetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/v1/Freelancer/forgetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                setShowOTPField(true); // Show OTP field once OTP is sent
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Error");
        }
    };

    const handleOTPVerification = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/v1/Freelancer/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    resetPasswordToken: otp // Assuming otp is the variable holding the entered OTP
                }),
            });
    
            const result = await response.json();
    
            if (result.success) {
                toast.success(result.message);
                setShowResetPasswordFields(true); // Show reset password fields once OTP is verified
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Error");
        }
    };

    const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        toast.error("Passwords don't match");
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/api/v1/Freelancer/setnewpassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password: newPassword
            }),
        });
        const result = await response.json();
        if (result.success) {
            toast.success(result.message);
            // Redirect user to login page or any other appropriate action
        } else {
            toast.error(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        toast.error("Failed to set new password. Please try again later.");
        console.log(email,newPassword)
    }
};

    return (
        <div className='container'>
            <div className=' d-flex allign-item-center justify-content-center  '>
                <h1 className='outsource-heading'>OutsourcePro</h1>
            </div>
            <div className=' main-signin-padding'>
                <div className='container container-bg'>
                    <div className='d-flex justify-content-center mb-3'>
                        <h1 className='signin-text'>Forget Password</h1>
                    </div>
                    <form onSubmit={showOTPField ? (showResetPasswordFields ? handleResetPassword : handleOTPVerification) : handleForgetPassword}>
                        <div className='mt-3 mb-3 w-100'>
                            <label htmlFor='email'></label>
                            <input type='email' required placeholder='Enter Your Email' className='w-100 input-bg' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {showOTPField && ( // Render OTP field only if showOTPField is true
                            <div className='mt-3 mb-3 w-100'>
                                <label htmlFor='otp'></label>
                                <input type='text' required placeholder='Enter OTP' className='w-100 input-bg' value={otp} onChange={(e) => setOTP(e.target.value)} />
                            </div>
                        )}
                        {showResetPasswordFields && ( // Render reset password fields only if showResetPasswordFields is true
                            <>
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='newPassword'></label>
                                    <input type='password' required placeholder='Enter New Password' className='w-100 input-bg' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className='mt-3 mb-3 w-100'>
                                    <label htmlFor='confirmPassword'></label>
                                    <input type='password' required placeholder='Confirm New Password' className='w-100 input-bg' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                            </>
                        )}
                        <div className='d-flex mb-3 justify-content-end'>
                            <button type="submit" className='signin-button text-white'>
                                {showResetPasswordFields ? 'Set New Password' : (showOTPField ? 'Verify OTP' : 'Send Code')}
                            </button>
                        </div>
                        <div className='doesnt-have-account'>
                            <p>Remember your password?</p>
                            <Link to='/loginfreelancer' className='create-account-text'> Sign in </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordForm;
