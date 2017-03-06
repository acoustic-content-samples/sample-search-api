/*
 * Copyright IBM Corp. 2016, 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

 // Express server that serves static files from "public" folder and does WCH search from /api/search requests

var express = require('express');
var app = express();
var path = require('path');
var wchSearch = require('./lib/search.js');
var url = require('url');

// Base URL for APIs - replace {Host} and {Tenant ID} using the values available
// from the "i" information icon at the top left of the WCH screen
const baseTenantUrl = "https://{Host}/api/{Tenant ID}";
const username = "[username]";
const password = "[password]";

/* serves all the static files in the public folder */
app.use(express.static(path.join(__dirname, 'public')));

/* For any requestso to /api/search, call the search function */
app.get('/api/authoring-search', function(request, response)
{
    var url_parts = url.parse(request.url, false);
    var query = url_parts.query;
    console.log('query params: ', query);

    // Call search function, passing in all the parameters
    wchSearch.authoringSearch(baseTenantUrl, username, password, query, function cb(err, res, body)
    {
        if (err || (res && (res.statusCode !== 200) && (res.statusCode !== 302)))
        {
            console.log("Error calling search service: " + res.statusCode + ", " + err + ", " + body);
            response.send(body);
        }
        else
        {
        	response.type('json');
            response.send(body);
        }
    });
})

/* For any requestso to /api/delivery-search, call the delivery search function */
app.get('/api/delivery-search', function(request, response)
{
    var url_parts = url.parse(request.url, false);
    var query = url_parts.query;
    console.log('query params: ', query);

    // Call search function, passing in all the parameters
    wchSearch.deliverySearch(baseTenantUrl, query, function cb(err, res, body)
    {
        console.log("got back: " + err + " " + res + " " + body);
        if (err || (res && (res.statusCode !== 200) && (res.statusCode !== 302)))
        {
            console.log("Error calling delivery search service: " + res.statusCode + ", " + err + ", " + body);
            response.send(body);
        }
        else
        {
        	response.type('json');
            response.send(body);
        }
    });
})

app.listen(3000, function()
{
    if (baseTenantUrl.includes('{Host}') || (baseTenantUrl.includes('{Tenant')))
        throw new Error("You must set the baseTenantUrl variable in main.js to your tenant specific base API URL");

    console.log('Listening on port 3000');
    console.log('Sample application that uses client JS to call WCH Delivery Search: ');
    console.log('    http://localhost:3000/delivery-search.html');
    console.log('Sample application that uses client JS to call WCH Authoring Search: ');
    console.log('    http://localhost:3000/authoring-search.html');
    console.log('Sample application that calls WCH search via Node.js: ');
    console.log('    http://localhost:3000/index-nodejs-search.html');
    console.log('The Delivery Search API can be called with any search parameters like this:');
    console.log('    http://localhost:3000/api/delivery-search?q=*:*&wt=json&sort=name%20desc&rows=1&');
    console.log('The Authoring Search API can be called with any search parameters like this:');
    console.log('    http://localhost:3000/api/authoring-search?q=*:*&wt=json&sort=name%20desc&rows=1&');
});
