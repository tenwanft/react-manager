import {useState,useEffect,useRef} from "react";

const useCallbackState = (state) =>{
// useRef 不仅仅是用来管理 DOM ref 的,它还相当于 this , 可以存放任何变量. useRef可以很好的解决闭包带来的不方便性.
    const cbRef = useRef();
    const [data, setData] = useState(state);

    useEffect(() => {
        // cbRef.current就是引用这个方法的当前的那个callback，即下面代码的意义，把拿到的最新的data作为一个参数穿进去
        cbRef.current && cbRef.current(data);
    }, [data]);

    return [data, function (val, callback) {
        cbRef.current = callback;
        setData(val);
    }];
}

export {useCallbackState}
