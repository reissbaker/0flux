'use strict';
var Action = require('./action');
var ActionBuilder = (function () {
    function ActionBuilder(app) {
        this._app = app;
    }
    ActionBuilder.prototype.action = function () {
        return new Action(this._app);
    };
    return ActionBuilder;
})();
module.exports = ActionBuilder;
