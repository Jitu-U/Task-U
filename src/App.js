/* eslint-disable react/react-in-jsx-scope */

import './App.css';
import store from './store'
import { taskAdded, taskLoaded } from './actions/actions'
import TaskCard from './components/taskCard'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { MdAddTask } from 'react-icons/md'
import {BsListTask} from 'react-icons/bs'
import {VscTasklist} from  'react-icons/vsc'

console.log(store.getState());

const URL= 'http://localhost:8000';

function App() {

  const todayDate = new Date().toISOString().slice(0, 10)
  const [task, setTask] = useState('');
  const [date, setDate] = useState(todayDate);

  function handleSubmit(){
    console.log(date);
    store.dispatch(taskAdded(task,date));
    fetch(`${URL}/api/create`, {
      method: "POST",
    body: JSON.stringify({
      task,
      date
    })
    });
    setTask('');
    setDate(todayDate);
    console.log(store.getState())
  }

  useEffect( async function () {
    await fetch(`${URL}/api/tasks`,{mode: 'cors'})
    .then(response => response.json())
    .then(data =>{ 
      console.log(data);
      store.dispatch(taskLoaded(data));
    });
    },[])

  return (
    <>
    <header className='header'>
       <div className='title'>
            Task Ü
       </div>
      </header>
    <div className="App">
      <section className='tasks'>
        <div className='pending-tasks'>
          <h3>Your Tasks <BsListTask size={30} className='sticker'/></h3>
          { useSelector(store => store.filter( task => task.isComplete === false)).map( task => (<TaskCard key={task.id} id={task.id} description={task.description} date={task.deadline}>
            </TaskCard>)) }
        </div>
        <div className='finished-task'>
          <h3>Finished Tasks<VscTasklist size={30} className='sticker'/></h3>
          { useSelector(store => store.filter( task => task.isComplete === true)).map( task => (<TaskCard key={task.id} id={task.id} description={task.description} date={task.deadline}>
            </TaskCard>)) }
        </div>
      </section>


      {/* Form to add Task */}
      <section className='task-form'>
        <h3><MdAddTask  size={25}className='sticker'/>Add new Task</h3>
        <form className='addTask' id='addTask'>
          <label> what is the task ?</label>
          <input type='text'  value={task} placeholder='add task' onChange={ (e) => {
            setTask(e.target.value);
          }}></input>
          <label> deadline</label>
          <input type='date' value={date} placeholder=' Date' min={todayDate}  onChange={ e => {
            setDate(e.target.value);
          }}></input>
        </form>
        <button className='submit-btn' onClick={handleSubmit}>
            Add Task
          </button>
      </section>
    </div>
    </>
  );
}

export default App;
