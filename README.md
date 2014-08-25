#使用MEAN(MongoDB,ExpressJS,AngualrJS,NodeJS)构建中型系统？

- author : linshuo

---

本文前提是你已经了解了[angualrjs](http://linshuo.sinaapp.com/?p=245 "angularjs")

一切准备就绪，那么就让我们开始吧！
## 前言

在这里我就不讲angularjs和nodejs的基础知识了。因为这是实战篇嘛，整个项目将采用如标题所示的MEAN架构①希望能写成一个系列，是记录我开发整个流程。

**Mean其首字母分别代表**
* MongoDB——NoSQL的文档数据库，使用JSON风格来存储数据，非常适合javascript。(JSON是JS数据格式)，甚至也是使用JS来进行sql查询；
* Express —— 基于Node的Web开发框架；提供有帮助的组件和模块帮助建立一个网站应用。
* Angular —— JS的前端开发框架，提供了声明式的双向数据绑定；
* Node —— 基于V8的运行时环境（JS语言开发），可以构建快速响应、可扩展的网络应用，是一个并发 异步 事件驱动的Javascript服务器后端开发平台。

## 环境搭建

1. `Node环境搭建`<br />  
Nodejs框架是基于V8的引擎，是目前速度最快的Javascript引擎。让我们先搭建nodejs的开发环境，在官网上http://www.nodejs.org 上install安装到本机，现在的node都集成了npm模块，所以我们可以很方便的使用它。<br />  
2. `安装MongoDB`<br />  
安装mongodb也可以在其官网http://www.mongodb.org上DownLoad下来安装，在mac下安装很简单的，启动的话，到Mongodb文件夹目录/bin 找到mongod 双击运行就可以了，可以设置成自动启动，具体的我在这里就不讲了，大家可以百度一下.<br />  
3. `使用Yeoman构建项目`<br />  
Yeoman简单介绍:Yeoman是通过Grunt和Bower的包装为开发者创建一个易用的工作流。主要有三部分组成：yo（脚手架工具）、grunt（构建工具）、bower（包管理器）。这三个工具是分别独立开发的，但是需要配合使用，来实现我们高效的工作流模式。<br />  

## 使用Yeoman来快速搭建我们的项目架构

1. 安装yeoman
sudo npm install -g yo
2. 安装生成器
npm install -g generator-meanstack
3. 创建并进入文件中,生成项目
yo meanstack
4. 运行项目
grunt server(若无安装grunt,则先执行sudo npm install -g grunt
5. 访问http://localhost:3000（或已自动弹出）

#### 总结
搭建环境似乎挺简单，但稍不留神还是会出错不少，除了使用yeoman来搭建项目架构，也可以使用mean.io，这里不做解释了，查看更多可以点击mean.io官网，使用这些自动化的工程可以提高我们的工作效率，可以让我们专心码我们的代码，享受编程的乐趣。

## 目录结构及说明
```
app --存储前端东西文件夹
├──bower_components //bower模块，在bower.json配置后通过bower install默认存放在该文件夹
├──scripts
│     ├──controllers    //angularjs控制器
│     │        └──main.js
│     └──app.js //配置angularjs前端路由器
├──styles
├──views  //html文件夹
│    └──main.html 
├──index.html //html模块文件，包含了头部还有底部。需要引入共用的js或css需引入到这里
├──config --配置开发和产品环境
├──environments
    ├──development.js //开发环境配置，我们在项目中就使用开发环境
    └──production.js  //产品环境
node_modules  //存放 package.json 中安装的模块，当你在 package.json 添加依赖的模块并安装后，默认存放在这个文件夹下
routes //存放路由文件
└──index.js //后台express路由器
views  //存放模版文件，这个项目不使用模板
package.json  //存储着工程的信息及所需的依赖模块声明
app.js  
server.js //启动文件。
```

*注1：目录结构是一个很重要的东西，我们在实际项目中要分好文件夹，这样才能在后期查看的时候不会导致到不明白，yeoman帮我们构建的结构我个人觉得是很不错的，针对angualrjs的mv\*特性而分成不同文件夹，本来想讲讲文件中内容的，不过可以会太占篇幅，也可能说不明白，所以在项目中陆续讲起吧。*

## 配置数据库模块

项目中使用的是MongoDB——NoSQL的文档数据库，使用JSON风格来存储数据，非常适合javascript。使用MongoDB数据库，自然要将该数据库的模块引导项目中，加上一些配置（似乎我们在其他语言也都是这样做的）。
在NodeJS项目中，用package.json文件来声明项目中使用的模块，这样在新的环境部署时，只要在package.json文件所在的目录执行 npm install 命令即可安装所需要的模块。

**package.json**

首先需要在package.json这个文件中得”dependencies上加上”"mongodb”: “*”//连接mongodb的插件, “connect-mongo”: “*”//会话支持<br />  
此时的package.json文件有如下内容<br />  

```javascript
{
    "name": "forJob",
    "version": "0.0.1",
    "private": true,
    "scripts": {
        "start": "node server"
    },
    "engines": {
        "node": ">=0.8.0"
    },
    "dependencies": {
        "express": "3.4.0",
        "ejs": "*",
        "mongodb": "*",
        "connect-mongo": "*"
    },
    "devDependencies": {
        "grunt": "~0.4.1",
        "grunt-contrib-copy": "~0.4.1",
        "grunt-contrib-concat": "~0.3.0",
        "grunt-contrib-coffee": "~0.7.0",
        "grunt-contrib-uglify": "~0.2.0",
        "grunt-contrib-compass": "~0.3.0",
        "grunt-contrib-jshint": "~0.6.0",
        "grunt-contrib-cssmin": "~0.6.0",
        "grunt-contrib-connect": "~0.3.0",
        "grunt-contrib-clean": "~0.4.1",
        "grunt-contrib-htmlmin": "~0.1.3",
        "grunt-contrib-imagemin": "~0.1.4",
        "grunt-contrib-watch": "~0.4.0",
        "grunt-usemin": "~0.1.11",
        "grunt-rev": "~0.1.0",
        "grunt-karma": "~0.4.3",
        "grunt-open": "~0.2.0",
        "grunt-concurrent": "~0.3.0",
        "matchdep": "~0.1.2",
        "connect-livereload": "~0.2.0",
        "grunt-google-cdn": "~0.2.0",
        "grunt-ngmin": "~0.0.2",
        "grunt-express": "~1.2.1",
        "time-grunt": "~0.1.1"
    }
}

```

*`package.json`文件中可配置的项有：名称(name)、应用描述(description)、版本号(version)、应用的配置项(config)、作者(author)、资源仓库地址(repository)、授权方式(licenses)、目录(directories)、应用入口文件(main)、命令行文件(bin)、应用依赖模块(dependencies)、开发环境依赖模块(devDependencies)、运行引擎(engines)和脚本(scripts)等；*

**npm install**

在控制台上使用npm install 命令即可安装dependencies上所声明的模块。加载后的模块会被自动放在node_modules文件夹下，可以看到现在node_modules文件夹下多了mongodb和connect-mongo文件夹。<br />

**settingDB.js**

在根目录下创建settingDB.js文件，用来配置数据库的信息，代码如下：<br />

```javascript
module.exports = { 
  cookieSecret: 'linshuo', 
  db: 'linshuoDB', 
  host: 'localhost' 
};
```
*可以看到，我们使用的是模块化开发的形式，用module.exports向外暴露内容供外部调用。*

**db.js**

我们在根目录下创建models文件夹，用来存储我们自己写的模型。现在，让我们在其中创建一个db.js模型。用来实例化数据库。具体代码如下：

```javascript
var settings = require('../settingDB'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}), {safe: true});
```
*上面使用require的形式引入我们先前创建的settingDB.js配置文件，其中new Server(settings.host, Connection.DEFAULT_PORT, {})的第一、二分参数分别是IP地址和端口，最后的参数是一个对象用来设置mongodb的一些属性，这里就不适用。最后new Db用来创建一个DB实例。*

**mongodb**

在config/environments/development.js上引入connect-mongo模块和settingDB,具体代码如下

```javascript
var MongoStore = require('connect-mongo')(express),
    settingDB = require('../../settingDB');
module.exports = function (app) {
//...
 app.use(express.session({
          secret: settingDB.cookieSecret,
          key: settingDB.db,
          cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 天
          store: new MongoStore({
            db: settingDB.db
          })
        }));
```
express.session()提供了会话支持<br />
secret用于防止篡改cookie<br />
key 的值为 cookie 的名字<br />
cookie 的 maxAge 值设定cookie的生存期，我们设置 cookie 的生存期为30天<br />
设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，以避免丢失。<br />
我们可以通过 req.session 获取当前用户的会话对象，以维护用户相关的信息。<br />

到此，我们就把数据库模块已经整理好了，此时在控制台上使用grunt server启动项目还不能创建到数据库，可怎么测试到是否连接号数据库了呢？其实只要调用mongo的方法，在程序中为数据库添加数据时，自然就创建了，具体实现会在接下文章中讲到。<br />

#### 总结
   数据库配置这一块，因为我们将配置文件和程序分开，分别写成settingDB.js和db.js，这样写为以后修改有很大帮助，个人觉得应该提倡。不过要注意的是在文件引用的时候，要注意写好路径，不过这应该也不是很大问题，毕竟搞程序必须的嘛，好啦，今天就讲这些。

## 以注册为例打通整个项目


前不久我们讲了项目工程文件目录的简单介绍，还有就是配置数据库，今天我们就来试试这个数据库到底连接上没有，还有就是大体上打通整个项目的框架。<br />
整体来说，就是从前端路由判断 `app.js`->`页面展示login.html`->`提交表单至后台路由index.js`->`后台路由判断并调用UserModel(user.js)来将数据插入到数据库中`->`成功插入则跳转到主页main.html`

恩，让我们一步一步来，好的开始是成功的一半，希望我能把这一开始讲好，书写好。

首先我们要先我们来简单扫一下app文件夹下得index.html的内容，源码如下

```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <!-- build:css({.tmp,app}) styles/main.css -->
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/lib/normalize.css">
    
    <!-- endbuild -->
  </head>
  <body ng-app="nApp">
    <!-- Add your site or application content here -->
    <div class="container" ng-view=""></div>

    <!-- Libraries -->
    <script src="bower_components/jquery/jquery.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    

    <!-- build:js scripts/modules.js -->
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="bower_components/angular-cookies/angular-cookies.js"></script>
    <script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
    <!-- endbuild -->

    <!-- build:js({.tmp,app}) scripts/scripts.js -->
    <script src="scripts/app.js"></script>
    <script src="scripts/controllers/main.js"></script>
    <!-- endbuild -->
  </body>
</html>
```
首先是这段用ng-app声明angualrjs的作用域为body，即angualrjs的作用域在整个页面上，当然，我们也可以修改，不过等我们后边有这个需求的时候再修改就行了。还有就是

这小段代码内的ng-view吧~其实，这正好就是angualrjs帮我们预备好的东西了，即在含有ng-view属性的节点上。我们的子视图将会在此处被引入进来。所以到时候这一层div会包裹在我们将自己写的界面上，所以我们并不需要再书写header body之类的，我们只需要写加载在中间的那一块。
简单理解过后，然后我们来创建我们的login.html。我们将html文件放在app/view下。此处暂css也写在这个页面上。代码如下：
```
<style>
    body{
        background: rgba(0,0,0,.8);
    }
    .loginBox{
        width: 300px;
        height: 260px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -150px;
        margin-top: -135px;
        background: hsl(184, 1%, 37%);
        border-radius: 8px;
        text-align: center;

    }
    .loginBox input{
        width: 80%;
        height: 40px;
        border-radius: 5px;
        margin-top: 26px;
        font-size: 17px;
        border: 0;
        padding-left: 11px;
    }
    .loginBox_header{
        height: 40px;
        background-color:hsla(0, 0%, 133%, 0.8);
        text-align: right;
        border-top-right-radius: 7px;
        border-top-left-radius: 7px;
        
    }
    .loginBox_header a{
        color: rgba(10, 10, 10, 0.5);
        font-size: 20px;
        line-height: 40px;
        padding-right: 6px;
        transition:all .2s ease-in-out 0s;
    }
    .loginBox_header a:hover{
        color: rgba(10, 10, 10, 0.9);
    }
    .loginBox .loginBox_submit{
        display: inline-block;
        border-radius: 10px;
        text-align: center;
        height: 40px;
        width: 90%;
        position: absolute;
        bottom: 10px;
        left: 50%;
        margin-left: -45%;
        background: hsla(0, 0%, 0%, 0.5);
        font-size: 1.5em;
        line-height: 36px;
        text-decoration: none;
        box-shadow: inset 0px -1px 0px hsla(0, 10%, 62%, 0.3);
        color: hsla(0, 0%, 77%, 0.5);
        transition:all .2s ease-in-out 0s;
    }
    .loginBox_submit:hover{
        color: hsla(0, 0%, 77%, 1);
        background: hsla(0, 6%, 18%, 1);
    }
</style>
<div class="loginBox">
    <div class="loginBox_header">
        <a href="">切换登录</a>
    </div>
    <form id="post" ng-submit="form.submit()">
        <input type="text" name="userName" ng-model="form.name" id="userName" placeholder="请输入用户名">
        <input type="text" name="pwd"  ng-model="form.password" id="pwd" placeholder="请输入密码">
        <input href="###" type="submit" class="loginBox_submit" value="注册">
    </form>
</div>

*很简单的一个表单,ng-submit指令给它指定一个提交表单时的回调函数，但表单被提交时则会触发这个回调函数，此处为form.submit()，方法写于与login.html对应的loginCtr内。这个指令也会自动阻止浏览器处理其默认的GET行为。
angualrjs这些ng指令在这里不详细展开，有问题的可以看我写的angualrjs系列，或查一下其他方面的资料。login.html建好了。我们来看一下app.js里面内容吧。
我们删除原来的*

```
.when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
```

并添加我们自己的路由判断规则，完整代码如下

```
'use strict';
(function(){
    var app = angular.module('nApp', []);
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .when('/main', {
                templateUrl: 'views/main.html',
              //controller: 'mainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

}.call(this));

```

简单解释一下，angualrjs使用了$routeProvider自带的路由选择器来进行路由判读，就如

```
.when('/', {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })

```

angularjs通过地址栏进行导航的深度链接（deeplinking ），也就成就了我们的路由机制，通过这样路由机制，一个单页应用的各个视图的组织起来了。上面的语法是，当url#后面为/时（http://localhost:3000/#/），将使用的模板路径为’views/login.html’，使用的controller为’loginCtrl’<br/>

接着，我们就来书写我们的loginCtrl吧！controller的内容在app/scripts/controllers/main.js中，一样的，也可以放在别处，这里为了方便先在这main.js内。我们把MainCtrl删除掉，并添加我们自己的Ctrl.详细代码如下
```
'use strict';

angular.module('nApp')
  .controller('loginCtrl', function ($scope,$http,$location) {
   $scope.form = {};   // 初始化一个NG数据模型
    // 提交操作函数
    $scope.form.submit = function () {
        //使用$http内置服务提交POST请求，请求路径为'/api/login'，参数为$scope.form
        $http.post('/api/login', $scope.form).success(function () {
            //成功返回时，转到url为/main上
            $location.url('/main'); 
        });
    };
  });
```
有了上面的注释，相信能看得清除一些。这些都是angualrjs的内容，可以查看我写的angualrjs目录下的内容。
我们看到我们提交了POST请求，到’/api/login’这个路径下。这个post请求会被后台的路由接收到，即在routes/index.js中进行判断。
这里我们先创建我们的userModel,用来与数据库交互用的。具体代码如下
```
var mongodb = require('./db');
function User(user){ 
  this.name = user.name; 
  this.password = user.password; 
  this.address = user.address;  
  this.school=user.school; 
  this.info=user.info
}; 
module.exports = User; 
User.prototype = {
    //保存一个用户
    //callback 是执行玩保存后的回调函数
    save : function(callback){ 
              var user = { 
                  name: this.name, 
                  password: this.password, 
                  //下面内容在注册时不用填，在个人首页可以修改，所以先设置默认值和默认头像
                  address:"暂无",
                  school:"暂无",
                  info:"暂无"
              }; 
              //打开数据库
              mongodb.open(function(err,db){ 
                //如果打开出错，err会有出错信息，否则为null
                if(err){ 
                  //将注册信息错误信息作为参数返回给回调函数
                  return callback(err); 
                } 
                //连接数据库中的名为user的表，没有就创建
                db.collection('user',function(err,collection){ 
                //连接失败会将错误信息返回给回调函数，并且关闭数据库连接
                if(err){ 
                  mongodb.close(); 
                  return callback(err); 
                } 
               //插入新的数据
                collection.insert(user,{safe: true},function(err,result){ 
                //不管是否成功都关闭数据库
                mongodb.close(); 
                //如果错误err有错误信息，将err和user返回给回调函数
                callback(err, user);//成功！返回插入的用户信息 
            }); 
          }); 
        }) 
      }
  }
接着，我们在index.js中实例化(req.body表示post请求过来的参数)这个userModel并调用它的save方法，进行用户注册，具体代码如下

var User = require('../models/user.js');
module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.render('index');
    });
    app.post('/api/login',function(req,res){
        var newUser = new User(req.body);
           newUser.save(function(err,user){ 
                if(err){ 
                  req.flash('error',err); 
                  return res.redirect('/'); 
                } 
                //成功后，将用户信息记录在页面间的会话req.session中，并且跳转到一个新页面，就是内容集中展示页面
                req.session.user = user; 
                res.json({status: 'done'});
            }); 
        }); 
    };
```
成功返回时则进入/main，在前端路由进行判断后，进入到main.html上。下面贴出main.html上代码，如果你最终看到”这是主页”这四个大字，那么恭喜你，比我聪明的打通了整一块。

#### 总结

到此，注册这一块就结束了，希望在观看的你对这整个过程能好好理解一下，后期我们做的，其实都是基于这样的一个流程来走的，开始很难，慢慢走，走好就最重要，加油。

