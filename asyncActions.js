
// you need to use two packages axios - redux-thunk

// then declare the action types

// then create the action creators and reducer 
//  then you need to create store with applyMiddleware(thunkMiddleware) as an second arg
// then you need to create a fuction which return a fuction with dispatching actions



const { createStore,applyMiddleware } = require("redux");
const axios = require("axios")
const thunkMiddleware = require("redux-thunk").default;

const initialState = {
    loading : false,
    user : [],
    error : ""
}

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

const fetchUserRequest = ()  =>{
    return {
        type : FETCH_USER_REQUESTED
    }
}

const fetchUserSuccess = (user)  =>{
    return {
        type : FETCH_USER_SUCCEEDED,
        payload : user
    }
}

const fetchUserFailure = (error)  =>{
    return {
        type : FETCH_USER_FAILED,
        payload:error
    }
}

const reducer = (state= initialState, action)=>{
    switch(action.type){
        case FETCH_USER_REQUESTED :
            return{
                ...state,
                loading:true
            }
        case FETCH_USER_SUCCEEDED :
            return{
                 ...state,
                loading:false,
                user: action.payload

                }
       case FETCH_USER_FAILED :
            return{
                ...state,
                loading:false,
                error:action.payload
                    }
        default:
            return state

    }
};

const fetchUsers = () =>{
    return function (dispatch){
        dispatch(fetchUserRequest());
        axios.get('https://jsonplaceholder.typicode.com/use').then((res)=>
        {
            const user = res.data.map((user)=> user.id)
            dispatch(fetchUserSuccess(user))
        }).catch((error)=>{
            const err = error.message
            dispatch(fetchUserFailure(err))
        })

    }
}
const store = createStore(reducer,applyMiddleware(thunkMiddleware))

store.subscribe(()=>console.log("state",store.getState()))

store.dispatch(fetchUsers())
