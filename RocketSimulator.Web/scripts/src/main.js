define(["require", "exports", "knockout", "./rocket/RocketViewModel", "./bindings/BindingLoader"], function (require, exports, ko, RocketViewModel_1) {
    "use strict";
    // Apply the view model 
    ko.applyBindings(new RocketViewModel_1.RocketViewModel());
});
