import React from "react";
import '../css/UserTypeSelection.css'
import { LiaBuildingSolid } from "react-icons/lia";
import { IoPeopleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'; 

const UserTypeSelection = () => {
  return (
    <div className="maindiv mt-5 container">
      <h1>
        Welcome to <span className="purple-text">OutsourcePro</span>
      </h1>
      <div className="pt-5">
        <h2 className="description mt-2 text-center">
          Empower Your Projects, Connect Effortlessly
        </h2>
      </div>
      <h2 className="description text-center mt-5 mb-5">Continue As</h2>
      <div className="row pt-5" >
       
        <div className="col-lg-6 col-sm-12 col-xs-12 col-md-6 col-xl-6 d-flex justify-content-center align-items-center">
          <Link to='/loginFreelancer' className="box">
            <p className="fontcolor pt-2 ">
            <IoPeopleOutline className="companyIcon mx-4" style={{fontSize:"xx-large"}} />
                Freelancer</p>
          </Link>
        </div>
        <div className="col-lg-6 col-sm-12 col-xs-12 col-md-6 col-xl-6 d-flex justify-content-center align-items-center">
          <Link to="/login" className="box mt-4 ">
            <p className="fontcolor pt-2 ">
              <LiaBuildingSolid className="companyIcon mx-4" style={{fontSize:"xx-large"}} />
              Company
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
