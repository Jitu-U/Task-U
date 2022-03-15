import * as actiontypes from '../actiontypes/actiontypes'

///------Action creators

export const taskLoaded = (data) => ({
    type: actiontypes.TASK_LOADED,
    payload: {
        data: data
    }
})


//1. to add Task
export const taskAdded = (description,date) => ({
    type: actiontypes.TAST_ADDED,
        payload: {
          description: description,
          date: date
        }
})


//2. to delete a task
export const taskDeleted = id => ({
    type: actiontypes.TASK_DELETED,
        payload: {
            id: id
        }
})

//3. to modify a task

export const taskModified = (id, date, description )=> ({
    type: actiontypes.TASK_MODIFIED,
    payload: {
        id: id,
        date: date,
        description: description
    }
})

//4. to Complete a task
export const taskFinished = (id) => ({
    type: actiontypes.TASK_FINISHED,
    payload: {
        id: id
    }
})