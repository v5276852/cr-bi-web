define(function (require) {

    // load external dependencies
    var Marionette = require("marionette"),
        appInfo = require("app_info"),
        template = require("text!templates/shell/shell.html"),
        HeaderView = require("modules/shell/views/header_view"),
        FooterView = require("modules/shell/views/footer_view");

    var ShellView = Marionette.Layout.extend({
        template: template,
        regions: {
            headerRegion: "#header",
            mainRegion: "#main",
            footerRegion: "#footer"
        },
        onShow: function () {
            this.headerRegion.show(new HeaderView());
            this.footerRegion.show(new FooterView());
            require([appInfo.moduleMap.index.path], function (indexModule) {
                indexModule.start();
            });
        }
    });

    return ShellView;
});