import React,{useState} from 'react'
import '../css/navbar.css'
import { FiLogOut } from "react-icons/fi";
import { BsMicrosoftTeams } from "react-icons/bs";
import { Link,useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { FaPeopleCarry } from "react-icons/fa";

import { GrProjects } from "react-icons/gr";
import { AiFillHome } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { AiFillProject } from "react-icons/ai";



const Navbar = () =>{
  const [cookies, setCookie] = useCookies(["userType"]);


    const handleSignOut = async () => {
        // Check if freelancer is logged in based on cookies
        const userType = getCookie('userType');
        if (userType==='freelancer'){
          try {
            const response = await fetch('http://localhost:3000/api/v1/Freelancer/logout', {
              method: 'GET',
              
            });
    
            if (response.ok) {
              console.log("Freelancer logged out successfully");
              clearCookie('token');
              clearCookie('freelancer');
              clearCookie('freelancerID');
              clearCookie('userType');
              window.location.href = '/';
            } else {
              console.error("Failed to log out freelancer");
            }
          } catch (error) {
            console.error("Error logging out freelancer:", error);
          }
          
        } else if (userType === 'company') {
          try {
            const response = await fetch('http://localhost:3000/api/v1/Company/logout', {
              method: 'GET',
              
            });
    
            if (response.ok) {
              console.log("Company logged out successfully");
              clearCookie('token');
              clearCookie('company');
              clearCookie('companyID');
              clearCookie('userType');
              window.location.href = '/';
            } else {
              console.error("Failed to log out company");
            }
          } catch (error) {
            console.error("Error logging out company:", error);
          }
        } else {
          console.log("No user logged in.");
        }
      };

      const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
          }
        }
        return null;
      };

      const clearCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      };

    const [activeTab, setActiveTab] = useState('Home'); // State to manage active tab

    const handleTabClick = (tabName) => {
        setActiveTab(tabName); // Set the active tab when clicked
    };
    return(
        <div className='nav heading'>
            
            
            {/*  */}

            {cookies.userType==="freelancer" ? (
              <div>
                
            <div             
            className={`tabs ${activeTab === 'Teams' ? 'active' : ''}`} onClick={() => handleTabClick('Teams')}

            >
                <BsMicrosoftTeams style={{ fontSize: '1.75em' }}/>

                <Link to='/FreelancerHome' style={{fontSize:18, paddingTop:3, textDecoration:'none', color:'white'}}>Teams</Link>
            </div>
            <div             
            className={`tabs ${activeTab === 'MyProjects' ? 'active' : ''}`} onClick={() => handleTabClick('MyProjects')}

            >
                <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.4724 12.4719C14.6037 12.4719 16.1502 11.4214 16.945 9.43398C17.5548 7.90868 17.6371 6.10941 17.6371 4.5505C17.6371 1.70112 15.7064 0 12.4724 0C9.23847 0 7.30774 1.70108 7.30774 4.5505C7.30774 6.10941 7.39001 7.90868 7.99989 9.43398C8.79464 11.4214 10.3412 12.4719 12.4724 12.4719Z" fill="white"/>
                <path d="M14.3892 13.8181H10.5261C6.82685 13.8181 3.81738 16.8276 3.81738 20.5268V20.9853C3.81738 23.199 5.61832 25 7.83206 25H17.0833C19.297 25 21.098 23.199 21.098 20.9853V20.5268C21.0979 16.8276 18.0884 13.8181 14.3892 13.8181Z" fill="white"/>
                <path d="M19.2004 4.55052C19.2004 7.14991 18.9414 9.99982 17.2153 11.9875C17.6458 12.1564 18.1282 12.2429 18.6589 12.2429C20.2732 12.2429 21.4446 11.4474 22.0464 9.94232C22.4939 8.82309 22.5543 7.51802 22.5543 6.38897C22.5543 4.40835 21.297 3.06493 19.0195 2.94006C19.1392 3.44614 19.2004 3.9844 19.2004 4.55052Z" fill="white"/>
                <path d="M6.37509 12.2429C6.87837 12.2429 7.33853 12.1656 7.75187 12.0136C6.00351 10.0233 5.74439 7.14719 5.74439 4.55059C5.74439 3.98662 5.80516 3.45026 5.92397 2.9458C3.82406 3.09217 2.47961 4.32254 2.47961 6.38899C2.47961 7.51799 2.53995 8.82311 2.98749 9.94239C3.58937 11.4475 4.76073 12.2429 6.37509 12.2429Z" fill="white"/>
                <path d="M2.25405 20.5268C2.25405 17.5136 3.87368 14.8718 6.28797 13.4257H4.99233C2.23959 13.4257 0 15.6652 0 18.418V18.7437C0 20.1734 0.979657 21.3784 2.3029 21.7231C2.24486 21.2859 2.25405 21.0189 2.25405 20.5268Z" fill="white"/>
                <path d="M20.0207 13.4257H18.6281C21.042 14.872 22.6612 17.5139 22.6612 20.5268C22.6612 21.0143 22.6711 21.2941 22.609 21.7469C23.983 21.4384 25.013 20.2095 25.013 18.7437V18.418C25.013 15.6652 22.7734 13.4257 20.0207 13.4257Z" fill="white"/>
                </svg>

                <Link to='/SoloProjects' style={{fontSize:18, paddingTop:3, textDecoration:'none', color:'white'}}>Solo Projects</Link>
            </div>
            <div             
            className={`tabs ${activeTab === 'Projects' ? 'active' : ''}`} onClick={() => handleTabClick('Projects')}

            >
              <GrProjects size={25}/> 

                <Link to='/allProjects' style={{fontSize:18, paddingTop:3, textDecoration:'none', color:'white'}}>All Projects</Link>
            </div>
            {/* <div 
            className={`tabs ${activeTab === 'Analytics' ? 'active' : ''}`} onClick={() => handleTabClick('Analytics')}

            >
            <svg width="31" height="25" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.0025 0H12.216C11.6242 0 11.1444 0.47977 11.1444 1.07158V23.9212C11.1444 24.513 11.6242 24.9928 12.216 24.9928H18.0025C18.5943 24.9928 19.0741 24.513 19.0741 23.9212V1.07158C19.0741 0.4797 18.5943 0 18.0025 0Z" fill="white"/>
            <path d="M29.1827 13.3234H23.3962C22.8044 13.3234 22.3246 13.8031 22.3246 14.3949V23.9285C22.3246 24.5203 22.8044 25 23.3962 25H29.1827C29.7745 25 30.2543 24.5203 30.2543 23.9285V14.3949C30.2543 13.8031 29.7745 13.3234 29.1827 13.3234Z" fill="white"/>
            <path d="M6.85812 8.53699H1.07158C0.47977 8.53699 0 9.01676 0 9.60857V23.9142C0 24.506 0.47977 24.9858 1.07158 24.9858H6.85812C7.44993 24.9858 7.9297 24.506 7.9297 23.9142V9.60857C7.9297 9.01676 7.44993 8.53699 6.85812 8.53699Z" fill="white"/>
            </svg>
            <Link to='/Analytics' style={{fontSize:18, paddingTop:3, textDecoration:'none', color:'white'}}>Analytics</Link>
            </div> */}

            <div 
            className={`tabs ${activeTab === 'community' ? 'active' : ''}`} onClick={() => handleTabClick('community')}
            >
                {/* <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.6281 9.78542L21.6698 9.53646C21.5083 9.03958 21.3094 8.56042 21.0771 8.10521L22.2865 6.54792C22.776 5.91771 22.7188 5.02812 22.1594 4.48646L20.5187 2.84583C19.9719 2.28125 19.0823 2.225 18.451 2.71354L16.8958 3.92292C16.4406 3.69062 15.9615 3.49167 15.4635 3.33021L15.2146 1.375C15.1208 0.590625 14.4552 0 13.6667 0H11.3333C10.5448 0 9.87917 0.590625 9.78542 1.37187L9.53646 3.33021C9.03854 3.49167 8.55937 3.68958 8.10417 3.92292L6.54792 2.71354C5.91875 2.225 5.02917 2.28125 4.48646 2.84062L2.84583 4.48021C2.28125 5.02812 2.22396 5.91771 2.71354 6.54896L3.92292 8.10521C3.68958 8.56042 3.49167 9.03958 3.33021 9.53646L1.375 9.78542C0.590625 9.87917 0 10.5448 0 11.3333V13.6667C0 14.4552 0.590625 15.1208 1.37187 15.2146L3.33021 15.4635C3.49167 15.9604 3.69062 16.4396 3.92292 16.8948L2.71354 18.4521C2.22396 19.0823 2.28125 19.9719 2.84062 20.5135L4.48125 22.1542C5.02917 22.7177 5.91771 22.774 6.54896 22.2854L8.10521 21.076C8.56042 21.3094 9.03958 21.5083 9.53646 21.6687L9.78542 23.6229C9.87917 24.4094 10.5448 25 11.3333 25H13.6667C14.4552 25 15.1208 24.4094 15.2146 23.6281L15.4635 21.6698C15.9604 21.5083 16.4396 21.3094 16.8948 21.0771L18.4521 22.2865C19.0823 22.776 19.9719 22.7188 20.5135 22.1594L22.1542 20.5187C22.7187 19.9708 22.776 19.0823 22.2865 18.451L21.0771 16.8948C21.3104 16.4396 21.5094 15.9604 21.6698 15.4635L23.624 15.2146C24.4083 15.1208 24.999 14.4552 24.999 13.6667V11.3333C25 10.5448 24.4094 9.87917 23.6281 9.78542ZM12.5 17.7083C9.62812 17.7083 7.29167 15.3719 7.29167 12.5C7.29167 9.62812 9.62812 7.29167 12.5 7.29167C15.3719 7.29167 17.7083 9.62812 17.7083 12.5C17.7083 15.3719 15.3719 17.7083 12.5 17.7083Z" fill="white"/>
                </svg> */}
                <FaPeopleCarry style={{fontSize:30}}/>


                <Link to='/community' style={{fontSize:18, paddingTop:3, textDecoration:'none', color:'white'}}>Community</Link>
            </div>

                </div>
            ): (
              <>
              <div             
            className={`tabs ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => handleTabClick('Home')}

            >
                <AiFillHome size={25} />

                <Link to='/CompanyHome' style={{fontSize:18, paddingTop:3, textDecoration:'none', color:'white'}}>Home</Link>
            </div>

            <div 
            className={`tabs ${activeTab === 'New Project' ? 'active' : ''}`} onClick={() => handleTabClick('New Project')}
            >
                
                
                <IoMdCreate style={{fontSize:30}} />


                <Link to='/createproject' style={{fontSize:18, paddingTop:3, textDecoration:'none', color:'white'}}>New Project</Link>
            </div>

            <div 
            className={`tabs ${activeTab === 'My Projects' ? 'active' : ''}`} onClick={() => handleTabClick('My Projects')}
            >
                
                
                
                <AiFillProject style={{fontSize:30}} />


                <Link to='/allTeamProjects' style={{fontSize:18, paddingTop:3, textDecoration:'none', color:'white'}}>My Projects</Link>
            </div>

            <div 
            className={`tabs ${activeTab === 'community' ? 'active' : ''}`} onClick={() => handleTabClick('community')}
            >
                
                <FaPeopleCarry style={{fontSize:30}}/>


                <Link to='/community' style={{fontSize:18, paddingTop:3, textDecoration:'none', color:'white'}}>Community</Link>
            </div>
              </>
            )}

            

            <div className='tabs' onClick={handleSignOut}>
                <FiLogOut size={27} />

                <div style={{fontSize:18, paddingTop:3}}>Signout</div>
            </div>



        </div>
    
    )
}

export default Navbar;