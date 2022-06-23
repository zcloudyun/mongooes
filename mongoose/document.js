/*
document和集合中的文档一一对应，document是Model的实例
   通过Model查询到结果都是document


*/
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

// 创建document
var stu = new stuModel({ name: "奔波霸", age: 18, gender: "mela", address: "碧波谭" })

/*
document的方法
  model#save([options],[fn])
*/
// stu.save(function (err) {
//     if (!err) {
//         console.log("保存成功");
//     }
// })

stuModel.findOne({}, function (err, doc) { 
    if (!err) { 
        console.log(doc);
    }
    //doc指定的文档 第一种方法
    // doc.update({ $set: { age: 300 } }, function (err) { 
    //     if (!err) { 
    //         console.log("修改成功");
    //     }
    // })
    
    //第二种方法
    // doc.age = 100,
    //     doc.address = "天庭"
    // doc.save()
    
    //删除
    // doc.remove(function (err) { 
    //     if (!err) { 
    //         console.log("删除成功");
    //     }
    // })
    
    /*
      get(name)
       -- 获取文档中的指定的属性
      set(name,value)
        --设置文档指定的属性值
       --
    */
    // console.log(doc.get("name"));
    // console.log(doc.age);
    // doc.set("name", "猪小小")
    // doc.save()
    // console.log(doc);
    
    /*
      toJSON()
        --转换为一个json对象
      toObject()
        --将document对象转换为一个普通的JS对象
    
    */

    // console.log(doc.toJSON());
    console.log(doc.toObject());
})