import React, { Fragment, useState,useCallback,useMemo } from "react";
import { Button, Tag, Divider } from "antd";
import { ChildComponent } from "./ChildComponent";
export const ParentComponent = () => {

    const [count, setCount] = useState(0); //{1}
    const [random, setRandom] = useState(0); //{1}
    const [,setMemoRandom] = useState(0);
    const memoizedFn = useCallback(childFn, []);
    // 只在count发生变化时，才会执行消耗性能的计算getState
    const memoizedValue = useMemo(getState,[count]);
    function childFn() {
        console.log(count);
    }
    function getState(){
        console.log("getState run"); //{3}

        let temp = 0;
        for (let index = 0; index < 1000; index++) {
            temp += index;
        }

        return temp;
    }

    console.log("memoComputed",memoizedValue);
    /* useCallback + memo进行性能优化 避免组件不必要的重复渲染*/
    // 其实是我点击setCount的时候就是对父组件产生影响，没必要对子组件进行更新，所以这个时候我们需要优化
    //在子组件传值只有单个，没有其他项的时候，只要再子组件上面加上memo,可以避免对子组件的重新渲染，若不仅仅只存在一个时，此时一个单纯的memo就没办法实现对子组件不进行渲染，
    // 造成这个的原因是：子组件身上增加了一个函数，props在传递函数的时候的时候是传递指针，这个时候父组件进行setCount时候回重新声明函数Fn，指针就会发生变化所以就回更新子组件，此时要用到useCallback
    //这时我们要用useCallback对这个方法进行缓存，然后将这个而缓存的值进行传递，这个时候我们的子组件在我们的依赖项为空时就能实现对子组件的优化


    /*useMemo避免组件在每次渲染时都进行高开销的计算*/
    //当我通过一个行为进行setState的时候，这时候组件会更新，但是我希望这个更新不会涉及到组件内部一个有进行复杂逻辑算法的更新，我只要这个结果，而保持复杂算法不动，直到在其依赖项发生变化时，此时用到useMemo
    // 如果没有提供依赖项，则每次渲染都会执行，如果提供了则在依赖项变化时执行
    // 注意：这个useMemo里的回调，只能放跟渲染相关的，不能放存在副作用的，那是放到useEffect里的
    return (
        <Fragment>
            <h5>hooks 性能优化</h5>

            <Divider orientation="left">count</Divider>
            <Tag color="magenta">{count}</Tag>
            <Button onClick={() => setCount(o => o += 1)}
                type="primary"
            >setCount</Button> {/* {2} */}

            <Divider orientation="left">random</Divider>
            <Tag color="cyan">{random}</Tag>
            <Button onClick={() => setRandom(Math.floor(Math.random() * 10 + 1))}
                type="ghost"
            >setRandom</Button>  {/* + {5} */}

            <Divider orientation="left">子组件↓</Divider> {/* {3} */}
            <ChildComponent fn={memoizedFn}
                state={random}
            /> {/* + {7} */}

            <Divider orientation="left">useMemo的作用↓</Divider>
            <Button onClick={() => setMemoRandom(Math.floor(Math.random() * 10 + 1))}
                type="ghost"
            >setMemoRandom</Button>
        </Fragment>
    );
};

