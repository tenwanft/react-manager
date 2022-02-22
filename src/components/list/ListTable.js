import {useState, useEffect, useReducer } from "react";
import { Table , Tag, Space } from "antd";
import {useSelector,useDispatch} from "react-redux";
import { getTableList } from "./redux/action";
import { useCallbackState } from "../../util/useCallbackState";

export default function ListTable(props){
    const data = useSelector(state=>state.listReducer);
    const dispatch = useDispatch();
    // const [count,setCount] = useState(0)
    const [count,setCount] = useCallbackState(0);
    const [ ,forceUpdate ] = useReducer(x=>x+1,0);  //这个是强制更新的一个方法
    useEffect(()=>{
        dispatch(getTableList());
    },[]);
    useEffect(()=>{
        console.log(count,"=====");
    },[count]);
    const a = ()=>{
        setCount(count+1,(data)=>{
            console.log(data,"====after====");
        });
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: text => <a>{text}</a>,
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "loser") {
                            color = "volcano";
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
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return <div>
        <Table columns={columns} dataSource={data.list} size={"small"} loading={data.loading} />
        <div>
            {count}
            <button onClick={a}>加</button>
        </div>
    </div>;
}
