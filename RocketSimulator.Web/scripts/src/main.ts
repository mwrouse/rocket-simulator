import * as ko from "knockout";

// Import custom Knockout Bindings
import "./bindings/BindingLoader";

import { RocketViewModel } from "./rocket/RocketViewModel";

// Apply the view model 
ko.applyBindings(new RocketViewModel());


