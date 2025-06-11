// 完成delay函数
// 该函数可以等待一段指定时间
// 返回Promise
function delay(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("OK");
    }, duration);
  });
}

(async function () {
  for (let i = 0; i < 3; i++) {
    let data = await delay(1000);
    console.log(data);
  }
})();

var b = new Promise((resolve,reject)=>{
    console.log(1)
})