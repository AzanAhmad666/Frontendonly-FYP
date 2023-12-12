import React from 'react';
import { useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosInformationCircle } from "react-icons/io";
import '../css/sidebar.css'
import Sidebar from './Sidebar';




const CreateProject = () => {

  const [projectTitle, setProjectTitle] = useState('');
  const [projectType, setProjectType] = useState('');
  const [technologyStack, setTechnologyStack] = useState('');
  const [description, setDescription] = useState('');
  const [membersRequired, setMembersRequired] = useState('');
  const [addedMembers, setAddedMembers] = useState([]);

  const handleAddMember = () => {
    if (membersRequired.trim() !== '') {
      // Only add non-empty members
      setAddedMembers((prevMembers) => [...prevMembers, membersRequired]);
      setMembersRequired(''); // Clear the input field after adding the member
    }
  };

  const handleDeleteMember = (index, event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Remove the member at the specified index from addedMembers
    setAddedMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Parse membersRequired as an integer, defaulting to 0 if not a valid number
    const parsedMembersRequired = parseInt(membersRequired, 10) || 0;
  
    // Calculate the total number of required members
    const totalMembersRequired = addedMembers.length + parsedMembersRequired;
  
    // Handle form submission with the state values
    console.log('Form submitted:', {
      projectTitle,
      projectType,
      technologyStack,
      description,
      membersRequired: totalMembersRequired,
      addedMembers,
    });
  };
  
  
  console.log('State:', {
    projectTitle,
    projectType,
    technologyStack,
    description,
    membersRequired,
  });


    return( 
    <>
     <div className="flexContainer">
    <Sidebar/>
    <div className="main-content">
    <div>
        <h1 className="createProjecttext mt-5">Create Project</h1>
      <p className="createProjecttext mt-2">You can create your project here.</p>
      <form>
        <p className="createProjecttext mt-3"><IoIosInformationCircle className='mx-2 mb-1' style={{fontSize: 'large', color:'#6319B8'}}/>Project title:</p>
        <input className="inputTitle"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
        />
        
        <p className="createProjecttext mt-3"><IoIosInformationCircle className='mx-2 mb-1' style={{fontSize: 'large', color:'#6319B8'}}/>Project type:</p>
        <input className="inputTitle"
        value={projectType}
        onChange={(e) => setProjectType(e.target.value)}
        />
        
        <p className="createProjecttext mt-3"><IoIosInformationCircle className='mx-2 mb-1' style={{fontSize: 'large', color:'#6319B8'}}/>Technology Stack:</p>
        <input className="inputTitle"
        value={technologyStack}
        onChange={(e) => setTechnologyStack(e.target.value)}
        />
        
        <p className="createProjecttext mt-3"><IoIosInformationCircle className='mx-2 mb-1' style={{fontSize: 'large', color:'#6319B8'}}/>Description:</p>
        <textarea className="textArea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        
        <p className="createProjecttext mt-3"><IoIosInformationCircle className='mx-2 mb-1' style={{fontSize: 'large', color:'#6319B8'}}/>Members Required:</p>
        <div className="row">
          <div className="col-sm-12 col-xs-12 col-lg-6 col-md-6 col-xl-6 col-xxl-12 ">
            <input className="inputTitle mt-2"
            value={membersRequired}
            onChange={(e) => setMembersRequired(e.target.value)}
            />
            <input className=" addButton mx-2 mt-2" type="button" value="Add" onClick={handleAddMember} />
          </div>
        </div>
        {/* Display added members */}
        {addedMembers.length > 0 && (
                <div className="mt-3">
                  <p className="createProjecttext">Added Members:</p>
                  <div>
                    {addedMembers.map((member, index) => (
                      <div key={index} className="d-flex align-items-center">
                        <span style={{ marginRight: '10px' }}>{index + 1}.</span>
                        <span>{member}</span>
                        <RiDeleteBin6Line
                          className="deleteIcon mx-2 "
                          style={{ fontSize: 'large', color: '#6319B8' }}
                          onClick={(e) => handleDeleteMember(index, e)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* ... (rest of the form) */}
        <div className='d-flex justify-content-center align-items-center'>
        <input className=" submitButton mx-5 mt-5 " type="button" value="Submit"
        onClick={handleSubmit}
        />
        </div>
      </form>
    </div>;
    </div>
  </div>
    </>
    );
}




export default CreateProject;