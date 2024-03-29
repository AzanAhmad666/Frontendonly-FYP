import React from "react";
import Sidebar from "./Sidebar";
import CompanyLayout from "./CompanyLayout";
import '../css/companyhome.css'
import { IoIosAddCircle } from "react-icons/io";
import { TfiViewGrid } from "react-icons/tfi";

import { Link,useNavigate } from 'react-router-dom';


const CompanyHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <CompanyLayout>
        <div className="outerHome"
        style={{position:"relative", left:"10%"}}>
          <div
            className="div-22"
            style={{ height: "200px", width: "200px" }}
            onClick={()=>navigate('/createProject')}
            
          >
            <IoIosAddCircle size={40} color="#6319b8" />

            <div className="div-44  " >
              Create Project
            </div>
          </div>

          <div
            className="div-22"
            style={{ height: "200px", width: "200px" }}
          >
            <TfiViewGrid size={40} color="#6319b8" />

            <div className="div-44">
              View All Projects
            </div>
          </div>

        </div>
      </CompanyLayout>
    </>
  );
};



export default CompanyHome;
