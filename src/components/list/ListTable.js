import { useState,useEffect } from "react";
import { Table, Tag, Space } from 'antd';
import {useSelector,useDispatch} from 'react-redux'
import { getTableList } from "./redux/action";

export default function ListTable(props){
    // const loading = useSelector(state=>state.listReducer.loading)
    const data = useSelector(state=>state.listReducer)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTableList())

    },[])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return <div>
        <Table columns={columns} dataSource={data.list} size={'small'} loading={data.loading} />
    </div>
}
