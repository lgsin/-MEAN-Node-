var express = require('express'),
    path = require('path'),
    /*引入模块*/
    MongoStore = require('connect-mongo')(express),
    settingDB = require('../../settingDB');
module.exports = function (app) {
    app.configure('development', function () {
        app.use(function staticsPlaceholder(req, res, next) {
            return next();
        });

        app.set('port', process.env.PORT || 9000);
        app.set('views', path.join(app.directory, '/app'));
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser('your secret here'));
       // app.use(express.session());
        //配置use
        //app.use(flash());
        app.use(express.session({
          secret: settingDB.cookieSecret,
          key: settingDB.db,
          cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
          store: new MongoStore({
            db: settingDB.db
          })
        }));

        app.use(function middlewarePlaceholder(req, res, next) {
          return next();
        });

        app.use(app.router);
        app.use(express.errorHandler());
    });
};
