var created = false;
var Messages;

if(!created) {
  created = true;
  Messages = new Mongo.Collection("messages");
}

export default Messages;
