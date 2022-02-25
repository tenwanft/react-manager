import {useEffect, useState} from "react";
import {Button, Divider, Table, Tag} from 'antd';
import {connect} from "react-redux";
import {getSystemList} from "./redux/systemAction";
import {color} from "../../util/public.config";
import {AddModal} from "./AddModal";

function SystemList(props) {

    const [visible, setVisible] = useState(false);
    const columns = [
        { title: 'key', dataIndex: 'key', key: 'key' },
        { title: '菜单名称', dataIndex: 'title', key: 'title'},
        { title: '路由地址', dataIndex: 'url', key: 'url' },
        { title:'类型' ,dataIndex: 'type', key: 'type',render:(text, record)=><Tag color={color[text]}>{text}</Tag>},
        {
            title: '操作',
            dataIndex: 'Action',
            key: 'Action',
            render: (text,record) => <div>
                {record.type==='route'?<a onClick={()=>{openModal(record.type)}}>新增</a>:null}
                <Divider type={"vertical"}/>
                <a>修改</a>
                <Divider type={"vertical"}/>
                <a>删除</a>
            </div>
        },
    ];

    useEffect(()=>{
        props.getSystemList()
    },[])
    function openModal(type) {
        setVisible(true)
    }

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };
    const onCancel = ()=>{
        setVisible(false)
    }

    return  <div>
        <AddModal visible={visible} onCancel={onCancel} onCreate={onCreate}/>
        <Button type={'primary'} onClick={()=>{openModal('menu')}}>新增</Button>
        <Table
            columns={columns}
            // expandable={{
            //     expandedRowRender: (record,text) => {
            //         console.log(record,text)
            //     },
            //     rowExpandable: record => record.children,
            // }}
            rowKey={'key'}
            loading={props.systemList.loading}
            expandable
            dataSource={props.systemList.list}
        />
    </div>
}
export default connect((state,ownProps)=>{
    return {systemList:state.SystemReducer}
},(dispatch)=>{
    return {
        getSystemList:()=>{dispatch(getSystemList())}
    }
})(SystemList)
