const initState = {
    Trades_Data:{},
    Withdraws_Data:{},
    Filter: null,
    GlobalFuntion:Object
}

const rootReducer = (state = initState, action) =>{
    // console.log(state)

    switch(action["type"]){
        case "UPDATE_TRADE":
            return {...state, Trades_Data: action.data}
        case "UPDATE_WITHDRAWS":
            return {...state, Withdraws_Data: action.data}
        case "PASSFUN":
            return {...state, Filter: action.filt}
        case "FUNC":
            return {...state, GlobalFuntion: action.data}
        default:
            return state
    }
}


export default rootReducer