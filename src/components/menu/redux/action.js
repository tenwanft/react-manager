// 进行异步操作的地方，比如异步调接口这样的
import {getMenuData} from "../../../api/menu";
let list = {subMenuList:[
    {key:'sub1',title:'sub1',children:[{
            key:'1',titleText:'列表1',url:'/menu/list'
        },{
            key:'2',titleText:'列表2',url:'/menu/tableList'
        },{
            key:'3',titleText:'图表1',url:'/menu/charts'
        },{
            key:'4',titleText:'流程图',url:'/menu/X6Charts'
        }
        ]},
    { key:'sub2',title:'sub2',children:[{
            key:'5',titleText:'性能优化',url:'/menu/test'
        },{
            key:'6',titleText:'option6'
        },{
            key:'7',titleText:'option7'
        },{
            key:'8',titleText:'option8'
        }
        ]},
    {key:'sub3',title:'sub3',children:[{
            key:'9',titleText:'option9'
        },{
            key:'10',titleText:'option10'
        },{
            key:'11',titleText:'option11'
        },{
            key:'12',titleText:'option12'
        }
        ]}
]}
export function getList() {
    return (dispatch,getState)=>{
        // return getMenuData({PD:1,PS:200,UD:1000667}).then((res)=>{
        //     if(res){
        //         dispatch({
        //             type:"MENU_UPDATE",
        //             data:res.data
        //         })
        //     }
        // })
        setTimeout(()=>{
            dispatch({
                type:"MENU_LOADING",
                data:list
            })
        },1000)
    }
}
