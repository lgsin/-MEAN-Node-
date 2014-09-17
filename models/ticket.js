var util = require('./util');
var baseModel = require('./baseModel');

function Ticket(ticket){ 
  this._id = ticket._id ? ticket._id : util.createUniqueId("ticket");
  this.userId = ticket.userId ? ticket.userId : "";
  this.bookingId = ticket.bookingId ? ticket.bookingId : "";
  this.name = ticket.name ? ticket.name : ""; 
  this.beginP = ticket.beginP ? ticket.beginP : ""; 
  this.endP = ticket.endP ? ticket.endP : ""; 
  this.date = ticket.date ? ticket.date : ""; 
  this.price = ticket.price ? ticket.price : ""; 
  this.phone = ticket.phone ? ticket.phone : ""; 
  this.companyId = ticket.companyId ? ticket.companyId : ""; 

}; 
util.inheritPrototype(Ticket, baseModel);

module.exports = Ticket; 

  