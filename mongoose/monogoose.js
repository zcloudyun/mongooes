/*
  1、下载安装mongoose
  npm i mongoose --save
*/

//2、在项目中引入mongoose
var mongoose = require('mongoose');

// 3、连接Mongodb数据库
// mongoose.connect('mongodb://数据库的ip地址:端口号、数据库名'，{ useMongoClient: true })
//如果端口号是默认端口号（27017）则可以省略不写
mongoose.connect('mongodb://localhost/mongoose_test');



//4、监听数据库的连接状态
//在mongoose对象中，有一个属性叫做connection，该对象表示就是数据库连接通过监听该对象的状态，可以来监听数据库的连接与断开
mongoose.connection.once("open", function () { 
    console.log("数据库连接成功");
})

// mongoose.connection.once("close", function () { 
//     console.log("数据库关闭成功");
// })

//5、断开数据库连接(一般不需要调用)
// mongoose.disconnect()