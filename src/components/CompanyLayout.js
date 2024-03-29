import React from 'react';
import Navbar from './Navbar';
import '../css/companyLayout.css';
import NavbarHeader from './NavbarHeader';
const CompanyLayout = ({children}) => {
    return <div className=''>
          <NavbarHeader/>
        <div className='d-flex  flex-md-row flex-column '>
            <Navbar />
            <div style={{width:'100%', marginLeft:'300px'}}>
                {children}
            </div>
        </div>
        <div>
            <div>
              
            </div>
            
        </div>
        
       

    </div>;
}



export default CompanyLayout;