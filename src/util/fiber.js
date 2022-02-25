// 首先要了解fiber是把整个工作进程切换成许多个小的fiber工作单元，可以被打断，
// 如果这个时间内你把你的工作完成了，可以继续完成下一个，没完成交给下一个，不能超过这个时间，否则会掉帧产生卡顿
//16.6ms里面有进10ms交给浏览器做自己的工作，剩下的生成fiber树产生真实dom，更新优化什么的没做他自己的事

// 虚拟dom
let A = {
    type:"div",
    key:"A",
    props:{
        children:[
            {type:'div',key:'B1',props:{children:[]}},
            {type:'div',key:'B2',props:{children:'B2'}}
        ]
    }
}
// 根据虚拟dom构建fiber树
// 首先我们要了解这个工作的进程：调度=》调和=》commit提交，
// 其次我们要了解fiber这样的一个流程，从上到下依次遍历，先把一条链路执行完，再执行另一条

let workInProgress //正在执行的工作单元
let tagRoot ="TAG_ROOT" //fiber根节点
let tagHost = "TAG_HOST" //原生dom节点。类似于div，span，p
let Placement = "placement"


let root = document.getElementById('root')
// 先创建一个根fiber，一般都是从上往下执行的
let rootFiber ={
    tag:tagRoot, //fiber类型
    key:'Root', //身上绑定的key 没什么特别的
    stateNode:root,  //这个是fiber对应的真实dom
    props:{children:[A]}
}

// 工作循环机制，即这个工作单元的工作执行完了进行下一个工作单元的工作，（fiber原理要了解就懂得了）
export function workLoop() {
    // 这里可以被打断
    while(workInProgress){
        workInProgress=performUnitOfWork(workInProgress)
    }
    //最后一步提交
    commitRoot(rootFiber)
}

function commitRoot(rootFiber) {
    let currentEffect = rootFiber.firstEffect
    while(currentEffect){
        let flags = currentEffect.flags
        switch (flags) {
            case Placement:
                commitPlacement(currentEffect)
        }
        currentEffect = currentEffect.nextEffect
    }
}

function commitPlacement(current) {
    let parent = current.return.stateNode
    parent.appendChild(current.stateNode)
}

function performUnitOfWork(workInProgress) {
    //开始工作进程了，构建fiber树
    beginWork(workInProgress)
    //如果有子项，则未结束，继续返回子项
    if(workInProgress.child){
        return workInProgress.child
    }
    //如果没有子项，则其中一条链路结束，观察是否有兄弟元素未遍历
    while (workInProgress){
        completeUnitOfWork(workInProgress)
        if(workInProgress.sibling){
            return workInProgress.sibling
        }
        // 也没有兄弟，就返回上一层找父级
        workInProgress = workInProgress.return
    }
}

// 结束工作单元 ，根据fiber创建真实的dom元素
function completeUnitOfWork(workInProgress) {
    let stateNode;
    console.log(workInProgress.key,'over')
    // 根据我当前的这个fiber单元（对象），去创建一个真实的dom
    switch (workInProgress.tag) {
        case tagHost:
            stateNode = createDom(workInProgress);
            break;
    }
    // 在完成时要判断当前的fiber节点有没有对应的dom操作项,有副作用的链表，初次渲染都需要包含，其他的时候只要进行
    makeEffectList(workInProgress)
}

// 写这个的时候要了解副作用的流程
/*假设：a有三个副作用1,2,3，b有两个副作用4,5
原本是这样
first  next      next    last
  ↓     ↓         ↓       ↓
A:1  ======>  2  ======>  3

first next  last
  ↓    ↓     ↓
B:4 ======>  5

链式合并，会把子的副作用都挂载到父上，向上传递,
first  next      next         next      next     next    last
  ↓     ↓         ↓             ↓         ↓        ↓      ↓
A:1  ======>  2  ======>  3  ======> 4  =====>  5  =====> B

 */

function makeEffectList(completeWork) {
    // 先把副作用链表创建好
    let returnFiber = completeWork.return
    if(returnFiber){
        if(!returnFiber.firstEffect){
            returnFiber.firstEffect = completeWork.firstEffect
        }
        if(completeWork.lastEffect){
            if(returnFiber.lastEffect){
                returnFiber.lastEffect.nextEffect = completeWork.firstEffect
            }
            returnFiber.lastEffect = completeWork.lastEffect
        }

        // 到这里是如果真的有副作用的话
        if(completeWork.flags){
            if(returnFiber.lastEffect){
                // 父有副作用，则把子和父连起来
                returnFiber.lastEffect.nextEffect = completeWork
            }else{
                // 如果父没有副作用，则把子的副作用给父亲
                returnFiber.firstEffect = completeWork
            }
            returnFiber.lastEffect = completeWork
        }
    }

}

function createDom(fiber) {
    if(fiber.tag===tagHost){
        fiber.stateNode = document.createElement(fiber.type)
    }
    return fiber.stateNode
}

function beginWork(workInProgress) {
    console.log(workInProgress.key,'begin')
    //拿到下一个节点
    let nextChildren = workInProgress.props&&workInProgress.props.children?workInProgress.props.children:null
    // 开始调和咯,把我的父节点和子节点都传进去
    return reconcileChildren(workInProgress,nextChildren)
}

// 构建子fiber树的主要流程
function reconcileChildren(returnFiber,nextChildren){
    let preChildFiber;
    let firstChildFiber
    // 这个时候我要循环遍历我有几个children,
    if(nextChildren){
        for(let newIndex=0;newIndex<nextChildren.length;newIndex++){
            // 每个children在创建虚拟dom节点时间都要创建一个fiber
            let newFiber = createFiber(nextChildren[newIndex])
            //是否添加副作用，即增删改查之类，Placement添加，react源码之中定义了这些十六进制的的编码
            newFiber.flags = Placement;
            //链条返回的应该指向父fiber
            newFiber.return = returnFiber
            //以下流程参照下图(如果第一个child（B1）没有构建fiber的话，则赋值给第一个fiber，否则就把newfiber赋值给上一个fiber（B1）的兄弟（B2）)
            //  root
            //    ↓
            //    A
            //  ↙   ↘
            // B1   B2
            if(!firstChildFiber){
                firstChildFiber = newFiber
            }else{
                preChildFiber.sibling = newFiber
            }
            preChildFiber = newFiber  //以上所有进程执行完后，将这个新的fiber赋值给B2，让B2成为上一个，方便后续有B3能够重复执行上述操作
        }
        returnFiber.child = firstChildFiber
        return firstChildFiber  //构建完fiber树 返回第一个child
    }

}

function createFiber(element) {
    // 创建fiber也就是创建一个js对象这样
    return {
        tag:tagHost,
        type:element.type,
        key:element.key,
        props:element.props
    }

}


// 这个是我先把我定义的根fiber给到这个要执行的工作，然后开展工作循环
workInProgress=rootFiber
// workLoop()
