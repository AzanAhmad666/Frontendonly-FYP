// import React from "react";
// import '../css/UserTypeSelection.css'
// import { LiaBuildingSolid } from "react-icons/lia";
// import { IoPeopleOutline } from "react-icons/io5";
// import { Link } from 'react-router-dom';

// const UserTypeSelection = () => {
//   return (
//     <div className="maindiv mt-5 container">
//       <h1>
//         Welcome to <span className="purple-text">OutsourcePro</span>
//       </h1>
//       <div className="pt-5">
//         <h2 className="description mt-2 text-center">
//           Empower Your Projects, Connect Effortlessly
//         </h2>
//       </div>
//       <h2 className="description text-center mt-5 mb-5">Continue As</h2>
//       <div className="row pt-5" >

//         <div className="col-lg-6 col-sm-12 col-xs-12 col-md-6 col-xl-6 d-flex justify-content-center align-items-center">
//           <Link to='/loginFreelancer' className="box">
//             <p className="fontcolor pt-2 ">
//             <IoPeopleOutline className="companyIcon mx-4" style={{fontSize:"xx-large"}} />
//                 Freelancer</p>
//           </Link>
//         </div>
//         <div className="col-lg-6 col-sm-12 col-xs-12 col-md-6 col-xl-6 d-flex justify-content-center align-items-center">
//           <Link to="/login" className="box mt-4 ">
//             <p className="fontcolor pt-2 ">
//               <LiaBuildingSolid className="companyIcon mx-4" style={{fontSize:"xx-large"}} />
//               Company
//             </p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserTypeSelection;

import React from "react";
import "../css/UserTypeSelection.css";
import { LiaBuildingSolid } from "react-icons/lia";
import { IoPeopleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import outsourceLogo from "../images/outsource-logo.png";
import outsourcing from "../images/outsourcing.jpg";
import freelancerLogo from "../images/freelancer-logo.png";
import companyLogo from "../images/company-logo.png";

const UserTypeSelection = () => {
  return (
    <div className="main-container">
      <div class="logo-div">
        <img src={outsourceLogo} alt="Outsource Logo" />
      </div>

      <div class="content-div">
        <div class="headings-div">
          <h3>Welcome to OutsourcePro!</h3>
          <p>Empower Your Projects, Connect Effortlessly</p>
          <span>Continue As</span>
        </div>
        {/* continue as Freelancer or company  */}
        <div className="parentBtn">
          <div className="user-choice">
            <Link to="/loginFreelancer" className="box">
              <button class="btn">
                <IoPeopleOutline className="companyIcon mx-4" style={{fontSize:"xx-large", color:'#6319b8'}} />
                <p> Freelancer</p>
              </button>
            </Link>
          </div>
          <div className="user-choice">
          <Link to="/login" className="box">
            <button class="btn">
              <LiaBuildingSolid className="companyIcon mx-4" style={{fontSize:"xx-large", color:'#6319b8'}}/>
              <p>Company</p>
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="pt-5">
        
      </div> */}

      {/* <div className="row pt-5" > */}

      {/* <div className="col-lg-6 col-sm-12 col-xs-12 col-md-6 col-xl-6 d-flex justify-content-center align-items-center">
          <Link to='/loginFreelancer' className="box">
            <p className="fontcolor pt-2 ">
            <IoPeopleOutline className="companyIcon mx-4" style={{fontSize:"xx-large"}} />
                Freelancer</p>
          </Link>
        </div> */}

      {/* </div> */}
    </div>
  );
};

export default UserTypeSelection;
