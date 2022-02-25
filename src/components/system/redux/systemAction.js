import {data} from "../../../api/mock/data";

export function getSystemList() {
    console.log(data,'===')
    return (dispatch,getState)=>{
        setTimeout(()=>{
            dispatch({
                type:"SYSTEM_UPDATE",
                data:data.subMenuList
            })
        },1000)
    }
}
