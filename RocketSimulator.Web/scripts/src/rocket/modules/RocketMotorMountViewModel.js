define(["require", "exports", "knockout", "../../utilities"], function (require, exports, ko, Utils) {
    "use strict";
    /**
     * Rocket Motor Mount Model
     */
    var RocketMotorMountViewModel = (function () {
        // Constructor
        function RocketMotorMountViewModel() {
            // Available Motor Sizes
            this.availableMotorSizes = [{ num: 18, label: '18mm (0.7")' }, { num: 24, label: '24mm (0.94")' },
                { num: 29, label: '29mm (1.14")' }, { num: 38, label: '38mm (1.49")' },
                { num: 54, label: '54mm (2.12")' }];
            // Default Values
            this.diameter = ko.observable(RocketMotorMountViewModel.defaultValues.diameter);
            this.length = ko.observable(RocketMotorMountViewModel.defaultValues.length);
            Utils.RegisterView('motorMount-view', 'RocketMotorMountView.html');
        } // End constructor
        /**
         * Loads existing model data
         */
        RocketMotorMountViewModel.prototype.loadModel = function (model) {
            if (this.verifyModel(model)) {
                // Load Values
                this.diameter(model.diameter);
                this.length(model.length);
            }
        }; // End load model
        /**
         * Verifies a loaded model is valid
         */
        RocketMotorMountViewModel.prototype.verifyModel = function (loadedModel) {
            var result = true;
            // Check diameter
            if (!loadedModel.hasOwnProperty('diameter') || isNaN(loadedModel.diameter))
                result = false;
            // Check length
            if (!loadedModel.hasOwnProperty('length') || isNaN(loadedModel.length))
                result = false;
            return result;
        }; // End Verify model
        /**
         * Converts Diameter from mm to inches
         */
        RocketMotorMountViewModel.prototype.inches = function () {
            return this.diameter() / 25.4;
        }; // End inches
        /**
         * Generates a model for this rocket module
         */
        RocketMotorMountViewModel.prototype.toModel = function () {
            return {
                diameter: this.diameter(),
                length: this.length()
            };
        };
        RocketMotorMountViewModel.defaultValues = { diameter: 24, length: 30 };
        return RocketMotorMountViewModel;
    }());
    exports.RocketMotorMountViewModel = RocketMotorMountViewModel;
});
