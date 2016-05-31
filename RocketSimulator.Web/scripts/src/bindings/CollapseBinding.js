define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    /**
     * Ranger Slider Knockout Binding
     */
    ko.bindingHandlers['collapse'] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var elem = document.getElementById(valueAccessor());
            if (elem) {
                // When clicked, find an element with the value
                element.addEventListener('click', function () {
                    // Collapse or Expand specified element
                    if (elem.classList.contains('expanded'))
                        elem.classList.remove('expanded'); // Collapse the element
                    else
                        elem.classList.add('expanded'); // Expand the element
                }); // End click event
            }
        } // End init
    };
});
