requirejs.config({
    baseUrl: 'scripts/src',
    paths: {
        "knockout": '../lib/knockout',
        "text": '../lib/text',          // text.js (allows require.js to load text files)
        "views": './rocket/views'
    } 
});
 
// Start the main file
require(['main']);
