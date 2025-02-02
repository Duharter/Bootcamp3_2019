/* Dependencies */
var mongoose = require('mongoose')
    Listing = require('../models/listings.server.model.js')

    exports.create = function(req, res) {

      /* Instantiate a Listing */
      var listing = new Listing(req.body);
    
      /* save the coordinates (located in req.results if there is an address property) */
      if(req.results) {
        listing.coordinates = {
          latitude: req.results.lat, 
          longitude: req.results.lng
        };
      }
     
      /* Then save the listing */
      listing.save(function(err) {
        if(err) {
          console.log(err);
          res.status(404).send(err);
        } else {
          res.json(listing);
          console.log(listing)
        }
      });
    };
    
    /* Show the current listing */
    exports.read = function(req, res) {
      /* send back the listing as json from the request */
      res.json(req.listing);
    };

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.listing;

  /* Replace the article's properties with the new properties found in req.body */
  /* save the coordinates (located in req.results if there is an address property) */
  /* Save the article */
  listing.code = req.body.code;
  listing.name = req.body.name;
  listing.address = req.body.address;
  if (req.results){
    listing.coordinates = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }

  listing.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  /* Remove the article */
  listing.remove(function(err) {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else{
      res.end();
    }
  })
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /* Your code here */
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