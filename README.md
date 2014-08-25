#使用MEAN(MongoDB,ExpressJS,AngualrJS,NodeJS)构建中型系统？

- author: linshuo

---

本文前提是你已经了解了[angualrjs](http://linshuo.sinaapp.com/?p=245 "angularjs")和[grunt](http://gruntjs.com/ "grunt")。

阅读的同时可参照完整示例：    [seajs-grunt-build](https://github.com/twinstony/seajs-grunt-build "seajs-grunt-build")

一切准备就绪，那么就让我们开始吧！
## 前言
近期一直在琢磨着一些新的东西，像很火的前端mv*框架angularjs，好好研究了一把后便想实战一番，本想着是用比较熟悉的java来做后台，但心里就是纠结，突然间想到用之前了解过nodejs来试试，结合这个新学的前端框架，进行学习（orz，其实无非就是被使用javascript语言来的nodejs吸引了，哈哈，我这个js迷~）在这里我就不讲angularjs和nodejs的基础知识了。因为这是实战篇嘛，整个项目将采用如标题所示的MEAN架构①希望能写成一个系列，是记录我开发整个流程。

①Mean其首字母分别代表：
MongoDB——NoSQL的文档数据库，使用JSON风格来存储数据，非常适合javascript。(JSON是JS数据格式)，甚至也是使用JS来进行sql查询；
Express —— 基于Node的Web开发框架；提供有帮助的组件和模块帮助建立一个网站应用。
Aagular —— JS的前端开发框架，提供了声明式的双向数据绑定；
Node —— 基于V8的运行时环境（JS语言开发），可以构建快速响应、可扩展的网络应用，是一个并发 异步 事件驱动的Javascript服务器后端开发平台。。
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


*注1：由于近期concat和transport变化较快，有些配置可能随新版本的发布而不可用，固提交个与例子相符的版本在这里。*

## MEAN架构实战案例(一)环境搭建

首先，示例非常简单，通过点击页面中的按钮，弹出一个窗口。那么我们先把弹窗封装成一个模块吧：

```javascript
define(function(require, exports, module) {
    var $ = require("jquery");
    require("./dialog_css.css");

    function Dialog(content, options) {
        ...
    }
    module.exports = Dialog;
})

```
可以看到该模块还以相对路径为模块ID，依赖了一个css文件，来修饰窗口的样式。

然后为首页完成业务模块`index.js`：

```javascript
define(function (require, exports) {
    var $ = require("jquery"),
        Dialog = require("dialog");
    $("#btnDialog").bind("click", function () {
        var mapDialog = new Dialog({type: "text", value: 'hello world!', width:'230px', height:'60px'});
        mapDialog.show();
    })
});
```

现在需要一个开发阶段seajs的配置文件`rootConfig.js`，并将其引入到页面中：

```javascript
seajs.config({
    alias:{
        "jquery":"gallery/jquery/1.8.2/jquery",

        /*弹窗*/
        "dialog": "styles/component/dialog/src/dialog"
    },
    debug:1
});
```

接下来我们来编写展示的页面`index.html`：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title></title>
</head>
<body>
<input type="button" id="btnDialog" value="show me the money"/>
<script src="../../seajs/1.3.1/sea.js"></script>
<script src="../../rootConfig.js"></script>
<script type="text/javascript">
    seajs.use("../../app/app1/index/src/index.js")
</script>
</body>
</html>
```

这时候运行刚刚完成的`index.html`，一切顺利的话，应该已经可以看到弹窗的效果了。
OK，前面的这些就是我们在开发阶段使用seajs的工作。接下来就是构建部分了。

## 构建

**package.json**

首先，如果你不是最近才用seajs的话，应该对`package.json`不陌生，而且里面很可能也像我一样，定义了好多`alias`，
现在我们依然可以用上她们,这里为了能跟以后的spm2兼容做了些小的修改：

1. `root`->`family`
2. `alias`->`spm.alias`

```
{
    "family": "test",
    "version": "0.0.1",
    "name": "gruntTest",
    "spm": {
        "alias": {
            "jquery": "gallery/jquery/1.8.2/jquery",
            "dialog": "dist/styles/component/dialog/src/dialog"
        }
    },
    "devDependencies": {
        "grunt": "~0.4.1"
    }
}
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