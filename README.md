#使用MEAN(MongoDB,ExpressJS,AngualrJS,NodeJS)构建中型系统？

- author: linshuo

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

1. `package.json`<br />  
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

2. `npm install`<br />  
在控制台上使用npm install 命令即可安装dependencies上所声明的模块。加载后的模块会被自动放在node_modules文件夹下，可以看到现在node_modules文件夹下多了mongodb和connect-mongo文件夹。<br />

3. `创建数据库配置文件`<br />  
在根目录下创建settingDB.js文件，用来配置数据库的信息，代码如下：<br />

```javascript
module.exports = { 
  cookieSecret: 'linshuo', 
  db: 'linshuoDB', 
  host: 'localhost' 
};
```
*可以看到，我们使用的是模块化开发的形式，用module.exports向外暴露内容供外部调用。*

4. `创建model db.js`<br />  

我们在根目录下创建models文件夹，用来存储我们自己写的模型。现在，让我们在其中创建一个db.js模型。用来实例化数据库。具体代码如下：

```javascript
var settings = require('../settingDB'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}), {safe: true});
```
*上面使用require的形式引入我们先前创建的settingDB.js配置文件，其中new Server(settings.host, Connection.DEFAULT_PORT, {})的第一、二分参数分别是IP地址和端口，最后的参数是一个对象用来设置mongodb的一些属性，这里就不适用。最后new Db用来创建一个DB实例。*

5. `安装会话支持配合mongodb`<br />  

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

**package.json**

前不久我们讲了项目工程文件目录的简单介绍，还有就是配置数据库，今天我们就来试试这个数据库到底连接上没有，还有就是大体上打通整个项目的框架，整体来说，就是从前端路由判断 `app.js`->`页面展示login.html`->`提交表单至后台路由index.js`->`后台路由判断并调用UserModel(user.js)来将数据插入到数据库中`->`成功插入则跳转到主页main.html`

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

---
**Gruntfile.js**

接下来该grunt介入了，先写下通用式：

```javascript
module.exports = function (grunt) {
};
```

由于该示例有模块依赖了css，估计你的项目现在或以后也有这种情况。
所以需要在`transport`的过程中对所依赖的css进行转换，以便seajs能加载一个类似这样的标签到页面中：

```
<link charset="utf-8" rel="stylesheet" href="../styles/component/dialog/src/dialog_css.css">
```

seajs在`1.3.1`的版本中是将css文件也包装成一个js模块，以seajs.importStyle函数包裹原css内容。
这样在执行importStyle函数时，向页面添加一个上面的`link`标签。

*ps：在新的2.0版本中，貌似该函数已从sea.js中剥离出来，形成一个单独的插件`style`*

为了实现上述的转换需要引入这样的代码：

```javascript
var transport = require('grunt-cmd-transport');
var style = transport.style.init(grunt);
var text = transport.text.init(grunt);
var script = transport.script.init(grunt);
```

现在我们开始定义构建任务，先将`package.json`引入，后面的任务会用到其中的设置：

```javascript
grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
    });
```

下面我们来看下自定义模块的构建任务。

---

**自定义模块的`transport`任务：**

```javascript
transport : {
    options : {
        paths : ['.'],
        alias: '<%= pkg.spm.alias %>',
        parsers : {
            '.js' : [script.jsParser],
            '.css' : [style.css2jsParser],
            '.html' : [text.html2jsParser]
        }
    },
    styles : {
        options : {
            idleading : 'dist/styles/'
        },
        files : [
            {
                cwd : 'styles',
                src : '**/*',
                filter : 'isFile',
                dest : '.build/styles'
            }
        ]
    }
        }
```

任务内容本身非常简单，就是将styles路径中的所有文件`cwd : 'styles'`,`src : '**/*'`，也就是模块`dialog`，提取依赖并生成到`.build/styles`的临时目录中去。

这个任务包含了两级的`options`，`Target`的`options`会覆盖外层中`Task`的`options`，先说下`Task`的`options`中的含义：

* paths：模块的路径，默认的是`sea-modules`，如果你构建的时候出现找不的模块的话，可能就是这里出了问题。

* alias：定义模块别名，这里以grunt支持的一种模板语法来从`package.json`引入定义：`<%= pkg.spm.alias %>`

* parsers：定义下针对不同格式文件的转换方式，这里的设置感觉以后很可能会在插件中内置，暂时先这么设置。

紧接着看下`Task`中的`options`：

* idleading:模块ID的前缀

---

**自定义模块的`concat`任务：**

```javascript
options : {
    paths : ['.'],
    include : 'relative'
},
styles : {
    files: [
        {
            expand: true,
            cwd: '.build/',
            src: ['styles/**/*.js'],
            dest: 'dist/',
            ext: '.js'
        }
    ]
}
```

合并任务唯一要注意的地方就是其中`expand: true`的设置，该配置貌似是开启动态文件编译，就不用每个文件的合并策略都单独写啦！感谢 @Hsiaoming Yang 的指点。
官方描述：[building-the-files-object-dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically "building-the-files-object-dynamically")
，其它没有什么特别的地方，就是将临时目录中的js合并后生成到`dist`目录中，只是需要额外说明下`options`：

