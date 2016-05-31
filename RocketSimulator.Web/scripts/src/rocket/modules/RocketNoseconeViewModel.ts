import * as ko from "knockout";

import * as Utils from "../../utilities";


/**
 * Rocket Nosecone Model
 */
export class RocketNoseconeViewModel
{
  // List of possible nosecone styles
  availableStyles: IDropDownList[] = [
    { num: 0, label: 'Ogive' },
    { num: 1, label: 'Cone' },
    { num: 2, label: 'Parabola' },
    { num: 3, label: 'Blunt' }
  ];

  // Data Parameters
    length: KnockoutObservable<number>; // Length of the nosecone
     style: KnockoutObservable<number>; // Style of nosecone
  material: KnockoutObservable<number>; // Material of nosecone

  // Static Properties
  static defaultValues: IRocketNoseconeModel = { length: 30, style: 0, material: 3 };

  // Constructor
  constructor()
  {
    // Default Values
    this.length   = ko.observable(RocketNoseconeViewModel.defaultValues.length);
    this.style    = ko.observable(RocketNoseconeViewModel.defaultValues.style);
    this.material = ko.observable(RocketNoseconeViewModel.defaultValues.material);

    Utils.RegisterView('nosecone-view', 'RocketNoseconeView.html');

  } // End constructor


  /**
   * Loads existing model data
   */
  loadModel(model: IRocketNoseconeModel):void
  {
    if (this.verifyModel(model)) // Double check
    {
      // Load values
      this.length(model.length);
      this.style(model.style);
      this.material(model.material);
    }
  } // End load model


  /**
   * Verifies a loaded model is valid
   */
  verifyModel(loadedModel: IRocketNoseconeModel):Boolean
  {
    let result:Boolean = true;

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
  } // End Verify model


  /**
   * Generates a model for this rocket module
   */
  toModel(): IRocketNoseconeModel
  {
    return {
        length: this.length(),
         style: this.style(),
      material: this.material()
    };
  }


}
