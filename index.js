// Your explanation touches on various aspects of setting up a Redux application, but it's a bit fragmented. I'll provide a structured summary to clarify the correct steps for setting up a Redux application:

// 1. Declare Action Types:
//    - Start by declaring action types as constants. These action types represent the actions that can occur in your application.

//    const INCREMENT = 'INCREMENT';
//    const DECREMENT = 'DECREMENT';
// 

// 2. Create Action Creators:
//    - Action creators are functions that return action objects. These action objects include a `type` field to specify the action type and additional data if necessary.

//    function increment() {
//      return { type: INCREMENT };
//    }

//    function decrement() {
//      return { type: DECREMENT };
//    }
// 

// 3. Create a Redux Store:
//    - Use the `createStore` method from Redux to create a Redux store. The store holds your application's state and has a `dispatch` method to dispatch actions.

//    import { createStore } from 'redux';

//    const initialState = 0; // Initial state
//    const reducer = (state = initialState, action) => {
//      switch (action.type) {
//        case INCREMENT:
//          return state + 1;
//        case DECREMENT:
//          return state - 1;
//        default:
//          return state;
//      }
//    };

//    const store = createStore(reducer);
// 

// 4. Subscribe to the Store:
//    - You can subscribe to the store to be notified when the state changes. This is typically used for updating the UI when the state changes.

//    store.subscribe(() => {
//      console.log('State changed:', store.getState());
//    });
// 

// 5. Get the Current State:
//    - You can retrieve the current state from the store using the `getState` method.

//    console.log('Initial state:', store.getState());
// 

// 6. Bind Action Creators:
//    - To simplify the dispatching of actions, you can use the `bindActionCreators` function from the `redux` library.

//    import { bindActionCreators } from 'redux';

//    const actions = { increment, decrement };
//    const boundActions = bindActionCreators(actions, store.dispatch);
// 

// Now, you can use `boundActions.increment()` and `boundActions.decrement()` to dispatch actions without needing to call `store.dispatch` directly.

// Your explanation covers the key concepts, but it's important to structure your code and follow best practices for a complete Redux setup.

const redux =require('redux')
const applyMiddleWare = redux.applyMiddleware
const reduxLoggger =require("redux-logger")
const logger = reduxLoggger.createLogger()

const createStore = redux.createStore; // extracting creaye store method
 

const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"
const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED"

  // action creators
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
 
function orderIceCream(quantity=1){
    return {
     type: ICECREAM_ORDERED,
     payload : quantity
    }
}

function restockIceCream(quantity=1){
    return{
        type:ICECREAM_RESTOCKED,
        payload:quantity
    }
}


// an action is an object with the type property
// action creater is a function . which return the action object

// reducer is a function which takes state and action as an arguement and returns a new or next state
// (prevState,action) => newState

const initialState = {numberOfCakes :10,
    numberOfIceCerams :20}

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
        case ICECREAM_ORDERED:
            return{
                ...state,
                numberOfIceCerams: state.numberOfIceCerams - action.payload
            }
        case ICECREAM_RESTOCKED:
            return{
                ...state,
                numberOfIceCerams : state.numberOfIceCerams + action.payload
            }
        default:
            return state
    }

}

const store = createStore(reducer,applyMiddleWare(logger)) // creating store 

console.log("initial state",store.getState()) // getting state of the store

const unSubscribe = store.subscribe(()=>{}) // subcribing the store to the listen state change 

store.dispatch(orderCake())
store.dispatch(orderCake()) 
store.dispatch(orderCake())
store.dispatch(restockCake(3))

// binding action createra
const bindActionCreators = redux.bindActionCreators

const actions = bindActionCreators({orderCake, restockCake,orderIceCream,restockIceCream},store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(3)

unSubscribe() //unsubcribing the store 





