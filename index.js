import { createStore ,applyMiddleware, combineReducers} from 'redux'
import logger from 'redux-logger';
import axios from 'axios';
//store
const init="init";
const inc="increment";
const dec="decrement";
const incByAmt="incrementByAmount";
const incBonus="increaseBonus";

const store = createStore(combineReducers({
    account:accountReducer,
    bonus:bonusReducer
}),applyMiddleware(logger.default));

let logs=[];
//reducer
function accountReducer(state={amount:1},action){

    switch(action.type){
        case init:
            return{amount:action.payload}
        case inc:
            return {amount:state.amount+1}
        case dec:
            return {amount:state.amount-1}
        case incByAmt:
            return{amount:state.amount+action.payload}
        default:
            return state;
    }
    return state;
}

function bonusReducer(state={points:0},action){
    switch(action.type){
        case incBonus:
            return {points:state.points+1}
        case incByAmt:
            if( action.payload>=200){
                return {points:state.points+1}
            }
            return state;
        default:
            return state;
    }
}
//action creators
function initUser(value){
    return {
        type:init,
        payload:value,
    }
}


function incrementBonus(){
    return {type:incBonus};
}

//global state

store.subscribe(()=>{
    logs.push(store.getState())
    console.log(logs);
})


setInterval(()=>{
    // store.dispatch({type:"increment"})
    store.dispatch(initUser(500));
},2000);



// console.log(store.getState())