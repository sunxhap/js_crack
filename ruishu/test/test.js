

// 生成方法1
var time = new Date().getTime();
console.log(time);  // 默认13位时间搓, 去掉后3位就是以秒为单位的.

// 时间戳转本地时间
var time2 = new Date(1565418199727).toLocaleString();
console.log(time2);


// 生成时间戳2   V8 引擎的话只能用这个. 方法1 在 v8 上不能用
var time3 = Date.now();
console.log(time3);