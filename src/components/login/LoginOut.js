import {Modal, Tooltip} from "antd";
import {LoginOutlined} from "@ant-design/icons";
import React, {useState} from "react";

export function LoginOut() {
    const [loginOut,setLoginOut] = useState(false)

    const loginOutModal=()=>{
        return <Modal title="提示"
                      visible={loginOut}
                      onOk={()=>{
                          localStorage.removeItem('token')
                      }}
            onCancel={()=>{
                setLoginOut(false)
            }}
                      okText="确认"
                      cancelText="取消"
        >是否退出登录？</Modal>
    }

    return <div style={{position:'absolute',top:0,right:30}}>
        <Tooltip placement="bottom" title={'退出登录'}>
            <LoginOutlined style={{color:'#1890ff',fontSize:22}} onClick={setLoginOut(true)}/>
        </Tooltip>
    </div>
}
