

module.exports = () => {
    const conversation = require("../controllers/conversationController.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", conversation.create);
  
    // Retrieve all Tutorials
    router.get("/", conversation.findAll);

  
    // Retrieve a single Tutorial with id
    router.get("/:id", conversation.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", conversation.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", conversation.delete);
  
    // Delete all Tutorials
    router.delete("/", conversation.deleteAll);
  
    
  };