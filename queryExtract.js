const { Parser } = require('node-sql-parser');
const parser = new Parser();



function extractEntitiesWithFilters(query) {
    return;
    //TODO : This part is buggy due different syntax required for node-sql-parser and alasql
  const ast = parser.astify(query);
  const entitiesWithFilters = [];

  // Handle the FROM clause to identify entities
  const fromClauses = Array.isArray(ast.from) ? ast.from : [ast.from];
  fromClauses.forEach(clause => {
    entitiesWithFilters.push({ entity: clause.table, filters: [] });
  });

  if (ast.where && ast.where.type === 'binary_expr') {
    const whereCondition = processWhereClause(ast.where);
    
    entitiesWithFilters.forEach(entity => {
      
      entity.filters.push(whereCondition);
    });
  }

  return entitiesWithFilters;
}

function processWhereClause(whereClause) {
  // Basic handling of binary expressions (e.g., column = value)
  if (whereClause.type === 'binary_expr') {
    return {
      column: whereClause.left.column,
      operator: whereClause.operator,
      value: whereClause.right.value,
    };
  }


  return null; // Placeholder for unsupported or complex conditions
}

//console.log("Results for ",JSON.stringify(extractEntitiesWithFilters(squery)));
module.exports = { extractEntitiesWithFilters };
