const initState = {
    Trades_Data:{},
    Withdraws_Data:{},
    Filter: null
}

const rootReducer = (state = initState, action) =>{
    console.log(state)

    switch(action["type"]){
        case "UPDATE_TRADE":
            return {...state, Trades_Data: action.data}
        break
        case "UPDATE_WITHDRAWS":
            return {...state, Withdraws_Data: action.data}
        break
        case "PASSFUN":
            return {...state, Filter: action.filt}
        break

        default:
            return state
    }
}


export default rootReducer