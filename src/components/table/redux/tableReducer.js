const initState={
    loading:true,
    list:[]
}

export const tableReducer = (state=initState,action)=>{
    switch (action.type) {
        case "TABLE_TWO_LOADING":
            return {...state,...action.data,...{loading:false}};
        default:
            return state
    }
}
