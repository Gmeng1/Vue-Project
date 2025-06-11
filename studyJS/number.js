function formation(num,decimals = 2){
    const fixedNum = num.toFixed(decimals)
    let str = fixedNum.toString()
    let parts = str.split('.')
    let result = ''
    let count = 0
    for(let i = parts[0].length-1;i>=0;i--){
        if(count % 3 == 0 && count!=0){
            result = parts[0][i] + ','  + result
        }else{
            result = parts[0][i] + result
        }
        count++
    }
    return result + '.' + parts[1]
}

console.log(formation(1233353213.12355555,3))