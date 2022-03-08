import * as actiontypes from '../actiontypes/actiontypes'

///------Action creators

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