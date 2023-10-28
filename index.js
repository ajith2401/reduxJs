const CAKE_ORDERED = "CAKE_ORDERED"

function orderCake(){
  return  {
        type: CAKE_ORDERED,
        quantity: 1
    }
}

// an action is an object with the type property
// action creater is a function . which return the action object


// reducer is a function which takes state and action as an arguement and returns a new or next state
// (prevState,action) => newState

const initialState = {numberOfCakes :10}

const reducer  = (state = initialState, action) =>{
    switch (action.type){
        case CAKE_ORDERED:
            return {
                ...state, // copying the state object using spread operator
                numberOfCakes : state.numberOfCakes-1
            }
        default:
            return state
    }

}
