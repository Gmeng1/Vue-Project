function Promise(executor){
    //添加属性
    this.PromiseState = 'pending'
    this.PromiseResult = null
    //声明属性
    this.callbacks = []
    //预先保存实例对象this的值
    const self = this
    function resolve(data){
        //判断状态
        if(self.PromiseState !== 'pending'){return}
        //1、修改对象的状态(promiseState)
        self.PromiseState = 'fulfilled'
        //2、设置对象结果值(promiseResult)
        self.PromiseResult = data
        self.callbacks.forEach(item => item.onResolved(data))
    }
    function reject(data){
        //判断状态
        if(self.PromiseState !== 'pending'){return}
        //1、修改对象的状态(promiseState)
        self.PromiseState = 'rejected'
        //2、设置对象结果值(promiseResult)
        self.PromiseResult = data
        self.callbacks.forEach(item => item.onRejected(data))
    }
    try{
        //同步调用执行器函数
        executor(resolve,reject);
    }catch (e){
        //修改对象的状态为失败
        reject(e)
    }
}

Promise.prototype.then = function(onResolved,onRejected){
    const self = this
    //判断回调函数参数
    if(typeof onRejected !== 'function'){
        onRejected = reason =>{
            throw reason
        }
    }
    if(typeof onResolved !== 'function'){
        onResolved = value => value
    }
    return new Promise((resolve, reject) => {
        //封装函数
        function callback(type){
            try{
                //获取回调函数的执行结果
                let result = type(self.PromiseResult)
                //判断
                if(result instanceof Promise){
                    result.then(v => {
                        resolve(v)
                    }, r => {
                        reject(r)
                    })
                }else{
                    resolve(result)
                }
            }catch (e){
                reject(e)
            }
        }
        if(this.PromiseState === 'fulfilled'){
            callback(onResolved)
        }
        if(this.PromiseState === 'rejected'){
            callback(onRejected)
        }
        if(this.PromiseState === 'pending'){
            //保存回调函数
            this.callbacks.push({
                onResolved:function (){
                    callback(onResolved)
                },
                onRejected:function (){
                    callback(onRejected)
                }
            })
        }
    })
}
//添加catch方法
Promise.prototype.catch = function(onRejected){
    return this.then(undefined, onRejected)
}
//添加resolve方法
Promise.resolve = function(value){
    return new Promise((resolve, reject) => {
        if(value instanceof Promise){
            value.then(v => {
                resolve(v)
            },r =>{
                reject(r)
            })
        }else{
            resolve(value)
        }
    })
}
//添加reject方法
Promise.reject = function(reason){
    return new Promise((resolve, reject) => {
        resolve(reason)
    })
}
//添加all方法
Promise.all = function(promises){
    return new Promise((resolve, reject) => {
        let count = 0
        let arr = []
        for(let i = 0; i < promises.length; i++){
            promises[i].then(v => {
                //得知对象的状态是成功的
                count++
                arr[i] = v
                if(count === promises.length){
                    resolve(arr)
                }
            },r=>{
                reject(r)
            })
        }
    })
}
//添加race方法
Promise.race = function(promises){
    return new Promise((resolve, reject) => {
        for(let i = 0; i < promises.length; i++){
            promises[i].then(v => {
                resolve(v)
            },r=>{
                reject(r)
            })
        }
    })
}