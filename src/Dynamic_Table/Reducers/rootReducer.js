const initState = {
    Trades_Data:{},
    Withdraws_Data:{}
}

const rootReducer = (state = initState, action) =>{
    // console.log(state)

    switch(action["type"]){
        case "UPDATE_TRADE":
            return {...state, Trades_Data: action.data}
        case "UPDATE_WITHDRAWS":
            return {...state, Withdraws_Data: action.data}
        default:
            return state
    }
}


export default rootReducer