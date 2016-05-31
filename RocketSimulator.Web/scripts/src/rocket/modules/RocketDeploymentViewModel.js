define(["require", "exports", "knockout", "../../utilities"], function (require, exports, ko, Utils) {
    "use strict";
    /**
     * Rocket Deployment Model
     */
    var RocketDeploymentViewModel = (function () {
        // Constructor
        function RocketDeploymentViewModel() {
            // Load Values
            this.type = ko.observable(RocketDeploymentViewModel.defaultValues.type);
            this.mainMethod = ko.observable(RocketDeploymentViewModel.defaultValues.main.method);
            this.mainSize = ko.observable(RocketDeploymentViewModel.defaultValues.main.size);
            this.mainWidth = ko.observable(RocketDeploymentViewModel.defaultValues.main.width);
            this.drogueMethod = ko.observable(RocketDeploymentViewModel.defaultValues.drogue.method);
            this.drogueSize = ko.observable(RocketDeploymentViewModel.defaultValues.drogue.size);
            this.drogueWidth = ko.observable(RocketDeploymentViewModel.defaultValues.drogue.width);
            Utils.RegisterView('deployment-view', 'RocketDeploymentView.html');
        } // End constructor
        /**
         * Loads existing model data
         */
        RocketDeploymentViewModel.prototype.loadModel = function (model) {
            if (this.verifyModel(model)) {
                // Load Values
                this.type(model.type);
                this.mainMethod(model.main.method);
                this.mainSize(model.main.size);
                this.mainWidth(model.main.width);
                this.drogueMethod(model.drogue.method);
                this.drogueSize(model.drogue.size);
                this.drogueWidth(model.drogue.width);
            }
        }; // End load model
        /**
         * Verifies a loaded model is valid
         */
        RocketDeploymentViewModel.prototype.verifyModel = function (loadedModel) {
            var result = true;
            // Check Type
            if (!loadedModel.hasOwnProperty('type') || isNaN(loadedModel.type))
                result = false;
            // Check Main
            if (!loadedModel.hasOwnProperty('main') || !(typeof loadedModel == "object"))
                result = false;
            // Check Main method
            if (!loadedModel.main.hasOwnProperty('method') || isNaN(loadedModel.main.method))
                result = false;
            // Check Main size
            if (!loadedModel.main.hasOwnProperty('size') || isNaN(loadedModel.main.size))
                result = false;
            // Check Main Width
            if (!loadedModel.main.hasOwnProperty('width') || isNaN(loadedModel.main.width))
                result = false;
            // Check Drogue
            if (!loadedModel.hasOwnProperty('drogue') || !(typeof loadedModel.drogue == "object"))
                result = false;
            // Check Drogue method
            if (!loadedModel.drogue.hasOwnProperty('method') || isNaN(loadedModel.drogue.method))
                result = false;
            // Check Drogue size
            if (!loadedModel.drogue.hasOwnProperty('size') || isNaN(loadedModel.drogue.size))
                result = false;
            // Check Drogue Width
            if (!loadedModel.drogue.hasOwnProperty('width') || isNaN(loadedModel.drogue.width))
                result = false;
            return result;
        }; // End Verify model
        /**
         * Generates a model for this rocket module
         */
        RocketDeploymentViewModel.prototype.toModel = function () {
            return {
                type: this.type(),
                main: {
                    method: this.mainMethod(),
                    size: this.mainSize(),
                    width: this.mainWidth()
                },
                drogue: {
                    method: this.drogueMethod(),
                    size: this.drogueSize(),
                    width: this.drogueWidth()
                }
            };
        };
        RocketDeploymentViewModel.defaultValues = { type: 0, main: { method: 0, size: 25, width: 2 }, drogue: { method: 0, size: 12, width: 2 } };
        return RocketDeploymentViewModel;
    }());
    exports.RocketDeploymentViewModel = RocketDeploymentViewModel;
});
