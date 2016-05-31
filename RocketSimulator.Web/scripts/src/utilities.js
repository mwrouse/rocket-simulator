define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    /**
     * Just some utilities/helpful function s
     */
    function RegisterView(name, file) {
        ko.components.register(name, {
            template: { require: 'text!views/' + file }
        });
    }
    exports.RegisterView = RegisterView;
});
