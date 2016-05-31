define(["require", "exports", "knockout", "../../utilities"], function (require, exports, ko, Utils) {
    "use strict";
    /**
     * Rocket Fins Model
     */
    var RocketFinsViewModel = (function () {
        // Constructor
        function RocketFinsViewModel() {
            // List of possible fin counts
            this.availableCounts = [
                { num: 1, label: '3' },
                { num: 2, label: '4' },
                { num: 3, label: '6' },
            ];
            // List of possible fin materials
            this.availableMaterials = [
                { num: 0, label: 'Wood' },
                { num: 1, label: 'Fiberglass' },
                { num: 2, label: 'Carbon' },
                { num: 3, label: 'Plastic' },
            ];
            // List of possible fin styles
            this.availableStyles = [
                { num: 0, label: 'Trapezoidal' },
                { num: 1, label: 'Clipped Delta' },
                { num: 2, label: 'Tapered Swept' },
            ];
            // Default Values
            this.count = ko.observable(RocketFinsViewModel.defaultValues.count);
            this.style = ko.observable(RocketFinsViewModel.defaultValues.style);
            this.material = ko.observable(RocketFinsViewModel.defaultValues.material);
            this.offset = ko.observable(RocketFinsViewModel.defaultValues.offset);
            Utils.RegisterView('fins-view', 'RocketFinsView.html');
        } // End constructor
        /**
         * Loads existing model data
         */
        RocketFinsViewModel.prototype.loadModel = function (model) {
            if (this.verifyModel(model)) {
                // Load values
                this.count(model.count);
                this.style(model.style);
                this.material(model.material);
                this.offset(model.offset);
            }
        }; // End load model
        /**
         * Verifies a loaded model is valid
         */
        RocketFinsViewModel.prototype.verifyModel = function (loadedModel) {
            var result = true;
            // Check length
            if (!loadedModel.hasOwnProperty('count') || isNaN(loadedModel.count))
                result = false;
            // Check style
            if (!loadedModel.hasOwnProperty('style') || isNaN(loadedModel.style))
                result = false;
            // Check material
            if (!loadedModel.hasOwnProperty('material') || isNaN(loadedModel.material))
                result = false;
            // Check offset
            if (!loadedModel.hasOwnProperty('offset') || isNaN(loadedModel.offset))
                result = false;
            return result;
        }; // End Verify model
        /**
         * Generates a model for this rocket module
         */
        RocketFinsViewModel.prototype.toModel = function () {
            return {
                count: this.count(),
                style: this.style(),
                material: this.material(),
                offset: this.offset()
            };
        };
        RocketFinsViewModel.defaultValues = { count: 4, style: 1, material: 0, offset: 2 };
        return RocketFinsViewModel;
    }());
    exports.RocketFinsViewModel = RocketFinsViewModel;
});
