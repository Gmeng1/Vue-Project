Promise.all = function myAll(promises){
    return new Promise((resolve, reject)=>{
        try{
            const results = []
        let count = 0
        let fulfilledCount = 0
        for(p of promises){
            let i = count
            count++
            p.then(value=>{
                fulfilledCount++
                results[i] = value
                if(fulfilledCount==count){
                    resolve(results)
                }
            },reason=>{
                reject(reason)
            })
        }
        if(count === 0){
            resolve(results)
        }
        }catch(error){
            reject(error)
        }  
    })
}




Promise.allSettled = function MyAllSettled(promises){
    const ps = []
    for(p of promises){
        ps.push(p.then(value=>({status: 'fulfilled',value}),reason=>({status:'rejected',reason})))
    }
    return Promise.all(ps)
}

Promise.allSettled([Promise.resolve(1),Promise.reject(2)]).then(value=>{
    console.log(value);
},reason=>{
    console.log(reason)
})