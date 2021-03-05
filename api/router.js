module.exports = app => {
  const database = require(__dirname + "/controller.js");

  // Create a new Customer
  app.post("/api/:tablename/:id", database.create);
  app.get("/api/:tablename/:id", database.read);

  /*// Retrieve all Customers
  app.get("/customers", customers.findAll);

  // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", customers.findOne);

  // Update a Customer with customerId
  app.put("/customers/:customerId", customers.update);

  // Delete a Customer with customerId
  app.delete("/customers/:customerId", customers.delete);

  // Create a new Customer
  app.delete("/customers", customers.deleteAll);
  */
};