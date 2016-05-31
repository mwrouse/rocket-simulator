define(["require", "exports", "knockout", "../rocket/RocketRenderer"], function (require, exports, ko, RocketRenderer_1) {
    "use strict";
    /**
     * Binding for elements to trigger a redraw on the screen
     */
    ko.bindingHandlers['render'] = {
        // Initialize the binding
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // Listen for change in the model
            (valueAccessor()).subscribe(function (model) {
                // Update the model for the renderer
                RocketRenderer_1.RocketRenderer.setModel(model);
                // Schedule a render
                RocketRenderer_1.RocketRenderer.scheduleRender();
            });
        }
    };
});
