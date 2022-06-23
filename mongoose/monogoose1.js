/*
  1、下载安装mongoose
  npm i mongoose --save
*/

//2、在项目中引入mongoose
var mongoose = require('mongoose');

// 3、连接Mongodb数据库
// mongoose.connect('mongodb://数据库的ip地址:端口号、数据库名'，{ useMongoClient: true })
mongoose.connect('mongodb://localhost/mongoose_test');

//4、监听数据库的连接状态
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

//向数据库中插入一个文档
//stuModel.create(doc,function(err){});
stuModel.create({
    name: "孙悟空",
    age: 18,
    gender: "male",
    address:"花果山"
}, function (err) { 
    if (!err) { 
        console.log("插入成功");
    }
})



