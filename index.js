const { act } = require('react-dom/test-utils');
const redux =require('redux')

const createStore = redux.createStore; // extracting creaye store method


const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"

function orderCake(){
  return  {
        type: CAKE_ORDERED,
        payload: 1
    }
} 

function restockCake(quantity=1){
    return  {
          type: CAKE_RESTOCKED,
          payload: quantity
      }
  }
  
  // action creater

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
                numberOfCakes : state.numberOfCakes-action.payload
            }
        case CAKE_RESTOCKED:
            return{
                ...state,
                numberOfCakes : state.numberOfCakes + action.payload
            }
        default:
            return state
    }

}

const store = createStore(reducer) // creating store 

console.log("initial state",store.getState()) // getting state of the store

const unSubscribe = store.subscribe(()=>console.log("updated state", store.getState())) // subcribing the store to the listen state change 

store.dispatch(orderCake())
store.dispatch(orderCake()) 
store.dispatch(orderCake())
store.dispatch(restockCake(3))

// binding action createra
const bindActionCreators = redux.bindActionCreators

const actions = bindActionCreators({orderCake, restockCake},store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)




unSubscribe() //unsubcribing the store 





