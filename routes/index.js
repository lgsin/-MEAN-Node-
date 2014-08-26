var User = require('../models/user.js');
var Friend = require('../models/friend.js');
var Ticket = require('../models/ticket.js');
var Company = require('../models/company.js');
var Path = require('../models/path.js');



module.exports = function (app) {
   /* app.get('/', function (req, res, next) {
        res.render('index');
    });*/
    //  注册 商家 账号
    app.post('/api/registCompany',function(req,res){
        var newCompany = new Company(req.body);
        console.log("new"+newCompany)
           newCompany.save(function(err,result){ 
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
        newCompany.check(newCompany.username, function(err, company) {
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
              //  req.flash('error', '用户不存在');
                res.redirect('/');
            }
        });
    })

    //  注册 个人 账号
    app.post('/api/regist',function(req,res){
        var newUser = new User(req.body);
        console.log("new"+newUser)
           newUser.save(function(err,user){ 
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
        newUser.check(newUser.username, function(err, user) {
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
        Company.prototype.getCompany(function(err,companys){
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
    app.post('/api/addFriend',function(req,res){
        var newFriend = new Friend(req.body);
        newFriend.save(function(err,newFriend){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            res.json({newFriend: newFriend});
        }); 
    }); 

    //  删除联系人
    app.post('/api/deleteFriend',function(req,res){
        Friend.prototype.deleteFriend(req.body.friendId,function(err,result){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            res.json({result: result});
        }); 
    }); 
     //  获得联系人
     app.get('/api/getFriends/:userId',function(req,res){
        var friend = new Friend({userId: req.params.userId});
        friend.getFriends(friend.userId,function(err,friends){
            if(err){
                return reas.redirect('/');
            }
            res.json({friends: friends});
        })
     });

    //  买票
    app.post('/api/bookTicket',function(req,res){
        var ticket = new Ticket(req.body);
       ticket.save(function(err,ticket){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            res.json({ticket: ticket});
        }); 
    }); 

    //  获取 已买票
    app.get('/api/getBookingTicket/:userId',function(req,res){
        var ticket = new Ticket({userId: req.params.userId});
        ticket.getBookingTicket(ticket.userId, function(err,tickets){ 
            if(err){ 
              return res.redirect('/'); 
            } 
            res.json({tickets: tickets});
        }); 
    }); 

     //  取消已买票
    app.post('/api/deleteTicket',function(req,res){
        Ticket.prototype.cencelTicket(req.body.ticketId,function(err,result){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            res.json({result: result});
        }); 
    }); 

      //  获得已有路线
     app.get('/api/getPaths/:companyId',function(req,res){
        var path = new Path({companyId: req.params.companyId});
        path.getPath(path.companyId,function(err,paths){
            if(err){
                return reas.redirect('/');
            }
            res.json({paths: paths});
        })
     });

    //  添加新路线
    app.post('/api/addPath',function(req,res){
        var newPath = new Path(req.body);
        newPath.save(function(err,newPath){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            res.json({newPath: newPath});
        }); 
    }); 
    //  删除 已有路线
    app.post('/api/deletePath',function(req,res){
        Path.prototype.deletePath(req.body.pathId,function(err,result){ 
            if(err){ 
              req.flash('error',err); 
              return res.redirect('/'); 
            } 
            res.json({result: result});
        }); 
    }); 

    //  获取 收到订单
    app.get('/api/companyGetBookingTicket/:companyId',function(req,res){
        var ticket = new Ticket({companyId: req.params.companyId});
        ticket.companyGetBookingTicket(ticket.companyId, function(err,tickets){ 
            if(err){ 
              return res.redirect('/'); 
            } 
            res.json({tickets: tickets});
        }); 
    }); 

};


