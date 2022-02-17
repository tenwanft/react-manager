import React,{memo} from "react";
import {Tag} from "antd";

export const ChildComponent = memo((props)=>{
    const { state } = props
    return <>
        {console.log("ChildComponent Render")} {/* {1} */}
        <span>子组件</span>
        <Tag color="magenta">{state}</Tag>
    </>
})
