Data Processing Service
------------------------
The Data Processing Service is a Node.js application that facilitates the execution of SQL-like queries across multiple data sources. It aggregates and processes real-time data from various external APIs into a unified interface, allowing users to query and analyze data efficiently.


Installation
------------
Clone the repository and run

npm install

To start the server run

node app.js 

Technologies Used
------------------
Node.js
Express.js
node-sql-parser
AlaSQL


Usage
-----
This is a bare version of the mvp. open http://localhost:3000/index.html and fire up a query against tickets and users collection of
"Zendesk". The data is currently  harcoded in api.js file

Limitations and known issues
----------------------------

1. The format of sql currently uses something alasql can use and is not generic enough. 
2. All methods are synchronous instead of typical asyn/await . Code is mostly for illustrating the flow
3. Doesn't make any api  call to zendesk but uses harcoded data. But the api templates can be seen in api.js file
4. queryExtract.js should help with extracting entities and filters but is commented out as it requires a different version of sql than alasql.

What works? : Running alaSQl compliant sql against tickets and users json
![home](https://github.com/captainkazan/ema-sql/blob/main/Screenshot%20(38).png)

