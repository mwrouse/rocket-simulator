import * as ko from "knockout";
import { RocketRenderer } from "../rocket/RocketRenderer";

/**
 * Binding for elements to trigger a redraw on the screen
 */
ko.bindingHandlers['render'] = {
    // Initialize the binding
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        // Listen for change in the model
        (valueAccessor()).subscribe((model: IRocketModel) => {
            // Update the model for the renderer
            RocketRenderer.setModel(model);

            // Schedule a render
            RocketRenderer.scheduleRender();
        });
    }
};
