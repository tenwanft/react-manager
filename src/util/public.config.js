
export function objToUrl(object){
    if(object){
        let string = ''
        for(var key in object){
            string +=`${key}=${object[key]}&`
        }
        string=string.slice(0,string.length-1)
        return string
    }
 }

 // 一个简单的Promise方法
const PENDING = 'pending',
     FULFILLED ='fulfilled',
     REJECTED = 'rejected'
export class MyPromise {
    constructor(executor) {
        // 状态不可逆
        this.state = PENDING
        this.value = null
        this.reason = null
        this.onFulfillCallback = []
        this.onRejectCallback = []
        let resolve = (value)=>{
            if(this.state===PENDING){
                this.state = FULFILLED
                this.value = value
                this.onFulfillCallback.forEach(fn=>fn())
            }
        }
        let reject = (reason)=>{
            if(this.state === PENDING){
                this.state = REJECTED
                this.reason = reason
                this.onRejectCallback.forEach(fn=>fn())
            }
        }
        try{
            executor(resolve,reject)
        }catch (err) {
            //捕获错误,只能捕获同步 不能捕获异步
            reject(err)
        }

    }
    //每一次.then都返回一个新的Promise
    then(onFulfilled,onRejected){
        let p = new MyPromise((resolve,reject)=>{
            //这个x是我每次return 出来的那个新的值 作为参数传入到下一个then里面
            let x
            if(this.state === FULFILLED){
               x = onFulfilled(this.value)
                // resolve(x)
                setTimeout(()=>{
                    this.resolvePromise(p,x,resolve,reject)
                },0)
            }else if(this.state===REJECTED){
               x = onRejected(this.reason)
                this.resolvePromise(p,x,resolve,reject)
            }else if(this.state===PENDING){
                //此时应该是异步状态，即当我在promise里面写一个settimeout方法时，将不会调用settimeout里面的reslove，应为state状态一直都是pending未变化
                // 要先把我在等待的这些方法先给他存起来,然后成功时去调用
                this.onFulfillCallback.push(()=>{
                    x = onFulfilled(this.value)
                    this.resolvePromise(p,x,resolve,reject)
                })
                this.onRejectCallback.push(()=>{
                    x=onRejected(this.value)
                    this.resolvePromise(p,x,resolve,reject)
                })
            }
        })
        return p
    }
    resolvePromise(p,x,resolve,reject){
        // 参数有p就打印不出来  是因为这个时候p流程还没走完实例化未完成 ，所以打印不出来,要让他延迟执行就可以
        // console.log(123)
        if(p===x){
            return new Error('调用错误')
        }else if ((typeof x==='object' && x!==null) || x==='function'){
            // 写这个是因为promise里面可能直接return一个then方法即
            // return {then(resolve,reject){
            //         resolve(12333)
            //     }}
            try{
                let then = x.then
                console.log(typeof then)
                if(typeof then === 'function'){
                    // 改变他的指向
                    then.call(x,
                            y=>{
                                this.resolvePromise(p,y,resolve,reject)
                                // resolve(y)
                            },
                            err=>{reject(err)}
                    )
                }
            }catch (err) {
                reject(err)
            }
        }else{
            // 当传的是一个普通值时则直接返回不需要做判断
            resolve(x)
        }
    }
}

