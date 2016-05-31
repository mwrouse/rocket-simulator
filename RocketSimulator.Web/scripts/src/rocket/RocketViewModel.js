define(["require", "exports", "knockout", "./modules/RocketBodyViewModel", "./modules/RocketNoseconeViewModel", "./modules/RocketFinsViewModel", "./modules/RocketMotorMountViewModel", "./modules/RocketDeploymentViewModel", "./modules/RocketMotorViewModel"], function (require, exports, ko, RocketBodyViewModel_1, RocketNoseconeViewModel_1, RocketFinsViewModel_1, RocketMotorMountViewModel_1, RocketDeploymentViewModel_1, RocketMotorViewModel_1) {
    "use strict";
    /**
     * Rocket Vuew Model
     */
    var RocketViewModel = (function () {
        // Constructor
        function RocketViewModel() {
            // Valid options for materials
            this.materials = [
                { num: 0, label: 'Tube' },
                { num: 1, label: 'Fiberglass' },
                { num: 2, label: 'Carbon' },
                { num: 3, label: 'Plastic' }
            ];
            // Initialize modules
            this.body = new RocketBodyViewModel_1.RocketBodyViewModel();
            this.nosecone = new RocketNoseconeViewModel_1.RocketNoseconeViewModel();
            this.fins = new RocketFinsViewModel_1.RocketFinsViewModel();
            this.deployment = new RocketDeploymentViewModel_1.RocketDeploymentViewModel();
            this.motorMount = new RocketMotorMountViewModel_1.RocketMotorMountViewModel();
            this.motor = new RocketMotorViewModel_1.RocketMotorViewModel();
            // Get default rocket values
            this.loadDefaults();
        } // End constructor 
        /**
         * Load the default model
         */
        RocketViewModel.prototype.loadDefaults = function () {
            var _this = this;
            var elem = document.getElementById('results');
            elem.innerHTML = "";
            elem.classList.remove('show');
            // Load the default model from the .NET web API
            getJSON('/api/rocket', function (data) {
                _this.load(data);
            });
        }; // End load Defaults 
        /**
         * Simulate the rocket
         */
        RocketViewModel.prototype.launch = function () {
            // Send rocket to the simulate API endpoint
            sendPOST('/api/rocket/simulate', this.model()(), function (data) {
                var elem = document.getElementById('results');
                var mach = (data.speed / 340.29).toFixed(2);
                elem.innerHTML = "<b>Flight Results:</b><br/>";
                elem.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;Altitude: " + (data.altitude * 3.28084).toFixed(2) + " ft<br/>";
                elem.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;Speed: " + (data.speed * 2.23694).toFixed(2) + " mph (Mach " + mach + ")<br/>";
                elem.classList.add('show');
            });
        }; // End launch 
        /**
         * Load JSON model
         */
        RocketViewModel.prototype.load = function (data) {
            if (this.verifyModel(data)) {
                this.body.loadModel(data.body);
                this.nosecone.loadModel(data.nosecone);
                this.fins.loadModel(data.fins);
                this.deployment.loadModel(data.deployment);
                this.motorMount.loadModel(data.motorMount);
                this.motor.loadModel(data.motor);
            }
        }; // End load
        /**
         * Load a model from a file
         */
        RocketViewModel.prototype.loadModel = function () {
            var _this = this;
            var uploader = document.getElementById('fileUpload');
            if (uploader) {
                // Make sure at least one file was selected
                if (uploader.files.length > 0) {
                    // Read the file!
                    var reader_1 = new FileReader();
                    // Function for when the file is done being read
                    reader_1.onload = function () {
                        var data = JSON.parse(reader_1.result);
                        // Verify the data is a valid rocket model
                        if (_this.verifyModel(data)) {
                            // Load values
                            _this.load(data);
                        }
                        else {
                            alert("Selected file does not contain rocket model data");
                        }
                    };
                    // Read the first file
                    reader_1.readAsText(uploader.files[0]);
                }
            }
        }; // End loadModel
        /**
         * Verifies a loaded model is valid
         */
        RocketViewModel.prototype.verifyModel = function (loadedModel) {
            var result = false;
            // Verify body
            if (loadedModel.hasOwnProperty('body'))
                result = this.body.verifyModel(loadedModel.body);
            // Verify nosecone
            if (result && loadedModel.hasOwnProperty('nosecone'))
                result = this.nosecone.verifyModel(loadedModel.nosecone);
            // Verify fins
            if (result && loadedModel.hasOwnProperty('fins'))
                result = this.fins.verifyModel(loadedModel.fins);
            // Verify motor mount
            if (result && loadedModel.hasOwnProperty('motorMount'))
                result = this.motorMount.verifyModel(loadedModel.motorMount);
            // Verify deployment
            if (result && loadedModel.hasOwnProperty('deployment'))
                result = this.deployment.verifyModel(loadedModel.deployment);
            // Verify motor 
            if (result && loadedModel.hasOwnProperty('motor'))
                result = this.motor.verifyModel(loadedModel.motor);
            return result;
        }; // End verifyModel
        /**
         * Save a Model
         */
        RocketViewModel.prototype.saveModel = function () {
            var data = new Blob([JSON.stringify(this.model()())], { type: "application/json" });
            var virtualLink = document.createElement('a');
            virtualLink.setAttribute('download', 'rocketSave.json');
            virtualLink.href = URL.createObjectURL(data);
            virtualLink.dispatchEvent(new MouseEvent('click')); // Prompt for save
        }; // End Save Model
        /**
         * Computes and returns the active model at any given time
         */
        RocketViewModel.prototype.model = function () {
            return ko.computed({
                owner: this,
                read: function () {
                    // Return the current model
                    return {
                        body: this.body.toModel(),
                        nosecone: this.nosecone.toModel(),
                        fins: this.fins.toModel(),
                        motorMount: this.motorMount.toModel(),
                        deployment: this.deployment.toModel(),
                        motor: this.motor.toModel()
                    };
                } // End read
            });
        }; // End model
        return RocketViewModel;
    }());
    exports.RocketViewModel = RocketViewModel;
});
