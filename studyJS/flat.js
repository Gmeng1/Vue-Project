function flat(arr,depth = 1){
    if(depth <= 0) return arr.slice()
    return arr.reduce((acc,val)=>{
        return acc.concat(Array.isArray(val) ? flat(val,depth-1) : val)
    },[])
}

let arra = [1,2,[3,4],[5,4],[6],[7,5]]
console.log(flat(arra,Infinity))

// function redu(arr){
//     return [...new Set(flat(arr,Infinity))]
// }
function redu(arr){
    const result = []
    let flatArr = flat(arr,Infinity)
    let next = [...flatArr]
    while(next.length){
        let a = next.pop()
        if(!result.includes(a)){
            result.push(a)
        }
    }
    return result.reverse()
}
console.log(redu(arra))
