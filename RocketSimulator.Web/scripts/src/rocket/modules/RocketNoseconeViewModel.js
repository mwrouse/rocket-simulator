define(["require", "exports", "knockout", "../../utilities"], function (require, exports, ko, Utils) {
    "use strict";
    /**
     * Rocket Nosecone Model
     */
    var RocketNoseconeViewModel = (function () {
        // Constructor
        function RocketNoseconeViewModel() {
            // List of possible nosecone styles
            this.availableStyles = [
                { num: 0, label: 'Ogive' },
                { num: 1, label: 'Cone' },
                { num: 2, label: 'Parabola' },
                { num: 3, label: 'Blunt' }
            ];
            // Default Values
            this.length = ko.observable(RocketNoseconeViewModel.defaultValues.length);
            this.style = ko.observable(RocketNoseconeViewModel.defaultValues.style);
            this.material = ko.observable(RocketNoseconeViewModel.defaultValues.material);
            Utils.RegisterView('nosecone-view', 'RocketNoseconeView.html');
        } // End constructor
        /**
         * Loads existing model data
         */
        RocketNoseconeViewModel.prototype.loadModel = function (model) {
            if (this.verifyModel(model)) {
                // Load values
                this.length(model.length);
                this.style(model.style);
                this.material(model.material);
            }
        }; // End load model
        /**
         * Verifies a loaded model is valid
         */
        RocketNoseconeViewModel.prototype.verifyModel = function (loadedModel) {
            var result = true;
            // Check length
            if (!loadedModel.hasOwnProperty('length') || isNaN(loadedModel.length))
                result = false;
            // Check style
            if (!loadedModel.hasOwnProperty('style') || isNaN(loadedModel.style))
                result = false;
            // Check material
            if (!loadedModel.hasOwnProperty('material') || isNaN(loadedModel.material))
                result = false;
            return result;
        }; // End Verify model
        /**
         * Generates a model for this rocket module
         */
        RocketNoseconeViewModel.prototype.toModel = function () {
            return {
                length: this.length(),
                style: this.style(),
                material: this.material()
            };
        };
        // Static Properties
        RocketNoseconeViewModel.defaultValues = { length: 30, style: 0, material: 3 };
        return RocketNoseconeViewModel;
    }());
    exports.RocketNoseconeViewModel = RocketNoseconeViewModel;
});
