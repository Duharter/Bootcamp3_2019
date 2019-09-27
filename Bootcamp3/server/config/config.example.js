//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    uri: 'mongodb+srv://duharter:Julito90@@cluster0-kds1v.mongodb.net/test?retryWrites=true&w=majority',
  }, 
  openCage: {
    key: 'fbf377ec120f4dc5a8dbc78783370097' //place your openCage public key here - Sign-up for a free key https://opencagedata.com/
  },
  port: 8080
};