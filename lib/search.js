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
const apiGateway = "https://my.digitalexperience.ibm.com/api";
const loginURI = "/login/v1/basicauth";
const searchService = "/authoring/v1/search";

var loginRequestOptions = {
    uri: apiGateway + loginURI,
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

// The public search function
var search = function(user, pass, params, searchCb) {
    loginRequestOptions.auth.user = user;
    loginRequestOptions.auth.pass = pass;
    return request.get(loginRequestOptions, function cb(err, res, body) {
        if ((err) || (res && (res.statusCode != 200) && (res.statusCode != 302))) {
            console.log("Error: " + res.statusCode + ", " + err + ", " + body);
        } else {
            if (res.headers && res.headers["set-cookie"]) {
                // console.log("Got cookies: " + res.headers["set-cookie"]);
            }
            var baseTenantUrl = res.headers['x-ibm-dx-tenant-base-url']; // use this to get tenant from the basicauth call
            // console.log('baseTenantUrl: ', baseTenantUrl);
            // Now call the search service, using the same request
            // wrapper created with the request.defaults call above, so that it'll
            // reuse any cookies in this next request, from previous response
            var searchURL = baseTenantUrl + '/' + searchService + "?" + params;
            searchRequestOptions.uri = searchURL;
            request.get(searchRequestOptions, searchCb);
        }
    });
};
module.exports.search = search;