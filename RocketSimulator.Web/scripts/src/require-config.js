requirejs.config({
    baseUrl: 'scripts/src',
    paths: {
        "knockout": '../lib/knockout',
        "text": '../lib/text',
        "views": './rocket/views'
    }
});
// Start the main file
require(['main']);
