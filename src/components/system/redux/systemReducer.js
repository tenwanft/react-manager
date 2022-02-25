const initState = {
    list:[],
    loading:true
}

export const SystemReducer = (state=initState,action)=>{
    switch (action.type) {
        case "SYSTEM_LOADING":
            return {...state,...{loading:true}};
        case "SYSTEM_UPDATE":
            return {...state,...{list:action.data,loading:false}};
        default:
            return state
    }
}
