import React, { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoChatbubblesSharp } from "react-icons/io5";
import Sidebar from "./Sidebar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import io from 'socket.io-client';
import "../css/FreelancerHome.css";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import CompanyLayout from "./CompanyLayout";

const socket = io('http://localhost:3000');

const FreelancerHome = () => {


  // const [messages, setMessages] = useState([
  //   {
  //     sender: 'BOT',
  //     time: '12:45',
  //     text: 'Hi, welcome to SimpleChat! Go ahead and send me a message. 😄',
  //     imageUrl: 'https://image.flaticon.com/icons/svg/327/327779.svg'
  //   },
  //   {
  //     sender: 'Sajad',
  //     time: '12:46',
  //     text: 'You can change your name in JS section!',
  //     imageUrl: 'https://image.flaticon.com/icons/svg/145/145867.svg'
  //   }
  // ]);

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [teamId, setTeamid] = useState('');

  const [teamMembers, setTeamMembers] = useState([]);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [searchedFreelancers, setSearchedFreelancers] = useState([]);
  const [cookies, setCookie] = useCookies(["token","freelancerID"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [activeDeleteIndex, setActiveDeleteIndex] = useState(null); // State to store index of member with active delete button


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handleDivClick = () => {
  //   setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown open/close
  // };
  // Define a new function to handle the icon click
const handleIconClick = (index) => {
  setActiveDeleteIndex(index); // Set active index for delete button
  setIsDropdownOpen(!isDropdownOpen);
};

  const handleDeleteMemberClick = (member) => {

    
    try{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", `token=${cookies.token}`);

    const raw = JSON.stringify({
      memberID: member._id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials:"include"
    };

    fetch(
      "http://localhost:3000/api/v1/Freelancer/deleteMember",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      if(result.message){
        toast.success(result.message);
        window.location.reload();
      }
      else{
        console.log(result.error);
        toast.error(result.error);
      
      }
    })
      .catch((error) => console.error(error));

    } catch (err) {
      console.log("Error: ", err);
    }
     
  };
    
  

  const handleSearch = async (event) => {
    event.preventDefault();
    // Implement your search functionality here
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        username: username,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "http://localhost:3000/api/v1/Freelancer/searchFreelancer",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setSearchedFreelancers(result.freelancer);
          // Close modal after fetching data
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error fetching freelancers:", error);
    }
  };
  useEffect(() => {
    socket.on('newMessage',(message)=>{
      setMessages((prevMessages)=>[...prevMessages,message]);
    });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Cookie", `token=${cookies.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
      };

      fetch("http://localhost:3000/api/v1/Freelancer/fetchteam", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.success) {
            setTeamMembers(result.freelancer.teams.members);
            setTeamid(result.freelancer.teams._id)
            console.log(result.freelancer.teams.members);
          } else {
            console.log(result.message);
          }
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log("Error: ", err);
    }
  }, []);

  const sendMessage =async (e) => {
     e.preventDefault();
    if (!messageInput.trim()) return;

    const messageData = {
        senderId: cookies.freelancerID,
        team: teamId,
        content: messageInput,
        type: 'team',
        // Add any other necessary fields...
    };

    console.log(messageData)

    try {
        const response = await fetch('http://localhost:3000/api/v1/Chat/sendMessage', { // Replace with your backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Message sent successfully:', result);
            // Update the UI to show the message as sent
        } else {
            console.error('Failed to send message:', result.message);
            // Update the UI to indicate the message failed to send
        }
    } catch (error) {
        console.error('Error sending message:', error);
        // Handle any network errors
    }

    setMessageInput('');
  };

  const handleAddMember = (member) => {
    //e.preventDefault()
    console.log(member);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", `token=${cookies.token}`);

      const raw = JSON.stringify({
        memberID: member._id,
      });
      console.log(raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include",
      };

      fetch(
        "http://localhost:3000/api/v1/Freelancer/addTeamMember",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.message) {
            toast.success(result.message);
            window.location.reload();
          } else {
            console.log(result.error);
            toast.error(result.error);
          }
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      
        <CompanyLayout>
        <div className="main-content">
          <h1 className="createProjecttext mb-5">My Team</h1>
          <div className="cards">
            {teamMembers.map((member, index) => (
              <div className="div" key={index}>
                <div className="icon-container">
                  <div
                    className="icon"
                    onClick={() => handleIconClick(index)}
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginRight: "15px",
                    }}
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc1a0044f1d05e5b72e032e8bd9d6dbc683274ac495cf4f99e1660f42c2881c8?"
                      className="img-2"
                      alt="Icon"
                    />
                  </div>
                  {/* Dropdown menu */}
                  {(activeDeleteIndex === index &&isDropdownOpen) && (
                    <div className="dropdown">
                      <button
                        className="deleteButton"
                        onClick={() => handleDeleteMemberClick(member)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className="div-2">
                  <div className="div-3">
                  <img
  loading="lazy"
  srcSet={member?.pfp ? member.pfp : "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
  className="img"
/>
                  </div>
                  <div className="div-4">{member.firstname}</div>
                  <div className="div-5">{member.email}</div>
                </div>
                <div className="div-6">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    View Profile
                  </div>
                </div>
              </div>
            ))}
            <div
              onClick={handleShow}
              className="div"
              id="modal"
              style={{
                justifyContent: "center",
                justifyItems: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <div
                className="div-2"
                style={{ height: "200px", width: "140px" }}
              >
                <IoIosAddCircle size={40} color="#6319b8" />

                <div className="div-4" style={{ color: "#6319b8" }}>
                  Add Member
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <div style={{ backgroundColor: "#6319b88c" }}>
            <Modal.Header closeButton>
              <Modal.Title>Search Team Member by Username</Modal.Title>
            </Modal.Header>
          </div>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontWeight: "bold" }}>Username</Form.Label>
                <Form.Control
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="John Doe"
                  autoFocus
                />
              </Form.Group>
              {/* Display searched members here */}
              <div>
                {searchedFreelancers.map((freelancer, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: "bold" }}>
                        {freelancer.firstname} {freelancer.lastname}
                      </p>
                    </div>
                    <div
                      className="add-btn"
                      onClick={() => handleAddMember(freelancer)}
                      style={{
                        backgroundColor: "#6319B8",
                        color: "white",
                        borderRadius: "5px",
                        padding: "5px",
                      }}
                    >
                      Add
                    </div>
                  </div>
                ))}
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              style={{ backgroundColor: "#6319B8" }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Modal.Footer>
        </Modal>


        <button class="chatBtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><IoChatbubblesSharp className="text-white  chatIcon"/></button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
<p class="btn-close text-reset mx-3 mt-4" data-bs-dismiss="offcanvas">

  </p>
 
  <div class="offcanvas-body ">
     <section className="msger">
    <h3 className="mx-2 my-3 py-2 fixed bg-white chatHeader">Team Chat</h3>

      <main className="msger-chat">
        {messages.map((message, index) => (
          <div key={index} className={`msg ${message.sender === 'BOT' ? 'left-msg' : 'right-msg'}`}>
            <div
              className="msg-img"
              style={{ backgroundImage: `url(${message.imageUrl})` }}
            ></div>

            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">{message.sender}</div>
                <div className="msg-info-time">{message.time}</div>
              </div>

              <div className="msg-text">
                {message.text}    
              </div>

            </div>
          </div>
        ))}
      </main>

      <form className="msger-inputarea" onSubmit={sendMessage}>
        <input type="text" className="msger-input" placeholder="Enter your message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
        <button type="submit" className="msger-send-btn">Send</button>
      </form>
    </section>
  </div>
</div>
        </CompanyLayout>
        



      
    </>
  );
};

export default FreelancerHome;
