import * as ko from "knockout";

import * as Utils from "../../utilities";


/**
 * Rocket Motor Model
 */
export class RocketMotorViewModel {
 
    // Data Parameters
    impulse: KnockoutObservable<number>; // Motor impulse 
    thrust: KnockoutObservable<number>; // Motor thrust 


    // Constructor
    constructor() {
        // Default Values
        this.impulse = ko.observable(0);
        this.thrust = ko.observable(0);


        Utils.RegisterView('motor-view', 'RocketMotorView.html');

    } // End constructor


    /**
     * Loads existing model data
     */
    loadModel(model: IRocketMotorModel): void {
        if (this.verifyModel(model)) // Double check
        {
            // Load values
            this.impulse(model.impulse);
            this.thrust(model.thrust);
        }
    } // End load model


    /**
     * Verifies a loaded model is valid
     */
    verifyModel(loadedModel: IRocketMotorModel): Boolean {
        let result: Boolean = true;

        // Check length
        if (!loadedModel.hasOwnProperty('thrust') || isNaN(loadedModel.thrust))
            result = false;

        // Check style
        if (!loadedModel.hasOwnProperty('impulse') || isNaN(loadedModel.impulse))
            result = false;

        return result;
    } // End Verify model


    /**
     * Generates a model for this rocket module
     */
    toModel(): IRocketMotorModel {
        return {
            impulse: this.impulse(),
            thrust: this.thrust()
        };
    }


}
