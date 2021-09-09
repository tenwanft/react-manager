const initState={
    loading:true,
    list:[]
}

export const listReducer = (state=initState,action)=>{
    switch (action.type) {
        case "TABLE_LIST_LOADING":
            console.log(123)
            return {...state,...action.data,...{loading:false}};
        default:
            return state
    }
}
