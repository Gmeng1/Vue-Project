function deepClone(oldData) {
    if (typeof oldData === 'object' && oldData !== null) {
        let res = Array.isArray(oldData) ? [] : {}
        for (let k in oldData) {
            if(oldData.hasOwnProperty(k)) {
                res[k] = deepClone(oldData[k])
            }
        }
        return res
    }else{
        return oldData
    }
}