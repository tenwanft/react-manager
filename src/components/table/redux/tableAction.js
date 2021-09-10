const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 40,
        address: 'London Park',
    }
];
export function getTableList() {
    return (dispatch,getstate)=>{
        setTimeout(()=>{
            dispatch({
                type:"TABLE_TWO_LOADING",
                data:{list:data}
            })
        },500)
    }
}
