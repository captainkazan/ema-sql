// Mock data for 'tickets' and 'users'
const tickets = [
    {id: 1, subject: "Issue with product X", status: "open", userId: 101},
    {id: 2, subject: "Delivery delayed", status: "open", userId: 102},
    {id: 3, subject: "Payment issue", status: "resolved", userId: 103},
    {id: 4, subject: "How to return product", status: "closed", userId: 101}
];

const users = [
    {id: 101, name: "John Doe", email: "john.doe@example.com"},
    {id: 102, name: "Jane Smith", email: "jane.smith@example.com"},
    {id: 103, name: "Emily Johnson", email: "emily.johnson@example.com"}
];


const zendeskApiConfig = {
    baseUrl: 'https://yoursubdomain.zendesk.com/api/v2',
    entityFilterMapping: {
      tickets: ['status', 'created_at'],
      users: ['name', 'email'],
      // Add more entities and their supported filters as needed
    }
  };

  
  function constructZendeskApiUrl(entity, filters) {
    const baseUrl = zendeskApiConfig.baseUrl;
    const supportedFilters = zendeskApiConfig.entityFilterMapping[entity];
    
    if (!supportedFilters) {
      throw new Error(`Unsupported entity: ${entity}`);
    }
  
    // Filter the input to include only supported filters for the entity
    const filteredConditions = Object.entries(filters)
      .filter(([key]) => supportedFilters.includes(key))
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  
    const resource = `/${entity}.json`; // Assuming all entities follow this pattern
    return `${baseUrl}${resource}?${filteredConditions}`;
  }
  
  function callConnector(entitiesAndFilters){
    return [tickets,users];

  }


  module.exports = { constructZendeskApiUrl,callConnector };

  // Constructing a URL for tickets with specific filters
//const ticketsUrl = constructZendeskApiUrl('tickets', { status: 'open', assignee_id: '12345' });
//console.log(ticketsUrl); // Outputs the constructed URL for tickets

// Constructing a URL for users with specific filters
//const usersUrl = constructZendeskApiUrl('users', { name: 'John Doe', email: 'john.doe@example.com' });
//console.log(usersUrl); // Outputs the constructed URL for users

