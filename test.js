/*
 * Copyright 2016  IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 */

 // Standalone test of search module - just writes to console

var wchSearch = require('./lib/search.js');

// This user is a member of a tenant on staging system
var user = '[username]';
var pass = '[password]';
var searchParams = 'q=*:*&wt=json&sort=name%20asc&rows=1&'; // get the first result, searching for everything

wchSearch.search(user, pass, searchParams, function cb(err, res, body)
{
    if (err || (res && (res.statusCode !== 200) && (res.statusCode !== 302)))
    {
        console.log("Error calling asset service: " + res.statusCode + ", " + err + ", " + body);
    }
    else
    {
        console.log('search results: ', JSON.stringify(JSON.parse(body)));
    }
});