class single{
    constructor(data){
        if(single.inter){
            return single.inter
        }
        this.data = data
        single.inter = this
    }
    getData(){
        return this.data
    }
}
let n1 = new single(1)
let n2 = new single(2)
console.log(n1+n2)