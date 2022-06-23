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


//有了model，我们就可以对数据库进行操作
/*
 model.create(doc(s),[callback])
 -- 用来创建一个或多个文档并添加到数据库中
 -参数:
  doc(s)可以是一个文档对象，也可以是多个文档对象的数组
 --callback当操作完成以后调用的回调函数

*/
//创建
// stuModel.create([{
//     name: '猪八戒',
//     age: 18,
//     gender: "mela",
//     address:"高老庄"
// }, {
//     name: "沙和尚",
//     age: 28,
//     gender: "mela",
//     address:"流沙河"
// }], function (err) {
//     if (!err)
//     {
//         // arguments插入的文档
//       console.log(arguments);
//     }
// })


/*
查询的
 --查询所符合条件的文档  总会返回一个数组
 model.find(conditions,[projection],[options],[callback])
 --根据文档的id属性查询文档 总会返回一个具体的文档对象
 model.findById(id,[projection],[options],[callback])
 --查询符合条件的第一个文档
 model.findOne([conditions],[projection],[options],[callback])

 conditions:查询的条件
 projection 投影
 options   查询选项(skip limit)
 callback 回调函数，查询结果会通过回调函数返回
     回调函数必须传，如果不传回调函数，压根不会查询

*/
//返回数组
// 投影只显示name,  _id不显示
// stuModel.find({}, { name: 1, _id: 0 },function (err,docs) {
//     if (!err) {
//         console.log(docs);
//     }
// })
//skip跳过前三个
// stuModel.find({}, { name: 1, _id: 0 },{skip:3},function (err,docs) {
//     if (!err) {
//         console.log(docs);
//     }
// })
// stuModel.find({ name: "猪八戒" }, function (err,docs) {
//     if (!err) {
//         console.log(docs);
//     }
// })

//根据id查询
// stuModel.findById("62b33bbcc189d5d63c3c898e", function (err, doc) {
//     if (!err) {
    //通过find()查询的结果，返回的对象就是document文档对象
    //document对象是model的实列
//         console.log(doc);
//     }
// })

/*
  修改
  model.update(conditions,doc,[options],[callback])
  model.updateMany(conditions,doc,[options],[callback])
  model.updateOne(conditions,doc,[options],[callback])
  model.replaceOne(conditions,doc,[options],[callback])
   --修改一个或多个文档
     参数：
      conditions  查询条件
      doc     修改后的对象
      options 配置参数
      callback回调函数
*/

//修改孙悟空的年龄为22
// stuModel.update({ name: "孙悟空" }, { $set: { age: 22 } }, function (err) {
//     if (!err)
//     {
//         console.log("修改成功");
//         }
// })

/*
 删除
 model.remove(conditions,[callback])
 model.deleteMany(conditions,[callback])
 model.deleteOne(conditions,[callback])
*/
// stuModel.remove({ name: "猪八戒" }, function (err) {
//     if (!err) {
//         console.log("删除成功");
//     }
// })

//统计文档的数量
//model.count(conditions,[callback])
stuModel.count({ name: "沙和尚" }, function (err, count) { 
    if (!err) { 
        console.log(count);
    }
})