const redux =require('redux')

const createStore = redux.createStore; // extracting creaye store method


const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"
const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED"

  // action creaters
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

const initialCakeState = {numberOfCakes :10}

const initialIceCreamState = {numberOfIceCerams :20}

const cakeReducer  = (state = initialCakeState, action) =>{
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

const iceCreamReducer  = (state = initialIceCreamState, action) =>{
    switch (action.type){
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

// combining reducers

const combineReducers = redux.combineReducers

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream : iceCreamReducer
})

const store = createStore(rootReducer) // creating store 

console.log("initial state",store.getState()) // getting state of the store

const unSubscribe = store.subscribe(()=>console.log("updated state", store.getState())) // subcribing the store to the listen state change 

// binding action creaters
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





