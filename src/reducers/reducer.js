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
              return      [
                ...state.slice(0,action.payload.id-1),
                {...state[action.payload.id-1],
                    isComplete: true
                    },
                    ...state.slice(action.payload.id),
            ]

            case actiontypes.TASK_DELETED:
                return state.filter( task => task.id !== action.payload.id);
            case actiontypes.TASK_MODIFIED:
                return [
                    ...state.slice(0,action.payload.id-1),
                    {...state[action.payload.id-1],
                         description: action.payload.description,
                         deadline: action.payload.date
                        },
                        ...state.slice(action.payload.id),
                ]
            default:
                return state
        }
}

