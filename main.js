/*
 * Copyright 2016  IBM Corp.
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

/* serves all the static files in the public folder */
app.use(express.static(path.join(__dirname, 'public')));

/* For any requestso to /api/search, call the search function */
app.get('/api/search', function(request, response)
{
    var url_parts = url.parse(request.url, false);
    var query = url_parts.query;
    console.log('query params: ', query);

    // Call search function, passing in all the parameters
    // Currently this sample goes against staging system - the user below is part of a tenant there
    wchSearch.search('[username]', '[password]', query, function cb(err, res, body)
    {
        if (err || (res && (res.statusCode !== 200) && (res.statusCode !== 302)))
        {
            console.log("Error calling asset service: " + res.statusCode + ", " + err + ", " + body);
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
    console.log('Listening on port 3000');
    console.log('Sample application that uses client JS to call WCH search: http://localhost:3000/index.html');
    console.log('Sample application that calls WCH search via Node.js: http://localhost:3000/index-nodejs-search.html');
    console.log('Node search API can be called with any search parameters like this: http://localhost:3000/api/search?q=*:*&wt=json&sort=name%20desc&rows=1&');
});