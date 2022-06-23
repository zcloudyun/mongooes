/*
  定义一个模块，用来连接Mongodb数据库
*/

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

// 将mongoose.Schema赋值给一个变量
var Schema = mongoose.Schema;

//创建Schema(模式)对象
//Schema对象定义约束了数据库中的文档结构
var stuSchema = new Schema({
    name: String,
    age: Number,
    gender: {
        type: String,
        // 默认值
        default: "female"
    },
    address: String
});

//简单说：有了Schema就有了数据库,有了Model就可以操作数据库

//通过Schema来创建Model
//Model代表的是数据库中的集合，通过Model才能对数据库进行操作
//mongoose.model(modelName,Schema)
//modelName就是要映射的集合名 mongoose会自动将集合名变为复数
var stuModel = mongoose.model("student", stuSchema)

// 3. 向外暴露
module.exports = {
    getModel(name) {
      return mongoose.model(name)
    }
}