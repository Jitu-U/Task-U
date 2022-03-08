import produce from 'immer'
import * as actiontypes from '../actiontypes/actiontypes'

let id = 0;

export default function reducer(state = [], action) {
        switch(action.type){
            case actiontypes.TAST_ADDED:
                return [
                    ...state,{
                        id:  ++id,
                        description: action.payload.description,
                        deadline:  action.payload.date,
                        isComplete: false,
                    }
                        
                ];
            case actiontypes.TASK_FINISHED: 
            return produce(state, newState => {
                const todo = newState.find(todo => todo.id === id)
                todo.done = !todo.done;
            })

            case actiontypes.TASK_DELETED:
                return state.filter( task => task.id !== action.payload.id);
            case actiontypes.TASK_MODIFIED:
                return
            default:
                return state
        }
}

