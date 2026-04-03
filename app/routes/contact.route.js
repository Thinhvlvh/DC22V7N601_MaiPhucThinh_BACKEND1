// routes/contact.routes.js
const express = require("express");
const contacts = require("../controllers/contact.controller");

const router = express.Router();

// Routes chính cho Contacts
router.route("/")
    .get(contacts.findAll)     
    .post(contacts.create)      
    .delete(contacts.deleteAll); 

router.route("/favorite")
    .get(contacts.findAllFavorite);

router.route("/:id")
    .get(contacts.findOne)     
    .put(contacts.update)      
    .delete(contacts.delete);  

module.exports = router;