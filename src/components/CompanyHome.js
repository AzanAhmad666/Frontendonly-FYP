import React from "react";
import Sidebar from "./Sidebar";
import CompanyLayout from "./CompanyLayout";
import { FaLaptopCode } from "react-icons/fa";
import '../css/companyhome.css'
import { IoIosAddCircle } from "react-icons/io";
import { TiGroupOutline } from "react-icons/ti";

import { Link,useNavigate } from 'react-router-dom';


const CompanyHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <CompanyLayout>
        <div className="outerHome "
       >
          <div
            className="div-22 "
            style={{ height: "200px", width: "200px" }}
            onClick={()=>navigate('/createProject')}
            
          >
            <IoIosAddCircle size={44} color="#6319b8" />

            <div className="div-44 mt-3 ">
              Create Project
            </div>
          </div>

          <div
            className="div-22"
            style={{ height: "200px", width: "200px" }}
          >
            <TiGroupOutline size={45} color="#6319b8" />

            <div className="div-44 mt-3 ">
            Team Projects
            </div>
          </div>

          <div
            className="div-22 "
            style={{ height: "200px", width: "200px" }}
            onClick={()=>navigate('/createProject')}
            
          >
            <FaLaptopCode size={44} color="#6319b8" />

            <div className="div-44 mt-3 ">
              Freelance Projects
            </div>
          </div>

        </div>
      </CompanyLayout>
    </>
  );
};



export default CompanyHome;
