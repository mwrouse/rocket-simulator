define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    /**
     * Ranger Slider Knockout Binding
     */
    ko.bindingHandlers['sliderValue'] = {
        // Initialize the binding
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            if (ko.isObservable(valueAccessor()) && (element instanceof HTMLInputElement)) {
                // Add event listener to update on input (do not have to release slider
                // to change value of observable)
                element.addEventListener('input', function () {
                    // Update the observable
                    valueAccessor()(element.value);
                    // Trigger the change event, work-around that makes
                    // changing a dropdown and a range slider function the same way
                    element.dispatchEvent(new Event('change'));
                });
            }
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            if (ko.isObservable(valueAccessor())) {
                // Update the slider value with the new value
                element.value = ko.unwrap(valueAccessor());
                element.dispatchEvent(new Event('input'));
            }
        } // End update
    };
    ko.bindingHandlers['sliderMax'] = {
        // Init, runs on initialization
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // Setup the initial maximum value if it is not an observable
            if (!ko.isObservable(valueAccessor()) && (element instanceof HTMLInputElement) && (element.type === "range"))
                element.max = valueAccessor(); // Not an observable
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // Update function is only meant for observables
            if (ko.isObservable(valueAccessor()) && (element instanceof HTMLInputElement) && (element.type === "range")) {
                if (element.value > ko.unwrap(valueAccessor())) {
                    element.value = ko.unwrap(valueAccessor());
                    element.dispatchEvent(new Event('input')); // Dispatch input event
                }
                // Set new maximum value
                element.max = ko.unwrap(valueAccessor());
            }
        }
    };
    ko.bindingHandlers['sliderMin'] = {
        // Init, runs on initialization
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // Setup the initial minimum value if it is not an observable
            if (!ko.isObservable(valueAccessor()) && (element instanceof HTMLInputElement) && (element.type === "range"))
                element.min = valueAccessor(); // Not an observable
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // Update function is only meant for observables
            if (ko.isObservable(valueAccessor()) && (element instanceof HTMLInputElement) && (element.type === "range")) {
                if (element.value < ko.unwrap(valueAccessor())) {
                    element.value = ko.unwrap(valueAccessor());
                    element.dispatchEvent(new Event('input')); // Dispatch input event
                }
                // Set new minimum value
                element.min = ko.unwrap(valueAccessor());
            }
        }
    };
});
