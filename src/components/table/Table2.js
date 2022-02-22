import { useEffect } from "react";
import { Table } from "antd";
import {useSelector,useDispatch} from "react-redux"
import { getTableList } from "./redux/tableAction";

export default function Table2(){
    const data = useSelector(state=>state.tableReducer)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTableList())
    },[])
    const columns = [
        {
            title: "Full Name",
            width: 100,
            dataIndex: "name",
            key: "name",
            fixed: "left",
        },
        {
            title: "Age",
            width: 100,
            dataIndex: "age",
            key: "age",
            fixed: "left",
        },
        { title: "Column 1", dataIndex: "address", key: "1" },
        { title: "Column 2", dataIndex: "address", key: "2" },
        { title: "Column 3", dataIndex: "address", key: "3" },
        { title: "Column 4", dataIndex: "address", key: "4" },
        { title: "Column 5", dataIndex: "address", key: "5" },
        { title: "Column 6", dataIndex: "address", key: "6" },
        { title: "Column 7", dataIndex: "address", key: "7" },
        { title: "Column 8", dataIndex: "address", key: "8" },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 100,
            render: () => <a>action</a>,
        }
    ];

    return <div>
        <Table columns={columns}
            dataSource={data.list}
            loading={data.loading}
            scroll={{ x: 1300 }}
            size={"small"}
        />
    </div>
}
