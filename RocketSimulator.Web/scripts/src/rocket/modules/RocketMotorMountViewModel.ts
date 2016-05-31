import * as ko from "knockout";

import * as Utils from "../../utilities";


/**
 * Rocket Motor Mount Model
 */
export class RocketMotorMountViewModel
{

  // Available Motor Sizes
  availableMotorSizes: IDropDownList[] = [{ num: 18, label: '18mm (0.7")' }, { num: 24, label: '24mm (0.94")' },
      { num: 29, label: '29mm (1.14")' }, { num: 38, label: '38mm (1.49")' },
      { num: 54, label: '54mm (2.12")' }];


  // Data Parameters
  diameter: KnockoutObservable<number>;
    length: KnockoutObservable<number>;

  static defaultValues: IRocketMotorMountModel = { diameter: 24, length: 30 };

  // Constructor
  constructor()
  {
    // Default Values
    this.diameter = ko.observable(RocketMotorMountViewModel.defaultValues.diameter);
    this.length   = ko.observable(RocketMotorMountViewModel.defaultValues.length);

    Utils.RegisterView('motorMount-view', 'RocketMotorMountView.html');

  } // End constructor


  /**
   * Loads existing model data
   */
  loadModel(model: IRocketMotorMountModel):void
  {
    if (this.verifyModel(model)) // Double check
    {
      // Load Values
      this.diameter(model.diameter);
      this.length(model.length);
    }
  } // End load model


  /**
   * Verifies a loaded model is valid
   */
  verifyModel(loadedModel: IRocketMotorMountModel):Boolean
  {
    let result:Boolean = true;

    // Check diameter
    if (!loadedModel.hasOwnProperty('diameter') || isNaN(loadedModel.diameter))
      result = false;

    // Check length
    if (!loadedModel.hasOwnProperty('length') || isNaN(loadedModel.length))
      result = false;

    return result;
  } // End Verify model


  /**
   * Converts Diameter from mm to inches
   */
  inches(): number
  {
    return (this.diameter() as number) / 25.4;
  } // End inches


  /**
   * Generates a model for this rocket module
   */
  toModel(): IRocketMotorMountModel
  {
    return {
      diameter: this.diameter(),
        length: this.length()
    };
  }

}
