/*
 * Copyright IBM Corp. 2016, 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

"use strict";

// Do search
function wchDoSearch(params, cb) {
    search(params, function(searchResults) {
        cb(searchResults);
    });
}

// The API URL, along with the host and content hub id for your tenant, may be
// found in the "Hub Information" dialog off the "User menu" in the authoring UI
// Update the following URL with the value from that Hub Information dialog.
const baseTenantUrl = "https://{Host}/api/{Tenant ID}";
const searchService = "/delivery/v1/search";

// Generic search function - works with any user/password, search params
function search(searchParams, cb) {
    // console.log('searchParams is: ', searchParams);
    var searchURL = baseTenantUrl + searchService + "?" + searchParams;
    $.ajax({dataType:"json", url:searchURL})
        .done(function(json) {
            cb(json);
        })
        .fail(function(request, textStatus, err) {
            alert("Content Hub returned an error: " + err);
        });
}
