/* eslint-disable react/prop-types */
import './taskCard.css'
import React, { useState } from 'react'
import{ taskDeleted, taskFinished, taskModified } from '../actions/actions'
import store from '../store';
import { FiEdit } from 'react-icons/fi'
import { BiTask,BiTaskX,BiCheckSquare } from 'react-icons/bi'

function taskCard(props) {

  const URL= 'http://localhost:8000';
  const [edit, setEdit] = useState(false);

  const [description, setDescription ] = useState(props.description);
  const [date, setDate] = useState(props.date);

 
  // Detete a Task 
  function handleDelete(){
  store.dispatch(taskDeleted(props.id));
    //Updating in backend 
    fetch(`${URL}/api/delete/${props.id}`, {
      method: 'post',
      mode: 'no-cors'
    })
    .then(res => res.json())
    .then( res => console.log(res))
    .catch( err => console.error(err));
  console.log(store.getState());
  }

  
/// Go to Edit mode
  function handleModify(){
    setEdit(true)
  }

// Modify the task
  function handleModifyBtn(){
    store.dispatch(taskModified(props.id, description, date));
    //Updating in backend 
    fetch(`${URL}/api/modify`, {
      method: 'post',
      mode: 'no-cors',
      body: {
        id: props.id,
        description: description,
        deadline: date
      }
    })
    .then(res => res.json())
    .then( res => console.log(res));
    setEdit(!edit)
    console.log(store.getState());
  }


  // Finish a Task
  function handleComplete(){
    store.dispatch(taskFinished(props.id));
    console.log(props._id);
    //Updating in backend 
    fetch(`${URL}/api/complete/${props.id}`, {
      method: 'post',
      mode: 'no-cors',
    })
    .then(res => res.json())
    .then( res =>{
      alert(res);
    })
    .catch( err => {
      alert('☹️ Failed to complete yout request');
      console.log('ERROR: ', err.message);
    });
   // console.log(store.getState()[props.id].isCompelete)
  }
  return (
    edit ? (
      <div className='card-container' id={`${props.id}`}>
      <div className='content'>
          <input type= "text" 
          value={description} 
          placeholder="what is your task" 
          onChange={ (e) => setDescription(e.target.value)}></input>


           <input type= "date" 
          value={date} 
          placeholder="what is your task" 
          onChange={ (e) => setDate(e.target.value)}></input>
      </div>
      <div className='actions submit'>
        Submit
          <BiCheckSquare color='green' size={30} className='card-btn' onClick={handleModifyBtn}>Submit</BiCheckSquare>
      </div>
  </div>
    ): (
      <div className='card-container' id={`${props.id}`}>
      <div className='content'>
          <h4>{description}</h4>
          <p>deadline : {date}</p>
      </div>
      <div className='actions'>
          <FiEdit color='black' size={30} className='card-btn' onClick={handleModify}/>
          <BiTaskX color='#a60b00' size={30} className='card-btn' onClick={handleDelete}/>
          <BiTask color="green" size={30} className='card-btn' onClick={handleComplete}/>
      </div>
  </div>
    )
   
  )
}

export default taskCard