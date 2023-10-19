import { createStore ,applyMiddleware} from 'redux'
import logger from 'redux-logger';

//store
const store = createStore(reducer,applyMiddleware(logger.default));

let logs=[];
//reducer
function reducer(state={amount:1},action){
    if(action.type==='increment'){
        return {amount:state.amount+1}
    }
    return state;
}

//global state

store.subscribe(()=>{
    logs.push(store.getState())
    console.log(logs);
})


setInterval(()=>{
    store.dispatch({type:"increment"})
},2000);


// console.log(store.getState())