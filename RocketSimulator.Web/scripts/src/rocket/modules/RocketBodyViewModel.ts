import * as ko from "knockout";

import * as Utils from "../../utilities";


/**
 * Rocket Body Model
 */
export class RocketBodyViewModel
{
  // Data
  diameter: KnockoutObservable<number>; // Diameter of the body
    length: KnockoutObservable<number>; // Length of the body
  material: KnockoutObservable<number>; // Type of material


  static defaultValues: IRocketBodyModel  = { diameter: 4, length: 55, material: 0 };


  // Constructor
  constructor ()
  {
    // Apply to observables
    this.diameter = ko.observable(RocketBodyViewModel.defaultValues.diameter);
    this.length   = ko.observable(RocketBodyViewModel.defaultValues.length);
    this.material = ko.observable(RocketBodyViewModel.defaultValues.material);

    // Register the view component
    Utils.RegisterView('body-view', 'RocketBodyView.html');

  } // End Constructor

  /**
   * Loads existing model data
   */
  loadModel(model: IRocketBodyModel):void
  {
    if (this.verifyModel(model)) // Double check
    {
      // Load values
      this.diameter(model.diameter);
      this.length(model.length);
      this.material(model.material);
    }
  } // End load model


  /**
   * Verifies a loaded model is valid
   */
  verifyModel(loadedModel: IRocketBodyModel ):Boolean
  {
    let result:Boolean = true;

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
  } // End Verify model


  /**
   * Generate the model for this module
   */
  toModel(): IRocketBodyModel
  {
    return {
      diameter: this.diameter(),
      length: this.length(),
      material: this.material()
    };
  }

}
