const express = require('express');
const app = express();
const alasql = require('alasql');
const { Parser } = require('node-sql-parser');
const parser = new Parser();

const port = 3000;

app.use(express.json());
app.use(express.static('public')); 
const { callConnector } = require('./api');
const {extractEntitiesWithFilters} = require('./queryExtract');


// Mock authentication function
function authenticateRequest(req) {
    // This function would handle authentication.
    // For now, it simply returns true to simulate successful authentication.
    return true;
}

// Mock rate limit check function
function checkRateLimit(connectorId) {
    // This function would check the rate limit for a specific connector.
    // Returns true if under the limit, false if over.
    return true; // Simulating under limit
}

// Mock connector API call function
function callConnectorApi(connectorId, data) {
    // Placeholder for making an actual API call to the connector.
    // Returns mock data for now.
    const results = callConnector(extractEntitiesWithFilters(data));
    return { success: true, data: results }; // Simulate API call success
}



app.post('/sql-run', (req, res) => {
    console.log('Received SQL Query:', req.body.query);
    const query = req.body.query;    
    // Step 1: Authenticate Request
    if (!authenticateRequest(req)) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    
    // Extract connector ID from request, for example
    const connectorId = req.body.connectorId;
    
    // Step 2: Check Rate Limit for Connector
    if (!checkRateLimit(connectorId)) {
        return res.status(429).json({ error: "Rate limit exceeded" });
    }
    
    // Step 3: Call Connector API (mocked)
    const apiResponse = callConnectorApi(connectorId, query);
    if (!apiResponse.success) {
        return res.status(500).json({ error: "Failed to call connector API" });
    }
    
    // Step 4: Execute the SQL query with AlaSQL
    const result = alasql(query, apiResponse.data);
    console.log(result);
    
    res.json({ result });
});

app.listen(port, () => {
  console.log(`Data processing service listening at http://localhost:${port}`);
});

