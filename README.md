# sample-search-api

This sample shows some of the capabilities of IBM Watson Content Hub (WCH) search services. This is a technical sample intended for developers exploring the WCH APIs and data model.

This sample illustrates:
- Using the Delivery and Authoring search APIs and some of the powerful filtering capabilities.
- Calling the authenticated search API both from client JavaScript and from Node.js.
- Using the document data that is optionally returned as part of the search results.
- A simple Node.js Express server that does the search as a "proxied" request. This way of accessing the WCH doesn't require the CORS enablement that's required for browser JS calls to WCH.

There is a client-side sample using browser based JavaScript and a server-side implementations, using Node.js in a simple Express server. Both implementations are available as reusable functions. The client JavaScript version is in public/delivery-search.js and public/authoring-search.js.  The Node.js implmentation is in lib/search.js.

### Exploring the sample and the Watson Content Hub search API capabilities

The WCH search service is built on the powerful SOLR search engine, and the search parameters offer a great number of useful features for searching and controlling the returned search results. In this sample you can select from a list of example search queries to try them out and to see the search parameters that are used. You can also edit the search parameters input to try your own search queries. The search results table displays some of the common fields you can use. At the top you can see how many rows were found. This is often different than the number of result entries, which is controlled with the "rows" parameter.

Here is a screenshot showing a search for all the content items of type Article:

![Alt text](/docs/search-api-screenshot.jpg?raw=true "Sample screenshot")

You can click on the "JSON" button for any entry to see the complete JSON. You can also click on the "Document JSON" button to see the parsed contents of the "document" field that can optionally be returned with search results. See below for more information on the document field and on controlling which fields are returned in your results.

The example queries in the drop-down list show a number of useful queries, shown in this screenshot.

![Alt text](/docs/screenshot-dropdown.jpg?raw=true "Sample dropdown screenshot")

General documentation for SOLR queries can be found at https://lucene.apache.org/solr/guide/6_6/searching.html

#### Selecting fields to return in results and using the "document" field

One of the parameters for search is the "fl" parameter for selecting which fields are returned for each entry. In the sample, most of the example queries use the following list of fields:
    &fl=name,document,id,classification,type,status

The "document" field includes the complete referenced document, for example the complete content item or the complete asset JSON. By default it is returned as single string that you would need to parse as JSON. You can also add the ":[json]" option to have the document field automatically parsed as JSON, as in this example:
    &fl=name,document:[json]

#### Search parameters used in the example queries

Here are some of the parameters used in the example queries:
- **q** specifies the search term
- **fl** selects the set of fields to include in the results, for example &fl=name,document:[json]
- **rows** specifies how many result entries to return, for example rows=20
- **start** specifies the starting entry number to return, for example start=20
- **sort** specifies a field to sort on, with asc or desc for ascending/descending, for example sort=lastModified%20desc
- **fq=classification:** selects what kind(s) of artifacts to search for, for example to search for assets only, use  fq=classification:asset
- **fq=type:** searches for an item using a particular content type, for example fq=type:Article
- **fq=status:** searches for artifacts matching draft/ready/retired status, for example fq=status:draft
- **fq=tags:** searches for one or more tags, for example fq=tags:(beach OR summer)
- **fq=categoryLeaves:** searches for category values, for example fq=categoryLeaves:(travel OR auto)

### Running the sample with the Node.js Express server

#### 1. Download the files and install Node modules

Download the project files into any folder on your workstation. Then run

    npm install

#### 2. Update the baseTenantUrl variable and user credentials

All of these samples require setting the base tenant API URL.  The authoring search samples require authentication and use hard-coded user name, and password values. For the client-side implementation, these are set in the public/delivery-search.js and authoring-search.js files. For the Node.js implementation they are set in main.js. Update the name and password values in those files. To avoid putting credentials in the source you could change the application to provide browser inputs for username and password.

The baseTenantUrl variable must be set for your tenant. In the IBM Watson Content Hub user interface, open the user menu by clicking the drop-down arrow next to the user name on the top navigation bar. Select "Hub Information" from the user menu.  The pop-up window shows your Watson Content Hub tenant specific "API URL". Use this information to update the value of baseTenantUrl in the above mentioned JS files. For example it might look something like this:

const baseTenantUrl = "https://my12.digitalexperience.ibm.com/api/12345678-9abc-def0-1234-56789abcdef0";

#### 3. Enable CORS support for your tenant

To use the client JavaScript implementation of this sample you will need to enable CORS support for your tenant. To control the CORS enablement for Watson Content Hub, go to Hub set up -> General settings -> Security tab. After adding your domain (or "*" for any domain), be sure to click the Save button at the top right of the screen.

#### 4. Start the Node.js application

Run this command

    node main.js

#### 5. Access one of the following pages from a browser

- Sample application that uses client JS to call WCH Delivery Search:

http://localhost:3000/delivery-search.html

- Sample application that uses client JS to call WCH Authoring Search:

http://localhost:3000/authoring-search.html

- Sample application that calls WCH search via Node.js:

http://localhost:3000/index-nodejs-search.html

- The Delivery Search API can be called with any search parameters like this:

http://localhost:3000/api/delivery-search?q=*:*&wt=json&sort=name%20desc&rows=1

- The Authoring Search API can be called with any search parameters like this:

http://localhost:3000/api/authoring-search?q=*:*&wt=json&sort=name%20desc&rows=1

### Running only the client JavaScript implementation

#### 1. Download the files

Download the application files (html, js, and css) from the 'public' folder into any folder on your workstation.

#### 2. Update the user credentials

Update the name, password, and baseTenantUrl values in the app.js file as described above.

#### 3. Enable CORS support for your tenant

See above for how to do this.

#### 4. Load delivery-search.html or authoring-search.html or index-nodejs-search.html in a browser

You can do this right from the file system in Firefox, Chrome, or Safari browsers.

### Resources

API Explorer reference documentation: https://developer.ibm.com/api/view/id-618

Watson Content Hub developer center: https://developer.ibm.com/wch/

Watson Content Hub forum: https://developer.ibm.com/answers/smartspace/wch/