* paths：与transport的paths相同。

* include：relative的含义是合并采用相对路径依赖的模块，比如示例中自定义模块`dialog`的`require("./dialog_css.css")`。

好啦，构建模块最主要的任务就这么完成了，下面再来看下业务模块的构建。

---

**业务模块的`transport`任务：**

```
transport : {
    app1 : {
        options : {
            idleading : 'app1/'
        },
        files : [
            {
                cwd : 'app',
                src : '**/*',
                filter : 'isFile',
                dest : '.build/app'
            }
        ]
    }
}
```

有了上面自定义模块的构建基础，相信这里已经不需要我多余的解释了。那么马上看下业务模块的合并任务吧。

**业务模块的`concat`任务：**

```
concat : {
    app1 : {
        options : {
            include : 'all'
        },
        files: [
            {
                expand: true,
                cwd: '.build/',
                src: ['app/**/*.js'],
                dest: 'dist/',
                ext: '.js'
            }
        ]
    }
}
```

照例说明下`options`：

* include：由于是业务模块，理想的状况是除了seajs本身，我们就只需要业务相关的js及其所有依赖。那么all就是将所有依赖全都合并成一个文件。

还要定义压缩和清理的任务，这里就非常简单了：

```javascript
uglify : {
    styles : {
        files: [
            {
                expand: true,
                cwd: 'dist/',
                src: ['styles/**/*.js', '!styles/**/*-debug.js'],
                dest: 'dist/',
                ext: '.js'
            }
        ]
    },
    app1 : {
        files: [
            {
                expand: true,
                cwd: 'dist/',
                src: ['app/**/*.js', '!app/**/*-debug.js'],
                dest: 'dist/',
                ext: '.js'
            }
        ]
    }
},
clean : {
    spm : ['.build']
}
```

ps:`!styles/**/*-debug.js`的意思是`*-debug.js`文件不压缩。


好了，接下来需要告诉grunt如何来执行这些任务：

```javascript
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build-styles', ['transport:styles', 'concat:styles', 'uglify:styles', 'clean']);
    grunt.registerTask('build-app1', ['transport:app1', 'concat:app1', 'uglify:app1', 'clean']);
//  grunt.registerTask('default', ['clean']);
```

*ps:这里将grunt的默认任务`default`只设置为`clean`，避免误操作。*

最后到命令行执行下grunt，看看效果吧！

```
grunt build-styles
```

```
grunt build-app1
```

再唠叨两句，这里之所以这样设置任务，是考虑到项目中的自定义模块，改动的几率要比业务模块低很多，
可以先构建好，并在`package.json`中设置好`alias`，每个项目在上线前构建一次业务模块即可。

---

最后的最后，将调试用的`rootConfig.js`去掉，然后页面中的`index.js`路径替换成构建好的js，路径中app前面的部分一般都是以`php`,`java`等变量代替，
这样只需要在变量中定义好上线路径，前端基本就不需要在项目上线的时候关心这里啦：）

```
seajs.use("../../dist/app/app1/index/src/index.js")
```

---

**最后感谢seajs,spm,grunt，让我的前端工作变得更轻松了。**

以下是完整的`Gruntfile.js`：

```javascript
module.exports = function (grunt) {
    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);
    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
        transport : {
            options : {
                paths : ['.'],
                alias: '<%= pkg.spm.alias %>',
                parsers : {
                    '.js' : [script.jsParser],
                    '.css' : [style.css2jsParser],
                    '.html' : [text.html2jsParser]
                }
            },
            styles : {
                options : {
                    idleading : 'dist/styles/'
                },
                files : [
                    {
                        cwd : 'styles/',
                        src : '**/*',
                        filter : 'isFile',
                        dest : '.build/styles'
                    }
                ]
            },
            app1 : {
                options : {
                    idleading : 'app1/'
                },
                files : [
                    {
                        cwd : 'app',
                        src : '**/*',
                        filter : 'isFile',
                        dest : '.build/app'
                    }
                ]
            }
        },
        concat : {
            options : {
                paths : ['.'],
                include : 'relative'
            },
            styles : {
                files: [
                    {
                        expand: true,
                        cwd: '.build/',
                        src: ['styles/**/*.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            },
            app1 : {
                options : {
                    include : 'all'
                },
                files: [
                    {
                        expand: true,
                        cwd: '.build/',
                        src: ['app/**/*.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            }
        },
        uglify : {
            styles : {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['styles/**/*.js', '!styles/**/*-debug.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            },
            app1 : {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['app/**/*.js', '!app/**/*-debug.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            }
        },
        clean : {
            spm : ['.build']
        }
    });
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('build-styles', ['transport:styles', 'concat:styles', 'uglify:styles', 'clean']);
    grunt.registerTask('build-app1', ['transport:app1', 'concat:app1', 'uglify:app1', 'clean']);
//    grunt.registerTask('default', ['clean']);
};
```