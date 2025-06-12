function add(...args){
    const result = [...args]
    function _add(...newArgs){
        if(newArgs.length==0){
            return result.reduce((arr,cur)=>arr+cur,0)
        }
        result.push(...newArgs)
        return _add
    }
    _add.toString = function(){
        return result.reduce((arr,cur)=>arr+cur,0)
    }
    return _add
}
function add2(...args1){
    return function(...args2){
        return function(...args3){
            const result = [...args1,...args2,...args3]
            return result.reduce((a,b)=>a+b,0)
        }
    }

}

console.log(add(1)(2)(3).toString())
console.log(add2(1,2,3)(4)(5))

var number = 50
var obj = {
  number:60,
  getNum:function(){
    var number = 70
    return this.number
  }
}
console.log(obj.getNum());
console.log(obj.getNum.call(undefined));
console.log(obj.getNum.call({number:20}));