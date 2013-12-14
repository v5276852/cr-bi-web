define(function (require) {
    "use strict";

    // load external dependencies
    var Backbone = require("backbone"),
        Marionette = require("marionette"),
        appInfo = require("app_info"),
        util = require("utils/util");

    var app = new Marionette.Application();

    app.addRegions({
        bodyRegion: "body"
    });

    app.on("initialize:before", function () {
        var isLogin = appInfo.isLogin();
        app.vent.trigger(isLogin ? "login:succeed" : "logout");
    });

    app.on("initialize:after", function () {
        Backbone.history.start();
    });

    app.vent.on("login:succeed", function () {
        var loginModule = app[appInfo.moduleMap.login.artifact];
        if (loginModule) {
            loginModule.stop();
        }
        appInfo.loginInfo.update();
        require([appInfo.moduleMap.shell.path], function (shellModule) {
            shellModule.start();
        });
    });

    app.vent.on("logout", function () {
        util.navigation.navigateTo();
        var shellModule = app[appInfo.moduleMap.shell.artifact];
        if (shellModule) {
            shellModule.stop();
        }
        require([appInfo.moduleMap.login.path], function (loginModule) {
            loginModule.start();
        });
    });

    return app;
});
