import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button,FormControl,InputLabel, Select, MenuItem,  } from '@material-ui/core';
import '../../css/TasksCard.css';
import {useCookies} from 'react-cookie'
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    width:'97%',
    margin: '20px ',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  },
  completed: {
    width:'97%',
    margin: '20px ',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: 'lightgreen',
    color: 'black'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  assignee: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  pfp: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  fileInput: {
    display: 'none',
    
  },
}));

const TaskCard = ({ task }) => {
  const classes = useStyles();
  const [cookies] = useCookies(['token',"freelancerID"])
  const [selectedStatus, setselectedStatus] = useState(task.status);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileURL, setfileURL] = useState(null);
  const [taskID, settaskID] = useState()

  const options = [
    {
      id:1,
      value: 'pending',
    },
    {
      id:2,
      value: 'submitted',
    },
    {
      id:3,
      value: 'completed',
    },
    {
      id:4,
      value: 'overdue',
    },

  ]

  const formatDeadline = (deadline) => {
    return new Date(deadline).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const uploadFileToFirebase = async () => {
    try {
      const formData = new FormData();
      formData.append('filename', file);
  
      const myHeaders = new Headers();
      myHeaders.append('Cookie', `token=${cookies.token}`);
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow',
      };
  
      const response = await fetch('http://localhost:3000/api/v1/uploadFile', requestOptions);
      const result = await response.json();
  
      
  
      if (result.success) {
        // Update fileURL state
        setfileURL(result.url);
      } else {
        // Handle the case where the upload was not successful
        console.error('File upload failed:', result.message);
        
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Propagate the error to the caller
    }
  };
  

  const handleSaveChanges = (taskId) => {
    // Implement your submission logic here
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", `token=${cookies.token}`);
    
    const raw = JSON.stringify({
      "taskId": taskId,
      "status": selectedStatus
    });
    console.log(raw)
    
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include"
    };
    
    fetch("http://localhost:3000/api/v1/Freelancer/updateTaskStatus", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.success){
          toast.success(result.message)
         
        
        
        window.location.reload()
    
    
        }
        else {
          toast.error(result.message)
    
        }
      })
      .catch((error) => console.error(error));
    
          
         
    
    
  };
  const handleSubmit = async (taskId) => {

    settaskID(taskId)
    console.log(taskId, file)
    // Implement your submission logic here
    if (file) {
      
        try {
          // Upload file to Firebase
          await uploadFileToFirebase();
  
          
        } catch (error) {
          console.error('Error uploading file:', error);
          
        }
      
    } else {
      toast.error('Please select a file');
      console.log('error');
      
    }
    
    
  };

  useEffect(() => {
    
    if (fileURL && taskID){
      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", `token=${cookies.token}`);

const raw = JSON.stringify({
  "taskId": taskID,
  "workDone": fileURL
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
  credentials: "include"
};

fetch("http://localhost:3000/api/v1/Freelancer/updateTask", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    if (result.success){
      toast.success(result.message)
      //reset fields
    setFile(null);
    setFileName('')
    setfileURL(null)
    settaskID(null)
    window.location.reload()


    }
    else {
      toast.error(result.message)

    }
  })
  .catch((error) => console.error(error));

      
      
    }
  }, [fileURL,taskID]);

  return (
    <Card className={task.status==='completed' ? classes.completed :classes.root}>
      <CardContent>
        <div className={classes.header}>
          <Typography variant="h6">{task.description}</Typography>
          {task.owner===cookies.freelancerID ? (
            <FormControl className='mb-3' style={{ marginBottom: 10 }}>
            <Select
              value={selectedStatus}
              onChange={(e) => setselectedStatus(e.target.value)}
            >
              {options.map(option => (
                <MenuItem key={option.id} value={option.value}>{option.value}</MenuItem>
              ))}
            </Select>
          </FormControl>
          ):(

          <Typography variant="body2">{task.status}</Typography>
          )}
        </div>
        <div className={classes.assignee}>
        {task?.assignee?.pfp ? (
            <img src={task.assignee.pfp} alt="Profile" className={classes.pfp} />
        ):(
                    
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvzCHk4vxVX-5J0QrW4fmsT4AjslKpeLnx3A&usqp=CAU' className={classes.pfp}/>
        )}
          
          <Typography variant="subtitle1">{task.assignee.firstname}</Typography>
        </div>
        <Typography className='mb-2' variant="body2">Deadline: {formatDeadline(task.deadline)}</Typography>
        {task.submittedWork && (
              <div className='mb-3' >
                <a href={task.submittedWork} 
                target='_blank'
                rel='noopener noreferrer'
                download
                >
                  Download My Work
                </a>
              </div>
            )}
            {/*Only logged in freelancer can submit*/}
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {cookies.freelancerID === task.assignee._id &&  (
            <div>
            <input
              type="file"
              className={classes.fileInput}
              id={`fileInput-${task._id}`}
              onChange={handleFileChange}
            />

            <label htmlFor={`fileInput-${task._id}`}>
              <Button variant="outlined" component="span">
                Choose File
              </Button>
            </label>

           
            <Button style={{marginLeft: '6px'}} variant="contained" color="primary" onClick={()=>handleSubmit(task._id)}>
              Submit
            </Button>
            </div>

            )}
            <div></div>
            
            {(task.status !== selectedStatus) && cookies.freelancerID === task.owner && (
              <Button style={{marginLeft: '6px'}} variant="contained" color="primary" onClick={()=>handleSaveChanges(task._id)}>
              Save Changes
            </Button>
            )}
            
          </div>

          
        {fileName && <Typography style={{marginTop: '10px'}} className={classes.fileName}>{fileName}</Typography>}
        {/* Add other task details as needed */}

      </CardContent>
    </Card>
  );
};

const TasksDisplay = ({ tasks }) => {
  return (
    <div >
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TasksDisplay;
