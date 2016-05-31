define(["require", "exports", "knockout", "../../utilities"], function (require, exports, ko, Utils) {
    "use strict";
    /**
     * Rocket Motor Model
     */
    var RocketMotorViewModel = (function () {
        // Constructor
        function RocketMotorViewModel() {
            // Default Values
            this.impulse = ko.observable(0);
            this.thrust = ko.observable(0);
            Utils.RegisterView('motor-view', 'RocketMotorView.html');
        } // End constructor
        /**
         * Loads existing model data
         */
        RocketMotorViewModel.prototype.loadModel = function (model) {
            if (this.verifyModel(model)) {
                // Load values
                this.impulse(model.impulse);
                this.thrust(model.thrust);
            }
        }; // End load model
        /**
         * Verifies a loaded model is valid
         */
        RocketMotorViewModel.prototype.verifyModel = function (loadedModel) {
            var result = true;
            // Check length
            if (!loadedModel.hasOwnProperty('thrust') || isNaN(loadedModel.thrust))
                result = false;
            // Check style
            if (!loadedModel.hasOwnProperty('impulse') || isNaN(loadedModel.impulse))
                result = false;
            return result;
        }; // End Verify model
        /**
         * Generates a model for this rocket module
         */
        RocketMotorViewModel.prototype.toModel = function () {
            return {
                impulse: this.impulse(),
                thrust: this.thrust()
            };
        };
        return RocketMotorViewModel;
    }());
    exports.RocketMotorViewModel = RocketMotorViewModel;
});
