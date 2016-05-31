import * as ko from "knockout";

import { RocketBodyViewModel }       from "./modules/RocketBodyViewModel";
import { RocketNoseconeViewModel }   from "./modules/RocketNoseconeViewModel";
import { RocketFinsViewModel }       from "./modules/RocketFinsViewModel";
import { RocketMotorMountViewModel } from "./modules/RocketMotorMountViewModel";
import { RocketDeploymentViewModel } from "./modules/RocketDeploymentViewModel";
import { RocketMotorViewModel } from "./modules/RocketMotorViewModel";

import { RocketRenderer } from "./RocketRenderer";


/**
 * Rocket Vuew Model
 */
export class RocketViewModel
{
  // Valid options for materials
  materials: IDropDownList[] = [
    { num: 0, label: 'Tube' },
    { num: 1, label: 'Fiberglass' },
    { num: 2, label: 'Carbon' },
    { num: 3, label: 'Plastic' }
  ];

  // Rocket Modules
        body: RocketBodyViewModel;
    nosecone: RocketNoseconeViewModel;
        fins: RocketFinsViewModel;
  deployment: RocketDeploymentViewModel;
  motorMount: RocketMotorMountViewModel;
       motor: RocketMotorViewModel;

   
  // Constructor
  constructor()
  {
    // Initialize modules
    this.body       = new RocketBodyViewModel();
    this.nosecone   = new RocketNoseconeViewModel();
    this.fins       = new RocketFinsViewModel();
    this.deployment = new RocketDeploymentViewModel();
    this.motorMount = new RocketMotorMountViewModel();
    this.motor      = new RocketMotorViewModel();

    // Get default rocket values
    this.loadDefaults();

  } // End constructor 



  /**
   * Load the default model
   */
  loadDefaults(): void
  {
      var elem = document.getElementById('results');
      elem.innerHTML = "";
      elem.classList.remove('show');

      // Load the default model from the .NET web API
      getJSON('/api/rocket', (data: IRocketModel) => {
        this.load(data);
      });

  } // End load Defaults 


  /**
   * Simulate the rocket
   */
  launch(): void
  {
      // Send rocket to the simulate API endpoint
      sendPOST('/api/rocket/simulate', this.model()(), (data: IRocketFlightResults) => {
          var elem = document.getElementById('results');

          var mach = (data.speed / 340.29).toFixed(2);
            
          elem.innerHTML = "<b>Flight Results:</b><br/>";
          elem.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;Altitude: " + (data.altitude * 3.28084).toFixed(2) + " ft<br/>";
          elem.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;Speed: " + (data.speed * 2.23694).toFixed(2) + " mph (Mach " + mach + ")<br/>";

          elem.classList.add('show');
      });
        
  } // End launch 


  /**
   * Load JSON model
   */
  load(data: IRocketModel): void
  {
      if (this.verifyModel(data))
      {
          this.body.loadModel(data.body);
          this.nosecone.loadModel(data.nosecone);
          this.fins.loadModel(data.fins);
          this.deployment.loadModel(data.deployment);
          this.motorMount.loadModel(data.motorMount);
          this.motor.loadModel(data.motor);
      }
  } // End load


  /**
   * Load a model from a file
   */
  loadModel(): void
  {
    let uploader:HTMLInputElement = document.getElementById('fileUpload') as HTMLInputElement;

    if (uploader)
    {
      // Make sure at least one file was selected
      if (uploader.files.length > 0)
      {
        // Read the file!
        let reader:FileReader = new FileReader();

        // Function for when the file is done being read
        reader.onload = () => {
          let data:IRocketModel = JSON.parse(reader.result);

          // Verify the data is a valid rocket model
          if(this.verifyModel(data))
          {
            // Load values
            this.load(data);
          }
          else
          {
            alert("Selected file does not contain rocket model data");
          }
        };

        // Read the first file
        reader.readAsText(uploader.files[0]);
      }
    }

  } // End loadModel


  /**
   * Verifies a loaded model is valid
   */
  verifyModel(loadedModel:IRocketModel):Boolean
  {
    let result:Boolean = false;

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
  } // End verifyModel


  /**
   * Save a Model
   */
  saveModel():void
  {
    let data:Blob = new Blob([JSON.stringify(this.model()())], { type: "application/json" });

    let virtualLink: HTMLAnchorElement = document.createElement('a');
    virtualLink.setAttribute('download', 'rocketSave.json');
    virtualLink.href = URL.createObjectURL(data);

    virtualLink.dispatchEvent(new MouseEvent('click')); // Prompt for save

  } // End Save Model


  /**
   * Computes and returns the active model at any given time
   */
  model (): KnockoutComputed<IRocketModel> {
    return ko.computed({
      owner: this,
      read: function() {
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

  } // End model


}
