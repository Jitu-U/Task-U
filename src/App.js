import './App.css';
import store from './store'
import { taskAdded, taskDeleted } from './actions/actions'
import TaskCard from './taskCard'
import { useState } from 'react'
 


store.dispatch(taskAdded('Mello'));
store.dispatch(taskAdded('Mello'));
console.log(store.getState());

store.dispatch(taskDeleted(1));


console.log(store.getState());


function App() {

  const todayDate = new Date().toISOString().slice(0, 10)
  const [task, setTask] = useState('');
  const [date, setDate] = useState(todayDate);

  function handleSubmit(){
    store.dispatch(taskAdded(task,date));
    console.log(store.getState())
  }

  return (
    <div className="App">
      <section className='tasks'>
        <div className='pending-tasks'>
          <h3>Your Tasks</h3>
          { store.getState().map( task => (<TaskCard key={task.id} description={task.description} date={task.date}>
            </TaskCard>)) }
        </div>
        <div className='finished-task'>
          <h3>Finished Tasks</h3>
        </div>
        <div className='deleted-task'>
          <h3>Deleted Tasks</h3>
        </div>
      </section>


      {/* Form to add Task */}
      <section className='task-form'>
        <h3>Add new Task</h3>
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
  );
}

export default App;
