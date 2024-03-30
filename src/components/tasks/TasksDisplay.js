import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import '../../css/TasksCard.css';
const useStyles = makeStyles((theme) => ({
  root: {
    width:'100%',
    margin: '20px ',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
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
}));

const TaskCard = ({ task }) => {
  const classes = useStyles();

  const formatDeadline = (deadline) => {
    return new Date(deadline).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.header}>
          <Typography variant="h6">{task.description}</Typography>
          <Typography variant="body2">{task.status}</Typography>
        </div>
        <div className={classes.assignee}>
        {task?.assignee?.pfp ? (
            <img src={task.assignee.pfp} alt="Profile" className={classes.pfp} />
        ):(
                    
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvzCHk4vxVX-5J0QrW4fmsT4AjslKpeLnx3A&usqp=CAU' className={classes.pfp}/>
        )}
          
          <Typography variant="subtitle1">{task.assignee.firstname}</Typography>
        </div>
        <Typography variant="body2">Deadline: {formatDeadline(task.deadline)}</Typography>
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
