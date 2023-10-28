const redux = require('redux');
const createStore = redux.createStore;
const produce = require("immer").produce
const initialState ={
    name :"Ajithkumar",
    address:{
        street: "4 th street",
        city: "bangalore",
        state:"KA"
    }
}

const STREET_UPDATED = "STREET_UPDATED"

const updateStreet = (street)=> ({
    type: STREET_UPDATED,
    payload:street
})

const reducer = (state= initialState,action) =>{
    switch(action.type){
        case STREET_UPDATED:
            return produce(state,(draft)=>{
               draft.address.street = action.payload
            })
        default:
           return state
    }
}

const store =createStore(reducer)

console.log("initial state", store.getState())

const unSubscribe = store.subscribe(()=> console.log("updated state", store.getState()))

store.dispatch(updateStreet("karungallur"))

unSubscribe()