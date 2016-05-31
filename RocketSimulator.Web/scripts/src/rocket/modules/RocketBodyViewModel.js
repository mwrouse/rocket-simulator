define(["require", "exports", "knockout", "../../utilities"], function (require, exports, ko, Utils) {
    "use strict";
    /**
     * Rocket Body Model
     */
    var RocketBodyViewModel = (function () {
        // Constructor
        function RocketBodyViewModel() {
            // Apply to observables
            this.diameter = ko.observable(RocketBodyViewModel.defaultValues.diameter);
            this.length = ko.observable(RocketBodyViewModel.defaultValues.length);
            this.material = ko.observable(RocketBodyViewModel.defaultValues.material);
            // Register the view component
            Utils.RegisterView('body-view', 'RocketBodyView.html');
        } // End Constructor
        /**
         * Loads existing model data
         */
        RocketBodyViewModel.prototype.loadModel = function (model) {
            if (this.verifyModel(model)) {
                // Load values
                this.diameter(model.diameter);
                this.length(model.length);
                this.material(model.material);
            }
        }; // End load model
        /**
         * Verifies a loaded model is valid
         */
        RocketBodyViewModel.prototype.verifyModel = function (loadedModel) {
            var result = true;
            // Check diameter
            if (!loadedModel.hasOwnProperty('diameter') || isNaN(loadedModel.diameter))
                result = false;
            // Check length
            if (!loadedModel.hasOwnProperty('length') || isNaN(loadedModel.length))
                result = false;
            // Check material
            if (!loadedModel.hasOwnProperty('material') || isNaN(loadedModel.material))
                result = false;
            return result;
        }; // End Verify model
        /**
         * Generate the model for this module
         */
        RocketBodyViewModel.prototype.toModel = function () {
            return {
                diameter: this.diameter(),
                length: this.length(),
                material: this.material()
            };
        };
        RocketBodyViewModel.defaultValues = { diameter: 4, length: 55, material: 0 };
        return RocketBodyViewModel;
    }());
    exports.RocketBodyViewModel = RocketBodyViewModel;
});
