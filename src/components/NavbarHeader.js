import React,{useState,useEffect} from 'react'
import '../css/navbarheader.css';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const NavbarHeader = () =>{
    const [user, setuser] = useState();
    const [cookies] = useCookies(['freelancer','company']);
    useEffect(() => {
        
        if (cookies.company || cookies.freelancer) {
          const apiUrl = cookies.freelancer ?
            'http://localhost:3000/api/v1/Freelancer/details' :
            'http://localhost:3000/api/v1/Company/details';
          var requestOptions = {
            method: 'GET',
            credentials:'include',
            redirect: 'follow'
          };
          
          fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(result => {
              if(result.success){
                if(result.freelancer){
    
                  setuser(result.freelancer);
                }
                else{
                  setuser(result.company);
                }
      
              }
              console.log(result)
          })
            .catch(error => console.log('error', error));
        }
    
      }, [cookies.company, cookies.freelancer]);

      function capitalizeFirstLetter(string) {
        if (!string) return '';  // Handle undefined or null inputs gracefully
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      }

    return(
        <div className='main'>
            <h2>OutsourcePro</h2>
            
            <div className='d-flex gap-2 align-items-center justify-center'>
            <div>
            </div>
            {user?.pfp ? (
                    <img src={user?.pfp} alt="Profile" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                ):(
                    
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvzCHk4vxVX-5J0QrW4fmsT4AjslKpeLnx3A&usqp=CAU' height={40} width={40}/>
                )}
            <Link to="/freelancerProfile" style={{color:"white"}}>{capitalizeFirstLetter(user?.firstname) ||user?.companyname}</Link>
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.64244 9.64764L17.7343 1.5531C18.0886 1.19792 18.0886 0.622467 17.7343 0.266387C17.38 -0.0887958 16.8045 -0.0887958 16.4503 0.266387L9.00046 7.71888L1.55066 0.267284C1.19637 -0.0878995 0.620922 -0.0878995 0.265739 0.267283C-0.0885468 0.622466 -0.0885468 1.19882 0.265739 1.554L8.35759 9.64854C8.70821 9.99834 9.29271 9.99834 9.64244 9.64764Z" fill="white"/>
            </svg>

 

            </div>
          
        </div>
    );
}
export default NavbarHeader;