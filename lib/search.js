/*
 * Copyright 2016  IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

// search module
"use strict";
const request = require("request").defaults({ jar: true });
const loginURI = "/login/v1/basicauth";
const authoringSearchService = "/authoring/v1/search";
const deliverySearchService  = "/delivery/v1/search";

var loginRequestOptions = {
    uri: '', // This is set in search function below
    headers: {
        "accept": "application/json"
    },
    agentOptions: {
        // Change this to false if running against dev system without a signed certificate
        "rejectUnauthorized": true
    },
    'auth': {
        // These are set from arguments
        'user': '',
        'pass': '',
        'sendImmediately': true
    },
    followRedirect: false // Ignore the 302 redirect login sends for UI use
}

// API request options
var searchRequestOptions = {
    uri: '',
    headers: {
        "accept": "application/json"
    },
    agentOptions: {
        // Change this to false if running against dev system without a signed certificate
        "rejectUnauthorized": true
    }
}

// The public authoring search function
var authoringSearch = function(baseTenantUrl, user, pass, params, searchCb) {
    loginRequestOptions.uri = baseTenantUrl + loginURI;
    loginRequestOptions.auth.user = user;
    loginRequestOptions.auth.pass = pass;
    return request.get(loginRequestOptions, function cb(err, res, body) {
        if ((err) || (res && res.statusCode && (res.statusCode != 200) && (res.statusCode != 302))) {
            console.log("Error: " + res.statusCode + ", " + err + ", " + body);
        } else {
            if (res.headers && res.headers["set-cookie"]) {
                // console.log("Got cookies: " + res.headers["set-cookie"]);
            }
            // Now call the search service, using the same request
            // wrapper created with the request.defaults call above, so that it'll
            // reuse any cookies in this next request, from previous response
            var searchURL = baseTenantUrl + '/' + authoringSearchService + "?" + params;
            searchRequestOptions.uri = searchURL;
            request.get(searchRequestOptions, searchCb);
        }
    });
};

// The public delivery search function
var deliverySearch = function(baseTenantUrl, params, searchCb) {
    var searchURL = baseTenantUrl + '/' + deliverySearchService + "?" + params;
    searchRequestOptions.uri = searchURL;
    console.log("Calling: " + searchURL);
    request.get(searchRequestOptions, searchCb);
};


module.exports.authoringSearch = authoringSearch;
module.exports.deliverySearch = deliverySearch;
