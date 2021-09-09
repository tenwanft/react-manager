export const initState={
    subMenuList:[],
    loading:true
}
export const initState2={
    a:2,
    b:2
}

export const getReducer=(state=initState,action)=>{
    switch (action.type) {
        case "MENU_LOADING":
            return state={...state,...action.data,...{loading:false}};
        case "MENU_UPDATE":
            return state={...state,...action.data,...{loading:false}};
        default:
            return state
    }
}

export const getReducer2=(state=initState2,action)=>{
    switch (action.type) {
        case "MENU2_LOADING":
            return state={...state,...action.data};
        case "MENU2_UPDATE":
            return state={...state,...action.data};
        default:
            return state
    }
}
