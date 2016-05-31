/**
 * Gets JSON data from a URL 
 */
function getJSON(url, callback, failback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            if (typeof callback === 'functin')
                callback(JSON.parse(request.responseText));
        }
        else {
            if (typeof failback == 'function')
                failback();
        }
    };
    request.onerror = function () { if (typeof failback === 'function') { failback(); } };

    request.send();
}



/** 
 * Sends POST data to a URL 
 */
function sendPOST(url, data, callback)
{
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
           callback(JSON.parse(request.responseText));
        }

    };

    request.send(JSON.stringify(data));
}