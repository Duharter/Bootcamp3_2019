
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
    coordinates = require('./coordinates.server.controller.js');
    
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* save the coordinates (located in req.results if there is an address property) */
  
  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.json(listing);
    }
  });

};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {
  var listing = req.listing;

  listing.code = req.body.code;
  listing.name = req.body.name;
  listing.address = req.body.address;
  listing.updated_at = new Date();
  listing.created_at = new Date();
  
  listing.save(function(err) {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.json(listing);
    }
  });

  /* Replace the listings's properties with the new properties found in req.body */
 
  /*save the coordinates (located in req.results if there is an address property) */
 
  /* Save the listing */

};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  listing.remove(function(err) {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else{
      res.end();
    }
  });

};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /* Add your code */
  Listing.find().sort('code').exec(function(err, listings) {
    if (err){
      res.status(404).send(err);
    } else {
      res.json(listings);
    }
  });
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(404).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};