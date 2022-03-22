/* eslint-disable react/prop-types */
import './taskCard.css'
import React, { useState } from 'react'
import { taskDeleted, taskFinished, taskModified } from '../actions/actions'
import store from '../store';
import { FiEdit } from 'react-icons/fi'
import { BiTask, BiTaskX, BiCheckSquare } from 'react-icons/bi'

function taskCard(props) {

  const URL = 'http://localhost:8000';
  const [edit, setEdit] = useState(false);

  const [description, setDescription] = useState(props.description);
  const [date, setDate] = useState(props.date);


  // Detete a Task 
  function handleDelete() {
    store.dispatch(taskDeleted(props.id));
    //Updating in backend 
    fetch(`${URL}/api/delete/${props.id}`, {
      method: 'post',
      mode: 'cors',
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err));
    console.log(store.getState());
  }


  /// Go to Edit mode
  function handleModify() {
    setEdit(true)
  }

  // Modify the task
  async function handleModifyBtn() {
    //Updating in backend 
    const data = {
      description: description,
      deadline: date
    }
    console.log(JSON.stringify(data))
    await fetch(`${URL}/api/modify/${props.id}`, {
      method: 'post',
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        if(res.ok){
          store.dispatch(taskModified(props.id, description, date));
        }
        
        console.log(res);
      }).catch( err => console.error("ERROR: ", err));
    setEdit(!edit)
    console.log(store.getState());
  }


  // Finish a Task
  async function handleComplete() {
    //Updating in backend 
    await fetch(`${URL}/api/complete/${props.id}`, {
      method: 'post',
      mode: 'cors',
    })
    .then(res => res.json)
      .then(res => {
        store.dispatch(taskFinished(props.id));
        console.log(res.msg);
      })
      .catch(err => {
        console.log('ERROR: ', err.message);
      });
  }

  return (
    edit ? (
      <div className='card-container' id={`${props.id}`}>
        <div className='content'>
          <input type="text"
            value={description}
            placeholder="what is your task"
            onChange={(e) => setDescription(e.target.value)}></input>


          <input type="date"
            value={date}
            placeholder="what is your task"
            onChange={(e) => setDate(e.target.value)}></input>
        </div>
        <div className='actions submit'>
          Submit
          <BiCheckSquare color='green' size={30} className='card-btn' onClick={handleModifyBtn}>Submit</BiCheckSquare>
        </div>
      </div>
    ) : (
      <div className='card-container' id={`${props.id}`}>
        <div className='content'>
          <h4>{description}</h4>
          <p>deadline : {date}</p>
        </div>
        <div className='actions'>
          <FiEdit color='black' size={30} className='card-btn' onClick={handleModify} />
          <BiTaskX color='#a60b00' size={30} className='card-btn' onClick={handleDelete} />
          <BiTask color="green" size={30} className='card-btn' onClick={handleComplete} />
        </div>
      </div>
    )

  )
}

export default taskCard