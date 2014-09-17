var User = require('../models/user.js');
var Friend = require('../models/friend.js');
var Ticket = require('../models/ticket.js');
var Company = require('../models/company.js');
var Path = require('../models/path.js');


module.exports = function (app) {
   /* app.get('/', function (req, res, next) {
        res.render('index');
    });*/
    app.post('/test',function(req,res){
        var url = req.files.ff.path;
        var k = copyFile(url);
        res.redirect('#/company/mes');
        
        function  copyFile(url){
            this.fs = require('fs');
            this.path = require("path");
            //上传文件的路径
            var fileUrl = url;
            //输入流
            var rs = this.fs.createReadStream(fileUrl);
            //文件名
            var fileName = this.path.basename(fileUrl);

            //项目根目录
            var rootUrl = "/Users/kakurinshuo/n/app";
            //图片等资源路径目录
            var resourceUrl = "/images";

            var newResourceUrl = resourceUrl;
            rootUrl = this.path.join(rootUrl, resourceUrl);
            var newResourceUrl = this.path.join(rootUrl, fileName);
            //输出流
            var ws = this.fs.createWriteStream(newResourceUrl);
            rs.pipe(ws);
            //返回相对路径
            return resourceUrl + "/" + fileName;
        }
    })
    //  注册 商家 账号
    app.post('/api/registCompany',function(req,res){
        var newCompany = new Company(req.body);
        console.log(newCompany)
        newCompany.save('company', function(err,result){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            //成功后，将用户信息记录在页面间的会话req.session中，并且跳转到一个新页面，就是内容集中展示页面
            req.session.newCompany = newCompany; 
            res.json({newCompany: newCompany});
        }); 
    }); 
    //  商家登录
        //  登录
    app.post('/api/loginCompany', function(req,res){
        //  post过来的密码加密
        //  var md5 = crypto.createHash('md5'), 
        //  password = md5.update(req.body.password).digest('hex'); 
        var newCompany = new Company({
            username: req.body.username,
            password: req.body.password
        });
        //验证用户
        newCompany.check('company',{username: newCompany.username}, function(err, company) {
            if (company) {
                console.log("存在该company")
                //如果存在，就返回用户的所有信息，取出password来和post过来的password比较
                if (company.password != req.body.password) {
                    console.log("false" + company)
                    req.flash('error', '密码不正确');
                    res.redirect('/');
                } else {
                    //存到session中
                    req.session.company = company;
                    console.log(req.session);
                    res.json({company: company});
                }
            } else {
                console.log("用户不存在")
                res.redirect('/');
            }
        });
    })

    //  注册 个人 账号
    app.post('/api/regist',function(req,res){
        var newUser = new User(req.body);
        console.log(newUser)
        newUser.save('user', function(err,user){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            //成功后，将用户信息记录在页面间的会话req.session中，并且跳转到一个新页面，就是内容集中展示页面
            req.session.user = user; 
            res.json({user: user});
        }); 
    }); 

    //  登录
    app.post('/api/login', function(req,res){
        //  post过来的密码加密
        //  var md5 = crypto.createHash('md5'), 
        //  password = md5.update(req.body.password).digest('hex'); 
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        //验证用户
        newUser.check('user',{username : newUser.username}, function(err, user) {
            if (user) {
                console.log("存在该user")
                //如果存在，就返回用户的所有信息，取出password来和post过来的password比较
                if (user.password != req.body.password) {
                    console.log("false" + user)
                    req.flash('error', '密码不正确');
                    res.redirect('/');
                } else {
                    //存到session中
                    req.session.user = user;
                    console.log(req.session);

                    res.json({user: user});
                }
            } else {
                console.log("用户不存在")
              //  req.flash('error', '用户不存在');
                res.redirect('/');
            }
        });
    })
    
    //  获得已有公司
    app.get('/api/getCompany',function(req,res){
        Company.prototype.getList('company',{},function(err,companys){
            if(err){
                return reas.redirect('/');
            }
            res.json({companys: companys});
        })
     });

    // 退出登录
    app.post('/api/logout',function(req,res){
        req.session.user = "";
        console.log(req.session.user)
        res.json(req.session.user);
    })

    //  添加新联系人
    app.post('/api/friend',function(req,res){
        var newFriend = new Friend(req.body);
        newFriend.save('friend', function(err,newFriend){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            res.json({newFriend: newFriend});
        }); 
    }); 

    //  删除联系人
    app.delete('/api/friend/:userId/:friID',function(req,res){
        Friend.prototype.deleteById('friend', {_id: req.params.friID},function(err,result){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            res.json({result: result});
        }); 
    }); 
     //  获得联系人
     app.get('/api/friend/:userId',function(req,res){
        Friend.prototype.getList('friend',{userId: req.params.userId},function(err,friends){
            if(err){
                return reas.redirect('/');
            }
            console.log(friends)
            res.json({friends: friends});
        })
     });

    //  买票
    app.post('/api/bookTicket',function(req,res){
        var ticket = new Ticket(req.body);
        ticket.save('ticket',function(err,ticket){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            res.json({ticket: ticket});
        }); 
    }); 

    //  获取 已买票
    app.get('/api/ticket/:userId',function(req,res){
        Ticket.prototype.getList('ticket',{userId: req.params.userId}, function(err,tickets){ 
            if(err){ 
              return res.redirect('/'); 
            } 
            res.json({tickets: tickets});
        }); 
    }); 

    //  取消已买票
    app.delete('/api/ticket/:ticketId',function(req,res){
        Ticket.prototype.deleteById('ticket', {_id: req.params.ticketId},function(err,result){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            res.json({result: result});
        }); 
    }); 

    //  获得已有路线
    app.get('/api/path/:companyId',function(req,res){
        Path.prototype.getList('path', {companyId: req.params.companyId},function(err,paths){
            if(err){
                return reas.redirect('/');
            }
            res.json({paths: paths});
        })
    });

    //  添加新路线
    app.post('/api/path',function(req,res){
        var newPath = new Path(req.body);
        newPath.save('path', function(err,newPath){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            res.json({newPath: newPath});
        }); 
    }); 
    //  删除 已有路线
    app.delete('/api/path/companyId/:pathId',function(req,res){
        console.log("ff")
        Path.prototype.deleteById('path', {_id: req.params.pathId},function(err,result){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            res.json({result: result});
        }); 
    }); 

    //  获取 收到订单
    app.get('/api/ticket/company/:companyId',function(req,res){
        console.log("----")
        Ticket.prototype.getList('ticket', {companyId: req.params.companyId}, function(err,tickets){ 
            console.log(tickets)
            if(err){ 
              return res.redirect('/'); 
            } 
            res.json({tickets: tickets});
        }); 
    }); 

};


